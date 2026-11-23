import { cn } from "../../lib/utils";

export default function Skeleton({ className = "" }) {
  return <div className={cn("relative overflow-hidden rounded-[2px] bg-surface-alt", className)} aria-hidden="true"><span className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent dark:via-foreground/[0.08]" /></div>;
}
