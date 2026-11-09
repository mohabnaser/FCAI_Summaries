import { Link } from 'react-router-dom'
import { sePath } from '../paths'

export function NotFoundPage() {
  return (
    <div className="panel mx-auto max-w-lg p-10 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-2 text-[1.8rem] font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-muted">This page is not part of the Software Engineering course.</p>
      <Link to={sePath('/')} className="btn btn-primary mt-6">
        Back to the course
      </Link>
    </div>
  )
}
