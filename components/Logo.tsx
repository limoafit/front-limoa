interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { height: 28 },
  md: { height: 38 },
  lg: { height: 54 },
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const s = sizes[size]

  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Limoá Fit"
        height={s.height}
        style={{ height: s.height, width: 'auto', display: 'block' }}
      />
    </span>
  )
}
