import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ListChecks,
  Printer,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import type { CheatSheetGroup } from '../data/cheatsheet'
import { chaptersById, getChapter } from '../data/chapters'
import type { ChapterId } from '../types'
import { NotFoundPage } from './NotFoundPage'
import { BilingualInline, RichText } from '../components/ui/Text'
import { useLanguage } from '../context/LanguageContext'
import { osPath } from '../paths'

function groupSearchText(group: CheatSheetGroup): string {
  const parts: string[] = [group.title, group.subtitle]
  for (const point of group.points ?? []) parts.push(point.en, point.ar ?? '')
  for (const trap of group.traps ?? []) parts.push(trap.en, trap.ar ?? '')
  for (const row of group.table?.rows ?? []) {
    for (const cell of row) parts.push(cell.en, cell.ar ?? '')
  }
  return parts.join(' ').toLowerCase()
}

export function CheatSheetPage() {
  const { chapterId = '' } = useParams()
  const known = chaptersById.has(chapterId as ChapterId)
  const chapter = getChapter(chapterId)
  const { sections } = chapter
  const { groups: cheatSheetGroups, traps: highYieldTraps } = chapter.cheatSheet
  const { isArabic } = useLanguage()
  const [query, setQuery] = useState('')

  const filteredGroups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return cheatSheetGroups
    return cheatSheetGroups.filter((group) => groupSearchText(group).includes(needle))
  }, [query, cheatSheetGroups])

  if (!known) return <NotFoundPage />

  return (
    <div className="fade-up print-area">
      <header className="panel panel-glow relative overflow-hidden p-5 sm:p-6">
        <div
          className="pointer-events-none absolute right-0 top-0 h-48 w-64 bg-grid opacity-45"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="eyebrow">Chapter {Number(chapter.meta.number)}</p>
              <h1 className="section-title mt-2">Cheat sheet</h1>
              <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-mist-300">
                Definitions, comparisons and common exam mistakes, each linked to the section that
                explains it.
              </p>
            </div>
            <button type="button" className="btn btn-secondary no-print" onClick={() => window.print()}>
              <Printer className="h-4 w-4" aria-hidden="true" />
              Print sheet
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { value: cheatSheetGroups.length, label: 'revision groups', icon: Sparkles },
              { value: highYieldTraps.length, label: 'high-yield traps', icon: AlertTriangle },
              { value: sections.length, label: 'linked sections', icon: BookOpen },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5"
                >
                  <Icon className="h-3.5 w-3.5 text-cyan-neon" aria-hidden="true" />
                  <p className="mt-1 font-display text-lg font-semibold leading-none text-mist-50">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="no-print mt-4 max-w-md">
            <label htmlFor="cheat-search" className="mb-1 block text-[0.68rem] font-medium text-mist-400">
              Search definitions, tables, and traps
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-500"
                aria-hidden="true"
              />
              <input
                id="cheat-search"
                type="search"
                className="field pl-9 pr-9"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="e.g. kernel, DMA, virtual memory…"
                autoComplete="off"
              />
              {query ? (
                <button
                  type="button"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-mist-500 hover:text-mist-100"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : null}
            </div>
            <p className="mt-1.5 text-[0.64rem] text-mist-500" role="status" aria-live="polite">
              {query
                ? `${filteredGroups.length} of ${cheatSheetGroups.length} revision groups match.`
                : `Showing all ${cheatSheetGroups.length} revision groups.`}
            </p>
          </div>
        </div>
      </header>

      <nav className="panel no-print mt-4 p-3" aria-label="Jump to a revision group">
        <div className="flex flex-wrap gap-1.5">
          {cheatSheetGroups.map((group) => (
            <a
              key={group.id}
              href={`#cheat-${group.id}`}
              className="rounded-md border border-line-soft bg-ink-950/35 px-2 py-1 text-[0.62rem] text-mist-400 transition-colors hover:border-cyan-neon/30 hover:text-mist-100"
            >
              {group.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="print-area mt-5 space-y-4">
        <section className="panel border-amber-neon/25 p-4 sm:p-5" aria-labelledby="high-yield-heading">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-neon" aria-hidden="true" />
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-amber-neon">
                Highest-yield corrections
              </p>
              <h2
                id="high-yield-heading"
                className="mt-0.5 font-display text-base font-semibold text-mist-50"
              >
                If you revise only nine lines, revise these
              </h2>
            </div>
          </div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {highYieldTraps.map((trap, index) => (
              <li
                key={index}
                className="flex items-start gap-2 rounded-lg border border-line-soft/70 bg-ink-950/30 px-2.5 py-2 text-[0.76rem] leading-relaxed"
              >
                <span className="mt-0.5 flex h-4.5 w-4.5 flex-none items-center justify-center rounded border border-amber-neon/30 font-mono text-[0.55rem] text-amber-200">
                  {index + 1}
                </span>
                <span className="text-mist-300">
                  <BilingualInline text={trap} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        {filteredGroups.length === 0 ? (
          <section className="panel p-8 text-center">
            <Search className="mx-auto h-6 w-6 text-mist-500" aria-hidden="true" />
            <h2 className="mt-2 font-display text-base font-semibold text-mist-100">
              No matching revision group
            </h2>
            <p className="mt-1 text-sm text-mist-500">
              Try a broader term such as “interrupt”, “memory”, or “virtualization”.
            </p>
            <button type="button" className="btn btn-secondary btn-sm mt-3" onClick={() => setQuery('')}>
              Clear search
            </button>
          </section>
        ) : (
          filteredGroups.map((group) => (
            <section
              key={group.id}
              id={`cheat-${group.id}`}
              className="panel scroll-mt-24 overflow-hidden"
              aria-labelledby={`cheat-${group.id}-title`}
            >
              <div className="border-b border-line-soft bg-ink-900/35 px-4 py-3 sm:px-5">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-mist-500">
                  {group.subtitle}
                </p>
                <h2
                  id={`cheat-${group.id}-title`}
                  className="mt-0.5 font-display text-lg font-semibold text-mist-50"
                >
                  {group.title}
                </h2>
              </div>

              <div className="space-y-3 p-4 sm:p-5">
                {group.points ? (
                  <ul className="space-y-2">
                    {group.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-[0.82rem] leading-relaxed">
                        <span
                          className="cheat-bullet mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-neon/80"
                          aria-hidden="true"
                        />
                        <span className="text-mist-300">
                          <BilingualInline text={point} />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {group.table ? (
                  <div className="overflow-x-auto rounded-lg border border-line-soft">
                    <table className="w-full min-w-[32rem] border-collapse text-left text-[0.76rem]">
                      <thead>
                        <tr className="bg-ink-900/65">
                          {group.table.headers.map((header) => (
                            <th
                              key={header}
                              scope="col"
                              className="border-b border-line-soft px-3 py-2 font-mono text-[0.58rem] font-semibold uppercase tracking-wider text-mist-400"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {group.table.rows.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="border-b border-line-soft/60 last:border-0 odd:bg-ink-950/20"
                          >
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-3 py-2 align-top leading-relaxed text-mist-300"
                              >
                                <RichText text={cell.en} />
                                {isArabic && cell.ar ? (
                                  <span
                                    className="mt-1 block text-[0.72rem] leading-relaxed text-mist-400"
                                    lang="ar"
                                    dir="rtl"
                                  >
                                    <RichText text={cell.ar} />
                                  </span>
                                ) : null}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

                {group.traps ? (
                  <div className="rounded-lg border border-amber-neon/25 bg-amber-neon/[0.045] p-3">
                    <p className="flex items-center gap-1.5 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-amber-neon">
                      <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                      Trap to avoid
                    </p>
                    <ul className="mt-1.5 space-y-1.5">
                      {group.traps.map((trap, index) => (
                        <li key={index} className="text-[0.78rem] leading-relaxed text-mist-300">
                          <BilingualInline text={trap} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          ))
        )}

        <section className="panel p-4 sm:p-5" aria-labelledby="explain-back-heading">
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-teal-neon" aria-hidden="true" />
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-teal-200">
                Teach it back
              </p>
              <h2
                id="explain-back-heading"
                className="mt-0.5 font-display text-base font-semibold text-mist-50"
              >
                Can you explain each section without notes?
              </h2>
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-mist-400">
            Use the first learning objective as a one-sentence retrieval prompt. If the explanation
            does not come in under a minute, reopen the section rather than re-reading the bullet.
          </p>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {sections.map((section) => (
              <li
                key={section.id}
                className="rounded-lg border border-line-soft/70 bg-ink-950/25 px-2.5 py-2"
              >
                <Link
                  to={osPath(`/section/${section.id}`)}
                  className="group flex items-start justify-between gap-2"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.55rem] text-mist-600">
                      {String(section.order).padStart(2, '0')}
                    </span>
                    <span className="mt-0.5 block text-[0.74rem] font-semibold leading-snug text-mist-200 group-hover:text-white">
                      {section.shortTitle}
                    </span>
                    <span className="mt-0.5 block text-[0.66rem] leading-relaxed text-mist-500">
                      {section.objectives[0]?.en}
                    </span>
                  </span>
                  <ArrowRight
                    className="mt-1 h-3.5 w-3.5 flex-none text-mist-600 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-neon"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="no-print mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line-soft bg-ink-900/35 px-4 py-3 text-[0.68rem] text-mist-500">
        <span>
          The cheat sheet is revision, not a replacement for the explanations, visuals, and quiz
          feedback in the teaching sections.
        </span>
        <Link to={`${chapter.path}/assessment`} className="link-arrow shrink-0 text-[0.7rem]">
          Test yourself
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
