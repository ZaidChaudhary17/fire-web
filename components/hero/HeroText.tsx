"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { 
  AlertOctagon, 
  ArrowRight, 
  PhoneCall, 
  ShieldAlert,
  Radio
} from "lucide-react";
import { CadFlow } from "./CadFlow";

interface HeroTextProps {
  onOpenReportModal: () => void;
}

export function HeroText({ onOpenReportModal }: HeroTextProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col space-y-5 text-left z-20">
      
      {/* 1. Official Municipal Identification & Live Status */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-1.5"
      >
        <div className="text-[11px] font-mono tracking-wider text-slate-400 font-bold uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span>MIRA-BHAYANDAR FIRE & EMERGENCY SERVICES</span>
        </div>

        <div className="inline-flex items-center gap-2 rounded bg-slate-900/90 border border-slate-800 px-2.5 py-1 text-[11px] font-mono text-emerald-400 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">RESPONSE NETWORK OPERATIONAL</span>
        </div>
      </motion.div>

      {/* 2. Main High-Impact Editorial Headline */}
      <motion.h1
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-black tracking-tight text-white leading-[1.12] font-sans"
      >
        Faster Response.
        <br />
        <span className="text-slate-200">Smarter Coordination.</span>
      </motion.h1>

      {/* 3. Description */}
      <motion.p
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-lg"
      >
        Computer-Aided Dispatch and real-time emergency response management for Mira-Bhayandar.
      </motion.p>

      {/* 4. Live CAD Response Workflow */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="pt-1"
      >
        <CadFlow />
      </motion.div>

      {/* 5. Primary Action Buttons */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="flex flex-wrap items-center gap-3 pt-2"
      >
        {/* REPORT EMERGENCY Button */}
        <motion.button
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          onClick={onOpenReportModal}
          className="group inline-flex items-center gap-2 rounded bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] border border-red-400/60 hover:bg-red-700 active:bg-red-800 transition font-mono uppercase cursor-pointer"
        >
          <AlertOctagon className="h-4 w-4 animate-pulse group-hover:scale-110 transition-transform" />
          <span>REPORT EMERGENCY</span>
        </motion.button>

        {/* ENTER COMMAND CENTER Button */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
        >
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded border border-slate-700 bg-slate-900/90 px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition font-mono uppercase shadow-md"
          >
            <span>ENTER COMMAND CENTER</span>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* 6. Emergency Direct Hotlines */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="pt-2 text-[11px] font-mono text-slate-400 flex flex-wrap items-center gap-3 border-t border-slate-800/80 max-w-lg"
      >
        <span className="flex items-center gap-1.5 text-red-400 font-bold">
          <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
          HOTLINES: 101 / 112
        </span>
        <span>•</span>
        <span className="text-slate-400">+91-22-2811-2988 (MBMC Control Room)</span>
      </motion.div>

    </div>
  );
}
