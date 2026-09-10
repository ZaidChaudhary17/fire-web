import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { IncidentSeverity } from "@/types/incident";
import { AlertTriangle, AlertOctagon, Info, Flame, ShieldAlert } from "lucide-react";

export function SeverityBadge({
  severity,
  className,
}: {
  severity: IncidentSeverity;
  className?: string;
}) {
  switch (severity) {
    case "CRITICAL":
      return (
        <Badge variant="critical" className={className}>
          <AlertOctagon className="w-3 h-3 mr-1 text-red-400 animate-pulse" />
          CRITICAL - T1
        </Badge>
      );
    case "HIGH":
      return (
        <Badge variant="high" className={className}>
          <Flame className="w-3 h-3 mr-1 text-orange-400" />
          HIGH - T2
        </Badge>
      );
    case "MEDIUM":
      return (
        <Badge variant="amber" className={className}>
          <AlertTriangle className="w-3 h-3 mr-1 text-amber-400" />
          MEDIUM - T3
        </Badge>
      );
    case "LOW":
      return (
        <Badge variant="emerald" className={className}>
          <ShieldAlert className="w-3 h-3 mr-1 text-emerald-400" />
          LOW - T4
        </Badge>
      );
    case "ADVISORY":
    default:
      return (
        <Badge variant="blue" className={className}>
          <Info className="w-3 h-3 mr-1 text-blue-400" />
          ADVISORY
        </Badge>
      );
  }
}
