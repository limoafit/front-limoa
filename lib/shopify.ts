import { ShopifyProduct, ShopifyCart } from '@/types'

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

  if (!domain || !accessToken) {
    throw new Error('Variáveis de ambiente do Shopify não configuradas')
  }

  const endpoint = `https://${domain}/api/2024-01/graphql.json`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Shopify API ${response.status}: ${text.slice(0, 200)}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 6) {
      edges {
        node { url altText width height }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
  }
`

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product {
                title
                handle
                images(first: 1) {
                  edges { node { url altText width height } }
                }
              }
            }
          }
        }
      }
    }
  }
`

export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges { node { ...ProductFields } }
      }
    }
  `
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(query, { first })
  return data.products.edges.map((e) => e.node)
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) { ...ProductFields }
    }
  `
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(query, { handle })
  return data.productByHandle
}

export async function createCart(): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation CreateCart {
      cartCreate { cart { ...CartFields } }
    }
  `
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(query)
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
  `
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  })
  return data.cartLinesAdd.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
  `
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(query, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })
  return data.cartLinesUpdate.cart
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
      }
    }
  `
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(query, { cartId, lineIds })
  return data.cartLinesRemove.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
  `
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(query, { cartId })
  return data.cart
}

export function formatPrice(amount: string, currencyCode = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}
