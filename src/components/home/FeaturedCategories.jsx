import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "../ui/Section";
import Reveal from "../ui/Reveal";

const categories = [
  { name: "Mobile", desc: "Connected elegance, anywhere.", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80" },
  { name: "Computing", desc: "Power designed for focus.", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80" },
  { name: "Audio", desc: "Immersive sound, minimal form.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80" },
];

export default function FeaturedCategories() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Categories" title="Designed for every moment." description="Explore focused collections shaped by performance, simplicity, and modern luxury." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <Link to={`/products?category=${encodeURIComponent(c.name)}`} className="group relative block aspect-[4/5] overflow-hidden border border-border bg-surface-alt">
                <img src={c.img} alt="" loading="lazy" decoding="async" width="900" height="1125" className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" aria-hidden="true" />
                <span className="absolute left-5 top-5 font-mono text-[10px] tracking-widest text-white/70">0{i + 1}</span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
                  <span className="block">
                    <span className="block text-2xl font-semibold tracking-tight">{c.name}</span>
                    <span className="mt-1 block text-sm text-white/75">{c.desc}</span>
                  </span>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/40 transition-colors duration-300 group-hover:bg-white group-hover:text-black"><ArrowUpRight size={18} /></span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
