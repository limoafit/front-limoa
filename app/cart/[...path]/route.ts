import { NextRequest, NextResponse } from 'next/server'

/**
 * Captura qualquer requisição em /cart/... e redireciona para o
 * domínio .myshopify.com, que é onde o checkout da Shopify roda.
 *
 * Isso resolve o conflito onde a Shopify gera checkoutUrl com o
 * domínio customizado (limoafit.com), que agora aponta para o Next.js.
 */
export function GET(req: NextRequest) {
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

  if (!shopifyDomain) {
    return NextResponse.json({ error: 'Shopify domain not configured' }, { status: 500 })
  }

  const url = new URL(req.url)
  url.hostname = shopifyDomain

  return NextResponse.redirect(url.toString(), { status: 307 })
}
