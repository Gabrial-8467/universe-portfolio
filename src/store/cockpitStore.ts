import { create } from "zustand";
import type { CockpitPhase } from "../scenes/CockpitScene/types";

const STORAGE_KEY = "commanderName";

const readCommanderName = () => {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY)?.trim() ?? "";
};

const storedCommanderName = readCommanderName();

interface CockpitState {
  commanderName: string;
  isReturningCommander: boolean;
  phase: CockpitPhase;
  setCommanderName: (name: string) => void;
  completeBoot: () => void;
}

export const useCockpitStore = create<CockpitState>((set) => ({
  commanderName: storedCommanderName,
  isReturningCommander: Boolean(storedCommanderName),
  phase: storedCommanderName ? "booting" : "registration",

  setCommanderName: (name) => {
    const commanderName = name.trim();
    if (!commanderName) return;

    window.localStorage.setItem(STORAGE_KEY, commanderName);
    set({
      commanderName,
      isReturningCommander: false,
      phase: "booting",
    });
  },

  completeBoot: () => set({ phase: "online" }),
}));
