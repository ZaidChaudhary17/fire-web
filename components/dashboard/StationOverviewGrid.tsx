import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FireStation } from "@/types/station";
import { Building2, Users, Truck, Droplet, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";

interface StationOverviewGridProps {
  stations: FireStation[];
  onSelectStation?: (station: FireStation) => void;
}

export function StationOverviewGrid({
  stations,
  onSelectStation,
}: StationOverviewGridProps) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
            <Building2 className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
            Municipal Fire Stations Overview
          </CardTitle>
        </div>
        <Link
          href="/stations"
          className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-1"
        >
          <span>View All 5 Stations</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {stations.map((station) => {
            const hasActiveIncident = station.activeIncidentsCount > 0;

            return (
              <div
                key={station.id}
                onClick={() => onSelectStation && onSelectStation(station)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  hasActiveIncident
                    ? "bg-red-50/50 border-red-200 hover:border-red-400 shadow-sm"
                    : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white shadow-sm"
                }`}
              >
                {/* Station Code & Status Indicator */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[#0a2540] text-xs">
                    {station.code}
                  </span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      hasActiveIncident ? "bg-red-600 animate-pulse" : "bg-emerald-600"
                    }`}
                  />
                </div>

                <h4 className="font-bold text-slate-900 text-xs line-clamp-1 mb-2">
                  {station.name.replace("Station ", "Stn ")}
                </h4>

                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 font-medium">
                      <Truck className="w-3.5 h-3.5 text-blue-700" />
                      Apparatus:
                    </span>
                    <span className="text-slate-900 font-bold">
                      {station.vehiclesAssignedIds.length} Units
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-emerald-700" />
                      Duty Crew:
                    </span>
                    <span className="text-slate-900 font-bold">
                      {station.personnelOnDuty} / {station.personnelTotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 font-medium">
                      <Droplet className="w-3.5 h-3.5 text-sky-700" />
                      Water Res:
                    </span>
                    <span className="text-sky-900 font-bold">
                      {Math.round(station.waterReserveLiters / 1000)}k L
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium truncate">{station.ward.split("-")[0]}</span>
                  <span className={`font-bold ${hasActiveIncident ? "text-red-700" : "text-emerald-700"}`}>
                    {station.activeIncidentsCount > 0 ? "1 Active Call" : "Standby"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
