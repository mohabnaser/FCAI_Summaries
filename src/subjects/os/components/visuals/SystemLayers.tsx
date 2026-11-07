import { useState } from 'react'
import { AppWindow, Cpu, Settings, Users } from 'lucide-react'
import type { LText } from '../../types'
import { BilingualProse } from '../ui/Text'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

type LayerId = 'users' | 'programs' | 'os' | 'hardware'

const layers: Array<{
  id: LayerId
  label: string
  icon: typeof Cpu
  tone: string
  role: LText
  examples: string[]
}> = [
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    tone: 'border-amber-neon/45 bg-amber-neon/[0.08] text-amber-neon',
    role: {
      en: 'Whoever asks the computer to do work — **people, machines, or other computers**.',
      ar: 'أي حد بيطلب شغل من الكمبيوتر — **ناس، أو machines، أو كمبيوترات تانية**.',
    },
    examples: ['user 1', 'user 2', '…', 'user n'],
  },
  {
    id: 'programs',
    label: 'System & application programs',
    icon: AppWindow,
    tone: 'border-violet-neon/45 bg-violet-neon/[0.08] text-violet-neon',
    role: {
      en: 'Define **the ways system resources are used** to solve users’ computing problems.',
      ar: 'بتحدد **إزاي موارد النظام تتستخدم** عشان تحل مشاكل المستخدمين.',
    },
    examples: ['compiler', 'assembler', 'text editor', 'database system', 'web browser', 'video game'],
  },
  {
    id: 'os',
    label: 'Operating system',
    icon: Settings,
    tone: 'border-cyan-neon/45 bg-cyan-neon/[0.08] text-cyan-neon',
    role: {
      en: '**Controls and coordinates** the use of the hardware among the various applications and users.',
      ar: 'بي**تحكم وينسّق** استخدام الـ hardware بين الـ applications والـ users المختلفين.',
    },
    examples: ['kernel', 'CPU scheduler', 'device drivers', 'memory manager'],
  },
  {
    id: 'hardware',
    label: 'Computer hardware',
    icon: Cpu,
    tone: 'border-teal-neon/45 bg-teal-neon/[0.08] text-teal-neon',
    role: {
      en: 'Provides the **basic computing resources**: CPU, memory, I/O devices.',
      ar: 'بيوفر **الموارد الأساسية للحوسبة**: CPU وmemory وI/O devices.',
    },
    examples: ['CPU', 'memory', 'I/O devices'],
  },
]

const samples: Array<{ name: string; layer: LayerId; why: LText }> = [
  {
    name: 'Web browser',
    layer: 'programs',
    why: {
      en: 'An application program: it uses system resources to solve a user problem. Being bundled with the OS does not make it part of the kernel.',
      ar: 'Application program: بيستخدم موارد النظام عشان يحل مشكلة للمستخدم. إنه بييجي مع الـ OS مش بيخليه جزء من الـ kernel.',
    },
  },
  {
    name: 'Compiler',
    layer: 'programs',
    why: {
      en: 'Listed inside “system and application programs”. It is a program that runs on top of the OS.',
      ar: 'مذكور في المحاضرة جوه “system and application programs”. برنامج بيشتغل فوق الـ OS.',
    },
  },
  {
    name: 'Kernel',
    layer: 'os',
    why: {
      en: 'The one program running at all times — the core of the operating-system layer.',
      ar: 'البرنامج الوحيد اللي شغال طول الوقت — قلب طبقة الـ operating system.',
    },
  },
  {
    name: 'Printer device driver',
    layer: 'os',
    why: {
      en: 'OS software: a device driver gives the kernel a uniform interface to one specific device controller.',
      ar: 'Software تبع الـ OS: الـ device driver بيدي الـ kernel واجهة موحدة لـ device controller معيّن.',
    },
  },
  {
    name: 'CPU',
    layer: 'hardware',
    why: {
      en: 'A basic computing resource the OS allocates.',
      ar: 'مورد أساسي الـ OS بيوزعه.',
    },
  },
  {
    name: 'Keyboard',
    layer: 'hardware',
    why: {
      en: 'An I/O device — hardware, managed through its controller and driver.',
      ar: 'I/O device — hardware، بيتدار عن طريق الـ controller والـ driver بتوعه.',
    },
  },
  {
    name: 'Another computer',
    layer: 'users',
    why: {
      en: 'The lecture counts machines and other computers as users too — not only people.',
      ar: 'المحاضرة بتعتبر الأجهزة والكمبيوترات التانية users برضه — مش بس الناس.',
    },
  },
]

export function SystemLayersVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [active, setActive] = useState<LayerId>('os')
  const [sample, setSample] = useState<string | null>(null)
  const picked = samples.find((entry) => entry.name === sample)
  const current = layers.find((layer) => layer.id === active) ?? layers[2]

  return (
    <VisualFrame
      title={title}
      hint={hint ?? { en: 'Click a layer, or classify a program below.' }}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <ol className="space-y-2" aria-label="Four components of a computer system, top to bottom">
          {layers.map((layer, index) => {
            const Icon = layer.icon
            const isActive = layer.id === active
            return (
              <li key={layer.id} style={{ paddingInline: `${(3 - index) * 0.75}rem` }}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(layer.id)
                    setSample(null)
                  }}
                  aria-pressed={isActive}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all',
                    layer.tone,
                    isActive ? 'ring-2 ring-white/15' : 'opacity-70 hover:opacity-100',
                  )}
                >
                  <Icon className="h-5 w-5 flex-none" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1rem] font-semibold text-mist-50">{layer.label}</span>
                    <span className="mt-1 flex flex-wrap gap-1">
                      {layer.examples.map((example) => (
                        <span key={example} className="vb-chip !text-[0.66rem]">
                          {example}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="font-mono text-[0.62rem] text-mist-400">L{4 - index}</span>
                </button>
              </li>
            )
          })}
        </ol>

        <div className="space-y-4">
          <div className="rounded-xl border border-line-soft bg-ink-950/50 p-4" aria-live="polite">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-mist-500">Role of this layer</p>
            <p className="mt-1 font-display text-[1.1rem] font-semibold text-mist-50">{current.label}</p>
            <BilingualProse text={current.role} className="mt-1.5 text-[0.95rem]" />
          </div>

          <div className="rounded-xl border border-line-soft bg-ink-950/50 p-4">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-mist-500">
              Classify it — which layer?
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {samples.map((entry) => (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => {
                    setSample(entry.name)
                    setActive(entry.layer)
                  }}
                  aria-pressed={sample === entry.name}
                  className={cn(
                    'rounded-lg border px-2.5 py-1 text-[0.8rem] transition-colors',
                    sample === entry.name
                      ? 'border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon'
                      : 'border-line-soft bg-ink-900/60 text-mist-300 hover:border-line hover:text-mist-100',
                  )}
                >
                  {entry.name}
                </button>
              ))}
            </div>
            {picked ? (
              <div className="mt-3 rounded-lg border border-cyan-neon/20 bg-cyan-neon/[0.04] p-3" aria-live="polite">
                <p className="text-[0.82rem] font-semibold text-cyan-neon">
                  {picked.name} → {layers.find((layer) => layer.id === picked.layer)?.label}
                </p>
                <BilingualProse text={picked.why} className="mt-1 text-[0.88rem]" />
              </div>
            ) : (
              <p className="mt-3 text-[0.82rem] text-mist-500">Pick a program to see where it sits.</p>
            )}
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}
