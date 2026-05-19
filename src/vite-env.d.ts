/// <reference types="vite/client" />

interface Window {
  webkitAudioContext?: typeof AudioContext;
  audioController?: {
    unlockAudio?: () => Promise<boolean>;
    playHoverSound?: () => void;
    playClickSound?: () => void;
    playTransitionSound?: () => void;
  };
}
