import { useEffect } from 'react'
import mainmenubg from '../assets/reino/bg/mainmenubg.jpg'
import abilityEightGold from '../assets/reino/cards/ability-eight-gold.webp'
import abilityNineSword from '../assets/reino/cards/ability-nine-sword.webp'
import abilityOneCup from '../assets/reino/cards/ability-one-cup.webp'
import abilitySevenStick from '../assets/reino/cards/ability-seven-stick.webp'
import abilityThreeGold from '../assets/reino/cards/ability-three-gold.webp'
import abilityTwoSword from '../assets/reino/cards/ability-two-sword.webp'
import crown from '../assets/reino/hero/crown.png'
import crownShadow from '../assets/reino/hero/crown-shadow.png'
import splat from '../assets/reino/hero/splat.png'
import title from '../assets/reino/hero/title.png'
import botMode from '../assets/reino/modes/bot.webp'
import localMode from '../assets/reino/modes/local.webp'
import onlineMode from '../assets/reino/modes/online.webp'
import botSelector from '../assets/reino/screenshots/bot-selector.jpg'
import gameScreen from '../assets/reino/screenshots/game-screen.jpg'
import localSelector from '../assets/reino/screenshots/local-selector.jpg'
import mainMenu from '../assets/reino/screenshots/main-menu.jpg'
import onlineSelector from '../assets/reino/screenshots/online-selector.jpg'
import BackToPainting from '../components/BackToPainting'
import { abilities, modes, suitColor } from '../data/reino'

const CARD_ART: Record<string, string> = {
  'one-cup': abilityOneCup,
  'two-sword': abilityTwoSword,
  'three-gold': abilityThreeGold,
  'seven-stick': abilitySevenStick,
  'eight-gold': abilityEightGold,
  'nine-sword': abilityNineSword,
}

const MODE_ART: Record<string, string> = {
  online: onlineMode,
  bot: botMode,
  local: localMode,
}

const GALLERY = [gameScreen, mainMenu, botSelector, localSelector, onlineSelector]

function SectionHeader({ children }: { children: string }) {
  return (
    <h2 className="mb-6 text-center font-cinzel text-2xl uppercase tracking-[0.2em] text-[#f0d48a] sm:text-3xl">
      {children}
    </h2>
  )
}

function Fleuron() {
  return (
    <div className="flex items-center justify-center gap-3 py-8 text-[#f0d48a]" aria-hidden="true">
      <span className="h-px w-16 bg-[#f0d48a]/30" />
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />
      </svg>
      <span className="h-px w-16 bg-[#f0d48a]/30" />
    </div>
  )
}

function Corner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`pointer-events-none absolute h-6 w-6 text-[#f0d48a] ${className ?? ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M1 15 V1 H15" />
      <circle cx="6" cy="6" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

/**
 * El Reino: a recreation of the game's landing page (reino-web). Dark green
 * ground, gold rules, Cinzel headings, blackletter card numerals, Garamond body,
 * framed like an illuminated manuscript. Its own visual language.
 */
export default function Reino() {
  useEffect(() => {
    document.title = 'El Reino - Portfolio'
  }, [])

  return (
    <div className="h-dvh w-screen overflow-y-auto bg-[#0d1713] font-garamond text-[#ece3cf]">
      <div className="relative mx-auto my-4 w-[min(46rem,calc(100%-2rem))] border border-[#f0d48a]/25">
        <Corner className="-left-px -top-px" />
        <Corner className="-right-px -top-px rotate-90" />
        <Corner className="-bottom-px -right-px rotate-180" />
        <Corner className="-bottom-px -left-px -rotate-90" />

        {/* Hero. */}
        <header className="relative overflow-hidden border-b border-[#f0d48a]/25">
          <img
            src={mainmenubg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40 blur-[3px]"
            style={{ transform: 'scale(1.08)' }}
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(70% 55% at 50% 40%, rgba(90,31,31,0.35), transparent 72%), linear-gradient(180deg, rgba(13,23,19,0.6) 0%, rgba(13,23,19,0.35) 38%, rgba(13,23,19,0.96) 100%)',
            }}
          />
          <div className="relative flex flex-col items-center gap-5 px-6 py-14 text-center">
            <div className="relative flex flex-col items-center">
              <img
                src={splat}
                alt=""
                aria-hidden="true"
                className="absolute w-[240%] max-w-none opacity-90"
                style={{ transform: 'rotate(-3deg)' }}
              />
              <img
                src={crownShadow}
                alt=""
                aria-hidden="true"
                className="absolute left-[6%] top-[24%] w-[88%]"
              />
              <img src={crown} alt="" aria-hidden="true" className="relative w-24 drop-shadow-lg" />
              <img
                src={title}
                alt="Reino"
                className="relative -mt-4 w-52 drop-shadow-lg"
                style={{ transform: 'rotate(-8deg)' }}
              />
            </div>
            <p className="text-sm uppercase tracking-[0.14em] text-[#f0d48a]">
              Juego de cartas
              <br />
              con habilidades únicas
            </p>
            <a
              href="#habilidades"
              className="rounded-full border border-[#f0d48a]/50 px-6 py-2 font-cinzel text-sm uppercase tracking-[0.2em] text-[#f7e6b8] transition-colors hover:bg-[#f0d48a]/10"
            >
              Mirá cómo se juega
            </a>
          </div>
        </header>

        {/* Abilities. */}
        <section id="habilidades" className="px-6 py-12">
          <SectionHeader>Cada carta, una jugada</SectionHeader>
          <p className="mx-auto mb-12 max-w-[60ch] text-center text-[#a9a790]">
            En Reino no todas las cartas tienen efecto, pero las que sí mandan: roban de la mano del rival, te
            blindan una carta, intercambian o le encajan la maldición del 8 a otro jugador. Seis valores, seis
            jugadas.
          </p>
          <div className="space-y-14">
            {abilities.map((ability, index) => (
              <article
                key={ability.number}
                className={`flex flex-col items-center gap-6 sm:flex-row ${
                  index % 2 === 1 ? 'sm:flex-row-reverse' : ''
                }`}
              >
                <div className="relative shrink-0">
                  <span
                    className="pointer-events-none absolute -left-6 -top-10 select-none font-fraktur text-[8rem] leading-none text-[#f0d48a]/10"
                    aria-hidden="true"
                  >
                    {ability.number}
                  </span>
                  <img
                    src={CARD_ART[ability.art]}
                    alt={`Carta ${ability.number} de ${ability.figure}`}
                    className="relative w-36 rounded-lg shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] sm:w-44"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-fraktur text-4xl leading-none" style={{ color: suitColor[ability.suit] }}>
                    {ability.number}
                  </p>
                  <h3 className="mt-1 font-fraktur text-2xl text-[#f7e6b8]">{ability.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#c9c2ab]">{ability.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Fleuron />

        {/* Modes. */}
        <section id="modos" className="px-6 py-12">
          <SectionHeader>Tres formas de jugar</SectionHeader>
          <div className="grid gap-6 sm:grid-cols-3">
            {modes.map((mode) => (
              <div
                key={mode.id}
                className="overflow-hidden rounded-lg border border-[#f0d48a]/20 bg-[#0f1a15]"
              >
                <img src={MODE_ART[mode.id]} alt="" className="h-36 w-full object-cover" />
                <div className="p-4 text-center">
                  <h3 className="font-cinzel text-lg text-[#f0d48a]">{mode.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#c9c2ab]">{mode.text}</p>
                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs ${
                      mode.status.startsWith('Dispon') ? 'bg-[#4c7a45] text-white' : 'bg-[#5a1f1f] text-[#f0d48a]'
                    }`}
                  >
                    {mode.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Fleuron />

        {/* Gallery. */}
        <section id="galeria" className="px-6 py-12">
          <SectionHeader>Cómo se ve</SectionHeader>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {GALLERY.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Captura ${index + 1} de Reino`}
                className="w-full rounded border border-[#f0d48a]/15"
              />
            ))}
          </div>
        </section>

        {/* Footer. */}
        <footer className="border-t border-[#f0d48a]/25 bg-gradient-to-b from-[#20140c] to-[#120b06] px-6 py-12 text-center">
          <img src={title} alt="Reino" className="mx-auto w-40" />
          <p className="mt-4 text-sm uppercase tracking-[0.14em] text-[#f0d48a]">
            Juego de cartas con habilidades únicas
          </p>
          <div className="mt-6">
            <BackToPainting
              symbol="reino"
              label="Volver al cuadro"
              symbolClassName="h-8 w-8"
              className="inline-flex items-center gap-3 text-[#f0d48a] transition-opacity hover:opacity-75"
            />
          </div>
          <p className="mt-6 text-xs text-[#7c7c69]">Landing page de Reino · Umbrella</p>
        </footer>
      </div>
    </div>
  )
}
