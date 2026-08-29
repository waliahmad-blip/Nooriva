"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Check, Star } from "lucide-react";
import { useT, useLocalized } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import {
  flavors,
  ingredients,
  trust,
  rituals,
  tiers,
  makers,
  testimonials,
  faqs,
  PRICE,
} from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  const t = useT();
  const setActiveScene = useStore((s) => s.setActiveScene);
  // AnimatedLogo moved to TopBar
  const badges = [
    t("badge.sugar"),
    t("badge.collagen"),
    t("badge.halal"),
    t("badge.pakistan"),
  ];

  return (
    <section className="section-shell flex min-h-screen flex-col items-center justify-center text-center">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-xs uppercase tracking-[0.35em] text-ink/50"
      >
        {t("kicker")}
      </motion.p>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.1 }}
        className="display-heading holo-text mt-4 text-6xl md:text-8xl"
      >
        {t("tagline")}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.2 }}
        className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg"
      >
        {t("heroSub")}
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <button onClick={() => setActiveScene("flavours")} className="btn-primary">{t("hero.cta.shop")}</button>
        <button onClick={() => setActiveScene("rituals")} className="btn-secondary">{t("hero.cta.ritual")}</button>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-2"
      >
        {badges.map((b) => (
          <span key={b} className="chip">{b}</span>
        ))}
      </motion.div>
    </section>
  );
}

export function Collection() {
  const t = useT();
  const localize = useLocalized();
  const addToCart = useStore((s) => s.addToCart);
  const setSelectedFlavor = useStore((s) => s.setSelectedFlavor);

  return (
    <section id="flavours" className="section-shell py-24">
      <SectionHeading title={t("collection.title")} sub={t("collection.sub")} />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {flavors.map((flavor, i) => (
          <motion.div
            key={flavor.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            onMouseEnter={() => setSelectedFlavor(flavor.id)}
            onClick={() => setSelectedFlavor(flavor.id)}
            className="glass cursor-pointer rounded-[2rem] p-6 transition hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-10 w-10 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${flavor.color}, ${flavor.colorB})`,
                  boxShadow: `0 8px 24px ${flavor.color}44`,
                }}
              />
              <h3 className="display-heading text-2xl">{flavor.name}</h3>
            </div>

            <p className="mt-3 text-sm text-ink/60">{localize(flavor.notes)}</p>
            <p className="mt-1 text-xs font-medium text-ink/40">{localize(flavor.tags)}</p>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-lg font-bold">₨ {PRICE.toLocaleString()}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(flavor.id);
                }}
                className="btn-primary !px-5 !py-2.5 text-xs"
              >
                {t("product.addToBag")}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Ingredients() {
  const t = useT();
  const localize = useLocalized();

  return (
    <section id="inside" className="section-shell py-24">
      <SectionHeading title={t("ingredients.title")} sub={t("ingredients.sub")} />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ingredients.map((ing, i) => (
          <motion.div
            key={ing.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="glass rounded-[2rem] p-6"
          >
            <div className="holo-text display-heading text-4xl">{ing.value}</div>
            <h3 className="mt-3 text-lg font-semibold">{localize(ing.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{localize(ing.desc)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Trust() {
  const t = useT();
  const localize = useLocalized();

  return (
    <section className="section-shell py-24">
      <SectionHeading title={t("trust.title")} />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="glass rounded-[2rem] p-6"
          >
            <div className="text-4xl">{item.icon}</div>
            <h3 className="mt-4 text-lg font-semibold">{localize(item.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{localize(item.desc)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Rituals() {
  const t = useT();
  const localize = useLocalized();
  const setSelectedFlavor = useStore((s) => s.setSelectedFlavor);
  const setActiveScene = useStore((s) => s.setActiveScene);

  return (
    <section id="rituals" className="section-shell py-24">
      <SectionHeading title={t("rituals.title")} sub={t("rituals.sub")} />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rituals.map((ritual, i) => (
          <motion.button
            key={ritual.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            onClick={() => {
              setSelectedFlavor(ritual.flavor);
              setActiveScene("flavours");
            }}
            className="glass rounded-[2rem] p-6 text-left transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{ritual.icon}</span>
              <span className="chip">{ritual.time}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold">{localize(ritual.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{localize(ritual.desc)}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-ink/80">
              {t("ritual.try")} →
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export function Society() {
  const t = useT();
  const localize = useLocalized();
  const addToCart = useStore((s) => s.addToCart);

  return (
    <section id="society" className="section-shell py-24">
      <SectionHeading title={t("society.title")} sub={t("society.sub")} />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={`glass relative rounded-[2.5rem] p-8 ${
              tier.mostLoved ? "ring-2 ring-ink/20" : ""
            }`}
          >
            {tier.mostLoved && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-1 text-xs font-bold text-cream">
                {t("tier.mostLoved")}
              </span>
            )}

            <h3 className="display-heading text-3xl">{localize(tier.name)}</h3>
            <div className="mt-3 text-4xl font-bold">₨ {tier.price.toLocaleString()}</div>
            <div className="mt-1 text-sm text-ink/55">
              {tier.pouches} pouch · {tier.servings} servings
              {tier.save > 0 && ` · save ₨${tier.save}`}
            </div>

            <ul className="mt-6 space-y-3">
              {tier.features.map((f) => (
                <li key={f.en} className="flex items-start gap-2 text-sm text-ink/70">
                  <Check size={16} className="mt-0.5 shrink-0" />
                  {localize(f)}
                </li>
              ))}
            </ul>

            <button
              onClick={() => addToCart(tier.id)}
              className={`mt-8 w-full ${tier.mostLoved ? "btn-primary" : "btn-secondary"}`}
            >
              {t("tier.addToBag")}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Makers() {
  const t = useT();
  const localize = useLocalized();

  return (
    <section className="section-shell py-24">
      <SectionHeading title={t("makers.title")} sub={t("makers.sub")} />

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {makers.map((maker, i) => (
          <motion.div
            key={maker.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="glass rounded-[2rem] p-6 text-center"
          >
            <div className="text-5xl">{maker.icon}</div>
            <h3 className="mt-4 font-semibold">{maker.name}</h3>
            <p className="mt-1 text-xs text-ink/55">{localize(maker.role)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  const t = useT();
  const localize = useLocalized();

  return (
    <section className="section-shell py-24">
      <SectionHeading title={t("testimonials.title")} sub={t("testimonials.sub")} />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {testimonials.map((tm, i) => (
          <motion.figure
            key={tm.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="glass rounded-[2rem] p-7"
          >
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={16} fill="currentColor" />
              ))}
            </div>
            <blockquote className="mt-4 text-base leading-relaxed text-ink/75">
              “{localize(tm.text)}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="text-3xl">{tm.icon}</span>
              <span>
                <span className="block font-semibold">{tm.name}</span>
                <span className="block text-xs text-ink/50">
                  {localize(tm.city)} · {localize(tm.tier)}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export function ReferralSection() {
  return (
    <section className="section-shell py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        onClick={function() {
          var text = encodeURIComponent('Hi NOORIVA! I want to refer a friend for the Rs500 referral program.');
          window.open('https://wa.me/923210550303?text=' + text, '_blank');
        }}
        className="relative overflow-hidden rounded-[2rem] p-6 md:p-8 cursor-pointer group"
        style={{ background: 'linear-gradient(135deg, #ff8fb2, #a78bfa, #67e8f9)' }}
      >
        <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'noorix-shimmer 3s ease-in-out infinite' }} />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🎁</div>
            <div>
              <h3 className="text-white font-bold text-xl">Give Rs500, Get Rs500</h3>
              <p className="text-white/80 text-sm mt-1">Refer a friend and you both get Rs500 off</p>
            </div>
          </div>
          <span className="text-white font-bold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Refer Now →
          </span>
        </div>
      </motion.div>
    </section>
  );
}

export function FAQ() {
  const t = useT();
  const localize = useLocalized();
  const [open, setOpen] = useState(faqs[0]?.id || null);

  return (
    <section id="faq" className="section-shell py-24">
      <SectionHeading title={t("faq.title")} sub={t("faq.sub")} />

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faqs.map((faq) => {
          const isOpen = open === faq.id;
          return (
            <div key={faq.id} className="glass overflow-hidden rounded-[1.5rem]">
              <button
                onClick={() => setOpen(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold">{localize(faq.q)}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm leading-relaxed text-ink/65">
                  {localize(faq.a)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SectionHeading({ title, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl"
    >
      <h2 className="display-heading text-4xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-ink/60">{sub}</p>}
    </motion.div>
  );
}
