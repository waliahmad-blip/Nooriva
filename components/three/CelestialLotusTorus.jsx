'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Gem } from 'lucide-react';

export default function CelestialLotusTorus({ className = '' }) {
  return (
    <div className={`relative h-[360px] w-full md:h-[460px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 ${className}`}>
      {/* Radiant Violet / Gold Aura */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-gradient-to-tr from-purple-600/30 via-pink-500/20 to-cyan-500/30 blur-[90px] animate-pulse" />
      </div>

      {/* Orbiting Concentric Geometric Torus Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        className="pointer-events-none absolute h-60 w-60 rounded-full border border-dashed border-cyan-400/30"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
        className="pointer-events-none absolute h-72 w-72 rounded-full border border-dotted border-purple-400/30"
      />

      {/* Central Celestial VIP Emblem */}
      <motion.div
        animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="relative z-10 flex h-48 w-48 sm:h-56 sm:w-56 flex-col items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-white/25 via-purple-900/40 to-black/80 p-6 text-center shadow-2xl backdrop-blur-2xl"
        style={{
          boxShadow: '0 25px 60px -10px rgba(167, 139, 250, 0.4), inset 0 0 25px rgba(255, 255, 255, 0.35)',
        }}
      >
        <div className="relative mb-2">
          <Crown size={34} className="text-cyan-300 drop-shadow-lg" />
          <Sparkles size={16} className="absolute -top-1 -right-2 text-cyan-300 animate-pulse" />
        </div>

        <span className="font-mono text-[8px] tracking-[0.25em] text-cyan-300 uppercase font-bold">
          NOORIVA CLUB
        </span>
        <span className="font-serif text-lg font-bold text-white tracking-wider mt-1 drop-shadow-md">
          CELESTIAL VIP
        </span>
        <span className="font-mono text-[8px] text-white/60 tracking-widest mt-0.5">
          PRIVATE BOTANICAL CIRCLE
        </span>
      </motion.div>
    </div>
  );
}
