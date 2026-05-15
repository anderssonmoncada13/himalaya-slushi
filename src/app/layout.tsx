import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'HIMALAYA SLUSHI — Premium Frozen Drinks & Fresh Treats',
    template: '%s | HIMALAYA SLUSHI',
  },
  description:
    'Experience premium frozen drinks, slushies, smoothies, natural juices and fresh treats. Crafted with the finest ingredients for an unforgettable refreshment experience.',
  keywords: ['slushi', 'smoothie', 'frozen drinks', 'juice', 'milkshake', 'premium', 'himalaya'],
  openGraph: {
    title: 'HIMALAYA SLUSHI',
    description: 'Premium frozen drinks & fresh treats',
    type: 'website',
  },
};

// themeColor must live here, not in metadata, to avoid the Next.js warning
export const viewport: Viewport = {
  themeColor: '#06090f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <body>
        <LanguageProvider>
          <CartProvider>
            <Header />
            {children}
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
