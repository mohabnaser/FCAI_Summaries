import { useState } from 'react'
import {
  Check,
  FileText,
  Fingerprint,
  KeyRound,
  Lock,
  Printer,
  Shield,
  ShieldCheck,
  ShieldX,
  X,
} from 'lucide-react'
import type { LText } from '../../types'
import { useLanguage } from '../../context/LanguageContext'
import { RichText } from '../ui/Text'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

type Access = 'read' | 'write' | 'execute'
type ClassName = 'owner' | 'group' | 'other'

interface User {
  id: string
  name: string
  uid: string
  gid: string
  group: string
  role: string
}

interface Resource {
  id: string
  name: string
  kind: 'file' | 'device'
  icon: typeof FileText
  ownerId: string
  group: string
  mode: Record<ClassName, Access[]>
  detail: LText
}

const users: User[] = [
  { id: 'mona', name: 'Mona', uid: '1001', gid: '2001', group: 'students', role: 'student' },
  { id: 'omar', name: 'Omar', uid: '1002', gid: '2001', group: 'students', role: 'student' },
  { id: 'hala', name: 'Dr. Hala', uid: '3001', gid: '3001', group: 'faculty', role: 'faculty' },
  { id: 'guest', name: 'Guest', uid: '4001', gid: '4001', group: 'guests', role: 'guest' },
]

const resources: Resource[] = [
  {
    id: 'notes',
    name: 'notes.txt',
    kind: 'file',
    icon: FileText,
    ownerId: 'mona',
    group: 'students',
    mode: { owner: ['read', 'write'], group: ['read'], other: ['read'] },
    detail: {
      en: 'Mona owns the file; students can read it; everyone else can read it. Only Mona can write.',
      ar: 'Mona مالكة الملف؛ الطلاب يقدروا يقرأوه؛ وأي حد تاني يقرأ. Mona بس تقدر تكتب.',
    },
  },
  {
    id: 'grades',
    name: 'grades.db',
    kind: 'file',
    icon: Lock,
    ownerId: 'hala',
    group: 'faculty',
    mode: { owner: ['read', 'write'], group: ['read', 'write'], other: [] },
    detail: {
      en: 'The grade database is private to faculty. Students and guests have no access. The OS checks identity and group membership before allowing a read or write.',
      ar: 'قاعدة بيانات الدرجات خاصة هيئة التدريس. الطلاب والضيوف مالهمش وصول. والOS يتأكد من الهوية وعضوية المجموعة قبل ما يسمح بالقراءة أو الكتابة.',
    },
  },
  {
    id: 'script',
    name: 'project.sh',
    kind: 'file',
    icon: KeyRound,
    ownerId: 'hala',
    group: 'faculty',
    mode: { owner: ['read', 'write', 'execute'], group: ['read', 'execute'], other: ['read'] },
    detail: {
      en: 'A course script: the owner can read, write, and execute it; faculty peers can read and execute; other users can only read. Execute permission is separate from read and write.',
      ar: 'script للكورس: المالك يقرأ ويكتب وينفذ؛ زملاء faculty يقرأوا وينفذوا؛ والباقي يقرأ بس. صلاحية التنفيذ منفصلة عن القراءة والكتابة.',
    },
  },
  {
    id: 'printer',
    name: 'printer queue',
    kind: 'device',
    icon: Printer,
    ownerId: 'hala',
    group: 'students',
    mode: { owner: ['read', 'write'], group: ['read', 'write'], other: [] },
    detail: {
      en: 'A shared device queue: the owner and the students group may submit or inspect jobs. Guests cannot use the queue. I/O itself remains a privileged operation behind the OS interface.',
      ar: 'queue لجهاز مشترك: المالك ومجموعة الطلاب يقدروا يضيفوا أو يشوفوا jobs. الضيوف ممنوعين. والI/O نفسه privileged operation ورا واجهة الOS.',
    },
  },
]

const accessIcons: Record<Access, typeof FileText> = {
  read: FileText,
  write: KeyRound,
  execute: KeyRound,
}

function permissionLabel(access: Access[]): string {
  if (access.length === 0) return 'none'
  return access.join(', ')
}

function DecisionIcon({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <ShieldCheck className="h-7 w-7 text-teal-neon" aria-hidden="true" />
  ) : (
    <ShieldX className="h-7 w-7 text-rose-neon" aria-hidden="true" />
  )
}

export function ProtectionVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [userId, setUserId] = useState('mona')
  const [resourceId, setResourceId] = useState('notes')
  const [action, setAction] = useState<Access>('read')
  const { isArabic } = useLanguage()
  const user = users.find((candidate) => candidate.id === userId) ?? users[0]
  const resource = resources.find((candidate) => candidate.id === resourceId) ?? resources[0]

  const userClass: ClassName =
    user.id === resource.ownerId ? 'owner' : user.group === resource.group ? 'group' : 'other'
  const allowed = resource.mode[userClass].includes(action)
  const reason = allowed
    ? userClass === 'owner'
      ? `${user.name} owns the resource, so owner permissions apply.`
      : userClass === 'group'
        ? `${user.name} is in the “${resource.group}” group, so group permissions apply.`
        : `The resource's “other” permissions allow this action for everyone else.`
    : userClass === 'owner'
      ? `Owner permissions do not include ${action}.`
      : userClass === 'group'
        ? `Group permissions for “${resource.group}” do not include ${action}.`
        : `“Other” permissions do not include ${action}, and ${user.name} is neither the owner nor in the resource group.`

  return (
    <VisualFrame title={title} hint={hint}>
      <div className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-xl border border-line-soft bg-ink-950/50 p-3.5">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">1 · Identity</p>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            {users.map((candidate) => (
              <button
                key={candidate.id}
                type="button"
                onClick={() => setUserId(candidate.id)}
                className={cn(
                  'rounded-lg border px-2 py-1.5 text-left transition-colors',
                  userId === candidate.id
                    ? 'border-cyan-neon/45 bg-cyan-neon/10'
                    : 'border-line bg-ink-900/60 hover:border-line-soft hover:bg-ink-800/50',
                )}
                aria-pressed={userId === candidate.id}
              >
                <span className="block text-[0.78rem] font-semibold text-mist-100">{candidate.name}</span>
                <span className="block font-mono text-[0.62rem] text-mist-500">
                  UID {candidate.uid} · {candidate.group}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">2 · Resource</p>
          <div className="mt-1.5 space-y-1">
            {resources.map((candidate) => {
              const Icon = candidate.icon
              return (
                <button
                  key={candidate.id}
                  type="button"
                  onClick={() => setResourceId(candidate.id)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left transition-colors',
                    resourceId === candidate.id
                      ? 'border-violet-neon/40 bg-violet-neon/[0.08]'
                      : 'border-line bg-ink-900/60 hover:bg-ink-800/50',
                  )}
                  aria-pressed={resourceId === candidate.id}
                >
                  <Icon className="h-3.5 w-3.5 flex-none text-violet-neon" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.78rem] font-medium text-mist-100">{candidate.name}</span>
                    <span className="block font-mono text-[0.6rem] text-mist-500">
                      owner {users.find((entry) => entry.id === candidate.ownerId)?.name} · group {candidate.group}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">3 · Requested action</p>
          <div className="mt-1.5 flex gap-1.5">
            {(['read', 'write', 'execute'] as const).map((candidate) => {
              const Icon = accessIcons[candidate]
              return (
                <button
                  key={candidate}
                  type="button"
                  onClick={() => setAction(candidate)}
                  className={cn(
                    'inline-flex flex-1 items-center justify-center gap-1 rounded-md border px-1.5 py-1.5 text-[0.72rem] font-medium capitalize transition-colors',
                    action === candidate
                      ? 'border-teal-neon/45 bg-teal-neon/10 text-teal-neon'
                      : 'border-line bg-ink-900/60 text-mist-400 hover:text-mist-100',
                  )}
                  aria-pressed={action === candidate}
                >
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {candidate}
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2.5">
          <div
            className={cn(
              'rounded-xl border p-3.5 transition-colors',
              allowed
                ? 'border-teal-neon/40 bg-teal-neon/[0.06]'
                : 'border-rose-neon/40 bg-rose-neon/[0.055]',
            )}
            aria-live="polite"
          >
            <div className="flex items-start gap-2.5">
              <DecisionIcon allowed={allowed} />
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    'font-mono text-[0.68rem] uppercase tracking-[0.13em]',
                    allowed ? 'text-teal-neon' : 'text-rose-neon',
                  )}
                >
                  Access decision
                </p>
                <p className="mt-0.5 font-display text-lg font-semibold text-mist-50">
                  {allowed ? 'Allowed' : 'Denied'}
                </p>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-mist-300">{reason}</p>
              </div>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-line-soft pt-2">
              <span className="badge badge-cyan">
                <Fingerprint className="h-3 w-3" aria-hidden="true" />
                {user.uid} / {user.gid}
              </span>
              <span className="badge">
                class: {userClass}
              </span>
              <span className="badge">
                {action} on {resource.name}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-line-soft bg-ink-900/45 p-3.5">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                {resource.name} · access control
              </p>
              <span className="badge">{resource.kind}</span>
            </div>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[15rem] border-collapse text-[0.72rem]">
                <thead>
                  <tr className="text-mist-500">
                    <th className="border-b border-line px-1.5 py-1 text-left font-mono font-medium uppercase tracking-wider">
                      permission
                    </th>
                    <th className="border-b border-line px-1.5 py-1 text-left font-mono font-medium uppercase tracking-wider">
                      owner
                    </th>
                    <th className="border-b border-line px-1.5 py-1 text-left font-mono font-medium uppercase tracking-wider">
                      group
                    </th>
                    <th className="border-b border-line px-1.5 py-1 text-left font-mono font-medium uppercase tracking-wider">
                      other
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(['read', 'write', 'execute'] as const).map((permission) => (
                    <tr key={permission}>
                      <td className="border-b border-line-soft/60 px-1.5 py-1 capitalize text-mist-400">
                        {permission}
                      </td>
                      {(['owner', 'group', 'other'] as const).map((className) => {
                        const has = resource.mode[className].includes(permission)
                        return (
                          <td key={className} className="border-b border-line-soft/60 px-1.5 py-1">
                            <span
                              className={cn(
                                'inline-flex items-center gap-1',
                                has ? 'text-teal-neon' : 'text-mist-600',
                              )}
                            >
                              {has ? (
                                <Check className="h-3 w-3" aria-hidden="true" />
                              ) : (
                                <X className="h-3 w-3" aria-hidden="true" />
                              )}
                              <span className="font-mono text-[0.62rem]">{permissionLabel(resource.mode[className].filter((entry) => entry === permission))}</span>
                            </span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[0.74rem] leading-relaxed text-mist-400">{resource.detail.en}</p>
            {isArabic && resource.detail.ar ? (
              <p className="arabic-note mt-1.5 text-[0.74rem]" lang="ar" dir="rtl">
                <RichText text={resource.detail.ar} />
              </p>
            ) : null}
          </div>

          <div className="rounded-lg border border-amber-neon/20 bg-amber-neon/[0.045] p-2.5">
            <p className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-amber-neon">
              <Shield className="h-3 w-3" aria-hidden="true" />
              Protection vs. security
            </p>
            <p className="mt-1 text-[0.76rem] leading-relaxed text-mist-400">
              This decision is protection: internal access control. Security is the broader defense
              against attacks, including stolen credentials and vulnerabilities. Privilege escalation
              must be controlled; uncontrolled escalation is a security failure.
            </p>
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}
