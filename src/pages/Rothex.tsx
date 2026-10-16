import { useEffect, useRef, useState } from 'react'
import heroImg from '../assets/rothex-hero.jpg'
import BackToPainting from '../components/BackToPainting'

const NAV_LINKS = [
  { href: '#empresa', label: 'La Empresa' },
  { href: '#sucursales', label: 'Sucursales' },
  { href: '#mision', label: 'Mision' },
]

const BRANCHES = [
  { name: 'Rothex S.A Oficinas', address: 'Luis Maria Campos 88 Maciá, 3177 Entre Ríos', phone: '03445 461888' },
  { name: 'Chaco 1', address: 'Pio XII 240, H3506 Resistencia, Chaco', phone: '0362-4432735 / 0362-4225197' },
  { name: 'Chaco 2', address: 'Av. 9 de Julio 902, H3508AZO Resistencia, Chaco', phone: '0362-4449401' },
  { name: 'Chaco 3', address: 'Av. Alvear 155, H3500BGB Resistencia, Chaco', phone: '0362-4431517' },
]

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.5 3h-2.7v11.4a2.6 2.6 0 1 1-2.6-2.6c.2 0 .4 0 .6.1V9.2a5.5 5.5 0 1 0 4.7 5.4V7.9a5.6 5.6 0 0 0 3.4 1.2V6.4a3.4 3.4 0 0 1-3.4-3.4z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.2H7.6V14h2.7v8z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .7-.2 1z" />
    </svg>
  )
}

/** CSS stand-in for the "Huevos Doble A" banner (the real logo is an image). */
function DobleALogo() {
  return (
    <div className="mx-auto w-full max-w-[620px]">
      <div className="relative z-10 mx-auto -mb-3 w-[46%] rounded-t-full rounded-b bg-[#1f6b3a] py-2.5 text-center">
        <span className="text-xl font-bold italic text-white">Huevos</span>
      </div>
      <div
        className="relative rounded-lg border-4 border-[#1f6b3a] bg-[#f6e7b8] px-6 py-6"
        style={{ backgroundImage: 'repeating-linear-gradient(#e6d69c 0 1px, transparent 1px 10px)' }}
      >
        <span className="block text-center text-5xl font-extrabold tracking-wide text-[#c0272d] sm:text-6xl">
          DOBLE A
        </span>
      </div>
    </div>
  )
}

function MvvItem({ number, title, children }: { number: string; title: string; children: string }) {
  return (
    <div>
      <h3 className="mb-2 text-2xl font-extrabold text-[#2b1d12]">
        <span className="mr-1 text-[#e2701f]">{number}</span>
        <span className="border-b-2 border-[#e2701f] pb-0.5">{title}</span>
      </h3>
      <p className="mx-auto max-w-[720px] leading-relaxed text-[#3a2a1a]">{children}</p>
    </div>
  )
}

/**
 * Rothex: a recreation of the landing page built for Rothex (rothex.com.ar),
 * plus the story behind it. Deliberately its own visual language.
 */
export default function Rothex() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.title = 'Rothex - Portfolio'
  }, [])

  const onScroll = () => {
    const el = scrollRef.current
    if (el) setScrolled(el.scrollTop > 24)
  }

  const navText = scrolled ? 'text-[#2b2b2b]' : 'text-white'

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="font-rothex h-dvh w-screen overflow-y-auto bg-white text-[#3a3a3a]"
    >
      {/* Fixed nav: transparent over the hero, solid once scrolled. */}
      <nav
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-4">
          <div className={`flex items-center gap-5 ${navText}`}>
            <BackToPainting
              symbol="rothex"
              showLabel={false}
              label="Volver al cuadro"
              symbolClassName="h-8 w-8"
              className="inline-flex items-center opacity-90 transition-opacity hover:opacity-60"
            />
            <span className="hidden h-6 w-px bg-current opacity-30 sm:block" />
            <a href="#" aria-label="TikTok" className="opacity-90 transition-opacity hover:opacity-60">
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="opacity-90 transition-opacity hover:opacity-60">
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="opacity-90 transition-opacity hover:opacity-60">
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
          <div className={`flex items-center gap-6 text-[15px] font-semibold ${navText}`}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hidden transition-opacity hover:opacity-60 md:inline">
                {link.label}
              </a>
            ))}
            <a
              href="#empresa"
              className="rounded-full bg-black px-6 py-2.5 text-white transition-opacity hover:opacity-80"
            >
              Contactanos
            </a>
          </div>
        </div>
      </nav>

      {/* Hero. */}
      <section className="relative h-[92vh] min-h-[520px] w-full overflow-hidden">
        <img src={heroImg} alt="Planta avícola de Rothex" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="text-6xl font-extrabold tracking-wide text-[#f9a11b] drop-shadow-lg sm:text-8xl">
            ROTHEX
          </h1>
          <p className="mt-2 text-2xl font-bold text-white drop-shadow-lg sm:text-4xl">
            Naturaleza hecha alimento
          </p>
        </div>
        <svg
          className="absolute -bottom-px left-0 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,70 C400,130 1040,-10 1440,70 L1440,120 L0,120 Z" fill="#ffffff" />
        </svg>
      </section>

      {/* Nuestra Empresa. */}
      <section id="empresa" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="mb-12 text-4xl font-extrabold text-[#3a3a3a]">Nuestra Empresa</h2>
          <DobleALogo />
        </div>
      </section>

      {/* Historia / Emprendimientos / Fundación. */}
      <section className="bg-white px-6 pb-16">
        <div className="mx-auto max-w-[860px] space-y-12 text-center">
          <div>
            <h3 className="mb-4 text-3xl font-extrabold text-[#3a3a3a]">Historia</h3>
            <p className="text-lg leading-relaxed text-[#4a4a4a]">
              Radicada en Maciá, centro de la provincia de Entre Ríos, la familia ROTH ha sido parte activa de
              la actividad avícola argentina por más de 50 años.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-3xl font-extrabold text-[#3a3a3a]">Emprendimientos</h3>
            <p className="text-lg leading-relaxed text-[#4a4a4a]">
              Sus incursiones en el sector que comenzaron como la incubación y producción de alimentos
              balanceados eventualmente derivaron en la producción y comercialización de huevos de mesa, siendo
              su principal marca Huevo Doble A.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-3xl font-extrabold text-[#3a3a3a]">Fundación</h3>
            <p className="text-lg leading-relaxed text-[#4a4a4a]">
              En el año 2009 el socio gerente y fundador de Roth SRL, Don Roberto &quot;Beto&quot; Roth, forma
              junto a su equipo la empresa que hoy lleva adelante la administración profesional de las
              sucursales...
            </p>
          </div>
        </div>
      </section>

      {/* Sucursales. */}
      <section id="sucursales" className="bg-[#1c1c1c] px-6 py-16">
        <h2 className="mb-12 text-center text-4xl font-extrabold text-[#3aa0f0]">Sucursales</h2>
        <div className="mx-auto grid max-w-[1100px] gap-6 sm:grid-cols-2">
          {BRANCHES.map((branch) => (
            <div
              key={branch.name}
              className="flex min-h-[300px] flex-col justify-end rounded-lg bg-[#3aa0f0] p-6 text-[#123]"
            >
              <h3 className="mb-4 text-xl font-bold text-[#0b1a2b]">{branch.name}</h3>
              <div className="flex gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#0b1a2b]" />
                <span className="text-[15px] text-[#0b1a2b]/80">{branch.address}</span>
              </div>
              <div className="mt-3 flex gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#0b1a2b]" />
                <span className="text-[15px] text-[#0b1a2b]/80">{branch.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Misión, visión y filosofía. */}
      <section id="mision" className="bg-white px-6 py-16">
        <h2 className="mb-8 text-center text-4xl font-extrabold text-[#3a3a3a]">
          MISION, VISION Y FILOSOFIA
        </h2>
        <div
          className="mx-auto max-w-[1100px] space-y-10 rounded-lg p-8 text-center sm:p-12"
          style={{ backgroundImage: 'linear-gradient(135deg, #e2c49b, #cfa476 60%, #b98a5c)' }}
        >
          <MvvItem number="1" title="Misión">
            ROTHEX es una empresa dedicada a la producción y comercialización de alimentos de alta calidad y
            prestigio, siendo actualmente su principal negocio la producción y comercialización de huevos
            frescos de mesa, utilizando para ello la más alta calidad de materia prima y tecnología de avanzada.
          </MvvItem>
          <MvvItem number="2" title="Visión">
            Ser líder en cada una de las actividades que se emprendan.
          </MvvItem>
          <MvvItem number="3" title="Filosofía">
            ROTHEX tiene como filosofía de trabajo la excelencia en todo lo que emprende. De esta manera la
            totalidad del proceso productivo es llevado a cabo con tecnología de última generación, siguiendo
            las más estrictas normas de calidad, seguridad e higiene.
          </MvvItem>
        </div>
      </section>

      {/* The story behind the page. */}
      <section className="bg-[#f2f2f2] px-6 py-16">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#e2701f]">
            Mi primer proyecto · Febrero 2021
          </p>
          <h2 className="mb-6 text-4xl font-extrabold text-[#3a3a3a]">Sobre este proyecto</h2>
          <div className="space-y-5 text-lg leading-relaxed text-[#4a4a4a]">
            <p>
              Esta página es una recreación de la primera web que hice: la landing page de Rothex, desarrollada
              en febrero de 2021.
            </p>
            <p>
              Fue mi primer contacto real con la programación. Me llevó un mes entero de verano aprender HTML,
              CSS y JavaScript desde cero para poder construirla, y ese mes terminó siendo decisivo: poco
              después entré a la universidad a estudiar Ingeniería en Sistemas de Información.
            </p>
            <p>
              Solo fue la landing page: la historia de la empresa, sus sucursales y su misión, visión y
              filosofía. Todo lo que ves arriba es esa web.
            </p>
          </div>
        </div>
      </section>

      {/* Footer. */}
      <footer className="bg-[#2b2b2b] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-[600px] space-y-10">
          <div>
            <h3 className="mb-5 text-2xl font-bold underline decoration-2 underline-offset-8">Redes sociales</h3>
            <div className="flex justify-center gap-6">
              <a href="#" aria-label="TikTok" className="transition-opacity hover:opacity-60">
                <TikTokIcon className="h-7 w-7" />
              </a>
              <a href="#" aria-label="Facebook" className="transition-opacity hover:opacity-60">
                <FacebookIcon className="h-7 w-7" />
              </a>
              <a href="#" aria-label="Instagram" className="transition-opacity hover:opacity-60">
                <InstagramIcon className="h-7 w-7" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold underline decoration-2 underline-offset-8">Teléfono</h3>
            <p className="text-[#d8d8d8]">+54 (03445) 461888</p>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold underline decoration-2 underline-offset-8">Email</h3>
            <p className="text-[#d8d8d8]">info@rothex.com.ar</p>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold underline decoration-2 underline-offset-8">Otros</h3>
            <p className="text-[#d8d8d8]">www.institutohuevo.com</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
