import { Link } from "react-router-dom";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/utils";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import Button from "../components/ui/Button";
import CartItem from "../components/product/CartItem";
import { usePageTitle } from "../components/ui/ScrollToTop";

const FREE_SHIPPING_THRESHOLD = 500;

export default function Cart() {
  usePageTitle("Cart");
  const { items, updateQuantity, removeItem, subtotal, totalItems, clearCart } = useCart();
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <main id="main">
      <Section className="border-b border-border bg-surface-alt/40 py-14 md:py-20">
        <Container>
          <SectionHeading as="h1" eyebrow="Shopping cart" title="Your selection" description={totalItems ? `${totalItems} item${totalItems === 1 ? "" : "s"} ready for checkout.` : "Your cart is currently empty."} />
        </Container>
      </Section>

      <Section className="py-14 md:py-20">
        <Container>
          {items.length ? (
            <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
              <div>
                <div className="border border-border bg-surface px-5 sm:px-7">
                  <div className="divide-y divide-border">
                    {items.map((item) => <CartItem key={item.id} item={item} onUpdate={updateQuantity} onRemove={removeItem} />)}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6">
                    <Button as={Link} to="/products" variant="ghost" className="px-0">Continue shopping <ArrowRight size={15} /></Button>
                    <button onClick={() => { clearCart(); toast.info("Cart cleared"); }} className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted underline underline-offset-4 hover:text-foreground">Clear cart</button>
                  </div>
                </div>
              </div>

              <aside className="h-fit border border-border bg-surface p-6 lg:sticky lg:top-28" aria-label="Order summary">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em]">Order summary</h2>
                <dl className="mt-7 space-y-4 text-sm">
                  <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd></div>
                  <div className="flex justify-between border-t border-border pt-5 text-base font-semibold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
                </dl>

                <div className="mt-8 border border-border bg-surface-alt/60 p-4">
                  <p className="flex items-center gap-2 text-xs font-medium">{remaining === 0 ? <><Check size={14} /> Complimentary shipping unlocked</> : `Spend ${formatPrice(remaining)} more for complimentary shipping`}</p>
                  <div className="mt-3 h-1 w-full bg-border" role="progressbar" aria-label="Progress toward free shipping" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100"><div className="h-full bg-accent transition-[width] duration-500" style={{ width: `${progress}%` }} /></div>
                </div>

                <Button className="mt-6 w-full" onClick={() => toast.info("Checkout is a placeholder — connect a payment provider to go live.")}>Checkout <ArrowRight size={16} /></Button>
                <p className="mt-4 text-xs leading-6 text-muted">Taxes calculated at checkout. This demo preserves cart state locally and does not process payments.</p>
              </aside>
            </div>
          ) : (
            <div className="mx-auto max-w-lg border border-border bg-surface-alt/40 px-8 py-20 text-center">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center border border-border bg-surface"><ShoppingBag size={27} strokeWidth={1.5} /></div>
              <h2 className="mt-7 text-2xl font-semibold tracking-tight">Your cart is empty</h2>
              <p className="mt-3 text-muted">Discover premium pieces designed to elevate the everyday.</p>
              <Button as={Link} to="/products" className="mt-8">Explore products</Button>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
