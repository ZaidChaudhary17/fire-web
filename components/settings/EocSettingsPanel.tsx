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
    <Card className="border-slate-200 bg-white shadow-sm text-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
              EOC Console Configuration & Parameters
            </CardTitle>
            <p className="text-[11px] text-slate-500 font-medium">
              Centralized dispatch triggers, VHF radio repeaters & ward boundaries
            </p>
          </div>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Config Saved</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-4">
        <form onSubmit={handleSave} className="space-y-4">
          {/* Dispatch Thresholds */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-[#0a2540] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Alarm Benchmark & Dispatch Timing Thresholds</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 font-semibold text-xs">Max Turnout Target (Seconds)</label>
                <Input
                  value={turnoutThreshold}
                  onChange={(e) => setTurnoutThreshold(e.target.value)}
                  className="mt-1 bg-white border-slate-300 text-slate-900 text-xs h-9"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold text-xs">Max Travel Target (Seconds)</label>
                <Input
                  value={travelThreshold}
                  onChange={(e) => setTravelThreshold(e.target.value)}
                  className="mt-1 bg-white border-slate-300 text-slate-900 text-xs h-9"
                />
              </div>
            </div>
          </div>

          {/* VHF Radio Channels */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-[#0a2540] uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-blue-700" />
              <span>VHF Wireless Repeater Network (MBMC Fire Ground)</span>
            </div>

            <div className="space-y-2">
              {MBMC_CONFIG.radioChannels.map((rc) => (
                <div
                  key={rc.channel}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-red-600">{rc.channel}</span>
                    <span className="text-slate-800 font-medium">{rc.name}</span>
                  </div>
                  <span className="text-blue-900 font-bold">{rc.freq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Municipal HQ Details */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700 text-xs">
            <div className="font-bold text-[#0a2540] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>EOC Headquarters Designation</span>
            </div>
            <p><span className="font-semibold text-slate-900">Jurisdiction:</span> {MBMC_CONFIG.jurisdiction}</p>
            <p><span className="font-semibold text-slate-900">Facility:</span> {MBMC_CONFIG.eocLocation}</p>
            <p><span className="font-semibold text-slate-900">Hotlines:</span> {MBMC_CONFIG.emergencyHotlines.join(" • ")}</p>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              className="bg-[#0a2540] hover:bg-slate-800 text-white font-bold gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Update EOC Configuration</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
