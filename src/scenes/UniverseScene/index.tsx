import React, { useMemo, useState, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Starfield from "../../components/Starfield";
import Galaxy from "../../components/Galaxy";
import Blackhole from "../../components/Blackhole";
import { useUniverseStore } from "../../store/universe";

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
  const { 
    setIsTraveling, 
    setIsAnimating, 
    travelTargetId, 
    travelLink, 
    setTravelTarget 
  } = useUniverseStore();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const LY_SCALE = 100;

  // Generate portfolio items with fixed positions
  const portfolioItems = useMemo<PortfolioItem[]>(() => {
    const scaleFactor = LY_SCALE;

    // Helper to calculate positions in a hexagon of radius 30 LY.
    // The distance between adjacent points will be exactly 30 LY.
    const getHexPosition = (index: number): [number, number, number] => {
      const angle = (index * Math.PI) / 3; // 60 degrees in radians
      return [
        Math.cos(angle) * 30 * scaleFactor,
        0,
        Math.sin(angle) * 30 * scaleFactor
      ];
    };

    // Calculate a consistent camera arrival offset from the outside looking in
    const getFixedCameraOffset = (pos: [number, number, number]): [number, number, number] => {
      const dir = new THREE.Vector3(...pos).normalize();
      return [dir.x * 1000, 300, dir.z * 1000];
    };

    const blackholePos: [number, number, number] = [
      0,
      0,
      -40 * scaleFactor
    ];

    const items: PortfolioItem[] = [
      {
        id: 1,
        title: "About",
        description: "Learn more about me",
        position: getHexPosition(0),
        rotation: [0, 0, 0],
        scale: 1.2,
        link: "#about",
        cameraOffset: getFixedCameraOffset(getHexPosition(0)),
      },
      {
        id: 2,
        title: "Skills",
        description: "My technical expertise",
        position: getHexPosition(1),
        rotation: [0, -Math.PI / 3, 0],
        scale: 0.9,
        link: "#skills",
        cameraOffset: getFixedCameraOffset(getHexPosition(1)),
      },
      {
        id: 3,
        title: "Education",
        description: "Academic background",
        position: getHexPosition(2),
        rotation: [0, -2 * Math.PI / 3, 0],
        scale: 0.7,
        link: "#education",
        cameraOffset: getFixedCameraOffset(getHexPosition(2)),
      },
      {
        id: 4,
        title: "Experience",
        description: "Professional journey",
        position: getHexPosition(3),
        rotation: [0, Math.PI, 0],
        scale: 0.85,
        link: "#experience",
        cameraOffset: getFixedCameraOffset(getHexPosition(3)),
      },
      {
        id: 5,
        title: "Achievements",
        description: "Notable accomplishments",
        position: getHexPosition(4),
        rotation: [0, 2 * Math.PI / 3, 0],
        scale: 0.75,
        link: "#achievements",
        cameraOffset: getFixedCameraOffset(getHexPosition(4)),
      },
      {
        id: 6,
        title: "Projects",
        description: "Featured work",
        position: getHexPosition(5),
        rotation: [0, Math.PI / 3, 0],
        scale: 0.82,
        link: "#projects",
        cameraOffset: getFixedCameraOffset(getHexPosition(5)),
      },
      {
        id: 7,
        title: "Contact",
        description: "Get in touch",
        position: blackholePos,
        rotation: [0, 0, 0],
        scale: 1.0,
        link: "#contact",
        cameraOffset: [0, 300, -3500],
      }
    ];

    return items;
  }, []);

  const galaxyPositions = useMemo<[number, number, number][]>(
    () => portfolioItems.map((item) => item.position),
    [portfolioItems]
  );
  const cameraZoom = useRef(1);
  const arrivedCameraPos = useRef<THREE.Vector3 | null>(null);
  const shouldResetZoom = useRef(false);

  useEffect(() => {
    camera.position.set(0, 0, 900);
    camera.lookAt(0, 0, 0);
    cameraZoom.current = 1;
    arrivedCameraPos.current = null;
    shouldResetZoom.current = false;
  }, [camera]);

  useEffect(() => {
    if (travelTargetId !== null) {
      setIsTraveling(true);
      setIsAnimating(true);
      cameraZoom.current = 1;
      arrivedCameraPos.current = null;
      shouldResetZoom.current = false;
    }
  }, [travelTargetId, setIsTraveling, setIsAnimating]);

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
          setTravelTarget(null, null);
          arrivedCameraPos.current = desiredCameraPos.clone();
          shouldResetZoom.current = false;
          if (travelLink) {
            window.location.href = travelLink;
          }
        }
      }
      return;
    }

    if (arrivedCameraPos.current) {
      const distFromArrival = perspectiveCamera.position.distanceTo(arrivedCameraPos.current);
      if (distFromArrival > 15) {
        // User has flown/moved away, reset the zoom
        shouldResetZoom.current = true;
        arrivedCameraPos.current = null;
      }
    }

    if (shouldResetZoom.current) {
      if (cameraZoom.current < 1) {
        cameraZoom.current = Math.min(1, cameraZoom.current + delta * 0.4);
        perspectiveCamera.fov = 75 * cameraZoom.current;
        perspectiveCamera.updateProjectionMatrix();
      } else {
        shouldResetZoom.current = false;
      }
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
              raycast={() => null}
            />
          ) : (
            <Galaxy
              position={[0, 0, 0]}
              scale={item.scale}
              rotation={[0, 0, 0]}
              raycast={() => null}
            />
          )}

          {/* Tight, invisible raycast target sphere */}
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              cameraZoom.current = 1;
              setTravelTarget(item.id, item.link);
              setIsTraveling(true);
              setIsAnimating(true);
              arrivedCameraPos.current = null;
              shouldResetZoom.current = false;
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(item.id);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredId(null);
            }}
          >
            <sphereGeometry args={[item.title === "Contact" ? item.scale * 9 : item.scale * 7, 16, 16]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>

          {/* Hover label */}
          {hoveredId === item.id && (
            <Html center style={{ pointerEvents: "none", color: "#ffffff", whiteSpace: "nowrap", fontSize: "1rem", background: "rgba(0,0,0,0.65)", padding: "6px 10px", borderRadius: "10px" }}>
              {item.title}
            </Html>
          )}

          {/* Visual indicator/halo for interactive galaxies */}
          {hoveredId === item.id && item.title !== "Contact" && (
            <mesh raycast={() => null}>
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
