import { create } from "zustand";

interface UniverseStore {
  currentScene: "cockpit" | "intro" | "universe";
  audioEnabled: boolean;
  isTraveling: boolean;
  isAnimating: boolean;
  setCurrentScene: (scene: "cockpit" | "intro" | "universe") => void;
  setAudioEnabled: (enabled: boolean) => void;
  setIsTraveling: (traveling: boolean) => void;
  setIsAnimating: (animating: boolean) => void;
}

export const useUniverseStore = create<UniverseStore>((set) => ({
  currentScene: "intro",
  audioEnabled: true,
  isTraveling: false,
  isAnimating: false,

  setCurrentScene: (scene) => set({ currentScene: scene }),
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  setIsTraveling: (traveling) => set({ isTraveling: traveling }),
  setIsAnimating: (animating) => set({ isAnimating: animating }),
}));
