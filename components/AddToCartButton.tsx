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

  const displaySizes =
    sizeVariants.length > 0
      ? [...sizeVariants].sort((a, b) => {
          const aVal = a.selectedOptions.find((o) => o.name.toLowerCase() === 'tamanho' || o.name.toLowerCase() === 'size')?.value ?? ''
          const bVal = b.selectedOptions.find((o) => o.name.toLowerCase() === 'tamanho' || o.name.toLowerCase() === 'size')?.value ?? ''
          return (SIZE_ORDER.indexOf(aVal) ?? 99) - (SIZE_ORDER.indexOf(bVal) ?? 99)
        })
      : []

  const handleAddToCart = async () => {
    if (!selectedVariantId) return
    await addItem(selectedVariantId)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Size selector */}
      {displaySizes.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Tamanho</p>
          <div className="flex flex-wrap gap-2">
            {displaySizes.map((v) => {
              const sizeLabel =
                v.selectedOptions.find((o) => o.name.toLowerCase() === 'tamanho' || o.name.toLowerCase() === 'size')?.value ?? v.title
              const isSelected = selectedVariantId === v.id
              const unavailable = !v.availableForSale

              return (
                <button
                  key={v.id}
                  onClick={() => !unavailable && setSelectedVariantId(v.id)}
                  disabled={unavailable}
                  className={`w-14 h-14 rounded-xl border-2 font-bold text-sm transition-all relative
                    ${isSelected
                      ? 'border-roxo bg-roxo text-white shadow-lg shadow-roxo/30'
                      : unavailable
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                        : 'border-gray-200 text-gray-700 hover:border-roxo hover:text-roxo'
                    }`}
                >
                  {sizeLabel}
                  {unavailable && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-gray-300 rotate-45" />
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
        onClick={handleAddToCart}
        disabled={isLoading || !selectedVariantId || added}
        className={`flex items-center justify-center gap-3 w-full py-4 rounded-full font-black text-base transition-all
          ${added
            ? 'bg-green-500 text-white'
            : selectedVariantId
              ? 'bg-gradient-brand text-white hover:opacity-90 hover:scale-[1.02] shadow-xl shadow-rosa/30'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          } disabled:scale-100`}
      >
        {added ? (
          <>
            <Check className="w-5 h-5" />
            Adicionado!
          </>
        ) : isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            {selectedVariantId ? 'Adicionar ao Carrinho' : 'Selecione um tamanho'}
          </>
        )}
      </button>
    </div>
  )
}
