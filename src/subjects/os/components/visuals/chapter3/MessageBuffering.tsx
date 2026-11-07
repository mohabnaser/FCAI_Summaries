import { useState } from 'react'
import { Inbox, RotateCcw, Send } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

type Capacity = 'zero' | 'bounded' | 'unbounded'

const BOUND = 3

const capacities: Array<{ id: Capacity; label: string; rule: LText }> = [
  { id: 'zero', label: 'Zero capacity', rule: { en: '0 messages — sender must wait for receiver (rendezvous).', ar: 'صفر رسايل — الـ sender لازم يستنى الـ receiver (rendezvous).' } },
  { id: 'bounded', label: `Bounded (n = ${BOUND})`, rule: { en: `Finite length of ${BOUND} messages — sender must wait if the link is full.`, ar: `طول محدود ${BOUND} رسايل — الـ sender لازم يستنى لو الـ link مليان.` } },
  { id: 'unbounded', label: 'Unbounded', rule: { en: 'Infinite length — sender never waits.', ar: 'طول لا نهائي — الـ sender عمره ما بيستنى.' } },
]

interface Link {
  queue: number[]
  /** A message the sender is blocked on (it could not be queued yet). */
  pending: number | null
  receiverBlocked: boolean
  received: number[]
  next: number
}

const empty: Link = { queue: [], pending: null, receiverBlocked: false, received: [], next: 1 }

export function MessageBufferingVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [capacity, setCapacity] = useState<Capacity>('zero')
  const [link, setLink] = useState<Link>(empty)
  const [log, setLog] = useState<LText>(capacities[0].rule)
  const limit = capacity === 'zero' ? 0 : capacity === 'bounded' ? BOUND : Infinity

  const choose = (id: Capacity) => {
    setCapacity(id)
    setLink(empty)
    setLog(capacities.find((entry) => entry.id === id)!.rule)
  }

  const send = () => {
    if (link.pending !== null) {
      setLog({ en: 'The sender is **blocked** — it cannot send again until its message is accepted.', ar: 'الـ sender **متعطّل** — مش هيقدر يبعت تاني لحد ما رسالته تتقبل.' })
      return
    }
    const message = link.next
    if (link.receiverBlocked) {
      setLink({ ...link, receiverBlocked: false, received: [...link.received, message], next: message + 1 })
      setLog({ en: `The receiver was blocked in receive(), so m${message} is handed over directly and **both continue**.`, ar: `الـ receiver كان متعطّل في receive()، فالـ m${message} اتسلّمت على طول و**الاتنين كمّلوا**.` })
      return
    }
    if (link.queue.length < limit) {
      setLink({ ...link, queue: [...link.queue, message], next: message + 1 })
      setLog({ en: `send(m${message}): queued (${link.queue.length + 1}${limit === Infinity ? '' : `/${limit}`}). The sender **continues**.`, ar: `send(m${message}): اتحطت في الـ queue (${link.queue.length + 1}${limit === Infinity ? '' : `/${limit}`}). الـ sender **بيكمّل**.` })
      return
    }
    setLink({ ...link, pending: message, next: message + 1 })
    setLog(
      capacity === 'zero'
        ? { en: `send(m${message}): the queue holds **zero** messages, so the sender **blocks until the receiver receives** — a rendezvous.`, ar: `send(m${message}): الـ queue مش بتشيل **ولا رسالة**، فالـ sender **بيتعطّل لحد ما الـ receiver يستلم** — rendezvous.` }
        : { en: `send(m${message}): the link is **full**, so the sender must wait.`, ar: `send(m${message}): الـ link **مليان**، فالـ sender لازم يستنى.` },
    )
  }

  const receive = () => {
    if (link.queue.length > 0) {
      const [first, ...rest] = link.queue
      const queue = link.pending !== null ? [...rest, link.pending] : rest
      setLink({ ...link, queue, pending: null, received: [...link.received, first] })
      setLog({
        en: `receive() → m${first}.${link.pending !== null ? ` A slot freed up, so the blocked sender’s m${link.pending} enters the queue and the sender continues.` : ''}`,
        ar: `receive() ← m${first}.${link.pending !== null ? ` خانة فضيت، فالـ m${link.pending} بتاعة الـ sender المتعطّل دخلت الـ queue والـ sender كمّل.` : ''}`,
      })
      return
    }
    if (link.pending !== null) {
      setLink({ ...link, pending: null, received: [...link.received, link.pending] })
      setLog({ en: `receive() takes m${link.pending} straight from the sender — **rendezvous**: both were blocked, both continue.`, ar: `receive() بتاخد m${link.pending} من الـ sender على طول — **rendezvous**: الاتنين كانوا متعطّلين، والاتنين كمّلوا.` })
      return
    }
    setLink({ ...link, receiverBlocked: true })
    setLog({ en: 'Nothing to receive: a **blocking receive** waits until a message is available.', ar: 'مفيش حاجة تتستلم: الـ **blocking receive** بيستنى لحد ما رسالة تبقى متاحة.' })
  }

  const slots = capacity === 'unbounded' ? Math.max(link.queue.length + 1, 4) : limit

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Choose a capacity, then send and receive.' }}>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Link capacity">
        {capacities.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="radio"
            aria-checked={capacity === entry.id}
            onClick={() => choose(entry.id)}
            className={cn(
              'rounded-xl border px-2 py-2 text-[0.8rem] font-semibold transition-all',
              capacity === entry.id ? 'border-cyan-neon/60 bg-cyan-neon/15 text-mist-50' : 'border-line bg-ink-900/50 text-mist-300 hover:border-cyan-neon/35',
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-4">
        <div className={cn('flex w-20 flex-col items-center gap-1 rounded-xl border px-2 py-3 sm:w-24', link.pending !== null ? 'border-rose-neon/60 bg-rose-neon/10' : 'border-cyan-neon/40 bg-cyan-neon/[0.07]')}>
          <Send className={cn('h-5 w-5', link.pending !== null ? 'text-rose-neon' : 'text-cyan-neon')} aria-hidden="true" />
          <span className="font-display text-[0.86rem] font-semibold text-mist-50">Sender</span>
          <span className={cn('font-mono text-[0.64rem]', link.pending !== null ? 'text-rose-neon' : 'text-mist-400')}>
            {link.pending !== null ? `blocked · m${link.pending}` : 'running'}
          </span>
        </div>
        <div className="min-w-0 rounded-xl border border-dashed border-line px-2 py-3">
          <p className="text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-mist-500">link queue</p>
          {slots === 0 ? (
            <p className="mt-2 text-center font-mono text-[0.78rem] text-rose-neon">no slots — no buffering</p>
          ) : (
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              {Array.from({ length: slots }, (_, index) => link.queue[index]).map((message, index) => (
                <span
                  key={index}
                  className={cn(
                    'flex h-9 w-10 items-center justify-center rounded-lg border font-mono text-[0.78rem] font-bold transition-all',
                    message !== undefined ? 'border-amber-neon/55 bg-amber-neon/15 text-mist-50' : 'border-line-soft text-mist-600',
                  )}
                >
                  {message !== undefined ? `m${message}` : '·'}
                </span>
              ))}
              {capacity === 'unbounded' ? <span className="self-center font-mono text-[0.9rem] text-mist-500">∞</span> : null}
            </div>
          )}
        </div>
        <div className={cn('flex w-20 flex-col items-center gap-1 rounded-xl border px-2 py-3 sm:w-24', link.receiverBlocked ? 'border-rose-neon/60 bg-rose-neon/10' : 'border-teal-neon/40 bg-teal-neon/[0.07]')}>
          <Inbox className={cn('h-5 w-5', link.receiverBlocked ? 'text-rose-neon' : 'text-teal-neon')} aria-hidden="true" />
          <span className="font-display text-[0.86rem] font-semibold text-mist-50">Receiver</span>
          <span className={cn('font-mono text-[0.64rem]', link.receiverBlocked ? 'text-rose-neon' : 'text-mist-400')}>
            {link.receiverBlocked ? 'blocked' : `got ${link.received.length}`}
          </span>
        </div>
      </div>

      <div className="mt-3 min-h-[3.5rem] rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        <BilingualProse text={log} className="text-[0.92rem]" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" className="btn btn-primary btn-sm" onClick={send}>
          <Send className="h-3.5 w-3.5" aria-hidden="true" /> send()
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={receive}>
          <Inbox className="h-3.5 w-3.5" aria-hidden="true" /> receive()
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => choose(capacity)}>
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
        </button>
        {link.received.length ? (
          <span className="ml-auto font-mono text-[0.72rem] text-mist-500">received: {link.received.map((m) => `m${m}`).join(' ')}</span>
        ) : null}
      </div>
    </VisualFrame>
  )
}
