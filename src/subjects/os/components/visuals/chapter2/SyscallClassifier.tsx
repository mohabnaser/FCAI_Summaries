import { useMemo, useState } from 'react'
import { Check, RotateCcw, SkipForward, X } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

type Category = 'process' | 'file' | 'device' | 'info' | 'comms' | 'protection'

const categories: Array<{ id: Category; label: string; tone: string }> = [
  { id: 'process', label: 'Process control', tone: 'border-cyan-neon/45 text-cyan-neon' },
  { id: 'file', label: 'File manipulation', tone: 'border-teal-neon/45 text-teal-neon' },
  { id: 'device', label: 'Device manipulation', tone: 'border-violet-neon/45 text-violet-neon' },
  { id: 'info', label: 'Information maintenance', tone: 'border-amber-neon/45 text-amber-neon' },
  { id: 'comms', label: 'Communication', tone: 'border-rose-neon/45 text-rose-neon' },
  { id: 'protection', label: 'Protection', tone: 'border-lime-neon/45 text-lime-neon' },
]

/** Slide 24, row by row: the Windows and UNIX columns line up position by position. */
const table: Array<{ category: Category; windows: string[]; unix: string[] }> = [
  { category: 'process', windows: ['CreateProcess()', 'ExitProcess()', 'WaitForSingleObject()'], unix: ['fork()', 'exit()', 'wait()'] },
  { category: 'file', windows: ['CreateFile()', 'ReadFile()', 'WriteFile()', 'CloseHandle()'], unix: ['open()', 'read()', 'write()', 'close()'] },
  { category: 'device', windows: ['SetConsoleMode()', 'ReadConsole()', 'WriteConsole()'], unix: ['ioctl()', 'read()', 'write()'] },
  { category: 'info', windows: ['GetCurrentProcessID()', 'SetTimer()', 'Sleep()'], unix: ['getpid()', 'alarm()', 'sleep()'] },
  { category: 'comms', windows: ['CreatePipe()', 'CreateFileMapping()', 'MapViewOfFile()'], unix: ['pipe()', 'shmget()', 'mmap()'] },
  { category: 'protection', windows: ['SetFileSecurity()', 'InitializeSecurityDescriptor()', 'SetSecurityDescriptorGroup()'], unix: ['chmod()', 'umask()', 'chown()'] },
]

interface Card {
  name: string
  os: 'Windows' | 'UNIX'
  accepted: Category[]
  partner: string
}

function buildDeck(): Card[] {
  const cards = new Map<string, Card>()
  for (const row of table) {
    row.windows.forEach((name, index) => {
      cards.set(`W:${name}`, { name, os: 'Windows', accepted: [row.category], partner: row.unix[index] })
    })
    row.unix.forEach((name, index) => {
      const key = `U:${name}`
      const existing = cards.get(key)
      // UNIX read()/write() appear in both the file and the device rows.
      if (existing) existing.accepted.push(row.category)
      else cards.set(key, { name, os: 'UNIX', accepted: [row.category], partner: row.windows[index] })
    })
  }
  // Deterministic interleave so the deck alternates OS and category.
  const list = [...cards.values()]
  return list.map((card, index) => ({ card, key: (index * 7) % list.length })).sort((a, b) => a.key - b.key).map((entry) => entry.card)
}

export function SyscallClassifierVisual({ title, hint }: { title: LText; hint?: LText }) {
  const deck = useMemo(buildDeck, [])
  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState<Category | null>(null)
  const [score, setScore] = useState({ right: 0, answered: 0 })
  const card = deck[index % deck.length]
  const correct = choice ? card.accepted.includes(choice) : null
  const label = (id: Category) => categories.find((entry) => entry.id === id)?.label ?? id

  const answer = (id: Category) => {
    if (choice) return
    setChoice(id)
    setScore((value) => ({ right: value.right + (card.accepted.includes(id) ? 1 : 0), answered: value.answered + 1 }))
  }

  const next = () => {
    setChoice(null)
    setIndex((value) => value + 1)
  }

  const feedback: LText | null = choice
    ? {
        en: `${correct ? 'Correct.' : `Not quite — it is ${card.accepted.map(label).join(' / ')}.`} **${card.name}** (${card.os}) ↔ **${card.partner}** (${card.os === 'UNIX' ? 'Windows' : 'UNIX'}).${
          card.accepted.length > 1 ? ' UNIX uses read() and write() for both files and devices.' : ''
        }`,
        ar: `${correct ? 'صح.' : `مش بالظبط — دي ${card.accepted.map(label).join(' / ')}.`} **${card.name}** (${card.os}) ↔ **${card.partner}** (${card.os === 'UNIX' ? 'Windows' : 'UNIX'}).${
          card.accepted.length > 1 ? ' UNIX بيستخدم read() وwrite() للـ files والأجهزة الاتنين.' : ''
        }`,
      }
    : null

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Choose the family for each call.' }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="badge">
          card {(index % deck.length) + 1} / {deck.length}
        </span>
        <span className="badge badge-teal">
          {score.right}/{score.answered} correct
        </span>
      </div>

      <div className="mt-4 flex flex-col items-center gap-1 rounded-2xl border border-line bg-ink-950/60 px-4 py-6 text-center">
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-mist-500">{card.os} system call</span>
        <span className="font-mono text-[1.5rem] font-bold text-mist-50 sm:text-[1.8rem]">{card.name}</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3" role="group" aria-label="Categories">
        {categories.map((category) => {
          const isAnswer = choice !== null && card.accepted.includes(category.id)
          const isWrongPick = choice === category.id && !card.accepted.includes(category.id)
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => answer(category.id)}
              disabled={choice !== null}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-xl border bg-ink-900/55 px-2 py-2.5 text-[0.82rem] font-semibold transition-colors disabled:cursor-default',
                category.tone,
                isAnswer && 'bg-teal-neon/15 ring-2 ring-teal-neon/50',
                isWrongPick && 'bg-rose-neon/15 ring-2 ring-rose-neon/50',
                choice !== null && !isAnswer && !isWrongPick && 'opacity-50',
              )}
            >
              {isAnswer ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              {isWrongPick ? <X className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              {category.label}
            </button>
          )
        })}
      </div>

      <div className="mt-3 min-h-[3.5rem] rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        {feedback ? (
          <BilingualProse text={feedback} className="text-[0.92rem]" />
        ) : (
          <p className="text-[0.88rem] text-mist-400">Which of the six families does this call belong to?</p>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary btn-sm" onClick={next}>
          <SkipForward className="h-3.5 w-3.5" aria-hidden="true" />
          {choice ? 'Next call' : 'Skip'}
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setIndex(0)
            setChoice(null)
            setScore({ right: 0, answered: 0 })
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Restart
        </button>
      </div>
    </VisualFrame>
  )
}
