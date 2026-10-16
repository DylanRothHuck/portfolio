import { Link } from 'react-router-dom'
import type { SymbolName } from '../data/hotspots'
import { symbols } from './symbolMap'

interface BackToPaintingProps {
  symbol: SymbolName
  className?: string
  symbolClassName?: string
  label?: string
  showLabel?: boolean
}

/**
 * Shared "return" control on inner pages. The symbol carries the `symbol` view
 * transition name so it morphs back into the hotspot it came from.
 */
export default function BackToPainting({
  symbol,
  className,
  symbolClassName = 'h-8 w-8',
  label = 'Back to the painting',
  showLabel = true,
}: BackToPaintingProps) {
  const Symbol = symbols[symbol]
  return (
    <Link to="/" viewTransition aria-label={label} className={className}>
      <span
        className={`inline-flex shrink-0 items-center justify-center ${symbolClassName}`}
        style={{ viewTransitionName: 'symbol' }}
      >
        <Symbol className="h-full w-full" />
      </span>
      {showLabel ? <span>{label}</span> : <span className="sr-only">{label}</span>}
    </Link>
  )
}
