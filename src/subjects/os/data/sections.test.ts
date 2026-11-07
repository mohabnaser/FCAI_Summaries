import { describe, expect, it } from 'vitest'
import type { Block, LText } from '../types'
import { legacySectionAliases, resolveSectionId, sections, sectionsById } from './sections'
import { chapters } from './chapters'
import { questionsById } from './questions'
import { hasVisual } from '../components/visuals/VisualRenderer'
import { accessCache } from '../components/visuals/CacheLookup'

const arabicPattern = /[؀-ۿݐ-ݿ]/

function isLText(value: unknown): value is LText {
  return typeof value === 'object' && value !== null && 'en' in value && typeof (value as LText).en === 'string'
}

/** Every LText reachable from a value, depth-first. */
function collectLTexts(value: unknown, out: LText[] = []): LText[] {
  if (Array.isArray(value)) {
    for (const entry of value) collectLTexts(entry, out)
  } else if (isLText(value)) {
    out.push(value)
  } else if (typeof value === 'object' && value !== null) {
    for (const entry of Object.values(value)) collectLTexts(entry, out)
  }
  return out
}

describe('Chapter 1 structure', () => {
  it('follows the lecture order with nine contiguous sections', () => {
    expect(sections.map((section) => section.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('redirects every legacy URL to a real section', () => {
    for (const [legacy, target] of Object.entries(legacySectionAliases)) {
      expect(sectionsById.has(target), `${legacy} → ${target}`).toBe(true)
      expect(resolveSectionId(legacy)).toBe(target)
    }
    expect(resolveSectionId('multiprogramming')).toBe('multiprogramming')
  })
})

describe.each(chapters.map((chapter) => [chapter.meta.id, chapter] as const))('%s content', (_id, chapter) => {
  it('numbers its sections 1…n and names each quiz after its section', () => {
    expect(chapter.sections.map((section) => section.order)).toEqual(chapter.sections.map((_, index) => index + 1))
    for (const section of chapter.sections) {
      expect(section.quizId).toBe(`quiz-${section.id}`)
      expect(section.chapterId).toBe(chapter.meta.id)
    }
  })

  it('uses only registered visuals', () => {
    for (const section of chapter.sections) {
      for (const block of section.blocks) {
        if (block.kind === 'visual') expect(hasVisual(block.id), `${section.id}: ${block.id}`).toBe(true)
      }
    }
  })

  it('cross-references only questions owned by another chapter', () => {
    for (const section of chapter.sections) {
      for (const id of section.crossRefQuestionIds ?? []) {
        const question = questionsById.get(id)
        expect(question, `${section.id}: ${id}`).toBeDefined()
        expect(question?.chapterId, `${section.id}: ${id}`).not.toBe(chapter.meta.id)
      }
    }
  })

  it('cites only its own or cross-referenced questions in exam notes', () => {
    for (const section of chapter.sections) {
      const allowed = new Set([
        ...[...questionsById.values()].filter((question) => question.sectionId === section.id).map((question) => question.id),
        ...(section.crossRefQuestionIds ?? []),
      ])
      for (const block of section.blocks) {
        if ((block.kind === 'exam' || block.kind === 'callout') && block.refs) {
          for (const ref of block.refs) expect(allowed.has(ref), `${section.id}: ${ref}`).toBe(true)
        }
      }
    }
  })

  it('cites every one of its quiz questions in an exam note', () => {
    for (const section of chapter.sections) {
      const cited = new Set(
        section.blocks.flatMap((block: Block) => (block.kind === 'exam' ? (block.refs ?? []) : [])),
      )
      const own = [...questionsById.values()].filter((question) => question.sectionId === section.id)
      for (const question of own) expect(cited.has(question.id), `${section.id}: ${question.id}`).toBe(true)
      for (const id of section.crossRefQuestionIds ?? []) expect(cited.has(id), `${section.id}: ${id}`).toBe(true)
    }
  })

  it('gives every section numbered parts and a recap', () => {
    for (const section of chapter.sections) {
      expect(section.blocks.filter((block) => block.kind === 'subsection').length, section.id).toBeGreaterThanOrEqual(2)
      expect(section.blocks.some((block) => block.kind === 'recap'), section.id).toBe(true)
    }
  })

  it('keeps English text free of Arabic and supplies an Arabic explanation for teaching text', () => {
    for (const section of chapter.sections) {
      const texts = [
        section.summary,
        ...section.objectives,
        ...section.examFocus,
        ...section.keyTerms.map((term) => term.definition),
        // Table cells may be bare names or numbers; everything else must be bilingual.
        ...section.blocks.filter((block) => block.kind !== 'table').flatMap((block) => collectLTexts(block)),
      ]
      for (const text of texts) {
        expect(text.en, `${section.id}: ${text.en}`).not.toMatch(arabicPattern)
        expect(text.ar, `${section.id}: missing Arabic for “${text.en}”`).toBeTruthy()
      }
    }
  })
})

describe('cache simulator', () => {
  it('hits, misses and evicts according to the policy', () => {
    const run = (policy: 'LRU' | 'FIFO') =>
      'ABCADABEAB'.split('').reduce((state, item) => accessCache(state, item, policy), {
        cache: [] as string[],
        log: [] as Array<{ item: string; hit: boolean; evicted?: string }>,
      })
    const lru = run('LRU')
    const fifo = run('FIFO')
    expect(lru.log.filter((entry) => entry.hit)).toHaveLength(4)
    expect(fifo.log.filter((entry) => entry.hit)).toHaveLength(3)
    expect(lru.cache).toEqual(['E', 'A', 'B'])
    expect(fifo.log[5]).toEqual({ item: 'A', hit: false, evicted: 'B' })
  })
})
