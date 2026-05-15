'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShopifyProduct } from '@/types';

export default function AddToCartButton({ product }: { product: ShopifyProduct }) {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [adding, setAdding] = useState(false);
  const [added, setAdded]   = useState(false);

  const firstVariant = product.variants.edges[0]?.node;
  const variantId    = firstVariant?.id ?? null;
  const canAdd       = !!(variantId && firstVariant?.availableForSale);

  async function handleAdd() {
    if (!variantId) return;
    setAdding(true);
    await addItem(variantId, 1, {
      title:        product.title,
      price:        product.priceRange.minVariantPrice.amount,
      currencyCode: product.priceRange.minVariantPrice.currencyCode,
      image:        product.featuredImage?.url ?? '',
    });
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={adding || !canAdd}
      className="w-full py-4 rounded-2xl font-bold text-sm
        bg-ice-500 hover:bg-ice-400
        disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed
        text-white shadow-glow-blue hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]
        transition-all duration-200 flex items-center justify-center gap-2"
    >
      {adding ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Adding...
        </>
      ) : added ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Added!
        </>
      ) : !canAdd ? (
        t('product.outOfStock', 'Out of Stock')
      ) : (
        t('product.addToCart', 'Add to Cart')
      )}
    </button>
  );
}
