'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { totalQuantity, openCart } = useCart();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('nav.home', 'Home'),         href: '/#hero' },
    { label: t('nav.menu', 'Menu'),         href: '/#menu' },
    { label: t('nav.products', 'Products'), href: '/#products' },
    { label: t('nav.about', 'About'),       href: '/#story' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-luxury-dark/80 backdrop-blur-xl border-b border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ice-400 to-ice-600
              flex items-center justify-center shadow-glow-blue
              group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-shadow duration-300">
              <span className="text-lg">❄️</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-sm tracking-[0.25em] uppercase">
                HIMALAYA
              </span>
              <span className="text-ice-400 font-light text-xs tracking-[0.4em] uppercase">
                SLUSHI
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white text-sm font-medium
                  tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-ice-400
                  group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl
                bg-ice-500/10 border border-ice-500/20 hover:bg-ice-500/20
                text-white transition-all duration-200 group"
              aria-label={t('nav.cart', 'Cart')}
            >
              <svg className="w-5 h-5 text-ice-300 group-hover:text-ice-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="hidden sm:inline text-sm text-white/80">
                {t('nav.cart', 'Cart')}
              </span>
              {totalQuantity > 0 && (
                <motion.span
                  key={totalQuantity}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1
                    bg-ice-500 text-white text-[10px] font-bold rounded-full
                    flex items-center justify-center shadow-glow-blue"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-luxury-dark/95 backdrop-blur-xl border-t border-white/8"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5
                  rounded-xl transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 px-4">
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
