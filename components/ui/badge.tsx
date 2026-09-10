import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-slate-700 bg-slate-800/80 text-slate-200",
        critical:
          "border-red-500/50 bg-red-950/80 text-red-300 shadow-[0_0_8px_rgba(239,68,68,0.3)]",
        high:
          "border-orange-500/50 bg-orange-950/80 text-orange-300",
        amber:
          "border-amber-500/50 bg-amber-950/80 text-amber-300",
        emerald:
          "border-emerald-500/50 bg-emerald-950/80 text-emerald-300",
        blue:
          "border-blue-500/50 bg-blue-950/80 text-blue-300",
        cyan:
          "border-cyan-500/50 bg-cyan-950/80 text-cyan-300",
        purple:
          "border-purple-500/50 bg-purple-950/80 text-purple-300",
        outline:
          "border-slate-700 text-slate-400 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
