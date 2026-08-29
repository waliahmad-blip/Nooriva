'use client';

import { motion } from 'framer-motion';

/**
 * AnimatedLogo — Beautiful animated NOORIVA logo with light rays
 * 
 * - SVG light rays rotating around logo
 * - Breathing glow effect
 * - Pulsing outer ring
 * - Entrance animation
 * - Responsive sizing
 */

export default function AnimatedLogo({ size = 'large', className = '' }) {
  var isLarge = size === 'large';
  var imgSize = isLarge ? 'h-24 md:h-32' : 'h-10 md:h-12';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={'relative inline-flex items-center justify-center ' + className}
    >
      {/* Breathing glow backdrop */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full"
        style={{
          width: isLarge ? '200%' : '150%',
          height: isLarge ? '200%' : '150%',
          background: 'radial-gradient(circle, rgba(255,143,178,0.3) 0%, rgba(167,139,250,0.2) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        aria-hidden="true"
      />

      {/* Logo SVG with built-in light rays */}
      <img
        src="/brand/nooriva-logo.svg"
        alt="NOORIVA"
        className={'relative z-10 w-auto ' + imgSize}
        onError={function(e) {
          e.target.style.display = 'none';
          if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
        }}
      />

      {/* Fallback */}
      <div
        className="relative z-10 items-center justify-center hidden"
        style={{ display: 'none' }}
      >
        <span
          className="display-heading holo-text"
          style={{ fontSize: isLarge ? 'clamp(2rem, 6vw, 4rem)' : '1.25rem' }}
        >
          NOORIVA
        </span>
      </div>
    </motion.div>
  );
}
