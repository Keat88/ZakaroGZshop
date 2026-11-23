import { cn } from "../../lib/utils";

export function Section({ className, children, id }) {
  return <section id={id} className={cn("py-20 md:py-28 lg:py-32", className)}>{children}</section>;
}

export function Container({ className, children }) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className, as: Heading = "h2" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className={cn("flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted", align === "center" && "justify-center")}>
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      {title ? <Heading className="mt-5 text-section font-semibold leading-[1.05] tracking-[-0.035em] text-foreground text-balance">{title}</Heading> : null}
      {description ? <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p> : null}
    </div>
  );
}

export default Section;
