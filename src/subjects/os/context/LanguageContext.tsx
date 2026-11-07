import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang } from '../types'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  isArabic: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = 'os-atlas:language:v1'

function readInitialLanguage(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'ar' || stored === 'en') return stored
  } catch {
    // Storage can be unavailable in privacy-restricted contexts.
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLanguage)

  useEffect(() => {
    // The interface and assessment content stay English-first; Arabic passages are marked locally.
    document.documentElement.lang = 'en'
    document.documentElement.dataset.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Progress still works for this session if storage is blocked.
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggle = useCallback(() => setLangState((current) => (current === 'en' ? 'ar' : 'en')), [])

  const value = useMemo(
    () => ({ lang, setLang, toggle, isArabic: lang === 'ar' }),
    [lang, setLang, toggle],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
