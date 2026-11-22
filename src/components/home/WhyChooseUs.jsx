import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, Truck, Headphones } from "lucide-react";
import { Container, Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

const items = [
  { icon: Sparkles, title: "Curated Quality", text: "Every product is selected for design, performance, and lasting value." },
  { icon: ShieldCheck, title: "Secure Shopping", text: "Protected authentication and a checkout experience built on trust." },
  { icon: Truck, title: "Refined Delivery", text: "Careful handling and reliable delivery for premium purchases." },
  { icon: Headphones, title: "Dedicated Support", text: "A responsive team ready to help before and after your order." },
];

export default function WhyChooseUs() {
  return (
    <Section className="bg-surface-alt/40 border-y border-border">
      <Container>
        <SectionHeading eyebrow="Why ZharpRo" title="Confidence in every detail." description="A shopping experience built around quality, clarity, and care." align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="h-full rounded-3xl border border-border bg-surface p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-alt text-foreground"><Icon size={20} /></div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/about" className="text-sm font-medium uppercase tracking-[0.18em] text-foreground underline decoration-border underline-offset-8 hover:decoration-foreground">Learn more about us</Link>
        </div>
      </Container>
    </Section>
  );
}
