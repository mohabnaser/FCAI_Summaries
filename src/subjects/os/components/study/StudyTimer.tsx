import { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Timer } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { formatClock } from '../../lib/grading'
import { cn } from '../../lib/cn'

interface StudyTimerProps {
  sectionId: string
  estimatedMinutes: number
}

/**
 * A deliberately lightweight timer. It never force-pauses the page or navigates
 * when the target is reached; it simply records active study seconds to progress.
 */
export function StudyTimer({ sectionId, estimatedMinutes }: StudyTimerProps) {
  const { addElapsed } = useProgress()
  const [running, setRunning] = useState(false)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const committedRef = useRef(0)

  useEffect(() => {
    if (!running) return
    const interval = window.setInterval(() => {
      setActive((previous) => {
        const next = previous + 1
        activeRef.current = next
        return next
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [running])

  const flush = useCallback(() => {
    const delta = activeRef.current - committedRef.current
    if (delta > 0) {
      committedRef.current = activeRef.current
      addElapsed(sectionId, delta)
    }
  }, [addElapsed, sectionId])

  useEffect(() => {
    if (!running) return
    const interval = window.setInterval(flush, 5000)
    return () => {
      window.clearInterval(interval)
      flush()
    }
  }, [running, flush])

  useEffect(() => {
    return () => flush()
  }, [flush])

  const reset = () => {
    flush()
    setRunning(false)
    setActive(0)
    activeRef.current = 0
    committedRef.current = 0
  }

  const target = Math.max(1, estimatedMinutes * 60)
  const progress = Math.min(100, (active / target) * 100)
  const reached = active >= target

  return (
    <div className="concept-card flex h-full flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="block-label text-violet-neon">
              <Timer className="h-3.5 w-3.5" aria-hidden="true" />
              Study timer
            </p>
            <p className="mt-1.5 text-[0.8rem] text-mist-500">
              Reading target · {estimatedMinutes} min
            </p>
          </div>
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 font-mono text-[0.68rem]',
              reached
                ? 'border-teal-neon/30 bg-teal-neon/10 text-teal-100'
                : 'border-line bg-ink-950/40 text-mist-500',
            )}
          >
            {reached ? 'Target reached' : `${Math.round(progress)}%`}
          </span>
        </div>

        <p
          className={cn(
            'mt-5 font-display text-[2.6rem] font-semibold leading-none tabular-nums tracking-tight',
            reached ? 'text-teal-neon' : 'text-mist-50',
          )}
          role="timer"
          aria-label={`Active study time ${formatClock(active)}`}
        >
          {formatClock(active)}
        </p>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink-700">
          <div
            className={cn(
              'h-full rounded-full transition-[width] duration-500',
              reached
                ? 'bg-gradient-to-r from-teal-neon to-lime-neon'
                : 'bg-gradient-to-r from-violet-neon to-cyan-neon',
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cn('btn btn-sm flex-1', running ? 'btn-secondary' : 'btn-primary')}
            onClick={() => setRunning((value) => !value)}
            aria-pressed={running}
          >
            {running ? (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {running ? 'Pause session' : active > 0 ? 'Resume session' : 'Start session'}
          </button>
          <button
            type="button"
            className="icon-btn h-9 w-9 border border-line/70"
            onClick={reset}
            aria-label="Reset session timer"
            title="Reset session timer"
            disabled={active === 0 && !running}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-3 text-[0.78rem] leading-relaxed text-mist-500">
          {reached
            ? 'Target time reached.'
            : running
              ? 'Timing this session. Reading and quiz time both count.'
              : 'Time is only counted while the timer runs.'}
        </p>
      </div>
    </div>
  )
}
