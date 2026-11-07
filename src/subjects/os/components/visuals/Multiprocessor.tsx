import { useState } from 'react'
import { Cpu, Database, MemoryStick, RotateCcw, Server, ShieldAlert } from 'lucide-react'
import type { LText } from '../../types'
import { BilingualProse } from '../ui/Text'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

type Tab = 'single' | 'amp' | 'smp' | 'dualcore' | 'cluster'

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'single', label: 'Single processor' },
  { id: 'amp', label: 'Asymmetric MP' },
  { id: 'smp', label: 'Symmetric MP' },
  { id: 'dualcore', label: 'Dual-core chip' },
  { id: 'cluster', label: 'Clustered system' },
]

const notes: Record<Tab, { shared: string; private: string; text: LText }> = {
  single: {
    shared: '—',
    private: 'one general-purpose CPU',
    text: {
      en: 'Most systems — from PDAs to mainframes — use **one general-purpose processor**. Almost all also contain **special-purpose processors** (for example inside device controllers).',
      ar: 'معظم الأنظمة — من الـ PDAs لحد الـ mainframes — بتستخدم **general-purpose processor واحد**. وتقريبًا كلها فيها كمان **special-purpose processors** (زي اللي جوه الـ device controllers).',
    },
  },
  amp: {
    shared: 'memory, bus',
    private: 'each CPU has a fixed role',
    text: {
      en: '**Asymmetric multiprocessing:** processors are not equal. In the textbook’s description, one **boss** processor controls the system and gives each **worker** a specific task.',
      ar: '**Asymmetric multiprocessing:** الـ processors مش متساويين. في وصف الكتاب، processor واحد **boss** بيتحكم في النظام ويدي كل **worker** مهمة معيّنة.',
    },
  },
  smp: {
    shared: 'one physical memory, bus',
    private: 'registers + cache per CPU',
    text: {
      en: '**Symmetric multiprocessing:** every CPU is a peer that can run any task. Each has its **own registers and cache**; all share **one memory**. Try failing a CPU.',
      ar: '**Symmetric multiprocessing:** كل CPU زي التانية وتقدر تشغّل أي task. كل واحدة ليها **registers وcache خاصين بيها**؛ وكلهم بيشاركوا **memory واحدة**. جرّب توقّع CPU.',
    },
  },
  dualcore: {
    shared: 'the chip and its memory',
    private: 'registers + cache per core',
    text: {
      en: '**Multi-core:** several cores on **one chip** instead of several chips with one core each. Memory access may be **UMA** (same time for every CPU) or **NUMA** (some memory is closer and faster). Blade servers put several independent multiprocessor systems in one chassis.',
      ar: '**Multi-core:** أكتر من core على **chip واحدة** بدل chips كتير كل واحدة فيها core. الوصول للـ memory ممكن يبقى **UMA** (نفس الوقت لكل CPU) أو **NUMA** (جزء من الـ memory أقرب وأسرع). والـ blade servers بتحط كذا multiprocessor system مستقل في chassis واحد.',
    },
  },
  cluster: {
    shared: 'storage via a SAN',
    private: 'each node is a complete computer',
    text: {
      en: '**Clustered systems:** multiple **systems** work together, usually sharing storage through a **storage-area network (SAN)**, giving a **high-availability** service that survives failures. Try failing a node.',
      ar: '**Clustered systems:** أكتر من **نظام كامل** بيشتغلوا مع بعض، وغالبًا بيشاركوا الـ storage عن طريق **SAN**، وده بيدي خدمة **high-availability** تستحمل الأعطال. جرّب توقّع node.',
    },
  },
}

function CpuBox({
  label,
  failed,
  onClick,
  role,
  compact,
}: {
  label: string
  failed?: boolean
  onClick?: () => void
  role?: string
  compact?: boolean
}) {
  const className = cn(
    'viz-node flex w-full flex-col items-center gap-1 p-2.5 text-center',
    failed && '!border-rose-neon/60 !bg-rose-neon/[0.08] opacity-70',
    onClick && 'hover:border-cyan-neon/50',
  )
  const body = (
    <>
      <span className="flex items-center gap-1.5 font-display text-[0.9rem] font-semibold text-mist-50">
        <Cpu className={cn('h-4 w-4', failed ? 'text-rose-neon' : 'text-cyan-neon')} aria-hidden="true" />
        {label}
      </span>
      {role ? <span className="font-mono text-[0.6rem] uppercase text-amber-neon">{role}</span> : null}
      {!compact ? (
        <span className="flex gap-1">
          <span className="vb-chip !text-[0.6rem]">registers</span>
          <span className="vb-chip !text-[0.6rem]">cache</span>
        </span>
      ) : null}
      {failed ? <span className="font-mono text-[0.6rem] font-bold text-rose-neon">FAILED</span> : null}
    </>
  )
  if (!onClick) return <div className={className}>{body}</div>
  return (
    <button type="button" onClick={onClick} aria-pressed={failed} aria-label={`${label}: click to ${failed ? 'repair' : 'fail'}`} className={className}>
      {body}
    </button>
  )
}

function MemoryBar({ label = 'memory' }: { label?: string }) {
  return (
    <div className="viz-node flex items-center justify-center gap-2 py-2" data-active="true">
      <MemoryStick className="h-4 w-4 text-violet-neon" aria-hidden="true" />
      <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist-200">{label}</span>
    </div>
  )
}

export function MultiprocessorVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [tab, setTab] = useState<Tab>('smp')
  const [failed, setFailed] = useState<number[]>([])
  const [clusterMode, setClusterMode] = useState<'asymmetric' | 'symmetric'>('asymmetric')

  const toggle = (index: number) =>
    setFailed((current) => (current.includes(index) ? current.filter((entry) => entry !== index) : [...current, index]))

  const alive = 3 - failed.length
  let outcome: LText | null = null
  if (tab === 'smp' && failed.length > 0) {
    outcome =
      alive === 0
        ? { en: 'All processors failed — the system stops.', ar: 'كل الـ processors وقعت — النظام وقف.' }
        : {
            en: `${alive} of 3 CPUs still run. The system keeps working, just slower: **graceful degradation**. A system built to continue despite a failure is **fault tolerant** — this is the “increased reliability” advantage.`,
            ar: `${alive} من 3 CPUs لسه شغالين. النظام بيكمل بس أبطأ: **graceful degradation**. والنظام المصمم إنه يكمل رغم العطل اسمه **fault tolerant** — ودي ميزة “increased reliability”.`,
          }
  }
  if (tab === 'cluster' && failed.length > 0) {
    if (alive === 0) {
      outcome = { en: 'Every node failed — no node is left to provide the service.', ar: 'كل الـ nodes وقعت — مفيش node تقدم الخدمة.' }
    } else if (clusterMode === 'asymmetric') {
      outcome = failed.includes(0)
        ? {
            en: 'The active node failed, so the **hot-standby** machine, which was only monitoring, **takes over** the application. Service survives.',
            ar: 'الـ node الشغالة وقعت، فالجهاز اللي في **hot-standby** واللي كان بيراقب بس **بياخد مكانها**. والخدمة مستمرة.',
          }
        : {
            en: 'A standby node failed. The active node keeps serving; the cluster simply has less backup.',
            ar: 'Node من الاحتياطي وقعت. الـ node الشغالة بتكمل؛ بس الـ cluster بقى عنده احتياطي أقل.',
          }
    } else {
      outcome = {
        en: 'In **symmetric clustering** every node runs applications **and monitors the others**, so the surviving nodes pick up the failed node’s work.',
        ar: 'في **symmetric clustering** كل node بتشغّل applications **وبتراقب التانيين**، فالـ nodes اللي فاضلة بتشيل شغل الـ node اللي وقعت.',
      }
    }
  }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Switch architectures; click CPUs or nodes to fail them.' }}>
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Architecture">
        {tabs.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={tab === entry.id}
            onClick={() => {
              setTab(entry.id)
              setFailed([])
            }}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-[0.8rem] font-semibold transition-colors',
              tab === entry.id
                ? 'border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon'
                : 'border-line-soft bg-ink-900/50 text-mist-400 hover:text-mist-100',
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-line-soft bg-ink-950/50 p-4">
        {tab === 'single' ? (
          <div className="mx-auto max-w-sm space-y-3">
            <CpuBox label="CPU" />
            <MemoryBar />
            <p className="text-center font-mono text-[0.66rem] text-mist-500">+ special-purpose processors in device controllers</p>
          </div>
        ) : null}

        {tab === 'amp' ? (
          <div className="mx-auto max-w-lg space-y-3">
            <div className="mx-auto max-w-[12rem]">
              <CpuBox label="CPU 0" role="boss" compact />
            </div>
            <p className="text-center font-mono text-[0.66rem] text-mist-500">assigns specific tasks ↓</p>
            <div className="grid grid-cols-2 gap-3">
              <CpuBox label="CPU 1" role="worker" compact />
              <CpuBox label="CPU 2" role="worker" compact />
            </div>
            <MemoryBar />
          </div>
        ) : null}

        {tab === 'smp' ? (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[0, 1, 2].map((index) => (
                <CpuBox key={index} label={`CPU ${index}`} failed={failed.includes(index)} onClick={() => toggle(index)} />
              ))}
            </div>
            <MemoryBar label="shared memory" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.64rem] uppercase text-mist-500">throughput</span>
              <span className="h-2.5 flex-1 rounded-full bg-ink-800">
                <span
                  className="block h-2.5 rounded-full bg-teal-neon transition-all duration-500"
                  style={{ width: `${(alive / 3) * 100}%` }}
                />
              </span>
              <span className="font-mono text-[0.7rem] text-mist-300">{alive}/3</span>
            </div>
          </div>
        ) : null}

        {tab === 'dualcore' ? (
          <div className="mx-auto max-w-lg space-y-3">
            <div className="rounded-2xl border-2 border-dashed border-cyan-neon/40 p-3">
              <p className="mb-2 text-center font-mono text-[0.62rem] uppercase tracking-wider text-cyan-neon">one processor chip</p>
              <div className="grid grid-cols-2 gap-3">
                <CpuBox label="core 0" />
                <CpuBox label="core 1" />
              </div>
            </div>
            <MemoryBar />
          </div>
        ) : null}

        {tab === 'cluster' ? (
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="inline-flex rounded-lg border border-line-soft bg-ink-950/60 p-1" role="group" aria-label="Clustering mode">
                {(['asymmetric', 'symmetric'] as const).map((candidate) => (
                  <button
                    key={candidate}
                    type="button"
                    onClick={() => {
                      setClusterMode(candidate)
                      setFailed([])
                    }}
                    aria-pressed={clusterMode === candidate}
                    className={cn(
                      'rounded-md px-3 py-1 text-[0.76rem] font-semibold capitalize',
                      clusterMode === candidate ? 'bg-violet-neon/15 text-violet-neon' : 'text-mist-400 hover:text-mist-100',
                    )}
                  >
                    {candidate} clustering
                  </button>
                ))}
              </div>
            </div>
            <p className="text-center font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mist-500">── interconnect ──</p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[0, 1, 2].map((index) => {
                const down = failed.includes(index)
                const takeover = clusterMode === 'asymmetric' && failed.includes(0) && index === 1 && !down
                const role =
                  clusterMode === 'symmetric'
                    ? 'runs apps'
                    : index === 0
                      ? down
                        ? 'was active'
                        : 'active'
                      : takeover
                        ? 'took over'
                        : 'hot standby'
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggle(index)}
                    aria-pressed={down}
                    className={cn(
                      'viz-node flex flex-col items-center gap-1 p-2.5',
                      down && '!border-rose-neon/60 !bg-rose-neon/[0.08] opacity-70',
                      takeover && '!border-teal-neon/60 !bg-teal-neon/[0.08]',
                    )}
                  >
                    <Server className={cn('h-5 w-5', down ? 'text-rose-neon' : 'text-cyan-neon')} aria-hidden="true" />
                    <span className="font-display text-[0.86rem] font-semibold text-mist-50">computer {index + 1}</span>
                    <span className="font-mono text-[0.6rem] uppercase text-amber-neon">{down ? 'failed' : role}</span>
                  </button>
                )
              })}
            </div>
            <div className="viz-node mx-auto flex max-w-xs items-center justify-center gap-2 py-2" data-active="true">
              <Database className="h-4 w-4 text-violet-neon" aria-hidden="true" />
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-mist-200">storage-area network</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-line-soft bg-ink-900/55 px-3 py-2">
          <p className="font-mono text-[0.6rem] uppercase tracking-wider text-mist-500">Shared</p>
          <p className="text-[0.85rem] text-mist-100">{notes[tab].shared}</p>
        </div>
        <div className="rounded-lg border border-line-soft bg-ink-900/55 px-3 py-2">
          <p className="font-mono text-[0.6rem] uppercase tracking-wider text-mist-500">Private</p>
          <p className="text-[0.85rem] text-mist-100">{notes[tab].private}</p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        <BilingualProse text={notes[tab].text} className="text-[0.92rem]" />
        {outcome ? (
          <div className="mt-2.5 flex items-start gap-2 rounded-lg border border-teal-neon/25 bg-teal-neon/[0.05] p-2.5">
            <ShieldAlert className="mt-0.5 h-4 w-4 flex-none text-teal-neon" aria-hidden="true" />
            <BilingualProse text={outcome} className="text-[0.9rem]" />
          </div>
        ) : null}
      </div>

      {failed.length ? (
        <button type="button" className="btn btn-ghost btn-sm mt-3" onClick={() => setFailed([])}>
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Repair everything
        </button>
      ) : null}
    </VisualFrame>
  )
}
