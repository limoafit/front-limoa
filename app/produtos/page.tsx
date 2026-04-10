import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getProducts } from '@/lib/shopify'
import { ShopifyProduct } from '@/types'
import ProductsClient from '@/components/ProductsClient'
import MarqueeBanner from '@/components/MarqueeBanner'
import Footer from '@/components/Footer'
import { ProductSkeletonGrid } from '@/components/ProductSkeleton'

export const metadata: Metadata = {
  title: 'Coleção',
  description: 'Explore nossa coleção completa de moda fitness feminina.',
}

export default async function ProdutosPage() {
  let products: ShopifyProduct[] = []
  try {
    products = await getProducts(48)
  } catch (err) {
    console.error('[Shopify] getProducts error:', err instanceof Error ? err.message : err)
  }

  return (
    <>
      {/* Page hero */}
      <div className="bg-[#d9f705] pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40 mb-4">— Limoá Fit</p>
          <h1 className="font-display font-black text-black leading-none text-6xl md:text-8xl">
            COLEÇÃO<br />
            <span style={{ WebkitTextStroke: '2px #f771cc', color: 'transparent' }}>2026</span>
          </h1>
        </div>
      </div>

      <MarqueeBanner bg="#f771cc" text="#fff" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Suspense fallback={<ProductSkeletonGrid count={8} />}>
          <ProductsClient products={products} />
        </Suspense>
      </div>

      <Footer />
    </>
  )
}
