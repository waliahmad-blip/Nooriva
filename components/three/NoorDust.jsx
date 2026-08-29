'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useIsMobile from '@/hooks/useIsMobile';

const BOUNDS = { x: 7, y: 6, z: 2.5 };

export default function NoorDust() {
  const isMobile = useIsMobile();
  const countRef = useRef(isMobile ? 120 : 300);
  const count = countRef.current;
  const pointsRef = useRef();
  const mouse = useRef(new THREE.Vector3(999, 999, 0));

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouse.current.set(x * 6, y * 4, 0);
    };
    const onTouch = (e) => {
      if (e.touches[0]) onMove(e.touches[0]);
    };
    const onTouchEnd = () => mouse.current.set(999, 999, 0); // release the field
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = 0.002 + Math.random() * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions, velocities };
  }, [count]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const palette = ['#ff8fb2', '#ffd7a1', '#a78bfa', '#67e8f9'].map(
      (c) => new THREE.Color(c)
    );
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  const sprite = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    if (!pointsRef.current || document.hidden) return; // battery: pause offscreen tabs
    const pos = pointsRef.current.geometry.attributes.position.array;
    const R = 1.8;
    const R2 = R * R;

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;

      pos[iy] += velocities[iy];
      pos[ix] += velocities[ix];
      pos[iz] += velocities[iz];

      // full wrap on all axes — field never empties out
      if (pos[iy] > BOUNDS.y) pos[iy] = -BOUNDS.y;
      if (pos[iy] < -BOUNDS.y) pos[iy] = BOUNDS.y;
      if (pos[ix] > BOUNDS.x) pos[ix] = -BOUNDS.x;
      if (pos[ix] < -BOUNDS.x) pos[ix] = BOUNDS.x;
      if (pos[iz] > BOUNDS.z) pos[iz] = -BOUNDS.z;
      if (pos[iz] < -BOUNDS.z) pos[iz] = BOUNDS.z;

      // pointer repulsion (squared distance — no sqrt)
      const dx = pos[ix] - mouse.current.x;
      const dy = pos[iy] - mouse.current.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < R2 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const force = ((R - d) / R) * 0.06;
        pos[ix] += (dx / d) * force;
        pos[iy] += (dy / d) * force;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        map={sprite}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
