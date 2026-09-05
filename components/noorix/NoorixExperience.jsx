'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import LanguageToggle from '@/components/ui/LanguageToggle';

/* ─────────────────────────────────────────────
   Deterministic palette + scene data.
   No Math.random() at render time — protects
   against SSR hydration mismatches.
   ───────────────────────────────────────────── */

const AURA_COLORS = [
  '#ff5e99', // pink
  '#a78bfa', // violet
  '#22d3ee', // cyan
  '#5eead4', // mint
  '#fbbf24', // amber
  '#f472b6', // coral
];

const ORBS = [
  { color: '#ff5e99', size: 300, left: '8%', top: '12%', duration: 13, delay: 0 },
  { color: '#a78bfa', size: 380, left: '68%', top: '6%', duration: 17, delay: 2 },
  { color: '#22d3ee', size: 250, left: '74%', top: '52%', duration: 15, delay: 4 },
  { color: '#5eead4', size: 210, left: '18%', top: '58%', duration: 19, delay: 1 },
  { color: '#fbbf24', size: 170, left: '44%', top: '74%', duration: 14, delay: 3 },
];

const SPARKLES = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 23 + 7) % 100}%`,
  top: `${(index * 41 + 13) % 100}%`,
  size: 2 + (index % 4),
  color: AURA_COLORS[index % AURA_COLORS.length],
  duration: 5 + (index % 4) * 2,
  delay: (index * 0.7) % 4,
  drift: 28 + (index % 4) * 22,
}));

const FEATURE_CHIPS = [
  'Skin Intelligence',
  'Nutrition Coaching',
  'Sleep Optimization',
  'Urdu · Arabic · English',
  'Zero Typing Required',
];

/* ─────────────────────────────────────────────
   Time-aware greeting with hydration guard.
   ───────────────────────────────────────────── */

function Greeting() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good Afternoon');
    } else if (hour >= 18 && hour < 22) {
      setGreeting('Good Evening');
    } else {
      setGreeting('Good Night');
    }
  }, []);

  return <span suppressHydrationWarning>{greeting}</span>;
}

/* ─────────────────────────────────────────────
   Main experience shell.
   ───────────────────────────────────────────── */

export default function NoorixExperience() {
  const prefersReducedMotion = useReducedMotion();

  /* Mouse parallax — smoothed with springs for a calm, premium feel. */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 38, damping: 16, mass: 0.8 });
  const smoothY = useSpring(rawY, { stiffness: 38, damping: 16, mass: 0.8 });

  const heroX = useTransform(smoothX, (value) => value * 16);
  const heroY = useTransform(smoothY, (value) => value * 12);
  const orbX = useTransform(smoothX, (value) => value * 28);
  const orbY = useTransform(smoothY, (value) => value * 20);
  const glowX = useTransform(smoothX, (value) => value * 24);
  const glowY = useTransform(smoothY, (value) => value * 16);

  const dustAnimation = useMemo(
    () =>
      prefersReducedMotion
        ? { opacity: 0.35 }
        : {
            y: [0, -36, 0],
            opacity: [0.2, 0.75, 0.2],
            scale: [0.9, 1.15, 0.9],
          },
    [prefersReducedMotion]
  );

  function handleMouseMove(event) {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    rawX.set(x);
    rawY.set(y);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="noorix-shell fixed inset-0 z-0 flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#050509] text-white"
    >
      {/* Animated aurora mesh */}
      <div
        aria-hidden="true"
        className="noorix-aurora pointer-events-none absolute inset-0"
      />

      {/* Mouse-tracked cinematic glow */}
      <motion.div
        aria-hidden="true"
        className="noorix-mouse-glow pointer-events-none absolute left-[42%] top-[34%] h-[340px] w-[340px] rounded-full"
        style={{ x: glowX, y: glowY }}
      />

      {/* Deterministic floating color orbs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ x: orbX, y: orbY }}
      >
        {ORBS.map((orb) => (
          <motion.div
            key={orb.color}
            className="noorix-orb absolute rounded-full blur-[90px]"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.left,
              top: orb.top,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.55 }
                : {
                    x: [0, 60, -40, 0],
                    y: [0, -50, 40, 0],
                    scale: [1, 1.15, 0.95, 1],
                    opacity: [0.5, 0.8, 0.5, 0.7],
                  }
            }
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: prefersReducedMotion ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Sparse sparkle dust */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {SPARKLES.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="noorix-spark absolute rounded-full"
            style={{
              width: sparkle.size,
              height: sparkle.size,
              left: sparkle.left,
              top: sparkle.top,
              background: sparkle.color,
              filter: 'blur(0.7px)',
            }}
            animate={{
              y: prefersReducedMotion ? 0 : [0, -sparkle.drift, 0],
              opacity: dustAnimation.opacity,
              scale: dustAnimation.scale,
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: prefersReducedMotion ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Subtle grid texture */}
      <div aria-hidden="true" className="noorix-grid pointer-events-none absolute inset-0" />

      {/* Soft vignette */}
      <div aria-hidden="true" className="noorix-vignette pointer-events-none absolute inset-0" />

      {/* ─────────────── Center content ─────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ x: heroX, y: heroY }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="noorix-badge inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70 backdrop-blur-md"
        >
          <Sparkles size={12} className="text-[#ffd7a1]" aria-hidden="true" />
          Your Personal AI Glow Guide
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="noorix-title mt-6 text-6xl font-extrabold tracking-tight md:text-8xl"
        >
          NOORIX
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-5 text-lg text-white/80 md:text-xl"
        >
          <Greeting />, I&apos;m here to help you glow.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-3 max-w-md text-sm leading-relaxed text-white/55"
        >
          49 powerful AI features. Skin analysis, nutrition coaching, sleep
          optimization, and more. No typing required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.55 }}
          className="mt-7 flex flex-wrap justify-center gap-2"
        >
          {FEATURE_CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium text-white/60 backdrop-blur-md"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <Link
            href="/noorix/chat"
            className="noorix-cta group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white shadow-[0_0_40px_rgba(255,94,153,0.25)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[0_0_60px_rgba(167,139,250,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050509]"
          >
            Enter Chat Console
            <ChevronRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <p className="mt-4 text-xs text-white/35">
            Tap once — let Noorix handle the rest.
          </p>
        </motion.div>
      </motion.div>

      {/* Language toggle */}
      <div className="absolute right-6 top-6 z-20 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
        <LanguageToggle />
      </div>

      <style jsx>{`
        .noorix-aurora {
          background:
            radial-gradient(circle at 20% 30%, rgba(255, 94, 153, 0.35) 0%, transparent 45%),
            radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.35) 0%, transparent 45%),
            radial-gradient(circle at 50% 80%, rgba(34, 211, 238, 0.3) 0%, transparent 45%),
            radial-gradient(circle at 80% 80%, rgba(94, 234, 212, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 30% 70%, rgba(251, 191, 36, 0.2) 0%, transparent 45%);
          background-size: 180% 180%;
          animation: noorixAurora 16s ease-in-out infinite alternate;
        }

        .noorix-mouse-glow {
          background: radial-gradient(circle, rgba(255, 94, 153, 0.16) 0%, transparent 62%);
          filter: blur(10px);
          will-change: transform;
        }

        .noorix-orb {
          will-change: transform, opacity;
        }

        .noorix-grid {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(circle at 50% 50%, black 0%, transparent 72%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 0%, transparent 72%);
          opacity: 0.65;
        }

        .noorix-vignette {
          background: radial-gradient(circle at 50% 50%, transparent 45%, rgba(5, 5, 9, 0.7) 100%);
        }

        .noorix-title {
          background-image: linear-gradient(
            135deg,
            #ff5e99 0%,
            #ffd7a1 25%,
            #a78bfa 50%,
            #22d3ee 75%,
            #5eead4 100%
          );
          background-size: 220% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleShimmer 7s linear infinite;
          line-height: 0.95;
          letter-spacing: -0.04em;
          filter: drop-shadow(0 10px 34px rgba(167, 139, 250, 0.25));
        }

        .noorix-cta {
          position: relative;
          overflow: hidden;
        }

        .noorix-cta::after {
          content: '';
          position: absolute;
          top: -50%;
          bottom: -50%;
          left: 0;
          width: 38%;
          background: linear-gradient(
            105deg,
            transparent,
            rgba(255, 255, 255, 0.45),
            transparent
          );
          transform: skewX(-18deg);
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .noorix-cta:hover::after {
          transform: translateX(290%) skewX(-18deg);
        }

        @keyframes noorixAurora {
          0% {
            background-position: 0% 0%, 100% 0%, 50% 100%, 100% 100%, 0% 100%;
          }
          100% {
            background-position: 100% 100%, 0% 100%, 50% 0%, 0% 0%, 100% 0%;
          }
        }

        @keyframes titleShimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 220% 50%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .noorix-aurora,
          .noorix-title,
          .noorix-orb {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
