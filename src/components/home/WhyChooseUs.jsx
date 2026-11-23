import { Link } from "react-router-dom";
import { Cpu, Headphones, LockKeyhole, Sparkles } from "lucide-react";
import { Container, Section, SectionHeading } from "../ui/Section";
import Reveal from "../ui/Reveal";

const items = [
  { icon: Sparkles, title: "Curated Quality", text: "Every product is selected for design, performance, and lasting value." },
  { icon: LockKeyhole, title: "Private by Design", text: "Browse and shop as a guest — no account required, no unnecessary data." },
  { icon: Cpu, title: "Technology Innovation", text: "A collection shaped around the devices defining modern living." },
  { icon: Headphones, title: "Dedicated Support", text: "A responsive team ready to help before and after your order." },
];

export default function WhyChooseUs() {
  return (
    <Section className="border-y border-border bg-surface-alt/50">
      <Container>
        <SectionHeading eyebrow="Why ZharpRo" title="Confidence in every detail." description="A shopping experience built around quality, clarity, and care." align="center" />
        <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="h-full bg-background p-7">
                <div className="inline-flex h-12 w-12 items-center justify-center border border-border text-foreground"><Icon size={20} strokeWidth={1.6} /></div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
                <span className="mt-6 block font-mono text-[10px] tracking-widest text-muted">0{i + 1}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/about" className="border-b border-border pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground">Learn more about us</Link>
        </div>
      </Container>
    </Section>
  );
}
