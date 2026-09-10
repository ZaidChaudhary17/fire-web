"use client";

import * as React from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { 
  Flame, 
  Truck, 
  Clock, 
  Building2, 
  Radio, 
  AlertOctagon, 
  Play, 
  Pause, 
  ArrowRight,
  PhoneCall,
  Wifi,
  Gauge,
  Droplet,
  Volume2,
  VolumeX,
  FastForward,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import { QuickDispatchModal } from "@/components/layout/QuickDispatchModal";

const DISPATCH_STAGES = [
  {
    src: "/frames/frame-1.jpg",
    stageName: "STAGE 1: STATION TURNOUT",
    title: "Station 02 Klaxon Activated • Turnout Bay Exit",
    location: "MBMC Fire Station 02, Bhayandar West",
    speedVal: 28,
    speed: "28 KM/H",
    eta: "04:32 MIN",
    waterPsi: "0 PSI",
    status: "DISPATCHING",
    timeOffset: 0.0,
  },
  {
    src: "/frames/frame-2.jpg",
    stageName: "STAGE 2: ARTERIAL TRANSIT",
    title: "Emergency Siren Transit Corridor • Wet Asphalt",
    location: "Mira-Bhayandar Main Arterial Road",
    speedVal: 56,
    speed: "56 KM/H",
    eta: "03:15 MIN",
    waterPsi: "40 PSI",
    status: "EN ROUTE",
    timeOffset: 0.33,
  },
  {
    src: "/frames/frame-3.jpg",
    stageName: "STAGE 3: HIGH-SPEED VECTOR",
    title: "High-Speed Highway Vector with Strobe & Mist",
    location: "Western Express Highway Corridor (NH-48)",
    speedVal: 72,
    speed: "72 KM/H",
    eta: "01:45 MIN",
    waterPsi: "85 PSI",
    status: "APPROACHING",
    timeOffset: 0.66,
  },
  {
    src: "/frames/frame-4.jpg",
    stageName: "STAGE 4: FIREGROUND ARRIVAL",
    title: "On-Scene Command Established • 55m Bronto Deployed",
    location: "Poonam Sagar Complex, Sector 9 (E)",
    speedVal: 0,
    speed: "0 KM/H",
    eta: "ON SCENE",
    waterPsi: "145 PSI",
    status: "PUMPING",
    timeOffset: 1.0,
  },
];

export function CinematicFramePlayer() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [imagesLoaded, setImagesLoaded] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [playbackSpeed, setPlaybackSpeed] = React.useState<number>(1);
  const [videoProgress, setVideoProgress] = React.useState<number>(0);
  const [reportModalOpen, setReportModalOpen] = React.useState(false);

  const imagesRef = React.useRef<HTMLImageElement[]>([]);
  const animFrameIdRef = React.useRef<number | null>(null);
  const videoTimeRef = React.useRef<number>(0);
  const lastTimestampRef = React.useRef<number>(0);
  const isUserScrubbingRef = React.useRef<boolean>(false);

  // Scroll tracking across sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload all frames into memory
  React.useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    DISPATCH_STAGES.forEach((item, idx) => {
      const img = new Image();
      img.src = item.src;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === DISPATCH_STAGES.length) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };
      loadedImages[idx] = img;
    });
  }, []);

  // Update canvas sizing on resize
  React.useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Synchronize with scroll
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.01) {
        isUserScrubbingRef.current = true;
        videoTimeRef.current = latest;
        setVideoProgress(latest);
      } else {
        isUserScrubbingRef.current = false;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Main 60FPS Video & Lighting Dynamics Render Loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalCycleDuration = 9000; // 9 seconds full loop

    const renderLoop = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const deltaTime = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      // Update progress if auto-playing
      if (isPlaying && !isUserScrubbingRef.current) {
        const deltaProgress = (deltaTime * playbackSpeed) / totalCycleDuration;
        videoTimeRef.current = (videoTimeRef.current + deltaProgress) % 1;
        setVideoProgress(videoTimeRef.current);
      }

      const progress = videoTimeRef.current;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (imagesLoaded && imagesRef.current.length === DISPATCH_STAGES.length) {
        // Continuous Video Sub-Frame Crossfade
        const numStages = DISPATCH_STAGES.length;
        const stageSpan = 1 / (numStages - 1);
        const stageIndexFloat = progress * (numStages - 1);
        const currentIdx = Math.min(numStages - 1, Math.floor(stageIndexFloat));
        const nextIdx = Math.min(numStages - 1, currentIdx + 1);
        const blendFactor = stageIndexFloat - currentIdx;

        const currentImg = imagesRef.current[currentIdx];
        const nextImg = imagesRef.current[nextIdx];

        // Aspect Cover Sizing
        const imgRatio = currentImg.width / currentImg.height;
        const canvasRatio = width / height;
        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = width / imgRatio;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
        }

        // 1. Diesel Chassis Micro-Vibration & Road Bump Physics
        const vibrationFreq = timestamp * 0.04;
        const chassisJitterY = Math.sin(vibrationFreq) * 1.2 + (Math.sin(timestamp * 0.015) * 2.0);
        const chassisSwayX = Math.cos(timestamp * 0.008) * 2.5;

        // Draw Base Frame
        ctx.save();
        ctx.translate(offsetX + chassisSwayX, offsetY + chassisJitterY);
        ctx.globalAlpha = 1;
        ctx.drawImage(currentImg, 0, 0, drawWidth, drawHeight);

        // Crossfade blend next frame
        if (currentIdx !== nextIdx && blendFactor > 0) {
          ctx.globalAlpha = blendFactor;
          ctx.drawImage(nextImg, 0, 0, drawWidth, drawHeight);
        }
        ctx.restore();

        // 2. Continuous Perspective Moving Road Markings & Wet Reflections
        if (currentIdx < 3) {
          const roadSpeed = (timestamp * 0.8 * playbackSpeed) % 80;
          ctx.save();
          ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
          for (let i = 0; i < 8; i++) {
            const streakY = height * 0.72 + (i * 45 + roadSpeed) % (height * 0.28);
            const streakW = Math.max(30, (streakY - height * 0.7) * 2.5);
            ctx.fillRect(width * 0.5 - streakW / 2, streakY, streakW, 4);
          }
          ctx.restore();
        }

        // 3. Volumetric Emergency Strobe Lightbars (12Hz Alternating Red & Amber/Blue)
        const strobeTime = timestamp * 0.015;
        const redIntensity = Math.sin(strobeTime * 4) > 0.1 ? 0.45 : 0.08;
        const amberIntensity = Math.cos(strobeTime * 4) > 0.1 ? 0.4 : 0.06;

        // Left Red Strobe Flare
        const redGrad = ctx.createRadialGradient(
          width * 0.46,
          height * 0.44,
          10,
          width * 0.46,
          height * 0.44,
          Math.max(width * 0.4, 450)
        );
        redGrad.addColorStop(0, `rgba(239, 68, 68, ${redIntensity})`);
        redGrad.addColorStop(0.5, `rgba(220, 38, 38, ${redIntensity * 0.4})`);
        redGrad.addColorStop(1, "rgba(239, 68, 68, 0)");
        ctx.fillStyle = redGrad;
        ctx.fillRect(0, 0, width, height);

        // Right Amber/White Strobe Flare
        const amberGrad = ctx.createRadialGradient(
          width * 0.68,
          height * 0.44,
          10,
          width * 0.68,
          height * 0.44,
          Math.max(width * 0.4, 450)
        );
        amberGrad.addColorStop(0, `rgba(245, 158, 11, ${amberIntensity})`);
        amberGrad.addColorStop(0.5, `rgba(251, 191, 36, ${amberIntensity * 0.4})`);
        amberGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
        ctx.fillStyle = amberGrad;
        ctx.fillRect(0, 0, width, height);

        // 4. Headlight High-Beam Cones Cutting Mist
        const headlightBeam = ctx.createRadialGradient(
          width * 0.75,
          height * 0.62,
          20,
          width * 0.9,
          height * 0.75,
          width * 0.35
        );
        headlightBeam.addColorStop(0, "rgba(254, 240, 138, 0.22)");
        headlightBeam.addColorStop(1, "rgba(254, 240, 138, 0)");
        ctx.fillStyle = headlightBeam;
        ctx.fillRect(0, 0, width, height);

        // 5. Cinematic Vignette Gradients for Enterprise UI Legibility
        // Top shadow
        const topGrad = ctx.createLinearGradient(0, 0, 0, 140);
        topGrad.addColorStop(0, "rgba(7, 9, 12, 0.9)");
        topGrad.addColorStop(1, "rgba(7, 9, 12, 0)");
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, width, 140);

        // Bottom command strip shadow
        const btmGrad = ctx.createLinearGradient(0, height - 160, 0, height);
        btmGrad.addColorStop(0, "rgba(7, 9, 12, 0)");
        btmGrad.addColorStop(1, "rgba(7, 9, 12, 0.95)");
        ctx.fillStyle = btmGrad;
        ctx.fillRect(0, height - 160, width, 160);

        // Left column command card background shadow
        const leftGrad = ctx.createLinearGradient(0, 0, width * 0.52, 0);
        leftGrad.addColorStop(0, "rgba(7, 9, 12, 0.88)");
        leftGrad.addColorStop(0.7, "rgba(7, 9, 12, 0.5)");
        leftGrad.addColorStop(1, "rgba(7, 9, 12, 0)");
        ctx.fillStyle = leftGrad;
        ctx.fillRect(0, 0, width * 0.55, height);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [imagesLoaded, isPlaying, playbackSpeed]);

  // Current Stage calculations
  const numStages = DISPATCH_STAGES.length;
  const currentStageIndex = Math.min(
    numStages - 1,
    Math.floor(videoProgress * (numStages - 1) + 0.49)
  );
  const activeStage = DISPATCH_STAGES[currentStageIndex] || DISPATCH_STAGES[0];

  const handleManualScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    videoTimeRef.current = val;
    setVideoProgress(val);
    setIsPlaying(false);
  };

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-[#07090c] select-none font-mono">
      {/* Sticky Full-Screen Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Full-Screen 60FPS Video Canvas Engine */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* TOP COMMAND HUD OVERLAY */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 flex flex-wrap items-center justify-between gap-3">
          {/* Emergency Operations Center Badge */}
          <div className="flex items-center gap-2 bg-[#090d14]/90 backdrop-blur-md px-3 py-1.5 rounded border border-slate-800 text-xs shadow-xl">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold text-white tracking-wider">
              MBMC 101 CAD REAL-TIME VIDEO FEED
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-red-400 font-semibold">{activeStage.stageName}</span>
          </div>

          {/* Interactive Video Playback & Scrubber Controls */}
          <div className="flex items-center gap-3 bg-[#090d14]/90 backdrop-blur-md px-3 py-1.5 rounded border border-slate-800 text-xs shadow-xl">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition font-bold cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px]">PAUSE VIDEO</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px]">PLAY VIDEO</span>
                </>
              )}
            </button>

            {/* Video Timeline Scrubber */}
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.005"
                value={videoProgress}
                onChange={handleManualScrub}
                className="w-24 sm:w-32 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <span className="text-[10px] text-slate-400 font-mono">
                {Math.round(videoProgress * 8)}s / 8s
              </span>
            </div>

            {/* Speed Multiplier */}
            <button
              onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-cyan-300 border border-slate-700 cursor-pointer"
            >
              {playbackSpeed}X
            </button>
          </div>
        </div>

        {/* MIDDLE SECTION: Dual Tactical Columns */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
          
          {/* Left Column: Command Authority & Actions (Cols 1–6) */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono tracking-wider text-slate-400 font-bold uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>MIRA-BHAYANDAR FIRE & EMERGENCY SERVICES</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded bg-slate-900/90 border border-slate-800 px-2.5 py-1 text-[11px] font-mono text-emerald-400 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">RESPONSE NETWORK OPERATIONAL</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] font-sans drop-shadow-md">
              Faster Response.
              <br />
              <span className="text-slate-200">Smarter Coordination.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-lg drop-shadow">
              Computer-Aided Dispatch and real-time emergency response management for Mira-Bhayandar.
            </p>

            {/* Active Response Stage Notification Pill */}
            <div className="bg-[#090d14]/90 backdrop-blur-md rounded border border-slate-800 p-2.5 max-w-md shadow-2xl">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800/80">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-orange-400" />
                  {activeStage.title}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 pt-1 flex justify-between">
                <span>Location: <strong className="text-slate-200">{activeStage.location}</strong></span>
                <span className="text-amber-400 font-bold">{activeStage.status}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setReportModalOpen(true)}
                className="group inline-flex items-center gap-2 rounded bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] border border-red-400/60 hover:bg-red-700 active:bg-red-800 transition uppercase cursor-pointer"
              >
                <AlertOctagon className="h-4 w-4 animate-pulse group-hover:scale-110 transition-transform" />
                <span>REPORT EMERGENCY</span>
              </button>

              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded border border-slate-700 bg-slate-900/90 px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition uppercase shadow-md backdrop-blur-sm"
              >
                <span>ENTER COMMAND CENTER</span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Emergency Direct Hotlines */}
            <div className="text-[11px] text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1 text-red-400 font-bold">
                <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                HOTLINES: 101 / 112
              </span>
              <span>•</span>
              <span className="text-slate-400">+91-22-2811-2988 (MBMC Control Room)</span>
            </div>
          </div>

          {/* Right Column: Floating Tactical Telemetry & Chapter Markers (Cols 7–12) */}
          <div className="lg:col-span-6 flex flex-col space-y-3 justify-end items-end">
            
            {/* Top Right Incident Card */}
            <div className="bg-red-950/90 backdrop-blur-md rounded border border-red-600/80 p-3 shadow-2xl text-red-200 max-w-sm w-full">
              <div className="flex items-center justify-between border-b border-red-900 pb-1 mb-1 text-[10px]">
                <span className="font-bold text-red-300 flex items-center gap-1">
                  <AlertOctagon className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                  ACTIVE 101 CAD ALARM
                </span>
                <span className="bg-red-600 text-white px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider animate-pulse">
                  CRITICAL
                </span>
              </div>
              <div className="text-xs font-bold text-white leading-tight">
                INC-2026-00421 • High-Rise Fire
              </div>
              <div className="text-[11px] text-red-300/90 mt-0.5 flex justify-between">
                <span>Poonam Sagar Complex, Sector 9 (E)</span>
                <span className="font-bold text-white">46 Evacuated</span>
              </div>
            </div>

            {/* Middle Telemetry CAN-bus Card */}
            <div className="bg-[#090d14]/90 backdrop-blur-md rounded border border-slate-700/80 p-3 shadow-2xl text-slate-200 max-w-sm w-full">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2 text-[10px]">
                <span className="text-slate-400 font-bold uppercase flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-orange-400" />
                  APPARATUS TELEMETRY: MBMC-FE-04
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  RTK LINKED
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="bg-[#06080c] p-1.5 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">SPEED</span>
                  <span className="text-white font-bold text-xs">{activeStage.speed}</span>
                </div>
                <div className="bg-[#06080c] p-1.5 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">ETA</span>
                  <span className="text-emerald-400 font-bold text-xs">{activeStage.eta}</span>
                </div>
                <div className="bg-[#06080c] p-1.5 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">PUMP</span>
                  <span className="text-amber-400 font-bold text-xs">{activeStage.waterPsi}</span>
                </div>
              </div>
            </div>

            {/* 4 Interactive Video Stage Chapter Buttons */}
            <div className="grid grid-cols-4 gap-1.5 max-w-sm w-full">
              {DISPATCH_STAGES.map((f, i) => (
                <button
                  key={i}
                  onClick={() => {
                    videoTimeRef.current = f.timeOffset;
                    setVideoProgress(f.timeOffset);
                    setIsPlaying(false);
                  }}
                  className={`py-1.5 px-1 rounded text-[9px] font-bold border transition-all text-center cursor-pointer ${
                    currentStageIndex === i
                      ? "bg-red-600 text-white border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.6)]"
                      : "bg-[#090d14]/80 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  PHASE {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM COMMAND CENTER OPERATIONAL STRIP */}
        <div className="relative z-20 w-full border-t border-slate-800/80 bg-[#07090c]/95 backdrop-blur-md px-4 sm:px-8 py-2.5 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                ACTIVE INCIDENTS:
              </span>
              <span className="font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                07
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-orange-400" />
                AVAILABLE ENGINES:
              </span>
              <span className="font-bold text-white">
                12 <span className="text-slate-500 font-normal">/ 16</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                AVG RESPONSE:
              </span>
              <span className="font-bold text-emerald-400">
                08:42 <span className="text-[10px] text-slate-500 font-normal">MIN</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                STATIONS ONLINE:
              </span>
              <span className="font-bold text-cyan-300">
                05 <span className="text-slate-500 font-normal">/ 05</span>
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-slate-400 text-[11px]">
              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>VHF PRIMARY: <strong className="text-slate-200">156.800 MHz (CH-01)</strong></span>
            </div>
          </div>
        </div>

      </div>

      {/* Emergency CAD Intake Modal */}
      <QuickDispatchModal
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
      />
    </div>
  );
}
