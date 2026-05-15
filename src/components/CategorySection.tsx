'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { categoryMeta } from '@/lib/placeholder';
import CategoryCard from './CategoryCard';

export default function CategorySection() {
  const { t } = useLanguage();

  return (
    <section id="menu" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-luxury-dark" />
      <div className="absolute inset-0 bg-glow-radial opacity-40" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ice-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block mb-3 text-ice-400 text-xs font-semibold
            tracking-[0.3em] uppercase">
            What we offer
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            {t('categories.title', 'Our Menu')}
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-ice-400 to-transparent" />
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {Object.entries(categoryMeta).map(([key, meta], i) => {
            const camel = key.replace(/-([a-z])/g, (_: string, l: string) => l.toUpperCase());
            return (
              <CategoryCard
                key={key}
                label={t(`categories.${camel}`, meta.label)}
                icon={meta.icon}
                gradient={meta.gradient}
                href={`/products?category=${key}`}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
