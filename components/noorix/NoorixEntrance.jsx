'use client';

import { useMemo } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  Sparkles,
  ChevronRight,
  Camera,
  Salad,
  Moon,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Deterministic particle field (hydration-safe)
   No Math.random() at render time to avoid SSR
   mismatches. Positions derive from index math.
   ───────────────────────────────────────────── */
const PARTICLE_COUNT = 16;

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 53 + 7) % 100}%`,
  size: 2 + (index % 4),
  gold: index % 2 === 0,
  duration: 5 + (index % 5),
  delay: (index * 0.7) % 4,
  drift: 28 + (index % 4) * 12,
  peakOpacity: 0.35 + (index % 5) * 0.07,
}));

const FEATURE_HINTS = [
  { icon: Camera, label: 'Skin analysis' },
  { icon: Salad, label: 'Nutrition coaching' },
  { icon: Moon, label: 'Sleep optimization' },
  { icon: MessageCircle, label: 'Ask anything' },
];

const STATS = [
  { value: '49+', label: 'AI features' },
  { value: '3', label: 'Languages' },
  { value: '0', label: 'Typing required' },
];

export default function NoorixEntrance() {
  const prefersReducedMotion = useReducedMotion();

  /* Mouse parallax — springs keep motion buttery and calm. */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 52, damping: 18, mass: 0.7 });
  const springY = useSpring(rawY, { stiffness: 52, damping: 18, mass: 0.7 });

  const orbX = useTransform(springX, (value) => value * 14);
  const orbY = useTransform(springY, (value) => value * 10);
  const figureX = useTransform(springX, (value) => value * 7);
  const figureY = useTransform(springY, (value) => value * 5);
  const glowX = useTransform(springX, (value) => value * 20);
  const glowY = useTransform(springY, (value) => value * 14);

  /* Respect prefers-reduced-motion for all infinite loops. */
  const floatTransition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0, repeat: 0 }
        : { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    [prefersReducedMotion]
  );

  const ringTransition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0, repeat: 0 }
        : { duration: 24, repeat: Infinity, ease: 'linear' },
    [prefersReducedMotion]
  );

  function handleMouseMove(event) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x * 2);
    rawY.set(y * 2);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section className="noorix-entrance section-shell py-16 md:py-24" aria-labelledby="noorix-entrance-heading">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="noorix-entrance-card relative overflow-hidden rounded-[2.25rem] md:rounded-[2.75rem]"
      >
        {/* Layered holographic background */}
        <div className="noorix-entrance-backdrop" aria-hidden="true" />

        {/* Conic aurora */}
        <motion.div
          aria-hidden="true"
          className="noorix-aurora"
          animate={
            prefersReducedMotion
              ? { opacity: 0.55 }
              : { opacity: [0.35, 0.6, 0.35], rotate: [0, 20, 0], scale: [1, 1.08, 1] }
          }
          transition={{ duration: 14, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />

        {/* Mouse-tracked glow */}
        <motion.div
          aria-hidden="true"
          className="noorix-cursor-glow"
          style={{ x: glowX, y: glowY }}
        />

        {/* Deterministic particle field */}
        <div className="noorix-particle-field" aria-hidden="true">
          {PARTICLES.map((particle) => (
            <motion.span
              key={particle.id}
              className={`noorix-particle ${particle.gold ? 'is-gold' : 'is-soft'}`}
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
              }}
              animate={
                prefersReducedMotion
                  ? { opacity: 0.4 }
                  : {
                      y: [0, -particle.drift, 0],
                      opacity: [0, particle.peakOpacity, 0],
                    }
              }
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Grid texture */}
        <div className="noorix-grid-overlay" aria-hidden="true" />

        {/* Sheen sweep */}
        <motion.div
          aria-hidden="true"
          className="noorix-sheen"
          animate={
            prefersReducedMotion
              ? { x: '0%' }
              : { x: ['-140%', '240%'] }
          }
          transition={{ duration: 7, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 flex flex-col items-center justify-between gap-10 p-8 md:flex-row md:p-14 lg:p-16">
          {/* ══════════ Copy ══════════ */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E7D3A8]/20 bg-[#E7D3A8]/5 px-4 py-1.5 backdrop-blur-md"
            >
              <Sparkles size={14} className="text-[#E7D3A8]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E7D3A8]/75">
                Meet Noorix
              </span>
            </motion.div>

            <motion.h3
              id="noorix-entrance-heading"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="display-heading text-3xl leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[3.4rem]"
            >
              Your personal
              <span className="noorix-gradient-text block">glow intelligence.</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="mt-5 max-w-lg text-sm leading-relaxed text-white/55 md:text-base"
            >
              Skin analysis, nutrition coaching, sleep optimization, and more.
              <span className="font-semibold text-[#E7D3A8]"> No typing required.</span>{' '}
              Crafted for Pakistan, fluent in Urdu, Arabic, and English.
            </motion.p>

            {/* Feature hints */}
            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start"
            >
              {FEATURE_HINTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/65 backdrop-blur-md transition-colors hover:border-[#E7D3A8]/30 hover:text-white/90"
                >
                  <Icon size={13} className="text-[#C79A44]" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </motion.ul>

            {/* CTA + micro stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.62, duration: 0.55 }}
              className="mt-8 flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-start"
            >
              <Link
                href="/noorix"
                className="noorix-cta group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#E7D3A8] via-[#D7B36A] to-[#C79A44] px-7 py-3.5 text-sm font-extrabold text-[#1a1a2e] shadow-[0_10px_35px_rgba(231,211,168,0.22)] transition-all duration-300 hover:shadow-[0_16px_45px_rgba(231,211,168,0.35)] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E7D3A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16213e] active:scale-[0.98]"
              >
                <Sparkles size={16} aria-hidden="true" />
                Meet Noorix
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <dl className="flex items-center gap-5">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-lg font-extrabold tracking-tight text-white md:text-xl">
                      {stat.value}
                    </dd>
                    <dd className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          {/* ══════════ Holographic figure ══════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.78, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex shrink-0 items-center justify-center"
          >
            <motion.div
              className="relative flex h-52 w-52 items-center justify-center rounded-full md:h-72 md:w-72"
              style={{
                x: orbX,
                y: orbY,
                background:
                  'radial-gradient(circle at 50% 50%, rgba(231,211,168,0.16) 0%, rgba(231,211,168,0.06) 45%, transparent 72%)',
              }}
            >
              {/* Soft ambient halo */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(231,211,168,0.18)',
                  boxShadow:
                    'inset 0 0 60px rgba(231,211,168,0.08), 0 0 90px rgba(199,154,68,0.12)',
                }}
                aria-hidden="true"
              />

              {/* Rotating outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#E7D3A8]/15"
                style={{ transformOrigin: 'center' }}
                animate={{ rotate: prefersReducedMotion ? 0 : 360 }}
                transition={ringTransition}
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E7D3A8] shadow-[0_0_14px_4px_rgba(231,211,168,0.5)]" />
              </motion.div>

              {/* Counter-rotating dashed ring */}
              <motion.div
                className="absolute inset-3 rounded-full border border-dashed border-[#E7D3A8]/10"
                animate={{ rotate: prefersReducedMotion ? 0 : -360 }}
                transition={{ ...ringTransition, duration: 34 }}
                aria-hidden="true"
              />

              {/* Floating figure */}
              <motion.img
                src="/noorix/noorix-figure.png"
                alt="Noorix — your personal glow guide"
                width={200}
                height={300}
                loading="eager"
                decoding="async"
                className="relative z-10 max-h-52 object-contain drop-shadow-[0_0_24px_rgba(231,211,168,0.28)] brightness-105 md:max-h-72"
                style={{ x: figureX, y: figureY }}
                animate={{ y: prefersReducedMotion ? 0 : [0, -9, 0] }}
                transition={floatTransition}
              />

              {/* Focus glow under figure */}
              <div
                className="absolute bottom-2 h-3 w-24 rounded-full bg-[#C79A44]/25 blur-md"
                style={{ animation: prefersReducedMotion ? 'none' : 'pulse 4s ease-in-out infinite' }}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Accent corner glints */}
        <div className="noorix-corner noorix-corner--top" aria-hidden="true" />
        <div className="noorix-corner noorix-corner--bottom" aria-hidden="true" />

        <style jsx>{`
          .noorix-entrance-card {
            border: 1px solid rgba(231, 211, 168, 0.14);
            box-shadow:
              0 40px 120px rgba(10, 10, 20, 0.55),
              0 20px 50px rgba(10, 10, 20, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.06);
            background-color: #1a1a2e;
          }

          .noorix-entrance-backdrop {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(circle at 20% 15%, rgba(199, 154, 68, 0.22), transparent 40%),
              radial-gradient(circle at 85% 75%, rgba(15, 52, 96, 0.55), transparent 50%),
              linear-gradient(135deg, #1a1a2e 0%, #16213e 48%, #0f3460 100%);
          }

          .noorix-aurora {
            position: absolute;
            inset: -28%;
            background: conic-gradient(
              from 180deg at 50% 50%,
              transparent 0deg,
              rgba(231, 211, 168, 0.14) 38deg,
              rgba(199, 154, 68, 0.1) 74deg,
              transparent 122deg,
              rgba(103, 232, 249, 0.08) 185deg,
              transparent 240deg,
              rgba(231, 211, 168, 0.12) 310deg,
              transparent 360deg
            );
            filter: blur(36px);
          }

          .noorix-cursor-glow {
            position: absolute;
            left: 25%;
            top: 30%;
            width: 440px;
            height: 440px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(231, 211, 168, 0.12) 0%, transparent 62%);
            pointer-events: none;
            will-change: transform;
          }

          .noorix-particle-field {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
          }

          .noorix-particle {
            position: absolute;
            border-radius: 999px;
            filter: blur(0.4px);
            will-change: transform, opacity;
          }

          .noorix-particle.is-gold {
            background: #e7d3a8;
            box-shadow: 0 0 8px rgba(231, 211, 168, 0.55);
          }

          .noorix-particle.is-soft {
            background: #c79a44;
            box-shadow: 0 0 6px rgba(199, 154, 68, 0.4);
          }

          .noorix-grid-overlay {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(231, 211, 168, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(231, 211, 168, 0.05) 1px, transparent 1px);
            background-size: 46px 46px;
            mask-image: radial-gradient(circle at 50% 50%, black 0%, transparent 75%);
            -webkit-mask-image: radial-gradient(circle at 50% 50%, black 0%, transparent 75%);
            opacity: 0.6;
          }

          .noorix-sheen {
            position: absolute;
            top: -60%;
            bottom: -60%;
            left: 0;
            width: 38%;
            background: linear-gradient(
              105deg,
              transparent,
              rgba(255, 255, 255, 0.055),
              rgba(231, 211, 168, 0.1),
              transparent
            );
            transform: rotate(12deg);
            pointer-events: none;
          }

          .noorix-gradient-text {
            background: linear-gradient(100deg, #f5e7c6 0%, #e7d3a8 35%, #c79a44 70%, #e7d3a8 100%);
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-pan 6s linear infinite;
          }

          .noorix-corner {
            position: absolute;
            width: 110px;
            height: 110px;
            border: 1px solid rgba(231, 211, 168, 0.12);
            border-radius: 24px;
            pointer-events: none;
          }

          .noorix-corner--top {
            top: -55px;
            right: -55px;
            transform: rotate(45deg);
          }

          .noorix-corner--bottom {
            bottom: -55px;
            left: -55px;
            transform: rotate(45deg);
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
            width: 36%;
            background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.45), transparent);
            transform: skewX(-18deg);
            transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .noorix-cta:hover::after {
            transform: translateX(300%) skewX(-18deg);
          }

          @keyframes gradient-pan {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 200% 50%;
            }
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 0.35;
              transform: scaleX(1);
            }
            50% {
              opacity: 0.7;
              transform: scaleX(1.25);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .noorix-gradient-text,
            .noorix-aurora,
            .no-orix-particle,
            .noorix-sheen {
              animation: none !important;
            }
          }
        `}</style>
      </motion.div>
    </section>
  );
}
