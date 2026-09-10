"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EmergencyLightSystem } from "./EmergencyLightSystem";
import { HeadlightSystem } from "./HeadlightSystem";

interface FireEngineProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function FireEngine({ parallaxX = 0, parallaxY = 0 }: FireEngineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      // 1. Entrance Animation from Right (1.5s easeOut)
      initial={
        shouldReduceMotion
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: 180, scale: 0.90 }
      }
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier easeOut
      }}
      style={{
        x: shouldReduceMotion ? 0 : parallaxX * 0.45,
        y: shouldReduceMotion ? 0 : parallaxY * 0.45,
      }}
      className="relative w-full max-w-[740px] flex items-center justify-center select-none"
    >
      {/* 2. Diesel Engine Suspension Jitter & Forward Road Travel Loop */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -1.2, 0, 1.0, 0],
                rotate: [0, -0.15, 0, 0.15, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
        className="relative w-full aspect-[16/10] flex items-center justify-center"
      >
        {/* Soft Ground Contact Shadow & Reflection Under Tires */}
        <div className="absolute bottom-4 inset-x-8 h-12 bg-black/85 rounded-full blur-xl pointer-events-none" />

        {/* 3. The Pristine Clean 3D Municipal Fire Engine Asset */}
        <Image
          src="/images/fire-engine-hero.png"
          alt="Mira-Bhayandar Municipal Fire Brigade Tender • 55m Bronto Aerial Ladder"
          width={1280}
          height={720}
          priority
          className="relative w-full h-auto object-contain z-20 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
        />

        {/* 4. Active Emergency Lightbars (Red / Amber / White Strobe Sync) */}
        <EmergencyLightSystem />

        {/* 5. Dual Halogen Projector Headlights & Road Light Cone */}
        <HeadlightSystem />
      </motion.div>
    </motion.div>
  );
}
