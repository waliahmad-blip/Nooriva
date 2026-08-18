"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { flavors, PRICE } from "@/lib/data";

const RECOMMENDATIONS = {
  glow: "aurora-rose",
  energy: "sunrise-solstice",
  calm: "violet-eclipse",
  gift: "berry-nebula",
};

export default function Noorix() {
  const t = useT();
  const noorixOpen = useStore((s) => s.noorixOpen);
  const toggleNoorix = useStore((s) => s.toggleNoorix);
  const closeNoorix = useStore((s) => s.closeNoorix);
  const openBag = useStore((s) => s.openBag);
  const addToCart = useStore((s) => s.addToCart);

  const [goal, setGoal] = useState(null);
  const rec = goal ? flavors.find((f) => f.id === RECOMMENDATIONS[goal]) : null;

  const options = [
    { id: "glow", label: t("noorix.glow") },
    { id: "energy", label: t("noorix.energy") },
    { id: "calm", label: t("noorix.calm") },
    { id: "gift", label: t("noorix.gift") },
  ];

  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6">
      <AnimatePresence>
        {noorixOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass mb-3 w-[19rem] max-w-[calc(100vw-2rem)] rounded-[1.8rem] bg-white/85 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">{t("noorix.title")}</h3>
                <p className="text-xs text-ink/50">{t("noorix.sub")}</p>
              </div>
              <button onClick={closeNoorix} className="rounded-full bg-ink/5 p-1.5">
                <X size={14} />
              </button>
            </div>

            <p className="mt-3 text-sm text-ink/70">{t("noorix.ask")}</p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {options.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setGoal(o.id)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                    goal === o.id
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/10 bg-white/60 text-ink/70"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            {rec && (
              <div className="mt-4 rounded-[1.2rem] bg-white/70 p-4">
                <p className="text-[10px] uppercase tracking-widest text-ink/45">{t("noorix.recommend")}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full" style={{ background: rec.color }} />
                  <div>
                    <p className="font-bold">{rec.name}</p>
                    <p className="text-xs text-ink/50">₨ {PRICE.toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    addToCart(rec.id);
                    closeNoorix();
                  }}
                  className="btn-primary mt-3 w-full !py-2.5 text-xs"
                >
                  {t("noorix.add")}
                </button>
              </div>
            )}

            <button
              onClick={() => {
                openBag();
                closeNoorix();
              }}
              className="btn-secondary mt-3 w-full !py-2.5 text-xs"
            >
              {t("noorix.openBag")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleNoorix}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream shadow-xl"
        aria-label={t("noorix.title")}
      >
        {noorixOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
