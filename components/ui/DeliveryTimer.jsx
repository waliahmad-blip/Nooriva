'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock } from 'lucide-react';

export default function DeliveryTimer() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(20, 0, 0, 0);
      if (now > target) target.setDate(target.getDate() + 1);
      const diff = target - now;
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-xl px-4 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <Truck size={16} className="text-green-600" />
        <span className="text-xs font-medium text-ink/70">Order in next</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock size={14} className="text-ink/40" />
        <span className="text-sm font-bold text-ink tabular-nums">
          {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
        </span>
        <span className="text-xs text-ink/40">for tomorrow delivery</span>
      </div>
    </motion.div>
  );
}
