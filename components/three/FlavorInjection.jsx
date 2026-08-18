"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import { flavors } from "@/lib/data";

const SPLASH_COUNT = 26;

export default function FlavorInjection() {
  const selectedFlavor = useStore((s) => s.selectedFlavor);
  const lastPulse = useStore((s) => s.lastPulse);
  const flavor = flavors.find((f) => f.id === selectedFlavor) || flavors[0];

  const dropletRef = useRef();
  const dropletMatRef = useRef();
  const ringRef = useRef();
  const ringMatRef = useRef();
  const splashRef = useRef();
  const splashMatRef = useRef();

  const anim = useRef({ dropping: false, splashing: false, t: 0, splashT: 0 });
  const prevFlavor = useRef(selectedFlavor);
  const mounted = useRef(false);

  const splashData = useMemo(
    () => ({
      positions: new Float32Array(SPLASH_COUNT * 3),
      velocities: new Float32Array(SPLASH_COUNT * 3),
    }),
    []
  );

  const triggerSplash = () => {
    anim.current.dropping = false;
    anim.current.splashing = true;
    anim.current.splashT = 0;

    if (dropletRef.current) dropletRef.current.visible = false;

    if (ringRef.current) {
      ringRef.current.visible = true;
      ringRef.current.position.set(0, 1.9, 0);
      ringRef.current.scale.set(0.1, 0.1, 0.1);
    }
    if (ringMatRef.current) {
      ringMatRef.current.color.set(flavor.colorB);
      ringMatRef.current.opacity = 0.9;
    }

    if (splashRef.current) {
      splashRef.current.visible = true;
      const pos = splashData.positions;
      const vel = splashData.velocities;
      for (let i = 0; i < SPLASH_COUNT; i++) {
        pos[i * 3] = 0;
        pos[i * 3 + 1] = 1.9;
        pos[i * 3 + 2] = 0;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.04 + Math.random() * 0.1;
        vel[i * 3] = Math.cos(angle) * speed;
        vel[i * 3 + 1] = 0.06 + Math.random() * 0.12;
        vel[i * 3 + 2] = Math.sin(angle) * speed * 0.6;
      }
      splashRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (splashMatRef.current) {
      splashMatRef.current.color.set(flavor.color);
      splashMatRef.current.opacity = 1;
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      prevFlavor.current = selectedFlavor;
      return;
    }
    if (prevFlavor.current !== selectedFlavor) {
      prevFlavor.current = selectedFlavor;
      startDrop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlavor]);

  const startDrop = () => {
    anim.current.dropping = true;
    anim.current.splashing = false;
    anim.current.t = 0;
    if (dropletRef.current) {
      dropletRef.current.visible = true;
      dropletRef.current.position.set(0, 5.5, 0);
      dropletRef.current.scale.set(1, 1, 1);
    }
    if (dropletMatRef.current) dropletMatRef.current.color.set(flavor.color);
    if (ringRef.current) ringRef.current.visible = false;
    if (splashRef.current) splashRef.current.visible = false;
  };

  const prevPulse = useRef(0);
  useEffect(() => {
    if (!mounted.current || !lastPulse || lastPulse === prevPulse.current) return;
    prevPulse.current = lastPulse;
    startDrop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPulse]);

  useFrame((state, delta) => {
    const a = anim.current;

    if (a.dropping && dropletRef.current) {
      a.t += delta;
      const fallDuration = 0.65;
      if (a.t < fallDuration) {
        const p = a.t / fallDuration;
        const eased = p * p;
        dropletRef.current.position.y = 5.5 - eased * 3.6;
        dropletRef.current.scale.set(1, 1 + p * 0.7, 1);
      } else {
        triggerSplash();
      }
    }

    if (a.splashing) {
      a.splashT += delta;
      const sp = a.splashT / 0.7;

      if (ringRef.current && sp < 1) {
        const s = 0.1 + sp * 3.2;
        ringRef.current.scale.set(s, s, s);
        ringMatRef.current.opacity = 0.9 * (1 - sp);
      } else if (ringRef.current) {
        ringRef.current.visible = false;
      }

      if (splashRef.current && sp < 1) {
        const pos = splashData.positions;
        const vel = splashData.velocities;
        for (let i = 0; i < SPLASH_COUNT; i++) {
          pos[i * 3] += vel[i * 3];
          pos[i * 3 + 1] += vel[i * 3 + 1];
          pos[i * 3 + 2] += vel[i * 3 + 2];
          vel[i * 3 + 1] -= 0.006;
        }
        splashRef.current.geometry.attributes.position.needsUpdate = true;
        splashMatRef.current.opacity = 1 - sp;
      } else if (splashRef.current) {
        splashRef.current.visible = false;
        a.splashing = false;
      }
    }
  });

  return (
    <group>
      <mesh ref={dropletRef} position={[0, 5.5, 0]} visible={false}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial
          ref={dropletMatRef}
          color="#ff8fb2"
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.95}
        />
      </mesh>

      <mesh ref={ringRef} position={[0, 1.9, 0]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[0.85, 1.0, 64]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color="#ffffff"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <points ref={splashRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={SPLASH_COUNT}
            array={splashData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={splashMatRef}
          size={0.09}
          color="#ff8fb2"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
