'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import JellyOrb from './JellyOrb';
import FlavorDroplets from './FlavorDroplets';
import NoorDust from './NoorDust';
import FlavorInjection from './FlavorInjection';
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

export default function ScrollScene() {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState('3d');
  const glRef = useRef(null);

  useEffect(() => {
    if (!webglSupported()) {
      setMode('2d');
    }
    return () => {
      if (glRef.current) {
        try {
          const lose = glRef.current.getExtension('WEBGL_lose_context');
          if (lose) lose.loseContext();
          glRef.current.dispose();
        } catch (e) {}
      }
    };
  }, []);

  // 2D-only fallback
  if (mode === '2d') {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#FAF7F2] via-[#FFF5EC] to-[#FAF7F2]" />
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          glRef.current = gl;
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
          }, false);
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
            opacity={0.18}
            scale={14}
            blur={2}
            far={4}
            frames={1}
            color="#1A1410"
          />
        )}
      </Canvas>
    </div>
  );
}
