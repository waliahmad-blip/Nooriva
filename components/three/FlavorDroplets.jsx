"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { flavors } from "@/lib/data";
import { useStore } from "@/lib/store";

function Droplet({ flavor, index, total }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const setSelectedFlavor = useStore((s) => s.setSelectedFlavor);
  const selectedFlavor = useStore((s) => s.selectedFlavor);

  const isSelected = selectedFlavor === flavor.id;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.4 + (index / total) * Math.PI * 2;
    const radius = 3.1;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius * 0.4;
    ref.current.position.y = Math.sin(t * 1.5) * 0.5;

    const targetScale = hovered ? 1.35 : isSelected ? 1.15 : 0.9;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
  });

  return (
    <mesh
      ref={ref}
      onClick={() => setSelectedFlavor(flavor.id)}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <icosahedronGeometry args={[0.28, 16]} />
      <meshPhysicalMaterial
        color={flavor.color}
        roughness={0.15}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive={flavor.color}
        emissiveIntensity={hovered || isSelected ? 0.4 : 0.12}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

export default function FlavorDroplets() {
  return (
    <group>
      {flavors.map((flavor, i) => (
        <Droplet key={flavor.id} flavor={flavor} index={i} total={flavors.length} />
      ))}
    </group>
  );
}
