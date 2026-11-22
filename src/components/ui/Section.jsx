import { cn } from "../../lib/utils";

export function Section({ className, children, id }) {
  return <section id={id} className={cn("py-16 md:py-24", className)}>{children}</section>;
}

export function Container({ className, children }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted">{eyebrow}</p> : null}
      {title ? <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">{title}</h2> : null}
      {description ? <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{description}</p> : null}
    </div>
  );
}
