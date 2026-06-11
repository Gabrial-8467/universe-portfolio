import { create } from "zustand";

interface UniverseStore {
  currentScene: "cockpit" | "intro" | "universe";
  audioEnabled: boolean;
  isTraveling: boolean;
  isAnimating: boolean;
  isTransitioning: boolean;
  isContactOpen: boolean;
  transitionTarget: "cockpit" | "intro" | "universe" | null;
  setCurrentScene: (scene: "cockpit" | "intro" | "universe") => void;
  transitionToScene: (scene: "cockpit" | "intro" | "universe") => void;
  setAudioEnabled: (enabled: boolean) => void;
  setIsTraveling: (traveling: boolean) => void;
  setIsAnimating: (animating: boolean) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  setIsContactOpen: (open: boolean) => void;
  distanceTraveled: number;
  setDistanceTraveled: (distance: number | ((prev: number) => number)) => void;
  travelTargetId: number | null;
  travelLink: string | null;
  setTravelTarget: (id: number | null, link: string | null) => void;
}

export const useUniverseStore = create<UniverseStore>((set) => ({
  currentScene: "intro",
  audioEnabled: true,
  isTraveling: false,
  isAnimating: false,
  isTransitioning: false,
  isContactOpen: false,
  transitionTarget: null,
  distanceTraveled: 0,
  travelTargetId: null,
  travelLink: null,

  setCurrentScene: (scene) => set({ currentScene: scene }),

  transitionToScene: (scene) => {
    set({ isTransitioning: true, transitionTarget: scene });
    
    // First timeout to change the scene when the overlay is fully opaque
    setTimeout(() => {
      set({ currentScene: scene });
      
      // Second timeout to fade out the overlay after the scene has changed
      setTimeout(() => {
        set({ isTransitioning: false, transitionTarget: null });
      }, 600);
    }, 500);
  },

  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  setIsTraveling: (isTraveling) => set({ isTraveling }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  setIsContactOpen: (isContactOpen) => set({ isContactOpen }),
  setDistanceTraveled: (distance) => set((state) => ({
    distanceTraveled: typeof distance === "function" ? distance(state.distanceTraveled) : distance
  })),
  setTravelTarget: (id, link) => set({ travelTargetId: id, travelLink: link }),
}));
