import { useState } from 'react'
import { Cloud, Laptop, Monitor, Server, Smartphone } from 'lucide-react'
import type { LText } from '../../types'
import { BilingualProse } from '../ui/Text'
import { cn } from '../../lib/cn'
import { StepControls, VisualFrame } from './VisualFrame'

type Model = 'client-server' | 'p2p'
type ServerKind = 'compute' | 'file'
type Discovery = 'lookup' | 'broadcast'

const csSteps = (kind: ServerKind): LText[] => [
  {
    en: 'A **server** waits for requests. Smart PCs have replaced the old dumb terminals as clients.',
    ar: 'الـ **server** مستني requests. والـ smart PCs خدت مكان الـ dumb terminals القديمة كـ clients.',
  },
  kind === 'compute'
    ? {
        en: 'The **client laptop** sends a request through the network: “run this database query”.',
        ar: 'الـ **client laptop** بيبعت request عبر الشبكة: “نفّذ الـ database query دي”.',
      }
    : {
        en: 'The **client laptop** sends a request through the network: “retrieve report.pdf” (or store a file).',
        ar: 'الـ **client laptop** بيبعت request عبر الشبكة: “هات report.pdf” (أو خزّن file).',
      },
  kind === 'compute'
    ? {
        en: 'A **compute-server system** provides an interface for clients to request services — it executes the query itself.',
        ar: 'الـ **compute-server system** بيوفر interface للـ clients يطلبوا خدمات — وهو اللي بينفذ الـ query بنفسه.',
      }
    : {
        en: 'A **file-server system** provides an interface for clients to **store and retrieve files**.',
        ar: 'الـ **file-server system** بيوفر interface للـ clients عشان **يخزنوا ويجيبوا files**.',
      },
  {
    en: 'The server **responds** to the request. The roles never swap: the server serves, the client consumes.',
    ar: 'الـ server بي**رد** على الطلب. والأدوار مش بتتبدل: الـ server بيخدم والـ client بيستهلك.',
  },
]

const p2pSteps = (discovery: Discovery): LText[] => [
  {
    en: 'In **peer-to-peer**, all nodes are **peers** — there is no fixed client or server. A node must first **join** the P2P network.',
    ar: 'في الـ **peer-to-peer** كل الـ nodes **peers** — مفيش client أو server ثابت. والـ node لازم الأول **تنضم** للشبكة.',
  },
  discovery === 'lookup'
    ? {
        en: 'Peer A asks the **central lookup service**, where nodes register the services they offer: “who has song.mp3?”',
        ar: 'الـ peer A بيسأل **الـ central lookup service**، اللي الـ nodes بتسجل فيها خدماتها: “مين عنده song.mp3؟”',
      }
    : {
        en: 'Peer A **broadcasts** a request for the service to the other nodes, using a **discovery protocol**.',
        ar: 'الـ peer A بيعمل **broadcast** للطلب لكل الـ nodes التانية، باستخدام **discovery protocol**.',
      },
  discovery === 'lookup'
    ? { en: 'The lookup service answers: “peer C has it”.', ar: 'الـ lookup service بترد: “الـ peer C عنده”.' }
    : { en: 'Peer C **responds** to the request: “I have it”.', ar: 'الـ peer C بي**رد** على الطلب: “أنا عندي”.' },
  {
    en: 'C sends the file to A: right now **C acts as a server and A as a client**. A moment later the roles may flip — each node may be client, server, or both (Napster, Gnutella, VoIP such as Skype).',
    ar: 'C بيبعت الـ file لـ A: دلوقتي **C شغال server وA شغال client**. وبعد شوية الأدوار ممكن تتقلب — كل node ممكن تبقى client أو server أو الاتنين (Napster وGnutella وVoIP زي Skype).',
  },
]

const peers = [
  { id: 'A', x: 50, y: 40 },
  { id: 'B', x: 250, y: 40 },
  { id: 'C', x: 270, y: 150 },
  { id: 'D', x: 150, y: 190 },
  { id: 'E', x: 30, y: 150 },
]

export function NetworkModelsVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [model, setModel] = useState<Model>('client-server')
  const [kind, setKind] = useState<ServerKind>('file')
  const [discovery, setDiscovery] = useState<Discovery>('lookup')
  const [step, setStep] = useState(0)

  const texts = model === 'client-server' ? csSteps(kind) : p2pSteps(discovery)
  const switchTo = (next: () => void) => {
    next()
    setStep(0)
  }

  const peerPoint = (id: string) => peers.find((peer) => peer.id === id) ?? peers[0]
  const lookup = { x: 150, y: 105 }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Step through one request in each model.' }}>
      <div className="flex flex-wrap items-center gap-2">
        {(['client-server', 'p2p'] as Model[]).map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => switchTo(() => setModel(candidate))}
            aria-pressed={model === candidate}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-[0.8rem] font-semibold transition-colors',
              model === candidate
                ? 'border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon'
                : 'border-line-soft bg-ink-900/50 text-mist-400 hover:text-mist-100',
            )}
          >
            {candidate === 'client-server' ? 'Client–server' : 'Peer-to-peer'}
          </button>
        ))}
        <span className="mx-1 h-5 w-px bg-line" aria-hidden="true" />
        {model === 'client-server'
          ? (['file', 'compute'] as ServerKind[]).map((candidate) => (
              <button
                key={candidate}
                type="button"
                onClick={() => switchTo(() => setKind(candidate))}
                aria-pressed={kind === candidate}
                className={cn(
                  'rounded-md px-2.5 py-1 text-[0.74rem] font-semibold',
                  kind === candidate ? 'bg-violet-neon/15 text-violet-neon' : 'text-mist-400 hover:text-mist-100',
                )}
              >
                {candidate}-server
              </button>
            ))
          : (['lookup', 'broadcast'] as Discovery[]).map((candidate) => (
              <button
                key={candidate}
                type="button"
                onClick={() => switchTo(() => setDiscovery(candidate))}
                aria-pressed={discovery === candidate}
                className={cn(
                  'rounded-md px-2.5 py-1 text-[0.74rem] font-semibold',
                  discovery === candidate ? 'bg-violet-neon/15 text-violet-neon' : 'text-mist-400 hover:text-mist-100',
                )}
              >
                {candidate === 'lookup' ? 'central lookup' : 'broadcast discovery'}
              </button>
            ))}
      </div>

      <div className="mt-4 rounded-xl border border-line-soft bg-ink-950/50 p-4">
        {model === 'client-server' ? (
          <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <div className="viz-node flex flex-col items-center gap-1 p-3" data-active={step >= 2} data-dim={step === 1}>
              <Server className="h-7 w-7 text-cyan-neon" aria-hidden="true" />
              <span className="font-display font-semibold text-mist-50">Server</span>
              <span className="font-mono text-[0.62rem] text-mist-400">{kind}-server system</span>
            </div>
            <div className="flex flex-col items-center gap-1 font-mono text-[0.66rem]">
              <span className={cn('transition-opacity', step === 1 ? 'text-amber-neon' : 'opacity-30')}>← request</span>
              <span className="viz-node flex items-center gap-1.5 px-3 py-2" data-active={step === 1 || step === 3}>
                <Cloud className="h-5 w-5 text-violet-neon" aria-hidden="true" /> network
              </span>
              <span className={cn('transition-opacity', step === 3 ? 'text-teal-neon' : 'opacity-30')}>response →</span>
            </div>
            <ul className="space-y-1.5">
              {[
                { icon: Monitor, label: 'client desktop' },
                { icon: Laptop, label: 'client laptop', active: true },
                { icon: Smartphone, label: 'client smartphone' },
              ].map((client) => (
                <li
                  key={client.label}
                  className="viz-node flex items-center gap-2 px-3 py-2"
                  data-active={Boolean(client.active) && (step === 1 || step === 3)}
                >
                  <client.icon className="h-4 w-4 text-mist-300" aria-hidden="true" />
                  <span className="text-[0.84rem] text-mist-200">{client.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <svg viewBox="0 0 300 220" className="mx-auto block h-auto w-full max-w-md" role="img" aria-label="Peer-to-peer mesh of five nodes">
            {peers.flatMap((a, i) =>
              peers.slice(i + 1).map((b) => {
                const broadcast = discovery === 'broadcast' && step === 1 && a.id === 'A'
                const transfer = step === 3 && ((a.id === 'A' && b.id === 'C') || (a.id === 'C' && b.id === 'A'))
                const reply = discovery === 'broadcast' && step === 2 && a.id === 'A' && b.id === 'C'
                return (
                  <line
                    key={a.id + b.id}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={transfer ? '#39d5bd' : broadcast || reply ? '#f7c454' : '#28405f'}
                    strokeWidth={transfer || broadcast || reply ? 2.5 : 1}
                  />
                )
              }),
            )}
            {discovery === 'lookup' ? (
              <>
                {(step === 1 || step === 2) && (
                  <line x1={peerPoint('A').x} y1={peerPoint('A').y} x2={lookup.x} y2={lookup.y} stroke="#f7c454" strokeWidth={2.5} strokeDasharray="5 4" />
                )}
                <rect x={lookup.x - 38} y={lookup.y - 14} width={76} height={28} rx={7} fill="#1d1640" stroke="#b09afa" />
                <text x={lookup.x} y={lookup.y + 4} textAnchor="middle" fontSize="10" fill="#e9e3ff">
                  lookup service
                </text>
              </>
            ) : null}
            {peers.map((peer) => {
              const role = step === 3 && peer.id === 'C' ? 'server' : step === 3 && peer.id === 'A' ? 'client' : 'peer'
              return (
                <g key={peer.id}>
                  <circle
                    cx={peer.x}
                    cy={peer.y}
                    r={17}
                    fill={peer.id === 'A' ? '#0f3440' : peer.id === 'C' && step >= 2 ? '#0e3a33' : '#0d1929'}
                    stroke={peer.id === 'A' ? '#35d8ee' : peer.id === 'C' && step >= 2 ? '#39d5bd' : '#527092'}
                    strokeWidth={2}
                  />
                  <text x={peer.x} y={peer.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#f7faff">
                    {peer.id}
                  </text>
                  <text x={peer.x} y={peer.y + 30} textAnchor="middle" fontSize="8.5" fill="#91a7c2">
                    {role}
                  </text>
                </g>
              )
            })}
          </svg>
        )}
      </div>

      <div className="mt-3 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        <BilingualProse text={texts[step]} className="text-[0.92rem]" />
      </div>

      <StepControls
        step={step}
        total={texts.length}
        onPrev={() => setStep((value) => Math.max(0, value - 1))}
        onNext={() => setStep((value) => Math.min(texts.length - 1, value + 1))}
        onReset={() => setStep(0)}
      />
    </VisualFrame>
  )
}
