'use client'

import { useState } from 'react'
import { ShopifyProductVariant } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { ShoppingBag, Check } from 'lucide-react'

interface Props {
  variants: ShopifyProductVariant[]
  onOptionChange?: (name: string, value: string) => void
}

const SIZE_ORDER = ['PP', 'P', 'Pequeno', 'M', 'Médio', 'Medio', 'G', 'Grande', 'GG', 'XG', 'Único']

const COLOR_MAP: Record<string, string> = {
  preto: '#1a1a1a', black: '#1a1a1a',
  branco: '#f0f0f0', white: '#f0f0f0',
  bege: '#d4b896', beige: '#d4b896',
  rosa: '#f771cc', pink: '#f771cc',
  roxo: '#9c71f7', purple: '#9c71f7',
  gold: '#c9a227', dourado: '#c9a227',
  verde: '#d9f705', green: '#d9f705',
  azul: '#3b82f6', blue: '#3b82f6',
  vermelho: '#ef4444', red: '#ef4444',
  cinza: '#9ca3af', gray: '#9ca3af', grey: '#9ca3af',
  laranja: '#f79c71', orange: '#f79c71',
}

function isColorOption(name: string) {
  return name.toLowerCase() === 'cor' || name.toLowerCase() === 'color'
}
function isSizeOption(name: string) {
  return name.toLowerCase() === 'tamanho' || name.toLowerCase() === 'size'
}

export default function AddToCartButton({ variants, onOptionChange }: Props) {
  // Extract unique option names + values in order
  const optionNames: string[] = []
  const optionValues: Record<string, string[]> = {}

  for (const variant of variants) {
    for (const opt of variant.selectedOptions) {
      if (!optionNames.includes(opt.name)) {
        optionNames.push(opt.name)
        optionValues[opt.name] = []
      }
      if (!optionValues[opt.name].includes(opt.value)) {
        optionValues[opt.name].push(opt.value)
      }
    }
  }

  // Sort size values by canonical order
  for (const name of optionNames) {
    if (isSizeOption(name)) {
      optionValues[name].sort((a, b) => {
        const ia = SIZE_ORDER.indexOf(a)
        const ib = SIZE_ORDER.indexOf(b)
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
      })
    }
  }

  const [selected, setSelected] = useState<Record<string, string>>({})
  const [added, setAdded] = useState(false)
  const { addItem, isLoading } = useCartStore()

  // Find the exact variant matching all selected options
  const selectedVariant = variants.find((v) =>
    v.selectedOptions.every((o) => selected[o.name] === o.value)
  ) ?? null

  // Check if a given option value is available (considering other current selections)
  const isAvailable = (optName: string, optValue: string) =>
    variants.some((v) => {
      const hasThis = v.selectedOptions.some((o) => o.name === optName && o.value === optValue)
      if (!hasThis || !v.availableForSale) return false
      return v.selectedOptions.every((o) => {
        if (o.name === optName) return true
        return !selected[o.name] || selected[o.name] === o.value
      })
    })

  const allSelected = optionNames.every((n) => selected[n])

  const handleAdd = async () => {
    if (!selectedVariant) return
    await addItem(selectedVariant.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-5">
      {optionNames.map((name) => {
        const isColor = isColorOption(name)

        return (
          <div key={name}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 md:text-xs">
              {name}
              {selected[name] && (
                <span className="ml-2 text-black normal-case tracking-normal font-semibold">
                  {selected[name]}
                </span>
              )}
            </p>

            {isColor ? (
              <div className="flex gap-2 flex-wrap">
                {optionValues[name].map((value) => {
                  const hex = COLOR_MAP[value.toLowerCase()]
                  const isSelected = selected[name] === value
                  const unavailable = !isAvailable(name, value)

                  return (
                    <button
                      key={value}
                      onClick={() => {
                        if (unavailable) return
                        const next = { ...selected, [name]: value }
                        setSelected(next)
                        onOptionChange?.(name, value)
                      }}
                      disabled={unavailable}
                      title={value}
                      className={`w-9 h-9 rounded-full border-2 transition-all touch-manipulation relative flex-shrink-0
                        ${isSelected
                          ? 'border-roxo scale-110 shadow-lg shadow-roxo/30'
                          : unavailable
                            ? 'border-gray-100 opacity-40 cursor-not-allowed'
                            : 'border-gray-200 hover:border-roxo hover:scale-105'
                        }`}
                      style={hex ? { backgroundColor: hex } : undefined}
                    >
                      {!hex && (
                        <span className="text-[10px] font-black leading-none">{value.slice(0, 2)}</span>
                      )}
                      {unavailable && (
                        <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center pointer-events-none">
                          <div className="w-full h-px bg-gray-400 rotate-45" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {optionValues[name].map((value) => {
                  const isSelected = selected[name] === value
                  const unavailable = !isAvailable(name, value)

                  return (
                    <button
                      key={value}
                      onClick={() => !unavailable && setSelected((s) => ({ ...s, [name]: value }))}
                      disabled={unavailable}
                      className={`flex-shrink-0 min-w-[3.5rem] px-3 h-12 rounded-xl border-2 font-black text-sm transition-all touch-manipulation relative
                        ${isSelected
                          ? 'border-roxo bg-roxo text-white shadow-lg shadow-roxo/30'
                          : unavailable
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                            : 'border-gray-200 text-gray-700 hover:border-roxo hover:text-roxo active:scale-95'
                        }`}
                    >
                      {value}
                      {unavailable && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-[60%] h-px bg-gray-300 rotate-45" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      <button
        onClick={handleAdd}
        disabled={isLoading || !selectedVariant || added}
        className={`flex items-center justify-center gap-2 w-full py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] touch-manipulation
          ${added
            ? 'bg-green-500 text-white'
            : selectedVariant
              ? 'bg-gradient-brand text-white shadow-lg shadow-rosa/30 hover:opacity-90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
      >
        {added ? (
          <><Check className="w-4 h-4" /> Adicionado!</>
        ) : isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <><ShoppingBag className="w-4 h-4" /> {allSelected ? 'Adicionar ao Carrinho' : 'Selecione as opções'}</>
        )}
      </button>
    </div>
  )
}
