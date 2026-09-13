'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const CelestialLotusTorus = dynamic(() => import('@/components/three/CelestialLotusTorus'), { ssr: false });
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Users,
  Crown,
  Shield,
  Moon,
  Sun,
  Brain,
  Bed,
  Leaf,
  MessageCircle,
  Star,
  Send,
  Flower2,
  Mic,
  Play,
  Instagram,
  Music2,
  Calendar,
  Clock,
  BadgeCheck,
  ArrowRight,
  ChevronDown,
  Volume2,
  Check,
  Trophy,
} from 'lucide-react';
import BackToHome from '@/components/ui/BackToHome';

const WEEKLY_CIRCLES = [
  { id: 'skin', label: 'Skin', icon: Sparkles, color: '#ff8fb2', day: 'Mon', time: '8:00 PM', desc: 'Glow check-ins, texture talk, skin food.' },
  { id: 'mind', label: 'Mind', icon: Brain, color: '#a78bfa', day: 'Tue', time: '8:30 PM', desc: 'Breathwork, grounding, honest check-ins.' },
  { id: 'body', label: 'Body', icon: Sun, color: '#fbbf24', day: 'Wed', time: '7:30 PM', desc: 'Movement, hydration, recovery rituals.' },
  { id: 'sleep', label: 'Sleep', icon: Moon, color: '#67e8f9', day: 'Thu', time: '9:00 PM', desc: 'Wind-down routines, botanical calm.' },
  { id: 'community', label: 'Community', icon: Users, color: '#34d399', day: 'Fri', time: '9:30 PM', desc: 'Heart-to-hearts, open mic, shared glow.' },
];

const SPOTLIGHTS = [
  { id: 'today', title: 'Lady of the Day', name: 'Areej Malik', emoji: '🌷', quote: 'Three weeks of ROSE HALO and my mornings finally feel soft.', votes: 128 },
  { id: 'week', title: 'Lady of the Week', name: 'Hira Ahmed', emoji: '🌞', quote: 'Found my people here. Honest, kind, real.', votes: 94 },
  { id: 'month', title: 'Lady of the Month', name: 'Zainab F.', emoji: '🌙', quote: 'The circles changed how I see self-care.', votes: 210 },
];

const INITIAL_GLOW_NOTES = [
  { id: 1, name: 'Sana', note: 'PEACH DUSK is a hug in a pouch. 🍑', ritual: 'Peach Dusk', likes: 42 },
  { id: 2, name: 'Ali', note: 'COCO GLOW after workouts changed my energy.', ritual: 'Coco Glow', likes: 23 },
  { id: 3, name: 'Maha', note: 'SAFFRON MIST before bed. Pure golden calm.', ritual: 'Saffron Mist', likes: 31 },
  { id: 4, name: 'Bilal', note: 'ROSE HALO every morning. Obsessed.', ritual: 'Rose Halo', likes: 15 },
  { id: 5, name: 'Zara', note: 'My skin is softer after two weeks of ALOE TIDE.', ritual: 'Aloe Tide', likes: 27 },
  { id: 6, name: 'Omar', note: 'BERRY BLOOM keeps my 3PM sharp.', ritual: 'Berry Bloom', likes: 19 },
];

const UGC_POSTS = [
  { id: 1, platform: 'instagram', user: '@areej.glows', ritual: 'ROSE HALO', note: 'morning glow 🌸', color: '#ff8fb2', likes: 1284 },
  { id: 2, platform: 'tiktok', user: '@bilal.drinks', ritual: 'MANGO BLAZE', note: 'clean energy ⚡', color: '#fbbf24', likes: 2031 },
  { id: 3, platform: 'instagram', user: '@zara.blooms', ritual: 'BERRY BLOOM', note: '3PM still glowing 🍓', color: '#f472b6', likes: 876 },
  { id: 4, platform: 'instagram', user: '@nida.rituals', ritual: 'SAFFRON MIST', note: 'golden hour 🌙', color: '#a78bfa', likes: 1520 },
  { id: 5, platform: 'tiktok', user: '@omar.light', ritual: 'COCO GLOW', note: 'reset day 🥥', color: '#5eead4', likes: 964 },
  { id: 6, platform: 'instagram', user: '@maha.gold', ritual: 'ALOE TIDE', note: 'barrier of light ✨', color: '#22d3ee', likes: 1102 },
];

const STREAK_BADGES = [
  { user: 'Areej', streak: 42, emoji: '🔥' },
  { user: 'Bilal', streak: 28, emoji: '⚡' },
  { user: 'Zara', streak: 17, emoji: '🌷' },
  { user: 'Maha', streak: 12, emoji: '🌙' },
];

const CLUB_QUIZ = [
  {
    question: 'What brings you to NOORIVA Club?',
    options: ['Glow tips', 'Making friends', 'Heart-to-heart talks', 'All of it'],
  },
  {
    question: 'What energy are you bringing today?',
    options: ['Soft and calm', 'Bold and bright', 'Chatty and curious', 'Need a reset'],
  },
  {
    question: 'How do you like to connect?',
    options: ['Live circles', 'Voice notes', 'Text notes', 'All of the above'],
  },
];

const SAFE_SPACE_BADGES = [
  { icon: Shield, label: 'Respect First' },
  { icon: Heart, label: 'Authentic Only' },
  { icon: Flower2, label: 'Everyone Blooms' },
];

const MEMBER_AVATARS = [
  { id: 1, emoji: '🌸', color: '#ff8fb2' },
  { id: 2, emoji: '🍑', color: '#fbbf24' },
  { id: 3, emoji: '🥭', color: '#f59e0b' },
  { id: 4, emoji: '🥥', color: '#5eead4' },
  { id: 5, emoji: '🍓', color: '#f472b6' },
  { id: 6, emoji: '🌹', color: '#dc2626' },
  { id: 7, emoji: '🍋', color: '#67e8f9' },
  { id: 8, emoji: '💜', color: '#7c3aed' },
];

function CountUp({ target, duration = 1200 }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <span>{value.toLocaleString()}</span>;
}
function Marquee({ items }) {
  const doubled = [...(items || []), ...(items || [])];
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => {
          const text = typeof item === 'string' ? item : `${item.name}: "${item.note}"`;
          return (
            <div key={`${i}-${text}`} className="glass shrink-0 rounded-full px-5 py-3 text-sm flex items-center gap-2">
              <span className="font-bold text-cyan-500">✦</span>
              <span className="text-ink/80">{text}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}


function ClubOrb() {
  return (
    <div className="relative mx-auto max-w-md text-center">
      <CelestialLotusTorus />
      <p className="mt-1 text-[10px] font-mono tracking-widest text-pink-500 uppercase">
        ✦ TAP CELESTIAL TORUS TO BURST LOVE PARTICLES ✦
      </p>
    </div>
  );
}

export default function ClubExperience() {
  const [rsvp, setRsvp] = useState(false);
  const [glowNotes, setGlowNotes] = useState(INITIAL_GLOW_NOTES);
  const [noteInput, setNoteInput] = useState('');
  const [spotlightVotes, setSpotlightVotes] = useState({});
  const [quizStep, setQuizStep] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [circleSheet, setCircleSheet] = useState(false);

  function handleRsvp() {
    setRsvp((prev) => !prev);
  }

  function handleAddNote(e) {
    e.preventDefault();
    const note = noteInput.trim();
    if (!note) return;
    const newNote = {
      id: Date.now(),
      name: 'You',
      note,
      ritual: 'Glow note',
      likes: 1,
    };
    setGlowNotes((prev) => [newNote, ...prev]);
    setNoteInput('');
  }

  function handleVote(spotlightId) {
    setSpotlightVotes((prev) => ({
      ...prev,
      [spotlightId]: (prev[spotlightId] || 0) + 1,
    }));
  }

  function handleQuizSelect() {
    if (quizStep < CLUB_QUIZ.length - 1) {
      setQuizStep((prev) => prev + 1);
    } else {
      setQuizDone(true);
    }
  }

  function resetQuiz() {
    setQuizStep(0);
    setQuizDone(false);
  }

  const todayCircle = WEEKLY_CIRCLES[4]; // Friday community circle as "tonight's circle"

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#ffffff] text-ink pb-36">
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pt-4 md:px-8">
        <BackToHome className="fixed top-20 left-4 sm:left-6 z-30" />
      </div>

      {/* Aurora background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, rgba(244,114,182,0.18), transparent 40%),
            radial-gradient(circle at 85% 20%, rgba(124,58,237,0.16), transparent 42%),
            radial-gradient(circle at 50% 90%, rgba(255,143,178,0.14), transparent 45%)
          `,
        }}
      />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pt-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#e05297] backdrop-blur-md"
        >
          <Flower2 size={14} />
          NOORIVA Club
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="display-heading mt-6 text-5xl leading-[0.95] md:text-7xl"
        >
          Everyone
          <span className="block bg-gradient-to-r from-[#f472b6] via-[#ff8fb2] to-[#c084fc] bg-clip-text text-transparent">
            blooms here.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg"
        >
          A co-ed garden of glow. Heart-to-heart talks, weekly live circles, spotlights,
          streaks, and a soft, honest safe space — for every woman, every man, every bloom.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={handleRsvp}
            className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition hover:scale-105 ${
              rsvp
                ? 'border border-green-500/30 bg-green-500/10 text-green-700'
                : 'bg-gradient-to-r from-[#f472b6] to-[#ff8fb2] text-white'
            }`}
          >
            {rsvp ? <Check size={16} /> : <Calendar size={16} />}
            {rsvp ? 'Spot saved for tonight' : "Save my spot for tonight's circle"}
          </button>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-7 py-3.5 text-sm font-bold text-ink backdrop-blur-md transition hover:scale-105"
          >
            Find My Ritual <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {SAFE_SPACE_BADGES.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-xs font-semibold text-ink/70"
            >
              <badge.icon size={14} className="text-[#e05297]" />
              {badge.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-ink/70"
        >
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
          <CountUp target={2340} /> glowing together
        </motion.div>
      </section>

      {/* Orb + tonight's circle */}
      <section className="relative z-10 mx-auto mt-16 max-w-6xl px-4">
        <div className="glass grid grid-cols-1 items-center gap-8 rounded-[2.5rem] p-8 md:grid-cols-2 md:p-12">
          <ClubOrb />
          <div className="text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink/50">Tonight</p>
            <h2 className="display-heading text-3xl md:text-4xl">{todayCircle.label} Circle</h2>
            <p className="mt-2 flex items-center gap-2 text-ink/60">
              <Clock size={16} />
              {todayCircle.day} · {todayCircle.time}
            </p>
            <p className="mt-3 text-ink/70">{todayCircle.desc}</p>
            <button
              onClick={handleRsvp}
              className={`mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:scale-105 ${
                rsvp
                  ? 'border border-green-500/30 bg-green-500/10 text-green-700'
                  : 'bg-ink text-white'
              }`}
            >
              {rsvp ? <Check size={16} /> : <Star size={16} />}
              {rsvp ? 'You are on the list' : 'RSVP for tonight'}
            </button>
          </div>
        </div>
      </section>

      {/* Spotlights + voting */}
      <section className="relative z-10 mx-auto mt-20 max-w-6xl px-4">
        <div className="mb-6">
          <h2 className="display-heading text-3xl md:text-4xl">Today&apos;s Spotlights</h2>
          <p className="mt-2 text-ink/60">Every bloom gets its moment. Vote for who shines next.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SPOTLIGHTS.map((spotlight, index) => {
            const votes = spotlightVotes[spotlight.id] || 0;
            return (
              <motion.div
                key={spotlight.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-[2rem] p-6 text-center"
              >
                <motion.div
                  initial={{ y: -20, opacity: 0, rotate: -12 }}
                  whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                >
                  <Crown size={32} className="mx-auto text-[#22d3ee]" />
                </motion.div>
                <span className="mt-4 block text-4xl">{spotlight.emoji}</span>
                <h3 className="mt-2 text-xl font-bold">{spotlight.name}</h3>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e05297]">
                  {spotlight.title}
                </p>
                <p className="mt-3 text-sm italic text-ink/60">“{spotlight.quote}”</p>
                <button
                  onClick={() => handleVote(spotlight.id)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs font-bold text-ink transition hover:scale-105"
                >
                  <Heart size={14} className={votes > 0 ? 'text-[#e05297]' : ''} />
                  {votes > 0 ? `${votes} votes` : 'Vote for spotlight'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Weekly circles schedule + mobile bottom sheet */}
      <section className="relative z-10 mx-auto mt-20 max-w-6xl px-4">
        <div className="mb-6">
          <h2 className="display-heading text-3xl md:text-4xl">Weekly Circles</h2>
          <p className="mt-2 text-ink/60">Five nights, five ways to glow together.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {WEEKLY_CIRCLES.map((circle, i) => (
            <motion.div
              key={circle.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-[2rem] p-6"
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ background: `${circle.color}22`, color: circle.color }}
              >
                <circle.icon size={20} />
              </span>
              <h3 className="mt-3 text-lg font-bold">{circle.label}</h3>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/40">
                {circle.day} · {circle.time}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{circle.desc}</p>
              <button
                onClick={() => setCircleSheet(true)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#e05297] hover:underline"
              >
                Join circle <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Streak badges */}
      <section className="relative z-10 mx-auto mt-16 max-w-6xl px-4">
        <div className="glass rounded-[2.5rem] p-8 md:p-10">
          <div className="flex items-center gap-2">
            <Trophy size={22} className="text-[#22d3ee]" />
            <h2 className="display-heading text-2xl md:text-3xl">Circle Streaks</h2>
          </div>
          <p className="mt-2 text-ink/60">Members who keep showing up, keep glowing.</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STREAK_BADGES.map((badge) => (
              <div key={badge.user} className="rounded-2xl border border-ink/10 bg-white/60 p-4 text-center">
                <span className="text-3xl">{badge.emoji}</span>
                <p className="mt-2 text-lg font-bold text-ink">{badge.streak} days</p>
                <p className="text-sm text-ink/50">{badge.user}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glow note wall + composer */}
      <section className="relative z-10 mx-auto mt-20 max-w-6xl px-4">
        <div className="mb-6">
          <h2 className="display-heading text-3xl md:text-4xl">Heart-to-Heart Wall</h2>
          <p className="mt-2 text-ink/60">Real words from the garden.</p>
        </div>

        <form onSubmit={handleAddNote} className="glass mb-6 flex flex-col gap-3 rounded-[2rem] p-5 sm:flex-row">
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Share a glow note with the garden..."
            className="min-h-[44px] flex-1 rounded-xl border border-ink/10 bg-white/80 px-4 text-sm outline-none transition focus:border-ink/30"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2 text-sm font-bold text-white transition hover:opacity-90"
          >
            <Send size={14} /> Post note
          </button>
        </form>

        <Marquee items={glowNotes} />
      </section>

      {/* Voice-note wall preview */}
      <section className="relative z-10 mx-auto mt-16 max-w-6xl px-4">
        <div className="glass rounded-[2.5rem] p-8 md:p-10">
          <div className="flex items-center gap-2">
            <Mic size={22} className="text-[#e05297]" />
            <h2 className="display-heading text-2xl md:text-3xl">Voice Notes</h2>
          </div>
          <p className="mt-2 text-ink/60">Sometimes words feel better spoken.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-ink/10 bg-white/70 p-5">
                <div className="flex items-center gap-3">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e05297] text-white">
                    <Play size={16} />
                  </button>
                  <div className="flex-1">
                    <div className="flex h-2 items-center gap-0.5">
                      {Array.from({ length: 20 }).map((_, j) => (
                        <span key={j} className="w-1 rounded-full bg-ink/30" style={{ height: `${4 + Math.abs(Math.sin(j * 0.7)) * 18}px` }} />
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-ink/50">Voice note {i} · 0:24</p>
                  </div>
                  <Volume2 size={16} className="text-ink/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UGC feed */}
      <section className="relative z-10 mx-auto mt-20 max-w-6xl px-4">
        <div className="mb-6">
          <h2 className="display-heading text-3xl md:text-4xl">Real Glow, Real People</h2>
          <p className="mt-2 text-ink/60">From our #DrinkYourNaturalGlow community.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {UGC_POSTS.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.03 }}
              className="glass overflow-hidden rounded-[1.5rem]"
            >
              <div
                className="flex h-28 items-center justify-center text-4xl"
                style={{ background: `linear-gradient(135deg, ${post.color}33, ${post.color}11)` }}
              >
                {post.ritual === 'ROSE HALO' ? '🌹' : post.ritual === 'MANGO BLAZE' ? '🥭' : post.ritual === 'BERRY BLOOM' ? '🍓' : post.ritual === 'SAFFRON MIST' ? '🌼' : post.ritual === 'COCO GLOW' ? '🥥' : '🍋'}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-ink/60">
                  {post.platform === 'instagram' ? <Instagram size={13} /> : <Music2 size={13} />}
                  {post.user}
                </div>
                <p className="mt-1 text-sm font-bold">{post.ritual}</p>
                <p className="text-xs text-ink/50">{post.note}</p>
                <p className="mt-2 text-xs font-semibold text-ink/40">♥ {post.likes}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ambassador cross-link */}
      <section className="relative z-10 mx-auto mt-16 max-w-6xl px-4">
        <Link
          href="/ambassador"
          className="group flex items-center justify-between rounded-[2rem] border border-ink/10 bg-gradient-to-r from-[#fff0f3] to-[#f3e8ff] p-6 transition hover:scale-[1.01]"
        >
          <div>
            <Crown size={20} className="text-[#22d3ee]" />
            <h3 className="mt-2 text-xl font-bold">Ambassador Hub</h3>
            <p className="text-sm text-ink/60">Love NOORIVA? Grow with us, earn rewards.</p>
          </div>
          <ArrowRight className="text-ink/40 transition group-hover:translate-x-1" size={20} />
        </Link>
      </section>

      {/* Onboarding mini quiz */}
      <section className="relative z-10 mx-auto mt-20 max-w-6xl px-4 pb-24">
        <div className="glass rounded-[2.5rem] p-8 md:p-12">
          <h2 className="display-heading text-3xl md:text-4xl">Which circle fits you?</h2>
          <p className="mt-2 text-ink/60">Answer 3 quick taps to find your community match.</p>

          {quizDone ? (
            <div className="mt-8 text-center">
              <span className="text-5xl">🌸</span>
              <h3 className="mt-4 text-2xl font-bold">You belong in the Skin Circle</h3>
              <p className="mt-2 text-ink/60">Soft glow, honest conversations, and beauty-from-within.</p>
              <button onClick={resetQuiz} className="mt-6 text-sm font-bold text-[#e05297] hover:underline">
                Retake quiz
              </button>
            </div>
          ) : (
            <div className="mt-8">
              <p className="text-lg font-semibold">{CLUB_QUIZ[quizStep].question}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {CLUB_QUIZ[quizStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={handleQuizSelect}
                    className="rounded-2xl border border-ink/10 bg-white/70 p-4 text-left text-ink transition hover:border-[#e05297] hover:bg-pink-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile bottom sheet for today's circles */}
      <div className="fixed bottom-24 left-1/2 z-30 -translate-x-1/2 sm:hidden">
        <button
          onClick={() => setCircleSheet((prev) => !prev)}
          className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white shadow-lg"
        >
          <Calendar size={14} /> Today&apos;s circles
        </button>
        <AnimatePresence>
          {circleSheet && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-14 left-1/2 w-72 -translate-x-1/2 rounded-2xl border border-ink/10 bg-white p-4 shadow-xl"
            >
              {WEEKLY_CIRCLES.map((circle) => (
                <div key={circle.id} className="flex items-center gap-3 py-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: `${circle.color}22`, color: circle.color }}>
                    <circle.icon size={14} />
                  </span>
                  <span className="flex-1 text-sm font-semibold">{circle.label}</span>
                  <span className="text-xs text-ink/50">{circle.time}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
