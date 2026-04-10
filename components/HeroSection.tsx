import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-[#d9f705] overflow-hidden flex flex-col min-h-[100svh]">
      {/* Lemon pattern bg */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        {LEMON_POSITIONS.map((pos, i) => (
          <LemonIcon key={i} color="#000" style={pos} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 py-16 max-w-7xl mx-auto w-full">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 self-start bg-black text-[#d9f705] text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d9f705]" />
          Nova Coleção 2026
        </span>

        {/* Headline — full width on mobile */}
        <h1 className="font-display font-black text-black leading-[0.88] mb-6 text-[clamp(3.5rem,14vw,8rem)]">
          <span className="block">VISTA</span>
          <span className="block">SEU</span>
          <span
            className="block"
            style={{ WebkitTextStroke: '3px #f771cc', color: 'transparent' }}
          >
            PODER.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-800 text-sm leading-relaxed font-medium mb-8 max-w-xs">
          Moda fitness feminina vibrante. Tecidos premium, fit perfeito, cores que te representam.
        </p>

        {/* CTAs — stacked on mobile, row on sm+ */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/produtos"
            className="bg-black text-[#d9f705] font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full text-center hover:bg-gray-900 active:scale-95 transition-all shadow-lg"
          >
            Comprar Agora
          </Link>
          <Link
            href="/produtos"
            className="border-2 border-black text-black font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full text-center hover:bg-black hover:text-[#d9f705] active:scale-95 transition-all"
          >
            Ver Coleção
          </Link>
        </div>

        {/* Lemon visual — below text on mobile, hidden on small screens, shown md+ */}
        <div className="flex justify-center mt-12 md:hidden">
          <div className="relative w-48 h-48">
            <LemonIcon color="#f771cc" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 bg-black text-white">
        <div className="grid grid-cols-3 divide-x divide-white/10 px-4 py-4 max-w-7xl mx-auto">
          {[
            { value: '10k+', label: 'Clientes' },
            { value: '100+', label: 'Modelos' },
            { value: '4.9★', label: 'Avaliação' },
          ].map((s) => (
            <div key={s.label} className="text-center px-2">
              <p className="font-display font-black text-lg text-[#d9f705] md:text-2xl">{s.value}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LemonIcon({ color = '#f771cc', style }: { color?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path d="M50 10 L50 22" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M50 12 Q68 4 72 16 Q60 22 50 16" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M50 22 C28 22 14 40 14 62 C14 84 30 104 50 108 C70 104 86 84 86 62 C86 40 72 22 50 22Z" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M40 45 Q36 62 40 80" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

// Pre-defined lemon positions for the pattern background
const LEMON_POSITIONS: React.CSSProperties[] = [
  { position:'absolute', left:'5%',  top:'8%',  width:36, transform:'rotate(15deg)'  },
  { position:'absolute', left:'22%', top:'3%',  width:28, transform:'rotate(-20deg)' },
  { position:'absolute', left:'42%', top:'6%',  width:44, transform:'rotate(5deg)'   },
  { position:'absolute', left:'65%', top:'2%',  width:32, transform:'rotate(-10deg)' },
  { position:'absolute', left:'82%', top:'10%', width:40, transform:'rotate(25deg)'  },
  { position:'absolute', left:'2%',  top:'35%', width:30, transform:'rotate(-30deg)' },
  { position:'absolute', left:'18%', top:'30%', width:50, transform:'rotate(10deg)'  },
  { position:'absolute', left:'55%', top:'28%', width:38, transform:'rotate(-15deg)' },
  { position:'absolute', left:'78%', top:'33%', width:28, transform:'rotate(20deg)'  },
  { position:'absolute', left:'90%', top:'40%', width:42, transform:'rotate(-5deg)'  },
  { position:'absolute', left:'8%',  top:'60%', width:46, transform:'rotate(35deg)'  },
  { position:'absolute', left:'30%', top:'58%', width:32, transform:'rotate(-25deg)' },
  { position:'absolute', left:'50%', top:'62%', width:28, transform:'rotate(15deg)'  },
  { position:'absolute', left:'70%', top:'55%', width:44, transform:'rotate(-8deg)'  },
  { position:'absolute', left:'85%', top:'65%', width:36, transform:'rotate(30deg)'  },
  { position:'absolute', left:'3%',  top:'80%', width:34, transform:'rotate(-18deg)' },
  { position:'absolute', left:'25%', top:'82%', width:48, transform:'rotate(12deg)'  },
  { position:'absolute', left:'48%', top:'85%', width:30, transform:'rotate(-22deg)' },
  { position:'absolute', left:'68%', top:'78%', width:40, transform:'rotate(8deg)'   },
  { position:'absolute', left:'88%', top:'84%', width:28, transform:'rotate(-35deg)' },
]
