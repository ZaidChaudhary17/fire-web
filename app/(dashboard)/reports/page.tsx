"use client";

import * as React from "react";
import { IncidentLogReportGenerator } from "@/components/reports/IncidentLogReportGenerator";
import { ComplianceAuditList } from "@/components/reports/ComplianceAuditList";
import { FileText, ShieldCheck, Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
              Municipal Emergency Dossiers & Compliance Ledger
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Official records for Mira-Bhayandar Municipal Corporation (MBMC) Fire & Emergency Services
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full font-bold">
            Audit Trail Verified
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
