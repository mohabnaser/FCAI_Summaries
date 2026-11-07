import { useState } from 'react'
import { Plus, RotateCcw, Zap } from 'lucide-react'
import type { LText } from '../../types'
import { BilingualProse } from '../ui/Text'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

interface Request {
  lines: string[]
}

interface Device {
  name: string
  queue: Request[]
}

/** Initial state reproduced from slide 22. */
const initialDevices: Device[] = [
  { name: 'card reader 1', queue: [] },
  { name: 'line printer 3', queue: [{ lines: ['request for line printer', 'address: 38546', 'length: 1372'] }] },
  { name: 'disk unit 1', queue: [] },
  { name: 'disk unit 2', queue: [] },
  {
    name: 'disk unit 3',
    queue: [
      { lines: ['request for disk unit 3', 'file: xxx', 'operation: read', 'address: 43046', 'length: 20000'] },
      { lines: ['request for disk unit 3', 'file: yyy', 'operation: write', 'address: 03458', 'length: 500'] },
    ],
  },
]

const clone = (devices: Device[]) => devices.map((device) => ({ ...device, queue: [...device.queue] }))

export function DeviceStatusVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [devices, setDevices] = useState<Device[]>(() => clone(initialDevices))
  const [selected, setSelected] = useState(4)
  const [counter, setCounter] = useState(1)
  const [message, setMessage] = useState<LText>({
    en: 'Each entry records a device’s **type, address and state**. Busy devices point to their queue of outstanding requests.',
    ar: 'كل entry بتسجل **نوع الجهاز وعنوانه وحالته**. والأجهزة الـ busy بتشاور على queue الطلبات اللي مستنية.',
  })
  const device = devices[selected]

  const addRequest = () => {
    const next = clone(devices)
    next[selected].queue.push({
      lines: [`request for ${device.name}`, `request #${counter}`, 'issued by a user process via a system call'],
    })
    setDevices(next)
    setCounter((value) => value + 1)
    setMessage({
      en: `A process asked for I/O on **${device.name}**. The OS **indexes into the table** and adds the request to that entry. ${
        device.queue.length === 0 ? 'The device was idle, so it starts now and becomes busy.' : 'The device is already busy, so the request waits in its queue.'
      } Control can return to the user program without waiting (asynchronous I/O).`,
      ar: `Process طلبت I/O على **${device.name}**. الـ OS **بيدخل على الجدول** ويضيف الطلب للـ entry بتاعته. ${
        device.queue.length === 0 ? 'الجهاز كان idle فبيبدأ دلوقتي ويبقى busy.' : 'الجهاز busy أصلًا فالطلب بيستنى في الـ queue.'
      } والتحكم ممكن يرجع للبرنامج من غير ما يستنى (asynchronous I/O).`,
    })
  }

  const complete = () => {
    if (device.queue.length === 0) return
    const next = clone(devices)
    next[selected].queue.shift()
    setDevices(next)
    const nowIdle = next[selected].queue.length === 0
    setMessage({
      en: `**${device.name}** finished and raised an **interrupt**. The OS finds the entry, removes the completed request${
        nowIdle ? ' and marks the device **idle**.' : ', and starts the next queued request — the device stays **busy**.'
      }`,
      ar: `**${device.name}** خلّص وعمل **interrupt**. الـ OS بيلاقي الـ entry ويشيل الطلب اللي خلص${
        nowIdle ? ' ويعلّم الجهاز **idle**.' : '، ويبدأ الطلب اللي بعده — والجهاز يفضل **busy**.'
      }`,
    })
  }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Select a device, then queue or complete requests.' }}>
      <div className="grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="grid grid-cols-[1fr_auto] bg-ink-800/80 px-3 py-2 font-mono text-[0.64rem] uppercase tracking-wider text-mist-300">
            <span>device</span>
            <span>status</span>
          </div>
          <ul>
            {devices.map((entry, index) => {
              const busy = entry.queue.length > 0
              return (
                <li key={entry.name} className="border-t border-line-soft/70">
                  <button
                    type="button"
                    onClick={() => setSelected(index)}
                    aria-pressed={selected === index}
                    className={cn(
                      'grid w-full grid-cols-[1fr_auto] items-center gap-2 px-3 py-2.5 text-left transition-colors',
                      selected === index ? 'bg-cyan-neon/[0.08]' : 'hover:bg-ink-800/50',
                    )}
                  >
                    <span className="text-[0.88rem] text-mist-100">
                      device: {entry.name}
                      {entry.queue.length > 1 ? (
                        <span className="ms-2 font-mono text-[0.66rem] text-mist-500">({entry.queue.length} queued)</span>
                      ) : null}
                    </span>
                    <span
                      className={cn(
                        'rounded-md px-2 py-0.5 font-mono text-[0.68rem] font-semibold',
                        busy ? 'bg-amber-neon/15 text-amber-neon' : 'bg-teal-neon/15 text-teal-neon',
                      )}
                    >
                      {busy ? 'busy' : 'idle'}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-line-soft bg-ink-950/50 p-3.5">
            <p className="font-mono text-[0.64rem] uppercase tracking-wider text-mist-500">
              Request queue → {device.name}
            </p>
            {device.queue.length === 0 ? (
              <p className="mt-2 text-[0.85rem] text-mist-500">No outstanding requests — the device is idle.</p>
            ) : (
              <ol className="mt-2 flex flex-wrap items-start gap-2">
                {device.queue.map((request, index) => (
                  <li
                    key={index}
                    className={cn(
                      'min-w-[9.5rem] rounded-lg border px-3 py-2 font-mono text-[0.7rem] leading-relaxed',
                      index === 0 ? 'border-amber-neon/45 bg-amber-neon/[0.06] text-mist-100' : 'border-line bg-ink-900/60 text-mist-300',
                    )}
                  >
                    <span className="mb-1 block text-[0.58rem] uppercase tracking-wider text-mist-500">
                      {index === 0 ? 'in progress' : `waiting #${index}`}
                    </span>
                    {request.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={addRequest}>
              <Plus className="h-3.5 w-3.5" aria-hidden="true" /> New I/O request
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={complete}
              disabled={device.queue.length === 0}
            >
              <Zap className="h-3.5 w-3.5" aria-hidden="true" /> Device finishes (interrupt)
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setDevices(clone(initialDevices))
                setCounter(1)
              }}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
            </button>
          </div>

          <div className="rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
            <BilingualProse text={message} className="text-[0.92rem]" />
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}
