'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { ShopifyProduct } from '@/types'
import ProductCard from './ProductCard'
import MockProductCard from './MockProductCard'

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'legging', label: 'Leggings' },
  { id: 'top', label: 'Tops' },
  { id: 'conjunto', label: 'Conjuntos' },
]

// Aceita variações de singular/plural e acentuação
const TAG_ALIASES: Record<string, string[]> = {
  legging:  ['legging', 'leggings'],
  top:      ['top', 'tops'],
  conjunto: ['conjunto', 'conjuntos'],
}

function matchesCategory(tags: string[], category: string): boolean {
  const aliases = TAG_ALIASES[category] ?? [category]
  return tags.some((t) => aliases.includes(t.toLowerCase().trim()))
}

const MOCK_PRODUCTS = [
  { id: '1', title: 'Legging Boost Rosa',    handle: 'legging-boost-rosa',    price: 'R$ 189,90', category: 'legging' },
  { id: '2', title: 'Top Cross Roxo',        handle: 'top-cross-roxo',        price: 'R$ 119,90', category: 'top'     },
  { id: '3', title: 'Conjunto Laranja Fire', handle: 'conjunto-laranja-fire', price: 'R$ 289,90', category: 'conjunto'},
  { id: '4', title: 'Legging Neon Verde',    handle: 'legging-neon-verde',    price: 'R$ 199,90', category: 'legging' },
  { id: '5', title: 'Top Halter Rosa Neon',  handle: 'top-halter-rosa-neon',  price: 'R$ 129,90', category: 'top'     },
  { id: '6', title: 'Conjunto Move Roxo',    handle: 'conjunto-move-roxo',    price: 'R$ 259,90', category: 'conjunto'},
  { id: '7', title: 'Legging High Waist',    handle: 'legging-high-waist',    price: 'R$ 179,90', category: 'legging' },
  { id: '8', title: 'Top Sports Verde',      handle: 'top-sports-verde',      price: 'R$ 109,90', category: 'top'     },
]

interface Props {
  products: ShopifyProduct[]
}

export default function ProductsClient({ products }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const active = searchParams.get('cat') ?? 'all'
  const hasProducts = products.length > 0

  const setCategory = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (cat === 'all') {
        params.delete('cat')
      } else {
        params.set('cat', cat)
      }
      const qs = params.toString()
      router.push(pathname + (qs ? `?${qs}` : ''), { scroll: false })
    },
    [router, pathname, searchParams]
  )

  const filtered = hasProducts
    ? products.filter((p) =>
        active === 'all' || matchesCategory(p.tags, active)
      )
    : MOCK_PRODUCTS.filter((p) =>
        active === 'all' || p.category === active
      )

  const label = CATEGORIES.find((c) => c.id === active)?.label ?? 'Todos'

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all border-2 ${
              active === cat.id
                ? 'bg-black text-[#d9f705] border-black'
                : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Count */}
      {hasProducts && (
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-6">
          {filtered.length} {filtered.length === 1 ? 'produto' : 'produtos'} em {label}
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {hasProducts
          ? (filtered as ShopifyProduct[]).map((p) => <ProductCard key={p.id} product={p} />)
          : (filtered as typeof MOCK_PRODUCTS).map((p) => <MockProductCard key={p.id} {...p} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-display font-black text-2xl text-gray-200 uppercase tracking-widest mb-2">
            Nenhum produto
          </p>
          <p className="text-sm text-gray-400">
            Ainda não há produtos com a tag &quot;{active}&quot; na loja.
          </p>
          <button
            onClick={() => setCategory('all')}
            className="mt-6 text-xs font-black uppercase tracking-widest border-2 border-black px-6 py-2.5 rounded-full hover:bg-black hover:text-[#d9f705] transition-all"
          >
            Ver todos
          </button>
        </div>
      )}
    </div>
  )
}
