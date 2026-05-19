import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitRingProps {
  radius?: number;
  color?: string;
  speed?: number;
  opacity?: number;
  thickness?: number;
}

export const OrbitRing: React.FC<OrbitRingProps> = ({
  radius = 20,
  color = "#00ffff",
  speed = 0.1,
  opacity = 0.3,
  thickness = 0.1,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += speed * 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main orbit ring */}
      <mesh>
        <torusGeometry args={[radius, thickness, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>

      {/* Glowing ring */}
      <mesh scale={1.05} position={[0, 0, 0.01]}>
        <torusGeometry args={[radius, thickness * 0.5, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={opacity * 0.5} />
      </mesh>

      {/* Particles along the ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[thickness * 2, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
};

export default OrbitRing;
