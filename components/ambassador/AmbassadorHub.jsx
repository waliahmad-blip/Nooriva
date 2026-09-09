'use client';
import BackToHome from "@/components/ui/BackToHome";

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MetallicVipPass = dynamic(() => import('@/components/three/MetallicVipPass'), { ssr: false });
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Crown,
  Star,
  Gift,
  TrendingUp,
  Users,
  Sparkles,
  ArrowRight,
  Check,
  Share2,
  Instagram,
  Youtube,
  Music2,
} from 'lucide-react';
import ScrollToTop from '@/components/ui/ScrollToTop';

const PERKS = [
  { icon: Gift, title: 'Free Rituals', desc: 'Monthly NOORIVA drops, on us.' },
  { icon: Star, title: 'Early Access', desc: 'New rituals before anyone else.' },
  { icon: TrendingUp, title: 'Growth Support', desc: 'Shoutouts, features, and collabs.' },
  { icon: Users, title: 'Community', desc: 'A private garden of creators.' },
  { icon: Crown, title: 'VIP Status', desc: 'Exclusive events and rewards.' },
  { icon: Sparkles, title: 'Brand Perks', desc: 'Discounts, gifts, and surprises.' },
];

const LEADERBOARD = [
  { name: 'Areej Malik', handle: '@areej.glows', points: 12840, platform: 'instagram', emoji: '🌷' },
  { name: 'Bilal Khan', handle: '@bilal.drinks', points: 11220, platform: 'youtube', emoji: '🥭' },
  { name: 'Zara Ahmed', handle: '@zara.blooms', points: 9870, platform: 'instagram', emoji: '🍓' },
  { name: 'Omar Farooq', handle: '@omar.glow', points: 8450, platform: 'tiktok', emoji: '🥥' },
  { name: 'Nida Hassan', handle: '@nida.rituals', points: 7210, platform: 'instagram', emoji: '🌹' },
];

const PLATFORM_ICONS = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music2,
};

function RewardsMeter() {
  const reduced = useReducedMotion();
  const progress = 68;

  const tiers = [
    { name: "Glow Scout", points: "0 pts", reached: true },
    { name: "Ritual Creator", points: "5,000 pts", reached: true },
    { name: "Golden Luminary", points: "10,000 pts", reached: false, current: true },
    { name: "Brand Icon", points: "25,000 pts", reached: false },
  ];

  return (
    <div className="space-y-6">
      {/* 3D Holographic VIP Creator Pass */}
      <motion.div
        whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-md rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #1A1410, #3A2A1E 50%, #22d3ee 100%)',
          border: '1px solid rgba(167, 139, 250,0.3)',
        }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 blur-2xl bg-[#a78bfa] pointer-events-none" />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#a78bfa]">NOORIVA VIP AMBASSADOR</span>
          <Crown size={20} className="text-[#a78bfa]" />
        </div>
        <div className="my-8">
          <p className="text-xs uppercase tracking-wider text-white/50">Creator Pass Tier</p>
          <p className="display-heading text-3xl text-white font-serif mt-1">Golden Luminary</p>
        </div>
        <div className="flex items-end justify-between pt-4 border-t border-white/10 text-xs">
          <div>
            <p className="text-white/40 text-[10px] uppercase tracking-wider">Member ID</p>
            <p className="font-mono text-[#a78bfa] font-bold">NV-CREATOR-2026</p>
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1 font-bold text-white text-[11px]">Active Level 3</span>
        </div>
      </motion.div>

      {/* Rewards meter */}
      <div className="glass rounded-[2rem] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Creator XP & Rewards Meter</h3>
            <p className="text-xs text-ink/50 mt-0.5">Tier 3: Golden Luminary Status</p>
          </div>
          <span className="text-sm font-bold text-[#22d3ee]">{progress}%</span>
        </div>

        <div className="mt-4 h-3.5 overflow-hidden rounded-full bg-ink/10 relative">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] via-[#a78bfa] to-[#f472b6]"
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          {tiers.map((t) => (
            <div key={t.name} className="min-w-0">
              <span className={`block text-[11px] font-bold truncate ${t.current ? 'text-[#22d3ee]' : t.reached ? 'text-ink' : 'text-ink/40'}`}>
                {t.name}
              </span>
              <span className="text-[10px] text-ink/40">{t.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AmbassadorHub() {
  const reduced = useReducedMotion();
  const [applied, setApplied] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#ffffff] text-ink pb-36">
      <BackToHome className="fixed top-20 left-4 sm:left-6 z-30" />
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-4 md:px-8">
      </div>
      {/* Aurora accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, rgba(124,58,237,0.20), transparent 40%),
            radial-gradient(circle at 85% 20%, rgba(244,114,182,0.16), transparent 42%),
            radial-gradient(circle at 50% 90%, rgba(34, 211, 238,0.14), transparent 45%)
          `,
        }}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-12 md:px-8">
        {/* Hero */}
        <section className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#22d3ee] backdrop-blur-md"
          >
            <Crown size={14} />
            Ambassador Hub
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-heading mt-5 text-5xl leading-[0.95] md:text-7xl"
          >
            Grow with
            <span className="block bg-gradient-to-r from-[#22d3ee] via-[#a78bfa] to-[#f472b6] bg-clip-text text-transparent">
              NOORIVA.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-ink/60"
          >
            Love natural glow? Share it. Earn points, unlock rewards, and grow
            with a brand that celebrates botanical beauty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => {
                setApplied(true);
                setTimeout(() => setApplied(false), 2200);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] px-7 py-3.5 text-sm font-bold text-ink transition hover:scale-105"
            >
              {applied ? <Check size={16} /> : <Crown size={16} />}
              {applied ? 'Application Sent!' : 'Apply to Join'}
            </button>

            <Link
              href="/club"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/5 px-7 py-3.5 text-sm font-bold text-ink backdrop-blur-md transition hover:scale-105"
            >
              Join the Club <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink/40"
          >
            Open to creators with 5,000+ engaged followers
          </motion.p>
        </section>

        {/* Rewards meter */}
        <section className="mx-auto mt-14 max-w-4xl">
          <RewardsMeter />
        </section>

        {/* Perks */}
        <section className="mt-16">
          <h2 className="display-heading mb-6 text-3xl md:text-4xl">Ambassador Perks</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-[2rem] p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffffff]/15 text-[#22d3ee]">
                  <perk.icon size={20} />
                </span>
                <h3 className="mt-3 text-lg font-bold">{perk.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section className="mt-16">
          <h2 className="display-heading mb-6 text-3xl md:text-4xl">Top Ambassadors</h2>
          <div className="space-y-3">
            {LEADERBOARD.map((ambassador, i) => {
              const PlatformIcon = PLATFORM_ICONS[ambassador.platform] || Instagram;
              return (
                <motion.div
                  key={ambassador.handle}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06 }}
                  className="glass flex items-center gap-4 rounded-2xl p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/10 text-xl">
                    {ambassador.emoji}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold">{ambassador.name}</p>
                    <p className="text-xs text-ink/50">{ambassador.handle}</p>
                  </div>
                  <PlatformIcon size={18} className="text-ink/40" />
                  <span className="rounded-full bg-[#ffffff]/15 px-4 py-1.5 text-sm font-bold text-[#22d3ee]">
                    {ambassador.points.toLocaleString()} pts
                  </span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Share CTA */}
        <section className="mx-auto mt-16 max-w-4xl pb-16 text-center">
          <div className="glass rounded-[2.5rem] p-8 md:p-12">
            <Share2 size={28} className="mx-auto text-[#22d3ee]" />
            <h2 className="display-heading mt-4 text-3xl md:text-4xl">Share the natural glow</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink/60">
              Post your ritual, tag <span className="font-bold text-[#22d3ee]">#DrinkYourNaturalGlow</span>,
              and let the garden grow.
            </p>
            <Link
              href="/noorish-gold"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#a78bfa] px-7 py-3.5 text-sm font-bold text-ink transition hover:scale-105"
            >
              Explore Rituals <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <ScrollToTop />
    </div>
  );
}
