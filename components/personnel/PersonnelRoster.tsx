"use client";

import * as React from "react";
import { Personnel, RankLevel, DutyStatus } from "@/types/personnel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Heart, 
  Activity, 
  Phone, 
  Award,
  Filter
} from "lucide-react";

interface PersonnelRosterProps {
  personnel: Personnel[];
  onSelectPersonnel?: (person: Personnel) => void;
}

export function PersonnelRoster({
  personnel,
  onSelectPersonnel,
}: PersonnelRosterProps) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("ALL");
  const [stationFilter, setStationFilter] = React.useState<string>("ALL");

  const filteredPersonnel = personnel.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.badgeNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.rank.toLowerCase().includes(search.toLowerCase()) ||
      p.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || p.dutyStatus === statusFilter;
    const matchesStation = stationFilter === "ALL" || p.stationId === stationFilter;

    return matchesSearch && matchesStatus && matchesStation;
  });

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Top Filter Bar */}
      <Card className="border-slate-800 bg-[#0e1217]">
        <CardContent className="p-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search roster by Name, Badge ID, Rank, Certifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-slate-900 text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">STATUS:</span>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-36 h-8 text-xs bg-slate-900"
              >
                <option value="ALL">ALL STATUSES</option>
                <option value="ON_DUTY_AVAILABLE">ON DUTY (READY)</option>
                <option value="DEPLOYED_ACTIVE">DEPLOYED ACTIVE</option>
                <option value="ON_STANDBY">ON STANDBY</option>
                <option value="OFF_DUTY">OFF DUTY</option>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">STATION:</span>
              <Select
                value={stationFilter}
                onChange={(e) => setStationFilter(e.target.value)}
                className="w-36 h-8 text-xs bg-slate-900"
              >
                <option value="ALL">ALL STATIONS</option>
                <option value="STN-01">STN-01 Mira Rd (E)</option>
                <option value="STN-02">STN-02 Bhayandar (W)</option>
                <option value="STN-03">STN-03 Bhayandar (E)</option>
                <option value="STN-04">STN-04 Kashimira</option>
                <option value="STN-05">STN-05 Uttan Coastal</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid of Personnel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredPersonnel.map((person) => {
          const isDeployed = person.dutyStatus === "DEPLOYED_ACTIVE";

          return (
            <Card
              key={person.id}
              onClick={() => onSelectPersonnel && onSelectPersonnel(person)}
              className={`border transition-all cursor-pointer group hover:scale-[1.01] ${
                isDeployed
                  ? "bg-red-950/15 border-red-900/80 hover:border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                  : "bg-[#0e1217] border-slate-800 hover:border-slate-700"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-900">
                    {person.badgeNumber}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded border font-bold ${
                      isDeployed
                        ? "bg-red-950 text-red-300 border-red-700 animate-pulse"
                        : "bg-emerald-950 text-emerald-300 border-emerald-800"
                    }`}
                  >
                    {isDeployed ? "DEPLOYED" : "ON DUTY"}
                  </span>
                </div>

                <div className="mt-2">
                  <CardTitle className="text-sm text-white font-bold font-sans">
                    {person.name}
                  </CardTitle>
                  <p className="text-[11px] text-slate-400">{person.rank}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-2.5 p-4 pt-0">
                <div className="text-[10px] text-slate-400 space-y-1 bg-[#090d12] p-2 rounded border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Station:</span>
                    <span className="text-slate-200 font-semibold">{person.stationName.split("-")[1] || person.stationName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shift:</span>
                    <span className="text-emerald-400 font-semibold">{person.shift.split(" ")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Blood Group:</span>
                    <span className="text-red-400 font-bold">{person.bloodGroup}</span>
                  </div>
                </div>

                {/* Biometrics if deployed */}
                {isDeployed && person.heartRateBpm && (
                  <div className="flex items-center justify-between text-[10px] bg-red-950/30 px-2 py-1 rounded border border-red-900/60 text-red-300">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400 animate-pulse" />
                      HR: {person.heartRateBpm} BPM
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      SpO2: {person.oxygenLevelPct}%
                    </span>
                  </div>
                )}

                {/* Specialization Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {person.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Service: {person.yearsOfService} Years</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    {person.phone}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
