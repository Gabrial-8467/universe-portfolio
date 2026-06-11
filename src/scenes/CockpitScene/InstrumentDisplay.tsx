import { Html } from "@react-three/drei";
import type { ReactNode } from "react";

interface InstrumentDisplayProps {
  children: ReactNode;
  className?: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number];
  distanceFactor?: number;
  onClick?: () => void;
}

const InstrumentDisplay = ({
  children,
  className = "",
  position,
  rotation = [0, 0, 0],
  size,
  distanceFactor = 1.9,
  onClick,
}: InstrumentDisplayProps) => (
  <group position={position} rotation={rotation}>
    {/* Invisible 3D raycast target for clicks */}
    <mesh onClick={onClick}>
      <planeGeometry args={size} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
    <Html transform center position={[0, 0, 0.005]} distanceFactor={distanceFactor} className="instrument-html" zIndexRange={[10, 0]}>
      <div 
        className={`instrument-screen ${className}`} 
        style={{ cursor: onClick ? "pointer" : "default" }}
        onClick={onClick}
      >
        {children}
      </div>
    </Html>
  </group>
);

export default InstrumentDisplay;
