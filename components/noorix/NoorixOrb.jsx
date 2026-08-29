'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * NoorixOrb — Animated AI avatar orb (Production Grade)
 * 
 * - Canvas particles with requestAnimationFrame
 * - Proper cleanup on unmount
 * - Reduced-motion support
 * - DPR-aware canvas sizing
 * - Memory-safe particle management
 */

const PARTICLE_COLORS = ['#ff8fb2', '#a78bfa', '#67e8f9', '#ffd7a1', '#d9a7f0'];

export default function NoorixOrb({ size = 120, className = '' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef(null);

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const initParticles = useCallback(function(count) {
    const particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: size * 0.25 + Math.random() * size * 0.25,
        speed: 0.003 + Math.random() * 0.008,
        size: 1 + Math.random() * 2.5,
        opacity: 0.3 + Math.random() * 0.5,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      });
    }
    return particles;
  }, [size]);

  useEffect(function() {
    var canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    particlesRef.current = initParticles(18);
    var cx = size / 2;
    var cy = size / 2;

    function draw() {
      ctx.clearRect(0, 0, size, size);
      var particles = particlesRef.current;
      if (!particles) return;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.angle += p.speed;
        var x = cx + Math.cos(p.angle) * p.radius;
        var y = cy + Math.sin(p.angle) * p.radius;
        ctx.globalAlpha = p.opacity * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return function() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      particlesRef.current = null;
    };
  }, [size, prefersReduced, initParticles]);

  var orbSize = { width: size, height: size };

  return (
    <div className={'relative ' + className} style={orbSize}>
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-full opacity-40 blur-xl"
        style={{
          background: 'linear-gradient(135deg, #ff8fb2, #a78bfa, #67e8f9)',
          animation: prefersReduced ? 'none' : 'noorix-orb-glow 4s ease-in-out infinite alternate',
        }}
      />

      {/* Main orb */}
      <div
        className="absolute inset-2 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #ff8fb2, #ffd7a1, #a78bfa, #67e8f9, #d9a7f0, #ff8fb2)',
          animation: prefersReduced ? 'none' : 'noorix-orb-spin 8s linear infinite',
          boxShadow: '0 0 40px rgba(167,139,250,0.4), 0 0 80px rgba(255,143,178,0.2)',
        }}
      />

      {/* Inner light */}
      <div
        className="absolute rounded-full"
        style={{
          top: '18%', left: '22%', width: '35%', height: '30%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />

      {/* Particle canvas */}
      {!prefersReduced && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: size, height: size }}
        />
      )}

      <style jsx>{'\n        @keyframes noorix-orb-spin { to { transform: rotate(360deg); } }\n        @keyframes noorix-orb-glow {\n          0% { transform: scale(1) rotate(0deg); opacity: 0.3; }\n          100% { transform: scale(1.15) rotate(15deg); opacity: 0.5; }\n        }\n      '}</style>
    </div>
  );
}
