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
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-100 border border-blue-200 text-blue-700">
            <Activity className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm font-bold text-[#0a2540] uppercase font-sans">
            MUNICIPAL RESOURCE READINESS
          </CardTitle>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-bold">
          96.4% OPERATIONAL
        </span>
      </CardHeader>

      <CardContent className="space-y-4 text-xs p-4">
        {/* Water Reserves */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-700">
            <span className="flex items-center gap-1.5 font-bold">
              <Droplet className="w-3.5 h-3.5 text-blue-600" />
              <span>STATION WATER RESERVOIRS</span>
            </span>
            <span className="font-bold text-blue-700">
              {totalWaterReserve.toLocaleString()} L / {maxWaterReserve.toLocaleString()} L ({waterPct}%)
            </span>
          </div>
          <Progress value={waterPct} indicatorColor="bg-blue-600" size="sm" />
        </div>

        {/* Fleet Deployment State */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-700">
            <span className="flex items-center gap-1.5 font-bold">
              <Truck className="w-3.5 h-3.5 text-orange-600" />
              <span>APPARATUS FLEET STATUS</span>
            </span>
            <span className="font-bold text-orange-700">
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
                      ? "bg-red-600 animate-pulse"
                      : isMaint
                      ? "bg-amber-500"
                      : "bg-emerald-600"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Personnel Crew on Duty */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-700">
            <span className="flex items-center gap-1.5 font-bold">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              <span>FIREFIGHTER CREW ON DUTY</span>
            </span>
            <span className="font-bold text-emerald-700">
              {totalCrewOnDuty} / {totalPersonnel} Personnel ({personnelPct}%)
            </span>
          </div>
          <Progress value={personnelPct} indicatorColor="bg-emerald-600" size="sm" />
        </div>

        {/* Hydrant Grid Pressure */}
        <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="text-slate-600 flex items-center gap-1 font-bold">
              <Gauge className="w-3.5 h-3.5 text-blue-600" />
              <span>AVG HYDRANT PSI</span>
            </div>
            <div className="text-base font-bold text-[#0a2540] mt-1 font-sans">
              5.6 BAR <span className="text-xs text-emerald-700 font-normal">(NORMAL)</span>
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="text-slate-600 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>SCBA TANK STOCK</span>
            </div>
            <div className="text-base font-bold text-[#0a2540] mt-1 font-sans">
              64 CYL <span className="text-xs text-emerald-700 font-normal">(300 BAR)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
