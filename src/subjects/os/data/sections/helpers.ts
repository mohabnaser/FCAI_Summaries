import type { Block, LText } from '../../types'

/** Bilingual text: English source plus an Egyptian Arabic explanation. */
export const t = (en: string, ar?: string): LText => (ar ? { en, ar } : { en })

/** A numbered part heading inside a section. */
export const part = (title: LText, intro?: LText): Block => ({ kind: 'subsection', title, intro })
