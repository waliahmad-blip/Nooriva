import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

function saveToLocalFile(order) {
  try {
    const dir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, "orders.json");
    let list = [];
    if (fs.existsSync(file)) {
      try {
        list = JSON.parse(fs.readFileSync(file, "utf-8"));
      } catch {
        list = [];
      }
    }
    list.push(order);
    fs.writeFileSync(file, JSON.stringify(list, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

export async function POST(request) {
  try {
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
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 500 });
  }
}
