'use client';

import { useEffect, useRef } from 'react';

/**
 * Floating bubbles — 2D canvas, zero WebGL. Used as the always-works layer.
 * - Container-measured via ResizeObserver (with window resize fallback, no vh bugs, survives rotation)
 * - DPR-aware, capped at 2x (crisp + battery-friendly), recomputed on every build
 * - Pointer/touch reactive: bubbles shy away from your finger/mouse
 * - Reduced-motion: renders one static frame (visible, just still)
 * - Pauses when tab hidden
 */
export default function FloatingBubbles({
  density = 0.00009,
  minCount = 18,
  maxCount = 70,
  opacity = 0.5,
  speed = 0.35,
  palette = ['#ff8fb2', '#ffd7a1', '#a78bfa', '#67e8f9', '#d9a7f0'],
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let bubbles = [];
    let w = 0;
    let h = 0;
    const pointer = { x: -9999, y: -9999 };

    const rand = (a, b) => a + Math.random() * (b - a);

    const build = () => {
      const rect = (parent ?? canvas).getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);

      // Recompute DPR every time so rotation / zoom / moving windows stay crisp
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      // Keep CSS size locked to the container (guards against layout shift / iOS clipping)
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(maxCount, Math.max(minCount, Math.floor(w * h * density)));
      bubbles = Array.from({ length: target }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(4, 16),
        vy: -rand(speed * 0.4, speed),
        vx: rand(-0.15, 0.15),
        wobble: rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.004, 0.012),
        a: rand(opacity * 0.4, opacity),
        color: palette[Math.floor(Math.random() * palette.length)],
      }));
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      for (const b of bubbles) {
        b.wobble += b.wobbleSpeed;
        b.x += b.vx + Math.sin(b.wobble) * 0.18;
        b.y += b.vy;

        // shy away from pointer (mirrors the 3D dust behavior)
        const dx = b.x - pointer.x;
        const dy = b.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        const R = 90;
        if (d2 < R * R && d2 > 1) {
          const d = Math.sqrt(d2);
          const f = ((R - d) / R) * 0.9;
          b.x += (dx / d) * f;
          b.y += (dy / d) * f;
        }

        if (b.y < -b.r * 2) { b.y = h + b.r * 2; b.x = rand(0, w); }
        if (b.x < -b.r * 2) b.x = w + b.r;
        if (b.x > w + b.r * 2) b.x = -b.r;

        ctx.globalAlpha = b.a * 0.28;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        ctx.globalAlpha = b.a * 0.75;
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.globalAlpha = b.a * 0.9;
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, Math.max(0.9, b.r * 0.15), 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const loop = () => {
      paint();
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      if (!src) return;
      pointer.x = src.clientX - rect.left;
      pointer.y = src.clientY - rect.top;
    };
    const onPointerOut = () => { pointer.x = -9999; pointer.y = -9999; };

    build();

    // ResizeObserver with graceful fallback for older mobile browsers
    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(build);
      ro.observe(parent ?? canvas);
    } else {
      window.addEventListener('resize', build);
      window.addEventListener('orientationchange', build);
    }

    window.addEventListener('mousemove', onPointer, { passive: true });
    window.addEventListener('touchmove', onPointer, { passive: true });
    window.addEventListener('touchend', onPointerOut);
    window.addEventListener('mouseleave', onPointerOut);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(loop);
      else if (!document.hidden) paint(); // static frame when reduced-motion
    };
    document.addEventListener('visibilitychange', onVis);
    onVis(); // kick off immediately

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else {
        window.removeEventListener('resize', build);
        window.removeEventListener('orientationchange', build);
      }
      window.removeEventListener('mousemove', onPointer);
      window.removeEventListener('touchmove', onPointer);
      window.removeEventListener('touchend', onPointerOut);
      window.removeEventListener('mouseleave', onPointerOut);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [density, minCount, maxCount, opacity, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
