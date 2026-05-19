import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CinematicGalaxyProps {
  position?: [number, number, number];
  scale?: number;
}

const buildSpiralLayer = (
  count: number,
  radius: number,
  armCount: number,
  spin: number,
  randomness: number,
  innerColor: THREE.Color,
  outerColor: THREE.Color
) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const branch = i % armCount;
    const branchAngle = (branch / armCount) * Math.PI * 2;
    const distance = Math.pow(Math.random(), 1.75) * radius;
    const spinAngle = distance * spin;
    const scatter = randomness * (0.25 + distance / radius);

    const randomX = (Math.random() - 0.5) * scatter * radius;
    const randomY = (Math.random() - 0.5) * scatter * radius * 0.09;
    const randomZ = (Math.random() - 0.5) * scatter * radius * 0.42;

    positions[i * 3] = Math.cos(branchAngle + spinAngle) * distance + randomX;
    positions[i * 3 + 1] = randomY;
    positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * distance * 0.42 + randomZ;

    const mixAmount = Math.min(distance / radius, 1);
    const color = innerColor.clone().lerp(outerColor, mixAmount);
    color.offsetHSL((Math.random() - 0.5) * 0.035, 0, (Math.random() - 0.5) * 0.18);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return { positions, colors };
};

export const CinematicGalaxy = ({ position = [0, 0, -170], scale = 1 }: CinematicGalaxyProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const brightDisk = useMemo(
    () =>
      buildSpiralLayer(
        18000,
        74,
        5,
        0.075,
        0.42,
        new THREE.Color("#fff4cc"),
        new THREE.Color("#8eb7ff")
      ),
    []
  );

  const dustDisk = useMemo(
    () =>
      buildSpiralLayer(
        6500,
        78,
        5,
        0.082,
        0.22,
        new THREE.Color("#6b371f"),
        new THREE.Color("#1b2440")
      ),
    []
  );

  const field = useMemo(() => {
    const count = 5200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 320;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 170;
      positions[i * 3 + 2] = -35 + (Math.random() - 0.5) * 80;

      const starColor = new THREE.Color(Math.random() > 0.9 ? "#ffd69a" : "#dcecff");
      colors[i * 3] = starColor.r;
      colors[i * 3 + 1] = starColor.g;
      colors[i * 3 + 2] = starColor.b;
    }

    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.006;
  });

  return (
    <group ref={groupRef} position={position} rotation={[-0.08, 0, -0.06]} scale={scale}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[field.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[field.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.38} vertexColors transparent opacity={0.72} depthWrite={false} />
      </points>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[brightDisk.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[brightDisk.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.72}
          vertexColors
          transparent
          opacity={0.86}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points position={[0, -0.2, 0.8]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustDisk.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustDisk.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.54} vertexColors transparent opacity={0.38} depthWrite={false} />
      </points>

      <mesh>
        <sphereGeometry args={[9.5, 48, 32]} />
        <meshBasicMaterial color="#fff0bd" transparent opacity={0.92} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[22, 48, 32]} />
        <meshBasicMaterial color="#9dbdff" transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};

export default CinematicGalaxy;
