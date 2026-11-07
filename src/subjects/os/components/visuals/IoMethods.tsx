import { useState } from 'react'
import { ArrowRightLeft, Clock3, Cpu, HardDrive, MemoryStick, Zap } from 'lucide-react'
import type { LText } from '../../types'
import { useLanguage } from '../../context/LanguageContext'
import { RichText } from '../ui/Text'
import { cn } from '../../lib/cn'
import { StepControls, VisualFrame } from './VisualFrame'

type IoMode = 'sync' | 'async' | 'dma'

interface IoStep {
  title: string
  detail: LText
  cpu: string
  device: string
  control: string
}

interface IoScenario {
  label: string
  short: string
  icon: typeof Clock3
  steps: IoStep[]
  summary: LText
}

const scenarios: Record<IoMode, IoScenario> = {
  sync: {
    label: 'Synchronous',
    short: 'caller waits',
    icon: Clock3,
    summary: {
      en: 'Control returns to the caller only after the I/O operation completes. The program is blocked; the OS may run another process meanwhile, but this caller cannot continue.',
      ar: 'التحكم يرجع للcaller بعد ما الI/O يخلص بس. البرنامج blocked؛ والOS ممكن يشغل process تانية، لكن الcaller ده مشيقدر يكمل.',
    },
    steps: [
      {
        title: 'Request issued',
        detail: {
          en: 'The program asks the OS for I/O. The device controller starts the transfer. The calling program must wait for completion.',
          ar: 'البرنامج بيطلب I/O من الOS. الdevice controller يبدأ النقل. والبرنامج المستدعي لازم يستنى الإكمال.',
        },
        cpu: 'caller blocked',
        device: 'transfer starts',
        control: 'with device / OS',
      },
      {
        title: 'Transfer in progress',
        detail: {
          en: 'The device is busy moving data. The CPU may be idle or running another process, but the blocked caller is not making progress.',
          ar: 'الجهاز مشغول ينقل بيانات. الCPU ممكن تكون idle أو تشغل process تانية، لكن الcaller المحجوب مش بيتقدم.',
        },
        cpu: 'waits (or switches)',
        device: 'busy',
        control: 'not returned',
      },
      {
        title: 'Completion',
        detail: {
          en: 'The device finishes and raises an interrupt. The OS handles completion and makes the result available to the waiting caller.',
          ar: 'الجهاز يخلص ويعمل interrupt. الOS يعالج الإكمال ويخلي النتيجة متاحة للcaller المستني.',
        },
        cpu: 'interrupt handler',
        device: 'done',
        control: 'interrupt',
      },
      {
        title: 'Caller resumes',
        detail: {
          en: 'Only now does control return to the caller with the completed I/O result. That is the defining synchronous behavior.',
          ar: 'دلوقتي بس التحكم يرجع للcaller بالنتيجة. ده السلوك الsynchronous الأساسي.',
        },
        cpu: 'caller continues',
        device: 'idle',
        control: 'returned after completion',
      },
    ],
  },
  async: {
    label: 'Asynchronous',
    short: 'caller continues',
    icon: Zap,
    summary: {
      en: 'Control returns to the caller before the I/O completes. The program can continue working; an interrupt or status check later signals completion.',
      ar: 'التحكم يرجع للcaller قبل ما الI/O يخلص. البرنامج يكمل شغل، وبعدين interrupt أو status check يبلغ بالإكمال.',
    },
    steps: [
      {
        title: 'Request issued',
        detail: {
          en: 'The program requests I/O and immediately regains control. The device begins the transfer independently.',
          ar: 'البرنامج يطلب I/O ويرجع له التحكم فورًا. والجهاز يبدأ النقل بشكل مستقل.',
        },
        cpu: 'caller continues',
        device: 'transfer starts',
        control: 'returned immediately',
      },
      {
        title: 'Computation overlaps',
        detail: {
          en: 'The CPU performs useful work while the device transfers data. This is the overlap that asynchronous I/O enables.',
          ar: 'الCPU بتعمل شغل مفيد والجهاز بينقل. ده الoverlap اللي asynchronous I/O بتوفره.',
        },
        cpu: 'runs program',
        device: 'busy',
        control: 'with program',
      },
      {
        title: 'Completion event',
        detail: {
          en: 'The device raises an interrupt or sets a status flag. The OS records completion; the program may need to check or be notified.',
          ar: 'الجهاز يعمل interrupt أو يضبط status flag. الOS يسجل الإكمال؛ والبرنامج ممكن يحتاج يشيك أو يتبلغ.',
        },
        cpu: 'handles event',
        device: 'done',
        control: 'notification',
      },
      {
        title: 'Continue with result',
        detail: {
          en: 'The program uses the data or issues a follow-up operation. Completion did not block the original control flow.',
          ar: 'البرنامج يستخدم البيانات أو يعمل عملية تالية. الإكمال مش بلوك الcontrol flow الأصلي.',
        },
        cpu: 'program continues',
        device: 'idle',
        control: 'data/status available',
      },
    ],
  },
  dma: {
    label: 'DMA',
    short: 'block transfer',
    icon: MemoryStick,
    summary: {
      en: 'A high-speed device controller transfers a block directly between its buffer and main memory. The CPU is not interrupted per byte; it gets one interrupt per block.',
      ar: 'device controller سريع بينقل block مباشرة بين الbuffer والmain memory. الCPU مش بتتعمل interrupt لكل byte؛ interrupt واحدة لكل block.',
    },
    steps: [
      {
        title: 'CPU programs the controller',
        detail: {
          en: 'The CPU gives the DMA controller the memory address, block size, direction, and device parameters, then hands off the transfer.',
          ar: 'الCPU بتدي الDMA controller عنوان الmemory وحجم الblock والاتجاه وبيانات الجهاز، وبعدين تسلم النقل.',
        },
        cpu: 'sets up transfer',
        device: 'controller ready',
        control: 'CPU hands off',
      },
      {
        title: 'Block transfer',
        detail: {
          en: 'The controller moves the whole block between device and memory while the CPU does other work. No per-byte copying by the CPU.',
          ar: 'الcontroller ينقل الblock كله بين الجهاز والmemory والCPU بتعمل شغل تاني. مفيش نسخ لكل byte بواسطة الCPU.',
        },
        cpu: 'other work',
        device: 'direct memory ↔ device',
        control: 'no per-byte CPU work',
      },
      {
        title: 'One interrupt per block',
        detail: {
          en: 'When the block finishes, the controller raises a single interrupt. This is the efficiency win over per-byte interrupt handling.',
          ar: 'لما الblock يخلص، الcontroller يعمل interrupt واحدة. وده الفرق في الكفاءة عن interrupt لكل byte.',
        },
        cpu: 'one interrupt',
        device: 'block complete',
        control: 'interrupt per block',
      },
      {
        title: 'CPU continues',
        detail: {
          en: 'The CPU acknowledges completion and continues. DMA is used for devices able to transmit at close to memory speeds.',
          ar: 'الCPU تأكد من الإكمال وتكمل. والDMA بيستخدم لأجهزة قادرة تنقل بسرعة قريبة من الmemory.',
        },
        cpu: 'continues',
        device: 'idle',
        control: 'buffer ready',
      },
    ],
  },
}

const icons = { sync: Clock3, async: Zap, dma: MemoryStick }
const modeKeys = Object.keys(scenarios) as IoMode[]

export function IoMethodsVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [mode, setMode] = useState<IoMode>('sync')
  const [step, setStep] = useState(0)
  const { isArabic } = useLanguage()
  const scenario = scenarios[mode]
  const current = scenario.steps[step]

  const chooseMode = (next: IoMode) => {
    setMode(next)
    setStep(0)
  }

  return (
    <VisualFrame title={title} hint={hint}>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="I/O method">
        {modeKeys.map((key) => {
          const option = scenarios[key]
          const Icon = icons[key]
          return (
            <button
              key={key}
              type="button"
              onClick={() => chooseMode(key)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[0.78rem] font-medium transition-colors',
                mode === key
                  ? 'border-cyan-neon/45 bg-cyan-neon/10 text-cyan-neon'
                  : 'border-line bg-ink-900/60 text-mist-400 hover:text-mist-200',
              )}
              aria-pressed={mode === key}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {option.label}
              <span className="font-mono text-[0.62rem] text-mist-500">{option.short}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-3 rounded-xl border border-line-soft bg-ink-950/50 p-3.5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
            {scenario.label} timeline
          </p>
          <span className="badge">{current.control}</span>
        </div>
        <div className="relative mt-3">
          <div className="absolute left-0 right-0 top-3 h-px bg-line" aria-hidden="true" />
          <div className="relative grid grid-cols-4 gap-1.5">
            {scenario.steps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setStep(index)}
                className="group flex flex-col items-center text-center"
                aria-pressed={index === step}
              >
                <span
                  className={cn(
                    'relative z-10 flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[0.65rem] transition-all',
                    index === step
                      ? 'border-cyan-neon bg-ink-950 text-cyan-neon ring-4 ring-cyan-neon/10'
                      : index < step
                        ? 'border-teal-neon/50 bg-ink-950 text-teal-neon'
                        : 'border-line bg-ink-950 text-mist-500',
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    'mt-1.5 text-[0.7rem] leading-tight',
                    index === step ? 'font-medium text-mist-100' : 'text-mist-500',
                  )}
                >
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-lg border border-cyan-neon/20 bg-cyan-neon/[0.04] px-2.5 py-2">
            <Cpu className="h-3.5 w-3.5 flex-none text-cyan-neon" aria-hidden="true" />
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-wider text-mist-500">CPU</p>
              <p className="text-[0.78rem] font-medium text-mist-100">{current.cpu}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-violet-neon/20 bg-violet-neon/[0.04] px-2.5 py-2">
            <HardDrive className="h-3.5 w-3.5 flex-none text-violet-neon" aria-hidden="true" />
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-wider text-mist-500">Device</p>
              <p className="text-[0.78rem] font-medium text-mist-100">{current.device}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-lg border border-line-soft bg-ink-900/55 p-2.5" aria-live="polite">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-cyan-neon">
            {current.title}
          </p>
          <p className="prose-atlas mt-1 text-[0.82rem]">{current.detail.en}</p>
          {isArabic && current.detail.ar ? (
            <p className="arabic-note mt-1.5 text-[0.84rem]" lang="ar" dir="rtl">
              <RichText text={current.detail.ar} />
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {modeKeys.map((key) => (
          <div
            key={key}
            className={cn(
              'rounded-lg border p-2.5 transition-colors',
              mode === key ? 'border-cyan-neon/30 bg-cyan-neon/[0.045]' : 'border-line-soft bg-ink-900/35',
            )}
          >
            <p className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-mist-400">
              <ArrowRightLeft className="h-3 w-3" aria-hidden="true" />
              {scenarios[key].label}
            </p>
            <p className="mt-1 text-[0.75rem] leading-snug text-mist-300">
              {key === 'sync'
                ? 'returns after completion'
                : key === 'async'
                  ? 'returns before completion'
                  : 'one interrupt per block'}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-2 text-[0.7rem] text-mist-500">{scenario.summary.en}</p>

      <StepControls
        step={step}
        total={scenario.steps.length}
        onPrev={() => setStep((value) => Math.max(0, value - 1))}
        onNext={() => setStep((value) => Math.min(scenario.steps.length - 1, value + 1))}
        onReset={() => setStep(0)}
      />
    </VisualFrame>
  )
}
