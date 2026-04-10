import Link from 'next/link'

const BG_COLORS = [
  '#f771cc22',
  '#9c71f722',
  '#f79c7122',
  '#d9f70533',
]

interface Props {
  id: string
  title: string
  handle: string
  price: string
}

export default function MockProductCard({ id, title, handle, price }: Props) {
  const bg = BG_COLORS[parseInt(id) % BG_COLORS.length]

  return (
    <Link href={`/produtos/${handle}`} className="group block">
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-xl mb-3 flex items-center justify-center"
        style={{ backgroundColor: bg }}
      >
        <svg viewBox="0 0 100 120" fill="none" className="w-20 h-20 opacity-20">
          <path d="M50 10 L50 22" stroke="#9c71f7" strokeWidth="5" strokeLinecap="round" />
          <path d="M50 12 Q68 4 72 16 Q60 22 50 16" stroke="#9c71f7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 22 C28 22 14 40 14 62 C14 84 30 104 50 108 C70 104 86 84 86 62 C86 40 72 22 50 22Z" stroke="#9c71f7" strokeWidth="5" strokeLinecap="round" />
          <path d="M40 45 Q36 62 40 80" stroke="#9c71f7" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
        </svg>
        <div className="absolute bottom-3 inset-x-3 bg-black text-white text-xs font-black uppercase tracking-widest py-2.5 rounded-full text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Comprar
        </div>
      </div>
      <p className="font-semibold text-gray-900 text-sm leading-snug mb-1 group-hover:text-roxo transition-colors">
        {title}
      </p>
      <p className="font-black text-base text-black">{price}</p>
    </Link>
  )
}
