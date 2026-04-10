import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="px-4 pt-12 pb-8 max-w-7xl mx-auto md:px-6 lg:px-8 md:pt-16">
        {/* Top — stacked mobile, grid desktop */}
        <div className="flex flex-col gap-10 mb-12 md:grid md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="lg" className="mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-5">
              Moda fitness feminina brasileira. Energia, movimento e muito estilo para o seu dia a dia.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/limoafit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-rosa hover:text-rosa transition-all touch-manipulation"
              >
                <IconInstagram />
              </a>
              <a
                href="https://youtube.com/@limoafit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-rosa hover:text-rosa transition-all touch-manipulation"
              >
                <IconYouTube />
              </a>
            </div>
          </div>

          {/* Links — side by side on mobile */}
          <div className="grid grid-cols-2 gap-8 md:contents">
            <div>
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-[#d9f705] mb-4">Loja</h3>
              <ul className="space-y-3">
                {[
                  { href: '/produtos',              label: 'Todos' },
                  { href: '/produtos?cat=legging',  label: 'Leggings' },
                  { href: '/produtos?cat=top',      label: 'Tops' },
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
            <div>
              <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-[#d9f705] mb-4">Ajuda</h3>
              <ul className="space-y-3">
                {['Trocas', 'Envio', 'Tamanhos', 'Contato'].map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col gap-2 text-xs text-gray-600 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Limoá Fit. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconYouTube() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.46C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  )
}
