export function LoadingState({ label = "Loading content..." }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#16856A]"
        aria-hidden="true"
      />
      <span className="mt-3 text-sm font-medium text-[#243746]">{label}</span>
    </div>
  );
}
