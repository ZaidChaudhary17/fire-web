import * as React from "react";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "active" | "critical" | "warning" | "standby" | "offline" | "operational";
  pulse?: boolean;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StatusIndicator({
  status,
  pulse = false,
  label,
  className,
  size = "md",
}: StatusIndicatorProps) {
  const colorMap = {
    critical: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    active: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]",
    warning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
    operational: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    standby: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
    offline: "bg-slate-500",
  };

  const sizeMap = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3.5 h-3.5",
  };

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex h-3 w-3 items-center justify-center">
        {pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
              colorMap[status]
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full",
            sizeMap[size],
            colorMap[status]
          )}
        />
      </span>
      {label && <span className="text-xs font-mono text-slate-300">{label}</span>}
    </div>
  );
}
