"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function HeadlightGlow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-15">
      {/* Front Right Headlight Cluster */}
      <div className="absolute bottom-[24%] right-[8%]">
        {/* Core Halogen Lamp Flare */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.85 }
              : {
                  opacity: [0.75, 0.95, 0.75],
                  scale: [0.95, 1.05, 0.95],
                }
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative h-6 w-8 rounded-full bg-amber-100 shadow-[0_0_25px_rgba(254,240,138,0.9)] flex items-center justify-center"
        >
          <span className="h-3 w-4 rounded-full bg-white blur-[0.5px]" />
        </motion.div>

        {/* Forward Projected Light Beam spreading across asphalt */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.5 }
              : {
                  opacity: [0.35, 0.55, 0.35],
                  scaleX: [0.95, 1.08, 0.95],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-6 left-2 w-64 h-24 bg-gradient-to-r from-amber-200/25 via-amber-100/10 to-transparent blur-xl transform -rotate-12 origin-left pointer-events-none"
        />
      </div>

      {/* Front Bumper Lower Foglamp */}
      <div className="absolute bottom-[16%] right-[5%]">
        <motion.div
          animate={
            shouldReduceMotion
              ? { opacity: 0.8 }
              : {
                  opacity: [0.6, 0.85, 0.6],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-3.5 w-5 rounded-full bg-amber-200/90 shadow-[0_0_12px_rgba(253,224,71,0.8)]"
        />
      </div>
    </div>
  );
}
