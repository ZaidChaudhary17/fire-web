"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CityParallaxProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function CityParallax({ parallaxX = 0, parallaxY = 0 }: CityParallaxProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. Deep Atmospheric Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070a] via-[#070a0f] to-[#040608]" />

      {/* 2. Distant Municipal Night Horizon & Red Emergency Glow */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : parallaxX * 0.2,
          y: shouldReduceMotion ? 0 : parallaxY * 0.2,
        }}
        className="absolute inset-0"
      >
        {/* Soft Red Emergency Sky Spill */}
        <div className="absolute top-[20%] right-[20%] w-[500px] h-[350px] bg-red-600/10 rounded-full blur-[140px]" />
        {/* Soft Amber Streetlight Horizon */}
        <div className="absolute top-[35%] right-[40%] w-[400px] h-[250px] bg-amber-500/8 rounded-full blur-[120px]" />
      </motion.div>

      {/* 3. Layer 1: Distant City Silhouette (Abstract Architectural Contours) */}
      <motion.svg
        style={{
          x: shouldReduceMotion ? 0 : parallaxX * 0.35,
          y: shouldReduceMotion ? 0 : parallaxY * 0.25,
        }}
        className="absolute bottom-16 right-0 w-[120%] h-[320px] opacity-[0.22] text-[#0f172a]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        {/* Background Building Outlines */}
        <path
          fill="currentColor"
          d="M0,320 L0,220 L60,220 L60,200 L90,200 L90,240 L160,240 L160,180 L210,180 L210,250 L300,250 L300,160 L340,160 L340,260 L420,260 L420,190 L480,190 L480,240 L550,240 L550,140 L600,140 L600,250 L680,250 L680,170 L730,170 L730,230 L800,230 L800,130 L840,130 L840,110 L860,110 L860,240 L930,240 L930,160 L990,160 L990,250 L1080,250 L1080,180 L1140,180 L1140,230 L1220,230 L1220,150 L1280,150 L1280,260 L1350,260 L1350,200 L1440,200 L1440,320 Z"
        />
        {/* Subtle Window Light Clusters */}
        <rect x="180" y="200" width="3" height="4" fill="#fbbf24" opacity="0.6" />
        <rect x="188" y="200" width="3" height="4" fill="#fbbf24" opacity="0.4" />
        <rect x="315" y="180" width="4" height="5" fill="#38bdf8" opacity="0.5" />
        <rect x="565" y="160" width="3" height="4" fill="#fbbf24" opacity="0.7" />
        <rect x="815" y="150" width="4" height="6" fill="#f87171" opacity="0.8" />
        <rect x="850" y="120" width="2" height="2" fill="#ef4444" opacity="0.9" />
        <rect x="1100" y="200" width="4" height="4" fill="#fbbf24" opacity="0.5" />
      </motion.svg>

      {/* 4. Layer 2: Midground Urban Infrastructure & Streetlight Nodes */}
      <motion.svg
        style={{
          x: shouldReduceMotion ? 0 : parallaxX * 0.6,
          y: shouldReduceMotion ? 0 : parallaxY * 0.4,
        }}
        className="absolute bottom-8 right-0 w-[110%] h-[240px] opacity-[0.35] text-[#090e17]"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,240 L0,180 L80,180 L80,160 L140,160 L140,190 L240,190 L240,140 L310,140 L310,200 L440,200 L440,130 L500,130 L500,210 L640,210 L640,150 L710,150 L710,190 L850,190 L850,120 L910,120 L910,220 L1040,220 L1040,160 L1120,160 L1120,200 L1260,200 L1260,140 L1340,140 L1340,240 Z"
        />
        {/* Antennas and Warning Beacons on Towers */}
        <line x1="880" y1="120" x2="880" y2="95" stroke="#475569" strokeWidth="1.5" />
        <circle cx="880" cy="95" r="2" fill="#ef4444" className="animate-pulse" />
        <line x1="470" y1="130" x2="470" y2="110" stroke="#475569" strokeWidth="1.5" />
        <circle cx="470" cy="110" r="1.5" fill="#ef4444" className="animate-pulse" />
      </motion.svg>

      {/* 5. Edge Vignette Gradients for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090c] via-transparent to-transparent" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#07090c] to-transparent z-10" />

    </div>
  );
}
