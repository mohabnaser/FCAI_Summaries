import { describe, expect, it } from 'vitest'
import type { Block, LText } from '../types'
import { diagrams } from '../components/diagrams'
import { icons } from '../components/icons'
import { allLessons, weeks } from './course'

/** Every LText inside a block, so Arabic coverage can be checked generically. */
function textsOf(block: Block): LText[] {
  const out: LText[] = []
  const visit = (value: unknown, key?: string) => {
    if (!value || typeof value !== 'object') return
    if (Array.isArray(value)) return value.forEach((item) => visit(item))
    const record = value as Record<string, unknown>
    if (typeof record.en === 'string' && Object.keys(record).every((k) => k === 'en' || k === 'ar')) {
      // Part intros are slide references and table cells for tags/titles are English-only by design.
      if (key !== 'intro') out.push(record as unknown as LText)
      return
    }
    Object.entries(record).forEach(([k, v]) => visit(v, k))
  }
  visit(block)
  return out
}

describe('course content', () => {
  it('maps every slide of every week to a lesson — nothing skipped', () => {
    for (const week of weeks) {
      const taught = new Set(week.lessons.flatMap((lesson) => lesson.slides))
      const missing = week.slides.filter((slide) => !taught.has(slide.n)).map((slide) => slide.n)
      expect(missing, `${week.id} slides with no lesson`).toEqual([])
      const unknown = [...taught].filter((n) => !week.slides.some((slide) => slide.n === n))
      expect(unknown, `${week.id} lessons cite slides that do not exist`).toEqual([])
      expect(week.slides.map((slide) => slide.n)).toEqual(week.slides.map((_, i) => i + 1))
    }
  })

  it('uses unique, stable lesson ids that point back to their week', () => {
    const ids = allLessons.map((lesson) => lesson.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const week of weeks) {
      week.lessons.forEach((lesson, index) => {
        expect(lesson.weekId).toBe(week.id)
        expect(lesson.order).toBe(index + 1)
      })
    }
  })

  it('only references registered diagrams and icons', () => {
    for (const lesson of allLessons) {
      for (const block of lesson.blocks) {
        if (block.kind === 'diagram') expect(diagrams).toHaveProperty(block.id)
        const json = JSON.stringify(block)
        for (const match of json.matchAll(/"icon":"([^"]+)"/g)) expect(icons, `${lesson.id}: icon ${match[1]}`).toHaveProperty(match[1])
      }
    }
  })

  it('gives every explanation an Arabic version', () => {
    const englishOnlyTableCells = new Set(['CleanArch', 'DDIA', 'HFDP-2e', 'CD', 'FSA', 'DMLS', 'SAiP-4e', 'AIE', 'BM-2e'])
    for (const lesson of allLessons) {
      expect(lesson.tldr.ar, `${lesson.id} tldr`).toBeTruthy()
      lesson.recap.forEach((item) => expect(item.ar, `${lesson.id} recap: ${item.en}`).toBeTruthy())
      lesson.keyTerms.forEach((term) => expect(term.definition.ar, `${lesson.id} term ${term.term}`).toBeTruthy())
      for (const block of lesson.blocks) {
        if (block.kind === 'table') {
          // Table cells that are names (tags, book titles, rows labels) stay English.
          continue
        }
        for (const text of textsOf(block)) {
          if (englishOnlyTableCells.has(text.en)) continue
          expect(text.ar, `${lesson.id} (${block.kind}): ${text.en.slice(0, 60)}`).toBeTruthy()
        }
      }
    }
  })

  it('ends every lesson with key terms and a recap', () => {
    for (const lesson of allLessons) {
      expect(lesson.keyTerms.length, lesson.id).toBeGreaterThanOrEqual(5)
      expect(lesson.recap.length, lesson.id).toBeGreaterThanOrEqual(4)
      expect(lesson.blocks.some((block) => block.kind === 'part'), lesson.id).toBe(true)
    }
  })
})
