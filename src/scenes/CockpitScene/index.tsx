import { useCallback, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useCockpitStore } from "../../store/cockpitStore";
import CockpitInterior from "./CockpitInterior";
import CommanderPanel from "./CommanderPanel";
import NovaBoot from "./NovaBoot";
import NovaPanel from "./NovaPanel";

const CockpitScene = () => {
  const { camera } = useThree();
  const phase = useCockpitStore((state) => state.phase);
  const completeBoot = useCockpitStore((state) => state.completeBoot);
  const [activation, setActivation] = useState(0.12);

  useEffect(() => {
    camera.position.set(0, 1.55, 2.35);
    camera.lookAt(0, 1.25, -2.15);
  }, [camera]);

  const updateBootProgress = useCallback((progress: number) => {
    setActivation(0.18 + progress * 0.011);
  }, []);

  const finishBoot = useCallback(() => {
    setActivation(1.65);
    completeBoot();
  }, [completeBoot]);

  return (
    <>
      <color attach="background" args={["#03070c"]} />
      <fog attach="fog" args={["#071018", 24, 120]} />
      <CockpitInterior activation={activation} />
      {phase === "registration" && <CommanderPanel />}
      {phase === "booting" && <NovaBoot onComplete={finishBoot} onProgress={updateBootProgress} />}
      {phase === "online" && <NovaPanel />}
    </>
  );
};

export default CockpitScene;
