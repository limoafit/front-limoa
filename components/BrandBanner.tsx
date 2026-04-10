import Link from 'next/link'

export default function BrandBanner() {
  return (
    <section className="bg-black py-28 relative overflow-hidden">
      {/* Neon glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: '#f771cc' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: '#9c71f7' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Eyebrow */}
        <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-[#d9f705] mb-8">
          ✦ manifesto limoá ✦
        </span>

        <h2 className="font-display font-black text-white leading-[0.9] mb-8">
          <span className="block text-5xl sm:text-6xl md:text-7xl">VOCÊ É</span>
          <span
            className="block text-5xl sm:text-6xl md:text-7xl"
            style={{ color: '#d9f705' }}
          >
            FORÇA.
          </span>
          <span
            className="block text-5xl sm:text-6xl md:text-7xl"
            style={{ WebkitTextStroke: '2px #f771cc', color: 'transparent' }}
          >
            É ARTE.
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl text-white">É LIMOÁ.</span>
        </h2>

        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Cada peça é projetada para acompanhar cada movimento seu — com conforto, estilo e energia que só a Limoá entrega.
        </p>

        <Link
          href="/produtos"
          className="inline-block bg-[#d9f705] text-black font-black text-sm uppercase tracking-widest px-12 py-4 rounded-full hover:scale-105 transition-all shadow-2xl"
        >
          Explorar Coleção
        </Link>
      </div>
    </section>
  )
}
