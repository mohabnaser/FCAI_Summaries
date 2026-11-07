import { useMemo, useState } from 'react'
import { ArrowRight, FileText } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { StepControls, VisualFrame } from '../VisualFrame'

type Scenario = 'normal' | 'missing-input' | 'output-exists'
type Category = 'device' | 'file' | 'process'

interface Call {
  label: string
  category: Category
  note?: string
}

const categoryStyle: Record<Category, { label: string; chip: string }> = {
  device: { label: 'device / console I/O', chip: 'border-violet-neon/40 bg-violet-neon/[0.08] text-violet-neon' },
  file: { label: 'file management', chip: 'border-teal-neon/40 bg-teal-neon/[0.08] text-teal-neon' },
  process: { label: 'process control', chip: 'border-amber-neon/40 bg-amber-neon/[0.08] text-amber-neon' },
}

const BLOCKS = 3

function buildCalls(scenario: Scenario): Call[] {
  const calls: Call[] = [
    { label: 'Write prompt to screen', category: 'device', note: 'acquire input file name' },
    { label: 'Accept input', category: 'device', note: 'acquire input file name' },
    { label: 'Write prompt to screen', category: 'device', note: 'acquire output file name' },
    { label: 'Accept input', category: 'device', note: 'acquire output file name' },
    { label: 'Open the input file', category: 'file' },
  ]
  if (scenario === 'missing-input') {
    return [...calls, { label: 'File doesn’t exist → abort', category: 'process', note: 'abnormal termination' }]
  }
  calls.push({ label: 'Create output file', category: 'file' })
  if (scenario === 'output-exists') {
    return [...calls, { label: 'File exists → abort', category: 'process', note: 'abnormal termination' }]
  }
  for (let block = 1; block <= BLOCKS; block += 1) {
    calls.push({ label: `Read from input file (block ${block})`, category: 'file', note: 'loop' })
    calls.push({ label: `Write to output file (block ${block})`, category: 'file', note: 'loop' })
  }
  calls.push(
    { label: 'Read from input file → fails (end of file)', category: 'file', note: 'loop ends: until read fails' },
    { label: 'Close output file', category: 'file' },
    { label: 'Write completion message to screen', category: 'device' },
    { label: 'Terminate normally', category: 'process' },
  )
  return calls
}

const scenarioText: Record<Scenario, { label: string; text: LText }> = {
  normal: {
    label: 'Everything exists',
    text: {
      en: 'A trivial program, yet every step asks the OS for something. Even a 3-block file needs well over a dozen system calls.',
      ar: 'برنامج بسيط جدًا، ومع ذلك كل خطوة بتطلب حاجة من الـ OS. حتى file فيه 3 blocks محتاج أكتر من 12 system call.',
    },
  },
  'missing-input': {
    label: 'Input file missing',
    text: {
      en: '“If file doesn’t exist, abort” — the program ends abnormally right after open() fails.',
      ar: '“If file doesn’t exist, abort” — البرنامج بيخلص abnormally على طول بعد ما الـ open() تفشل.',
    },
  },
  'output-exists': {
    label: 'Output already exists',
    text: {
      en: '“If file exists, abort” — creating the output file fails, so the copy never starts.',
      ar: '“If file exists, abort” — إنشاء الـ output file بيفشل، فالنسخ مش بيبدأ أصلًا.',
    },
  },
}

export function FileCopySyscallsVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [scenario, setScenario] = useState<Scenario>('normal')
  const [step, setStep] = useState(0)
  const calls = useMemo(() => buildCalls(scenario), [scenario])
  const done = calls.slice(0, step + 1)
  const counts = done.reduce<Record<Category, number>>(
    (acc, call) => ({ ...acc, [call.category]: acc[call.category] + 1 }),
    { device: 0, file: 0, process: 0 },
  )

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Pick a scenario and step through the calls.' }}>
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(scenarioText) as Scenario[]).map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => {
              setScenario(candidate)
              setStep(0)
            }}
            aria-pressed={scenario === candidate}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-[0.8rem] font-semibold transition-colors',
              scenario === candidate
                ? 'border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon'
                : 'border-line-soft bg-ink-900/50 text-mist-400 hover:text-mist-100',
            )}
          >
            {scenarioText[candidate].label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 rounded-xl border border-line-soft bg-ink-950/50 px-3 py-2.5 text-[0.82rem] text-mist-200">
        <span className="inline-flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-teal-neon" aria-hidden="true" /> source file
        </span>
        <ArrowRight className="h-4 w-4 text-mist-500" aria-hidden="true" />
        <span className="inline-flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-amber-neon" aria-hidden="true" /> destination file
        </span>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <ol className="max-h-[22rem] space-y-1 overflow-y-auto rounded-xl border border-line-soft bg-ink-950/50 p-2.5" aria-label="System-call sequence">
          {calls.map((call, index) => (
            <li
              key={`${call.label}-${index}`}
              className={cn(
                'flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.82rem] transition-colors',
                index === step && 'bg-cyan-neon/10 ring-1 ring-cyan-neon/40',
                index > step && 'opacity-40',
              )}
            >
              <span className="w-6 flex-none text-right font-mono text-[0.68rem] text-mist-500">{index + 1}</span>
              <span className="min-w-0 flex-1 text-mist-100">
                {call.label}
                {call.note ? <span className="ms-1.5 text-[0.7rem] text-mist-500">· {call.note}</span> : null}
              </span>
              <span className={cn('hidden flex-none rounded-md border px-1.5 py-0.5 font-mono text-[0.6rem] sm:inline', categoryStyle[call.category].chip)}>
                {call.category}
              </span>
            </li>
          ))}
        </ol>

        <div className="space-y-2">
          <div className="rounded-xl border border-line-soft bg-ink-900/55 p-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-wider text-mist-500">System calls so far</p>
            <p className="mt-1 font-display text-[2rem] font-bold leading-none text-cyan-neon">{done.length}</p>
            <ul className="mt-2 space-y-1">
              {(Object.keys(categoryStyle) as Category[]).map((category) => (
                <li key={category} className="flex items-center justify-between gap-2 text-[0.76rem]">
                  <span className={cn('rounded-md border px-1.5 py-0.5', categoryStyle[category].chip)}>{categoryStyle[category].label}</span>
                  <span className="font-mono text-mist-200">{counts[category]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3" aria-live="polite">
            <BilingualProse text={scenarioText[scenario].text} className="text-[0.86rem]" />
          </div>
        </div>
      </div>

      <StepControls
        step={step}
        total={calls.length}
        onPrev={() => setStep((value) => Math.max(0, value - 1))}
        onNext={() => setStep((value) => Math.min(calls.length - 1, value + 1))}
        onReset={() => setStep(0)}
        label="Call"
      />
    </VisualFrame>
  )
}
