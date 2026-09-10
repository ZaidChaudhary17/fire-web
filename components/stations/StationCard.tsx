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
      className={`border transition-all cursor-pointer group hover:shadow-md text-xs bg-white ${
        isHighActivity
          ? "border-red-300 ring-1 ring-red-200"
          : "border-slate-200 hover:border-blue-300"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-lg border ${
              isHighActivity
                ? "bg-red-50 border-red-200 text-red-600 animate-pulse"
                : "bg-blue-50 border-blue-200 text-[#0a2540]"
            }`}
          >
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0a2540] text-sm">
                {station.code}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${
                  isHighActivity
                    ? "bg-red-50 text-red-700 border-red-200 animate-pulse"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                {isHighActivity ? "Active Callout" : "Operational Standby"}
              </span>
            </div>
            <CardTitle className="text-xs text-slate-800 mt-0.5 font-bold">
              {station.name}
            </CardTitle>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-7 text-[11px] font-semibold text-blue-700 border-slate-300 hover:bg-blue-50"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          Station Bay
        </Button>
      </CardHeader>

      <CardContent className="space-y-3 p-4 pt-3">
        {/* Address & Officer */}
        <div className="space-y-1 text-slate-600 text-xs">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span className="truncate">{station.address}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span>Officer: <strong className="text-slate-900">{station.officerInCharge} ({station.officerRank.split(" ")[0]})</strong></span>
            <span className="text-slate-500 font-medium">Tel: {station.phone}</span>
          </div>
        </div>

        {/* 3 Core Metres */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px]">
          <div>
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Truck className="w-3 h-3 text-blue-700" />
              Vehicles
            </span>
            <div className="font-bold text-slate-900 text-xs mt-0.5">
              {station.vehiclesAssignedIds.length} Assigned
            </div>
            <div className="text-slate-500 text-[10px]">{station.baysOccupied}/{station.baysTotal} Bays</div>
          </div>

          <div>
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-700" />
              Crew
            </span>
            <div className="font-bold text-emerald-800 text-xs mt-0.5">
              {station.personnelOnDuty} / {station.personnelTotal}
            </div>
            <div className="text-slate-500 text-[10px]">Shift Alpha</div>
          </div>

          <div>
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Droplet className="w-3 h-3 text-sky-700" />
              Reservoir
            </span>
            <div className="font-bold text-sky-900 text-xs mt-0.5">
              {Math.round(station.waterReserveLiters / 1000)}k L
            </div>
            <div className="text-sky-700 text-[10px] font-semibold">{waterPct}% Full</div>
          </div>
        </div>

        {/* Water Level Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-slate-600 font-medium">
            <span>Water Reservoir Capacity:</span>
            <span className="text-sky-800 font-bold">{waterPct}%</span>
          </div>
          <Progress value={waterPct} indicatorColor="bg-sky-600" size="sm" />
        </div>

        {/* Hydrant Grid preview */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-100">
          <span>Adjacent Hydrants: <strong className="text-slate-900">{station.hydrantsNearby.length} Points</strong></span>
          <span className="text-emerald-700 font-semibold">Avg Turnout: {station.turnoutTimeAvgSeconds}s</span>
        </div>
      </CardContent>
    </Card>
  );
}
