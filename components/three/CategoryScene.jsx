'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryScene({ palette, flavors }) {
  const c1 = palette?.[0] || '#ff8fb2';
  const c2 = palette?.[1] || '#a78bfa';

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dynamic Glowing Category Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/3 h-72 w-72 rounded-full blur-[100px] opacity-40"
        style={{ background: `radial-gradient(circle, ${c1} 0%, transparent 70%)` }}
      />
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/3 h-80 w-80 rounded-full blur-[110px] opacity-35"
        style={{ background: `radial-gradient(circle, ${c2} 0%, transparent 70%)` }}
      />
    </div>
  );
}
