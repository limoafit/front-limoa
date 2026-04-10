'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore, useCartCount } from '@/store/cartStore'
import { useEffect, useState } from 'react'
import Logo from './Logo'

const NAV_LINKS = [
  { href: '/produtos',               label: 'Coleção',   cat: null        },
  { href: '/produtos?cat=legging',   label: 'Leggings',  cat: 'legging'   },
  { href: '/produtos?cat=top',       label: 'Tops',      cat: 'top'       },
  { href: '/produtos?cat=conjunto',  label: 'Conjuntos', cat: 'conjunto'  },
]

export default function Header() {
  const toggleCart = useCartStore((s) => s.toggleCart)
  const initCart = useCartStore((s) => s.initCart)
  const count = useCartCount()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCat = searchParams.get('cat')

  const isActive = (link: typeof NAV_LINKS[0]) => {
    if (pathname !== '/produtos') return false
    return link.cat === null ? currentCat === null : currentCat === link.cat
  }

  useEffect(() => {
    initCart()
  }, [initCart])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        {/* Top bar */}
        <div className="bg-gradient-brand text-white text-xs font-bold text-center py-2 tracking-widest uppercase">
          Frete grátis acima de R$ 299 · Troca grátis em 30 dias
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 -ml-2 text-gray-700"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo size="md" />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-black uppercase tracking-wide transition-colors relative pb-0.5 ${
                    isActive(link)
                      ? 'text-roxo after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-roxo after:rounded-full'
                      : 'text-gray-600 hover:text-roxo'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-roxo transition-colors"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rosa text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-black uppercase tracking-widest py-2 border-b border-gray-100 transition-colors ${
                  isActive(link) ? 'text-roxo' : 'text-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Spacer for top bar + header */}
      <div className="h-[88px]" />
    </>
  )
}
