import { useEffect, useState } from 'react'
import { Activity, Cpu, HardDrive, Pause, Play, RotateCcw } from 'lucide-react'
import type { LText } from '../../types'
import { useLanguage } from '../../context/LanguageContext'
import { RichText } from '../ui/Text'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

type Mode = 'uniprogramming' | 'multiprogramming'
type SegmentType = 'cpu' | 'io'

interface Segment {
  job: 'A' | 'B'
  type: SegmentType
  start: number
  end: number
}

interface Schedule {
  max: number
  segments: Segment[]
  explanation: LText
}

const schedules: Record<Mode, Schedule> = {
  uniprogramming: {
    max: 24,
    segments: [
      { job: 'A', type: 'cpu', start: 0, end: 4 },
      { job: 'A', type: 'io', start: 4, end: 8 },
      { job: 'A', type: 'cpu', start: 8, end: 12 },
      { job: 'B', type: 'cpu', start: 12, end: 16 },
      { job: 'B', type: 'io', start: 16, end: 20 },
      { job: 'B', type: 'cpu', start: 20, end: 24 },
    ],
    explanation: {
      en: 'One job runs at a time. During each I/O wait the CPU has nothing else resident to run, so it sits idle. Same work, more wall-clock time.',
      ar: 'job واحدة بتشتغل في الوقت. أثناء انتظار الI/O مفيش job تانية resident تشغل الCPU، فتفضل idle. نفس الشغل لكن وقت أطول.',
    },
  },
  multiprogramming: {
    max: 16,
    segments: [
      { job: 'A', type: 'cpu', start: 0, end: 4 },
      { job: 'A', type: 'io', start: 4, end: 8 },
      { job: 'A', type: 'cpu', start: 8, end: 12 },
      { job: 'B', type: 'cpu', start: 4, end: 8 },
      { job: 'B', type: 'io', start: 8, end: 12 },
      { job: 'B', type: 'cpu', start: 12, end: 16 },
    ],
    explanation: {
      en: 'When A waits for I/O, B is already in memory and ready. The CPU stays busy, so both jobs finish sooner. On one CPU, they are interleaved — not literally executing at the same instant.',
      ar: 'لما A تستنى الI/O، B موجودة في الmemory وجاهزة. الCPU تفضل مشغولة والjobs تخلص أسرع. على CPU واحدة التنفيذ متبادل — مش بيحصل في نفس اللحظة حرفيًا.',
    },
  },
}

const span = 24

function pct(value: number): string {
  return `${(value / span) * 100}%`
}

function cpuBusySeconds(mode: Mode): number {
  return schedules[mode].segments
    .filter((segment) => segment.type === 'cpu')
    .reduce((total, segment) => total + (segment.end - segment.start), 0)
}

function JobLane({
  job,
  mode,
  time,
}: {
  job: 'A' | 'B'
  mode: Mode
  time: number
}) {
  const segments = schedules[mode].segments.filter((segment) => segment.job === job)
  return (
    <div className="grid grid-cols-[2rem_1fr] items-center gap-2">
      <span className="font-mono text-[0.75rem] text-mist-400">Job {job}</span>
      <div className="relative h-8 overflow-hidden rounded-md border border-line-soft bg-ink-950/60">
        {segments.map((segment, index) => {
          const active = time >= segment.start && time < segment.end
          const isCpu = segment.type === 'cpu'
          return (
            <div
              key={`${segment.job}-${segment.type}-${index}`}
              className={cn(
                'absolute inset-y-0 flex items-center justify-center border-e border-ink-950/60 font-mono text-[0.62rem] font-semibold transition-all duration-300',
                isCpu
                  ? 'bg-cyan-neon/22 text-cyan-100'
                  : 'bg-violet-neon/22 text-violet-100',
                active ? 'z-10 brightness-125 ring-1 ring-inset ring-white/20' : 'opacity-55',
              )}
              style={{ left: pct(segment.start), width: pct(segment.end - segment.start) }}
            >
              {segment.end - segment.start >= 3 ? (isCpu ? 'CPU' : 'I/O') : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function MultiprogrammingVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [mode, setMode] = useState<Mode>('uniprogramming')
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const { isArabic } = useLanguage()
  const schedule = schedules[mode]
  const utilization = Math.round((cpuBusySeconds(mode) / schedule.max) * 100)

  useEffect(() => {
    if (!playing) return
    if (time >= schedule.max - 1) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(() => setTime((value) => value + 1), 550)
    return () => window.clearTimeout(timer)
  }, [playing, time, schedule.max])

  const switchMode = (next: Mode) => {
    setMode(next)
    setTime(0)
    setPlaying(false)
  }

  const cpuSegment = schedule.segments.find(
    (segment) => segment.type === 'cpu' && time >= segment.start && time < segment.end,
  )
  const jobA = schedule.segments.find(
    (segment) => segment.job === 'A' && time >= segment.start && time < segment.end,
  )
  const jobB = schedule.segments.find(
    (segment) => segment.job === 'B' && time >= segment.start && time < segment.end,
  )

  return (
    <VisualFrame title={title} hint={hint}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex rounded-lg border border-line bg-ink-900/70 p-0.5" role="group" aria-label="Execution mode">
          {(['uniprogramming', 'multiprogramming'] as const).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => switchMode(candidate)}
              className={cn(
                'rounded-md px-2.5 py-1 text-[0.76rem] font-semibold capitalize transition-colors',
                mode === candidate
                  ? 'bg-cyan-neon/15 text-cyan-neon'
                  : 'text-mist-400 hover:text-mist-100',
              )}
              aria-pressed={mode === candidate}
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-teal">
            <Activity className="h-3 w-3" aria-hidden="true" />
            {utilization}% CPU busy
          </span>
          <span className="badge">
            {schedule.max}s total
          </span>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-line-soft bg-ink-950/50 p-3">
        <div className="mb-2 grid grid-cols-[2rem_1fr] items-center gap-2">
          <span className="font-mono text-[0.75rem] text-mist-400">CPU</span>
          <div className="relative h-9 overflow-hidden rounded-md border border-line-soft bg-ink-900/70">
            {(() => {
              let cursor = 0
              const items: React.ReactNode[] = []
              for (const segment of schedule.segments.filter((entry) => entry.type === 'cpu').sort((a, b) => a.start - b.start)) {
                if (segment.start > cursor) {
                  items.push(
                    <div
                      key={`idle-${cursor}`}
                      className="absolute inset-y-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,rgba(130,155,185,0.09)_0,rgba(130,155,185,0.09)_6px,transparent_6px,transparent_12px)] font-mono text-[0.6rem] uppercase tracking-wider text-mist-600"
                      style={{ left: pct(cursor), width: pct(segment.start - cursor) }}
                    >
                      idle
                    </div>,
                  )
                }
                const active = time >= segment.start && time < segment.end
                items.push(
                  <div
                    key={`cpu-${segment.start}-${segment.job}`}
                    className={cn(
                      'absolute inset-y-0 flex items-center justify-center border-e border-ink-950/60 bg-cyan-neon/20 font-mono text-[0.65rem] font-semibold text-cyan-100 transition-all duration-300',
                      active ? 'z-10 brightness-125 ring-1 ring-inset ring-white/20' : 'opacity-55',
                    )}
                    style={{ left: pct(segment.start), width: pct(segment.end - segment.start) }}
                  >
                    {segment.job}
                  </div>,
                )
                cursor = segment.end
              }
              if (cursor < schedule.max) {
                items.push(
                  <div
                    key={`idle-${cursor}`}
                    className="absolute inset-y-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,rgba(130,155,185,0.09)_0,rgba(130,155,185,0.09)_6px,transparent_6px,transparent_12px)] font-mono text-[0.6rem] uppercase tracking-wider text-mist-600"
                    style={{ left: pct(cursor), width: pct(schedule.max - cursor) }}
                  >
                    idle
                  </div>,
                )
              }
              return items
            })()}
            <div
              className="pointer-events-none absolute inset-y-0 z-20 w-px bg-amber-neon"
              style={{ left: pct(Math.min(time + 0.5, schedule.max)) }}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <JobLane job="A" mode={mode} time={time} />
          <JobLane job="B" mode={mode} time={time} />
        </div>

        <div className="ms-[2.5rem] mt-1 flex justify-between font-mono text-[0.6rem] text-mist-600">
          <span>0s</span>
          <span>4</span>
          <span>8</span>
          <span>12</span>
          <span>16</span>
          <span>20</span>
          <span>24s</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => {
            if (time >= schedule.max - 1) setTime(0)
            setPlaying((value) => !value)
          }}
        >
          {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
          {playing ? 'Pause' : time >= schedule.max - 1 ? 'Replay' : 'Run'}
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setPlaying(false)
            setTime(0)
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
        <div className="flex min-w-[12rem] flex-1 items-center gap-2">
          <label htmlFor="multiprogramming-time" className="sr-only">
            Timeline position
          </label>
          <input
            id="multiprogramming-time"
            type="range"
            min={0}
            max={schedule.max - 1}
            value={time}
            onChange={(event) => {
              setPlaying(false)
              setTime(Number(event.target.value))
            }}
            className="h-1.5 w-full accent-cyan-neon"
          />
          <span className="w-10 text-right font-mono text-[0.72rem] text-mist-400">{time}s</span>
        </div>
        <div className="flex items-center gap-2 text-[0.68rem] text-mist-500">
          <span className="inline-flex items-center gap-1">
            <Cpu className="h-3 w-3 text-cyan-neon" /> CPU
          </span>
          <span className="inline-flex items-center gap-1">
            <HardDrive className="h-3 w-3 text-violet-neon" /> I/O
          </span>
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2" aria-live="polite">
        <div className="rounded-lg border border-line-soft bg-ink-900/55 px-3 py-2">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-mist-500">CPU now</p>
          <p className="mt-0.5 text-[0.82rem] font-medium text-mist-100">
            {cpuSegment ? `Running Job ${cpuSegment.job}` : 'Idle — no ready job'}
          </p>
        </div>
        <div className="rounded-lg border border-line-soft bg-ink-900/55 px-3 py-2">
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-mist-500">Job status</p>
          <p className="mt-0.5 text-[0.82rem] font-medium text-mist-100">
            A: {jobA ? (jobA.type === 'cpu' ? 'on CPU' : 'waiting for I/O') : time >= 12 ? 'done' : 'not started'}
            <span className="mx-1.5 text-line">·</span>
            B: {jobB ? (jobB.type === 'cpu' ? 'on CPU' : 'waiting for I/O') : mode === 'uniprogramming' && time < 12 ? 'waiting in memory' : time >= 16 ? 'done' : 'not started'}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3">
        <p className="prose-atlas text-[0.82rem]">{schedule.explanation.en}</p>
        {isArabic && schedule.explanation.ar ? (
          <p className="arabic-note mt-2 text-[0.86rem]" lang="ar" dir="rtl">
            <RichText text={schedule.explanation.ar} />
          </p>
        ) : null}
      </div>
    </VisualFrame>
  )
}
