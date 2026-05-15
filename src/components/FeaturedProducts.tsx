'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ShopifyProduct } from '@/types';
import ProductCard3D from './ProductCard3D';

interface Props {
  products: ShopifyProduct[];
}

export default function FeaturedProducts({ products }: Props) {
  const { t } = useLanguage();

  return (
    <section id="products" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-navy to-luxury-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(14,165,233,0.06),transparent_60%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ice-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-3 text-ice-400 text-xs font-semibold tracking-[0.3em] uppercase">
            Hand-crafted Selection
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            {t('featured.title', 'Featured Creations')}
          </h2>
          <p className="mt-4 text-white/40 text-base max-w-md mx-auto">
            {t('featured.subtitle', 'Handcrafted to perfection with the finest ingredients')}
          </p>
          <div className="mt-5 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-ice-400 to-transparent" />
        </motion.div>

        {/* Empty state */}
        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🧊</div>
            <p className="text-white/50 text-base mb-2">No products found.</p>
            <p className="text-white/25 text-sm max-w-md mx-auto">
              Make sure your products are published to the Headless sales channel in your Shopify admin.
            </p>
          </motion.div>
        )}

        {/* Product grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard3D key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        {/* View all */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 text-center"
          >
            <a
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl
                border border-ice-500/25 bg-ice-500/8 hover:bg-ice-500/15
                text-white/80 hover:text-white font-semibold text-sm
                transition-all duration-300 hover:-translate-y-0.5 group"
            >
              View All Products
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
