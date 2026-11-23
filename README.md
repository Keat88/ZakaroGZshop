# ZharpRo GEnZ

Premium monochrome storefront for electronics, smart devices, and EV gadgets. React 19 + Vite 8 + Tailwind CSS 4, JavaScript/JSX, ESM.

## Commands

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

No environment variables are required. The storefront runs as a public guest experience; see `.env.example`.

## Architecture

- `src/main.jsx` — `ThemeProvider` → `DataProvider` → `CartProvider` → `App`
- `src/App.jsx` — router, lazy route splitting, page transitions, toasts, skip link
- `src/contexts/` — theme (localStorage + system preference), catalog (API + local fallback), cart (localStorage persistence)
- `src/components/ui/` — `Button`, `Input`/`Textarea`, `Section`, `Skeleton`, `Drawer`, `Reveal`, `ScrollToTop`
- `src/components/home/`, `src/components/product/` — page sections and product/cart presentation
- `src/pages/` — Home, Products, About, Contact, Cart
- `src/index.css` — Tailwind v4 theme tokens for the light/dark monochrome system

Routes: `/`, `/products`, `/about`, `/contact`, `/cart`, `/card` → `/cart`, `*` → `/`.

## Features

- Search, category, max-price, and sort filters with URL `q`/`category` parameters
- Responsive filter drawer, skeletons, empty states, toasts for cart actions
- Cart persistence in `localStorage`, quantity controls, free-shipping threshold at $500
- Light/dark themes with no-flash initialization and reduced-motion support
- Live catalog fetch with abort/timeout and curated local fallback (`src/data/products.js`)

## Notes

- Checkout, contact form, and newsletter are clearly labeled placeholders; no backend or payment provider is connected.
- Analytics, customer accounts, and verified customer reviews are intentionally absent.
