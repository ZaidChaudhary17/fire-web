"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Atmosphere() {
  const shouldReduceMotion = useReducedMotion();

  // 24 drifting atmospheric mist & ambient dust particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: (i * 17) % 100,
      y: (i * 23) % 100,
      size: (i % 3) + 1.5,
      opacity: ((i % 5) + 2) * 0.08,
      duration: 5 + (i % 6) * 1.5,
      delay: (i % 7) * 0.4,
    }));
  }, []);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-15">
      
      {/* 1. Ambient Floating Motes */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 15, 0],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-slate-300"
        />
      ))}

      {/* 2. Subtle Engine Exhaust Plume (Vertical Stack behind cab) */}
      <div className="absolute right-[48%] top-[38%] w-16 h-24 overflow-visible pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40],
              x: [0, -12],
              scale: [0.8, 2.2],
              opacity: [0.25, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: i * 0.55,
              ease: "easeOut",
            }}
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-slate-400/20 blur-sm"
          />
        ))}
      </div>

    </div>
  );
}
