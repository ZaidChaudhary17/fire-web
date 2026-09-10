"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { 
  Flame, 
  PhoneCall, 
  ArrowRight, 
  ShieldAlert, 
  AlertOctagon,
  Radio
} from "lucide-react";
import { CityBackground } from "./CityBackground";
import { RoadMotion } from "./RoadMotion";
import { HeroParticles } from "./HeroParticles";
import { HeroAmbientLight } from "./HeroAmbientLight";
import { VehicleMotion } from "./VehicleMotion";
import { ResponseRoute } from "./ResponseRoute";
import { CadFlow } from "./CadFlow";
import { QuickDispatchModal } from "@/components/layout/QuickDispatchModal";

export function FireHero() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [reportModalOpen, setReportModalOpen] = React.useState(false);

  // Scroll parallax
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.75]);
  const heroY = useTransform(scrollY, [0, 400], [0, -30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 40; // max ~8-10px
    const y = (clientY - top - height / 2) / 40;
    setMousePos({ x, y });
  };

  return (
    <motion.section
      style={{ opacity: shouldReduceMotion ? 1 : heroOpacity, y: shouldReduceMotion ? 0 : heroY }}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[calc(100vh-112px)] flex items-center justify-center overflow-hidden bg-[#07090c] text-slate-100 py-8 lg:py-12 px-4 sm:px-8 select-none"
    >
      {/* 1. Layered City Background Parallax */}
      <CityBackground
        parallaxX={mousePos.x}
        parallaxY={mousePos.y}
      />

      {/* 2. Synchronized Emergency Ambient Light Glow */}
      <HeroAmbientLight />

      {/* 3. Moving Perspective Road Surface & Wet Reflections */}
      <RoadMotion />

      {/* 4. Atmospheric Floating Particles & Engine Exhaust Haze */}
      <HeroParticles />

      {/* 5. Main 2-Column Responsive Emergency Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: Staggered Entrance Municipal Command Identity (Cols 1-6) */}
        <div className="lg:col-span-6 flex flex-col space-y-5 text-left">
          
          {/* Eyebrow & Status (0.2s - 0.4s) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

          {/* Main Headline (0.5s) */}
          <motion.h1
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-sans"
          >
            Faster Response.
            <br />
            <span className="text-slate-200">Smarter Coordination.</span>
          </motion.h1>

          {/* Description (0.7s) */}
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-lg"
          >
            Computer-Aided Dispatch and real-time emergency response management for Mira-Bhayandar.
          </motion.p>

          {/* Live CAD Response Workflow (0.9s) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <CadFlow />
          </motion.div>

          {/* Action Buttons (1.1s) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            {/* REPORT EMERGENCY Button with red glow and icon shift */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => setReportModalOpen(true)}
              className="group inline-flex items-center gap-2 rounded bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] border border-red-400/60 hover:bg-red-700 active:bg-red-800 transition font-mono uppercase cursor-pointer"
            >
              <AlertOctagon className="h-4 w-4 animate-pulse group-hover:scale-110 transition-transform" />
              <span>REPORT EMERGENCY</span>
            </motion.button>

            {/* ENTER COMMAND CENTER Button with subtle border highlight & arrow nudge */}
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

          {/* Emergency Direct Hotlines (1.3s) with subtle phone pulse */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-3"
          >
            <span className="flex items-center gap-1 text-red-400 font-bold">
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              HOTLINES: 101 / 112
            </span>
            <span>•</span>
            <span className="text-slate-400">+91-22-2811-2988 (MBMC Control Room)</span>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Fully Animated Fire Engine & Live Dispatch Vector (Cols 7-12) */}
        <div className="lg:col-span-6 flex flex-col space-y-4 items-center justify-center relative">
          
          {/* Animated 3/4 Perspective Fire Engine with Lightbar, Headlights & Telemetry */}
          <VehicleMotion
            parallaxX={mousePos.x}
            parallaxY={mousePos.y}
          />

          {/* Live CAD Route Vector with Moving Beacon & Countdown ETA */}
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : mousePos.x * 0.6,
            }}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="w-full max-w-[620px]"
          >
            <ResponseRoute />
          </motion.div>
        </div>
      </div>

      {/* Emergency CAD Intake Modal */}
      <QuickDispatchModal
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
      />
    </motion.section>
  );
}
