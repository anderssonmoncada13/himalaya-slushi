'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const SOCIAL = [
  { name: 'Instagram', href: '#', icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )},
  { name: 'TikTok', href: '#', icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z"/>
    </svg>
  )},
  { name: 'Facebook', href: '#', icon: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )},
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-luxury-dark border-t border-white/6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.04),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ice-400 to-ice-600
                flex items-center justify-center">
                <span className="text-xl">❄️</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-[0.25em]">HIMALAYA</div>
                <div className="text-ice-400 text-xs tracking-[0.4em]">SLUSHI</div>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
              {t('footer.tagline', 'Premium frozen drinks & fresh treats')} — crafted with the finest ingredients for an unforgettable experience.
            </p>

            {/* Social */}
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
                {t('footer.followUs', 'Follow Us')}
              </p>
              <div className="flex gap-2">
                {SOCIAL.map(s => (
                  <a key={s.name} href={s.href} aria-label={s.name}
                    className="w-9 h-9 rounded-xl bg-white/6 border border-white/8
                      flex items-center justify-center text-white/50 hover:text-ice-300
                      hover:bg-ice-500/15 hover:border-ice-500/25 transition-all duration-200">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              {t('footer.policies', 'Policies')}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: t('footer.privacy', 'Privacy Policy'), href: '#' },
                { label: t('footer.terms', 'Terms of Service'), href: '#' },
                { label: t('footer.shipping', 'Shipping Policy'), href: '#' },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href}
                    className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Language */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              {t('footer.contact', 'Contact Us')}
            </h4>
            <ul className="space-y-2.5 mb-6">
              <li>
                <a href="mailto:hello@himalayaslushi.com"
                  className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200">
                  hello@himalayaslushi.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890"
                  className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Language</p>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row
          items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} HIMALAYA SLUSHI. {t('footer.rights', 'All rights reserved')}.
          </p>
          <div className="flex items-center gap-1 text-white/20 text-xs">
            <span>Made with</span>
            <span className="text-ice-500">❄️</span>
            <span>and passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
