'use client'

import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/shopify'

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } = useCartStore()

  const lines      = cart?.lines.edges.map((e) => e.node) ?? []
  const subtotal   = cart?.cost.subtotalAmount
  const checkoutUrl = cart?.checkoutUrl

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeCart}
        />
      )}

      {/* Drawer — full width on mobile, max-md on larger */}
      <div
        className={`fixed top-0 right-0 h-full w-full z-50 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-out sm:max-w-md ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 md:px-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-roxo" />
            <h2 className="font-display font-black text-lg text-gray-900">Carrinho</h2>
            {(cart?.totalQuantity ?? 0) > 0 && (
              <span className="bg-gradient-brand text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {cart?.totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 md:px-6">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rosa/20 to-roxo/20 flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-roxo" />
              </div>
              <div>
                <p className="font-black text-gray-900 text-base">Carrinho vazio</p>
                <p className="text-gray-400 text-sm mt-1">Adicione produtos para começar</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 bg-gradient-brand text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-full"
              >
                Explorar Produtos
              </button>
            </div>
          ) : (
            lines.map((line) => {
              const image    = line.merchandise.product.images.edges[0]?.node
              const itemPrice = formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)

              return (
                <div key={line.id} className="flex gap-3">
                  {/* Image */}
                  <div className="relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    {image ? (
                      <Image
                        src={image.url}
                        alt={image.altText ?? line.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-rosa/20 to-roxo/20" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                      {line.merchandise.product.title}
                    </p>
                    {line.merchandise.title !== 'Default Title' && (
                      <p className="text-[11px] text-gray-400 mt-0.5">{line.merchandise.title}</p>
                    )}
                    <p className="font-black text-sm text-gradient mt-1">{itemPrice}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          line.quantity > 1
                            ? updateItem(line.id, line.quantity - 1)
                            : removeItem(line.id)
                        }
                        disabled={isLoading}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-roxo hover:text-roxo transition-colors disabled:opacity-40 touch-manipulation"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-black text-sm w-5 text-center">{line.quantity}</span>
                      <button
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-roxo hover:text-roxo transition-colors disabled:opacity-40 touch-manipulation"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={isLoading}
                        className="ml-auto p-1 text-gray-300 hover:text-red-400 transition-colors disabled:opacity-40 touch-manipulation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-4 space-y-3 md:px-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-sm">Subtotal</span>
              <span className="font-black text-xl text-gradient">
                {subtotal ? formatPrice(subtotal.amount, subtotal.currencyCode) : '—'}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 text-center">
              Frete e descontos calculados no checkout
            </p>
            <a
              href={checkoutUrl ?? '#'}
              className="block w-full bg-gradient-brand text-white font-black text-xs uppercase tracking-widest text-center py-4 rounded-full active:scale-95 transition-all shadow-lg shadow-rosa/20"
            >
              Finalizar Compra →
            </a>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-rosa border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </>
  )
}
