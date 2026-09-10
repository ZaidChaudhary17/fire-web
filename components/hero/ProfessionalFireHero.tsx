"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { 
  Flame, 
  Truck, 
  Clock, 
  Building2, 
  Radio, 
  AlertOctagon, 
  ArrowRight, 
  PhoneCall, 
  Wifi, 
  Gauge, 
  Droplet, 
  ShieldAlert, 
  Activity, 
  Compass, 
  MapPin, 
  Maximize2,
  CheckCircle2,
  ChevronRight,
  Layers,
  Zap,
  Volume2
} from "lucide-react";
import { QuickDispatchModal } from "@/components/layout/QuickDispatchModal";

interface ApparatusHotspot {
  id: string;
  x: number; // percentage
  y: number;
  label: string;
  category: string;
  detail: string;
  metric: string;
}

const HOTSPOTS: ApparatusHotspot[] = [
  {
    id: "ladder",
    x: 48,
    y: 22,
    label: "55m Hydraulic Aerial Ladder",
    category: "RESCUE & HIGH-RISE",
    detail: "Bronto Skylift 360° continuous rotation with rescue basket and 3,800 LPM elevated water monitor.",
    metric: "Reach: 55m (18 Floors)",
  },
  {
    id: "pump",
    x: 34,
    y: 65,
    label: "Centrifugal Multi-Stage Fire Pump",
    category: "HYDRAULIC ENGINE",
    detail: "Godiva Prima multi-pressure pump with automatic balanced pressure foam induction system.",
    metric: "4,000 LPM @ 10 Bar",
  },
  {
    id: "tank",
    x: 20,
    y: 64,
    label: "Stainless Steel Water & Foam Tank",
    category: "RESERVE CAPACITY",
    detail: "Baffled 4,500L water tank + 500L AFFF Aqueous Film Forming Foam concentrate with rapid hydrant inlet.",
    metric: "4,500L Water • 500L AFFF",
  },
  {
    id: "telematics",
    x: 62,
    y: 54,
    label: "CAN-Bus RTK Dispatch Terminal",
    category: "CAD INTEGRATION",
    detail: "Real-time dual-band RTK GPS telemetry broadcasting unit speed, water tank levels, and VHF radio telemetry.",
    metric: "CAN 2.0B • 100ms Latency",
  },
];

export function ProfessionalFireHero() {
  const shouldReduceMotion = useReducedMotion();
  const [activeHotspot, setActiveHotspot] = React.useState<string>("ladder");
  const [reportModalOpen, setReportModalOpen] = React.useState(false);
  const [activeViewMode, setActiveViewMode] = React.useState<"3d" | "telematics" | "hydraulics" | "crew">("3d");

  // Parallax on mouse
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 35;
    const y = (clientY - top - height / 2) / 35;
    setMousePos({ x, y });
  };

  const selectedHotspotData = HOTSPOTS.find((h) => h.id === activeHotspot) || HOTSPOTS[0];

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[calc(100vh-68px)] bg-[#07090c] text-slate-100 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* 1. Precision Grid & Tactical EOC Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle CAD grid */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        />
        
        {/* Ambient EOC red & amber radial glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      {/* 2. Top Tactical Status & Live Alarm Bar */}
      <div className="relative z-20 w-full border-b border-slate-800/80 bg-[#090d14]/70 backdrop-blur-md px-4 sm:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-950/80 border border-red-800 text-red-400 font-mono text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              LIVE 101 CAD QUEUE: 01 ACTIVE DISPATCH
            </span>
            <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
              INC-2026-00421 • High-Rise Fire • Sector 9 (E)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              STATIONS 01-05 DEPLOYED
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              VHF REPEATER 156.800 MHz (CH-1)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Hero Two-Column Layout */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center flex-1">
        
        {/* LEFT COLUMN: Executive Municipal Command Identity (Cols 1-6) */}
        <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
          
          {/* Eyebrow & Badges */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-600/40 text-[11px] font-mono text-red-300 font-bold uppercase tracking-wider shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>MBMC EMERGENCY OPERATIONS CENTER</span>
            </div>

            <div className="text-xs font-mono text-slate-400 tracking-wider uppercase font-semibold">
              Mira-Bhayandar Municipal Corporation • Fire & Emergency Services
            </div>
          </div>

          {/* Clean, Bold, High-Impact Editorial Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-sans">
            Rapid Dispatch.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-slate-200">
              Total Fireground Command.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl">
            Enterprise Computer-Aided Dispatch (CAD), CAN-bus apparatus telematics, and automated GIS response routing engineered for the Directorate of Fire & Emergency Services.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* 1. REPORT EMERGENCY 101 Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setReportModalOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-md bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] border border-red-400 hover:bg-red-700 transition font-mono uppercase tracking-wide cursor-pointer"
            >
              <AlertOctagon className="h-4 w-4 animate-pulse" />
              <span>REPORT EMERGENCY (101)</span>
            </motion.button>

            {/* 2. LAUNCH COMMAND CENTER Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-[#090d14]/90 px-6 py-3 text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition font-mono uppercase tracking-wide shadow-lg"
              >
                <span>ENTER COMMAND CONSOLE</span>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Emergency Direct Hotlines & Control Room */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 text-red-400 font-bold">
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>HOTLINES: 101 / 112</span>
            </div>
            <span>•</span>
            <span className="text-slate-300">+91-22-2811-2988 (MBMC Control Room)</span>
          </div>

          {/* Live Quick Metrics Card */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-[#090d14]/80 p-3 rounded border border-slate-800">
              <div className="text-[10px] text-slate-500 font-mono uppercase">AVG TURNOUT</div>
              <div className="text-lg font-extrabold text-emerald-400 font-mono">03:42 <span className="text-xs font-normal text-slate-500">MIN</span></div>
            </div>
            <div className="bg-[#090d14]/80 p-3 rounded border border-slate-800">
              <div className="text-[10px] text-slate-500 font-mono uppercase">READY FLEET</div>
              <div className="text-lg font-extrabold text-white font-mono">12 <span className="text-xs font-normal text-slate-500">/ 16 UNITS</span></div>
            </div>
            <div className="bg-[#090d14]/80 p-3 rounded border border-slate-800">
              <div className="text-[10px] text-slate-500 font-mono uppercase">WATER STORAGE</div>
              <div className="text-lg font-extrabold text-cyan-400 font-mono">45,000 <span className="text-xs font-normal text-slate-500">LTRS</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Interactive Apparatus Console (Cols 7-12) */}
        <div className="lg:col-span-6 flex flex-col space-y-4 items-center justify-center relative">
          
          {/* Main 3D Apparatus Studio Card */}
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : mousePos.x * 0.4,
              y: shouldReduceMotion ? 0 : mousePos.y * 0.4,
            }}
            className="relative w-full max-w-[640px] rounded-xl border border-slate-800 bg-gradient-to-b from-[#0e131d] via-[#090d14] to-[#06080c] p-4 shadow-2xl overflow-hidden group"
          >
            {/* Top Apparatus Bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600/20 text-red-400 border border-red-500/30">
                  <Truck className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="font-bold text-white uppercase">APPARATUS: MBMC-FE-04</span>
                  <span className="text-slate-500 text-[10px] block">Heavy Water Tender • 55m Bronto Ladder</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  RTK ONLINE
                </span>
              </div>
            </div>

            {/* Central 3D Apparatus Display with Interactive Hotspots */}
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden flex items-center justify-center bg-radial from-slate-900/60 to-black/90 border border-slate-800/60">
              
              {/* Studio Backdrop Lighting Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.12)_0%,transparent_70%)]" />
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

              {/* Clean 3D Fire Engine Render */}
              <motion.div 
                className="relative w-[90%] h-[90%] flex items-center justify-center"
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/fire-engine-clean.jpg"
                  alt="MBMC Municipal Fire Tender 3D Apparatus"
                  width={800}
                  height={600}
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] max-h-full"
                  priority
                />
              </motion.div>

              {/* Interactive Hotspot Trigger Beacons */}
              {HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot.id)}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full transition-all cursor-pointer z-30 ${
                    activeHotspot === spot.id
                      ? "bg-red-600 text-white ring-4 ring-red-500/40 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                      : "bg-[#090d14]/90 text-slate-300 border border-slate-600 hover:border-red-400 hover:text-white"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </button>
              ))}

              {/* Emergency Beacon Lights Pulse Effect */}
              <div className="absolute top-[35%] left-[58%] w-8 h-8 rounded-full bg-red-500/30 blur-md animate-ping pointer-events-none" />
              <div className="absolute top-[35%] left-[68%] w-8 h-8 rounded-full bg-amber-400/25 blur-md animate-ping pointer-events-none" />
            </div>

            {/* Active Selected Hotspot Intelligence Dossier */}
            <div className="mt-3 p-3 rounded-lg bg-[#06080c]/90 border border-slate-800 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
                    {selectedHotspotData.category}
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="font-bold text-white text-xs">{selectedHotspotData.label}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-amber-400 border border-slate-700">
                  {selectedHotspotData.metric}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                {selectedHotspotData.detail}
              </p>
            </div>

            {/* Apparatus Telemetry Mini-Matrix */}
            <div className="grid grid-cols-4 gap-2 mt-2 text-center text-xs font-mono">
              <div className="bg-[#06080c] p-2 rounded border border-slate-800">
                <span className="text-[9px] text-slate-500 block">WATER TANK</span>
                <span className="text-cyan-400 font-bold text-xs">96% (4.3k L)</span>
              </div>
              <div className="bg-[#06080c] p-2 rounded border border-slate-800">
                <span className="text-[9px] text-slate-500 block">FOAM AFFF</span>
                <span className="text-amber-400 font-bold text-xs">100% (500 L)</span>
              </div>
              <div className="bg-[#06080c] p-2 rounded border border-slate-800">
                <span className="text-[9px] text-slate-500 block">PUMP PRESSURE</span>
                <span className="text-emerald-400 font-bold text-xs">12.4 BAR</span>
              </div>
              <div className="bg-[#06080c] p-2 rounded border border-slate-800">
                <span className="text-[9px] text-slate-500 block">CAN-BUS SPEED</span>
                <span className="text-white font-bold text-xs">54 KM/H</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 4. Bottom Operational Command Status Strip */}
      <div className="relative z-20 w-full border-t border-slate-800/80 bg-[#07090c]/95 backdrop-blur-md px-4 sm:px-8 py-3 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              ACTIVE CAD INCIDENTS:
            </span>
            <span className="font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
              07 ALARMS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-orange-400" />
              APPARATUS READINESS:
            </span>
            <span className="font-bold text-white">
              12 / 16 ENGINES READY
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              AVG NFPA RESPONSE:
            </span>
            <span className="font-bold text-emerald-400">
              04:18 <span className="text-[10px] text-slate-500 font-normal">MIN</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              MUNICIPAL FIRE STATIONS:
            </span>
            <span className="font-bold text-cyan-300">
              05 / 05 ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Emergency CAD Intake Modal */}
      <QuickDispatchModal
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
      />
    </section>
  );
}
