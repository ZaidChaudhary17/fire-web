"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RoadMotionProps {
  parallaxX?: number;
}

export function RoadMotion({ parallaxX = 0 }: RoadMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div 
      className="absolute bottom-0 right-0 w-full lg:w-[65%] h-[160px] sm:h-[200px] overflow-hidden pointer-events-none z-10"
      style={{
        perspective: "600px",
        perspectiveOrigin: "50% 10%",
      }}
    >
      {/* 1. Perspective Road Plane */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : parallaxX * 0.7,
        }}
        className="w-full h-full relative"
      >
        {/* Asphalt Surface */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090d14] via-[#0d121b] to-[#06080c] [transform:rotateX(55deg)] origin-bottom shadow-inner" />

        {/* Moving Center Line Dashes (Flowing Backwards for Forward Travel Illusion) */}
        {!shouldReduceMotion ? (
          <div className="absolute inset-0 [transform:rotateX(55deg)] origin-bottom flex justify-center overflow-hidden">
            <motion.div
              animate={{
                y: [0, 80],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                ease: "linear",
              }}
              className="w-2.5 flex flex-col space-y-8 items-center"
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-10 bg-amber-400/50 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.3)]"
                />
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="absolute inset-0 [transform:rotateX(55deg)] origin-bottom flex justify-center">
            <div className="w-2.5 flex flex-col space-y-8 items-center pt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-10 bg-amber-400/40 rounded-full" />
              ))}
            </div>
          </div>
        )}

        {/* Wet Asphalt Reflection Sheen & Emergency Red Spill */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  opacity: [0.15, 0.35, 0.15],
                }
          }
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
          className="absolute inset-x-0 bottom-4 h-16 bg-gradient-to-t from-red-600/15 via-red-500/5 to-transparent blur-md [transform:rotateX(55deg)] origin-bottom"
        />

        {/* Headlight illumination patch on asphalt */}
        <div className="absolute right-[20%] bottom-6 w-72 h-16 bg-amber-200/10 rounded-full blur-xl [transform:rotateX(55deg)] origin-bottom pointer-events-none" />

        {/* Horizon blend gradient */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#07090c] to-transparent z-10" />
      </motion.div>
    </div>
  );
}
