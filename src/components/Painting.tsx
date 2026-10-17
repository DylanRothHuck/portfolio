import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { hotspots } from '../data/hotspots'
import DebugPicker from './DebugPicker'
import Hotspot from './Hotspot'

const LEAVE_DELAY = 80

/**
 * Home page: the painting hanging in a frame, with nearly invisible hotspots.
 * The frame is sized so the whole painting is always visible at any aspect
 * ratio; the hotspots are positioned in percentages of the painting box.
 */
export default function Painting() {
  const location = useLocation()
  const debug = new URLSearchParams(location.search).has('debug')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [touchMode, setTouchMode] = useState(() => window.matchMedia('(hover: none)').matches)
  const leaveTimer = useRef<number | undefined>(undefined)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const query = window.matchMedia('(hover: none)')
    const onChange = () => setTouchMode(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const activate = useCallback((id: string) => {
    window.clearTimeout(leaveTimer.current)
    setActiveId(id)
  }, [])

  const deactivate = useCallback(() => {
    window.clearTimeout(leaveTimer.current)
    leaveTimer.current = window.setTimeout(() => setActiveId(null), LEAVE_DELAY)
  }, [])

  // Esc clears the active state.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const dimmed = activeId !== null

  return (
    <div className="relative flex h-dvh w-screen items-center justify-center">
      {/* Dims the brown frame margin (the painting itself dims below). */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-black/80 transition-opacity duration-300"
        style={{ opacity: dimmed ? 1 : 0 }}
      />

      <div
        ref={frameRef}
        className="painting-frame relative z-10"
        onPointerDown={() => {
          if (touchMode) setActiveId(null)
        }}
      >
        <img
          src="/painting.jpg"
          alt="Woman with a Parasol, Claude Monet (1875)"
          draggable="false"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full select-none object-cover"
        />

        {/* Recessed-canvas inner shadow. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.45), inset 0 0 40px rgba(0,0,0,.35)' }}
        />

        {/* Name, top-right. */}
        <div
          className="pointer-events-none absolute z-10 select-none text-right font-bold leading-[1.1] text-ink"
          style={{ top: '3.5%', right: '2.5%', fontSize: 'clamp(14px, 2.6vw, 34px)' }}
        >
          <div>Dylan Dalton</div>
          <div>Roth Huck</div>
        </div>



        {hotspots.map((hotspot) => (
          <Hotspot
            key={hotspot.id}
            hotspot={hotspot}
            active={activeId === hotspot.id}
            dimmed={dimmed}
            debug={debug}
            touchMode={touchMode}
            onActivate={activate}
            onDeactivate={deactivate}
          />
        ))}

        {/* Dims the painting so the active hotspot reads as lit above it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 bg-black/80 transition-opacity duration-300"
          style={{ opacity: dimmed ? 1 : 0 }}
        />

        {debug && <DebugPicker targetRef={frameRef} />}
      </div>
    </div>
  )
}
