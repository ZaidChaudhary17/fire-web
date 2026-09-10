"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function EmergencyLights() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20">
      {/* 1. TOP LIGHTBAR - LEFT RED MODULE (Cab Roof Right in 3/4 perspective) */}
      <div className="absolute top-[28%] right-[22%]">
        {/* Core LED bulb flare */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.8 }
              : {
                  opacity: [0.25, 1, 0.2, 1, 0.25],
                  scale: [0.9, 1.2, 0.85, 1.15, 0.9],
                }
          }
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative h-6 w-14 rounded-full bg-red-600 shadow-[0_0_20px_rgba(239,68,68,1)] flex items-center justify-center"
        >
          <span className="h-2 w-6 rounded-full bg-white blur-[1px]" />
        </motion.div>

        {/* Soft Radial Ambient Spill from Left Red Module */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.4 }
              : {
                  opacity: [0.15, 0.7, 0.1, 0.65, 0.15],
                  scale: [0.95, 1.15, 0.9, 1.1, 0.95],
                }
          }
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-4 rounded-full bg-red-500/40 blur-xl pointer-events-none"
        />
      </div>

      {/* 2. TOP LIGHTBAR - RIGHT AMBER / WHITE MODULE (Cab Roof Center/Left in 3/4 perspective) */}
      <div className="absolute top-[28%] right-[32%]">
        {/* Core LED bulb flare - Alternating Phase */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.8 }
              : {
                  opacity: [1, 0.2, 0.9, 0.15, 1],
                  scale: [1.15, 0.85, 1.1, 0.9, 1.15],
                }
          }
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative h-6 w-14 rounded-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,1)] flex items-center justify-center"
        >
          <span className="h-2 w-6 rounded-full bg-white blur-[1px]" />
        </motion.div>

        {/* Soft Radial Ambient Spill from Amber Module */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.4 }
              : {
                  opacity: [0.65, 0.1, 0.6, 0.15, 0.65],
                  scale: [1.1, 0.9, 1.05, 0.95, 1.1],
                }
          }
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-4 rounded-full bg-amber-400/35 blur-xl pointer-events-none"
        />
      </div>

      {/* 3. GRILL STROBE FLASHERS (Front Red / White Grille LEDs) */}
      <div className="absolute top-[58%] right-[18%]">
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.7 }
              : {
                  opacity: [0.2, 0.9, 0.15, 0.85, 0.2],
                }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-2.5 w-6 rounded-sm bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]"
        />
      </div>

      {/* 4. GROUND ASPHALT REFLECTIONS (Pulsing synchronously with lightbar) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.3 }
            : {
                opacity: [0.15, 0.45, 0.1, 0.4, 0.15],
              }
        }
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-2 right-[10%] w-72 h-10 bg-gradient-to-r from-red-600/30 via-amber-500/20 to-transparent blur-lg transform -skew-x-12"
      />
    </div>
  );
}
