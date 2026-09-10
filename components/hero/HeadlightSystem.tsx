"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function HeadlightSystem() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none z-22">
      
      {/* 1. Left Lower Headlight Beam Source */}
      <div className="absolute top-[60%] left-[12%] w-6 h-6 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.9 }
              : {
                  opacity: [0.85, 1, 0.85],
                  scale: [0.98, 1.05, 0.98],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-4 h-4 rounded-full bg-amber-100 shadow-[0_0_24px_rgba(254,240,138,1)] border border-white"
        />
      </div>

      {/* 2. Right Lower Headlight Beam Source */}
      <div className="absolute top-[60%] left-[24%] w-6 h-6 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.9 }
              : {
                  opacity: [0.9, 1, 0.9],
                  scale: [1, 1.06, 1],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: 0.2,
            ease: "easeInOut",
          }}
          className="w-4 h-4 rounded-full bg-amber-100 shadow-[0_0_24px_rgba(254,240,138,1)] border border-white"
        />
      </div>

      {/* 3. Forward Projecting Halogen Light Cone on Road Surface */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.35 }
            : {
                opacity: [0.25, 0.42, 0.25],
                scaleX: [0.98, 1.04, 0.98],
              }
        }
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          clipPath: "polygon(0 0, 100% 60%, 85% 100%, 0 40%)",
        }}
        className="absolute top-[60%] left-[-10%] w-[380px] h-[220px] bg-gradient-to-r from-amber-200/40 via-amber-100/15 to-transparent blur-md -rotate-6 pointer-events-none"
      />

    </div>
  );
}
