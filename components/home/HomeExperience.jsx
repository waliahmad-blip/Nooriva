'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  CloudSun,
  Heart,
  Users,
  Crown,
  Share2,
  Copy,
  Check,
  Droplets,
  Leaf,
} from 'lucide-react';
import ScrollToTop from '@/components/ui/ScrollToTop';

/* ─────────────────────────────────────────────
   NATURE-LED DATA
   ───────────────────────────────────────────── */

const RITUALS = [
  { name: 'ROSE HALO', slug: 'rose-halo', color: '#ff8fb2', time: 'Morning', note: 'Wake up luminous' },
  { name: 'PEACH DUSK', slug: 'peach-dusk', color: '#fbbf24', time: 'Evening', note: 'Sleep beautiful' },
  { name: 'MANGO BLAZE', slug: 'mango-blaze', color: '#f59e0b', time: 'Midday', note: 'Burn bright' },
  { name: 'SAFFRON MIST', slug: 'saffron-mist', color: '#E7D3A8', time: 'Night', note: 'Repair in gold' },
  { name: 'BERRY BLOOM', slug: 'berry-bloom', color: '#f472b6', time: '3PM', note: 'Still glowing' },
  { name: 'COCO GLOW', slug: 'coco-glow', color: '#5eead4', time: 'Recovery', note: 'Reset your light' },
  { name: 'CHERRY VEIL', slug: 'cherry-veil', color: '#dc2626', time: 'Night', note: 'Drift into glow' },
  { name: 'PASSION LUXE', slug: 'passion-luxe', color: '#fb923c', time: 'Luxe', note: 'Age in reverse' },
  { name: 'ACAI DEW', slug: 'acai-dew', color: '#7c3aed', time: 'Clarity', note: 'Pure clarity' },
  { name: 'PEARL SHEEN', slug: 'pearl-sheen', color: '#e879f9', time: 'Glow', note: 'Unfiltered' },
  { name: 'ALOE TIDE', slug: 'aloe-tide', color: '#22d3ee', time: 'Barrier', note: 'Barrier of light' },
  { name: 'BAMBOO SILK', slug: 'bamboo-silk', color: '#d6d3d1', time: 'Reflect', note: 'Reflect your light' },
];

const GLOW_NOTES = [
  'BERRY BLOOM at 3PM — still glowing ✨',
  'SAFFRON MIST before sleep. Utterly golden.',
  'COCO GLOW reset my whole week.',
  'ROSE HALO every morning. Obsessed.',
  'PEACH DUSK is a hug in a pouch.',
  'My skin is softer after 2 weeks of ALOE TIDE.',
  'PEARL SHEEN for unfiltered days.',
  'MANGO BLAZE keeps my energy clean.',
];

const ALERTS = [
  { icon: Leaf, text: '100% botanical ritual' },
  { icon: Droplets, text: 'Hydration, naturally' },
  { icon: Sparkles, text: 'Skin food from inside' },
  { icon: Heart, text: 'Safe, honest, organic-led' },
];

function getRitualOfDay() {
  const idx = new Date().getDate() % RITUALS.length;
  return RITUALS[idx];
}

function GlowPouch({ color, size = 120 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className="relative mx-auto flex items-center justify-center"
      style={{ width: size, height: size * 1.6 }}
      animate={reduced ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="absolute inset-0 rounded-[36%]"
        style={{
          background: `linear-gradient(160deg, ${color}, ${color}55 55%, #ffffff10)`,
          boxShadow: `0 30px 80px ${color}44`,
        }}
      />
      <div
        className="absolute inset-x-4 top-6 h-[18%] rounded-full"
        style={{
          background: 'linear-gradient(180deg, #ffffff77, transparent)',
        }}
      />
      <span className="relative text-[10px] font-black tracking-[0.3em] text-white">
        NOORIVA
      </span>
    </motion.div>
  );
}

function Marquee({ items }) {
  const reduced = useReducedMotion();
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-4"
        animate={reduced ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((note, i) => (
          <div
            key={`${note.text}-${i}`}
            className="glass shrink-0 rounded-full px-5 py-3 text-sm text-ink"
          >
            {note.icon ? <note.icon className="mr-2 inline text-[#C79A44]" size={14} /> : null}
            {note.text || note}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function WeatherStrip() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch('/api/noorix/weather')
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch(() => setWeather(null));
  }, []);

  return (
    <div className="glass rounded-[2rem] p-6">
      <div className="flex items-center gap-2 text-ink">
        <CloudSun size={20} className="text-[#C79A44]" />
        <h3 className="text-lg font-bold">Weather Glow</h3>
      </div>
      {weather ? (
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-5xl font-extrabold text-ink">{weather.temperature}°C</p>
            <p className="text-sm text-ink/60">
              UV {weather.uvIndex ?? '—'} · Wind {weather.windspeed} km/h
            </p>
          </div>
          <p className="max-w-xs text-sm italic text-ink/70">{weather.advice}</p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink/50 italic">
          Tuning into nature&apos;s glow…
        </p>
      )}
      <Link
        href="/weather"
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink"
      >
        See your city&apos;s glow <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function GlowCard({ ritual, index }) {
  const [copied, setCopied] = useState(false);
  const caption = `${ritual.name} — ${ritual.note}. Drink your natural glow. #DrinkYourGlow #NOORIVA`;

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: 'NOORIVA', text: caption });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass relative overflow-hidden rounded-[2rem] p-5"
    >
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: `${ritual.color}33` }}
      />
      <div className="relative flex flex-col">
        <GlowPouch color={ritual.color} size={90} />
        <p className="mt-3 text-xs font-black tracking-[0.25em] text-ink/60">{ritual.time}</p>
        <h4 className="text-lg font-bold text-ink">{ritual.name}</h4>
        <p className="text-sm text-ink/60">{ritual.note}</p>
        <button
          onClick={share}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold text-cream-50"
        >
          {copied ? <Check size={14} /> : <Share2 size={14} />}
          {copied ? 'Copied' : 'Share this glow'}
        </button>
      </div>
    </motion.div>
  );
}

export default function HomeExperience() {
  const ritualOfDay = getRitualOfDay();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cream-50 text-ink">
      {/* soft aurora backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(255,143,178,0.16), transparent 40%),
            radial-gradient(circle at 85% 10%, rgba(167,139,250,0.12), transparent 40%),
            radial-gradient(circle at 50% 85%, rgba(94,234,212,0.12), transparent 45%)
          `,
        }}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:px-8">
        {/* ── Hero ── */}
        <section className="px-2 pt-8 text-center md:pt-14">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-ink/60 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-[#C79A44]" />
            Nature&apos;s glow, bottled
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-heading mt-5 text-5xl leading-[0.95] text-ink md:text-7xl"
          >
            Drink your
            <span className="block text-[#C79A44]">natural glow.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/65 md:text-lg"
          >
            Botanical skin-food rituals crafted from saffron sunrises, rose gardens,
            and nature&apos;s golden heart. No harshness, no noise — just radiance,
            the way nature intended.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/noorish-gold"
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream-50 transition hover:scale-105"
            >
              Explore 12 Rituals
            </Link>
            <Link
              href="/quiz"
              className="rounded-full border-2 border-ink/15 bg-white/50 px-7 py-3.5 text-sm font-bold text-ink backdrop-blur-md transition hover:scale-105"
            >
              Find My Ritual
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {ALERTS.map((alert) => (
              <div
                key={alert.text}
                className="flex items-center gap-2 rounded-full border border-ink/10 bg-white/50 px-4 py-2 text-xs font-semibold text-ink/70"
              >
                <alert.icon size={14} className="text-[#C79A44]" />
                {alert.text}
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Ritual of the Day ── */}
        <section className="mt-20">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/50">Today</p>
              <h2 className="display-heading text-3xl text-ink md:text-4xl">Ritual of the Day</h2>
            </div>
            <Link
              href={`/drinks/${ritualOfDay.slug}`}
              className="hidden items-center gap-2 text-sm font-bold text-ink sm:flex"
            >
              View ritual <ArrowRight size={16} />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass flex flex-col items-center gap-6 rounded-[2.5rem] p-8 md:flex-row md:p-12"
          >
            <GlowPouch color={ritualOfDay.color} size={150} />
            <div className="max-w-xl text-center md:text-left">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#C79A44]">
                {ritualOfDay.time}
              </p>
              <h3 className="mt-2 text-4xl font-extrabold text-ink">{ritualOfDay.name}</h3>
              <p className="mt-3 text-lg italic text-ink/70">{ritualOfDay.note}</p>
              <Link
                href={`/drinks/${ritualOfDay.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C79A44] px-6 py-3 text-sm font-bold text-ink transition hover:brightness-110"
              >
                Add today&apos;s ritual <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── Glow Quiz teaser ── */}
        <section className="mt-20">
          <div className="glass rounded-[2.5rem] p-8 text-center md:p-12">
            <Sparkles className="mx-auto text-[#C79A44]" size={32} />
            <h2 className="display-heading mt-4 text-3xl text-ink md:text-4xl">
              Not sure where to begin?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink/65">
              Let nature decide. Answer three little questions — goal, taste, and pace — and
              we&apos;ll discover your perfect botanical ritual.
            </p>
            <Link
              href="/quiz"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream-50 transition hover:scale-105"
            >
              Start the Glow Quiz <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* ── NOORIVA Club teaser ── */}
        <section className="mt-20">
          <div className="flex flex-col items-center gap-6 rounded-[2.5rem] border border-ink/10 bg-gradient-to-br from-[#fff0f3] to-[#f3e8ff] p-8 text-center md:p-12">
            <Users size={32} className="text-[#ec4899]" />
            <h2 className="display-heading text-3xl text-ink md:text-4xl">Everyone blooms here.</h2>
            <p className="max-w-xl text-ink/65">
              NOORIVA Club is our co-ed garden of glow. Heart-to-heart talks, weekly circles,
              Lady &amp; Gentleman of the Day, and a soft, honest safe space for everyone.
            </p>
            <Link
              href="/club"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f472b6] to-[#ff8fb2] px-7 py-3.5 text-sm font-bold text-white transition hover:scale-105"
            >
              Join the Club <ArrowRight size={16} />
            </Link>
            <div className="flex flex-wrap justify-center gap-2">
              {['Respect First', 'Authentic Only', 'Everyone Blooms'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-white/60 px-4 py-1.5 text-xs font-bold text-ink/70"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Weather Glow ── */}
        <section className="mt-20">
          <WeatherStrip />
        </section>

        {/* ── Instagram Glow Cards ── */}
        <section className="mt-20">
          <div className="mb-5">
            <h2 className="display-heading text-3xl text-ink md:text-4xl">Share the Glow</h2>
            <p className="mt-2 text-ink/60">
              Post it, tag it, let your natural glow travel.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {RITUALS.slice(0, 3).map((ritual, i) => (
              <GlowCard key={ritual.name} ritual={ritual} index={i} />
            ))}
          </div>
        </section>

        {/* ── Community Glow Notes ── */}
        <section className="mt-20">
          <div className="mb-5">
            <h2 className="display-heading text-3xl text-ink md:text-4xl">Glow Notes</h2>
            <p className="mt-2 text-ink/60">
              Tiny words from people drinking their natural glow.
            </p>
          </div>
          <Marquee items={GLOW_NOTES} />
        </section>

        {/* ── Ambassador + Ingredients mini CTAs ── */}
        <section className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/ambassador"
            className="group flex items-center justify-between rounded-[2rem] border border-ink/10 bg-white/60 p-6 backdrop-blur-md transition hover:scale-[1.01]"
          >
            <div>
              <Crown size={20} className="text-[#C79A44]" />
              <h3 className="mt-2 text-xl font-bold text-ink">Ambassador Hub</h3>
              <p className="text-sm text-ink/60">Grow with NOORIVA, earn rewards.</p>
            </div>
            <ArrowRight className="text-ink/40 transition group-hover:translate-x-1" size={20} />
          </Link>

          <Link
            href="/ingredients"
            className="group flex items-center justify-between rounded-[2rem] border border-ink/10 bg-white/60 p-6 backdrop-blur-md transition hover:scale-[1.01]"
          >
            <div>
              <Leaf size={20} className="text-[#5eead4]" />
              <h3 className="mt-2 text-xl font-bold text-ink">Inside Nature&apos;s Golden Heart</h3>
              <p className="text-sm text-ink/60">The botanical story, not the recipe.</p>
            </div>
            <ArrowRight className="text-ink/40 transition group-hover:translate-x-1" size={20} />
          </Link>
        </section>
      </main>

      <ScrollToTop />
    </div>
  );
}
