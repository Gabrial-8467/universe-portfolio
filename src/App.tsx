import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useUniverseStore } from "./store/universe";
import CameraController from "./components/CameraController";
import AudioController from "./components/AudioController";
import IntroScene from "./scenes/IntroScene";
import UniverseScene from "./scenes/UniverseScene";
import CockpitScene from "./scenes/CockpitScene";
import "./App.css";

function DistanceTracker({ onDistanceUpdate, currentScene }: { onDistanceUpdate: (distance: number) => void; currentScene: string }) {
  const prevPosRef = useRef(new THREE.Vector3());
  const initializedRef = useRef(false);

  useFrame((state) => {
    if (currentScene !== "universe") {
      initializedRef.current = false;
      return;
    }

    if (!initializedRef.current) {
      prevPosRef.current.copy(state.camera.position);
      initializedRef.current = true;
      return;
    }

    const currentPos = state.camera.position;
    const distance = currentPos.distanceTo(prevPosRef.current);

    if (distance > 0.001) {
      onDistanceUpdate(distance);
      prevPosRef.current.copy(currentPos);
    }
  });

  return null;
}

function AppContent({ onDistanceUpdate }: { onDistanceUpdate: (distance: number) => void }) {
  const { currentScene, isAnimating } = useUniverseStore();

  return (
    <>
      {currentScene === "universe" && (
        <CameraController enableZoom={!isAnimating} zoomSpeed={10} enableRotate={!isAnimating} rotateSpeed={0.5} />
      )}
      <AudioController />
      <DistanceTracker onDistanceUpdate={onDistanceUpdate} currentScene={currentScene} />
      {currentScene !== "cockpit" && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.62} luminanceSmoothing={0.9} intensity={1.05} levels={6} mipmapBlur />
          <ChromaticAberration offset={[0.00018, 0.00012]} />
          <Noise opacity={0.002} />
          <Vignette darkness={0.48} eskil={false} />
        </EffectComposer>
      )}

      {currentScene === "intro" && <IntroScene />}
      {currentScene === "universe" && <UniverseScene />}
      {currentScene === "cockpit" && <CockpitScene />}
    </>
  );
}

export default function App() {
  const { currentScene, audioEnabled, setAudioEnabled, setCurrentScene } = useUniverseStore();
  const [showGuidance, setShowGuidance] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [distanceTraveled, setDistanceTraveled] = useState(0);
  const guidanceText = "You can travel in space, but if you want to travel faster into the galaxies, use the spacecraft...";

  const handleDistanceUpdate = (distance: number) => {
    setDistanceTraveled(prev => prev + distance);
  };

  const LY_SCALE = 100;
  const lightYears = (distanceTraveled / LY_SCALE).toFixed(2);

  useEffect(() => {
    const timer = window.setTimeout(() => {
    if (currentScene === 'universe') {
      setShowGuidance(true);
      setDisplayedText('');
      setTypingComplete(false);
      setDistanceTraveled(0);
    } else {
      setShowGuidance(false);
      setDistanceTraveled(0);
    }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [currentScene]);

  useEffect(() => {
    if (!showGuidance) return;

    if (displayedText.length < guidanceText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(guidanceText.substring(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = window.setTimeout(() => setTypingComplete(true), 0);
      return () => window.clearTimeout(timer);
    }
  }, [displayedText, showGuidance]);

  return (
    <>
      <div className={`app-container scene-${currentScene}`}>
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
          <AppContent onDistanceUpdate={handleDistanceUpdate} />
        </Canvas>

        {currentScene !== "cockpit" && <div className="ui-overlay">
          <div className="mission-readout">
            <div className="readout-kicker">
              <span>{currentScene === "intro" ? "Genesis sequence" : "Infinite starfield"}</span>
              <i />
            </div>
            <strong>Gabrial's Portfolio</strong>
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

          {/* Distance Traveled Display */}
          {currentScene === 'universe' && (
            <div className="distance-readout">
              <div className="readout-kicker">
                <span>DISTANCE TRAVELED</span>
                <i />
              </div>
              <strong>{lightYears.toLocaleString()} LY</strong>
              <p style={{ fontSize: '12px', color: 'rgba(186, 222, 255, 0.7)', margin: '5px 0 0 0' }}>Light Years</p>
            </div>
          )}
        </div>}

        {/* Fixed Screen Center Crosshair */}
        {currentScene === "universe" && <div
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
        </div>}

        {/* Fixed Spacecraft in bottom right corner - Universe Scene only */}
        {currentScene === 'universe' && (
          <button
            type="button"
            onClick={() => {
              setShowGuidance(false);
              setCurrentScene("cockpit");
            }}
            aria-label="Enter spacecraft cockpit"
            className="spacecraft-entry"
          >
            <img src="/images/spacecraft.png" alt="Spacecraft" />
          </button>
        )}

        {currentScene === "cockpit" && (
          <button
            type="button"
            className="cockpit-exit"
            onClick={() => setCurrentScene("universe")}
            aria-label="Exit cockpit"
          >
            EXIT COCKPIT
          </button>
        )}

        {/* Universe Scene Guidance Text */}
        {showGuidance && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, calc(-50% + 100px))',
              textAlign: 'center',
              pointerEvents: 'auto',
              zIndex: 999,
              maxWidth: '700px',
              padding: '20px',
            }}
          >
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                border: '2px solid #00ff88',
                borderRadius: '10px',
                padding: '20px 30px',
                position: 'relative',
                boxShadow: '0 0 30px rgba(0, 255, 136, 0.3)',
              }}
            >
              <p
                style={{
                  fontSize: '18px',
                  color: '#00ff88',
                  textShadow: '0 0 20px rgba(0, 255, 136, 0.6), 0 0 40px rgba(0, 255, 136, 0.3)',
                  margin: 0,
                  fontWeight: '600',
                  letterSpacing: '1px',
                  lineHeight: '1.8',
                  minHeight: '70px',
                }}
              >
                {displayedText}
                {!typingComplete && <span style={{ animation: 'blink 0.7s infinite' }}>|</span>}
              </p>

              {typingComplete && (
                <button
                  onClick={() => setShowGuidance(false)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: '2px solid #ff6b9d',
                    color: '#ff6b9d',
                    fontSize: '20px',
                    cursor: 'pointer',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    padding: 0,
                    animation: 'fadeInButton 0.5s ease-in',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ff6b9d';
                    e.currentTarget.style.color = '#000';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 107, 157, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = '#ff6b9d';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        <style>{`
        @keyframes fadeInText {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInButton {
          0% {
            opacity: 0;
            scale: 0.8;
          }
          100% {
            opacity: 1;
            scale: 1;
          }
        }

        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }
      `}</style>
      </div>
    </>
  );
}
