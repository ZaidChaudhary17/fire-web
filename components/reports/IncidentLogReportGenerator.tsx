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
    <Card className="border-slate-200 bg-white shadow-sm text-xs">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
              Municipal CAD Incident Log & Dossier Generator
            </CardTitle>
            <p className="text-[11px] text-slate-500 font-medium">
              Official MBMC Fire & Emergency Services Operations Ledger
            </p>
          </div>
        </div>

        {exportComplete && (
          <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Report Generated</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Filter controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <label className="text-slate-600 font-semibold text-xs">Audit Period</label>
            <Select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="mt-1 bg-white border-slate-300 text-slate-800 h-9"
            >
              <option value="PAST_24H">Current Shift (24 Hours)</option>
              <option value="PAST_7D">Past 7 Days</option>
              <option value="PAST_30D">Past 30 Days (Monthly Ledger)</option>
              <option value="YEAR_TO_DATE">Year to Date (2026)</option>
            </Select>
          </div>

          <div>
            <label className="text-slate-600 font-semibold text-xs">Municipal Ward</label>
            <Select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="mt-1 bg-white border-slate-300 text-slate-800 h-9"
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
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-9 gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? "Generating..." : "Export Official PDF"}</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport("CSV")}
              disabled={isExporting}
              className="h-9 px-3 text-slate-700 border-slate-300 hover:bg-slate-100 font-semibold"
            >
              CSV
            </Button>
          </div>
        </div>

        {/* Live Preview Ledger */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs">
            <span className="font-bold text-[#0a2540] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-red-600" />
              Mira-Bhayandar Municipal Corporation • Fire CAD Dossier
            </span>
            <span className="text-slate-500 font-medium">Doc ID: MBMC-CAD-2026-09</span>
          </div>

          <div className="text-xs text-slate-600 space-y-1 font-medium">
            <p><strong className="text-slate-900">Issuing Authority:</strong> Directorate of Fire & Emergency Services, MBMC</p>
            <p><strong className="text-slate-900">Chief Fire Officer:</strong> Dr. Arvind V. Shinde (MBMC-001)</p>
            <p><strong className="text-slate-900">Incidents Cataloged:</strong> {MOCK_INCIDENTS.length} Major Operations Recorded</p>
          </div>

          <div className="pt-2 overflow-x-auto">
            <table className="w-full text-left text-xs bg-white rounded-lg border border-slate-200 overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Incident ID</th>
                  <th className="p-2.5">Type</th>
                  <th className="p-2.5">Location</th>
                  <th className="p-2.5">Evacuated</th>
                  <th className="p-2.5">Casualties</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {MOCK_INCIDENTS.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-[#0a2540]">{inc.incidentNumber}</td>
                    <td className="p-2.5 font-medium">{inc.type}</td>
                    <td className="p-2.5 text-slate-600 truncate max-w-[150px]">{inc.location.address}</td>
                    <td className="p-2.5 text-emerald-700 font-bold">{inc.peopleEvacuated}</td>
                    <td className="p-2.5">{inc.casualtiesReported}</td>
                    <td className="p-2.5 text-slate-900 font-semibold">{inc.status}</td>
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
