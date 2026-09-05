'use client';

import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import * as THREE from 'three';
import { shaderMaterial, Float } from '@react-three/drei';

const FluidMaterial = shaderMaterial(
  {
    time: 0,
    colorA: new THREE.Color('#ff007f'),
    colorB: new THREE.Color('#b026ff'),
    colorC: new THREE.Color('#00e5ff'),
  },
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      float wave1 = sin(vUv.x * 5.0 + time * 0.2) * cos(vUv.y * 5.0 + time * 0.15);
      float wave2 = sin(vUv.x * 4.0 - time * 0.1) * cos(vUv.y * 4.5 - time * 0.2);

      float mix1 = (wave1 + 1.0) * 0.5;
      float mix2 = (wave2 + 1.0) * 0.5;

      vec3 baseColor = mix(colorA, colorB, mix1);
      vec3 finalColor = mix(baseColor, colorC, mix2 * 0.6);

      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      finalColor += fresnel * 0.3;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ FluidMaterial });

function FluidSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.material.time = state.clock.elapsedTime;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={2.2}>
        <sphereGeometry args={[1, 128, 128]} />
        {/* @ts-ignore */}
        <fluidMaterial />
      </mesh>
    </Float>
  );
}

export default function PremiumWebGLBackground() {
  const pathname = usePathname();

  // STRICTLY only render on /noorix or /noorix/* routes
  const isNoorixRoute = pathname === '/noorix' || pathname.startsWith('/noorix/');

  if (!isNoorixRoute) {
    return null; // Return nothing on all other pages (Home, Login, Account, etc.)
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <FluidSphere />
      </Canvas>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] pointer-events-none" />
    </div>
  );
}
