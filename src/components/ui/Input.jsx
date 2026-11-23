import { cn } from "../../lib/utils";

const fieldClass = "h-12 w-full rounded-[2px] border border-border bg-background px-4 text-sm text-foreground transition-colors placeholder:text-muted hover:border-foreground/30 focus:border-foreground";

export function Input({ className, label, id, error, ...props }) {
  const input = <input id={id} aria-invalid={error ? "true" : undefined} className={cn(fieldClass, error && "border-danger focus:border-danger", className)} {...props} />;
  if (!label) return input;
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{label}</span>
      {input}
      {error ? <span className="mt-2 block text-xs text-danger">{error}</span> : null}
    </label>
  );
}

export function Textarea({ className, label, id, error, ...props }) {
  const input = <textarea id={id} aria-invalid={error ? "true" : undefined} className={cn(fieldClass, "h-auto min-h-32 resize-y py-3", error && "border-danger focus:border-danger", className)} {...props} />;
  if (!label) return input;
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{label}</span>
      {input}
      {error ? <span className="mt-2 block text-xs text-danger">{error}</span> : null}
    </label>
  );
}

export default Input;
