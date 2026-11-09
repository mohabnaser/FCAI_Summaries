import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

/** Local-only study progress: which lessons are done and where the reader stopped. */
export interface Progress {
  done: string[]
  lastLessonId: string | null
}

interface ProgressValue {
  progress: Progress
  isDone: (lessonId: string) => boolean
  setDone: (lessonId: string, done: boolean) => void
  visit: (lessonId: string) => void
  reset: () => void
}

const KEY = 'se-blueprint:progress:v1'
const empty: Progress = { done: [], lastLessonId: null }

function load(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<Progress>
    return {
      done: Array.isArray(parsed.done) ? parsed.done.filter((id): id is string => typeof id === 'string') : [],
      lastLessonId: typeof parsed.lastLessonId === 'string' ? parsed.lastLessonId : null,
    }
  } catch {
    return empty
  }
}

const ProgressContext = createContext<ProgressValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(load)

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(progress))
    } catch {
      // Progress lasts for this visit only when storage is blocked.
    }
  }, [progress])

  const isDone = useCallback((id: string) => progress.done.includes(id), [progress.done])
  const setDone = useCallback((id: string, done: boolean) => {
    setProgress((current) => ({
      ...current,
      done: done ? Array.from(new Set([...current.done, id])) : current.done.filter((entry) => entry !== id),
    }))
  }, [])
  const visit = useCallback((id: string) => {
    setProgress((current) => (current.lastLessonId === id ? current : { ...current, lastLessonId: id }))
  }, [])
  const reset = useCallback(() => setProgress(empty), [])

  const value = useMemo(() => ({ progress, isDone, setDone, visit, reset }), [progress, isDone, setDone, visit, reset])
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressValue {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used inside ProgressProvider')
  return context
}
