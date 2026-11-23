import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import Skeleton from "./components/ui/Skeleton";
import { Container } from "./components/ui/Section";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Toaster = lazy(() => import("./components/ui/Toaster"));

function PageFallback() {
  return (
    <main id="main" className="py-20 md:py-28">
      <Container>
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-6 h-12 w-2/3 max-w-xl" />
        <Skeleton className="mt-5 h-4 w-full max-w-2xl" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-[4/5] w-full" />)}
        </div>
      </Container>
    </main>
  );
}

function PageTransition({ children }) {
  const { pathname } = useLocation();
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = root.animate(
      [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 320, easing: "cubic-bezier(.16,1,.3,1)" },
    );
    return () => animation.cancel();
  }, [pathname]);

  return <div id="page-root" ref={rootRef}>{children}</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-3 focus:text-xs focus:uppercase focus:tracking-widest focus:text-accent-foreground">Skip to content</a>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <PageTransition>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/card" element={<Navigate to="/cart" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </PageTransition>
        <Footer />
      </div>
      <Suspense fallback={null}><Toaster /></Suspense>
    </BrowserRouter>
  );
}
