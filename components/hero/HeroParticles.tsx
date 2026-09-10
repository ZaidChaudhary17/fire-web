"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function HeroParticles() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  // 12 lightweight floating atmospheric dust/ember particles
  const particles = [
    { id: 1, x: "12%", y: "45%", size: 2, delay: 0, duration: 6, opacity: 0.35 },
    { id: 2, x: "24%", y: "65%", size: 3, delay: 1.2, duration: 7, opacity: 0.4 },
    { id: 3, x: "42%", y: "30%", size: 1.5, delay: 2.5, duration: 5.5, opacity: 0.25 },
    { id: 4, x: "58%", y: "75%", size: 2.5, delay: 0.8, duration: 6.8, opacity: 0.3 },
    { id: 5, x: "72%", y: "40%", size: 2, delay: 3.1, duration: 6.2, opacity: 0.45 },
    { id: 6, x: "85%", y: "55%", size: 3, delay: 1.8, duration: 8, opacity: 0.35 },
    { id: 7, x: "18%", y: "25%", size: 1.5, delay: 4, duration: 7.5, opacity: 0.2 },
    { id: 8, x: "65%", y: "60%", size: 2, delay: 2.1, duration: 5.8, opacity: 0.35 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {/* Drifting Atmospheric Micro-Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{ left: p.x, top: p.y }}
          className="absolute rounded-full bg-red-400"
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            y: [-10, -80],
            x: [0, (p.id % 2 === 0 ? 15 : -15)],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            style={{ width: `${p.size}px`, height: `${p.size}px` }}
            className="rounded-full bg-amber-200/60 shadow-[0_0_4px_rgba(251,191,36,0.8)]"
          />
        </motion.div>
      ))}

      {/* Simulated Exhaust / Engine Heat Shimmer behind engine rear (Left side of vehicle) */}
      <motion.div
        className="absolute top-[48%] right-[58%] w-16 h-24 bg-gradient-to-t from-slate-800/10 via-red-950/5 to-transparent blur-md pointer-events-none"
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scaleY: [0.9, 1.1, 0.9],
          y: [0, -6, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
