import { useState } from 'react'
import { Cpu, HardDrive, Keyboard, MemoryStick, Monitor, Mouse, Printer, Zap } from 'lucide-react'
import type { LText } from '../../types'
import { BilingualProse } from '../ui/Text'
import { cn } from '../../lib/cn'
import { StepControls, VisualFrame } from './VisualFrame'

type NodeId = 'cpu' | 'memory' | 'bus' | 'disk' | 'usb' | 'gfx' | 'disks' | 'usbdev' | 'monitor'

interface Step {
  title: string
  active: NodeId[]
  cpu: string
  buffer: 'empty' | 'filling' | 'full'
  interrupt?: boolean
  text: LText
}

const steps: Step[] = [
  {
    title: 'One shared bus',
    active: ['cpu', 'memory', 'bus', 'disk', 'usb', 'gfx'],
    cpu: 'running a user process',
    buffer: 'empty',
    text: {
      en: 'One or more CPUs and the device controllers connect through a **common bus** that gives access to **shared memory**. They can execute **in parallel**, competing for memory cycles.',
      ar: 'الـ CPU (أو أكتر) والـ device controllers متوصلين بـ **common bus** بيوصلهم لـ **shared memory**. وبيشتغلوا **بالتوازي** وبيتنافسوا على memory cycles.',
    },
  },
  {
    title: 'CPU starts an I/O',
    active: ['cpu', 'bus', 'disk'],
    cpu: 'loads controller registers',
    buffer: 'empty',
    text: {
      en: 'Each device controller is **in charge of one device type**. To read from disk, the CPU (through the driver) tells the **disk controller** what to do.',
      ar: 'كل device controller **مسؤول عن نوع جهاز واحد**. عشان يقرا من الـ disk، الـ CPU (عن طريق الـ driver) بيقول للـ **disk controller** يعمل إيه.',
    },
  },
  {
    title: 'Device → local buffer',
    active: ['disk', 'disks'],
    cpu: 'free: runs other work',
    buffer: 'filling',
    text: {
      en: 'I/O is **from the device to the controller’s local buffer**. Meanwhile the CPU is free — **I/O devices and the CPU execute concurrently**.',
      ar: 'الـ I/O بيبقى **من الجهاز للـ local buffer بتاع الـ controller**. وفي نفس الوقت الـ CPU فاضية — **الـ I/O devices والـ CPU بيشتغلوا concurrently**.',
    },
  },
  {
    title: 'Controller raises an interrupt',
    active: ['disk', 'bus', 'cpu'],
    cpu: 'interrupted',
    buffer: 'full',
    interrupt: true,
    text: {
      en: 'The device controller **informs the CPU that it has finished** its operation **by causing an interrupt**.',
      ar: 'الـ device controller **بيبلغ الـ CPU إنه خلّص** العملية **عن طريق interrupt**.',
    },
  },
  {
    title: 'CPU moves the data',
    active: ['cpu', 'bus', 'memory', 'disk'],
    cpu: 'copies buffer → memory',
    buffer: 'empty',
    text: {
      en: 'The **CPU moves data** between main memory and the controller’s local buffer. (For fast devices, **DMA** lets the controller do this copy itself — Section 4.)',
      ar: 'الـ **CPU بتنقل الداتا** بين الـ main memory والـ local buffer. (للأجهزة السريعة، الـ **DMA** بيخلي الـ controller يعمل النقل ده بنفسه — Section 4.)',
    },
  },
  {
    title: 'Back to work',
    active: ['cpu', 'memory'],
    cpu: 'resumes the process',
    buffer: 'empty',
    text: {
      en: 'The CPU returns to the interrupted computation. Everything the OS did here was triggered by an event — this is why the OS is called **interrupt driven**.',
      ar: 'الـ CPU بترجع للشغل اللي اتقطع. كل اللي الـ OS عمله هنا اتشغّل بسبب event — وده ليه الـ OS اسمه **interrupt driven**.',
    },
  },
]

function Node({
  id,
  step,
  className,
  children,
}: {
  id: NodeId
  step: Step
  className?: string
  children: React.ReactNode
}) {
  const active = step.active.includes(id)
  return (
    <div className={cn('viz-node p-3', className)} data-active={active} data-dim={!active}>
      {children}
    </div>
  )
}

export function SystemOrganizationVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [index, setIndex] = useState(0)
  const step = steps[index]

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Step through one disk read.' }}>
      <div className="rounded-xl border border-line-soft bg-ink-950/50 p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-3">
          <Node id="cpu" step={step} className="relative">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-cyan-neon" aria-hidden="true" />
              <span className="font-display font-semibold text-mist-50">CPU</span>
            </div>
            <p className="mt-1 font-mono text-[0.7rem] text-mist-400">{step.cpu}</p>
            {step.interrupt ? (
              <span className="viz-pulse absolute -top-2.5 end-2 inline-flex items-center gap-1 rounded-full bg-amber-neon px-2 py-0.5 font-mono text-[0.62rem] font-bold text-ink-950">
                <Zap className="h-3 w-3" aria-hidden="true" /> INTERRUPT
              </span>
            ) : null}
          </Node>
          <Node id="memory" step={step}>
            <div className="flex items-center gap-2">
              <MemoryStick className="h-5 w-5 text-violet-neon" aria-hidden="true" />
              <span className="font-display font-semibold text-mist-50">Memory</span>
            </div>
            <p className="mt-1 font-mono text-[0.7rem] text-mist-400">shared by CPU and controllers</p>
          </Node>
        </div>

        <div
          className="viz-node my-3 flex items-center justify-center py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mist-300"
          data-active={step.active.includes('bus')}
          data-dim={!step.active.includes('bus')}
        >
          common bus
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(
            [
              { id: 'disk', label: 'Disk controller', device: 'disks' as NodeId, icons: [HardDrive, HardDrive], deviceLabel: 'disks' },
              { id: 'usb', label: 'USB controller', device: 'usbdev' as NodeId, icons: [Mouse, Keyboard, Printer], deviceLabel: 'mouse · keyboard · printer' },
              { id: 'gfx', label: 'Graphics adapter', device: 'monitor' as NodeId, icons: [Monitor], deviceLabel: 'monitor' },
            ] as const
          ).map((controller) => (
            <div key={controller.id} className="space-y-2">
              <Node id={controller.id} step={step}>
                <p className="font-display text-[0.92rem] font-semibold text-mist-50">{controller.label}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-mono text-[0.62rem] uppercase text-mist-500">local buffer</span>
                  <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-ink-800">
                    <span
                      className={cn(
                        'absolute inset-y-0 start-0 rounded-full bg-teal-neon transition-all duration-700',
                        controller.id !== 'disk' || step.buffer === 'empty'
                          ? 'w-0'
                          : step.buffer === 'filling'
                            ? 'w-1/2'
                            : 'w-full',
                      )}
                    />
                  </span>
                </div>
              </Node>
              <Node id={controller.device} step={step} className="flex items-center gap-2 !py-2">
                {controller.icons.map((DeviceIcon, iconIndex) => (
                  <DeviceIcon key={iconIndex} className="h-4 w-4 text-mist-300" aria-hidden="true" />
                ))}
                <span className="truncate font-mono text-[0.66rem] text-mist-400">{controller.deviceLabel}</span>
              </Node>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-4" aria-live="polite">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-cyan-neon">
          Step {index + 1} · {step.title}
        </p>
        <BilingualProse text={step.text} className="mt-1.5 text-[0.95rem]" />
      </div>

      <StepControls
        step={index}
        total={steps.length}
        onPrev={() => setIndex((value) => Math.max(0, value - 1))}
        onNext={() => setIndex((value) => Math.min(steps.length - 1, value + 1))}
        onReset={() => setIndex(0)}
      />
    </VisualFrame>
  )
}
