import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useGsapTimeline = (deps: any[] = []) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, deps);

  const createTimeline = (
    paused = true,
    defaults?: gsap.TweenVars
  ): gsap.core.Timeline => {
    timelineRef.current = gsap.timeline({ paused, defaults });
    return timelineRef.current;
  };

  return { timeline: timelineRef.current, createTimeline };
};

export const useHoverGlow = () => {
  const meshRef = useRef<any>(null);

  const startHover = (scale = 1.2, glowIntensity = 1.5) => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.scale, {
      x: scale,
      y: scale,
      z: scale,
      duration: 0.3,
      ease: "back.out",
    });

    gsap.to(meshRef.current.material.userData, {
      glowIntensity,
      duration: 0.3,
    });
  };

  const endHover = () => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.3,
      ease: "back.out",
    });

    gsap.to(meshRef.current.material.userData, {
      glowIntensity: 1,
      duration: 0.3,
    });
  };

  return { meshRef, startHover, endHover };
};

export const useOrbitAnimation = (
  orbitRadius: number,
  orbitSpeed: number,
  initialAngle = 0
) => {
  const meshRef = useRef<any>(null);
  const angleRef = useRef(initialAngle);

  useEffect(() => {
    if (!meshRef.current) return;

    let animationId: number;
    const animate = () => {
      angleRef.current += orbitSpeed * 0.016;

      meshRef.current.position.x = Math.cos(angleRef.current) * orbitRadius;
      meshRef.current.position.z = Math.sin(angleRef.current) * orbitRadius;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [orbitRadius, orbitSpeed]);

  return meshRef;
};

export const useRotationAnimation = (rotationSpeed: number, axis: "x" | "y" | "z" = "y") => {
  const meshRef = useRef<any>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    let animationId: number;
    const animate = () => {
      if (axis === "x") meshRef.current.rotation.x += rotationSpeed * 0.016;
      if (axis === "y") meshRef.current.rotation.y += rotationSpeed * 0.016;
      if (axis === "z") meshRef.current.rotation.z += rotationSpeed * 0.016;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [rotationSpeed, axis]);

  return meshRef;
};

export const useClickZoom = (duration = 1) => {
  const cameraRef = useRef<any>(null);

  const zoomTo = (target: [number, number, number], distance: number) => {
    if (!cameraRef.current) return;

    gsap.to(cameraRef.current.position, {
      x: target[0],
      y: target[1],
      z: target[2] + distance,
      duration,
      ease: "power2.inOut",
    });
  };

  return { cameraRef, zoomTo };
};

export const usePulseAnimation = (intensity = 1.2, duration = 2) => {
  const meshRef = useRef<any>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(
      meshRef.current.scale,
      {
        x: intensity,
        y: intensity,
        z: intensity,
        duration: duration / 2,
        ease: "sine.inOut",
      },
      0
    );
    tl.to(
      meshRef.current.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: duration / 2,
        ease: "sine.inOut",
      }
    );

    return () => {
      tl.kill();
    };
  }, [intensity, duration]);

  return meshRef;
};

export const useFloatAnimation = (range = 0.5, speed = 2) => {
  const meshRef = useRef<any>(null);
  const startYRef = useRef<number>(0);

  useEffect(() => {
    if (!meshRef.current) return;

    startYRef.current = meshRef.current.position.y;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(
      meshRef.current.position,
      {
        y: startYRef.current + range,
        duration: speed / 2,
        ease: "sine.inOut",
      },
      0
    );
    tl.to(
      meshRef.current.position,
      {
        y: startYRef.current,
        duration: speed / 2,
        ease: "sine.inOut",
      }
    );

    return () => {
      tl.kill();
    };
  }, [range, speed]);

  return meshRef;
};
