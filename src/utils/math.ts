import type { Vector3 } from "../types";

// Vector utilities
export const addVectors = (a: Vector3, b: Vector3): Vector3 => [
  a[0] + b[0],
  a[1] + b[1],
  a[2] + b[2],
];

export const subtractVectors = (a: Vector3, b: Vector3): Vector3 => [
  a[0] - b[0],
  a[1] - b[1],
  a[2] - b[2],
];

export const multiplyVector = (v: Vector3, scalar: number): Vector3 => [
  v[0] * scalar,
  v[1] * scalar,
  v[2] * scalar,
];

export const distanceVectors = (a: Vector3, b: Vector3): number => {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export const normalizeVector = (v: Vector3): Vector3 => {
  const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  if (length === 0) return [0, 0, 0];
  return [v[0] / length, v[1] / length, v[2] / length];
};

export const lerpVector = (a: Vector3, b: Vector3, t: number): Vector3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

// Easing functions
export const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 + (t - 1) * (2 * (t - 2)) * (2 * (t - 2));
};

export const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const easeInOutExpo = (t: number): number => {
  return t === 0
    ? 0
    : t === 1
      ? 1
      : t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2;
};

// Color utilities
export const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

// Random utilities
export const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const randomVector = (
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  minZ: number,
  maxZ: number
): Vector3 => [
  randomInRange(minX, maxX),
  randomInRange(minY, maxY),
  randomInRange(minZ, maxZ),
];

export const randomPointInSphere = (radius: number): Vector3 => {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = radius * Math.cbrt(Math.random());

  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
};

// Angle utilities
export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const radiansToDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

// Orbit utilities
export const getOrbitalPosition = (
  radius: number,
  angle: number,
  centerPosition: Vector3 = [0, 0, 0]
): Vector3 => {
  return [
    centerPosition[0] + radius * Math.cos(angle),
    centerPosition[1],
    centerPosition[2] + radius * Math.sin(angle),
  ];
};

// Clamp function
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

// Smooth damp function (similar to Unity's Vector3.SmoothDamp)
export const smoothDamp = (
  current: number,
  target: number,
  velocity: { value: number },
  smoothTime: number,
  maxSpeed: number = Infinity,
  deltaTime: number = 0.016
): number => {
  smoothTime = Math.max(0.0001, smoothTime);
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);

  let change = current - target;
  const originalTo = target;

  const maxChange = maxSpeed * smoothTime;
  change = clamp(change, -maxChange, maxChange);
  target = current - change;

  const dt = deltaTime;
  const vtx = velocity.value + omega * change * dt;
  velocity.value = (vtx - omega * (target - current) * dt) * exp;

  let output = target + (change + (target - current - vtx * dt) * dt) * exp;

  if (originalTo - current > 0 === output > originalTo) {
    output = originalTo;
    velocity.value = (output - originalTo) / dt;
  }

  return output;
};

// Format utilities
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};
