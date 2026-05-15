import dynamic from 'next/dynamic';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import SignatureFlavors from '@/components/SignatureFlavors';
import BrandStory from '@/components/BrandStory';
import { getProducts } from '@/lib/shopify';

const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-screen min-h-[600px] bg-ice-gradient flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full border-2 border-ice-500/20 border-t-ice-500 animate-spin" />
        <p className="text-white/30 text-xs tracking-widest uppercase">Loading experience...</p>
      </div>
    </div>
  ),
});

export default async function HomePage() {
  let products: any[] = [];
  try {
    products = await getProducts(12);
  } catch (err) {
    console.error('Failed to fetch products from Shopify:', err);
  }

  return (
    <main className="min-h-screen bg-luxury-dark">
      <Hero3D />
      <CategorySection />
      <FeaturedProducts products={products} />
      <SignatureFlavors />
      <BrandStory />
    </main>
  );
}
