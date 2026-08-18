"use client";

import { motion } from "framer-motion";
import { Dice5 } from "lucide-react";
import { useT, useLocalized } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { flavors, rituals, PRICE } from "@/lib/data";
import Playground from "@/components/Playground";

const sceneVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.96, y: -24, transition: { duration: 0.3 } },
};

export function HomeScene() {
  const t = useT();
  const setActiveScene = useStore((s) => s.setActiveScene);

  const badges = [
    t("badge.sugar"),
    t("badge.collagen"),
    t("badge.halal"),
    t("badge.pakistan"),
  ];

  return (
    <motion.div
      variants={sceneVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-[11px] uppercase tracking-[0.4em] text-ink/60 md:text-xs">
        {t("kicker")}
      </p>

      <h1 className="display-heading holo-text mt-4 text-6xl leading-none md:text-8xl">
        {t("tagline")}
      </h1>

      <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink/70 md:text-base">
        {t("heroSub")}
      </p>

      <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-2">
        {badges.map((b) => (
          <span key={b} className="chip">
            {b}
          </span>
        ))}
      </div>

      <button
        onClick={() => setActiveScene("shop")}
        className="btn-primary pointer-events-auto mt-10"
      >
        {t("hero.cta.shop")}
      </button>
    </motion.div>
  );
}

export function ShopScene() {
  const t = useT();
  const localize = useLocalized();
  const addToCart = useStore((s) => s.addToCart);
  const setSelectedFlavor = useStore((s) => s.setSelectedFlavor);
  const selectedFlavor = useStore((s) => s.selectedFlavor);

  const surpriseMe = () => {
    const random = flavors[Math.floor(Math.random() * flavors.length)];
    setSelectedFlavor(random.id);
    addToCart(random.id);
  };

  return (
    <motion.div
      variants={sceneVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto p-4 pb-28 md:p-6"
    >
      <div className="glass my-auto w-full max-w-4xl rounded-[2.5rem] bg-white/70 p-5 md:p-10">
        <h2 className="display-heading text-center text-3xl md:text-4xl">
          {t("collection.title")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-xs text-ink/55 md:text-sm">
          {t("collection.sub")}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {flavors.map((flavor) => {
            const isSelected = selectedFlavor === flavor.id;
            return (
              <motion.div
                key={flavor.id}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedFlavor(flavor.id)}
                className={`cursor-pointer rounded-[1.8rem] bg-white/80 p-4 text-center shadow-sm transition md:p-5 ${
                  isSelected ? "ring-2 ring-ink/40" : "hover:shadow-lg"
                }`}
              >
                <div
                  className="mx-auto h-14 w-14 rounded-full md:h-16 md:w-16"
                  style={{
                    background: `linear-gradient(135deg, ${flavor.color}, ${flavor.colorB})`,
                    boxShadow: `0 10px 28px ${flavor.color}55`,
                  }}
                />
                <h3 className="display-heading mt-3 text-lg md:text-xl">{flavor.name}</h3>
                <p className="mt-1 text-[11px] text-ink/55">{localize(flavor.notes)}</p>
                <p className="mt-0.5 text-[10px] font-medium text-ink/40">
                  {localize(flavor.tags)}
                </p>
                <p className="mt-2 text-sm font-bold md:text-base">
                  ₨ {PRICE.toLocaleString()}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(flavor.id);
                  }}
                  className="btn-primary mt-3 w-full !px-3 !py-2 text-xs"
                >
                  {t("product.addToBag")}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <button onClick={surpriseMe} className="btn-secondary">
            <Dice5 size={16} /> Surprise Me
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function RitualsScene() {
  const t = useT();
  const localize = useLocalized();
  const setSelectedFlavor = useStore((s) => s.setSelectedFlavor);
  const setActiveScene = useStore((s) => s.setActiveScene);

  return (
    <motion.div
      variants={sceneVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto p-4 pb-28 md:p-6"
    >
      <div className="glass my-auto w-full max-w-4xl rounded-[2.5rem] bg-white/70 p-5 md:p-10">
        <h2 className="display-heading text-center text-3xl md:text-4xl">
          {t("rituals.title")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-xs text-ink/55 md:text-sm">
          {t("rituals.sub")}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          {rituals.map((ritual) => (
            <div
              key={ritual.id}
              className="flex items-start gap-4 rounded-[1.8rem] bg-white/80 p-4 shadow-sm md:p-5"
            >
              <span className="text-3xl md:text-4xl">{ritual.icon}</span>
              <div className="flex-1">
                <span className="chip">{ritual.time}</span>
                <h3 className="mt-2 text-base font-bold md:text-lg">
                  {localize(ritual.title)}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-ink/60">
                  {localize(ritual.desc)}
                </p>
                <button
                  onClick={() => {
                    setSelectedFlavor(ritual.flavor);
                    setActiveScene("shop");
                  }}
                  className="mt-3 text-xs font-semibold text-ink/80 underline-offset-4 hover:underline"
                >
                  {t("ritual.try")} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function PlayScene() {
  return (
    <motion.div
      variants={sceneVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 z-10 overflow-y-auto p-4 pb-28 md:p-6"
    >
      <div className="glass mx-auto my-6 w-full max-w-5xl rounded-[2.5rem] bg-white/70 p-4 md:p-8">
        <Playground />
      </div>
    </motion.div>
  );
}
