import { cn } from "../../lib/utils";

const variants = {
  primary: "bg-accent text-accent-foreground hover:brightness-110",
  secondary: "bg-surface-alt text-foreground hover:bg-border/60",
  outline: "border border-border bg-transparent text-foreground hover:border-foreground/50 hover:bg-surface-alt",
  ghost: "bg-transparent text-foreground hover:bg-surface-alt",
};

const sizes = {
  sm: "h-10 px-5 text-[10px]",
  md: "h-12 px-7 text-[11px]",
  lg: "h-14 px-9 text-xs",
  icon: "h-12 w-12 p-0",
};

export default function Button({ as: Comp = "button", variant = "primary", size = "md", className, ...props }) {
  return (
    <Comp
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[2px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ease-premium active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50",
        variants[variant], sizes[size], className
      )}
      {...props}
    />
  );
}
