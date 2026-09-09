'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Camera, Zap } from 'lucide-react';
import { FEATURE_TEMPLATES } from './featureTemplates';

export default function NoorixFeatureCard({ feature, index, title, onClick, onSelectTemplate }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 18, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 18, mass: 0.6 });
  const accent = feature.color || '#ff8fb2';
  const Icon = feature.icon;
  const templates = FEATURE_TEMPLATES[feature.id] || [];

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
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="nfc-root"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          '--nfc-accent': accent,
        }}
        className="nfc-card group"
      >
        <span className="nfc-border" aria-hidden="true" />
        <span className="nfc-spotlight" aria-hidden="true" />

        <div className="nfc-content" style={{ transform: 'translateZ(24px)' }}>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/40">
              #{String(index + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
              {feature.priority === 'high' && (
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-red-400 bg-red-500/15 border border-red-500/30">
                  🔥 High Priority
                </span>
              )}
              {feature.needsImage ? (
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/15 border border-cyan-500/30">
                  <Camera size={10} /> Photo / Video
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-purple-300 bg-purple-500/15 border border-purple-500/30">
                  <Zap size={10} /> Quick Intake
                </span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 mt-1">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${accent}33, #0a0a14)`,
                borderColor: `${accent}55`,
                boxShadow: `0 8px 24px -4px ${accent}40`,
              }}
            >
              <Icon size={20} style={{ color: accent }} />
            </div>

            <div className="flex-1 min-w-0">
              <span className="font-mono text-[9px] font-extrabold tracking-[0.2em] uppercase" style={{ color: accent }}>
                {feature.tagline}
              </span>
              <h3 className="font-serif text-base font-bold text-white tracking-wide truncate mt-0.5">
                {title}
              </h3>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-white/70 font-normal line-clamp-2 mt-0.5">
            {feature.description}
          </p>

          {templates.length > 0 && (
            <div className="mt-auto pt-2 border-t border-white/10">
              <span className="block font-mono text-[8px] font-bold tracking-[0.2em] text-white/40 uppercase mb-1.5">
                ✦ STARTER TEMPLATES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {templates.slice(0, 2).map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectTemplate) {
                        onSelectTemplate(feature.id, tpl);
                      } else if (onClick) {
                        onClick();
                      }
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-medium text-white/80 transition hover:border-cyan-400/60 hover:bg-cyan-500/15 hover:text-cyan-200"
                  >
                    <Sparkles size={9} style={{ color: accent }} />
                    <span className="truncate max-w-[130px]">{tpl.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-1">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
              Launch Diagnostic
            </span>
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-black transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: accent }}
            >
              <ArrowRight size={14} strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </motion.div>

      <style>{`
        .nfc-root { perspective: 1400px; height: 100%; }
        .nfc-card {
          position: relative; width: 100%; height: 100%; min-height: 290px;
          border-radius: 24px; cursor: pointer; text-align: left;
          transform-style: preserve-3d; will-change: transform; outline: none;
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .nfc-card:hover {
          box-shadow: 0 20px 60px -10px var(--nfc-accent), 0 0 30px rgba(0, 0, 0, 0.8);
        }
        .nfc-border {
          position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
          background: linear-gradient(135deg, rgba(255,255,255,0.4), var(--nfc-accent) 45%, rgba(255,255,255,0.1) 80%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          pointer-events: none; z-index: 1; transition: opacity 0.4s ease;
        }
        .nfc-card:hover .nfc-border { opacity: 1; filter: brightness(1.3); }
        .nfc-spotlight {
          position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(400px circle at var(--nfc-x, 50%) var(--nfc-y, 50%), color-mix(in srgb, var(--nfc-accent) 25%, transparent), transparent 60%);
          opacity: 0; pointer-events: none; z-index: 2; transition: opacity 0.3s ease;
        }
        .nfc-card:hover .nfc-spotlight { opacity: 1; }
        .nfc-content {
          position: relative; z-index: 3; display: flex; flex-direction: column; gap: 10px; height: 100%;
          border-radius: inherit; padding: 18px;
          background: linear-gradient(165deg, rgba(16, 16, 26, 0.88), rgba(8, 8, 14, 0.94));
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); overflow: hidden;
        }
      `}</style>
    </motion.div>
  );
}
