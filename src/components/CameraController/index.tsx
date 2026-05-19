import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useUniverseStore } from "../../store";

interface CameraControllerProps {
  enableDamping?: boolean;
  dampingFactor?: number;
  enableZoom?: boolean;
  zoomSpeed?: number;
  enableRotate?: boolean;
  rotateSpeed?: number;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  enableDamping = true,
  dampingFactor = 0.05,
  enableZoom = true,
  zoomSpeed = 10,
  enableRotate = true,
  rotateSpeed = 0.5,
}) => {
  const { camera } = useThree();
  const { cameraState, setCameraState } = useUniverseStore();
  const isTransitioningRef = useRef(false);
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const dragStateRef = useRef({ active: false, x: 0, y: 0 });

  useFrame(() => {
    // Update camera based on state
    if (cameraState.isTransitioning && !isTransitioningRef.current) {
      isTransitioningRef.current = true;

      // Kill any existing transition
      if (transitionTimelineRef.current) {
        transitionTimelineRef.current.kill();
      }

      const startPos = new THREE.Vector3(
        camera.position.x,
        camera.position.y,
        camera.position.z
      );

      const endPos = new THREE.Vector3(
        cameraState.position[0],
        cameraState.position[1],
        cameraState.position[2]
      );

      transitionTimelineRef.current = gsap.timeline({
        onComplete: () => {
          setCameraState({ isTransitioning: false });
          isTransitioningRef.current = false;
        },
      });

      transitionTimelineRef.current.to(
        {},
        {
          duration: cameraState.transitionDuration,
          ease: "power2.inOut",
          onUpdate: function () {
            const progress = this.progress();

            camera.position.lerpVectors(startPos, endPos, progress);
            camera.lookAt(
              cameraState.target[0],
              cameraState.target[1],
              cameraState.target[2]
            );
          },
        }
      );
    }

    // Smooth damping on camera position when not transitioning
    if (!cameraState.isTransitioning) {
      const targetX = cameraState.position[0];
      const targetY = cameraState.position[1];
      const targetZ = cameraState.position[2];

      if (enableDamping) {
        camera.position.x += (targetX - camera.position.x) * dampingFactor;
        camera.position.y += (targetY - camera.position.y) * dampingFactor;
        camera.position.z += (targetZ - camera.position.z) * dampingFactor;
      } else {
        camera.position.set(targetX, targetY, targetZ);
      }

      camera.lookAt(cameraState.target[0], cameraState.target[1], cameraState.target[2]);
    }
  });

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const moveDistance = 5;

      switch (e.key.toLowerCase()) {
        case "w":
          setCameraState({
            position: [
              cameraState.position[0],
              cameraState.position[1],
              cameraState.position[2] - moveDistance,
            ],
          });
          break;
        case "s":
          setCameraState({
            position: [
              cameraState.position[0],
              cameraState.position[1],
              cameraState.position[2] + moveDistance,
            ],
          });
          break;
        case "a":
          setCameraState({
            position: [
              cameraState.position[0] - moveDistance,
              cameraState.position[1],
              cameraState.position[2],
            ],
          });
          break;
        case "d":
          setCameraState({
            position: [
              cameraState.position[0] + moveDistance,
              cameraState.position[1],
              cameraState.position[2],
            ],
          });
          break;
        case "q":
          setCameraState({
            position: [
              cameraState.position[0],
              cameraState.position[1] - moveDistance,
              cameraState.position[2],
            ],
          });
          break;
        case "e":
          setCameraState({
            position: [
              cameraState.position[0],
              cameraState.position[1] + moveDistance,
              cameraState.position[2],
            ],
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cameraState, setCameraState]);

  // Mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!enableZoom) return;

      e.preventDefault();

      const direction = new THREE.Vector3(
        cameraState.position[0],
        cameraState.position[1],
        cameraState.position[2]
      ).normalize();

      const zoomAmount = e.deltaY > 0 ? zoomSpeed : -zoomSpeed;

      setCameraState({
        position: [
          cameraState.position[0] + direction.x * zoomAmount,
          cameraState.position[1] + direction.y * zoomAmount,
          cameraState.position[2] + direction.z * zoomAmount,
        ],
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [cameraState, enableZoom, setCameraState, zoomSpeed]);

  useEffect(() => {
    if (!enableRotate) return;

    const handlePointerDown = (event: PointerEvent) => {
      dragStateRef.current = { active: true, x: event.clientX, y: event.clientY };
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragStateRef.current.active || cameraState.isTransitioning) return;

      const dx = event.clientX - dragStateRef.current.x;
      const dy = event.clientY - dragStateRef.current.y;
      dragStateRef.current = { active: true, x: event.clientX, y: event.clientY };

      const cameraPosition = new THREE.Vector3(
        cameraState.position[0],
        cameraState.position[1],
        cameraState.position[2]
      );
      const currentTarget = new THREE.Vector3(
        cameraState.target[0],
        cameraState.target[1],
        cameraState.target[2]
      );
      const direction = currentTarget.sub(cameraPosition);
      const distance = Math.max(direction.length(), 1);
      const spherical = new THREE.Spherical().setFromVector3(direction);

      spherical.theta -= dx * rotateSpeed * 0.004;
      spherical.phi = THREE.MathUtils.clamp(
        spherical.phi - dy * rotateSpeed * 0.004,
        0.16,
        Math.PI - 0.16
      );

      const nextTarget = new THREE.Vector3().setFromSpherical(spherical).setLength(distance).add(cameraPosition);

      setCameraState({
        target: [nextTarget.x, nextTarget.y, nextTarget.z],
      });
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
  }, [cameraState, enableRotate, rotateSpeed, setCameraState]);

  return null;
};

export default CameraController;
