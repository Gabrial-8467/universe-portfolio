export type CockpitPhase = "registration" | "booting" | "online";

export interface NovaBootProps {
  onComplete: () => void;
  onProgress: (progress: number) => void;
}
