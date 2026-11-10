import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/60 p-8 text-center"
    >
      <AlertTriangle className="h-8 w-8 text-red-600" aria-hidden="true" />
      <h3 className="mt-3 font-serif text-lg font-bold text-[#102A43]">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm text-[#243746]">{message}</p>
      {onRetry ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-4"
        >
          Try Again
        </Button>
      ) : null}
    </div>
  );
}
