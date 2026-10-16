import type { ReactElement } from 'react'
import type { SymbolName } from '../data/hotspots'
import { DrhSymbol, LarSymbol, ReinoSymbol, RothexSymbol, TonnutiSymbol, type SymbolProps } from './Symbols'

// Kept out of Symbols.tsx so that file only exports components (fast refresh).
export const symbols: Record<SymbolName, (props: SymbolProps) => ReactElement> = {
  lar: LarSymbol,
  rothex: RothexSymbol,
  reino: ReinoSymbol,
  tonnuti: TonnutiSymbol,
  drh: DrhSymbol,
}
