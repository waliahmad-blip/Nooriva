'use client';

import { useEffect, useRef } from 'react';

/**
 * CursorTrail — Sparkle trail following the mouse cursor
 * - Only on desktop (no touch devices)
 * - Respects reduced-motion
 * - Auto-cleanup on unmount
 */

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(function() {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window) return;

    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var particles = [];
    var mouse = { x: -100, y: -100 };
    var raf;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function onMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (var i = 0; i < 2; i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 1,
          life: 1,
          decay: 0.015 + Math.random() * 0.02,
          size: 1.5 + Math.random() * 3,
          color: ['#ff8fb2', '#a78bfa', '#67e8f9', '#ffd7a1', '#d9a7f0'][Math.floor(Math.random() * 5)],
        });
      }
      if (particles.length > 80) particles.splice(0, particles.length - 80);
    }
    window.addEventListener('mousemove', onMove, { passive: true });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return function() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100]"
      aria-hidden="true"
    />
  );
}
