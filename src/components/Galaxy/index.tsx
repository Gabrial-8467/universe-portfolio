import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GalaxyProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  raycast?: any;
}

const GALAXY_BASE_SCALE = 28;

export const Galaxy: React.FC<GalaxyProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  raycast,
}) => {
  const { scene } = useGLTF("/galaxyModel/galaxy.glb");
  const galaxyRef = useRef<THREE.Object3D>(null);

  const clonedScene = useMemo(() => {
    if (!scene) return null;
    const cloned = scene.clone(true) as THREE.Object3D;

    cloned.traverse((child) => {
      if (child.type === "Mesh" && /sphere/i.test(child.name)) {
        child.visible = false;
      }
    });

    return cloned;
  }, [scene]);

  useFrame((_, delta) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += delta * 0.1;
    }
  });

  if (!clonedScene) return null;

  return (
    <primitive
      ref={galaxyRef}
      object={clonedScene}
      position={position}
      scale={scale * GALAXY_BASE_SCALE}
      rotation={rotation}
      raycast={raycast}
    />
  );
};

useGLTF.preload("/galaxyModel/galaxy.glb");

export default Galaxy;
