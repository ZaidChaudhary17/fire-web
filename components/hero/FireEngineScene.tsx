"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CityParallax } from "./CityParallax";
import { RoadMotion } from "./RoadMotion";
import { Atmosphere } from "./Atmosphere";
import { FireEngine } from "./FireEngine";
import { VehicleTelemetry } from "./VehicleTelemetry";
import { IncidentOverlay } from "./IncidentOverlay";
import { GpsRoute } from "./GpsRoute";

interface FireEngineSceneProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function FireEngineScene({ parallaxX = 0, parallaxY = 0 }: FireEngineSceneProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      // Cinematic Camera Entrance (1.02 -> 1 scale on load)
      initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.02 }}
      animate={{ scale: 1 }}
      transition={{ duration: 3, ease: "easeOut" }}
      className="relative w-full h-full min-h-[520px] lg:min-h-[580px] flex flex-col items-center justify-between overflow-visible select-none py-2"
    >
      {/* 1. Abstract City Skyline & Emergency Sky Glow */}
      <CityParallax parallaxX={parallaxX} parallaxY={parallaxY} />

      {/* 2. Perspective Road Surface with Moving Dashed Center Lines */}
      <RoadMotion parallaxX={parallaxX} />

      {/* 3. Atmospheric Particles & Engine Exhaust Plume */}
      <Atmosphere />

      {/* 4. Floating CAN-bus Apparatus Telemetry Badge (Top Right) */}
      <VehicleTelemetry parallaxX={parallaxX} parallaxY={parallaxY} />

      {/* 5. Central 3D Municipal Fire Engine Visual (No Card, Sits Directly in Scene) */}
      <div className="relative z-20 w-full flex items-center justify-center pt-8 pb-4">
        <FireEngine parallaxX={parallaxX} parallaxY={parallaxY} />
      </div>

      {/* 6. Floating Active 101 Incident Alarm Callout (Lower Right) */}
      <IncidentOverlay parallaxX={parallaxX} parallaxY={parallaxY} />

      {/* 7. Live CAD Emergency Route Vector with Countdown ETA (Bottom Center) */}
      <div className="relative z-25 w-full flex justify-center mt-auto pt-2">
        <GpsRoute parallaxX={parallaxX} parallaxY={parallaxY} />
      </div>

    </motion.div>
  );
}
