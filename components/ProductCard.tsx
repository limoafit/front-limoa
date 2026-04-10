import Link from 'next/link'
import Image from 'next/image'
import { ShopifyProduct } from '@/types'
import { formatPrice } from '@/lib/shopify'

interface Props {
  product: ShopifyProduct
}

export default function ProductCard({ product }: Props) {
  const image = product.images.edges[0]?.node
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  )

  return (
    <Link href={`/produtos/${product.handle}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-3">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rosa/15 to-roxo/15 flex items-center justify-center">
            <span className="font-display text-3xl font-black text-gradient opacity-30">LF</span>
          </div>
        )}
        {/* Quick buy — tap on mobile, hover on desktop */}
        <div className="absolute bottom-2 inset-x-2 bg-black text-white text-[10px] font-black uppercase tracking-widest py-2.5 rounded-full text-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 md:bottom-3 md:inset-x-3">
          Comprar
        </div>
      </div>

      <p className="font-semibold text-gray-900 text-xs leading-snug mb-1 line-clamp-2 group-hover:text-roxo transition-colors md:text-sm">
        {product.title}
      </p>
      <p className="font-black text-sm text-black md:text-base">{price}</p>
    </Link>
  )
}
