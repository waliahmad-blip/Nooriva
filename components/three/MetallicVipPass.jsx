'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function MetallicVipPass({ className = '' }) {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -py * 20, y: px * 24 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-[380px] w-full md:h-[480px] flex items-center justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Ambient Laser Ring Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-cyan-500/20 blur-[80px] animate-pulse" />
      </div>

      {/* 3D Holographic Metallic VIP Pass Card */}
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          y: [0, -8, 0],
        }}
        transition={{
          rotateX: { type: 'spring', stiffness: 220, damping: 25 },
          rotateY: { type: 'spring', stiffness: 220, damping: 25 },
          y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
        }}
        className="relative z-10 flex h-72 w-48 sm:h-80 sm:w-56 flex-col justify-between rounded-3xl border border-white/40 p-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(34,211,238,0.15) 40%, rgba(167,139,250,0.2) 80%, rgba(255,255,255,0.1) 100%)',
          boxShadow: '0 25px 60px -10px rgba(34, 211, 238, 0.4), inset 0 0 24px rgba(255, 255, 255, 0.5)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic Iridescent Sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-transparent to-pink-400/20 opacity-80" />
        <div className="pointer-events-none absolute -inset-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.5),transparent_60%)]" />

        {/* Card Header */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-cyan-300 uppercase">
            VIP CREDENTIAL
          </span>
          <ShieldCheck size={18} className="text-cyan-400 drop-shadow" />
        </div>

        {/* Card Middle Brand */}
        <div className="relative z-10 text-center py-4">
          <div className="font-mono text-[8px] tracking-[0.3em] text-white/70 uppercase">
            AMBASSADOR GUILD
          </div>
          <div className="font-serif text-2xl font-bold tracking-wider text-white mt-1 drop-shadow-md">
            NOORIVA
          </div>
          <div className="font-mono text-[8px] text-cyan-200 tracking-widest mt-1">
            KEY PASS // LIFETIME ACCESS
          </div>
        </div>

        {/* Card Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-3 font-mono text-[8px] text-white/70">
          <span>ID: NRV-8820</span>
          <span>VERIFIED TIER</span>
        </div>
      </motion.div>
    </div>
  );
}
