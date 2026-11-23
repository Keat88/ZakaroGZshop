import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "../../lib/utils";

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="flex gap-4 py-6 sm:gap-6">
      <div className="h-24 w-20 shrink-0 overflow-hidden border border-border bg-surface-alt sm:h-32 sm:w-28">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" decoding="async" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{item.brand || "Collection"}</p>
            <h3 className="mt-2 text-sm font-medium leading-snug text-foreground sm:text-base">{item.name}</h3>
            <p className="mt-1 text-xs text-muted">{formatPrice(item.price)} each</p>
          </div>
          <button onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name} from cart`} className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-border text-muted transition-colors hover:border-foreground hover:text-foreground"><Trash2 size={16} /></button>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <div className="inline-flex items-center border border-border">
            <button className="inline-flex h-9 w-9 items-center justify-center transition-colors hover:bg-surface-alt disabled:opacity-40" aria-label={`Decrease quantity of ${item.name}`} disabled={item.quantity <= 1} onClick={() => onUpdate(item.id, item.quantity - 1)}><Minus size={14} /></button>
            <span className="w-9 text-center text-sm font-medium" aria-live="polite">{item.quantity}</span>
            <button className="inline-flex h-9 w-9 items-center justify-center transition-colors hover:bg-surface-alt disabled:opacity-40" aria-label={`Increase quantity of ${item.name}`} disabled={item.quantity >= 99} onClick={() => onUpdate(item.id, item.quantity + 1)}><Plus size={14} /></button>
          </div>
          <p className="text-base font-semibold tracking-tight">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}
