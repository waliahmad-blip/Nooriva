"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles } from "lucide-react";
import { useT, useLocalized } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import {
  getProduct,
  cities,
  WHATSAPP_NUMBER,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY,
} from "@/lib/data";

export default function CheckoutOverlay() {
  const t = useT();
  const localize = useLocalized();
  const checkoutOpen = useStore((s) => s.checkoutOpen);
  const closeCheckout = useStore((s) => s.closeCheckout);
  const clearCart = useStore((s) => s.clearCart);
  const cart = useStore((s) => s.cart);
  const language = useStore((s) => s.language);

  const items = Object.entries(cart).map(([id, qty]) => ({
    ...getProduct(id, language),
    qty,
  }));
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY;
  const total = subtotal + delivery;

  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);
  const [finalTotal, setFinalTotal] = useState(0);
  const [finalSubtotal, setFinalSubtotal] = useState(0);
  const [finalDelivery, setFinalDelivery] = useState(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "karachi",
    notes: "",
    payment: "cod",
  });

  const selectedCity = cities.find((c) => c.id === form.city);

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const nextFromDetails = () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      setError(t("checkout.required"));
      return;
    }
    setError("");
    setStage(1);
  };

  const placeOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
          subtotal,
          delivery,
          total,
          payment: form.payment,
          language,
          eta: selectedCity ? localize(selectedCity.eta) : "",
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setOrder(data);
      setFinalSubtotal(subtotal);
      setFinalDelivery(delivery);
      setFinalTotal(total);
      setStage(3);
      clearCart();
    } catch (e) {
      setError(t("checkout.required"));
    } finally {
      setLoading(false);
    }
  };

  const successWhatsApp = order
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        [
          t("order.whatsappPrefix"),
          `${t("checkout.orderId")}: ${order.orderId}`,
          `${t("checkout.total")}: ₨${finalTotal}`,
        ].join("\n")
      )}`
    : "#";

  const stages = [
    t("checkout.stage.details"),
    t("checkout.stage.payment"),
    t("checkout.stage.review"),
    t("checkout.stage.success"),
  ];

  const reset = () => {
    setStage(0);
    setOrder(null);
    closeCheckout();
  };

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <div className="fixed inset-0 z-[70] overflow-y-auto p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={reset}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            className="relative mx-auto my-6 w-full max-w-2xl"
          >
            <div className="glass rounded-[2rem] bg-white/85 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <h3 className="display-heading text-3xl">{t("checkout.title")}</h3>
                <button onClick={reset} className="rounded-full bg-ink p-2 text-cream">
                  <X size={16} />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-2">
                {stages.map((label, i) => (
                  <div key={label} className="text-center">
                    <div
                      className={`mx-auto grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${
                        stage >= i ? "bg-ink text-cream" : "bg-ink/10 text-ink/40"
                      }`}
                    >
                      {stage > i ? <Check size={14} /> : i + 1}
                    </div>
                    <div className="mt-1 hidden text-[10px] text-ink/50 md:block">{label}</div>
                  </div>
                ))}
              </div>

              {stage < 3 && items.length === 0 ? (
                <div className="mt-8 rounded-[1.5rem] bg-white/60 p-8 text-center text-ink/60">
                  {t("checkout.empty")}
                </div>
              ) : (
                <>
                  {stage === 0 && (
                    <div className="mt-6 grid gap-3">
                      <input className="field" placeholder={t("checkout.name")} value={form.name} onChange={(e) => update("name", e.target.value)} />
                      <input className="field" placeholder={t("checkout.phone")} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                      <textarea className="field min-h-[100px] resize-none" placeholder={t("checkout.address")} value={form.address} onChange={(e) => update("address", e.target.value)} />
                      <select className="field" value={form.city} onChange={(e) => update("city", e.target.value)}>
                        {cities.map((c) => (
                          <option key={c.id} value={c.id}>
                            {localize(c.name)} · {localize(c.eta)}
                          </option>
                        ))}
                      </select>
                      <input className="field" placeholder={t("checkout.notes")} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
                      {error && <p className="text-sm text-red-500">{error}</p>}
                      <button onClick={nextFromDetails} className="btn-primary">{t("checkout.continue")}</button>
                    </div>
                  )}

                  {stage === 1 && (
                    <div className="mt-6 space-y-3">
                      <button
                        onClick={() => update("payment", "cod")}
                        className={`w-full rounded-[1.5rem] border-2 p-5 text-left transition ${
                          form.payment === "cod" ? "border-ink bg-white" : "border-ink/10 bg-white/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold">{t("checkout.cod")}</h4>
                          {form.payment === "cod" && <Check size={18} />}
                        </div>
                        <p className="mt-1 text-sm text-ink/60">{t("checkout.codDesc")}</p>
                      </button>

                      <button
                        onClick={() => update("payment", "whatsapp")}
                        className={`w-full rounded-[1.5rem] border-2 p-5 text-left transition ${
                          form.payment === "whatsapp" ? "border-ink bg-white" : "border-ink/10 bg-white/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold">{t("checkout.whatsapp")}</h4>
                          {form.payment === "whatsapp" && <Check size={18} />}
                        </div>
                        <p className="mt-1 text-sm text-ink/60">{t("checkout.whatsappDesc")}</p>
                      </button>

                      <div className="flex gap-3 pt-2">
                        <button onClick={() => setStage(0)} className="btn-secondary flex-1">{t("checkout.back")}</button>
                        <button onClick={() => setStage(2)} className="btn-primary flex-1">{t("checkout.continue")}</button>
                      </div>
                    </div>
                  )}

                  {stage === 2 && (
                    <div className="mt-6 space-y-4">
                      <div className="rounded-[1.5rem] bg-white/70 p-5">
                        <h4 className="font-bold">{t("checkout.reviewOrder")}</h4>
                        <div className="mt-3 space-y-2">
                          {items.map((i) => (
                            <div key={i.id} className="flex justify-between border-b border-ink/5 pb-2 text-sm">
                              <span>{i.qty} × {i.name}</span>
                              <span>₨ {(i.price * i.qty).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 space-y-1 text-sm">
                          <div className="flex justify-between text-ink/60"><span>{t("checkout.subtotal")}</span><span>₨ {subtotal.toLocaleString()}</span></div>
                          <div className="flex justify-between text-ink/60"><span>{t("checkout.delivery")}</span><span>{delivery === 0 ? t("checkout.free") : `₨ ${delivery}`}</span></div>
                          <div className="flex justify-between text-lg font-bold"><span>{t("checkout.total")}</span><span>₨ {total.toLocaleString()}</span></div>
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] bg-white/70 p-5 text-sm leading-6 text-ink/65">
                        <p className="font-semibold text-ink">{form.name}</p>
                        <p>{form.phone}</p>
                        <p>{form.address}</p>
                        <p>{selectedCity ? localize(selectedCity.name) : ""} · {selectedCity ? localize(selectedCity.eta) : ""}</p>
                        <p>{form.payment === "cod" ? t("checkout.cod") : t("checkout.whatsapp")}</p>
                      </div>

                      {error && <p className="text-sm text-red-500">{error}</p>}

                      <div className="flex gap-3">
                        <button onClick={() => setStage(1)} className="btn-secondary flex-1">{t("checkout.back")}</button>
                        <button onClick={placeOrder} disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
                          {loading ? "..." : t("checkout.placeOrder")}
                        </button>
                      </div>
                    </div>
                  )}

                  {stage === 3 && order && (
                    <div className="mt-8 text-center">
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ink text-cream"
                      >
                        <Sparkles size={30} />
                      </motion.div>
                      <h4 className="display-heading mt-5 text-3xl">{t("checkout.successTitle")}</h4>
                      <p className="mx-auto mt-3 max-w-sm text-ink/60">{t("checkout.successSub")}</p>

                      <div className="mx-auto mt-6 max-w-sm rounded-[1.5rem] bg-white/70 p-6 text-left">
                        <p className="text-xs text-ink/50">{t("checkout.orderId")}</p>
                        <p className="text-2xl font-bold">{order.orderId}</p>
                        <p className="mt-3 text-xs text-ink/50">{t("checkout.eta")}</p>
                        <p className="font-semibold">{order.eta}</p>
                        <p className="mt-3 text-xs text-ink/50">{t("checkout.total")}</p>
                        <p className="text-xl font-bold">₨ {finalTotal.toLocaleString()}</p>
                      </div>

                      <div className="mx-auto mt-6 grid max-w-sm gap-2">
                        <a href={successWhatsApp} target="_blank" rel="noreferrer" className="btn-primary w-full">
                          {t("checkout.confirmWhatsApp")}
                        </a>
                        <button onClick={reset} className="btn-secondary w-full">{t("checkout.backHome")}</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
