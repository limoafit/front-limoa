'use client'

import { useState } from 'react'
import { ShopifyImage, ShopifyProductVariant } from '@/types'
import ProductGallery from './ProductGallery'
import AddToCartButton from './AddToCartButton'

interface Props {
  images: ShopifyImage[]
  variants: ShopifyProductVariant[]
  title: string
  price: string
  descriptionHtml: string
}

const COLOR_OPTION_NAMES = ['cor', 'color']

function isColorOption(name: string) {
  return COLOR_OPTION_NAMES.includes(name.toLowerCase())
}

export default function ProductDetail({ images, variants, title, price, descriptionHtml }: Props) {
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null)

  function handleOptionChange(optionName: string, optionValue: string) {
    if (!isColorOption(optionName)) return

    // Find first variant with this color that has an image
    const match = variants.find(
      (v) =>
        v.selectedOptions.some((o) => isColorOption(o.name) && o.value === optionValue) &&
        v.image?.url
    )
    if (match?.image?.url) setActiveImageUrl(match.image.url)
  }

  const benefits = [
    { icon: '🚚', text: 'Frete grátis acima de R$ 299' },
    { icon: '↩️', text: 'Troca grátis em até 30 dias' },
    { icon: '💳', text: 'Até 12x sem juros' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
      {/* Gallery */}
      <ProductGallery images={images} title={title} activeUrl={activeImageUrl} />

      {/* Info */}
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-roxo mb-3">Limoá Fit</p>
          <h1 className="font-display font-black text-4xl md:text-5xl text-black leading-tight mb-6">
            {title}
          </h1>
          <div className="flex items-baseline gap-3">
            <span className="font-black text-3xl text-black">{price}</span>
            <span className="text-sm text-gray-400">ou 12x sem juros</span>
          </div>
        </div>

        <AddToCartButton variants={variants} onOptionChange={handleOptionChange} />

        {descriptionHtml && (
          <div className="border-t pt-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Descrição</p>
            <div
              className="text-gray-600 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </div>
        )}

        <div className="border-t pt-8 flex flex-col gap-3">
          {benefits.map((b) => (
            <div key={b.text} className="flex items-center gap-3 text-sm font-medium text-gray-600">
              <span>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
