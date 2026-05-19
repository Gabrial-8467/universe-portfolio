import React, { useCallback, useEffect, useRef } from "react";
import { useUniverseStore } from "../../store";

interface AudioControllerProps {
  onToggle?: (enabled: boolean) => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({ onToggle }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioUnlockedRef = useRef(false);
  const { audioEnabled } = useUniverseStore();

  const ensureAudioContext = useCallback(async () => {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return null;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextConstructor();
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    audioUnlockedRef.current = true;
    return audioContextRef.current;
  }, [audioEnabled]);

  useEffect(() => {
    onToggle?.(audioEnabled);
  }, [audioEnabled, onToggle]);

  const unlockAudio = useCallback(async () => {
    const ctx = await ensureAudioContext();
    return Boolean(ctx && ctx.state === "running");
  }, [ensureAudioContext]);

  const playAmbience = useCallback(async (frequency: number, duration: number) => {
    try {
      if (!audioEnabled) return;

      const ctx = audioUnlockedRef.current ? audioContextRef.current : await ensureAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + duration);
      osc.type = "sine";

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.error("Audio playback error:", e);
    }
  }, [audioEnabled, ensureAudioContext]);

  const playHoverSound = () => {
    if (!audioEnabled || !audioUnlockedRef.current) return;
    void playAmbience(800, 0.1);
  };

  const playClickSound = () => {
    if (!audioEnabled || !audioUnlockedRef.current) return;
    void playAmbience(600, 0.2);
  };

  const playTransitionSound = () => {
    if (!audioEnabled || !audioUnlockedRef.current) return;
    void playAmbience(400, 0.5);
  };

  useEffect(() => {
    // Expose audio functions globally for components
    (window as any).audioController = {
      unlockAudio,
      playHoverSound,
      playClickSound,
      playTransitionSound,
    };

    return () => {
      delete (window as any).audioController;
    };
  }, [audioEnabled, playAmbience, unlockAudio]);

  return null;
};

export default AudioController;
