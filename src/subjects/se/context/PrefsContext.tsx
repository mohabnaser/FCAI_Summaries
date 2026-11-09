import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang } from '../types'

export type ThemeId = 'blueprint' | 'paper'

interface PrefsValue {
  lang: Lang
  showArabic: boolean
  toggleLang: () => void
  theme: ThemeId
  toggleTheme: () => void
}

const PrefsContext = createContext<PrefsValue | null>(null)
const LANG_KEY = 'se-blueprint:lang:v1'
const THEME_KEY = 'se-blueprint:theme:v1'

function read<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const value = window.localStorage.getItem(key)
    if (value && (allowed as readonly string[]).includes(value)) return value as T
  } catch {
    // Storage may be blocked (private mode); defaults apply for this visit.
  }
  return fallback
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Same as above: the choice still applies until the tab closes.
  }
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  // Arabic explanations are on by default: most readers study in Egyptian Arabic.
  const [lang, setLang] = useState<Lang>(() => read(LANG_KEY, ['en', 'ar'] as const, 'ar'))
  // Dark is the default look; the light theme is one click away in the top bar.
  const [theme, setTheme] = useState<ThemeId>(() => read(THEME_KEY, ['blueprint', 'paper'] as const, 'blueprint'))

  // The theme is applied on the subject's own root element (see Shell), never on <html>,
  // so other subjects that also use <html data-theme> can't wipe out its colours.
  useEffect(() => write(THEME_KEY, theme), [theme])

  // Only the browser's native colour scheme (scrollbars, form controls) is set page-wide,
  // and it is restored when the theme changes or the subject unmounts.
  useEffect(() => {
    const html = document.documentElement
    const previous = html.style.colorScheme
    html.style.colorScheme = theme === 'paper' ? 'light' : 'dark'
    return () => {
      html.style.colorScheme = previous
    }
  }, [theme])

  useEffect(() => write(LANG_KEY, lang), [lang])

  const toggleLang = useCallback(() => setLang((current) => (current === 'ar' ? 'en' : 'ar')), [])
  const toggleTheme = useCallback(() => setTheme((current) => (current === 'blueprint' ? 'paper' : 'blueprint')), [])

  const value = useMemo(
    () => ({ lang, showArabic: lang === 'ar', toggleLang, theme, toggleTheme }),
    [lang, toggleLang, theme, toggleTheme],
  )
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
}

export function usePrefs(): PrefsValue {
  const context = useContext(PrefsContext)
  if (!context) throw new Error('usePrefs must be used inside PrefsProvider')
  return context
}
