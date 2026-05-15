'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopifyProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import ProductImageStage from './ProductImageStage';
import TranslationTooltip from './TranslationTooltip';

interface Props {
  product: ShopifyProduct;
  index?: number;
}

export default function ProductCard3D({ product, index = 0 }: Props) {
  const cardRef               = useRef<HTMLDivElement>(null);
  const [rotate, setRotate]   = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding]   = useState(false);
  const { addItem }           = useCart();
  const { t, locale }         = useLanguage();

  const firstVariant = product.variants.edges[0]?.node;
  const variantId    = firstVariant?.id ?? null;
  const canAddToCart = !!(variantId && firstVariant?.availableForSale);
  const price        = product.priceRange.minVariantPrice.amount;
  const currency     = product.priceRange.minVariantPrice.currencyCode;
  const imageUrl     = product.featuredImage?.url ?? '';
  const imageAlt     = product.featuredImage?.altText ?? product.title;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy   = (e.clientY - rect.top)  / rect.height - 0.5;
    setRotate({ x: -cy * 12, y: cx * 12 });
  }

  function onMouseLeave() {
    setRotate({ x: 0, y: 0 });
    setHovered(false);
  }

  async function handleAddToCart() {
    if (!variantId) return;
    setAdding(true);
    await addItem(variantId, 1, {
      title:        product.title,
      price,
      currencyCode: currency,
      image:        imageUrl,
    });
    setAdding(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={() => setHovered(true)}
        style={{
          transform:  `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.55s ease-out',
        }}
        className="relative group cursor-pointer"
      >
        {/* ── Card shell ──────────────────────────────────────────────────────── */}
        <div
          className="relative rounded-3xl overflow-hidden
            border border-white/8 hover:border-ice-400/30
            transition-[box-shadow,border-color] duration-500"
          style={{
            background:
              'linear-gradient(160deg, rgba(10,22,40,0.95) 0%, rgba(6,9,15,0.98) 100%)',
            boxShadow: hovered
              ? '0 24px 64px rgba(0,0,0,0.55), 0 0 40px rgba(56,189,248,0.14), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
            transform:  hovered ? 'translateY(-10px)' : 'translateY(0)',
            transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease',
          }}
        >
          {/* Shimmer sweep on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none z-10">
            <div className="absolute inset-0 bg-shimmer bg-[length:400%_100%] animate-shimmer" />
          </div>

          {/* Hover ring glow */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
            ring-1 ring-inset ring-ice-400/18 transition-opacity duration-400 pointer-events-none z-10" />

          {/* ── Product image stage ──────────────────────────────────────────── */}
          <div className="relative h-56 sm:h-64 overflow-hidden">
            {imageUrl ? (
              <ProductImageStage
                src={imageUrl}
                alt={imageAlt}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center
                bg-gradient-to-b from-luxury-navy/60 to-luxury-dark text-5xl text-white/15">
                🧊
              </div>
            )}

            {/* Badge overlays — sit above the stage */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {product.productType && (
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider
                    bg-black/50 backdrop-blur-md border border-white/10 text-white/75">
                    {product.productType}
                  </span>
                </div>
              )}
              {!product.availableForSale && (
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider
                    bg-red-500/25 backdrop-blur-md border border-red-500/30 text-red-300">
                    {t('product.outOfStock', 'Out of Stock')}
                  </span>
                </div>
              )}
            </div>

            {/* Translation tooltip */}
            <AnimatePresence>
              {hovered && locale !== 'en' && (
                <div className="absolute inset-0 z-30 pointer-events-none">
                  <TranslationTooltip product={product} visible={hovered} />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Card content ────────────────────────────────────────────────── */}
          <div className="p-4 sm:p-5 space-y-3">
            {/* Name & price */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-white font-bold text-sm sm:text-base leading-tight flex-1 min-w-0 line-clamp-2">
                {product.title}
              </h3>
              <div className="shrink-0 text-right">
                <span className="text-white/35 text-xs">
                  {t('product.from', 'From')}{' '}
                </span>
                <span className="text-ice-300 font-bold text-sm">
                  {currency === 'USD' ? '$' : currency}{parseFloat(price).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 3).map(tag => (
                  <span key={tag}
                    className="px-2 py-0.5 rounded-full bg-white/5 border border-white/6 text-white/38 text-[10px]">
                    {tag}
                  </span>
                ))}
                {product.tags.length > 3 && (
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/25 text-[10px]">
                    +{product.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleAddToCart}
                disabled={adding || !canAddToCart}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold
                  bg-ice-500 hover:bg-ice-400
                  disabled:bg-white/8 disabled:text-white/25 disabled:cursor-not-allowed
                  text-white
                  shadow-[0_0_16px_rgba(56,189,248,0.35)] hover:shadow-[0_0_28px_rgba(56,189,248,0.55)]
                  transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                {adding ? (
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                )}
                {!canAddToCart
                  ? t('product.outOfStock', 'Out of Stock')
                  : t('product.addToCart', 'Add to Cart')}
              </button>
              <a
                href={`/products/${product.handle}`}
                className="px-3 py-2.5 rounded-xl text-xs font-semibold
                  bg-white/6 border border-white/8 hover:bg-white/12 hover:border-white/16
                  text-white/60 hover:text-white transition-all duration-200"
              >
                {t('product.viewProduct', 'View')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
