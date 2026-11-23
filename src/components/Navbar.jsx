import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, Moon, Search, ShoppingBag, Sun, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import Button from "./ui/Button";
import Drawer from "./ui/Drawer";
import { cn } from "../lib/utils";

const navItems = [
  { to: "/", label: "Home", index: "01" },
  { to: "/products", label: "Products", index: "02" },
  { to: "/about", label: "About", index: "03" },
  { to: "/contact", label: "Contact", index: "04" },
];

function Brand({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group inline-flex items-center gap-3" aria-label="ZharpRo home">
      <span className="relative inline-flex h-8 w-8 items-center justify-center border border-foreground text-sm font-semibold tracking-tight sm:h-9 sm:w-9">
        Z
        <span className="absolute -bottom-px -right-px h-2 w-2 bg-accent" />
      </span>
      <span className="hidden text-sm font-semibold tracking-[0.22em] min-[375px]:inline sm:text-base sm:tracking-[0.28em]">ZHARPRO</span>
    </Link>
  );
}

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
      <header className={cn("sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500", scrolled ? "border-border bg-background/92 backdrop-blur-xl" : "border-transparent bg-background/70 backdrop-blur-md")}>
        <nav className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10" aria-label="Primary">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:bg-surface-alt sm:h-11 sm:w-11 lg:hidden" aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}>
              <Menu size={19} />
            </button>
            <Brand />
          </div>

          <div className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => cn("group relative py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors", isActive ? "text-foreground" : "text-muted hover:text-foreground")}>
                {({ isActive }) => (
                  <span className="flex items-center gap-1.5">
                    <span className={cn("h-px w-3 origin-right bg-accent transition-transform duration-300", isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center sm:gap-2">
            <button className="inline-flex h-10 w-10 items-center justify-center transition-colors hover:bg-surface-alt sm:h-11 sm:w-11" aria-label={searchOpen ? "Close search" : "Search products"} aria-expanded={searchOpen} aria-controls="site-search" onClick={() => setSearchOpen((v) => !v)}>
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center transition-colors hover:bg-surface-alt sm:h-11 sm:w-11" aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}>
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <Link to="/cart" className="relative inline-flex h-10 w-10 items-center justify-center transition-colors hover:bg-surface-alt sm:h-11 sm:w-11" aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}>
              <ShoppingBag size={19} />
              <span className={cn("absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center px-1 text-[9px] font-semibold leading-none", totalItems ? "bg-accent text-accent-foreground" : "bg-surface-alt text-muted")} aria-hidden="true">{totalItems}</span>
            </Link>
            <div className="ml-2 hidden xl:block">
              <Button as={Link} to="/products" size="sm">Shop now <ArrowUpRight size={15} /></Button>
            </div>
          </div>
        </nav>

        <div id="site-search" className={cn("overflow-hidden border-t transition-[max-height,opacity,border-color] duration-500 ease-out", searchOpen ? "max-h-28 border-border opacity-100" : "max-h-0 border-transparent opacity-0")} aria-hidden={!searchOpen}>
          <form onSubmit={submitSearch} className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-10">
            <Search size={20} className="shrink-0 text-muted" />
            <input ref={searchRef} tabIndex={searchOpen ? 0 : -1} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the collection..." className="h-10 w-full bg-transparent text-base outline-none placeholder:text-muted" aria-label="Search products" />
            <Button type="submit" size="sm" tabIndex={searchOpen ? 0 : -1}>Search</Button>
          </form>
        </div>
      </header>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} title="Menu" side="left">
        <div className="flex h-full flex-col">
          <nav className="space-y-1" aria-label="Mobile">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={() => setMobileOpen(false)} className={({ isActive }) => cn("flex items-center justify-between border-b border-border py-4 text-2xl font-medium tracking-tight transition-colors", isActive ? "text-foreground" : "text-muted hover:text-foreground")}>
                <span>{item.label}</span>
                <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-muted">{item.index}</span>
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto border-t border-border pt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Explore</p>
            <Button as={Link} to="/products" onClick={() => setMobileOpen(false)} className="mt-4 w-full">Shop the collection <ArrowUpRight size={16} /></Button>
            <p className="mt-6 text-xs leading-6 text-muted">Premium electronics for considered living.</p>
          </div>
        </div>
      </Drawer>
    </>
  );
}
