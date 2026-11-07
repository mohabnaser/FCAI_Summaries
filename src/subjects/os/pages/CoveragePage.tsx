import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Copy,
  FileSearch,
  Flag,
  Layers,
  ListChecks,
  ShieldCheck,
  XCircle,
} from 'lucide-react'
import type { ChapterId, ExamId } from '../types'
import { exams } from '../data/exams'
import { chaptersById, getChapter, sectionInChapter } from '../data/chapters'
import { NotFoundPage } from './NotFoundPage'
import { getQuestionTypeLabel, getStatusLabel } from '../lib/progress'
import { QuestionSources } from '../components/quiz/QuestionMeta'
import { cn } from '../lib/cn'
import { osPath } from '../paths'

export function CoveragePage() {
  const { chapterId = '' } = useParams()
  const known = chaptersById.has(chapterId as ChapterId)
  const chapter = getChapter(chapterId)
  const chapterNumber = Number(chapter.meta.number)
  const { examCoverage, summary: coverageSummary, validate: validateCoverage } = chapter.coverage
  const sectionShort = new Map(chapter.sections.map((section) => [section.id, section.shortTitle]))
  const [examFilter, setExamFilter] = useState<ExamId | 'all'>('all')
  const [query, setQuery] = useState('')
  const [hideExcluded, setHideExcluded] = useState(false)
  const problems = validateCoverage()

  const visibleExams = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return examCoverage.filter((entry) => {
      if (examFilter !== 'all' && entry.audit.examId !== examFilter) return false
      if (!needle) return true
      return (
        exams[entry.audit.examId].label.toLowerCase().includes(needle) ||
        entry.mappings.some(
          (mapping) =>
            mapping.sourceQuestion.toLowerCase().includes(needle) ||
            mapping.question.prompt.toLowerCase().includes(needle) ||
            mapping.question.id.toLowerCase().includes(needle),
        )
      )
    })
  }, [examFilter, query, examCoverage])

  const visibleMappingCount = visibleExams.reduce((sum, entry) => sum + entry.implemented, 0)
  // Implementations this chapter maps (its own and cross-referenced), each listed once.
  const mappedQuestions = [
    ...new Map(examCoverage.flatMap((entry) => entry.mappings).map((mapping) => [mapping.question.id, mapping.question])).values(),
  ]
  const duplicates = mappedQuestions.filter((question) => question.sourceRefs.length > 1)
  const reviewItems = mappedQuestions.filter((question) => question.answerStatus === 'needs-review')

  if (!known) return <NotFoundPage />

  return (
    <div className="fade-up">
      <header className="panel panel-glow relative overflow-hidden p-5 sm:p-6">
        <div
          className="pointer-events-none absolute right-0 top-0 h-48 w-64 bg-grid opacity-45"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="eyebrow">Chapter {chapterNumber}</p>
              <h1 className="section-title mt-2">Coverage ledger</h1>
              <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-mist-300">
                Every question in the seven past papers, with its source and either the section that
                covers it or the reason it is excluded.
              </p>
            </div>
            <span
              className={cn(
                'badge',
                problems.length === 0 ? 'badge-teal' : 'badge-rose',
              )}
            >
              {problems.length === 0 ? (
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              ) : (
                <AlertTriangle className="h-3 w-3" aria-hidden="true" />
              )}
              {problems.length === 0 ? 'Reconciled' : `${problems.length} ledger issues`}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { value: coverageSummary.total, label: 'source items' },
              { value: coverageSummary.relevant, label: 'relevant occurrences' },
              { value: coverageSummary.unique, label: 'unique implementations' },
              { value: coverageSummary.excluded, label: 'excluded items' },
              { value: coverageSummary.duplicatePairs, label: 'duplicate pairs' },
              { value: coverageSummary.review, label: 'flagged review' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5"
              >
                <p className="font-display text-xl font-semibold leading-none text-mist-50">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[0.56rem] uppercase leading-tight tracking-wider text-mist-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[0.66rem] text-mist-500">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-teal-neon" aria-hidden="true" />
              {coverageSummary.relevant} relevant + {coverageSummary.excluded} excluded ={' '}
              {coverageSummary.total} total
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {coverageSummary.relevant} occurrences − {coverageSummary.unique} unique ={' '}
              {coverageSummary.duplicateOccurrences} repeated occurrences
            </span>
            {coverageSummary.crossRef > 0 ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {coverageSummary.crossRef} occurrences mapped to {coverageSummary.unique - coverageSummary.owned} implementations
                  owned by another chapter (shared, never duplicated)
                </span>
              </>
            ) : null}
          </div>

          {problems.length > 0 ? (
            <div className="mt-4 rounded-lg border border-rose-neon/30 bg-rose-neon/[0.05] p-3">
              <p className="font-mono text-[0.58rem] uppercase tracking-wider text-rose-200">
                Validation failures
              </p>
              <ul className="mt-1.5 list-disc space-y-1 ps-4 text-[0.72rem] text-mist-300">
                {problems.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </header>

      <section className="mt-4 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="panel p-4">
          <div className="flex items-center gap-2">
            <FileSearch className="h-4 w-4 text-cyan-neon" aria-hidden="true" />
            <h2 className="font-display text-sm font-semibold text-mist-50">
              How the count was made
            </h2>
          </div>
          <ul className="mt-2.5 space-y-2 text-[0.75rem] leading-relaxed text-mist-400">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-cyan-neon" aria-hidden="true" />
              <span>
                An <strong className="text-mist-200">item</strong> is one individually answerable
                prompt, fill-in blank, definition, or explicitly required essay part.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-cyan-neon" aria-hidden="true" />
              <span>
                An item is <strong className="text-mist-200">relevant</strong> when it tests Chapter {chapterNumber}
                material, including foundation statements used as setup for a later-chapter problem.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-cyan-neon" aria-hidden="true" />
              <span>
                Repeated questions remain separate{' '}
                <strong className="text-mist-200">occurrences</strong> but share one implementation
                when the wording and options are exact duplicates.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-cyan-neon" aria-hidden="true" />
              <span>Each excluded item lists the later-chapter topic it belongs to.</span>
            </li>
          </ul>
        </div>

        <div className="panel p-4">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-violet-neon" aria-hidden="true" />
            <h2 className="font-display text-sm font-semibold text-mist-50">Exam inventory</h2>
          </div>
          <div className="mt-2 space-y-1.5">
            {examCoverage.map((entry) => (
              <div
                key={entry.audit.examId}
                className="flex items-center justify-between gap-2 rounded-md border border-line-soft bg-ink-950/30 px-2.5 py-1.5 text-[0.66rem]"
              >
                <span className="truncate text-mist-300">{exams[entry.audit.examId].shortLabel}</span>
                <span className="flex flex-none items-center gap-1.5 font-mono text-mist-500">
                  <span title="Relevant occurrences">{entry.relevant} rel.</span>
                  <span aria-hidden="true">/</span>
                  <span title="Total indivisible items">{entry.total} total</span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[0.62rem] leading-relaxed text-mist-600">
            Full-course papers also contain questions on later chapters; these are included in the
            total count.
          </p>
        </div>
      </section>

      <section className="panel mt-4 p-4" aria-labelledby="ledger-controls">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[13rem] flex-1">
            <label
              htmlFor="coverage-search"
              className="mb-1 block text-[0.66rem] font-medium text-mist-400"
            >
              Search source labels, prompts, or implementation IDs
            </label>
            <input
              id="coverage-search"
              type="search"
              className="field"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. Q1.44, kernel, dma…"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="coverage-exam"
              className="mb-1 block text-[0.66rem] font-medium text-mist-400"
            >
              Exam
            </label>
            <select
              id="coverage-exam"
              className="field min-w-[12rem]"
              value={examFilter}
              onChange={(event) => setExamFilter(event.target.value as ExamId | 'all')}
            >
              <option value="all">All seven exams</option>
              {examCoverage.map((entry) => (
                <option key={entry.audit.examId} value={entry.audit.examId}>
                  {exams[entry.audit.examId].shortLabel}
                </option>
              ))}
            </select>
          </div>
          <label className="flex min-h-[2.6rem] cursor-pointer items-center gap-2 text-[0.7rem] text-mist-400">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 accent-cyan-400"
              checked={hideExcluded}
              onChange={(event) => setHideExcluded(event.target.checked)}
            />
            Hide excluded groups
          </label>
          <span className="badge badge-cyan">
            {visibleMappingCount} mapped occurrence{visibleMappingCount === 1 ? '' : 's'}
          </span>
        </div>
      </section>

      <div className="mt-4 space-y-4">
        {visibleExams.length === 0 ? (
          <section className="panel p-8 text-center">
            <FileSearch className="mx-auto h-6 w-6 text-mist-500" aria-hidden="true" />
            <h2 className="mt-2 font-display text-base font-semibold text-mist-100">
              No ledger entries match
            </h2>
            <p className="mt-1 text-sm text-mist-500">
              Clear the search or choose “All seven exams” to restore the full audit.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm mt-3"
              onClick={() => {
                setQuery('')
                setExamFilter('all')
              }}
            >
              Reset filters
            </button>
          </section>
        ) : null}

        {visibleExams.map((entry) => {
          const exam = exams[entry.audit.examId]
          const matches = entry.mappings.length === 0
          return (
            <section
              key={entry.audit.examId}
              id={`coverage-${entry.audit.examId}`}
              className="panel scroll-mt-24 overflow-hidden"
              aria-labelledby={`coverage-${entry.audit.examId}-title`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line-soft bg-ink-900/35 px-4 py-3 sm:px-5">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-line bg-ink-950/55">
                    <ListChecks className="h-4 w-4 text-cyan-neon" aria-hidden="true" />
                  </span>
                  <div>
                    <h2
                      id={`coverage-${entry.audit.examId}-title`}
                      className="font-display text-base font-semibold text-mist-50"
                    >
                      {exam.label}
                    </h2>
                    <p className="mt-0.5 text-[0.66rem] text-mist-500">
                      {exam.term} · <span className="font-mono">{exam.file}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="badge">{entry.total} total items</span>
                  <span className="badge badge-amber">{entry.relevant} relevant</span>
                  <span className="badge">{entry.excluded} excluded</span>
                  {entry.review > 0 ? (
                    <span className="badge badge-rose">{entry.review} review</span>
                  ) : null}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.64rem]">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1',
                      entry.relevant + entry.excluded === entry.total
                        ? 'text-teal-200'
                        : 'text-rose-200',
                    )}
                  >
                    {entry.relevant + entry.excluded === entry.total ? (
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-3 w-3" aria-hidden="true" />
                    )}
                    Counts reconcile: {entry.relevant} + {entry.excluded} = {entry.total}
                  </span>
                  <span className="text-mist-600" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-mist-500">
                    {entry.implemented}/{entry.relevant} relevant occurrences mapped
                  </span>
                  {entry.missing.length > 0 ? (
                    <span className="text-rose-200">
                      Missing: {entry.missing.join(', ')}
                    </span>
                  ) : null}
                </div>

                {entry.audit.notes.length > 0 ? (
                  <ul className="mt-2.5 space-y-1 rounded-lg border border-line-soft bg-ink-950/25 p-2.5">
                    {entry.audit.notes.map((note) => (
                      <li key={note} className="text-[0.68rem] leading-relaxed text-mist-500">
                        {note}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {matches ? (
                  <div className="mt-3 rounded-lg border border-line-soft bg-ink-950/25 p-3 text-[0.72rem] text-mist-500">
                    No Chapter {chapterNumber} item was identified in this paper. Every item belongs to a later
                    chapter; the exclusions below account for the complete paper.
                  </div>
                ) : null}

                <div className="mt-3">
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-mist-500">
                    Relevant source occurrences
                  </p>
                  <div className="mt-1.5 space-y-2">
                    {entry.mappings.map((mapping) => {
                      const targetSection = sectionInChapter(chapter, mapping.question)
                      return (
                        <article
                          key={`${mapping.examId}:${mapping.sourceQuestion}`}
                          className="rounded-lg border border-line-soft bg-ink-950/30 p-3"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="badge badge-cyan">
                                {mapping.sourceQuestion}
                              </span>
                              <span className="badge">{getQuestionTypeLabel(mapping.question)}</span>
                              <span
                                className={cn(
                                  'badge',
                                  mapping.question.unscored
                                    ? 'badge-rose'
                                    : mapping.question.answerStatus === 'needs-review'
                                      ? 'badge-rose'
                                      : 'badge-teal',
                                )}
                              >
                                {mapping.question.unscored ? (
                                  <Flag className="h-2.5 w-2.5" aria-hidden="true" />
                                ) : null}
                                {getStatusLabel(mapping.question)}
                              </span>
                              {mapping.question.origin === 'historical' ? (
                                <span className="badge badge-amber">Past exam</span>
                              ) : null}
                              {mapping.crossRef ? (
                                <span className="badge badge-violet">Shared with Chapter {Number(mapping.question.chapterId?.split('-')[1] ?? 1)}</span>
                              ) : null}
                            </div>
                            <span className="font-mono text-[0.56rem] text-mist-600">
                              {mapping.implementationId}
                            </span>
                          </div>
                          <p className="mt-1.5 text-[0.8rem] leading-relaxed text-mist-200">
                            {mapping.question.prompt.replace(/\{\{\d+\}\}/g, '____')}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                            {targetSection ? (
                              <Link
                                to={osPath(`/section/${targetSection.id}#quiz`)}
                                className="inline-flex items-center gap-1 text-[0.64rem] font-medium text-cyan-200 hover:text-cyan-100"
                              >
                                <BookOpen className="h-3 w-3" aria-hidden="true" />
                                {sectionShort.get(targetSection.id) ?? targetSection.shortTitle}
                              </Link>
                            ) : null}
                            <QuestionSources question={mapping.question} />
                          </div>
                        </article>
                      )
                    })}
                    {entry.mappings.length === 0 ? (
                      <p className="text-[0.7rem] text-mist-500">
                        No Chapter {chapterNumber} implementation is needed for this paper.
                      </p>
                    ) : null}
                  </div>
                </div>

                {!hideExcluded && entry.audit.excludedGroups.length > 0 ? (
                  <details className="group mt-3 rounded-lg border border-line-soft bg-ink-950/25">
                    <summary className="flex cursor-pointer select-none flex-wrap items-center gap-2 px-3 py-2 text-[0.68rem] font-medium text-mist-400 hover:text-mist-100">
                      <Layers className="h-3.5 w-3.5 text-violet-neon" aria-hidden="true" />
                      Documented exclusions ({entry.excluded})
                      <span className="font-mono text-[0.56rem] text-mist-600">
                        later-chapter material
                      </span>
                    </summary>
                    <div className="border-t border-line-soft px-3 py-2.5">
                      <div className="space-y-1.5">
                        {entry.audit.excludedGroups.map((group) => (
                          <div
                            key={group.ids}
                            className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 rounded-md border border-line-soft/60 bg-ink-900/30 px-2.5 py-1.5"
                          >
                            <span className="font-mono text-[0.62rem] text-mist-300">{group.ids}</span>
                            <span className="text-[0.66rem] leading-relaxed text-mist-500">
                              {group.reason}
                            </span>
                            <span className="badge !py-0 !text-[0.52rem]">{group.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                ) : null}

                {hideExcluded && entry.excluded > 0 ? (
                  <p className="mt-3 text-[0.62rem] text-mist-600">
                    {entry.excluded} documented exclusion{entry.excluded === 1 ? '' : 's'} hidden by
                    your filter.
                  </p>
                ) : null}
              </div>
            </section>
          )
        })}
      </div>

      <section className="mt-6 grid gap-3 lg:grid-cols-2">
        <div className="panel p-4 sm:p-5" aria-labelledby="duplicates-heading">
          <div className="flex items-center gap-2">
            <Copy className="h-4 w-4 text-violet-neon" aria-hidden="true" />
            <h2
              id="duplicates-heading"
              className="font-display text-base font-semibold text-mist-50"
            >
              Shared implementations ({duplicates.length})
            </h2>
          </div>
          <p className="mt-2 text-[0.76rem] leading-relaxed text-mist-500">
            These source occurrences share one implementation because their wording and options are
            exact duplicates. Both exam labels remain attached to the question.
          </p>
          <div className="mt-2.5 space-y-2">
            {duplicates.map((question) => (
              <div
                key={question.id}
                className="rounded-lg border border-line-soft bg-ink-950/30 p-2.5"
              >
                <p className="line-clamp-2 text-[0.74rem] leading-snug text-mist-300">
                  {question.prompt.replace(/\{\{\d+\}\}/g, '____')}
                </p>
                <div className="mt-1.5">
                  <QuestionSources question={question} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-4 sm:p-5" aria-labelledby="review-heading">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-amber-neon" aria-hidden="true" />
            <h2 id="review-heading" className="font-display text-base font-semibold text-mist-50">
              Flagged review items ({reviewItems.length})
            </h2>
          </div>
          <p className="mt-2 text-[0.76rem] leading-relaxed text-mist-500">
            The scan or wording does not support a single defensible answer with full confidence.
            These items stay visible in their section quizzes with the best-supported reading, but are
            excluded from every score denominator.
          </p>
          <div className="mt-2.5 space-y-2">
            {reviewItems.map((question) => (
              <div
                key={question.id}
                className="rounded-lg border border-amber-neon/25 bg-amber-neon/[0.04] p-2.5"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="badge badge-rose">
                    <Flag className="h-2.5 w-2.5" aria-hidden="true" />
                    Unscored
                  </span>
                  <span className="badge">{sectionShort.get(question.sectionId)}</span>
                </div>
                <p className="mt-1.5 text-[0.74rem] leading-relaxed text-mist-200">
                  {question.prompt.replace(/\{\{\d+\}\}/g, '____')}
                </p>
                <p className="mt-1 text-[0.66rem] leading-relaxed text-mist-500">
                  {question.explanation.en}
                </p>
                <div className="mt-1.5">
                  <QuestionSources question={question} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line-soft bg-ink-900/35 px-4 py-3 text-[0.68rem] text-mist-500">
        <span>
          Completeness claim: all {coverageSummary.relevant} relevant occurrences across{' '}
          {examCoverage.length} papers are implemented. Section quizzes contain all historical items
          assigned to their sections.
        </span>
        <Link to={`${chapter.path}/review`} className="link-arrow shrink-0 text-[0.7rem]">
          Final review
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
