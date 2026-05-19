import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { HologramPanelData } from "../../types";
import TextLabel from "../TextLabel";

interface HologramPanelProps {
  data: HologramPanelData;
  position: [number, number, number];
  color?: string;
  visible?: boolean;
}

export const HologramPanel = ({ data, position, color = "#00ffff", visible = true }: HologramPanelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame((state) => {
    if (!groupRef.current || !visible) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = position[1] + Math.sin(t * 1.4) * 0.18;
    groupRef.current.lookAt(camera.position);
    groupRef.current.rotateZ(Math.sin(t * 0.7) * 0.012);
  });

  if (!visible) return null;

  const stats = data.stats ? Object.entries(data.stats) : [];

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <planeGeometry args={[8.8, 5.4]} />
        <meshBasicMaterial color="#020817" transparent opacity={0.46} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[9, 5.6]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} wireframe depthWrite={false} />
      </mesh>

      <TextLabel text={data.title} position={[0, 1.9, 0.08]} color={color} fontSize={66} />
      <TextLabel text={data.content} position={[0, 0.78, 0.08]} color="#ffffff" fontSize={36} maxWidth={820} />

      {stats.map(([label, value], index) => (
        <TextLabel
          key={label}
          text={`${label}: ${value}`}
          position={[-2.15, -0.68 - index * 0.58, 0.08]}
          color={index % 2 === 0 ? color : "#ffffff"}
          fontSize={31}
          align="left"
          maxWidth={760}
        />
      ))}
    </group>
  );
};

export default HologramPanel;
