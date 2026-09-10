"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { MBMC_CONFIG } from "@/lib/constants";
import { 
  Settings, 
  Radio, 
  Volume2, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  Server,
  MapPin
} from "lucide-react";

export function EocSettingsPanel() {
  const [radioFreq, setRadioFreq] = React.useState("156.800 MHz");
  const [defconDefault, setDefconDefault] = React.useState("CONDITION_RED");
  const [turnoutThreshold, setTurnoutThreshold] = React.useState("60");
  const [travelThreshold, setTravelThreshold] = React.useState("360");
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <Card className="border-slate-800 bg-[#0e1217] font-mono text-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm uppercase">
              EOC CONSOLE CONFIGURATION & PARAMETERS
            </CardTitle>
            <p className="text-[11px] text-slate-400">
              Centralized dispatch triggers, VHF radio repeaters & ward boundaries
            </p>
          </div>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1 text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CONFIG SAVED</span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          {/* Dispatch Thresholds */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              <span>ALARM BENCHMARK & DISPATCH TIMING THRESHOLDS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-[10px]">MAX TURNOUT TIME TARGET (SECONDS)</label>
                <Input
                  value={turnoutThreshold}
                  onChange={(e) => setTurnoutThreshold(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[10px]">MAX TRAVEL TIME TARGET (SECONDS)</label>
                <Input
                  value={travelThreshold}
                  onChange={(e) => setTravelThreshold(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* VHF Radio Channels */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-blue-400" />
              <span>VHF WIRELESS REPEATER NETWORK (MBMC FIRE GROUND)</span>
            </div>

            <div className="space-y-2">
              {MBMC_CONFIG.radioChannels.map((rc) => (
                <div
                  key={rc.channel}
                  className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-[11px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-400">{rc.channel}</span>
                    <span className="text-slate-200">{rc.name}</span>
                  </div>
                  <span className="text-cyan-400 font-bold">{rc.freq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Municipal HQ Details */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2 text-slate-300 text-[11px]">
            <div className="font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>EOC HEADQUARTERS DESIGNATION</span>
            </div>
            <p><span className="text-slate-500">Jurisdiction:</span> {MBMC_CONFIG.jurisdiction}</p>
            <p><span className="text-slate-500">Facility:</span> {MBMC_CONFIG.eocLocation}</p>
            <p><span className="text-slate-500">Hotlines:</span> {MBMC_CONFIG.emergencyHotlines.join(" • ")}</p>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>UPDATE EOC CONFIGURATION</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
