import type { Question, ProgressState, Section } from '../types'
import { questionsById } from '../data/questions'
import { allQuizzes, allSections, allSectionsById, type ChapterBundle } from '../data/chapters'

const quizzesById = new Map(allQuizzes.map((quiz) => [quiz.id, quiz]))

/** Quiz IDs belonging to a chapter (section quizzes + final), or null for “all chapters”. */
function chapterQuizIds(chapter?: ChapterBundle): Set<string> | null {
  if (!chapter) return null
  return new Set([...chapter.sectionQuizzes.map((quiz) => quiz.id), chapter.finalAssessment.id])
}

export interface ProgressOverview {
  sectionsVisited: number
  sectionsCompleted: number
  totalSections: number
  completionPercent: number
  studySeconds: number
  quizzesAttempted: number
  averageBestPercent: number | null
  questionsGraded: number
  questionsCorrect: number
  accuracyPercent: number | null
}

export function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.round(totalSeconds))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m`
  return `${seconds}s`
}

export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(timestamp))
}

export function percent(score: number, total: number): number {
  if (total <= 0) return 0
  return Math.round((score / total) * 100)
}

/** Progress for one chapter, or across every chapter when `chapter` is omitted. */
export function getProgressOverview(progress: ProgressState, chapter?: ChapterBundle): ProgressOverview {
  const sections = chapter?.sections ?? allSections
  const quizIds = chapterQuizIds(chapter)
  const inScope = (quizId: string) => !quizIds || quizIds.has(quizId)
  const sectionEntries = sections.map((section) => progress.sections[section.id])
  const sectionsVisited = sectionEntries.filter((entry) => entry?.visited).length
  const sectionsCompleted = sectionEntries.filter((entry) => entry?.completed).length
  const studySeconds = sectionEntries.reduce(
    (total, entry) => total + (entry?.elapsedSeconds ?? 0),
    0,
  )
  const bestScores = Object.entries(progress.bestScores)
    .filter(([quizId]) => inScope(quizId))
    .map(([, entry]) => entry)
  const averageBestPercent =
    bestScores.length === 0
      ? null
      : Math.round(
          bestScores.reduce((total, entry) => total + percent(entry.score, entry.total), 0) /
            bestScores.length,
        )

  let questionsGraded = 0
  let questionsCorrect = 0
  for (const [quizId, attempt] of Object.entries(progress.quizzes)) {
    if (!inScope(quizId)) continue
    for (const result of Object.values(attempt.results)) {
      questionsGraded += 1
      if (result) questionsCorrect += 1
    }
  }

  return {
    sectionsVisited,
    sectionsCompleted,
    totalSections: sections.length,
    completionPercent: percent(sectionsCompleted, sections.length),
    studySeconds,
    quizzesAttempted: Object.keys(progress.quizzes).filter(inScope).length,
    averageBestPercent,
    questionsGraded,
    questionsCorrect,
    accuracyPercent:
      questionsGraded === 0 ? null : percent(questionsCorrect, questionsGraded),
  }
}

export interface MissedQuestion {
  question: Question
  section: Section
  quizId: string
  attemptedAt: number
}

export interface WeakSection {
  section: Section
  missed: MissedQuestion[]
  totalMissed: number
}

/**
 * Uses the most recent result for each question across all quiz attempts, so a
 * later correct answer supersedes an earlier miss. Unscored review items are ignored.
 */
export function getMissedQuestions(progress: ProgressState, chapter?: ChapterBundle): MissedQuestion[] {
  const scope = chapter ? new Set(chapter.sections.map((section) => section.id)) : null
  const latest = new Map<
    string,
    { correct: boolean; quizId: string; attemptedAt: number }
  >()

  for (const [quizId, attempt] of Object.entries(progress.quizzes)) {
    for (const [questionId, correct] of Object.entries(attempt.results)) {
      const existing = latest.get(questionId)
      if (!existing || attempt.attemptedAt >= existing.attemptedAt) {
        latest.set(questionId, { correct, quizId, attemptedAt: attempt.attemptedAt })
      }
    }
  }

  const missed: MissedQuestion[] = []
  for (const [questionId, result] of latest) {
    if (result.correct) continue
    const question = questionsById.get(questionId)
    if (!question || question.unscored) continue
    // A cross-referenced question belongs to the section whose quiz it was answered in.
    const quiz = quizzesById.get(result.quizId)
    const quizSection =
      quiz?.kind === 'section' && quiz.questionIds.includes(questionId) ? allSectionsById.get(quiz.sectionId) : undefined
    const section = quizSection ?? allSectionsById.get(question.sectionId)
    if (!section) continue
    if (scope && !scope.has(section.id)) continue
    missed.push({
      question,
      section,
      quizId: result.quizId,
      attemptedAt: result.attemptedAt,
    })
  }

  return missed.sort((a, b) => b.attemptedAt - a.attemptedAt)
}

export function getWeakSections(progress: ProgressState, chapter?: ChapterBundle): WeakSection[] {
  const sections = chapter?.sections ?? allSections
  const grouped = new Map<string, MissedQuestion[]>()
  for (const missed of getMissedQuestions(progress, chapter)) {
    const list = grouped.get(missed.section.id) ?? []
    list.push(missed)
    grouped.set(missed.section.id, list)
  }

  return sections
    .map((section) => {
      const missed = grouped.get(section.id) ?? []
      return { section, missed, totalMissed: missed.length }
    })
    .filter((entry) => entry.totalMissed > 0)
    .sort((a, b) => b.totalMissed - a.totalMissed)
}

export function getQuestionTypeLabel(question: Question): string {
  switch (question.type) {
    case 'mcq':
      return 'Multiple choice'
    case 'tf':
      return 'True / false'
    case 'fill':
      return question.blanks.length > 1 ? 'Fill in the blanks' : 'Fill in the blank'
    case 'short':
      return 'Short answer'
  }
}

export function getStatusLabel(question: Question): string {
  if (question.unscored) return 'Review · unscored'
  if (question.answerStatus === 'official-key') return 'Official key'
  if (question.answerStatus === 'needs-review') return 'Needs review'
  return 'Independently verified'
}
