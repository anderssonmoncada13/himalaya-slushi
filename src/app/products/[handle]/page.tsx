import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getProductByHandle, getProducts } from '@/lib/shopify';
import ProductImageStage from '@/components/ProductImageStage';

const AddToCartButton = dynamic(() => import('./AddToCartButton'), { ssr: false });

interface Props {
  params: { handle: string };
}

export async function generateStaticParams() {
  try {
    const products = await getProducts(50);
    return products.map(p => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await getProductByHandle(params.handle);
    if (!product) return {};
    return { title: product.title, description: product.description };
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }: Props) {
  let product = null;
  try {
    product = await getProductByHandle(params.handle);
  } catch {
    notFound();
  }
  if (!product) notFound();

  const price    = product.priceRange.minVariantPrice;
  const imageUrl = product.featuredImage?.url ?? '';
  const imageAlt = product.featuredImage?.altText ?? product.title;

  return (
    <main className="min-h-screen bg-luxury-dark">
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back */}
          <a href="/" className="inline-flex items-center gap-2 text-white/35 hover:text-white/70
            text-sm mb-10 transition-colors group">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </a>

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* ── Product image stage ──────────────────────────────────────── */}
            <div
              className="relative w-full rounded-3xl overflow-hidden border border-white/8"
              style={{
                aspectRatio: '1 / 1',
                background:  'linear-gradient(160deg, #0a1628 0%, #06090f 100%)',
                boxShadow:
                  '0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(56,189,248,0.10), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {imageUrl ? (
                <ProductImageStage
                  src={imageUrl}
                  alt={imageAlt}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/15 text-9xl">
                  🧊
                </div>
              )}

              {/* Availability badge */}
              {!product.availableForSale && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider
                    bg-red-500/25 backdrop-blur-md border border-red-500/30 text-red-300">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* ── Product info ─────────────────────────────────────────────── */}
            <div className="space-y-6 lg:pt-4">

              {/* Type badge */}
              {product.productType && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                  bg-ice-500/10 border border-ice-500/20 text-ice-300">
                  {product.productType}
                </span>
              )}

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-ice-300"
                  style={{ textShadow: '0 0 24px rgba(56,189,248,0.45)' }}>
                  {price.currencyCode === 'USD' ? '$' : price.currencyCode}
                  {parseFloat(price.amount).toFixed(2)}
                </span>
                <span className="text-white/25 text-sm">{price.currencyCode}</span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-white/50 text-base leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Variants */}
              {product.variants.edges.length > 1 && (
                <div>
                  <p className="text-white/25 text-xs uppercase tracking-widest mb-3">Options</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map(({ node }) => (
                      <span key={node.id}
                        className="px-3 py-1.5 rounded-xl text-sm
                          bg-white/5 border border-white/8 text-white/55">
                        {node.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag}
                      className="px-2 py-0.5 rounded-full text-xs
                        bg-luxury-navy/50 border border-white/5 text-white/28">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Add to cart */}
              <div className="pt-2">
                <AddToCartButton product={product} />
              </div>

              {/* Vendor */}
              {product.vendor && (
                <p className="text-white/20 text-xs pt-2">
                  By <span className="text-white/40">{product.vendor}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
