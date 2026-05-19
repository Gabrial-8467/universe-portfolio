import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WarpTransitionProps {
  isActive?: boolean;
  color?: string;
  intensity?: number;
}

export const WarpTransition: React.FC<WarpTransitionProps> = ({
  isActive = false,
  color = "#9be7ff",
  intensity = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  const positions = useMemo(() => {
    const lineCount = 72;
    const values = new Float32Array(lineCount * 2 * 3);

    for (let i = 0; i < lineCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 8 + Math.random() * 54;
      const length = 20 + Math.random() * 56;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.55;
      const z = -80 - Math.random() * 90;

      values[i * 6] = x;
      values[i * 6 + 1] = y;
      values[i * 6 + 2] = z;
      values[i * 6 + 3] = x * 0.18;
      values[i * 6 + 4] = y * 0.18;
      values[i * 6 + 5] = z + length;
    }

    return values;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || !materialRef.current) return;
    groupRef.current.visible = isActive;

    if (!isActive) return;
    groupRef.current.rotation.z += delta * 0.25;
    materialRef.current.opacity = 0.18 * intensity + Math.sin(Date.now() * 0.012) * 0.06;
  });

  if (!isActive) return null;

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={materialRef}
          color={color}
          transparent
          opacity={0.18 * intensity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

export default WarpTransition;
