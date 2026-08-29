'use client';

import { motion } from 'framer-motion';

/**
 * AnimatedLogo — Beautiful animated NOORIVA logo
 * 
 * - Breathing glow effect
 * - Holographic shimmer
 * - Entrance animation
 * - Responsive sizing
 * - Falls back to styled text if image not found
 */

export default function AnimatedLogo({ size = 'large', className = '' }) {
  var isLarge = size === 'large';
  var imgSize = isLarge ? 'h-16 md:h-20' : 'h-8 md:h-10';
  var glowSize = isLarge ? 'w-32 h-32 md:w-40 md:h-40' : 'w-16 h-16';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={'relative inline-flex items-center justify-center ' + className}
    >
      {/* Breathing glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={'absolute rounded-full blur-2xl ' + glowSize}
        style={{
          background: 'radial-gradient(circle, rgba(255,143,178,0.4), rgba(167,139,250,0.3), rgba(103,232,249,0.2))',
        }}
        aria-hidden="true"
      />

      {/* Holographic ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className={'absolute rounded-full border opacity-20 ' + (isLarge ? 'w-36 h-36 md:w-44 md:h-44' : 'w-20 h-20')}
        style={{
          borderImage: 'conic-gradient(from 0deg, #ff8fb2, #ffd7a1, #a78bfa, #67e8f9, #ff8fb2) 1',
          borderRadius: '50%',
          borderStyle: 'solid',
          borderWidth: '1px',
          background: 'conic-gradient(from 0deg, #ff8fb2, #ffd7a1, #a78bfa, #67e8f9, #ff8fb2) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        aria-hidden="true"
      />

      {/* Logo image */}
      <img
        src="/brand/nooriva-logo.svg"
        alt="NOORIVA"
        className={'relative z-10 w-auto ' + imgSize}
        style={{ filter: 'drop-shadow(0 0 20px rgba(255,143,178,0.3))' }}
        onError={function(e) {
          e.target.style.display = 'none';
          e.target.nextElementSibling.style.display = 'flex';
        }}
      />

      {/* Fallback text logo */}
      <div
        className={'relative z-10 items-center justify-center ' + (isLarge ? 'hidden' : 'hidden')}
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
