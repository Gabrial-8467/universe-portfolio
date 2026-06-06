import { Html, RoundedBox } from "@react-three/drei";
import type { ReactNode } from "react";

interface InstrumentDisplayProps {
  children: ReactNode;
  className?: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number];
  distanceFactor?: number;
}

const InstrumentDisplay = ({
  children,
  className = "",
  position,
  rotation = [0, 0, 0],
  size,
  distanceFactor = 1.9,
}: InstrumentDisplayProps) => (
  <group position={position} rotation={rotation}>
    <RoundedBox args={[size[0] + 0.18, size[1] + 0.18, 0.13]} radius={0.07} smoothness={3}>
      <meshStandardMaterial color="#242b32" metalness={0.88} roughness={0.25} />
    </RoundedBox>
    <mesh position={[0, 0, 0.075]}>
      <planeGeometry args={size} />
      <meshStandardMaterial color="#020a10" emissive="#073b55" emissiveIntensity={1.4} />
    </mesh>
    <Html transform center position={[0, 0, 0.09]} distanceFactor={distanceFactor} className="instrument-html" zIndexRange={[10, 0]}>
      <div className={`instrument-screen ${className}`}>{children}</div>
    </Html>
  </group>
);

export default InstrumentDisplay;
