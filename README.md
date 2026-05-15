# HIMALAYA SLUSHI — Premium 3D Shopify Storefront

A luxury headless Shopify storefront built with Next.js 14, Three.js, Framer Motion, and Tailwind CSS.

---

## Quick Start

```bash
cd himalaya-slushi
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Works out of the box** with placeholder products. Connect Shopify when ready.

---

## Connect to Shopify

### Step 1 — Create a Shopify Custom App

1. Go to your Shopify Admin → **Settings → Apps and sales channels → Develop apps**
2. Click **Create an app**
3. Name it `HIMALAYA SLUSHI Storefront`
4. Under **API credentials** → click **Configure Storefront API scopes**
5. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_customers`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_customers`
6. Click **Save** → **Install app**
7. Copy the **Storefront API access token**

### Step 2 — Configure environment variables

Edit `.env.local`:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-actual-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-actual-token
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
```

### Step 3 — Create Shopify Collections

Create these collections in Shopify Admin → **Products → Collections**:
- `slushies`
- `smoothies`
- `natural-juices`
- `milkshakes`
- `protein-cups`
- `fruit-cups`
- `fresh-cut-fruit`

The handles must match the collection slugs exactly.

### Step 4 — Restart dev server

```bash
npm run dev
```

The app auto-detects the Shopify connection. When connected, it fetches real products and enables real cart/checkout flow.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Homepage (all sections)
│   ├── globals.css             # Global styles + Tailwind
│   └── products/[handle]/
│       ├── page.tsx            # Product detail page
│       └── AddToCartButton.tsx # Client-side cart button
├── components/
│   ├── Header.tsx              # Fixed nav with cart + language switcher
│   ├── Hero3D.tsx              # Three.js 3D hero (client-only)
│   ├── CategorySection.tsx     # Category grid section
│   ├── CategoryCard.tsx        # Individual category card
│   ├── FeaturedProducts.tsx    # Featured product grid
│   ├── ProductCard3D.tsx       # 3D hover card with translation tooltip
│   ├── TranslationTooltip.tsx  # Language overlay on hover
│   ├── SignatureFlavors.tsx    # Flavor showcase orbs
│   ├── BrandStory.tsx          # Brand narrative section
│   ├── CartDrawer.tsx          # Sliding cart panel
│   ├── LanguageSwitcher.tsx    # Language dropdown
│   └── Footer.tsx              # Footer with social + policies
├── context/
│   ├── CartContext.tsx         # Cart state + Shopify mutations
│   └── LanguageContext.tsx     # i18n detection + switching
├── lib/
│   ├── shopify.ts              # Shopify Storefront API client
│   └── placeholder.ts          # Mock products for offline dev
└── types/
    └── index.ts                # TypeScript types
public/
└── locales/
    ├── en.json  ├── es.json  ├── fr.json
    ├── ar.json  ├── pt.json  ├── it.json
    └── de.json
```

---

## Features

| Feature | Details |
|---|---|
| **3D Hero** | React Three Fiber scene with ice crystals, glass spheres, particles |
| **3D Product Cards** | Mouse-tracking perspective rotation, glassmorphism, glow on hover |
| **Translation Tooltip** | Auto-detects browser language, shows ingredients overlay on hover |
| **Language Switcher** | Dropdown supporting EN, ES, FR, AR, PT, IT, DE |
| **RTL Support** | Arabic layout auto-flips to right-to-left |
| **Cart Drawer** | Slide-in panel, quantity update, remove, Shopify checkout redirect |
| **Placeholder Mode** | Fully working without Shopify credentials |
| **Shopify Cart API** | Cart create, add lines, update quantities, remove lines |
| **Mobile Responsive** | All sections optimized for mobile |
| **Performance** | Dynamic import for Three.js, next/image optimization |

---

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS** (custom ice/glass theme)
- **Three.js + @react-three/fiber + @react-three/drei** (3D scenes)
- **Framer Motion** (animations)
- **Shopify Storefront API** (GraphQL)
- **Custom i18n** (browser locale detection + JSON files)

---

## Deployment

```bash
npm run build
npm run start
```

For Vercel deployment, add the `.env.local` variables in Vercel's Environment Variables dashboard.
