import { useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GalaxyProps } from "../../types";
import Planet from "../Planet";
import TextLabel from "../TextLabel";
import { useUniverseStore } from "../../store";
import galaxyModelUrl from "../../assets/galaxy.glb?url";

const GalaxyModel = ({ scale, color, active }: { scale: number; color: string; active: boolean }) => {
  const modelRef = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, galaxyModelUrl);
  const tint = useMemo(() => new THREE.Color(color), [color]);

  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = false;
      child.receiveShadow = false;

      const sourceMaterials = Array.isArray(child.material) ? child.material : [child.material];
      const materials = sourceMaterials.map((material) => {
        const cloned = material.clone() as THREE.MeshStandardMaterial;
        cloned.transparent = true;
        cloned.opacity = active ? 0.96 : 0.78;
        cloned.depthWrite = false;

        if ("color" in cloned) {
          cloned.color = cloned.color.clone().lerp(tint, 0.38);
        }

        cloned.emissive = tint.clone();
        cloned.emissiveIntensity = active ? 0.42 : 0.18;
        return cloned;
      });

      child.material = Array.isArray(child.material) ? materials : materials[0];
    });

    return clone;
  }, [active, gltf.scene, tint]);

  useFrame((_, delta) => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y += delta * (active ? 0.22 : 0.08);
    modelRef.current.rotation.z += delta * 0.025;
  });

  return (
    <group ref={modelRef} rotation={[0.22, 0, -0.12]} scale={scale * 4.8}>
      <primitive object={scene} />
      <mesh scale={active ? 1.28 : 1.05}>
        <sphereGeometry args={[1.65, 40, 28]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.12 : 0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};

export const Galaxy = ({ config, onPlanetClick, onPlanetHover, onGalaxyClick }: GalaxyProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredLocal, setHoveredLocal] = useState(false);
  const { hoverState, selectedGalaxy, selectedPlanet } = useUniverseStore();
  const active = hoveredLocal || hoverState.hoveredGalaxy === config.id || selectedGalaxy === config.id;
  const scale = config.scale ?? 1;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const rotationSpeed = config.rotationSpeed ?? 0.1;
    groupRef.current.rotation.y += delta * rotationSpeed * 0.035;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.00012 + config.position[0]) * 0.035;
    const targetScale = active ? scale * 1.08 : scale;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
  });

  const handleGalaxyClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    window.audioController?.playTransitionSound?.();
    onGalaxyClick?.();
  };

  const handlePlanetClick = (planetId: string) => {
    window.audioController?.playClickSound?.();
    onPlanetClick?.(planetId);
  };

  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHoveredLocal(true);
    window.audioController?.playHoverSound?.();
  };

  const handlePointerLeave = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHoveredLocal(false);
  };

  return (
    <group ref={groupRef} position={config.position}>
      <group onClick={handleGalaxyClick} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
        <GalaxyModel scale={scale} color={config.color} active={active} />
      </group>

      {config.planets.map((planet, index) => (
        <Planet
          key={planet.id}
          config={planet}
          orbitPhase={(index / config.planets.length) * Math.PI * 2 + (index % 2) * 0.18}
          orbitTilt={Math.PI * 0.18}
          isHovered={hoverState.hoveredPlanet === planet.id}
          isSelected={selectedPlanet === planet.id}
          onClick={() => handlePlanetClick(planet.id)}
          onHover={onPlanetHover}
        />
      ))}

      <TextLabel
        text={config.name}
        position={[0, 24, 0]}
        color={active ? "#ffffff" : config.color}
        fontSize={active ? 78 : 58}
        opacity={active ? 1 : 0.58}
      />
      {active && <TextLabel text={config.description ?? ""} position={[0, 22.1, 0]} color={config.color} fontSize={36} />}

      {config.planets.map((planet) => (
        <mesh key={`orbit-${planet.id}`} rotation={[Math.PI * 0.2, 0, 0]}>
          <torusGeometry args={[planet.orbitRadius, active ? 0.025 : 0.014, 8, 180]} />
          <meshBasicMaterial color={config.color} transparent opacity={active ? 0.15 : 0.045} />
        </mesh>
      ))}
    </group>
  );
};

export default Galaxy;
