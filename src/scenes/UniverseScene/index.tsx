import React, { useMemo, useState, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Starfield from "../../components/Starfield";
import Galaxy from "../../components/Galaxy";
import Blackhole from "../../components/Blackhole";
import { useUniverseStore } from "../../store";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  link: string;
  cameraOffset: [number, number, number];
}

export const UniverseScene: React.FC = () => {
  const { camera } = useThree();
  const { setIsTraveling, setIsAnimating } = useUniverseStore();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const LY_SCALE = 100;

  const randomGalaxyPosition = (
    minLY = 8,
    maxLY = 15
  ): [number, number, number] => {
    const distanceLY = minLY + Math.random() * (maxLY - minLY);

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    const radius = distanceLY * LY_SCALE;

    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    ];
  };

  const blackholePosition: [number, number, number] = [
    21 * LY_SCALE,
    0,
    0,
  ];

  const randomRotation = (): [number, number, number] => [
    0,
    Math.random() * Math.PI * 2,
    0,
  ];

  const randomCameraOffset = (): [number, number, number] => {
    const direction = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).normalize();
    const distance = 600 + Math.random() * 1200;
    return [direction.x * distance, direction.y * distance, direction.z * distance];
  };

  // Generate portfolio items with random positions
  const portfolioItems = useMemo<PortfolioItem[]>(() => {
    const items: PortfolioItem[] = [
      {
        cameraOffset: randomCameraOffset(),
        id: 1,
        title: "About",
        description: "Learn more about me",
        position: randomGalaxyPosition(),
        rotation: randomRotation(),
        scale: 1.2,
        link: "#about",
      },
      {
        id: 2,
        title: "Skills",
        description: "My technical expertise",
        position: randomGalaxyPosition(),
        rotation: randomRotation(),
        scale: 0.9,
        link: "#skills",
        cameraOffset: randomCameraOffset(),
      },
      {
        id: 3,
        title: "Education",
        description: "Academic background",
        position: randomGalaxyPosition(),
        rotation: randomRotation(),
        scale: 0.7,
        link: "#education",
        cameraOffset: randomCameraOffset(),
      },
      {
        id: 4,
        title: "Experience",
        description: "Professional journey",
        position: randomGalaxyPosition(),
        rotation: randomRotation(),
        scale: 0.85,
        link: "#experience",
        cameraOffset: randomCameraOffset(),
      },
      {
        id: 5,
        title: "Achievements",
        description: "Notable accomplishments",
        position: randomGalaxyPosition(),
        rotation: randomRotation(),
        scale: 0.75,
        link: "#achievements",
        cameraOffset: randomCameraOffset(),
      },
      {
        id: 6,
        title: "Projects",
        description: "Featured work",
        position: randomGalaxyPosition(),
        rotation: randomRotation(),
        scale: 0.82,
        link: "#projects",
        cameraOffset: randomCameraOffset(),
      },
      {
        id: 7,
        title: "Contact",
        description: "Get in touch",
        position: blackholePosition,
        rotation: randomRotation(),
        scale: 1.0,
        link: "#contact",
        cameraOffset: randomCameraOffset(),
      }
    ];

    return items;
  }, []);

  const galaxyPositions = useMemo<[number, number, number][]>(
    () => portfolioItems.map((item) => item.position),
    [portfolioItems]
  );
  const [travelTargetId, setTravelTargetId] = useState<number | null>(null);
  const [travelLink, setTravelLink] = useState<string | null>(null);
  const cameraZoom = useRef(1);

  useEffect(() => {
    camera.position.set(0, 0, 900);
    camera.lookAt(0, 0, 0);
    cameraZoom.current = 1;
  }, [camera]);

  useFrame((_, delta: number) => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;

    if (travelTargetId !== null) {
      const targetIndex = portfolioItems.findIndex((item) => item.id === travelTargetId);
      if (targetIndex !== -1) {
        const item = portfolioItems[targetIndex];
        const targetPosition = new THREE.Vector3(...galaxyPositions[targetIndex]);
        const arrivalOffset = new THREE.Vector3(...item.cameraOffset)
          .normalize()
          .multiplyScalar(120 + item.scale * 90);
        const desiredCameraPos = targetPosition.clone().add(arrivalOffset);

        perspectiveCamera.position.lerp(desiredCameraPos, Math.min(delta * 0.5, 1));
        perspectiveCamera.lookAt(targetPosition);

        cameraZoom.current = Math.max(0.5, cameraZoom.current - delta * 0.12);
        perspectiveCamera.fov = 75 * cameraZoom.current;
        perspectiveCamera.updateProjectionMatrix();

        const distance = perspectiveCamera.position.distanceTo(desiredCameraPos);
        if (distance < 2) {
          setIsTraveling(false);
          setIsAnimating(false);
          setTravelTargetId(null);
          if (travelLink) {
            window.location.href = travelLink;
          }
        }
      }
      return;
    }

    if (cameraZoom.current < 1) {
      cameraZoom.current = Math.min(1, cameraZoom.current + delta * 0.1);
      perspectiveCamera.fov = 75 * cameraZoom.current;
      perspectiveCamera.updateProjectionMatrix();
    }
  });

  return (
    <group>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} />
      <hemisphereLight args={["#ffffff", "#444444", 0.35]} />
      <Starfield count={5000} size={0.5} color="#ffffff" infinite={true} />

      {/* Render Galaxy portfolio items */}
      {portfolioItems.map((item, index) => (
        <group
          key={item.id}
          position={galaxyPositions[index]}
          rotation={item.rotation}
          onPointerOver={() => setHoveredId(item.id)}
          onPointerOut={() => setHoveredId(null)}
          onClick={() => {
            cameraZoom.current = 1;
            setTravelTargetId(item.id);
            setTravelLink(item.link);
            setIsTraveling(true);
            setIsAnimating(true);
          }}
        >
          {item.title === "Contact" ? (
            <Blackhole
              position={[0, 0, 0]}
              scale={
                hoveredId === item.id || travelTargetId === item.id
                  ? item.scale * 2.4
                  : item.scale
              }
              rotation={[0, 0, 0]}
            />
          ) : (
            <Galaxy
              position={[0, 0, 0]}
              scale={
                hoveredId === item.id || travelTargetId === item.id
                  ? item.scale * 2.4
                  : item.scale
              }
              rotation={[0, 0, 0]}
            />
          )}

          {/* Hover label */}
          {hoveredId === item.id && (
            <Html center style={{ pointerEvents: "none", color: "#ffffff", whiteSpace: "nowrap", fontSize: "1rem", background: "rgba(0,0,0,0.65)", padding: "6px 10px", borderRadius: "10px" }}>
              {item.title}
            </Html>
          )}

          {/* Visual indicator/halo for interactive galaxies */}
          {hoveredId === item.id && item.title !== "Contact" && (
            <mesh>
              <sphereGeometry args={[item.scale * 9, 32, 32]} />
              <meshBasicMaterial
                color="#00ff88"
                wireframe
                transparent
                opacity={0.3}
              />
            </mesh>
          )}
        </group>
      ))}



      {/* Deep space fog */}
      <fog attach="fog" args={["#000000", 100, 2000]} />
    </group>
  );
};

export default UniverseScene;
