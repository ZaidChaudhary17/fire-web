"use client";

import * as React from "react";
import { MOCK_PERSONNEL } from "@/lib/mock-data";
import { Personnel } from "@/types/personnel";
import { PersonnelRoster } from "@/components/personnel/PersonnelRoster";
import { Users, ShieldCheck, Heart, Award } from "lucide-react";

export default function PersonnelPage() {
  const [personnel] = React.useState<Personnel[]>(MOCK_PERSONNEL);

  const deployedCount = personnel.filter((p) => p.dutyStatus === "DEPLOYED_ACTIVE").length;
  const availableCount = personnel.filter((p) => p.dutyStatus === "ON_DUTY_AVAILABLE").length;

  return (
    <div className="space-y-4 font-mono">
      {/* Top Roster Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>TOTAL ROSTER FORCE</span>
          </div>
          <div className="text-xl font-bold text-white mt-1">
            42 Personnel
          </div>
          <p className="text-[10px] text-slate-500">Officers & Firefighters</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ON DUTY AT STATIONS</span>
          </div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {availableCount} Officers
          </div>
          <p className="text-[10px] text-slate-500">Shift Alpha Active</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>DEPLOYED ON SCENE</span>
          </div>
          <div className="text-xl font-bold text-red-400 mt-1">
            {deployedCount} Firefighters
          </div>
          <p className="text-[10px] text-slate-500">Live biometrics monitored</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>CERTIFIED ICS SPECIALISTS</span>
          </div>
          <div className="text-xl font-bold text-amber-300 mt-1">
            28 Certified
          </div>
          <p className="text-[10px] text-slate-500">Hazmat & High-Angle Rescue</p>
        </div>
      </div>

      {/* Roster View */}
      <PersonnelRoster personnel={personnel} />
    </div>
  );
}
