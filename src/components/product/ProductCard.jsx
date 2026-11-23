import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingBag, Star } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../../contexts/CartContext";
import { formatPrice } from "../../lib/utils";
import Button from "../ui/Button";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [imageFailed, setImageFailed] = useState(false);
  const p = {
    id: product.id ?? product.product_id,
    name: product.name || product.title || "Untitled product",
    price: Number(product.price) || 0,
    image: product.image || product.img || product.thumbnail || "",
    brand: product.brand || product.category || "Collection",
    category: product.category || "Collection",
    status: product.status,
    rating: Number(product.rating) || 0,
    reviews: Number(product.reviews) || 0,
  };

  const addToCart = () => {
    addItem(p);
    toast.success(`${p.name} added to cart`);
  };

  return (
    <article className="group flex h-full flex-col border border-border bg-surface transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lift">
      <Link to={`/products?category=${encodeURIComponent(p.category)}`} className="relative block aspect-[4/5] overflow-hidden bg-surface-alt" aria-label={`Explore ${p.category} products`}>
        {p.image && !imageFailed ? (
          <img src={p.image} alt={p.name} loading="lazy" decoding="async" onError={() => setImageFailed(true)} className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" />
        ) : (
          <span className="flex h-full w-full items-center justify-center p-8 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">{p.category}</span>
        )}
        {p.status ? <span className="absolute left-3 top-3 bg-background px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground">{p.status}</span> : null}
        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center bg-background text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"><ArrowUpRight size={16} /></span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">{p.brand}</p>
        <h3 className="mt-3 text-base font-medium leading-snug tracking-tight text-foreground line-clamp-2">{p.name}</h3>
        <div className="mt-3 flex min-h-5 items-center gap-2 text-xs text-muted">
          {p.rating > 0 ? <><Star size={13} className="fill-foreground text-foreground" /><span>{p.rating.toFixed(1)}</span>{p.reviews > 0 ? <span className="text-muted">({p.reviews})</span> : null}</> : null}
        </div>
        <div className="mt-auto flex flex-col items-start gap-3 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-lg font-semibold tracking-tight text-foreground">{formatPrice(p.price)}</p>
          <Button size="sm" onClick={addToCart} aria-label={`Add ${p.name} to cart`}><ShoppingBag size={14} /> Add</Button>
        </div>
      </div>
    </article>
  );
}
