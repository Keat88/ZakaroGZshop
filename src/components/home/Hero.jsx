import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "../ui/Button";
import { Container } from "../ui/Section";
import Reveal from "../ui/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-alt/40">
      <Container className="grid items-center gap-14 py-16 md:py-24 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-24">
        <div className="max-w-2xl">
          <Reveal><p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted"><span className="h-px w-8 bg-accent" /> Premium electronics collection — 2026</p></Reveal>
          <Reveal delay={80}><h1 className="mt-7 text-display font-semibold leading-[0.92] tracking-[-0.05em] text-foreground text-balance">Technology, refined to its essence.</h1></Reveal>
          <Reveal delay={150}><p className="mt-8 max-w-xl text-base leading-7 text-muted sm:text-lg">A considered edit of modern devices, EV gadgets, and everyday essentials — selected for precision, performance, and quiet elegance.</p></Reveal>
          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button as={Link} to="/products" size="lg">Shop now <ArrowRight size={17} /></Button>
              <Button as={Link} to="/products#collection" size="lg" variant="outline">Explore products <ArrowUpRight size={16} /></Button>
            </div>
          </Reveal>
          <Reveal delay={290}>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-7">
              <div><dt className="text-2xl font-semibold tracking-tight sm:text-3xl">30+</dt><dd className="mt-1 text-xs leading-5 text-muted">Curated products</dd></div>
              <div><dt className="text-2xl font-semibold tracking-tight sm:text-3xl">05</dt><dd className="mt-1 text-xs leading-5 text-muted">Focused categories</dd></div>
              <div><dt className="text-2xl font-semibold tracking-tight sm:text-3xl">24/7</dt><dd className="mt-1 text-xs leading-5 text-muted">Open storefront</dd></div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative">
          <div className="absolute -left-4 top-6 hidden h-full w-full border border-border lg:block" aria-hidden="true" />
          <div className="relative overflow-hidden border border-border bg-surface">
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80" alt="Premium laptop on a minimal desk" width="1400" height="1000" fetchPriority="high" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]" />
            <div className="flex items-center justify-between gap-4 border-t border-border bg-surface px-5 py-4">
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">Featured object</p><p className="mt-1 text-sm font-medium">Modern computing, considered.</p></div>
              <span className="font-mono text-[10px] tracking-widest text-muted">01 / 30</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
