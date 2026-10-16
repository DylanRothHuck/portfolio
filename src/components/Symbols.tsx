import type { ReactElement } from 'react'
import drhIcon from '../assets/icons/drh.png'
import larIcon from '../assets/icons/LAR.png'
import reinoIcon from '../assets/icons/Reino.png'
import rothexIcon from '../assets/icons/rothex.png'
import tonnutiIcon from '../assets/icons/Tonutti.png'

export interface SymbolProps {
  className?: string
}

// PNG emblems (white-on-transparent, so they read on the dark dim). `object-contain`
// keeps their aspect ratio inside whatever box the caller sizes.
function Icon({ src, className }: { src: string; className?: string }): ReactElement {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable="false"
      className={`block object-contain ${className ?? ''}`}
    />
  )
}

export function LarSymbol({ className }: SymbolProps): ReactElement {
  return <Icon src={larIcon} className={className} />
}

export function RothexSymbol({ className }: SymbolProps): ReactElement {
  return <Icon src={rothexIcon} className={className} />
}

export function TonnutiSymbol({ className }: SymbolProps): ReactElement {
  return <Icon src={tonnutiIcon} className={className} />
}

export function DrhSymbol({ className }: SymbolProps): ReactElement {
  return <Icon src={drhIcon} className={className} />
}

export function ReinoSymbol({ className }: SymbolProps): ReactElement {
  return <Icon src={reinoIcon} className={className} />
}
