// Vector and Math Types
export type Vector3 = [number, number, number];
export type Vector2 = [number, number];
export type Color = string | number;

// Galaxy Types
export interface PlanetConfig {
  id: string;
  name: string;
  orbitRadius: number;
  size: number;
  color: string;
  texture?: string;
  glowColor: string;
  level?: string;
  experience?: string;
  category?: string;
  description?: string;
  icon?: string;
  rotationSpeed?: number;
  orbitSpeed?: number;
}

export interface GalaxyConfig {
  id: string;
  name: string;
  color: string;
  fogColor: string;
  position: Vector3;
  planets: PlanetConfig[];
  nebulaType: "red" | "blue" | "purple" | "golden" | "nebula";
  particleType: "embers" | "stars" | "dust" | "energy";
  musicTheme: "intense" | "calm" | "mysterious" | "epic";
  scale?: number;
  rotationSpeed?: number;
  description?: string;
}

export interface PortfolioData {
  galaxies: GalaxyConfig[];
  about?: {
    name: string;
    title: string;
    bio: string;
    email: string;
    social?: Record<string, string>;
  };
}

// Store Types
export interface UniverseStore {
  selectedGalaxy: string | null;
  selectedPlanet: string | null;
  currentScene: "intro" | "universe" | "galaxy" | "planet";
  cameraState: CameraState;
  hoverState: HoverState;
  audioEnabled: boolean;
  transitionState: TransitionState;

  setSelectedGalaxy: (id: string | null) => void;
  setSelectedPlanet: (id: string | null) => void;
  setCurrentScene: (scene: UniverseStore["currentScene"]) => void;
  setCameraState: (state: Partial<CameraState>) => void;
  setHoverState: (state: Partial<HoverState>) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setTransitionState: (state: Partial<TransitionState>) => void;
  reset: () => void;
}

export interface CameraState {
  position: Vector3;
  target: Vector3;
  distance: number;
  isTransitioning: boolean;
  transitionDuration: number;
}

export interface HoverState {
  hoveredGalaxy: string | null;
  hoveredPlanet: string | null;
  hoveredUI: string | null;
}

export interface TransitionState {
  isActive: boolean;
  type: "zoom" | "warp" | "drift";
  progress: number;
  source: Vector3;
  destination: Vector3;
  duration: number;
}

// Component Props
export interface GalaxyProps {
  config: GalaxyConfig;
  onPlanetClick?: (planetId: string) => void;
  onPlanetHover?: (planetId: string | null) => void;
  onGalaxyClick?: () => void;
}

export interface PlanetProps {
  config: PlanetConfig;
  orbitPhase?: number;
  orbitTilt?: number;
  isHovered?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  onHover?: (planetId: string | null) => void;
}

export interface CameraControllerProps {
  enableDamping?: boolean;
  dampingFactor?: number;
  enableZoom?: boolean;
  zoomSpeed?: number;
  enableRotate?: boolean;
  rotateSpeed?: number;
}

// Particle System Types
export interface ParticleSystemConfig {
  count: number;
  speed: number;
  spread: number;
  lifetime: number;
  size: number;
  color: Color;
  emissionRate: number;
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
  repeat?: number;
  yoyo?: boolean;
}

export interface BigBangConfig {
  particleCount: number;
  explosionForce: number;
  duration: number;
  shockwaveIntensity: number;
}

// UI/Panel Types
export interface HologramPanelData {
  title: string;
  content: string;
  stats?: Record<string, string>;
  icon?: string;
}

// Audio Types
export interface AudioConfig {
  theme: "intense" | "calm" | "mysterious" | "epic";
  volume: number;
  loop?: boolean;
}

// Scene Types
export type SceneType = "intro" | "universe" | "galaxy" | "planet";

export interface SceneConfig {
  type: SceneType;
  data?: any;
  transitionDuration?: number;
}
