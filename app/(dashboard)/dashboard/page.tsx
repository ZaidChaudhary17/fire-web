"use client";

import * as React from "react";
import { 
  MOCK_INCIDENTS, 
  MOCK_STATIONS, 
  MOCK_VEHICLES, 
  MOCK_SYSTEM_STATUS 
} from "@/lib/mock-data";
import { Incident } from "@/types/incident";
import { FireStation } from "@/types/station";
import { EmergencyVehicle } from "@/types/vehicle";
import { MetricCard } from "@/components/shared/MetricCard";
import { MapMockCanvas } from "@/components/shared/MapMockCanvas";
import { LiveIncidentFeed } from "@/components/dashboard/LiveIncidentFeed";
import { ResourceReadinessCard } from "@/components/dashboard/ResourceReadinessCard";
import { ActiveVehiclesTracker } from "@/components/dashboard/ActiveVehiclesTracker";
import { StationOverviewGrid } from "@/components/dashboard/StationOverviewGrid";
import { IncidentSeverityGauge } from "@/components/dashboard/IncidentSeverityGauge";
import { IncidentDetailModal } from "@/components/emergency/IncidentDetailModal";
import { StationDetailModal } from "@/components/stations/StationDetailModal";
import { VehicleTelemetryModal } from "@/components/vehicles/VehicleTelemetryModal";
import { 
  Flame, 
  Truck, 
  Clock, 
  Droplet, 
  ShieldAlert, 
  Activity,
  Radio,
  Building2
} from "lucide-react";

export default function DashboardPage() {
  const [incidents, setIncidents] = React.useState<Incident[]>(MOCK_INCIDENTS);
  const [stations] = React.useState<FireStation[]>(MOCK_STATIONS);
  const [vehicles] = React.useState<EmergencyVehicle[]>(MOCK_VEHICLES);

  // Selected modals
  const [selectedIncident, setSelectedIncident] = React.useState<Incident | null>(null);
  const [incidentModalOpen, setIncidentModalOpen] = React.useState(false);

  const [selectedStation, setSelectedStation] = React.useState<FireStation | null>(null);
  const [stationModalOpen, setStationModalOpen] = React.useState(false);

  const [selectedVehicle, setSelectedVehicle] = React.useState<EmergencyVehicle | null>(null);
  const [vehicleModalOpen, setVehicleModalOpen] = React.useState(false);

  const activeIncidents = incidents.filter((i) => i.status !== "RESOLVED");
  const criticalCount = activeIncidents.filter((i) => i.severity === "CRITICAL").length;
  const availableVehiclesCount = vehicles.filter((v) => v.status === "AVAILABLE_IN_STATION").length;

  const handleOpenIncident = (inc: Incident) => {
    setSelectedIncident(inc);
    setIncidentModalOpen(true);
  };

  const handleOpenStation = (stn: FireStation) => {
    setSelectedStation(stn);
    setStationModalOpen(true);
  };

  const handleOpenVehicle = (veh: EmergencyVehicle) => {
    setSelectedVehicle(veh);
    setVehicleModalOpen(true);
  };

  const handleUpdateIncident = (updated: Incident) => {
    setIncidents((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setSelectedIncident(updated);
  };

  return (
    <div className="space-y-4">
      {/* Top Headline Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="ACTIVE CAD CALLS"
          value={activeIncidents.length}
          unit={`(${criticalCount} CRITICAL)`}
          subtitle="Poonam Sagar & MIDC Sector"
          icon={Flame}
          variant="critical"
          trend={{ value: "+2", label: "past hour", isPositive: false }}
        />

        <MetricCard
          title="APPARATUS READY"
          value={`${availableVehiclesCount}/${vehicles.length}`}
          unit="ENGINES"
          subtitle="4 Pumping on scene"
          icon={Truck}
          variant="emerald"
          trend={{ value: "92.8%", label: "readiness", isPositive: true }}
        />

        <MetricCard
          title="AVG RESPONSE TIME"
          value={MOCK_SYSTEM_STATUS.avgResponseTimeMin}
          unit="MINUTES"
          subtitle="Turnout 52s • Travel 4.9m"
          icon={Clock}
          variant="emerald"
          trend={{ value: "-1.2m", label: "vs 7m standard", isPositive: true }}
        />

        <MetricCard
          title="HYDRANT GRID HEALTH"
          value="94.2%"
          unit="134 NODES"
          subtitle="Avg Pressure 5.6 Bar"
          icon={Droplet}
          variant="blue"
          trend={{ value: "OPTIMAL", isPositive: true }}
        />
      </div>

      {/* Center Section: Tactical Map + Live Incident Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Tactical Vector Map (7 cols) */}
        <div className="lg:col-span-7">
          <MapMockCanvas
            incidents={incidents}
            stations={stations}
            vehicles={vehicles}
            onSelectIncident={handleOpenIncident}
            onSelectStation={handleOpenStation}
            onSelectVehicle={handleOpenVehicle}
            heightClass="h-[480px]"
          />
        </div>

        {/* Live CAD Incident Feed (5 cols) */}
        <div className="lg:col-span-5">
          <LiveIncidentFeed
            incidents={incidents}
            onSelectIncident={handleOpenIncident}
          />
        </div>
      </div>

      {/* Middle Grid: Station Fleet Overview */}
      <StationOverviewGrid
        stations={stations}
        onSelectStation={handleOpenStation}
      />

      {/* Bottom Grid: Resource Readiness + Active Telemetry Tracker + Severity Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResourceReadinessCard stations={stations} vehicles={vehicles} />
        <ActiveVehiclesTracker vehicles={vehicles} onSelectVehicle={handleOpenVehicle} />
        <IncidentSeverityGauge incidents={incidents} />
      </div>

      {/* Modals */}
      <IncidentDetailModal
        incident={selectedIncident}
        open={incidentModalOpen}
        onOpenChange={setIncidentModalOpen}
        onUpdateIncident={handleUpdateIncident}
      />

      <StationDetailModal
        station={selectedStation}
        open={stationModalOpen}
        onOpenChange={setStationModalOpen}
      />

      <VehicleTelemetryModal
        vehicle={selectedVehicle}
        open={vehicleModalOpen}
        onOpenChange={setVehicleModalOpen}
      />
    </div>
  );
}
