'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShopifyImage } from '@/types'

interface Props {
  images: ShopifyImage[]
  title: string
}

export default function ProductGallery({ images, title }: Props) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gradient-to-br from-rosa/20 to-roxo/20 rounded-2xl flex items-center justify-center">
        <span className="font-display text-6xl font-black text-gradient opacity-40">LF</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={images[active].url}
          alt={images[active].altText ?? title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                idx === active ? 'border-roxo' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
