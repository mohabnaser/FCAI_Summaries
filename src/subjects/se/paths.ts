import { useLocation } from 'react-router-dom'

/** Where the Software Engineering subject is mounted inside the FCAI site. */
export const SE_BASE = '/3rd-year/se'

/** Turns a subject-relative path such as `/lesson/w1-kickoff` into a site path. */
export function sePath(path: string): string {
  if (path === '/' || path === '') return SE_BASE
  return `${SE_BASE}${path.startsWith('/') ? path : `/${path}`}`
}

/** The inverse of `sePath`. */
export function stripSeBase(pathname: string): string {
  if (pathname === SE_BASE) return '/'
  if (pathname.startsWith(`${SE_BASE}/`)) return pathname.slice(SE_BASE.length)
  return pathname
}

export function useSePathname(): string {
  return stripSeBase(useLocation().pathname)
}

/** The FCAI hub page that lists every 3rd-year subject. */
export const YEAR_HUB = '/3rd-year'
