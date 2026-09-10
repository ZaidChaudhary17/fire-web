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
    <div className="space-y-4">
      {/* Top Roster Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Users className="w-4 h-4 text-blue-700" />
            <span>Total Roster Force</span>
          </div>
          <div className="text-2xl font-bold text-[#0a2540] mt-1">
            42 Personnel
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Officers & Firefighters</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>On Duty At Stations</span>
          </div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">
            {availableCount} Officers
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Shift Alpha Active</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Heart className="w-4 h-4 text-red-600" />
            <span>Deployed On Scene</span>
          </div>
          <div className="text-2xl font-bold text-red-700 mt-1">
            {deployedCount} Firefighters
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Live biometrics monitored</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Certified Specialists</span>
          </div>
          <div className="text-2xl font-bold text-amber-900 mt-1">
            28 Certified
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Hazmat & High-Angle Rescue</p>
        </div>
      </div>

      {/* Roster View */}
      <PersonnelRoster personnel={personnel} />
    </div>
  );
}
