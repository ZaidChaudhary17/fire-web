import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  variant?: "critical" | "warning" | "emerald" | "blue" | "default";
  className?: string;
}

export function MetricCard({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: MetricCardProps) {
  const borderAndGlowClasses = {
    critical: "border-red-500/40 bg-red-950/10 hover:border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.15)]",
    warning: "border-amber-500/40 bg-amber-950/10 hover:border-amber-500/70 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
    emerald: "border-emerald-500/40 bg-emerald-950/10 hover:border-emerald-500/70 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    blue: "border-blue-500/40 bg-blue-950/10 hover:border-blue-500/70 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
    default: "border-slate-800 bg-[#0e1217] hover:border-slate-700",
  }[variant];

  const iconColor = {
    critical: "text-red-400 bg-red-950/80 border-red-800/80",
    warning: "text-amber-400 bg-amber-950/80 border-amber-800/80",
    emerald: "text-emerald-400 bg-emerald-950/80 border-emerald-800/80",
    blue: "text-blue-400 bg-blue-950/80 border-blue-800/80",
    default: "text-slate-300 bg-slate-800/80 border-slate-700",
  }[variant];

  return (
    <div
      className={cn(
        "relative rounded-lg border p-4 transition-all duration-200 overflow-hidden group",
        borderAndGlowClasses,
        className
      )}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={cn("p-1.5 rounded border", iconColor)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold font-mono tracking-tight text-slate-100">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-mono text-slate-400 font-medium">
            {unit}
          </span>
        )}
      </div>

      {/* Footer / Subtitle & Trend */}
      <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
        {subtitle && <span className="text-slate-400">{subtitle}</span>}
        {trend && (
          <span
            className={cn(
              "font-medium",
              trend.isPositive ? "text-emerald-400" : "text-amber-400"
            )}
          >
            {trend.value} {trend.label && <span className="text-slate-500 font-normal">({trend.label})</span>}
          </span>
        )}
      </div>

      {/* Subtle indicator strip */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[2px] opacity-70",
          variant === "critical" && "bg-red-500",
          variant === "warning" && "bg-amber-500",
          variant === "emerald" && "bg-emerald-500",
          variant === "blue" && "bg-blue-500",
          variant === "default" && "bg-slate-700"
        )}
      />
    </div>
  );
}
