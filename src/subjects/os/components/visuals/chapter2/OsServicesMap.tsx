import { useState } from 'react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

type Family = 'user' | 'system'

const services: Array<{ name: string; family: Family; text: LText }> = [
  { name: 'program execution', family: 'user', text: { en: 'Load a program into memory, run it, and end it normally or abnormally.', ar: 'تحمّل البرنامج في الـ memory وتشغّله وتنهيه normally أو abnormally.' } },
  { name: 'I/O operations', family: 'user', text: { en: 'A running program may need I/O to a file or an I/O device.', ar: 'البرنامج الشغال ممكن يحتاج I/O لـ file أو I/O device.' } },
  { name: 'file systems', family: 'user', text: { en: 'Read, write, create, delete, search and list files and directories; manage permissions.', ar: 'قراءة وكتابة وإنشاء وحذف وبحث وعرض الـ files والـ directories؛ وإدارة الصلاحيات.' } },
  { name: 'communication', family: 'user', text: { en: 'Processes exchange information — via shared memory or message passing.', ar: 'الـ processes بتتبادل معلومات — بالـ shared memory أو الـ message passing.' } },
  { name: 'resource allocation', family: 'system', text: { en: 'Allocate CPU cycles, main memory, file storage and I/O devices among concurrent users and jobs.', ar: 'توزيع الـ CPU cycles والـ main memory والـ file storage والـ I/O devices على المستخدمين والـ jobs المتزامنة.' } },
  { name: 'accounting', family: 'system', text: { en: 'Track which users use how much and what kinds of resources.', ar: 'متابعة مين بيستخدم قد إيه ونوع إيه من الموارد.' } },
  { name: 'error detection', family: 'user', text: { en: 'Detect errors in CPU and memory hardware, I/O devices and user programs, and act on them.', ar: 'اكتشاف الأخطاء في الـ CPU والـ memory والـ I/O devices وبرامج المستخدم والتصرف فيها.' } },
  { name: 'protection and security', family: 'system', text: { en: 'Control all access to resources; authenticate users; defend I/O devices from invalid access.', ar: 'التحكم في كل وصول للموارد؛ والتحقق من المستخدمين؛ وحماية الأجهزة من الوصول الغلط.' } },
]

const familyStyle: Record<Family, { chip: string; label: string; text: LText }> = {
  user: {
    chip: 'border-teal-neon/50 bg-teal-neon/[0.1] text-teal-neon',
    label: 'Helpful to the user',
    text: { en: 'Functions that are helpful to the user (with the user interface itself).', ar: 'وظايف بتساعد المستخدم (ومعاها الـ user interface نفسها).' },
  },
  system: {
    chip: 'border-amber-neon/50 bg-amber-neon/[0.1] text-amber-neon',
    label: 'Efficient system operation',
    text: { en: 'Functions that ensure the efficient operation of the system itself via resource sharing.', ar: 'وظايف بتضمن كفاءة تشغيل النظام نفسه عن طريق مشاركة الموارد.' } },
}

export function OsServicesMapVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showFamilies, setShowFamilies] = useState(false)
  const current = services.find((service) => service.name === selected)

  const band = (label: string, tone: string, children?: React.ReactNode) => (
    <div className={cn('rounded-xl border px-3 py-2 text-center', tone)}>
      <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-mist-300">{label}</p>
      {children}
    </div>
  )

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Click a service, or colour the services by family.' }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setShowFamilies((value) => !value)}
          aria-pressed={showFamilies}
          className={cn('btn btn-sm', showFamilies ? 'btn-primary' : 'btn-secondary')}
        >
          {showFamilies ? 'Hide the two families' : 'Colour by family'}
        </button>
        {showFamilies ? (
          <div className="flex flex-wrap gap-1.5 text-[0.72rem]">
            <span className={cn('rounded-md border px-2 py-0.5', familyStyle.user.chip)}>{familyStyle.user.label}</span>
            <span className={cn('rounded-md border px-2 py-0.5', familyStyle.system.chip)}>{familyStyle.system.label}</span>
          </div>
        ) : null}
      </div>

      <div className="mt-4 space-y-2 rounded-xl border border-line-soft bg-ink-950/50 p-3 sm:p-4">
        {band('user and other system programs', 'border-violet-neon/35 bg-violet-neon/[0.06]')}
        {band(
          'user interfaces',
          'border-cyan-neon/35 bg-cyan-neon/[0.06]',
          <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
            {['GUI', 'batch', 'command line'].map((ui) => (
              <span key={ui} className={cn('vb-chip', showFamilies && '!border-teal-neon/50 !text-teal-neon')}>
                {ui}
              </span>
            ))}
          </div>,
        )}
        {band('system calls', 'border-line bg-ink-800/60')}
        <div className="rounded-xl border border-line bg-ink-900/60 p-2.5">
          <p className="mb-2 text-center font-mono text-[0.64rem] uppercase tracking-[0.18em] text-mist-300">services</p>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {services.map((service) => {
              const active = service.name === selected
              return (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => setSelected(active ? null : service.name)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-lg border px-2 py-2 text-[0.8rem] font-medium transition-colors',
                    showFamilies ? familyStyle[service.family].chip : 'border-line-soft bg-ink-950/50 text-mist-200 hover:border-line',
                    active && 'ring-2 ring-white/25',
                  )}
                >
                  {service.name}
                </button>
              )
            })}
          </div>
        </div>
        {band('operating system', 'border-cyan-neon/30 bg-cyan-neon/[0.08]')}
        {band('hardware', 'border-rose-neon/30 bg-rose-neon/[0.06]')}
      </div>

      <div className="mt-3 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        {current ? (
          <>
            <p className="font-display text-[1rem] font-semibold text-mist-50">
              {current.name}
              <span className={cn('ms-2 rounded-md border px-1.5 py-0.5 align-middle text-[0.66rem]', familyStyle[current.family].chip)}>
                {familyStyle[current.family].label}
              </span>
            </p>
            <BilingualProse text={current.text} className="mt-1 text-[0.92rem]" />
          </>
        ) : showFamilies ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <BilingualProse text={familyStyle.user.text} className="text-[0.88rem]" />
            <BilingualProse text={familyStyle.system.text} className="text-[0.88rem]" />
          </div>
        ) : (
          <BilingualProse
            text={{
              en: 'Read top to bottom: programs use a user interface, every request crosses the system-call layer, a service handles it, and the OS drives the hardware.',
              ar: 'اقرا من فوق لتحت: البرامج بتستخدم user interface، وكل طلب بيعدّي على طبقة الـ system calls، وخدمة بتتعامل معاه، والـ OS بيشغّل الـ hardware.',
            }}
            className="text-[0.92rem]"
          />
        )}
      </div>
    </VisualFrame>
  )
}
