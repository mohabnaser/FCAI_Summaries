import { useState } from 'react'
import { RotateCcw, Send } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { StepControls, VisualFrame } from '../VisualFrame'

type Tab = 'simple' | 'unix' | 'layered' | 'microkernel' | 'modules' | 'macos' | 'mobile'

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'simple', label: 'Simple · MS-DOS' },
  { id: 'unix', label: 'UNIX' },
  { id: 'layered', label: 'Layered' },
  { id: 'microkernel', label: 'Microkernel' },
  { id: 'modules', label: 'Modules · Solaris' },
  { id: 'macos', label: 'Hybrid · Mac OS X' },
  { id: 'mobile', label: 'iOS & Android' },
]

const band = 'rounded-lg border px-3 py-2 text-center font-display text-[0.86rem] font-semibold text-mist-50'

// ── Simple ───────────────────────────────────────────────
function SimpleTab() {
  const [bypass, setBypass] = useState(false)
  const layers = ['application program', 'resident system program', 'MS-DOS device drivers', 'ROM BIOS device drivers']
  return (
    <div className="space-y-3">
      <div className="relative space-y-1.5">
        {layers.map((layer, index) => (
          <div
            key={layer}
            className={cn(
              band,
              'border-line bg-ink-900/60',
              bypass && (index === 0 || index === 3) && 'border-rose-neon/60 bg-rose-neon/[0.1]',
              bypass && (index === 1 || index === 2) && 'opacity-40',
            )}
          >
            {layer}
          </div>
        ))}
        {bypass ? (
          <span className="absolute -right-1 top-4 bottom-4 w-1 rounded-full bg-rose-neon" aria-hidden="true" />
        ) : null}
      </div>
      <button type="button" className={cn('btn btn-sm', bypass ? 'btn-primary' : 'btn-secondary')} onClick={() => setBypass((v) => !v)} aria-pressed={bypass}>
        {bypass ? 'Show the normal layers' : 'Let the application call the ROM BIOS directly'}
      </button>
      <BilingualProse
        text={
          bypass
            ? {
                en: 'Nothing stops it: MS-DOS’s **interfaces and levels of functionality are not well separated**, so an application can reach the hardware drivers directly — and one bad program can bring the system down (textbook detail).',
                ar: 'مفيش حاجة تمنعه: الـ **interfaces ومستويات الوظايف في MS-DOS مش مفصولة كويس**، فالـ application ممكن توصل للـ drivers مباشرة — وبرنامج واحد غلط ممكن يوقع النظام كله (تفصيلة من الكتاب).',
              }
            : {
                en: 'Written to provide **the most functionality in the least space**; not divided into modules.',
                ar: 'اتكتب عشان يدّي **أكبر قدر من الوظايف في أقل مساحة**؛ ومش متقسم لـ modules.',
              }
        }
        className="text-[0.9rem]"
      />
    </div>
  )
}

// ── UNIX ────────────────────────────────────────────────
function UnixTab() {
  return (
    <div className="space-y-1.5">
      <div className={cn(band, 'border-amber-neon/40 bg-amber-neon/[0.07]')}>(the users)</div>
      <div className={cn(band, 'border-violet-neon/40 bg-violet-neon/[0.07]')}>shells and commands · compilers and interpreters · system libraries</div>
      <div className="rounded-md bg-ink-800 py-1 text-center font-mono text-[0.66rem] uppercase tracking-wider text-mist-300">system-call interface to the kernel</div>
      <div className="rounded-lg border border-cyan-neon/45 bg-cyan-neon/[0.08] p-2">
        <p className="mb-1.5 text-center font-mono text-[0.62rem] uppercase tracking-wider text-cyan-neon">kernel — one big level</p>
        <div className="grid gap-1.5 sm:grid-cols-3">
          {[
            ['signals terminal handling', 'character I/O system', 'terminal drivers'],
            ['file system', 'swapping block I/O system', 'disk and tape drivers'],
            ['CPU scheduling', 'page replacement', 'demand paging', 'virtual memory'],
          ].map((group) => (
            <div key={group[0]} className="space-y-1 rounded-md border border-line bg-ink-900/60 p-1.5">
              {group.map((item) => (
                <p key={item} className="text-center text-[0.72rem] text-mist-200">{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-md bg-ink-800 py-1 text-center font-mono text-[0.66rem] uppercase tracking-wider text-mist-300">kernel interface to the hardware</div>
      <div className="grid gap-1.5 sm:grid-cols-3">
        {['terminal controllers · terminals', 'device controllers · disks and tapes', 'memory controllers · physical memory'].map((item) => (
          <div key={item} className={cn(band, 'border-rose-neon/35 bg-rose-neon/[0.06] text-[0.76rem]')}>{item}</div>
        ))}
      </div>
      <p className="pt-1 text-center text-[0.82rem] font-semibold text-rose-neon">“Beyond simple but not fully layered”</p>
    </div>
  )
}

// ── Layered ─────────────────────────────────────────────
function LayeredTab() {
  const labels = ['layer 0 — hardware', 'layer 1', 'layer 2', 'layer N — user interface']
  const [from, setFrom] = useState(3)
  const [to, setTo] = useState(0)
  const allowed = to < from
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="mx-auto flex aspect-square w-full max-w-[17rem] items-center justify-center rounded-full border border-amber-neon/40 bg-amber-neon/[0.05] p-[9%]">
        <div className="flex h-full w-full items-center justify-center rounded-full border border-violet-neon/40 bg-violet-neon/[0.06] p-[12%]">
          <div className="flex h-full w-full items-center justify-center rounded-full border border-cyan-neon/40 bg-cyan-neon/[0.07] p-[16%]">
            <div className="flex h-full w-full items-center justify-center rounded-full border border-rose-neon/50 bg-rose-neon/[0.1] text-center font-mono text-[0.62rem] leading-tight text-mist-100">
              layer 0<br />hardware
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-[0.84rem] text-mist-300">Can a layer use another layer? Pick two.</p>
        {(['from', 'to'] as const).map((role) => (
          <div key={role}>
            <p className="font-mono text-[0.62rem] uppercase tracking-wider text-mist-500">{role === 'from' ? 'caller' : 'wants to use'}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {labels.map((label, index) => {
                const active = (role === 'from' ? from : to) === index
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => (role === 'from' ? setFrom(index) : setTo(index))}
                    aria-pressed={active}
                    className={cn(
                      'rounded-md border px-2 py-1 text-[0.74rem]',
                      active ? 'border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon' : 'border-line-soft bg-ink-900/50 text-mist-400 hover:text-mist-100',
                    )}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        <div className={cn('rounded-lg border p-2.5 text-[0.84rem]', allowed ? 'border-teal-neon/40 bg-teal-neon/[0.06] text-teal-neon' : 'border-rose-neon/40 bg-rose-neon/[0.06] text-rose-neon')} aria-live="polite">
          {from === to
            ? 'Same layer — pick a different one.'
            : allowed
              ? `Allowed: ${labels[from]} may use the lower ${labels[to]}.`
              : `Not allowed: a layer uses only lower-level layers, and ${labels[to]} is above ${labels[from]}.`}
        </div>
      </div>
    </div>
  )
}

// ── Microkernel ─────────────────────────────────────────
const microSteps: Array<{ active: string[]; text: LText }> = [
  { active: ['app'], text: { en: 'The application wants to read a file. The file system is a **user-mode** module, not part of the kernel.', ar: 'الـ application عايزة تقرا file. والـ file system هنا **module في user mode**، مش جزء من الـ kernel.' } },
  { active: ['app', 'ipc'], text: { en: 'Message 1: application → microkernel **interprocess communication**.', ar: 'رسالة 1: الـ application ← الـ **interprocess communication** في الـ microkernel.' } },
  { active: ['ipc', 'fs'], text: { en: 'Message 2: microkernel → file-system module.', ar: 'رسالة 2: الـ microkernel ← الـ file-system module.' } },
  { active: ['fs', 'ipc', 'dd'], text: { en: 'Messages 3–4: the file system asks the device driver — again through the microkernel.', ar: 'رسايل 3–4: الـ file system بيطلب من الـ device driver — برضه عن طريق الـ microkernel.' } },
  { active: ['dd', 'hw'], text: { en: 'The driver talks to the hardware; the data then travels back the same way.', ar: 'الـ driver بيكلّم الـ hardware؛ وبعدين الداتا بترجع بنفس الطريق.' } },
  { active: ['app', 'ipc', 'fs', 'dd'], text: { en: 'Many messages and user↔kernel crossings for one read: that is the **performance overhead** the lecture lists as the detriment — paid for extensibility, portability, reliability and security.', ar: 'رسايل كتير وعبور كتير بين user وkernel عشان قراية واحدة: ده الـ **performance overhead** اللي المحاضرة بتقول إنه العيب — تمن الـ extensibility والـ portability والـ reliability والـ security.' } },
]

function MicrokernelTab() {
  const [step, setStep] = useState(0)
  const current = microSteps[step]
  const node = (id: string, label: string, tone: string) => (
    <div className={cn('viz-node px-2 py-2 text-center text-[0.8rem] font-semibold text-mist-50', tone)} data-active={current.active.includes(id)} data-dim={!current.active.includes(id)}>
      {label}
    </div>
  )
  const messages = [0, 1, 2, 4, 4, 8][step]
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-amber-neon/30 bg-amber-neon/[0.04] p-2">
        <p className="mb-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-amber-neon">user mode</p>
        <div className="grid grid-cols-3 gap-2">
          {node('app', 'Application Program', '')}
          {node('fs', 'File System', '')}
          {node('dd', 'Device Driver', '')}
        </div>
      </div>
      <p className="text-center font-mono text-[0.68rem] text-violet-neon">⇅ messages ⇅</p>
      <div className="rounded-xl border border-cyan-neon/30 bg-cyan-neon/[0.05] p-2">
        <p className="mb-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-cyan-neon">kernel mode — microkernel</p>
        <div className="grid grid-cols-3 gap-2">
          {node('ipc', 'Interprocess Communication', '')}
          <div className="viz-node px-2 py-2 text-center text-[0.8rem] text-mist-200" data-dim="true">memory management</div>
          <div className="viz-node px-2 py-2 text-center text-[0.8rem] text-mist-200" data-dim="true">CPU scheduling</div>
        </div>
      </div>
      {node('hw', 'hardware', '')}
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge badge-violet"><Send className="h-3 w-3" aria-hidden="true" /> {messages} messages</span>
        <span className="badge badge-amber">{messages} user↔kernel crossings</span>
      </div>
      <BilingualProse text={current.text} className="text-[0.9rem]" />
      <StepControls step={step} total={microSteps.length} onPrev={() => setStep((v) => Math.max(0, v - 1))} onNext={() => setStep((v) => Math.min(microSteps.length - 1, v + 1))} onReset={() => setStep(0)} />
    </div>
  )
}

// ── Modules ─────────────────────────────────────────────
const solarisModules = ['scheduling classes', 'file systems', 'loadable system calls', 'executable formats', 'STREAMS modules', 'miscellaneous modules', 'device and bus drivers']

function ModulesTab() {
  const [loaded, setLoaded] = useState<string[]>(['scheduling classes', 'file systems', 'device and bus drivers'])
  const toggle = (name: string) => setLoaded((list) => (list.includes(name) ? list.filter((entry) => entry !== name) : [...list, name]))
  return (
    <div className="space-y-3">
      <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
        <div className="absolute left-1/2 top-1/2 z-10 flex h-[30%] w-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-neon/60 bg-amber-neon/[0.12] text-center font-display text-[0.78rem] font-semibold text-mist-50">
          core Solaris kernel
        </div>
        {solarisModules.map((name, index) => {
          const angle = (index / solarisModules.length) * Math.PI * 2 - Math.PI / 2
          const x = 50 + Math.cos(angle) * 38
          const y = 50 + Math.sin(angle) * 38
          const on = loaded.includes(name)
          return (
            <button
              key={name}
              type="button"
              onClick={() => toggle(name)}
              aria-pressed={on}
              className={cn(
                'absolute w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border px-1.5 py-1.5 text-center text-[0.66rem] font-semibold leading-tight transition-colors sm:text-[0.72rem]',
                on ? 'border-teal-neon/60 bg-teal-neon/15 text-teal-50' : 'border-dashed border-line bg-ink-900/60 text-mist-500',
              )}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {name}
            </button>
          )
        })}
      </div>
      <p className="text-center text-[0.82rem] text-mist-300">
        {loaded.length} of {solarisModules.length} modules loaded — click to load or unload one.
      </p>
      <BilingualProse
        text={{
          en: 'Each core component is separate, talks to the others over **known interfaces**, and is **loadable as needed within the kernel**. Every module connects straight to the core — like layers, but more flexible.',
          ar: 'كل component أساسي منفصل، وبيتكلم مع التانيين عن طريق **interfaces معروفة**، و**بيتحمّل وقت الحاجة جوه الـ kernel**. وكل module متوصلة بالـ core مباشرة — زي الـ layers بس أمرن.',
        }}
        className="text-[0.9rem]"
      />
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setLoaded([])}>
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Unload all
      </button>
    </div>
  )
}

// ── Mac OS X ────────────────────────────────────────────
function MacTab() {
  return (
    <div className="space-y-1.5">
      <div className={cn(band, 'border-amber-neon/40 bg-amber-neon/[0.07]')}>graphical user interface · <span className="text-amber-neon">Aqua</span></div>
      <div className="rounded-lg border border-violet-neon/40 bg-violet-neon/[0.07] p-2">
        <p className="mb-1.5 text-center font-mono text-[0.6rem] uppercase tracking-wider text-violet-neon">application environments and services</p>
        <div className="grid grid-cols-4 gap-1.5">
          {['Java', 'Cocoa', 'Quicktime', 'BSD'].map((item) => (
            <span key={item} className="rounded-full border border-line bg-ink-900/60 py-1 text-center text-[0.78rem] text-mist-100">{item}</span>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-cyan-neon/40 bg-cyan-neon/[0.07] p-2">
        <p className="mb-1.5 text-center font-mono text-[0.6rem] uppercase tracking-wider text-cyan-neon">kernel environment</p>
        <div className="grid grid-cols-2 gap-1.5">
          <span className="rounded-md border border-line bg-ink-900/60 py-1.5 text-center text-[0.8rem] text-mist-100">Mach</span>
          <span className="rounded-md border border-line bg-ink-900/60 py-1.5 text-center text-[0.8rem] text-mist-100">BSD</span>
          <span className="rounded-md border border-line bg-ink-900/60 py-1.5 text-center text-[0.8rem] text-mist-100">I/O kit</span>
          <span className="rounded-md border border-line bg-ink-900/60 py-1.5 text-center text-[0.8rem] text-mist-100">kernel extensions</span>
        </div>
      </div>
      <BilingualProse
        text={{
          en: '**Hybrid and layered**: a Mach microkernel and BSD UNIX parts together in one kernel environment, plus the I/O kit and dynamically loadable **kernel extensions**.',
          ar: '**Hybrid وlayered**: Mach microkernel وأجزاء من BSD UNIX مع بعض في kernel environment واحدة، ومعاهم الـ I/O kit والـ **kernel extensions** اللي بتتحمّل وقت التشغيل.',
        }}
        className="pt-1 text-[0.9rem]"
      />
    </div>
  )
}

// ── Mobile ──────────────────────────────────────────────
function MobileTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-1.5">
        <p className="font-display text-[0.95rem] font-semibold text-mist-50">iOS</p>
        {['Cocoa Touch', 'Media Services', 'Core Services', 'Core OS'].map((layer, index) => (
          <div key={layer} className={cn(band, ['border-amber-neon/40 bg-amber-neon/[0.07]', 'border-violet-neon/40 bg-violet-neon/[0.07]', 'border-teal-neon/40 bg-teal-neon/[0.07]', 'border-cyan-neon/40 bg-cyan-neon/[0.07]'][index])}>
            {layer}
          </div>
        ))}
        <p className="text-[0.78rem] text-mist-400">Objective-C apps · media: graphics, audio, video · core services: cloud, databases · Core OS on the Mac OS X kernel</p>
      </div>
      <div className="space-y-1.5">
        <p className="font-display text-[0.95rem] font-semibold text-mist-50">Android</p>
        <div className={cn(band, 'border-amber-neon/40 bg-amber-neon/[0.07]')}>Application Framework</div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-lg border border-violet-neon/40 bg-violet-neon/[0.07] p-1.5">
            <p className="text-center font-mono text-[0.6rem] uppercase text-violet-neon">Libraries</p>
            <div className="mt-1 flex flex-wrap justify-center gap-1">
              {['SQLite', 'openGL', 'surface manager', 'media framework', 'webkit', 'libc'].map((lib) => (
                <span key={lib} className="vb-chip !text-[0.6rem]">{lib}</span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-teal-neon/40 bg-teal-neon/[0.07] p-1.5">
            <p className="text-center font-mono text-[0.6rem] uppercase text-teal-neon">Android runtime</p>
            <div className="mt-1 space-y-1">
              <span className="block rounded bg-ink-900/60 py-0.5 text-center text-[0.68rem] text-mist-100">Core Libraries</span>
              <span className="block rounded bg-ink-900/60 py-1.5 text-center text-[0.7rem] text-mist-100">Dalvik virtual machine</span>
            </div>
          </div>
        </div>
        <div className={cn(band, 'border-cyan-neon/40 bg-cyan-neon/[0.07]')}>Linux kernel (modified, + power management)</div>
        <p className="text-[0.78rem] text-mist-400">Java + Android API → bytecode → translated to run in the Dalvik VM</p>
      </div>
    </div>
  )
}

const panels: Record<Tab, () => React.ReactElement> = {
  simple: SimpleTab,
  unix: UnixTab,
  layered: LayeredTab,
  microkernel: MicrokernelTab,
  modules: ModulesTab,
  macos: MacTab,
  mobile: MobileTab,
}

export function OsStructureExplorerVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [tab, setTab] = useState<Tab>('layered')
  const Panel = panels[tab]
  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Pick a structure; each tab has something to try.' }}>
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Operating-system structure">
        {tabs.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={tab === entry.id}
            onClick={() => setTab(entry.id)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-[0.8rem] font-semibold transition-colors',
              tab === entry.id ? 'border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon' : 'border-line-soft bg-ink-900/50 text-mist-400 hover:text-mist-100',
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-line-soft bg-ink-950/50 p-3 sm:p-4">
        <Panel key={tab} />
      </div>
    </VisualFrame>
  )
}
