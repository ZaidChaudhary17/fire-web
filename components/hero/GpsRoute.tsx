"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Navigation, Clock } from "lucide-react";
import { IncidentMarker } from "./IncidentMarker";

interface GpsRouteProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function GpsRoute({ parallaxX = 0, parallaxY = 0 }: GpsRouteProps) {
  const shouldReduceMotion = useReducedMotion();

  // Mock live ETA countdown: 04:32 -> 00:00 -> resets
  const [secondsRemaining, setSecondsRemaining] = React.useState<number>(272); // 4m 32s

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 272));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatEta = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.0 }}
      style={{
        x: shouldReduceMotion ? 0 : parallaxX * 0.6,
        y: shouldReduceMotion ? 0 : parallaxY * 0.6,
      }}
      className="relative z-30 w-full max-w-[580px] rounded-lg bg-[#090d14]/90 border border-slate-800/90 p-3 shadow-2xl backdrop-blur-md select-none font-mono"
    >
      {/* Top Header with ETA */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[10px]">
          <Navigation className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>ACTIVE DISPATCH ROUTE VECTOR</span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-bold text-[11px]">
          <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: "6s" }} />
          <span>LIVE ETA: {formatEta(secondsRemaining)} MIN</span>
        </div>
      </div>

      {/* Interactive Vector Route Line with Stations */}
      <div className="relative flex items-center justify-between px-2 pt-1 pb-2">
        
        {/* Origin: Station 02 */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-slate-800 border border-slate-700 text-slate-300">
            <Building2 className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-white leading-tight">
              STN 02
            </span>
            <span className="text-[9px] text-slate-400">
              Bhayandar (W)
            </span>
          </div>
        </div>

        {/* Route Line Track & Animated Pulse Beacon */}
        <div className="relative flex-1 mx-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          {/* Progress bar gradient */}
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 opacity-60" />

          {/* Traveling GPS Beacon Dot */}
          {!shouldReduceMotion && (
            <motion.div
              animate={{
                x: ["-10%", "100%"],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)] border-2 border-red-500 -ml-2"
            />
          )}
        </div>

        {/* Destination: Incident Radar Marker */}
        <IncidentMarker />

      </div>
    </motion.div>
  );
}
