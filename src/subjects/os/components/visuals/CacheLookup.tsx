import { useEffect, useRef, useState } from 'react'
import { HardDrive, Pause, Play, RotateCcw, Zap } from 'lucide-react'
import type { LText } from '../../types'
import { BilingualProse } from '../ui/Text'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

type Policy = 'LRU' | 'FIFO'
const ITEMS = ['A', 'B', 'C', 'D', 'E']
const SAMPLE = ['A', 'B', 'C', 'A', 'D', 'A', 'B', 'E', 'A', 'B']
const SLOTS = 3

interface Access {
  item: string
  hit: boolean
  evicted?: string
}

function explain(last: Access | undefined, policy: Policy): LText {
  if (!last) {
    return {
      en: 'Request an item. The **faster storage (cache) is checked first**.',
      ar: 'اطلب item. الـ **storage الأسرع (الـ cache) بيتشيك الأول**.',
    }
  }
  if (last.hit) {
    return {
      en: `**Hit:** ${last.item} is already in the cache, so it is **used directly from the cache (fast)**.`,
      ar: `**Hit:** الـ ${last.item} موجود في الـ cache، فبيتستخدم **مباشرة من الـ cache (سريع)**.`,
    }
  }
  if (last.evicted) {
    return {
      en: `**Miss:** ${last.item} is not cached. The cache is full, so the ${policy} replacement policy evicts ${last.evicted}; then ${last.item} is **copied to the cache and used there**.`,
      ar: `**Miss:** الـ ${last.item} مش في الـ cache، والـ cache مليان، فسياسة ${policy} بتطلّع ${last.evicted}؛ وبعدين ${last.item} **بيتنسخ للـ cache ويتستخدم من هناك**.`,
    }
  }
  return {
    en: `**Miss:** ${last.item} is not cached, so it is **copied from slower storage into the cache and used there**.`,
    ar: `**Miss:** الـ ${last.item} مش في الـ cache، فبيتنسخ **من الـ storage الأبطأ للـ cache ويتستخدم من هناك**.`,
  }
}

interface CacheState {
  cache: string[]
  log: Access[]
}

/** Pure transition: check the cache first, then hit or miss (+ eviction when full). */
export function accessCache(state: CacheState, item: string, policy: Policy): CacheState {
  const hit = state.cache.includes(item)
  let next = [...state.cache]
  let evicted: string | undefined
  if (hit) {
    if (policy === 'LRU') next = [...next.filter((entry) => entry !== item), item]
  } else {
    if (next.length >= SLOTS) {
      evicted = next[0]
      next = next.slice(1)
    }
    next.push(item)
  }
  return { cache: next, log: [...state.log, { item, hit, evicted }] }
}

const EMPTY: CacheState = { cache: [], log: [] }

export function CacheLookupVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [policy, setPolicy] = useState<Policy>('LRU')
  const [state, setState] = useState<CacheState>(EMPTY)
  const [playing, setPlaying] = useState(false)
  const sampleIndex = useRef(0)
  const { cache, log } = state

  const request = (item: string) => setState((current) => accessCache(current, item, policy))

  const reset = () => {
    setPlaying(false)
    setState(EMPTY)
    sampleIndex.current = 0
  }

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      if (sampleIndex.current >= SAMPLE.length) {
        setPlaying(false)
        return
      }
      request(SAMPLE[sampleIndex.current])
      sampleIndex.current += 1
    }, 900)
    return () => window.clearInterval(timer)
    // request depends only on policy, which is fixed while playing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, policy])

  const hits = log.filter((entry) => entry.hit).length
  const last = log[log.length - 1]
  const rate = log.length ? Math.round((hits / log.length) * 100) : 0

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Request items, or play the sample sequence.' }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-lg border border-line-soft bg-ink-950/60 p-1" role="group" aria-label="Replacement policy">
          {(['LRU', 'FIFO'] as Policy[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => {
                reset()
                setPolicy(candidate)
              }}
              aria-pressed={policy === candidate}
              className={cn(
                'rounded-md px-3 py-1 text-[0.78rem] font-semibold transition-colors',
                policy === candidate ? 'bg-cyan-neon/15 text-cyan-neon' : 'text-mist-400 hover:text-mist-100',
              )}
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-teal">{hits} hits</span>
          <span className="badge badge-amber">{log.length - hits} misses</span>
          <span className="badge">hit rate {rate}%</span>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
        <div className="rounded-xl border border-violet-neon/30 bg-violet-neon/[0.05] p-3">
          <p className="flex items-center gap-1.5 font-mono text-[0.64rem] uppercase tracking-wider text-violet-neon">
            <HardDrive className="h-3.5 w-3.5" aria-hidden="true" /> Slower, larger storage — click to request
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setPlaying(false)
                  request(item)
                }}
                className="h-11 w-11 rounded-lg border border-line bg-ink-900/70 font-display text-[1.1rem] font-bold text-mist-100 transition-colors hover:border-violet-neon/60 hover:text-white"
                aria-label={`Request ${item}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden text-center font-mono text-[0.65rem] text-mist-500 md:block" aria-hidden="true">
          miss: copy →
          <br />← hit: use
        </div>
        <div className="rounded-xl border border-cyan-neon/30 bg-cyan-neon/[0.05] p-3">
          <p className="flex items-center gap-1.5 font-mono text-[0.64rem] uppercase tracking-wider text-cyan-neon">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" /> Cache — {SLOTS} slots, checked first
          </p>
          <ol className="mt-2.5 flex gap-2" aria-label="Cache contents">
            {Array.from({ length: SLOTS }, (_, index) => {
              const item = cache[index]
              const fresh = last && item === last.item
              return (
                <li
                  key={index}
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-lg border font-display text-[1.1rem] font-bold transition-all',
                    !item && 'border-dashed border-line text-mist-600',
                    item && !fresh && 'border-line bg-ink-900/70 text-mist-100',
                    fresh && last?.hit && 'border-teal-neon bg-teal-neon/20 text-teal-50',
                    fresh && !last?.hit && 'border-amber-neon bg-amber-neon/20 text-amber-50',
                  )}
                >
                  {item ?? '·'}
                </li>
              )
            })}
          </ol>
          <p className="mt-2 font-mono text-[0.6rem] text-mist-500">
            {policy === 'LRU' ? 'left = least recently used' : 'left = oldest arrival'}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-line-soft bg-ink-950/50 p-3.5" aria-live="polite">
        <BilingualProse text={explain(last, policy)} className="text-[0.93rem]" />
        {log.length ? (
          <ol className="mt-2.5 flex flex-wrap gap-1" aria-label="Access history">
            {log.map((entry, index) => (
              <li
                key={index}
                className={cn(
                  'rounded px-1.5 py-0.5 font-mono text-[0.7rem]',
                  entry.hit ? 'bg-teal-neon/15 text-teal-neon' : 'bg-amber-neon/15 text-amber-neon',
                )}
              >
                {entry.item}
                {entry.hit ? '✓' : '✗'}
              </li>
            ))}
          </ol>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => {
            if (sampleIndex.current >= SAMPLE.length) reset()
            setPlaying((value) => !value)
          }}
        >
          {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
          {playing ? 'Pause' : 'Play sample: A B C A D A B E A B'}
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={reset}>
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
        <span className="text-[0.75rem] text-mist-500">
          Same requests, different policy → different hit rate. That is why “replacement policy” is a design problem.
        </span>
      </div>
    </VisualFrame>
  )
}
