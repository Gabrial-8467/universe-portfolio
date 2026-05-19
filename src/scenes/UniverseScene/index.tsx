import React, { useRef } from "react";
import * as THREE from "three";
import { useUniverseStore } from "../../store";
import Starfield from "../../components/Starfield";
import WarpTransition from "../../components/WarpTransition";

export const UniverseScene: React.FC = () => {
  const { transitionState } = useUniverseStore();
  const groupRef = useRef<THREE.Group | null>(null);

  return (
    <group ref={groupRef}>
      <Starfield
        count={7600}
        scale={1100}
        opacity={0.5}
        size={0.42}
        color="#d7e8ff"
        infinite
        scrollStrength={0.12}
        driftSpeed={0.28}
      />
      <Starfield
        count={2600}
        scale={480}
        opacity={0.82}
        size={0.64}
        color="#ffffff"
        infinite
        scrollStrength={0.28}
        driftSpeed={1.1}
      />
      <WarpTransition isActive={transitionState.isActive} color="#9be7ff" intensity={0.9} />

      <fog attach="fog" args={["#000000", 120, 2200]} />
      <ambientLight intensity={0.08} />
    </group>
  );
};

export default UniverseScene;
