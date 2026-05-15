'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, SUPPORTED_LOCALES } from '@/context/LanguageContext';
import { SupportedLocale } from '@/types';

const FLAGS: Record<SupportedLocale, string> = {
  en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷',
  ar: '🇸🇦', pt: '🇧🇷', it: '🇮🇹', de: '🇩🇪',
};

export default function LanguageSwitcher() {
  const { locale, setLocale, localeNames } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl
          bg-white/8 border border-white/10 backdrop-blur-sm
          text-white/80 hover:text-white hover:bg-white/12
          transition-all duration-200 text-sm font-medium"
        aria-label="Select language"
      >
        <span className="text-base">{FLAGS[locale]}</span>
        <span className="hidden sm:inline">{locale.toUpperCase()}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-44 rounded-2xl overflow-hidden
              bg-luxury-navy/95 border border-white/10 backdrop-blur-xl
              shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            {SUPPORTED_LOCALES.map(l => (
              <button
                key={l}
                onClick={() => { setLocale(l); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm
                  transition-colors duration-150
                  ${l === locale
                    ? 'bg-ice-500/20 text-ice-300 font-semibold'
                    : 'text-white/70 hover:bg-white/8 hover:text-white'
                  }`}
              >
                <span className="text-base">{FLAGS[l]}</span>
                <span>{localeNames[l]}</span>
                {l === locale && (
                  <svg className="w-3.5 h-3.5 ml-auto text-ice-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
