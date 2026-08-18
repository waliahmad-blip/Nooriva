"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { getProduct, WHATSAPP_NUMBER, FREE_DELIVERY_THRESHOLD } from "@/lib/data";

export default function BagDrawer() {
  const t = useT();
  const bagOpen = useStore((s) => s.bagOpen);
  const closeBag = useStore((s) => s.closeBag);
  const openCheckout = useStore((s) => s.openCheckout);
  const setQty = useStore((s) => s.setQty);
  const removeItem = useStore((s) => s.removeItem);
  const cart = useStore((s) => s.cart);
  const language = useStore((s) => s.language);

  const items = useMemo(
    () =>
      Object.entries(cart).map(([id, qty]) => ({
        ...getProduct(id, language),
        qty,
      })),
    [cart, language]
  );

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const progress = Math.min(
    100,
    Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)
  );

  const whatsappLink = useMemo(() => {
    if (!items.length) return "#";
    const lines = [
      t("order.whatsappPrefix"),
      ...items.map((i) => `${i.qty} × ${i.name}`),
      `${t("bag.total")}: ₨${subtotal}`,
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  }, [items, subtotal, t]);

  return (
    <AnimatePresence>
      {bagOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBag}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: 90, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 90, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="absolute right-0 top-0 h-full w-full max-w-md p-4"
          >
            <div className="glass flex h-full flex-col rounded-[2rem] bg-white/80 p-5">
              <div className="flex items-center justify-between">
                <h3 className="display-heading text-2xl">{t("bag.title")}</h3>
                <button onClick={closeBag} className="rounded-full bg-ink p-2 text-cream">
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-noor-rose via-noor-gold to-noor-violet transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-ink/55">
                  {subtotal >= FREE_DELIVERY_THRESHOLD
                    ? t("bag.freeDeliveryUnlocked")
                    : t("bag.freeDelivery")}
                </p>
              </div>

              <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <div className="rounded-[1.5rem] bg-white/60 p-6 text-center text-sm text-ink/60">
                    {t("bag.empty")}
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="rounded-[1.5rem] bg-white/70 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-9 w-9 rounded-full"
                            style={{ background: item.color }}
                          />
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-xs text-ink/50">{item.meta}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-ink/40 hover:text-ink"
                          aria-label={t("bag.remove")}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="rounded-full bg-ink/5 p-1.5"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-6 text-center font-semibold">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="rounded-full bg-ink/5 p-1.5"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="font-bold">₨ {(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 border-t border-ink/10 pt-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>{t("bag.total")}</span>
                  <span>₨ {subtotal.toLocaleString()}</span>
                </div>
                <p className="mt-1 text-xs text-ink/50">{t("bag.codNote")}</p>

                <div className="mt-3 grid gap-2">
                  <button
                    disabled={items.length === 0}
                    onClick={openCheckout}
                    className="btn-primary w-full disabled:opacity-40"
                  >
                    {t("bag.checkout")}
                  </button>
                  <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-secondary w-full">
                    <MessageCircle size={16} /> {t("bag.whatsapp")}
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
