"use client";
import { useMemo, useEffect, useRef } from "react";
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

  const drawerRef = useRef(null);
  const closeRef = useRef(null);

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

  // Scroll lock + Escape + focus
  useEffect(() => {
    if (!bagOpen) return;
    document.body.classList.add("scroll-locked");
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") closeBag();
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(
          'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("scroll-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [bagOpen, closeBag]);

  return (
    <AnimatePresence>
      {bagOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={t("bag.title")}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBag}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.aside
            ref={drawerRef}
            initial={{ x: 90, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 90, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col p-3 md:p-4"
            style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="glass flex h-full flex-col overflow-hidden rounded-[2rem] bg-white/85 p-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="display-heading text-2xl">{t("bag.title")}</h3>
                <button
                  ref={closeRef}
                  onClick={closeBag}
                  className="tap-target flex items-center justify-center rounded-full bg-ink p-2 text-cream transition hover:scale-105"
                  style={{ minWidth: "40px", minHeight: "40px" }}
                  aria-label="Close bag"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Free delivery progress */}
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

              {/* Items */}
              <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1" style={{ WebkitOverflowScrolling: "touch" }}>
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
                          className="flex items-center justify-center rounded-full p-2 text-ink/40 transition hover:bg-ink/5 hover:text-ink"
                          style={{ minWidth: "36px", minHeight: "36px" }}
                          aria-label={t("bag.remove")}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="flex items-center justify-center rounded-full bg-ink/5 p-2 transition hover:bg-ink/10"
                            style={{ minWidth: "36px", minHeight: "36px" }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="flex items-center justify-center rounded-full bg-ink/5 p-2 transition hover:bg-ink/10"
                            style={{ minWidth: "36px", minHeight: "36px" }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold">₨ {(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
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
