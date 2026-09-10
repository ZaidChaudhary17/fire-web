import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800 border border-red-500/30",
        destructive:
          "bg-red-950/80 text-red-400 border border-red-800/80 hover:bg-red-900/90",
        outline:
          "border border-slate-700/80 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-600",
        secondary:
          "bg-slate-800/90 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white",
        ghost:
          "text-slate-300 hover:bg-slate-800/70 hover:text-white",
        link: "text-red-400 underline-offset-4 hover:underline lowercase tracking-normal",
        amber:
          "bg-amber-600 text-white shadow-sm hover:bg-amber-700 active:bg-amber-800 border border-amber-500/40",
        emerald:
          "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800 border border-emerald-500/40",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-7 rounded px-2.5 text-[11px]",
        lg: "h-11 rounded-md px-6 text-sm",
        icon: "h-9 w-9",
        "icon-sm": "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
