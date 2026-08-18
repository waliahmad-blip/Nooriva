"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import { flavors } from "@/lib/data";

const NOISE_GLSL = `
// Simplex 3D noise by Ashima / Stefan Gustavson
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const vertexShader = `
uniform float uTime;
uniform float uDistortion;
uniform vec3 uPointer;
uniform float uPointerStrength;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDistort;
${NOISE_GLSL}
void main() {
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position;
  float n = snoise(position * 1.4 + vec3(uTime * 0.25));
  float n2 = snoise(position * 2.8 - vec3(uTime * 0.18));
  float displace = (n * 0.7 + n2 * 0.3) * uDistortion;
  pos += normal * displace;
  vec3 toPointer = uPointer - vec3(position.xy, 0.0);
  float pDist = length(toPointer);
  pos += normal * smoothstep(1.2, 0.0, pDist) * uPointerStrength;
  vDistort = displace;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uIridescence;
uniform float uFresnelPower;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vDistort;
void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), uFresnelPower);
  float shift = sin(vDistort * 6.2831 + uTime * 0.6) * 0.5 + 0.5;
  vec3 irid = mix(uColorA, uColorB, shift);
  irid = mix(irid, vec3(1.0), fresnel * uIridescence);
  vec3 color = mix(uColorA * 0.6, irid, 0.65 + fresnel * 0.35);
  color += fresnel * uIridescence * 0.5;
  gl_FragColor = vec4(color, 0.92);
}
`;

export default function JellyOrb() {
  const meshRef = useRef();
  const materialRef = useRef();
  const selectedFlavor = useStore((s) => s.selectedFlavor);
  const lastPulse = useStore((s) => s.lastPulse);
  const current = flavors.find((f) => f.id === selectedFlavor) || flavors[0];

  const seenPulse = useRef(0);
  const pulseClock = useRef(-10);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: 0.32 },
      uPointer: { value: new THREE.Vector3(0, 0, 1) },
      uPointerStrength: { value: 0 },
      uColorA: { value: new THREE.Color(current.color) },
      uColorB: { value: new THREE.Color(current.colorB) },
      uIridescence: { value: 0.55 },
      uFresnelPower: { value: 2.2 },
    }),
    []
  );

  const targetA = useRef(new THREE.Color(current.color));
  const targetB = useRef(new THREE.Color(current.colorB));

  useFrame((state, delta) => {
    if (!materialRef.current || !meshRef.current) return;
    const u = materialRef.current.uniforms;

    u.uTime.value += delta;

    // Flavor color morph
    targetA.current.set(current.color);
    targetB.current.set(current.colorB);
    u.uColorA.value.lerp(targetA.current, 0.06);
    u.uColorB.value.lerp(targetB.current, 0.06);

    // Pointer bulge
    const px = state.pointer.x;
    const py = state.pointer.y;
    u.uPointer.value.set(px, py, 0.8).normalize();
    const active = Math.abs(px) > 0.01 || Math.abs(py) > 0.01;
    u.uPointerStrength.value = THREE.MathUtils.lerp(
      u.uPointerStrength.value,
      active ? 0.26 : 0,
      0.08
    );

    meshRef.current.rotation.y += delta * 0.1;

    // Breathing + pulse squash-and-stretch (scene transitions, flavor picks)
    const now = state.clock.elapsedTime;
    if (lastPulse !== seenPulse.current) {
      seenPulse.current = lastPulse;
      pulseClock.current = now;
    }
    const sincePulse = now - pulseClock.current;
    let wobble = 0;
    if (sincePulse < 1.2) {
      const decay = 1 - sincePulse / 1.2;
      wobble = Math.sin(sincePulse * 15) * 0.18 * decay;
    }
    const breath = 1 + Math.sin(now * 0.85) * 0.028;
    const sx = breath * (1 + wobble);
    const sy = breath * (1 - wobble * 0.85);
    meshRef.current.scale.set(sx, sy, sx);
    u.uDistortion.value = THREE.MathUtils.lerp(
      u.uDistortion.value,
      0.32 + Math.abs(wobble) * 2.4,
      0.12
    );
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
