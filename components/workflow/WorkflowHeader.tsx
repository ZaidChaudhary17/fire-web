"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldAlert, Activity, Play, Pause, RotateCcw } from "lucide-react";

interface WorkflowHeaderProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  activeStage: number;
}

export function WorkflowHeader({
  isPlaying,
  onTogglePlay,
  onReset,
  activeStage,
}: WorkflowHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-4">
      {/* Eyebrow & Pipeline Status */}
      <div className="flex items-center gap-3 text-xs font-mono text-slate-500 uppercase tracking-widest">
        <span className="h-px bg-slate-800 flex-1 max-w-[60px]" />
        <span className="flex items-center gap-1.5 text-red-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          EMERGENCY RESPONSE WORKFLOW
        </span>
        <span className="h-px bg-slate-800 flex-1 max-w-[60px]" />
      </div>

      {/* Main Heading & Control Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight font-sans">
            FROM FIRST ALERT
            <br />
            <span className="text-slate-300">TO FINAL RESPONSE.</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            A coordinated digital workflow connecting citizens, control-room operators, fire stations and field crews through every stage of an emergency response.
          </p>
        </div>

        {/* Tactical Pipeline Simulation Controller & Priority Legend */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Priority Legend */}
          <div className="hidden sm:flex items-center gap-2 bg-[#090d14] border border-slate-800 px-3 py-1.5 rounded text-[10px] font-mono">
            <span className="text-slate-500 font-bold">TRIAGE:</span>
            <span className="text-red-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              CRITICAL
            </span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              HIGH
            </span>
            <span className="text-blue-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              MEDIUM
            </span>
          </div>

          {/* Workflow Auto-Cycle Toggle */}
          <div className="flex items-center gap-1.5 bg-[#090d14] border border-slate-800 p-1 rounded">
            <button
              onClick={onTogglePlay}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-200 transition cursor-pointer"
              title={isPlaying ? "Pause automated workflow simulation" : "Play automated workflow simulation"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-amber-400" />
                  <span>SIMULATING (STAGE 0{activeStage + 1})</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span>PLAY SIMULATION</span>
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              title="Reset workflow to Stage 01"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
