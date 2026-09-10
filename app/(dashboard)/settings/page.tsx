"use client";

import * as React from "react";
import { EocSettingsPanel } from "@/components/settings/EocSettingsPanel";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
              EOC System Parameters & Telematics Gateway
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
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
