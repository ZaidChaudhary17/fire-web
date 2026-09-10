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
    <div className="space-y-4">
      {/* Fleet Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>Available At Stations</span>
          </div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">
            {availableCount} Engines
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Ready for instant dispatch</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Gauge className="w-4 h-4 text-amber-600" />
            <span>On Scene Pumping</span>
          </div>
          <div className="text-2xl font-bold text-amber-900 mt-1">
            {pumpingCount} Engines
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Active fireground operations</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Truck className="w-4 h-4 text-orange-600" />
            <span>En Route (Sirens On)</span>
          </div>
          <div className="text-2xl font-bold text-orange-900 mt-1">
            {enRouteCount} Units
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Responding to emergency call</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Wrench className="w-4 h-4 text-slate-600" />
            <span>In Workshop / Service</span>
          </div>
          <div className="text-2xl font-bold text-slate-800 mt-1">
            {maintCount} Unit
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Scheduled pump calibration</p>
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
