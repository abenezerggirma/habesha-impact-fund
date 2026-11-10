import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#16856A] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#102A43] text-white",
        emerald: "border-[#16856A]/20 bg-[#16856A]/10 text-[#126e57]",
        gold: "border-[#D6A84B]/40 bg-[#D6A84B]/15 text-[#102A43]",
        outline: "border-slate-300 text-[#243746] bg-white",
        draft: "border-amber-400/50 bg-amber-50 text-amber-900",
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
