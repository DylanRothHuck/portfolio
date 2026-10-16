import { useEffect, useMemo, useState } from 'react'
import BackToPainting from '../components/BackToPainting'
import { averages, courseStatus, degree, subjects, type Subject } from '../data/academic'

const YEARS = [1, 2, 3, 4, 5]

const CARD_COLORS = ['#2b8a8a', '#1f6f8b', '#2e8b57', '#3b6fb6', '#6a4fb6', '#b65f3b', '#8a8a2b', '#4f7a4f']

const MOODLE_BTN =
  'rounded border border-[#3a6ea5] px-3 py-2 text-sm text-[#cdd6ea]'

/** Accent-insensitive lowercase, so "algebra" matches "Álgebra". */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function cardColor(subject: Subject): string {
  return CARD_COLORS[Number(subject.code) % CARD_COLORS.length]
}

function gradeClass(grade?: number): string {
  if (grade == null) return 'bg-[#3a3a3a] text-[#d5d5d5]'
  if (grade >= 10) return 'bg-[#1f7a3d] text-white'
  if (grade >= 9) return 'bg-[#2f8f6b] text-white'
  if (grade >= 8) return 'bg-[#2f6f9f] text-white'
  if (grade >= 7) return 'bg-[#9a7b1f] text-white'
  return 'bg-[#8a5a2b] text-white'
}

function result(subject: Subject): { text: string; className: string } {
  if (subject.grade != null) {
    return { text: `${subject.grade} - ${subject.concept}`, className: gradeClass(subject.grade) }
  }
  return { text: subject.status ?? '-', className: gradeClass(undefined) }
}

/**
 * "Sobre mi": the academic record, styled after the UAP Campus Virtual (Moodle
 * "klass" theme) course page: dark navy top bar, gold "Campus Virtual" band, the
 * "Vista general" card with outline controls, course cards, and the UAP footer.
 */
export default function About() {
  const [query, setQuery] = useState('')
  const [year, setYear] = useState<'all' | number>('all')

  useEffect(() => {
    document.title = 'Sobre mi - Portfolio'
  }, [])

  const filtered = useMemo(() => {
    const needle = normalize(query.trim())
    return subjects.filter(
      (subject) =>
        (year === 'all' || subject.year === year) &&
        (needle === '' || normalize(subject.name).includes(needle) || subject.code.includes(needle)),
    )
  }, [query, year])

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-[#121212] font-sans text-[#e6e6e6]">
      {/* Top bar. */}
      <header className="flex items-center justify-between bg-[#16233f] text-[#cdd6ea]">
        <nav className="flex text-sm">
          <span className="px-4 py-3 opacity-90">Página Principal</span>
          <span className="px-4 py-3 opacity-90">Área personal</span>
          <span className="bg-[#0e1930] px-4 py-3 font-semibold text-white">Mis cursos</span>
        </nav>
        <div className="flex items-center gap-4 pr-4">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.4-8.5 8.5 8.5 0 0 1 8.6 8.5z" />
          </svg>
          <BackToPainting
            symbol="drh"
            showLabel={false}
            label="Volver al cuadro"
            symbolClassName="h-9 w-9 rounded-full bg-[#2a3c5e] p-1.5"
            className="inline-flex items-center"
          />
        </div>
      </header>

      {/* Gold "Campus Virtual" band. */}
      <div className="flex items-center justify-between bg-[#c8a400] px-6 py-3 text-[#141414]">
        <div className="flex items-center gap-3">
          <span className="border-2 border-[#141414] px-1.5 py-0.5 text-sm font-bold tracking-wide">UAP</span>
          <span className="font-serif text-2xl font-bold">Campus Virtual</span>
        </div>
        <span className="hidden text-sm sm:block">Español - Internacional (es)</span>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-8">
          <h1 className="mb-5 font-serif text-3xl font-bold">Sobre mi</h1>

          {/* Summary card. */}
          <section className="rounded border border-[#2c2c2c] bg-[#1b1b1b] p-5">
            <h2 className="font-serif text-lg font-semibold">Ficha Académica</h2>
            <hr className="my-3 border-[#2c2c2c]" />
            <p className="mb-5 text-sm text-[#9a9a9a]">{degree}</p>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-xs uppercase tracking-[0.15em] text-[#9a9a9a]">Estado de las materias</h3>
                <ul className="grid grid-cols-2 gap-1.5 text-sm sm:grid-cols-3">
                  {courseStatus.map((item) => (
                    <li key={item.label} className="flex items-center justify-between gap-2 rounded bg-[#242424] px-2.5 py-1.5">
                      <span className="text-[#c9c9c9]">{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-xs uppercase tracking-[0.15em] text-[#9a9a9a]">Promedios</h3>
                <ul className="space-y-1.5 text-sm">
                  {averages.map((item) => (
                    <li key={item.label} className="flex items-center justify-between gap-2 rounded bg-[#242424] px-3 py-2">
                      <span className="text-[#c9c9c9]">{item.label}</span>
                      <span>
                        <span className="text-[#9a9a9a]">{item.subjects} materias</span>
                        <span className="mx-2 text-[#6a6a6a]">·</span>
                        <span className="font-semibold">{item.average.toFixed(2)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Course overview card. */}
          <section className="mt-6 rounded border border-[#2c2c2c] bg-[#1b1b1b] p-5">
            <h2 className="font-serif text-lg font-semibold">Vista general de materias</h2>
            <hr className="my-3 border-[#2c2c2c]" />

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <select
                value={year}
                onChange={(event) => setYear(event.target.value === 'all' ? 'all' : Number(event.target.value))}
                aria-label="Filtrar por año"
                className={`${MOODLE_BTN} bg-transparent outline-none focus:border-[#5a8ec5]`}
              >
                <option value="all">Todos</option>
                {YEARS.map((value) => (
                  <option key={value} value={value}>
                    {value}° Año
                  </option>
                ))}
              </select>

              <div className="relative min-w-[180px] flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar"
                  aria-label="Buscar materia"
                  className={`${MOODLE_BTN} w-full bg-transparent pr-8 outline-none placeholder:text-[#8a8a8a] focus:border-[#5a8ec5]`}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8a8a8a] hover:text-[#cdd6ea]"
                  >
                    ×
                  </button>
                )}
              </div>

              <span className={`${MOODLE_BTN} opacity-70`} aria-hidden="true">Ordenar por nombre del curso</span>
              <span className={`${MOODLE_BTN} opacity-70`} aria-hidden="true">Tarjeta</span>
            </div>

            <p className="mb-4 text-xs text-[#9a9a9a]">{filtered.length} materias</p>

            {YEARS.map((value) => {
              const items = filtered.filter((subject) => subject.year === value)
              if (items.length === 0) return null
              return (
                <div key={value} className="mb-8">
                  <h3 className="mb-3 font-serif text-xl font-semibold">{value}° Año</h3>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((subject) => {
                      const badge = result(subject)
                      return (
                        <article key={subject.code} className="overflow-hidden rounded border border-[#2c2c2c] bg-[#1b1b1b]">
                          <div className="h-16 w-full" style={{ backgroundColor: cardColor(subject) }} />
                          <div className="p-3">
                            <h4 className="text-sm font-semibold leading-snug">{subject.name} - (Campus)</h4>
                            <p className="mt-1 text-[11px] text-[#9a9a9a]">
                              {subject.year}° Año · {subject.period} · {subject.code}
                            </p>
                            <div className="mt-3 flex items-center justify-between gap-2">
                              <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${badge.className}`}>
                                {badge.text}
                              </span>
                              <div className="flex items-center gap-2">
                                {subject.modality && <span className="text-[11px] text-[#9a9a9a]">{subject.modality}</span>}
                                <button
                                  type="button"
                                  aria-label={`Acciones de ${subject.name}`}
                                  className="rounded-full bg-[#2a3c5e] p-1.5 text-[#cdd6ea]"
                                >
                                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                                    <circle cx="12" cy="5" r="1.6" />
                                    <circle cx="12" cy="12" r="1.6" />
                                    <circle cx="12" cy="19" r="1.6" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {filtered.length === 0 && (
              <p className="text-sm text-[#9a9a9a]">No hay materias que coincidan con la búsqueda.</p>
            )}
          </section>
        </div>

        {/* Footer. */}
        <footer className="mt-4 border-t border-[#2c2c2c] bg-[#0e0e0e] px-6 py-8 text-xs text-[#9a9a9a]">
          <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-3">
            <div>
              <p className="mb-3 font-serif text-lg font-bold text-white">UAP</p>
              <p>
                La UAP (Universidad Adventista del Plata) es una institución de educación superior ubicada en
                25 de Mayo 99 - (3103) Libertador San Martín, Entre Ríos, Argentina.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-white">Enlaces</h3>
              <ul className="space-y-1">
                <li>Sobre la UAP</li>
                <li>Ingreso</li>
                <li>Alumnos</li>
                <li>Tutoriales</li>
                <li>Documentos de Moodle</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-white">Contacto</h3>
              <p>25 de Mayo 99</p>
              <p>(0343) 4918000</p>
              <p>informes@uap.edu.ar</p>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-[1100px] border-t border-[#242424] pt-4">
            Dylan Dalton ROTH HUCK · Copyright © 2017 - Desarrollo Web UAP. Creado para Moodle
          </p>
        </footer>
      </main>

      {/* Floating help button. */}
      <button
        type="button"
        aria-label="Ayuda"
        className="fixed bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#2a6fb0] text-lg font-bold text-white shadow-lg"
      >
        ?
      </button>
    </div>
  )
}
