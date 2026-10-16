import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { labelSide, type Hotspot as HotspotData } from '../data/hotspots'
import { symbols } from './symbolMap'

interface HotspotProps {
  hotspot: HotspotData
  active: boolean
  dimmed: boolean
  debug: boolean
  touchMode: boolean
  onActivate: (id: string) => void
  onDeactivate: () => void
}

export default function Hotspot({
  hotspot,
  active,
  dimmed,
  debug,
  touchMode,
  onActivate,
  onDeactivate,
}: HotspotProps) {
  const { id, title, symbol, href, x, y, w, h } = hotspot
  const Symbol = symbols[symbol]
  const side = labelSide(hotspot)

  const boxStyle: CSSProperties = {
    left: `${x}%`,
    top: `${y}%`,
    width: `${w}%`,
    height: `${h}%`,
  }

  // When active, paint the matching slice of the painting inside the box so the
  // area reads as "lit" above the dim overlay.
  if (active) {
    boxStyle.backgroundOrigin = 'border-box'
    boxStyle.backgroundSize = `${10000 / w}% ${10000 / h}%`
    boxStyle.backgroundPosition = `${(x / (100 - w)) * 100}% ${(y / (100 - h)) * 100}%`
  }

  const borderColor =
    active || debug ? 'rgba(228, 226, 207, 0.9)' : dimmed ? 'transparent' : 'rgba(255, 255, 255, 0.45)'

  const labelStyle: CSSProperties = {
    top: '50%',
    fontSize: 'clamp(14px, 1.6vw, 22px)',
  }
  if (side === 'left') {
    labelStyle.right = '100%'
    labelStyle.marginRight = '12px'
  } else {
    labelStyle.left = '100%'
    labelStyle.marginLeft = '12px'
  }

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    // Debug mode: keep the boxes visible but disable navigation.
    if (debug) {
      event.preventDefault()
      return
    }
    // Touch: first tap reveals, second tap navigates (Link handles the rest).
    if (touchMode && !active) {
      event.preventDefault()
      onActivate(id)
    }
  }

  return (
    <Link
      to={href}
      viewTransition
      onClick={handleClick}
      onPointerEnter={() => {
        if (!touchMode) onActivate(id)
      }}
      onPointerLeave={onDeactivate}
      onFocus={() => onActivate(id)}
      onBlur={onDeactivate}
      aria-label={title}
      className={[
        'absolute block outline-none',
        active ? 'hotspot-window z-40' : 'z-20',
        'focus-visible:ring-2 focus-visible:ring-cream',
      ].join(' ')}
      style={boxStyle}
    >
      {/* Border on its own layer so its overlay blend does not affect the symbol. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-2 border-dashed"
        style={{ borderColor, mixBlendMode: !active && !debug && !dimmed ? 'overlay' : 'normal' }}
      />

      {/* Transparent hit area so small boxes stay tappable (>= 44x44). */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 'max(100%, 44px)', height: 'max(100%, 44px)' }}
      />

      {active && <span aria-hidden="true" className="absolute inset-0 bg-black/55" />}

      {/* Symbol: faint at rest, fully revealed when active. */}
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 text-cream transition-opacity duration-300',
          active ? 'opacity-100' : 'opacity-30',
        ].join(' ')}
        style={active ? { viewTransitionName: 'symbol' } : undefined}
      >
        <span className={['block h-full w-full', active ? 'symbol-in' : ''].join(' ')}>
          <Symbol className="h-full w-full" />
        </span>
      </span>

      {active && (
        <span
          className={`pointer-events-none absolute whitespace-nowrap font-semibold text-cream ${
            side === 'left' ? 'label-in-left' : 'label-in-right'
          }`}
          style={labelStyle}
        >
          {title}
        </span>
      )}

      {debug && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 px-1 text-[10px] leading-tight text-cream">
          {id}
        </span>
      )}
    </Link>
  )
}
