import { cn } from "../../lib/utils";

const variants = {
  primary: "bg-accent text-accent-foreground hover:opacity-90",
  secondary: "bg-surface-alt text-foreground hover:bg-border/50",
  outline: "border border-border bg-transparent text-foreground hover:bg-surface-alt",
  ghost: "bg-transparent text-foreground hover:bg-surface-alt",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
  icon: "h-11 w-11 p-0",
};

export default function Button({ as: Comp = "button", variant = "primary", size = "md", className, ...props }) {
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant], sizes[size], className
      )}
      {...props}
    />
  );
}
