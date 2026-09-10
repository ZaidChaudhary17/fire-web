"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  PhoneCall, 
  ShieldCheck, 
  Radio, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Flame, 
  Camera, 
  Wifi, 
  Clock, 
  Activity, 
  ChevronDown,
  AlertOctagon,
  Building2,
  Users
} from "lucide-react";

interface MobileWorkflowTimelineProps {
  activeStage: number;
  onSelectStage: (idx: number) => void;
}

export function MobileWorkflowTimeline({
  activeStage,
  onSelectStage,
}: MobileWorkflowTimelineProps) {
  const shouldReduceMotion = useReducedMotion();

  // Touch swipe support (non-intrusive, doesn't hijack scroll)
  const touchStartY = React.useRef<number | null>(null);
  const touchStartX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    // Horizontal swipe or targeted vertical swipe
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0 && activeStage < 4) {
        onSelectStage(activeStage + 1);
      } else if (deltaX > 0 && activeStage > 0) {
        onSelectStage(activeStage - 1);
      }
    }
    touchStartY.current = null;
    touchStartX.current = null;
  };

  // Mock ticking countdown for mobile response stage
  const [seconds, setSeconds] = React.useState(192); // 3m 12s

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 192));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatEta = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const STAGES = [
    {
      index: 0,
      number: "01",
      title: "Report Emergency",
      category: "CITIZEN INTAKE",
      icon: PhoneCall,
      iconColor: "text-red-400",
      activeBorder: "border-red-500/80 ring-2 ring-red-500/20",
      badgeColor: "bg-red-950 text-red-400 border-red-800",
      renderContent: () => (
        <div className="space-y-2.5 pt-1 text-xs font-mono">
          <div className="rounded-lg bg-[#06080e] border border-slate-800 p-3 space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
              <span className="text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400 animate-bounce" style={{ animationDuration: "2s" }} />
                LOCATION:
              </span>
              <span className="text-white font-bold">Mira Road (E) • Sector 9</span>
            </div>

            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
              <span className="text-slate-500 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                INCIDENT TYPE:
              </span>
              <span className="text-amber-300 font-bold">Residential High-Rise</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5 text-red-500" />
                TRIAGE LEVEL:
              </span>
              <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 font-bold border border-red-800 animate-pulse text-[10px]">
                CRITICAL (L-3)
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Camera className="w-3 h-3 text-cyan-400" />
                1 Scene Photo Verified
              </span>
              <span className="text-slate-500">14:32:08 IST</span>
            </div>
          </div>
          <div className="text-[11px] text-red-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>STATUS: 101 EMERGENCY REPORT RECEIVED</span>
          </div>
        </div>
      ),
    },
    {
      index: 1,
      number: "02",
      title: "Verify Incident",
      category: "CONTROL ROOM EOC",
      icon: ShieldCheck,
      iconColor: "text-blue-400",
      activeBorder: "border-blue-500/80 ring-2 ring-blue-500/20",
      badgeColor: "bg-blue-950 text-blue-400 border-blue-800",
      renderContent: () => (
        <div className="space-y-2.5 pt-1 text-xs font-mono">
          <div className="rounded-lg bg-[#06080e] border border-slate-800 p-3 space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
              <span className="text-slate-500">CAD INCIDENT:</span>
              <span className="text-cyan-300 font-bold">INC-2026-00421</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  CALLER VERIFIED
                </span>
                <span className="text-emerald-400 font-bold">✓ PASS</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  LOCATION CONFIRMED
                </span>
                <span className="text-emerald-400 font-bold">✓ WARD 3</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  PRIORITY ASSIGNED
                </span>
                <span className="text-red-400 font-bold">✓ 101 CAD</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-400">
              <span>DISPATCHER: MBMC-OP-12</span>
              <span className="text-slate-500">14:32:45 IST</span>
            </div>
          </div>
          <div className="text-[11px] text-blue-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>STATUS: TRIAGE VERIFIED & APPROVED</span>
          </div>
        </div>
      ),
    },
    {
      index: 2,
      number: "03",
      title: "Dispatch Nearest Unit",
      category: "AUTO-CAD ALARM",
      icon: Radio,
      iconColor: "text-amber-400",
      activeBorder: "border-amber-500/80 ring-2 ring-amber-500/20",
      badgeColor: "bg-amber-950 text-amber-400 border-amber-800",
      renderContent: () => (
        <div className="space-y-2.5 pt-1 text-xs font-mono">
          <div className="rounded-lg bg-[#06080e] border border-slate-800 p-3 space-y-2.5">
            {/* Vector Track Visual */}
            <div className="flex items-center justify-between px-2 py-2 bg-slate-950/80 rounded border border-slate-900">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white text-[11px]">STN 02 (W)</span>
              </div>

              <div className="relative flex-1 mx-2.5 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-amber-500 opacity-80" />
                {!shouldReduceMotion && (
                  <motion.div
                    animate={{ x: ["-20%", "100%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] border border-amber-400"
                  />
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="font-bold text-red-400 text-[11px]">SECTOR 9</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">ENGINE</span>
                <span className="text-white font-bold">MBMC-FE-04</span>
              </div>
              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">CREW</span>
                <span className="text-amber-300 font-bold">ALPHA-04</span>
              </div>
              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">EST. ETA</span>
                <span className="text-emerald-400 font-bold">04:32 MIN</span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-amber-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>STATUS: BAY KLAXON TRIGGERED</span>
          </div>
        </div>
      ),
    },
    {
      index: 3,
      number: "04",
      title: "Live GPS Response",
      category: "REAL-TIME TRACKING",
      icon: Truck,
      iconColor: "text-orange-400",
      activeBorder: "border-orange-500/80 ring-2 ring-orange-500/20",
      badgeColor: "bg-orange-950 text-orange-400 border-orange-800",
      renderContent: () => (
        <div className="space-y-2.5 pt-1 text-xs font-mono">
          <div className="rounded-lg bg-[#06080e] border border-slate-800 p-3 space-y-2.5">
            {/* Animated Road Track & Vehicle */}
            <div className="relative h-11 bg-slate-950/80 rounded border border-slate-900 overflow-hidden flex items-center px-2">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 border-t border-dashed border-slate-700 opacity-60" />

              {!shouldReduceMotion ? (
                <motion.div
                  animate={{ x: [0, 110, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative z-10 flex items-center gap-1.5 bg-red-600 text-white px-2 py-1 rounded shadow-[0_0_12px_rgba(239,68,68,0.8)] border border-red-400 text-[10px]"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span className="font-bold">MBMC-FE-04</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-0.5" />
                </motion.div>
              ) : (
                <div className="relative z-10 flex items-center gap-1.5 bg-red-600 text-white px-2 py-1 rounded text-[10px]">
                  <Truck className="w-3.5 h-3.5" />
                  <span className="font-bold">MBMC-FE-04</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">SPEED</span>
                <span className="text-white font-bold">54 KM/H</span>
              </div>
              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">GPS RTK</span>
                <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                  <Wifi className="w-2.5 h-2.5" /> LINKED
                </span>
              </div>
              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">LIVE ETA</span>
                <span className="text-amber-300 font-bold">{formatEta(seconds)}</span>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="space-y-1 pt-0.5">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>STATION 02 → INCIDENT</span>
                <span className="text-emerald-400 font-bold">72% TRANSIT COMPLETE</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 w-[72%]" />
              </div>
            </div>
          </div>
          <div className="text-[11px] text-orange-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span>STATUS: TRANSIT ARTERIAL NH-48</span>
          </div>
        </div>
      ),
    },
    {
      index: 4,
      number: "05",
      title: "Incident Resolved",
      category: "AFTER-ACTION AUDIT",
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
      activeBorder: "border-emerald-500/80 ring-2 ring-emerald-500/20",
      badgeColor: "bg-emerald-950 text-emerald-400 border-emerald-800",
      renderContent: () => (
        <div className="space-y-2.5 pt-1 text-xs font-mono">
          <div className="rounded-lg bg-[#06080e] border border-slate-800 p-3 space-y-2">
            <div className="space-y-1 pb-1.5 border-b border-slate-800/80">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ARRIVED & SUPPRESSED
                </span>
                <span className="text-emerald-400 font-bold">✓ DONE</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  46 RESCUES COMPLETED
                </span>
                <span className="text-emerald-400 font-bold">✓ 100%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  INCIDENT CLOSED
                </span>
                <span className="text-emerald-400 font-bold">✓ 15:18:00</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">RESPONSE</span>
                <span className="text-emerald-400 font-bold">05:58 MIN</span>
              </div>
              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">WATER</span>
                <span className="text-cyan-300 font-bold">3,800 L</span>
              </div>
              <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span className="text-slate-500 block text-[9px]">NFPA</span>
                <span className="text-purple-300 font-bold">PASSED</span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>STATUS: CASE CLOSED & ARCHIVED</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="lg:hidden relative w-full space-y-3.5 select-none font-sans"
    >
      
      {/* Vertical Animated Timeline Line */}
      <div className="relative pl-6 sm:pl-8 space-y-3.5 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-800">
        
        {STAGES.map((stg) => {
          const Icon = stg.icon;
          const isCurrent = activeStage === stg.index;
          const isPassed = activeStage > stg.index;

          return (
            <div key={stg.index} className="relative">
              
              {/* Timeline Track Node Beacon */}
              <div 
                onClick={() => onSelectStage(stg.index)}
                className={`absolute -left-6 sm:-left-8 top-3.5 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-mono font-bold transition-all z-20 cursor-pointer ${
                  isCurrent
                    ? "bg-red-600 text-white border-white shadow-[0_0_12px_rgba(239,68,68,0.8)] scale-110"
                    : isPassed
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                    : "bg-[#090d14] text-slate-500 border-slate-800"
                }`}
              >
                {isPassed ? "✓" : stg.number}
              </div>

              {/* Accordion Stage Card */}
              <motion.div
                onClick={() => onSelectStage(stg.index)}
                className={`rounded-xl border transition-all cursor-pointer overflow-hidden ${
                  isCurrent
                    ? `bg-gradient-to-b from-[#0f141f] via-[#090d15] to-[#06080e] ${stg.activeBorder} p-4 shadow-xl`
                    : "bg-[#080c14]/90 border-slate-800/80 p-3 hover:border-slate-700"
                }`}
              >
                {/* Stage Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${stg.iconColor}`} />
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                        {stg.category}
                      </span>
                      <h4 className="text-sm font-bold text-white font-sans leading-tight">
                        {stg.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${stg.badgeColor}`}>
                      {isCurrent ? "ACTIVE" : isPassed ? "COMPLETE" : "PENDING"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isCurrent ? "rotate-180 text-white" : ""}`} />
                  </div>
                </div>

                {/* Smooth Expanded Accordion Content */}
                <AnimatePresence initial={false}>
                  {isCurrent && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden mt-3"
                    >
                      {stg.renderContent()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

            </div>
          );
        })}

      </div>

      {/* Mobile Live Operational Metric Status Bar (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-xs">
        <div className="bg-[#090d14] p-2 rounded border border-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <div>
            <span className="text-slate-500 block text-[9px]">SYSTEM STATE</span>
            <span className="text-emerald-400 font-bold text-[11px]">OPERATIONAL</span>
          </div>
        </div>

        <div className="bg-[#090d14] p-2 rounded border border-slate-800 flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <div>
            <span className="text-slate-500 block text-[9px]">ACTIVE ALARMS</span>
            <span className="text-red-400 font-bold text-[11px]">07 ACTIVE</span>
          </div>
        </div>

        <div className="bg-[#090d14] p-2 rounded border border-slate-800 flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <div>
            <span className="text-slate-500 block text-[9px]">READY ENGINES</span>
            <span className="text-white font-bold text-[11px]">12 / 16 READY</span>
          </div>
        </div>

        <div className="bg-[#090d14] p-2 rounded border border-slate-800 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <div>
            <span className="text-slate-500 block text-[9px]">AVG RESPONSE</span>
            <span className="text-cyan-300 font-bold text-[11px]">05:58 MIN</span>
          </div>
        </div>
      </div>

    </div>
  );
}
