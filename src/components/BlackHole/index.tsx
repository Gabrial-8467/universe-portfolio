import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BlackHoleProps {
  position?: [number, number, number];
  scale?: number;
  pullStrength?: number;
  eventHorizonColor?: string;
  glowColor?: string;
}

export const BlackHole: React.FC<BlackHoleProps> = ({
  position = [0, 0, 0],
  scale = 1,
  pullStrength = 0.5,
  eventHorizonColor = "#000000",
  glowColor = "#ff6b00",
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const accretionDiskRef = useRef<THREE.Mesh>(null);
  const horizonRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame(() => {
    timeRef.current += 0.01;

    if (groupRef.current) {
      groupRef.current.rotation.z += 0.001;
    }

    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.x += 0.005;
    }

    if (horizonRef.current && horizonRef.current.material instanceof THREE.ShaderMaterial) {
      (horizonRef.current.material as any).uniforms.uTime.value = timeRef.current;
    }
  });

  const distortionVertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      pos.x += sin(position.y * 2.0 + uTime) * 0.1;
      pos.y += cos(position.x * 2.0 + uTime) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const distortionFragmentShader = `
    uniform vec3 uGlowColor;
    uniform float uTime;
    varying vec2 vUv;
    
    void main() {
              float distortion = sin(vUv.y * ${(10 + pullStrength * 8).toFixed(1)} + uTime * 5.0) * 0.1;
      float pulse = sin(uTime * 3.0) * 0.5 + 0.5;
      
      float dist = length(vUv - 0.5);
      float alpha = (1.0 - dist) * pulse + distortion;
      
      gl_FragColor = vec4(uGlowColor, alpha * 0.6);
    }
  `;

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Event horizon (black sphere) */}
      <mesh ref={horizonRef}>
        <sphereGeometry args={[3, 32, 32]} />
        <shaderMaterial
          vertexShader={distortionVertexShader}
          fragmentShader={distortionFragmentShader}
          uniforms={{
            uGlowColor: { value: new THREE.Color(glowColor) },
            uTime: { value: 0 },
          }}
          transparent
        />
      </mesh>

      {/* Core black sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color={eventHorizonColor} />
      </mesh>

      {/* Accretion disk */}
      <mesh ref={accretionDiskRef} position={[0, 0, 0]}>
        <torusGeometry args={[5, 1, 16, 100]} />
        <meshStandardMaterial
          color={glowColor}
          transparent
          opacity={0.4}
          emissive={glowColor}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[6, 0.5, 16, 100]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Gravitational lensing particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 7 + Math.sin(timeRef.current + i * 0.3) * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 3;

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

export default BlackHole;
