import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#102A43] shadow-2xs placeholder:text-slate-400 focus-visible:border-[#16856A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16856A]/25 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
