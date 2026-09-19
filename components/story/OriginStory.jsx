'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Leaf, Sparkles, ArrowRight, Flame, ShieldCheck, Heart } from 'lucide-react';
import BackToHome from '@/components/ui/BackToHome';

const ORIGIN = [
  {
    phase: 'The Search',
    text: 'While wandering the vibrant streets of Koh Samui with the love of her life, Wali, Noorish was searching for pure wellness — fresh fruits, local spices, wild forest honey, and ancient rituals to rejuvenate body and soul.',
  },
  {
    phase: 'The Spark',
    text: 'Then came the spark. Tucked away on a convenience-store shelf sat a small pink pouch: a jelly drink that promised collagen, not calories. She tore it open and tasted something unexpected — dignity. Someone had finally decided that a woman’s quick snack could double as her skincare.',
  },
  {
    phase: 'The Promise',
    text: 'She turned to Wali and said, “I know 40 million women in Pakistan who have never been told their glow is worth engineering.” Wali didn’t tell her to sleep on it. He opened his laptop right then and there.',
  },
  {
    phase: 'Sixty Days Later',
    text: 'NOORIVA rolled off the line in Lahore — jewel-toned, 150ml, and powerhouse-packed with bio-fermented collagen peptides, reduced Glutathione, Zinc Bisglycinate, Magnesium, a full B-Complex active matrix, and the signature NOORISH GOLD core, with zero excuses.',
  },
  {
    phase: 'The Homecoming',
    text: 'Noorish still serves. But now she also builds. And the light she found on an island convenience-store shelf is finally coming home.',
  },
];

const PILLARS = [
  { icon: Leaf, label: 'Nature-first', desc: 'Botanical intelligence, never synthetic shortcuts.' },
  { icon: Flame, label: 'Purpose-driven', desc: 'Engineered for dignity, glow, and self-love.' },
  { icon: ShieldCheck, label: 'Honest formulation', desc: 'Clinically inspired actives, thoughtfully dosed.' },
  { icon: Heart, label: 'Made with love', desc: 'Built by the women it was created for.' },
];

export default function OriginStory() {
  const reduced = useReducedMotion();

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#ffffff] text-ink pb-36">
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-20 md:px-8"><BackToHome className="mb-2 inline-block" /></div>

      {/* Soft aurora */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(circle at 10% 10%, rgba(34, 211, 238,0.14), transparent 38%),
            radial-gradient(circle at 90% 15%, rgba(255,143,178,0.12), transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(167,139,250,0.10), transparent 45%)
          `,
        }}
      />

      <main className="relative z-10 mx-auto max-w-4xl px-5 py-24 md:py-28">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#22d3ee] backdrop-blur-md"
        >
          <Sparkles size={14} />
          Our Origin Story
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="display-heading mt-6 text-5xl leading-[0.95] md:text-7xl"
        >
          The light found on
          <span className="block bg-gradient-to-r from-[#22d3ee] via-[#a78bfa] to-[#e05297] bg-clip-text text-transparent">
            an island shelf.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65"
        >
          This is how a single pink pouch in Thailand became a promise to millions of
          women — and how NOORIVA finally brought that glow home.
        </motion.p>

        <div className="mt-14 space-y-10">
          {ORIGIN.map((chapter, i) => (
            <motion.div
              key={chapter.phase}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="relative border-l-2 border-[#a78bfa] pl-6 md:pl-8"
            >
              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#22d3ee]">
                {chapter.phase}
              </span>
              <h2 className="display-heading mt-2 text-2xl text-ink md:text-3xl">
                {chapter.phase}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
                {chapter.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pillars */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {PILLARS.map((pillar) => (
            <div key={pillar.label} className="glass rounded-[2rem] p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#a78bfa]/20 text-[#22d3ee]">
                <pillar.icon size={20} />
              </span>
              <h3 className="mt-3 text-lg font-bold text-ink">{pillar.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{pillar.desc}</p>
            </div>
          ))}
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-ink/60">This is where the glow begins.</p>
          <Link
            href="/noorish-gold"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition hover:scale-105"
          >
            Explore NOORISH GOLD <ArrowRight size={16} />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
