'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Dna, Leaf, Shield } from 'lucide-react';

const BIO_CELLS = [
  { name: 'Kashmiri Saffron', phase: 'Photonic Crocin', color: '#38bdf8', desc: 'Hand-picked stigma extract providing photoprotective crocins.' },
  { name: 'Sea Buckthorn', phase: 'Omega-7 Lipid', color: '#22d3ee', desc: 'Rare coastal berry lipid restoring moisture barrier.' },
  { name: 'Date Essence', phase: 'Prebiotic Depth', color: '#f472b6', desc: 'Natural date sugars nourishing microflora balance.' },
  { name: 'Rose Hydrosol', phase: 'Floral Anchor', color: '#ff8fb2', desc: 'Steam-condensed Persian petals soothing stress signals.' },
  { name: 'Clarified Amla', phase: 'Bio-Vitamin C', color: '#34d399', desc: 'Tannin-stabilized natural ascorbic acid for collagen.' },
  { name: 'Chios Mastic', phase: 'Ancient Resin', color: '#a78bfa', desc: 'Aegean crystalline tears purifying microbiome wellness.' },
];

export default function BotanicalConstellation({ className = '' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`relative h-[380px] w-full md:h-[480px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/10 ${className}`}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-cyan-500/15 blur-[90px] animate-pulse" />
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
        className="pointer-events-none absolute h-56 w-56 rounded-full border border-dashed border-cyan-400/20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
        className="pointer-events-none absolute h-72 w-72 rounded-full border border-dashed border-white/10"
      />

      <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-white/30 bg-black/60 shadow-xl backdrop-blur-xl text-center">
        <Dna size={22} className="text-cyan-400 animate-pulse" />
        <span className="font-mono text-[7px] tracking-[0.2em] text-white/70 uppercase mt-1">BIO-CELL</span>
      </div>

      {/* Floating Bio-Cell Specimen Nodes in 2 Columns */}
      <div className="absolute inset-4 z-20 flex justify-between items-center pointer-events-none">
        {/* Left Column */}
        <div className="flex flex-col gap-3 pointer-events-auto">
          {BIO_CELLS.slice(0, 3).map((cell, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <motion.div
                key={cell.name}
                whileHover={{ scale: 1.05, x: 4 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`cursor-pointer rounded-2xl border p-2.5 backdrop-blur-xl transition-all duration-300 w-28 sm:w-44 ${
                  isHovered
                    ? 'border-cyan-400 bg-cyan-950/80 shadow-lg shadow-cyan-500/30'
                    : 'border-white/15 bg-black/40 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cell.color }} />
                  <span className="font-mono text-[8px] tracking-[0.15em] text-cyan-400 uppercase">SPECIMEN</span>
                </div>
                <div className="font-mono text-[10px] font-bold text-white uppercase mt-0.5">{cell.name}</div>
                <div className="text-[8px] text-white/60 tracking-wider mt-0.5">{cell.phase}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3 pointer-events-auto">
          {BIO_CELLS.slice(3).map((cell, idx) => {
            const realIdx = idx + 3;
            const isHovered = hoveredIndex === realIdx;
            return (
              <motion.div
                key={cell.name}
                whileHover={{ scale: 1.05, x: -4 }}
                onMouseEnter={() => setHoveredIndex(realIdx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`cursor-pointer rounded-2xl border p-2.5 backdrop-blur-xl transition-all duration-300 w-28 sm:w-44 text-right ${
                  isHovered
                    ? 'border-cyan-400 bg-cyan-950/80 shadow-lg shadow-cyan-500/30'
                    : 'border-white/15 bg-black/40 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-[8px] tracking-[0.15em] text-cyan-400 uppercase">SPECIMEN</span>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cell.color }} />
                </div>
                <div className="font-mono text-[10px] font-bold text-white uppercase mt-0.5">{cell.name}</div>
                <div className="text-[8px] text-white/60 tracking-wider mt-0.5">{cell.phase}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="pointer-events-none absolute bottom-3 z-30 max-w-xs rounded-xl border border-cyan-400/40 bg-black/90 p-2.5 text-center backdrop-blur-xl"
          >
            <div className="font-mono text-[9px] font-bold text-cyan-300 uppercase">
              {BIO_CELLS[hoveredIndex].name} — {BIO_CELLS[hoveredIndex].phase}
            </div>
            <p className="text-[10px] text-white/70 mt-0.5">{BIO_CELLS[hoveredIndex].desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
