import { create } from "zustand";
import type {
  UniverseStore,
  CameraState,
  HoverState,
  TransitionState,
} from "../types";

const defaultCameraState: CameraState = {
  position: [0, 0, 100],
  target: [0, 0, 0],
  distance: 100,
  isTransitioning: false,
  transitionDuration: 2,
};

const defaultHoverState: HoverState = {
  hoveredGalaxy: null,
  hoveredPlanet: null,
  hoveredUI: null,
};

const defaultTransitionState: TransitionState = {
  isActive: false,
  type: "zoom",
  progress: 0,
  source: [0, 0, 0],
  destination: [0, 0, 0],
  duration: 2,
};

export const useUniverseStore = create<UniverseStore>((set) => ({
  selectedGalaxy: null,
  selectedPlanet: null,
  currentScene: "intro",
  cameraState: defaultCameraState,
  hoverState: defaultHoverState,
  audioEnabled: false,
  transitionState: defaultTransitionState,

  setSelectedGalaxy: (id) =>
    set({ selectedGalaxy: id, selectedPlanet: null }),

  setSelectedPlanet: (id) => set({ selectedPlanet: id }),

  setCurrentScene: (scene) => set({ currentScene: scene }),

  setCameraState: (state) =>
    set((prevState) => ({
      cameraState: { ...prevState.cameraState, ...state },
    })),

  setHoverState: (state) =>
    set((prevState) => ({
      hoverState: { ...prevState.hoverState, ...state },
    })),

  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),

  setTransitionState: (state) =>
    set((prevState) => ({
      transitionState: { ...prevState.transitionState, ...state },
    })),

  reset: () =>
    set({
      selectedGalaxy: null,
      selectedPlanet: null,
      currentScene: "intro",
      cameraState: defaultCameraState,
      hoverState: defaultHoverState,
      audioEnabled: false,
      transitionState: defaultTransitionState,
    }),
}));
