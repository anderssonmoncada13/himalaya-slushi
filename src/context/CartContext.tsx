'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CartLine, ShopifyCart } from '@/types';
import { addToCart, createCart, getCart, removeCartLine, updateCartLine } from '@/lib/shopify';

const CART_ID_KEY = 'himalaya_cart_id';
const IS_SHOPIFY_CONNECTED = !!(
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN !== 'your-store.myshopify.com'
);

interface CartItem {
  id: string;
  variantId: string;
  title: string;
  price: string;
  currencyCode: string;
  quantity: number;
  image: string;
  productTitle?: string;
}

interface CartContextValue {
  cart: ShopifyCart | null;
  localItems: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  totalQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number, meta?: Partial<CartItem>) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  checkoutUrl: string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart]             = useState<ShopifyCart | null>(null);
  const [localItems, setLocalItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen]         = useState(false);
  const [isLoading, setIsLoading]   = useState(false);

  const initCart = useCallback(async () => {
    if (!IS_SHOPIFY_CONNECTED) return;
    try {
      const storedId = localStorage.getItem(CART_ID_KEY);
      if (storedId) {
        const existing = await getCart(storedId);
        if (existing) { setCart(existing); return; }
      }
      const newCart = await createCart();
      localStorage.setItem(CART_ID_KEY, newCart.id);
      setCart(newCart);
    } catch { /* keep local-only mode */ }
  }, []);

  useEffect(() => { initCart(); }, [initCart]);

  const getOrCreateCartId = useCallback(async (): Promise<string> => {
    if (cart) return cart.id;
    const newCart = await createCart();
    localStorage.setItem(CART_ID_KEY, newCart.id);
    setCart(newCart);
    return newCart.id;
  }, [cart]);

  const addItem = useCallback(async (
    variantId: string,
    quantity = 1,
    meta?: Partial<CartItem>,
  ) => {
    setIsLoading(true);
    try {
      if (IS_SHOPIFY_CONNECTED) {
        const cartId = await getOrCreateCartId();
        const updated = await addToCart(cartId, [{ merchandiseId: variantId, quantity }]);
        setCart(updated);
      } else {
        setLocalItems(prev => {
          const existing = prev.find(i => i.variantId === variantId);
          if (existing) return prev.map(i => i.variantId === variantId ? { ...i, quantity: i.quantity + quantity } : i);
          return [...prev, {
            id: `local-${Date.now()}`,
            variantId,
            title: meta?.title ?? 'Product',
            price: meta?.price ?? '0',
            currencyCode: meta?.currencyCode ?? 'USD',
            quantity,
            image: meta?.image ?? '',
            productTitle: meta?.productTitle,
          }];
        });
      }
      setIsOpen(true);
    } finally { setIsLoading(false); }
  }, [getOrCreateCartId]);

  const removeItem = useCallback(async (lineId: string) => {
    setIsLoading(true);
    try {
      if (IS_SHOPIFY_CONNECTED && cart) {
        const updated = await removeCartLine(cart.id, lineId);
        setCart(updated);
      } else {
        setLocalItems(prev => prev.filter(i => i.id !== lineId));
      }
    } finally { setIsLoading(false); }
  }, [cart]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    setIsLoading(true);
    try {
      if (quantity <= 0) { await removeItem(lineId); return; }
      if (IS_SHOPIFY_CONNECTED && cart) {
        const updated = await updateCartLine(cart.id, lineId, quantity);
        setCart(updated);
      } else {
        setLocalItems(prev => prev.map(i => i.id === lineId ? { ...i, quantity } : i));
      }
    } finally { setIsLoading(false); }
  }, [cart, removeItem]);

  const totalQuantity = IS_SHOPIFY_CONNECTED
    ? (cart?.totalQuantity ?? 0)
    : localItems.reduce((s, i) => s + i.quantity, 0);

  const checkoutUrl = cart?.checkoutUrl ?? '#';

  return (
    <CartContext.Provider value={{
      cart, localItems, isOpen, isLoading, totalQuantity,
      openCart:  () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem, removeItem, updateQuantity, checkoutUrl,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function useCartLines(): CartLine[] {
  const { cart } = useCart();
  return cart?.lines.edges.map(e => e.node) ?? [];
}
