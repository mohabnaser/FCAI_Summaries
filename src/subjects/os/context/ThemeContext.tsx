import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ThemeId } from '../types'

/** `auto` follows each chapter’s own theme; the others apply everywhere. */
export type ThemePreference = 'auto' | ThemeId

const THEME_KEY = 'os-atlas:theme:v1'
const order: ThemePreference[] = ['auto', 'night', 'bloom', 'sunset', 'jade', 'garnet']

function readPreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_KEY)
    if (stored === 'auto' || stored === 'night' || stored === 'bloom' || stored === 'sunset' || stored === 'jade' || stored === 'garnet') return stored
  } catch {
    // Storage may be blocked.
  }
  return 'auto'
}

interface ThemeContextValue {
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
  cycle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(readPreference)

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    try {
      window.localStorage.setItem(THEME_KEY, next)
    } catch {
      // The choice still applies for this session.
    }
  }, [])

  const cycle = useCallback(() => {
    setPreference(order[(order.indexOf(preference) + 1) % order.length])
  }, [preference, setPreference])

  const value = useMemo(() => ({ preference, setPreference, cycle }), [preference, setPreference, cycle])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemePreference(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemePreference must be used inside ThemeProvider')
  return context
}

export function resolveTheme(preference: ThemePreference, chapterTheme: ThemeId): ThemeId {
  return preference === 'auto' ? chapterTheme : preference
}
