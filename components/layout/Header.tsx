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
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm">
      {/* Left section: EOC status & Live time */}
      <div className="flex items-center gap-3">
        <LiveClock />

        {/* Radio Channel monitor */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200 text-xs font-sans">
          <Radio className="w-3.5 h-3.5 text-red-600" />
          <span className="text-slate-500 font-bold">VHF COMMS:</span>
          <select
            value={selectedRadio}
            onChange={(e) => setSelectedRadio(e.target.value)}
            className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer"
          >
            {MBMC_CONFIG.radioChannels.map((rc) => (
              <option key={rc.channel} value={rc.channel} className="bg-white text-slate-800">
                {rc.channel} - {rc.freq} ({rc.name.split(" ")[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right section: Alert State, Telemetry Link, Audio Sirens, Quick Dispatch */}
      <div className="flex items-center gap-2.5">
        {/* DEFCON / Alert State Indicator */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 text-[11px] font-sans">
          <span className="text-slate-500 font-bold">ALERT LEVEL:</span>
          <select
            value={defcon}
            onChange={(e) => setDefcon(e.target.value)}
            className={`font-bold focus:outline-none bg-transparent cursor-pointer ${
              defcon === "CONDITION_RED"
                ? "text-red-700"
                : defcon === "CONDITION_AMBER"
                ? "text-amber-700"
                : "text-emerald-700"
            }`}
          >
            <option value="CONDITION_RED" className="bg-white text-red-700">
              CONDITION RED (HIGH ALERT)
            </option>
            <option value="CONDITION_AMBER" className="bg-white text-amber-700">
              CONDITION AMBER (ELEVATED)
            </option>
            <option value="CONDITION_GREEN" className="bg-white text-emerald-700">
              CONDITION GREEN (NORMAL)
            </option>
          </select>
        </div>

        {/* Telemetry link status */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded">
          <Wifi className="w-3.5 h-3.5 text-emerald-600" />
          <span>EOC NETWORK ACTIVE</span>
        </div>

        {/* Siren sound tone toggle */}
        <AudioToneAlertToggle />

        {/* High-priority CAD Dispatch CTA (Safety Red exclusively) */}
        <Button
          onClick={() => setDispatchModalOpen(true)}
          className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs gap-1.5 shadow-sm border border-red-700"
        >
          <PlusCircle className="w-4 h-4" />
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
