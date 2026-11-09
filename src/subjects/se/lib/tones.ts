import type { Tone } from '../types'

const weekTones: Tone[] = ['blue', 'violet', 'teal', 'amber', 'rose', 'lime']

/** Each week gets its own accent so pages of different weeks are easy to tell apart. */
export const weekTone = (weekNumber: number): Tone => weekTones[(weekNumber - 1) % weekTones.length]
