"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useIsMobile from "@/hooks/useIsMobile";

export default function TiltRig({ children }) {
  const groupRef = useRef();
  const isMobile = useIsMobile();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isMobile) {
      const onMove = (e) => {
        target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    } else {
      const onOrient = (e) => {
        target.current.x = THREE.MathUtils.clamp((e.gamma || 0) / 30, -1, 1);
        target.current.y = -THREE.MathUtils.clamp(((e.beta || 0) - 45) / 30, -1, 1);
      };
      const enable = () => {
        if (
          typeof DeviceOrientationEvent !== "undefined" &&
          typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
          DeviceOrientationEvent.requestPermission()
            .then((res) => {
              if (res === "granted") window.addEventListener("deviceorientation", onOrient);
            })
            .catch(() => {});
        } else {
          window.addEventListener("deviceorientation", onOrient);
        }
      };
      window.addEventListener("touchstart", enable, { once: true });
      return () => {
        window.removeEventListener("deviceorientation", onOrient);
        window.removeEventListener("touchstart", enable);
      };
    }
  }, [isMobile]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y, target.current.x * 0.22, 3, delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x, -target.current.y * 0.14, 3, delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
}
