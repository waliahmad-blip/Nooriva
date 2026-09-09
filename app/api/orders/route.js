import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { auth } from "@/lib/auth";

/**
 * NOORIVA order pipeline (production-grade, zero hard dependency):
 *   1. If SUPABASE_URL + SUPABASE_KEY are set      -> insert into `orders` table
 *   2. Else if GOOGLE_SHEETS_WEBHOOK is set        -> POST to Google Apps Script
 *   3. Always: append to data/orders.json locally  -> dev / fallback copy
 */

function validPhone(phone) {
  return /^[+]?[\d\s-]{10,16}$/.test(String(phone || "").trim());
}

async function saveToSupabase(order) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return false;
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/orders`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(order),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function fetchFromSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return [];
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/orders?select=*&order=created_at.desc`, {
      method: "GET",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function saveToSheets(order) {
  const hook = process.env.GOOGLE_SHEETS_WEBHOOK;
  if (!hook) return false;
  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function getLocalOrders() {
  try {
    const dir = path.join(process.cwd(), "data");
    const file = path.join(dir, "orders.json");
    if (!fs.existsSync(file)) return [];
    const content = fs.readFileSync(file, "utf-8");
    const list = JSON.parse(content);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function saveToLocalFile(order) {
  try {
    const dir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, "orders.json");
    let list = getLocalOrders();
    list = [order, ...list.filter((o) => o?.order_id !== order.order_id)].slice(0, 500);
    fs.writeFileSync(file, JSON.stringify(list, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

export async function GET(request) {
  try {
    let session = null;
    try {
      session = await auth();
    } catch (_) {}

    const { searchParams } = new URL(request.url);
    const queryEmail = searchParams.get("email");
    const queryPhone = searchParams.get("phone");
    const queryOrderId = searchParams.get("orderId");
    const queryIds = searchParams.get("ids");

    const localOrders = getLocalOrders();
    const remoteOrders = await fetchFromSupabase();

    const orderMap = new Map();
    for (const ord of [...remoteOrders, ...localOrders]) {
      if (ord && ord.order_id) {
        orderMap.set(ord.order_id, ord);
      }
    }
    const allOrders = Array.from(orderMap.values());

    const sessionUserId = session?.user?.id;
    const sessionEmail = session?.user?.email?.toLowerCase();
    const sessionPhone = session?.user?.phone;

    let matched = allOrders;

    if (sessionUserId || sessionEmail || sessionPhone || queryEmail || queryPhone || queryOrderId || queryIds) {
      const allowedIds = queryIds ? queryIds.split(",").map((s) => s.trim().toUpperCase()) : [];

      matched = allOrders.filter((ord) => {
        if (queryOrderId && ord.order_id?.toUpperCase() === queryOrderId.toUpperCase()) return true;
        if (allowedIds.length > 0 && allowedIds.includes(ord.order_id?.toUpperCase())) return true;
        if (sessionUserId && ord.user_id === sessionUserId) return true;
        if (sessionEmail && ord.user_email?.toLowerCase() === sessionEmail) return true;
        if (queryEmail && ord.user_email?.toLowerCase() === queryEmail.toLowerCase()) return true;
        if (sessionPhone && ord.phone === sessionPhone) return true;
        if (queryPhone && ord.phone === queryPhone) return true;
        return false;
      });
    }

    matched.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    return NextResponse.json({
      ok: true,
      orders: matched,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    let session = null;
    try {
      session = await auth();
    } catch (_) {}

    const body = await request.json();
    const { form, items, subtotal, delivery, total, payment, language, eta } = body;

    if (
      !form?.name ||
      !form?.phone ||
      !form?.address ||
      !form?.city ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !validPhone(form.phone)
    ) {
      return NextResponse.json({ ok: false, error: "Invalid order" }, { status: 400 });
    }

    // Sanitize item rows
    const cleanItems = items.slice(0, 40).map((it) => ({
      id: String(it.id || "").slice(0, 60),
      name: String(it.name || "").slice(0, 80),
      qty: Math.max(1, Math.min(20, parseInt(it.qty, 10) || 1)),
      price: Math.max(0, Number(it.price) || 0),
    }));

    const orderId = `NV-${Date.now().toString().slice(-6)}${Math.floor(
      Math.random() * 90 + 10
    )}`;

    const order = {
      order_id: orderId,
      created_at: new Date().toISOString(),
      user_id: session?.user?.id || null,
      user_email: session?.user?.email || (form.email ? String(form.email).slice(0, 120) : null),
      status: "Processing",
      name: String(form.name).slice(0, 120),
      phone: String(form.phone).slice(0, 24),
      address: String(form.address).slice(0, 400),
      city: String(form.city).slice(0, 80),
      notes: String(form.notes || "").slice(0, 400),
      items: cleanItems,
      subtotal: Number(subtotal) || 0,
      delivery: Number(delivery) || 0,
      total: Number(total) || 0,
      payment: payment === "whatsapp" ? "whatsapp" : "cod",
      language: String(language || "en").slice(0, 4),
      eta: String(eta || "2-6 working days").slice(0, 60),
    };

    const storedIn = [];
    if (await saveToSupabase(order)) storedIn.push("supabase");
    if (await saveToSheets(order)) storedIn.push("google-sheets");
    if (saveToLocalFile(order)) storedIn.push("local-file");

    if (process.env.NODE_ENV === 'development') console.log("NOORIVA ORDER", order, "storedIn:", storedIn.join(",") || "console-only");

    return NextResponse.json({
      ok: true,
      orderId,
      eta: order.eta,
      order,
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 500 });
  }
}
