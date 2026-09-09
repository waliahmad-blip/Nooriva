'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Droplets } from 'lucide-react';

export default function GemstoneFluidPouch({
  colorA = '#22d3ee',
  colorB = '#a78bfa',
  frameColor = '#ffffff',
  className = '',
}) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 220, damping: 25 });
  const rotateY = useSpring(mouseX, { stiffness: 220, damping: 25 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px * 22);
    mouseY.set(-py * 18);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-[360px] w-full md:h-[450px] flex items-center justify-center select-none overflow-hidden ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Dynamic Ambient Fluid Aura */}
      <div className="pointer-events-none absolute -inset-8 flex items-center justify-center">
        <div
          className="h-64 w-64 rounded-full blur-[80px] transition-all duration-700 opacity-60"
          style={{
            background: `radial-gradient(circle, ${colorA} 0%, ${colorB} 50%, transparent 75%)`,
          }}
        />
      </div>

      {/* 3D Squeezable Fluid Pouch */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          y: { repeat: Infinity, duration: 4.2, ease: 'easeInOut' },
        }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Pouch Spout / Nozzle Cap */}
        <div className="relative z-20 flex flex-col items-center">
          <div className="h-5 w-10 rounded-t-md border border-white/60 bg-gradient-to-r from-slate-200 via-white to-slate-300 shadow-md" />
          <div className="h-2.5 w-14 border-x border-b border-white/60 bg-gradient-to-r from-slate-300 via-white to-slate-200 shadow-sm" />
          <div className="h-3 w-8 bg-slate-400/80" />
        </div>

        {/* 150ml Gemstone Pouch Body */}
        <div
          className="relative -mt-1 h-72 w-44 sm:h-80 sm:w-52 rounded-[2.5rem] border border-white/40 p-4 shadow-2xl backdrop-blur-2xl transition-all duration-500 overflow-hidden"
          style={{
            background: `linear-gradient(145deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, rgba(0,0,0,0.15) 100%)`,
            boxShadow: `0 25px 50px -12px ${colorA}55, inset 0 0 24px rgba(255,255,255,0.5)`,
          }}
        >
          {/* Internal Swirling Elixir Core */}
          <div
            className="absolute inset-2 rounded-[2rem] transition-all duration-700 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colorA}dd 0%, ${colorB}bb 50%, #0a0a0f 100%)`,
            }}
          >
            {/* Specular Light & Caustics */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/50 via-white/10 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/30 to-transparent blur-[2px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.4),transparent_60%)]" />

            {/* Sparkles Floating */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Sparkles className="text-white/60 animate-pulse" size={28} />
            </div>

            {/* Typography Seal */}
            <div className="absolute inset-x-0 bottom-6 flex flex-col items-center justify-center text-center px-2">
              <span className="font-mono text-[8px] tracking-[0.25em] text-white/90 uppercase font-bold">NOORIVA</span>
              <span className="font-mono text-[9px] font-bold tracking-wider text-white drop-shadow-md mt-1">150ML POUCH</span>
              <span className="font-mono text-[7px] text-white/70 tracking-widest mt-0.5">BIO-PHOTONIC ESSENCE</span>
            </div>
          </div>

          {/* Left / Right Squeeze Indentations (Simulating physical pouch folds) */}
          <div className="absolute inset-y-12 left-0 w-2 rounded-r-full bg-black/20 blur-[1px]" />
          <div className="absolute inset-y-12 right-0 w-2 rounded-l-full bg-white/30 blur-[1px]" />
        </div>
      </motion.div>
    </div>
  );
}
