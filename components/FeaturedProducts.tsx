import Link from 'next/link'
import { ShopifyProduct } from '@/types'
import ProductCard from './ProductCard'
import MockProductCard from './MockProductCard'

interface Props {
  products: ShopifyProduct[]
}

const MOCK_PRODUCTS = [
  { id: '1', title: 'Legging Boost Rosa', handle: 'legging-boost-rosa', price: 'R$ 189,90' },
  { id: '2', title: 'Top Cross Roxo', handle: 'top-cross-roxo', price: 'R$ 119,90' },
  { id: '3', title: 'Conjunto Laranja Fire', handle: 'conjunto-laranja-fire', price: 'R$ 289,90' },
  { id: '4', title: 'Legging Neon Verde', handle: 'legging-neon-verde', price: 'R$ 199,90' },
  { id: '5', title: 'Top Halter Rosa Neon', handle: 'top-halter-rosa-neon', price: 'R$ 129,90' },
  { id: '6', title: 'Conjunto Move Roxo', handle: 'conjunto-move-roxo', price: 'R$ 259,90' },
  { id: '7', title: 'Legging High Waist', handle: 'legging-high-waist', price: 'R$ 179,90' },
  { id: '8', title: 'Top Sports Verde', handle: 'top-sports-verde', price: 'R$ 109,90' },
]

export default function FeaturedProducts({ products }: Props) {
  const hasProducts = products.length > 0

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-roxo mb-3">
              — Mais Vendidos
            </p>
            <h2 className="font-display font-black text-5xl md:text-6xl text-black leading-none">
              AS MAIS<br />
              <span
                style={{
                  WebkitTextStroke: '2px #9c71f7',
                  color: 'transparent',
                }}
              >
                AMADAS
              </span>
            </h2>
          </div>
          <Link
            href="/produtos"
            className="self-start md:self-auto inline-flex items-center gap-2 border-2 border-black text-black font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-black hover:text-[#d9f705] transition-all"
          >
            Ver tudo →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {hasProducts
            ? products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : MOCK_PRODUCTS.map((p) => <MockProductCard key={p.id} {...p} />)}
        </div>
      </div>
    </section>
  )
}
