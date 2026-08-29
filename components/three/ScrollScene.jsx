'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import JellyOrb from './JellyOrb';
import FlavorDroplets from './FlavorDroplets';
import NoorDust from './NoorDust';
import FlavorInjection from './FlavorInjection';
import FloatingBubbles from '@/components/ui/FloatingBubbles';
import useIsMobile from '@/hooks/useIsMobile';

/* ── Feature detection ── */
function webglSupported() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ── Camera drift: phone tilt on mobile, mouse parallax on desktop ── */
function CameraDrift({ isMobile }) {
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) {
      const onOrient = (e) => {
        if (e.gamma == null || e.beta == null) return;
        target.current.x = clamp(e.gamma / 45, -1, 1);
        target.current.y = clamp((e.beta - 45) / 45, -1, 1);
      };
      let detach = () => { };
      const ask = () => {
        // iOS 13+ requires a user gesture for device-orientation permission
        try {
          if (
            typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function'
          ) {
            DeviceOrientationEvent.requestPermission().catch(() => { });
          }
        } catch { }
        window.addEventListener('deviceorientation', onOrient);
        detach = () => window.removeEventListener('deviceorientation', onOrient);
      };
      window.addEventListener('pointerdown', ask, { once: true });
      return () => {
        window.removeEventListener('pointerdown', ask);
        detach();
      };
    }
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  useFrame(({ camera }) => {
    cur.current.x += (target.current.x - cur.current.x) * 0.04;
    cur.current.y += (target.current.y - cur.current.y) * 0.04;
    camera.position.x = cur.current.x * 0.55;
    camera.position.y = cur.current.y * 0.35;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Experience engine:
 * - 2D bubbles are ALWAYS rendered as a reliable background layer (works on every device, zero WebGL).
 * - 3D scene is additionally rendered on top when WebGL is healthy.
 * - If WebGL is missing, context is lost, user prefers reduced motion, or data-saver is on,
 *   we skip the 3D scene and show ONLY the 2D bubbles (graceful fallback).
 * - Tilt parallax (mobile) / mouse parallax (desktop)
 */
export default function ScrollScene() {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState('3d'); // '3d' | '2d'

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = !!(conn && conn.saveData);
    if (!webglSupported() || reduced || saveData) setMode('2d');
  }, []);

  const onContextLost = (e) => {
    e.preventDefault();
    setMode('2d'); // WebGL died (low memory / iOS watchdog) → graceful swap to 2D only
  };

  // 2D-only fallback (no WebGL / reduced motion / save-data)
  if (mode === '2d') {
    return (
      <div className="pointer-events-none fixed inset-0 z-0">
        <FloatingBubbles />
      </div>
    );
  }

  // 3D scene + always-on 2D bubble background underneath
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Reliable 2D bubbles: animate everywhere, including mobile, with zero WebGL */}
      <FloatingBubbles />

      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', onContextLost, false);
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#a78bfa" />

        <Suspense fallback={null}>
          <NoorDust />
          <CameraDrift isMobile={isMobile} />
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
            <JellyOrb />
          </Float>
          <FlavorDroplets />
          <FlavorInjection />
        </Suspense>

        {!isMobile && (
          <ContactShadows
            position={[0, -3, 0]}
            opacity={0.2}
            scale={14}
            blur={2.8}
            far={4}
            color="#1A1410"
          />
        )}
      </Canvas>
    </div>
  );
}
