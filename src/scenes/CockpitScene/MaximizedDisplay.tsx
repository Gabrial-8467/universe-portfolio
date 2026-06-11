import React from "react";
import { useCockpitStore } from "../../store/cockpitStore";
import { useUniverseStore } from "../../store/universe";

const NAV_DESTINATIONS = [
  {
    id: 1,
    name: "G1: ABOUT",
    fullName: "ABOUT - CORE ARCHIVE",
    link: "#about",
    x: 30.00, y: 5.00, z: 0.00,
    range: "30.00 LY",
    type: "GALAXY",
    classification: "SPIRAL GALAXY (CLASS-G1)",
    sector: "SEC ALPHA-01",
    mass: "1.24 × 10¹² M☉",
    dilation: "1.0000000x",
    description: "Primary biography, personal logs, and operations profile."
  },
  {
    id: 2,
    name: "G2: SKILLS",
    fullName: "SKILLS - STACK MATRIX",
    link: "#skills",
    x: 15.00, y: -8.00, z: 25.98,
    range: "30.00 LY",
    type: "GALAXY",
    classification: "LENTICULAR CLUSTER (CLASS-G2)",
    sector: "SEC KRONOS-09",
    mass: "2.10 × 10¹¹ M☉",
    dilation: "1.0000012x",
    description: "Technical competencies, languages, frameworks, and system proficiencies."
  },
  {
    id: 3,
    name: "G3: EDUCATION",
    fullName: "EDUCATION - ACADEMIC LOG",
    link: "#education",
    x: -15.00, y: 12.00, z: 25.98,
    range: "30.00 LY",
    type: "GALAXY",
    classification: "NEBULA FIELD (CLASS-G3)",
    sector: "SEC VORTEX-03",
    mass: "0.85 × 10¹¹ M☉",
    dilation: "1.0000000x",
    description: "Academic history, training courses, and certifications records."
  },
  {
    id: 4,
    name: "G4: EXPERIENCE",
    fullName: "EXPERIENCE - TIMELINE",
    link: "#experience",
    x: -30.00, y: -4.00, z: 0.00,
    range: "30.00 LY",
    type: "GALAXY",
    classification: "BARRED SPIRAL (CLASS-G4)",
    sector: "SEC HELIOS-12",
    mass: "3.40 × 10¹² M☉",
    dilation: "1.0000025c",
    description: "Professional timeline, engineering roles, and enterprise contributions."
  },
  {
    id: 5,
    name: "G5: ACHIEVE",
    fullName: "ACHIEVE - HONORS",
    link: "#achievements",
    x: -15.00, y: 6.00, z: -25.98,
    range: "30.00 LY",
    type: "GALAXY",
    classification: "RING CLUSTER (CLASS-G5)",
    sector: "SEC CYGNUS-07",
    mass: "4.15 × 10¹⁰ M☉",
    dilation: "1.0000000x",
    description: "Recognitions, awards, and notable milestones in career trajectory."
  },
  {
    id: 6,
    name: "G6: PROJECTS",
    fullName: "PROJECTS - SHIPS LOG",
    link: "#projects",
    x: 15.00, y: -10.00, z: -25.98,
    range: "30.00 LY",
    type: "GALAXY",
    classification: "COMPACT IRREGULAR (CLASS-G6)",
    sector: "SEC NOVA-04",
    mass: "1.92 × 10¹² M☉",
    dilation: "1.0000080x",
    description: "Portfolio of custom applications, interactive tools, and live projects."
  },
  {
    id: 7,
    name: "BH: CONTACT BH",
    fullName: "CONTACT - GRAVITY SINGULARITY",
    link: "#contact",
    x: 0.00, y: 0.00, z: -40.00,
    range: "40.00 LY",
    type: "BLACK HOLE",
    classification: "SUPERMASSIVE SINGULARITY (CLASS-BH)",
    sector: "SEC VOID-00",
    mass: "4.82 × 10³⁶ M☉",
    dilation: "∞ (SINGULARITY)",
    description: "Hyper-space communications terminal. Warning: high gravitational compression."
  }
];

const MaximizedDisplay: React.FC = () => {
  const activeDisplay = useCockpitStore((state) => state.activeDisplay);
  const setActiveDisplay = useCockpitStore((state) => state.setActiveDisplay);
  const commanderName = useCockpitStore((state) => state.commanderName);

  const distanceTraveled = useUniverseStore((state) => state.distanceTraveled);
  const setDistanceTraveled = useUniverseStore((state) => state.setDistanceTraveled);
  const audioEnabled = useUniverseStore((state) => state.audioEnabled);
  const setAudioEnabled = useUniverseStore((state) => state.setAudioEnabled);
  const transitionToScene = useUniverseStore((state) => state.transitionToScene);
  const setTravelTarget = useUniverseStore((state) => state.setTravelTarget);

  // Ship systems states from cockpit store
  const powerShields = useCockpitStore((state) => state.powerShields);
  const powerEngines = useCockpitStore((state) => state.powerEngines);
  const powerLifeSupport = useCockpitStore((state) => state.powerLifeSupport);
  const reactorOverload = useCockpitStore((state) => state.reactorOverload);
  const coolantTemp = useCockpitStore((state) => state.coolantTemp);
  const coolantVentActive = useCockpitStore((state) => state.coolantVentActive);
  const bufferMatrix = useCockpitStore((state) => state.bufferMatrix);
  const diagnosticProgress = useCockpitStore((state) => state.diagnosticProgress);
  const diagnosticStatus = useCockpitStore((state) => state.diagnosticStatus);
  const diagnosticLogs = useCockpitStore((state) => state.diagnosticLogs);

  const setPowerAllocation = useCockpitStore((state) => state.setPowerAllocation);
  const setReactorOverload = useCockpitStore((state) => state.setReactorOverload);
  const setCoolantTemp = useCockpitStore((state) => state.setCoolantTemp);
  const setCoolantVentActive = useCockpitStore((state) => state.setCoolantVentActive);
  // const setBufferMatrix = useCockpitStore((state) => state.setBufferMatrix);
  const setBufferCell = useCockpitStore((state) => state.setBufferCell);
  const setDiagnosticState = useCockpitStore((state) => state.setDiagnosticState);
  const resetCockpitStore = useCockpitStore((state) => state.resetCockpitStore);
  const setCommanderName = useCockpitStore((state) => state.setCommanderName);

  const [selectedDestId, setSelectedDestId] = React.useState<number>(1);
  const [hoveredDestId, setHoveredDestId] = React.useState<number | null>(null);
  const [isCharging, setIsCharging] = React.useState<boolean>(false);
  const [chargeProgress, setChargeProgress] = React.useState<number>(0);

  // Local state for crew name input
  const [nameInput, setNameInput] = React.useState<string>(commanderName || "");
  const [overloadTimeRemaining, setOverloadTimeRemaining] = React.useState<number>(15);

  // Local state for interactive cosmic signal receiver
  const [frequency, setFrequency] = React.useState<number>(142.04);
  const [decryptingSignal, setDecryptingSignal] = React.useState<boolean>(false);
  const [decryptProgress, setDecryptProgress] = React.useState<number>(0);
  const [decryptedChannels, setDecryptedChannels] = React.useState<number[]>([]);
  const [wavePhase, setWavePhase] = React.useState<number>(0);
  const [oscillatorType, setOscillatorType] = React.useState<OscillatorType>("sine");
  const [scrambledHex, setScrambledHex] = React.useState<string>("");
  const [vectorLockStatus, setVectorLockStatus] = React.useState<string>("");
  const terminalEndRef = React.useRef<HTMLDivElement>(null);

  // New interactive systems states
  const [activeDragNode, setActiveDragNode] = React.useState<"shields" | "engines" | "lifeSupport" | null>(null);
  const [commandInput, setCommandInput] = React.useState<string>("");
  const [matrixCalibrating, setMatrixCalibrating] = React.useState<boolean>(false);
  const [sweepPosition, setSweepPosition] = React.useState<number>(-50);

  // New interactive flight-data states
  const [telemetryMode, setTelemetryMode] = React.useState<"propulsion" | "attitude" | "spectrum">("propulsion");
  const [engineThrottle, setEngineThrottle] = React.useState<number>(0);
  const [pitch, setPitch] = React.useState<number>(0);
  const [yaw, setYaw] = React.useState<number>(0);
  const [roll, setRoll] = React.useState<number>(0);
  const [isDraggingGyro, setIsDraggingGyro] = React.useState<boolean>(false);
  const [gyroStart, setGyroStart] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [waveFreq, setWaveFreq] = React.useState<number>(4.2);
  const [waveAmp, setWaveAmp] = React.useState<number>(25);
  const [waveNoise, setWaveNoise] = React.useState<number>(3);
  const [telemetryListen, setTelemetryListen] = React.useState<boolean>(false);

  // New additional flight-data gameplay states
  const [warpBoostActive, setWarpBoostActive] = React.useState<boolean>(false);
  const [selectedBeaconId, setSelectedBeaconId] = React.useState<number>(1);
  const [beaconDecryptProgress, setBeaconDecryptProgress] = React.useState<number>(0);
  const [decryptedBeacons, setDecryptedBeacons] = React.useState<number[]>([]);
  const [alignmentScore, setAlignmentScore] = React.useState<number>(100);

  const canvasRefPropulsion = React.useRef<HTMLCanvasElement | null>(null);
  const canvasRefAttitude = React.useRef<HTMLCanvasElement | null>(null);

  // Sync local input with store changes
  React.useEffect(() => {
    setNameInput(commanderName || "");
  }, [commanderName]);

  // Auto-scroll diagnostics console logs to the bottom
  React.useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [diagnosticLogs]);

  // Audio synthesizer helper
  const playBeep = React.useCallback((freq: number, duration: number, type: OscillatorType = "sine", gainVal: number = 0.03) => {
    if (!audioEnabled) return;
    try {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) return;
      const ctx = new AudioContextConstructor();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gainNode.gain.setValueAtTime(gainVal, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context may fail if browser blocks un-gestured audio
    }
  }, [audioEnabled]);

  // Overload countdown alarm trigger
  const triggerMeltdownShutdown = React.useCallback(() => {
    setReactorOverload(false);
    resetCockpitStore();
    setActiveDisplay(null);
    try {
      (window as any).audioController?.playTransitionSound?.();
    } catch (e) { }
    alert("⚠️ SYSTEM FAILURE: REACTOR CORE MELTDOWN PREVENTED BY EMERGENCY PLASMA SHIFT.\nCockpit console has rebooted to nominal standby state.");
  }, [resetCockpitStore, setActiveDisplay, setReactorOverload]);

  // Coolant venting temperature simulation
  React.useEffect(() => {
    let interval: any;
    if (coolantVentActive) {
      interval = setInterval(() => {
        if (coolantTemp <= 32) {
          clearInterval(interval);
          setCoolantVentActive(false);
          playBeep(1000, 0.15, "sine", 0.02);
          setDiagnosticState(
            diagnosticStatus,
            diagnosticProgress,
            [...diagnosticLogs, "[SYS] COOLANT VENTING COMPLETE. REACTOR TEMPERATURE NOMINAL AT 32°C."]
          );
        } else {
          setCoolantTemp(Math.max(32, coolantTemp - 6));
        }
      }, 100);
    } else {
      interval = setInterval(() => {
        if (coolantTemp < 88) {
          setCoolantTemp(Math.min(88, coolantTemp + 1));
        }
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [coolantVentActive, coolantTemp, setCoolantTemp, setCoolantVentActive, setDiagnosticState, diagnosticStatus, diagnosticProgress, diagnosticLogs]);

  // Overload warning timer loop
  React.useEffect(() => {
    let interval: any;
    if (reactorOverload) {
      setOverloadTimeRemaining(15);
      interval = setInterval(() => {
        setOverloadTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            triggerMeltdownShutdown();
            return 15;
          }
          playBeep(880, 0.15, "sawtooth", 0.015);
          return prev - 1;
        });
      }, 1000);
    } else {
      setOverloadTimeRemaining(15);
    }
    return () => clearInterval(interval);
  }, [reactorOverload, playBeep, triggerMeltdownShutdown]);

  // Oscilloscope wave phase animation loop
  React.useEffect(() => {
    if (activeDisplay !== "radar" && activeDisplay !== "flight-data") return;
    let animFrame: number;
    const animateWave = () => {
      setWavePhase(prev => (prev + 0.15) % (Math.PI * 2));
      animFrame = requestAnimationFrame(animateWave);
    };
    animFrame = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(animFrame);
  }, [activeDisplay]);

  // Starfield canvas render loop for Propulsion tab
  React.useEffect(() => {
    if (activeDisplay !== "flight-data" || telemetryMode !== "propulsion") return;
    const canvas = canvasRefPropulsion.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const numStars = 50;
    const stars: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 200,
        z: Math.random() * 100 + 1,
      });
    }

    let animFrame: number;
    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = "rgba(1, 12, 22, 0.4)";
      ctx.fillRect(0, 0, w, h);

      // Grid wireframe
      ctx.strokeStyle = "rgba(77, 213, 255, 0.08)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let x = 0; x < w; x += 25) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += 25) {
        ctx.moveTo(0, y); ctx.lineTo(w, y);
      }
      ctx.stroke();

      const speed = (engineThrottle / 100) * (warpBoostActive ? 28 : 5.5) + 0.25;

      stars.forEach((star) => {
        const px = cx + (star.x / star.z) * 100;
        const py = cy + (star.y / star.z) * 100;

        star.z -= speed;
        if (star.z <= 0) {
          star.z = 100;
          star.x = (Math.random() - 0.5) * 300;
          star.y = (Math.random() - 0.5) * 200;
        }

        const nx = cx + (star.x / star.z) * 100;
        const ny = cy + (star.y / star.z) * 100;

        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const size = Math.max(0.5, (1 - star.z / 100) * 2.8);
          ctx.fillStyle = warpBoostActive ? "#ffffff" : "rgba(77, 213, 255, 0.85)";

          if (engineThrottle > 35) {
            ctx.strokeStyle = warpBoostActive ? "rgba(255, 255, 255, 0.75)" : "rgba(77, 213, 255, 0.45)";
            ctx.lineWidth = size * 0.55;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(nx, ny);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(nx, ny, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // HUD crosshairs
      ctx.strokeStyle = engineThrottle > 80 ? "rgba(255, 51, 102, 0.45)" : "rgba(77, 213, 255, 0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.moveTo(cx - 22, cy); ctx.lineTo(cx - 8, cy);
      ctx.moveTo(cx + 8, cy); ctx.lineTo(cx + 22, cy);
      ctx.moveTo(cx, cy - 22); ctx.lineTo(cx, cy - 8);
      ctx.moveTo(cx, cy + 8); ctx.lineTo(cx, cy + 22);
      ctx.stroke();

      if (engineThrottle > 80) {
        ctx.fillStyle = "rgba(255, 51, 102, 0.1)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = "bold 8px Consolas";
        ctx.fillStyle = "#ff3366";
        ctx.textAlign = "left";
        ctx.fillText("⚠️ OVERLOAD VIBRATION", 8, h - 8);
      }

      if (warpBoostActive) {
        ctx.font = "bold 8.5px Consolas";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("HYPER WARP SPEED ACTIVATED", cx, 16);
      }

      animFrame = requestAnimationFrame(render);
    };

    animFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrame);
  }, [activeDisplay, telemetryMode, engineThrottle, warpBoostActive]);

  // 3D Flight Tunnel visualizer loop for Attitude HUD tab
  React.useEffect(() => {
    if (activeDisplay !== "flight-data" || telemetryMode !== "attitude") return;
    const canvas = canvasRefAttitude.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const render = () => {
      t += 0.025;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = "#010e16";
      ctx.fillRect(0, 0, w, h);

      // Grid background
      ctx.strokeStyle = "rgba(77, 213, 255, 0.05)";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      for (let x = 0; x < w; x += 20) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += 20) {
        ctx.moveTo(0, y); ctx.lineTo(w, y);
      }
      ctx.stroke();

      const rings = 6;
      let closestRingDist = 999;
      let targetX = 0;
      let targetY = 0;

      for (let i = rings; i >= 1; i--) {
        const z = ((i - (t * 2) % 1) + 1) / rings;
        const scale = 1 / z;

        // Winding tunnel logic
        const ringX = Math.sin((t + z * 1.6) * 1.0) * 32;
        const ringY = Math.cos((t + z * 1.6) * 0.7) * 22;

        const px = cx + (ringX - yaw) * scale;
        const py = cy + (ringY - pitch) * scale;
        const radius = 22 * scale;

        if (i === 1) {
          targetX = ringX;
          targetY = ringY;
          closestRingDist = Math.sqrt((yaw - ringX) ** 2 + (pitch - ringY) ** 2);
        }

        ctx.strokeStyle = i === 1 
          ? (closestRingDist < 10 ? "rgba(0, 255, 136, 0.85)" : "rgba(255, 188, 77, 0.85)") 
          : `rgba(77, 213, 255, ${Math.min(0.7, 1 - z)})`;
        ctx.lineWidth = i === 1 ? 1.8 : 0.8;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, radius), 0, Math.PI * 2);
        ctx.stroke();

        // Connected tunnel lines
        if (i > 1) {
          const nextZ = (((i - 1) - (t * 2) % 1) + 1) / rings;
          const nextScale = 1 / nextZ;
          const nextRingX = Math.sin((t + nextZ * 1.6) * 1.0) * 32;
          const nextRingY = Math.cos((t + nextZ * 1.6) * 0.7) * 22;
          
          const npx = cx + (nextRingX - yaw) * nextScale;
          const npy = cy + (nextRingY - pitch) * nextScale;

          ctx.strokeStyle = `rgba(77, 213, 255, ${Math.min(0.15, 0.7 - z)})`;
          ctx.lineWidth = 0.5;
          for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
            ctx.beginPath();
            ctx.moveTo(px + Math.cos(angle) * radius, py + Math.sin(angle) * radius);
            ctx.lineTo(npx + Math.cos(angle) * (22 * nextScale), npy + Math.sin(angle) * (22 * nextScale));
            ctx.stroke();
          }
        }
      }

      // 0 to 100 alignment score mapping
      const maxDist = 40;
      const score = Math.max(0, Math.min(100, Math.round(100 - (closestRingDist / maxDist) * 100)));
      setAlignmentScore(score);

      // HUD overlay
      ctx.strokeStyle = score > 90 ? "#00ff88" : "#ffbc4d";
      ctx.lineWidth = 1.2;
      if (score > 90) {
        ctx.beginPath();
        ctx.arc(cx, cy, 7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "rgba(0, 255, 136, 0.1)";
        ctx.fill();
        
        ctx.font = "bold 7px Consolas";
        ctx.fillStyle = "#00ff88";
        ctx.textAlign = "center";
        ctx.fillText("CORRIDOR LOCKED", cx, cy - 10);
      } else {
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy); ctx.lineTo(cx + 5, cy);
        ctx.moveTo(cx, cy - 5); ctx.lineTo(cx, cy + 5);
        ctx.stroke();
      }

      ctx.font = "7.5px Consolas";
      ctx.fillStyle = "rgba(77, 213, 255, 0.7)";
      ctx.textAlign = "left";
      ctx.fillText(`DEV-X: ${(yaw - targetX).toFixed(1)}°`, 6, 12);
      ctx.fillText(`DEV-Y: ${(pitch - targetY).toFixed(1)}°`, 6, 20);
      
      ctx.textAlign = "right";
      ctx.fillText(`ALIGN: ${score}%`, w - 6, 12);

      animFrame = requestAnimationFrame(render);
    };

    animFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrame);
  }, [activeDisplay, telemetryMode, yaw, pitch]);

  // Warp Boost timing modifier loop
  React.useEffect(() => {
    if (!warpBoostActive) return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const duration = 4000;
      if (elapsed >= duration) {
        setWarpBoostActive(false);
        setEngineThrottle(30);
        clearInterval(interval);
      } else {
        setEngineThrottle(100);
        setDistanceTraveled(prev => prev + 15);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [warpBoostActive, setDistanceTraveled]);

  // Cosmic Beacon decryption loop for Wave Spectra tab
  React.useEffect(() => {
    if (activeDisplay !== "flight-data" || telemetryMode !== "spectrum") return;

    const targets = [
      { id: 1, freq: 8.5, amp: 35, noise: 1 },
      { id: 2, freq: 14.5, amp: 15, noise: 4 },
      { id: 3, freq: 18.0, amp: 40, noise: 0 }
    ];

    const activeTarget = targets.find(t => t.id === selectedBeaconId) || targets[0];
    const freqDiff = Math.abs(waveFreq - activeTarget.freq);
    const ampDiff = Math.abs(waveAmp - activeTarget.amp);
    const noiseDiff = Math.abs(waveNoise - activeTarget.noise);

    const lockVal = Math.max(0, Math.min(100, Math.round(100 - (freqDiff * 9 + ampDiff * 1.5 + noiseDiff * 3.5))));
    let progressInterval: any;

    if (lockVal >= 90) {
      if (!decryptedBeacons.includes(selectedBeaconId)) {
        progressInterval = setInterval(() => {
          setBeaconDecryptProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setDecryptedBeacons(old => [...old, selectedBeaconId]);
              playBeep(988, 0.15, "sine", 0.04);
              setTimeout(() => playBeep(1318, 0.3, "sine", 0.035), 150);
              return 100;
            }
            return prev + 5;
          });
        }, 100);
      }
    } else {
      progressInterval = setInterval(() => {
        setBeaconDecryptProgress(prev => Math.max(0, prev - 10));
      }, 100);
    }

    return () => clearInterval(progressInterval);
  }, [activeDisplay, telemetryMode, selectedBeaconId, waveFreq, waveAmp, waveNoise, decryptedBeacons, playBeep]);

  // Clean radio tuner states when switching screens
  React.useEffect(() => {
    if (activeDisplay !== "radar") {
      setDecryptingSignal(false);
      setDecryptProgress(0);
      setVectorLockStatus("");
    }
  }, [activeDisplay]);

  // Engine hum sound effect
  React.useEffect(() => {
    if (!audioEnabled || activeDisplay !== "flight-data" || engineThrottle === 0) return;
    
    let ctx: AudioContext | null = null;
    let osc: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;
    
    try {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioContextConstructor();
      osc = ctx.createOscillator();
      gainNode = ctx.createGain();
      
      osc.type = "sawtooth";
      // Low base pitch for engine hum: scales from 45Hz to 95Hz
      const freq = 45 + (engineThrottle / 100) * 50;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      const volume = 0.005 + (engineThrottle / 100) * 0.015;
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120 + (engineThrottle / 100) * 180, ctx.currentTime);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
    } catch (e) {}
    
    return () => {
      if (osc) {
        try {
          osc.stop();
        } catch (e) {}
      }
      if (ctx) {
        try {
          ctx.close();
        } catch (e) {}
      }
    };
  }, [engineThrottle, audioEnabled, activeDisplay]);

  // Telemetry wave listen sound effect
  React.useEffect(() => {
    if (!audioEnabled || activeDisplay !== "flight-data" || !telemetryListen) return;
    
    let ctx: AudioContext | null = null;
    let osc: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;
    
    try {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioContextConstructor();
      osc = ctx.createOscillator();
      gainNode = ctx.createGain();
      
      osc.type = "sine";
      // Map waveFreq (1 to 20) to pitch: e.g. 200Hz to 1000Hz
      const freq = 200 + (waveFreq / 20) * 800;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Volume scales with amplitude
      const volume = (waveAmp / 45) * 0.012;
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      
      // Add tremolo LFO if noise is active
      if (waveNoise > 0) {
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(waveNoise * 2, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.005, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(gainNode.gain);
        lfo.start();
        
        setTimeout(() => {
          try { lfo.stop(); } catch(e) {}
        }, 100000);
      }
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
    } catch (e) {}
    
    return () => {
      if (osc) {
        try {
          osc.stop();
        } catch (e) {}
      }
      if (ctx) {
        try {
          ctx.close();
        } catch (e) {}
      }
    };
  }, [telemetryListen, waveFreq, waveAmp, waveNoise, audioEnabled, activeDisplay]);

  // Scramble effect for decryption hacker matrix feel
  React.useEffect(() => {
    if (!decryptingSignal) {
      setScrambledHex("");
      return;
    }
    const hexChars = "0123456789ABCDEF!@#$%&*+=-/\\";
    const interval = setInterval(() => {
      let result = "";
      for (let i = 0; i < 20; i++) {
        result += hexChars[Math.floor(Math.random() * hexChars.length)];
      }
      setScrambledHex(result);
    }, 60);
    return () => clearInterval(interval);
  }, [decryptingSignal]);

  // Decrypts encrypted hyperspace radio transmissions
  const runSignalDecryption = (channelId: number) => {
    if (decryptingSignal) return;
    setDecryptingSignal(true);
    setDecryptProgress(0);
    playBeep(450, 0.1, oscillatorType, 0.03);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setDecryptingSignal(false);
        setDecryptedChannels(prev => [...prev, channelId]);
        playBeep(880, 0.15, oscillatorType, 0.03);
        setTimeout(() => playBeep(1100, 0.2, oscillatorType, 0.03), 100);
      } else {
        setDecryptProgress(progress);
        playBeep(1000 + Math.random() * 400, 0.04, oscillatorType, 0.008);
      }
    }, 180);
  };

  // Dynamic power allocator (keeps total = 100%)
  const adjustPower = (system: "shields" | "engines" | "lifeSupport", amount: number) => {
    const currentValue = system === "shields" ? powerShields : (system === "engines" ? powerEngines : powerLifeSupport);
    const newValue = Math.min(100, Math.max(0, currentValue + amount));
    const diff = newValue - currentValue;
    if (diff === 0) return;

    const otherSystems = (["shields", "engines", "lifeSupport"] as const).filter((s) => s !== system);
    let vals = {
      shields: powerShields,
      engines: powerEngines,
      lifeSupport: powerLifeSupport,
    };

    const sumOthers = vals[otherSystems[0]] + vals[otherSystems[1]];
    if (sumOthers > 0) {
      const sub1 = Math.round(diff * (vals[otherSystems[0]] / sumOthers));
      const sub2 = diff - sub1;
      vals[otherSystems[0]] = Math.min(100, Math.max(0, vals[otherSystems[0]] - sub1));
      vals[otherSystems[1]] = Math.min(100, Math.max(0, vals[otherSystems[1]] - sub2));
    } else {
      const sub = Math.round(diff / 2);
      vals[otherSystems[0]] = Math.min(100, Math.max(0, vals[otherSystems[0]] - sub));
      vals[otherSystems[1]] = Math.min(100, Math.max(0, vals[otherSystems[1]] - (diff - sub)));
    }
    vals[system] = newValue;

    const total = vals.shields + vals.engines + vals.lifeSupport;
    if (total !== 100) {
      vals[otherSystems[0]] += (100 - total);
    }

    setPowerAllocation(vals.shields, vals.engines, vals.lifeSupport);
    playBeep(440 + amount * 8, 0.08, "sine", 0.02);
  };

  // Trigger diagnostics protocol
  const runDiagnostics = () => {
    if (diagnosticStatus === "RUNNING") return;

    setDiagnosticState("RUNNING", 0, ["[INIT] Launching Ship Diagnostics Protocol..."]);
    playBeep(600, 0.1, "sine", 0.04);

    const steps = [
      { progress: 15, log: "[CHECK] Reactor fuel rods: 98.2% containment... OK" },
      { progress: 30, log: "[CHECK] Power routing matrix: Shields/Eng/LS synced... OK" },
      { progress: 48, log: "[SYS] Deflector shield polarity check: 180deg vector... OK" },
      { progress: 65, log: "[BUFFER] Core matrix integrity check: 24/24 sectors scanned..." },
      { progress: 80, log: "[LIFE] O2 scrubbers check & cabin pressure: 1.01 atm... OK" },
      { progress: 95, log: "[NAV] Vector calculation computer check: Destination orbit lock... OK" },
      { progress: 100, log: `[COMPLETE] Diagnostics finished. Hello, Commander ${commanderName || "Guest"}. Systems Nominal.` }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setDiagnosticState("COMPLETED", 100, [
          ...steps.map(s => s.log),
          `[SYS] STATUS REPORT: ZERO CRITICAL ERRORS DETECTED.`
        ]);
        playBeep(988, 0.18, "sine", 0.03);
        setTimeout(() => playBeep(1318, 0.22, "sine", 0.03), 120);
      } else {
        const step = steps[currentStep];
        setDiagnosticState("RUNNING", step.progress, [
          "[INIT] Launching Ship Diagnostics Protocol...",
          ...steps.slice(0, currentStep + 1).map(s => s.log)
        ]);
        playBeep(523 + currentStep * 70, 0.08, "triangle", 0.03);
        currentStep++;
      }
    }, 600);
  };

  // Buffer sector manual calibration
  const handleCellClick = (index: number) => {
    const currentVal = bufferMatrix[index];
    const nextVal = currentVal === 0 ? 1 : (currentVal === 1 ? 2 : 0);
    setBufferCell(index, nextVal);

    const baseNote = 261.63;
    const scale = [1, 1.125, 1.25, 1.333, 1.5, 1.667, 1.875, 2];
    const noteMultiplier = scale[index % scale.length] * (Math.floor(index / scale.length) + 1);
    playBeep(baseNote * noteMultiplier, 0.15, "sine", 0.03);
  };

  // Cascade auto stabilization sweep
  const handleCalibrateMatrix = () => {
    if (matrixCalibrating) return;
    setMatrixCalibrating(true);
    setSweepPosition(-20);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= 24) {
        clearInterval(interval);
        playBeep(523.25, 0.12, "sine", 0.03);
        setTimeout(() => playBeep(659.25, 0.12, "sine", 0.03), 100);
        setTimeout(() => playBeep(783.99, 0.12, "sine", 0.03), 200);
        setTimeout(() => playBeep(1046.50, 0.22, "sine", 0.03), 300);

        setTimeout(() => {
          setMatrixCalibrating(false);
          setSweepPosition(-50);
        }, 500);
      } else {
        setBufferCell(currentIndex, 0);
        playBeep(300 + currentIndex * 15, 0.05, "sine", 0.02);

        const col = currentIndex % 6;
        const targetX = 60 * (col + 1);
        setSweepPosition(targetX);

        currentIndex++;
      }
    }, 55);
  };

  // Coolant vent click trigger
  const handleVentCoolant = () => {
    if (coolantVentActive) return;
    setCoolantVentActive(true);
    playBeep(2000, 0.5, "sine", 0.015);
    setTimeout(() => playBeep(1500, 0.5, "sine", 0.012), 300);
    setTimeout(() => playBeep(900, 0.5, "sine", 0.01), 600);
  };

  // Terminal command executor
  const executeTerminalCommand = () => {
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    let currentLogs = [...diagnosticLogs];
    if (currentLogs.length === 0) {
      currentLogs = ["Terminal standby. Awaiting diagnostic handshake sequence..."];
    }

    setCommandInput("");
    playBeep(600, 0.12, "triangle", 0.03);

    if (cmd === "clear" || cmd === "cls") {
      setDiagnosticState(diagnosticStatus, diagnosticProgress, []);
      return;
    }

    const newLogs = [...currentLogs, `\n> ${commandInput}`];

    switch (cmd) {
      case "help":
        newLogs.push(
          "AVAILABLE SYSTEM COMMANDS:",
          "  scan       - Trigger full diagnostic systems scan",
          "  vent       - Activate core reactor coolant venting",
          "  overload   - Toggle reactor core overload simulation",
          "  stabilize  - Trigger buffer matrix nodes auto-calibration",
          "  status     - Query structural telemetry and power routing",
          "  reboot     - Hard reset ship systems to default values",
          "  clear      - Clear terminal monitor feed",
          "  about      - Display system mainframe specs"
        );
        setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
        break;

      case "scan":
      case "diagnose":
        if (diagnosticStatus === "RUNNING") {
          newLogs.push("[ERROR] DIAGNOSTIC PROCESS ALREADY RUNNING.");
          setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
        } else {
          setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
          setTimeout(() => runDiagnostics(), 100);
        }
        break;

      case "vent":
      case "cool":
        if (coolantVentActive) {
          newLogs.push("[WARNING] COOLANT VENTING ACTIVE. PRESSURE MONITORING.");
          setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
        } else {
          newLogs.push("[SUCCESS] COOLANT VENT VALVES OPENED. THERMALS REDUCING.");
          setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
          setTimeout(() => handleVentCoolant(), 100);
        }
        break;

      case "overload":
      case "burn": {
        const nextOverload = !reactorOverload;
        newLogs.push(
          nextOverload
            ? "[ALERT] INITIATING JUMP CORE OVERLOAD SEQUENCE!"
            : "[SUCCESS] ABORTING JUMP CORE OVERLOAD. STABILIZING PRESSURE."
        );
        setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
        setTimeout(() => {
          setReactorOverload(nextOverload);
          playBeep(nextOverload ? 900 : 300, 0.2, "sawtooth", 0.02);
        }, 100);
        break;
      }

      case "stabilize":
      case "sync":
      case "calibrate":
        newLogs.push("[INIT] Initiating buffer cascade stabilization sweep...");
        setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
        setTimeout(() => handleCalibrateMatrix(), 100);
        break;

      case "status": {
        const stability = Math.round((bufferMatrix.filter(cell => cell === 0).length / 24) * 100);
        newLogs.push(
          "--- NOVA-CLASS SHIP TELEMETRY ---",
          `NEURAL LINK:  ${commanderName ? `CONNECTED [Commander: ${commanderName}]` : "UNLINKED [GUEST]"}`,
          `POWER GRID:   Shields: ${powerShields}% | Engines: ${powerEngines}% | LifeSupport: ${powerLifeSupport}%`,
          `CORE TEMP:    ${coolantTemp.toFixed(1)}°C [Limit: 120°C]`,
          `MATRIX SYNC:  ${stability}% Stable [24 Nodes Online]`,
          `OVERLOAD SYS: ${reactorOverload ? "CRITICAL ALARM ACTIVE" : "NOMINAL STANDBY"}`,
          "---------------------------------"
        );
        setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
        break;
      }

      case "reboot":
        newLogs.push("[SYS] REBOOTING COCKPIT TERMINAL CORE CONSOLE...");
        setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
        setTimeout(() => {
          resetCockpitStore();
          playBeep(220, 0.5, "sawtooth", 0.04);
        }, 500);
        break;

      case "about":
        newLogs.push(
          "NOVA COCKPIT CONSOLE MAINFRAME OS",
          "Version 4.2.1-LTS (Kernel: 12.8.0-plasma)",
          "Manufacturer: Core Systems Aerospace Group",
          "Hologram Driver: holographic-nav-gl v1.4",
          "Status: Registered to " + (commanderName || "U.S.S. Enterprise Guest")
        );
        setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
        break;

      default:
        newLogs.push(`[ERROR] Command '${cmd}' unrecognized. Type 'help' for commands.`);
        setDiagnosticState(diagnosticStatus, diagnosticProgress, newLogs);
        break;
    }
  };



  const engageWarp = (dest: { id: number; link: string }) => {
    if (isCharging) return;
    setIsCharging(true);
    setChargeProgress(0);

    if (typeof window !== "undefined") {
      (window as any).audioController?.playClickSound?.();
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setChargeProgress(progress);

      if (progress % 20 === 0 && typeof window !== "undefined") {
        (window as any).audioController?.playHoverSound?.();
      }

      if (progress >= 100) {
        clearInterval(interval);

        if (typeof window !== "undefined") {
          (window as any).audioController?.playTransitionSound?.();
        }

        setTimeout(() => {
          setTravelTarget(dest.id, dest.link);
          transitionToScene("universe");
          setActiveDisplay(null);
          setIsCharging(false);
          setChargeProgress(0);
        }, 400);
      }
    }, 120);
  };

  React.useEffect(() => {
    if (!activeDisplay) {
      setIsCharging(false);
      setChargeProgress(0);
    }
  }, [activeDisplay]);

  React.useEffect(() => {
    if (activeDisplay !== "nav-compute" || isCharging) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        setSelectedDestId((prev) => {
          const next = prev < 7 ? prev + 1 : 1;
          if (typeof window !== "undefined") {
            (window as any).audioController?.playHoverSound?.();
          }
          return next;
        });
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        setSelectedDestId((prev) => {
          const next = prev > 1 ? prev - 1 : 7;
          if (typeof window !== "undefined") {
            (window as any).audioController?.playHoverSound?.();
          }
          return next;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        const currentDest = NAV_DESTINATIONS.find(d => d.id === selectedDestId);
        if (currentDest) {
          engageWarp(currentDest);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeDisplay, selectedDestId, isCharging]);

  React.useEffect(() => {
    if (activeDisplay === "nav-compute") {
      const selectedElement = document.getElementById(`nav-item-${selectedDestId}`);
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    }
  }, [selectedDestId, activeDisplay]);

  if (!activeDisplay) return null;

  const renderContent = () => {
    switch (activeDisplay) {
      case "radar": {
        const CHANNELS = [
          {
            id: 1,
            freq: 142.1,
            name: "COSMIC HYDROGEN EMISSION",
            sender: "STELLAR SENSOR NET",
            message: "Standard background radiation resonance of neutral hydrogen atoms at 1420.4 MHz (21cm line). The spectrum is uniform and clean across the sector floor.",
            encrypted: false,
            classification: "COSMIC EMISSION"
          },
          {
            id: 2,
            freq: 382.4,
            name: "REPOSITORY HYPER-LINK DATA",
            sender: "DATABAND ARCHIVE",
            message: "COSMIC CORRELATION DATA ACQUIRED: Project codebase repository located at: https://github.com/Gabrial-8467/universe-portfolio. Synchronizing remote branches... Connected.",
            encrypted: true,
            classification: "PORTFOLIO CORE DATA",
            targetDestId: 6,
            url: "https://github.com/Gabrial-8467/universe-portfolio"
          },
          {
            id: 3,
            freq: 520.0,
            name: "CREW LOG ENTRY #09",
            sender: "COMMANDER ARCHIVE",
            message: "PERSONAL LOG ENTRY: Sector sweep complete. The navigation matrix confirms G6 galaxy (projects log) is in close range. Target classification: Spiral cluster. Deep space coordinates locked.",
            encrypted: true,
            classification: "CREW LOG ARCHIVE",
            targetDestId: 6
          },
          {
            id: 4,
            freq: 740.1,
            name: "DISTRESS BEACON BROADCAST",
            sender: "FREIGHTER CLUSTER KRONOS",
            message: "EMERGENCY BROADCAST: Deflector shield arrays overloaded after pulsar burst. Hull integrity down to 42%. We are drifting in sector SEC KRONOS-09. Requesting energy core support.",
            encrypted: false,
            classification: "DISTRESS SIGNALS",
            targetDestId: 2
          },
          {
            id: 5,
            freq: 912.8,
            name: "STELLAR PULSAR TELEMETRY",
            sender: "PULSAR PSR B1919+21",
            message: "NEURAL TELEMETRY STREAM: Core pulse frequency 1.337 Hz. Radiating high intensity electromagnetic waves. Gravitational lensing warping nearby space. Safe distance: 15.0 LY.",
            encrypted: false,
            classification: "STELLAR SURVEY",
            targetDestId: 7
          }
        ];

        const matchedChannel = CHANNELS.find(c => Math.abs(frequency - c.freq) < 0.15);
        const isLocked = Boolean(matchedChannel);
        
        let signalStrength = -118;
        if (matchedChannel) {
          const diff = Math.abs(frequency - matchedChannel.freq);
          signalStrength = Math.round(-110 + (1 - diff / 0.15) * 70);
        }

        const isDecrypted = matchedChannel 
          ? (!matchedChannel.encrypted || decryptedChannels.includes(matchedChannel.id))
          : false;

        const getOscilloscopePath = () => {
          const width = 280;
          const height = 100;
          const centerY = height / 2;
          
          let points: string[] = [];
          
          if (matchedChannel) {
            const diff = Math.abs(frequency - matchedChannel.freq);
            const coherence = Math.max(0, 1 - diff / 0.15);
            
            for (let x = 0; x <= width; x += 4) {
              let waveY = 0;
              const angle = (x / 14) - wavePhase * 1.5;
              
              if (oscillatorType === "sine") {
                waveY = Math.sin(angle) * 30;
              } else if (oscillatorType === "square") {
                waveY = (Math.sin(angle) >= 0 ? 1 : -1) * 26;
              } else if (oscillatorType === "sawtooth") {
                const t = ((x / 40) - wavePhase * 0.4) % 1;
                waveY = (t * 2 - 1) * 26;
              } else if (oscillatorType === "triangle") {
                const t = ((x / 40) - wavePhase * 0.4) % 1;
                waveY = (Math.abs(t * 4 - 2) - 1) * 28;
              }
              
              const noiseY = (Math.random() - 0.5) * 16 * (1 - coherence);
              const y = centerY + (waveY * coherence) + noiseY;
              points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
            }
          } else {
            for (let x = 0; x <= width; x += 4) {
              const y = centerY + (Math.random() - 0.5) * 20;
              points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
            }
          }
          return points.join(" ");
        };
        
        return (
          <div className="instrument-screen spectrum-receiver-display" style={{ width: "100%", height: "100%", border: "none", background: "none", boxShadow: "none", display: "flex", flexDirection: "column" }}>
            <style>{`
              .oscilloscope-screen {
                background: #010c14;
                border: 1px solid rgba(77, 213, 255, 0.2);
                border-radius: 4px;
                padding: 10px;
                box-shadow: inset 0 0 15px rgba(77, 213, 255, 0.12);
                position: relative;
                overflow: hidden;
              }
              .oscilloscope-screen::after {
                content: " ";
                display: block;
                position: absolute;
                top: 0; left: 0; bottom: 0; right: 0;
                background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(77, 213, 255, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
                background-size: 100% 3px, 6px 100%;
                z-index: 10;
                pointer-events: none;
                opacity: 0.85;
              }
              .oscilloscope-glow {
                stroke: #4dd5ff;
                stroke-width: 1.5;
                fill: none;
                filter: drop-shadow(0 0 4px rgba(77, 213, 255, 0.8));
              }
              .tuning-dial-btn {
                background: rgba(77, 213, 255, 0.12);
                border: 1px solid rgba(77, 213, 255, 0.35);
                color: #4dd5ff;
                padding: 4px 10px;
                font-family: Consolas, monospace;
                font-size: 11px;
                font-weight: bold;
                cursor: pointer;
                border-radius: 3px;
                transition: all 0.2s ease;
              }
              .tuning-dial-btn:hover {
                background: #4dd5ff;
                color: #000000;
                box-shadow: 0 0 8px rgba(77, 213, 255, 0.4);
              }
              .channel-suggest-item {
                font-family: Consolas, monospace;
                font-size: 9.5px;
                color: rgba(134, 225, 255, 0.65);
                border-bottom: 1px solid rgba(77, 213, 255, 0.1);
                padding: 4px 6px;
                cursor: pointer;
                transition: all 0.2s ease;
              }
              .channel-suggest-item:hover {
                background: rgba(77, 213, 255, 0.08);
                color: #ffffff;
              }
            `}</style>

            <header style={{ fontSize: "13px", borderBottom: "1px solid rgba(79, 205, 247, 0.5)", paddingBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className={isLocked ? "led-blink" : ""} style={{ width: "8px", height: "8px", borderRadius: "50%", background: isLocked ? "#00ff88" : "#ff3366", boxShadow: isLocked ? "0 0 8px #00ff88" : "0 0 8px #ff3366" }} />
                <b>HYPERSPACE SIGNAL DECODER v2.1</b>
              </div>
              <span style={{ fontSize: "11px", color: isLocked ? "#00ff88" : "rgba(134, 225, 255, 0.7)", fontWeight: "bold" }}>
                {isLocked ? "DEEP SPACE CARRIER LOCKED" : "TUNING SPECTRUM (NOISE)"}
              </span>
            </header>

            <div className="screen-grid-radar" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "25px", marginTop: "18px", flex: 1 }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                
                <div className="oscilloscope-screen">
                  <svg width="280" height="100" style={{ display: "block" }}>
                    {[20, 40, 60, 80].map(y => (
                      <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(77, 213, 255, 0.06)" strokeDasharray="3,3" />
                    ))}
                    {[40, 80, 120, 160, 200, 240].map(x => (
                      <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="rgba(77, 213, 255, 0.06)" strokeDasharray="3,3" />
                    ))}
                    <path d={getOscilloscopePath()} className="oscilloscope-glow" />
                  </svg>
                  
                  <div style={{ position: "absolute", bottom: "4px", left: "6px", fontSize: "7px", fontFamily: "Consolas", color: "rgba(77, 213, 255, 0.45)" }}>
                    VERT: 10mV/DIV // HORIZ: 2.5ms/DIV
                  </div>
                </div>

                <div style={{ padding: "12px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.45)", borderRadius: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Consolas", fontSize: "11px", marginBottom: "8px" }}>
                    <span>TUNER FREQUENCY:</span>
                    <b style={{ color: "#4dd5ff", fontSize: "13px" }}>{frequency.toFixed(1)} MHz</b>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <button 
                        onClick={() => {
                          setFrequency(prev => Math.max(100.0, prev - 0.1));
                          playBeep(220, 0.06, oscillatorType, 0.01);
                        }} 
                        className="tuning-dial-btn"
                      >
                        -0.1
                      </button>
                      <input 
                        type="range" 
                        min="100.0" 
                        max="999.0" 
                        step="0.1" 
                        value={frequency} 
                        onChange={(e) => {
                          setFrequency(parseFloat(e.target.value));
                          playBeep(200 + Math.random() * 500, 0.04, oscillatorType, 0.005);
                        }}
                        style={{ flex: 1, cursor: "pointer", accentColor: "#4dd5ff" }}
                      />
                      <button 
                        onClick={() => {
                          setFrequency(prev => Math.min(999.0, prev + 0.1));
                          playBeep(240, 0.06, oscillatorType, 0.01);
                        }} 
                        className="tuning-dial-btn"
                      >
                        +0.1
                      </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
                      <span style={{ fontSize: "9px", fontFamily: "Consolas", color: "rgba(134, 225, 255, 0.6)" }}>CARRIER WAVE SHAPE:</span>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "4px" }}>
                        {(["sine", "square", "sawtooth", "triangle"] as const).map((type) => {
                          const isActive = oscillatorType === type;
                          return (
                            <button
                              key={type}
                              onClick={() => {
                                setOscillatorType(type);
                                playBeep(isActive ? 600 : 440, 0.12, type, 0.025);
                              }}
                              style={{
                                background: isActive ? "rgba(77, 213, 255, 0.25)" : "rgba(77, 213, 255, 0.05)",
                                border: `1px solid ${isActive ? "#4dd5ff" : "rgba(77, 213, 255, 0.2)"}`,
                                color: isActive ? "#ffffff" : "rgba(134, 225, 255, 0.7)",
                                padding: "4px 0",
                                fontSize: "8.5px",
                                fontFamily: "Consolas, monospace",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                cursor: "pointer",
                                borderRadius: "2px",
                                transition: "all 0.15s ease"
                              }}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontFamily: "Consolas", fontSize: "9.5px", color: "rgba(134, 225, 255, 0.7)", marginTop: "4px" }}>
                      <div>
                        SIGNAL LEVEL: <b style={{ color: isLocked ? "#00ff88" : "inherit" }}>{signalStrength} dBm</b>
                      </div>
                      <div>
                        CARRIER STATUS: <b style={{ color: isLocked ? "#00ff88" : "#ff3366" }}>{isLocked ? "LOCK (OK)" : "STATIC"}</b>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                
                <div style={{ padding: "12px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.5)", borderRadius: "4px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ borderBottom: "1px solid rgba(77, 213, 255, 0.25)", paddingBottom: "5px", marginBottom: "8px", fontSize: "11px", fontWeight: "bold", fontFamily: "Consolas, monospace", color: "#4dd5ff" }}>
                    DECRYPTED SIGNAL FEED
                  </div>

                  {matchedChannel ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", fontFamily: "Consolas, monospace", fontSize: "11px", color: "rgba(134, 225, 255, 0.85)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>SIGNAL ID:</span>
                        <b style={{ color: "#ffffff" }}>{matchedChannel.name}</b>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>SENDER SOURCE:</span>
                        <span>{matchedChannel.sender}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>CLASSIFICATION:</span>
                        <span>{matchedChannel.classification}</span>
                      </div>

                      <div style={{ marginTop: "6px", border: "1px solid rgba(77, 213, 255, 0.15)", background: "#010d14", padding: "8px", borderRadius: "3px", minHeight: "80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        {isDecrypted ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <p style={{ margin: 0, fontSize: "10px", lineHeight: "1.4", color: "#d2f2ff" }}>
                              {matchedChannel.message}
                            </p>
                            {vectorLockStatus && (
                              <div className="led-blink" style={{ fontSize: "9.5px", fontFamily: "Consolas, monospace", color: "#00ff88", fontWeight: "bold", borderTop: "1px solid rgba(0, 255, 136, 0.2)", paddingTop: "4px" }}>
                                📡 {vectorLockStatus}
                              </div>
                            )}
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                              {matchedChannel.url && (
                                <a
                                  href={matchedChannel.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="tuning-dial-btn"
                                  style={{
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    background: "rgba(0, 255, 136, 0.15)",
                                    borderColor: "#00ff88",
                                    color: "#00ff88",
                                    padding: "4px 8px",
                                    fontSize: "9.5px"
                                  }}
                                >
                                  🔗 ACCESS REPOSITORY
                                </a>
                              )}
                              {matchedChannel.targetDestId && (
                                <button
                                  onClick={() => {
                                    setSelectedDestId(matchedChannel.targetDestId!);
                                    playBeep(988, 0.1, "sine", 0.03);
                                    setTimeout(() => playBeep(1318, 0.15, "sine", 0.03), 80);
                                    const destInfo = NAV_DESTINATIONS.find(d => d.id === matchedChannel.targetDestId);
                                    setVectorLockStatus(`LOCKED NAV SYSTEM TO ${destInfo ? destInfo.name : "COORDINATES"}`);
                                    setTimeout(() => setVectorLockStatus(""), 4000);
                                  }}
                                  className="tuning-dial-btn"
                                  style={{
                                    background: "rgba(77, 213, 255, 0.15)",
                                    borderColor: "#4dd5ff",
                                    color: "#4dd5ff",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    padding: "4px 8px",
                                    fontSize: "9.5px"
                                  }}
                                >
                                  🛰️ TRANSMIT VECTOR TO NAV
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div style={{ textAlign: "center", padding: "6px 0" }}>
                            <div style={{ color: "#ff6b9d", fontWeight: "bold", fontSize: "10px", marginBottom: "8px" }}>
                              ⚠️ ENCRYPTED VECTOR DATA STREAM
                            </div>
                            
                            {decryptingSignal ? (
                              <div style={{ width: "100%" }}>
                                <div style={{ fontSize: "9px", marginBottom: "4px" }}>DECRYPT SCRAMBLER PROGRESS: {decryptProgress}%</div>
                                <div style={{ height: "4px", background: "rgba(255, 107, 157, 0.1)", borderRadius: "2px", overflow: "hidden", margin: "4px 0" }}>
                                  <div style={{ width: `${decryptProgress}%`, height: "100%", background: "#ff6b9d" }} />
                                </div>
                                <div style={{ fontFamily: "Consolas, monospace", color: "#ff6b9d", fontSize: "9px", letterSpacing: "1.5px", marginTop: "4px" }}>
                                  🔓 [{scrambledHex}]
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => runSignalDecryption(matchedChannel.id)}
                                style={{
                                  background: "rgba(255, 107, 157, 0.15)",
                                  border: "1px solid #ff6b9d",
                                  color: "#ff6b9d",
                                  padding: "4px 10px",
                                  fontSize: "9.5px",
                                  fontWeight: "bold",
                                  fontFamily: "Consolas",
                                  cursor: "pointer",
                                  borderRadius: "2px"
                                }}
                              >
                                🔑 DECODE TRANSMISSION
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "rgba(134, 225, 255, 0.35)", fontSize: "11px", fontFamily: "Consolas", textAlign: "center" }}>
                      <span>RADIO TUNER IN STATIC.<br />SWEEP COGNITIVE SPECTRUM TO DETECT SIGNALS.</span>
                    </div>
                  )}
                </div>

                <div style={{ height: "110px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.45)", borderRadius: "4px", overflowY: "auto" }}>
                  <div style={{ position: "sticky", top: 0, background: "#010e16", padding: "4px 8px", fontSize: "9px", color: "rgba(77, 213, 255, 0.7)", borderBottom: "1px solid rgba(77, 213, 255, 0.2)", fontFamily: "Consolas" }}>
                    ACTIVE SPECTRUM INDEX
                  </div>
                  
                  {CHANNELS.map(c => {
                    const isCurrent = Math.abs(frequency - c.freq) < 0.15;
                    const channelDecrypted = decryptedChannels.includes(c.id) || !c.encrypted;
                    return (
                      <div 
                        key={c.id} 
                        className="channel-suggest-item"
                        onClick={() => {
                          setFrequency(c.freq);
                          playBeep(880, 0.1, "sine", 0.02);
                          setTimeout(() => playBeep(1100, 0.1, "sine", 0.02), 80);
                        }}
                        style={{
                          background: isCurrent ? "rgba(0, 255, 136, 0.06)" : "none",
                          color: isCurrent ? "#00ff88" : "inherit"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span>{c.freq.toFixed(1)} MHz — {c.name}</span>
                          <span style={{ opacity: 0.7, fontSize: "8px" }}>
                            {c.encrypted ? (channelDecrypted ? "✓ DECRYPTED" : "🔒 KEY REQ") : "🔓 OPEN"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

            <footer style={{ marginTop: "15px", fontSize: "11px", borderTop: "1px solid rgba(79, 205, 247, 0.35)", paddingTop: "8px", display: "flex", justifyContent: "space-between", fontFamily: "Consolas, monospace" }}>
              <span>SPECTRUM SEARCH RANGE: 100 - 999 MHz</span>
              <span>INDEX: 5 ACTIVE BANDS DETECTED</span>
            </footer>
          </div>
        );
      }
      case "systems": {
        const matrixStabilityScore = Math.round((bufferMatrix.filter(cell => cell === 0).length / 24) * 100);
        
        let corePercent = 98;
        if (reactorOverload) {
          corePercent = Math.round(135 + Math.sin(Date.now() / 150) * 8);
        }

        const systemStatusText = reactorOverload
          ? "💥 REACTOR CORE OVERLOAD WARNING"
          : (matrixStabilityScore < 80 ? "⚠️ SECTOR DEGRADATION DETECTED" : "🌌 ALL SYSTEMS NOMINAL");

        const systemStatusColor = reactorOverload
          ? "#ff3366"
          : (matrixStabilityScore < 80 ? "#ffbc4d" : "#00ff88");

              const powerButtonStyle = {
                background: "rgba(77, 213, 255, 0.12)",
              border: "1px solid rgba(77, 213, 255, 0.35)",
              color: "#4dd5ff",
              padding: "4px 10px",
              fontSize: "11px",
              fontWeight: "bold" as const,
              fontFamily: "Consolas, monospace",
              cursor: "pointer",
              borderRadius: "3px",
              transition: "all 0.15s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "24px"
        };

              // Tri-Vector Power Node SVG Plotting Math
              const svgSize = 130;
              const cx = svgSize / 2;
              const cy = svgSize / 2;
              const maxRadius = 52;

              // Vertices coordinates (120 degree offsets)
              // Vertex 1: Shields (Up, angle = -90 deg)
              const sRadius = maxRadius * (powerShields / 100);
              const x1 = cx;
              const y1 = cy - sRadius;

              // Vertex 2: Engines (Bottom-Right, angle = 30 deg)
              const eRadius = maxRadius * (powerEngines / 100);
              const x2 = cx + eRadius * 0.866;
              const y2 = cy + eRadius * 0.5;

              // Vertex 3: Life Support (Bottom-Left, angle = 150 deg)
              const lRadius = maxRadius * (powerLifeSupport / 100);
              const x3 = cx - lRadius * 0.866;
              const y3 = cy + lRadius * 0.5;

              // Outer Reference Boundary Coordinates (100% load)
              const rx1 = cx;
              const ry1 = cy - maxRadius;
              const rx2 = cx + maxRadius * 0.866;
              const ry2 = cy + maxRadius * 0.5;
              const rx3 = cx - maxRadius * 0.866;
              const ry3 = cy + maxRadius * 0.5;

              // Pointer event dragging handlers declared block-scoped
              const handleSvgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
                const px = e.clientX - rect.left;
                const py = e.clientY - rect.top;

                // Calculate distance to each of the three active vertex coordinates
                const dist1 = Math.hypot(px - x1, py - y1);
                const dist2 = Math.hypot(px - x2, py - y2);
                const dist3 = Math.hypot(px - x3, py - y3);

                let closest: "shields" | "engines" | "lifeSupport" | null = null;
                let minDist = 25; // selection range

                if (dist1 < minDist) {
                  closest = "shields";
                minDist = dist1;
          }
                if (dist2 < minDist) {
                  closest = "engines";
                minDist = dist2;
          }
                if (dist3 < minDist) {
                  closest = "lifeSupport";
                minDist = dist3;
          }

                if (closest) {
                  setActiveDragNode(closest);
                e.currentTarget.setPointerCapture(e.pointerId);
                playBeep(600, 0.05, "sine", 0.025);
          }
        };

                const handleSvgPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
          if (!activeDragNode) return;

                  const rect = e.currentTarget.getBoundingClientRect();
                  const px = e.clientX - rect.left;
                  const py = e.clientY - rect.top;

                  const dx = px - cx;
                  const dy = py - cy;

                  // Project pointer onto the respective axis vector
                  let projection = 0;
                  if (activeDragNode === "shields") {
                    projection = -dy; 
          } else if (activeDragNode === "engines") {
                    projection = dx * 0.866 + dy * 0.5; 
          } else if (activeDragNode === "lifeSupport") {
                    projection = -dx * 0.866 + dy * 0.5; 
          }

                  const finalDist = Math.max(0, Math.min(maxRadius, projection));
                  const newPct = Math.round((finalDist / maxRadius) * 100);

                  const currentVal = activeDragNode === "shields" ? powerShields : (activeDragNode === "engines" ? powerEngines : powerLifeSupport);
                  const diff = newPct - currentVal;

                  if (diff !== 0) {
                    adjustPower(activeDragNode, diff);
          }
        };

                  const handleSvgPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
          if (activeDragNode) {
                      e.currentTarget.releasePointerCapture(e.pointerId);
                    setActiveDragNode(null);
                    playBeep(820, 0.06, "sine", 0.02);
          }
        };

                    // Reactor Column Core height mapping (height limit 110px)
                    const coreHeight = (coolantTemp / 120) * 110;
                    const coreY = 125 - coreHeight;

                    return (
                    <div
                      className="instrument-screen systems-display crt-overlay"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: reactorOverload ? "1px solid #ff3366" : "1px solid rgba(77, 213, 255, 0.35)",
                        background: "radial-gradient(circle at center, rgba(3, 20, 36, 0.85) 0%, rgba(1, 8, 16, 0.98) 100%)",
                        boxShadow: reactorOverload
                          ? "inset 0 0 25px rgba(255, 51, 102, 0.25), 0 0 15px rgba(255, 51, 102, 0.15)"
                          : "inset 0 0 20px rgba(77, 213, 255, 0.12), 0 0 10px rgba(77, 213, 255, 0.05)",
                        display: "flex",
                        flexDirection: "column",
                        padding: "16px",
                        boxSizing: "border-box",
                        position: "relative",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <style>{`
              .crt-overlay {
                position: relative;
                overflow: hidden;
              }
              .crt-overlay::after {
                content: " ";
                display: block;
                position: absolute;
                top: 0; left: 0; bottom: 0; right: 0;
                background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.18) 50%), linear-gradient(90deg, rgba(77, 213, 255, 0.03), rgba(0, 255, 136, 0.01), rgba(255, 107, 157, 0.03));
                z-index: 99;
                background-size: 100% 3px, 6px 100%;
                pointer-events: none;
              }
              .led-blink {
                animation: led-flash 0.8s infinite steps(2);
              }
              @keyframes led-flash {
                50% { opacity: 0.25; }
              }
              .system-overload-flash {
                animation: screen-alarm 2s infinite ease-in-out;
              }
              @keyframes screen-alarm {
                0%, 100% { background-color: rgba(255, 51, 102, 0.0); }
                50% { background-color: rgba(255, 51, 102, 0.06); }
              }
              .power-adjust-btn {
                box-shadow: inset 0 0 4px rgba(77, 213, 255, 0.2);
              }
              .power-adjust-btn:hover {
                background: rgba(77, 213, 255, 0.35) !important;
                border-color: rgba(77, 213, 255, 0.8) !important;
                color: #ffffff !important;
                box-shadow: 0 0 8px rgba(77, 213, 255, 0.4);
              }
              .power-adjust-btn:active {
                transform: scale(0.92);
              }
              .system-action-btn {
                transition: all 0.25s ease;
              }
              .system-action-btn:hover:not(:disabled) {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px var(--shadow-color, rgba(77, 213, 255, 0.25));
              }
              .system-action-btn:active:not(:disabled) {
                transform: translateY(1px);
              }
              
              /* Circuit flow animation */
              .flowing-circuit {
                animation: circuit-flow 1.2s linear infinite;
              }
              @keyframes circuit-flow {
                to { stroke-dashoffset: -12; }
              }

              /* SVG node pulsing classes */
              .node-pulse-warning {
                animation: node-warning-glow 1.2s ease-in-out infinite alternate;
              }
              @keyframes node-warning-glow {
                0% { r: 9px; opacity: 0.3; stroke-width: 1px; }
                100% { r: 14px; opacity: 0.8; stroke-width: 2px; }
              }
              .node-pulse-critical {
                animation: node-critical-glow 0.6s ease-in-out infinite alternate;
              }
              @keyframes node-critical-glow {
                0% { r: 9px; opacity: 0.4; stroke-width: 1px; }
                100% { r: 16px; opacity: 0.95; stroke-width: 2.2px; }
              }

              /* Thermal plasma sparks */
              .spark-line {
                animation: spark-flash 0.15s infinite alternate;
              }
              @keyframes spark-flash {
                0% { opacity: 0.1; stroke-width: 1px; }
                100% { opacity: 1; stroke-width: 2.2px; filter: drop-shadow(0 0 4px #ff3366); }
              }

              /* Steam bubbles floating inside reactor SVG */
              .steam-bubble-svg {
                animation: float-up-svg 1.5s linear infinite;
              }
              @keyframes float-up-svg {
                0% { transform: translateY(0px) scale(0.6); opacity: 0; }
                20% { opacity: 0.8; }
                80% { opacity: 0.3; }
                100% { transform: translateY(-75px) scale(1.3); opacity: 0; }
              }

              .terminal-log-row {
                border-left: 2px solid transparent;
                padding-left: 5px;
                margin: 2px 0;
              }
              .terminal-log-row:hover {
                background: rgba(77, 213, 255, 0.05);
                border-left-color: rgba(77, 213, 255, 0.4);
              }
              .thermometer-bar-glow {
                animation: temp-pulse 2s infinite alternate;
              }
              @keyframes temp-pulse {
                0% { opacity: 0.8; }
                100% { opacity: 1; filter: brightness(1.2); }
              }
            `}</style>

                      <header style={{ fontSize: "13px", borderBottom: "1px solid rgba(79, 205, 247, 0.5)", paddingBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span className={reactorOverload ? "led-blink" : ""} style={{ width: "8px", height: "8px", borderRadius: "50%", background: systemStatusColor, boxShadow: `0 0 8px ${systemStatusColor}` }} />
                          <span style={{ fontFamily: "Consolas, monospace", fontWeight: "bold", color: "#4dd5ff", textShadow: "0 0 4px rgba(77, 213, 255, 0.4)" }}>SHIP SYSTEMS TERMINAL v4.2</span>
                        </div>
                        <span style={{ fontSize: "11px", color: systemStatusColor, fontWeight: "bold", fontFamily: "Consolas, monospace", letterSpacing: "0.08em" }}>
                          {systemStatusText}
                        </span>
                      </header>

                      <div className={`${reactorOverload ? "system-overload-flash" : ""} screen-grid-systems`} style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "20px", marginTop: "15px", flex: 1, padding: reactorOverload ? "4px" : "0", borderRadius: "4px", transition: "all 0.3s ease" }}>
                        {/* Column 1: Power Allocation & Reactor Management */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                          {/* Integration Status (Crew Profile & Audio) */}
                          <div style={{ padding: "10px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.6)", borderRadius: "4px", boxShadow: "inset 0 0 10px rgba(77, 213, 255, 0.05)" }}>
                            <div style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11px", fontFamily: "Consolas, monospace", marginBottom: "6px", letterSpacing: "0.05em" }}>INTEGRATION SYSTEM STATUS</div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "5px", fontFamily: "Consolas, monospace", fontSize: "10px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>NEURAL INTERFACE:</span>
                                <span style={{ color: commanderName ? "#00ff88" : "#ffbc4d", fontWeight: "bold", textShadow: commanderName ? "0 0 5px #00ff88" : "none" }}>
                                  {commanderName ? "LINKED (CONNECTED)" : "UNLINKED (GUEST)"}
                                </span>
                              </div>

                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>COMMANDER ID:</span>
                                {commanderName ? (
                                  <div style={{ display: "flex", alignItems: "center" }}>
                                    <span style={{ color: "#ffffff", fontWeight: "bold" }}>{commanderName.toUpperCase()}</span>
                                    <button
                                      onClick={() => { setCommanderName(""); setNameInput(""); playBeep(330, 0.15, "sine", 0.02); }}
                                      style={{ background: "rgba(255, 107, 157, 0.2)", border: "1px solid #ff6b9d", color: "#ff6b9d", padding: "1px 5px", fontSize: "8px", cursor: "pointer", marginLeft: "8px", fontFamily: "Consolas, monospace", borderRadius: "2px" }}
                                    >
                                      UNLINK
                                    </button>
                                  </div>
                                ) : (
                                  <div style={{ display: "flex", alignItems: "center" }}>
                                    <input
                                      type="text"
                                      value={nameInput}
                                      placeholder="NAME COMMANDER"
                                      maxLength={15}
                                      onChange={(e) => setNameInput(e.target.value)}
                                      style={{ background: "rgba(2, 16, 27, 0.85)", border: "1px solid rgba(77, 213, 255, 0.35)", color: "#ffffff", padding: "2px 5px", fontSize: "9px", width: "105px", fontFamily: "Consolas, monospace", borderRadius: "2px" }}
                                    />
                                    <button
                                      onClick={() => { if (nameInput.trim()) { setCommanderName(nameInput); playBeep(880, 0.15, "sine", 0.02); } }}
                                      style={{ background: "rgba(0, 255, 136, 0.2)", border: "1px solid #00ff88", color: "#00ff88", padding: "2px 6px", fontSize: "9px", cursor: "pointer", marginLeft: "4px", fontFamily: "Consolas, monospace", borderRadius: "2px", fontWeight: "bold" }}
                                    >
                                      LINK
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>AUDIO EMITTER:</span>
                                <button
                                  onClick={() => { setAudioEnabled(!audioEnabled); playBeep(audioEnabled ? 400 : 700, 0.1, "sine", 0.02); }}
                                  style={{ background: audioEnabled ? "rgba(0, 255, 136, 0.12)" : "rgba(255, 107, 157, 0.12)", border: audioEnabled ? "1px solid #00ff88" : "1px solid #ff6b9d", color: audioEnabled ? "#00ff88" : "#ff6b9d", padding: "2px 6px", fontSize: "9px", cursor: "pointer", fontFamily: "Consolas, monospace", borderRadius: "2px", fontWeight: "bold" }}
                                >
                                  {audioEnabled ? "ONLINE" : "MUTED"}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Power Allocation Routing (With interactive Draggable Tri-Vector SVG map) */}
                          <div style={{ padding: "10px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.6)", borderRadius: "4px", boxShadow: "inset 0 0 10px rgba(77, 213, 255, 0.05)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                              <span style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11px", fontFamily: "Consolas, monospace" }}>POWER ROUTING MATRIX</span>
                              <button
                                onClick={() => { setPowerAllocation(40, 30, 30); playBeep(523, 0.1, "sine", 0.02); }}
                                style={{ background: "rgba(77, 213, 255, 0.1)", border: "1px solid rgba(77, 213, 255, 0.3)", color: "#4dd5ff", padding: "1px 5px", fontSize: "8px", cursor: "pointer", fontFamily: "Consolas, monospace", borderRadius: "2px" }}
                              >
                                BALANCE
                              </button>
                            </div>

                            <div className="responsive-flex-row" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                              {/* Interactive Draggable Tri-Vector Power Graph */}
                              <div
                                style={{
                                  position: "relative",
                                  width: `${svgSize}px`,
                                  height: `${svgSize}px`,
                                  border: "1px solid rgba(77, 213, 255, 0.2)",
                                  borderRadius: "4px",
                                  background: "rgba(1, 10, 18, 0.85)",
                                  touchAction: "none"
                                }}
                              >
                                <svg
                                  width={svgSize}
                                  height={svgSize}
                                  style={{ display: "block" }}
                                  onPointerDown={handleSvgPointerDown}
                                  onPointerMove={handleSvgPointerMove}
                                  onPointerUp={handleSvgPointerUp}
                                  onPointerLeave={handleSvgPointerUp}
                                >
                                  <defs>
                                    <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                                      <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                      </feMerge>
                                    </filter>
                                  </defs>

                                  {/* Concentric Scanner/Targeter Rings */}
                                  <circle cx={cx} cy={cy} r={maxRadius * 0.25} fill="none" stroke="rgba(77, 213, 255, 0.05)" strokeWidth="1" />
                                  <circle cx={cx} cy={cy} r={maxRadius * 0.5} fill="none" stroke="rgba(77, 213, 255, 0.08)" strokeWidth="1" strokeDasharray="2,3" />
                                  <circle cx={cx} cy={cy} r={maxRadius * 0.75} fill="none" stroke="rgba(77, 213, 255, 0.05)" strokeWidth="1" />
                                  <circle cx={cx} cy={cy} r={maxRadius} fill="none" stroke="rgba(77, 213, 255, 0.15)" strokeWidth="1" />

                                  {/* Background Axis Lines */}
                                  <line x1={cx} y1={cy} x2={rx1} y2={ry1} stroke="rgba(77, 213, 255, 0.2)" strokeWidth="1" strokeDasharray="2,2" />
                                  <line x1={cx} y1={cy} x2={rx2} y2={ry2} stroke="rgba(77, 213, 255, 0.2)" strokeWidth="1" strokeDasharray="2,2" />
                                  <line x1={cx} y1={cy} x2={rx3} y2={ry3} stroke="rgba(77, 213, 255, 0.2)" strokeWidth="1" strokeDasharray="2,2" />

                                  {/* Outer Max Load Triangle Boundary */}
                                  <polygon points={`${rx1},${ry1} ${rx2},${ry2} ${rx3},${ry3}`} fill="none" stroke="rgba(77, 213, 255, 0.12)" strokeWidth="1" />

                                  {/* Center hub point */}
                                  <circle cx={cx} cy={cy} r="3" fill="#4dd5ff" opacity="0.5" />

                                  {/* Active Power Polygon */}
                                  <polygon
                                    points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                                    fill="rgba(77, 213, 255, 0.18)"
                                    stroke="#4dd5ff"
                                    strokeWidth="2"
                                    filter="url(#vectorGlow)"
                                    style={{ transition: activeDragNode ? "none" : "all 0.25s ease" }}
                                  />

                                  {/* Guideline wires to current vertex positions */}
                                  <line x1={cx} y1={cy} x2={x1} y2={y1} stroke="#ffbc4d" strokeWidth="1" strokeDasharray="1,1" opacity="0.6" style={{ transition: activeDragNode ? "none" : "all 0.25s ease" }} />
                                  <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#48d2ff" strokeWidth="1" strokeDasharray="1,1" opacity="0.6" style={{ transition: activeDragNode ? "none" : "all 0.25s ease" }} />
                                  <line x1={cx} y1={cy} x2={x3} y2={y3} stroke="#ff6b9d" strokeWidth="1" strokeDasharray="1,1" opacity="0.6" style={{ transition: activeDragNode ? "none" : "all 0.25s ease" }} />

                                  {/* Vertices handles */}
                                  {/* Shields vertex */}
                                  <circle cx={x1} cy={y1} r="5.5" fill="#ffbc4d" stroke="#ffffff" strokeWidth="1.2" style={{ cursor: "ns-resize", transition: activeDragNode ? "none" : "all 0.25s ease" }} />
                                  <circle cx={x1} cy={y1} r="14" fill="transparent" style={{ cursor: "ns-resize", pointerEvents: "all" }} />

                                  {/* Engines vertex */}
                                  <circle cx={x2} cy={y2} r="5.5" fill="#48d2ff" stroke="#ffffff" strokeWidth="1.2" style={{ cursor: "pointer", transition: activeDragNode ? "none" : "all 0.25s ease" }} />
                                  <circle cx={x2} cy={y2} r="14" fill="transparent" style={{ cursor: "pointer", pointerEvents: "all" }} />

                                  {/* Life Support vertex */}
                                  <circle cx={x3} cy={y3} r="5.5" fill="#ff6b9d" stroke="#ffffff" strokeWidth="1.2" style={{ cursor: "pointer", transition: activeDragNode ? "none" : "all 0.25s ease" }} />
                                  <circle cx={x3} cy={y3} r="14" fill="transparent" style={{ cursor: "pointer", pointerEvents: "all" }} />

                                  {/* Axis abbreviations */}
                                  <text x={rx1} y={ry1 - 3} fill="#ffbc4d" fontSize="7.5px" fontFamily="Consolas, monospace" textAnchor="middle" fontWeight="bold">SHD</text>
                                  <text x={rx2 + 4} y={ry2 + 2} fill="#48d2ff" fontSize="7.5px" fontFamily="Consolas, monospace" textAnchor="start" fontWeight="bold">ENG</text>
                                  <text x={rx3 - 4} y={ry3 + 2} fill="#ff6b9d" fontSize="7.5px" fontFamily="Consolas, monospace" textAnchor="end" fontWeight="bold">LIF</text>
                                </svg>
                                {activeDragNode && (
                                  <div style={{ position: "absolute", top: "2px", left: "2px", background: "rgba(0,0,0,0.75)", color: "#00ff88", padding: "1px 4px", fontSize: "7px", fontFamily: "Consolas, monospace", borderRadius: "2px" }}>
                                    DRAGGING...
                                  </div>
                                )}
                              </div>

                              {/* Numeric Allocator Sliders */}
                              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Consolas, monospace" }}>
                                {/* Deflector Shields */}
                                <div>
                                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9.5px", marginBottom: "1px" }}>
                                    <span style={{ color: "#ffbc4d" }}>🛡️ SHIELDS</span>
                                    <span style={{ color: "#ffbc4d", fontWeight: "bold" }}>{powerShields}%</span>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <button onClick={() => adjustPower("shields", -5)} className="power-adjust-btn" style={powerButtonStyle}>-</button>
                                    <div style={{ flex: 1, height: "5px", background: "rgba(255, 188, 77, 0.12)", borderRadius: "2px", overflow: "hidden" }}>
                                      <div style={{ width: `${powerShields}%`, height: "100%", background: "#ffbc4d", transition: activeDragNode === "shields" ? "none" : "width 0.25s ease" }} />
                                    </div>
                                    <button onClick={() => adjustPower("shields", 5)} className="power-adjust-btn" style={powerButtonStyle}>+</button>
                                  </div>
                                </div>

                                {/* Thrust / Engines */}
                                <div>
                                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9.5px", marginBottom: "1px" }}>
                                    <span style={{ color: "#48d2ff" }}>⚡ ENGINES</span>
                                    <span style={{ color: "#48d2ff", fontWeight: "bold" }}>{powerEngines}%</span>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <button onClick={() => adjustPower("engines", -5)} className="power-adjust-btn" style={powerButtonStyle}>-</button>
                                    <div style={{ flex: 1, height: "5px", background: "rgba(72, 210, 255, 0.12)", borderRadius: "2px", overflow: "hidden" }}>
                                      <div style={{ width: `${powerEngines}%`, height: "100%", background: "#48d2ff", transition: activeDragNode === "engines" ? "none" : "width 0.25s ease" }} />
                                    </div>
                                    <button onClick={() => adjustPower("engines", 5)} className="power-adjust-btn" style={powerButtonStyle}>+</button>
                                  </div>
                                </div>

                                {/* Life Support */}
                                <div>
                                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9.5px", marginBottom: "1px" }}>
                                    <span style={{ color: "#ff6b9d" }}>❤️ LIFE SUPPORT</span>
                                    <span style={{ color: "#ff6b9d", fontWeight: "bold" }}>{powerLifeSupport}%</span>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <button onClick={() => adjustPower("lifeSupport", -5)} className="power-adjust-btn" style={powerButtonStyle}>-</button>
                                    <div style={{ flex: 1, height: "5px", background: "rgba(255, 107, 157, 0.12)", borderRadius: "2px", overflow: "hidden" }}>
                                      <div style={{ width: `${powerLifeSupport}%`, height: "100%", background: "#ff6b9d", transition: activeDragNode === "lifeSupport" ? "none" : "width 0.25s ease" }} />
                                    </div>
                                    <button onClick={() => adjustPower("lifeSupport", 5)} className="power-adjust-btn" style={powerButtonStyle}>+</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Reactor Heat Core & Thermal Vent Controls */}
                          <div style={{ padding: "10px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.6)", borderRadius: "4px", display: "flex", flexDirection: "column", gap: "8px", boxShadow: "inset 0 0 10px rgba(77, 213, 255, 0.05)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Consolas, monospace" }}>
                              <span style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11px" }}>REACTOR CONTAINMENT VESSEL</span>
                              <span style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: coolantTemp > 75 ? (coolantTemp > 95 ? "#ff3366" : "#ffbc4d") : "#00ff88"
                              }}>
                                {coolantTemp.toFixed(1)}°C
                              </span>
                            </div>

                            <div className="responsive-flex-row" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                              {/* Visual Reactor Chamber Cylinder SVG */}
                              <div style={{ position: "relative", width: "90px", height: "138px", background: "rgba(1, 8, 16, 0.6)", border: "1px solid rgba(77, 213, 255, 0.2)", borderRadius: "4px" }}>
                                <svg width="90" height="138" style={{ display: "block" }}>
                                  <defs>
                                    <linearGradient id="plasmaNominal" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#00ff88" stopOpacity="0.8" />
                                      <stop offset="100%" stopColor="#004411" stopOpacity="0.9" />
                                    </linearGradient>
                                    <linearGradient id="plasmaWarning" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#ffbc4d" stopOpacity="0.8" />
                                      <stop offset="100%" stopColor="#884400" stopOpacity="0.9" />
                                    </linearGradient>
                                    <linearGradient id="plasmaCritical" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#ff3366" stopOpacity="0.85" />
                                      <stop offset="100%" stopColor="#880022" stopOpacity="0.95" />
                                    </linearGradient>
                                  </defs>

                                  {/* Measurement Ticks */}
                                  <line x1="18" y1="15" x2="23" y2="15" stroke="rgba(77, 213, 255, 0.4)" strokeWidth="1" />
                                  <line x1="18" y1="42.5" x2="23" y2="42.5" stroke="rgba(77, 213, 255, 0.4)" strokeWidth="1" />
                                  <line x1="18" y1="70" x2="23" y2="70" stroke="rgba(77, 213, 255, 0.4)" strokeWidth="1" />
                                  <line x1="18" y1="97.5" x2="23" y2="97.5" stroke="rgba(77, 213, 255, 0.4)" strokeWidth="1" />
                                  <line x1="18" y1="125" x2="23" y2="125" stroke="rgba(77, 213, 255, 0.4)" strokeWidth="1" />

                                  {/* Labels */}
                                  <text x="8" y="17" fill="rgba(77, 213, 255, 0.5)" fontSize="5.5px" fontFamily="Consolas, monospace" textAnchor="start">120C</text>
                                  <text x="8" y="44.5" fill="rgba(77, 213, 255, 0.5)" fontSize="5.5px" fontFamily="Consolas, monospace" textAnchor="start">90C</text>
                                  <text x="8" y="72" fill="rgba(77, 213, 255, 0.5)" fontSize="5.5px" fontFamily="Consolas, monospace" textAnchor="start">60C</text>
                                  <text x="8" y="99.5" fill="rgba(77, 213, 255, 0.5)" fontSize="5.5px" fontFamily="Consolas, monospace" textAnchor="start">30C</text>
                                  <text x="8" y="127" fill="rgba(77, 213, 255, 0.5)" fontSize="5.5px" fontFamily="Consolas, monospace" textAnchor="start">0C</text>

                                  {/* Glass Cylinder chamber */}
                                  <rect x="30" y="10" width="40" height="118" rx="6" fill="rgba(1, 14, 22, 0.7)" stroke="rgba(77, 213, 255, 0.3)" strokeWidth="1" />

                                  {/* Plasma Fluid Column */}
                                  <rect
                                    x="34"
                                    y={coreY}
                                    width="32"
                                    height={coreHeight}
                                    rx="3"
                                    fill={coolantTemp > 75 ? (coolantTemp > 95 ? "url(#plasmaCritical)" : "url(#plasmaWarning)") : "url(#plasmaNominal)"}
                                    filter="url(#vectorGlow)"
                                    style={{ transition: "y 0.2s ease, height 0.2s ease" }}
                                  />

                                  {/* Flashing sparks on Overload */}
                                  {reactorOverload && (
                                    <>
                                      <path d="M 38 110 L 62 85 L 38 55 L 58 25" fill="none" stroke="#ff3366" strokeWidth="1.2" className="spark-line" />
                                      <path d="M 58 100 L 36 70 L 60 40 L 40 20" fill="none" stroke="#ffffff" strokeWidth="1.2" className="spark-line" style={{ animationDelay: "0.08s" }} />
                                    </>
                                  )}

                                  {/* Coolant Steam bubbles inside SVG column */}
                                  {coolantVentActive && (
                                    <g style={{ pointerEvents: "none" }}>
                                      <circle cx="42" cy="115" r="2" fill="rgba(134, 225, 255, 0.75)" className="steam-bubble-svg" style={{ animationDelay: "0s" }} />
                                      <circle cx="56" cy="120" r="1.5" fill="rgba(134, 225, 255, 0.65)" className="steam-bubble-svg" style={{ animationDelay: "0.3s" }} />
                                      <circle cx="48" cy="112" r="2.5" fill="rgba(134, 225, 255, 0.8)" className="steam-bubble-svg" style={{ animationDelay: "0.6s" }} />
                                      <circle cx="38" cy="118" r="1.8" fill="rgba(134, 225, 255, 0.7)" className="steam-bubble-svg" style={{ animationDelay: "0.9s" }} />
                                      <circle cx="52" cy="116" r="2.2" fill="rgba(134, 225, 255, 0.75)" className="steam-bubble-svg" style={{ animationDelay: "1.2s" }} />
                                    </g>
                                  )}

                                  {/* Metallic braces */}
                                  <rect x="26" y="5" width="48" height="6" rx="1" fill="rgba(77, 213, 255, 0.6)" stroke="rgba(77, 213, 255, 0.8)" strokeWidth="0.8" />
                                  <rect x="26" y="127" width="48" height="6" rx="1" fill="rgba(77, 213, 255, 0.6)" stroke="rgba(77, 213, 255, 0.8)" strokeWidth="0.8" />
                                </svg>
                              </div>

                              {/* Meltdown warnings and control buttons */}
                              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                                {reactorOverload && (
                                  <div className="led-blink" style={{ background: "rgba(255, 51, 102, 0.15)", border: "1px solid #ff3366", borderRadius: "3px", padding: "5px", color: "#ff3366", textAlign: "center", fontSize: "8.5px", fontFamily: "Consolas, monospace", fontWeight: "bold", letterSpacing: "0.02em" }}>
                                    ⚠️ CORE CRITICAL: REACTOR MELTDOWN ACTIVE T-MINUS {overloadTimeRemaining}s
                                  </div>
                                )}

                                <button
                                  onClick={handleVentCoolant}
                                  disabled={coolantVentActive}
                                  className="system-action-btn"
                                  style={{
                                    width: "100%",
                                    background: coolantVentActive ? "rgba(0, 255, 136, 0.05)" : "rgba(0, 255, 136, 0.18)",
                                    border: coolantVentActive ? "1px solid rgba(0, 255, 136, 0.2)" : "1px solid #00ff88",
                                    color: coolantVentActive ? "rgba(0, 255, 136, 0.5)" : "#00ff88",
                                    padding: "8px",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    fontFamily: "Consolas, monospace",
                                    cursor: coolantVentActive ? "default" : "pointer",
                                    borderRadius: "3px",
                                    textShadow: coolantVentActive ? "none" : "0 0 5px #00ff88",
                                    "--shadow-color": "rgba(0, 255, 136, 0.3)"
                                  } as React.CSSProperties}
                                >
                                  {coolantVentActive ? "❄️ VENTING CORE THERMALS..." : "❄️ VENT CORE COOLANT"}
                                </button>

                                <button
                                  onClick={() => {
                                    setReactorOverload(!reactorOverload);
                                    playBeep(reactorOverload ? 300 : 900, 0.2, "sawtooth", 0.02);
                                  }}
                                  className="system-action-btn"
                                  style={{
                                    width: "100%",
                                    background: reactorOverload ? "rgba(255, 51, 102, 0.22)" : "rgba(255, 51, 102, 0.06)",
                                    border: reactorOverload ? "2px solid #ff3366" : "1px solid rgba(255, 51, 102, 0.45)",
                                    color: "#ff3366",
                                    padding: "8px",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                    fontFamily: "Consolas, monospace",
                                    cursor: "pointer",
                                    borderRadius: "3px",
                                    boxShadow: reactorOverload ? "0 0 10px rgba(255, 51, 102, 0.35)" : "none",
                                    textShadow: "0 0 5px rgba(255, 51, 102, 0.3)",
                                    "--shadow-color": "rgba(255, 51, 102, 0.3)"
                                  } as React.CSSProperties}
                                >
                                  {reactorOverload ? "💥 ABORT CORE OVERLOAD" : "💥 CORE OVERLOAD JUMP"}
                                </button>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Column 2: Buffer Matrix & Diagnostics Terminal */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                          {/* Buffer Matrix Grid (Circuit Board SVG Node Schema) */}
                          <div style={{ padding: "10px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.6)", borderRadius: "4px", boxShadow: "inset 0 0 10px rgba(77, 213, 255, 0.05)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                              <div>
                                <span style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11px", fontFamily: "Consolas, monospace" }}>CORE BUFFER MATRIX SCHEMATIC</span>
                                <div style={{ fontSize: "9px", color: systemStatusColor, fontFamily: "Consolas, monospace", marginTop: "1px" }}>
                                  INTEGRITY: {matrixStabilityScore}% SYNCED
                                </div>
                              </div>

                              <button
                                onClick={handleCalibrateMatrix}
                                className="system-action-btn"
                                style={{
                                  background: "rgba(0, 255, 136, 0.15)",
                                  border: "1px solid rgba(0, 255, 136, 0.4)",
                                  color: "#00ff88",
                                  padding: "3px 8px",
                                  fontSize: "8.5px",
                                  cursor: "pointer",
                                  fontFamily: "Consolas, monospace",
                                  borderRadius: "2px",
                                  fontWeight: "bold",
                                  "--shadow-color": "rgba(0, 255, 136, 0.25)"
                                } as React.CSSProperties}
                              >
                                AUTO SYNC
                              </button>
                            </div>

                            {/* Schematic circuit grid SVG */}
                            <div style={{ width: "100%", height: "125px", background: "rgba(1, 10, 18, 0.8)", border: "1px solid rgba(77, 213, 255, 0.15)", borderRadius: "3px", position: "relative", overflow: "hidden" }}>
                              <svg width="100%" height="100%" viewBox="0 0 420 120" style={{ display: "block" }}>
                                <defs>
                                  <linearGradient id="sweepGlow" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="#00ff88" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="transparent" />
                                  </linearGradient>
                                </defs>

                                {/* Horizontal bus tracks */}
                                {Array.from({ length: 4 }).map((_, r) => {
                                  const y = 24 * (r + 1);
                                  return (
                                    <line key={`h-${r}`} x1="15" y1={y} x2="405" y2={y} stroke="rgba(77, 213, 255, 0.1)" strokeWidth="1" />
                                  );
                                })}

                                {/* Vertical bus tracks */}
                                {Array.from({ length: 6 }).map((_, c) => {
                                  const x = 60 * (c + 1);
                                  return (
                                    <line key={`v-${c}`} x1={x} y1="12" x2={x} y2="108" stroke="rgba(77, 213, 255, 0.1)" strokeWidth="1" />
                                  );
                                })}

                                {/* Neural micro-paths / diagonals */}
                                <line x1="60" y1="24" x2="120" y2="48" stroke="rgba(77, 213, 255, 0.08)" strokeWidth="0.8" />
                                <line x1="180" y1="48" x2="240" y2="72" stroke="rgba(77, 213, 255, 0.08)" strokeWidth="0.8" />
                                <line x1="300" y1="72" x2="360" y2="96" stroke="rgba(77, 213, 255, 0.08)" strokeWidth="0.8" />
                                <line x1="120" y1="96" x2="180" y2="72" stroke="rgba(77, 213, 255, 0.08)" strokeWidth="0.8" />
                                <line x1="240" y1="24" x2="300" y2="48" stroke="rgba(77, 213, 255, 0.08)" strokeWidth="0.8" />

                                {/* Glowing tracks linking unstable/critical nodes to their neighbors */}
                                {bufferMatrix.map((cell, index) => {
                                  if (cell === 0) return null;
                                  const r = Math.floor(index / 6);
                                  const c = index % 6;
                                  const x = 60 * (c + 1);
                                  const y = 24 * (r + 1);
                                  const color = cell === 1 ? "#ffbc4d" : "#ff3366";

                                  return (
                                    <g key={`flow-${index}`}>
                                      {c < 5 && (
                                        <line
                                          x1={x} y1={y} x2={x + 60} y2={y}
                                          stroke={color} strokeWidth="1.2"
                                          strokeDasharray="4,4" className="flowing-circuit"
                                          opacity="0.65"
                                        />
                                      )}
                                      {r < 3 && (
                                        <line
                                          x1={x} y1={y} x2={x} y2={y + 24}
                                          stroke={color} strokeWidth="1.2"
                                          strokeDasharray="4,4" className="flowing-circuit"
                                          opacity="0.65"
                                        />
                                      )}
                                    </g>
                                  );
                                })}

                                {/* Nodes mapping */}
                                {bufferMatrix.map((cell, index) => {
                                  const r = Math.floor(index / 6);
                                  const c = index % 6;
                                  const cx = 60 * (c + 1);
                                  const cy = 24 * (r + 1);

                                  let color = "rgba(77, 213, 255, 0.55)";
                                  let glowClass = "";

                                  if (cell === 1) {
                                    color = "#ffbc4d";
                                    glowClass = "node-pulse-warning";
                                  } else if (cell === 2) {
                                    color = "#ff3366";
                                    glowClass = "node-pulse-critical";
                                  }

                                  return (
                                    <g key={`node-${index}`}>
                                      {/* Glowing outer ring */}
                                      {glowClass && (
                                        <circle cx={cx} cy={cy} r="10" fill="none" stroke={color} strokeWidth="1" className={glowClass} />
                                      )}

                                      {/* Inner Node Circle */}
                                      <circle
                                        cx={cx}
                                        cy={cy}
                                        r="8.5"
                                        fill={cell === 0 ? "rgba(1, 14, 22, 0.95)" : (cell === 1 ? "rgba(255, 188, 77, 0.2)" : "rgba(255, 51, 102, 0.2)")}
                                        stroke={cell === 0 ? "rgba(77, 213, 255, 0.55)" : color}
                                        strokeWidth="1.3"
                                      />

                                      {/* Node number text */}
                                      <text
                                        x={cx}
                                        y={cy + 2.5}
                                        fill={cell === 0 ? "#4dd5ff" : color}
                                        fontSize="6.5px"
                                        fontFamily="Consolas, monospace"
                                        textAnchor="middle"
                                        fontWeight="bold"
                                        style={{ pointerEvents: "none", userSelect: "none" }}
                                      >
                                        {(index + 1).toString().padStart(2, "0")}
                                      </text>

                                      {/* Node click target overlay */}
                                      <circle
                                        cx={cx}
                                        cy={cy}
                                        r="13"
                                        fill="transparent"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleCellClick(index)}
                                      />
                                    </g>
                                  );
                                })}

                                {/* Calibration Green Scan Sweep Line */}
                                {matrixCalibrating && (
                                  <g>
                                    <rect
                                      x={sweepPosition - 15}
                                      y="8"
                                      width="30"
                                      height="104"
                                      fill="url(#sweepGlow)"
                                      style={{ transition: "x 0.05s linear", pointerEvents: "none" }}
                                    />
                                    <line
                                      x1={sweepPosition}
                                      y1="8"
                                      x2={sweepPosition}
                                      y2="112"
                                      stroke="#00ff88"
                                      strokeWidth="2.5"
                                      filter="url(#vectorGlow)"
                                      style={{ transition: "x 0.05s linear", pointerEvents: "none" }}
                                    />
                                  </g>
                                )}
                              </svg>
                            </div>
                          </div>

                          {/* Diagnostics Scanner Console with CLI prompt input */}
                          <div style={{ padding: "10px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.6)", borderRadius: "4px", flex: 1, display: "flex", flexDirection: "column", boxShadow: "inset 0 0 10px rgba(77, 213, 255, 0.05)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                              <span style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11px", fontFamily: "Consolas, monospace" }}>DIAGNOSTICS PROTOCOL FEED</span>
                              <div style={{ display: "flex", gap: "6px" }}>
                                {diagnosticStatus !== "RUNNING" && (
                                  <button
                                    onClick={runDiagnostics}
                                    className="system-action-btn"
                                    style={{
                                      background: "rgba(77, 213, 255, 0.15)",
                                      border: "1px solid rgba(77, 213, 255, 0.4)",
                                      color: "#4dd5ff",
                                      padding: "2px 8px",
                                      fontSize: "8.5px",
                                      cursor: "pointer",
                                      fontFamily: "Consolas, monospace",
                                      borderRadius: "2px",
                                      fontWeight: "bold",
                                      "--shadow-color": "rgba(77, 213, 255, 0.25)"
                                    } as React.CSSProperties}
                                  >
                                    RUN SCAN
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    setDiagnosticState(diagnosticStatus, diagnosticProgress, []);
                                    playBeep(300, 0.1, "sine", 0.02);
                                  }}
                                  className="system-action-btn"
                                  disabled={diagnosticStatus === "RUNNING"}
                                  style={{
                                    background: diagnosticStatus === "RUNNING" ? "rgba(255, 107, 157, 0.05)" : "rgba(255, 107, 157, 0.15)",
                                    border: diagnosticStatus === "RUNNING" ? "1px solid rgba(255, 107, 157, 0.2)" : "1px solid rgba(255, 107, 157, 0.45)",
                                    color: diagnosticStatus === "RUNNING" ? "rgba(255, 107, 157, 0.4)" : "#ff6b9d",
                                    padding: "2px 8px",
                                    fontSize: "8.5px",
                                    cursor: diagnosticStatus === "RUNNING" ? "not-allowed" : "pointer",
                                    fontFamily: "Consolas, monospace",
                                    borderRadius: "2px",
                                    fontWeight: "bold",
                                    "--shadow-color": "rgba(255, 107, 157, 0.25)"
                                  } as React.CSSProperties}
                                >
                                  CLEAR
                                </button>
                              </div>
                            </div>

                            {/* Terminal Frame (logs + CLI input combined) */}
                            <div style={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              background: "#010e16",
                              border: "1px solid rgba(77, 213, 255, 0.18)",
                              borderRadius: "3px",
                              overflow: "hidden"
                            }}>
                              {/* Log display */}
                              <div style={{
                                flex: 1,
                                padding: "8px 8px 4px 8px",
                                fontFamily: "Consolas, monospace",
                                fontSize: "9.5px",
                                color: "#aae5ff",
                                overflowY: "auto",
                                height: "85px",
                                lineHeight: "1.3",
                                boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.8)"
                              }}>
                                {diagnosticLogs.length === 0 ? (
                                  <span style={{ opacity: 0.45, fontStyle: "italic" }}>
                                    Terminal standby. Awaiting diagnostic handshake sequence...
                                    <span className="led-blink" style={{ color: "#4dd5ff", fontWeight: "bold" }}> _</span>
                                  </span>
                                ) : (
                                  <>
                                    {diagnosticLogs.map((log, index) => (
                                      <div key={index} className="terminal-log-row" style={{
                                        color: log.includes("[COMPLETE]") || log.includes("[SUCCESS]")
                                          ? "#00ff88"
                                          : (log.includes("[CHECK]") || log.includes("WARNING") ? "#ffbc4d" : (log.includes("[INIT]") || log.includes("> ") ? "#4dd5ff" : "#aae5ff")),
                                        textShadow: log.includes("[SUCCESS]") ? "0 0 4px #00ff88" : "none",
                                        fontWeight: log.startsWith(">") ? "bold" : "normal"
                                      }}>
                                        {log}
                                      </div>
                                    ))}
                                    {diagnosticStatus === "RUNNING" && (
                                      <div className="led-blink" style={{ color: "#4dd5ff", fontWeight: "bold", paddingLeft: "5px" }}>
                                        SCANNING ACTIVE_
                                      </div>
                                    )}
                                    <div ref={terminalEndRef} />
                                  </>
                                )}
                              </div>

                              {/* Interactive CLI Console Input */}
                              <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                borderTop: "1px solid rgba(77, 213, 255, 0.15)",
                                padding: "4px 8px",
                                background: "rgba(2, 16, 27, 0.9)",
                                fontFamily: "Consolas, monospace",
                                fontSize: "9px"
                              }}>
                                <span style={{ color: "#4dd5ff", fontWeight: "bold" }}>SYS@COCKPIT:~$</span>
                                <input
                                  type="text"
                                  value={commandInput}
                                  onChange={(e) => setCommandInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    // Mechanical type sound beep
                                    const rand = 750 + Math.random() * 450;
                                    playBeep(rand, 0.015, "sine", 0.008);

                                    if (e.key === "Enter") {
                                      executeTerminalCommand();
                                    }
                                  }}
                                  placeholder="Type system commands (e.g. 'help', 'status', 'scan')..."
                                  style={{
                                    flex: 1,
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    color: "#ffffff",
                                    fontFamily: "Consolas, monospace",
                                    fontSize: "9px",
                                    caretColor: "#4dd5ff"
                                  }}
                                />
                              </div>
                            </div>

                            {/* Progress Indicator Bar */}
                            {diagnosticStatus === "RUNNING" && (
                              <div style={{ marginTop: "6px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8px", fontFamily: "Consolas, monospace", color: "#4dd5ff", marginBottom: "2px" }}>
                                  <span>DIAGNOSTIC PROCESS ANALYSIS</span>
                                  <span>{diagnosticProgress}%</span>
                                </div>
                                <div style={{ height: "4px", background: "rgba(77, 213, 255, 0.1)", borderRadius: "2px", overflow: "hidden" }}>
                                  <div style={{ width: `${diagnosticProgress}%`, height: "100%", background: "#4dd5ff", boxShadow: "0 0 6px #4dd5ff", transition: "width 0.15s ease" }} />
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>

                      {/* Footer containing reactor stats */}
                      <footer style={{ marginTop: "10px", fontSize: "10px", borderTop: "1px solid rgba(79, 205, 247, 0.45)", paddingTop: "8px", display: "flex", justifyContent: "space-between", fontFamily: "Consolas, monospace" }}>
                        <span style={{ color: reactorOverload ? "#ff3366" : "#86e1ff", fontWeight: reactorOverload ? "bold" : "normal" }}>
                          CORE MASS REACTOR: {corePercent}% POWER OUT {reactorOverload && `[ALERT - OVERHEAT SEQUENCE ACTIVE]`}
                        </span>
                        <span style={{ color: "rgba(134, 225, 255, 0.7)" }}>
                          STRUCTURAL HULL: 100% // CORE NODE MAINFRAME: {matrixStabilityScore}% CALIBRATED
                        </span>
                      </footer>
                    </div>
                    );
      }
                    case "flight-data": {
                      const speedMultiplier = (engineThrottle / 100) * 9.99;
                      const speedText = speedMultiplier === 0 ? "0.00c (STANDBY)" : `${speedMultiplier.toFixed(2)}c (WARP DRIVE)`;
                      
                      const accelForce = (engineThrottle / 100) * 4.25;
                      const accelText = accelForce === 0 ? "0.00g (INERTIAL DAMPENERS ACTIVE)" : `${accelForce.toFixed(2)}g`;

                      const shipStatusLabel = engineThrottle === 0 
                        ? "DOCKED (ORBIT)" 
                        : (engineThrottle > 80 ? "🔥 JUMP ENGINE OVERLOAD" : "🌌 STEADY CRUISE");

                      const statusLabelColor = engineThrottle === 0 
                        ? "#00ff88" 
                        : (engineThrottle > 80 ? "#ff3366" : "#4dd5ff");

                      const fuelConsumption = (engineThrottle * 1.85).toFixed(1);
                      
                      // Oscilloscope dynamic path math
                      const oscW = 160;
                      const oscH = 75;
                      const centerY = oscH / 2;
                      let oscPoints: string[] = [];
                      
                      for (let x = 0; x <= oscW; x += 3) {
                        const angle = (x / oscW) * waveFreq * Math.PI * 2 - wavePhase * 1.8;
                        const noise = (Math.random() - 0.5) * waveNoise * 1.2;
                        const y = centerY + Math.sin(angle) * (waveAmp * 0.7) + noise;
                        oscPoints.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
                      }
                      const oscPath = oscPoints.join(" ");

                      // Radar sweep rotation
                      const radarSweepAngle = (wavePhase * (180 / Math.PI)) % 360;

                      return (
                        <div 
                          className="instrument-screen telemetry-display crt-overlay" 
                          style={{ 
                            width: "100%", 
                            height: "100%", 
                            border: "1px solid rgba(77, 213, 255, 0.3)", 
                            background: "radial-gradient(circle at center, rgba(3, 20, 36, 0.85) 0%, rgba(1, 8, 16, 0.98) 100%)", 
                            boxShadow: "inset 0 0 20px rgba(77, 213, 255, 0.12), 0 0 10px rgba(77, 213, 255, 0.05)", 
                            display: "flex", 
                            flexDirection: "column", 
                            padding: "15px", 
                            boxSizing: "border-box" 
                          }}
                        >
                          <style>{`
                            .telemetry-tab {
                              background: rgba(77, 213, 255, 0.06);
                              border: 1px solid rgba(77, 213, 255, 0.2);
                              color: rgba(134, 225, 255, 0.7);
                              padding: 4px 10px;
                              font-size: 9px;
                              font-family: "Consolas, monospace";
                              font-weight: bold;
                              cursor: pointer;
                              border-radius: 3px;
                              transition: all 0.15s ease;
                              display: flex;
                              align-items: center;
                              gap: 4px;
                            }
                            .telemetry-tab:hover {
                              background: rgba(77, 213, 255, 0.15);
                              color: #ffffff;
                            }
                            .telemetry-tab.active {
                              background: rgba(77, 213, 255, 0.25);
                              border-color: #4dd5ff;
                              color: #ffffff;
                              box-shadow: 0 0 8px rgba(77, 213, 255, 0.35);
                              text-shadow: 0 0 3px #ffffff;
                            }
                            .flight-adjust-btn {
                              background: rgba(77, 213, 255, 0.12);
                              border: 1px solid rgba(77, 213, 255, 0.35);
                              color: #4dd5ff;
                              padding: 2px 7px;
                              font-size: 8.5px;
                              font-family: "Consolas, monospace";
                              font-weight: bold;
                              cursor: pointer;
                              border-radius: 2px;
                              transition: all 0.15s ease;
                            }
                            .flight-adjust-btn:hover {
                              background: rgba(77, 213, 255, 0.35);
                              color: #ffffff;
                              box-shadow: 0 0 6px rgba(77, 213, 255, 0.3);
                            }
                            .flight-adjust-btn:active {
                              transform: scale(0.92);
                            }
                            .tuner-slider {
                              -webkit-appearance: none;
                              appearance: none;
                              width: 100%;
                              height: 4px;
                              background: rgba(77, 213, 255, 0.15);
                              border-radius: 2px;
                              outline: none;
                            }
                            .tuner-slider::-webkit-slider-thumb {
                              -webkit-appearance: none;
                              appearance: none;
                              width: 10px;
                              height: 10px;
                              border-radius: 50%;
                              background: #4dd5ff;
                              cursor: pointer;
                              box-shadow: 0 0 6px #4dd5ff;
                              border: 1px solid #ffffff;
                            }
                            .vertical-throttle-track {
                              position: relative;
                              width: 24px;
                              height: 120px;
                              background: rgba(1, 14, 22, 0.85);
                              border: 1px solid rgba(77, 213, 255, 0.3);
                              border-radius: 3px;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              padding: 5px 0;
                              box-sizing: border-box;
                            }
                            .vertical-throttle-input {
                              -webkit-appearance: none;
                              appearance: none;
                              width: 5px;
                              height: 110px;
                              background: rgba(77, 213, 255, 0.15);
                              outline: none;
                              border-radius: 2px;
                            }
                            .vertical-throttle-input::-webkit-slider-runnable-track {
                              width: 5px;
                              background: rgba(77, 213, 255, 0.15);
                            }
                            .vertical-throttle-input::-webkit-slider-thumb {
                              -webkit-appearance: none;
                              appearance: none;
                              width: 20px;
                              height: 8px;
                              background: #ff3366;
                              border: 1px solid #ffffff;
                              border-radius: 2px;
                              cursor: ns-resize;
                              box-shadow: 0 0 8px #ff3366;
                            }
                          `}</style>

                          <header style={{ fontSize: "13px", borderBottom: "1px solid rgba(79, 205, 247, 0.5)", paddingBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <span className={engineThrottle > 80 ? "led-blink" : ""} style={{ width: "8px", height: "8px", borderRadius: "50%", background: statusLabelColor, boxShadow: `0 0 8px ${statusLabelColor}` }} />
                              <span style={{ fontFamily: "Consolas, monospace", fontWeight: "bold", color: "#4dd5ff", textShadow: "0 0 4px rgba(77, 213, 255, 0.4)" }}>SHIP FLIGHT TELEMETRY SYSTEM</span>
                            </div>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button onClick={() => { setTelemetryMode("propulsion"); playBeep(580, 0.08, "sine", 0.02); }} className={`telemetry-tab ${telemetryMode === "propulsion" ? "active" : ""}`}>🚀 PROPULSION</button>
                              <button onClick={() => { setTelemetryMode("attitude"); playBeep(650, 0.08, "sine", 0.02); }} className={`telemetry-tab ${telemetryMode === "attitude" ? "active" : ""}`}>📐 ATTITUDE HUD</button>
                              <button onClick={() => { setTelemetryMode("spectrum"); playBeep(720, 0.08, "sine", 0.02); }} className={`telemetry-tab ${telemetryMode === "spectrum" ? "active" : ""}`}>📊 WAVE SPECTRA</button>
                            </div>
                          </header>

                          <div className="screen-grid-flight" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "20px", marginTop: "15px", flex: 1 }}>
                            {/* Left Column: Interactive Telemetry HUD based on Mode */}
                            <div style={{ padding: "12px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.6)", borderRadius: "4px", display: "flex", flexDirection: "column", boxShadow: "inset 0 0 10px rgba(77, 213, 255, 0.05)" }}>
                              
                              {telemetryMode === "propulsion" && (
                                <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
                                  <span style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11.5px", fontFamily: "Consolas, monospace", letterSpacing: "0.05em" }}>ENGINE THRUST CONTROL MAIN</span>
                                  
                                  <div className="responsive-flex-row" style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1 }}>
                                    {/* Vertical Throttle Lever */}
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                                      <span style={{ fontSize: "8px", fontFamily: "Consolas, monospace", color: "rgba(134, 225, 255, 0.6)" }}>WARP</span>
                                      <div className="vertical-throttle-track">
                                        <input 
                                          type="range" 
                                          min="0" 
                                          max="100" 
                                          value={engineThrottle} 
                                          disabled={warpBoostActive}
                                          onChange={(e) => setEngineThrottle(Number(e.target.value))}
                                          className="vertical-throttle-input"
                                          style={{
                                            transform: "rotate(270deg)", 
                                            width: "110px",
                                            cursor: warpBoostActive ? "not-allowed" : "ns-resize"
                                          }}
                                        />
                                      </div>
                                      <span style={{ fontSize: "8px", fontFamily: "Consolas, monospace", color: "rgba(134, 225, 255, 0.6)" }}>IDLE</span>
                                    </div>

                                    {/* Starfield Visualizer Canvas */}
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                                      <span style={{ fontSize: "8px", fontFamily: "Consolas, monospace", color: "rgba(134, 225, 255, 0.6)" }}>WINDOW HUD</span>
                                      <canvas 
                                        ref={canvasRefPropulsion} 
                                        width={140} 
                                        height={120} 
                                        style={{ 
                                          border: "1px solid rgba(77, 213, 255, 0.25)", 
                                          borderRadius: "3px", 
                                          boxShadow: "inset 0 0 10px rgba(0,0,0,0.8), 0 0 4px rgba(77, 213, 255, 0.15)",
                                          display: "block" 
                                        }} 
                                      />
                                    </div>

                                    {/* Throttle Status Display */}
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Consolas, monospace" }}>
                                      <div>
                                        <div style={{ fontSize: "8.5px", color: "rgba(134, 225, 255, 0.65)", marginBottom: "1px" }}>THRUST INJECTOR VALUE</div>
                                        <b style={{ fontSize: "16px", color: statusLabelColor, textShadow: `0 0 6px ${statusLabelColor}` }}>
                                          {engineThrottle}% {warpBoostActive ? "BOOST" : "LOAD"}
                                        </b>
                                      </div>

                                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "9px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(77,213,255,0.15)", paddingBottom: "2px" }}>
                                          <span>MULTIPLIER:</span>
                                          <span style={{ fontWeight: "bold", color: "#ffffff" }}>{(engineThrottle / 10).toFixed(1)}x FACTOR</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(77,213,255,0.15)", paddingBottom: "2px" }}>
                                          <span>FUEL BURN:</span>
                                          <span style={{ fontWeight: "bold", color: "#ffbc4d" }}>{fuelConsumption} L/S</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(77,213,255,0.15)", paddingBottom: "2px" }}>
                                          <span>VELOCITY:</span>
                                          <span style={{ fontWeight: "bold", color: "#4dd5ff" }}>{warpBoostActive ? "99.9c" : speedText.split(" ")[0]}</span>
                                        </div>
                                      </div>

                                      <button 
                                        onClick={() => { setWarpBoostActive(true); playBeep(880, 0.25, "sawtooth", 0.04); }} 
                                        disabled={warpBoostActive || engineThrottle === 0}
                                        className="flight-adjust-btn"
                                        style={{ 
                                          marginTop: "3px",
                                          width: "100%", 
                                          padding: "4px", 
                                          background: warpBoostActive ? "rgba(0, 255, 136, 0.25)" : "rgba(255, 51, 102, 0.18)",
                                          borderColor: warpBoostActive ? "#00ff88" : "#ff3366",
                                          color: warpBoostActive ? "#00ff88" : "#ff3366",
                                          cursor: (warpBoostActive || engineThrottle === 0) ? "not-allowed" : "pointer"
                                        }}
                                      >
                                        {warpBoostActive ? "🚀 BOOST ENGAGED!" : (engineThrottle === 0 ? "⚡ IDLE STANDBY" : "🔥 ENGAGE WARP DRIVE")}
                                      </button>

                                      {engineThrottle > 80 && !warpBoostActive && (
                                        <div className="led-blink" style={{ background: "rgba(255, 51, 102, 0.15)", border: "1px solid #ff3366", color: "#ff3366", fontSize: "7.5px", padding: "2px", textAlign: "center", fontWeight: "bold", borderRadius: "2px" }}>
                                          ⚠️ ENGINE OVERHEAT HAZARD
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {telemetryMode === "attitude" && (
                                <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11.5px", fontFamily: "Consolas, monospace", letterSpacing: "0.05em" }}>FLIGHT ATTITUDE DEVIATION HUD</span>
                                    <button 
                                      onClick={() => { setPitch(0); setYaw(0); setRoll(0); playBeep(500, 0.15, "sine", 0.025); }}
                                      className="flight-adjust-btn"
                                    >
                                      STABILIZE
                                    </button>
                                  </div>

                                  <div className="responsive-flex-row" style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1 }}>
                                    {/* Gyroscope attitude target SVG */}
                                    <div 
                                      style={{ 
                                        position: "relative", 
                                        width: "110px", 
                                        height: "110px", 
                                        background: "rgba(1, 12, 22, 0.85)", 
                                        border: "1px solid rgba(77, 213, 255, 0.25)", 
                                        borderRadius: "50%",
                                        touchAction: "none"
                                      }}
                                      onPointerDown={(e) => {
                                        setIsDraggingGyro(true);
                                        setGyroStart({ x: e.clientX, y: e.clientY });
                                        e.currentTarget.setPointerCapture(e.pointerId);
                                        playBeep(600, 0.04, "triangle", 0.02);
                                      }}
                                      onPointerMove={(e) => {
                                        if (!isDraggingGyro) return;
                                        const dx = e.clientX - gyroStart.x;
                                        const dy = e.clientY - gyroStart.y;
                                        
                                        setYaw(y => (y + dx * 0.4 + 360) % 360 - 180);
                                        setPitch(p => Math.max(-90, Math.min(90, p - dy * 0.4)));
                                        setGyroStart({ x: e.clientX, y: e.clientY });
                                        
                                        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                                          playBeep(450 + Math.abs(pitch) * 2, 0.02, "triangle", 0.008);
                                        }
                                      }}
                                      onPointerUp={(e) => {
                                        setIsDraggingGyro(false);
                                        e.currentTarget.releasePointerCapture(e.pointerId);
                                        playBeep(800, 0.06, "sine", 0.015);
                                      }}
                                    >
                                      <svg width="110" height="110" style={{ display: "block", overflow: "hidden" }}>
                                        {/* Compass ring rotating with Yaw */}
                                        <g transform={`rotate(${-yaw} 55 55)`}>
                                          <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(77, 213, 255, 0.2)" strokeWidth="1" />
                                          {Array.from({ length: 12 }).map((_, i) => {
                                            const angle = (i * 30) * (Math.PI / 180);
                                            const x1 = 55 + Math.sin(angle) * 44;
                                            const y1 = 55 - Math.cos(angle) * 44;
                                            const x2 = 55 + Math.sin(angle) * 48;
                                            const y2 = 55 - Math.cos(angle) * 48;
                                            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(77, 213, 255, 0.4)" strokeWidth="0.8" />;
                                          })}
                                          <text x="55" y="18" fill="#ff3366" fontSize="7px" fontWeight="bold" fontFamily="Consolas" textAnchor="middle">N</text>
                                          <text x="94" y="58" fill="#4dd5ff" fontSize="7px" fontWeight="bold" fontFamily="Consolas" textAnchor="middle">E</text>
                                          <text x="55" y="98" fill="#4dd5ff" fontSize="7px" fontWeight="bold" fontFamily="Consolas" textAnchor="middle">S</text>
                                          <text x="16" y="58" fill="#4dd5ff" fontSize="7px" fontWeight="bold" fontFamily="Consolas" textAnchor="middle">W</text>
                                        </g>

                                        {/* Pitch ladder group rotating with Roll and translating with Pitch */}
                                        <g transform={`rotate(${roll} 55 55) translate(0, ${pitch * 0.45})`}>
                                          <line x1="32" y1="28" x2="78" y2="28" stroke="rgba(77, 213, 255, 0.45)" strokeWidth="0.8" strokeDasharray="2,2" />
                                          <text x="29" y="30" fill="rgba(77, 213, 255, 0.6)" fontSize="6px" fontFamily="Consolas" textAnchor="end">+30°</text>
                                          
                                          <line x1="40" y1="41" x2="70" y2="41" stroke="rgba(77, 213, 255, 0.45)" strokeWidth="0.8" strokeDasharray="2,2" />
                                          <text x="37" y="43" fill="rgba(77, 213, 255, 0.6)" fontSize="6px" fontFamily="Consolas" textAnchor="end">+15°</text>

                                          <line x1="20" y1="55" x2="90" y2="55" stroke="#00ff88" strokeWidth="1.2" />
                                          <text x="17" y="57" fill="#00ff88" fontSize="6px" fontFamily="Consolas" textAnchor="end">0°</text>
                                          
                                          <line x1="40" y1="69" x2="70" y2="69" stroke="rgba(77, 213, 255, 0.45)" strokeWidth="0.8" strokeDasharray="2,2" />
                                          <text x="37" y="71" fill="rgba(77, 213, 255, 0.6)" fontSize="6px" fontFamily="Consolas" textAnchor="end">-15°</text>
                                          
                                          <line x1="32" y1="82" x2="78" y2="82" stroke="rgba(77, 213, 255, 0.45)" strokeWidth="0.8" strokeDasharray="2,2" />
                                          <text x="29" y="84" fill="rgba(77, 213, 255, 0.6)" fontSize="6px" fontFamily="Consolas" textAnchor="end">-30°</text>
                                        </g>

                                        {/* Static Aircraft indicator overlay in center */}
                                        <circle cx="55" cy="55" r="2.5" fill="#ffbc4d" stroke="#ffffff" strokeWidth="0.6" />
                                        <line x1="20" y1="55" x2="40" y2="55" stroke="#ffbc4d" strokeWidth="1.8" />
                                        <line x1="70" y1="55" x2="90" y2="55" stroke="#ffbc4d" strokeWidth="1.8" />
                                        <path d="M 48 60 L 55 55 L 62 60" fill="none" stroke="#ffbc4d" strokeWidth="1.8" />
                                      </svg>
                                      {isDraggingGyro && (
                                        <div style={{ position: "absolute", top: "45%", left: "0", right: "0", textAlign: "center", color: "#ffbc4d", fontSize: "6.5px", fontFamily: "Consolas", fontWeight: "bold" }}>
                                          DRAG
                                        </div>
                                      )}
                                    </div>

                                    {/* 3D Tunnel Visualizer Canvas */}
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                                      <canvas 
                                        ref={canvasRefAttitude} 
                                        width={120} 
                                        height={110} 
                                        style={{ 
                                          border: "1px solid rgba(77, 213, 255, 0.25)", 
                                          borderRadius: "3px", 
                                          boxShadow: "inset 0 0 10px rgba(0,0,0,0.8), 0 0 4px rgba(77, 213, 255, 0.15)",
                                          display: "block" 
                                        }} 
                                      />
                                    </div>

                                    {/* Tuning selectors for Gyro */}
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", fontFamily: "Consolas, monospace", fontSize: "9px" }}>
                                      <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1px" }}>
                                          <span>PITCH:</span>
                                          <b style={{ color: "#ffbc4d" }}>{pitch.toFixed(0)}°</b>
                                        </div>
                                        <div style={{ display: "flex", gap: "4px" }}>
                                          <button onClick={() => { setPitch(p => Math.max(-90, p - 5)); playBeep(450, 0.05, "sine", 0.02); }} className="flight-adjust-btn">-5°</button>
                                          <button onClick={() => { setPitch(p => Math.min(90, p + 5)); playBeep(450, 0.05, "sine", 0.02); }} className="flight-adjust-btn">+5°</button>
                                        </div>
                                      </div>

                                      <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1px" }}>
                                          <span>YAW:</span>
                                          <b style={{ color: "#48d2ff" }}>{yaw.toFixed(0)}°</b>
                                        </div>
                                        <div style={{ display: "flex", gap: "4px" }}>
                                          <button onClick={() => { setYaw(y => (y - 5 + 360) % 360 - 180); playBeep(520, 0.05, "sine", 0.02); }} className="flight-adjust-btn">-5°</button>
                                          <button onClick={() => { setYaw(y => (y + 5 + 360) % 360 - 180); playBeep(520, 0.05, "sine", 0.02); }} className="flight-adjust-btn">+5°</button>
                                        </div>
                                      </div>

                                      <div style={{ borderTop: "1px solid rgba(77, 213, 255, 0.15)", paddingTop: "3px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8.5px" }}>
                                          <span>ALIGNMENT:</span>
                                          <b style={{ color: alignmentScore > 90 ? "#00ff88" : "#ffbc4d" }}>{alignmentScore}%</b>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {telemetryMode === "spectrum" && (
                                <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "8px" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11px", fontFamily: "Consolas, monospace", letterSpacing: "0.05em" }}>COSMIC BEACON SIGNAL LOCKED</span>
                                    
                                    <button 
                                      onClick={() => { setTelemetryListen(!telemetryListen); playBeep(telemetryListen ? 300 : 880, 0.1, "sine", 0.035); }}
                                      className="flight-adjust-btn"
                                      style={{ 
                                        background: telemetryListen ? "rgba(0, 255, 136, 0.18)" : "rgba(255, 107, 157, 0.18)",
                                        borderColor: telemetryListen ? "#00ff88" : "#ff6b9d",
                                        color: telemetryListen ? "#00ff88" : "#ff6b9d"
                                      }}
                                    >
                                      {telemetryListen ? "🔊 LISTEN: ON" : "🔇 LISTEN: OFF"}
                                    </button>
                                  </div>

                                  {/* Oscilloscope SVG Waveform */}
                                  <div style={{ position: "relative", height: "55px", background: "#010e16", border: "1px solid rgba(77, 213, 255, 0.25)", borderRadius: "3px", overflow: "hidden" }}>
                                    <svg width="100%" height="100%" viewBox={`0 0 ${oscW} ${oscH}`} style={{ display: "block" }}>
                                      <defs>
                                        <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                                          <feGaussianBlur stdDeviation="2.5" result="blur" />
                                          <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                          </feMerge>
                                        </filter>
                                      </defs>
                                      <line x1="0" y1={centerY} x2={oscW} y2={centerY} stroke="rgba(77, 213, 255, 0.08)" strokeWidth="1" />
                                      <line x1={oscW/2} y1="0" x2={oscW/2} y2={oscH} stroke="rgba(77, 213, 255, 0.08)" strokeWidth="1" />
                                      
                                      <path d={oscPath} fill="none" stroke="#00ff88" strokeWidth="1.5" filter="url(#vectorGlow)" style={{ transition: "all 0.1s ease" }} />
                                    </svg>
                                  </div>

                                  {/* Two Column Layout for Sliders and Decryptor */}
                                  <div className="screen-grid-flight" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "12px", flex: 1 }}>
                                    
                                    {/* Sliders for wave parameters */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontFamily: "Consolas, monospace", fontSize: "8.5px" }}>
                                      <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1px" }}>
                                          <span style={{ color: "#48d2ff" }}>TUNER:</span>
                                          <b>{waveFreq.toFixed(1)} Hz</b>
                                        </div>
                                        <input 
                                          type="range" 
                                          min="1" 
                                          max="20" 
                                          step="0.5"
                                          value={waveFreq} 
                                          onChange={(e) => setWaveFreq(Number(e.target.value))}
                                          className="tuner-slider"
                                        />
                                      </div>

                                      <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1px" }}>
                                          <span style={{ color: "#ffbc4d" }}>AMPLITUDE:</span>
                                          <b>{waveAmp}%</b>
                                        </div>
                                        <input 
                                          type="range" 
                                          min="5" 
                                          max="45" 
                                          value={waveAmp} 
                                          onChange={(e) => setWaveAmp(Number(e.target.value))}
                                          className="tuner-slider"
                                        />
                                      </div>

                                      <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1px" }}>
                                          <span style={{ color: "#ff6b9d" }}>NOISE DAMPEN:</span>
                                          <b>{waveNoise} dBm</b>
                                        </div>
                                        <input 
                                          type="range" 
                                          min="0" 
                                          max="15" 
                                          value={waveNoise} 
                                          onChange={(e) => setWaveNoise(Number(e.target.value))}
                                          className="tuner-slider"
                                        />
                                      </div>
                                    </div>

                                    {/* Beacon Decryptor Status and Selector */}
                                    <div style={{ borderLeft: "1px solid rgba(77, 213, 255, 0.2)", paddingLeft: "8px", display: "flex", flexDirection: "column", gap: "3px", fontFamily: "Consolas, monospace" }}>
                                      <div style={{ display: "flex", gap: "3px", justifyContent: "space-between" }}>
                                        {[1, 2, 3].map((id) => (
                                          <button
                                            key={id}
                                            onClick={() => { setSelectedBeaconId(id); setBeaconDecryptProgress(0); playBeep(400 + id * 100, 0.08, "triangle", 0.02); }}
                                            className="flight-adjust-btn"
                                            style={{
                                              flex: 1,
                                              fontSize: "7.5px",
                                              padding: "1px",
                                              borderColor: selectedBeaconId === id ? "#00ff88" : (decryptedBeacons.includes(id) ? "#4dd5ff" : "rgba(77, 213, 255, 0.25)"),
                                              color: selectedBeaconId === id ? "#00ff88" : (decryptedBeacons.includes(id) ? "#4dd5ff" : "rgba(134, 225, 255, 0.7)"),
                                              background: selectedBeaconId === id ? "rgba(0, 255, 136, 0.1)" : "rgba(1, 10, 18, 0.5)"
                                            }}
                                          >
                                            B{id} {decryptedBeacons.includes(id) && "✔"}
                                          </button>
                                        ))}
                                      </div>

                                      <div style={{ fontSize: "7.5px", color: "rgba(134, 225, 255, 0.65)" }}>
                                        {selectedBeaconId === 1 && "TARGET: 8.5Hz | 35% | 1dBm"}
                                        {selectedBeaconId === 2 && "TARGET: 14.5Hz | 15% | 4dBm"}
                                        {selectedBeaconId === 3 && "TARGET: 18.0Hz | 40% | 0dBm"}
                                      </div>

                                      {/* Decryption status bar */}
                                      <div style={{ marginTop: "2px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "7px", marginBottom: "1px" }}>
                                          <span>DECRYPT LOCK:</span>
                                          <span style={{ color: decryptedBeacons.includes(selectedBeaconId) ? "#00ff88" : "#ffbc4d" }}>
                                            {decryptedBeacons.includes(selectedBeaconId) ? "COMPLETE" : `${beaconDecryptProgress}%`}
                                          </span>
                                        </div>
                                        <div style={{ width: "100%", height: "3px", background: "rgba(77, 213, 255, 0.15)", borderRadius: "1.5px", overflow: "hidden" }}>
                                          <div 
                                            style={{ 
                                              width: decryptedBeacons.includes(selectedBeaconId) ? "100%" : `${beaconDecryptProgress}%`, 
                                              height: "100%", 
                                              background: decryptedBeacons.includes(selectedBeaconId) ? "#00ff88" : "#ffbc4d",
                                              transition: "width 0.1s linear" 
                                            }} 
                                          />
                                        </div>
                                      </div>

                                      {/* Decrypted lore message log */}
                                      <div style={{ 
                                        flex: 1, 
                                        background: "rgba(1, 8, 15, 0.85)", 
                                        border: "1px solid rgba(77, 213, 255, 0.15)", 
                                        borderRadius: "2px", 
                                        padding: "3px", 
                                        fontSize: "7.5px", 
                                        color: decryptedBeacons.includes(selectedBeaconId) ? "#00ff88" : "rgba(134, 225, 255, 0.5)",
                                        overflow: "hidden"
                                      }}>
                                        {decryptedBeacons.includes(selectedBeaconId) ? (
                                          selectedBeaconId === 1 ? (
                                            "PULSAR DISCOVERY: B1919+21 SOURCE AT COORDS G1. PERIOD = 1.337s. NEURAL BEAM DETECTED."
                                          ) : selectedBeaconId === 2 ? (
                                            "VOYAGER 1 LOCK: GOLDEN RECORD STATUS NOMINAL. DEEP INTERSTELLAR FLIGHT CONTINUES."
                                          ) : (
                                            "SINGULARITY SCAN: WARP STREAM TO GRAVITY SINGULARITY CORE SECURE. HYPERDRIVE OK."
                                          )
                                        ) : (
                                          "LOCK SIGNAL TUNER VARIABLES TO LOCK VECTOR & INITIATE AUTO-DECRYPT..."
                                        )}
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              )}

                            </div>

                            {/* Right Column: Live Data Telemetry Metrics & Local Radar Grid Map */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                              
                              {/* Live telemetry list */}
                              <div style={{ padding: "10px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.6)", borderRadius: "4px", boxShadow: "inset 0 0 10px rgba(77, 213, 255, 0.05)" }}>
                                <div style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11px", fontFamily: "Consolas, monospace", marginBottom: "6px", letterSpacing: "0.05em" }}>LIVE PROPULSION & GEOLOCATION</div>
                                
                                <div style={{ fontFamily: "Consolas, monospace", fontSize: "9.5px", display: "grid", gridTemplateColumns: "1fr", gap: "5px" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(79, 205, 247, 0.12)", paddingBottom: "3px" }}>
                                    <span style={{ color: "rgba(134, 225, 255, 0.6)" }}>PROPULSION SYS STATUS:</span>
                                    <b style={{ color: statusLabelColor, textShadow: `0 0 4px ${statusLabelColor}` }}>{shipStatusLabel}</b>
                                  </div>
                                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(79, 205, 247, 0.12)", paddingBottom: "3px" }}>
                                    <span style={{ color: "rgba(134, 225, 255, 0.6)" }}>CRUISE VELOCITY:</span>
                                    <b style={{ color: "#ffffff" }}>{speedText}</b>
                                  </div>
                                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(79, 205, 247, 0.12)", paddingBottom: "3px" }}>
                                    <span style={{ color: "rgba(134, 225, 255, 0.6)" }}>LIVE GPS COORDS:</span>
                                    <b style={{ color: "#ffffff" }}>[{(yaw / 30).toFixed(2)}, {(pitch / 25 + 1.55).toFixed(2)}, 2.35] LY</b>
                                  </div>
                                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(79, 205, 247, 0.12)", paddingBottom: "3px" }}>
                                    <span style={{ color: "rgba(134, 225, 255, 0.6)" }}>ACCELERATION LOAD:</span>
                                    <b style={{ color: "#ffffff" }}>{accelText}</b>
                                  </div>
                                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ color: "rgba(134, 225, 255, 0.6)" }}>TOTAL LOGGED DISTANCE:</span>
                                    <b style={{ color: "#4dd5ff" }}>{(distanceTraveled / 100).toFixed(2)} LY</b>
                                  </div>
                                </div>
                              </div>

                              {/* Local Sector Radar Map */}
                              <div style={{ padding: "10px", border: "1px solid rgba(77, 213, 255, 0.2)", background: "rgba(2, 16, 27, 0.6)", borderRadius: "4px", flex: 1, display: "flex", flexDirection: "column", boxShadow: "inset 0 0 10px rgba(77, 213, 255, 0.05)" }}>
                                <div style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11px", fontFamily: "Consolas, monospace", marginBottom: "4px", letterSpacing: "0.05em" }}>LOCAL STELLAR GRIDS</div>
                                
                                <div style={{ flex: 1, position: "relative", background: "rgba(1, 10, 18, 0.8)", border: "1px solid rgba(77, 213, 255, 0.15)", borderRadius: "3px", overflow: "hidden" }}>
                                  <svg width="100%" height="100%" viewBox="0 0 180 94" style={{ display: "block" }}>
                                    <circle cx="90" cy="47" r="18" fill="none" stroke="rgba(77, 213, 255, 0.06)" strokeWidth="0.8" />
                                    <circle cx="90" cy="47" r="36" fill="none" stroke="rgba(77, 213, 255, 0.1)" strokeWidth="0.8" strokeDasharray="3,3" />
                                    <circle cx="90" cy="47" r="54" fill="none" stroke="rgba(77, 213, 255, 0.06)" strokeWidth="0.8" />

                                    <line x1="10" y1="47" x2="170" y2="47" stroke="rgba(77, 213, 255, 0.08)" strokeWidth="0.8" />
                                    <line x1="90" y1="5" x2="90" y2="89" stroke="rgba(77, 213, 255, 0.08)" strokeWidth="0.8" />

                                    <line 
                                      x1="90" y1="47" 
                                      x2={90 + Math.sin(radarSweepAngle * (Math.PI / 180)) * 54} 
                                      y2={47 - Math.cos(radarSweepAngle * (Math.PI / 180)) * 54} 
                                      stroke="rgba(0, 255, 136, 0.4)" 
                                      strokeWidth="1.2" 
                                    />

                                    {/* Warping Starfield Streaks */}
                                    {engineThrottle > 0 && (
                                      <g>
                                        <line x1="45" y1="20" x2={45 - engineThrottle * 0.18} y2="20" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
                                        <line x1="135" y1="70" x2={135 - engineThrottle * 0.18} y2="70" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />
                                        <line x1="30" y1="65" x2={30 - engineThrottle * 0.18} y2="65" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
                                        <line x1="150" y1="15" x2={150 - engineThrottle * 0.18} y2="15" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
                                      </g>
                                    )}

                                    {/* Targets shifting with pitch/yaw */}
                                    <g transform={`translate(${yaw/7}, ${pitch/6})`}>
                                      <circle cx="130" cy="30" r="2" fill="#ff3366" />
                                      <circle cx="130" cy="30" r="4.5" fill="none" stroke="#ff3366" strokeWidth="0.8" opacity="0.5" className="led-blink" />
                                      <text x="135" y="32" fill="#ff3366" fontSize="5.5px" fontFamily="Consolas" fontWeight="bold">SINGULARITY</text>
                                    </g>

                                    <g transform={`translate(${yaw/9}, ${pitch/8})`}>
                                      <circle cx="40" cy="68" r="1.8" fill="#4dd5ff" />
                                      <text x="45" y="70" fill="#4dd5ff" fontSize="5.5px" fontFamily="Consolas">SEC-KRONOS</text>
                                    </g>

                                    <g transform={`translate(${yaw/8}, ${pitch/10})`}>
                                      <circle cx="95" cy="24" r="1.2" fill="#ffbc4d" />
                                      <text x="100" y="26" fill="#ffbc4d" fontSize="5.5px" fontFamily="Consolas">SOL SYSTEM</text>
                                    </g>

                                    {/* Ship pointer center */}
                                    <polygon points="90,43 93,49 87,49" fill="#00ff88" stroke="#ffffff" strokeWidth="0.5" />
                                    <circle cx="90" cy="47" r="8" fill="none" stroke="#00ff88" strokeWidth="0.8" opacity="0.4" strokeDasharray="1,1" />
                                  </svg>
                                </div>
                              </div>

                            </div>
                          </div>

                          <footer style={{ marginTop: "10px", fontSize: "10px", borderTop: "1px solid rgba(79, 205, 247, 0.45)", paddingTop: "8px", display: "flex", justifyContent: "space-between", fontFamily: "Consolas, monospace" }}>
                            <span>TELEMETRY MAINFRAME MODE: <b>{telemetryMode.toUpperCase()} VIEW</b></span>
                            <span style={{ color: "rgba(134, 225, 255, 0.7)" }}>FLIGHT RECORDER STATE: ACTIVE // LOGGED DIST: {(distanceTraveled / 100).toFixed(2)} LY</span>
                          </footer>
                        </div>
                      );
                    }
                    case "nav-compute": {
        const selectedDest = NAV_DESTINATIONS.find(d => d.id === selectedDestId) || NAV_DESTINATIONS[0];

                    // Projected SVG dimensions
                    const svgW = 380;
                    const svgH = 210;
                    const cx = svgW / 2;
                    const cy = svgH / 2;

                    // Logs for selected destination
                    const logs = [
                    `[SYS] SEC-LOCK: ${selectedDest.sector}`,
                    `[NAV] COORDS: X=${selectedDest.x.toFixed(2)} Y=${selectedDest.y.toFixed(2)} Z=${selectedDest.z.toFixed(2)}`,
                    `[NAV] VECTOR PLOT: DIST=${selectedDest.range} | DILATION=${selectedDest.dilation}`,
                    isCharging
                    ? `[WARP] CHARGING: ${chargeProgress}% [WARNING: SPACE DISTORTION]`
                    : `[SYS] STATUS: HYPERDRIVE READY | JUMP VECTOR LOCK`
                    ];

                    return (
                    <div className={`instrument-screen telemetry-display hologram-flicker-anim ${isCharging ? 'glitch-active' : ''}`} style={{ width: "100%", height: "100%", border: "none", background: "none", boxShadow: "none", display: "flex", flexDirection: "column" }}>
                      <style>{`
              .holo-line {
                stroke: rgba(77, 213, 255, 0.15);
                stroke-width: 1;
              }
              .holo-line-axis {
                stroke: rgba(77, 213, 255, 0.4);
                stroke-width: 1.5;
                stroke-dasharray: 4, 3;
              }
              .sonar-sweep {
                transform-origin: 190px 105px;
                animation: sweep-rotation 5s linear infinite;
                stroke: url(#sweepGrad);
                opacity: 0.6;
              }
              @keyframes sweep-rotation {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .hologram-flicker-anim {
                animation: holo-flicker 10s infinite alternate;
              }
              @keyframes holo-flicker {
                0%, 100% {
                  opacity: 1;
                  filter: brightness(1) saturate(1);
                }
                23%, 25%, 64%, 66% {
                  opacity: 0.97;
                  filter: brightness(1.04) saturate(1.05);
                }
              }
              .nav-targets-scrollbar::-webkit-scrollbar {
                width: 4px;
              }
              .nav-targets-scrollbar::-webkit-scrollbar-track {
                background: rgba(1, 14, 22, 0.4);
                border-radius: 2px;
              }
              .nav-targets-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(77, 213, 255, 0.35);
                border-radius: 2px;
              }
              .nav-targets-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(77, 213, 255, 0.7);
              }
              .rotating-galaxy-ellipse {
                transform-origin: center;
                fill: none;
                stroke-dasharray: 3, 5;
                animation: rotate-ell 10s linear infinite;
              }
              .rotating-galaxy-ellipse-2 {
                transform-origin: center;
                fill: none;
                stroke-dasharray: 4, 3;
                animation: rotate-ell 6s linear reverse infinite;
              }
              @keyframes rotate-ell {
                100% { transform: rotate(360deg); }
              }
              .bh-acc-ring {
                transform-origin: center;
                fill: none;
                stroke-width: 1.5;
                animation: rotate-bh-ring 1s linear infinite;
              }
              @keyframes rotate-bh-ring {
                100% { transform: rotate(360deg); }
              }
              .nav-item-card {
                border: 1px solid rgba(77, 213, 255, 0.25);
                background: rgba(1, 14, 22, 0.65);
                box-shadow: inset 0 0 10px rgba(77, 213, 255, 0.05);
                transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
              }
              .nav-item-card:hover {
                border-color: rgba(77, 213, 255, 0.6);
                background: rgba(4, 26, 38, 0.8);
                box-shadow: 0 0 12px rgba(77, 213, 255, 0.2), inset 0 0 10px rgba(77, 213, 255, 0.1);
              }
              .nav-item-card.selected-card {
                border: 1px solid #00ff88;
                border-left: 4px solid #00ff88;
                background: rgba(0, 255, 136, 0.14);
                box-shadow: 0 0 15px rgba(0, 255, 136, 0.35), inset 0 0 10px rgba(0, 255, 136, 0.15);
                transform: translateX(2px);
              }
              .nav-item-card.selected-card-bh {
                border: 1px solid #ff3366;
                border-left: 4px solid #ff3366;
                background: rgba(255, 51, 102, 0.14);
                box-shadow: 0 0 15px rgba(255, 51, 102, 0.35), inset 0 0 10px rgba(255, 51, 102, 0.15);
                transform: translateX(2px);
              }
              .glitch-active {
                animation: panel-shake 0.12s infinite alternate, red-blue-shift 0.18s infinite;
              }
              @keyframes panel-shake {
                0% { transform: translate(1px, 0.5px) scale(1.001); }
                100% { transform: translate(-1px, -0.5px) scale(0.999); }
              }
              @keyframes red-blue-shift {
                0% { text-shadow: 1px 1px rgba(255, 0, 85, 0.4), -1px -1px rgba(0, 221, 255, 0.4); }
                100% { text-shadow: -1px -1px rgba(255, 0, 85, 0.4), 1px 1px rgba(0, 221, 255, 0.4); }
              }
              .led-blink {
                animation: blink-led 1s infinite steps(2);
              }
              @keyframes blink-led {
                50% { opacity: 0.3; }
              }
            `}</style>

                      <header style={{ fontSize: "13px", borderBottom: "1px solid rgba(79, 205, 247, 0.55)", paddingBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", textShadow: "0 0 10px rgba(77, 200, 247, 0.6)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span className="led-blink" style={{ width: "8px", height: "8px", borderRadius: "50%", background: isCharging ? "#ff3366" : "#00ff88", boxShadow: isCharging ? "0 0 8px #ff3366" : "0 0 8px #00ff88" }} />
                          <b>NAV COMPUTER V.4.2</b>
                        </div>
                        <span style={{ fontSize: "11px", color: "rgba(134, 225, 255, 0.7)", letterSpacing: "0.15em" }}>
                          {isCharging ? "WARP SPEED JUMP SEQUENCE ACTIVE" : "COSMIC VECTOR MATRIX PLOT"}
                        </span>
                      </header>

                      <div className="screen-grid-nav" style={{ display: "grid", gridTemplateColumns: "390px 1fr", gap: "25px", marginTop: "18px", flex: 1 }}>
                        {/* Left Column: Tactical Vector Map & Live Telemetry Scanner */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                          {/* SVG Holographic Tactical Grid */}
                          <div style={{
                            position: "relative",
                            width: "380px",
                            height: "210px",
                            border: "1px solid rgba(77, 213, 255, 0.25)",
                            background: "radial-gradient(circle at center, rgba(8, 32, 50, 0.5) 0%, rgba(1, 10, 18, 0.8) 85%)",
                            boxShadow: "inset 0 0 20px rgba(77, 213, 255, 0.15)",
                            borderRadius: "4px",
                            overflow: "hidden"
                          }}>
                            <svg width="100%" height="100%" style={{ display: "block" }}>
                              <defs>
                                <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#4dd5ff" stopOpacity="0.45" />
                                  <stop offset="35%" stopColor="#4dd5ff" stopOpacity="0.1" />
                                  <stop offset="100%" stopColor="#4dd5ff" stopOpacity="0" />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                  <feGaussianBlur stdDeviation="3" result="blur" />
                                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                              </defs>

                              {/* Sector Grid Coordinates */}
                              {[-40, -20, 0, 20, 40].map((val) => {
                                const baseU_v = cx + val * 3.3;
                                const baseV_h = cy + val * 1.8;
                                return (
                                  <React.Fragment key={val}>
                                    {/* Vertical lines */}
                                    <line x1={baseU_v} y1={cy - 40 * 1.8} x2={baseU_v} y2={cy + 40 * 1.8} className="holo-line" />
                                    {/* Horizontal lines */}
                                    <line x1={cx - 40 * 3.3} y1={baseV_h} x2={cx + 40 * 3.3} y2={baseV_h} className="holo-line" />
                                  </React.Fragment>
                                );
                              })}

                              {/* Central Grid Axes */}
                              <line x1={cx} y1={cy - 45 * 1.8} x2={cx} y2={cy + 45 * 1.8} className="holo-line-axis" />
                              <line x1={cx - 45 * 3.3} y1={cy} x2={cx + 45 * 3.3} y2={cy} className="holo-line-axis" />

                              {/* Concentric Sector Rings */}
                              <ellipse cx={cx} cy={cy} rx={10 * 3.3} ry={10 * 1.8} fill="none" stroke="rgba(77, 213, 255, 0.15)" strokeDasharray="3,3" />
                              <ellipse cx={cx} cy={cy} rx={20 * 3.3} ry={20 * 1.8} fill="none" stroke="rgba(77, 213, 255, 0.15)" strokeDasharray="3,3" />
                              <ellipse cx={cx} cy={cy} rx={30 * 3.3} ry={30 * 1.8} fill="none" stroke="rgba(77, 213, 255, 0.15)" strokeDasharray="3,3" />
                              <ellipse cx={cx} cy={cy} rx={40 * 3.3} ry={40 * 1.8} fill="none" stroke="rgba(77, 213, 255, 0.25)" />

                              {/* Sonar sweep overlay */}
                              <line x1={cx} y1={cy} x2={cx + 140} y2={cy + 70} strokeWidth="2" className="sonar-sweep" />

                              {/* Axis Labels */}
                              <text x={cx + 135} y={cy - 4} fill="rgba(77, 213, 255, 0.6)" fontSize="8px" fontFamily="Consolas, monospace">+X (LY)</text>
                              <text x={cx - 165} y={cy - 4} fill="rgba(77, 213, 255, 0.6)" fontSize="8px" fontFamily="Consolas, monospace">-X (LY)</text>
                              <text x={cx + 4} y={cy + 82} fill="rgba(77, 213, 255, 0.6)" fontSize="8px" fontFamily="Consolas, monospace">+Z (LY)</text>
                              <text x={cx + 4} y={cy - 75} fill="rgba(77, 213, 255, 0.6)" fontSize="8px" fontFamily="Consolas, monospace">-Z (LY)</text>

                              {/* Destination Nodes */}
                              {NAV_DESTINATIONS.map((d) => {
                                const bx = cx + d.x * 3.3;
                                const by = cy + d.z * 1.8;
                                const ex = bx;
                                const ey = by - d.y * 1.2;
                                const isSelected = d.id === selectedDestId;
                                const isHovered = d.id === hoveredDestId;
                                const color = d.id === 7 ? "#ff3366" : "#4dd5ff";

                                return (
                                  <g key={d.id} style={{ cursor: "pointer" }} onClick={() => setSelectedDestId(d.id)} onMouseEnter={() => setHoveredDestId(d.id)} onMouseLeave={() => setHoveredDestId(null)}>
                                    {/* Anchor Cross on Grid Floor */}
                                    <line x1={bx - 4} y1={by} x2={bx + 4} y2={by} stroke="rgba(77, 213, 255, 0.4)" strokeWidth="1" />
                                    <line x1={bx} y1={by - 4} x2={bx} y2={by + 4} stroke="rgba(77, 213, 255, 0.4)" strokeWidth="1" />

                                    {/* Elevation Line */}
                                    <line x1={bx} y1={by} x2={ex} y2={ey} stroke={isHovered || isSelected ? color : "rgba(77, 213, 255, 0.35)"} strokeWidth={isHovered || isSelected ? 1.5 : 1} strokeDasharray="2,2" />

                                    {/* Pulsing rings for selected/hovered nodes */}
                                    {isSelected && (
                                      <>
                                        <circle cx={ex} cy={ey} r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.6">
                                          <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
                                          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx={ex} cy={ey} r="4" fill="none" stroke={color} strokeWidth="1" />
                                      </>
                                    )}

                                    {isHovered && !isSelected && (
                                      <circle cx={ex} cy={ey} r="8" fill="none" stroke="#e8fbff" strokeWidth="1" opacity="0.4" />
                                    )}

                                    {/* Node Core */}
                                    <circle cx={ex} cy={ey} r={isSelected ? 5.5 : 4} fill={isSelected ? (d.id === 7 ? "#ff3366" : "#00ff88") : color} filter={isSelected || isHovered ? "url(#glow)" : "none"} />

                                    {/* Label display */}
                                    {(isSelected || isHovered) && (
                                      <g>
                                        <rect x={ex + 8} y={ey - 18} width={d.name.length * 6.5 + 8} height="14" fill="rgba(2, 16, 27, 0.95)" stroke={color} strokeWidth="1" rx="2" />
                                        <text x={ex + 12} y={ey - 8} fill={isSelected ? "#ffffff" : color} fontSize="8px" fontFamily="Consolas, monospace" fontWeight="bold">
                                          {d.name.split(":")[0]}
                                        </text>
                                      </g>
                                    )}
                                  </g>
                                );
                              })}
                            </svg>

                            {/* Compass Overlay */}
                            <div style={{ position: "absolute", bottom: "8px", left: "8px", display: "flex", gap: "10px", fontSize: "8px", color: "rgba(77, 213, 255, 0.6)", fontFamily: "Consolas, monospace" }}>
                              <span>RADAR: PASSIVE SCAN</span>
                              <span>T-GRID: ACTIVE</span>
                            </div>
                          </div>

                          {/* Target Analysis HUD Row */}
                          <div style={{
                            display: "flex",
                            gap: "15px",
                            padding: "12px",
                            border: "1px solid rgba(77, 213, 255, 0.25)",
                            background: "rgba(2, 16, 27, 0.5)",
                            borderRadius: "4px",
                            alignItems: "center"
                          }}>
                            {/* Rotating Wireframe Preview */}
                            <div style={{
                              position: "relative",
                              width: "84px",
                              height: "84px",
                              border: "1px solid rgba(77, 213, 255, 0.3)",
                              background: "rgba(1, 10, 18, 0.86)",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "inset 0 0 10px rgba(77, 213, 255, 0.15)"
                            }}>
                              {selectedDest.id === 7 ? (
                                /* Black Hole Gravity Well */
                                <svg width="76" height="76" style={{ overflow: "visible" }}>
                                  <g transform="translate(38, 38)">
                                    <ellipse cx="0" cy="0" rx="34" ry="12" stroke="#ff3366" className="bh-acc-ring" strokeDasharray="3,2" />
                                    <ellipse cx="0" cy="0" rx="26" ry="9" stroke="#ff3366" className="bh-acc-ring" style={{ animationDelay: "-0.3s" }} />
                                    <ellipse cx="0" cy="0" rx="18" ry="6" stroke="#ff5588" className="bh-acc-ring" style={{ animationDelay: "-0.6s" }} />
                                    <ellipse cx="0" cy="0" rx="10" ry="3.5" stroke="#ff77aa" className="bh-acc-ring" style={{ animationDelay: "-0.9s" }} />
                                    <circle cx="0" cy="0" r="5" fill="#000000" stroke="#ff3366" strokeWidth="1.5" />
                                  </g>
                                </svg>
                              ) : (
                                /* Galaxy Rotating Grid */
                                <svg width="76" height="76">
                                  <g transform="translate(38, 38) rotate(25)">
                                    <ellipse cx="0" cy="0" rx="32" ry="10" stroke="#4dd5ff" className="rotating-galaxy-ellipse" />
                                    <ellipse cx="0" cy="0" rx="24" ry="8" stroke="#4dd5ff" className="rotating-galaxy-ellipse-2" />
                                    <ellipse cx="0" cy="0" rx="16" ry="5.5" stroke="#85dcfd" className="rotating-galaxy-ellipse" style={{ animationDuration: "5s" }} />
                                    <ellipse cx="0" cy="0" rx="8" ry="3" stroke="#eefbff" className="rotating-galaxy-ellipse-2" style={{ animationDuration: "3s" }} />
                                    <circle cx="0" cy="0" r="2.5" fill="#eefbff" filter="url(#glow)" />
                                  </g>
                                </svg>
                              )}

                              <div style={{ position: "absolute", top: "2px", left: "2px", width: "4px", height: "4px", borderTop: "1px solid #4dd5ff", borderLeft: "1px solid #4dd5ff" }} />
                              <div style={{ position: "absolute", top: "2px", right: "2px", width: "4px", height: "4px", borderTop: "1px solid #4dd5ff", borderRight: "1px solid #4dd5ff" }} />
                              <div style={{ position: "absolute", bottom: "2px", left: "2px", width: "4px", height: "4px", borderBottom: "1px solid #4dd5ff", borderLeft: "1px solid #4dd5ff" }} />
                              <div style={{ position: "absolute", bottom: "2px", right: "2px", width: "4px", height: "4px", borderBottom: "1px solid #4dd5ff", borderRight: "1px solid #4dd5ff" }} />
                            </div>

                            {/* Simulated telemetry logs */}
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", fontFamily: "Consolas, monospace", fontSize: "10px", color: "rgba(134, 225, 255, 0.85)", lineHeight: "1.25" }}>
                              <div style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "11px", borderBottom: "1px solid rgba(77, 213, 255, 0.15)", paddingBottom: "2px", marginBottom: "2px" }}>
                                TELEMETRY TARGET LOCK
                              </div>
                              {logs.map((log, index) => (
                                <div key={index} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: log.includes("WARNING") ? "#ff3366" : (log.includes("CHARGING") ? "#00ff88" : "rgba(134, 225, 255, 0.85)") }}>
                                  {log}
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Right Column: Waypoint Selector & Hyperdrive Console */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px", height: "310px" }}>

                          {/* Waypoint list box */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <div style={{ color: "#4dd5ff", fontWeight: "bold", fontSize: "12px", fontFamily: "Consolas, monospace", marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
                              <span>WAYPOINT TARGETS</span>
                              <span>DISTANCE</span>
                            </div>

                            <div className="nav-targets-scrollbar" style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                              overflowY: "auto",
                              height: "172px",
                              paddingRight: "6px"
                            }}>
                              {NAV_DESTINATIONS.map((dest) => {
                                const isSelected = dest.id === selectedDestId;
                                const color = dest.id === 7 ? "#ff3366" : "#00ff88";

                                return (
                                  <div
                                    id={`nav-item-${dest.id}`}
                                    key={dest.id}
                                    onClick={() => {
                                      if (isCharging) return;
                                      setSelectedDestId(dest.id);
                                      if (typeof window !== "undefined") {
                                        (window as any).audioController?.playHoverSound?.();
                                      }
                                    }}
                                    onMouseEnter={() => !isCharging && setHoveredDestId(dest.id)}
                                    onMouseLeave={() => !isCharging && setHoveredDestId(null)}
                                    className={`nav-item-card ${isSelected ? (dest.id === 7 ? 'selected-card-bh' : 'selected-card') : ''}`}
                                    style={{
                                      padding: "6px 10px",
                                      cursor: isCharging ? "not-allowed" : "pointer",
                                      borderRadius: "3px",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      opacity: isCharging && !isSelected ? 0.35 : 1,
                                      pointerEvents: isCharging ? "none" : "auto"
                                    }}
                                  >
                                    <div>
                                      <div style={{ fontWeight: "bold", fontSize: "11px", color: isSelected ? color : "#eefbff", display: "flex", alignItems: "center", gap: "6px" }}>
                                        <span>{dest.name}</span>
                                        {isSelected && <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: color }} />}
                                      </div>
                                      <div style={{ fontSize: "9px", color: "rgba(134, 225, 255, 0.6)", fontFamily: "Consolas, monospace", marginTop: "2px" }}>
                                        SEC: {dest.x > 0 ? "E" : "W"}{Math.abs(Math.floor(dest.x))}/{dest.z > 0 ? "N" : "S"}{Math.abs(Math.floor(dest.z))}
                                      </div>
                                    </div>

                                    <div style={{ textAlign: "right", fontFamily: "Consolas, monospace" }}>
                                      <div style={{ fontSize: "10px", fontWeight: "bold", color: isSelected ? color : "rgba(134, 225, 255, 0.9)" }}>{dest.range}</div>
                                      <div style={{ fontSize: "8px", color: isSelected ? color : "rgba(134, 225, 255, 0.5)", textTransform: "uppercase" }}>{dest.type}</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Hyperdrive Console & Jump Trigger */}
                          <div style={{
                            padding: "12px",
                            border: "1px solid rgba(77, 213, 255, 0.25)",
                            background: "linear-gradient(180deg, rgba(2, 14, 22, 0.75) 0%, rgba(1, 8, 13, 0.9) 100%)",
                            borderRadius: "4px",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                          }}>
                            {/* Selected target metadata summary */}
                            <div style={{ fontFamily: "Consolas, monospace", fontSize: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "rgba(134, 225, 255, 0.6)" }}>SECTOR:</span>
                                <span style={{ fontWeight: "bold", color: selectedDestId === 7 ? "#ff3366" : "#4dd5ff" }}>
                                  {selectedDest.sector}
                                </span>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "rgba(134, 225, 255, 0.6)" }}>MASS:</span>
                                <span style={{ color: "#ffffff" }}>{selectedDest.mass}</span>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "rgba(134, 225, 255, 0.6)" }}>TIME DILATION:</span>
                                <span style={{ color: selectedDestId === 7 ? "#ff3366" : "#00ff88" }}>{selectedDest.dilation}</span>
                              </div>
                            </div>

                            {/* Engage Warp Drive */}
                            <div style={{ marginTop: "8px" }}>
                              {isCharging ? (
                                <div style={{ width: "100%" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontFamily: "Consolas, monospace", color: "#00ff88", fontWeight: "bold", marginBottom: "4px" }}>
                                    <span>CHARGE WARP CORE</span>
                                    <span>{chargeProgress}%</span>
                                  </div>
                                  <div style={{ width: "100%", height: "16px", border: "1px solid #00ff88", background: "rgba(0, 255, 136, 0.05)", borderRadius: "2px", overflow: "hidden", position: "relative" }}>
                                    <div style={{ width: `${chargeProgress}%`, height: "100%", background: "linear-gradient(90deg, #00bb66, #00ff88)", boxShadow: "0 0 10px rgba(0, 255, 136, 0.6)", transition: "width 0.1s linear" }} />
                                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "bold", fontFamily: "Consolas, monospace", color: "#ffffff", textShadow: "0 0 4px #000000" }}>
                                      SPACE-TIME BENDING ACTIVE
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() => engageWarp(selectedDest)}
                                  style={{
                                    background: selectedDestId === 7 ? "rgba(255, 51, 102, 0.25)" : "rgba(0, 255, 136, 0.25)",
                                    border: selectedDestId === 7 ? "2px solid #ff3366" : "2px solid #00ff88",
                                    color: selectedDestId === 7 ? "#ff3366" : "#00ff88",
                                    padding: "10px 15px",
                                    fontSize: "11px",
                                    fontWeight: "bold",
                                    fontFamily: "Consolas, monospace",
                                    cursor: "pointer",
                                    borderRadius: "4px",
                                    width: "100%",
                                    letterSpacing: "0.15em",
                                    boxShadow: selectedDestId === 7 ? "0 0 18px rgba(255, 51, 102, 0.2)" : "0 0 18px rgba(0, 255, 136, 0.2)",
                                    transition: "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = selectedDestId === 7 ? "#ff3366" : "#00ff88";
                                    e.currentTarget.style.color = "#000000";
                                    e.currentTarget.style.boxShadow = selectedDestId === 7 ? "0 0 25px rgba(255, 51, 102, 0.5)" : "0 0 25px rgba(0, 255, 136, 0.5)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = selectedDestId === 7 ? "rgba(255, 51, 102, 0.25)" : "rgba(0, 255, 136, 0.25)";
                                    e.currentTarget.style.color = selectedDestId === 7 ? "#ff3366" : "#00ff88";
                                    e.currentTarget.style.boxShadow = selectedDestId === 7 ? "0 0 18px rgba(255, 51, 102, 0.2)" : "0 0 18px rgba(0, 255, 136, 0.2)";
                                  }}
                                >
                                  {selectedDestId === 7 ? "PENETRATE SINGULARITY" : "ENGAGE HYPERDRIVE"}
                                </button>
                              )}
                            </div>

                          </div>

                        </div>
                      </div>

                      <footer style={{ marginTop: "15px", fontSize: "11px", borderTop: "1px solid rgba(79, 205, 247, 0.45)", paddingTop: "8px", display: "flex", justifyContent: "space-between", color: "rgba(134, 225, 255, 0.72)" }}>
                        <span>CURRENT TARGET WAYPOINT: <b>{selectedDest.fullName}</b></span>
                        <span>VECTOR COORD STATUS: JUMP READY</span>
                      </footer>
                    </div>
                    );
                  }
                  case "hud":
                    return (
                    <div className="instrument-screen hud-display" style={{ width: "100%", height: "100%", background: "rgba(2, 17, 25, 0.8)" }}>
                      <div className="hud-reticle" style={{ width: "200px", height: "200px", marginTop: "50px" }}><i /><span>VECTOR LOCK</span></div>
                      <div style={{ textAlign: "center", marginTop: "80px", color: "#00ff88", textShadow: "0 0 10px #00ff88" }}>
                        <h1>TARGET ACQUIRED</h1>
                        <p>SYNCHRONIZING WITH NAV-COM...</p>
                      </div>
                    </div>
                    );
                    default:
                    return null;
    }
  };

                    return (
                    <div
                      style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 3000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        backdropFilter: "blur(15px)",
                      }}
                      onClick={() => setActiveDisplay(null)}
                    >
                      <style>{`
                        /* Custom scrollbars inside active screens */
                        .instrument-screen *::-webkit-scrollbar,
                        .cockpit-panel *::-webkit-scrollbar {
                          width: 5px;
                          height: 5px;
                        }
                        .instrument-screen *::-webkit-scrollbar-track,
                        .cockpit-panel *::-webkit-scrollbar-track {
                          background: rgba(1, 14, 22, 0.45);
                          border-radius: 3px;
                        }
                        .instrument-screen *::-webkit-scrollbar-thumb,
                        .cockpit-panel *::-webkit-scrollbar-thumb {
                          background: rgba(77, 213, 255, 0.35);
                          border-radius: 3px;
                          border: 1px solid rgba(77, 213, 255, 0.15);
                          box-shadow: inset 0 0 5px rgba(77, 213, 255, 0.1);
                        }
                        .instrument-screen *::-webkit-scrollbar-thumb:hover,
                        .cockpit-panel *::-webkit-scrollbar-thumb:hover {
                          background: rgba(77, 213, 255, 0.75);
                          box-shadow: 0 0 8px rgba(77, 213, 255, 0.4);
                        }
                        
                        /* Responsive grid and flex overrides */
                        @media (max-width: 768px) {
                          .screen-grid-radar,
                          .screen-grid-systems,
                          .screen-grid-flight,
                          .screen-grid-nav {
                            grid-template-columns: 1fr !important;
                            gap: 16px !important;
                          }
                          
                          .responsive-flex-row {
                            flex-direction: column !important;
                            align-items: stretch !important;
                            gap: 15px !important;
                          }

                          .responsive-flex-row > div {
                            width: 100% !important;
                          }

                          /* Ensure canvas and SVGs align nicely when stacked */
                          .responsive-flex-row canvas,
                          .responsive-flex-row svg,
                          .responsive-flex-row > div > svg {
                            margin: 0 auto !important;
                            display: block !important;
                          }
                        }
                      `}</style>
                      <div
                        className="cockpit-panel"
                        style={{
                          width: "min(95vw, 800px)",
                          height: "min(90vh, 600px)",
                          padding: "35px",
                          pointerEvents: "auto",
                          overflow: "hidden"
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setActiveDisplay(null)}
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            zIndex: 10,
                            background: "rgba(255, 107, 157, 0.2)",
                            border: "1px solid #ff6b9d",
                            color: "#ff6b9d",
                            padding: "8px 15px",
                            cursor: "pointer",
                            fontFamily: "Consolas, monospace"
                          }}
                        >
                          CLOSE DISPLAY [ESC]
                        </button>
                        <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
                          {renderContent()}
                        </div>
                      </div>
                    </div>
                    );
};

                    export default MaximizedDisplay;