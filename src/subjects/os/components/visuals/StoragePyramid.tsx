import { useState } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import type { LText } from '../../types'
import { useLanguage } from '../../context/LanguageContext'
import { BilingualProse, RichText } from '../ui/Text'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

interface Level {
  name: string
  volatile: boolean
  tone: string
  bar: string
  table?: {
    size: string
    technology: string
    access: string
    bandwidth: string
    managedBy: string
    backedBy: string
    /** Slowest access in ns divided by 0.5 ns, expressed as a human duration. */
    scaled: LText
  }
  note: LText
}

const levels: Level[] = [
  {
    name: 'Registers',
    volatile: true,
    tone: 'from-cyan-neon/40 to-cyan-neon/20 border-cyan-neon/60',
    bar: 'bg-cyan-neon',
    table: {
      size: '< 1 KB',
      technology: 'custom memory with multiple ports, CMOS',
      access: '0.25 – 0.5 ns',
      bandwidth: '20,000 – 100,000 MB/s',
      managedBy: 'compiler',
      backedBy: 'cache',
      scaled: { en: '≈ 1 second', ar: '≈ ثانية واحدة' },
    },
    note: {
      en: 'Inside the CPU. The fastest and smallest level; the **compiler** decides what lives here.',
      ar: 'جوه الـ CPU. أسرع وأصغر مستوى؛ والـ **compiler** هو اللي بيقرر إيه اللي يتحط فيه.',
    },
  },
  {
    name: 'Cache',
    volatile: true,
    tone: 'from-cyan-neon/30 to-teal-neon/20 border-cyan-neon/45',
    bar: 'bg-cyan-neon/80',
    table: {
      size: '< 16 MB',
      technology: 'on-chip or off-chip CMOS SRAM',
      access: '0.5 – 25 ns',
      bandwidth: '5,000 – 10,000 MB/s',
      managedBy: 'hardware',
      backedBy: 'main memory',
      scaled: { en: '1 – 50 seconds', ar: 'من ثانية لـ 50 ثانية' },
    },
    note: {
      en: 'Managed by **hardware**, not by the OS. Holds copies of main-memory data that is in use.',
      ar: 'بيديره الـ **hardware** مش الـ OS. فيه نسخ من داتا الـ main memory اللي بتتستخدم حاليًا.',
    },
  },
  {
    name: 'Main memory',
    volatile: true,
    tone: 'from-teal-neon/30 to-teal-neon/15 border-teal-neon/50',
    bar: 'bg-teal-neon',
    table: {
      size: '< 64 GB',
      technology: 'CMOS DRAM',
      access: '80 – 250 ns',
      bandwidth: '1,000 – 5,000 MB/s',
      managedBy: 'operating system',
      backedBy: 'disk',
      scaled: { en: '≈ 3 – 8 minutes', ar: 'حوالي 3 لـ 8 دقايق' },
    },
    note: {
      en: 'The **only large storage the CPU can access directly**. Random access and typically **volatile**. Can be viewed as a cache for secondary storage. (The lecture transcript prints “CMOS SRAM” for this row; the textbook figure it reproduces says DRAM.)',
      ar: '**الـ storage الكبير الوحيد اللي الـ CPU توصله مباشرة**. Random access وغالبًا **volatile**. وممكن نعتبرها cache للـ secondary storage. (نص المحاضرة مكتوب فيه “CMOS SRAM” للصف ده، لكن شكل الكتاب الأصلي مكتوب فيه DRAM.)',
    },
  },
  {
    name: 'Solid-state disk',
    volatile: false,
    tone: 'from-violet-neon/30 to-violet-neon/15 border-violet-neon/50',
    bar: 'bg-violet-neon',
    table: {
      size: '< 1 TB',
      technology: 'flash memory',
      access: '25,000 – 50,000 ns',
      bandwidth: '500 MB/s',
      managedBy: 'operating system',
      backedBy: 'disk',
      scaled: { en: '≈ 14 – 28 hours', ar: 'حوالي 14 لـ 28 ساعة' },
    },
    note: {
      en: 'Non-volatile and **faster than magnetic disks**; various technologies, becoming more popular.',
      ar: 'Non-volatile و**أسرع من الـ magnetic disks**؛ تقنيات مختلفة وبتنتشر أكتر.',
    },
  },
  {
    name: 'Magnetic disk',
    volatile: false,
    tone: 'from-violet-neon/25 to-rose-neon/15 border-violet-neon/40',
    bar: 'bg-rose-neon',
    table: {
      size: '< 10 TB',
      technology: 'magnetic disk',
      access: '5,000,000 ns',
      bandwidth: '20 – 150 MB/s',
      managedBy: 'operating system',
      backedBy: 'disk or tape',
      scaled: { en: '≈ 116 days', ar: 'حوالي 116 يوم' },
    },
    note: {
      en: 'Rigid metal or glass **platters**; each surface is logically divided into **tracks**, which are subdivided into **sectors**. The **disk controller** handles the logical interaction with the computer.',
      ar: '**Platters** من معدن أو زجاج؛ كل سطح متقسم منطقيًا لـ **tracks** وكل track لـ **sectors**. والـ **disk controller** بيدير التعامل المنطقي مع الكمبيوتر.',
    },
  },
  {
    name: 'Optical disk',
    volatile: false,
    tone: 'from-rose-neon/20 to-amber-neon/10 border-rose-neon/35',
    bar: 'bg-amber-neon',
    note: {
      en: '**Tertiary storage**: does not need to be fast but must still be managed. May be **WORM** or **RW**. Not in the lecture’s table.',
      ar: '**Tertiary storage**: مش لازم يبقى سريع بس لازم يتدار. ممكن يبقى **WORM** أو **RW**. ومش موجود في جدول المحاضرة.',
    },
  },
  {
    name: 'Magnetic tapes',
    volatile: false,
    tone: 'from-amber-neon/20 to-amber-neon/10 border-amber-neon/35',
    bar: 'bg-amber-neon/70',
    note: {
      en: 'Also **tertiary storage**: the largest and cheapest per byte, the slowest, and accessed **sequentially**.',
      ar: 'برضه **tertiary storage**: الأكبر والأرخص لكل byte، والأبطأ، والوصول ليه **sequential**.',
    },
  },
]

export function StoragePyramidVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [selected, setSelected] = useState(2)
  const { isArabic } = useLanguage()
  const level = levels[selected]

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Click any level of the hierarchy.' }}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid grid-cols-[1.6rem_minmax(0,1fr)_1.6rem] gap-2">
          <div className="flex flex-col items-center justify-between py-1 text-cyan-neon" aria-hidden="true">
            <ArrowUp className="h-4 w-4" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] [writing-mode:vertical-rl] rotate-180">
              faster · smaller · costlier per byte
            </span>
            <span />
          </div>
          <ol className="flex flex-col items-center gap-1.5" aria-label="Storage-device hierarchy, fastest first">
            {levels.map((entry, index) => (
              <li key={entry.name} className="w-full" style={{ paddingInline: `${(levels.length - 1 - index) * 5.5}%` }}>
                {index === 3 ? (
                  <div className="mb-1.5 flex items-center gap-2 text-[0.62rem] font-mono uppercase tracking-wider text-amber-neon">
                    <span className="h-px flex-1 border-t border-dashed border-amber-neon/60" />
                    volatile ↑ · nonvolatile ↓
                    <span className="h-px flex-1 border-t border-dashed border-amber-neon/60" />
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => setSelected(index)}
                  aria-pressed={selected === index}
                  className={cn(
                    'w-full rounded-lg border bg-gradient-to-r px-2 py-2 text-center font-display text-[0.86rem] font-semibold text-mist-50 transition-all',
                    entry.tone,
                    selected === index ? 'ring-2 ring-white/25 brightness-125' : 'opacity-80 hover:opacity-100',
                  )}
                >
                  {entry.name}
                </button>
              </li>
            ))}
          </ol>
          <div className="flex flex-col items-center justify-between py-1 text-amber-neon" aria-hidden="true">
            <span />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] [writing-mode:vertical-rl]">
              slower · larger · cheaper per byte
            </span>
            <ArrowDown className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-3" aria-live="polite">
          <div className="rounded-xl border border-line-soft bg-ink-950/50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-[1.15rem] font-semibold text-mist-50">
                Level {selected + 1} · {level.name}
              </p>
              <span className={cn('badge', level.volatile ? 'badge-amber' : 'badge-violet')}>
                {level.volatile ? 'volatile' : 'nonvolatile'}
              </span>
            </div>
            <BilingualProse text={level.note} className="mt-2 text-[0.92rem]" />
          </div>

          {level.table ? (
            <dl className="grid grid-cols-2 gap-2 text-[0.8rem]">
              {(
                [
                  ['Typical size', level.table.size],
                  ['Access time', level.table.access],
                  ['Bandwidth', level.table.bandwidth],
                  ['Managed by', level.table.managedBy],
                  ['Backed by', level.table.backedBy],
                  ['Technology', level.table.technology],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="rounded-lg border border-line-soft bg-ink-900/55 px-3 py-2">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-mist-500">{label}</dt>
                  <dd className="mt-0.5 font-medium text-mist-100">{value}</dd>
                </div>
              ))}
              <div className="col-span-2 rounded-lg border border-amber-neon/25 bg-amber-neon/[0.05] px-3 py-2">
                <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-amber-neon">
                  If a register access took 1 second…
                </dt>
                <dd className="mt-0.5 font-medium text-mist-100">
                  {level.table.scaled.en}
                  {isArabic && level.table.scaled.ar ? (
                    <span className="arabic-note ms-2 inline border-0 p-0" lang="ar" dir="rtl">
                      <RichText text={level.table.scaled.ar} />
                    </span>
                  ) : null}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="rounded-lg border border-line-soft bg-ink-900/55 px-3 py-2 text-[0.82rem] text-mist-400">
              The lecture’s table covers levels 1–5 only; optical disks and tapes appear elsewhere in the lecture.
            </p>
          )}

          <div className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5">
            <p className="font-mono text-[0.6rem] uppercase tracking-wider text-mist-500">
              Slowest access time per level (log scale)
            </p>
            <ul className="mt-2 space-y-1">
              {levels.slice(0, 5).map((entry, index) => {
                const ns = [0.5, 25, 250, 50000, 5000000][index]
                const width = ((Math.log10(ns) + 0.5) / 7.2) * 100
                return (
                  <li key={entry.name} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-2">
                    <span className={cn('truncate text-[0.7rem]', index === selected ? 'text-mist-50' : 'text-mist-500')}>
                      {entry.name}
                    </span>
                    <span className="h-2 rounded-full bg-ink-800">
                      <span className={cn('block h-2 rounded-full', entry.bar)} style={{ width: `${Math.max(4, width)}%` }} />
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}
