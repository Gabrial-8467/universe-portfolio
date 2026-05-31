import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WormholeProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

const WORMHOLE_BASE_SCALE = 28;

export const Wormhole: React.FC<WormholeProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}) => {
  const wormholeRef = useRef<THREE.Group>(null);
  const accretionDiskRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (wormholeRef.current) {
      wormholeRef.current.rotation.z += delta * 0.3;
    }
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.z -= delta * 0.5;
    }
  });

  return (
    <group ref={wormholeRef} position={position} scale={scale * WORMHOLE_BASE_SCALE} rotation={rotation}>
      {/* Event horizon - pure black sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Accretion disk - glowing ring */}
      <mesh ref={accretionDiskRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 2.5, 64]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 3.5, 64]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.05, 1.2, 64]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point light for glow effect */}
      <pointLight color="#ff6600" intensity={3} distance={15} />
    </group>
  );
};

export default Wormhole;
