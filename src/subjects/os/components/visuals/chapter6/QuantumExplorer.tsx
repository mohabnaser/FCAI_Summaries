import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import type { LText } from '../../../types'
import { fmt, schedule, type ProcSpec } from '../../../lib/scheduling'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'
import { GanttChart } from './gantt'

/** The lecture's turnaround-vs-quantum process set. */
const procs: ProcSpec[] = [
  { id: 'P1', arrival: 0, burst: 6 },
  { id: 'P2', arrival: 0, burst: 3 },
  { id: 'P3', arrival: 0, burst: 1 },
  { id: 'P4', arrival: 0, burst: 7 },
]
const QS = [1, 2, 3, 4, 5, 6, 7]
const curve = QS.map((q) => schedule(procs, 'rr', { quantum: q }).avgTurnaround)

export function QuantumExplorerVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [q, setQ] = useState(4)
  const result = schedule(procs, 'rr', { quantum: q })
  const fcfs = schedule(procs, 'fcfs')
  const behavesLikeFcfs = result.slices.length === fcfs.slices.length
  const pieces = Math.ceil(10 / q)
  const switches = pieces - 1
  const shorter = procs.filter((proc) => proc.burst <= q).length
  const X = (qq: number) => 44 + ((qq - 1) / 6) * 500
  const Y = (v: number) => 150 - ((v - 9.5) / 3.5) * 130

  const verdict: LText = behavesLikeFcfs
    ? {
        en: `q = ${q} is at least as long as every burst, so no process is ever preempted: RR has become **FCFS**.`,
        ar: `q = ${q} أطول من أو بيساوي كل الـ bursts، فمفيش process بيتعملها preempt: الـ RR بقى **FCFS**.`,
      }
    : q <= 1
      ? {
          en: 'q = 1: very fair and responsive, but the CPU switches after **every** time unit. If a context switch is not much shorter than q, the overhead dominates.',
          ar: 'q = 1: عادل جدًا وسريع الاستجابة، بس الـ CPU بيبدّل بعد **كل** وحدة زمن. ولو الـ context switch مش أقصر بكتير من q، الـ overhead هو اللي بيكسب.',
        }
      : {
          en: `q = ${q}: ${shorter} of the 4 bursts fit in one quantum. The rule of thumb: about **80% of CPU bursts should be shorter than q**.`,
          ar: `q = ${q}: ${shorter} من الـ 4 bursts بيخلصوا في quantum واحد. القاعدة: حوالي **80% من الـ CPU bursts لازم تكون أقصر من q**.`,
        }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Change q and watch the switches and the average turnaround.' }}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist-500">Time quantum q</span>
        <div className="flex items-center gap-1">
          <button type="button" className="icon-btn !h-8 !w-8" aria-label="Smaller quantum" onClick={() => setQ((value) => Math.max(1, value - 1))} disabled={q <= 1}>
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-10 text-center font-display text-[1.6rem] font-bold text-mist-50" aria-live="polite">{q}</span>
          <button type="button" className="icon-btn !h-8 !w-8" aria-label="Larger quantum" onClick={() => setQ((value) => Math.min(12, value + 1))} disabled={q >= 12}>
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="ms-auto flex flex-wrap gap-2 font-mono text-[0.78rem]">
          <span className="rounded-lg border border-line bg-ink-850 px-2.5 py-1 text-mist-300">avg turnaround <strong className="text-cyan-neon">{fmt(result.avgTurnaround)}</strong></span>
          <span className="rounded-lg border border-line bg-ink-850 px-2.5 py-1 text-mist-300">context switches <strong className="text-amber-neon">{result.contextSwitches}</strong></span>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mist-500">P1 = 6, P2 = 3, P3 = 1, P4 = 7 · RR (q = {q})</p>
        <GanttChart slices={result.slices} order={procs.map((proc) => proc.id)} label={`Round robin, q = ${q}`} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mist-500">Average turnaround vs q</p>
          <svg viewBox="0 0 560 180" className="w-full" role="img" aria-label={`Average turnaround for q = 1 to 7: ${curve.map((v) => fmt(v)).join(', ')}`}>
            {[10, 11, 12, 13].map((v) => (
              <g key={v}>
                <line x1={44} x2={544} y1={Y(v)} y2={Y(v)} strokeWidth={1} style={{ stroke: 'var(--color-line-soft)' }} />
                <text x={36} y={Y(v) + 4} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" style={{ fill: 'var(--color-mist-500)' }}>{v}</text>
              </g>
            ))}
            <path d={curve.map((v, i) => `${i ? 'L' : 'M'} ${X(QS[i])} ${Y(v)}`).join(' ')} fill="none" strokeWidth={2.6} style={{ stroke: 'var(--color-cyan-neon)' }} />
            {curve.map((v, i) => (
              <g key={i} onClick={() => setQ(QS[i])} style={{ cursor: 'pointer' }}>
                <circle cx={X(QS[i])} cy={Y(v)} r={QS[i] === q ? 7 : 4.5} strokeWidth={2} style={{ fill: QS[i] === q ? 'var(--color-amber-neon)' : 'var(--color-ink-900)', stroke: 'var(--color-cyan-neon)' }} />
                <text x={X(QS[i])} y={172} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" style={{ fill: QS[i] === q ? 'var(--color-mist-50)' : 'var(--color-mist-500)' }}>{QS[i]}</text>
              </g>
            ))}
          </svg>
          <p className="text-[0.76rem] text-mist-500">Turnaround does not simply improve as q grows — it zig-zags.</p>
        </div>

        <div>
          <p className="mb-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mist-500">One process of 10 time units</p>
          <div className="flex h-10 overflow-hidden rounded-lg border border-line" role="img" aria-label={`${pieces} pieces, ${switches} context switches`}>
            {Array.from({ length: pieces }, (_, i) => {
              const len = Math.min(q, 10 - i * q)
              return (
                <div key={i} className={cn('flex items-center justify-center border-r border-ink-950 font-mono text-[0.7rem] font-bold last:border-r-0', i % 2 ? 'bg-violet-neon/25 text-violet-neon' : 'bg-cyan-neon/25 text-cyan-neon')} style={{ width: `${len * 10}%` }}>
                  {len >= 1 && pieces <= 10 ? len : ''}
                </div>
              )
            })}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5 text-center font-mono text-[0.76rem]">
            {[12, 6, 1].map((value) => (
              <button key={value} type="button" onClick={() => setQ(value)} className={cn('rounded-lg border px-2 py-1.5', value === q ? 'border-amber-neon bg-amber-neon/12 text-mist-50' : 'border-line bg-ink-850 text-mist-300')}>
                q = {value} → {Math.ceil(10 / value) - 1} switches
              </button>
            ))}
          </div>
          <p className="mt-2 text-[0.8rem] text-mist-300">
            q = {q}: this 10-unit process is cut into {pieces} piece{pieces === 1 ? '' : 's'} → <strong className="text-amber-neon">{switches}</strong> context switch{switches === 1 ? '' : 'es'}.
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-line bg-ink-850 p-3.5" aria-live="polite">
        <BilingualProse text={verdict} className="text-[0.92rem]" />
      </div>
    </VisualFrame>
  )
}
