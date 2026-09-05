'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROOFS = [
  { name: 'ROSE HALO', city: 'Karachi', action: 'Wake Up Luminous' },
  { name: 'PEACH DUSK', city: 'Lahore', action: 'Sleep Beautiful' },
  { name: 'MANGO BLAZE', city: 'Islamabad', action: 'Burn Bright' },
  { name: 'SAFFRON MIST', city: 'Rawalpindi', action: 'Repair in Gold' },
  { name: 'BERRY BLOOM', city: 'Multan', action: '3 PM, Still Glowing' },
  { name: 'COCO GLOW', city: 'Peshawar', action: 'Reset Your Light' },
  { name: 'CHERRY VEIL', city: 'Faisalabad', action: 'Drift Into Glow' },
  { name: 'ACAI DEW', city: 'Quetta', action: 'Pure Clarity' },
  { name: 'PASSION LUXE', city: 'Lahore', action: 'Age in Reverse' },
  { name: 'PEARL SHEEN', city: 'Karachi', action: 'Glow Unfiltered' },
  { name: 'ALOE TIDE', city: 'Islamabad', action: 'Barrier of Light' },
  { name: 'BAMBOO SILK', city: 'Rawalpindi', action: 'Reflect Your Light' },
];

export default function SocialProof() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 3000);
    const cycleTimer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PROOFS.length);
    }, 5000);
    return () => {
      clearTimeout(showTimer);
      clearInterval(cycleTimer);
    };
  }, []);

  if (!visible) return null;

  const proof = PROOFS[current];

  return (
    <div className="fixed bottom-24 left-4 z-20 max-w-[220px] md:bottom-6 md:left-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-xl px-3 py-2 text-xs text-ink/70"
        >
          <span className="font-semibold text-ink">{proof.name}</span>
          <span className="text-ink/40"> from {proof.city} </span>
          <span>{proof.action}</span>
          <span className="ml-1">✨</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
