'use client';
import BackToHome from "@/components/ui/BackToHome";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

const QuantumBotanicalMatrix = dynamic(() => import("@/components/three/QuantumBotanicalMatrix"), { ssr: false });
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles, Crown } from "lucide-react";
import {
  BRAND,
  COMMERCE,
  NOORISH_GOLD,
  HERO,
  PILLARS,
  FLAVOR_ARCHITECTURE,
  SKUS,
  FAQS,
} from "@/lib/noorishGold";

const CYBER_COLORS = ["#a78bfa", "#22d3ee", "#ff8fb2", "#5eead4", "#e2e8f0"];
const orderMessage = encodeURIComponent("Hi NOORIVA! I want to learn more about NOORISH GOLD and order it in Pakistan.");
const orderUrl = `https://wa.me/${COMMERCE.whatsappNumber}?text=${orderMessage}`;

function AuroraField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 15%, rgba(34, 211, 238, 0.05) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

function FloatingParticles() {
  const particles = useMemo(() => [
    { id: 1, left: 20, top: 25, size: 2 },
    { id: 2, left: 80, top: 35, size: 2.5 },
    { id: 3, left: 35, top: 70, size: 2 },
    { id: 4, left: 65, top: 80, size: 2 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 8 + p.id * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
    <main className="relative min-h-screen overflow-x-clip pb-36">
      <BackToHome className="fixed top-20 left-4 sm:left-6 z-30" />
      <AuroraField />

      <section className="section-shell relative flex min-h-[90vh] items-center justify-center py-24">
        <FloatingParticles />
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="glass relative z-10 overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white/75 p-8 shadow-lg backdrop-blur-xl md:p-14">
          <motion.div className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-50" style={{ background: "linear-gradient(135deg, #a78bfa15, #22d3ee15, transparent)" }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
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
              <Link href="/noorish-gold#rituals" className="btn-secondary">View 12 Rituals</Link>
              <Link href="/ingredients" className="btn-secondary">Botanical Story</Link>
            </motion.div>
            
            {/* 3D Quantum Botanical Matrix with 7 Orbiting Nodes */}
            <div className="mt-10 rounded-[2.5rem] border border-cyan-400/20 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 p-4 shadow-xl backdrop-blur-md">
              <div className="mb-2 text-center text-[10px] font-mono tracking-widest text-cyan-600 uppercase">
                ✦ 3D QUANTUM BOTANICAL MATRIX // 7 INTERACTIVE ORBITING NODES ✦
              </div>
              <QuantumBotanicalMatrix />
              <div className="text-center text-[10px] font-mono text-ink/40">
                HOVER OVER ANY BIO-NODE TO INSPECT BIOCHEMICAL PATHWAY
              </div>
            </div>
  
<motion.div variants={revealUp} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[{ label: "Nature", value: "100% Botanical" }, { label: "Heart", value: "One Golden Base" }, { label: "Ritual", value: "Precious 150ml" }, { label: "Feel", value: "Deep Amber Glow" }].map((item) => (
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
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#a78bfa] to-[#22d3ee] text-white"><Crown size={18} /></div>
              <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="botanical-story" className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="display-heading text-4xl md:text-5xl">Inside Nature&apos;s Golden Heart</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 md:text-base">We don&apos;t share the recipe — we share the feeling. Six botanicals, one golden heart, and a ritual that feels like nature itself.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass rounded-[2.5rem] border border-ink/10 bg-white/75 p-8 text-center shadow-sm backdrop-blur md:p-12">
          <Sparkles className="mx-auto text-[#22d3ee]" size={28} />
          <h3 className="display-heading mt-4 text-3xl md:text-4xl">One Golden Heart</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink/60 md:text-base">Every NOORIVA ritual is built on the same golden botanical heart — a signature blend that gives each pouch its unmistakable warmth, body, and glow. The exact recipe stays ours. The feeling is yours.</p>
          <Link href="/ingredients" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5eead4] to-[#a78bfa] px-7 py-3.5 text-sm font-bold text-ink transition hover:scale-105">
            Explore the Botanical Story <ArrowRight size={16} />
          </Link>
        </motion.div>
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

      

      

      

      

      {/* ═══ BIOTECH EXTRACTION & THERMAL STABILITY HUD ═══ */}
      <section className="section-shell mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mb-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#22d3ee] backdrop-blur-md">
            <Sparkles size={14} /> Industrial Telemetry
          </div>
          <h2 className="display-heading text-4xl md:text-5xl mt-4">Thermal & Cellular Architecture</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 md:text-base">
            Engineered for high-temperature shelf stability without degrading heat-sensitive botanicals.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass rounded-[2rem] p-6 text-center border border-ink/10 bg-white/75 shadow-sm">
            <span className="text-3xl">🔥</span>
            <div className="mt-3 text-2xl font-black text-ink">80–85°C</div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#22d3ee] mt-1">Hot-Fill Compatible</p>
            <p className="text-xs text-ink/60 mt-2">Short-duration pasteurization protects saffron crocin and rose volatiles.</p>
          </div>

          <div className="glass rounded-[2rem] p-6 text-center border border-ink/10 bg-white/75 shadow-sm">
            <span className="text-3xl">💧</span>
            <div className="mt-3 text-2xl font-black text-ink">0% Sediment</div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#22d3ee] mt-1">100% Water-Soluble</p>
            <p className="text-xs text-ink/60 mt-2">Clarified amla and date syrup prevent gritty sludge at pouch bottom.</p>
          </div>

          <div className="glass rounded-[2rem] p-6 text-center border border-ink/10 bg-white/75 shadow-sm">
            <span className="text-3xl">⏳</span>
            <div className="mt-3 text-2xl font-black text-ink">12 Months</div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#22d3ee] mt-1">Ambient Stability</p>
            <p className="text-xs text-ink/60 mt-2">Zero refrigeration required before opening; multi-layer light barrier.</p>
          </div>

          <div className="glass rounded-[2rem] p-6 text-center border border-ink/10 bg-white/75 shadow-sm">
            <span className="text-3xl">🌿</span>
            <div className="mt-3 text-2xl font-black text-ink">Golden Ratio</div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#a78bfa] mt-1">Signature Core</p>
            <p className="text-xs text-ink/60 mt-2">Added at Phase C to every 150ml pouch for the signature brand undertone.</p>
          </div>
        </div>
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
            <Link href="/noorish-gold#rituals" className="btn-secondary">Browse All 12 Rituals</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
