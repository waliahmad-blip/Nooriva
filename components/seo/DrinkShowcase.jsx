'use client';
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";
import {
  BRAND,
  COMMERCE,
  NOORISH_GOLD,
  SKUS,
  INGREDIENT_MATRIX,
  FLAVOR_ARCHITECTURE,
} from "@/lib/noorishGold";

/* ═══ Shared animation primitives ═══ */
function ScrollProgress({ color }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
      style={{ scaleX, background: `linear-gradient(90deg, ${color}, #C79A44, ${color})` }}
    />
  );
}

function AuroraField({ colors }) {
  const blobs = useMemo(() => colors.slice(0, 4).map((color, i) => ({
    color, startX: i % 2 === 0 ? -15 : 15, startY: i * 8 - 5,
    duration: 14 + i * 4, delay: i * 1.5,
  })), [colors]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.div key={i} className="absolute rounded-full opacity-20 blur-[60px]"
          style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`, width: "55vmax", height: "55vmax" }}
          initial={{ x: `${b.startX}vw`, y: `${b.startY}vh` }}
          animate={{ x: [`${b.startX}vw`, `${b.startX * -0.5}vw`, `${b.startX}vw`], y: [`${b.startY}vh`, `${b.startY + 8}vh`, `${b.startY}vh`] }}
          transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function FloatingParticles({ colors }) {
  const particles = useMemo(() => Array.from({ length: 10 }).map((_, i) => ({
    id: i, color: colors[i % colors.length], size: 3 + Math.random() * 7,
    left: Math.random() * 100, top: Math.random() * 100, drift: (Math.random() - 0.5) * 40,
    duration: 6 + Math.random() * 8, delay: Math.random() * 4,
  })), [colors]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ background: p.color, width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%`, filter: "blur(1px)" }}
          animate={{ y: [0, -30 - Math.random() * 60, 0], x: [0, p.drift, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const revealUp = { hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

function SkuCard({ sku, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 10, y: ((e.clientY - rect.top) / rect.height - 0.5) * -10 });
  };
  return (
    <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}>
      <Link href={`/drinks/${sku.slug}`} className="group relative block h-full" onMouseMove={handleMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }} aria-label={`${sku.name} — ${sku.slogan}`}>
        <motion.div className="glass relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white/70 p-6 backdrop-blur-md"
          style={{ borderTop: `4px solid ${sku.frameColour}`, transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`, boxShadow: hovered ? `0 20px 60px -10px ${sku.frameColour}40, 0 0 0 1px ${sku.frameColour}30` : "0 2px 12px rgba(0,0,0,0.08)" }}
          transition={{ transform: { duration: 0.2 }, boxShadow: { duration: 0.3 } }}>
          <motion.div className="pointer-events-none absolute inset-0 opacity-0" style={{ background: `radial-gradient(circle at 50% 0%, ${sku.frameColour}18 0%, transparent 50%)` }} animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }} />
          <div className="relative mb-4 flex items-center gap-3">
            <motion.div className="h-12 w-12 rounded-full" style={{ background: `linear-gradient(135deg, ${sku.frameColour}, ${sku.frameColour}aa)`, boxShadow: `0 8px 24px ${sku.frameColour}50` }} animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 6 : 0 }} transition={{ duration: 0.3 }} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">{sku.illustrationStyle}</div>
              <h3 className="mt-1 display-heading text-xl" style={{ color: sku.frameColour }}>{sku.name}</h3>
            </div>
          </div>
          <p className="text-sm font-semibold italic text-ink/70">"{sku.slogan}"</p>
          <motion.div className="mt-4 flex items-center gap-2 text-xs font-semibold text-ink/50" animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.3 }}>Explore <ArrowRight size={14} /></motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ═══ Main Drink Showcase ═══ */
export default function DrinkShowcase({ drink }) {
  const drinkColors = [drink.frameColour, drink.backgroundColour, '#E7D3A8', '#C79A44'];
  const whatsappMessage = encodeURIComponent(`Hi NOORIVA! I want to order ${drink.name}.`);
  const whatsappUrl = `https://wa.me/${COMMERCE.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <ScrollProgress color={drink.frameColour} />
      <AuroraField colors={drinkColors} />

      {/* ═══ BREADCRUMB ═══ */}
      <nav aria-label="Breadcrumb" className="section-shell mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
        <Link href="/" className="transition-colors hover:text-ink">{BRAND.name}</Link>
        <span>/</span>
        <Link href="/#flavours" className="transition-colors hover:text-ink">NOORISH GOLD Rituals</Link>
        <span>/</span>
        <span className="text-ink/70">{drink.name}</span>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="section-shell relative mb-16">
        <FloatingParticles colors={drinkColors} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="glass relative z-10 overflow-hidden rounded-[2.5rem] border p-8 shadow-lg backdrop-blur-xl md:p-14"
          style={{ borderColor: `${drink.frameColour}33`, background: `linear-gradient(135deg, ${drink.backgroundColour}18, #ffffffcc 60%, ${drink.frameColour}12)` }}
        >
          {/* Animated glow border */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-40"
            style={{ background: `radial-gradient(circle at 50% 0%, ${drink.frameColour}15 0%, transparent 50%)` }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <motion.div variants={revealUp} className="mb-3 inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ borderColor: `${drink.frameColour}44`, color: drink.frameColour, backgroundColor: `${drink.backgroundColour}55` }}>
                <Sparkles size={12} className="mr-1.5" /> NOORISH GOLD Ritual
              </motion.div>

              <motion.h1 variants={revealUp} className="display-heading text-6xl leading-none md:text-8xl" style={{ color: drink.frameColour }}>
                {drink.name}
              </motion.h1>

              <motion.p variants={revealUp} className="mt-5 text-3xl font-bold leading-tight md:text-5xl" style={{ color: drink.frameColour }}>
                &ldquo;{drink.slogan}&rdquo;
              </motion.p>

              <motion.p variants={revealUp} className="mt-6 text-base leading-relaxed text-ink/70 md:text-lg">
                {drink.illustrationStyle}. Built on the same NOORISH GOLD signature hero complex added at {NOORISH_GOLD.usageRatio} to every 150ml pouch. {drink.notes}.
              </motion.p>

              <motion.div variants={revealUp} className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl} className="btn-primary">Order {drink.name}</a>
                <Link href="/#flavours" className="btn-secondary">Browse All 12 Rituals</Link>
                <Link href="/noorish-gold#ingredient-matrix" className="btn-secondary">View Ingredient Matrix</Link>
              </motion.div>

              <motion.div variants={revealUp} className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Signature Base", value: NOORISH_GOLD.name },
                  { label: "Dose", value: `${NOORISH_GOLD.usageRatio} · ${NOORISH_GOLD.pouchDose}` },
                  { label: "Physical", value: `${NOORISH_GOLD.physicalState}, ${NOORISH_GOLD.solubility}` },
                  { label: "Thermal", value: NOORISH_GOLD.thermalStability },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.75rem] border border-ink/10 bg-white/70 p-5 shadow-sm backdrop-blur">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">{item.label}</div>
                    <div className="mt-2 text-sm font-semibold text-ink/75">{item.value}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ═══ Aside Card ═══ */}
            <motion.aside variants={revealUp} className="w-full lg:w-[340px]">
              <motion.div
                className="rounded-[2.5rem] p-7"
                style={{ backgroundColor: drink.backgroundColour, border: `2px solid ${drink.frameColour}`, color: drink.frameColour, boxShadow: `0 28px 70px ${drink.frameColour}22` }}
                whileHover={{ y: -5, boxShadow: `0 35px 80px ${drink.frameColour}33` }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">{BRAND.tagline}</div>
                <div className="mt-3 display-heading text-4xl">{drink.illustrationStyle}</div>
                <motion.div
                  className="mt-5 h-32 w-full rounded-[1.5rem]"
                  style={{ background: `linear-gradient(135deg, ${drink.frameColour}, ${drink.frameColour}88)` }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="mt-5 space-y-3 text-sm font-semibold opacity-90">
                  <div className="flex items-center justify-between"><span>Signature Base</span><span>{NOORISH_GOLD.name}</span></div>
                  <div className="flex items-center justify-between"><span>Dose</span><span>{NOORISH_GOLD.usageRatio}</span></div>
                  <div className="flex items-center justify-between"><span>Pouch Size</span><span>150ml</span></div>
                  <div className="flex items-center justify-between"><span>Positioning</span><span>Pakistan</span></div>
                </div>
                <div className="mt-7">
                  <a href={whatsappUrl} className="block w-full rounded-full px-5 py-3 text-center text-sm font-bold transition hover:opacity-90"
                    style={{ backgroundColor: drink.frameColour, color: drink.backgroundColour }}>
                    Order on WhatsApp
                  </a>
                </div>
              </motion.div>
            </motion.aside>
          </div>
        </motion.div>
      </section>

      {/* ═══ FLAVOR ARCHITECTURE ═══ */}
      <section className="section-shell mt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl" style={{ color: drink.frameColour }}>Flavor & Aroma Architecture</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 md:text-base">
            Every NOORISH GOLD ritual shares the same signature base while allowing the selected fruit, botanical, and luxury layer to shine.
          </p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FLAVOR_ARCHITECTURE.map((layer, i) => (
            <motion.div key={layer.layer} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass h-full rounded-[2rem] border border-ink/10 bg-white/70 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-ink/45">{layer.layer}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{layer.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ INGREDIENT MATRIX ═══ */}
      <section className="section-shell mt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl" style={{ color: drink.frameColour }}>The NOORISH GOLD Ingredient Matrix</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 md:text-base">
            A finalized, production-ready composition used across every NOORIVA pouch.
          </p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INGREDIENT_MATRIX.map((ingredient, i) => (
            <motion.div key={ingredient.name} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass h-full rounded-[2rem] border border-ink/10 bg-white/70 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-ink">{ingredient.name}</h3>
                <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${drink.frameColour}15`, color: drink.frameColour }}>
                  {ingredient.percent.toFixed(2)}%
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{ingredient.foodTechPurpose}</p>
              <p className="mt-3 text-xs leading-relaxed text-ink/45">{ingredient.flavorRole}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ EXPLORE ALL RITUALS ═══ */}
      <section className="section-shell mt-16 mb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">Explore All 12 NOORISH GOLD Rituals</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SKUS.map((sku, index) => (<SkuCard key={sku.id} sku={sku} index={index} />))}
        </div>
      </section>
    </main>
  );
}
