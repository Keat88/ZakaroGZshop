import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

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
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <Link to={`/products?category=${encodeURIComponent(c.name)}`} className="group relative block overflow-hidden rounded-[2rem] border border-border bg-surface-alt">
                <img src={c.img} alt={`${c.name} category`} loading="lazy" className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight">{c.name}</h3>
                      <p className="mt-1 text-sm text-white/75">{c.desc}</p>
                    </div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition group-hover:bg-white group-hover:text-black"><ArrowUpRight size={18} /></span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
