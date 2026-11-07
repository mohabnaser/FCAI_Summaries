import { useState } from 'react'
import { ArrowDown, ArrowUp, Cpu, KeyRound, Shield, ShieldAlert, Timer } from 'lucide-react'
import type { LText } from '../../types'
import { useLanguage } from '../../context/LanguageContext'
import { RichText } from '../ui/Text'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

type ScenarioId = 'system-call' | 'timer' | 'illegal'
type Mode = 'user' | 'kernel'

interface ModeStep {
  title: string
  detail: LText
  note: LText
  mode: Mode
  bit: '1' | '0'
  actor: string
}

interface Scenario {
  label: string
  summary: LText
  steps: ModeStep[]
}

const scenarios: Record<ScenarioId, Scenario> = {
  'system-call': {
    label: 'System call',
    summary: {
      en: 'A controlled request: user code asks the kernel to do privileged work, then returns.',
      ar: 'طلب متحكم فيه: user code بيطلب من الkernel يعمل شغل privileged، وبعدين يرجع.',
    },
    steps: [
      {
        title: 'User requests a service',
        mode: 'user',
        bit: '1',
        actor: 'User program',
        detail: {
          en: 'The program executes a system-call instruction (often through a library wrapper). This instruction is intentionally allowed in user mode.',
          ar: 'البرنامج ينفذ system-call instruction (غالبًا عن طريق library wrapper). والتعليمة دي مسموح بها في user mode بشكل مقصود.',
        },
        note: {
          en: 'The user program does not perform the privileged operation directly.',
          ar: 'البرنامج مش بينفذ العملية الprivileged مباشرة.',
        },
      },
      {
        title: 'Hardware traps to kernel',
        mode: 'kernel',
        bit: '0',
        actor: 'Hardware',
        detail: {
          en: 'The trap saves the user context and the return address, switches the mode bit to 0, and transfers control to a controlled kernel entry point.',
          ar: 'الtrap بيحفظ user context وعنوان الرجوع، يغير mode bit ل0، وينقل التحكم لcontrolled kernel entry point.',
        },
        note: {
          en: 'The hardware changes the mode — user code cannot freely set the mode bit.',
          ar: 'الhardware هي اللي بتغير الmode — والuser code مش بيغير mode bit بحرية.',
        },
      },
      {
        title: 'Kernel validates and services',
        mode: 'kernel',
        bit: '0',
        actor: 'OS kernel',
        detail: {
          en: 'The kernel checks permissions and parameters, performs the operation, and prepares a return value. Privileged instructions execute only here.',
          ar: 'الkernel بيتأكد من الصلاحيات والparameters، ينفذ العملية، ويجهز return value. والprivileged instructions بتتنفذ هنا بس.',
        },
        note: {
          en: 'This is the protection boundary in action.',
          ar: 'ده الprotection boundary وهو شغال.',
        },
      },
      {
        title: 'Return to user mode',
        mode: 'user',
        bit: '1',
        actor: 'Hardware / OS',
        detail: {
          en: 'The return-from-call restores the saved user context and resets the mode bit to 1. The user program continues after the call.',
          ar: 'الرجوع من الcall بيرجع user context المحفوظ ويعيد mode bit ل1. والبرنامج يكمل بعد الcall.',
        },
        note: {
          en: 'The mode change was controlled; the user never held kernel privileges directly.',
          ar: 'تغيير الmode كان متحكم فيه؛ والuser عمره ما مسك kernel privileges مباشرة.',
        },
      },
    ],
  },
  timer: {
    label: 'Timer interrupt',
    summary: {
      en: 'The timer stops a user process from monopolizing the CPU by forcing control back to the kernel.',
      ar: 'الtimer بيمنع user process تحتكر الCPU عن طريق إرجاع التحكم للkernel.',
    },
    steps: [
      {
        title: 'OS arms the timer',
        mode: 'kernel',
        bit: '0',
        actor: 'OS kernel',
        detail: {
          en: 'Before dispatching a process, the kernel sets the timer to a chosen interval. The timer is privileged hardware.',
          ar: 'قبل dispatch الprocess، الkernel بيضبط الtimer لمدة معينة. والtimer جهاز privileged.',
        },
        note: {
          en: 'The interval may be fixed or variable.',
          ar: 'المدة ممكن تكون ثابتة أو متغيرة.',
        },
      },
      {
        title: 'User process runs',
        mode: 'user',
        bit: '1',
        actor: 'User process',
        detail: {
          en: 'The CPU runs the user process in user mode. The hardware decrements the timer counter while time passes.',
          ar: 'الCPU بتشغل الuser process في user mode. والhardware بيقلل timer counter مع مرور الوقت.',
        },
        note: {
          en: 'Dual mode alone would not stop an infinite user-mode loop.',
          ar: 'الdual mode لوحدها مش هتمنع infinite loop في user mode.',
        },
      },
      {
        title: 'Timer reaches zero',
        mode: 'kernel',
        bit: '0',
        actor: 'Hardware',
        detail: {
          en: 'The timer generates an interrupt. The hardware saves the user context and switches to kernel mode so the OS can regain control.',
          ar: 'الtimer بيعمل interrupt. الhardware بيحفظ user context ويحول لkernel mode عشان الOS يستعيد التحكم.',
        },
        note: {
          en: 'The process could not disable the timer from user mode.',
          ar: 'الprocess مش قدرت تعطل الtimer من user mode.',
        },
      },
      {
        title: 'OS decides what happens next',
        mode: 'kernel',
        bit: '0',
        actor: 'OS scheduler',
        detail: {
          en: 'The OS may terminate the process, charge it more time, or schedule another process. It later returns to user mode for whichever process runs next.',
          ar: 'الOS ممكن ينهي الprocess أو يديها وقت إضافي أو يجدول process تانية. وبعدين يرجع user mode للprocess اللي هتشتغل.',
        },
        note: {
          en: 'The timer turns an monopolistic loop into a recoverable event.',
          ar: 'الtimer بيحول الloop الاحتكارية لحدث يمكن التعامل معه.',
        },
      },
    ],
  },
  illegal: {
    label: 'Illegal privileged instruction',
    summary: {
      en: 'User code tries to execute a privileged operation directly. The hardware traps it.',
      ar: 'user code بيحاول ينفذ privileged operation مباشرة. والhardware يعمللها trap.',
    },
    steps: [
      {
        title: 'User code attempts the instruction',
        mode: 'user',
        bit: '1',
        actor: 'User program',
        detail: {
          en: 'The program tries to execute a privileged instruction — for example, disabling interrupts or performing I/O directly — while the mode bit is 1.',
          ar: 'البرنامج بيحاول ينفذ privileged instruction — مثل تعطيل interrupts أو عمل I/O مباشرة — والmode bit = 1.',
        },
        note: {
          en: 'Ordinary user code is not allowed to perform this operation.',
          ar: 'الuser code العادي مش مسموح له يعمل العملية دي.',
        },
      },
      {
        title: 'Hardware raises a trap',
        mode: 'kernel',
        bit: '0',
        actor: 'Hardware',
        detail: {
          en: 'The hardware detects the privilege violation and traps to the kernel. The mode bit is now 0.',
          ar: 'الhardware بيكتشف privilege violation ويعمل trap للkernel. والmode bit بقت 0.',
        },
        note: {
          en: 'This is a protection failure by the program, not a successful privileged operation.',
          ar: 'ده protection failure من البرنامج، مش عملية privileged ناجحة.',
        },
      },
      {
        title: 'OS handles the violation',
        mode: 'kernel',
        bit: '0',
        actor: 'OS kernel',
        detail: {
          en: 'The OS typically terminates the offending process (or delivers a signal). The illegal instruction never executed in user mode.',
          ar: 'الOS عادة بينهي الprocess المخالفة (أو يبعت signal). والتعليمة غير القانونية عمرها ما اتنفذت في user mode.',
        },
        note: {
          en: 'The boundary worked: user code could not bypass kernel privileges.',
          ar: 'الحدود اشتغلت: الuser code مش قدر يتجاوز kernel privileges.',
        },
      },
    ],
  },
}

const scenarioIcons = {
  'system-call': KeyRound,
  timer: Timer,
  illegal: ShieldAlert,
}

export function DualModeVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('system-call')
  const [step, setStep] = useState(0)
  const { isArabic } = useLanguage()
  const scenario = scenarios[scenarioId]
  const current = scenario.steps[step]
  const Icon = scenarioIcons[scenarioId]

  const chooseScenario = (next: ScenarioId) => {
    setScenarioId(next)
    setStep(0)
  }

  return (
    <VisualFrame title={title} hint={hint}>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Mode transition scenario">
        {(Object.keys(scenarios) as ScenarioId[]).map((id) => {
          const ScenarioIcon = scenarioIcons[id]
          return (
            <button
              key={id}
              type="button"
              onClick={() => chooseScenario(id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[0.78rem] font-medium transition-colors',
                scenarioId === id
                  ? 'border-cyan-neon/45 bg-cyan-neon/10 text-cyan-neon'
                  : 'border-line bg-ink-900/60 text-mist-400 hover:text-mist-200',
              )}
              aria-pressed={scenarioId === id}
            >
              <ScenarioIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {scenarios[id].label}
            </button>
          )
        })}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-xl border border-line-soft bg-ink-950/50 p-3.5">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-cyan-neon" aria-hidden="true" />
            <p className="text-[0.82rem] text-mist-300">{scenario.summary.en}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div
              className={cn(
                'rounded-xl border p-3 transition-all',
                current.mode === 'user'
                  ? 'border-cyan-neon/55 bg-cyan-neon/[0.09] shadow-[0_0_30px_-12px_rgba(37,216,242,0.7)]'
                  : 'border-line-soft bg-ink-900/50 opacity-50',
              )}
              aria-current={current.mode === 'user' ? 'step' : undefined}
            >
              <div className="flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-cyan-neon" aria-hidden="true" />
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-400">
                  User mode
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-semibold text-mist-50">1</p>
              <p className="mt-0.5 text-[0.72rem] text-mist-500">ordinary instructions</p>
            </div>
            <div
              className={cn(
                'rounded-xl border p-3 transition-all',
                current.mode === 'kernel'
                  ? 'border-amber-neon/55 bg-amber-neon/[0.08] shadow-[0_0_30px_-12px_rgba(251,191,36,0.6)]'
                  : 'border-line-soft bg-ink-900/50 opacity-50',
              )}
              aria-current={current.mode === 'kernel' ? 'step' : undefined}
            >
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-amber-neon" aria-hidden="true" />
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-400">
                  Kernel mode
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-semibold text-mist-50">0</p>
              <p className="mt-0.5 text-[0.72rem] text-mist-500">privileged instructions</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-line bg-ink-900/60 px-3 py-2">
            <span className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">mode bit</span>
            <span
              className={cn(
                'rounded-md border px-2 py-0.5 font-mono text-[0.92rem] font-bold',
                current.bit === '1'
                  ? 'border-cyan-neon/45 bg-cyan-neon/10 text-cyan-neon'
                  : 'border-amber-neon/45 bg-amber-neon/10 text-amber-neon',
              )}
            >
              {current.bit}
            </span>
            <span className="text-[0.75rem] text-mist-400">
              {current.bit === '1' ? 'user' : 'kernel'}
            </span>
          </div>
          <p className="mt-3 text-center text-[0.7rem] text-mist-500">
            Actor this step: <span className="text-mist-300">{current.actor}</span>
          </p>

          <div className="mt-3 space-y-1">
            {scenario.steps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setStep(index)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[0.74rem] transition-colors',
                  index === step
                    ? 'bg-ink-800/80 text-mist-100'
                    : 'text-mist-500 hover:bg-ink-800/45 hover:text-mist-300',
                )}
                aria-pressed={index === step}
              >
                <span
                  className={cn(
                    'flex h-4 w-4 flex-none items-center justify-center rounded-full border font-mono text-[0.62rem]',
                    index === step
                      ? 'border-cyan-neon/50 text-cyan-neon'
                      : 'border-line text-mist-600',
                  )}
                >
                  {index + 1}
                </span>
                <span className="truncate">{item.title}</span>
                {item.mode === 'kernel' ? (
                  <ArrowDown className="ms-auto h-3 w-3 flex-none text-amber-neon/70" aria-hidden="true" />
                ) : (
                  <ArrowUp className="ms-auto h-3 w-3 flex-none text-cyan-neon/70" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line-soft bg-ink-900/45 p-4" aria-live="polite">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cyan-neon">
            Step {step + 1} · {current.title}
          </p>
          <p className="prose-atlas mt-2 text-[0.92rem]">{current.detail.en}</p>
          {isArabic && current.detail.ar ? (
            <p className="arabic-note mt-2 text-[0.88rem]" lang="ar" dir="rtl">
              <RichText text={current.detail.ar} />
            </p>
          ) : null}
          <div className="mt-3 rounded-lg border border-line-soft bg-ink-950/45 p-2.5">
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-mist-500">
              Key point
            </p>
            <p className="mt-1 text-[0.82rem] leading-relaxed text-mist-300">{current.note.en}</p>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex gap-1.5">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setStep((value) => Math.max(0, value - 1))}
                disabled={step === 0}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setStep((value) => Math.min(scenario.steps.length - 1, value + 1))}
                disabled={step >= scenario.steps.length - 1}
              >
                Next
              </button>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStep(0)}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}
