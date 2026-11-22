import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Menu, Moon, Search, ShoppingBag, Sun, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import Button from "./ui/Button";
import Drawer from "./ui/Drawer";
import { cn } from "../lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    searchRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    setMobileOpen(false);
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <>
      <header className={cn("sticky top-0 z-50 border-b transition-all duration-300", scrolled ? "border-border bg-background/90 backdrop-blur-xl" : "border-transparent bg-background/80 backdrop-blur-md")}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Primary">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-alt lg:hidden" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <Link to="/" className="text-xl font-semibold tracking-[0.22em] text-foreground">
              ZHARPRO
            </Link>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => cn("text-sm uppercase tracking-[0.18em] transition-colors hover:text-foreground", isActive ? "text-foreground" : "text-muted")}>
                {({ isActive }) => <span className="relative py-2">{item.label}{isActive && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-foreground" />}</span>}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-alt" aria-label="Search products" onClick={() => setSearchOpen((v) => !v)}>
              <Search size={19} />
            </button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-alt" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}>
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <Link to="/cart" className="relative inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface-alt" aria-label={`Cart with ${totalItems} items`}>
              <ShoppingBag size={19} />
              <span className="absolute right-1 top-1 min-w-5 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold leading-none text-accent-foreground" aria-hidden="true">{totalItems}</span>
            </Link>
            <div className="hidden sm:block">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="sm" variant="outline">Sign in</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton appearance={{ elements: { avatarBox: "h-9 w-9" } }} />
              </SignedIn>
            </div>
          </div>
        </nav>

        <div className={cn("overflow-hidden border-t border-border transition-all duration-300", searchOpen ? "max-h-24" : "max-h-0 border-transparent")}>
          <form onSubmit={submitSearch} className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Search size={18} className="text-muted" />
            <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search premium electronics..." className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted" aria-label="Search products" />
            <button type="button" onClick={() => setSearchOpen(false)} className="rounded-full p-2 hover:bg-surface-alt" aria-label="Close search"><X size={18} /></button>
          </form>
        </div>
      </header>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} title="Menu" side="left">
        <div className="flex h-full flex-col">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={({ isActive }) => cn("block rounded-xl px-4 py-3 text-sm uppercase tracking-[0.18em]", isActive ? "bg-surface-alt text-foreground" : "text-muted hover:bg-surface-alt hover:text-foreground")}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-8 border-t border-border pt-6">
            <SignedOut>
              <SignInButton mode="modal"><Button className="w-full">Sign in</Button></SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center justify-between rounded-xl bg-surface-alt px-4 py-3"><span className="text-sm text-muted">Account</span><UserButton /></div>
            </SignedIn>
          </div>
        </div>
      </Drawer>
    </>
  );
}
