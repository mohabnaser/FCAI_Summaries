export type Lang = 'en' | 'ar'

/** Academic prose keeps English as the source of truth, with an optional Egyptian Arabic explanation. */
export interface LText {
  en: string
  ar?: string
}

export type CalloutTone = 'exam' | 'warning' | 'insight' | 'misconception' | 'definition'

export type ChapterId = 'chapter-1' | 'chapter-2' | 'chapter-3' | 'chapter-5'

/**
 * Visual theme. `night` is the original blue-black; `bloom` is the bright pink-led
 * multi-colour theme; `sunset` is the warm apricot-on-deep-sea theme; `jade` is the
 * high-contrast jade-on-graphite theme with solid surfaces.
 */
export type ThemeId = 'night' | 'bloom' | 'sunset' | 'jade'

export interface ChapterMeta {
  id: ChapterId
  number: string
  title: string
  shortTitle: string
  subtitle: string
  /** One-sentence pitch for the chapter home hero. */
  lede: LText
  slideCount: number
  sourceFile: string
  sourceLabel: string
  theme: ThemeId
}

export type VisualId =
  // Chapter 1
  | 'system-layers'
  | 'system-organization'
  | 'interrupt-timeline'
  | 'storage-pyramid'
  | 'cache-lookup'
  | 'io-methods'
  | 'device-status'
  | 'dma-compare'
  | 'multiprocessor'
  | 'multiprogramming'
  | 'dual-mode'
  | 'protection'
  | 'network-models'
  | 'virtualization-stack'
  // Chapter 2
  | 'os-services-map'
  | 'shell-demo'
  | 'file-copy-syscalls'
  | 'system-call-flow'
  | 'parameter-passing'
  | 'syscall-classifier'
  | 'os-structure-explorer'
  | 'boot-sequence'
  // Chapter 3
  | 'process-memory'
  | 'process-states'
  | 'fork-trace'
  | 'bounded-buffer'
  | 'message-buffering'
  // Chapter 5
  | 'race-condition'
  | 'semaphore-lab'
  | 'readers-writers'
  | 'dining-philosophers'

/** Semantic accent colours shared by every visual block. */
export type Tone = 'cyan' | 'teal' | 'violet' | 'amber' | 'rose' | 'lime'

/** Icon names resolved by `components/content/icons.ts`. */
export type IconName =
  | 'cpu'
  | 'chip'
  | 'memory'
  | 'disk'
  | 'disc'
  | 'tape'
  | 'users'
  | 'user'
  | 'app'
  | 'layers'
  | 'shield'
  | 'lock'
  | 'key'
  | 'zap'
  | 'clock'
  | 'timer'
  | 'power'
  | 'server'
  | 'network'
  | 'cloud'
  | 'phone'
  | 'laptop'
  | 'globe'
  | 'monitor'
  | 'printer'
  | 'keyboard'
  | 'file'
  | 'folder'
  | 'database'
  | 'archive'
  | 'refresh'
  | 'fork'
  | 'repeat'
  | 'bug'
  | 'target'
  | 'workflow'
  | 'boxes'
  | 'package'
  | 'eye'
  | 'wifi'
  | 'settings'
  | 'hourglass'
  | 'trending'
  | 'coins'
  | 'battery'
  | 'puzzle'
  | 'code'
  | 'terminal'
  | 'gauge'
  | 'scale'
  | 'search'
  | 'alert'
  | 'bell'
  | 'inbox'
  | 'send'
  | 'list'
  | 'radio'
  | 'car'
  | 'handshake'
  | 'copyleft'
  | 'cable'
  | 'signal'
  | 'split'
  | 'check'
  | 'x'
  | 'book'
  | 'trash'
  | 'plus'
  | 'pause'
  | 'play'
  | 'link'
  | 'factory'

export interface CardItem {
  icon?: IconName
  /** Card titles are technical labels and stay English in both modes. */
  title: string
  body: LText
  tone?: Tone
  tag?: string
  chips?: string[]
}

export interface FlowStep {
  icon?: IconName
  label: string
  detail?: LText
  tone?: Tone
}

export interface LayerItem {
  label: string
  detail?: LText
  tone?: Tone
  icon?: IconName
  chips?: string[]
}

export interface VersusSide {
  title: string
  tagline?: LText
  tone?: Tone
  icon?: IconName
}

export interface StatItem {
  value: string
  label: LText
  tone?: Tone
  icon?: IconName
}

export type Block =
  /** A short, prominent opening paragraph — use instead of a prose card where possible. */
  | { kind: 'lead'; text: LText }
  | {
      kind: 'cards'
      title?: LText
      intro?: LText
      columns?: 2 | 3 | 4
      items: CardItem[]
    }
  | { kind: 'flow'; title?: LText; caption?: LText; steps: FlowStep[] }
  | {
      kind: 'layers'
      title?: LText
      caption?: LText
      layers: LayerItem[]
      /** Optional axis labels drawn beside the stack (e.g. address 0 → 512M). */
      axis?: { top: string; bottom: string }
    }
  | {
      kind: 'versus'
      title?: LText
      left: VersusSide
      right: VersusSide
      rows: Array<{ aspect: string; left: LText; right: LText }>
      verdict?: LText
    }
  | { kind: 'stats'; title?: LText; items: StatItem[] }
  /** A memory hook: an English phrase or acronym that makes a list stick. */
  | {
      kind: 'hook'
      title: LText
      phrase: string
      letters?: Array<{ letter: string; word: string }>
      body?: LText
    }
  /** "Don't say / say instead" pairs for distinctions students commonly blur. */
  | { kind: 'confusions'; title?: LText; items: Array<{ wrong: LText; right: LText }> }
  | { kind: 'recap'; title?: LText; items: LText[] }
  | { kind: 'subsection'; title: LText; intro?: LText }
  | { kind: 'prose'; title?: LText; body: LText[] }
  | { kind: 'list'; title?: LText; ordered?: boolean; items: LText[] }
  | { kind: 'definition'; term: string; definition: LText; detail?: LText }
  | { kind: 'callout'; tone: CalloutTone; title: LText; body: LText; refs?: string[] }
  | { kind: 'table'; caption?: LText; headers: string[]; rows: LText[][] }
  | { kind: 'code'; title?: string; language: string; code: string; caption?: LText }
  | { kind: 'steps'; title?: LText; steps: Array<{ title: string; body: LText }> }
  | {
      kind: 'compare'
      left: { title: string; points: LText[] }
      right: { title: string; points: LText[] }
    }
  | { kind: 'visual'; id: VisualId; title: LText; caption?: LText }
  | { kind: 'exam'; title: LText; body: LText; refs?: string[] }
  | { kind: 'checklist'; title: LText; items: LText[] }
  | { kind: 'quote'; text: LText; attribution?: string }

export interface KeyTerm {
  term: string
  definition: LText
}

export interface Section {
  id: string
  chapterId?: ChapterId
  order: number
  kicker: string
  title: string
  shortTitle: string
  summary: LText
  objectives: LText[]
  estimatedMinutes: number
  quizId: string
  blocks: Block[]
  examFocus: LText[]
  keyTerms: KeyTerm[]
  /**
   * Past-exam questions implemented (and owned) by another chapter that also test
   * this section. They appear in this section's quiz under their original ID, so one
   * printed exam item never has two implementations.
   */
  crossRefQuestionIds?: string[]
}

export type ExamId =
  | 'final_2024'
  | 'final_2023'
  | 'final_nodate'
  | 'final_nodate2'
  | 'final_2020'
  | 'midterm_2022'
  | 'midterm_2021'

export interface SourceRef {
  examId: ExamId
  /** Question label exactly as printed, e.g. Q1.44 or Q2.1. */
  question: string
  note?: string
}

export type AnswerStatus = 'independently-verified' | 'official-key' | 'needs-review'

export interface QuestionOption {
  id: string
  text: string
  note?: LText
}

interface QuestionBase {
  id: string
  chapterId?: ChapterId
  sectionId: string
  topic: string
  concept: string
  difficulty: 'core' | 'stretch'
  /** Question stems and options are ALWAYS English, in both language modes. */
  prompt: string
  sourceRefs: SourceRef[]
  answerStatus: AnswerStatus
  explanation: LText
  takeaway: LText
  hint?: LText
  /** Historical questions are protected assessment content; practice is clearly labelled. */
  /** The bank contains historical exam items only; no invented practice questions. */
  origin: 'historical'
  /** Flagged review items are shown and explained but excluded from the score denominator. */
  unscored?: boolean
}

export interface McqQuestion extends QuestionBase {
  type: 'mcq'
  options: QuestionOption[]
  correct: string
  optionNotes?: Record<string, LText>
}

export interface TrueFalseQuestion extends QuestionBase {
  type: 'tf'
  correct: boolean
  optionNotes?: Record<string, LText>
}

export interface FillBlank {
  id: string
  accepted: string[]
  label: string
}

export interface FillQuestion extends QuestionBase {
  type: 'fill'
  blanks: FillBlank[]
}

export interface ShortQuestion extends QuestionBase {
  type: 'short'
  modelAnswer: string
  keywordGroups: Array<{ label: string; patterns: string[] }>
  passRatio: number
}

export type Question = McqQuestion | TrueFalseQuestion | FillQuestion | ShortQuestion

export type QuizKind = 'section' | 'final' | 'bookmarks'

export interface Quiz {
  id: string
  chapterId?: ChapterId
  sectionId: string
  kind?: QuizKind
  title: string
  description: string
  questionIds: string[]
}

export interface ExamMeta {
  id: ExamId
  label: string
  shortLabel: string
  file: string
  term: string
}

export interface ExcludedGroup {
  ids: string
  count: number
  reason: string
}

export interface ExamAudit {
  chapterId: ChapterId
  examId: ExamId
  totalItems: number
  /** Every source item that tests this chapter, including duplicate occurrences. */
  relevantIds: string[]
  excludedGroups: ExcludedGroup[]
  notes: string[]
}

export interface SectionProgress {
  visited: boolean
  completed: boolean
  lastVisitedAt: number | null
  elapsedSeconds: number
}

export interface QuizAttempt {
  answers: Record<string, unknown>
  results: Record<string, boolean>
  submitted: boolean
  score: number
  total: number
  attemptedAt: number
}

export interface SourceMapping {
  examId: ExamId
  sourceQuestion: string
  implementationId: string
  question: Question
}

export interface ExamCoverage {
  audit: ExamAudit
  total: number
  relevant: number
  implemented: number
  review: number
  excluded: number
  mappings: SourceMapping[]
  missing: string[]
  duplicateOccurrences: number
}

export interface CoverageSummary {
  total: number
  relevant: number
  implemented: number
  review: number
  excluded: number
  unique: number
  duplicatePairs: number
  duplicateOccurrences: number
}

export interface ProgressState {
  sections: Record<string, SectionProgress>
  quizzes: Record<string, QuizAttempt>
  bookmarks: { sections: string[]; questions: string[] }
  bestScores: Record<string, { score: number; total: number; at: number }>
}
