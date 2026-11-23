import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import { usePageTitle } from "../components/ui/ScrollToTop";

const values = [
  { title: "Intentional Design", text: "Clean lines, tactile quality, and technology that feels calm to use." },
  { title: "Trusted Performance", text: "Every selection is evaluated for reliability, longevity, and real-world value." },
  { title: "Customer Care", text: "From discovery to delivery, a seamless and respectful experience." },
];

export default function About() {
  usePageTitle("About");
  return (
    <main id="main">
      <Section className="border-b border-border bg-surface-alt/40 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted"><span className="h-px w-8 bg-accent" /> About ZharpRo</p>
            <h1 className="mt-7 max-w-3xl text-display-sm font-semibold leading-[1.02] tracking-[-0.045em] text-balance">A refined approach to modern electronics.</h1>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">We curate technology that complements a considered lifestyle — powerful, beautiful, and built to last.</p>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="absolute -bottom-4 -left-4 hidden h-full w-full border border-border lg:block" aria-hidden="true" />
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Minimal modern workspace" loading="lazy" decoding="async" width="1200" height="800" className="relative aspect-[4/5] w-full border border-border object-cover sm:aspect-[5/4]" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="Our story" title="Built for clarity in a noisy world." description="ZharpRo began with a simple belief: premium technology should feel effortless. We bring together devices that combine performance with restraint, so you can focus on what matters." />
            <div className="mt-8 space-y-5 border-t border-border pt-7 text-sm leading-7 text-muted">
              <p>Our collection spans mobile, computing, audio, and smart living essentials — each chosen for craftsmanship, usability, and enduring design.</p>
              <p>We prioritize transparent experiences, a guest-friendly storefront, and support that respects your time.</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="border-y border-border bg-surface-alt/50">
        <Container>
          <SectionHeading eyebrow="Values" title="What guides us." align="center" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full border border-border bg-background p-8">
                  <span className="font-mono text-[10px] tracking-widest text-muted">0{i + 1}</span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">{v.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal className="border border-border bg-surface p-8 sm:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">Mission</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">Make premium technology accessible and meaningful.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">We connect people with tools that elevate daily life — through thoughtful curation, honest presentation, and dependable service.</p>
          </Reveal>
          <Reveal delay={100} className="border border-border bg-surface p-8 sm:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">Vision</p>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">A calmer, more considered digital lifestyle.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">We envision a future where technology serves with elegance — quietly powerful, beautifully made, and responsibly chosen.</p>
          </Reveal>
        </Container>
        <Container className="mt-12">
          <div className="flex flex-col items-start justify-between gap-7 border border-foreground bg-foreground px-8 py-10 text-background dark:border-border dark:bg-surface dark:text-foreground sm:flex-row sm:items-center sm:px-12">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Experience the collection.</h3>
              <p className="mt-2 text-sm opacity-80">Discover products designed for the way you live.</p>
            </div>
            <Button as={Link} to="/products" variant="outline" className="border-current bg-transparent text-current hover:bg-background/10 dark:hover:bg-foreground/10">Shop now <ArrowUpRight size={15} /></Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
