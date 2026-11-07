import { useMemo } from 'react'
import { chapterOfSection, chapters, chaptersById, type ChapterBundle } from '../data/chapters'
import type { ChapterId } from '../types'
import { useOsPathname } from '../paths'

const LAST_CHAPTER_KEY = 'os-atlas:last-chapter:v1'

/** The chapter a URL belongs to, or null for chapter-neutral pages (home, progress, bookmarks). */
export function chapterFromPath(pathname: string): ChapterBundle | null {
  const chapterMatch = pathname.match(/^\/chapter\/([^/]+)/)
  if (chapterMatch) return chaptersById.get(chapterMatch[1] as ChapterId) ?? null
  const sectionMatch = pathname.match(/^\/section\/([^/]+)/)
  if (sectionMatch) return chapterOfSection(decodeURIComponent(sectionMatch[1])) ?? null
  return null
}

export function readLastChapter(): ChapterBundle {
  try {
    const stored = window.localStorage.getItem(LAST_CHAPTER_KEY)
    if (stored && chaptersById.has(stored as ChapterId)) return chaptersById.get(stored as ChapterId)!
  } catch {
    // Storage may be unavailable; fall back to the first chapter.
  }
  return chapters[0]
}

export function rememberChapter(chapter: ChapterBundle): void {
  try {
    window.localStorage.setItem(LAST_CHAPTER_KEY, chapter.meta.id)
  } catch {
    // Non-essential convenience.
  }
}

/**
 * The chapter the user is working in: the one in the URL, otherwise the last one
 * they visited. Chapter-neutral pages (progress, bookmarks) use it for navigation.
 */
export function useActiveChapter(): ChapterBundle {
  const pathname = useOsPathname()
  return useMemo(() => chapterFromPath(pathname) ?? readLastChapter(), [pathname])
}
