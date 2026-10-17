import { useEffect, type ReactElement } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { hotspots } from './data/hotspots'
import About from './pages/About'
import BookPage from './pages/BookPage'
import Home from './pages/Home'
import experienceMd from './content/experience.md?raw'
import skillsMd from './content/skills.md?raw'
import studiesMd from './content/studies.md?raw'
import moreMd from './content/more.md?raw'
import Lar from './pages/Lar'
import Placeholder from './pages/Placeholder'
import Reino from './pages/Reino'
import Rothex from './pages/Rothex'
import Tonutti from './pages/Tonutti'

// Hotspots with a bespoke page; everything else falls back to <Placeholder>.
const customPages: Record<string, ReactElement> = {
  lar: <Lar />,
  rothex: <Rothex />,
  reino: <Reino />,
  tonnuti: <Tonutti />,
  about: <About />,
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />

      {/* Visually hidden nav: every destination reachable without hovering. */}
      <nav className="sr-only" aria-label="Sections">
        <ul>
          {hotspots.map((hotspot) => (
            <li key={hotspot.id}>
              <Link to={hotspot.href} viewTransition>
                {hotspot.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<BookPage title="Experience" markdown={experienceMd} />} />
        <Route path="/skills" element={<BookPage title="Skills" markdown={skillsMd} />} />
        <Route path="/studies" element={<BookPage title="Studies" markdown={studiesMd} />} />
        <Route path="/more" element={<BookPage title="More" markdown={moreMd} />} />
        {hotspots.map((hotspot) => (
          <Route
            key={hotspot.id}
            path={hotspot.href}
            element={customPages[hotspot.id] ?? <Placeholder hotspot={hotspot} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
