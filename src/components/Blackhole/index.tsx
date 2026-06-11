import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BlackholeProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  raycast?: any;
}

const BLACKHOLE_BASE_SCALE = 28;

export const Blackhole: React.FC<BlackholeProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  raycast,
}) => {
  const { scene } = useGLTF("/blackholeModel/blackhole.glb");
  const blackholeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (blackholeRef.current) {
      blackholeRef.current.rotation.y += delta * 0.3;
    }
  });

  if (!scene) return null;

  return (
    <primitive
      ref={blackholeRef}
      object={scene.clone()}
      position={position}
      scale={scale * BLACKHOLE_BASE_SCALE}
      rotation={rotation}
      raycast={raycast}
    />
  );
};

export default Blackhole;

useGLTF.preload("/blackholeModel/blackhole.glb");
