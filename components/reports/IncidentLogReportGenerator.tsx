"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { MOCK_INCIDENTS, MOCK_STATIONS } from "@/lib/mock-data";
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Building2, 
  ShieldCheck,
  Calendar
} from "lucide-react";

export function IncidentLogReportGenerator() {
  const [selectedWard, setSelectedWard] = React.useState("ALL");
  const [selectedPeriod, setSelectedPeriod] = React.useState("PAST_30D");
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportComplete, setExportComplete] = React.useState(false);

  const handleExport = (format: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 1000);
  };

  return (
    <Card className="border-slate-800 bg-[#0e1217] font-mono text-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-blue-950/80 border border-blue-800 text-blue-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm uppercase">
              MUNICIPAL CAD INCIDENT LOG & DOSSIER GENERATOR
            </CardTitle>
            <p className="text-[11px] text-slate-400">
              Official MBMC Fire & Emergency Services Operations Ledger
            </p>
          </div>
        </div>

        {exportComplete && (
          <div className="flex items-center gap-1 text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>REPORT GENERATED</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filter controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div>
            <label className="text-slate-400 text-[11px]">AUDIT PERIOD</label>
            <Select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="mt-1 bg-slate-900"
            >
              <option value="PAST_24H">Current Shift (24 Hours)</option>
              <option value="PAST_7D">Past 7 Days</option>
              <option value="PAST_30D">Past 30 Days (Monthly Ledger)</option>
              <option value="YEAR_TO_DATE">Year to Date (2026)</option>
            </Select>
          </div>

          <div>
            <label className="text-slate-400 text-[11px]">MUNICIPAL WARD</label>
            <Select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="mt-1 bg-slate-900"
            >
              <option value="ALL">All Wards (MBMC Entire Jurisdiction)</option>
              <option value="Ward 1">Ward 1 - Mira Road East</option>
              <option value="Ward 2">Ward 2 - Mira Road West</option>
              <option value="Ward 3">Ward 3 - Bhayandar East (MIDC)</option>
              <option value="Ward 4">Ward 4 - Bhayandar West</option>
              <option value="Ward 5">Ward 5 - Kashimira</option>
              <option value="Ward 6">Ward 6 - Uttan Coastal</option>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <Button
              onClick={() => handleExport("PDF")}
              disabled={isExporting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-9 gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? "EXPORTING..." : "EXPORT PDF"}</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport("CSV")}
              disabled={isExporting}
              className="h-9 px-3 text-slate-300"
            >
              CSV
            </Button>
          </div>
        </div>

        {/* Live Preview Ledger */}
        <div className="rounded-lg border border-slate-800 bg-[#090d12] p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-red-500" />
              MIRA-BHAYANDAR MUNICIPAL CORPORATION • FIRE CAD DOSSIER
            </span>
            <span className="text-slate-400">DOCUMENT ID: MBMC-CAD-2026-09</span>
          </div>

          <div className="text-[11px] text-slate-400 space-y-1">
            <p><strong>Issuing Authority:</strong> Directorate of Fire & Emergency Services, MBMC</p>
            <p><strong>Chief Fire Officer:</strong> Dr. Arvind V. Shinde (MBMC-001)</p>
            <p><strong>Incidents Cataloged:</strong> {MOCK_INCIDENTS.length} Major Operations Recorded</p>
          </div>

          <div className="pt-2">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-2">INCIDENT ID</th>
                  <th className="p-2">TYPE</th>
                  <th className="p-2">LOCATION</th>
                  <th className="p-2">EVACUATED</th>
                  <th className="p-2">CASUALTIES</th>
                  <th className="p-2">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {MOCK_INCIDENTS.map((inc) => (
                  <tr key={inc.id}>
                    <td className="p-2 font-bold text-red-400">{inc.incidentNumber}</td>
                    <td className="p-2">{inc.type}</td>
                    <td className="p-2 text-slate-400 truncate max-w-[150px]">{inc.location.address}</td>
                    <td className="p-2 text-emerald-400 font-bold">{inc.peopleEvacuated}</td>
                    <td className="p-2">{inc.casualtiesReported}</td>
                    <td className="p-2 text-slate-300 font-semibold">{inc.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
