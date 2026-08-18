"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { Suspense } from "react";
import JellyOrb from "./JellyOrb";
import FlavorDroplets from "./FlavorDroplets";
import NoorDust from "./NoorDust";
import FlavorInjection from "./FlavorInjection";
import useIsMobile from "@/hooks/useIsMobile";

export default function ScrollScene() {
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#a78bfa" />

        <Suspense fallback={null}>
          <NoorDust />
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
            <JellyOrb />
          </Float>
          {!isMobile && <FlavorDroplets />}
          <FlavorInjection />
        </Suspense>

        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.2}
          scale={14}
          blur={2.8}
          far={4}
          color="#1A1410"
        />
      </Canvas>
    </div>
  );
}
