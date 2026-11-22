import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "../../lib/utils";

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="flex gap-4 py-6">
      <div className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-surface-alt">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.brand || "Collection"}</p>
            <h3 className="mt-1 text-base font-medium text-foreground">{item.name}</h3>
          </div>
          <button onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`} className="rounded-full p-2 text-muted hover:bg-surface-alt hover:text-foreground">
            <Trash2 size={18} />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 pt-4">
          <div className="inline-flex items-center rounded-full border border-border">
            <button className="h-9 w-9 rounded-full hover:bg-surface-alt" aria-label={`Decrease quantity of ${item.name}`} onClick={() => onUpdate(item.id, item.quantity - 1)}><Minus size={14} className="mx-auto" /></button>
            <span className="w-10 text-center text-sm font-medium" aria-live="polite">{item.quantity}</span>
            <button className="h-9 w-9 rounded-full hover:bg-surface-alt" aria-label={`Increase quantity of ${item.name}`} onClick={() => onUpdate(item.id, item.quantity + 1)}><Plus size={14} className="mx-auto" /></button>
          </div>
          <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}
