import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ShieldCheck, 
  Droplet, 
  Users, 
  Truck, 
  Activity,
  Gauge
} from "lucide-react";
import { FireStation } from "@/types/station";
import { EmergencyVehicle } from "@/types/vehicle";

interface ResourceReadinessCardProps {
  stations: FireStation[];
  vehicles: EmergencyVehicle[];
}

export function ResourceReadinessCard({
  stations,
  vehicles,
}: ResourceReadinessCardProps) {
  const totalWaterReserve = stations.reduce((acc, s) => acc + s.waterReserveLiters, 0);
  const maxWaterReserve = stations.reduce((acc, s) => acc + s.waterMaxCapacityLiters, 0);
  const waterPct = Math.round((totalWaterReserve / maxWaterReserve) * 100);

  const availableVehicles = vehicles.filter((v) => v.status === "AVAILABLE_IN_STATION").length;
  const activePumpingVehicles = vehicles.filter((v) => v.status === "ON_SCENE_PUMPING" || v.status === "EN_ROUTE").length;

  const totalCrewOnDuty = stations.reduce((acc, s) => acc + s.personnelOnDuty, 0);
  const totalPersonnel = stations.reduce((acc, s) => acc + s.personnelTotal, 0);
  const personnelPct = Math.round((totalCrewOnDuty / totalPersonnel) * 100);

  return (
    <Card className="border-slate-800 bg-[#0e1217]">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-blue-950/80 border border-blue-800 text-blue-400">
            <Activity className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm font-mono uppercase">
            MUNICIPAL RESOURCE READINESS
          </CardTitle>
        </div>
        <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
          96.4% OPERATIONAL
        </span>
      </CardHeader>

      <CardContent className="space-y-4 font-mono text-xs">
        {/* Water Reserves */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-300">
            <span className="flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-cyan-400" />
              <span>STATION WATER RESERVOIRS</span>
            </span>
            <span className="font-bold text-cyan-400">
              {totalWaterReserve.toLocaleString()} L / {maxWaterReserve.toLocaleString()} L ({waterPct}%)
            </span>
          </div>
          <Progress value={waterPct} indicatorColor="bg-cyan-500" size="sm" />
        </div>

        {/* Fleet Deployment State */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-300">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-orange-400" />
              <span>APPARATUS FLEET STATUS</span>
            </span>
            <span className="font-bold text-orange-400">
              {availableVehicles} Ready • {activePumpingVehicles} Deployed
            </span>
          </div>
          <div className="grid grid-cols-14 gap-1 h-3 pt-0.5">
            {vehicles.map((v) => {
              const isDeployed = v.status === "ON_SCENE_PUMPING" || v.status === "EN_ROUTE";
              const isMaint = v.status === "IN_MAINTENANCE";
              return (
                <div
                  key={v.id}
                  title={`${v.id} - ${v.name} (${v.status})`}
                  className={`rounded-xs transition-all ${
                    isDeployed
                      ? "bg-red-500 animate-pulse shadow-[0_0_4px_rgba(239,68,68,0.8)]"
                      : isMaint
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Personnel Crew on Duty */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-300">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>FIREFIGHTER CREW ON DUTY</span>
            </span>
            <span className="font-bold text-emerald-400">
              {totalCrewOnDuty} / {totalPersonnel} Personnel ({personnelPct}%)
            </span>
          </div>
          <Progress value={personnelPct} indicatorColor="bg-emerald-500" size="sm" />
        </div>

        {/* Hydrant Grid Pressure */}
        <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-3 text-[11px]">
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1">
              <Gauge className="w-3 h-3 text-cyan-400" />
              <span>AVG HYDRANT PSI</span>
            </div>
            <div className="text-base font-bold text-white mt-1">
              5.6 BAR <span className="text-[10px] text-emerald-400 font-normal">(NORMAL)</span>
            </div>
          </div>

          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>SCBA TANK STOCK</span>
            </div>
            <div className="text-base font-bold text-white mt-1">
              64 CYL <span className="text-[10px] text-emerald-400 font-normal">(300 BAR)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
