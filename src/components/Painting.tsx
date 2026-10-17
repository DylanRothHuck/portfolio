import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { hotspots } from '../data/hotspots'
import DebugPicker from './DebugPicker'
import Hotspot from './Hotspot'

const LEAVE_DELAY = 80

/**
 * Home page: the painting hanging in a frame, with nearly invisible hotspots.
 * The frame fills the viewport width on wide screens (scrolling vertically for
 * the rest) and covers the screen on phones (clipping the sides); hotspots are
 * positioned in percentages of the painting box and nudged into view.
 */
export default function Painting() {
  const location = useLocation()
  const debug = new URLSearchParams(location.search).has('debug')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [touchMode, setTouchMode] = useState(() => window.matchMedia('(hover: none)').matches)
  const leaveTimer = useRef<number | undefined>(undefined)
  const frameRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // On phones the painting covers the screen, so it is wider than the viewport
  // and its sides are clipped. Measure the visible slice (as percentages of the
  // painting) so hotspots that fall outside it can be nudged back into view.
  const [visible, setVisible] = useState({ left: 0, right: 100 })

  useEffect(() => {
    const frame = frameRef.current
    const scroll = scrollRef.current
    if (!frame || !scroll) return
    const measure = () => {
      const frameWidth = frame.getBoundingClientRect().width
      const viewportWidth = scroll.clientWidth
      if (!frameWidth || !viewportWidth) return
      const fraction = Math.min(1, viewportWidth / frameWidth)
      const left = ((1 - fraction) / 2) * 100
      setVisible((prev) => (prev.left === left ? prev : { left, right: 100 - left }))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    observer.observe(scroll)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

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
    <div ref={scrollRef} className="relative h-dvh w-full overflow-x-hidden overflow-y-auto">
      {/* Dims the brown frame margin (the painting itself dims below). */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-black/80 transition-opacity duration-300"
        style={{ opacity: dimmed ? 1 : 0 }}
      />

      <div className="flex min-h-full w-full justify-center" style={{ padding: 'var(--frame-m)' }}>
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

          {/* Name: top-right on wide screens; centered on phones, where the
              painting covers the screen and its right edge is clipped away. */}
          <div
            className="pointer-events-none absolute left-1/2 top-[3.5%] z-10 -translate-x-1/2 select-none text-center font-bold leading-[1.1] text-ink sm:left-auto sm:right-[2.5%] sm:translate-x-0 sm:text-right"
            style={{ fontSize: 'clamp(14px, 4vw, 110px)' }}
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
              visibleLeft={visible.left}
              visibleRight={visible.right}
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
    </div>
  )
}
