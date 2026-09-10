import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MOCK_COMPLIANCE_REPORTS } from "@/lib/mock-data";
import { ShieldCheck, FileCheck, CheckCircle2, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplianceAuditList() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm text-xs">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
              Audited Municipal Compliance & Safety Verification Reports
            </CardTitle>
            <p className="text-[11px] text-slate-500 font-medium">
              Form B High-Rise certificates, MIDC hazardous storage inspections, & apparatus readiness
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-4">
        {MOCK_COMPLIANCE_REPORTS.map((report) => (
          <div
            key={report.id}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0a2540] text-xs">
                  {report.reportNumber}
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  {report.status}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {report.date}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs">
                {report.title}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed max-w-2xl">
                {report.summary}
              </p>
              <div className="text-[11px] text-slate-500">
                Audited By: <span className="text-slate-900 font-semibold">{report.author}</span> • Jurisdiction: <span className="text-slate-900 font-semibold">{report.ward}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
              <div className="text-right">
                <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Compliance Rate</div>
                <div className="text-lg font-bold text-emerald-800">
                  {report.responseCompliancePct}%
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-semibold text-blue-700 border-slate-300 hover:bg-blue-50 gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-blue-700" />
                <span>Dossier</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
