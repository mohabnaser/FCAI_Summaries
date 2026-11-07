import { useState } from 'react'
import { BookOpen, PenLine, RotateCcw } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

/*
 * A tiny interpreter that runs the reader and writer code from the lesson against real
 * semaphores (value + waiting queue). Each actor runs until it blocks or reaches its
 * "reading"/"writing" pause; a signal wakes the first waiter, which then runs on.
 */
type Sem = 'mutex' | 'rw_mutex'
type Instr =
  | { op: 'wait' | 'signal'; sem: Sem }
  | { op: 'inc' }
  | { op: 'dec' }
  | { op: 'waitIfFirst' }
  | { op: 'signalIfLast' }
  | { op: 'pause'; label: string }
  | { op: 'end' }

const readerCode: Instr[] = [
  { op: 'wait', sem: 'mutex' },
  { op: 'inc' },
  { op: 'waitIfFirst' },
  { op: 'signal', sem: 'mutex' },
  { op: 'pause', label: 'reading' },
  { op: 'wait', sem: 'mutex' },
  { op: 'dec' },
  { op: 'signalIfLast' },
  { op: 'signal', sem: 'mutex' },
  { op: 'end' },
]

const writerCode: Instr[] = [
  { op: 'wait', sem: 'rw_mutex' },
  { op: 'pause', label: 'writing' },
  { op: 'signal', sem: 'rw_mutex' },
  { op: 'end' },
]

interface Actor {
  id: string
  kind: 'reader' | 'writer'
  pc: number
  blockedOn: Sem | null
  done: boolean
}

interface World {
  sems: Record<Sem, { value: number; queue: string[] }>
  readCount: number
  actors: Actor[]
  log: string[]
  nextReader: number
  nextWriter: number
}

const empty = (): World => ({
  sems: { mutex: { value: 1, queue: [] }, rw_mutex: { value: 1, queue: [] } },
  readCount: 0,
  actors: [],
  log: [],
  nextReader: 1,
  nextWriter: 1,
})

function clone(world: World): World {
  return {
    ...world,
    sems: { mutex: { ...world.sems.mutex, queue: [...world.sems.mutex.queue] }, rw_mutex: { ...world.sems.rw_mutex, queue: [...world.sems.rw_mutex.queue] } },
    actors: world.actors.map((actor) => ({ ...actor })),
    log: [...world.log],
  }
}

const code = (actor: Actor) => (actor.kind === 'reader' ? readerCode : writerCode)
const semLabel = (sem: Sem) => (sem === 'rw_mutex' ? 'rw_mutex (writeBlock)' : 'mutex')

/** Runs `id` until it blocks, pauses or ends. Woken actors are queued and run after. */
function run(world: World, id: string) {
  const ready = [id]
  while (ready.length) {
    const nextId = ready.shift()
    const actor = world.actors.find((entry) => entry.id === nextId)
    if (!actor) continue
    while (!actor.done && !actor.blockedOn) {
      const instr = code(actor)[actor.pc]
      if (instr.op === 'pause') break
      if (instr.op === 'end') {
        actor.done = true
        world.log.push(`${actor.id} leaves.`)
        break
      }
      const doWait = (sem: Sem) => {
        const s = world.sems[sem]
        s.value -= 1
        if (s.value < 0) {
          s.queue.push(actor.id)
          actor.blockedOn = sem
          world.log.push(`${actor.id}: wait(${semLabel(sem)}) → blocked.`)
          return false
        }
        return true
      }
      const doSignal = (sem: Sem) => {
        const s = world.sems[sem]
        s.value += 1
        if (s.value <= 0 && s.queue.length) {
          const wokenId = s.queue.shift()!
          const woken = world.actors.find((entry) => entry.id === wokenId)!
          woken.blockedOn = null
          woken.pc += 1
          world.log.push(`${actor.id}: signal(${semLabel(sem)}) → wakes ${wokenId}.`)
          ready.push(wokenId)
        }
      }
      if (instr.op === 'wait') {
        if (!doWait(instr.sem)) break
      } else if (instr.op === 'signal') doSignal(instr.sem)
      else if (instr.op === 'inc') world.readCount += 1
      else if (instr.op === 'dec') world.readCount -= 1
      else if (instr.op === 'waitIfFirst') {
        if (world.readCount === 1) {
          world.log.push(`${actor.id} is the first reader → wait(rw_mutex).`)
          if (!doWait('rw_mutex')) break
        }
      } else if (instr.op === 'signalIfLast') {
        if (world.readCount === 0) {
          world.log.push(`${actor.id} is the last reader → signal(rw_mutex).`)
          doSignal('rw_mutex')
        }
      }
      actor.pc += 1
    }
  }
}

function status(actor: Actor): string {
  if (actor.done) return 'left'
  if (actor.blockedOn) return `blocked on ${semLabel(actor.blockedOn)}`
  const instr = code(actor)[actor.pc]
  return instr.op === 'pause' ? instr.label : '…'
}

export function ReadersWritersVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [world, setWorld] = useState<World>(empty)

  const update = (fn: (draft: World) => void) =>
    setWorld((current) => {
      const draft = clone(current)
      fn(draft)
      draft.log = draft.log.slice(-6)
      return draft
    })

  const arrive = (draft: World, kind: 'reader' | 'writer') => {
    const id = kind === 'reader' ? `R${draft.nextReader++}` : `W${draft.nextWriter++}`
    draft.actors.push({ id, kind, pc: 0, blockedOn: null, done: false })
    draft.log.push(`${id} arrives.`)
    run(draft, id)
  }

  const finish = (id: string) =>
    update((draft) => {
      const actor = draft.actors.find((entry) => entry.id === id)!
      actor.pc += 1
      run(draft, id)
    })

  const preset = (which: 'q52' | 'q53') =>
    setWorld(() => {
      const draft = empty()
      if (which === 'q52') {
        arrive(draft, 'writer')
        arrive(draft, 'reader')
        arrive(draft, 'reader')
        arrive(draft, 'reader')
      } else {
        arrive(draft, 'reader')
        arrive(draft, 'reader')
        arrive(draft, 'writer')
      }
      draft.log = draft.log.slice(-6)
      return draft
    })

  const visible = world.actors.filter((actor) => !actor.done)
  const explain: LText | null = (() => {
    const blockedRw = visible.filter((actor) => actor.blockedOn === 'rw_mutex')
    const blockedMutex = visible.filter((actor) => actor.blockedOn === 'mutex')
    if (blockedRw.some((actor) => actor.kind === 'reader') && blockedMutex.length)
      return {
        en: `The first reader (${blockedRw.find((a) => a.kind === 'reader')!.id}) is blocked on **rw_mutex** while holding **mutex**, so the other readers (${blockedMutex.map((a) => a.id).join(', ')}) are blocked on **mutex**.`,
        ar: `أول reader (${blockedRw.find((a) => a.kind === 'reader')!.id}) متعطّل على **rw_mutex** وهو ماسك **mutex**، فباقي الـ readers (${blockedMutex.map((a) => a.id).join(' و')}) متعطّلين على **mutex**.`,
      }
    if (blockedRw.some((actor) => actor.kind === 'writer') && world.readCount > 0)
      return {
        en: `${blockedRw.filter((a) => a.kind === 'writer').map((a) => a.id).join(', ')} waits on **rw_mutex** until read_count drops to 0. New readers still get in — keep adding readers and the writer **starves**.`,
        ar: `${blockedRw.filter((a) => a.kind === 'writer').map((a) => a.id).join(' و')} مستني على **rw_mutex** لحد ما read_count يوصل 0. والـ readers الجداد لسه بيدخلوا — لو فضلت تضيف readers الـ writer **هيتجوّع**.`,
      }
    return null
  })()

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Add readers and writers; finish them to release.' }}>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => update((draft) => arrive(draft, 'reader'))}>
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> Reader arrives
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => update((draft) => arrive(draft, 'writer'))}>
          <PenLine className="h-3.5 w-3.5" aria-hidden="true" /> Writer arrives
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => preset('q52')}>
          Case: writer writing, 3 readers arrive
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => preset('q53')}>
          Case: readers reading, writer arrives
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setWorld(empty())}>
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
        </button>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(['rw_mutex', 'mutex'] as Sem[]).map((sem) => (
          <div key={sem} className="rounded-xl border border-violet-neon/60 bg-ink-850 p-3">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-violet-neon">{semLabel(sem)}</p>
            <p className="mt-1 font-display text-[1.6rem] font-bold leading-none text-mist-50">{world.sems[sem].value}</p>
            <p className="mt-1.5 font-mono text-[0.72rem] text-mist-400">
              queue: {world.sems[sem].queue.length ? world.sems[sem].queue.join(' → ') : 'empty'}
            </p>
          </div>
        ))}
        <div className="rounded-xl border border-amber-neon/60 bg-ink-850 p-3">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-amber-neon">read_count (readCount)</p>
          <p className="mt-1 font-display text-[1.6rem] font-bold leading-none text-mist-50">{world.readCount}</p>
          <p className="mt-1.5 text-[0.72rem] text-mist-400">guarded by mutex</p>
        </div>
      </div>

      <div className="mt-3 grid min-h-[5.5rem] grid-cols-2 gap-2 sm:grid-cols-4">
        {visible.length === 0 ? (
          <p className="col-span-full self-center text-center text-[0.86rem] text-mist-500">No processes yet — add a reader or a writer, or load a case.</p>
        ) : (
          visible.map((actor) => {
            const s = status(actor)
            const paused = s === 'reading' || s === 'writing'
            return (
              <div
                key={actor.id}
                className={cn(
                  'flex flex-col gap-1.5 rounded-xl border bg-ink-850 p-2.5',
                  actor.blockedOn ? 'border-rose-neon/70' : actor.kind === 'reader' ? 'border-teal-neon/70' : 'border-cyan-neon/70',
                )}
              >
                <span className={cn('font-display text-[1rem] font-semibold', actor.kind === 'reader' ? 'text-teal-neon' : 'text-cyan-neon')}>
                  {actor.id} · {actor.kind}
                </span>
                <span className={cn('text-[0.76rem]', actor.blockedOn ? 'font-semibold text-rose-neon' : 'text-mist-200')}>{s}</span>
                {paused ? (
                  <button type="button" className="rounded-lg border border-line bg-ink-900 px-2 py-1 text-[0.74rem] font-semibold text-mist-100 hover:border-cyan-neon" onClick={() => finish(actor.id)}>
                    finish {s}
                  </button>
                ) : null}
              </div>
            )
          })
        )}
      </div>

      {explain ? (
        <div className="mt-3 rounded-xl border border-amber-neon/60 bg-amber-neon/10 p-3.5" aria-live="polite">
          <BilingualProse text={explain} className="text-[0.92rem]" />
        </div>
      ) : null}
      {world.log.length ? (
        <ol className="mt-3 space-y-0.5 rounded-xl border border-line bg-ink-900 p-3 font-mono text-[0.74rem] text-mist-300">
          {world.log.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ol>
      ) : null}
    </VisualFrame>
  )
}
