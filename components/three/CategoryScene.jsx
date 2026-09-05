'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import JellyOrb from './JellyOrb';
import FlavorDroplets from './FlavorDroplets';
import useIsMobile from '@/hooks/useIsMobile';

function webglSupported() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

export default function CategoryScene({ palette, flavors }) {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState('3d');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = !!(conn && conn.saveData);
    if (!webglSupported() || reduced || saveData) setMode('2d');
  }, []);

  const onContextLost = (e) => {
    e.preventDefault();
    setMode('2d');
  };

  if (mode === '2d' || !palette?.length) {
    return (
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: `radial-gradient(circle at 50% 50%, ${palette?.[0] || '#ff8fb2'}40 0%, transparent 60%)` }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0">
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
        <JellyOrb palette={palette} />
        {flavors?.length > 0 && <FlavorDroplets flavors={flavors} />}
      </Canvas>
    </div>
  );
}
