import Link from 'next/link'
import Logo from './Logo'

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] bg-[#d9f705] overflow-hidden flex flex-col">
      {/* Lemon pattern background */}
      <div className="absolute inset-0 opacity-[0.07]">
        {Array.from({ length: 30 }).map((_, i) => (
          <LemonIcon
            key={i}
            style={{
              position: 'absolute',
              left: `${(i % 6) * 18 + Math.sin(i) * 4}%`,
              top: `${Math.floor(i / 6) * 22 + Math.cos(i) * 3}%`,
              width: `${40 + (i % 3) * 20}px`,
              transform: `rotate(${i * 23}deg)`,
            }}
            color="#000"
          />
        ))}
      </div>

      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 gap-12">
        {/* Left — text */}
        <div className="flex-1 text-center md:text-left">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 bg-black text-[#d9f705] text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d9f705]" />
            Nova Coleção 2025
          </span>

          <h1 className="font-display font-black text-black leading-[0.9] mb-8">
            <span className="block text-6xl sm:text-7xl md:text-8xl">VISTA</span>
            <span className="block text-6xl sm:text-7xl md:text-8xl">SEU</span>
            <span
              className="block text-6xl sm:text-7xl md:text-8xl"
              style={{
                WebkitTextStroke: '3px #f771cc',
                color: 'transparent',
              }}
            >
              PODER.
            </span>
          </h1>

          <p className="text-gray-800 text-base md:text-lg max-w-sm mb-10 leading-relaxed font-medium">
            Moda fitness feminina vibrante para quem treina com atitude. Tecidos premium, fit perfeito, cores que te representam.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/produtos"
              className="bg-black text-[#d9f705] font-black text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-gray-900 transition-all hover:scale-105 shadow-xl"
            >
              Comprar Agora
            </Link>
            <Link
              href="/produtos"
              className="border-2 border-black text-black font-black text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-black hover:text-[#d9f705] transition-all"
            >
              Ver Coleção
            </Link>
          </div>
        </div>

        {/* Right — brand visual */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            {/* Big lemon */}
            <div className="w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              <LemonIcon color="#f771cc" className="w-full h-full drop-shadow-2xl" />
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-black text-[#d9f705] font-black text-xs px-4 py-2 rounded-full uppercase tracking-wider rotate-12 shadow-lg">
              Premium ✦
            </div>
            <div className="absolute -bottom-4 -left-4 bg-roxo text-white font-black text-xs px-4 py-2 rounded-full uppercase tracking-wider -rotate-6 shadow-lg">
              Fitness 💪
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-white/10 py-5">
            {[
              { value: '10k+', label: 'Clientes felizes' },
              { value: '100+', label: 'Modelos exclusivos' },
              { value: '4.9★', label: 'Avaliação média' },
            ].map((s) => (
              <div key={s.label} className="text-center px-4">
                <p className="font-display font-black text-xl md:text-2xl text-[#d9f705]">{s.value}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LemonIcon({ color = '#f771cc', className = '', style }: { color?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path d="M50 10 L50 22" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M50 12 Q68 4 72 16 Q60 22 50 16" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M50 22 C28 22 14 40 14 62 C14 84 30 104 50 108 C70 104 86 84 86 62 C86 40 72 22 50 22Z" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M40 45 Q36 62 40 80" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}
