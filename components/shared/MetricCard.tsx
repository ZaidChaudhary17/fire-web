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
    critical: "border-red-200 bg-red-50/40 hover:border-red-300 shadow-sm",
    warning: "border-amber-200 bg-amber-50/40 hover:border-amber-300 shadow-sm",
    emerald: "border-emerald-200 bg-emerald-50/40 hover:border-emerald-300 shadow-sm",
    blue: "border-blue-200 bg-blue-50/40 hover:border-blue-300 shadow-sm",
    default: "border-slate-200 bg-white hover:border-slate-300 shadow-sm",
  }[variant];

  const iconColor = {
    critical: "text-red-700 bg-red-100 border-red-200",
    warning: "text-amber-700 bg-amber-100 border-amber-200",
    emerald: "text-emerald-700 bg-emerald-100 border-emerald-200",
    blue: "text-blue-700 bg-blue-100 border-blue-200",
    default: "text-[#0a2540] bg-slate-100 border-slate-200",
  }[variant];

  return (
    <div
      className={cn(
        "relative rounded-xl border p-4 transition-all duration-200 overflow-hidden group bg-white",
        borderAndGlowClasses,
        className
      )}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
          {title}
        </span>
        <div className={cn("p-1.5 rounded-lg border", iconColor)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mt-2.5 flex items-baseline gap-1.5">
        <span className="text-2xl font-extrabold tracking-tight text-[#0a2540] font-sans">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-bold text-slate-600">
            {unit}
          </span>
        )}
      </div>

      {/* Footer / Subtitle & Trend */}
      <div className="mt-2 flex items-center justify-between text-xs">
        {subtitle && <span className="text-slate-600 font-medium">{subtitle}</span>}
        {trend && (
          <span
            className={cn(
              "font-bold",
              trend.isPositive ? "text-emerald-700" : "text-amber-700"
            )}
          >
            {trend.value} {trend.label && <span className="text-slate-500 font-normal">({trend.label})</span>}
          </span>
        )}
      </div>

      {/* Subtle bottom indicator strip */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[3px]",
          variant === "critical" && "bg-red-600",
          variant === "warning" && "bg-amber-500",
          variant === "emerald" && "bg-emerald-600",
          variant === "blue" && "bg-blue-600",
          variant === "default" && "bg-[#0a2540]"
        )}
      />
    </div>
  );
}
