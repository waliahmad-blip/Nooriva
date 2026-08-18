"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { Suspense } from "react";
import JellyOrb from "./JellyOrb";
import FlavorDroplets from "./FlavorDroplets";

export default function Experience() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#a78bfa" />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
          <JellyOrb />
        </Float>
        <FlavorDroplets />
      </Suspense>

      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.28}
        scale={12}
        blur={2.6}
        far={4}
        color="#1A1410"
      />
    </Canvas>
  );
}
