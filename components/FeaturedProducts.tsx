import Link from 'next/link'
import { ShopifyProduct } from '@/types'
import ProductCard from './ProductCard'
import MockProductCard from './MockProductCard'

interface Props {
  products: ShopifyProduct[]
}

const MOCK_PRODUCTS = [
  { id: '1', title: 'Legging Boost Rosa',    handle: 'legging-boost-rosa',    price: 'R$ 189,90' },
  { id: '2', title: 'Top Cross Roxo',        handle: 'top-cross-roxo',        price: 'R$ 119,90' },
  { id: '3', title: 'Conjunto Laranja Fire', handle: 'conjunto-laranja-fire', price: 'R$ 289,90' },
  { id: '4', title: 'Legging Neon Verde',    handle: 'legging-neon-verde',    price: 'R$ 199,90' },
  { id: '5', title: 'Top Halter Rosa Neon',  handle: 'top-halter-rosa-neon',  price: 'R$ 129,90' },
  { id: '6', title: 'Conjunto Move Roxo',    handle: 'conjunto-move-roxo',    price: 'R$ 259,90' },
  { id: '7', title: 'Legging High Waist',    handle: 'legging-high-waist',    price: 'R$ 179,90' },
  { id: '8', title: 'Top Sports Verde',      handle: 'top-sports-verde',      price: 'R$ 109,90' },
]

export default function FeaturedProducts({ products }: Props) {
  const hasProducts = products.length > 0

  return (
    <section className="py-12 bg-white md:py-20">
      <div className="px-4 max-w-7xl mx-auto md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-roxo mb-2 md:text-xs md:mb-3">
              — Mais Vendidos
            </p>
            <h2 className="font-display font-black text-black leading-none text-4xl md:text-6xl">
              AS MAIS<br />
              <span style={{ WebkitTextStroke: '2px #9c71f7', color: 'transparent' }}>
                AMADAS
              </span>
            </h2>
          </div>
          <Link
            href="/produtos"
            className="text-[10px] font-black uppercase tracking-widest border-2 border-black px-4 py-2.5 rounded-full hover:bg-black hover:text-[#d9f705] transition-all whitespace-nowrap md:text-xs md:px-6"
          >
            Ver tudo →
          </Link>
        </div>

        {/* Grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 md:gap-5">
          {hasProducts
            ? products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)
            : MOCK_PRODUCTS.map((p) => <MockProductCard key={p.id} {...p} />)}
        </div>
      </div>
    </section>
  )
}
