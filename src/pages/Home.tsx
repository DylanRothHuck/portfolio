import { useEffect } from 'react'
import Painting from '../components/Painting'

export default function Home() {
  useEffect(() => {
    document.title = 'Portfolio'
  }, [])

  return <Painting />
}
