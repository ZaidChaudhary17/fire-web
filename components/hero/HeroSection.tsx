"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Flame, 
  PhoneCall, 
  ArrowRight, 
  ShieldAlert, 
  Radio, 
  ChevronRight,
  Activity,
  AlertOctagon
} from "lucide-react";
import { FireEngineVisual } from "./FireEngineVisual";
import { ResponseRouteIndicator } from "./ResponseRouteIndicator";
import { QuickDispatchModal } from "@/components/layout/QuickDispatchModal";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [reportModalOpen, setReportModalOpen] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 35; // max ~10px
    const y = (clientY - top - height / 2) / 35;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[calc(100vh-112px)] flex items-center justify-center overflow-hidden bg-[#07090c] text-slate-100 py-8 lg:py-12 px-4 sm:px-8"
    >
      {/* Subtle Atmospheric Urban Silhouette & Ambient Illumination */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle red emergency ambient glow */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[300px] bg-slate-900/40 rounded-full blur-[100px]" />

        {/* Faint Urban City Silhouette vector at horizon */}
        <svg
          className="absolute bottom-0 left-0 w-full h-44 text-slate-900/40 opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
        >
          <path
            d="M0,180 L0,120 L40,120 L40,80 L70,80 L70,110 L110,110 L110,50 L140,50 L140,130 L180,130 L180,95 L220,95 L220,140 L280,140 L280,70 L320,70 L320,120 L370,120 L370,40 L410,40 L410,110 L460,110 L460,85 L510,85 L510,140 L580,140 L580,60 L620,60 L620,105 L680,105 L680,50 L730,50 L730,130 L800,130 L800,80 L850,80 L850,115 L910,115 L910,45 L950,45 L950,125 L1010,125 L1010,75 L1070,75 L1070,135 L1140,135 L1140,90 L1200,90 L1200,180 Z"
            fill="currentColor"
          />
        </svg>

        {/* Subtle Road Perspective Surface Gradient */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#06070a] via-[#07090c]/80 to-transparent" />
      </div>

      {/* Main 2-Column Hero Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* LEFT COLUMN: Municipal Command Identity & Headline (Cols: 1–5 or 6) */}
        <div className="lg:col-span-6 flex flex-col space-y-5 text-left">
          {/* Eyebrow & Status */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono tracking-wider text-slate-400 font-bold uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>MIRA-BHAYANDAR FIRE & EMERGENCY SERVICES</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded bg-slate-900/90 border border-slate-800 px-2.5 py-1 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">RESPONSE NETWORK OPERATIONAL</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-sans">
            Faster Response.
            <br />
            <span className="text-slate-200">Smarter Coordination.</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-lg">
            Computer-Aided Dispatch and real-time emergency response management for Mira-Bhayandar.
          </p>

          {/* Live Response Workflow Line */}
          <div className="p-2.5 rounded bg-slate-900/70 border border-slate-800/80 font-mono text-[11px] flex items-center justify-between max-w-md">
            <span className="text-slate-500 font-semibold">CAD FLOW:</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">101 DISPATCH</span>
              <span className="text-slate-600">→</span>
              <span className="text-amber-400 font-bold flex items-center gap-1 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800/80 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                EN ROUTE
              </span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-400">ARRIVING</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setReportModalOpen(true)}
              className="inline-flex items-center gap-2 rounded bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-red-400/50 hover:bg-red-700 active:bg-red-800 transition font-mono uppercase cursor-pointer"
            >
              <AlertOctagon className="h-4 w-4 animate-pulse" />
              <span>REPORT EMERGENCY</span>
            </button>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded border border-slate-700 bg-slate-900/90 px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider text-slate-200 hover:bg-slate-800 hover:text-white transition font-mono uppercase"
            >
              <span>ENTER COMMAND CENTER</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>

          {/* Emergency Direct Phone Numbers */}
          <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-3">
            <span className="flex items-center gap-1 text-red-400 font-bold">
              <PhoneCall className="w-3.5 h-3.5" />
              HOTLINES: 101 / 112
            </span>
            <span>•</span>
            <span className="text-slate-400">+91-22-2811-2988 (MBMC Control)</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Cinematic Fire Engine & Live Telemetry (Cols: 7–12) */}
        <div className="lg:col-span-6 flex flex-col space-y-4 items-center justify-center relative">
          {/* Animated 3/4 Perspective Fire Engine */}
          <FireEngineVisual
            parallaxX={mousePos.x}
            parallaxY={mousePos.y}
          />

          {/* Live CAD Route Line beneath vehicle */}
          <div className="w-full max-w-[620px]">
            <ResponseRouteIndicator />
          </div>
        </div>
      </div>

      {/* Emergency CAD Intake Modal */}
      <QuickDispatchModal
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
      />
    </section>
  );
}
