import type { Metadata } from 'next'
import { getProductByHandle, getProducts, formatPrice } from '@/lib/shopify'
import { ShopifyProduct } from '@/types'
import ProductGallery from '@/components/ProductGallery'
import AddToCartButton from '@/components/AddToCartButton'
import Footer from '@/components/Footer'

interface Props {
  params: { handle: string }
}

export async function generateStaticParams() {
  try {
    const products = await getProducts(50)
    return products.map((p) => ({ handle: p.handle }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await getProductByHandle(params.handle)
    if (!product) return { title: 'Produto não encontrado' }
    return {
      title: product.title,
      description: product.description.slice(0, 160),
    }
  } catch {
    return { title: 'Produto' }
  }
}

export default async function ProductPage({ params }: Props) {
  let product: ShopifyProduct | null = null
  let shopifyError: string | null = null

  try {
    product = await getProductByHandle(params.handle)
  } catch (err) {
    shopifyError = err instanceof Error ? err.message : String(err)
    console.error('[Shopify] getProductByHandle error:', shopifyError)
  }

  if (!product) {
    return <MockProductPage handle={params.handle} error={shopifyError} />
  }

  const images = product.images.edges.map((e) => e.node)
  const variants = product.variants.edges.map((e) => e.node)
  const sizeVariants = variants.filter((v) =>
    v.selectedOptions.some((o) =>
      o.name.toLowerCase() === 'tamanho' || o.name.toLowerCase() === 'size'
    )
  )

  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  )

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-10 flex items-center gap-2">
            <a href="/" className="hover:text-black transition-colors">Home</a>
            <span>/</span>
            <a href="/produtos" className="hover:text-black transition-colors">Coleção</a>
            <span>/</span>
            <span className="text-black">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            {/* Gallery */}
            <ProductGallery images={images} title={product.title} />

            {/* Info */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-roxo mb-3">
                  Limoá Fit
                </p>
                <h1 className="font-display font-black text-4xl md:text-5xl text-black leading-tight mb-6">
                  {product.title}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="font-black text-3xl text-black">{price}</span>
                  <span className="text-sm text-gray-400">ou 12x sem juros</span>
                </div>
              </div>

              {/* Add to cart */}
              <AddToCartButton variants={variants} sizeVariants={sizeVariants} />

              {/* Description */}
              {product.descriptionHtml && (
                <div className="border-t pt-8">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                    Descrição
                  </p>
                  <div
                    className="text-gray-600 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                </div>
              )}

              {/* Benefits */}
              <div className="border-t pt-8 grid grid-cols-1 gap-3">
                {[
                  { icon: '🚚', text: 'Frete grátis acima de R$ 299' },
                  { icon: '↩️', text: 'Troca grátis em até 30 dias' },
                  { icon: '💳', text: 'Até 12x sem juros' },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                    <span>{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

function MockProductPage({ handle, error }: { handle: string; error: string | null }) {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-[3/4] bg-[#d9f70520] rounded-2xl flex items-center justify-center">
              <svg viewBox="0 0 100 120" fill="none" className="w-32 h-32 opacity-20">
                <path d="M50 10 L50 22" stroke="#9c71f7" strokeWidth="5" strokeLinecap="round" />
                <path d="M50 12 Q68 4 72 16 Q60 22 50 16" stroke="#9c71f7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M50 22 C28 22 14 40 14 62 C14 84 30 104 50 108 C70 104 86 84 86 62 C86 40 72 22 50 22Z" stroke="#9c71f7" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-roxo">Limoá Fit</p>
              <h1 className="font-display font-black text-4xl text-black capitalize">
                {handle.replace(/-/g, ' ')}
              </h1>
              <p className="font-black text-3xl">R$ 199,90</p>
              {error ? (
                <div className="text-sm bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="font-bold text-red-700 mb-1">Erro Shopify:</p>
                  <p className="text-red-600 font-mono break-all text-xs">{error}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 bg-gray-50 rounded-xl p-4">
                  Configure o Shopify para exibir o produto real.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
