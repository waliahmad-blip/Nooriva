'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * CountUp — Animated number counter
 * Counts from 0 to `end` when scrolled into view
 */

export default function CountUp({ end, duration = 2, suffix = '', prefix = '', className = '' }) {
  var ref = useRef(null);
  var isInView = useInView(ref, { once: true, margin: '-50px' });
  var [count, setCount] = useState(0);

  useEffect(function() {
    if (!isInView) return;
    var start = 0;
    var startTime = null;
    var durationMs = duration * 1000;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / durationMs, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
