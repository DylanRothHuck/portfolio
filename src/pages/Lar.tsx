import { useEffect, type ReactElement, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

// "Practicas en LAR": the LAR mobile app for warehouse operators, shown full
// page. Lilac #f3f0fb background, Poppins, rounded #1d3a9e header, scan card,
// teal quick actions and the order cards. The logout icon returns to the
// painting (carrying the `symbol` view transition).

const POPPINS = "'Poppins', ui-sans-serif, system-ui, sans-serif"

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
type IconProps = { className?: string }

function Svg({ children, className, viewBox = '0 0 32 32' }: { children: ReactNode; className?: string; viewBox?: string }): ReactElement {
  return (
    <svg viewBox={viewBox} aria-hidden="true" className={className}>
      {children}
    </svg>
  )
}

function LogoutIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M13 5H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 10l6 6-6 6M26 16H12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

function BarcodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" className={className}>
      <rect x="3" y="10" width="3" height="28" rx="1" />
      <rect x="8" y="10" width="2" height="28" rx="1" />
      <rect x="12" y="10" width="4" height="28" rx="1" />
      <rect x="18" y="10" width="2" height="28" rx="1" />
      <rect x="22" y="10" width="4" height="28" rx="1" />
      <rect x="28" y="10" width="2" height="28" rx="1" />
      <rect x="32" y="10" width="4" height="28" rx="1" />
      <rect x="38" y="10" width="2" height="28" rx="1" />
      <rect x="42" y="10" width="3" height="28" rx="1" />
    </svg>
  )
}

function ConsultIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="7" y="6" width="18" height="23" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M12 6a4 4 0 0 1 8 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="18" cy="19" r="4.3" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M21.5 22.5L25 26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </Svg>
  )
}

function CalculatorIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="8" y="4" width="16" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <rect x="11" y="8" width="10" height="4" rx="1" fill="currentColor" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <circle key={`${row}-${col}`} cx={12 + col * 4} cy={17 + row * 4} r="1.3" fill="currentColor" />
        )),
      )}
    </Svg>
  )
}

function PrinterIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M11 8V4h10v4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <rect x="6" y="8" width="20" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <rect x="10" y="16" width="12" height="10" rx="1.5" fill="currentColor" />
    </Svg>
  )
}

// ---------------------------------------------------------------------------
// Flat illustrations for the two order cards (provisional, swappable).
// ---------------------------------------------------------------------------
function IniciarPedidoArt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 130 100" aria-hidden="true" className={className}>
      <rect x="78" y="54" width="40" height="34" rx="4" fill="#ff9f43" />
      <rect x="86" y="62" width="3" height="18" fill="#b45309" />
      <rect x="92" y="62" width="5" height="18" fill="#b45309" />
      <rect x="101" y="62" width="3" height="18" fill="#b45309" />
      <rect x="68" y="34" width="30" height="24" rx="4" fill="#feca57" />
      <circle cx="44" cy="26" r="13" fill="#7c5cff" />
      <path d="M26 92c0-17 8-29 18-29s18 12 18 29z" fill="#7c5cff" />
      <rect x="30" y="60" width="12" height="16" rx="6" fill="#6a49f2" />
      <circle cx="24" cy="70" r="5" fill="#ffcf9e" />
    </svg>
  )
}

function ControlArt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 130 100" aria-hidden="true" className={className}>
      <rect x="34" y="12" width="48" height="74" rx="7" fill="#fff" stroke="#4f8cff" strokeWidth="3.5" />
      <rect x="51" y="7" width="14" height="11" rx="3" fill="#4f8cff" />
      <path d="M43 36l3 3 6-6" fill="none" stroke="#1f9d9a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="57" y="34" width="17" height="4" rx="2" fill="#d1d5db" />
      <path d="M43 52l3 3 6-6" fill="none" stroke="#1f9d9a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="57" y="50" width="17" height="4" rx="2" fill="#d1d5db" />
      <path d="M43 68l3 3 6-6" fill="none" stroke="#1f9d9a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="57" y="66" width="17" height="4" rx="2" fill="#d1d5db" />
      <rect x="92" y="62" width="32" height="28" rx="4" fill="#ff9f43" />
      <rect x="4" y="66" width="24" height="24" rx="4" fill="#feca57" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------
function QuickAction({ icon, label }: { icon: ReactElement; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-[#1f9d9a] text-white shadow-sm">{icon}</span>
      <span className="text-xs font-medium leading-tight text-[#6b7280]">{label}</span>
    </div>
  )
}

function OrderCard({ title, art }: { title: string; art: ReactElement }) {
  return (
    <div className="flex items-center gap-2 rounded-[14px] bg-white p-5 shadow-sm">
      <div className="min-w-0 flex-1">
        <div className="mb-1 h-[3px] w-8 rounded bg-[#d1d5db]" />
        <p className="text-base font-bold uppercase leading-tight text-[#1b2a6b]">{title}</p>
      </div>
      {art}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Lar() {
  useEffect(() => {
    document.title = 'Practicas en LAR - Portfolio'
  }, [])

  return (
    <div className="h-dvh w-screen overflow-y-auto bg-[#f3f0fb]" style={{ fontFamily: POPPINS }}>
      <div className="flex min-h-full flex-col">
        {/* Header */}
        <header className="relative rounded-br-[64px] bg-[#1d3a9e] px-5 pb-16 pt-5 text-white">
          <div className="flex justify-end">
            <Link to="/" viewTransition aria-label="Cerrar sesión" className="transition-opacity hover:opacity-80">
              <span className="inline-flex" style={{ viewTransitionName: 'symbol' }}>
                <LogoutIcon className="h-6 w-6" />
              </span>
            </Link>
          </div>
          <p className="mt-1 text-center text-lg font-medium">Usuario de Prueba</p>
        </header>

        {/* Scan card, overlapping the header */}
        <div className="relative z-10 -mt-11 mx-4 flex items-center justify-between rounded-2xl bg-white p-5 shadow-md">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#9aa0b5]">ESCANEAR</p>
            <p className="text-3xl font-extrabold leading-tight text-[#1b2a6b]">PRODUCTOS</p>
          </div>
          <BarcodeIcon className="h-14 w-14 text-[#1b2a6b]" />
        </div>

        {/* Quick actions */}
        <div className="mt-8 grid grid-cols-3 gap-2 px-5">
          <QuickAction icon={<ConsultIcon className="h-8 w-8" />} label="Consultar productos" />
          <QuickAction icon={<CalculatorIcon className="h-8 w-8" />} label="Calculadora" />
          <QuickAction icon={<PrinterIcon className="h-8 w-8" />} label="Reimprimir etiquetas" />
        </div>

        {/* Orders */}
        <p className="mt-9 px-5 text-lg font-semibold text-[#1b2a6b]">Gestionar pedidos</p>
        <div className="mt-4 flex-1 space-y-4 px-5 pb-10">
          <OrderCard title="Iniciar pedido" art={<IniciarPedidoArt className="h-20 w-24 shrink-0" />} />
          <OrderCard title="Control" art={<ControlArt className="h-20 w-24 shrink-0" />} />
        </div>
      </div>
    </div>
  )
}
