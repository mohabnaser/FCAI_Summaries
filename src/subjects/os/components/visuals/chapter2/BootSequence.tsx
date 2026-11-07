import { useState } from 'react'
import { Cpu, HardDrive, MemoryStick, Microchip } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { StepControls, VisualFrame } from '../VisualFrame'

type Mode = 'one' | 'two'
type Where = 'cpu' | 'rom' | 'disk' | 'memory'

interface Step {
  title: string
  where: Where[]
  memory: string[]
  text: LText
  grub?: boolean
}

const grubEntries = [
  { id: 'a', label: 'Linux 3.10 · disk 0 · default options', kernel: 'kernel 3.10', disk: 'disk 0' },
  { id: 'b', label: 'Linux 3.10 · disk 0 · recovery (single-user) options', kernel: 'kernel 3.10 (recovery)', disk: 'disk 0' },
  { id: 'c', label: 'Linux 3.2 · disk 1 · older kernel version', kernel: 'kernel 3.2', disk: 'disk 1' },
]

function buildSteps(mode: Mode, kernel: string, disk: string): Step[] {
  const start: Step[] = [
    {
      title: 'Power on',
      where: ['cpu'],
      memory: [],
      text: { en: 'When power is initialized, **execution starts at a fixed memory location**.', ar: 'لما الكهربا تيجي، **التنفيذ بيبدأ من مكان ثابت في الـ memory**.' },
    },
    {
      title: 'Firmware ROM',
      where: ['cpu', 'rom'],
      memory: [],
      text: { en: 'That location is in **firmware ROM**, which holds the **initial boot code**.', ar: 'المكان ده في **firmware ROM**، وفيه **كود الـ boot الأولاني**.' },
    },
  ]
  const end: Step[] = [
    {
      title: 'Locate the kernel',
      where: ['rom', 'disk'],
      memory: mode === 'two' ? ['bootstrap loader'] : [],
      text: { en: `The **bootstrap loader** locates the kernel (${kernel} on ${disk}).`, ar: `الـ **bootstrap loader** بيلاقي الـ kernel (${kernel} على ${disk}).` },
    },
    {
      title: 'Load it into memory',
      where: ['disk', 'memory'],
      memory: [...(mode === 'two' ? ['bootstrap loader'] : []), kernel],
      text: { en: 'It **loads the kernel into memory**.', ar: 'وبي**حمّل الـ kernel في الـ memory**.' },
    },
    {
      title: 'Start the kernel',
      where: ['cpu', 'memory'],
      memory: [kernel],
      text: { en: '…and **starts it**. “The kernel loads and the system is then running.”', ar: '…وبي**شغّله**. “The kernel loads and the system is then running.”' },
    },
  ]
  if (mode === 'one') {
    return [
      ...start,
      {
        title: 'Bootstrap loader in ROM/EEPROM',
        where: ['rom'],
        memory: [],
        text: { en: 'A small piece of code — the **bootstrap loader**, stored in **ROM or EEPROM** — takes over.', ar: 'كود صغير — الـ **bootstrap loader**، متخزن في **ROM أو EEPROM** — بياخد التحكم.' },
      },
      ...end,
    ]
  }
  return [
    ...start,
    {
      title: 'ROM loads the boot block',
      where: ['rom', 'disk', 'memory'],
      memory: ['boot block'],
      text: { en: 'Two-step boot: ROM code loads a **boot block at a fixed location** on the disk.', ar: 'Boot بخطوتين: كود الـ ROM بيحمّل **boot block من مكان ثابت** على الـ disk.' },
    },
    {
      title: 'Boot block loads the loader',
      where: ['disk', 'memory'],
      memory: ['boot block', 'bootstrap loader'],
      text: { en: 'The boot block **loads the bootstrap loader from disk**.', ar: 'الـ boot block بي**حمّل الـ bootstrap loader من الـ disk**.' },
    },
    {
      title: 'GRUB menu',
      where: ['memory'],
      memory: ['bootstrap loader'],
      grub: true,
      text: { en: '**GRUB**, a common bootstrap loader, lets you choose the kernel **from multiple disks, kernel versions and kernel options**. Pick one.', ar: 'الـ **GRUB**، bootstrap loader مشهور، بيخليك تختار الـ kernel **من أكتر من disk، ونسخ الـ kernel، وخياراته**. اختار واحد.' },
    },
    ...end,
  ]
}

export function BootSequenceVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [mode, setMode] = useState<Mode>('one')
  const [step, setStep] = useState(0)
  const [entry, setEntry] = useState(grubEntries[0].id)
  const chosen = grubEntries.find((candidate) => candidate.id === entry) ?? grubEntries[0]
  const steps = buildSteps(mode, mode === 'two' ? chosen.kernel : 'the kernel', mode === 'two' ? chosen.disk : 'disk')
  const current = steps[Math.min(step, steps.length - 1)]

  const place = (id: Where, label: string, Icon: typeof Cpu) => (
    <div className="viz-node flex items-center gap-2 px-3 py-2" data-active={current.where.includes(id)} data-dim={!current.where.includes(id)}>
      <Icon className="h-4 w-4 text-cyan-neon" aria-hidden="true" />
      <span className="text-[0.84rem] font-semibold text-mist-50">{label}</span>
    </div>
  )

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Step through the boot; try the two-step path.' }}>
      <div className="flex flex-wrap gap-1.5">
        {(['one', 'two'] as Mode[]).map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => {
              setMode(candidate)
              setStep(0)
            }}
            aria-pressed={mode === candidate}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-[0.8rem] font-semibold transition-colors',
              mode === candidate ? 'border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon' : 'border-line-soft bg-ink-900/50 text-mist-400 hover:text-mist-100',
            )}
          >
            {candidate === 'one' ? 'Bootstrap loader in ROM' : 'Two-step: boot block + GRUB'}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid grid-cols-2 gap-2">
          {place('cpu', 'CPU', Cpu)}
          {place('rom', 'ROM / EEPROM', Microchip)}
          {place('disk', 'Disk', HardDrive)}
          {place('memory', 'Main memory', MemoryStick)}
          <div className="col-span-2 rounded-lg border border-line-soft bg-ink-950/50 p-2">
            <p className="font-mono text-[0.6rem] uppercase tracking-wider text-mist-500">in memory now</p>
            <div className="mt-1 flex min-h-[1.75rem] flex-wrap gap-1">
              {current.memory.length === 0 ? <span className="text-[0.74rem] text-mist-600">nothing loaded yet</span> : null}
              {current.memory.map((item) => (
                <span key={item} className="rounded-md border border-teal-neon/50 bg-teal-neon/10 px-2 py-0.5 font-mono text-[0.7rem] text-teal-50">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <ol className="space-y-1" aria-label="Boot steps">
            {steps.map((entryStep, index) => (
              <li
                key={entryStep.title}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-2 py-1 text-[0.8rem]',
                  index === step ? 'bg-cyan-neon/10 text-cyan-neon ring-1 ring-cyan-neon/40' : index < step ? 'text-mist-300' : 'text-mist-600',
                )}
              >
                <span className="w-4 font-mono text-[0.66rem]">{index + 1}</span>
                {entryStep.title}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {current.grub ? (
        <div className="mt-3 rounded-xl border border-line bg-[#0b0f0d] p-3 font-mono text-[0.76rem] text-[#cfe8d6]" dir="ltr">
          <p className="mb-1.5 text-center text-mist-400">GNU GRUB</p>
          <ul className="space-y-1" role="radiogroup" aria-label="GRUB menu">
            {grubEntries.map((candidate) => (
              <li key={candidate.id}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={entry === candidate.id}
                  onClick={() => setEntry(candidate.id)}
                  className={cn('w-full rounded px-2 py-1 text-left', entry === candidate.id ? 'bg-teal-neon/25 text-white' : 'hover:bg-ink-800')}
                >
                  {entry === candidate.id ? '▶ ' : '  '}
                  {candidate.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-3 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        <p className="font-mono text-[0.64rem] uppercase tracking-[0.13em] text-cyan-neon">
          Step {step + 1} · {current.title}
        </p>
        <BilingualProse text={current.text} className="mt-1 text-[0.92rem]" />
      </div>

      <StepControls
        step={step}
        total={steps.length}
        onPrev={() => setStep((value) => Math.max(0, value - 1))}
        onNext={() => setStep((value) => Math.min(steps.length - 1, value + 1))}
        onReset={() => setStep(0)}
      />
    </VisualFrame>
  )
}
