import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import InstrumentDisplay from "./InstrumentDisplay";

interface CockpitInteriorProps {
  activation: number;
}

const cyan = "#4dd5ff";
const amber = "#e0a25a";
const dark = "#080b0f";

const ExteriorSpace = () => (
  <group position={[0, 2.45, -18]}>
    {Array.from({ length: 360 }, (_, index) => {
      const x = ((index * 37) % 100) / 100 * 26 - 13;
      const y = ((index * 61) % 100) / 100 * 11 - 5.5;
      const size = 0.018 + (((index * 17) % 5) * 0.006);

      return (
        <mesh key={index} position={[x, y, -((index * 13) % 12)]}>
          <sphereGeometry args={[size, 8, 8]} />
          <meshBasicMaterial color={index % 9 === 0 ? "#ffd6c7" : "#dceeff"} toneMapped={false} />
        </mesh>
      );
    })}
    <mesh position={[-7.5, 2.2, -9]}>
      <sphereGeometry args={[5.2, 40, 24]} />
      <meshBasicMaterial color="#74608f" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
    <mesh position={[7.2, -1.4, -15]}>
      <sphereGeometry args={[6.4, 40, 24]} />
      <meshBasicMaterial color="#255e92" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  </group>
);

const Beam = ({ position, rotation = [0, 0, 0], scale }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: [number, number, number];
}) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry args={scale} />
    <meshStandardMaterial color="#11161c" metalness={0.94} roughness={0.25} />
  </mesh>
);

const LightButton = ({ position, color = cyan, activation }: {
  position: [number, number, number];
  color?: string;
  activation: number;
}) => (
  <mesh position={position}>
    <cylinderGeometry args={[0.045, 0.045, 0.025, 14]} />
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={activation * 3} toneMapped={false} />
  </mesh>
);

const Dial = ({ position }: { position: [number, number, number] }) => (
  <group position={position} rotation={[Math.PI / 2, 0, 0]}>
    <mesh>
      <cylinderGeometry args={[0.11, 0.13, 0.08, 20]} />
      <meshStandardMaterial color="#30363d" metalness={0.9} roughness={0.25} />
    </mesh>
    <mesh position={[0, 0.045, 0]}>
      <boxGeometry args={[0.025, 0.015, 0.1]} />
      <meshBasicMaterial color={cyan} />
    </mesh>
  </group>
);

const ButtonBank = ({ side, activation }: { side: -1 | 1; activation: number }) => (
  <group position={[side * 2.75, 0.25, -1.15]} rotation={[-0.52, side * -0.16, 0]}>
    <RoundedBox args={[1.75, 0.14, 1.25]} radius={0.08} smoothness={3}>
      <meshStandardMaterial color="#1c232a" metalness={0.84} roughness={0.31} />
    </RoundedBox>
    {Array.from({ length: 18 }, (_, index) => (
      <LightButton
        key={index}
        position={[(index % 6) * 0.24 - 0.6, 0.09, Math.floor(index / 6) * 0.24 - 0.25]}
        color={index % 7 === 0 ? amber : cyan}
        activation={activation}
      />
    ))}
    <Dial position={[-0.62, 0.09, 0.45]} />
    <Dial position={[0.62, 0.09, 0.45]} />
  </group>
);

const Keyboard = ({ activation }: { activation: number }) => (
  <group position={[2.2, 0.35, -1.35]} rotation={[-0.62, -0.12, -0.03]}>
    <RoundedBox args={[1.7, 0.11, 0.76]} radius={0.06} smoothness={3}>
      <meshStandardMaterial color="#1a2026" metalness={0.82} roughness={0.32} />
    </RoundedBox>
    {Array.from({ length: 40 }, (_, index) => (
      <mesh key={index} position={[(index % 10) * 0.145 - 0.65, 0.072, Math.floor(index / 10) * 0.14 - 0.21]}>
        <boxGeometry args={[0.105, 0.025, 0.09]} />
        <meshStandardMaterial color="#182b34" emissive={cyan} emissiveIntensity={activation * 1.5} />
      </mesh>
    ))}
  </group>
);

const Throttle = ({ activation }: { activation: number }) => (
  <group position={[-2.85, 0.12, -0.45]} rotation={[0, 0, -0.08]}>
    <RoundedBox args={[0.78, 0.16, 1.1]} radius={0.1} smoothness={3}>
      <meshStandardMaterial color="#191f25" metalness={0.82} roughness={0.34} />
    </RoundedBox>
    <mesh position={[0, 0.42, 0]} rotation={[0, 0, -0.15]}>
      <cylinderGeometry args={[0.09, 0.1, 0.75, 18]} />
      <meshStandardMaterial color="#252c33" metalness={0.72} roughness={0.38} />
    </mesh>
    <RoundedBox args={[0.48, 0.22, 0.24]} radius={0.08} smoothness={3} position={[-0.06, 0.78, 0]} rotation={[0, 0, -0.15]}>
      <meshStandardMaterial color="#303840" metalness={0.72} roughness={0.35} />
    </RoundedBox>
    <LightButton position={[0.12, 0.8, 0.13]} color={amber} activation={activation} />
  </group>
);

const StaticDisplays = () => (
  <>
    <InstrumentDisplay position={[-2.5, 1.38, -1.86]} rotation={[0, 0.14, 0.08]} size={[2.05, 1.5]} className="radar-display" distanceFactor={1.85}>
      <header><b>PROXIMITY RADAR</b><span>SCAN 360</span></header>
      <div className="radar"><i /><i /><i /><i /><span /></div>
      <footer><span>RNG 42.8</span><span>CONTACTS 03</span></footer>
    </InstrumentDisplay>
    <InstrumentDisplay position={[2.5, 1.38, -1.86]} rotation={[0, -0.14, -0.08]} size={[2.05, 1.5]} className="systems-display" distanceFactor={1.85}>
      <header><b>SHIP SYSTEMS</b><span>NOMINAL</span></header>
      <div className="systems-grid">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div>
      <div className="system-bars"><i /><i /><i /></div>
      <footer><span>CORE 98%</span><span>HULL 100%</span></footer>
    </InstrumentDisplay>
    <InstrumentDisplay position={[-3.62, 0.86, -1.2]} rotation={[0, 0.32, 0.08]} size={[1.82, 1.16]} className="telemetry-display" distanceFactor={1.75}>
      <header><b>FLIGHT DATA</b><span>LIVE</span></header>
      <div className="telemetry-wave"><i /><i /><i /></div>
      <div className="tiny-columns">{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div>
    </InstrumentDisplay>
    <InstrumentDisplay position={[3.62, 0.86, -1.2]} rotation={[0, -0.32, -0.08]} size={[1.82, 1.16]} className="telemetry-display" distanceFactor={1.75}>
      <header><b>NAV COMPUTE</b><span>READY</span></header>
      <div className="nav-orbits"><i /><i /><span /></div>
      <div className="tiny-columns">{Array.from({ length: 8 }, (_, index) => <i key={index} />)}</div>
    </InstrumentDisplay>
    <InstrumentDisplay position={[0, 2.95, -3.18]} rotation={[-0.03, 0, 0]} size={[1.48, 1]} distanceFactor={1.55} className="hud-display">
      <div className="hud-reticle"><i /><span>VECTOR LOCK</span></div>
    </InstrumentDisplay>
  </>
);

const CockpitInterior = ({ activation }: CockpitInteriorProps) => (
  <group>
    <hemisphereLight args={["#b7d4e4", "#182027", 1.15 + activation * 0.2]} />
    <ambientLight intensity={0.56 + activation * 0.36} color="#a4c0cf" />
    <pointLight position={[-3.5, 1.5, 0]} color={cyan} intensity={5 + activation * 12} distance={10} />
    <pointLight position={[3.5, 1.5, 0]} color={cyan} intensity={5 + activation * 12} distance={10} />
    <pointLight position={[0, 1.1, -1.3]} color="#d7f3ff" intensity={activation * 6} distance={5} />
    <spotLight position={[0, 4.5, 2]} target-position={[0, 0.8, -2]} color="#f0fbff" intensity={9 + activation * 4} angle={0.95} penumbra={0.75} />

    <ExteriorSpace />

    <mesh position={[0, -0.82, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[11, 12]} />
      <meshStandardMaterial color="#14191e" metalness={0.88} roughness={0.38} />
    </mesh>

    <RoundedBox args={[8.35, 1.06, 1.95]} radius={0.24} smoothness={4} position={[0, 0.45, -1.48]} rotation={[-0.2, 0, 0]}>
      <meshStandardMaterial color="#20262c" metalness={0.9} roughness={0.28} />
    </RoundedBox>
    <RoundedBox args={[3.05, 1.95, 0.18]} radius={0.1} smoothness={4} position={[0, 1.42, -2.01]}>
      <meshStandardMaterial color="#262d34" metalness={0.9} roughness={0.22} />
    </RoundedBox>
    <RoundedBox args={[1.25, 1.85, 1.2]} radius={0.12} smoothness={4} position={[0, -0.05, -0.82]} rotation={[-0.18, 0, 0]}>
      <meshStandardMaterial color="#242a30" metalness={0.88} roughness={0.3} />
    </RoundedBox>

    <StaticDisplays />
    <ButtonBank side={-1} activation={activation} />
    <ButtonBank side={1} activation={activation} />
    <Keyboard activation={activation} />
    <Throttle activation={activation} />

    <group position={[0, -0.05, -0.85]} rotation={[-0.08, 0, 0]}>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.09, 0.13, 0.92, 18]} />
        <meshStandardMaterial color="#252b31" metalness={0.8} roughness={0.28} />
      </mesh>
      <RoundedBox args={[0.36, 0.3, 0.28]} radius={0.08} smoothness={3} position={[0, 0.78, 0]}>
        <meshStandardMaterial color="#30373e" metalness={0.78} roughness={0.3} />
      </RoundedBox>
      {[[-0.11, 0.82, 0.14], [0.11, 0.82, 0.14], [0, 0.9, 0.14]].map((position, index) => (
        <LightButton key={index} position={position as [number, number, number]} color={index === 2 ? amber : cyan} activation={activation} />
      ))}
    </group>

    {[-0.38, 0.38].map((x) => (
      <mesh key={x} position={[x, -0.25, -2.02]} rotation={[-0.16, 0, 0]}>
        <boxGeometry args={[0.5, 0.85, 0.12]} />
        <meshStandardMaterial color="#252a2f" metalness={0.75} roughness={0.5} />
      </mesh>
    ))}

    <Beam position={[-5.6, 1.6, -3.35]} rotation={[0, 0, -0.12]} scale={[0.5, 5.9, 0.75]} />
    <Beam position={[5.6, 1.6, -3.35]} rotation={[0, 0, 0.12]} scale={[0.5, 5.9, 0.75]} />
    <Beam position={[-3.4, 3.9, -4.25]} rotation={[0, 0, -0.66]} scale={[0.2, 6, 0.3]} />
    <Beam position={[3.4, 3.9, -4.25]} rotation={[0, 0, 0.66]} scale={[0.2, 6, 0.3]} />
    <Beam position={[0, 4.55, -4.5]} scale={[4.6, 0.22, 0.34]} />
    <Beam position={[-4.65, 2.95, -4.75]} rotation={[0, 0, 0.74]} scale={[0.14, 6.7, 0.22]} />
    <Beam position={[4.65, 2.95, -4.75]} rotation={[0, 0, -0.74]} scale={[0.14, 6.7, 0.22]} />

    <mesh position={[0, 2.45, -4.25]}>
      <planeGeometry args={[11.6, 6.2]} />
      <meshPhysicalMaterial color="#7fb4d0" transmission={0.86} opacity={0.12} transparent roughness={0.025} thickness={0.05} depthWrite={false} />
    </mesh>

    {[-3.6, -2.4, -1.2, 0, 1.2, 2.4, 3.6].map((x) => (
      <mesh key={x} position={[x, -0.78, 0]}>
        <boxGeometry args={[0.025, 0.025, 10]} />
        <meshBasicMaterial color={x === 0 ? cyan : "#34434d"} />
      </mesh>
    ))}
    <mesh position={[0, -0.7, 3]}>
      <boxGeometry args={[1.2, 0.2, 1]} />
      <meshStandardMaterial color={dark} metalness={0.8} roughness={0.4} />
    </mesh>
  </group>
);

export default CockpitInterior;
