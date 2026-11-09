/**
 * A small, exact CPU-scheduling simulator used by the Chapter 6 visuals and tests.
 *
 * Times are integers. Ties are broken the way the lecture solves its examples:
 * equal bursts / priorities go to the process that arrived first, then to the one
 * listed first. A preemptive algorithm only preempts for a strictly better process.
 */

export type Algorithm = 'fcfs' | 'sjf' | 'srtf' | 'priority' | 'priority-p' | 'rr'

/**
 * Round robin: who goes first when a new process arrives at the very instant the
 * running process's quantum expires. Most solutions (and this app) put the new
 * arrival first; some put the preempted process back first.
 */
export type RrTieRule = 'arrival-first' | 'preempted-first'

export interface ProcSpec {
  id: string
  arrival: number
  burst: number
  /** Smaller number = higher priority. */
  priority?: number
}

export interface Slice {
  /** `null` = the CPU is idle. */
  pid: string | null
  start: number
  end: number
}

export interface Decision {
  time: number
  /** Processes that could run at this moment, in queue order (RR) or listing order. */
  ready: Array<{ id: string; remaining: number; priority?: number }>
  chosen: string | null
  /** Why the scheduler was invoked at this moment. */
  cause: 'start' | 'arrival' | 'complete' | 'quantum' | 'idle'
  /** The process that was running just before (for preemption messages). */
  previous: string | null
}

export interface ProcResult extends ProcSpec {
  firstStart: number
  finish: number
  /** finish − arrival */
  turnaround: number
  /** turnaround − burst */
  waiting: number
  /** firstStart − arrival */
  response: number
}

export interface Schedule {
  algorithm: Algorithm
  slices: Slice[]
  decisions: Decision[]
  results: ProcResult[]
  avgWaiting: number
  avgTurnaround: number
  avgResponse: number
  /** Number of times the running process changes (a quantum expiry counts too). */
  contextSwitches: number
  makespan: number
}

export interface ScheduleOptions {
  quantum?: number
  rrTie?: RrTieRule
}

export const algorithmLabels: Record<Algorithm, string> = {
  fcfs: 'FCFS',
  sjf: 'SJF (non-preemptive)',
  srtf: 'SRTF (preemptive SJF)',
  priority: 'Priority (non-preemptive)',
  'priority-p': 'Priority (preemptive)',
  rr: 'Round Robin',
}

const isPreemptive = (algorithm: Algorithm) => algorithm === 'srtf' || algorithm === 'priority-p'

export function schedule(specs: ProcSpec[], algorithm: Algorithm, options: ScheduleOptions = {}): Schedule {
  const quantum = Math.max(1, Math.floor(options.quantum ?? 4))
  const rrTie = options.rrTie ?? 'arrival-first'
  const order = new Map(specs.map((spec, index) => [spec.id, index]))
  const remaining = new Map(specs.map((spec) => [spec.id, spec.burst]))
  const firstStart = new Map<string, number>()
  const finish = new Map<string, number>()
  const slices: Slice[] = []
  const decisions: Decision[] = []

  const byArrival = [...specs].filter((spec) => spec.burst > 0).sort((a, b) => a.arrival - b.arrival || order.get(a.id)! - order.get(b.id)!)
  for (const spec of specs) if (spec.burst <= 0) finish.set(spec.id, spec.arrival)

  const push = (pid: string | null, start: number, end: number, merge: boolean) => {
    if (end <= start) return
    const last = slices[slices.length - 1]
    if (merge && last && last.pid === pid && last.end === start) last.end = end
    else slices.push({ pid, start, end })
  }

  const snapshot = (ids: string[]) =>
    ids.map((id) => {
      const spec = specs[order.get(id)!]
      return { id, remaining: remaining.get(id)!, priority: spec.priority }
    })

  const better = (a: string, b: string): boolean => {
    // true when a should run before b
    const sa = specs[order.get(a)!]
    const sb = specs[order.get(b)!]
    const keyA = algorithm === 'priority' || algorithm === 'priority-p' ? (sa.priority ?? 0) : algorithm === 'fcfs' ? 0 : remaining.get(a)!
    const keyB = algorithm === 'priority' || algorithm === 'priority-p' ? (sb.priority ?? 0) : algorithm === 'fcfs' ? 0 : remaining.get(b)!
    if (keyA !== keyB) return keyA < keyB
    if (sa.arrival !== sb.arrival) return sa.arrival < sb.arrival
    return order.get(a)! < order.get(b)!
  }

  const pickBest = (ids: string[]) => ids.reduce((best, id) => (better(id, best) ? id : best))

  let time = 0
  let next = 0 // index into byArrival
  const arrived: string[] = [] // RR: the ready queue, in order; others: unordered pool

  const admitUntil = (limit: number, inclusive: boolean) => {
    while (next < byArrival.length && (inclusive ? byArrival[next].arrival <= limit : byArrival[next].arrival < limit)) {
      arrived.push(byArrival[next].id)
      next += 1
    }
  }

  if (algorithm === 'rr') {
    let previous: string | null = null
    let cause: Decision['cause'] = 'start'
    admitUntil(time, true)
    while (arrived.length || next < byArrival.length) {
      if (!arrived.length) {
        const idleUntil = byArrival[next].arrival
        decisions.push({ time, ready: [], chosen: null, cause: 'idle', previous })
        push(null, time, idleUntil, true)
        time = idleUntil
        admitUntil(time, true)
        previous = null
        cause = 'arrival'
        continue
      }
      decisions.push({ time, ready: snapshot(arrived), chosen: arrived[0], cause, previous })
      const pid = arrived.shift()!
      if (!firstStart.has(pid)) firstStart.set(pid, time)
      const run = Math.min(quantum, remaining.get(pid)!)
      const end = time + run
      push(pid, time, end, false)
      remaining.set(pid, remaining.get(pid)! - run)
      // Arrivals during the slice join the queue first; arrivals exactly at `end`
      // join before or after the preempted process depending on the tie rule.
      admitUntil(end, false)
      const done = remaining.get(pid)! === 0
      if (done) {
        finish.set(pid, end)
        admitUntil(end, true)
        cause = 'complete'
      } else if (rrTie === 'arrival-first') {
        admitUntil(end, true)
        arrived.push(pid)
        cause = 'quantum'
      } else {
        arrived.push(pid)
        admitUntil(end, true)
        cause = 'quantum'
      }
      previous = pid
      time = end
    }
  } else {
    let running: string | null = null
    let cause: Decision['cause'] = 'start'
    admitUntil(time, true)
    const total = byArrival.length
    while (finish.size - (specs.length - total) < total) {
      const pool = arrived.filter((id) => !finish.has(id))
      if (running === null) {
        if (!pool.length) {
          const idleUntil = byArrival[next].arrival
          decisions.push({ time, ready: [], chosen: null, cause: 'idle', previous: null })
          push(null, time, idleUntil, true)
          time = idleUntil
          admitUntil(time, true)
          cause = 'arrival'
          continue
        }
        running = pickBest(pool)
        decisions.push({ time, ready: snapshot(pool), chosen: running, cause, previous: null })
        if (!firstStart.has(running)) firstStart.set(running, time)
      }
      // Run until completion, or (preemptive) until the next arrival.
      const rem = remaining.get(running)!
      const nextArrival = next < byArrival.length ? byArrival[next].arrival : Infinity
      const end = isPreemptive(algorithm) ? Math.min(time + rem, nextArrival) : time + rem
      push(running, time, end, true)
      remaining.set(running, rem - (end - time))
      time = end
      admitUntil(time, true)
      if (remaining.get(running) === 0) {
        finish.set(running, time)
        cause = 'complete'
        running = null
        continue
      }
      // Preemptive check at an arrival.
      const pool2 = arrived.filter((id) => !finish.has(id))
      const best = pickBest(pool2)
      const strictlyBetter = best !== running && keyOf(best) < keyOf(running)
      if (strictlyBetter) {
        decisions.push({ time, ready: snapshot(pool2), chosen: best, cause: 'arrival', previous: running })
        running = best
        if (!firstStart.has(running)) firstStart.set(running, time)
      }
    }
  }

  function keyOf(id: string) {
    const spec = specs[order.get(id)!]
    return algorithm === 'priority' || algorithm === 'priority-p' ? (spec.priority ?? 0) : remaining.get(id)!
  }

  const results: ProcResult[] = specs.map((spec) => {
    const done = finish.get(spec.id) ?? spec.arrival
    const start = firstStart.get(spec.id) ?? spec.arrival
    const turnaround = done - spec.arrival
    return {
      ...spec,
      firstStart: start,
      finish: done,
      turnaround,
      waiting: turnaround - spec.burst,
      response: start - spec.arrival,
    }
  })
  const n = results.length || 1
  const busy = slices.filter((slice) => slice.pid !== null)
  let contextSwitches = 0
  for (let i = 1; i < busy.length; i += 1) if (busy[i].start === busy[i - 1].end) contextSwitches += 1
  return {
    algorithm,
    slices,
    decisions,
    results,
    avgWaiting: results.reduce((sum, r) => sum + r.waiting, 0) / n,
    avgTurnaround: results.reduce((sum, r) => sum + r.turnaround, 0) / n,
    avgResponse: results.reduce((sum, r) => sum + r.response, 0) / n,
    contextSwitches,
    makespan: slices.length ? slices[slices.length - 1].end : 0,
  }
}

/** Exponential averaging: τ(n+1) = α·t(n) + (1 − α)·τ(n). Returns τ0 … τ(len). */
export function predictBursts(actual: number[], alpha: number, tau0: number): number[] {
  const guesses = [tau0]
  for (const burst of actual) guesses.push(alpha * burst + (1 - alpha) * guesses[guesses.length - 1])
  return guesses
}

/** Round to two decimals and drop trailing zeros: 5.666 → "5.67", 7 → "7". */
export function fmt(value: number, digits = 2): string {
  return String(Math.round(value * 10 ** digits) / 10 ** digits)
}
