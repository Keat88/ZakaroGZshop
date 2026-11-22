import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/utils";
import { Container, Section, SectionHeading } from "../components/ui/Section";
import Button from "../components/ui/Button";
import CartItem from "../components/product/CartItem";
import { usePageTitle } from "../components/ui/ScrollToTop";

export default function Cart() {
  usePageTitle("Cart");
  const { items, updateQuantity, removeItem, subtotal, totalItems, clearCart } = useCart();
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <main>
      <Section className="border-b border-border bg-surface-alt/30 py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Shopping Cart" title="Your selection" description={totalItems ? `${totalItems} item${totalItems > 1 ? "s" : ""} ready for checkout.` : "Your cart is currently empty."} />
        </Container>
      </Section>
      <Section>
        <Container>
          {items.length ? (
            <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
              <div className="rounded-3xl border border-border bg-surface px-6">
                <div className="divide-y divide-border">
                  {items.map((item) => <CartItem key={item.id} item={item} onUpdate={updateQuantity} onRemove={removeItem} />)}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6">
                  <Button as={Link} to="/products" variant="ghost">Continue shopping</Button>
                  <button onClick={clearCart} className="text-sm text-muted underline underline-offset-4 hover:text-foreground">Clear cart</button>
                </div>
              </div>
              <aside className="h-fit rounded-3xl border border-border bg-surface p-6 lg:sticky lg:top-28">
                <h2 className="text-lg font-semibold">Order summary</h2>
                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd></div>
                  <div className="flex justify-between border-t border-border pt-4 text-base font-semibold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
                </dl>
                <Button className="mt-8 w-full" onClick={() => window.alert("Checkout placeholder: connect your payment provider to complete purchases.")}>Checkout <ArrowRight size={16} /></Button>
                <p className="mt-4 text-xs leading-6 text-muted">Taxes calculated at checkout. This demo preserves cart state locally and does not process payments.</p>
              </aside>
            </div>
          ) : (
            <div className="mx-auto max-w-lg rounded-[2rem] border border-border bg-surface-alt/30 px-8 py-16 text-center">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface border border-border"><ShoppingBag size={28} /></div>
              <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
              <p className="mt-3 text-muted">Discover premium pieces designed to elevate your everyday.</p>
              <Button as={Link} to="/products" className="mt-8">Explore products</Button>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
