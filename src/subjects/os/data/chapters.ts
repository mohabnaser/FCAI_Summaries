import type { ChapterId, ChapterMeta, LText, Question, Quiz, Section } from '../types'
import { chapterMeta as chapter1Meta, resolveSectionId, sections as chapter1Sections } from './sections'
import { chapter2Meta, chapter2Sections } from './chapter2'
import { chapter3Meta, chapter3Sections } from './chapter3'
import { chapter5Meta, chapter5Sections } from './chapter5'
import { chapter1Questions, chapter2Questions, chapter3Questions, chapter5Questions } from './questions'
import {
  chapter1SectionQuizzes,
  chapter2FinalAssessmentQuiz,
  chapter2SectionQuizzes,
  chapter3FinalAssessmentQuiz,
  chapter3SectionQuizzes,
  chapter5FinalAssessmentQuiz,
  chapter5SectionQuizzes,
  finalAssessmentQuiz,
} from './quizzes'
import { chapter1Coverage, chapter2Coverage, chapter3Coverage, chapter5Coverage, type ChapterCoverage } from './coverage'
import { cheatSheetGroups, highYieldTraps, type CheatSheetGroup } from './cheatsheet'
import { chapter2CheatSheetGroups, chapter2HighYieldTraps } from './chapter2/cheatsheet'
import { chapter3CheatSheetGroups, chapter3HighYieldTraps } from './chapter3/cheatsheet'
import { chapter5CheatSheetGroups, chapter5HighYieldTraps } from './chapter5/cheatsheet'
import { osPath } from '../paths'

/** Everything a chapter needs: one registry entry per chapter, no per-chapter page code. */
export interface ChapterBundle {
  meta: ChapterMeta
  /** Route prefix for chapter-scoped tools, e.g. `/chapter/chapter-2`. */
  path: string
  sections: Section[]
  totalEstimatedMinutes: number
  ownedQuestions: Question[]
  sectionQuizzes: Quiz[]
  finalAssessment: Quiz
  cheatSheet: { groups: CheatSheetGroup[]; traps: LText[] }
  coverage: ChapterCoverage
}

function bundle(
  meta: ChapterMeta,
  sections: Section[],
  ownedQuestions: Question[],
  sectionQuizzes: Quiz[],
  finalAssessment: Quiz,
  cheatSheet: ChapterBundle['cheatSheet'],
  coverage: ChapterCoverage,
): ChapterBundle {
  return {
    meta,
    path: osPath(`/chapter/${meta.id}`),
    sections,
    totalEstimatedMinutes: sections.reduce((total, section) => total + section.estimatedMinutes, 0),
    ownedQuestions,
    sectionQuizzes,
    finalAssessment,
    cheatSheet,
    coverage,
  }
}

export const chapters: ChapterBundle[] = [
  bundle(
    chapter1Meta,
    chapter1Sections,
    chapter1Questions,
    chapter1SectionQuizzes,
    finalAssessmentQuiz,
    { groups: cheatSheetGroups, traps: highYieldTraps },
    chapter1Coverage,
  ),
  bundle(
    chapter2Meta,
    chapter2Sections,
    chapter2Questions,
    chapter2SectionQuizzes,
    chapter2FinalAssessmentQuiz,
    { groups: chapter2CheatSheetGroups, traps: chapter2HighYieldTraps },
    chapter2Coverage,
  ),
  bundle(
    chapter3Meta,
    chapter3Sections,
    chapter3Questions,
    chapter3SectionQuizzes,
    chapter3FinalAssessmentQuiz,
    { groups: chapter3CheatSheetGroups, traps: chapter3HighYieldTraps },
    chapter3Coverage,
  ),
  bundle(
    chapter5Meta,
    chapter5Sections,
    chapter5Questions,
    chapter5SectionQuizzes,
    chapter5FinalAssessmentQuiz,
    { groups: chapter5CheatSheetGroups, traps: chapter5HighYieldTraps },
    chapter5Coverage,
  ),
]

export const chaptersById = new Map(chapters.map((chapter) => [chapter.meta.id, chapter]))

export function getChapter(id: ChapterId | string): ChapterBundle {
  return chaptersById.get(id as ChapterId) ?? chapters[0]
}

/** Every section of every chapter, in chapter then section order. Section IDs are globally unique. */
export const allSections: Section[] = chapters.flatMap((chapter) => chapter.sections)
export const allSectionsById = new Map(allSections.map((section) => [section.id, section]))

const sectionChapter = new Map<string, ChapterBundle>()
for (const chapter of chapters) for (const section of chapter.sections) sectionChapter.set(section.id, chapter)

export function chapterOfSection(sectionId: string): ChapterBundle | undefined {
  return sectionChapter.get(resolveSectionId(sectionId))
}

export function findSection(sectionId: string): Section | undefined {
  return allSectionsById.get(resolveSectionId(sectionId))
}

/**
 * The section of `chapter` a question belongs to: its owner section if that is in the
 * chapter, otherwise the chapter section that cross-references it.
 */
export function sectionInChapter(chapter: ChapterBundle, question: Question): Section | undefined {
  return (
    chapter.sections.find((section) => section.id === question.sectionId) ??
    chapter.sections.find((section) => section.crossRefQuestionIds?.includes(question.id))
  )
}

export const allQuizzes: Quiz[] = chapters.flatMap((chapter) => [...chapter.sectionQuizzes, chapter.finalAssessment])

/** The chapter a quiz belongs to (section and final quizzes). */
export function chapterOfQuiz(quizId: string): ChapterBundle | undefined {
  return chapters.find(
    (chapter) => chapter.finalAssessment.id === quizId || chapter.sectionQuizzes.some((quiz) => quiz.id === quizId),
  )
}

export { resolveSectionId }
