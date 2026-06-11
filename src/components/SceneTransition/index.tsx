import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useUniverseStore } from "../../store/universe";

const SceneTransition: React.FC = () => {
  const isTransitioning = useUniverseStore((state) => state.isTransitioning);
  const transitionTarget = useUniverseStore((state) => state.transitionTarget);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTransitioning) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.2 }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
      gsap.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3
      });
    }
  }, [isTransitioning]);

  const getTransitionText = () => {
    switch (transitionTarget) {
      case "cockpit": return "ENTERING SPACECRAFT...";
      case "universe": return "EXITING SPACECRAFT...";
      case "intro": return "RESETTING SEQUENCE...";
      default: return "SYNCING NEURAL LINK...";
    }
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        zIndex: 9999,
        pointerEvents: isTransitioning ? "all" : "none",
        opacity: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      {/* Scanlines Effect */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
        pointerEvents: "none",
        opacity: 0.3
      }} />

      <div 
        ref={textRef}
        style={{
          color: "#00ff88",
          fontFamily: "'Consolas', monospace",
          fontSize: "14px",
          letterSpacing: "4px",
          textShadow: "0 0 10px rgba(0, 255, 136, 0.5)",
          textAlign: "center"
        }}
      >
        <div style={{ marginBottom: "10px", fontSize: "10px", opacity: 0.7 }}>SYSTEM STATUS: SYNCING</div>
        <div>{getTransitionText()}</div>
        <div style={{ marginTop: "20px", display: "flex", gap: "5px", justifyContent: "center" }}>
          {[0, 1, 2].map(i => (
            <div 
              key={i}
              style={{
                width: "4px",
                height: "4px",
                backgroundColor: "#00ff88",
                animation: `pulse 1s infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default SceneTransition;
