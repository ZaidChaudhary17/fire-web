"use client";

import * as React from "react";
import { MOCK_VEHICLES, MOCK_INCIDENTS, MOCK_STATIONS } from "@/lib/mock-data";
import { EmergencyVehicle } from "@/types/vehicle";
import { VehicleFleetGrid } from "@/components/vehicles/VehicleFleetGrid";
import { VehicleTelemetryModal } from "@/components/vehicles/VehicleTelemetryModal";
import { Truck, Droplet, Gauge, Wrench, ShieldCheck } from "lucide-react";

export default function VehiclesPage() {
  const [vehicles] = React.useState<EmergencyVehicle[]>(MOCK_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = React.useState<EmergencyVehicle | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleSelectVehicle = (veh: EmergencyVehicle) => {
    setSelectedVehicle(veh);
    setModalOpen(true);
  };

  const availableCount = vehicles.filter((v) => v.status === "AVAILABLE_IN_STATION").length;
  const pumpingCount = vehicles.filter((v) => v.status === "ON_SCENE_PUMPING").length;
  const enRouteCount = vehicles.filter((v) => v.status === "EN_ROUTE").length;
  const maintCount = vehicles.filter((v) => v.status === "IN_MAINTENANCE").length;

  return (
    <div className="space-y-4 font-mono">
      {/* Fleet Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AVAILABLE AT STATIONS</span>
          </div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {availableCount} Engines
          </div>
          <p className="text-[10px] text-slate-500">Ready for instant dispatch</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>ON SCENE PUMPING</span>
          </div>
          <div className="text-xl font-bold text-amber-400 mt-1">
            {pumpingCount} Engines
          </div>
          <p className="text-[10px] text-slate-500">Active fireground operations</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-orange-400" />
            <span>EN ROUTE WITH SIRENS</span>
          </div>
          <div className="text-xl font-bold text-orange-400 mt-1">
            {enRouteCount} Units
          </div>
          <p className="text-[10px] text-slate-500">Responding to emergency call</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-slate-400" />
            <span>IN WORKSHOP / SERVICE</span>
          </div>
          <div className="text-xl font-bold text-slate-300 mt-1">
            {maintCount} Unit
          </div>
          <p className="text-[10px] text-slate-500">Scheduled pump calibration</p>
        </div>
      </div>

      {/* Fleet Grid */}
      <VehicleFleetGrid
        vehicles={vehicles}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* Detailed Modal */}
      <VehicleTelemetryModal
        vehicle={selectedVehicle}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
