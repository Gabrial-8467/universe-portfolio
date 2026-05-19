import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleSystemProps {
  count?: number;
  speed?: number;
  spread?: number;
  lifetime?: number;
  size?: number;
  color?: string;
  position?: [number, number, number];
  isPlaying?: boolean;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 1000,
  speed = 2,
  spread = 100,
  lifetime = 5,
  size = 0.5,
  color = "#ffffff",
  position = [0, 0, 0],
  isPlaying = true,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<
    Array<{
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
    }>
  >([]);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      sizes[i] = Math.random() * size;

      const vx = (Math.random() - 0.5) * speed;
      const vy = (Math.random() - 0.5) * speed;
      const vz = (Math.random() - 0.5) * speed;

      particlesRef.current.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(vx, vy, vz),
        life: lifetime,
        maxLife: lifetime,
      });
    }

    return { positions, sizes };
  }, [count, speed, spread, lifetime, size]);

  useFrame(() => {
    if (!isPlaying || !pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const positions = positionAttribute.array as Float32Array;

    particlesRef.current.forEach((particle, i) => {
      particle.life -= 0.016;

      if (particle.life > 0) {
        particle.position.add(particle.velocity.clone().multiplyScalar(0.016));
        particle.velocity.multiplyScalar(0.99); // Damping

        positions[i * 3] = particle.position.x;
        positions[i * 3 + 1] = particle.position.y;
        positions[i * 3 + 2] = particle.position.z;
      } else {
        positions[i * 3] = position[0];
        positions[i * 3 + 1] = position[1];
        positions[i * 3 + 2] = position[2];
      }
    });

    positionAttribute.needsUpdate = true;
  });

  const colorObj = new THREE.Color(color);

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={colorObj}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

export default ParticleSystem;
