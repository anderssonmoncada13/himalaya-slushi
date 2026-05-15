// ─── Shopify Product Types ───────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  vendor: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: { edges: Array<{ node: ShopifyImage }> };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  variants: { edges: Array<{ node: ShopifyProductVariant }> };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: { edges: Array<{ node: ShopifyProduct }> };
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyMoney;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
  };
  lines: { edges: Array<{ node: CartLine }> };
}

// ─── i18n Types ───────────────────────────────────────────────────────────────

export type SupportedLocale = 'en' | 'es' | 'fr' | 'ar' | 'pt' | 'it' | 'de';

export interface TranslationNamespace {
  hero: {
    title: string;
    subtitle: string;
    shopNow: string;
    exploreMenu: string;
  };
  nav: {
    menu: string;
    cart: string;
    home: string;
    products: string;
    about: string;
  };
  categories: {
    title: string;
    slushies: string;
    smoothies: string;
    naturalJuices: string;
    milkshakes: string;
    proteinCups: string;
    fruitCups: string;
    freshCutFruit: string;
  };
  product: {
    addToCart: string;
    viewProduct: string;
    flavor: string;
    ingredients: string;
    from: string;
    outOfStock: string;
  };
  cart: {
    title: string;
    empty: string;
    checkout: string;
    subtotal: string;
    remove: string;
    continueShopping: string;
    quantity: string;
    total: string;
  };
  featured: {
    title: string;
    subtitle: string;
  };
  flavors: {
    title: string;
    subtitle: string;
  };
  brand: {
    title: string;
    subtitle: string;
    description: string;
    fresh: string;
    cold: string;
    colorful: string;
    premium: string;
  };
  footer: {
    tagline: string;
    contact: string;
    policies: string;
    privacy: string;
    terms: string;
    shipping: string;
    followUs: string;
    rights: string;
  };
}
