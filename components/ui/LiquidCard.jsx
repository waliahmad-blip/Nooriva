// components/ui/LiquidCard.jsx
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function LiquidCard({ children, accent }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]));

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-md shadow-2xl"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-30"
        style={{ boxShadow: `0 0 60px ${accent}40, inset 0 0 40px ${accent}15` }}
      />
      {children}
    </motion.div>
  );
}
