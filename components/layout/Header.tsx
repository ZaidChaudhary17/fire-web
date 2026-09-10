"use client";

import * as React from "react";
import { LiveClock } from "@/components/shared/LiveClock";
import { AudioToneAlertToggle } from "@/components/shared/AudioToneAlertToggle";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { 
  Flame, 
  Radio, 
  PlusCircle, 
  ShieldAlert, 
  Phone,
  Wifi
} from "lucide-react";
import { MBMC_CONFIG } from "@/lib/constants";
import { QuickDispatchModal } from "./QuickDispatchModal";
import { Incident } from "@/types/incident";

export function Header({
  onNewIncidentCreated,
}: {
  onNewIncidentCreated?: (incident: Incident) => void;
}) {
  const [selectedRadio, setSelectedRadio] = React.useState("CH-01");
  const [defcon, setDefcon] = React.useState("CONDITION_RED");
  const [dispatchModalOpen, setDispatchModalOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-[#0a0d12]/95 px-4 backdrop-blur-md">
      {/* Left section: EOC status & Live time */}
      <div className="flex items-center gap-3">
        <LiveClock />

        {/* Radio Channel monitor */}
        <div className="hidden lg:flex items-center gap-2 bg-[#0e1217] px-2.5 py-1.5 rounded-md border border-slate-800 text-xs font-mono">
          <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span className="text-slate-400">VHF COMMS:</span>
          <select
            value={selectedRadio}
            onChange={(e) => setSelectedRadio(e.target.value)}
            className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
          >
            {MBMC_CONFIG.radioChannels.map((rc) => (
              <option key={rc.channel} value={rc.channel} className="bg-slate-900 text-slate-200">
                {rc.channel} - {rc.freq} ({rc.name.split(" ")[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right section: DEFCON, Telemetry Link, Audio Sirens, Quick Dispatch */}
      <div className="flex items-center gap-2.5">
        {/* DEFCON / Alert State Indicator */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#0e1217] px-2.5 py-1 rounded-md border border-slate-800 text-[11px] font-mono">
          <span className="text-slate-400">ALERT:</span>
          <select
            value={defcon}
            onChange={(e) => setDefcon(e.target.value)}
            className={`font-bold focus:outline-none bg-transparent cursor-pointer ${
              defcon === "CONDITION_RED"
                ? "text-red-400"
                : defcon === "CONDITION_AMBER"
                ? "text-amber-400"
                : "text-emerald-400"
            }`}
          >
            <option value="CONDITION_RED" className="bg-slate-900 text-red-400">
              CONDITION RED (HIGH OPS)
            </option>
            <option value="CONDITION_AMBER" className="bg-slate-900 text-amber-400">
              CONDITION AMBER (ELEVATED)
            </option>
            <option value="CONDITION_GREEN" className="bg-slate-900 text-emerald-400">
              CONDITION GREEN (NORMAL)
            </option>
          </select>
        </div>

        {/* Telemetry link status */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-1 rounded">
          <Wifi className="w-3 h-3" />
          <span>EOC LINKED</span>
        </div>

        {/* Siren sound tone toggle */}
        <AudioToneAlertToggle />

        {/* High-priority CAD Dispatch CTA */}
        <Button
          onClick={() => setDispatchModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] border border-red-400/50"
        >
          <PlusCircle className="w-4 h-4 animate-pulse" />
          <span className="hidden sm:inline">NEW 101 DISPATCH</span>
          <span className="sm:hidden">DISPATCH</span>
        </Button>
      </div>

      <QuickDispatchModal
        open={dispatchModalOpen}
        onOpenChange={setDispatchModalOpen}
        onDispatchCreated={(newInc) => {
          if (onNewIncidentCreated) onNewIncidentCreated(newInc);
        }}
      />
    </header>
  );
}
