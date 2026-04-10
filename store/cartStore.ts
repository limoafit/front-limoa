import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ShopifyCart } from '@/types'
import { createCart, addToCart, updateCartLine, removeFromCart, getCart } from '@/lib/shopify'

interface CartStore {
  cartId: string | null
  cart: ShopifyCart | null
  isOpen: boolean
  isLoading: boolean

  openCart: () => void
  closeCart: () => void
  toggleCart: () => void

  initCart: () => Promise<void>
  addItem: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      cart: null,
      isOpen: false,
      isLoading: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      initCart: async () => {
        const { cartId } = get()
        if (!cartId) {
          const cart = await createCart()
          set({ cartId: cart.id, cart })
          return
        }
        try {
          const cart = await getCart(cartId)
          if (cart) {
            set({ cart })
          } else {
            const newCart = await createCart()
            set({ cartId: newCart.id, cart: newCart })
          }
        } catch {
          const newCart = await createCart()
          set({ cartId: newCart.id, cart: newCart })
        }
      },

      addItem: async (variantId, quantity = 1) => {
        set({ isLoading: true })
        try {
          let { cartId } = get()
          if (!cartId) {
            const newCart = await createCart()
            cartId = newCart.id
            set({ cartId })
          }
          const cart = await addToCart(cartId, variantId, quantity)
          set({ cart, isOpen: true })
        } finally {
          set({ isLoading: false })
        }
      },

      updateItem: async (lineId, quantity) => {
        set({ isLoading: true })
        try {
          const { cartId } = get()
          if (!cartId) return
          const cart = await updateCartLine(cartId, lineId, quantity)
          set({ cart })
        } finally {
          set({ isLoading: false })
        }
      },

      removeItem: async (lineId) => {
        set({ isLoading: true })
        try {
          const { cartId } = get()
          if (!cartId) return
          const cart = await removeFromCart(cartId, [lineId])
          set({ cart })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'limoafit-cart',
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
)

export const useCartCount = () =>
  useCartStore((s) => s.cart?.totalQuantity ?? 0)
