'use client'

import { useState } from 'react'
import { ShopifyProductVariant } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { ShoppingBag, Check } from 'lucide-react'

interface Props {
  variants: ShopifyProductVariant[]
  sizeVariants: ShopifyProductVariant[]
}

const SIZE_ORDER = ['PP', 'P', 'M', 'G', 'GG', 'XG']

export default function AddToCartButton({ variants, sizeVariants }: Props) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    sizeVariants.length === 0 && variants.length > 0 ? variants[0].id : null
  )
  const [added, setAdded] = useState(false)
  const { addItem, isLoading } = useCartStore()

  const displaySizes = [...sizeVariants].sort((a, b) => {
    const val = (v: ShopifyProductVariant) =>
      v.selectedOptions.find((o) =>
        o.name.toLowerCase() === 'tamanho' || o.name.toLowerCase() === 'size'
      )?.value ?? ''
    return (SIZE_ORDER.indexOf(val(a)) ?? 99) - (SIZE_ORDER.indexOf(val(b)) ?? 99)
  })

  const handleAdd = async () => {
    if (!selectedVariantId) return
    await addItem(selectedVariantId)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Sizes */}
      {displaySizes.length > 0 && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 md:text-xs">
            Tamanho
          </p>
          {/* Scrollable row on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {displaySizes.map((v) => {
              const label =
                v.selectedOptions.find(
                  (o) => o.name.toLowerCase() === 'tamanho' || o.name.toLowerCase() === 'size'
                )?.value ?? v.title
              const selected    = selectedVariantId === v.id
              const unavailable = !v.availableForSale

              return (
                <button
                  key={v.id}
                  onClick={() => !unavailable && setSelectedVariantId(v.id)}
                  disabled={unavailable}
                  className={`flex-shrink-0 w-14 h-14 rounded-xl border-2 font-black text-sm transition-all touch-manipulation relative
                    ${selected
                      ? 'border-roxo bg-roxo text-white shadow-lg shadow-roxo/30'
                      : unavailable
                        ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 text-gray-700 hover:border-roxo hover:text-roxo active:scale-95'
                    }`}
                >
                  {label}
                  {unavailable && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[60%] h-px bg-gray-300 rotate-45" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        disabled={isLoading || !selectedVariantId || added}
        className={`flex items-center justify-center gap-2 w-full py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] touch-manipulation
          ${added
            ? 'bg-green-500 text-white'
            : selectedVariantId
              ? 'bg-gradient-brand text-white shadow-lg shadow-rosa/30 hover:opacity-90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
      >
        {added ? (
          <><Check className="w-4 h-4" /> Adicionado!</>
        ) : isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <><ShoppingBag className="w-4 h-4" /> {selectedVariantId ? 'Adicionar ao Carrinho' : 'Selecione o tamanho'}</>
        )}
      </button>
    </div>
  )
}
