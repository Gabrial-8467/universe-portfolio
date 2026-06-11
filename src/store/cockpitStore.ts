import { create } from "zustand";
import type { CockpitPhase } from "../scenes/CockpitScene/types";

const STORAGE_KEY = "commanderName";

const readCommanderName = () => {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY)?.trim() ?? "";
};

const storedCommanderName = readCommanderName();

const defaultBufferMatrix = [0, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0];

interface CockpitState {
  commanderName: string;
  isReturningCommander: boolean;
  phase: CockpitPhase;
  activeDisplay: string | null;
  
  // Ship systems state
  powerShields: number;
  powerEngines: number;
  powerLifeSupport: number;
  reactorOverload: boolean;
  coolantTemp: number;
  coolantVentActive: boolean;
  bufferMatrix: number[];
  diagnosticProgress: number;
  diagnosticStatus: "IDLE" | "RUNNING" | "COMPLETED";
  diagnosticLogs: string[];
  
  setCommanderName: (name: string) => void;
  completeBoot: () => void;
  setActiveDisplay: (display: string | null) => void;
  
  // Ship systems modifiers
  setPowerAllocation: (shields: number, engines: number, lifeSupport: number) => void;
  setReactorOverload: (overload: boolean) => void;
  setCoolantTemp: (temp: number) => void;
  setCoolantVentActive: (active: boolean) => void;
  setBufferMatrix: (matrix: number[]) => void;
  setBufferCell: (index: number, value: number) => void;
  setDiagnosticState: (status: "IDLE" | "RUNNING" | "COMPLETED", progress: number, logs: string[]) => void;
  resetCockpitStore: () => void;
}

export const useCockpitStore = create<CockpitState>((set) => ({
  commanderName: storedCommanderName,
  isReturningCommander: Boolean(storedCommanderName),
  phase: storedCommanderName ? "booting" : "registration",
  activeDisplay: null,
  
  // Default ship systems values
  powerShields: 40,
  powerEngines: 30,
  powerLifeSupport: 30,
  reactorOverload: false,
  coolantTemp: 88,
  coolantVentActive: false,
  bufferMatrix: [...defaultBufferMatrix],
  diagnosticProgress: 0,
  diagnosticStatus: "IDLE",
  diagnosticLogs: [],

  setCommanderName: (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      window.localStorage.removeItem(STORAGE_KEY);
      set({
        commanderName: "",
        isReturningCommander: false,
        phase: "registration",
      });
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, trimmedName);
    set({
      commanderName: trimmedName,
      isReturningCommander: false,
      phase: "booting",
    });
  },

  completeBoot: () => set({ phase: "online" }),
  setActiveDisplay: (display) => set({ activeDisplay: display }),
  
  setPowerAllocation: (shields, engines, lifeSupport) => set({
    powerShields: shields,
    powerEngines: engines,
    powerLifeSupport: lifeSupport
  }),
  
  setReactorOverload: (overload) => set({ reactorOverload: overload }),
  
  setCoolantTemp: (temp) => set({ coolantTemp: temp }),
  
  setCoolantVentActive: (active) => set({ coolantVentActive: active }),
  
  setBufferMatrix: (matrix) => set({ bufferMatrix: matrix }),
  
  setBufferCell: (index, value) => set((state) => {
    const nextMatrix = [...state.bufferMatrix];
    nextMatrix[index] = value;
    return { bufferMatrix: nextMatrix };
  }),
  
  setDiagnosticState: (status, progress, logs) => set({
    diagnosticStatus: status,
    diagnosticProgress: progress,
    diagnosticLogs: logs
  }),
  
  resetCockpitStore: () => set({
    powerShields: 40,
    powerEngines: 30,
    powerLifeSupport: 30,
    reactorOverload: false,
    coolantTemp: 88,
    coolantVentActive: false,
    bufferMatrix: [...defaultBufferMatrix],
    diagnosticProgress: 0,
    diagnosticStatus: "IDLE",
    diagnosticLogs: [],
    phase: "booting"
  })
}));
