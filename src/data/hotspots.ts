export type SymbolName = 'lar' | 'rothex' | 'reino' | 'tonnuti' | 'drh'

export interface Hotspot {
  id: string
  title: string
  symbol: SymbolName
  href: string
  /** Percentages of the painting box (0-100). */
  x: number
  y: number
  w: number
  h: number
}

// Single source of truth for the hotspots on the painting.
// Adding a project = one new object here (+ optionally a page component).
export const hotspots: Hotspot[] = [
  {
    id: 'lar',
    title: 'Practicas en LAR',
    symbol: 'lar',
    href: '/lar',
    x: 52.9,
    y: 13.4,
    w: 14.0,
    h: 11.2,
  }, // the woman's face
  {
    id: 'rothex',
    title: 'Rothex',
    symbol: 'rothex',
    href: '/rothex',
    x: 21.2,
    y: 28.8,
    w: 11.8,
    h: 10.1,
  }, // clouds, left
  {
    id: 'reino',
    title: 'El Reino',
    symbol: 'reino',
    href: '/el-reino',
    x: 22.0,
    y: 52.1,
    w: 10.8,
    h: 8.6,
  }, // the child
  {
    id: 'tonnuti',
    title: 'Informatica Aplicada en Tonnuti',
    symbol: 'tonnuti',
    href: '/tonnuti',
    x: 37.8,
    y: 77.0,
    w: 16.1,
    h: 13.0,
  }, // grass, bottom center
  {
    id: 'about',
    title: 'Sobre mi',
    symbol: 'drh',
    href: '/sobre-mi',
    x: 76.2,
    y: 91.6,
    w: 9.8,
    h: 7.8,
  }, // Monet's signature
]

/** Label opens toward the center of the canvas, never off-screen. */
export function labelSide(hotspot: Hotspot): 'left' | 'right' {
  return hotspot.x + hotspot.w / 2 > 50 ? 'left' : 'right'
}
