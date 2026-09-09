'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Wind, Sparkles } from 'lucide-react';

export default function AtmosphericSkySphere({ weatherType = 'clear', uvIndex = 6, className = '' }) {
  const isRain = weatherType?.toLowerCase().includes('rain') || weatherType?.toLowerCase().includes('drizzle');
  const isCloud = weatherType?.toLowerCase().includes('cloud') || weatherType?.toLowerCase().includes('overcast');

  const gradientColors = isRain
    ? 'from-blue-600/30 via-slate-700/40 to-cyan-900/40'
    : isCloud
    ? 'from-indigo-600/30 via-slate-600/30 to-purple-900/40'
    : 'from-cyan-400/30 via-rose-500/20 to-purple-500/30';

  const glowColor = isRain ? 'rgba(56, 189, 248, 0.4)' : isCloud ? 'rgba(167, 139, 250, 0.4)' : 'rgba(34, 211, 238, 0.45)';

  return (
    <div className={`relative h-[340px] w-full md:h-[440px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 ${className}`}>
      {/* Radiant Atmospheric Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-80 w-80 rounded-full blur-[100px] transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
        />
      </div>

      {/* Orbiting Orbital Astrological Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
        className="pointer-events-none absolute h-64 w-64 rounded-full border border-dashed border-white/20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
        className="pointer-events-none absolute h-80 w-80 rounded-full border border-dotted border-cyan-400/20"
      />

      {/* The Central Atmospheric Sky Sphere */}
      <motion.div
        animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className={`relative flex h-56 w-56 sm:h-64 sm:w-64 flex-col items-center justify-center rounded-full border border-white/40 bg-gradient-to-tr ${gradientColors} shadow-2xl backdrop-blur-2xl p-6 text-center overflow-hidden`}
        style={{
          boxShadow: `0 20px 60px -10px ${glowColor}, inset 0 0 30px rgba(255,255,255,0.4)`,
        }}
      >
        {/* Specular Edge Highlights */}
        <div className="pointer-events-none absolute inset-x-8 top-3 h-10 rounded-full bg-gradient-to-b from-white/60 to-transparent blur-[1px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          {isRain ? (
            <CloudRain size={36} className="text-cyan-300 animate-pulse" />
          ) : isCloud ? (
            <Wind size={36} className="text-purple-300 animate-pulse" />
          ) : (
            <Sun size={36} className="text-cyan-300 animate-spin" style={{ animationDuration: '30s' }} />
          )}

          <div className="font-mono text-[9px] tracking-[0.25em] text-white/70 uppercase mt-3">
            UV INDEX {uvIndex} // {weatherType.toUpperCase()}
          </div>
          <div className="font-serif text-lg font-bold text-white tracking-wider mt-1 drop-shadow-md">
            ATMOSPHERE
          </div>
          <div className="font-mono text-[8px] text-cyan-200 tracking-widest mt-0.5">
            SOLAR CAUSTICS ENGINE
          </div>
        </div>
      </motion.div>
    </div>
  );
}
