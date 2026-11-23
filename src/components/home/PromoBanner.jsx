import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "../ui/Section";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function PromoBanner() {
  return (
    <Section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden border border-foreground bg-foreground text-background dark:border-border dark:bg-surface dark:text-foreground">
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=80" alt="" loading="lazy" decoding="async" width="1600" height="900" className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="relative grid gap-9 px-7 py-14 sm:px-12 md:py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:px-16">
              <div className="max-w-2xl">
                <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] opacity-70"><span className="h-px w-8 bg-current" /> The monochrome edit</p>
                <h2 className="mt-6 text-display-sm font-semibold leading-[1.02] tracking-[-0.045em] text-balance">Power, silence, intention.</h2>
                <p className="mt-6 max-w-xl text-base leading-7 opacity-80">Upgrade your everyday with devices that balance performance and restraint — chosen for the way you actually live.</p>
              </div>
              <Button as={Link} to="/products" variant="outline" size="lg" className="border-current bg-transparent text-current hover:bg-background/10 dark:hover:bg-foreground/10">Explore products <ArrowUpRight size={16} /></Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
