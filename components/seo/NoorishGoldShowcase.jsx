'use client';
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles, Crown } from "lucide-react";
import {
  BRAND,
  COMMERCE,
  NOORISH_GOLD,
  HERO,
  PILLARS,
  INGREDIENT_MATRIX,
  INGREDIENT_MATRIX_NOTE,
  FLAVOR_ARCHITECTURE,
  FUNCTIONAL_LAYERING_PER_POUCH,
  MANUFACTURING_PROTOCOL,
  STABILITY_AND_SHELF_LIFE,
  COMMERCIAL_NOTES,
  FINAL_VERDICT,
  SKUS,
  FAQS,
} from "@/lib/noorishGold";

const GOLD_COLORS = ["#E7D3A8", "#C79A44", "#8E6B3F", "#F3E9D8", "#D9B7A8"];
const orderMessage = encodeURIComponent("Hi NOORIVA! I want to learn more about NOORISH GOLD and order it in Pakistan.");
const orderUrl = `https://wa.me/${COMMERCE.whatsappNumber}?text=${orderMessage}`;

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #E7D3A8, #C79A44, #8E6B3F, #E7D3A8)" }}
    />
  );
}

function AuroraField() {
  const blobs = useMemo(
    () => GOLD_COLORS.slice(0, 4).map((color, i) => ({
      color, startX: i % 2 === 0 ? -15 : 15, startY: i * 8 - 5,
      duration: 14 + i * 4, delay: i * 1.5,
    })), []
  );
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

function FloatingParticles({ colors = GOLD_COLORS }) {
  const particles = useMemo(() => Array.from({ length: 14 }).map((_, i) => ({
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
            <motion.div className="h-14 w-14 rounded-full" style={{ background: `linear-gradient(135deg, ${sku.frameColour}, ${sku.frameColour}aa)`, boxShadow: `0 8px 24px ${sku.frameColour}50` }} animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 6 : 0 }} transition={{ duration: 0.3 }} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">{sku.illustrationStyle}</div>
              <h3 className="mt-1 display-heading text-2xl" style={{ color: sku.frameColour }}>{sku.name}</h3>
            </div>
          </div>
          <p className="text-sm font-semibold italic text-ink/70">"{sku.slogan}"</p>
          <motion.div className="mt-4 flex items-center gap-2 text-xs font-semibold text-ink/50" animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.3 }}>Explore Ritual <ArrowRight size={14} /></motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function FaqItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: index * 0.05 }} className="glass overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white/75 backdrop-blur-md">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between gap-4 p-6 text-left" aria-expanded={isOpen} aria-label={faq.question}>
        <span className="font-semibold text-ink">{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="flex-shrink-0 text-ink/50"><ChevronDown size={20} /></motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <p className="px-6 pb-6 text-sm leading-relaxed text-ink/65">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function NoorishGoldShowcase() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ScrollProgress />
      <AuroraField />

      <section className="section-shell relative flex min-h-[90vh] items-center justify-center py-24">
        <FloatingParticles />
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="glass relative z-10 overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white/75 p-8 shadow-lg backdrop-blur-xl md:p-14">
          <motion.div className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-50" style={{ background: "linear-gradient(135deg, #E7D3A815, #C79A4415, transparent)" }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div variants={revealUp} className="mb-5 flex flex-wrap justify-center gap-2">
              {HERO.badges.map((badge) => (
                <span key={badge} className="inline-flex items-center rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/65">{badge}</span>
              ))}
            </motion.div>
            <motion.div variants={revealUp} className="mb-3 flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-ink/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink/45">{HERO.kicker}</span>
              <Sparkles size={14} className="text-ink/40" />
            </motion.div>
            <motion.h1 variants={revealUp} className="display-heading text-6xl leading-none md:text-8xl">NOORISH GOLD</motion.h1>
            <motion.p variants={revealUp} className="mt-6 text-xl font-bold text-ink/75 md:text-3xl">{HERO.subtitle}</motion.p>
            <motion.p variants={revealUp} className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-ink/65 md:text-base">{HERO.description}</motion.p>
            <motion.div variants={revealUp} className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={orderUrl} className="btn-primary">Order NOORISH GOLD</a>
              <Link href="/#flavours" className="btn-secondary">View 12 Rituals</Link>
              <a href="#ingredient-matrix" className="btn-secondary">Ingredient Matrix</a>
            </motion.div>
            <motion.div variants={revealUp} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[{ label: "Status", value: NOORISH_GOLD.status }, { label: "Dose", value: NOORISH_GOLD.usageRatio }, { label: "Pouch", value: NOORISH_GOLD.pouchDose }, { label: "Physical", value: NOORISH_GOLD.physicalState }].map((item) => (
                <div key={item.label} className="rounded-[1.75rem] border border-ink/10 bg-white/80 p-5 text-left">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">{item.label}</div>
                  <div className="mt-2 text-sm font-semibold text-ink/75">{item.value}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="pillars" className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">Why NOORISH GOLD Works</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 md:text-base">One signature base creates instant brand recognition across all 12 NOORIVA rituals.</p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass h-full rounded-[2rem] border border-ink/10 bg-white/75 p-7 backdrop-blur-md transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E7D3A8] to-[#C79A44] text-white"><Crown size={18} /></div>
              <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="ingredient-matrix" className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">Complete Ingredient Matrix</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 md:text-base">Exact composition as finalized. No additions or subtractions.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white/70 shadow-sm backdrop-blur">
          <div className="hidden md:block"><table className="w-full border-collapse text-left text-sm">
            <thead className="bg-ink/5 text-ink/70"><tr><th className="px-6 py-4 font-semibold uppercase tracking-[0.12em]">Ingredient</th><th className="px-6 py-4 font-semibold uppercase tracking-[0.12em]">%</th><th className="px-6 py-4 font-semibold uppercase tracking-[0.12em]">Food Tech Purpose</th><th className="px-6 py-4 font-semibold uppercase tracking-[0.12em]">Flavor Role</th></tr></thead>
            <tbody>{INGREDIENT_MATRIX.map((item) => (<tr key={item.name} className="border-t border-ink/10 hover:bg-[#E7D3A8]/5 transition-colors"><td className="px-6 py-5 align-top font-semibold text-ink">{item.name}</td><td className="px-6 py-5 align-top whitespace-nowrap font-bold text-ink/80">{item.percent.toFixed(2)}%</td><td className="px-6 py-5 align-top text-ink/65">{item.foodTechPurpose}</td><td className="px-6 py-5 align-top text-ink/65">{item.flavorRole}</td></tr>))}</tbody>
          </table></div>
          <div className="grid gap-4 p-4 md:hidden">{INGREDIENT_MATRIX.map((item) => (<div key={item.name} className="rounded-[1.75rem] border border-ink/10 bg-white/80 p-5"><div className="flex items-start justify-between gap-4"><h3 className="font-semibold text-ink">{item.name}</h3><span className="shrink-0 rounded-full bg-[#E7D3A8]/20 px-3 py-1 text-xs font-bold text-ink/75">{item.percent.toFixed(2)}%</span></div><p className="mt-3 text-sm leading-relaxed text-ink/65">{item.foodTechPurpose}</p><p className="mt-2 text-xs leading-relaxed text-ink/50">{item.flavorRole}</p></div>))}</div>
        </motion.div>
        {INGREDIENT_MATRIX_NOTE ? <p className="mt-6 rounded-2xl border border-ink/10 bg-white/60 p-4 text-xs text-ink/55">{INGREDIENT_MATRIX_NOTE}</p> : null}
      </section>

      <section id="flavor-architecture" className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">Flavor & Aroma Architecture</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FLAVOR_ARCHITECTURE.map((layer, i) => (
            <motion.div key={layer.layer} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass h-full rounded-[2rem] border border-ink/10 bg-white/75 p-7 backdrop-blur-md transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">{layer.layer}</div>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{layer.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="functional-layering" className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">Functional Layering Per Pouch</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 md:text-base">Each 150ml pouch contains 18g of NOORISH GOLD, dosed at 12% w/w.</p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FUNCTIONAL_LAYERING_PER_POUCH.map((item, i) => (
            <motion.div key={item.ingredient} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass h-full rounded-[2rem] border border-ink/10 bg-white/75 p-7 backdrop-blur-md transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between gap-3"><h3 className="font-semibold text-ink">{item.ingredient}</h3><span className="rounded-full bg-[#E7D3A8]/20 px-3 py-1 text-xs font-bold text-ink/70">{item.amount}</span></div>
              <p className="mt-4 text-sm leading-relaxed text-ink/65">{item.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="manufacturing" className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">Manufacturing & Integration Protocol</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white/70 shadow-sm backdrop-blur">
          <div className="hidden md:block"><table className="w-full border-collapse text-left text-sm">
            <thead className="bg-ink/5 text-ink/70"><tr><th className="px-6 py-4 font-semibold uppercase tracking-[0.12em]">Step</th><th className="px-6 py-4 font-semibold uppercase tracking-[0.12em]">Protocol</th><th className="px-6 py-4 font-semibold uppercase tracking-[0.12em]">Rationale</th></tr></thead>
            <tbody>{MANUFACTURING_PROTOCOL.map((row) => (<tr key={row.step} className="border-t border-ink/10 hover:bg-[#E7D3A8]/5 transition-colors"><td className="px-6 py-5 font-semibold text-ink">{row.step}</td><td className="px-6 py-5 text-ink/70">{row.protocol}</td><td className="px-6 py-5 text-ink/60">{row.rationale}</td></tr>))}</tbody>
          </table></div>
          <div className="grid gap-4 p-4 md:hidden">{MANUFACTURING_PROTOCOL.map((row) => (<div key={row.step} className="rounded-[1.75rem] border border-ink/10 bg-white/80 p-5"><div className="text-xs font-bold uppercase tracking-[0.16em] text-ink/45">{row.step}</div><p className="mt-3 text-sm font-medium text-ink">{row.protocol}</p><p className="mt-3 text-sm leading-relaxed text-ink/60">{row.rationale}</p></div>))}</div>
        </motion.div>
      </section>

      <section id="stability" className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">Stability & Shelf-Life Performance</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STABILITY_AND_SHELF_LIFE.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass h-full rounded-[2rem] border border-ink/10 bg-white/75 p-7 backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-700">✓</div>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="commercial" className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">Commercial & Regulatory Notes</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2">
          {COMMERCIAL_NOTES.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass h-full rounded-[2rem] border border-ink/10 bg-white/75 p-7 backdrop-blur-md"><p className="text-sm leading-relaxed text-ink/70">{item}</p></motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative mt-10 overflow-hidden rounded-[2.5rem] p-8 md:p-12">
          <motion.div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #4A2C1A, #8E6B3F, #C79A44, #4A2C1A)", backgroundSize: "200% 200%" }} animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <FloatingParticles colors={["#E7D3A8", "#C79A44", "#FFD7A1", "#F3E9D8"]} />
          <div className="relative text-white">
            <h3 className="display-heading text-3xl md:text-5xl">{FINAL_VERDICT.title}</h3>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed opacity-90 md:text-base">{FINAL_VERDICT.description}</p>
            <p className="mt-6 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">{FINAL_VERDICT.status}</p>
          </div>
        </motion.div>
      </section>

      <section id="rituals" className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">12 NOORISH GOLD Rituals</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 md:text-base">Every SKU shares the same production-ready gold base.</p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SKUS.map((sku, index) => (<SkuCard key={sku.id} sku={sku} index={index} />))}
        </div>
      </section>

      <section id="faq" className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">NOORISH GOLD FAQ</h2>
        </motion.div>
        <div className="mx-auto max-w-4xl space-y-4">{FAQS.map((faq, index) => (<FaqItem key={faq.question} faq={faq} index={index} />))}</div>
      </section>

      <section className="section-shell mb-24">
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="glass relative overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white/75 p-8 text-center shadow-sm backdrop-blur md:p-12">
          <FloatingParticles />
          <h2 className="display-heading text-4xl md:text-5xl">Drink Your Glow with NOORISH GOLD</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink/60 md:text-base">Choose one of the 12 glow rituals or order the full NOORISH GOLD collection for Pakistan.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={orderUrl} className="btn-primary">Order on WhatsApp</a>
            <Link href="/#flavours" className="btn-secondary">Browse All 12 Rituals</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
