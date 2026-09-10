"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Flame } from "lucide-react";

export function GpsPulse() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Expanding Radar Wave 1 */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute h-8 w-8 rounded-full border border-red-500 bg-red-500/20"
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      {/* Outer Expanding Radar Wave 2 */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute h-8 w-8 rounded-full border border-red-500 bg-red-500/10"
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.6,
          }}
        />
      )}

      {/* Core Target Pin */}
      <div className="relative h-6 w-6 rounded bg-red-600 border border-red-300 shadow-[0_0_12px_rgba(239,68,68,1)] flex items-center justify-center text-white z-10 animate-pulse">
        <Flame className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}
