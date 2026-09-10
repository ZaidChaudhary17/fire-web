"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Navigation, Radio } from "lucide-react";
import { GpsPulse } from "./GpsPulse";

export function ResponseRoute() {
  const shouldReduceMotion = useReducedMotion();

  // Mock live ETA countdown (starts at 272 seconds = 04:32, counts down, resets at 0)
  const [secondsRemaining, setSecondsRemaining] = React.useState(272);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 1 ? prev - 1 : 272));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatEta = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainderSecs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-[#090d14]/95 backdrop-blur-md rounded border border-slate-800 p-3 font-mono text-xs shadow-2xl text-slate-300 select-none">
      {/* Top Header info */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 uppercase tracking-wider border-b border-slate-800/80 pb-1.5">
        <span className="flex items-center gap-1.5 font-bold text-slate-200">
          <Navigation className="w-3.5 h-3.5 text-red-500" />
          ACTIVE DISPATCH ROUTE VECTOR
        </span>
        <div className="flex items-center gap-1.5 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 text-emerald-300 font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>LIVE ETA: {formatEta(secondsRemaining)} MIN</span>
        </div>
      </div>

      {/* Main Vector Track */}
      <div className="relative flex items-center justify-between py-1.5">
        {/* Origin: Station 02 */}
        <div className="flex items-center gap-2 z-10">
          <div className="h-7 w-7 rounded bg-blue-950 border border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] flex items-center justify-center text-blue-300">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[11px] text-white font-bold block leading-tight">
              STN 02
            </span>
            <span className="text-[9px] text-slate-500 block">Bhayandar (W)</span>
          </div>
        </div>

        {/* Animated Connecting Vector Path */}
        <div className="flex-1 mx-4 relative h-[3px] bg-slate-800 rounded-full overflow-visible">
          {/* Active Flow Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-red-500 to-red-600 opacity-80" />

          {/* Moving Vehicle GPS Beacon traveling Station -> Incident */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-white border-2 border-red-600 shadow-[0_0_12px_rgba(239,68,68,1)] flex items-center justify-center z-20"
              initial={{ left: "0%" }}
              animate={{ left: ["0%", "92%", "0%"] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
            </motion.div>
          )}
        </div>

        {/* Destination: Incident GPS Marker with Pulse */}
        <div className="flex items-center gap-2 z-10">
          <div className="text-right">
            <span className="text-[11px] text-red-300 font-bold block leading-tight">
              MIRA ROAD (E)
            </span>
            <span className="text-[9px] text-slate-500 block">Sector 9 Complex</span>
          </div>
          <GpsPulse />
        </div>
      </div>
    </div>
  );
}
