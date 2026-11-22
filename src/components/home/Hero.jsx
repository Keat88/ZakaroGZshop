import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { Container } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-alt/30">
      <Container className="grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1fr_1.05fr] lg:py-20">
        <div className="max-w-xl">
          <Reveal><p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Premium Electronics Collection</p></Reveal>
          <Reveal delay={80}><h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">Technology, refined to its essence.</h1></Reveal>
          <Reveal delay={160}><p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg">Discover a curated selection of modern devices designed with precision, performance, and timeless monochrome elegance.</p></Reveal>
          <Reveal delay={240}><div className="mt-10 flex flex-wrap gap-4">
            <Button as={Link} to="/products" size="lg">Shop Collection <ArrowRight size={18} /></Button>
            <Button as={Link} to="/about" size="lg" variant="outline">Our Story</Button>
          </div></Reveal>
          <Reveal delay={320}><div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8 text-sm">
            <div><p className="text-2xl font-semibold">30+</p><p className="mt-1 text-muted">Curated products</p></div>
            <div><p className="text-2xl font-semibold">24/7</p><p className="mt-1 text-muted">Client support</p></div>
            <div><p className="text-2xl font-semibold">100%</p><p className="mt-1 text-muted">Secure checkout</p></div>
          </div></Reveal>
        </div>
        <Reveal delay={120} className="relative">
          <div className="absolute -inset-4 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.08),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
          <div className="overflow-hidden rounded-[2rem] border border-border bg-surface">
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80" alt="Premium laptop on a minimal desk" className="h-[420px] w-full object-cover sm:h-[560px]" fetchPriority="high" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
