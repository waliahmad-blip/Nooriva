'use client';
import BackToHome from "@/components/ui/BackToHome";

import { useState } from 'react';
import dynamic from 'next/dynamic';

const LiquidMetamorphosisDroplet = dynamic(() => import('@/components/three/LiquidMetamorphosisDroplet'), { ssr: false });
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Share2,
  RefreshCw,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '@/lib/store';

const QUESTIONS = [
  {
    key: 'goal',
    title: 'What does your skin want most?',
    options: [
      { value: 'radiance', label: 'Radiance', emoji: '✨', color: '#ff8fb2' },
      { value: 'energy', label: 'Energy', emoji: '⚡', color: '#fbbf24' },
      { value: 'calm', label: 'Calm & Sleep', emoji: '🌙', color: '#a78bfa' },
      { value: 'skin', label: 'Skin Food', emoji: '🌿', color: '#5eead4' },
    ],
  },
  {
    key: 'taste',
    title: 'Which flavor world calls you?',
    options: [
      { value: 'rose', label: 'Rose & Saffron', emoji: '🌹', color: '#ff8fb2' },
      { value: 'berry', label: 'Berry & Pomegranate', emoji: '🍓', color: '#f472b6' },
      { value: 'mango', label: 'Mango & Ginger', emoji: '🥭', color: '#f59e0b' },
      { value: 'citrus', label: 'Yuzu & Aloe', emoji: '🍋', color: '#67e8f9' },
    ],
  },
  {
    key: 'time',
    title: 'How much time for your ritual?',
    options: [
      { value: 'quick', label: '2 minutes', emoji: '⏱️', color: '#5eead4' },
      { value: 'medium', label: '5 minutes', emoji: '🕐', color: '#fbbf24' },
      { value: 'slow', label: '15+ minutes', emoji: '🧖', color: '#a78bfa' },
    ],
  },
];

const RESULTS = {
  radiance: { name: 'ROSE HALO', slug: 'rose-halo', note: 'Wake up luminous — floral skin food.', color: '#ff8fb2' },
  energy: { name: 'MANGO BLAZE', slug: 'mango-blaze', note: 'Burn bright — clean botanical energy.', color: '#f59e0b' },
  calm: { name: 'PEACH DUSK', slug: 'peach-dusk', note: 'Sleep beautiful — soft evening calm.', color: '#fbbf24' },
  skin: { name: 'ALOE TIDE', slug: 'aloe-tide', note: 'Barrier of light — hydration naturally.', color: '#22d3ee' },
};

export default function GlowQuizPage() {
  const addToCart = useStore((s) => s.addToCart);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [shared, setShared] = useState(false);

  const current = QUESTIONS[step];
  const result = answers.goal ? RESULTS[answers.goal] : RESULTS.radiance;

  function select(value) {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setDone(false);
    setShared(false);
  }

  function share() {
    const text = `My NOORIVA ritual is ${result.name} — ${result.note}. Find yours at nooriva.ai #DrinkYourNaturalGlow #NOORIVA`;
    if (navigator.share) {
      navigator.share({ title: 'NOORIVA Glow Quiz', text });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#ffffff] text-ink pb-36">
      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 pt-20 md:px-8"><BackToHome className="mb-2 inline-block" /></div>
      {/* Aurora accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, rgba(255,143,178,0.16), transparent 40%),
            radial-gradient(circle at 85% 20%, rgba(167,139,250,0.14), transparent 42%),
            radial-gradient(circle at 50% 90%, rgba(94,234,212,0.12), transparent 45%)
          `,
        }}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        <div className="w-full max-w-xl">
          {/* Header */}
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#ff8fb2] backdrop-blur-md"
            >
              <Sparkles size={14} />
              Glow Quiz
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="display-heading mt-5 text-4xl leading-[0.95] md:text-6xl"
            >
              Find your
              <span className="block bg-gradient-to-r from-[#ff8fb2] to-[#a78bfa] bg-clip-text text-transparent">
                natural ritual.
              </span>
            </motion.h1>
          </div>

          
          {/* 3D Liquid Metamorphosis Droplet */}
          <div className="mx-auto mt-4 max-w-sm">
            <LiquidMetamorphosisDroplet step={done ? 3 : step} />
          </div>
  
          {/* Progress dots */}
          <div className="mt-8 flex items-center gap-2">
            {QUESTIONS.map((_, i) => (
              <motion.div
                key={i}
                className="h-2 flex-1 rounded-full"
                animate={{
                  width: i === step ? '100%' : undefined,
                  backgroundColor:
                    i <= step || done ? '#ff8fb2' : 'rgba(255,255,255,0.15)',
                  flex: i === step ? 2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="mt-10"
              >
                <h2 className="text-center text-2xl font-bold md:text-3xl">
                  {current.title}
                </h2>

                <div className="mt-6 grid gap-3">
                  {current.options.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => select(option.value)}
                      className="glass flex w-full items-center gap-4 rounded-2xl p-5 text-left transition"
                    >
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                        style={{ background: `${option.color}22` }}
                      >
                        {option.emoji}
                      </span>
                      <span className="flex-1 text-lg font-semibold">{option.label}</span>
                      <ArrowRight size={18} className="text-ink/30" />
                    </motion.button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink/50 transition hover:text-ink"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="mt-10 text-center"
              >
                {/* Confetti-ish sparkles */}
                <div className="flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="text-2xl"
                    >
                      ✨
                    </motion.span>
                  ))}
                </div>

                <div
                  className="mx-auto mt-8 h-36 w-28 rounded-[36%]"
                  style={{
                    background: `linear-gradient(160deg, ${result.color}, ${result.color}55 55%, #ffffff10)`,
                    boxShadow: `0 30px 80px ${result.color}44`,
                  }}
                />

                <h2 className="mt-6 text-3xl font-extrabold">{result.name}</h2>
                <p className="mt-2 text-lg italic text-ink/60">{result.note}</p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => addToCart(result.slug)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff8fb2] to-[#a78bfa] px-7 py-3.5 text-sm font-bold text-ink shadow-lg transition hover:scale-105 active:scale-95"
                  >
                    <ShoppingBag size={16} /> Add to Bag · ₨ 2,450
                  </button>

                  <Link
                    href={`/drinks/${result.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-6 py-3.5 text-sm font-bold text-ink backdrop-blur-md transition hover:bg-white hover:scale-105"
                  >
                    View Ritual <ArrowRight size={14} />
                  </Link>

                  <button
                    onClick={share}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/5 px-7 py-3.5 text-sm font-bold text-ink backdrop-blur-md transition hover:scale-105"
                  >
                    {shared ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
                    {shared ? 'Copied!' : 'Share result'}
                  </button>

                  <button
                    onClick={restart}
                    className="inline-flex items-center gap-2 rounded-full text-sm font-semibold text-ink/50 transition hover:text-ink"
                  >
                    <RefreshCw size={16} /> Retake
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
