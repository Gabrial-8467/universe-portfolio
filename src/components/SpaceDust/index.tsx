import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface SpaceDustProps {
  count?: number;
  radius?: number;
  opacity?: number;
}

export const SpaceDust = ({ count = 900, radius = 360, opacity = 0.18 }: SpaceDustProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();
  const halfRadius = radius / 2;

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const blue = new THREE.Color("#4da3ff");
    const violet = new THREE.Color("#b993ff");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * radius * 0.72;
      positions[i * 3 + 2] = (Math.random() - 0.5) * radius;

      sizes[i] = 2.5 + Math.random() * 10;

      const color = blue.clone().lerp(Math.random() > 0.45 ? violet : white, Math.random() * 0.55);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, sizes, colors };
  }, [count, radius]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.position.copy(camera.position);
    pointsRef.current.rotation.y += delta * 0.006;
    pointsRef.current.rotation.x += delta * 0.002;

    const positionAttribute = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const values = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i += 1) {
      values[i * 3 + 2] += delta * 2.8;
      values[i * 3] += Math.sin(delta + i) * 0.004;

      if (values[i * 3 + 2] > halfRadius) {
        values[i * 3 + 2] -= radius;
        values[i * 3] = (Math.random() - 0.5) * radius;
        values[i * 3 + 1] = (Math.random() - 0.5) * radius * 0.72;
      }
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uOpacity.value = opacity;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={`
          attribute float aSize;
          attribute vec3 aColor;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vColor = aColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float distanceFade = smoothstep(460.0, 30.0, length(mvPosition.xyz));
            vAlpha = distanceFade;
            gl_PointSize = aSize * clamp(180.0 / max(1.0, -mvPosition.z), 0.2, 2.5);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform float uOpacity;
          uniform float uTime;
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float softness = smoothstep(0.5, 0.0, d);
            float pulse = 0.72 + sin(uTime * 0.6 + vColor.r * 8.0) * 0.18;
            float alpha = softness * uOpacity * vAlpha * pulse;
            if (alpha < 0.004) discard;
            gl_FragColor = vec4(vColor, alpha);
          }
        `}
        uniforms={{
          uOpacity: { value: opacity },
          uTime: { value: 0 },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default SpaceDust;
