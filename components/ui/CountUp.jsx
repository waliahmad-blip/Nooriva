'use client';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * CountUp — Animated number counter
 * Counts from 0 to `end` when scrolled into view
 */
export default function CountUp({ end, duration = 2, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const durationMs = duration * 1000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
