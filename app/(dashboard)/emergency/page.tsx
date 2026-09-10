"use client";

import * as React from "react";
import { MOCK_INCIDENTS, MOCK_STATIONS, MOCK_VEHICLES } from "@/lib/mock-data";
import { Incident } from "@/types/incident";
import { EmergencyQueue } from "@/components/emergency/EmergencyQueue";
import { TriageMatrix } from "@/components/emergency/TriageMatrix";
import { IncidentDetailModal } from "@/components/emergency/IncidentDetailModal";
import { QuickDispatchModal } from "@/components/layout/QuickDispatchModal";
import { MapMockCanvas } from "@/components/shared/MapMockCanvas";

export default function EmergencyPage() {
  const [incidents, setIncidents] = React.useState<Incident[]>(MOCK_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = React.useState<Incident | null>(null);
  const [incidentModalOpen, setIncidentModalOpen] = React.useState(false);
  const [dispatchModalOpen, setDispatchModalOpen] = React.useState(false);

  const handleSelectIncident = (inc: Incident) => {
    setSelectedIncident(inc);
    setIncidentModalOpen(true);
  };

  const handleUpdateIncident = (updated: Incident) => {
    setIncidents((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setSelectedIncident(updated);
  };

  const handleNewDispatch = (newInc: Incident) => {
    setIncidents((prev) => [newInc, ...prev]);
  };

  return (
    <div className="space-y-4">
      {/* CAD Map overview */}
      <MapMockCanvas
        incidents={incidents}
        stations={MOCK_STATIONS}
        vehicles={MOCK_VEHICLES}
        selectedIncidentId={selectedIncident?.id}
        onSelectIncident={handleSelectIncident}
        heightClass="h-[320px]"
      />

      {/* Emergency CAD Queue Table */}
      <EmergencyQueue
        incidents={incidents}
        onSelectIncident={handleSelectIncident}
        onOpenNewDispatch={() => setDispatchModalOpen(true)}
      />

      {/* Triage Matrix Standard */}
      <TriageMatrix />

      {/* Modals */}
      <IncidentDetailModal
        incident={selectedIncident}
        open={incidentModalOpen}
        onOpenChange={setIncidentModalOpen}
        onUpdateIncident={handleUpdateIncident}
      />

      <QuickDispatchModal
        open={dispatchModalOpen}
        onOpenChange={setDispatchModalOpen}
        onDispatchCreated={handleNewDispatch}
      />
    </div>
  );
}
