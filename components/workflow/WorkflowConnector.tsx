"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface WorkflowConnectorProps {
  activeStage: number;
}

export function WorkflowConnector({ activeStage }: WorkflowConnectorProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full py-4 select-none">
      {/* Desktop Horizontal Connecting Vector Line */}
      <div className="hidden lg:block relative w-full h-1 bg-slate-800/80 rounded-full overflow-hidden">
        {/* Dynamic Progress Indicator based on Active Stage */}
        <motion.div
          animate={{
            width: `${((activeStage + 1) / 5) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500 rounded-full"
        />

        {/* Traveling Signal Pulse (5-7s Loop) */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              x: ["-10%", "110%"],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 -translate-y-1/2 w-6 h-2 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)]"
          />
        )}
      </div>

      {/* Stage Number Markers on the Track */}
      <div className="hidden lg:flex items-center justify-between relative -mt-3.5 px-4 font-mono text-[10px] text-slate-400 font-bold">
        {[
          { label: "01 REPORT", color: "text-red-400" },
          { label: "02 VERIFY", color: "text-blue-400" },
          { label: "03 DISPATCH", color: "text-amber-400" },
          { label: "04 RESPOND", color: "text-orange-400" },
          { label: "05 RESOLVE", color: "text-emerald-400" },
        ].map((step, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#090d14] border transition-all ${
              activeStage === idx
                ? "border-slate-500 text-white shadow-md ring-2 ring-slate-700"
                : "border-slate-800 text-slate-500"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                activeStage >= idx ? "bg-emerald-400" : "bg-slate-700"
              }`}
            />
            <span className={activeStage === idx ? step.color : ""}>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
