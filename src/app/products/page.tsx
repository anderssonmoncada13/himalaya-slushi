import { Metadata } from 'next';
import Link from 'next/link';
import { getProducts } from '@/lib/shopify';
import { ShopifyProduct } from '@/types';
import ProductCard3D from '@/components/ProductCard3D';

// Keywords used to match products to each category slug.
// Checked (case-insensitive) against: productType, tags, title, handle.
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  slushies:        ['slushi', 'slushie', 'slushies', 'granizado', 'granizados'],
  smoothies:       ['smoothie', 'smoothies'],
  'natural-juices':['natural juice', 'natural juices', 'juice', 'juices', 'jugo', 'jugos', 'jugos naturales'],
  milkshakes:      ['milkshake', 'milkshakes', 'malteada', 'malteadas'],
  'protein-cups':  ['protein', 'protein cup', 'vasos de proteína', 'proteina'],
  'fruit-cups':    ['fruit cup', 'fruit cups', 'vaso de fruta', 'vasos de fruta'],
  'fresh-cut-fruit':['fresh cut fruit', 'fruta picada', 'fruta fresca cortada', 'fruit plate'],
};

const CATEGORY_LABELS: Record<string, string> = {
  slushies:        'Slushies',
  smoothies:       'Smoothies',
  'natural-juices':'Natural Juices',
  milkshakes:      'Milkshakes',
  'protein-cups':  'Protein Cups',
  'fruit-cups':    'Fruit Cups',
  'fresh-cut-fruit':'Fresh Cut Fruit',
};

function matchesCategory(product: ShopifyProduct, keywords: string[]): boolean {
  const haystack = [
    product.productType,
    product.title,
    product.handle,
    ...product.tags,
  ]
    .join(' ')
    .toLowerCase();

  return keywords.some(kw => haystack.includes(kw.toLowerCase()));
}

interface Props {
  searchParams: { category?: string };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const label = searchParams.category
    ? (CATEGORY_LABELS[searchParams.category] ?? 'Products')
    : 'All Products';
  return {
    title: `${label} — HIMALAYA SLUSHI`,
    description: `Browse our ${label.toLowerCase()} collection of premium frozen drinks and fresh treats.`,
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const categorySlug = searchParams.category ?? null;

  let allProducts: ShopifyProduct[] = [];
  try {
    allProducts = await getProducts(50);
  } catch {
    // show empty state below
  }

  const products = categorySlug && CATEGORY_KEYWORDS[categorySlug]
    ? allProducts.filter(p => matchesCategory(p, CATEGORY_KEYWORDS[categorySlug!]))
    : allProducts;

  const categoryLabel = categorySlug ? (CATEGORY_LABELS[categorySlug] ?? 'Products') : null;

  return (
    <main className="min-h-screen bg-luxury-dark">
      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/35 hover:text-white/70
              text-sm mb-10 transition-colors group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block mb-3 text-ice-400 text-xs font-semibold
              tracking-[0.3em] uppercase">
              {categoryLabel ? 'Category' : 'Full Collection'}
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
              {categoryLabel ?? 'All Products'}
            </h1>
            <div className="mt-4 w-16 h-px bg-gradient-to-r from-transparent via-ice-400 to-transparent" />
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            <Link
              href="/products"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                ${!categorySlug
                  ? 'bg-ice-500 text-white shadow-glow-blue'
                  : 'bg-white/6 border border-white/10 text-white/55 hover:bg-white/12 hover:text-white'}`}
            >
              All
            </Link>
            {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/products?category=${slug}`}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                  ${categorySlug === slug
                    ? 'bg-ice-500 text-white shadow-glow-blue'
                    : 'bg-white/6 border border-white/10 text-white/55 hover:bg-white/12 hover:text-white'}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {products.length === 0 && (
            <div className="text-center py-28">
              <div className="text-6xl mb-5">🧊</div>
              <p className="text-white/50 text-base mb-2">
                {categoryLabel
                  ? `No products found in ${categoryLabel}.`
                  : 'No products found.'}
              </p>
              <p className="text-white/25 text-sm max-w-md mx-auto">
                {categoryLabel
                  ? 'Try another category or browse all products.'
                  : 'Make sure your products are published to the Headless sales channel in your Shopify admin.'}
              </p>
              {categoryLabel && (
                <Link
                  href="/products"
                  className="inline-block mt-6 px-6 py-2.5 rounded-xl
                    bg-ice-500/10 border border-ice-500/20 text-ice-300 text-sm
                    hover:bg-ice-500/20 transition-colors"
                >
                  View All Products
                </Link>
              )}
            </div>
          )}

          {/* Grid */}
          {products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {products.map((product, i) => (
                <ProductCard3D key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
