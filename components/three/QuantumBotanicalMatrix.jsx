'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';

const BOTANICAL_COORDINATES = [
  { id: 'saffron', code: '01', name: 'KASHMIRI CROCIN', role: 'Luminescence', desc: 'Hand-harvested photonic crocin providing cellular radiance.' },
  { id: 'seabuckthorn', code: '02', name: 'SEA BUCKTHORN', role: 'Omega-7 Lipid', desc: 'Rare coastal plant oil restoring deep moisture.' },
  { id: 'date', code: '03', name: 'DATE ESSENCE', role: 'Prebiotic Depth', desc: 'High-density botanical oligosaccharides feeding micro-flora.' },
  { id: 'rose', code: '04', name: 'ROSE HYDROSOL', role: 'Floral Anchor', desc: 'Steam-distilled aromatic essence soothing tension.' },
  { id: 'amla', code: '05', name: 'CLARIFIED AMLA', role: 'Bio-Vitamin C', desc: 'Cold-clarified antioxidant concentrate stimulating collagen.' },
  { id: 'mastic', code: '06', name: 'CHIOS MASTIC', role: 'Balsamic Resin', desc: 'Aegean tear-drops purifying oral-gut microbiome.' },
  { id: 'allulose', code: '07', name: 'RARE ALLULOSE', role: 'Zero-GI Base', desc: 'Naturally occurring rare sugar delivering pure silky mouthfeel.' },
];

export default function QuantumBotanicalMatrix({ className = '' }) {
  const [activeId, setActiveId] = useState(null);
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const activeBotanical = BOTANICAL_COORDINATES.find((b) => b.id === activeId) || null;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -py * 16, y: px * 22 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setActiveId(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-[440px] w-full md:h-[500px] flex items-center justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Top Editorial HUD */}
      <div className="absolute top-4 inset-x-0 z-20 flex items-center justify-between px-6 pointer-events-none">
        <div className="flex items-center gap-2">
          <Compass size={13} className="text-cyan-400 animate-spin" style={{ animationDuration: '18s' }} />
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/50 uppercase">
            NOORIVA // PHYSICAL REFRACTION STAGE
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.25em] text-cyan-400 uppercase font-semibold">
          {activeBotanical ? `ACTIVE // ${activeBotanical.name}` : 'RESTING CORE // 150ML FLACON'}
        </span>
      </div>

      {/* Atmospheric Glow */}
      <div className="pointer-events-none absolute -inset-10 flex items-center justify-center">
        <div
          className="h-72 w-72 rounded-full blur-[90px] transition-all duration-700"
          style={{
            background: activeId
              ? 'radial-gradient(circle, rgba(34, 211, 238, 0.45) 0%, rgba(2, 132, 199, 0.2) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(2, 132, 199, 0.3) 0%, rgba(167, 139, 250, 0.15) 50%, transparent 80%)',
          }}
        />
      </div>
      {/* 3D Physical Crystal Flacon */}
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y, y: [0, -6, 0] }}
        transition={{
          rotateX: { type: 'spring', stiffness: 200, damping: 25 },
          rotateY: { type: 'spring', stiffness: 200, damping: 25 },
          y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
        }}
        className="relative z-10 flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="relative flex h-80 w-48 sm:h-92 sm:w-54 flex-col items-center justify-between rounded-[2.5rem] border border-white/40 p-5 shadow-2xl backdrop-blur-2xl transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(34,211,238,0.12) 40%, rgba(2,132,199,0.2) 80%, rgba(255,255,255,0.25) 100%)',
            boxShadow: activeId
              ? '0 25px 70px -10px rgba(34,211,238,0.55), inset 0 0 24px rgba(255,255,255,0.6)'
              : '0 25px 60px -15px rgba(2,132,199,0.4), inset 0 0 20px rgba(255,255,255,0.4)',
          }}
        >
          <div className="absolute inset-x-6 top-3 h-1 rounded-full bg-white/70 blur-[1px]" />
          <div className="relative -mt-9 flex h-9 w-20 items-center justify-center rounded-xl border border-white/60 bg-gradient-to-b from-white via-cyan-100 to-cyan-300 shadow-lg">
            <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-slate-800 uppercase">NOORIVA</span>
          </div>

          <div className="relative flex h-52 w-36 sm:h-60 sm:w-42 items-center justify-center rounded-2xl overflow-hidden shadow-inner">
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: activeId
                  ? 'radial-gradient(ellipse at center, #38bdf8 0%, #0284c7 60%, #0c4a6e 100%)'
                  : 'radial-gradient(ellipse at center, #22d3ee 0%, #0284c7 50%, #075985 100%)',
                opacity: 0.92,
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="text-white/60 animate-pulse" size={30} />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-3">
              <span className="font-mono text-[8px] tracking-[0.3em] text-cyan-200 uppercase font-bold">LIMITED RITUAL</span>
              <span className="font-serif text-lg font-bold tracking-wider text-white drop-shadow-md mt-1">NOORISH GOLD</span>
              <span className="font-mono text-[8px] text-white/80 tracking-widest mt-1">150 ML // BOTANICAL FLACON</span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between px-2 pt-2 border-t border-white/20 text-[8px] font-mono text-white/60">
            <span>BATCH: N-700</span>
            <span>PURITY: 99.8%</span>
          </div>
        </div>
      </motion.div>
      {/* Orbiting Interactive Botanical Nodes */}
      <div className="absolute inset-x-4 inset-y-12 z-20 pointer-events-none flex justify-between">
        <div className="flex flex-col justify-around pointer-events-auto">
          {BOTANICAL_COORDINATES.slice(0, 4).map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActiveId(item.id)}
                onClick={() => setActiveId(isActive ? null : item.id)}
                className={`group flex items-center gap-2 rounded-2xl border px-3 py-1.5 text-left backdrop-blur-xl transition-all duration-300 ${
                  isActive ? 'border-cyan-400 bg-cyan-950/80 shadow-lg shadow-cyan-500/30 scale-105' : 'border-white/15 bg-black/40 hover:border-white/40'
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-cyan-500/20 font-mono text-[8px] font-bold text-cyan-300">
                  {item.code}
                </span>
                <span className="hidden sm:inline font-mono text-[8px] font-bold tracking-wider text-white uppercase">{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col justify-around pointer-events-auto">
          {BOTANICAL_COORDINATES.slice(4).map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActiveId(item.id)}
                onClick={() => setActiveId(isActive ? null : item.id)}
                className={`group flex items-center gap-2 rounded-2xl border px-3 py-1.5 text-left backdrop-blur-xl transition-all duration-300 ${
                  isActive ? 'border-cyan-400 bg-cyan-950/80 shadow-lg shadow-cyan-500/30 scale-105' : 'border-white/15 bg-black/40 hover:border-white/40'
                }`}
              >
                <span className="hidden sm:inline font-mono text-[8px] font-bold tracking-wider text-white uppercase">{item.name}</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-cyan-500/20 font-mono text-[8px] font-bold text-cyan-300">
                  {item.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeBotanical && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none absolute bottom-4 z-30 max-w-sm rounded-2xl border border-cyan-400/50 bg-black/90 p-3 shadow-2xl backdrop-blur-2xl text-center"
          >
            <div className="font-mono text-[9px] font-bold text-cyan-400 uppercase tracking-widest mb-1">
              EXTRACT [{activeBotanical.code}] // {activeBotanical.name}
            </div>
            <p className="text-[10px] leading-relaxed text-white/80">{activeBotanical.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
