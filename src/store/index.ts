import { create } from "zustand";

interface UniverseStore {
  currentScene: "intro" | "universe";
  audioEnabled: boolean;
  setCurrentScene: (scene: "intro" | "universe") => void;
  setAudioEnabled: (enabled: boolean) => void;
}

export const useUniverseStore = create<UniverseStore>((set) => ({
  currentScene: "intro",
  audioEnabled: false,

  setCurrentScene: (scene) => set({ currentScene: scene }),
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
}));
