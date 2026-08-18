"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
const BRAND_COLORS = ["#ff8fb2","#a78bfa","#ffb347","#d9a441","#e05297","#5eead4"];

export default function LiquidCanvas() {
  const meshRef = useRef();
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTouch: { value: new THREE.Vector2(0.5, 0.5) },
    uTouchActive: { value: 0 },
    uColor1: { value: new THREE.Color(BRAND_COLORS[0]) },
    uColor2: { value: new THREE.Color(BRAND_COLORS[1]) },
    uColor3: { value: new THREE.Color(BRAND_COLORS[4]) },
  }), []);

  useFrame((state) => {
    const { clock, pointer } = state;
    uniforms.uTime.value = clock.getElapsedTime();
    const x = (pointer.x + 1) / 2;
    const y = (pointer.y + 1) / 2;
    uniforms.uMouse.value.set(x, y);
    if (pointer.z > 0 || pointer.w > 0) {
      uniforms.uTouch.value.set(x, y);
      uniforms.uTouchActive.value = 1;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }`}
        fragmentShader={`precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uTouch;
          uniform float uTouchActive;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;

          // simplex noise
          vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
          vec2 mod289(vec2 x){ return x - floor(x*(1.0/289.0))*289.0; }
          vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

          float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
            vec2 i=floor(v+dot(v,C.yy));
            vec2 x0=v-i+dot(i,C.xx);
            vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
            vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
            i=mod289(i);
            vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
            vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
            m=m*m;m=m*m;
            vec3 x_=2.0*fract(p*C.www)-1.0;
            vec3 h=abs(x_)-0.5;
            vec3 ox=floor(x_+0.5);
            vec3 a0=x_-ox;
            m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
            vec3 g;
            g.x=a0.x*x0.x+h.x*x0.y;
            g.yz=a0.yz*x12.xz+h.yz*x12.yw;
            return 130.0*dot(m,g);
          }

          void main(){
            vec2 uv=vUv;
            float t=uTime*0.3;
            float n1=snoise(uv*2.5+t*0.4)*0.5;
            float n2=snoise(uv*5.0-t*0.3+10.0)*0.25;
            float n3=snoise(uv*8.0+t*0.2+20.0)*0.125;
            float n=n1+n2+n3;
            float dist=distance(uv,uMouse);
            n+=smoothstep(0.35,0.0,dist)*0.4*sin(t*3.0);
            float tDist=distance(uv,uTouch);
            float ripple=uTouchActive*smoothstep(0.25,0.0,tDist);
            n+=ripple*0.5*sin(tDist*40.0-t*8.0);
            vec3 col=mix(uColor1,uColor2,smoothstep(-0.3,0.3,n));
            col=mix(col,uColor3,smoothstep(0.1,0.6,n));
            float vig=1.0-smoothstep(0.4,1.2,length(uv-0.5)*1.2);
            col*=vig;
            col+=0.08*smoothstep(0.4,0.6,n);
            gl_FragColor=vec4(col,0.85);
          }`}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
