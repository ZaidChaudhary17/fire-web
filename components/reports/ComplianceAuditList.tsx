import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MOCK_COMPLIANCE_REPORTS } from "@/lib/mock-data";
import { ShieldCheck, FileCheck, CheckCircle2, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplianceAuditList() {
  return (
    <Card className="border-slate-800 bg-[#0e1217] font-mono text-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm uppercase">
              AUDITED MUNICIPAL COMPLIANCE & SAFETY VERIFICATION REPORTS
            </CardTitle>
            <p className="text-[11px] text-slate-400">
              Form B High-Rise certificates, MIDC hazardous storage inspections, & apparatus readiness
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-4 pt-0">
        {MOCK_COMPLIANCE_REPORTS.map((report) => (
          <div
            key={report.id}
            className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">
                  {report.reportNumber}
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.2 rounded font-bold">
                  {report.status}
                </span>
                <span className="text-[10px] text-slate-500">
                  {report.date}
                </span>
              </div>
              <h4 className="font-semibold text-slate-200 text-xs">
                {report.title}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-2xl">
                {report.summary}
              </p>
              <div className="text-[10px] text-slate-500">
                Audited By: <span className="text-slate-300">{report.author}</span> • Jurisdiction: <span className="text-slate-300">{report.ward}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
              <div className="text-right">
                <div className="text-[10px] text-slate-500">Compliance Rate:</div>
                <div className="text-base font-bold text-emerald-400">
                  {report.responseCompliancePct}%
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-8 text-[11px] text-slate-300 border-slate-700 hover:bg-slate-800 gap-1"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>DOSSIER</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
