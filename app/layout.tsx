import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Limoá Fit — Moda Fitness Feminina',
    template: '%s | Limoá Fit',
  },
  description:
    'Moda fitness feminina vibrante e estilosa. Leggings, tops, conjuntos e muito mais para você arrasar nos treinos.',
  keywords: ['moda fitness', 'roupa de academia', 'legging', 'top fitness', 'conjunto fitness', 'limoafit'],
  openGraph: {
    title: 'Limoá Fit — Moda Fitness Feminina',
    description: 'Moda fitness feminina vibrante e estilosa.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans">
        <Suspense>
          <Header />
        </Suspense>
        <main>{children}</main>
        <CartDrawer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
