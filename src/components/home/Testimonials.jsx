import { Container, Section, SectionHeading } from "../ui/Section";
import Reveal from "../ui/Reveal";

const samples = [
  { name: "Illustrative example", role: "Creative Director", quote: "The experience feels calm, premium, and intentional. Every product looks exactly as refined in person." },
  { name: "Illustrative example", role: "Product Designer", quote: "Beautifully curated electronics with a shopping flow that feels trustworthy and effortless." },
  { name: "Illustrative example", role: "Entrepreneur", quote: "ZharpRo balances luxury aesthetics with practical, everyday technology." },
];

export default function Testimonials() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Sample feedback" title="A calmer way to shop technology." />
          <p className="max-w-xs text-xs leading-6 text-muted sm:text-right">Illustrative sample content — not verified customer reviews.</p>
        </div>
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {samples.map((t, i) => (
            <Reveal key={i} delay={i * 80} className="min-w-[85%] snap-start sm:min-w-0">
              <figure className="flex h-full flex-col border border-border bg-surface p-7">
                <span className="self-start border border-border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">Sample</span>
                <blockquote className="mt-6 flex-1 text-base leading-8 text-foreground">“{t.quote}”</blockquote>
                <figcaption className="mt-7 border-t border-border pt-5">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
