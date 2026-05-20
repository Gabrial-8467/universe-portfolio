import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useUniverseStore } from "./store";
import CameraController from "./components/CameraController";
import AudioController from "./components/AudioController";
import IntroScene from "./scenes/IntroScene";
import UniverseScene from "./scenes/UniverseScene";
import "./App.css";

function AppContent() {
  const { currentScene } = useUniverseStore();

  return (
    <>
      <CameraController enableZoom zoomSpeed={10} enableRotate rotateSpeed={0.5} />
      <AudioController />
      <EffectComposer>
        <Bloom luminanceThreshold={0.62} luminanceSmoothing={0.9} intensity={1.05} levels={6} mipmapBlur />
        <ChromaticAberration offset={[0.00018, 0.00012]} />
        <Noise opacity={0.002} />
        <Vignette darkness={0.48} eskil={false} />
      </EffectComposer>

      {currentScene === "intro" && <IntroScene />}
      {currentScene === "universe" && <UniverseScene />}
    </>
  );
}

export default function App() {
  const { currentScene, audioEnabled, setAudioEnabled } = useUniverseStore();

  return (
    <div className="app-container">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 5000,
        }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          depth: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.95;
          gl.setClearColor("#000000", 1);
        }}
      >
        <color attach="background" args={["#000000"]} />
        <AppContent />
      </Canvas>

      <div className="ui-overlay">
        <div className="mission-readout">
          <div className="readout-kicker">
            <span>{currentScene === "intro" ? "Genesis sequence" : "Infinite starfield"}</span>
            <i />
          </div>
          <strong>Universe Portfolio</strong>
          <p>
            Drift through an endless field of stars. Use scroll, drag, and flight controls to move through the void.
          </p>
        </div>

        <div className="control-deck">
          <button
            type="button"
            onClick={() => {
              const nextAudioEnabled = !audioEnabled;
              if (nextAudioEnabled) {
                void window.audioController?.unlockAudio?.();
              }
              setAudioEnabled(nextAudioEnabled);
            }}
            aria-label="Toggle audio"
          >
            {audioEnabled ? "Audio on" : "Audio off"}
          </button>
          <span>WASD/QE</span>
          <span>Drag</span>
          <span>Scroll</span>
        </div>
      </div>

      {/* Fixed Screen Center Crosshair */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "20px",
            height: "20px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "-10px",
              width: "20px",
              height: "2px",
              background: "#ffffff",
              transform: "translateY(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "-10px",
              width: "2px",
              height: "20px",
              background: "#ffffff",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
