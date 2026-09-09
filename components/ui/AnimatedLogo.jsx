'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function AnimatedLogo({ size = 'small', className = '' }) {
  const reduced = useReducedMotion();

  const height = size === 'large' ? 130 : 58;
  const width = size === 'large' ? 280 : 132;

  return (
    <motion.img
      src="/brand/nooriva-logo.png"
      alt="NOORIVA"
      className={className}
      width={width}
      height={height}
      style={{
        display: 'block',
        objectFit: 'contain',
        objectPosition: 'center',
        background: 'transparent',
        mixBlendMode: 'normal',
        maxWidth: '100%',
        height: 'auto',
      }}
      animate={
        reduced
          ? {}
          : {
              y: [0, -8, 0],
              scale: [1, 1.04, 1],
            }
      }
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

