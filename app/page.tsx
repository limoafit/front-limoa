import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import BrandBanner from '@/components/BrandBanner'
import MarqueeBanner from '@/components/MarqueeBanner'
import Footer from '@/components/Footer'
import { getProducts } from '@/lib/shopify'
import { ShopifyProduct } from '@/types'

export const metadata: Metadata = {
  title: 'Limoá Fit — Moda Fitness Feminina',
}

export default async function HomePage() {
  let products: ShopifyProduct[] = []
  try {
    products = await getProducts(8)
  } catch (err) {
    console.error('[Shopify] getProducts error:', err instanceof Error ? err.message : err)
  }

  return (
    <>
      <HeroSection />
      <MarqueeBanner bg="#f771cc" text="#fff" />
      <FeaturedProducts products={products} />
      <MarqueeBanner bg="#9c71f7" text="#fff" />
      <BrandBanner />
      <Footer />
    </>
  )
}
