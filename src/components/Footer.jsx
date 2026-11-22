import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const links = {
  Shop: [["Products", "/products"], ["Cart", "/cart"], ["New Arrivals", "/products?status=new"]],
  Company: [["About", "/about"], ["Contact", "/contact"], ["Home", "/"]],
  Support: [["Customer Care", "/contact"], ["Shipping & Returns", "/about"], ["FAQ", "/contact"]],
};

export default function Footer() {
  const [location, setLocation] = useState("");
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
        const data = await res.json();
        setLocation(data?.address?.city || data?.address?.town || data?.address?.state || "");
      } catch { /* ignore */ }
    }, () => {}, { timeout: 5000 });
  }, []);

  return (
    <footer className="border-t border-border bg-surface-alt/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link to="/" className="text-xl font-semibold tracking-[0.22em]">ZHARPRO</Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">A premium monochrome destination for modern electronics, crafted for clarity, confidence, and refined everyday living.</p>
            {location ? <p className="mt-4 flex items-center gap-2 text-sm text-muted"><MapPin size={15} /> Delivering near {location}</p> : null}
            <div className="mt-6 flex gap-3">
              {[{Icon:FaInstagram,label:"Instagram",href:"https://www.instagram.com"},{Icon:FaFacebook,label:"Facebook",href:"https://www.facebook.com"},{Icon:FaXTwitter,label:"X",href:"https://x.com"}].map(({Icon,label,href}) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:bg-accent hover:text-accent-foreground">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(links).map(([title, items]) => (
              <div key={title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">{title}</h3>
                <ul className="mt-4 space-y-3">
                  {items.map(([label, to]) => <li key={label}><Link to={to} className="text-sm text-muted transition hover:text-foreground">{label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ZharpRo. All rights reserved.</p>
          <p>Premium electronics, thoughtfully selected.</p>
        </div>
      </div>
    </footer>
  );
}


