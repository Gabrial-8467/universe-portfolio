import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface StarfieldProps {
  count?: number;
  scale?: number;
  opacity?: number;
  size?: number;
  color?: string;
  infinite?: boolean;
  scrollStrength?: number;
  driftSpeed?: number;
}

export const Starfield: React.FC<StarfieldProps> = ({
  count = 10000,
  scale = 500,
  opacity = 0.55,
  size = 0.22,
  color = "#dff7ff",
  infinite = false,
  scrollStrength = 0.18,
  driftSpeed = 0.8,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const velocityRef = useRef(0);
  const { camera } = useThree();
  const halfScale = scale / 2;

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * scale;
      positions[i * 3 + 1] = (Math.random() - 0.5) * scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * scale;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, sizes };
  }, [count, scale]);

  useEffect(() => {
    if (!infinite) return;

    const handleWheel = (event: WheelEvent) => {
      velocityRef.current += THREE.MathUtils.clamp(event.deltaY, -180, 180) * scrollStrength;
      velocityRef.current = THREE.MathUtils.clamp(velocityRef.current, -95, 95);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [infinite, scrollStrength]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.001;
      pointsRef.current.rotation.y += delta * 0.002;
      pointsRef.current.rotation.z += delta * 0.001;
    }

    if (!infinite || !pointsRef.current) return;

    pointsRef.current.position.copy(camera.position);

    const positionAttribute = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const values = positionAttribute.array as Float32Array;
    const travel = (velocityRef.current + driftSpeed) * delta;

    for (let i = 0; i < count; i += 1) {
      const zIndex = i * 3 + 2;
      values[zIndex] += travel;

      if (values[zIndex] > halfScale) {
        values[zIndex] -= scale;
        values[i * 3] = (Math.random() - 0.5) * scale;
        values[i * 3 + 1] = (Math.random() - 0.5) * scale;
      } else if (values[zIndex] < -halfScale) {
        values[zIndex] += scale;
        values[i * 3] = (Math.random() - 0.5) * scale;
        values[i * 3 + 1] = (Math.random() - 0.5) * scale;
      }
    }

    velocityRef.current *= Math.pow(0.88, delta * 60);
    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
};

export default Starfield;
