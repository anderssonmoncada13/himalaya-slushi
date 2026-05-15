'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  label: string;
  icon: string;
  gradient: string;
  href?: string;
  index?: number;
}

export default function CategoryCard({ label, icon, gradient, href = '/products', index = 0 }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group block"
        style={{ textDecoration: 'none' }}
      >
        <div
          className="relative rounded-2xl overflow-hidden border border-white/8
            bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm
            transition-all duration-400 cursor-pointer"
          style={{
            transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
            boxShadow: hovered
              ? '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(56,189,248,0.12)'
              : '0 4px 24px rgba(0,0,0,0.2)',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Gradient accent */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100
            transition-opacity duration-400`} />

          {/* Border glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
            ring-1 ring-inset ring-ice-400/20 transition-opacity duration-300 pointer-events-none" />

          <div className="relative p-5 flex flex-col items-center gap-3 text-center">
            {/* Icon container */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center
              bg-white/6 border border-white/8 group-hover:border-white/16
              transition-all duration-300 group-hover:scale-110">
              <span className="text-2xl">{icon}</span>
            </div>

            {/* Label */}
            <span className="text-white/70 group-hover:text-white text-xs sm:text-sm
              font-semibold tracking-wide transition-colors duration-300 leading-tight">
              {label}
            </span>

            {/* Arrow */}
            <div className={`w-5 h-5 rounded-full bg-ice-500/20 flex items-center justify-center
              transition-all duration-300 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <svg className="w-2.5 h-2.5 text-ice-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
