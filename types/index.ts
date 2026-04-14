export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyProductVariant {
  id: string
  title: string
  price: {
    amount: string
    currencyCode: string
  }
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  image?: {
    url: string
    altText: string | null
    width: number
    height: number
  } | null
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  tags: string[]
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images: {
    edges: {
      node: ShopifyImage
    }[]
  }
  variants: {
    edges: {
      node: ShopifyProductVariant
    }[]
  }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: {
      amount: string
      currencyCode: string
    }
    product: {
      title: string
      handle: string
      images: {
        edges: {
          node: ShopifyImage
        }[]
      }
    }
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: {
      amount: string
      currencyCode: string
    }
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
  lines: {
    edges: {
      node: ShopifyCartLine
    }[]
  }
}

export interface CartItem {
  id: string
  lineId: string
  title: string
  productTitle: string
  handle: string
  quantity: number
  price: string
  currencyCode: string
  image: string
  imageAlt: string
}
