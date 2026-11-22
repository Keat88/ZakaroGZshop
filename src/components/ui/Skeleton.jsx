export default function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-border/60 ${className}`} aria-hidden="true" />;
}
