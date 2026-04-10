const items = [
  'NOVA COLEÇÃO 2026',
  'FRETE GRÁTIS ACIMA DE R$299',
  'TROCA GRÁTIS',
  'MODA FITNESS FEMININA',
  'FEITO PARA VOCÊ ✦',
]

interface Props {
  bg?: string
  text?: string
}

export default function MarqueeBanner({ bg = '#f771cc', text = '#fff' }: Props) {
  const repeated = [...items, ...items]

  return (
    <div className="overflow-hidden py-4" style={{ backgroundColor: bg }}>
      <div className="flex animate-marquee whitespace-nowrap w-max gap-0">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-display font-black text-sm uppercase tracking-widest px-8"
            style={{ color: text }}
          >
            {item}
            <span className="ml-8 opacity-50">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
