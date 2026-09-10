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
    <Card className="border-slate-800 bg-[#0e1217]">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-blue-950/80 border border-blue-800 text-blue-400">
            <Building2 className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm font-mono uppercase">
            MUNICIPAL FIRE STATIONS OVERVIEW
          </CardTitle>
        </div>
        <Link
          href="/stations"
          className="text-xs font-mono text-red-400 hover:underline flex items-center gap-1"
        >
          <span>VIEW ALL 5 BAYS</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
          {stations.map((station) => {
            const hasActiveIncident = station.activeIncidentsCount > 0;

            return (
              <div
                key={station.id}
                onClick={() => onSelectStation && onSelectStation(station)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  hasActiveIncident
                    ? "bg-red-950/20 border-red-800/80 hover:border-red-500"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Station Code & Status Indicator */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-100 text-xs">
                    {station.code}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      hasActiveIncident ? "bg-red-500 animate-ping" : "bg-emerald-500"
                    }`}
                  />
                </div>

                <h4 className="font-semibold text-slate-200 text-xs line-clamp-1 mb-2">
                  {station.name.replace("Station ", "Stn ")}
                </h4>

                <div className="space-y-1 text-[11px] text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-orange-400" />
                      Apparatus:
                    </span>
                    <span className="text-slate-200 font-semibold">
                      {station.vehiclesAssignedIds.length} Units
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-400" />
                      Duty Crew:
                    </span>
                    <span className="text-slate-200 font-semibold">
                      {station.personnelOnDuty} / {station.personnelTotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Droplet className="w-3 h-3 text-cyan-400" />
                      Water Res:
                    </span>
                    <span className="text-cyan-300 font-semibold">
                      {Math.round(station.waterReserveLiters / 1000)}k L
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 truncate">{station.ward.split("-")[0]}</span>
                  <span className="text-red-400 font-bold">
                    {station.activeIncidentsCount > 0 ? "1 ACTIVE CALL" : "STANDBY"}
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
