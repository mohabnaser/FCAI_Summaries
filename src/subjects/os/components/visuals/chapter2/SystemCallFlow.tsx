import { useState } from 'react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { StepControls, VisualFrame } from '../VisualFrame'

type Path = 'open' | 'printf'
type Node = 'app' | 'lib' | 'interface' | 'table' | 'impl'

interface Step {
  active: Node[]
  mode: 'user' | 'kernel'
  arrow: string
  text: LText
}

const paths: Record<Path, { label: string; tableIndex: number; impl: string; steps: Step[] }> = {
  open: {
    label: 'open()',
    tableIndex: 5,
    impl: 'Implementation of open() system call',
    steps: [
      { active: ['app'], mode: 'user', arrow: 'open()', text: { en: 'The user application calls `open()` through the API.', ar: 'الـ user application بتنادي `open()` عن طريق الـ API.' } },
      { active: ['app', 'interface'], mode: 'kernel', arrow: 'trap ↓', text: { en: 'The call enters the **system-call interface** — the boundary into kernel mode.', ar: 'الـ call بتدخل الـ **system-call interface** — الحد اللي بيدخلنا kernel mode.' } },
      { active: ['interface', 'table'], mode: 'kernel', arrow: 'index i', text: { en: 'The interface uses the call’s **number i** to index the **system-call table**.', ar: 'الـ interface بيستخدم **رقم i** بتاع الـ call عشان يدخل على **جدول الـ system calls**.' } },
      { active: ['table', 'impl'], mode: 'kernel', arrow: '→ kernel code', text: { en: 'The table entry points to the **implementation of open()**, which runs in the kernel.', ar: 'الـ entry في الجدول بتشاور على **تنفيذ open()**، واللي بيشتغل في الـ kernel.' } },
      { active: ['impl', 'interface'], mode: 'kernel', arrow: 'return', text: { en: 'The implementation returns its **status and any return values** to the interface.', ar: 'التنفيذ بيرجّع **الحالة وأي return values** للـ interface.' } },
      { active: ['app'], mode: 'user', arrow: 'return ↑', text: { en: 'Control returns to the application in user mode. It never needed to know how `open()` is implemented.', ar: 'التحكم بيرجع للـ application في user mode. ومكانش محتاج يعرف `open()` متنفّذة إزاي.' } },
    ],
  },
  printf: {
    label: 'printf()',
    tableIndex: 2,
    impl: 'write() system call',
    steps: [
      { active: ['app'], mode: 'user', arrow: 'printf("Greetings")', text: { en: 'The C program calls `printf()` — a **library** function, not a system call.', ar: 'برنامج الـ C بينادي `printf()` — function في **library**، مش system call.' } },
      { active: ['app', 'lib'], mode: 'user', arrow: '→ library', text: { en: 'The **standard C library** formats the text — still in user mode.', ar: 'الـ **standard C library** بتظبط النص — ولسه في user mode.' } },
      { active: ['lib', 'interface'], mode: 'kernel', arrow: 'write()', text: { en: 'The library invokes the **write()** system call, crossing into kernel mode.', ar: 'الـ library بتنادي الـ **write()** system call، وبتعدّي لـ kernel mode.' } },
      { active: ['interface', 'table', 'impl'], mode: 'kernel', arrow: '→ kernel code', text: { en: 'The kernel performs the write to the terminal.', ar: 'الـ kernel بينفّذ الكتابة على الـ terminal.' } },
      { active: ['lib'], mode: 'user', arrow: 'return ↑', text: { en: 'write() returns to the library…', ar: 'الـ write() بترجع للـ library…' } },
      { active: ['app'], mode: 'user', arrow: 'return ↑', text: { en: '…and printf() returns to the program.', ar: '…والـ printf() بترجع للبرنامج.' } },
    ],
  },
}

function Box({ id, step, children, className }: { id: Node; step: Step; children: React.ReactNode; className?: string }) {
  const active = step.active.includes(id)
  return (
    <div className={cn('viz-node px-3 py-2 text-center', className)} data-active={active} data-dim={!active}>
      {children}
    </div>
  )
}

export function SystemCallFlowVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [path, setPath] = useState<Path>('open')
  const [index, setIndex] = useState(0)
  const current = paths[path]
  const step = current.steps[index]

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Choose a call and step through it.' }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(paths) as Path[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => {
                setPath(candidate)
                setIndex(0)
              }}
              aria-pressed={path === candidate}
              className={cn(
                'rounded-lg border px-3 py-1.5 font-mono text-[0.78rem] font-semibold transition-colors',
                path === candidate
                  ? 'border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon'
                  : 'border-line-soft bg-ink-900/50 text-mist-400 hover:text-mist-100',
              )}
            >
              {paths[candidate].label}
            </button>
          ))}
        </div>
        <span className={cn('badge', step.mode === 'user' ? 'badge-amber' : 'badge-cyan')}>
          CPU in {step.mode} mode
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-line-soft bg-ink-950/50 p-3 sm:p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <Box id="app" step={step} className="sm:col-span-1">
            <p className="font-display text-[0.92rem] font-semibold text-mist-50">
              {path === 'open' ? 'user application' : 'C program — main()'}
            </p>
            <p className="font-mono text-[0.7rem] text-mist-400">{path === 'open' ? 'open()' : 'printf("Greetings");'}</p>
          </Box>
          {path === 'printf' ? (
            <Box id="lib" step={step}>
              <p className="font-display text-[0.92rem] font-semibold text-mist-50">standard C library</p>
              <p className="font-mono text-[0.7rem] text-mist-400">printf → write()</p>
            </Box>
          ) : (
            <div className="hidden items-center justify-center font-mono text-[0.7rem] text-mist-500 sm:flex">
              follows the API only
            </div>
          )}
        </div>

        <div className="my-3 flex items-center gap-2" aria-hidden="true">
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-amber-neon">user mode</span>
          <span className="h-px flex-1 border-t border-dashed border-amber-neon/60" />
          <span className="rounded-md bg-ink-800 px-2 py-0.5 font-mono text-[0.68rem] text-mist-200">{step.arrow}</span>
          <span className="h-px flex-1 border-t border-dashed border-cyan-neon/60" />
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-cyan-neon">kernel mode</span>
        </div>

        <Box id="interface" step={step} className="mb-3">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist-200">system call interface</p>
        </Box>

        <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3">
          <Box id="table" step={step} className="!px-1 !py-1.5">
            <ol className="space-y-0.5 font-mono text-[0.62rem]" aria-label="System-call table">
              {Array.from({ length: 7 }, (_, slot) => (
                <li
                  key={slot}
                  className={cn(
                    'rounded px-1',
                    slot === current.tableIndex ? 'bg-cyan-neon/25 font-bold text-cyan-50' : 'text-mist-500',
                  )}
                >
                  {slot === current.tableIndex ? 'i →' : '·'}
                </li>
              ))}
            </ol>
          </Box>
          <Box id="impl" step={step}>
            <p className="font-display text-[0.9rem] font-semibold text-mist-50">{current.impl}</p>
            <p className="font-mono text-[0.66rem] text-mist-400">kernel code · returns status + values</p>
          </Box>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        <BilingualProse text={step.text} className="text-[0.92rem]" />
      </div>

      <StepControls
        step={index}
        total={current.steps.length}
        onPrev={() => setIndex((value) => Math.max(0, value - 1))}
        onNext={() => setIndex((value) => Math.min(current.steps.length - 1, value + 1))}
        onReset={() => setIndex(0)}
      />
    </VisualFrame>
  )
}
