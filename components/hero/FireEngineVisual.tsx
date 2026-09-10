"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { OperationalTelemetryOverlays } from "./OperationalTelemetryOverlays";

interface FireEngineVisualProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function FireEngineVisual({
  parallaxX = 0,
  parallaxY = 0,
}: FireEngineVisualProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[680px] mx-auto flex items-center justify-center select-none">
      {/* Background Soft Emergency Ambient Red & Amber Spills */}
      <div className="absolute -top-12 right-12 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Animated Vehicle Wrapper */}
      <motion.div
        className="relative w-full z-10"
        initial={shouldReduceMotion ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 120, scale: 0.94 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, x: 0, scale: 1 }
            : {
                opacity: 1,
                x: parallaxX,
                scale: 1,
              }
        }
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Continuous Breathing / Suspension Movement Container */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -6, 0],
                  rotate: [-0.3, 0.3, -0.3],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full"
        >
          {/* Emergency Lightbar Glow Pulses */}
          {/* Red Pulse on Cab Lightbar (Right side of cab roof) */}
          <div className="absolute top-[28%] right-[22%] z-20 pointer-events-none">
            <span className="relative flex h-8 w-16">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-8 w-16 bg-red-500/40 blur-md" />
            </span>
          </div>

          {/* Amber / Blue Pulse on Left side of Cab Roof */}
          <div className="absolute top-[28%] right-[32%] z-20 pointer-events-none">
            <span className="relative flex h-8 w-14">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-50 animate-pulse" />
              <span className="relative inline-flex rounded-full h-8 w-14 bg-amber-400/30 blur-md" />
            </span>
          </div>

          {/* Headlight Forward Beam Projection on Asphalt */}
          <div className="absolute bottom-[16%] right-[6%] z-10 pointer-events-none">
            {/* Front Headlight radial flare */}
            <div className="w-20 h-10 bg-amber-200/40 rounded-full blur-md animate-pulse" />
            {/* Subtle forward beam fading into ground */}
            <div
              className="w-48 h-16 bg-gradient-to-r from-amber-200/20 via-amber-100/5 to-transparent blur-lg transform -rotate-6 translate-x-8 -translate-y-2 opacity-70"
            />
          </div>

          {/* Realistic Ground Asphalt Contact Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[92%] h-12 bg-black/90 rounded-full blur-xl z-0" />

          {/* Primary High-Resolution Fire Engine Image */}
          <div className="relative z-10 w-full aspect-[16/9] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
            <Image
              src="/images/fire-engine-hero.png"
              alt="MBMC Heavy Water Tender 04 Fire Engine"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 680px"
              className="object-contain"
            />
          </div>

          {/* Integrated Operational Overlays */}
          <OperationalTelemetryOverlays
            parallaxX={parallaxX}
            parallaxY={parallaxY}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
