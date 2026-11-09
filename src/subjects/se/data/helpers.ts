import type { Block, LText } from '../types'

/** Bilingual text: the English source plus an Egyptian-Arabic explanation. */
export const t = (en: string, ar?: string): LText => (ar ? { en, ar } : { en })

/** A numbered part heading inside a lesson. */
export const part = (title: LText, intro?: LText): Block => ({ kind: 'part', title, intro })
