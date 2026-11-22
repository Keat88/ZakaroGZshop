import { Star } from "lucide-react";
import { Container, Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

const testimonials = [
  { name: "Amina K.", role: "Creative Director", quote: "The experience feels calm, premium, and intentional. Every product looks exactly as refined in person." },
  { name: "Jordan M.", role: "Product Designer", quote: "Beautifully curated electronics with a checkout flow that feels trustworthy and effortless." },
  { name: "Lina S.", role: "Entrepreneur", quote: "ZharpRo nails the balance between luxury aesthetics and practical everyday technology." },
];

export default function Testimonials() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Testimonials" title="Trusted by discerning customers." align="center" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <blockquote className="h-full rounded-3xl border border-border bg-surface p-7">
                <div className="flex gap-1 text-foreground">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={15} className="fill-current" />)}</div>
                <p className="mt-5 text-sm leading-7 text-muted">“{t.quote}”</p>
                <footer className="mt-6 border-t border-border pt-5">
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-sm text-muted">{t.role}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
