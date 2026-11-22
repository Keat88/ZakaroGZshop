import { Link } from "react-router-dom";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import Button from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { usePageTitle } from "../components/ui/ScrollToTop";

const values = [
  { title: "Intentional Design", text: "We favor clean lines, tactile quality, and technology that feels calm to use." },
  { title: "Trusted Performance", text: "Every selection is evaluated for reliability, longevity, and real-world value." },
  { title: "Customer Care", text: "From discovery to delivery, we aim for a seamless and respectful experience." },
];

export default function About() {
  usePageTitle("About");
  return (
    <main>
      <Section className="border-b border-border bg-surface-alt/30 py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">About ZharpRo</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">A refined approach to modern electronics.</h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted sm:text-lg">We curate technology that complements a considered lifestyle—powerful, beautiful, and built to last.</p>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Minimal modern workspace" loading="lazy" className="h-[420px] w-full rounded-[2rem] border border-border object-cover" />
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="Our Story" title="Built for clarity in a noisy world." description="ZharpRo began with a simple belief: premium technology should feel effortless. We bring together devices that combine performance with restraint, so you can focus on what matters." />
            <div className="mt-8 space-y-4 text-sm leading-7 text-muted">
              <p>Our collection spans audio, computing, mobile, and smart living essentials—each chosen for craftsmanship, usability, and enduring design.</p>
              <p>We prioritize transparent experiences, secure shopping, and support that respects your time.</p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-surface-alt/40 border-y border-border">
        <Container>
          <SectionHeading eyebrow="Values" title="What guides us." align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="rounded-3xl border border-border bg-surface p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">0{i + 1}</p>
                  <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal className="rounded-[2rem] border border-border bg-surface p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Mission</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Make premium technology accessible and meaningful.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">We connect people with tools that elevate daily life—through thoughtful curation, honest presentation, and dependable service.</p>
          </Reveal>
          <Reveal delay={100} className="rounded-[2rem] border border-border bg-surface p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Vision</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">A calmer, more considered digital lifestyle.</h2>
            <p className="mt-4 text-sm leading-7 text-muted">We envision a future where technology serves with elegance—quietly powerful, beautifully made, and responsibly chosen.</p>
          </Reveal>
        </Container>
        <Container className="mt-12">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-foreground px-8 py-10 text-background dark:bg-surface dark:text-foreground sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">Experience the collection.</h3>
              <p className="mt-2 text-sm opacity-80">Discover products designed for the way you live.</p>
            </div>
            <Button as={Link} to="/products" variant="secondary" className="bg-background text-foreground hover:bg-background/90 dark:bg-foreground dark:text-background">Shop now</Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
