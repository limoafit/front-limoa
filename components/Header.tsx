'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore, useCartCount } from '@/store/cartStore'
import { useEffect, useState } from 'react'
import Logo from './Logo'

const NAV_LINKS = [
  { href: '/produtos',              label: 'Coleção',   cat: null       },
  { href: '/produtos?cat=legging',  label: 'Leggings',  cat: 'legging'  },
  { href: '/produtos?cat=top',      label: 'Tops',      cat: 'top'      },
  { href: '/produtos?cat=conjunto', label: 'Conjuntos', cat: 'conjunto' },
]

export default function Header() {
  const toggleCart = useCartStore((s) => s.toggleCart)
  const initCart   = useCartStore((s) => s.initCart)
  const count      = useCartCount()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)

  const pathname    = usePathname()
  const searchParams = useSearchParams()
  const currentCat  = searchParams.get('cat')

  const isActive = (link: typeof NAV_LINKS[0]) => {
    if (pathname !== '/produtos') return false
    return link.cat === null ? currentCat === null : currentCat === link.cat
  }

  useEffect(() => { initCart() }, [initCart])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Fecha o menu ao navegar
  useEffect(() => { setMobileOpen(false) }, [pathname, currentCat])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        {/* Promo bar */}
        <div className="bg-gradient-brand text-white text-[10px] font-black text-center py-2 tracking-widest uppercase hidden sm:block">
          Frete grátis acima de R$ 299 · Troca grátis em 30 dias
        </div>

        {/* Main bar */}
        <div className="bg-white border-b border-gray-100">
          <div className="flex items-center justify-between h-14 px-4 max-w-7xl mx-auto md:h-16">
            {/* Hamburger — only mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 -ml-2 text-gray-700 touch-manipulation"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo size="md" iconColor="#f771cc" textColor="#9c71f7" />
            </Link>

            {/* Nav — desktop only */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-black uppercase tracking-wide transition-colors relative pb-0.5 ${
                    isActive(link)
                      ? 'text-roxo after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-roxo after:rounded-full'
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
              className="relative p-2 text-gray-700 hover:text-roxo transition-colors touch-manipulation"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rosa text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pb-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between text-sm font-black uppercase tracking-widest py-3 border-b border-gray-100 last:border-0 transition-colors ${
                  isActive(link) ? 'text-roxo' : 'text-gray-800'
                }`}
              >
                {link.label}
                <span className="text-gray-300">›</span>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-14 md:h-[88px]" />
    </>
  )
}
