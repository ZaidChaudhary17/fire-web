"use client";

import * as React from "react";
import { IncidentLogReportGenerator } from "@/components/reports/IncidentLogReportGenerator";
import { ComplianceAuditList } from "@/components/reports/ComplianceAuditList";
import { FileText, ShieldCheck, Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-4 font-mono">
      {/* Top Banner */}
      <div className="p-4 rounded-lg bg-[#0e1217] border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded bg-blue-950 border border-blue-800 text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase">
              MUNICIPAL EMERGENCY DOSSIERS & COMPLIANCE LEDGER
            </h2>
            <p className="text-[11px] text-slate-400">
              Official records for Mira-Bhayandar Municipal Corporation (MBMC) Fire & Emergency Services
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded font-bold">
            AUDIT TRAIL VERIFIED
          </span>
        </div>
      </div>

      {/* Incident Log Generator */}
      <IncidentLogReportGenerator />

      {/* Compliance Audits */}
      <ComplianceAuditList />
    </div>
  );
}
