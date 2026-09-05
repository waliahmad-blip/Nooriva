'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * AnimatedLogo — World-class liquid gold orb logo
 * Features:
 * - 3D magnetic tilt following mouse
 * - 3 orbiting gradient rings (different speeds + directions)
 * - Gold particles orbiting the logo
 * - Morphing aura pulse
 * - Glass morphism sphere container
 * - Accessible image fallback
 * - Reduced-motion support
 * - Responsive sizing
 */
export default function AnimatedLogo({ size = 'large', className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);


  // Mouse tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);


  const handleMouseMove = (e) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isLarge = size === 'large';
  const imgSize = isLarge ? 'h-20 w-20 md:h-28 md:w-28' : 'h-11 w-11 md:h-12 md:w-12';
  const fontSize = isLarge ? 'clamp(2rem, 5vw, 3.5rem)' : '1.25rem';
  const particleCount = isLarge ? 8 : 5;

  // Gold particle positions around circle
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = isLarge ? 55 : 32;
    return {
      id: i,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: 3 + (i % 3),
      delay: (i / particleCount) * 3,
      duration: 3 + (i % 4),
    };
  });

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative inline-flex items-center justify-center ${className}`.trim()}
      style={{
        perspective: 600,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ═══ 3D Tilt Layer ═══ */}
      <motion.div
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex items-center justify-center"
      >
        {/* ═══ Aura Pulse ═══ */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: isLarge ? '220%' : '180%',
            height: isLarge ? '220%' : '180%',
            background: 'radial-gradient(circle, rgba(231,211,168,0.35) 0%, rgba(199,154,68,0.15) 40%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={reducedMotion ? {} : {
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        {/* ═══ Ring 1 — outer, slow, gold gradient ═══ */}
        {!reducedMotion && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: isLarge ? '160%' : '150%',
              height: isLarge ? '160%' : '150%',
              border: '2px solid transparent',
              background: 'linear-gradient(90deg, transparent, rgba(231,211,168,0.5), rgba(199,154,68,0.3), transparent) border-box',
              WebkitMask: 'linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          />
        )}

        {/* ═══ Ring 2 — middle, faster, reverse, rose-gold ═══ */}
        {!reducedMotion && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: isLarge ? '135%' : '130%',
              height: isLarge ? '135%' : '130%',
              border: '1.5px solid transparent',
              background: 'linear-gradient(45deg, transparent, rgba(255,143,178,0.4), rgba(231,211,168,0.3), transparent) border-box',
              WebkitMask: 'linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          />
        )}

        {/* ═══ Ring 3 — inner, fastest, amber ═══ */}
        {!reducedMotion && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: isLarge ? '115%' : '112%',
              height: isLarge ? '115%' : '112%',
              border: '1px solid rgba(231,211,168,0.35)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          />
        )}

        {/* ═══ Orbiting Gold Particles ═══ */}
        {!reducedMotion && (
          <div className="absolute inset-0" aria-hidden="true">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.id % 2 === 0 ? '#E7D3A8' : '#C79A44',
                  boxShadow: `0 0 ${p.size * 2}px ${p.id % 2 === 0 ? 'rgba(231,211,168,0.6)' : 'rgba(199,154,68,0.5)'}`,
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [p.x, -p.x, p.x],
                  y: [p.y, -p.y, p.y],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}

        {/* ═══ Glass Sphere — Logo Container ═══ */}
        <div
          className="relative z-10 flex items-center justify-center rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(231,211,168,0.15))',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1.5px solid rgba(231,211,168,0.3)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 8px 32px rgba(199,154,68,0.15)',
          }}
        >
          {!imageFailed ? (
            <img
              src="/brand/nooriva-logo.jpeg"
              alt="NOORIVA logo"
              width={isLarge ? 128 : 48}
              height={isLarge ? 128 : 48}
              loading="eager"
              decoding="async"
              className={`relative z-10 rounded-full object-cover ${imgSize}`}
              onError={() => setImageFailed(true)}
              style={{
                boxShadow: '0 0 20px rgba(231,211,168,0.3), 0 0 40px rgba(199,154,68,0.15)',
              }}
            />
          ) : (
            <div
              className={`relative z-10 flex items-center justify-center rounded-full ${imgSize}`}
              style={{
                background: 'linear-gradient(135deg, rgba(231,211,168,0.15), rgba(199,154,68,0.1))',
              }}
            >
              <span
                className="display-heading holo-text font-bold"
                style={{ fontSize }}
                aria-hidden="true"
              >
                N
              </span>
            </div>
          )}
        </div>

        {/* ═══ Liquid Gold Sheen — top highlight ═══ */}
        {!reducedMotion && (
          <motion.div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: isLarge ? '80%' : '75%',
              height: isLarge ? '30%' : '28%',
              top: isLarge ? '8%' : '7%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)',
              filter: 'blur(4px)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
