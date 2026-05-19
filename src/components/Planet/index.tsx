import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import type { PlanetProps } from "../../types";
import ParticleSystem from "../ParticleSystem";
import TextLabel from "../TextLabel";

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const seededRandom = (seed: number) => {
  let state = seed || 1;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
};

const makePlanetTexture = (name: string, color: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 768;
  canvas.height = 384;

  if (!context) return new THREE.CanvasTexture(canvas);

  const random = seededRandom(hashString(name));
  const base = new THREE.Color(color);
  const dark = base.clone().multiplyScalar(0.28);
  const light = base.clone().lerp(new THREE.Color("#ffffff"), 0.38);

  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, `#${light.clone().lerp(base, 0.35).getHexString()}`);
  gradient.addColorStop(0.5, `#${base.getHexString()}`);
  gradient.addColorStop(1, `#${dark.getHexString()}`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 76; i += 1) {
    const y = random() * canvas.height;
    const x = random() * canvas.width;
    const width = 90 + random() * 360;
    const height = 5 + random() * 26;
    context.globalAlpha = 0.035 + random() * 0.095;
    context.fillStyle = random() > 0.45 ? "#ffffff" : "#030712";
    context.beginPath();
    context.ellipse(x, y, width, height, (random() - 0.5) * 0.16, 0, Math.PI * 2);
    context.fill();
  }

  for (let i = 0; i < 36; i += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const radius = 8 + random() * 34;
    context.globalAlpha = 0.035 + random() * 0.08;
    context.fillStyle = random() > 0.5 ? `#${light.getHexString()}` : `#${dark.getHexString()}`;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  context.globalAlpha = 0.18;
  const shade = context.createRadialGradient(220, 120, 10, 420, 220, 460);
  shade.addColorStop(0, "rgba(255,255,255,0.45)");
  shade.addColorStop(0.42, "rgba(255,255,255,0.02)");
  shade.addColorStop(1, "rgba(0,0,0,0.72)");
  context.fillStyle = shade;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
};

const makeMoonTexture = (color: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 128;
  canvas.height = 128;
  if (!context) return new THREE.CanvasTexture(canvas);

  const base = new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.62);
  context.fillStyle = `#${base.getHexString()}`;
  context.fillRect(0, 0, 128, 128);
  context.globalAlpha = 0.18;
  context.fillStyle = "#111827";
  for (let i = 0; i < 12; i += 1) {
    context.beginPath();
    context.arc(Math.random() * 128, Math.random() * 128, 4 + Math.random() * 12, 0, Math.PI * 2);
    context.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

export const Planet = ({
  config,
  orbitPhase = Math.random() * Math.PI * 2,
  orbitTilt = Math.PI * 0.16,
  isHovered = false,
  isSelected = false,
  onClick,
  onHover,
}: PlanetProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.ShaderMaterial>(null);
  const orbitAngleRef = useRef(orbitPhase);
  const moonAngleRef = useRef(Math.random() * Math.PI * 2);
  const [hoveredLocal, setHoveredLocal] = useState(false);
  const active = hoveredLocal || isHovered || isSelected;
  const visualSize = config.size * 0.42;
  const seed = hashString(config.id);
  const hasRing = seed % 3 === 0 || config.category === "Web App" || config.category === "Social";
  const hasMoon = seed % 2 === 0;
  const texture = useMemo(() => makePlanetTexture(config.name, config.color), [config.color, config.name]);
  const moonTexture = useMemo(() => makeMoonTexture(config.glowColor), [config.glowColor]);
  const cloudColor = useMemo(() => new THREE.Color(config.glowColor).lerp(new THREE.Color("#ffffff"), 0.55), [config.glowColor]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    orbitAngleRef.current += (config.orbitSpeed ?? 0.5) * delta * (active ? 0.34 : 0.13);
    moonAngleRef.current += delta * (0.85 + (seed % 5) * 0.08);

    const radius = config.orbitRadius;
    const angle = orbitAngleRef.current;
    groupRef.current.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * Math.sin(orbitTilt) * 0.26,
      Math.sin(angle) * radius * Math.cos(orbitTilt)
    );

    if (planetRef.current) {
      planetRef.current.rotation.y += (config.rotationSpeed ?? 0.01) * delta * (active ? 88 : 42);
      planetRef.current.rotation.x = 0.12;
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y -= delta * 0.08;
    }

    if (moonRef.current) {
      const moonRadius = visualSize * 2.8;
      moonRef.current.position.set(
        Math.cos(moonAngleRef.current) * moonRadius,
        Math.sin(moonAngleRef.current * 1.4) * visualSize * 0.34,
        Math.sin(moonAngleRef.current) * moonRadius * 0.55
      );
    }

    if (glowRef.current) {
      const target = active ? 1.28 : 0.42;
      glowRef.current.uniforms.uGlowIntensity.value +=
        (target - glowRef.current.uniforms.uGlowIntensity.value) * 0.08;
    }
  });

  const handleHover = (event: ThreeEvent<PointerEvent>, hovered: boolean) => {
    event.stopPropagation();
    setHoveredLocal(hovered);
    onHover?.(hovered ? config.id : null);

    if (hovered) {
      window.audioController?.playHoverSound?.();
    }

    if (planetRef.current) {
      gsap.to(planetRef.current.scale, {
        x: hovered ? 1.12 : 1,
        y: hovered ? 1.12 : 1,
        z: hovered ? 1.12 : 1,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onClick?.();
  };

  return (
    <group ref={groupRef}>
      <group onClick={handleClick} onPointerEnter={(event) => handleHover(event, true)} onPointerLeave={(event) => handleHover(event, false)}>
        <mesh ref={planetRef} castShadow>
          <sphereGeometry args={[visualSize, 64, 40]} />
          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            emissive={config.glowColor}
            emissiveIntensity={active ? 0.18 : 0.05}
            roughness={0.62}
            metalness={0.04}
          />
        </mesh>

        <mesh ref={cloudsRef} scale={1.014}>
          <sphereGeometry args={[visualSize, 48, 30]} />
          <meshStandardMaterial
            color={cloudColor}
            transparent
            opacity={active ? 0.16 : 0.075}
            roughness={1}
            depthWrite={false}
          />
        </mesh>

        <mesh scale={1.2}>
          <sphereGeometry args={[visualSize, 48, 30]} />
          <shaderMaterial
            ref={glowRef}
            vertexShader={`
              varying vec3 vNormal;
              void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform vec3 uGlowColor;
              uniform float uGlowIntensity;
              varying vec3 vNormal;

              void main() {
                float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.6);
                gl_FragColor = vec4(uGlowColor, fresnel * uGlowIntensity * 0.42);
              }
            `}
            uniforms={{
              uGlowColor: { value: new THREE.Color(config.glowColor) },
              uGlowIntensity: { value: 0.42 },
            }}
            transparent
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {hasRing && (
          <group rotation={[Math.PI * 0.58, 0.1, Math.PI * 0.12]}>
            <mesh>
              <ringGeometry args={[visualSize * 1.55, visualSize * 2.28, 96]} />
              <meshBasicMaterial
                color={config.glowColor}
                transparent
                opacity={active ? 0.34 : 0.18}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
            <mesh>
              <ringGeometry args={[visualSize * 2.38, visualSize * 2.48, 96]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={active ? 0.18 : 0.08} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          </group>
        )}

        {hasMoon && (
          <group ref={moonRef}>
            <mesh>
              <sphereGeometry args={[Math.max(visualSize * 0.2, 0.12), 24, 16]} />
              <meshStandardMaterial map={moonTexture} roughness={0.85} emissive={config.glowColor} emissiveIntensity={0.04} />
            </mesh>
          </group>
        )}
      </group>

      {active && (
        <>
          <ParticleSystem count={28} speed={0.9} spread={visualSize * 1.2} lifetime={1.4} size={0.032} color={config.glowColor} />
          <TextLabel text={config.name} position={[0, visualSize + 1.05, 0]} color="#ffffff" fontSize={58} />
          <TextLabel
            text={`${config.level ?? config.category ?? "Node"} | ${config.experience ?? ""}`}
            position={[0, visualSize + 0.28, 0]}
            color={config.glowColor}
            fontSize={34}
          />
        </>
      )}
    </group>
  );
};

export default Planet;
