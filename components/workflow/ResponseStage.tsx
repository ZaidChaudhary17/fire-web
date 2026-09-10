"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Truck, 
  Wifi, 
  Gauge, 
  Clock, 
  Navigation,
  Compass,
  Activity
} from "lucide-react";

interface ResponseStageProps {
  isActive: boolean;
  onSelect: () => void;
}

export function ResponseStage({ isActive, onSelect }: ResponseStageProps) {
  const shouldReduceMotion = useReducedMotion();

  // Mock live ETA countdown: 03:12 -> 00:00
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

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`group relative rounded-xl border p-4 sm:p-5 flex flex-col justify-between transition-all cursor-pointer select-none shadow-xl ${
        isActive
          ? "bg-gradient-to-b from-[#140e16] via-[#0e0a12] to-[#08060b] border-orange-500/80 ring-2 ring-orange-500/30 shadow-[0_0_25px_rgba(249,115,22,0.25)]"
          : "bg-gradient-to-b from-[#0c0f17] to-[#07090f] border-slate-800/80 hover:border-slate-700"
      }`}
    >
      {/* Top Stage Identification */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-mono font-bold ${
              isActive ? "bg-orange-600 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]" : "bg-slate-800 text-slate-300"
            }`}>
              04
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              REAL-TIME TRACKING
            </span>
          </div>

          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
            isActive ? "bg-orange-950 text-orange-300 border-orange-800 animate-pulse" : "bg-slate-900 text-slate-400 border-slate-800"
          }`}>
            {isActive ? "ACTIVE STEP" : "STEP 04"}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-white font-sans mb-2 flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-orange-400" />
          <span>Live GPS Response</span>
        </h3>

        <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-3.5">
          CAN-bus telemetry streams engine speed, traffic routing vector, and countdown ETA directly to incident command.
        </p>

        {/* Dynamic Vector & CAN-Bus Console */}
        <div className="rounded-lg bg-[#06080e] border border-slate-800 p-2.5 space-y-2 font-mono text-[10px]">
          {/* Animated Road & Moving Fire Engine Visual */}
          <div className="relative h-12 bg-slate-950/80 rounded border border-slate-900 overflow-hidden flex items-center px-2">
            {/* Road center dash animation */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 border-t border-dashed border-slate-700 opacity-60" />

            {/* Moving Fire Engine Icon with Emergency Pulse */}
            {!shouldReduceMotion ? (
              <motion.div
                animate={{
                  x: [0, 140, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                }}
                className="relative z-10 flex items-center gap-1 bg-red-600/90 text-white px-2 py-1 rounded shadow-[0_0_12px_rgba(239,68,68,0.7)] border border-red-400 text-[9px]"
              >
                <Truck className="w-3 h-3" />
                <span className="font-bold">MBMC-FE-04</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-0.5" />
              </motion.div>
            ) : (
              <div className="relative z-10 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-[9px]">
                <Truck className="w-3 h-3" />
                <span className="font-bold">MBMC-FE-04</span>
              </div>
            )}
          </div>

          {/* Real-time Readouts */}
          <div className="grid grid-cols-3 gap-1.5 text-[9px] pt-1">
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block">SPEED</span>
              <span className="text-white font-bold text-[10px]">54 KM/H</span>
            </div>
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block">GPS RTK</span>
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                <Wifi className="w-2.5 h-2.5" /> LINKED
              </span>
            </div>
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block">LIVE ETA</span>
              <span className="text-amber-300 font-bold text-[10px]">{formatEta(seconds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Footer */}
      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
        <span className="text-slate-500 uppercase">STATUS</span>
        <span className="text-orange-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          TRANSIT ARTERIAL NH-48
        </span>
      </div>
    </motion.div>
  );
}
