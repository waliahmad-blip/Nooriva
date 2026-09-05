'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';

export default function NoorixFeatureCard({ feature, index, title, onClick }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 18, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 18, mass: 0.6 });
  const accent = feature.color || '#ff8fb2';
  const Icon = feature.icon;

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current?.style.setProperty('--nfc-x', `${x}%`);
    cardRef.current?.style.setProperty('--nfc-y', `${y}%`);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    cardRef.current?.style.setProperty('--nfc-x', '50%');
    cardRef.current?.style.setProperty('--nfc-y', '50%');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="nfc-root"
    >
      <motion.button
        ref={cardRef}
        type="button"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          '--nfc-accent': accent,
        }}
        className="nfc-card"
      >
        <span className="nfc-border" aria-hidden="true" />
        <span className="nfc-spotlight" aria-hidden="true" />
        <span className="nfc-shine" aria-hidden="true" />

        <span className="nfc-content" style={{ transform: 'translateZ(28px)' }}>
          <span className="nfc-topline">
            <span className="nfc-index">{String(index + 1).padStart(2, '0')}</span>
            {feature.featured && (
              <span className="nfc-featured">
                <Star size={10} fill="currentColor" />
                Featured
              </span>
            )}
          </span>

          <span className="nfc-icon-wrap">
            <span className="nfc-icon-ring" />
            <Icon size={21} strokeWidth={1.7} className="nfc-icon" />
          </span>

          <span className="nfc-title-row">
            <span className="nfc-tagline">{feature.tagline}</span>
            <h3 className="nfc-title">{title}</h3>
          </span>

          <p className="nfc-desc">{feature.description}</p>

          <span className="nfc-highlights">
            {feature.highlights?.slice(0, 3).map((highlight) => (
              <span key={highlight} className="nfc-highlight">
                <Check size={10} strokeWidth={2.6} />
                {highlight}
              </span>
            ))}
          </span>

          <span className="nfc-footer">
            <span className="nfc-cta">Analyze now</span>
            <span className="nfc-arrow">
              <ArrowRight size={16} />
            </span>
          </span>
        </span>
      </motion.button>

      <style>{`
        .nfc-root { perspective: 1400px; height: 100%; }
        .nfc-card {
          position: relative; width: 100%; height: 100%; min-height: 300px;
          border: none; border-radius: 28px; background: transparent; cursor: pointer;
          text-align: left; transform-style: preserve-3d; will-change: transform;
          outline: none; transition: box-shadow 0.5s ease;
        }
        .nfc-card:hover { box-shadow: 0 30px 90px rgba(26, 20, 16, 0.18), 0 20px 50px rgba(26, 20, 16, 0.08); }
        .nfc-border {
          position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
          background: linear-gradient(140deg, rgba(255,255,255,0.85), rgba(255,255,255,0.1) 25%, var(--nfc-accent) 48%, rgba(255,255,255,0.1) 72%, rgba(255,255,255,0.7));
          background-size: 260% 260%;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          animation: nfc-border-flow 7s ease infinite;
          pointer-events: none; z-index: 0;
          transition: filter 0.5s ease, opacity 0.5s ease;
        }
        .nfc-card:hover .nfc-border { filter: saturate(1.75) brightness(1.35); }
        .nfc-spotlight {
          position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(520px circle at var(--nfc-x, 50%) var(--nfc-y, 50%), color-mix(in srgb, var(--nfc-accent) 22%, transparent), transparent 46%);
          opacity: 0; pointer-events: none; z-index: 1; transition: opacity 0.45s ease;
        }
        .nfc-card:hover .nfc-spotlight { opacity: 1; }
        .nfc-shine {
          position: absolute; top: -130%; left: -120%; width: 60%; height: 340%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,0.75), transparent);
          transform: rotate(15deg); z-index: 4; pointer-events: none; opacity: 0;
          transition: opacity 0.35s ease, transform 1s cubic-bezier(0.22,1,0.36,1);
        }
        .nfc-card:hover .nfc-shine { opacity: 0.5; transform: translateX(280%) rotate(15deg); }
        .nfc-content {
          position: relative; z-index: 3; display: flex; flex-direction: column; gap: 14px; height: 100%;
          border-radius: inherit; padding: 22px;
          background: linear-gradient(165deg, rgba(255,255,255,0.92), rgba(255,255,255,0.7));
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); overflow: hidden;
        }
        .nfc-topline, .nfc-title-row, .nfc-highlights, .nfc-footer { display: flex; align-items: center; }
        .nfc-topline { justify-content: space-between; }
        .nfc-index { font-size: 11px; letter-spacing: 0.16em; font-weight: 800; color: rgba(26,20,16,0.38); text-transform: uppercase; }
        .nfc-featured { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #d97706; background: rgba(251,191,36,0.14); padding: 4px 8px; border-radius: 999px; }
        .nfc-icon-wrap { position: relative; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 17px; background: linear-gradient(140deg, color-mix(in srgb, var(--nfc-accent) 24%, transparent), color-mix(in srgb, var(--nfc-accent) 7%, #ffffff)); box-shadow: 0 14px 34px color-mix(in srgb, var(--nfc-accent) 26%, transparent), inset 0 1px 0 rgba(255,255,255,0.55); }
        .nfc-icon-ring { position: absolute; inset: -6px; border-radius: 21px; border: 1px solid color-mix(in srgb, var(--nfc-accent) 32%, transparent); animation: nfc-ring-pulse 3s ease infinite; }
        .nfc-icon { color: color-mix(in srgb, var(--nfc-accent) 86%, #1a1410); }
        .nfc-title-row { flex-direction: column; align-items: flex-start; gap: 5px; }
        .nfc-tagline { font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--nfc-accent); }
        .nfc-title { font-size: 21px; line-height: 1.2; font-weight: 800; color: #1a1410; letter-spacing: -0.02em; }
        .nfc-desc { font-size: 13.5px; line-height: 1.55; color: rgba(26,20,16,0.58); font-weight: 500; }
        .nfc-highlights { flex-wrap: wrap; gap: 6px; margin-top: auto; }
        .nfc-highlight { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 650; color: rgba(26,20,16,0.72); background: rgba(26,20,16,0.04); border: 1px solid rgba(26,20,16,0.06); padding: 5px 8px; border-radius: 999px; }
        .nfc-highlight svg { color: var(--nfc-accent); }
        .nfc-footer { justify-content: space-between; padding-top: 6px; border-top: 1px solid rgba(26,20,16,0.06); }
        .nfc-cta { font-size: 13px; font-weight: 800; color: #1a1410; transition: color 0.3s ease; }
        .nfc-card:hover .nfc-cta { color: var(--nfc-accent); }
        .nfc-arrow { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 999px; background: #1a1410; color: #fff; transition: transform 0.35s ease, background 0.35s ease; }
        .nfc-card:hover .nfc-arrow { background: var(--nfc-accent); transform: translateX(4px); }
        @keyframes nfc-border-flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes nfc-ring-pulse { 0%,100% { opacity: 0.28; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.06); } }
      `}</style>
    </motion.div>
  );
}
