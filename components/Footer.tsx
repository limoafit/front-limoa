import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="lg" iconColor="#d9f705" textColor="#fff" className="mb-5" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Moda fitness feminina brasileira. Energia, movimento e muito estilo para o seu dia a dia.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/limoafit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-rosa hover:text-rosa transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@limoafit"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-rosa hover:text-rosa transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[#d9f705] mb-5">Loja</h3>
            <ul className="space-y-3">
              {[
                { href: '/produtos', label: 'Todos os produtos' },
                { href: '/produtos?cat=legging', label: 'Leggings' },
                { href: '/produtos?cat=top', label: 'Tops' },
                { href: '/produtos?cat=conjunto', label: 'Conjuntos' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[#d9f705] mb-5">Ajuda</h3>
            <ul className="space-y-3">
              {['Trocas e devoluções', 'Política de envio', 'Guia de tamanhos', 'Fale conosco'].map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Limoá Fit. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
