import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { formatPrice } from "../../lib/utils";
import Button from "../ui/Button";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const p = {
    id: product.id ?? product.product_id,
    name: product.name || product.title,
    price: Number(product.price) || 0,
    image: product.image || product.img,
    brand: product.brand || product.category || "Collection",
    status: product.status,
    rating: Number(product.rating || 4.8),
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
      <div className="relative overflow-hidden bg-surface-alt">
        <Link to={`/products?highlight=${encodeURIComponent(p.id)}`} className="block aspect-[4/5]">
          <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
        </Link>
        <div className="absolute left-4 top-4 flex gap-2">
          {p.status ? <span className="rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground backdrop-blur">{p.status}</span> : null}
        </div>
        <button aria-label={`Save ${p.name}`} className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur transition hover:bg-accent hover:text-accent-foreground">
          <Heart size={18} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{p.brand}</p>
        <h3 className="mt-2 text-lg font-medium leading-snug text-foreground line-clamp-2">{p.name}</h3>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted">
          <Star size={14} className="fill-foreground text-foreground" />
          <span>{p.rating.toFixed(1)}</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <p className="text-lg font-semibold tracking-tight">{formatPrice(p.price)}</p>
          <Button size="sm" onClick={() => addItem(p)} aria-label={`Add ${p.name} to cart`}>
            <ShoppingBag size={16} /> Add
          </Button>
        </div>
      </div>
    </article>
  );
}
