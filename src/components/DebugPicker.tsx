import { useState, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'

interface Point {
  x: number
  y: number
}

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * Drag-to-measure tool, rendered only with `?debug`. Drag on the painting to
 * draw a box, then copy its percentages into `src/data/hotspots.ts`.
 */
export default function DebugPicker({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const [start, setStart] = useState<Point | null>(null)
  const [current, setCurrent] = useState<Point | null>(null)
  const [rect, setRect] = useState<Rect | null>(null)
  const [copied, setCopied] = useState(false)

  const toPercent = (event: ReactPointerEvent<HTMLDivElement>): Point | null => {
    const el = targetRef.current
    if (!el) return null
    const box = el.getBoundingClientRect()
    return {
      x: clamp(((event.clientX - box.left) / box.width) * 100, 0, 100),
      y: clamp(((event.clientY - box.top) / box.height) * 100, 0, 100),
    }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const point = toPercent(event)
    if (!point) return
    event.currentTarget.setPointerCapture(event.pointerId)
    setStart(point)
    setCurrent(point)
    setCopied(false)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!start) return
    const point = toPercent(event)
    if (point) setCurrent(point)
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!start || !current) return
    const point = toPercent(event) ?? current
    const next: Rect = {
      x: Math.min(start.x, point.x),
      y: Math.min(start.y, point.y),
      w: Math.abs(point.x - start.x),
      h: Math.abs(point.y - start.y),
    }
    setRect(next)
    setStart(null)
    setCurrent(null)
    const snippet = `{ x: ${next.x.toFixed(1)}, y: ${next.y.toFixed(1)}, w: ${next.w.toFixed(1)}, h: ${next.h.toFixed(1)} }`
    console.log(snippet)
  }

  const live = start && current ? {
    x: Math.min(start.x, current.x),
    y: Math.min(start.y, current.y),
    w: Math.abs(current.x - start.x),
    h: Math.abs(current.y - start.y),
  } : null
  const shown = live ?? rect

  const snippet = shown
    ? `{ x: ${shown.x.toFixed(1)}, y: ${shown.y.toFixed(1)}, w: ${shown.w.toFixed(1)}, h: ${shown.h.toFixed(1)} }`
    : null

  const copy = () => {
    if (!snippet) return
    navigator.clipboard.writeText(snippet).then(() => setCopied(true)).catch(() => setCopied(false))
  }

  return (
    <>
      <div
        className="absolute inset-0 z-40 cursor-crosshair"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {shown && (
          <div
            className="absolute border border-solid border-red-500 bg-red-500/25"
            style={{
              left: `${shown.x}%`,
              top: `${shown.y}%`,
              width: `${shown.w}%`,
              height: `${shown.h}%`,
            }}
          />
        )}
      </div>
      <div className="fixed bottom-4 left-4 z-50 max-w-[90vw] rounded border border-cream/30 bg-black/80 p-3 font-mono text-xs text-cream">
        <div className="mb-2 opacity-60">debug: drag on the painting</div>
        <code className="block break-all">{snippet ?? 'no selection'}</code>
        <button
          type="button"
          onClick={copy}
          disabled={!snippet}
          className="mt-2 rounded border border-cream/40 px-2 py-1 disabled:opacity-40"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </>
  )
}
