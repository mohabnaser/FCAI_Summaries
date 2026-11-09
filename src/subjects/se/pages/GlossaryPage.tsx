import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Search, Shuffle } from 'lucide-react'
import { lessonPath, weeks } from '../data/course'
import { FlipCard } from '../components/FlipCard'
import { usePrefs } from '../context/PrefsContext'

function shuffled<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Every key term of every lesson, as flip cards for self-testing. */
export function GlossaryPage() {
  const { showArabic } = usePrefs()
  const [query, setQuery] = useState('')
  const [weekFilter, setWeekFilter] = useState<string>('all')
  const [revealAll, setRevealAll] = useState(false)
  const [order, setOrder] = useState<number | null>(null)

  const entries = useMemo(
    () =>
      weeks.flatMap((week) =>
        week.lessons.flatMap((lesson) => lesson.keyTerms.map((term) => ({ term, lesson, week }))),
      ),
    [],
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = entries.filter(
      (entry) =>
        (weekFilter === 'all' || entry.week.id === weekFilter) &&
        (!q || entry.term.term.toLowerCase().includes(q) || entry.term.definition.en.toLowerCase().includes(q) || (entry.term.definition.ar ?? '').includes(q)),
    )
    return order === null ? filtered : shuffled(filtered)
    // `order` changes to reshuffle.
  }, [entries, query, weekFilter, order])

  return (
    <div className="rise space-y-6">
      <header className="hero p-6 sm:p-8" data-tone="violet">
        <div className="relative z-10">
          <p className="eyebrow">Active recall</p>
          <h1 className="display mt-2 text-[2rem] font-bold text-ink sm:text-[2.5rem]">Key terms & flashcards</h1>
          <p className="mt-2 max-w-2xl text-[0.98rem] text-muted">
            {entries.length} terms from every lesson. Say the meaning out loud before you flip — remembering beats re-reading.
            {showArabic ? (
              <span className="ar-inline" lang="ar" dir="rtl">
                قول المعنى بصوت عالي قبل ما تقلب الكارت — إنك تفتكر أحسن بكتير من إنك تعيد القراية.
              </span>
            ) : null}
          </p>
        </div>
      </header>

      <div className="panel flex flex-wrap items-center gap-2 p-3">
        <label className="flex min-w-[14rem] flex-1 items-center gap-2 rounded-lg border border-line-soft bg-surface-2 px-3 py-2">
          <Search className="h-4 w-4 text-faint" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a term…"
            className="w-full bg-transparent text-[0.9rem] text-ink outline-none placeholder:text-faint"
            aria-label="Search key terms"
          />
        </label>
        <div className="flex gap-1" role="group" aria-label="Filter by week">
          {[{ id: 'all', label: 'All' }, ...weeks.map((week) => ({ id: week.id, label: `Week ${week.number}` }))].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setWeekFilter(option.id)}
              aria-pressed={weekFilter === option.id}
              className={`btn btn-sm ${weekFilter === option.id ? 'btn-primary' : 'btn-ghost'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOrder(Math.random())}>
          <Shuffle className="h-4 w-4" /> Shuffle
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRevealAll((v) => !v)} aria-pressed={revealAll}>
          {revealAll ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {revealAll ? 'Hide all' : 'Show all'}
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="panel p-8 text-center text-muted">No term matches “{query}”.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map(({ term, lesson, week }) => (
            <div key={`${lesson.id}-${term.term}`} className="flex flex-col">
              <FlipCard term={term} revealAll={revealAll} label={`W${week.number} · ${lesson.shortTitle}`} />
              <Link to={lessonPath(lesson)} className="mt-1 self-end px-1 text-[0.72rem] text-faint hover:text-ink">
                open lesson →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
