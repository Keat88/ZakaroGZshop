import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Container } from "./ui/Section";

const links = {
  Shop: [["All products", "/products"], ["The collection", "/products#collection"], ["Your cart", "/cart"]],
  Company: [["Home", "/"], ["About ZharpRo", "/about"], ["Contact", "/contact"]],
  Explore: [["Mobile", "/products?category=Mobile"], ["Computing", "/products?category=Computing"], ["Audio", "/products?category=Audio"]],
};

const socials = [
  { label: "Instagram", href: "https://www.instagram.com", Icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com", Icon: FaFacebook },
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt/50">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          <div>
            <Link to="/" className="inline-flex items-center gap-3" aria-label="ZharpRo home">
              <span className="inline-flex h-9 w-9 items-center justify-center border border-foreground text-sm font-semibold">Z</span>
              <span className="text-base font-semibold tracking-[0.28em]">ZHARPRO</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted">A considered destination for premium electronics and EV gadgets. Precision-selected, honestly presented, built for modern living.</p>
            <div className="mt-8 space-y-3 text-sm text-muted">
              <p className="flex items-start gap-3"><MapPin size={16} className="mt-1 shrink-0 text-foreground" /><span>51P, Sen Sok, Phnom Penh, Cambodia</span></p>
              <p className="flex items-center gap-3"><Mail size={16} className="shrink-0 text-foreground" /><a href="mailto:support@zharpro.com" className="transition-colors hover:text-foreground">support@zharpro.com</a></p>
              <p className="flex items-center gap-3"><Phone size={16} className="shrink-0 text-foreground" /><a href="tel:+855965757413" className="transition-colors hover:text-foreground">+855 96 575 7413</a></p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {Object.entries(links).map(([title, items]) => (
              <nav key={title} aria-label={title}>
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-foreground">{title}</h2>
                <ul className="mt-5 space-y-3">
                  {items.map(([label, to]) => <li key={label}><Link to={to} className="text-sm text-muted transition-colors hover:text-foreground">{label}</Link></li>)}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">© {new Date().getFullYear()} ZharpRo. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="inline-flex h-10 w-10 items-center justify-center border border-border text-muted transition-colors hover:border-foreground hover:text-foreground">
                <Icon size={16} />
              </a>
            ))}
            <Link to="/products" className="ml-2 inline-flex h-10 w-10 items-center justify-center border border-foreground text-foreground transition-colors hover:bg-accent hover:text-accent-foreground" aria-label="Shop now"><ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
