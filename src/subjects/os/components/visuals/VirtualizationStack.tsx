import { useState } from 'react'
import { ArrowDown, Cpu, Layers, Repeat } from 'lucide-react'
import type { LText } from '../../types'
import { BilingualProse } from '../ui/Text'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

type Mode = 'native' | 'vm' | 'emulation'

const modes: Array<{ id: Mode; label: string; text: LText }> = [
  {
    id: 'native',
    label: '(a) Non-virtual machine',
    text: {
      en: 'The usual stack: processes use the **programming interface** (system calls) of **one kernel**, which runs directly on the **hardware**.',
      ar: 'الـ stack العادي: الـ processes بتستخدم **programming interface** (system calls) بتاعة **kernel واحد**، والـ kernel شغال مباشرة على الـ **hardware**.',
    },
  },
  {
    id: 'vm',
    label: '(b) Virtual machines',
    text: {
      en: 'The **virtual machine manager (VMM)** provides virtualization services: it lets **several guest OSs, each with its own kernel and processes, share one physical machine**. Guest and host are natively compiled for the **same CPU**, so guest code runs at near-native speed. A VMM can run natively, in which case it is also the host.',
      ar: 'الـ **VMM** بيقدم خدمات الـ virtualization: بيخلي **كذا guest OS، كل واحد بالـ kernel والـ processes بتوعه، يشاركوا جهاز فعلي واحد**. الـ guest والـ host متعملهم compile لنفس **الـ CPU**، فكود الـ guest بيشتغل بسرعة قريبة من الطبيعي. والـ VMM ممكن يشتغل natively، وساعتها هو نفسه الـ host.',
    },
  },
  {
    id: 'emulation',
    label: 'Emulation',
    text: {
      en: '**Emulation** is used when the **source CPU type differs from the target CPU type** (e.g. PowerPC → Intel x86). Every guest instruction must be translated, so it is **generally the slowest method**. Interpretation is the related case for a language that is not compiled to native code.',
      ar: 'الـ **Emulation** بتتستخدم لما **نوع الـ CPU الأصلي يختلف عن الـ CPU اللي هنشغّل عليه** (زي PowerPC → Intel x86). كل instruction لازم تتترجم، فهي **عمومًا أبطأ طريقة**. والـ interpretation حالة قريبة لما لغة البرمجة مش متعمل لها compile لـ native code.',
    },
  },
]

function Band({ label, tone, sub }: { label: string; tone: string; sub?: string }) {
  return (
    <div className={cn('rounded-lg border px-3 py-2 text-center', tone)}>
      <p className="font-display text-[0.88rem] font-semibold text-mist-50">{label}</p>
      {sub ? <p className="font-mono text-[0.6rem] text-mist-400">{sub}</p> : null}
    </div>
  )
}

const processes = 'border-amber-neon/40 bg-amber-neon/[0.07]'
const kernel = 'border-cyan-neon/40 bg-cyan-neon/[0.07]'
const vmm = 'border-violet-neon/50 bg-violet-neon/[0.1]'
const hardware = 'border-teal-neon/40 bg-teal-neon/[0.07]'

export function VirtualizationStackVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [mode, setMode] = useState<Mode>('vm')
  const current = modes.find((entry) => entry.id === mode) ?? modes[1]

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Compare the three ways to run an OS.' }}>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Execution model">
        {modes.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setMode(entry.id)}
            aria-pressed={mode === entry.id}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-[0.8rem] font-semibold transition-colors',
              mode === entry.id
                ? 'border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon'
                : 'border-line-soft bg-ink-900/50 text-mist-400 hover:text-mist-100',
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-line-soft bg-ink-950/50 p-4">
        {mode === 'native' ? (
          <div className="mx-auto max-w-sm space-y-2">
            <Band label="processes" tone={processes} />
            <p className="text-center font-mono text-[0.6rem] text-mist-500">↕ programming interface</p>
            <Band label="kernel" tone={kernel} />
            <Band label="hardware" tone={hardware} />
          </div>
        ) : null}

        {mode === 'vm' ? (
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {['VM1', 'VM2', 'VM3'].map((vm) => (
                <div key={vm} className="space-y-1.5 rounded-xl border border-dashed border-line p-2">
                  <p className="text-center font-mono text-[0.62rem] uppercase tracking-wider text-mist-400">{vm}</p>
                  <Band label="processes" tone={processes} />
                  <Band label="kernel" tone={kernel} sub="guest OS" />
                </div>
              ))}
            </div>
            <Band label="virtual machine manager (VMM)" tone={vmm} />
            <Band label="hardware" tone={hardware} sub="one physical machine, shared" />
          </div>
        ) : null}

        {mode === 'emulation' ? (
          <div className="mx-auto max-w-md space-y-2">
            <Band label="guest program" tone={processes} sub="compiled for CPU type X (e.g. PowerPC)" />
            <div className="flex items-center justify-center gap-2 text-amber-neon">
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
              <span className="font-mono text-[0.62rem] uppercase">every instruction translated</span>
            </div>
            <div className={cn('flex items-center justify-center gap-2 rounded-lg border px-3 py-2', vmm)}>
              <Repeat className="h-4 w-4 text-violet-neon" aria-hidden="true" />
              <span className="font-display text-[0.88rem] font-semibold text-mist-50">emulator</span>
              <span className="badge badge-rose">generally slowest</span>
            </div>
            <div className={cn('flex items-center justify-center gap-2 rounded-lg border px-3 py-2', hardware)}>
              <Cpu className="h-4 w-4 text-teal-neon" aria-hidden="true" />
              <span className="font-display text-[0.88rem] font-semibold text-mist-50">host CPU type Y (e.g. Intel x86)</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-3 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        <BilingualProse text={current.text} className="text-[0.92rem]" />
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg border border-line-soft bg-ink-900/45 p-3">
        <Layers className="mt-0.5 h-4 w-4 flex-none text-violet-neon" aria-hidden="true" />
        <p className="text-[0.82rem] leading-relaxed text-mist-300">
          <span className="font-semibold text-mist-100">Count the boxes:</span> in view (b) there is{' '}
          <span className="text-mist-50">one</span> hardware layer under <span className="text-mist-50">three</span>{' '}
          virtual machines. Keep that picture in mind for any “fundamental idea of a virtual machine” question.
        </p>
      </div>
    </VisualFrame>
  )
}
