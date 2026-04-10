interface LogoProps {
  className?: string
  iconColor?: string
  textColor?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { icon: 28, text: 'text-xl'  },
  md: { icon: 36, text: 'text-2xl' },
  lg: { icon: 52, text: 'text-4xl' },
}

export default function Logo({
  className = '',
  iconColor = '#f771cc',
  textColor,
  size = 'md',
}: LogoProps) {
  const s = sizes[size]
  const tc = textColor ?? '#9c71f7'

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Lemon icon — baseado na identidade visual da marca */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 80 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Corpo do limão — oval arredondado */}
        <ellipse
          cx="40"
          cy="56"
          rx="26"
          ry="30"
          stroke={iconColor}
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Cabinho — barra horizontal no topo */}
        <line
          x1="28" y1="20"
          x2="52" y2="20"
          stroke={iconColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Haste vertical conectando ao corpo */}
        <line
          x1="40" y1="20"
          x2="40" y2="28"
          stroke={iconColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Folha — saindo para a direita do cabinho */}
        <path
          d="M50 18 Q64 8 66 20 Q58 26 50 20"
          stroke={iconColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Detalhe interno — linha curva à esquerda */}
        <path
          d="M32 42 Q28 56 32 70"
          stroke={iconColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>

      {/* Texto LIMOÁ */}
      <span
        className="font-display font-black tracking-tight"
        style={{
          fontSize: s.icon * 0.78,
          color: tc,
          lineHeight: 1,
        }}
      >
        LIMOÁ
      </span>
    </span>
  )
}
