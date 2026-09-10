"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FireEngine } from "./FireEngine";
import { IncidentTelemetry } from "./IncidentTelemetry";

interface VehicleMotionProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function VehicleMotion({
  parallaxX = 0,
  parallaxY = 0,
}: VehicleMotionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[680px] mx-auto flex items-center justify-center select-none"
    >
      {/* 1. Vehicle Entrance Animation Container */}
      <motion.div
        className="relative w-full z-10"
        initial={
          shouldReduceMotion
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: 180, scale: 0.94 }
        }
        animate={
          shouldReduceMotion
            ? { opacity: 1, x: 0, scale: 1 }
            : {
                opacity: 1,
                x: parallaxX,
                scale: isHovered ? 1.015 : 1,
              }
        }
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* 2. Engine Running Idle Vibration + Forward Travel Sway */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -1.2, 0, -0.8, 0],
                  x: [0, -3.5, 0],
                }
          }
          transition={{
            y: {
              duration: 0.45,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative w-full"
        >
          {/* Main Fire Engine Visual */}
          <FireEngine />

          {/* Integrated Dynamic Telemetry Overlays */}
          <IncidentTelemetry
            parallaxX={parallaxX}
            parallaxY={parallaxY}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
