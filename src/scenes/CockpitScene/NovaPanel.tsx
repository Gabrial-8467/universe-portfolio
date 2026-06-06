import { useRef } from "react";
import { Html, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { useCockpitStore } from "../../store/cockpitStore";

const NovaPanel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const commanderName = useCockpitStore((state) => state.commanderName);
  const isReturningCommander = useCockpitStore((state) => state.isReturningCommander);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = 1.42 + Math.sin(state.clock.elapsedTime * 1.2) * 0.008;
  });

  return (
    <group ref={groupRef} position={[0, 1.42, -1.9]}>
      <pointLight color="#55caf5" intensity={13} distance={7} />
      <RoundedBox args={[3.05, 1.95, 0.08]} radius={0.07} smoothness={4}>
        <meshStandardMaterial color="#252c33" emissive="#073d58" emissiveIntensity={1.2} metalness={0.9} roughness={0.24} />
      </RoundedBox>
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2.86, 1.74]} />
        <meshBasicMaterial color="#04131c" transparent opacity={0.72} />
      </mesh>
      <Html transform center position={[0, 0, 0.058]} distanceFactor={1.35} className="dashboard-html" zIndexRange={[20, 0]}>
        <section className="dashboard-hologram online-hologram">
          <div className="hologram-kicker"><span>NOVA AI CORE ONLINE</span><i /></div>
          <div className="online-layout">
            <div className="nova-core-orb online"><span /></div>
            <div>
              <h1>{isReturningCommander ? "WELCOME BACK" : "WELCOME COMMANDER"}</h1>
              <strong>COMMANDER: {commanderName}</strong>
            </div>
          </div>
          <div className="dashboard-status">
            <span><i /> SHIP SYSTEMS ONLINE</span>
            <span><i /> NAVIGATION READY</span>
          </div>
        </section>
      </Html>
    </group>
  );
};

export default NovaPanel;
