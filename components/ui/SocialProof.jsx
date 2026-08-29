'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

var PROOFS = [
  { name: 'Sana', city: 'Lahore', action: 'just ordered The Devoted' },
  { name: 'Ayesha', city: 'Karachi', action: 'loves Aurora Rose' },
  { name: 'Fatima', city: 'Islamabad', action: 'started her glow journey' },
  { name: 'Zainab', city: 'Faisalabad', action: 'ordered 3 pouches' },
  { name: 'Huda', city: 'Multan', action: 'is glowing with Violet Eclipse' },
  { name: 'Mahnoor', city: 'Lahore', action: 'shared her before/after' },
  { name: 'Iqra', city: 'Karachi', action: 'runs on Sunrise Solstice' },
  { name: 'Noor', city: 'Peshawar', action: 'just joined the Society' },
];

export default function SocialProof() {
  var [current, setCurrent] = useState(0);
  var [visible, setVisible] = useState(false);

  useEffect(function() {
    var showTimer = setTimeout(function() { setVisible(true); }, 3000);
    var cycleTimer = setInterval(function() {
      setCurrent(function(prev) { return (prev + 1) % PROOFS.length; });
    }, 5000);
    return function() { clearTimeout(showTimer); clearInterval(cycleTimer); };
  }, []);

  if (!visible) return null;

  var proof = PROOFS[current];

  return (
    <div className="fixed bottom-24 left-4 z-20 md:bottom-6 md:left-6 max-w-[220px]">
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
