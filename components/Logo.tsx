interface LogoProps {
  className?: string
  iconColor?: string
  textColor?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { icon: 24, text: 'text-xl' },
  md: { icon: 32, text: 'text-2xl' },
  lg: { icon: 48, text: 'text-4xl' },
}

export default function Logo({ className = '', iconColor = '#f771cc', textColor, size = 'md' }: LogoProps) {
  const s = sizes[size]
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* Lemon icon — outline style matching brand */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stem */}
        <path
          d="M50 10 L50 22"
          stroke={iconColor}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Leaf */}
        <path
          d="M50 12 Q68 4 72 16 Q60 22 50 16"
          stroke={iconColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Lemon body */}
        <path
          d="M50 22 C28 22 14 40 14 62 C14 84 30 104 50 108 C70 104 86 84 86 62 C86 40 72 22 50 22Z"
          stroke={iconColor}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner shine line */}
        <path
          d="M40 45 Q36 62 40 80"
          stroke={iconColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      <span
        className={`font-display font-black tracking-tight ${s.text}`}
        style={textColor ? { color: textColor } : undefined}
      >
        {textColor ? (
          'LIMOÁ'
        ) : (
          <span className="text-gradient">LIMOÁ</span>
        )}
      </span>
    </span>
  )
}
