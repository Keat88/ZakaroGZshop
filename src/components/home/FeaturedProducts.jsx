import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { Container, Section, SectionHeading } from "../ui/Section";
import ProductCard from "../product/ProductCard";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function FeaturedProducts() {
  const { products, loading } = useData();
  const featured = products.slice(0, 4);

  return (
    <Section className="border-y border-border bg-surface-alt/30">
      <Container>
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Featured" title="Selected with intention." description="A refined edit of high-performance essentials for work, life, and movement." />
          <Button as={Link} to="/products" variant="outline">View all products</Button>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {loading && !products.length
            ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="border border-border bg-surface p-4"><Skeleton className="aspect-[4/5] w-full" /><Skeleton className="mt-5 h-3 w-20" /><Skeleton className="mt-3 h-5 w-full" /><Skeleton className="mt-8 h-10 w-full" /></div>)
            : featured.map((p, i) => <Reveal key={p.id} delay={i * 70}><ProductCard product={p} /></Reveal>)}
        </div>
      </Container>
    </Section>
  );
}
