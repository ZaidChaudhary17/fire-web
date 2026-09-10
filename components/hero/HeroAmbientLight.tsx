"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function HeroAmbientLight() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0">
      {/* Synchronized Red Ambient Light Pulse */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[480px] h-[360px] bg-red-600/10 rounded-full blur-[110px]"
        animate={{
          opacity: [0.3, 0.75, 0.3],
          scale: [0.96, 1.04, 0.96],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Synchronized Amber Ambient Ground Spill */}
      <motion.div
        className="absolute bottom-8 right-1/3 w-[380px] h-[180px] bg-amber-500/10 rounded-full blur-[80px]"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scale: [0.98, 1.03, 0.98],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
    </div>
  );
}
