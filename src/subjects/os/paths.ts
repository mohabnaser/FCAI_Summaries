import { useLocation } from 'react-router-dom'

/** Where the Operating Systems subject is mounted inside the FCAI site. */
export const OS_BASE = '/3rd-year/os'

/** Turns a subject-relative path such as `/section/os-intro` into a site path. */
export function osPath(path: string): string {
  if (path === '/' || path === '') return OS_BASE
  return `${OS_BASE}${path.startsWith('/') ? path : `/${path}`}`
}

/** The inverse of `osPath`: `/3rd-year/os/progress` → `/progress`. */
export function stripOsBase(pathname: string): string {
  if (pathname === OS_BASE) return '/'
  if (pathname.startsWith(`${OS_BASE}/`)) return pathname.slice(OS_BASE.length)
  return pathname
}

/** The current path relative to the subject root. */
export function useOsPathname(): string {
  return stripOsBase(useLocation().pathname)
}

/** The FCAI hub page that lists every 3rd-year subject. */
export const YEAR_HUB = '/3rd-year'
