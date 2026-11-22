import { Link } from "react-router-dom";
import { Container } from "../ui/Section";
import Button from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export default function PromoBanner() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-foreground text-background dark:bg-surface dark:text-foreground">
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=80" alt="Premium electronics arrangement" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-25" />
            <div className="relative grid gap-8 px-8 py-14 md:px-14 md:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] opacity-70">Limited Editorial</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">The monochrome collection for modern living.</h2>
                <p className="mt-4 max-w-xl text-base leading-7 opacity-80">Upgrade your everyday with devices that balance power, silence, and intentional design.</p>
              </div>
              <Button as={Link} to="/products" variant="secondary" size="lg" className="bg-background text-foreground hover:bg-background/90 dark:bg-foreground dark:text-background">Explore Products</Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
