'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FLAVORS = [
  { name: 'Piña Colada', color: '#fbbf24', glow: 'rgba(251,191,36,0.3)',  emoji: '🍍', desc: 'Tropical coconut & pineapple' },
  { name: 'Strawberry',  color: '#f43f5e', glow: 'rgba(244,63,94,0.3)',   emoji: '🍓', desc: 'Fresh wild strawberry burst' },
  { name: 'Blueberry',   color: '#818cf8', glow: 'rgba(129,140,248,0.3)', emoji: '🫐', desc: 'Deep wild blueberry blend' },
  { name: 'Green Apple', color: '#84cc16', glow: 'rgba(132,204,22,0.3)',  emoji: '🍏', desc: 'Crisp tart Granny Smith' },
  { name: 'Mixed Berry', color: '#c084fc', glow: 'rgba(192,132,252,0.3)', emoji: '🍇', desc: 'Vibrant summer berry medley' },
  { name: 'Peach',       color: '#fb923c', glow: 'rgba(251,146,60,0.3)',  emoji: '🍑', desc: 'Georgia peach velvet' },
  { name: 'Rainbow Mix', color: '#38bdf8', glow: 'rgba(56,189,248,0.35)', emoji: '🌈', desc: 'All seven flavors in one' },
];

function FlavorBall({ flavor, index }: { flavor: typeof FLAVORS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
    <Link
      href="/#products"
      className="flex flex-col items-center gap-3 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Orb */}
      <div
        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center
          border border-white/10 transition-all duration-400"
        style={{
          background: `radial-gradient(ellipse at 35% 35%, ${flavor.color}55, ${flavor.color}22)`,
          boxShadow: hovered
            ? `0 0 30px ${flavor.glow}, 0 0 60px ${flavor.glow}`
            : `0 0 15px ${flavor.glow}40`,
          transform: hovered ? 'translateY(-8px) scale(1.1)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Inner highlight */}
        <div className="absolute top-2 left-3 w-4 h-3 rounded-full bg-white/20 blur-sm" />
        <span className="text-2xl sm:text-3xl relative z-10">{flavor.emoji}</span>
      </div>

      {/* Name */}
      <div className="text-center">
        <p className="text-white text-xs sm:text-sm font-semibold transition-colors duration-300"
          style={{ color: hovered ? flavor.color : 'rgba(255,255,255,0.8)' }}>
          {flavor.name}
        </p>
        <p className="text-white/35 text-[10px] leading-tight mt-0.5 max-w-[80px] mx-auto">
          {flavor.desc}
        </p>
      </div>
    </Link>
    </motion.div>
  );
}

export default function SignatureFlavors() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-luxury-dark" />
      {/* Cinematic sweep light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(56,189,248,0.07),transparent)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ice-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-3 text-ice-400 text-xs font-semibold
            tracking-[0.3em] uppercase">
            Iconic Taste Profiles
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            {t('flavors.title', 'Signature Flavors')}
          </h2>
          <p className="mt-4 text-white/40 text-base max-w-sm mx-auto">
            {t('flavors.subtitle', 'Seven iconic flavors to elevate your experience')}
          </p>
          <div className="mt-5 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-ice-400 to-transparent" />
        </motion.div>

        {/* Flavor orbs */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-14">
          {FLAVORS.map((f, i) => (
            <FlavorBall key={f.name} flavor={f} index={i} />
          ))}
        </div>

        {/* Decorative lines */}
        <div className="mt-20 relative flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-ice-500/15 to-transparent" />
          <div className="absolute px-6 py-2 rounded-full bg-luxury-dark border border-white/5
            text-white/20 text-xs tracking-widest uppercase">
            Premium · Fresh · Icy
          </div>
        </div>
      </div>
    </section>
  );
}
