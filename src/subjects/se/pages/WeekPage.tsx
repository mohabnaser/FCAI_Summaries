import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BookOpen, CircleCheck, Clock3, Lightbulb, Play, ScrollText } from 'lucide-react'
import { findWeek, lessonPath, weekMinutes } from '../data/course'
import { useProgress } from '../context/ProgressContext'
import { Inline, Para } from '../components/Text'
import { weekTone } from '../lib/tones'
import type { Tone } from '../types'
import { sePath } from '../paths'
import { NotFoundPage } from './NotFoundPage'

const lessonTones: Tone[] = ['blue', 'violet', 'teal', 'amber', 'rose', 'lime']

export function WeekPage() {
  const { weekId = '' } = useParams()
  const week = findWeek(weekId)
  const { isDone } = useProgress()
  if (!week) return <NotFoundPage />

  const tone = weekTone(week.number)
  const firstOpen = week.lessons.find((lesson) => !isDone(lesson.id)) ?? week.lessons[0]

  return (
    <div className="rise space-y-10">
      <header className="hero p-6 sm:p-9" data-tone={tone}>
        <div className="relative z-10">
          <p className="eyebrow">Week {week.number} · {week.topic}</p>
          <h1 className="display mt-3 text-[2.2rem] font-bold leading-[1.08] text-ink sm:text-[2.9rem]">{week.title}</h1>
          <Para text={week.lede} className="reading mt-3 max-w-3xl text-[1.05rem]" />
          <div className="mt-5 flex flex-wrap gap-1.5">
            <span className="chip">
              <BookOpen className="h-3 w-3" /> {week.lessons.length} lessons
            </span>
            <span className="chip" data-tone="teal">
              <Clock3 className="h-3 w-3" /> ~{weekMinutes(week)} min
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to={lessonPath(firstOpen)} className="btn btn-primary">
              <Play className="h-4 w-4" /> {firstOpen === week.lessons[0] && !isDone(firstOpen.id) ? 'Start the week' : `Continue: ${firstOpen.shortTitle}`}
            </Link>
            <Link to={sePath(`/week/${week.id}/revision`)} className="btn btn-ghost">
              <ScrollText className="h-4 w-4" style={{ color: 'var(--se-amber)' }} /> Revision sheet
            </Link>
          </div>
        </div>
      </header>

      <section className="panel p-6" data-tone="amber">
        <p className="eyebrow flex items-center gap-1.5">
          <Lightbulb className="h-3.5 w-3.5" /> The week in one minute
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {week.bigIdeas.map((idea, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl border border-line-soft p-3.5">
              <span className="display text-[1.3rem] font-bold leading-none" style={{ color: 'var(--se-amber)' }}>
                {i + 1}
              </span>
              <div className="reading text-[0.95rem]">
                <Inline text={idea} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.82rem] text-faint">Readings: {week.readings.join(' · ')}</p>
      </section>

      <section aria-labelledby="path-heading">
        <p className="eyebrow">Learning path</p>
        <h2 id="path-heading" className="display mt-1 text-[1.7rem] font-bold text-ink">
          Lessons, in order
        </h2>
        <ol className="mt-5 space-y-3">
          {week.lessons.map((lesson, i) => {
            const done = isDone(lesson.id)
            return (
              <li key={lesson.id}>
                <Link to={lessonPath(lesson)} className="card flex flex-col gap-3 sm:flex-row sm:items-start" data-tone={lessonTones[i % lessonTones.length]}>
                  <span className="part-badge flex-none">{done ? <CircleCheck className="h-5 w-5" /> : String(lesson.order).padStart(2, '0')}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="display text-[1.2rem] font-bold text-ink">{lesson.title}</h3>
                    </div>
                    <div className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">
                      <Inline text={lesson.tldr} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="chip" data-tone="teal">
                        ~{lesson.minutes} min
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="hidden h-5 w-5 flex-none self-center text-faint sm:block" />
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

    </div>
  )
}
