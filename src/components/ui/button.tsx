import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#102A43] text-white shadow-sm hover:bg-[#1a3e61] active:translate-y-px",
        donate:
          "bg-[#16856A] text-white shadow-sm hover:bg-[#126e57] active:translate-y-px",
        gold:
          "bg-[#D6A84B] text-[#102A43] shadow-sm hover:bg-[#c6973b] active:translate-y-px",
        outline:
          "border border-[#102A43]/25 bg-white text-[#102A43] hover:bg-[#F8FAFC] hover:border-[#102A43]/50",
        outlineLight:
          "border border-white/40 bg-white/10 text-white backdrop-blur-xs hover:bg-white/20 hover:border-white/70",
        secondary:
          "bg-[#F8FAFC] text-[#102A43] border border-slate-200 hover:bg-slate-100",
        ghost: "text-[#243746] hover:bg-slate-100 hover:text-[#102A43]",
        link: "text-[#16856A] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-12 rounded-lg px-7 text-base",
        icon: "h-10 w-10",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
