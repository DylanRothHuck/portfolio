import { useEffect, useState, type ReactElement, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import tonnutiIcon from '../assets/icons/Tonutti.png'

// Recreates the AdminLTE 3 app shell of the "Tonutti Planta" system (Source Sans
// Pro, dark #343a40 sidebar, white navbar, #f4f6f9 content). The sidebar mirrors
// the real app menu; the content area tells the project's story.

const ADMINLTE_FONT = "'Source Sans Pro', ui-sans-serif, system-ui, sans-serif"

const NAV_SECTIONS = ['inicio', 'el-proyecto', 'el-equipo', 'tecnologias', 'desafios', 'capturas', 'contacto'] as const

const SECONDARY = ['aprendi-tecnico', 'aprendi-blandas'] as const
type SubSectionId = (typeof SECONDARY)[number]

const ALL_IDS: string[] = [...NAV_SECTIONS, ...SECONDARY]

const TITLES: Record<string, string> = {
  inicio: 'Inicio',
  'el-proyecto': 'El proyecto',
  'el-equipo': 'El equipo',
  'aprendi-tecnico': 'Técnico',
  'aprendi-blandas': 'Trabajo en equipo',
  tecnologias: 'Tecnologías',
  desafios: 'Desafíos',
  capturas: 'Capturas',
  contacto: 'Contacto',
}

// ---------------------------------------------------------------------------
// Inline icons (Font Awesome stand-ins).
// ---------------------------------------------------------------------------
type IconProps = { className?: string }

function Icon({ children, className }: { children: ReactNode; className?: string }): ReactElement {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      {children}
    </svg>
  )
}

function BarsIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  )
}

function ExpandIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path
        d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

function GridIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
      <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" />
    </Icon>
  )
}

function SignOutIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M15 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 17l5-5-5-5M15 12H3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

function CircleIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
    </Icon>
  )
}

function UserIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path d="M4 20c1.6-3.6 4.6-5 8-5s6.4 1.4 8 5z" fill="currentColor" />
    </Icon>
  )
}

function HomeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" fill="currentColor" />
    </Icon>
  )
}

function IndustryIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M3 21V11l6 4V11l6 4V6h3v15z" fill="currentColor" />
    </Icon>
  )
}

function UsersIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="9" cy="8" r="3.2" fill="currentColor" />
      <path d="M3 19c1.2-3 3.6-4.2 6-4.2s4.8 1.2 6 4.2z" fill="currentColor" />
      <circle cx="17" cy="8" r="2.4" fill="currentColor" opacity="0.75" />
      <path d="M15.5 14.5c2.2.2 4 1.4 4.9 4.5h-3.6" fill="currentColor" opacity="0.75" />
    </Icon>
  )
}

function GraduationIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 4L2 9l10 5 8-4v6h2V9z" fill="currentColor" />
      <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </Icon>
  )
}

function CodeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

function MountainIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M2 20L9 7l4 7 2-3 7 9z" fill="currentColor" />
    </Icon>
  )
}

function ImagesIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="5" width="14" height="14" rx="2" fill="currentColor" />
      <path d="M7 15l3-3 2 2 3-4 3 5z" fill="#f4f6f9" />
      <rect x="7" y="3" width="14" height="14" rx="2" fill="currentColor" opacity="0.5" />
    </Icon>
  )
}

function EnvelopeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" />
      <path d="M4 6l8 6 8-6" fill="none" stroke="#f4f6f9" strokeWidth="2" />
    </Icon>
  )
}

function ChevronIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

// ---------------------------------------------------------------------------
// Editable content.
// ---------------------------------------------------------------------------
const content = {
  user: 'dylan.roth',
  intro: 'Sistema de gestión para Lácteos Tonutti, desarrollado en equipo para la materia Informática Aplicada.',
  projectProblem: 'La planta necesitaba gestionar productos, menús, funciones, operarios y reportes de forma ordenada y centralizada.',
  projectModules: ['ABM de productos', 'ABM de menú', 'ABM de funciones', 'ABM de operarios', 'Reportes'],
  team: [
    { name: 'Dylan Roth', role: 'Desarrollo', contribution: 'TODO: describir el aporte al proyecto.' },
  ],
  technical: ['CRUD / ABM completos con base de datos', 'Usuarios, roles y permisos por menú', 'Armado de reportes'],
  soft: 'Comunicación con el cliente, reparto de tareas, control de versiones y resolución de conflictos.',
  tech: ['AdminLTE 3', 'Bootstrap 4', 'JavaScript', 'Base de datos'],
  challenges: [
    { problem: 'TODO: desafío 1', tried: 'TODO: qué probamos', outcome: 'TODO: resultado' },
    { problem: 'TODO: desafío 2', tried: 'TODO: qué probamos', outcome: 'TODO: resultado' },
  ],
  screenshots: [
    { src: '/img/captura-1.png', caption: 'TODO: descripción de la pantalla' },
    { src: '/img/captura-2.png', caption: 'TODO: descripción de la pantalla' },
  ],
  contact: { email: 'tu@email.com', linkedin: '#', github: '#' },
}

// ---------------------------------------------------------------------------
// Layout primitives (AdminLTE look).
// ---------------------------------------------------------------------------
function Card({ title, children, footer }: { title?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="rounded border border-black/10 bg-white shadow-sm">
      {title ? (
        <div className="border-b border-black/10 px-4 py-3">
          <h3 className="text-lg font-normal text-[#212529]">{title}</h3>
        </div>
      ) : null}
      <div className="px-4 py-4 text-[#212529]">{children}</div>
      {footer ? <div className="border-t border-black/10 px-4 py-3 text-sm text-[#6c757d]">{footer}</div> : null}
    </div>
  )
}

function Badge({ children, tone = 'primary' }: { children: ReactNode; tone?: 'primary' | 'info' | 'secondary' | 'success' }) {
  const tones = {
    primary: 'bg-[#007bff]',
    info: 'bg-[#17a2b8]',
    secondary: 'bg-[#6c757d]',
    success: 'bg-[#28a745]',
  }
  return <span className={`mr-1 mb-1 inline-block rounded px-2 py-1 text-sm text-white ${tones[tone]}`}>{children}</span>
}

// ---------------------------------------------------------------------------
// Page.
// ---------------------------------------------------------------------------
export default function Tonutti() {
  const [active, setActive] = useState<string>('inicio')
  const [adminOpen, setAdminOpen] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.title = 'Tonnuti Planta - Portfolio'
    const apply = () => {
      const id = window.location.hash.replace('#', '')
      if (ALL_IDS.includes(id)) {
        setActive(id)
        if (SECONDARY.includes(id as SubSectionId)) setAdminOpen(true)
      }
    }
    apply()
    window.addEventListener('hashchange', apply)
    window.addEventListener('popstate', apply)
    return () => {
      window.removeEventListener('hashchange', apply)
      window.removeEventListener('popstate', apply)
    }
  }, [])

  const go = (id: string) => {
    window.history.pushState(null, '', `#${id}`)
    setActive(id)
    if (SECONDARY.includes(id as SubSectionId)) setAdminOpen(true)
    setSidebarOpen(false)
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen()
  }

  const navLink = (id: string, label: string, icon: ReactElement) => {
    const isActive = active === id
    return (
      <li className="nav-item">
        <button
          type="button"
          onClick={() => go(id)}
          className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
            isActive ? 'bg-[#494e53] text-white' : 'text-[#c2c7d0] hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="grid w-6 shrink-0 place-items-center">{icon}</span>
          <span>{label}</span>
        </button>
      </li>
    )
  }

  const title = TITLES[active] ?? 'Inicio'

  return (
    <div
      className="flex h-dvh w-screen overflow-hidden bg-[#f4f6f9] text-[#212529]"
      style={{ fontFamily: ADMINLTE_FONT }}
    >
      {/* Mobile backdrop */}
      {sidebarOpen ? (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      ) : null}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 shrink-0 flex-col overflow-y-auto bg-[#343a40] transition-transform md:static md:z-auto md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <Link to="/" viewTransition className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#21262b] p-1"
            style={{ viewTransitionName: 'symbol' }}
          >
            <img src={tonnutiIcon} alt="" className="h-full w-full object-contain" />
          </span>
          <span className="text-lg font-light text-[#c2c7d0]">Tonutti Planta</span>
        </Link>

        {/* User panel */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <UserIcon className="h-6 w-6 text-white" />
          <span className="text-sm text-[#c2c7d0]">{content.user}</span>
        </div>

        {/* Nav */}
        <nav className="py-2">
          <ul>
            {navLink('inicio', 'Inicio', <HomeIcon className="h-4 w-4" />)}
            {navLink('el-proyecto', 'El proyecto', <IndustryIcon className="h-4 w-4" />)}
            {navLink('el-equipo', 'El equipo', <UsersIcon className="h-4 w-4" />)}

            {/* Collapsible group "Lo que aprendí" */}
            <li className="nav-item">
              <button
                type="button"
                onClick={() => setAdminOpen((value) => !value)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                  SECONDARY.includes(active as SubSectionId)
                    ? 'bg-[#494e53] text-white'
                    : 'text-[#c2c7d0] hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="grid w-6 shrink-0 place-items-center">
                  <GraduationIcon className="h-4 w-4" />
                </span>
                <span className="flex-1">Lo que aprendí</span>
                <ChevronIcon className={`h-4 w-4 transition-transform ${adminOpen ? 'rotate-90' : ''}`} />
              </button>
              {adminOpen ? (
                <ul className="bg-black/15 pl-4">
                  <li>
                    <button
                      type="button"
                      onClick={() => go('aprendi-tecnico')}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                        active === 'aprendi-tecnico' ? 'text-white' : 'text-[#c2c7d0] hover:text-white'
                      }`}
                    >
                      <CircleIcon className="h-3 w-3" />
                      <span>Técnico</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => go('aprendi-blandas')}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                        active === 'aprendi-blandas' ? 'text-white' : 'text-[#c2c7d0] hover:text-white'
                      }`}
                    >
                      <CircleIcon className="h-3 w-3" />
                      <span>Trabajo en equipo</span>
                    </button>
                  </li>
                </ul>
              ) : null}
            </li>

            {navLink('tecnologias', 'Tecnologías', <CodeIcon className="h-4 w-4" />)}
            {navLink('desafios', 'Desafíos', <MountainIcon className="h-4 w-4" />)}
            {navLink('capturas', 'Capturas', <ImagesIcon className="h-4 w-4" />)}
            {navLink('contacto', 'Contacto', <EnvelopeIcon className="h-4 w-4" />)}
          </ul>
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top navbar */}
        <nav className="flex shrink-0 items-center justify-between border-b border-[#dee2e6] bg-white px-4 py-2">
          <button
            type="button"
            onClick={() => setSidebarOpen((value) => !value)}
            aria-label="Menú"
            className="text-[#6c757d] hover:text-[#343a40]"
          >
            <BarsIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-5 text-[#6c757d]">
            <button type="button" onClick={toggleFullscreen} aria-label="Pantalla completa" className="hover:text-[#343a40]">
              <ExpandIcon className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Módulos" className="hover:text-[#343a40]">
              <GridIcon className="h-5 w-5" />
            </button>
            <Link to="/" viewTransition aria-label="Volver al cuadro" className="hover:text-[#343a40]">
              <SignOutIcon className="h-5 w-5" />
            </Link>
          </div>
        </nav>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Content header */}
          <div className="flex flex-col gap-1 border-b border-[#dee2e6] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <h1 className="text-2xl font-normal text-[#1f2d3d]">{title}</h1>
            <ol className="flex items-center gap-2 text-sm text-[#6c757d]">
              <li>
                <button type="button" onClick={() => go('inicio')} className="text-[#007bff] hover:underline">
                  Home
                </button>
              </li>
              <li className="text-[#6c757d]">/</li>
              <li className="text-[#6c757d]">{title}</li>
            </ol>
          </div>

          {/* Content body */}
          <div className="space-y-4 p-4 sm:p-6">
            {active === 'inicio' ? (
              <>
                <Card title="Sistema de gestión para Lácteos Tonutti">
                  <p>{content.intro}</p>
                  <p className="mt-2 text-[#6c757d]">Usá el menú de la izquierda para recorrer el proyecto.</p>
                </Card>
              </>
            ) : null}

            {active === 'el-proyecto' ? (
              <Card title="¿Qué problema resolvía?">
                <p>{content.projectProblem}</p>
                <p className="mt-3 font-semibold">Módulos construidos</p>
                <ul className="mt-1 list-disc pl-5">
                  {content.projectModules.map((module) => (
                    <li key={module}>{module}</li>
                  ))}
                </ul>
              </Card>
            ) : null}

            {active === 'el-equipo' ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.team.map((member) => (
                  <div key={member.name} className="rounded border border-black/10 bg-white p-6 text-center shadow-sm">
                    <UserIcon className="mx-auto mb-2 h-12 w-12 text-[#6c757d]" />
                    <h3 className="text-lg font-normal">{member.name}</h3>
                    <p className="text-sm text-[#6c757d]">{member.role}</p>
                    <p className="mt-2 text-sm">{member.contribution}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {active === 'aprendi-tecnico' ? (
              <Card title="Aprendizajes técnicos">
                <ul className="list-disc pl-5">
                  {content.technical.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            ) : null}

            {active === 'aprendi-blandas' ? (
              <Card title="Trabajar en equipo">
                <p>{content.soft}</p>
              </Card>
            ) : null}

            {active === 'tecnologias' ? (
              <Card title="Stack utilizado">
                {content.tech.map((tech, index) => (
                  <Badge key={tech} tone={(['primary', 'info', 'secondary', 'success'] as const)[index % 4]}>
                    {tech}
                  </Badge>
                ))}
              </Card>
            ) : null}

            {active === 'desafios' ? (
              <div className="space-y-4">
                {content.challenges.map((challenge, index) => (
                  <Card key={index} title={`Desafío ${index + 1}`}>
                    <p>
                      <span className="font-semibold">Problema:</span> {challenge.problem}
                    </p>
                    <p className="mt-1">
                      <span className="font-semibold">Qué probamos:</span> {challenge.tried}
                    </p>
                    <p className="mt-1">
                      <span className="font-semibold">Resultado:</span> {challenge.outcome}
                    </p>
                  </Card>
                ))}
              </div>
            ) : null}

            {active === 'capturas' ? (
              <div className="grid gap-4 md:grid-cols-2">
                {content.screenshots.map((shot, index) => (
                  <div key={index} className="overflow-hidden rounded border border-black/10 bg-white shadow-sm">
                    <img src={shot.src} alt={shot.caption} className="h-auto w-full border-b border-black/10 bg-[#e9ecef]" />
                    <div className="px-4 py-3 text-sm">{shot.caption}</div>
                  </div>
                ))}
              </div>
            ) : null}

            {active === 'contacto' ? (
              <Card title="Contacto">
                <p className="flex items-center gap-2">
                  <EnvelopeIcon className="h-4 w-4 text-[#6c757d]" />
                  <a href={`mailto:${content.contact.email}`} className="text-[#007bff] hover:underline">
                    {content.contact.email}
                  </a>
                </p>
                <p className="mt-2 flex items-center gap-2">
                  <span className="text-[#6c757d]">in</span>
                  <a href={content.contact.linkedin} className="text-[#007bff] hover:underline">
                    LinkedIn
                  </a>
                </p>
                <p className="mt-2 flex items-center gap-2">
                  <CodeIcon className="h-4 w-4 text-[#6c757d]" />
                  <a href={content.contact.github} className="text-[#007bff] hover:underline">
                    GitHub
                  </a>
                </p>
              </Card>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 items-center justify-between border-t border-[#dee2e6] bg-white px-4 py-3 text-sm text-[#869099] sm:px-6">
          <span>
            Copyright © 2024{' '}
            <a href="#inicio" onClick={() => go('inicio')} className="text-[#007bff] hover:underline">
              Lácteos Tonutti
            </a>
            . Proyecto de portfolio.
          </span>
          <span className="hidden font-semibold text-[#6c757d] sm:inline">Version 1.0</span>
        </footer>
      </div>
    </div>
  )
}
