import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NebulaProps {
  color?: string;
  position?: [number, number, number];
  scale?: number;
  opacity?: number;
  speed?: number;
}

export const Nebula: React.FC<NebulaProps> = ({
  color = "#ff3040",
  position = [0, 0, 0],
  scale = 100,
  opacity = 0.3,
  speed = 0.5,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame(() => {
    timeRef.current += 0.001 * speed;
    if (meshRef.current && meshRef.current.material instanceof THREE.ShaderMaterial) {
      (meshRef.current.material as any).uniforms.uTime.value = timeRef.current;
      (meshRef.current.material as any).uniforms.uOpacity.value = opacity;
    }
  });

  const nebulaVertexShader = `
    uniform float uTime;
    uniform float uScale;
    
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      pos.x += sin(position.z * 0.1 + uTime * 0.5) * 0.5;
      pos.y += cos(position.x * 0.1 + uTime * 0.3) * 0.5;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos * uScale, 1.0);
    }
  `;

  const nebulaFragmentShader = `
    uniform vec3 uColor;
    uniform float uTime;
    uniform float uOpacity;
    
    varying vec2 vUv;
    
    float noise(vec2 uv, float t) {
      uv *= 3.0;
      float i = floor(uv.x);
      float j = floor(uv.y);
      float fi = fract(uv.x);
      float fj = fract(uv.y);
      
      fi = fi * fi * (3.0 - 2.0 * fi);
      fj = fj * fj * (3.0 - 2.0 * fj);
      
      float n0 = sin(i * 12.9898 + j * 78.233 + t) * 0.5 + 0.5;
      float n1 = sin(i * 12.9898 + (j + 1.0) * 78.233 + t) * 0.5 + 0.5;
      float nx0 = mix(n0, n1, fj);
      
      float n2 = sin((i + 1.0) * 12.9898 + j * 78.233 + t) * 0.5 + 0.5;
      float n3 = sin((i + 1.0) * 12.9898 + (j + 1.0) * 78.233 + t) * 0.5 + 0.5;
      float nx1 = mix(n2, n3, fj);
      
      return mix(nx0, nx1, fi);
    }
    
    void main() {
      vec2 uv = vUv;
      
      float n1 = noise(uv + uTime * 0.05, uTime * 0.1);
      float n2 = noise(uv * 2.0 - uTime * 0.03, uTime * 0.15);
      float n3 = noise(uv * 0.5 + uTime * 0.02, uTime * 0.08);
      
      float pattern = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
      pattern = smoothstep(0.3, 0.7, pattern);
      
      float dist = length(uv - 0.5) * 2.0;
      float edge = smoothstep(1.0, 0.3, dist);
      
      float alpha = pattern * edge * uOpacity;
      
      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  const colorObj = new THREE.Color(color);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={{
          uColor: { value: colorObj },
          uTime: { value: 0 },
          uScale: { value: 1 },
          uOpacity: { value: opacity },
        }}
        transparent
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
};

export default Nebula;
