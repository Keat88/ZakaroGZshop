import { cn } from "../../lib/utils";

export default function Input({ className, label, id, error, ...props }) {
  const input = (
    <input
      id={id}
      className={cn(
        "h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-foreground/15 transition",
        error && "border-danger focus:ring-danger/20",
        className
      )}
      {...props}
    />
  );
  if (!label) return input;
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {input}
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  );
}
