import * as React from "react";
import { FireStation } from "@/types/station";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Users, 
  Truck, 
  Droplet, 
  Radio, 
  ExternalLink,
  ShieldCheck,
  Flame
} from "lucide-react";

interface StationCardProps {
  station: FireStation;
  onSelect: (station: FireStation) => void;
}

export function StationCard({ station, onSelect }: StationCardProps) {
  const waterPct = Math.round((station.waterReserveLiters / station.waterMaxCapacityLiters) * 100);
  const isHighActivity = station.activeIncidentsCount > 0;

  return (
    <Card
      onClick={() => onSelect(station)}
      className={`border transition-all cursor-pointer group hover:scale-[1.01] font-mono text-xs ${
        isHighActivity
          ? "bg-[#120d11] border-red-900/80 hover:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
          : "bg-[#0e1217] border-slate-800 hover:border-slate-700"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded border ${
              isHighActivity
                ? "bg-red-950 border-red-800 text-red-400 animate-pulse"
                : "bg-blue-950 border-blue-800 text-blue-400"
            }`}
          >
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                {station.code}
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded border font-bold ${
                  isHighActivity
                    ? "bg-red-950 text-red-300 border-red-700 animate-pulse"
                    : "bg-emerald-950 text-emerald-300 border-emerald-800"
                }`}
              >
                {isHighActivity ? "ACTIVE CALLOUT" : "OPERATIONAL STANDBY"}
              </span>
            </div>
            <CardTitle className="text-xs text-slate-200 mt-0.5 font-sans">
              {station.name}
            </CardTitle>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-7 text-[10px] text-slate-300 border-slate-700 hover:bg-slate-800"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          BAY VIEW
        </Button>
      </CardHeader>

      <CardContent className="space-y-3 p-4 pt-0">
        {/* Address & Officer */}
        <div className="space-y-1 text-slate-400 text-[11px]">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="truncate">{station.address}</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span>Officer in Charge: <strong className="text-slate-200">{station.officerInCharge} ({station.officerRank.split(" ")[0]})</strong></span>
            <span className="text-slate-500">Tel: {station.phone}</span>
          </div>
        </div>

        {/* 3 Core Metres */}
        <div className="grid grid-cols-3 gap-2 bg-[#090d12] p-2.5 rounded-md border border-slate-800/80 text-[10px]">
          <div>
            <span className="text-slate-500 flex items-center gap-1">
              <Truck className="w-3 h-3 text-orange-400" />
              VEHICLES
            </span>
            <div className="font-bold text-white text-xs mt-0.5">
              {station.vehiclesAssignedIds.length} Assigned
            </div>
            <div className="text-slate-400 text-[9px]">{station.baysOccupied}/{station.baysTotal} Bays Full</div>
          </div>

          <div>
            <span className="text-slate-500 flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-400" />
              DUTY CREW
            </span>
            <div className="font-bold text-emerald-300 text-xs mt-0.5">
              {station.personnelOnDuty} / {station.personnelTotal}
            </div>
            <div className="text-slate-400 text-[9px]">Shift Alpha</div>
          </div>

          <div>
            <span className="text-slate-500 flex items-center gap-1">
              <Droplet className="w-3 h-3 text-cyan-400" />
              RESERVOIR
            </span>
            <div className="font-bold text-cyan-300 text-xs mt-0.5">
              {Math.round(station.waterReserveLiters / 1000)}k L
            </div>
            <div className="text-cyan-400 text-[9px]">{waterPct}% Capacity</div>
          </div>
        </div>

        {/* Water Level Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Water Reservoir Capacity:</span>
            <span className="text-cyan-400 font-bold">{waterPct}%</span>
          </div>
          <Progress value={waterPct} indicatorColor="bg-cyan-500" size="sm" />
        </div>

        {/* Hydrant Grid preview */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
          <span>Adjacent Grid Hydrants: <strong className="text-slate-200">{station.hydrantsNearby.length} Points</strong></span>
          <span className="text-emerald-400 font-semibold">Avg Turnout: {station.turnoutTimeAvgSeconds}s</span>
        </div>
      </CardContent>
    </Card>
  );
}
