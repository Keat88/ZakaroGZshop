import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { useData } from "../contexts/DataContext";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import ProductCard from "../components/product/ProductCard";
import Skeleton from "../components/ui/Skeleton";
import Drawer from "../components/ui/Drawer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { usePageTitle } from "../components/ui/ScrollToTop";

function FilterPanel({ filters, setFilters, categories, maxPrice }) {
  const update = (k, v) => setFilters((f) => ({ ...f, [k]: v }));
  return (
    <div className="space-y-8">
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Search</label>
        <Input value={filters.q} onChange={(e) => update("q", e.target.value)} placeholder="Search products" className="mt-3" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Category</p>
        <div className="mt-3 space-y-2">
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-3 text-sm text-foreground">
              <input type="radio" name="category" checked={filters.category === c} onChange={() => update("category", c)} className="accent-foreground" />
              {c}
            </label>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted"><span>Max price</span><span>${filters.maxPrice}</span></div>
        <input type="range" min="0" max={maxPrice} step="50" value={filters.maxPrice} onChange={(e) => update("maxPrice", Number(e.target.value))} className="mt-4 w-full accent-foreground" aria-label="Maximum price" />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Sort</label>
        <select value={filters.sort} onChange={(e) => update("sort", e.target.value)} className="mt-3 h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
}

export default function Products() {
  usePageTitle("Products");
  const { products, loading, error, categories } = useData();
  const [params, setParams] = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);
  const maxProductPrice = useMemo(() => Math.max(1000, ...products.map((p) => p.price || 0)), [products]);
  const qParam = params.get("q") || "";
  const catParam = params.get("category") || "All";
  const [filters, setFilters] = useState(() => ({ q: qParam, category: catParam, sort: "featured", maxPrice: 100000 }));

  const effectiveFilters = useMemo(() => ({
    ...filters,
    q: qParam || filters.q,
    category: catParam || filters.category,
    maxPrice: filters.maxPrice === 100000 ? maxProductPrice : filters.maxPrice,
  }), [filters, qParam, catParam, maxProductPrice]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const q = effectiveFilters.q.trim().toLowerCase();
      const matchQ = !q || [p.name, p.brand, p.category, p.description].some((v) => String(v).toLowerCase().includes(q));
      const matchCat = effectiveFilters.category === "All" || p.category.toLowerCase() === effectiveFilters.category.toLowerCase() || p.name.toLowerCase().includes(effectiveFilters.category.toLowerCase());
      const matchPrice = p.price <= effectiveFilters.maxPrice;
      return matchQ && matchCat && matchPrice;
    });
    if (effectiveFilters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (effectiveFilters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (effectiveFilters.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, effectiveFilters]);

  const setFilterState = (updater) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("q");
      next.delete("category");
      return next;
    });
    setFilters((f) => {
      const base = { ...f, ...effectiveFilters };
      return typeof updater === "function" ? updater(base) : { ...base, ...updater };
    });
  };

  const clearFilters = () => {
    setFilters({ q: "", category: "All", sort: "featured", maxPrice: maxProductPrice });
    setParams({});
  };

  return (
    <main>
      <Section className="border-b border-border bg-surface-alt/30 py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Collection" title="All products" description="Explore premium electronics chosen for performance, restraint, and enduring design." />
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
            <p className="text-sm text-muted">{filtered.length} products</p>
            <Button variant="outline" size="sm" onClick={() => setMobileFilters(true)}><SlidersHorizontal size={16} /> Filters</Button>
          </div>
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-3xl border border-border bg-surface p-6">
                <div className="mb-6 flex items-center justify-between"><h2 className="text-sm font-semibold uppercase tracking-[0.2em]">Filters</h2><button onClick={clearFilters} className="text-xs text-muted underline underline-offset-4">Clear</button></div>
                <FilterPanel filters={effectiveFilters} setFilters={setFilterState} categories={categories} maxPrice={maxProductPrice} />
              </div>
            </aside>
            <div>
              <div className="mb-6 hidden items-center justify-between lg:flex">
                <p className="text-sm text-muted">{filtered.length} products</p>
                {error ? <p className="text-sm text-muted">{error}</p> : null}
              </div>
              {loading && !products.length ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => <div key={i} className="rounded-3xl border border-border p-4"><Skeleton className="aspect-[4/5] w-full" /><Skeleton className="mt-4 h-4 w-24" /><Skeleton className="mt-2 h-5 w-full" /><Skeleton className="mt-6 h-10 w-full" /></div>)}
                </div>
              ) : filtered.length ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              ) : (
                <div className="rounded-3xl border border-border bg-surface-alt/30 px-6 py-16 text-center">
                  <p className="text-lg font-medium">No products found</p>
                  <p className="mt-2 text-sm text-muted">Try adjusting your search or filters.</p>
                  <Button className="mt-6" variant="outline" onClick={clearFilters}><X size={16} /> Clear filters</Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
      <Drawer open={mobileFilters} onClose={() => setMobileFilters(false)} title="Filters">
        <FilterPanel filters={effectiveFilters} setFilters={setFilterState} categories={categories} maxPrice={maxProductPrice} />
        <Button className="mt-8 w-full" variant="outline" onClick={() => { clearFilters(); setMobileFilters(false); }}>Clear filters</Button>
      </Drawer>
    </main>
  );
}



