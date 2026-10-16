import { useEffect, useState } from 'react'
import BackToPainting from '../components/BackToPainting'

// All editable content lives here so the layout below never needs touching.
const content = {
  host: 'lar@lab:~',
  tree: ['about.md', 'projects/', '  proyecto-01/', '  proyecto-02/', 'stack.txt'],
  script: [
    { cmd: 'whoami', out: ['practicante@lar'] },
    { cmd: 'cat experience.txt', out: ['Practicas en LAR', 'TODO: replace with real content'] },
    { cmd: 'ls projects/', out: ['proyecto-01/  proyecto-02/  README.md'] },
  ],
}

const PROMPT = 'lar@lab:~$ '

const fullText =
  content.script
    .map((step) => [`${PROMPT}${step.cmd}`, ...step.out].join('\n'))
    .join('\n') + '\n'

/**
 * "Practicas en LAR": a simulated terminal / lab environment. Deliberately a
 * different visual language from the painting page.
 */
export default function Lar() {
  const [count, setCount] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? fullText.length
      : 0,
  )
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    document.title = 'Practicas en LAR - Portfolio'
  }, [])

  useEffect(() => {
    if (count >= fullText.length) return
    const id = window.setInterval(() => {
      setCount((value) => {
        const next = value + 1
        if (next >= fullText.length) window.clearInterval(id)
        return next
      })
    }, 18)
    return () => window.clearInterval(id)
  }, [count])

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-[#0e1411] font-mono text-[#cfe3d4]">
      {/* Window-style status bar. */}
      <header className="flex items-center justify-between gap-4 border-b border-[#1f2b24] bg-[#111a15] px-4 py-2 text-xs">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#e05f5f]" />
            <span className="h-3 w-3 rounded-full bg-[#e0c15f]" />
            <span className="h-3 w-3 rounded-full bg-[#6fbf73]" />
          </span>
          <span className="opacity-80">{content.host}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="tabular-nums opacity-60">{now.toLocaleTimeString()}</span>
          <BackToPainting
            symbol="lar"
            symbolClassName="h-5 w-5"
            label="Back to painting"
            className="inline-flex items-center gap-2 text-[#8fd6a5] transition-opacity hover:opacity-75"
          />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* File tree. */}
        <aside className="shrink-0 border-b border-[#1f2b24] p-4 text-sm md:w-64 md:border-b-0 md:border-r">
          <div className="mb-3 text-[10px] uppercase tracking-[0.2em] opacity-50">files</div>
          <ul className="space-y-1">
            {content.tree.map((entry) => (
              <li key={entry} className="whitespace-pre opacity-85">
                {entry}
              </li>
            ))}
          </ul>
        </aside>

        {/* Terminal pane. */}
        <main className="min-h-0 flex-1 overflow-y-auto p-4 text-sm leading-relaxed">
          <pre className="whitespace-pre-wrap break-words">
            {fullText.slice(0, count)}
            <span className="ml-0.5 inline-block animate-pulse">_</span>
          </pre>
        </main>
      </div>
    </div>
  )
}
