import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useData } from "../contexts/DataContext";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import ProductCard from "../components/product/ProductCard";
import Skeleton from "../components/ui/Skeleton";
import Drawer from "../components/ui/Drawer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { usePageTitle } from "../components/ui/ScrollToTop";

function FilterPanel({ filters, onChange, categories, maxPrice }) {
  const update = (key, value) => onChange({ [key]: value });
  return (
    <div className="space-y-9">
      <div>
        <label htmlFor="filter-search" className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">Search</label>
        <div className="relative mt-3">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <Input id="filter-search" value={filters.q} onChange={(e) => update("q", e.target.value)} placeholder="Search products" className="pl-10" />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">Category</p>
        <div className="mt-4 space-y-3">
          {categories.map((c) => (
            <label key={c} className="flex cursor-pointer items-center justify-between gap-3 text-sm text-foreground">
              <span className="flex items-center gap-3"><input type="radio" name="category" checked={filters.category === c} onChange={() => update("category", c)} className="accent-foreground" />{c}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-muted"><span>Max price</span><span className="font-mono text-xs normal-case tracking-normal text-foreground">${filters.maxPrice.toLocaleString("en-US")}</span></div>
        <input type="range" min="0" max={maxPrice} step="50" value={Math.min(filters.maxPrice, maxPrice)} onChange={(e) => update("maxPrice", Number(e.target.value))} className="mt-5 w-full accent-foreground" aria-label="Maximum price" />
      </div>
      <div>
        <label htmlFor="sort-select" className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">Sort</label>
        <select id="sort-select" value={filters.sort} onChange={(e) => update("sort", e.target.value)} className="mt-3 h-12 w-full rounded-[2px] border border-border bg-background px-4 text-sm text-foreground">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name: A–Z</option>
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
  const [filters, setFilters] = useState(() => ({ q: "", category: "All", sort: "featured", maxPrice: null }));

  const qParam = params.get("q") || "";
  const catParam = params.get("category") || "";
  const maxProductPrice = useMemo(() => Math.max(1000, ...products.map((p) => p.price || 0)), [products]);

  const effectiveFilters = useMemo(() => ({
    q: qParam || filters.q,
    category: catParam || filters.category,
    sort: filters.sort,
    maxPrice: filters.maxPrice ?? maxProductPrice,
  }), [filters, qParam, catParam, maxProductPrice]);

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      const q = effectiveFilters.q.trim().toLowerCase();
      const matchQ = !q || [p.name, p.brand, p.category, p.description].some((v) => String(v).toLowerCase().includes(q));
      const matchCat = effectiveFilters.category === "All" || p.category.toLowerCase() === effectiveFilters.category.toLowerCase() || p.name.toLowerCase().includes(effectiveFilters.category.toLowerCase());
      return matchQ && matchCat && p.price <= effectiveFilters.maxPrice;
    });
    if (effectiveFilters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (effectiveFilters.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (effectiveFilters.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, effectiveFilters]);

  const updateFilters = (patch) => {
    const next = { ...effectiveFilters, ...(typeof patch === "function" ? patch(effectiveFilters) : patch) };
    setFilters(next);
    const nextParams = new URLSearchParams(params);
    next.q ? nextParams.set("q", next.q) : nextParams.delete("q");
    next.category && next.category !== "All" ? nextParams.set("category", next.category) : nextParams.delete("category");
    setParams(nextParams, { replace: true });
  };

  const clearFilters = () => {
    setFilters({ q: "", category: "All", sort: "featured", maxPrice: null });
    setParams({}, { replace: true });
  };

  return (
    <main id="main">
      <Section className="border-b border-border bg-surface-alt/40 py-14 md:py-20">
        <Container>
          <SectionHeading as="h1" eyebrow="Collection" title="All products" description="Explore premium electronics chosen for performance, restraint, and enduring design." />
        </Container>
      </Section>

      <Section id="collection" className="py-14 md:py-20">
        <Container>
          <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{filtered.length} products</p>
            <Button variant="outline" size="sm" onClick={() => setMobileFilters(true)}><SlidersHorizontal size={15} /> Filters</Button>
          </div>

          <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-28 border border-border bg-surface p-6">
                <div className="mb-8 flex items-center justify-between border-b border-border pb-5">
                  <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em]">Filters</h2>
                  <button onClick={clearFilters} className="text-[10px] uppercase tracking-[0.16em] text-muted underline underline-offset-4 hover:text-foreground">Clear</button>
                </div>
                <FilterPanel filters={effectiveFilters} onChange={updateFilters} categories={categories} maxPrice={maxProductPrice} />
              </div>
            </aside>

            <div>
              <div className="mb-7 hidden items-center justify-between gap-6 border-b border-border pb-5 lg:flex">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{filtered.length} products</p>
                <div className="flex items-center gap-4">
                  {error ? <p className="text-xs text-muted">{error}</p> : null}
                  <label htmlFor="toolbar-sort" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Sort</label>
                  <select id="toolbar-sort" value={filters.sort} onChange={(e) => updateFilters({ sort: e.target.value })} className="h-10 border border-border bg-background px-3 text-xs text-foreground">
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="name">Name: A–Z</option>
                  </select>
                </div>
              </div>

              {loading && !products.length ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => <div key={i} className="border border-border bg-surface p-4"><Skeleton className="aspect-[4/5] w-full" /><Skeleton className="mt-5 h-3 w-20" /><Skeleton className="mt-3 h-5 w-full" /><Skeleton className="mt-8 h-10 w-full" /></div>)}
                </div>
              ) : filtered.length ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
                  {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              ) : (
                <div className="border border-border bg-surface-alt/40 px-6 py-20 text-center">
                  <p className="text-xl font-semibold tracking-tight">No products found</p>
                  <p className="mt-3 text-sm text-muted">Try a different search, category, or price range.</p>
                  <Button className="mt-7" variant="outline" onClick={clearFilters}><X size={15} /> Clear filters</Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Drawer open={mobileFilters} onClose={() => setMobileFilters(false)} title="Filters">
        <FilterPanel filters={effectiveFilters} onChange={updateFilters} categories={categories} maxPrice={maxProductPrice} />
        <Button className="mt-9 w-full" variant="outline" onClick={() => { clearFilters(); setMobileFilters(false); }}>Clear filters</Button>
        <Button className="mt-3 w-full" onClick={() => setMobileFilters(false)}>Show {filtered.length} products</Button>
      </Drawer>
    </main>
  );
}
