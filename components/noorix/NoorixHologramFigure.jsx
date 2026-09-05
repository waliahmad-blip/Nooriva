'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Sparkles, Html, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Scanline } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const MOOD_COLORS = {
  neutral: { primary: '#E7D3A8', glow: '#ffffff' },
  caring: { primary: '#ff8fb2', glow: '#ffb3c6' },
  caution: { primary: '#f59e0b', glow: '#fcd34d' },
  urgent: { primary: '#ef4444', glow: '#fca5a5' },
};

function HologramLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#E7D3A8', fontFamily: 'monospace', width: '200px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', marginBottom: '8px', opacity: 0.7 }}>ASSEMBLING BIO-MATRIX</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{progress.toFixed(0)}%</div>
        <div style={{ width: '100%', height: '2px', background: 'rgba(231, 211, 168, 0.2)', marginTop: '10px' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#E7D3A8', transition: 'width 0.3s ease' }}></div>
        </div>
      </div>
    </Html>
  );
}

function HairStrand({ position, rotation, color }) {
  const ref = useRef();
  const geo = useMemo(() => new THREE.PlaneGeometry(0.15, 2.5, 1, 20), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      const pos = ref.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        if (y < 0.5) {
          const wave = Math.sin(t * 1.5 + y * 3 + position.x) * 0.15 * Math.abs(y);
          pos.setZ(i, wave);
        }
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} geometry={geo}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        emissive={color}
        emissiveIntensity={0.8}
        toneMapped={false}
      />
    </mesh>
  );
}

function HologramAvatar({ mood, state }) {
  const group = useRef(null);
  const moodConfig = MOOD_COLORS[mood] || MOOD_COLORS.neutral;

  useFrame((threeState) => {
    const t = threeState.clock.elapsedTime;
    if (group.current) {
      const breathe = Math.sin(t * 2.5) * 0.02;
      group.current.scale.set(1 + breathe * 0.5, 1 + breathe, 1 + breathe * 1.2);

      const targetX = (threeState.pointer.x * Math.PI) / 6;
      const targetY = (threeState.pointer.y * Math.PI) / 12;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
    }
  });

  const hairStrands = useMemo(() => {
    const strands = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI - Math.PI / 2;
      strands.push({
        position: [Math.cos(angle) * 0.6, 0.8, Math.sin(angle) * 0.6 - 0.2],
        rotation: [0, -angle, Math.PI / 8],
      });
    }
    return strands;
  }, []);

  return (
    <group ref={group} dispose={null} position={[0, -1.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]} scale={[0.7, 0.9, 0.8]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={moodConfig.primary}
          transparent
          opacity={0.9}
          emissive={moodConfig.primary}
          emissiveIntensity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.8, 0]} scale={[0.2, 0.4, 0.2]}>
        <cylinderGeometry args={[1, 1, 1, 32]} />
        <meshStandardMaterial color={moodConfig.primary} transparent opacity={0.9} emissive={moodConfig.primary} emissiveIntensity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[0, 0.2, 0]} scale={[1.2, 0.6, 0.7]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={moodConfig.primary} transparent opacity={0.8} emissive={moodConfig.primary} emissiveIntensity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>

      {hairStrands.map((h, i) => (
        <HairStrand key={i} position={h.position} rotation={h.rotation} color={moodConfig.primary} />
      ))}
    </group>
  );
}

export default function NoorixHologramFigure({ state = 'idle', mood = 'neutral', size = 'lg', className = '' }) {
  const heavyGlitch = useMemo(() => new THREE.Vector2(0.006, 0.006), []);
  const lightGlitch = useMemo(() => new THREE.Vector2(0.002, 0.002), []);

  return (
    <div className={"holo-container holo-" + size + " " + className} aria-label="Noorix holographic guide">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <Suspense fallback={<HologramLoader />}>
          <ambientLight intensity={0.8} />
          <pointLight position={[2, 2, 2]} intensity={2} color={MOOD_COLORS[mood]?.primary || '#E7D3A8'} />

          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <HologramAvatar mood={mood} state={state} />
          </Float>

          <Sparkles count={150} scale={4} size={3} speed={0.4} opacity={0.5} color={MOOD_COLORS[mood]?.primary || '#E7D3A8'} noise={1} />
          <Sparkles count={50} scale={[2, 6, 2]} size={2} speed={3} opacity={0.8} color={MOOD_COLORS[mood]?.glow || '#ffffff'} noise={0} />
        </Suspense>

        <EffectComposer disableNormalPass={true}>
          <Bloom luminanceThreshold={0.1} mipmapBlur={true} intensity={1.5} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={state === 'thinking' ? heavyGlitch : lightGlitch} />
          <Noise opacity={0.035} />
          <Scanline density={1.2} opacity={0.04} />
        </EffectComposer>
      </Canvas>

      <div className="holo-ui-layer">
        <div className="holo-frame"></div>
        <div className="holo-corner holo-corner-tl"></div>
        <div className="holo-corner holo-corner-tr"></div>
        <div className="holo-corner holo-corner-bl"></div>
        <div className="holo-corner holo-corner-br"></div>
        <div className="holo-hud-data">
          <div className="holo-label">NOORIX.SYS // BIO-SYNC</div>
          <div className="holo-status">
            <div className={"holo-status-dot state-" + state}></div>
            <span>{state.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
