import { useEffect } from 'react'
import BackToPainting from '../components/BackToPainting'
import type { Hotspot } from '../data/hotspots'

/**
 * Generic fallback page so every hotspot works from day one. Replace page by
 * page with a real layout for the environment each symbol represents.
 */
export default function Placeholder({ hotspot }: { hotspot: Hotspot }) {
  useEffect(() => {
    document.title = `${hotspot.title} - Portfolio`
  }, [hotspot.title])

  return (
    <div className="flex h-dvh w-screen flex-col items-center justify-center gap-6 overflow-y-auto bg-frame px-6 py-10 text-center">
      <BackToPainting
        symbol={hotspot.symbol}
        symbolClassName="h-20 w-20"
        className="inline-flex flex-col items-center gap-3 text-cream transition-opacity hover:opacity-80"
      />
      <h1 className="text-2xl font-bold text-cream sm:text-3xl">{hotspot.title}</h1>
      <p className="text-cream/70">Coming soon</p>
      <p className="max-w-md text-sm text-cream/40">TODO: replace with real content</p>
    </div>
  )
}
