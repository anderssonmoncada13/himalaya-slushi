'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ShopifyProduct } from '@/types';

interface Props {
  product: ShopifyProduct;
  visible: boolean;
}

export default function TranslationTooltip({ product, visible }: Props) {
  const { locale, t } = useLanguage();

  if (!visible || locale === 'en') return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute top-3 left-3 right-3 z-20 pointer-events-none"
    >
      <div className="rounded-xl overflow-hidden
        bg-luxury-dark/90 border border-ice-500/20 backdrop-blur-xl
        shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between px-3 py-2
          bg-ice-500/10 border-b border-ice-500/15">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-ice-400 animate-pulse" />
            <span className="text-ice-300 text-[10px] font-semibold tracking-widest uppercase">
              {t('product.ingredients', 'Details')}
            </span>
          </div>
          <span className="text-white/40 text-[10px] uppercase tracking-widest">
            {locale}
          </span>
        </div>

        <div className="px-3 py-2.5 space-y-1.5">
          <p className="text-white text-xs font-semibold leading-tight line-clamp-1">
            {product.title}
          </p>
          <p className="text-white/50 text-[10px] leading-relaxed line-clamp-2">
            {product.description || product.productType}
          </p>
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-0.5">
              {product.tags.slice(0, 4).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-ice-500/10 border border-ice-500/20
                    text-ice-300 text-[9px] font-medium"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 4 && (
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/30 text-[9px]">
                  +{product.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
