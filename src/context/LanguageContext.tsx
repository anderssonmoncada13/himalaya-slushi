'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { SupportedLocale } from '@/types';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'es', 'fr', 'ar', 'pt', 'it', 'de'];
const LOCALE_NAMES: Record<SupportedLocale, string> = {
  en: 'English', es: 'Español', fr: 'Français',
  ar: 'العربية', pt: 'Português', it: 'Italiano', de: 'Deutsch',
};
const LOCALE_STORAGE_KEY = 'himalaya_locale';

type TranslationData = Record<string, unknown>;

interface LanguageContextValue {
  locale: SupportedLocale;
  localeName: string;
  setLocale: (l: SupportedLocale) => void;
  t: (key: string, fallback?: string) => string;
  localeNames: Record<SupportedLocale, string>;
  isRTL: boolean;
  translations: TranslationData;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectLocale(): SupportedLocale {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as SupportedLocale | null;
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
  const nav = navigator.language.slice(0, 2).toLowerCase() as SupportedLocale;
  return SUPPORTED_LOCALES.includes(nav) ? nav : 'en';
}

function getNestedValue(obj: TranslationData, key: string): string | undefined {
  const parts = key.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (typeof current !== 'object' || current === null) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'string' ? current : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState]           = useState<SupportedLocale>('en');
  const [translations, setTranslations]    = useState<TranslationData>({});
  const [isLoadingTranslations, setLoading] = useState(true);

  const loadTranslations = useCallback(async (l: SupportedLocale) => {
    setLoading(true);
    try {
      const res  = await fetch(`/locales/${l}.json`);
      const data = await res.json();
      setTranslations(data);
    } catch {
      if (l !== 'en') {
        const res  = await fetch('/locales/en.json');
        const data = await res.json();
        setTranslations(data);
      }
    } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const detected = detectLocale();
    setLocaleState(detected);
    loadTranslations(detected);
  }, [loadTranslations]);

  const setLocale = useCallback((l: SupportedLocale) => {
    setLocaleState(l);
    localStorage.setItem(LOCALE_STORAGE_KEY, l);
    loadTranslations(l);
    document.documentElement.lang = l;
    document.documentElement.dir  = l === 'ar' ? 'rtl' : 'ltr';
  }, [loadTranslations]);

  const t = useCallback((key: string, fallback = key) => {
    return getNestedValue(translations, key) ?? fallback;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{
      locale,
      localeName: LOCALE_NAMES[locale],
      setLocale,
      t,
      localeNames: LOCALE_NAMES,
      isRTL: locale === 'ar',
      translations,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
