'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Sparkles } from 'lucide-react';

const STEP_COLORS = [
  { primary: '#ff8fb2', secondary: '#f472b6', label: 'FLORAL ESSENCE' },
  { primary: '#22d3ee', secondary: '#38bdf8', label: 'CELLULAR HYDRATION' },
  { primary: '#a78bfa', secondary: '#c084fc', label: 'NEURAL ADAPTOGEN' },
  { primary: '#34d399', secondary: '#10b981', label: 'METABOLIC RESET' },
];

export default function LiquidMetamorphosisDroplet({ step = 0, className = '' }) {
  const currentStep = STEP_COLORS[step % STEP_COLORS.length];

  return (
    <div className={`relative h-[300px] w-full md:h-[380px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 ${className}`}>
      {/* Ambient Morphing Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-60 w-60 rounded-full blur-[80px] transition-all duration-700 opacity-60"
          style={{ background: `radial-gradient(circle, ${currentStep.primary} 0%, ${currentStep.secondary} 50%, transparent 75%)` }}
        />
      </div>

      {/* Morphing Liquid Metamorphosis Droplet */}
      <motion.div
        animate={{
          scale: [1, 1.06, 0.96, 1],
          y: [0, -10, 0],
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
        className="relative z-10 flex h-48 w-48 sm:h-56 sm:w-56 flex-col items-center justify-center border border-white/50 p-6 text-center shadow-2xl backdrop-blur-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${currentStep.primary}bb 0%, ${currentStep.secondary}99 50%, rgba(10,10,15,0.85) 100%)`,
          boxShadow: `0 20px 60px -10px ${currentStep.primary}66, inset 0 0 25px rgba(255,255,255,0.6)`,
        }}
      >
        <div className="pointer-events-none absolute inset-x-4 top-2 h-14 bg-gradient-to-b from-white/60 to-transparent blur-[2px]" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <Droplet size={34} className="text-white drop-shadow-md animate-bounce" style={{ animationDuration: '3s' }} />
          <span className="font-mono text-[8px] tracking-[0.25em] text-white/90 uppercase font-bold mt-2">
            STEP 0{step + 1}
          </span>
          <span className="font-serif text-base font-bold text-white tracking-wider mt-0.5 drop-shadow">
            {currentStep.label}
          </span>
          <span className="font-mono text-[7px] text-white/70 tracking-widest mt-0.5">
            BIO-FORMULATION
          </span>
        </div>
      </motion.div>
    </div>
  );
}
