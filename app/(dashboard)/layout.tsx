"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { BroadcastBanner } from "@/components/shared/BroadcastBanner";
import { MOCK_INCIDENTS } from "@/lib/mock-data";
import { Incident } from "@/types/incident";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [incidents, setIncidents] = React.useState<Incident[]>(MOCK_INCIDENTS);

  const handleNewIncident = (newInc: Incident) => {
    setIncidents((prev) => [newInc, ...prev]);
  };

  const criticalIncidents = incidents.filter(
    (i) => i.severity === "CRITICAL" && i.status !== "RESOLVED"
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 font-sans">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Viewport */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <Header onNewIncidentCreated={handleNewIncident} />

        {/* Global Broadcast Banner for Critical Alarms */}
        <BroadcastBanner criticalIncidents={criticalIncidents} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
