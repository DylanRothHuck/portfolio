import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  useEffect(() => {
    document.title = 'Portfolio'
  }, [])

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-red-800 p-8 text-right sm:p-12">
      {/* old book cover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(45,10,0,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply bg-[repeating-linear-gradient(45deg,rgba(90,45,10,0.25)_0px,rgba(90,45,10,0.25)_1px,transparent_1px,transparent_4px)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[repeating-linear-gradient(-45deg,rgba(60,25,0,0.3)_0px,rgba(60,25,0,0.3)_1px,transparent_1px,transparent_4px)]" />

      <div className="relative z-10 flex flex-col items-end gap-2">
        <h1 className="text-5xl font-bold text-black">Dylan Roth</h1>
        <div className="h-0.5 w-full bg-black" />
        <h1 className="text-4xl font-semibold text-black">Portfolio</h1>
      </div>

      <div className="relative z-10 mt-auto flex flex-col items-end gap-2">
        <div className="h-0.5 w-full bg-black" />
        <nav className="flex flex-wrap justify-end gap-x-4 gap-y-1 sm:flex-nowrap sm:gap-6">
          <Link to="/experience" className="text-4xl font-semibold text-black">
            Experience
          </Link>
          <Link to="/skills" className="text-4xl font-semibold text-black">
            Skills
          </Link>
          <Link to="/studies" className="text-4xl font-semibold text-black">
            Studies
          </Link>
          <Link to="/more" className="text-4xl font-semibold text-black">
            +
          </Link>
        </nav>
      </div>
    </div>
  )
}
