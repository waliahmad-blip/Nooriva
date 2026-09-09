"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Package, Truck, ArrowRight, Loader2 } from "lucide-react";
import { COMMERCE } from "@/lib/noorishGold";

export default function AccountOrders({ session, isDark }) {
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    let recentIds = [];
    try {
      const stored = localStorage.getItem("nooriva-recent-orders");
      if (stored) recentIds = JSON.parse(stored);
    } catch (_) {}

    const query = new URLSearchParams();
    if (session?.user?.email) query.set("email", session.user.email);
    if (session?.user?.phone) query.set("phone", session.user.phone);
    if (recentIds.length > 0) query.set("ids", recentIds.join(","));

    fetch(`/api/orders?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.ok && Array.isArray(data.orders)) {
          setOrders(data.orders);
        }
      })
      .catch(() => {})
      .finally(() => setOrdersLoading(false));
  }, [session]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl border p-6 shadow-xl ${
        isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
      }`}
    >
      <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
              isDark ? "bg-[#ff8fb2]/20 text-[#ff8fb2]" : "bg-violet-100 text-violet-600"
            }`}
          >
            <ShoppingBag size={20} />
          </span>
          <div>
            <h2 className="text-xl font-bold">Orders &amp; Ritual History</h2>
            <p className={`mt-0.5 text-xs ${isDark ? "text-white/60" : "text-gray-500"}`}>
              Live tracking of your NOORISH GOLD elixirs nationwide.
            </p>
          </div>
        </div>
        {orders.length > 0 && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isDark ? "bg-white/10 text-white/80" : "bg-gray-100 text-gray-700"
            }`}
          >
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        )}
      </div>

      {ordersLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-white/40" />
        </div>
      ) : orders.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center rounded-2xl border border-dashed py-10 px-4 text-center ${
            isDark ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-gray-50/50"
          }`}
        >
          <Package size={36} className={`mb-3 ${isDark ? "text-white/30" : "text-gray-400"}`} />
          <p className="text-sm font-semibold">No rituals ordered yet</p>
          <p className={`mt-1 max-w-sm text-xs ${isDark ? "text-white/50" : "text-gray-500"}`}>
            Nourish your skin from within. Explore our 12 botanical elixirs crafted with pure saffron, rose hydrosol, and rare actives.
          </p>
          <Link
            href="/drinks/rose-halo"
            className={`mt-4 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:scale-105 ${
              isDark ? "bg-gradient-to-r from-[#ff8fb2] to-[#a78bfa]" : "bg-gradient-to-r from-[#a78bfa] to-[#22d3ee]"
            }`}
          >
            Explore Rituals <ArrowRight size={13} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => {
            const status = ord.status || "Processing";
            const isProcessing = status.toLowerCase() === "processing";
            const isDelivered = status.toLowerCase() === "delivered";
            const statusBg = isDelivered
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : isProcessing
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";

            const orderDate = ord.created_at
              ? new Date(ord.created_at).toLocaleDateString("en-PK", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Recent";

            const whatsappHelp = `https://wa.me/${COMMERCE.whatsappNumber}?text=${encodeURIComponent(
              `Hello NOORIVA support, I would like an update on my order ${ord.order_id}.`
            )}`;

            return (
              <div
                key={ord.order_id}
                className={`rounded-2xl border p-4 transition-all ${
                  isDark
                    ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-current/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold tracking-wider">{ord.order_id}</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusBg}`}
                    >
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                      {status}
                    </span>
                  </div>
                  <span className={`text-[11px] ${isDark ? "text-white/50" : "text-gray-500"}`}>
                    {orderDate}
                  </span>
                </div>

                {/* Items */}
                <div className="mb-3 space-y-2">
                  {Array.isArray(ord.items) &&
                    ord.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="font-medium">
                          {it.name || "Glow Elixir"} <span className="text-current/60">× {it.qty}</span>
                        </span>
                        <span className="font-mono text-[11px] opacity-80">
                          ₨ {(Number(it.price || 0) * (it.qty || 1)).toLocaleString()}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Summary & Tracking */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-current/10 pt-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold">Total: ₨ {Number(ord.total || 0).toLocaleString()}</span>
                    {ord.eta && (
                      <span
                        className={`flex items-center gap-1 text-[11px] ${
                          isDark ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        <Truck size={12} /> {ord.eta}
                      </span>
                    )}
                  </div>
                  <a
                    href={whatsappHelp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-[11px] font-bold transition-opacity hover:opacity-80 ${
                      isDark ? "text-[#ff8fb2]" : "text-violet-600"
                    }`}
                  >
                    Support / Inquire →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}
