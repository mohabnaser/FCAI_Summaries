import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import { osPath } from '../paths'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-neon/25 bg-cyan-neon/[0.06] text-cyan-neon">
        <Compass className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="eyebrow mt-5">404</p>
      <h1 className="section-title mt-2">This page does not exist</h1>
      <p className="mt-3 text-sm leading-relaxed text-mist-400">
        The link may be outdated, or the section identifier may be wrong. Return to the chapter
        overview and choose a section from the syllabus.
      </p>
      <Link to={osPath('/')} className="btn btn-primary mt-6">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to all chapters
      </Link>
    </div>
  )
}
