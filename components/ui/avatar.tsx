import * as React from "react";
import { cn } from "@/lib/utils";

export function Avatar({
  className,
  fallback,
  children,
}: {
  className?: string;
  fallback: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-700 bg-slate-800 text-xs font-mono font-bold text-slate-200",
        className
      )}
    >
      {children || <span>{fallback}</span>}
    </div>
  );
}

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-800/60", className)}
      {...props}
    />
  );
}

export function Tooltip({
  text,
  children,
  position = "top",
}: {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <div className="relative group inline-flex">
      {children}
      <div
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded bg-slate-900 border border-slate-700 px-2 py-1 text-[11px] font-mono text-slate-200 shadow-xl opacity-0 transition-opacity group-hover:opacity-100",
          position === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
          position === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-1.5",
          position === "left" && "right-full top-1/2 -translate-y-1/2 mr-1.5",
          position === "right" && "left-full top-1/2 -translate-y-1/2 ml-1.5"
        )}
      >
        {text}
      </div>
    </div>
  );
}
