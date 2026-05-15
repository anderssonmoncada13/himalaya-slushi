'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart, useCartLines } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { CartLine } from '@/types';

function LineItem({ line, onUpdate, onRemove, t }: {
  line: CartLine;
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  t: (key: string, fb?: string) => string;
}) {
  const { product, price } = line.merchandise;
  const total = (parseFloat(price.amount) * line.quantity).toFixed(2);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-3 py-4 border-b border-white/6 last:border-0"
    >
      {/* Image */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5">
        {product.featuredImage?.url && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill className="object-cover"
            sizes="64px"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold line-clamp-1">{product.title}</p>
        <p className="text-white/40 text-xs mt-0.5 line-clamp-1">{line.merchandise.title}</p>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity stepper */}
          <div className="flex items-center gap-1 bg-white/6 rounded-lg p-0.5">
            <button
              onClick={() => onUpdate(line.id, line.quantity - 1)}
              className="w-6 h-6 rounded-md flex items-center justify-center
                text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm"
            >
              −
            </button>
            <span className="w-6 text-center text-white text-xs font-semibold">
              {line.quantity}
            </span>
            <button
              onClick={() => onUpdate(line.id, line.quantity + 1)}
              className="w-6 h-6 rounded-md flex items-center justify-center
                text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm"
            >
              +
            </button>
          </div>

          <span className="text-ice-300 font-semibold text-sm">
            ${total}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(line.id)}
        className="self-start p-1.5 rounded-lg text-white/30 hover:text-red-400
          hover:bg-red-400/10 transition-colors"
        aria-label={t('cart.remove', 'Remove')}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

function LocalLineItem({ item, onUpdate, onRemove, t }: {
  item: { id: string; variantId: string; title: string; price: string; currencyCode: string; quantity: number; image: string };
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  t: (key: string, fb?: string) => string;
}) {
  const total = (parseFloat(item.price) * item.quantity).toFixed(2);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-3 py-4 border-b border-white/6 last:border-0"
    >
      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5">
        {item.image && (
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold line-clamp-1">{item.title}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 bg-white/6 rounded-lg p-0.5">
            <button onClick={() => onUpdate(item.id, item.quantity - 1)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm">−</button>
            <span className="w-6 text-center text-white text-xs font-semibold">{item.quantity}</span>
            <button onClick={() => onUpdate(item.id, item.quantity + 1)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm">+</button>
          </div>
          <span className="text-ice-300 font-semibold text-sm">${total}</span>
        </div>
      </div>

      <button onClick={() => onRemove(item.id)}
        className="self-start p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

export default function CartDrawer() {
  const { isOpen, closeCart, cart, localItems, removeItem, updateQuantity, checkoutUrl, isLoading } = useCart();
  const shopifyLines = useCartLines();
  const { t } = useLanguage();

  const hasShopifyItems = shopifyLines.length > 0;
  const hasLocalItems   = localItems.length > 0;
  const isEmpty         = !hasShopifyItems && !hasLocalItems;

  const subtotal = hasShopifyItems
    ? `$${parseFloat(cart?.cost.subtotalAmount.amount ?? '0').toFixed(2)}`
    : `$${localItems.reduce((s, i) => s + parseFloat(i.price) * i.quantity, 0).toFixed(2)}`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md
              bg-luxury-dark/95 backdrop-blur-xl
              border-l border-white/8
              flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <h2 className="text-white font-bold text-lg">{t('cart.title', 'Your Cart')}</h2>
                {!isEmpty && (
                  <span className="px-2 py-0.5 rounded-full bg-ice-500/20 text-ice-300 text-xs font-semibold">
                    {hasShopifyItems ? cart?.totalQuantity : localItems.reduce((s,i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/8 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center
                bg-luxury-dark/60 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full border-2 border-ice-500/20 border-t-ice-500 animate-spin" />
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-4xl">
                    🛒
                  </div>
                  <p className="text-white/40 text-sm">{t('cart.empty', 'Your cart is empty')}</p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-xl bg-ice-500/10 border border-ice-500/20
                      text-ice-300 text-sm hover:bg-ice-500/20 transition-colors"
                  >
                    {t('cart.continueShopping', 'Continue Shopping')}
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {hasShopifyItems
                    ? shopifyLines.map(line => (
                        <LineItem
                          key={line.id}
                          line={line}
                          onUpdate={updateQuantity}
                          onRemove={removeItem}
                          t={t}
                        />
                      ))
                    : localItems.map(item => (
                        <LocalLineItem
                          key={item.id}
                          item={item}
                          onUpdate={updateQuantity}
                          onRemove={removeItem}
                          t={t}
                        />
                      ))
                  }
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <div className="border-t border-white/8 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">{t('cart.subtotal', 'Subtotal')}</span>
                  <span className="text-white font-semibold text-base">{subtotal}</span>
                </div>
                <a
                  href={checkoutUrl}
                  className="block w-full py-4 rounded-2xl text-center font-bold text-sm
                    bg-ice-500 hover:bg-ice-400 text-white
                    shadow-glow-blue hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]
                    transition-all duration-200"
                >
                  {t('cart.checkout', 'Checkout')} →
                </a>
                <button
                  onClick={closeCart}
                  className="block w-full text-center text-xs text-white/30 hover:text-white/60
                    transition-colors py-1"
                >
                  {t('cart.continueShopping', 'Continue Shopping')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
