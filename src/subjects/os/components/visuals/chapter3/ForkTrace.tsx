import { useState } from 'react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { StepControls, VisualFrame } from '../VisualFrame'

const code = [
  'int main()',
  '{',
  '    pid_t pid;',
  '    pid = fork();',
  '    if (pid < 0) {          /* error */',
  '        fprintf(stderr, "Fork Failed");',
  '        return 1;',
  '    }',
  '    else if (pid == 0) {    /* child */',
  '        execlp("/bin/ls", "ls", NULL);',
  '    }',
  '    else {                  /* parent */',
  '        wait(NULL);',
  '        printf("Child Complete");',
  '    }',
  '    return 0;',
  '}',
]

type Lane = { line: number | null; state: string; pidVar: string; program: string }

interface Step {
  parent: Lane
  child: Lane | null
  output: string[]
  note: LText
}

const PARENT = 2600
const CHILD = 2601

const steps: Step[] = [
  {
    parent: { line: 2, state: 'running', pidVar: '?', program: 'a.out' },
    child: null,
    output: [],
    note: { en: `One process (pid ${PARENT}) starts main() and declares the variable pid.`, ar: `Process واحدة (pid ${PARENT}) بتبدأ main() وبتعرّف المتغيّر pid.` },
  },
  {
    parent: { line: 3, state: 'running', pidVar: '?', program: 'a.out' },
    child: null,
    output: [],
    note: { en: 'fork() asks the OS to create a new process — a **duplicate** of the parent (same code, same data, same position in the program).', ar: 'الـ fork() بتطلب من الـ OS يعمل process جديدة — **نسخة** من الأب (نفس الكود والداتا ونفس المكان في البرنامج).' },
  },
  {
    parent: { line: 11, state: 'running', pidVar: String(CHILD), program: 'a.out' },
    child: { line: 8, state: 'running', pidVar: '0', program: 'a.out (copy)' },
    output: [],
    note: { en: `fork() returns **twice**: ${CHILD} (the child’s pid) in the parent, so it takes the else branch; **0** in the child, so it takes the pid == 0 branch. Both now run concurrently.`, ar: `الـ fork() بترجّع **مرتين**: ${CHILD} (الـ pid بتاع الابن) في الأب، فبيدخل الـ else؛ و**0** في الابن، فبيدخل فرع pid == 0. والاتنين شغالين مع بعض دلوقتي.` },
  },
  {
    parent: { line: 12, state: 'waiting', pidVar: String(CHILD), program: 'a.out' },
    child: { line: 9, state: 'running', pidVar: '—', program: '/bin/ls' },
    output: [],
    note: { en: 'The parent calls **wait(NULL)** and blocks until the child finishes. The child calls **execlp()**: its memory space is **replaced with a new program**, ls — the rest of a.out is gone from the child.', ar: 'الأب بينادي **wait(NULL)** وبيقف لحد ما الابن يخلص. والابن بينادي **execlp()**: الـ memory space بتاعته **بتتبدّل ببرنامج جديد**، اللي هو ls — وباقي a.out مبقاش موجود في الابن.' },
  },
  {
    parent: { line: 12, state: 'waiting → ready', pidVar: String(CHILD), program: 'a.out' },
    child: { line: null, state: 'terminated', pidVar: '—', program: '/bin/ls' },
    output: ['chapter3.md  notes.txt  a.out'],
    note: { en: 'ls lists the directory and exits. The OS deallocates its resources and returns its **status to the parent via wait()**. The waiting event has completed, so the parent becomes ready.', ar: 'الـ ls بيعرض الـ directory ويخلص. الـ OS بيرجّع مواردها وبيرجّع **الـ status للأب عن طريق الـ wait()**. الحدث اللي الأب كان مستنيه خلص، فالأب بقى ready.' },
  },
  {
    parent: { line: 13, state: 'running', pidVar: String(CHILD), program: 'a.out' },
    child: null,
    output: ['chapter3.md  notes.txt  a.out', 'Child Complete'],
    note: { en: 'The parent resumes after wait() and prints “Child Complete”. It only ever runs after the child, because it waited.', ar: 'الأب بيكمّل بعد الـ wait() وبيطبع “Child Complete”. ودايمًا بيطبعها بعد الابن، لأنه استناه.' },
  },
  {
    parent: { line: 15, state: 'terminated', pidVar: String(CHILD), program: 'a.out' },
    child: null,
    output: ['chapter3.md  notes.txt  a.out', 'Child Complete'],
    note: { en: 'return 0 ends main(): the parent exits too. Summary — **fork()** created, **exec()** replaced, **wait()** synchronized, **exit** ended both.', ar: 'الـ return 0 بتنهي main(): والأب بيخلص هو كمان. الخلاصة — **fork()** عملت، و**exec()** بدّلت، و**wait()** نظّمت، و**exit** أنهت الاتنين.' },
  },
]

function LaneCard({ who, pid, lane, tone }: { who: string; pid: number; lane: Lane | null; tone: 'cyan' | 'amber' }) {
  const color = tone === 'cyan' ? 'border-cyan-neon/40 text-cyan-neon' : 'border-amber-neon/40 text-amber-neon'
  return (
    <div className={cn('rounded-xl border bg-ink-900/55 px-3.5 py-3 transition-opacity', lane ? color : 'border-line-soft text-mist-600 opacity-60')}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-[1rem] font-semibold">{who}</span>
        <span className="font-mono text-[0.7rem]">pid {pid}</span>
      </div>
      {lane ? (
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[0.74rem] text-mist-300">
          <dt className="text-mist-500">state</dt>
          <dd className="text-mist-100">{lane.state}</dd>
          <dt className="text-mist-500">program</dt>
          <dd className="text-mist-100">{lane.program}</dd>
          <dt className="text-mist-500">pid var</dt>
          <dd className="text-mist-100">{lane.pidVar}</dd>
        </dl>
      ) : (
        <p className="mt-2 font-mono text-[0.74rem]">{who === 'Child' ? 'not created yet / gone' : '—'}</p>
      )}
    </div>
  )
}

export function ForkTraceVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [step, setStep] = useState(0)
  const current = steps[step]

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Step through the program.' }}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <pre className="overflow-x-auto rounded-xl border border-line bg-ink-950/80 py-3 font-mono text-[0.76rem] leading-[1.7] text-mist-300">
          {code.map((line, index) => {
            const p = current.parent.line === index
            const c = current.child?.line === index
            return (
              <div
                key={index}
                className={cn(
                  'flex gap-2 px-3 transition-colors',
                  p && c && 'bg-violet-neon/15',
                  p && !c && 'bg-cyan-neon/12',
                  c && !p && 'bg-amber-neon/12',
                )}
              >
                <span className="w-9 flex-none text-right text-[0.68rem] text-mist-600">
                  {p ? <span className="text-cyan-neon">P</span> : null}
                  {c ? <span className="text-amber-neon">C</span> : null}
                  {!p && !c ? index + 1 : null}
                </span>
                <span className={cn('whitespace-pre', (p || c) && 'text-mist-50')}>{line}</span>
              </div>
            )
          })}
        </pre>
        <div className="flex flex-col gap-2.5">
          <LaneCard who="Parent" pid={PARENT} lane={current.parent} tone="cyan" />
          <LaneCard who="Child" pid={CHILD} lane={current.child} tone="amber" />
          <div className="rounded-xl border border-line-soft bg-ink-950/70 px-3.5 py-2.5">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-mist-500">Terminal</p>
            <pre className="mt-1 min-h-[2.6rem] font-mono text-[0.76rem] text-teal-neon">{current.output.join('\n') || ' '}</pre>
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        <BilingualProse text={current.note} className="text-[0.92rem]" />
      </div>
      <StepControls
        step={step}
        total={steps.length}
        onPrev={() => setStep((value) => Math.max(0, value - 1))}
        onNext={() => setStep((value) => Math.min(steps.length - 1, value + 1))}
        onReset={() => setStep(0)}
      />
    </VisualFrame>
  )
}
