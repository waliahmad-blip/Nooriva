'use client';

import { useEffect, useRef } from 'react';

/**
 * NoorixOrb — animated AI avatar orb
 * Uses layered CSS gradients + canvas particles for a living, breathing feel.
 * Colors shift through the Nooriva palette.
 */
export default function NoorixOrb({ size = 120, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const particles = Array.from({ length: 18 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: size * 0.25 + Math.random() * size * 0.25,
      speed: 0.003 + Math.random() * 0.008,
      size: 1 + Math.random() * 2.5,
      opacity: 0.3 + Math.random() * 0.5,
      color: ['#ff8fb2', '#a78bfa', '#67e8f9', '#ffd7a1', '#d9a7f0'][
        Math.floor(Math.random() * 5)
      ],
    }));

    let raf;
    const cx = size / 2;
    const cy = size / 2;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      for (const p of particles) {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius;
        ctx.globalAlpha = p.opacity * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-full opacity-40 blur-xl"
        style={{
          background: 'linear-gradient(135deg, #ff8fb2, #a78bfa, #67e8f9)',
          animation: 'noorix-orb-glow 4s ease-in-out infinite alternate',
        }}
      />

      {/* Main orb */}
      <div
        className="absolute inset-2 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, #ff8fb2, #ffd7a1, #a78bfa, #67e8f9, #d9a7f0, #ff8fb2)',
          animation: 'noorix-orb-spin 8s linear infinite',
          boxShadow: '0 0 40px rgba(167,139,250,0.4), 0 0 80px rgba(255,143,178,0.2)',
        }}
      />

      {/* Inner light */}
      <div
        className="absolute rounded-full"
        style={{
          top: '18%',
          left: '22%',
          width: '35%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: size, height: size }}
      />

      <style jsx>{`
        @keyframes noorix-orb-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes noorix-orb-glow {
          0% { transform: scale(1) rotate(0deg); opacity: 0.3; }
          100% { transform: scale(1.15) rotate(15deg); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
