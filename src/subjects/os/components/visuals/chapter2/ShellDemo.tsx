import { useState } from 'react'
import { Plus, RotateCcw, TerminalSquare } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

interface Command {
  line: string
  kind: 'program' | 'builtin'
  program?: string
  output: string[]
  what: LText
}

const PROMPT = 'PBG-Mac-Pro:~ pbg$'

const baseCommands: Command[] = [
  {
    line: 'w',
    kind: 'program',
    program: '/usr/bin/w',
    output: ['15:24  up 56 mins, 2 users, load averages: 1.51 1.53 1.65', 'USER   TTY    FROM   LOGIN@  IDLE WHAT', 'pbg    console -      14:34   50  -'],
    what: { en: 'Shows who is logged in and the system load.', ar: 'بيعرض مين عامل login وحِمل النظام.' },
  },
  {
    line: 'iostat 5',
    kind: 'program',
    program: '/usr/sbin/iostat',
    output: ['          disk0           disk1         cpu', '    KB/t tps  MB/s   KB/t tps MB/s  us sy id', '   33.75 343 11.30  64.31 14  0.88  11  5 84'],
    what: { en: 'Monitors disk and CPU statistics every 5 seconds.', ar: 'بيراقب إحصائيات الـ disk والـ CPU كل 5 ثواني.' },
  },
  {
    line: 'ls',
    kind: 'program',
    program: '/bin/ls',
    output: ['Applications  Desktop  Documents  Downloads  Library  Movies  Music  Pictures'],
    what: { en: 'Lists the files and directories here.', ar: 'بيعرض الـ files والـ directories اللي هنا.' },
  },
  {
    line: 'pwd',
    kind: 'builtin',
    output: ['/Users/pbg'],
    what: {
      en: 'Prints the working directory. Here the shell contains the code itself (a built-in) — the first of the lecture’s two options.',
      ar: 'بيطبع الـ directory الحالي. هنا الـ shell نفسه جواه الكود (built-in) — أول اختيار من الاختيارين في المحاضرة.',
    },
  },
  {
    line: 'ping 192.168.1.1',
    kind: 'program',
    program: '/sbin/ping',
    output: ['PING 192.168.1.1 (192.168.1.1): 56 data bytes', '64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=2.257 ms', '--- 192.168.1.1 ping statistics --- 1 packets transmitted, 1 received'],
    what: { en: 'Tests network connectivity.', ar: 'بيختبر الاتصال بالشبكة.' },
  },
]

const hello: Command = {
  line: 'hello',
  kind: 'program',
  program: '/usr/local/bin/hello',
  output: ['Hello from a brand-new command!'],
  what: {
    en: 'A new feature: you only installed a program named `hello`. The shell was not modified — it just found and ran the program.',
    ar: 'Feature جديدة: أنت بس سطّبت برنامج اسمه `hello`. الـ shell متعدّلش — هو بس لاقى البرنامج وشغّله.',
  },
}

export function ShellDemoVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [installed, setInstalled] = useState(false)
  const [history, setHistory] = useState<Command[]>([])
  const commands = installed ? [...baseCommands, hello] : baseCommands
  const last = history[history.length - 1]

  const run = (command: Command) => setHistory((entries) => [...entries.slice(-3), command])

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Click a command to run it.' }}>
      <div className="flex flex-wrap gap-1.5">
        {commands.map((command) => (
          <button
            key={command.line}
            type="button"
            onClick={() => run(command)}
            className="rounded-lg border border-line bg-ink-900/70 px-2.5 py-1 font-mono text-[0.78rem] text-mist-100 transition-colors hover:border-teal-neon/50"
          >
            {command.line}
          </button>
        ))}
        <button
          type="button"
          onClick={() => run({ line: 'frobnicate', kind: 'program', output: ['-bash: frobnicate: command not found'], what: { en: 'No program with that name exists, so the shell has nothing to run.', ar: 'مفيش برنامج بالاسم ده، فالـ shell مالقاش حاجة يشغّلها.' } })}
          className="rounded-lg border border-dashed border-line bg-ink-900/40 px-2.5 py-1 font-mono text-[0.78rem] text-mist-400 hover:text-mist-100"
        >
          frobnicate
        </button>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-line bg-[#0b0f0d]" dir="ltr">
        <div className="flex items-center gap-1.5 border-b border-line-soft bg-ink-800/80 px-3 py-1.5">
          <TerminalSquare className="h-3.5 w-3.5 text-mist-400" aria-hidden="true" />
          <span className="font-mono text-[0.66rem] text-mist-400">Terminal — Bourne shell (illustrative output)</span>
        </div>
        <pre className="min-h-[9rem] overflow-x-auto p-3 font-mono text-[0.74rem] leading-relaxed text-[#cfe8d6]">
          {history.length === 0 ? <span className="text-mist-500">{PROMPT} </span> : null}
          {history.map((command, index) => (
            <span key={index} className="block">
              <span className="text-teal-neon">{PROMPT}</span> {command.line}
              {'\n'}
              {command.output.join('\n')}
            </span>
          ))}
          {history.length > 0 ? <span className="text-teal-neon">{PROMPT} </span> : null}
        </pre>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <ol className="space-y-1.5 rounded-xl border border-line-soft bg-ink-950/50 p-3 text-[0.82rem]" aria-label="What the shell did">
          {(last
            ? [
                `obtain the command: “${last.line}”`,
                last.kind === 'builtin'
                  ? 'it is a built-in: the shell has the code itself'
                  : last.program
                    ? `find a program named “${last.line.split(' ')[0]}” → ${last.program}`
                    : `find a program named “${last.line}” → none`,
                last.program || last.kind === 'builtin' ? 'execute it and show the output' : 'report “command not found”',
                'print the prompt and wait for the next command',
              ]
            : ['obtain a command', 'find its code or program', 'execute it', 'prompt again']
          ).map((step, index) => (
            <li key={step} className={cn('flex gap-2', !last && 'text-mist-500')}>
              <span className="font-mono text-[0.7rem] text-teal-neon">{index + 1}</span>
              <span className="text-mist-200">{step}</span>
            </li>
          ))}
        </ol>
        <div className="space-y-2">
          <div className="rounded-xl border border-teal-neon/20 bg-teal-neon/[0.04] p-3" aria-live="polite">
            <BilingualProse
              text={last?.what ?? { en: 'The command interpreter primarily obtains a command from the user and executes it.', ar: 'الـ command interpreter وظيفته الأساسية ياخد command من المستخدم وينفّذها.' }}
              className="text-[0.88rem]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setInstalled(true)} disabled={installed}>
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              {installed ? 'hello installed' : 'Install a program named hello'}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setHistory([])
                setInstalled(false)
              }}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
            </button>
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}
