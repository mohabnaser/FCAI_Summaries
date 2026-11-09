import type { Lesson, Week } from '../types'
import { sePath } from '../paths'
import { week1 } from './week1'
import { week2 } from './week2'
import { week3 } from './week3'
import { week4 } from './week4'
import { week5 } from './week5'

/** Course-wide registry. Add a new week here and every page picks it up. */
export const course = {
  code: 'CS352',
  title: 'Advanced Software Engineering',
  instructor: 'Dr. Desoky Abdelqawy',
  paradigm: 'Architecture is the decisions that are hard to change later.',
}

export const weeks: Week[] = [week1, week2, week3, week4, week5]

export const allLessons: Lesson[] = weeks.flatMap((week) => week.lessons)

export const findWeek = (id: string) => weeks.find((week) => week.id === id)
export const findLesson = (id: string) => allLessons.find((lesson) => lesson.id === id)
export const weekOf = (lesson: Lesson) => weeks.find((week) => week.id === lesson.weekId)!

export const lessonPath = (lesson: Lesson) => sePath(`/lesson/${lesson.id}`)
export const weekPath = (week: Week) => sePath(`/week/${week.id}`)


export const weekMinutes = (week: Week) => week.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0)
