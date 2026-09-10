import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { IncidentStatus } from "@/types/incident";
import { VehicleStatus } from "@/types/vehicle";
import { Radio, Truck, CheckCircle2, AlertCircle, Wrench, ShieldCheck } from "lucide-react";

export function StatusBadge({
  status,
  className,
}: {
  status: IncidentStatus | VehicleStatus;
  className?: string;
}) {
  switch (status) {
    case "DISPATCHED":
      return (
        <Badge variant="critical" className={className}>
          <Radio className="w-3 h-3 mr-1 text-red-400 animate-pulse" />
          DISPATCHED
        </Badge>
      );
    case "EN_ROUTE":
      return (
        <Badge variant="high" className={className}>
          <Truck className="w-3 h-3 mr-1 text-orange-400 animate-bounce" />
          EN ROUTE
        </Badge>
      );
    case "ON_SCENE":
    case "ON_SCENE_PUMPING":
      return (
        <Badge variant="amber" className={className}>
          <AlertCircle className="w-3 h-3 mr-1 text-amber-400 animate-pulse" />
          ON SCENE PUMPING
        </Badge>
      );
    case "CONTAINED":
    case "UNDER_CONTROL":
      return (
        <Badge variant="cyan" className={className}>
          <ShieldCheck className="w-3 h-3 mr-1 text-cyan-400" />
          UNDER CONTROL
        </Badge>
      );
    case "AVAILABLE_IN_STATION":
    case "RESOLVED":
    case "CLOSED":
      return (
        <Badge variant="emerald" className={className}>
          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" />
          {status === "AVAILABLE_IN_STATION" ? "BAY READY" : "RESOLVED"}
        </Badge>
      );
    case "IN_MAINTENANCE":
      return (
        <Badge variant="amber" className={className}>
          <Wrench className="w-3 h-3 mr-1 text-amber-400" />
          IN WORKSHOP
        </Badge>
      );
    case "OUT_OF_SERVICE":
      return (
        <Badge variant="outline" className={className}>
          OUT OF SERVICE
        </Badge>
      );
    case "RETURNING":
      return (
        <Badge variant="blue" className={className}>
          RETURNING TO BASE
        </Badge>
      );
    default:
      return <Badge variant="default" className={className}>{status}</Badge>;
  }
}
