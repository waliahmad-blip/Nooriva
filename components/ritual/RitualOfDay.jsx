'use client';
import BackToHome from "@/components/ui/BackToHome";

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Share2,
  ShoppingBag,
  Leaf,
  Sun,
  Moon,
  Droplets,
  Check,
  Calendar,
} from 'lucide-react';
import ScrollToTop from '@/components/ui/ScrollToTop';

const RITUALS = [
  {
    name: 'ROSE HALO', slug: 'rose-halo', color: '#ff8fb2', colorB: '#ffd7a1',
    time: 'Morning · 7:00 AM', note: 'Wake up luminous', mood: 'Soft, floral, awakening',
    botanicals: ['Rose garden', 'Golden sunrise', 'Botanical dew'],
    story: 'A liquid sunrise — rose petals and soft golden light to start your day the way nature intended: luminous and unhurried.',
  },
  {
    name: 'PEACH DUSK', slug: 'peach-dusk', color: '#fbbf24', colorB: '#f472b6',
    time: 'Evening · 9:00 PM', note: 'Sleep beautiful', mood: 'Warm, calming, evening',
    botanicals: ['Peach bloom', 'Chamomile calm', 'Golden dusk'],
    story: 'The last light of day, poured gently into a pouch. Wind down, soften, and sleep with the warmth of a golden dusk.',
  },
  {
    name: 'MANGO BLAZE', slug: 'mango-blaze', color: '#f59e0b', colorB: '#ef4444',
    time: 'Midday · 1:00 PM', note: 'Burn bright', mood: 'Bright, energetic, fiery',
    botanicals: ['Ripe mango', 'Warm ginger', 'Solar energy'],
    story: 'Clean botanical energy for that 1 PM spark — bright mango, a whisper of ginger, and nature’s own fire.',
  },
  {
    name: 'SAFFRON MIST', slug: 'saffron-mist', color: '#E7D3A8', colorB: '#C79A44',
    time: 'Night · 11:00 PM', note: 'Repair in gold', mood: 'Luxurious, repairing, still',
    botanicals: ['Saffron threads', 'Golden milk', 'Midnight calm'],
    story: 'While the world sleeps, nature repairs. Saffron gold and botanical calm for deep, restorative rest.',
  },
  {
    name: 'BERRY BLOOM', slug: 'berry-bloom', color: '#f472b6', colorB: '#7c3aed',
    time: 'Afternoon · 3:00 PM', note: 'Still glowing', mood: 'Bold, juicy, confident',
    botanicals: ['Pomegranate', 'Wild berries', 'Violet bloom'],
    story: 'That 3 PM glow that refuses to fade — pomegranate, berries, and a bold, juicy bloom.',
  },
  {
    name: 'COCO GLOW', slug: 'coco-glow', color: '#5eead4', colorB: '#0ea5e9',
    time: 'Recovery · Any time', note: 'Reset your light', mood: 'Fresh, resetting, clean',
    botanicals: ['Coconut water', 'Moringa leaf', 'Coastal air'],
    story: 'A reset button in a pouch. Coconut, moringa, and clean coastal freshness to bring you back to yourself.',
  },
  {
    name: 'CHERRY VEIL', slug: 'cherry-veil', color: '#dc2626', colorB: '#ff8fb2',
    time: 'Night · 10:00 PM', note: 'Drift into glow', mood: 'Deep, dreamy, velvet',
    botanicals: ['Black cherry', 'Rose veil', 'Velvet night'],
    story: 'A velvet curtain of black cherry and rose — slow, dreamy, and made for drifting into glow.',
  },
  {
    name: 'PASSION LUXE', slug: 'passion-luxe', color: '#fb923c', colorB: '#f472b6',
    time: 'Luxe · Afternoon', note: 'Age in reverse', mood: 'Tropical, luxurious, radiant',
    botanicals: ['Papaya', 'Passionfruit', 'Golden nectar'],
    story: 'Tropical luxury with a golden heart — papaya and passionfruit that make time feel softer.',
  },
  {
    name: 'ACAI DEW', slug: 'acai-dew', color: '#7c3aed', colorB: '#22d3ee',
    time: 'Clarity · Morning', note: 'Pure clarity', mood: 'Cool, clear, focused',
    botanicals: ['Acai', 'Blueberry', 'Morning dew'],
    story: 'Dew-fresh clarity to clear your mind — acai, blueberry, and a cool, focused calm.',
  },
  {
    name: 'PEARL SHEEN', slug: 'pearl-sheen', color: '#e879f9', colorB: '#a78bfa',
    time: 'Glow · Any time', note: 'Unfiltered', mood: 'Luminous, soft, pearlescent',
    botanicals: ['Dragon fruit', 'Hibiscus', 'Pearl light'],
    story: 'An unfiltered, pearlescent glow — dragon fruit and hibiscus for radiance that needs no filter.',
  },
  {
    name: 'ALOE TIDE', slug: 'aloe-tide', color: '#22d3ee', colorB: '#5eead4',
    time: 'Barrier · All day', note: 'Barrier of light', mood: 'Cool, protective, hydrating',
    botanicals: ['Aloe leaf', 'Yuzu zest', 'Ocean breeze'],
    story: 'A protective tide of aloe and yuzu — hydration that shields and keeps skin luminous all day.',
  },
  {
    name: 'BAMBOO SILK', slug: 'bamboo-silk', color: '#d6d3d1', colorB: '#e879f9',
    time: 'Reflect · Night', note: 'Reflect your light', mood: 'Silky, reflective, serene',
    botanicals: ['Bamboo silk', 'Pearl essence', 'Still water'],
    story: 'A silky, reflective finish for quiet nights — bamboo and pearl to reflect your inner light.',
  },
];

const DAY_INDEX = new Date().getDate() % RITUALS.length;

export default function RitualOfDay() {
  const reduced = useReducedMotion();
  const ritual = RITUALS[DAY_INDEX];
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 12]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.92]);

  const dateLabel = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  function share() {
    const text = `${ritual.name} — Ritual of the Day · ${ritual.note}. ${ritual.story} #DrinkYourNaturalGlow #NOORIVA`;
    if (navigator.share) {
      navigator.share({ title: 'NOORIVA Ritual of the Day', text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  function save() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ritual.name);
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#ffffff] text-ink">
      <BackToHome className="fixed top-6 left-6 z-50" />
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-4 md:px-8">
      </div>
      {/* Golden aurora */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-55"
        style={{
          background: `
            radial-gradient(circle at 20% 15%, rgba(199,154,68,0.22), transparent 40%),
            radial-gradient(circle at 80% 25%, rgba(231,211,168,0.16), transparent 42%),
            radial-gradient(circle at 50% 90%, rgba(251,191,36,0.14), transparent 45%)
          `,
        }}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:px-8">
        {/* Header */}
        <section className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#E7D3A8] backdrop-blur-md"
          >
            <Calendar size={14} />
            {dateLabel}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-heading mt-5 text-5xl leading-[0.95] md:text-7xl"
          >
            Ritual of
            <span className="block bg-gradient-to-r from-[#E7D3A8] via-[#C79A44] to-[#fbbf24] bg-clip-text text-transparent">
              the Day
            </span>
          </motion.h1>
        </section>

        {/* 3D pouch showcase */}
        <section ref={ref} className="mx-auto mt-14 max-w-4xl">
          <div className="glass relative overflow-hidden rounded-[2.5rem] p-8 md:p-14">
            <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">
              {/* Pouch */}
              <motion.div
                style={{ rotate, scale }}
                className="relative flex shrink-0 items-center justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-64 w-44"
                >
                  <div
                    className="absolute inset-0 rounded-[38%]"
                    style={{
                      background: `linear-gradient(160deg, ${ritual.color}, ${ritual.colorB} 55%, #ffffff15)`,
                      boxShadow: `0 40px 100px ${ritual.color}55`,
                    }}
                  />
                  <div
                    className="absolute inset-x-5 top-8 h-[16%] rounded-full"
                    style={{ background: 'linear-gradient(180deg, #ffffff88, transparent)' }}
                  />
                  <span className="absolute inset-x-0 bottom-6 text-center text-xs font-black tracking-[0.3em] text-ink">
                    NOORIVA
                  </span>
                  <span className="absolute inset-x-0 top-24 text-center text-sm font-extrabold text-ink">
                    {ritual.name}
                  </span>
                </motion.div>
              </motion.div>

              {/* Details */}
              <div className="max-w-md text-center md:text-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#E7D3A8]">
                  {ritual.time}
                </p>
                <h2 className="mt-2 text-4xl font-extrabold">{ritual.name}</h2>
                <p className="mt-2 text-xl italic text-ink/60">{ritual.note}</p>

                <p className="mt-5 text-base leading-relaxed text-ink/70">{ritual.story}</p>

                <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                  {ritual.botanicals.map((botanical) => (
                    <span
                      key={botanical}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-ink/5 px-4 py-1.5 text-xs font-semibold text-ink/70"
                    >
                      <Leaf size={12} className="text-[#5eead4]" />
                      {botanical}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                  <Link
                    href={`/drinks/${ritual.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E7D3A8] to-[#C79A44] px-6 py-3 text-sm font-bold text-ink transition hover:scale-105"
                  >
                    <ShoppingBag size={16} /> Add to Bag
                  </Link>

                  <button
                    onClick={share}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/5 px-6 py-3 text-sm font-bold text-ink backdrop-blur-md transition hover:scale-105"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
                    {copied ? 'Copied!' : 'Share'}
                  </button>

                  <button
                    onClick={save}
                    className="inline-flex items-center gap-2 rounded-full text-sm font-semibold text-ink/50 transition hover:text-ink"
                  >
                    {saved ? <Check size={16} className="text-emerald-400" /> : <Sparkles size={16} />}
                    {saved ? 'Saved!' : 'Save ritual'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mood + ritual hints */}
        <section className="mx-auto mt-10 max-w-4xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="glass rounded-2xl p-5 text-center">
              <Sun size={22} className="mx-auto text-[#fbbf24]" />
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/40">Time</p>
              <p className="mt-1 text-sm font-semibold">{ritual.time}</p>
            </div>
            <div className="glass rounded-2xl p-5 text-center">
              <Moon size={22} className="mx-auto text-[#a78bfa]" />
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/40">Mood</p>
              <p className="mt-1 text-sm font-semibold">{ritual.mood}</p>
            </div>
            <div className="glass rounded-2xl p-5 text-center">
              <Droplets size={22} className="mx-auto text-[#67e8f9]" />
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/40">Nature</p>
              <p className="mt-1 text-sm font-semibold">Botanical skin food</p>
            </div>
          </div>
        </section>

        {/* Explore more */}
        <section className="mx-auto mt-16 max-w-4xl pb-16 text-center">
          <p className="text-ink/60">Nature changes every day — so does your ritual.</p>
          <Link
            href="/noorish-gold"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/5 px-7 py-3.5 text-sm font-bold text-ink backdrop-blur-md transition hover:scale-105"
          >
            Explore all 12 rituals <ArrowRight size={16} />
          </Link>
        </section>
      </main>

      <ScrollToTop />
    </div>
  );
}
