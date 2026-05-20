import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface GalaxyProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

const GALAXY_BASE_SCALE = 28;

export const Galaxy: React.FC<GalaxyProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}) => {
  const { scene } = useGLTF("/galaxyModel/galaxy.glb");

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

  if (!clonedScene) return null;

  return (
    <primitive
      object={clonedScene}
      position={position}
      scale={scale * GALAXY_BASE_SCALE}
      rotation={rotation}
    />
  );
};

useGLTF.preload("/galaxyModel/galaxy.glb");

export default Galaxy;
