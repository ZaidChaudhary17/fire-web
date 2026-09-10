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
    <div className="space-y-4 text-xs">
      {/* Top Filter Bar */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search roster by Name, Badge ID, Rank, Certifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:bg-white text-xs h-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-600 font-semibold text-xs">Status:</span>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-40 h-9 text-xs bg-slate-50 border-slate-300 text-slate-800"
              >
                <option value="ALL">All Statuses</option>
                <option value="ON_DUTY_AVAILABLE">On Duty (Ready)</option>
                <option value="DEPLOYED_ACTIVE">Deployed Active</option>
                <option value="ON_STANDBY">On Standby</option>
                <option value="OFF_DUTY">Off Duty</option>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-600 font-semibold text-xs">Station:</span>
              <Select
                value={stationFilter}
                onChange={(e) => setStationFilter(e.target.value)}
                className="w-44 h-9 text-xs bg-slate-50 border-slate-300 text-slate-800"
              >
                <option value="ALL">All Stations</option>
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
              className={`border transition-all cursor-pointer group hover:shadow-md bg-white ${
                isDeployed
                  ? "border-red-300 ring-1 ring-red-200"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <CardHeader className="pb-2 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    {person.badgeNumber}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                      isDeployed
                        ? "bg-red-50 text-red-700 border-red-200 animate-pulse"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {isDeployed ? "Deployed" : "On Duty"}
                  </span>
                </div>

                <div className="mt-2">
                  <CardTitle className="text-sm text-slate-900 font-bold">
                    {person.name}
                  </CardTitle>
                  <p className="text-[11px] text-slate-500 font-medium">{person.rank}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-2.5 p-4 pt-3">
                <div className="text-[11px] text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Station:</span>
                    <span className="text-slate-900 font-semibold">{person.stationName.split("-")[1] || person.stationName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shift:</span>
                    <span className="text-emerald-800 font-semibold">{person.shift.split(" ")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Blood Group:</span>
                    <span className="text-red-700 font-bold">{person.bloodGroup}</span>
                  </div>
                </div>

                {/* Biometrics if deployed */}
                {isDeployed && person.heartRateBpm && (
                  <div className="flex items-center justify-between text-[11px] bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 text-red-800 font-medium">
                    <span className="flex items-center gap-1 font-semibold">
                      <Heart className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                      HR: {person.heartRateBpm} BPM
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-800">
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                      SpO2: {person.oxygenLevelPct}%
                    </span>
                  </div>
                )}

                {/* Specialization Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {person.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Service: {person.yearsOfService} Yrs</span>
                  <span className="text-slate-700 font-medium flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
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
