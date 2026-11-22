import { useData } from "../../contexts/DataContext";
import { Container, Section, SectionHeading } from "../ui/Section";
import ProductCard from "../product/ProductCard";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { Reveal } from "../ui/Reveal";

export default function FeaturedProducts() {
  const { products, loading } = useData();
  const featured = products.slice(0, 4);

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Featured" title="Selected with intention." description="A refined edit of high-performance essentials for work, life, and movement." />
          <Button as={Link} to="/products" variant="outline">View all</Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {loading && !products.length
            ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="rounded-3xl border border-border p-4"><Skeleton className="aspect-[4/5] w-full" /><Skeleton className="mt-4 h-4 w-24" /><Skeleton className="mt-2 h-5 w-full" /><Skeleton className="mt-6 h-10 w-full" /></div>)
            : featured.map((p, i) => <Reveal key={p.id} delay={i * 70}><ProductCard product={p} /></Reveal>)}
        </div>
      </Container>
    </Section>
  );
}

