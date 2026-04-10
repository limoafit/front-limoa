export default function WhatsAppButton() {
  const phone = '5564992232259'
  const message = encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações sobre os produtos 😊')
  const href = `https://wa.me/${phone}?text=${message}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform touch-manipulation md:bottom-8 md:right-8"
      style={{ backgroundColor: '#25D366' }}
    >
      <IconWhatsApp />
    </a>
  )
}

function IconWhatsApp() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.63 4.64 1.827 6.653L2.667 29.333l6.88-1.8A13.267 13.267 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24C13.947 26.667 11.94 26.08 10.24 25L9.6 24.613l-4.08 1.067 1.093-3.96-.427-.667A10.613 10.613 0 0 1 5.333 16C5.333 10.12 10.12 5.333 16.004 5.333S26.667 10.12 26.667 16 21.88 26.667 16.004 26.667zm5.826-7.947c-.32-.16-1.88-.92-2.173-1.027-.293-.106-.507-.16-.72.16s-.827 1.027-1.013 1.24c-.187.214-.374.24-.694.08-.32-.16-1.347-.494-2.56-1.574-.947-.84-1.587-1.88-1.774-2.2-.186-.32-.02-.494.14-.653.144-.144.32-.374.48-.56.16-.187.213-.32.32-.534.107-.213.054-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.627-.52-.534-.72-.547h-.613c-.213 0-.56.08-.854.4s-1.12 1.094-1.12 2.667 1.147 3.094 1.307 3.307c.16.213 2.253 3.44 5.46 4.827.763.333 1.36.533 1.826.68.768.24 1.467.207 2.02.127.614-.094 1.88-.774 2.147-1.52.266-.747.266-1.387.186-1.52-.08-.134-.293-.214-.613-.374z"/>
    </svg>
  )
}
