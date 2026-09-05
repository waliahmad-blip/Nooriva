'use client';
import BackToHome from "@/components/ui/BackToHome";

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Leaf,
  Flower2,
  Droplets,
  Sun,
  Sparkles,
  ArrowRight,
  Check,
  Heart,
  Wind,
} from 'lucide-react';
import ScrollToTop from '@/components/ui/ScrollToTop';

const BOTANICALS = [
  {
    id: 'saffron',
    name: 'Saffron',
    emoji: '🌼',
    color: '#E7D3A8',
    mood: 'Golden warmth',
    story: 'Hand-harvested threads that carry the sun’s golden hour into every ritual.',
    benefit: 'A luxurious, golden finish that feels like nature’s own glow.',
  },
  {
    id: 'rose',
    name: 'Rose',
    emoji: '🌹',
    color: '#ff8fb2',
    mood: 'Soft floral',
    story: 'Steam-distilled rose petals — the heart of NOORIVA’s botanical identity.',
    benefit: 'A gentle, floral anchor that makes every sip feel like a garden.',
  },
  {
    id: 'mastic',
    name: 'Mastic',
    emoji: '🌿',
    color: '#5eead4',
    mood: 'Earthy calm',
    story: 'A rare botanical resin that brings a clean, grounding finish.',
    benefit: 'A smooth, balanced body that keeps the ritual light and pure.',
  },
  {
    id: 'amla',
    name: 'Amla',
    emoji: '🍈',
    color: '#a7f3d0',
    mood: 'Bright clarity',
    story: 'A sun-ripened fruit known for its clean, radiant energy.',
    benefit: 'A fresh, bright note that awakens the senses naturally.',
  },
  {
    id: 'sea-buckthorn',
    name: 'Sea Buckthorn',
    emoji: '🍊',
    color: '#fbbf24',
    mood: 'Golden vitality',
    story: 'A coastal berry that brings a burst of golden, botanical life.',
    benefit: 'A vibrant, juicy layer that makes the ritual feel alive.',
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus',
    emoji: '🌺',
    color: '#f472b6',
    mood: 'Floral bloom',
    story: 'Deep crimson petals that add a soft, romantic bloom.',
    benefit: 'A delicate, floral finish that lingers like a sunset.',
  },
];

const SENSORY_JOURNEY = [
  { icon: Sun, step: 'Aroma', desc: 'A golden floral opening — rose and saffron, like a garden at dawn.' },
  { icon: Droplets, step: 'Texture', desc: 'Silky and light, with a clean botanical body that never feels heavy.' },
  { icon: Wind, step: 'Finish', desc: 'A soft, lingering glow — warm, natural, and quietly luxurious.' },
];

export default function IngredientStory() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(BOTANICALS[0].id);

  const selected = BOTANICALS.find((b) => b.id === active) || BOTANICALS[0];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#ffffff] text-ink">
      <BackToHome className="fixed top-6 left-6 z-50" />
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-4 md:px-8">
      </div>
      {/* Nature aurora */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-55"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, rgba(94,234,212,0.18), transparent 40%),
            radial-gradient(circle at 85% 20%, rgba(255,143,178,0.14), transparent 42%),
            radial-gradient(circle at 50% 90%, rgba(231,211,168,0.14), transparent 45%)
          `,
        }}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:px-8">
        {/* Hero */}
        <section className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#5eead4] backdrop-blur-md"
          >
            <Leaf size={14} />
            Nature&apos;s Golden Heart
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-heading mt-5 text-5xl leading-[0.95] md:text-7xl"
          >
            Inside
            <span className="block bg-gradient-to-r from-[#5eead4] via-[#E7D3A8] to-[#ff8fb2] bg-clip-text text-transparent">
              nature&apos;s glow.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-ink/60"
          >
            We don&apos;t share the recipe — we share the feeling. Six botanicals,
            one golden heart, and a ritual that feels like nature itself.
          </motion.p>
        </section>

        {/* Interactive botanical cards */}
        <section className="mt-14">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {BOTANICALS.map((botanical) => (
              <motion.button
                key={botanical.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActive(botanical.id)}
                className={`glass rounded-2xl p-4 text-center transition ${
                  active === botanical.id ? 'ring-2 ring-[#5eead4]' : ''
                }`}
              >
                <span className="text-3xl">{botanical.emoji}</span>
                <p className="mt-2 text-sm font-bold">{botanical.name}</p>
              </motion.button>
            ))}
          </div>

          {/* Selected botanical detail */}
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass mt-6 rounded-[2.5rem] p-8 md:p-12"
          >
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div
                className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full text-6xl"
                style={{
                  background: `radial-gradient(circle, ${selected.color}33, transparent 70%)`,
                }}
              >
                {selected.emoji}
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#5eead4]">
                  {selected.mood}
                </p>
                <h2 className="mt-2 text-3xl font-extrabold">{selected.name}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink/70">{selected.story}</p>
                <p className="mt-3 text-sm italic text-ink/50">{selected.benefit}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Sensory journey */}
        <section className="mt-16">
          <h2 className="display-heading mb-6 text-3xl md:text-4xl">The Sensory Journey</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {SENSORY_JOURNEY.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-[2rem] p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffffff]/15 text-[#5eead4]">
                  <item.icon size={20} />
                </span>
                <h3 className="mt-3 text-lg font-bold">{item.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Golden base positioning — no formula */}
        <section className="mt-16">
          <div className="glass rounded-[2.5rem] p-8 text-center md:p-12">
            <Sparkles size={28} className="mx-auto text-[#E7D3A8]" />
            <h2 className="display-heading mt-4 text-3xl md:text-4xl">One Golden Heart</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink/60">
              Every NOORIVA ritual is built on the same golden botanical heart —
              a signature blend that gives each pouch its unmistakable warmth,
              body, and glow. The exact recipe stays ours. The feeling is yours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Botanical', 'Organic-led', 'Skin food', 'Nature-first'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-ink/10 bg-ink/5 px-4 py-1.5 text-xs font-semibold text-ink/70"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-16 max-w-4xl pb-16 text-center">
          <p className="text-ink/60">Ready to taste nature&apos;s golden heart?</p>
          <Link
            href="/noorish-gold"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5eead4] to-[#E7D3A8] px-7 py-3.5 text-sm font-bold text-ink transition hover:scale-105"
          >
            Explore the Rituals <ArrowRight size={16} />
          </Link>
        </section>
      </main>

      <ScrollToTop />
    </div>
  );
}
