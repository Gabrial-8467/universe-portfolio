import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import type { NovaBootProps } from "./types";

const BOOT_STEPS = [20, 40, 60, 80, 100];

const NovaBoot = ({ onComplete, onProgress }: NovaBootProps) => {
  const [step, setStep] = useState(0);
  const progress = BOOT_STEPS[step];

  useEffect(() => {
    onProgress(progress);
    const timer = window.setTimeout(() => {
      if (step === BOOT_STEPS.length - 1) onComplete();
      else setStep((current) => current + 1);
    }, 720);

    return () => window.clearTimeout(timer);
  }, [onComplete, onProgress, progress, step]);

  return (
    <group position={[0, 0.9, -1.9]}>
      <pointLight color="#4bc8f5" intensity={5 + progress * 0.08} distance={6} />
      <Html transform center position={[0, 0, 0]} distanceFactor={1.5} className="dashboard-html" zIndexRange={[20, 0]}>
        <section className="dashboard-hologram boot-hologram" aria-live="polite">
          <div className="nova-core-orb"><span /></div>
          <div className="hologram-kicker"><span>NOVA NEURAL LINK</span><i /></div>
          <h1>CONNECTING TO NOVA AI</h1>
          <div className="boot-blocks" aria-label={`${progress}% complete`}>
            {Array.from({ length: 10 }, (_, index) => <i key={index} className={index < progress / 10 ? "active" : ""} />)}
          </div>
          <div className="boot-readout"><strong>{progress}%</strong><span>CORE SYNCHRONIZATION</span></div>
        </section>
      </Html>
    </group>
  );
};

export default NovaBoot;
