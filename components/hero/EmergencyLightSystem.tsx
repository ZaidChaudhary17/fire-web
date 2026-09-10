"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function EmergencyLightSystem() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none z-25">
      
      {/* 1. Cab Roof Lightbar - Left RED Strobe Beacon */}
      <div className="absolute top-[28%] left-[26%] w-8 h-8 -translate-x-1/2 -translate-y-1/2">
        {/* Core LED Module */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.8 }
              : {
                  opacity: [0.2, 1, 0.2, 0.9, 0.1],
                  scale: [0.95, 1.25, 0.95, 1.2, 0.95],
                }
          }
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-5 h-3 rounded-sm bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] border border-red-300"
        />
        {/* Radial Light Flare Spill */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              opacity: [0.15, 0.7, 0.15],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-6 rounded-full bg-red-600/35 blur-md"
          />
        )}
      </div>

      {/* 2. Cab Roof Lightbar - Right AMBER / BLUE Strobe Beacon (Opposite Phase) */}
      <div className="absolute top-[28%] left-[34%] w-8 h-8 -translate-x-1/2 -translate-y-1/2">
        {/* Core LED Module */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.8 }
              : {
                  opacity: [0.9, 0.1, 0.85, 0.2, 0.9],
                  scale: [1.2, 0.95, 1.15, 0.95, 1.2],
                }
          }
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-5 h-3 rounded-sm bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,1)] border border-amber-200"
        />
        {/* Radial Amber Flare */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              opacity: [0.65, 0.15, 0.65],
              scale: [1.3, 0.8, 1.3],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-6 rounded-full bg-amber-500/30 blur-md"
          />
        )}
      </div>

      {/* 3. White Center Strobe (Rapid Double-Flash) */}
      <div className="absolute top-[27.5%] left-[30%] w-4 h-4 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.4 }
              : {
                  opacity: [0, 0, 1, 0, 1, 0],
                  scale: [0.8, 0.8, 1.3, 0.8, 1.3, 0.8],
                }
          }
          transition={{
            duration: 1.2,
            repeat: Infinity,
            times: [0, 0.7, 0.75, 0.8, 0.85, 1],
          }}
          className="w-3 h-2 rounded-sm bg-white shadow-[0_0_25px_rgba(255,255,255,1)]"
        />
      </div>

      {/* 4. Rear Equipment Body Warning LEDs */}
      <div className="absolute top-[37%] left-[68%] w-3 h-3">
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.6 }
              : { opacity: [0.3, 1, 0.3] }
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
        />
      </div>

      {/* 5. Ambient Red & Amber Reflection Spills on Scene */}
      <motion.div
        animate={
          shouldReduceMotion
            ? { opacity: 0.15 }
            : {
                opacity: [0.1, 0.35, 0.1],
              }
        }
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-10 left-[10%] w-[380px] h-[300px] bg-red-600/20 rounded-full blur-[90px] pointer-events-none"
      />

    </div>
  );
}
