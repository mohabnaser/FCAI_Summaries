import { useEffect, useState } from 'react'
import { Activity, Cpu, HardDrive, Zap } from 'lucide-react'
import type { LText } from '../../types'
import { RichText } from '../ui/Text'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

const steps = [
  {
    title: 'A process is running',
    description: {
      en: 'The CPU is executing process A. The I/O device is idle.',
      ar: 'الCPU بتنفذ process A، والI/O device مشغول في حاجة تانية (idle).',
    },
    note: {
      en: 'Without an event mechanism, the OS would have to keep checking the device.',
      ar: 'من غير event mechanism، الOS كان لازم يفضل يفحص الجهاز.',
    },
  },
  {
    title: 'A raises an I/O request',
    description: {
      en: 'Process A requests a disk read. The controller starts the transfer; the CPU can switch to another ready process.',
      ar: 'Process A بتطلب disk read. الcontroller يبدأ النقل، والCPU تقدر تروح لprocess جاهزة تانية.',
    },
    note: {
      en: 'Overlap begins: the CPU does not have to sit idle during the device transfer.',
      ar: 'الoverlap يبدأ: الCPU مش مضطرة تقعد idle أثناء نقل الجهاز.',
    },
  },
  {
    title: 'CPU and device overlap',
    description: {
      en: 'The CPU runs process B while the device continues transferring A’s data. Two kinds of work are happening at once.',
      ar: 'الCPU بتشغل process B والجهاز مكمل نقل بيانات A. نوعين شغل بيحصلوا في نفس الوقت.',
    },
    note: {
      en: 'This overlap is the practical benefit of interrupt-driven I/O and multiprogramming.',
      ar: 'الoverlap ده هو الفايدة العملية للinterrupt-driven I/O وmultiprogramming.',
    },
  },
  {
    title: 'The device raises an interrupt',
    description: {
      en: 'The transfer completes. The controller asserts an interrupt; the CPU stops its current instruction flow and transfers control to the OS.',
      ar: 'النقل خلص. الcontroller يعمل interrupt؛ والCPU توقف مسار التعليمات الحالي وتحول التحكم للOS.',
    },
    note: {
      en: 'The interrupt architecture saves the interrupted instruction’s address so execution can resume.',
      ar: 'الinterrupt architecture بتحفظ عنوان التعليمة المقطوعة عشان التنفيذ يرجع يكمل.',
    },
  },
  {
    title: 'Handle, restore, resume',
    description: {
      en: 'The OS saves CPU state, runs the appropriate interrupt service routine, restores the saved state, and resumes a ready process.',
      ar: 'الOS يحفظ حالة الCPU، يشغل الinterrupt service routine المناسبة، يرجع الحالة المحفوظة، ويكمل process جاهزة.',
    },
    note: {
      en: 'An interrupt vector supplies the handler address; polling is an alternative way to identify the source.',
      ar: 'الinterrupt vector بيوفر عنوان الhandler؛ والpolling طريقة بديلة لتحديد المصدر.',
    },
  },
] as const

const cpuSegments = [
  { id: 'a1', label: 'A', start: 0, end: 2, tone: 'cyan', stages: [0, 1] },
  { id: 'b', label: 'B', start: 2, end: 4, tone: 'teal', stages: [2, 3] },
  { id: 'kernel', label: 'OS / ISR', start: 4, end: 5, tone: 'amber', stages: [4] },
  { id: 'a2', label: 'A resumes', start: 5, end: 6, tone: 'cyan', stages: [4] },
] as const

const deviceSegments = [
  { id: 'idle1', label: 'idle', start: 0, end: 1, tone: 'muted', stages: [0] },
  { id: 'transfer', label: 'transfer', start: 1, end: 3, tone: 'violet', stages: [1, 2] },
  { id: 'done', label: 'done', start: 3, end: 4, tone: 'amber', stages: [3] },
  { id: 'idle2', label: 'idle', start: 4, end: 6, tone: 'muted', stages: [4] },
] as const

const toneClasses = {
  cyan: 'border-cyan-neon/50 bg-cyan-neon/15 text-cyan-100',
  teal: 'border-teal-neon/50 bg-teal-neon/15 text-teal-100',
  violet: 'border-violet-neon/50 bg-violet-neon/15 text-violet-100',
  amber: 'border-amber-neon/55 bg-amber-neon/15 text-amber-100',
  muted: 'border-line bg-ink-800/60 text-mist-500',
} as const

function TimelineLane({
  icon: Icon,
  label,
  segments,
  step,
}: {
  icon: typeof Cpu
  label: string
  segments: readonly { id: string; label: string; start: number; end: number; tone: keyof typeof toneClasses; stages: readonly number[] }[]
  step: number
}) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[4.5rem_1fr] sm:items-center sm:gap-2">
      <div className="flex items-center gap-1.5 text-[0.72rem] font-medium text-mist-400 sm:text-[0.78rem]">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </div>
      <div className="relative h-10 overflow-hidden rounded-lg border border-line-soft bg-ink-950/65">
        {segments.map((segment) => {
          const active = segment.stages.includes(step)
          return (
            <div
              key={segment.id}
              className={cn(
                'absolute inset-y-0 flex items-center justify-center border-e px-0.5 text-center font-mono text-[0.62rem] font-semibold leading-tight tracking-tight transition-all duration-300 sm:px-1 sm:text-[0.65rem] sm:tracking-normal',
                toneClasses[segment.tone],
                active ? 'z-10 opacity-100 shadow-[0_0_24px_-6px_rgba(37,216,242,0.6)]' : 'opacity-40',
              )}
              style={{
                left: `${(segment.start / 6) * 100}%`,
                width: `${((segment.end - segment.start) / 6) * 100}%`,
              }}
            >
              <span className="break-words">{segment.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function InterruptTimelineVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const { isArabic } = useLanguage()
  const current = steps[step]

  useEffect(() => {
    if (!playing) return
    if (step >= steps.length - 1) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(() => setStep((value) => value + 1), 1500)
    return () => window.clearTimeout(timer)
  }, [playing, step])

  const togglePlay = () => {
    if (!playing && step >= steps.length - 1) setStep(0)
    setPlaying((value) => !value)
  }

  return (
    <VisualFrame title={title} hint={hint}>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {steps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  setPlaying(false)
                  setStep(index)
                }}
                className={cn(
                  'flex-none rounded-full border px-2.5 py-1 font-mono text-[0.7rem] transition-colors',
                  index === step
                    ? 'border-cyan-neon/55 bg-cyan-neon/10 text-cyan-neon'
                    : 'border-line bg-ink-900/70 text-mist-500 hover:text-mist-200',
                )}
                aria-pressed={index === step}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {step === 3 ? (
            <span className="inline-flex items-center gap-1 badge badge-amber">
              <Zap className="h-3 w-3" aria-hidden="true" />
              interrupt
            </span>
          ) : (
            <span className="badge">
              <Activity className="h-3 w-3" aria-hidden="true" />
              step {step + 1}
            </span>
          )}
        </div>

        <div className="rounded-xl border border-line-soft bg-ink-950/45 p-3">
          <div className="mb-1.5 flex items-center justify-between text-[0.7rem] text-mist-600">
            <span className="font-mono uppercase tracking-wider">Timeline</span>
            <span>time →</span>
          </div>
          <TimelineLane icon={Cpu} label="CPU" segments={cpuSegments} step={step} />
          <div className="relative my-1 h-5">
            {step === 3 ? (
              <div className="absolute inset-x-10 top-0 flex items-center gap-1 text-[0.7rem] text-amber-neon">
                <span className="h-px flex-1 bg-amber-neon/40" />
                <Zap className="h-3 w-3" aria-hidden="true" />
                <span className="font-mono">device → CPU interrupt</span>
                <span className="h-px flex-1 bg-amber-neon/40" />
              </div>
            ) : null}
          </div>
          <TimelineLane icon={HardDrive} label="Device" segments={deviceSegments} step={step} />
          <div className="ml-0 mt-1.5 grid grid-cols-6 text-center font-mono text-[0.65rem] text-mist-600 sm:ml-[4.5rem]">
            {[0, 1, 2, 3, 4, 5].map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-cyan-neon/20 bg-cyan-neon/[0.04] p-3.5" aria-live="polite">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cyan-neon">
            {current.title}
          </p>
          <p className="prose-atlas mt-1 text-[0.92rem]">{current.description.en}</p>
          {isArabic && current.description.ar ? (
            <p className="arabic-note mt-2 text-[0.88rem]" lang="ar" dir="rtl">
              <RichText text={current.description.ar} />
            </p>
          ) : null}
          <p className="mt-2 border-t border-line-soft pt-2 text-[0.82rem] leading-relaxed text-mist-400">
            <span className="font-medium text-mist-300">Why it matters: </span>
            {current.note.en}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setPlaying(false)
                setStep((value) => Math.max(0, value - 1))
              }}
              disabled={step === 0}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setPlaying(false)
                setStep((value) => Math.min(steps.length - 1, value + 1))
              }}
              disabled={step >= steps.length - 1}
            >
              Next
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={togglePlay}>
              {playing ? 'Pause' : step >= steps.length - 1 ? 'Replay' : 'Play'}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setPlaying(false)
                setStep(0)
              }}
            >
              Reset
            </button>
          </div>
          <div className="flex items-center gap-2 text-[0.7rem] text-mist-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-cyan-neon" /> CPU work
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-violet-neon" /> device transfer
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-amber-neon" /> OS / interrupt
            </span>
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}
