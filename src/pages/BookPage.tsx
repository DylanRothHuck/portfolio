import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { marked } from 'marked'

type BookPageProps = {
  title: string
  markdown?: string
}

export default function BookPage({ title, markdown }: BookPageProps) {
  useEffect(() => {
    document.title = title
  }, [title])

  const html = markdown ? (marked.parse(markdown) as string) : ''

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-amber-100 p-8 text-right">
      {/* old book page overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(120,80,20,0.35)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply bg-[repeating-linear-gradient(45deg,rgba(120,80,20,0.25)_0px,rgba(120,80,20,0.25)_1px,transparent_1px,transparent_4px)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[repeating-linear-gradient(-45deg,rgba(90,60,10,0.3)_0px,rgba(90,60,10,0.3)_1px,transparent_1px,transparent_4px)]" />


      {html && (
        <div className="relative z-10  min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            className="prose prose-neutral max-w-none gap-12 text-left prose-headings:text-black prose-p:text-black/80 prose-strong:text-black prose-a:text-black prose-li:text-black/80 lg:columns-2 xl:h-full xl:[column-fill:auto] 2xl:columns-3 [&_img]:mx-auto [&_img]:max-w-[50%] [&>*]:break-inside-avoid"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}

      <footer className="relative z-10 mt-auto flex flex-col items-end gap-2 ">
        <div className="h-0.5 w-full bg-black" />
        <Link to="/" className="text-2xl font-semibold text-black">
          Back to cover
        </Link>
      </footer>
    </div>
  )
}
