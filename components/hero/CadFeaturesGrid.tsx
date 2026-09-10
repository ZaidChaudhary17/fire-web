"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Siren, 
  MapPinned, 
  Truck, 
  Building2, 
  Droplets, 
  Users, 
  ChartNoAxesCombined, 
  ArrowRight, 
  Radio, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  Wifi, 
  ShieldAlert,
  Compass,
  Navigation,
  Activity,
  Layers,
  Flame
} from "lucide-react";

// Mock Incident Stream Data
const LIVE_INCIDENTS = [
  {
    id: "INC-2026-00421",
    type: "Residential Fire",
    location: "Sector 9 (E), Mira Road",
    priority: "CRITICAL",
    status: "EN ROUTE",
    time: "14:32:08",
    units: "MBMC-FE-04, MBMC-FE-07",
    priorityColor: "bg-red-950/80 text-red-400 border-red-800 animate-pulse",
    statusColor: "bg-amber-950/80 text-amber-400 border-amber-800",
  },
  {
    id: "INC-2026-00420",
    type: "Commercial Fire",
    location: "Ghodbunder Road, Bhayandar (W)",
    priority: "HIGH",
    status: "DISPATCHING",
    time: "14:28:14",
    units: "MBMC-FE-02, MBMC-FE-11",
    priorityColor: "bg-orange-950/80 text-orange-400 border-orange-800",
    statusColor: "bg-blue-950/80 text-blue-400 border-blue-800",
  },
  {
    id: "INC-2026-00419",
    type: "Vehicle Hazmat Fire",
    location: "Western Express Hwy, Kashimira",
    priority: "MEDIUM",
    status: "ARRIVING",
    time: "14:19:45",
    units: "MBMC-FE-05",
    priorityColor: "bg-yellow-950/80 text-yellow-400 border-yellow-800",
    statusColor: "bg-emerald-950/80 text-emerald-400 border-emerald-800",
  },
];

export function CadFeaturesGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-[#06080c] border-t border-slate-800/80 py-16 px-4 sm:px-8 select-none font-sans text-slate-100">
      
      {/* Background Ambient Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[600px] h-[350px] bg-red-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-blue-600/4 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* SECTION DIVIDER & HEADER */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 uppercase tracking-widest">
            <span className="h-px bg-slate-800 flex-1 max-w-[60px]" />
            <span className="flex items-center gap-1.5 text-red-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              FIRE & EMERGENCY OPERATIONS
            </span>
            <span className="h-px bg-slate-800 flex-1 max-w-[60px]" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                ONE COMMAND SYSTEM.
                <br />
                <span className="text-slate-300">EVERY RESPONSE.</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Integrated dispatch, tactical mapping, fleet telemetry, station resources and response intelligence for Mira-Bhayandar Fire & Emergency Services.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-3 bg-[#090d14] border border-slate-800 px-3.5 py-2 rounded text-xs font-mono text-slate-400">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>CAD TELEMETRY: <strong className="text-slate-200">100% OPERATIONAL</strong></span>
            </div>
          </div>
        </div>

        {/* ASYMMETRICAL OPERATIONS MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* =========================================================================
              PRIMARY DOMINANT MODULE: REAL-TIME EMERGENCY DISPATCH (62% / Cols 1-7)
             ========================================================================= */}
          <motion.div
            whileHover={{ borderColor: "rgba(239, 68, 68, 0.4)" }}
            transition={{ duration: 0.2 }}
            className="lg:col-span-7 rounded-xl border border-red-950/80 bg-gradient-to-b from-[#0f141f] via-[#0a0e17] to-[#070a10] p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top Header & Alarm Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <Siren className="h-4 w-4 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    PRIMARY CAD DISPATCH CONSOLE
                  </div>
                  <h3 className="text-lg font-extrabold text-white font-sans leading-tight">
                    Real-Time Emergency Dispatch
                  </h3>
                </div>
              </div>

              {/* Counters */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-red-950 border border-red-800 text-red-300 font-bold text-[11px]">
                  07 ACTIVE ALARMS
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400 font-bold text-[11px]">
                  101 CAD
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
              Computer-Aided Dispatch intake, priority triage, automated turn-out klaxon, and apparatus vector routing across Mira-Bhayandar.
            </p>

            {/* Tactical Mini Map Route Visualization */}
            <div className="relative w-full h-32 sm:h-36 rounded-lg bg-[#05080e] border border-slate-800/80 p-3 mb-4 overflow-hidden flex flex-col justify-between">
              {/* Tactical CAD Grid Lines */}
              <div 
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "20px 20px"
                }}
              />
              
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Compass className="w-3 h-3 text-cyan-400" />
                  CAD VECTOR MAP • SECTOR 9 ROUTE
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  RTK DISPATCH TRACKING
                </span>
              </div>

              {/* Graphical Route Vector */}
              <div className="relative z-10 flex items-center justify-between px-3 py-2">
                {/* Station 02 Node */}
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                    <Building2 className="h-3 w-3" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 mt-1">STN 02 (W)</span>
                </div>

                {/* Animated Vector Track Line */}
                <div className="relative flex-1 mx-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 opacity-60" />
                  {!shouldReduceMotion && (
                    <motion.div
                      animate={{ x: ["-10%", "100%"] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)] border-2 border-red-500 -ml-1.5"
                    />
                  )}
                </div>

                {/* Moving Fire Engine Apparatus Node */}
                <div className="flex flex-col items-center">
                  <div className="h-6 w-6 rounded bg-red-600/30 border border-red-500 flex items-center justify-center text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    <Truck className="h-3 w-3 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-mono text-amber-300 font-bold mt-1">MBMC-FE-04</span>
                </div>

                {/* Vector Track Line Continued */}
                <div className="relative flex-1 mx-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-60" />
                </div>

                {/* Incident Destination Pin */}
                <div className="flex flex-col items-center">
                  <div className="relative h-6 w-6 rounded-full bg-red-600 flex items-center justify-center text-white border border-red-300 shadow-[0_0_12px_rgba(239,68,68,0.8)]">
                    <Flame className="h-3 w-3 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-mono text-red-400 font-bold mt-1">SECTOR 9 (E)</span>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/60 pt-1">
                <span>04 DISPATCHING • 03 EN ROUTE</span>
                <span className="text-slate-300">ESTIMATED ON-SCENE: <strong className="text-emerald-400">03:15 MIN</strong></span>
              </div>
            </div>

            {/* Live Compact Incident Ticker Stream */}
            <div className="space-y-1.5 mb-5 font-mono text-xs">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">
                ACTIVE QUEUE SNAPSHOT:
              </div>
              {LIVE_INCIDENTS.map((inc) => (
                <div
                  key={inc.id}
                  className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 p-2 rounded bg-[#06090f] border border-slate-800/80 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{inc.id}</span>
                    <span className="text-slate-400 font-sans text-[11px] hidden sm:inline">{inc.type}</span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className="text-slate-400 text-[11px]">{inc.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border uppercase ${inc.priorityColor}`}>
                      {inc.priority}
                    </span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border uppercase ${inc.statusColor}`}>
                      {inc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contextual CTA */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">SYSTEM ID: MBMC-CAD-CORE</span>
              <Link
                href="/emergency"
                className="group inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 hover:text-red-300 transition"
              >
                <span>VIEW ACTIVE INCIDENTS</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>


          {/* =========================================================================
              RIGHT COLUMN: 2 DISTINCT SUPPORTING PANELS (38% / Cols 8-12)
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* PANEL 2: TACTICAL GIS MAP */}
            <motion.div
              whileHover={{ borderColor: "rgba(56, 189, 248, 0.4)" }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-slate-800 bg-gradient-to-b from-[#0d131f] to-[#080c14] p-5 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <MapPinned className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
                      GIS JURISDICTION
                    </span>
                    <h4 className="text-sm font-bold text-white font-sans">
                      Tactical GIS Map
                    </h4>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-cyan-300 font-mono text-[10px] font-bold">
                  05 WARD HUBS
                </span>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed mb-3">
                Ward-level GIS visualization with stations, live apparatus GPS vectors, and high-pressure hydrant grid.
              </p>

              {/* Geographic Mini Grid Visual */}
              <div className="grid grid-cols-5 gap-1.5 p-2 rounded bg-[#06080e] border border-slate-800/80 mb-3 text-center text-[9px] font-mono">
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                  <span className="text-slate-500 block">WARD 1</span>
                  <span className="text-emerald-400 font-bold">STN 01</span>
                </div>
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                  <span className="text-slate-500 block">WARD 2</span>
                  <span className="text-amber-400 font-bold">STN 02</span>
                </div>
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                  <span className="text-slate-500 block">WARD 3</span>
                  <span className="text-cyan-400 font-bold">STN 03</span>
                </div>
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                  <span className="text-slate-500 block">WARD 4</span>
                  <span className="text-blue-400 font-bold">STN 04</span>
                </div>
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                  <span className="text-slate-500 block">WARD 5-6</span>
                  <span className="text-purple-400 font-bold">STN 05</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono">
                <span className="text-emerald-400 font-bold text-[11px]">100% WARD COVERAGE</span>
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-1 font-bold text-slate-300 hover:text-white transition"
                >
                  <span>OPEN TACTICAL MAP</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>


            {/* PANEL 3: APPARATUS FLEET INTELLIGENCE */}
            <motion.div
              whileHover={{ borderColor: "rgba(245, 158, 11, 0.4)" }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-slate-800 bg-gradient-to-b from-[#0d131f] to-[#080c14] p-5 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Truck className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                      CAN-BUS TELEMETRY
                    </span>
                    <h4 className="text-sm font-bold text-white font-sans">
                      Apparatus Fleet Intelligence
                    </h4>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-[10px] font-bold">
                  12 / 16 READY
                </span>
              </div>

              {/* Status Breakdown Matrix */}
              <div className="grid grid-cols-4 gap-2 mb-3 text-center text-xs font-mono">
                <div className="bg-[#06080e] p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">READY</span>
                  <span className="text-emerald-400 font-bold text-sm">12</span>
                </div>
                <div className="bg-[#06080e] p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">EN ROUTE</span>
                  <span className="text-amber-400 font-bold text-sm">03</span>
                </div>
                <div className="bg-[#06080e] p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">MAINT</span>
                  <span className="text-blue-400 font-bold text-sm">01</span>
                </div>
                <div className="bg-[#06080e] p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">OFFLINE</span>
                  <span className="text-slate-500 font-bold text-sm">00</span>
                </div>
              </div>

              {/* Horizontal Segmented Readiness Bar */}
              <div className="space-y-1 mb-3 font-mono text-[10px]">
                <div className="flex justify-between text-slate-400">
                  <span>FLEET DEPLOYMENT CAPACITY</span>
                  <span className="text-white font-bold">75% AVAILABLE</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full flex overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[75%]" title="Ready" />
                  <div className="h-full bg-amber-400 w-[19%]" title="En Route" />
                  <div className="h-full bg-blue-500 w-[6%]" title="Maintenance" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono">
                <span className="text-slate-400">14 TENDERS + 2 RESCUE</span>
                <Link
                  href="/vehicles"
                  className="group inline-flex items-center gap-1 font-bold text-slate-300 hover:text-white transition"
                >
                  <span>VIEW FLEET</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>


        {/* =========================================================================
            BOTTOM ROW: 3 DEDICATED INFRASTRUCTURE & ANALYTICS PANELS (3 Cols)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* PANEL 4: STATION & RCC HYDRANT GRID */}
          <motion.div
            whileHover={{ borderColor: "rgba(59, 130, 246, 0.4)" }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-slate-800 bg-gradient-to-b from-[#0d131f] to-[#080c14] p-5 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Droplets className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
                      INFRASTRUCTURE GRID
                    </span>
                    <h4 className="text-sm font-bold text-white font-sans">
                      Station & RCC Hydrant Grid
                    </h4>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-cyan-300 font-mono text-[10px] font-bold">
                  45,000 L RESERVE
                </span>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed mb-3">
                5 station bay occupancies, underground RCC water tanks, and pressurized municipal hydrants.
              </p>

              {/* Station Online Status Matrix */}
              <div className="space-y-1.5 p-2.5 rounded bg-[#06080e] border border-slate-800/80 mb-3 font-mono text-[10px]">
                <div className="flex items-center justify-between text-slate-300">
                  <span>STATION 01 (Navghar)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    ONLINE
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>STATION 02 (Bhayandar W)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    ONLINE
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>STATION 03 (Mira Road E)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    ONLINE
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>STATION 04 (Kanakia)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    ONLINE
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>STATION 05 (Uttan Coastal)</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    ONLINE
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono">
              <span className="text-cyan-400 font-bold">128 HYDRANTS LINKED</span>
              <Link
                href="/stations"
                className="group inline-flex items-center gap-1 font-bold text-slate-300 hover:text-white transition"
              >
                <span>VIEW RESOURCES</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>


          {/* PANEL 5: COMMAND ROSTER */}
          <motion.div
            whileHover={{ borderColor: "rgba(16, 185, 129, 0.4)" }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-slate-800 bg-gradient-to-b from-[#0d131f] to-[#080c14] p-5 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                      PERSONNEL READINESS
                    </span>
                    <h4 className="text-sm font-bold text-white font-sans">
                      Command Roster & Crews
                    </h4>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-bold">
                  28 ON DUTY
                </span>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed mb-3">
                Officer, firefighter and hazmat specialist availability, shift assignments, and live biometric telemetry.
              </p>

              {/* Roster Breakdown Stats */}
              <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs font-mono">
                <div className="bg-[#06080e] p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">TOTAL</span>
                  <span className="text-white font-bold text-sm">42</span>
                </div>
                <div className="bg-[#06080e] p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">ON DUTY</span>
                  <span className="text-emerald-400 font-bold text-sm">28</span>
                </div>
                <div className="bg-[#06080e] p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">OFFICERS</span>
                  <span className="text-cyan-400 font-bold text-sm">04</span>
                </div>
              </div>

              {/* Crew Shift Indicators */}
              <div className="space-y-1.5 p-2 rounded bg-[#06080e] border border-slate-800/80 mb-3 font-mono text-[10px]">
                <div className="flex justify-between items-center text-slate-300">
                  <span>ALPHA CREW (Turnout 1)</span>
                  <span className="text-emerald-400 font-bold">READY (10)</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>BRAVO CREW (Turnout 2)</span>
                  <span className="text-amber-400 font-bold">ON DUTY (12)</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>CHARLIE CREW (Reserve)</span>
                  <span className="text-slate-500 font-medium">STANDBY (06)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono">
              <span className="text-slate-400">CHIEF OFFICER: RAJESH SAWANT</span>
              <Link
                href="/personnel"
                className="group inline-flex items-center gap-1 font-bold text-slate-300 hover:text-white transition"
              >
                <span>VIEW ROSTER</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>


          {/* PANEL 6: RESPONSE BENCHMARKING */}
          <motion.div
            whileHover={{ borderColor: "rgba(168, 85, 247, 0.4)" }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-slate-800 bg-gradient-to-b from-[#0d131f] to-[#080c14] p-5 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <ChartNoAxesCombined className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
                      NFPA 1710 COMPLIANCE
                    </span>
                    <h4 className="text-sm font-bold text-white font-sans">
                      Response Benchmarking
                    </h4>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-[10px] font-bold">
                  05:58 AVG RESPONSE
                </span>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed mb-3">
                Turnout timing, travel latency breakdown, and historical compliance under the 6-minute ceiling.
              </p>

              {/* Response Time Breakdown Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs font-mono">
                <div className="bg-[#06080e] p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">TURNOUT</span>
                  <span className="text-emerald-400 font-bold text-xs">04:18 MIN</span>
                </div>
                <div className="bg-[#06080e] p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">TRAVEL</span>
                  <span className="text-cyan-400 font-bold text-xs">01:40 MIN</span>
                </div>
                <div className="bg-[#06080e] p-2 rounded border border-slate-800">
                  <span className="text-[9px] text-slate-500 block">TARGET</span>
                  <span className="text-amber-400 font-bold text-xs">≤ 06:00 MIN</span>
                </div>
              </div>

              {/* Compact Historical Mini Trend Visual */}
              <div className="p-2 rounded bg-[#06080e] border border-slate-800/80 mb-3 font-mono text-[10px]">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>30-DAY COMPLIANCE RATE</span>
                  <span className="text-emerald-400 font-bold">94.8% SLA</span>
                </div>
                <div className="flex items-end gap-1.5 h-8 pt-1">
                  {[65, 80, 72, 90, 85, 94, 88, 92, 96, 94].map((v, i) => (
                    <div
                      key={i}
                      style={{ height: `${v}%` }}
                      className="flex-1 rounded-t bg-purple-500/60 hover:bg-purple-400 transition"
                      title={`Day ${i + 1}: ${v}% compliant`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono">
              <span className="text-emerald-400 font-bold text-[11px]">ISO 9001 AUDIT READY</span>
              <Link
                href="/analytics"
                className="group inline-flex items-center gap-1 font-bold text-slate-300 hover:text-white transition"
              >
                <span>VIEW PERFORMANCE</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
