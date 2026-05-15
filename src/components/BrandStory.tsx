'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const PILLARS = [
  { key: 'fresh',    label: 'brand.fresh',    default: 'Always Fresh',    icon: '🌿', num: '100%' },
  { key: 'cold',     label: 'brand.cold',     default: 'Perfectly Cold',  icon: '❄️', num: '-5°C' },
  { key: 'colorful', label: 'brand.colorful', default: 'Beautifully Colorful', icon: '🎨', num: '7+' },
  { key: 'premium',  label: 'brand.premium',  default: 'Uncompromisingly Premium', icon: '✨', num: '★★★' },
];

export default function BrandStory() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['30px', '-30px']);

  return (
    <section id="story" ref={sectionRef} className="relative py-28 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy to-luxury-dark" />

      {/* Parallax orb */}
      <motion.div
        style={{ y }}
        className="absolute right-1/4 top-1/4 w-[600px] h-[600px] rounded-full
          bg-[radial-gradient(ellipse,rgba(56,189,248,0.06),transparent_70%)]
          pointer-events-none"
      />

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ice-500/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ice-500/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block mb-4 text-ice-400 text-xs font-semibold
              tracking-[0.3em] uppercase">
              Our Story
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t('brand.title', 'The HIMALAYA Story')}
            </h2>
            <p className="text-ice-300/70 text-base sm:text-lg font-light italic mb-6">
              &ldquo;{t('brand.subtitle', 'Born from a passion for pure, premium refreshment')}&rdquo;
            </p>
            <p className="text-white/45 text-base leading-relaxed mb-8">
              {t('brand.description',
                'Every drop of HIMALAYA SLUSHI is a testament to our relentless pursuit of perfection. We source only the finest ingredients, craft every blend with precision, and deliver an experience that transcends the ordinary.'
              )}
            </p>

            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { num: '50+', label: 'Flavors' },
                { num: '10K+', label: 'Happy Customers' },
                { num: '7', label: 'Languages' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-ice-300">{s.num}</div>
                  <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Pillars grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group relative rounded-3xl p-6 overflow-hidden
                  bg-gradient-to-br from-white/5 to-white/2
                  border border-white/6 hover:border-ice-500/25
                  hover:shadow-glass transition-all duration-400 cursor-default"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                  bg-gradient-to-br from-ice-500/8 to-transparent transition-opacity duration-400" />
                <div className="relative">
                  <span className="text-3xl">{p.icon}</span>
                  <div className="mt-3 text-2xl font-bold text-ice-300">{p.num}</div>
                  <div className="mt-1 text-white/60 text-sm font-medium leading-tight">
                    {t(p.label, p.default)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
