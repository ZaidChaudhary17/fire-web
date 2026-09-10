"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CityBackgroundProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function CityBackground({
  parallaxX = 0,
  parallaxY = 0,
}: CityBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Layer 0: Base Deep Navy-Charcoal Horizon Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080c] via-[#080b10] to-[#05070a]" />

      {/* Layer 1: Distant Atmospheric Emergency Haze Wash */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.12, 0.22, 0.12],
                scale: [1, 1.05, 1],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[450px] bg-red-900/20 rounded-full blur-[140px]"
      />
      <div className="absolute bottom-16 left-1/4 w-[500px] h-[300px] bg-slate-900/50 rounded-full blur-[100px]" />

      {/* Layer 2: Distant City Silhouette (0.1x Parallax + Drift) */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : parallaxX * 0.25,
          y: shouldReduceMotion ? 0 : parallaxY * 0.25,
        }}
        className="absolute bottom-12 left-0 right-0 h-48 w-full opacity-40"
      >
        <svg
          className="w-full h-full text-slate-900"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1400 200"
          preserveAspectRatio="none"
        >
          {/* Layer 1 Silhouettes */}
          <path
            d="M0,200 L0,150 L35,150 L35,110 L65,110 L65,140 L100,140 L100,80 L130,80 L130,160 L170,160 L170,120 L210,120 L210,170 L270,170 L270,95 L310,95 L310,145 L360,145 L360,65 L400,65 L400,135 L450,135 L450,105 L500,105 L500,165 L570,165 L570,85 L610,85 L610,130 L670,130 L670,75 L720,75 L720,155 L790,155 L790,100 L840,100 L840,140 L900,140 L900,70 L940,70 L940,150 L1000,150 L1000,95 L1060,95 L1060,160 L1130,160 L1130,110 L1190,110 L1190,170 L1260,170 L1260,85 L1310,85 L1310,140 L1400,140 L1400,200 Z"
            fill="#0c1017"
          />
        </svg>
      </motion.div>

      {/* Layer 3: Mid-Ground City Contours & Subtle Street Lights (0.2x Parallax) */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : parallaxX * 0.45,
          y: shouldReduceMotion ? 0 : parallaxY * 0.45,
        }}
        className="absolute bottom-10 left-0 right-0 h-36 w-full opacity-60"
      >
        <svg
          className="w-full h-full text-slate-950"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1400 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,160 L0,110 L50,110 L50,70 L90,70 L90,130 L150,130 L150,50 L200,50 L200,140 L260,140 L260,85 L320,85 L320,130 L390,130 L390,60 L440,60 L440,120 L510,120 L510,75 L560,75 L560,145 L640,145 L640,65 L700,65 L700,125 L770,125 L770,55 L830,55 L830,135 L910,135 L910,80 L970,80 L970,140 L1040,140 L1040,70 L1100,70 L1100,130 L1180,130 L1180,90 L1240,90 L1240,150 L1320,150 L1320,80 L1400,80 L1400,160 Z"
            fill="#090d14"
          />
          {/* Subtle warm pinpoint distant streetlights */}
          <circle cx="200" cy="55" r="1.5" fill="#fef08a" opacity="0.6" />
          <circle cx="440" cy="65" r="1.5" fill="#fef08a" opacity="0.5" />
          <circle cx="700" cy="70" r="1.5" fill="#fef08a" opacity="0.7" />
          <circle cx="830" cy="60" r="1.5" fill="#ef4444" opacity="0.8" />
          <circle cx="1040" cy="75" r="1.5" fill="#fef08a" opacity="0.6" />
          <circle cx="1240" cy="95" r="1.5" fill="#38bdf8" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Layer 4: Faint Geographic / Corridor Map Contours (Vasai Creek / NH-48) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 600"
      >
        <path
          d="M 50,0 Q 250,200 450,280 T 850,340 L 1000,380"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="6,6"
          fill="none"
        />
        <path
          d="M 900,0 L 820,300 L 780,600"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="8,4"
          fill="none"
        />
      </svg>
    </div>
  );
}
