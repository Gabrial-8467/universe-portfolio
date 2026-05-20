import React, { useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  enableZoom?: boolean;
  zoomSpeed?: number;
  enableRotate?: boolean;
  rotateSpeed?: number;
}

const directionLabelForKeys = (keys: Record<string, boolean>) => {
  const labels = [];
  if (keys.w) labels.push("Forward");
  if (keys.s) labels.push("Backward");
  if (keys.a) labels.push("Left");
  if (keys.d) labels.push("Right");
  if (keys.q) labels.push("Up");
  if (keys.e) labels.push("Down");
  return labels.length > 0 ? labels.join(" + ") : "Idle";
};

export const CameraController: React.FC<CameraControllerProps> = ({
  enableZoom = true,
  zoomSpeed = 10,
  enableRotate = true,
  rotateSpeed = 0.5,
}) => {
  const { camera } = useThree();
  const dragStateRef = useRef({ active: false, x: 0, y: 0 });
  const keysRef = useRef<Record<string, boolean>>({});
  const [directionLabel, setDirectionLabel] = useState("Idle");

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!enableZoom) return;
      e.preventDefault();

      const zoomAmount = e.deltaY > 0 ? zoomSpeed : -zoomSpeed;
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      camera.position.add(direction.multiplyScalar(zoomAmount));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [camera, enableZoom, zoomSpeed]);

  useEffect(() => {
    const setKey = (event: KeyboardEvent, value: boolean) => {
      const key = event.key.toLowerCase();
      if (!["w", "a", "s", "d", "q", "e"].includes(key)) return;
      event.preventDefault();
      keysRef.current[key] = value;
      setDirectionLabel(directionLabelForKeys(keysRef.current));
    };

    const handleKeyDown = (event: KeyboardEvent) => setKey(event, true);
    const handleKeyUp = (event: KeyboardEvent) => setKey(event, false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!enableRotate) return;

    const handlePointerDown = (event: PointerEvent) => {
      dragStateRef.current = { active: true, x: event.clientX, y: event.clientY };
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragStateRef.current.active) return;

      const dx = event.clientX - dragStateRef.current.x;
      const dy = event.clientY - dragStateRef.current.y;
      dragStateRef.current = { active: true, x: event.clientX, y: event.clientY };

      const rotation = camera.rotation;
      rotation.order = "YXZ";
      rotation.y -= dx * rotateSpeed * 0.004;
      rotation.x -= dy * rotateSpeed * 0.004;
      rotation.x = THREE.MathUtils.clamp(rotation.x, -Math.PI / 2 + 0.1, Math.PI / 2 - 0.1);

      camera.rotation.copy(rotation);
    };

    const handlePointerUp = () => {
      dragStateRef.current.active = false;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [camera, enableRotate, rotateSpeed]);

  useFrame((_, delta) => {
    const keys = keysRef.current;
    if (!keys.w && !keys.a && !keys.s && !keys.d && !keys.q && !keys.e) return;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.normalize();

    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
    const up = camera.up.clone().normalize();
    const movement = new THREE.Vector3();

    if (keys.w) movement.add(forward);
    if (keys.s) movement.add(forward.clone().negate());
    if (keys.a) movement.add(right.clone().negate());
    if (keys.d) movement.add(right);
    if (keys.q) movement.add(up);
    if (keys.e) movement.add(up.clone().negate());

    if (movement.lengthSq() > 0) {
      movement.normalize();
      camera.position.addScaledVector(movement, Math.max(20, zoomSpeed * 6) * delta);
    }
  });

  return null;
};

export default CameraController;
