import type { IconName } from './components/icons'
import type { DiagramId } from './components/diagrams'

export type { IconName, DiagramId }

/** `en` shows the English text only; `ar` adds the Egyptian-Arabic explanation under it. */
export type Lang = 'en' | 'ar'

/** English is the exam language and always shown; `ar` is the optional explanation layer. */
export interface LText {
  en: string
  ar?: string
}

/** Accent colours. Each one is a semantic role defined per theme in `index.css`. */
export type Tone = 'blue' | 'teal' | 'violet' | 'amber' | 'rose' | 'lime'

export interface CardItem {
  icon?: IconName
  title: string
  body: LText
  tone?: Tone
  tag?: string
}

export interface FlowStep {
  icon?: IconName
  label: string
  detail?: LText
  tone?: Tone
}

export interface VersusSide {
  title: string
  tagline?: LText
  tone?: Tone
  icon?: IconName
}

/**
 * Teaching blocks. A lesson is an ordered list of these; pages never hard-code content.
 * Prefer the visual kinds (cards, flow, versus, diagram, case) over plain lists.
 */
export type Block =
  /** One prominent opening paragraph. */
  | { kind: 'lead'; text: LText }
  /** A numbered part heading; it also feeds the lesson outline. */
  | { kind: 'part'; title: LText; intro?: LText }
  /** A concept explained in plain words, optionally with an everyday analogy. */
  | { kind: 'idea'; title: string; text: LText; analogy?: LText; tone?: Tone; icon?: IconName }
  | { kind: 'cards'; title?: LText; columns?: 2 | 3 | 4; numbered?: boolean; items: CardItem[] }
  | { kind: 'flow'; title?: LText; caption?: LText; steps: FlowStep[] }
  | {
      kind: 'versus'
      title?: LText
      left: VersusSide
      right: VersusSide
      rows: Array<{ aspect: string; left: LText; right: LText }>
      verdict?: LText
    }
  | { kind: 'table'; caption?: LText; headers: string[]; rows: LText[][] }
  /** A memory hook: a phrase or acronym whose letters carry a list. */
  | { kind: 'hook'; title: LText; phrase: string; letters?: Array<{ letter: string; word: string }>; body?: LText }
  /** A sentence worth knowing word for word (a law, a definition, a quotation). */
  | { kind: 'memorize'; label: string; text: string; source?: string; note?: LText }
  | { kind: 'callout'; tone: 'insight' | 'warning' | 'key' | 'note'; title: LText; body: LText }
  /** "Don't think / think instead" pairs for ideas that are easy to blur. */
  | { kind: 'myths'; title?: LText; items: Array<{ myth: LText; fact: LText }> }
  | { kind: 'definition'; term: string; definition: LText; detail?: LText }
  /** A real-world story told as labelled beats, ending with its lesson. */
  | {
      kind: 'case'
      label: string
      title: string
      beats: Array<{ label: string; text: LText; icon?: IconName; tone?: Tone }>
      lesson: LText
    }
  | { kind: 'diagram'; id: DiagramId; title: LText; caption?: LText }
  | { kind: 'quote'; text: string; by: string; note?: LText }
  /** A "Think & Defend" scenario from the slides: options, the question, and how an architect reasons about it. */
  | {
      kind: 'dilemma'
      label: string
      title: string
      scenario: LText
      options: Array<{ label: string; text: LText; tone?: Tone }>
      question: string
      lens: LText[]
    }
  | { kind: 'list'; title?: LText; ordered?: boolean; items: LText[] }
  /** Open questions ("Examples?", "Pros/Cons?") with a worked answer. */
  | { kind: 'asks'; title?: LText; items: Array<{ q: string; a: LText }> }
  /**
   * Lecture code. `verdict` adds a Before ✗ / After ✓ badge; `highlight` tints the
   * 1-based line numbers that carry the point; `notes` explain them under the code.
   */
  | {
      kind: 'code'
      title: string
      code: string
      language?: 'java' | 'text'
      verdict?: 'bad' | 'good'
      highlight?: number[]
      notes?: LText[]
    }

export interface KeyTerm {
  term: string
  definition: LText
}

export interface Lesson {
  id: string
  weekId: string
  order: number
  title: string
  shortTitle: string
  /** Slide numbers of the week's deck that this lesson teaches. */
  slides: number[]
  minutes: number
  /** The whole lesson in one or two sentences. */
  tldr: LText
  blocks: Block[]
  keyTerms: KeyTerm[]
  /** End-of-lesson 30-second recap; also feeds the revision sheet. */
  recap: LText[]
}

/** Questions of a lesson go from `recall` (did you catch it?) to `apply` (can you use it on a new case?). */
export type QuizLevel = 'recall' | 'understand' | 'apply'

/** One multiple-choice question of a lesson's "Check your understanding" section. */
export interface QuizQuestion {
  level: QuizLevel
  question: LText
  /** Exactly four choices, in English (the exam language). */
  options: string[]
  /** Index of the correct choice in `options`. */
  answer: number
  /** Why the answer is right, and why the tempting wrong choice is wrong. */
  explanation: LText
}

export interface SlideRef {
  n: number
  title: string
  /** Set for slides with no teaching content of their own (blank, exact duplicate…). */
  note?: string
}

export interface Week {
  id: string
  number: number
  title: string
  topic: string
  lede: LText
  sourceFile: string
  slides: SlideRef[]
  readings: string[]
  /** The week's big ideas, shown on the week page and the revision sheet. */
  bigIdeas: LText[]
  lessons: Lesson[]
}
