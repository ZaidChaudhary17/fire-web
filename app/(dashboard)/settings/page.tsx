"use client";

import * as React from "react";
import { EocSettingsPanel } from "@/components/settings/EocSettingsPanel";
import { Settings, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-4 font-mono">
      {/* Top Banner */}
      <div className="p-4 rounded-lg bg-[#0e1217] border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase">
              EOC SYSTEM PARAMETERS & TELEMATICS GATEWAY
            </h2>
            <p className="text-[11px] text-slate-400">
              Command console configuration for Central EOC (Bhayandar W)
            </p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <EocSettingsPanel />
    </div>
  );
}
