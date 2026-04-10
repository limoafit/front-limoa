import Link from 'next/link'

export default function BrandBanner() {
  return (
    <section className="bg-black py-20 relative overflow-hidden md:py-28">
      {/* Glow */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-20 md:w-96 md:h-96" style={{ background: '#f771cc' }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-20 md:w-96 md:h-96" style={{ background: '#9c71f7' }} />

      <div className="relative z-10 px-5 text-center max-w-5xl mx-auto">
        <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[#d9f705] mb-6 md:text-xs md:mb-8">
          ✦ manifesto limoá ✦
        </span>

        <h2 className="font-display font-black text-white leading-[0.9] mb-6 md:mb-8">
          <span className="block text-4xl sm:text-5xl md:text-7xl">VOCÊ É</span>
          <span className="block text-4xl sm:text-5xl md:text-7xl" style={{ color: '#d9f705' }}>FORÇA.</span>
          <span className="block text-4xl sm:text-5xl md:text-7xl" style={{ WebkitTextStroke: '2px #f771cc', color: 'transparent' }}>É ARTE.</span>
          <span className="block text-4xl sm:text-5xl md:text-7xl text-white">É LIMOÁ.</span>
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto mb-8 md:text-base md:max-w-xl md:mb-12">
          Cada peça projetada para acompanhar cada movimento seu — com conforto, estilo e energia que só a Limoá entrega.
        </p>

        <Link
          href="/produtos"
          className="inline-block bg-[#d9f705] text-black font-black text-xs uppercase tracking-widest px-10 py-4 rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl md:text-sm"
        >
          Explorar Coleção
        </Link>
      </div>
    </section>
  )
}
