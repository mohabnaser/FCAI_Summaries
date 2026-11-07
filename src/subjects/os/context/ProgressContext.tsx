import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { ProgressState, QuizAttempt, SectionProgress } from '../types'
import { resolveSectionId } from '../data/sections'

const STORAGE_KEY = 'os-atlas:progress:v1'

const EMPTY_SECTION: SectionProgress = {
  visited: false,
  completed: false,
  lastVisitedAt: null,
  elapsedSeconds: 0,
}

function emptyProgress(): ProgressState {
  return {
    sections: {},
    quizzes: {},
    bookmarks: { sections: [], questions: [] },
    bestScores: {},
  }
}

function mergeSectionProgress(
  current: SectionProgress | undefined,
  incoming: SectionProgress,
): SectionProgress {
  if (!current) return incoming
  return {
    visited: current.visited || incoming.visited,
    completed: current.completed || incoming.completed,
    lastVisitedAt: Math.max(current.lastVisitedAt ?? 0, incoming.lastVisitedAt ?? 0) || null,
    elapsedSeconds: current.elapsedSeconds + incoming.elapsedSeconds,
  }
}

function readProgress(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    const sections: Record<string, SectionProgress> = {}
    for (const [id, entry] of Object.entries(parsed.sections ?? {})) {
      const canonical = resolveSectionId(id)
      sections[canonical] = mergeSectionProgress(sections[canonical], entry)
    }
    return {
      sections,
      quizzes: parsed.quizzes ?? {},
      bookmarks: {
        sections: [
          ...new Set((parsed.bookmarks?.sections ?? []).map((id) => resolveSectionId(id))),
        ],
        questions: parsed.bookmarks?.questions ?? [],
      },
      bestScores: parsed.bestScores ?? {},
    }
  } catch {
    return emptyProgress()
  }
}

interface ProgressContextValue {
  progress: ProgressState
  visitSection: (sectionId: string) => void
  setSectionCompleted: (sectionId: string, completed: boolean) => void
  addElapsed: (sectionId: string, seconds: number) => void
  saveQuizAttempt: (quizId: string, attempt: QuizAttempt) => void
  toggleSectionBookmark: (sectionId: string) => void
  toggleQuestionBookmark: (questionId: string) => void
  isSectionBookmarked: (sectionId: string) => boolean
  isQuestionBookmarked: (questionId: string) => boolean
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(readProgress)
  const progressRef = useRef(progress)
  const firstRender = useRef(true)

  useEffect(() => {
    progressRef.current = progress
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
      } catch {
        // Keep working in-memory if storage is full or blocked.
      }
    }, 250)
    return () => window.clearTimeout(timer)
  }, [progress])

  useEffect(() => {
    const flush = () => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progressRef.current))
      } catch {
        // Ignore unavailable storage during page teardown.
      }
    }
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') flush()
    }
    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      window.removeEventListener('pagehide', flush)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  const visitSection = useCallback((sectionId: string) => {
    setProgress((current) => {
      const existing = current.sections[sectionId] ?? EMPTY_SECTION
      if (existing.visited) {
        return current
      }
      return {
        ...current,
        sections: {
          ...current.sections,
          [sectionId]: { ...existing, visited: true, lastVisitedAt: Date.now() },
        },
      }
    })
  }, [])

  const setSectionCompleted = useCallback((sectionId: string, completed: boolean) => {
    setProgress((current) => {
      const existing = current.sections[sectionId] ?? EMPTY_SECTION
      return {
        ...current,
        sections: {
          ...current.sections,
          [sectionId]: { ...existing, completed, visited: true, lastVisitedAt: Date.now() },
        },
      }
    })
  }, [])

  const addElapsed = useCallback((sectionId: string, seconds: number) => {
    if (seconds <= 0) return
    setProgress((current) => {
      const existing = current.sections[sectionId] ?? EMPTY_SECTION
      return {
        ...current,
        sections: {
          ...current.sections,
          [sectionId]: {
            ...existing,
            elapsedSeconds: existing.elapsedSeconds + seconds,
            visited: true,
          },
        },
      }
    })
  }, [])

  const saveQuizAttempt = useCallback((quizId: string, attempt: QuizAttempt) => {
    setProgress((current) => {
      const ratio = attempt.total === 0 ? 0 : attempt.score / attempt.total
      const previousBest = current.bestScores[quizId]
      const previousRatio = previousBest && previousBest.total > 0 ? previousBest.score / previousBest.total : -1
      return {
        ...current,
        quizzes: { ...current.quizzes, [quizId]: attempt },
        bestScores:
          ratio > previousRatio
            ? { ...current.bestScores, [quizId]: { score: attempt.score, total: attempt.total, at: attempt.attemptedAt } }
            : current.bestScores,
      }
    })
  }, [])

  const toggleSectionBookmark = useCallback((sectionId: string) => {
    setProgress((current) => {
      const exists = current.bookmarks.sections.includes(sectionId)
      return {
        ...current,
        bookmarks: {
          ...current.bookmarks,
          sections: exists
            ? current.bookmarks.sections.filter((id) => id !== sectionId)
            : [...current.bookmarks.sections, sectionId],
        },
      }
    })
  }, [])

  const toggleQuestionBookmark = useCallback((questionId: string) => {
    setProgress((current) => {
      const exists = current.bookmarks.questions.includes(questionId)
      return {
        ...current,
        bookmarks: {
          ...current.bookmarks,
          questions: exists
            ? current.bookmarks.questions.filter((id) => id !== questionId)
            : [...current.bookmarks.questions, questionId],
        },
      }
    })
  }, [])

  const isSectionBookmarked = useCallback(
    (sectionId: string) => progress.bookmarks.sections.includes(sectionId),
    [progress.bookmarks.sections],
  )
  const isQuestionBookmarked = useCallback(
    (questionId: string) => progress.bookmarks.questions.includes(questionId),
    [progress.bookmarks.questions],
  )

  const resetProgress = useCallback(() => {
    setProgress(emptyProgress())
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore unavailable storage.
    }
  }, [])

  const value = useMemo(
    () => ({
      progress,
      visitSection,
      setSectionCompleted,
      addElapsed,
      saveQuizAttempt,
      toggleSectionBookmark,
      toggleQuestionBookmark,
      isSectionBookmarked,
      isQuestionBookmarked,
      resetProgress,
    }),
    [
      progress,
      visitSection,
      setSectionCompleted,
      addElapsed,
      saveQuizAttempt,
      toggleSectionBookmark,
      toggleQuestionBookmark,
      isSectionBookmarked,
      isQuestionBookmarked,
      resetProgress,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used inside ProgressProvider')
  return context
}
