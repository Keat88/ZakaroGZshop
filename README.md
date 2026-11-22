# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



## for fixlater

Summary
- Redesigned the app into a premium monochrome system (light/dark tokens, Tailwind v4 theme vars, reusable UI primitives, reveal animations, reduced-motion support) while keeping the existing React/Vite/Tailwind/Clerk/Router/Axios stack.
- Refactored architecture: DataContext now normalizes API + local fallback data, no whole-app blocking load, stable fetch; added CartContext (localStorage persistence, qty/add/remove/clear, totals) and ThemeContext (system/default + localStorage, no-flash script in index.html).
- Rebuilt UX/pages: responsive sticky navbar (search, theme toggle, cart badge, Clerk, mobile drawer), redesigned Home/Products/About/Contact/Cart/Footer, real /cart route, /card redirect, fixed naming/encoding/form/link issues.
Files
- Created: src/contexts/ThemeContext.jsx, src/contexts/CartContext.jsx, src/data/products.js, src/lib/utils.js, src/components/ui/{Button,Input,Section,Skeleton,Drawer,Reveal,ScrollToTop}.jsx, src/components/product/{ProductCard,CartItem}.jsx, src/components/home/{Hero,FeaturedCategories,FeaturedProducts,PromoBanner,WhyChooseUs,Testimonials,Newsletter}.jsx, src/components/Footer.jsx, src/pages/Cart.jsx, .env.example
- Modified: index.html, src/index.css, src/main.jsx, src/App.jsx, src/components/Navbar.jsx, src/contexts/DataContext.jsx, src/pages/{Home,Products,About,Contact}.jsx, .gitignore, package.json (no dep changes; lockfile untouched except not needed)
- Removed/replaced: old src/pages/{Card,Footer}.jsx, src/components/{Carousel,Feature,FeatureSection,FeatureSectionNew,Mindbanner}.jsx (replaced by new design/components)
Features / Fixes
- Implemented: theme toggle + persistence, responsive nav/mobile drawer, product search/category/max-price/sort, skeleton/empty/error states, cart with dynamic navbar badge, About/Contact redesign with validation, accessible labels/focus/ARIA/live regions, lazy images/aspect ratios, route transition/reveal animations.
- Bugs fixed: /card prop-less route issue, cart hardcoded count, duplicate/conflicting nav state, About wrong Link import, Contact encoding/phone type/placeholder/no handling, brand inconsistencies, DataContext unused/stable dependency issues, duplicate Carousel fetch, .env ignore + .env.example.
Verification
- Build: npm run build passes (vite 8, ~434kB JS gzip ~136kB warning only).
- Lint: npm run lint passes.
- Not fully verifiable here: live Clerk sign-in flow, real browser visual QA across breakpoints, live API availability/CORS at runtime, and Core Web Vitals field metrics. Payment is intentionally a placeholder (no fake processing).