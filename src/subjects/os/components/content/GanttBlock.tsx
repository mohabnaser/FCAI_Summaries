import { useMemo } from 'react'
import type { Block } from '../../types'
import { algorithmLabels, schedule } from '../../lib/scheduling'
import { BilingualProse, RichText } from '../ui/Text'
import { useLanguage } from '../../context/LanguageContext'
import { GanttChart, ResultsTable } from '../visuals/chapter6/gantt'

type GanttBlockData = Extract<Block, { kind: 'gantt' }>

/**
 * A worked scheduling example. The chart and every number in the table are
 * computed from the process list, so the page can never disagree with itself.
 */
export function GanttBlock({ block }: { block: GanttBlockData }) {
  const { isArabic } = useLanguage()
  const result = useMemo(
    () => schedule(block.processes, block.algorithm, { quantum: block.quantum, rrTie: block.rrTie }),
    [block],
  )
  const order = block.processes.map((process) => process.id)
  const showArrival = block.showArrival ?? block.processes.some((process) => process.arrival !== 0)
  const showPriority = block.showPriority ?? block.processes.some((process) => process.priority !== undefined)
  const label = `${algorithmLabels[block.algorithm]}${block.algorithm === 'rr' ? ` · q = ${block.quantum ?? 4}` : ''}`

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-line bg-ink-900/35 shadow-lg">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-neon via-amber-neon to-transparent" aria-hidden="true" />
      <div className="border-b border-line-soft bg-ink-950/40 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="content-card-tag !border-cyan-neon/30 !bg-cyan-neon/10 !text-cyan-neon">Worked example</span>
          <span className="font-mono text-[0.74rem] text-mist-400">{label}</span>
        </div>
        {block.title ? (
          <h3 className="mt-2 font-display text-[1.15rem] font-semibold leading-snug text-mist-50">
            <RichText text={block.title.en} />
          </h3>
        ) : null}
        {block.title?.ar && isArabic ? (
          <p className="arabic-note mt-1.5 text-[0.88rem]" lang="ar" dir="rtl">
            <RichText text={block.title.ar} />
          </p>
        ) : null}
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        {!block.chartOnly ? (
          <div className="flex flex-wrap gap-1.5 font-mono text-[0.78rem]">
            {block.processes.map((process) => (
              <span key={process.id} className="rounded-md border border-line bg-ink-850 px-2 py-1 text-mist-300">
                <strong className="text-mist-100">{process.id}</strong>
                {showArrival ? ` · arr ${process.arrival}` : ''} · burst {process.burst}
                {showPriority && process.priority !== undefined ? ` · pri ${process.priority}` : ''}
              </span>
            ))}
          </div>
        ) : null}
        <GanttChart slices={result.slices} order={order} label={label} />
        {!block.chartOnly ? <ResultsTable schedule={result} showArrival={showArrival} showPriority={showPriority} /> : null}
        {block.caption ? <BilingualProse text={block.caption} className="text-[0.92rem]" /> : null}
      </div>
    </figure>
  )
}
