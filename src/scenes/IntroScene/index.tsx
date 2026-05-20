import React, { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useUniverseStore } from "../../store";

interface IntroState {
  coreScale: number;
  coreOpacity: number;
  burstProgress: number;
  burstOpacity: number;
  shockwaveProgress: number;
  shockwaveOpacity: number;
  starOpacity: number;
  flash: number;
  shake: number;
}

const createIntroState = (): IntroState => ({
  coreScale: 0.02,
  coreOpacity: 0,
  burstProgress: 0,
  burstOpacity: 0,
  shockwaveProgress: 0,
  shockwaveOpacity: 0,
  starOpacity: 0,
  flash: 0,
  shake: 0,
});

const Singularity = ({ stateRef }: { stateRef: MutableRefObject<IntroState> }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.ShaderMaterial>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const intro = stateRef.current;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 18) * 0.08;
    const vibration = intro.shake * 0.18;

    if (coreRef.current) {
      coreRef.current.scale.setScalar(intro.coreScale * pulse);
      coreRef.current.position.set(
        Math.sin(state.clock.elapsedTime * 42) * vibration,
        Math.cos(state.clock.elapsedTime * 37) * vibration,
        0
      );
      const material = coreRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = intro.coreOpacity;
    }

    if (haloRef.current) {
      haloRef.current.scale.setScalar(intro.coreScale * 4.8);
      const material = haloRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = intro.coreOpacity * 0.24;
    }

    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(intro.coreScale * (7 + Math.sin(state.clock.elapsedTime * 10) * 0.8));
      const material = pulseRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = intro.coreOpacity * 0.1;
    }

    if (innerGlowRef.current) {
      innerGlowRef.current.scale.setScalar(intro.coreScale * 2.5);
      const material = innerGlowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = intro.coreOpacity * 0.42;
    }

    if (glowRef.current) {
      const targetIntensity = intro.coreOpacity * 2.5;
      glowRef.current.uniforms.uIntensity.value += (targetIntensity - glowRef.current.uniforms.uIntensity.value) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={haloRef}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshBasicMaterial color="#8cc8ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshBasicMaterial color="#ffcf7a" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 64, 40]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh scale={1.5}>
        <sphereGeometry args={[1, 48, 32]} />
        <shaderMaterial
          ref={glowRef}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uIntensity;
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 3.0);
              float distFromCenter = length(vPosition);
              float radialGlow = 1.0 - smoothstep(0.0, 1.0, distFromCenter);
              vec3 color = mix(vec3(0.95, 0.85, 0.5), vec3(0.5, 0.8, 1.0), radialGlow);
              gl_FragColor = vec4(color, fresnel * uIntensity * 0.5);
            }
          `}
          uniforms={{
            uIntensity: { value: 0 },
          }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const Shockwave = ({ stateRef }: { stateRef: MutableRefObject<IntroState> }) => {
  const ringsRef = useRef<THREE.Group>(null);
  const shockwaveColors = ["#ffffff", "#8cc8ff", "#ffcf7a", "#ff6b9d", "#a855f7"];

  useFrame((state) => {
    const intro = stateRef.current;
    if (!ringsRef.current) return;

    ringsRef.current.children.forEach((child, index) => {
      const ring = child as THREE.Mesh;
      const offsetProgress = THREE.MathUtils.clamp(intro.shockwaveProgress - index * 0.08, 0, 1);
      const scale = 0.8 + offsetProgress * (60 + index * 20);
      ring.scale.set(scale, scale, scale);
      ring.rotation.z += state.clock.getDelta() * (0.12 + index * 0.04);

      const material = ring.material as THREE.MeshBasicMaterial;
      const falloff = 1 - Math.pow(offsetProgress, 1.5);
      material.opacity = intro.shockwaveOpacity * falloff * (0.5 - index * 0.06);
    });
  });

  return (
    <group ref={ringsRef} rotation={[Math.PI * 0.5, 0, 0]}>
      {[0, 1, 2, 3, 4].map((index) => (
        <mesh key={index}>
          <torusGeometry args={[1, 0.015 + index * 0.005, 16, 200]} />
          <meshBasicMaterial color={shockwaveColors[index]} transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
};

const BigBangParticles = ({ stateRef }: { stateRef: MutableRefObject<IntroState> }) => {
  const count = 12000;
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const directions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    const colorA = new THREE.Color("#ffffff");
    const colorB = new THREE.Color("#8cc8ff");
    const colorC = new THREE.Color("#ffcf7a");
    const colorD = new THREE.Color("#ff6b9d");
    const colorE = new THREE.Color("#a855f7");

    for (let i = 0; i < count; i += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const direction = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      ).normalize();

      directions[i * 3] = direction.x;
      directions[i * 3 + 1] = direction.y;
      directions[i * 3 + 2] = direction.z;
      speeds[i] = 0.25 + Math.random() * 1.8;
      sizes[i] = 0.5 + Math.random() * 1.5;

      const colorChoice = Math.random();
      let tint;
      if (colorChoice < 0.3) tint = colorA.clone().lerp(colorB, Math.random() * 0.9);
      else if (colorChoice < 0.5) tint = colorA.clone().lerp(colorC, Math.random() * 0.9);
      else if (colorChoice < 0.7) tint = colorA.clone().lerp(colorD, Math.random() * 0.9);
      else tint = colorA.clone().lerp(colorE, Math.random() * 0.9);

      colors[i * 3] = tint.r;
      colors[i * 3 + 1] = tint.g;
      colors[i * 3 + 2] = tint.b;
    }

    return { positions, colors, directions, speeds, sizes };
  }, []);

  useFrame((state) => {
    const intro = stateRef.current;
    if (!pointsRef.current || !materialRef.current) return;

    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const positions = positionAttribute.array as Float32Array;
    const easedProgress = Math.pow(intro.burstProgress, 1.3);
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i += 1) {
      const directionX = particleData.directions[i * 3];
      const directionY = particleData.directions[i * 3 + 1];
      const directionZ = particleData.directions[i * 3 + 2];
      const distance = easedProgress * 220 * particleData.speeds[i];
      const swirl = Math.sin(time * 3.5 + i * 0.012) * intro.burstProgress * 4.2;
      const verticalWave = Math.sin(time * 2.8 + i * 0.008) * intro.burstProgress * 1.8;

      positions[i * 3] = directionX * distance + directionY * swirl;
      positions[i * 3 + 1] = directionY * distance - directionX * swirl + verticalWave;
      positions[i * 3 + 2] = directionZ * distance * 0.65;
    }

    materialRef.current.opacity = intro.burstOpacity;
    materialRef.current.size = 0.15 + intro.burstProgress * 0.55;
    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particleData.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particleData.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.2}
        vertexColors
        transparent
        opacity={0}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const NewbornStars = ({ stateRef }: { stateRef: MutableRefObject<IntroState> }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const count = 2400;

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 30 + Math.random() * 210;
      const angle = Math.random() * Math.PI * 2;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = (Math.random() - 0.5) * 120;
      values[i * 3 + 2] = Math.sin(angle) * radius - 80 - Math.random() * 160;
    }
    return values;
  }, []);

  useFrame((_, delta) => {
    const intro = stateRef.current;
    if (!pointsRef.current || !materialRef.current) return;
    pointsRef.current.rotation.z += delta * 0.006;
    pointsRef.current.rotation.y += delta * 0.01;
    materialRef.current.opacity = intro.starOpacity;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.35}
        color="#dff0ff"
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const FlashBurst = ({ stateRef }: { stateRef: MutableRefObject<IntroState> }) => {
  const flashRef = useRef<THREE.Mesh>(null);
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const intro = stateRef.current;
    const burstPhase = THREE.MathUtils.clamp((intro.burstProgress - 0.1) / 0.3, 0, 1);

    if (flashRef.current) {
      const flashScale = burstPhase * 15;
      flashRef.current.scale.setScalar(flashScale);
      const material = flashRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = intro.burstOpacity * (1 - burstPhase) * 0.8;
    }

    if (raysRef.current) {
      raysRef.current.children.forEach((child, index) => {
        const ray = child as THREE.Mesh;
        const rayProgress = THREE.MathUtils.clamp(burstPhase - index * 0.05, 0, 1);
        ray.scale.setScalar(1 + rayProgress * 25);
        ray.rotation.z += state.clock.getDelta() * (0.5 + index * 0.2);
        const material = ray.material as THREE.MeshBasicMaterial;
        material.opacity = intro.burstOpacity * (1 - rayProgress) * 0.6;
      });
    }
  });

  return (
    <group>
      <mesh ref={flashRef}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <group ref={raysRef} rotation={[Math.PI * 0.5, 0, 0]}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <mesh key={index} rotation={[0, 0, (index / 8) * Math.PI * 2]}>
            <planeGeometry args={[0.5, 8]} />
            <meshBasicMaterial color="#ffcf7a" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export const IntroScene: React.FC = () => {
  const { camera, scene } = useThree();
  const { setCurrentScene } = useUniverseStore();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const introStateRef = useRef<IntroState>(createIntroState());
  const baseCameraRef = useRef(new THREE.Vector3(0, 0, 8));

  useEffect(() => {
    const intro = introStateRef.current;
    Object.assign(intro, createIntroState());
    scene.background = new THREE.Color("#000000");
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);
    baseCameraRef.current.set(0, 0, 8);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const flashTarget = { value: 0 };

    timelineRef.current = gsap.timeline({
      defaults: { ease: "power2.out" },
      onUpdate: () => {
        const flash = flashTarget.value;
        scene.background = new THREE.Color(flash * 0.22, flash * 0.25, flash * 0.3);

        const shake = intro.shake;
        camera.position.set(
          baseCameraRef.current.x + gsap.utils.random(-shake, shake),
          baseCameraRef.current.y + gsap.utils.random(-shake, shake),
          baseCameraRef.current.z + gsap.utils.random(-shake * 0.45, shake * 0.45)
        );
        camera.lookAt(0, 0, -20);
      },
      onComplete: () => {
        scene.background = new THREE.Color("#000000");
        window.setTimeout(() => setCurrentScene("universe"), 80);
      },
    });

    timelineRef.current
      .to(intro, { coreOpacity: 1, coreScale: 0.34, duration: 0.9 }, 0.15)
      .to(intro, { coreScale: 0.42, shake: 0.02, duration: 0.6, repeat: 2, yoyo: true, ease: "sine.inOut" }, 0.8)
      .to(intro, { coreScale: 1.1, shake: 0.12, duration: 0.28, ease: "power4.in" }, 2.0)
      .to(flashTarget, { value: 1, duration: 0.08, ease: "power4.out" }, 2.22)
      .to(intro, { burstOpacity: 1, burstProgress: 1, shockwaveOpacity: 1, shockwaveProgress: 1, duration: 2.4, ease: "expo.out" }, 2.22)
      .to(baseCameraRef.current, { z: 185, y: 8, duration: 3.0, ease: "power3.out" }, 2.24)
      .to(intro, { shake: 0.45, duration: 0.18, ease: "power3.out" }, 2.22)
      .to(intro, { shake: 0.02, duration: 1.4, ease: "power3.out" }, 2.42)
      .to(flashTarget, { value: 0, duration: 1.25, ease: "power2.out" }, 2.32)
      .to(intro, { starOpacity: 0.9, duration: 1.5, ease: "sine.out" }, 3.0)
      .to(intro, { coreOpacity: 0, burstOpacity: 0.34, shockwaveOpacity: 0, duration: 1.0 }, 4.15)
      .to(intro, { starOpacity: 0, burstOpacity: 0, duration: 0.7 }, 5.25);

    return () => {
      timelineRef.current?.kill();
    };
  }, [camera, scene, setCurrentScene]);

  return (
    <>
      <Singularity stateRef={introStateRef} />
      <Shockwave stateRef={introStateRef} />
      <FlashBurst stateRef={introStateRef} />
      <BigBangParticles stateRef={introStateRef} />
      <NewbornStars stateRef={introStateRef} />
    </>
  );
};

export default IntroScene;
