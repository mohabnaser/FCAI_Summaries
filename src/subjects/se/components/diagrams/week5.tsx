import type { Tone } from '../../types'
import { Arrow, Box, Curve, Label, Svg } from './kit'

type P = [number, number]

function Dot({ p, tone = 'teal', r = 7 }: { p: P; tone?: Tone; r?: number }) {
  return (
    <g data-tone={tone}>
      <circle cx={p[0]} cy={p[1]} r={r} className="svg-solid" />
    </g>
  )
}

function Link({ a, b }: { a: P; b: P }) {
  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="svg-ink-stroke" strokeWidth={1.6} />
}

/** Week 5 · Seven network topologies (slide 5): a topology is the "shape" of allowed connections. */
export function TopologiesDiagram() {
  const ring = (cx: number, cy: number, r: number, n: number): P[] =>
    Array.from({ length: n }, (_, i) => [cx + r * Math.cos((i / n) * 2 * Math.PI - Math.PI / 2), cy + r * Math.sin((i / n) * 2 * Math.PI - Math.PI / 2)])
  const cells = [
    { name: 'Ring', x: 64 },
    { name: 'Mesh', x: 192 },
    { name: 'Star', x: 320 },
    { name: 'Fully connected', x: 448 },
    { name: 'Line', x: 576 },
    { name: 'Tree', x: 704 },
    { name: 'Bus', x: 832 },
  ]
  const cy = 90
  const r6 = (x: number) => ring(x, cy, 42, 6)
  const r5 = (x: number) => ring(x, cy, 42, 5)
  return (
    <Svg width={900} height={190} label="Seven topologies: ring, mesh, star, fully connected, line, tree and bus.">
      {/* ring */}
      {r6(64).map((p, i, all) => <Link key={i} a={p} b={all[(i + 1) % all.length]} />)}
      {r6(64).map((p, i) => <Dot key={i} p={p} />)}
      {/* mesh (partial) */}
      {[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4], [2, 5]].map(([a, b], i) => <Link key={i} a={r6(192)[a]} b={r6(192)[b]} />)}
      {r6(192).map((p, i) => <Dot key={i} p={p} />)}
      {/* star */}
      {r5(320).map((p, i) => <Link key={i} a={[320, cy]} b={p} />)}
      {r5(320).map((p, i) => <Dot key={i} p={p} />)}
      <Dot p={[320, cy]} tone="violet" r={9} />
      {/* fully connected */}
      {r5(448).flatMap((p, i, all) => all.slice(i + 1).map((q, j) => <Link key={`${i}-${j}`} a={p} b={q} />))}
      {r5(448).map((p, i) => <Dot key={i} p={p} />)}
      {/* line */}
      {[0, 1, 2, 3].map((i) => (i < 3 ? <Link key={i} a={[531 + i * 30, cy]} b={[531 + (i + 1) * 30, cy]} /> : null))}
      {[0, 1, 2, 3].map((i) => <Dot key={i} p={[531 + i * 30, cy]} />)}
      {/* tree */}
      {([[[704, 52], [678, 90]], [[704, 52], [730, 90]], [[678, 90], [664, 128]], [[678, 90], [692, 128]], [[730, 90], [716, 128]], [[730, 90], [744, 128]]] as Array<[P, P]>).map(([a, b], i) => <Link key={i} a={a} b={b} />)}
      {([[704, 52], [678, 90], [730, 90], [664, 128], [692, 128], [716, 128], [744, 128]] as P[]).map((p, i) => <Dot key={i} p={p} tone={i === 0 ? 'violet' : 'teal'} />)}
      {/* bus */}
      <line x1={786} y1={cy} x2={878} y2={cy} className="svg-ink-stroke" strokeWidth={3} />
      {[796, 826, 856, 811, 841].map((x, i) => (
        <g key={i}>
          <Link a={[x, cy]} b={[x, i < 3 ? cy - 34 : cy + 34]} />
          <Dot p={[x, i < 3 ? cy - 34 : cy + 34]} />
        </g>
      ))}
      {cells.map((c) => (
        <Label key={c.name} x={c.x} y={172} size={12.5} weight={700}>{c.name}</Label>
      ))}
    </Svg>
  )
}

/** Week 5 · The architecture process: requirements → design (2a, 2b) → validation, iterated (slides 7–10). */
export function ArchProcessDiagram() {
  return (
    <Svg width={900} height={330} label="Functional and stakeholder requirements feed step 1, determine architecture requirements. Its output feeds step 2, architecture design: 2a choose an architecture framework of styles, 2b allocate components; the outputs are architecture views and a document. Step 3 validation feeds back to earlier steps.">
      <Box x={10} y={40} w={150} h={46} tone="blue" title="Functional reqs" titleSize={12.5} />
      <Box x={10} y={110} w={150} h={46} tone="blue" title="Stakeholder reqs" titleSize={12.5} />
      <Arrow points={[[160, 63], [200, 90]]} />
      <Arrow points={[[160, 133], [200, 108]]} />
      <Box x={202} y={60} w={170} h={78} tone="teal" title="1 · Determine" lines={['architecture', 'requirements']} titleSize={13} />
      <Arrow points={[[372, 99], [420, 99]]} />
      <Label x={396} y={88} size={10}>arch. reqs</Label>
      <g data-tone="violet">
        <rect x={422} y={30} width={250} height={150} rx={14} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
        <text x={547} y={52} textAnchor="middle" fontSize={13} fontWeight={800} className="svg-text">2 · Architecture design</text>
      </g>
      <Box x={436} y={64} w={222} h={48} tone="violet" title="2a Choose framework" lines={['patterns / styles']} titleSize={12} />
      <Box x={436} y={120} w={222} h={48} tone="violet" title="2b Allocate components" lines={['responsibilities']} titleSize={12} />
      <Arrow points={[[672, 99], [720, 99]]} />
      <Box x={722} y={60} w={170} h={78} tone="amber" title="3 · Validation" lines={['does the design', 'meet the reqs?']} titleSize={13} />
      <Box x={430} y={232} w={236} h={54} tone="lime" title="Architecture views" lines={['+ architecture document']} titleSize={12.5} />
      <Arrow points={[[547, 180], [547, 230]]} tone="lime" />
      <Curve from={[790, 140]} control={[700, 240]} to={[640, 182]} tone="rose" dashed />
      <Curve from={[760, 140]} control={[480, 330]} to={[290, 140]} tone="rose" dashed />
      <Label x={800} y={236} tone="rose" size={12} weight={700}>iterate: feedback</Label>
      <Label x={800} y={252} size={11}>to design and requirements</Label>
    </Svg>
  )
}

/** Week 5 · N-tier: four logical tiers and the machines they may run on (slides 13–14). */
export function NTierDiagram() {
  const tiers: Array<{ name: string; part: string; machine: string; tone: Tone }> = [
    { name: 'Client tier', part: 'web clients · thin client (browser)', machine: 'Machine A · web browser', tone: 'blue' },
    { name: 'Web server tier', part: 'presentation logic', machine: 'Machine B · web server', tone: 'teal' },
    { name: 'Business logic tier', part: 'application logic', machine: 'Machine C · app server', tone: 'violet' },
    { name: 'Data management tier', part: 'databases', machine: 'Machine D · database server', tone: 'amber' },
  ]
  return (
    <Svg width={900} height={360} label="Four tiers stacked from client tier, web server tier and business logic tier to data management tier, with two-way arrows between neighbours. Each tier may run on its own machine, A to D, or several tiers may share one.">
      <Label x={250} y={22} mono size={11}>LOGICAL TIERS</Label>
      <Label x={690} y={22} mono size={11}>ONE POSSIBLE DEPLOYMENT</Label>
      {tiers.map((tier, i) => {
        const y = 36 + i * 80
        return (
          <g key={tier.name}>
            <Box x={60} y={y} w={380} h={60} tone={tier.tone} title={tier.name} lines={[tier.part]} titleSize={13.5} />
            {i < 3 ? <Arrow points={[[250, y + 60], [250, y + 78]]} both /> : null}
            <line x1={440} y1={y + 30} x2={540} y2={y + 30} className="svg-line" strokeDasharray="4 5" strokeWidth={1.4} />
            <g data-tone={tier.tone}>
              <rect x={540} y={y + 6} width={300} height={48} rx={8} className="svg-surface svg-tone-stroke" strokeWidth={1.4} />
              <text x={690} y={y + 35} textAnchor="middle" fontSize={12.5} fontWeight={600} className="svg-text">{tier.machine}</text>
            </g>
          </g>
        )
      })}
      <Label x={30} y={180} size={11}>requests</Label>
      <Arrow points={[[30, 190], [30, 300]]} tone="rose" />
      <Label x={690} y={354} size={11}>…or all tiers on the same machine: deployment is flexible</Label>
    </Svg>
  )
}

/** Week 5 · Client-server: clients invoke a server, which may itself be a client of another server (slide 15). */
export function ClientServerDiagram() {
  const proc = (x: number, y: number, label: string, tone: Tone) => (
    <g data-tone={tone}>
      <rect x={x - 70} y={y - 40} width={140} height={80} rx={6} className="svg-surface svg-line" strokeWidth={1.4} />
      <ellipse cx={x} cy={y} rx={52} ry={24} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize={13} fontWeight={700} className="svg-text">{label}</text>
    </g>
  )
  return (
    <Svg width={860} height={280} label="Two client processes send invocations to a server process and get results; the server in turn invokes another server. Ovals are processes, rectangles are computers.">
      {proc(100, 70, 'Client', 'blue')}
      {proc(100, 210, 'Client', 'blue')}
      {proc(430, 140, 'Server', 'violet')}
      {proc(760, 140, 'Server', 'teal')}
      <Arrow points={[[152, 62], [378, 126]]} tone="blue" />
      <Arrow points={[[378, 140], [152, 78]]} tone="teal" dashed />
      <Arrow points={[[152, 202], [378, 150]]} tone="blue" />
      <Arrow points={[[378, 162], [152, 218]]} tone="teal" dashed />
      <Arrow points={[[482, 132], [708, 132]]} tone="violet" />
      <Arrow points={[[708, 150], [482, 150]]} tone="teal" dashed />
      <Label x={265} y={80} tone="blue" size={11} weight={700}>invocation</Label>
      <Label x={265} y={128} tone="teal" size={11} weight={700}>result</Label>
      <Label x={595} y={122} tone="violet" size={11} weight={700}>invocation</Label>
      <Label x={595} y={170} tone="teal" size={11} weight={700}>result</Label>
      <Label x={430} y={262} size={11.5}>the middle server is a server to its clients and a client to the next server · ovals = processes, boxes = computers</Label>
    </Svg>
  )
}

/** Week 5 · Pure peer-to-peer vs P2P with a centralized index (Napster), slides 19–20. */
export function P2PDiagram() {
  const peersA: P[] = [[110, 70], [240, 60], [320, 160], [240, 260], [110, 250], [50, 160]]
  const peersB: P[] = [[560, 70], [800, 70], [860, 190], [780, 290], [560, 290], [500, 190]]
  const index: P = [680, 180]
  return (
    <Svg width={900} height={340} label="Left: pure peer-to-peer, every peer runs the application with shared objects and talks directly to others. Right: Napster style, peers ask a central index server who has a file, then download directly from that peer.">
      <Label x={185} y={22} tone="teal" size={13.5} weight={700}>Pure P2P · all peers equal</Label>
      {[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 2], [1, 4], [5, 3]].map(([a, b], i) => <Link key={i} a={peersA[a]} b={peersA[b]} />)}
      {peersA.map((p, i) => (
        <g key={i} data-tone="teal">
          <rect x={p[0] - 40} y={p[1] - 22} width={80} height={44} rx={10} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.5} />
          <text x={p[0]} y={p[1] - 3} textAnchor="middle" fontSize={11.5} fontWeight={700} className="svg-text">{i === 5 ? 'Peer N' : `Peer ${i + 1}`}</text>
          <text x={p[0]} y={p[1] + 12} textAnchor="middle" fontSize={9.5} className="svg-muted">app + objects</text>
        </g>
      ))}
      <line x1={420} y1={20} x2={420} y2={330} className="svg-line" strokeDasharray="6 6" strokeWidth={1.5} />
      <Label x={680} y={22} tone="violet" size={13.5} weight={700}>Napster · central index</Label>
      {peersB.map((p, i) => (
        <line key={`l${i}`} x1={p[0]} y1={p[1]} x2={index[0]} y2={index[1]} className="svg-line" strokeDasharray="5 5" strokeWidth={1.4} />
      ))}
      <g data-tone="violet">
        <circle cx={index[0]} cy={index[1]} r={44} className="svg-solid" />
        <text x={index[0]} y={index[1] - 3} textAnchor="middle" fontSize={12} fontWeight={800} className="svg-surface">Index</text>
        <text x={index[0]} y={index[1] + 13} textAnchor="middle" fontSize={12} fontWeight={800} className="svg-surface">server</text>
      </g>
      <Arrow points={[[560, 270], [800, 92]]} tone="amber" width={2.5} both />
      {peersB.map((p, i) => (
        <g key={i} data-tone="teal">
          <rect x={p[0] - 34} y={p[1] - 18} width={68} height={36} rx={9} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.5} />
          <text x={p[0]} y={p[1] + 4} textAnchor="middle" fontSize={11} fontWeight={700} className="svg-text">Peer</text>
        </g>
      ))}
      <Label x={540} y={326} anchor="start" size={11}>dashed: ① “who has this file?” asked to the index</Label>
      <Label x={540} y={338} anchor="start" tone="amber" size={11} weight={700}>orange: ② file transferred directly peer ↔ peer</Label>
    </Svg>
  )
}

/** Week 5 · Pipe-and-filter: the UNIX example and the slide-25 system in two views. */
export function PipeFilterDiagram() {
  const filter = (x: number, y: number, label: string, w = 120) => (
    <g data-tone="violet">
      <rect x={x} y={y} width={w} height={46} rx={10} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
      <rect x={x - 5} y={y + 18} width={10} height={10} className="svg-surface svg-tone-stroke" strokeWidth={1.4} />
      <rect x={x + w - 5} y={y + 18} width={10} height={10} className="svg-surface svg-tone-stroke" strokeWidth={1.4} />
      <text x={x + w / 2} y={y + 28} textAnchor="middle" fontSize={12.5} fontWeight={700} className="svg-text">{label}</text>
    </g>
  )
  return (
    <Svg width={900} height={430} label="Top: the UNIX pipeline ls invoices, grep August, sort, where each program is a filter and each bar is a pipe. Bottom left: a C&C view where split feeds to-upper and to-lower, whose outputs merge. Bottom right: the module view of the same system, where main uses split, to_upper, to_lower, merge, config and stdio.">
      <Label x={450} y={22} mono size={11}>$ ls invoices | grep -e August | sort</Label>
      {filter(60, 40, 'ls invoices', 150)}
      {filter(330, 40, 'grep -e August', 170)}
      {filter(620, 40, 'sort', 120)}
      <Arrow points={[[215, 63], [325, 63]]} tone="teal" width={3} />
      <Arrow points={[[505, 63], [615, 63]]} tone="teal" width={3} />
      <Arrow points={[[745, 63], [840, 63]]} tone="teal" width={3} />
      <Label x={270} y={54} tone="teal" size={13} weight={800}>|</Label>
      <Label x={560} y={54} tone="teal" size={13} weight={800}>|</Label>
      <Label x={795} y={54} size={11}>screen</Label>
      <Label x={450} y={112} size={11.5}>filters = programs that transform a stream · pipes = conduits that carry it · squares = ports</Label>

      <line x1={20} y1={130} x2={880} y2={130} className="svg-line" strokeDasharray="6 6" strokeWidth={1.2} />
      <Label x={230} y={156} tone="violet" size={13} weight={700}>C&C view (runtime)</Label>
      {filter(30, 250, 'Split', 90)}
      {filter(170, 190, 'To-upper', 110)}
      {filter(170, 310, 'To-lower', 110)}
      {filter(330, 250, 'Merge', 90)}
      <Arrow points={[[125, 268], [165, 213]]} tone="teal" />
      <Arrow points={[[125, 278], [165, 333]]} tone="teal" />
      <Arrow points={[[285, 213], [325, 268]]} tone="teal" />
      <Arrow points={[[285, 333], [325, 278]]} tone="teal" />
      <Label x={230} y={392} size={11}>filters run concurrently on the stream</Label>

      <line x1={450} y1={150} x2={450} y2={420} className="svg-line" strokeDasharray="6 6" strokeWidth={1.2} />
      <Label x={675} y={156} tone="blue" size={13} weight={700}>Module view (code) of the same system</Label>
      <Box x={490} y={268} w={110} h={44} tone="blue" title="main" />
      {['split', 'to_upper', 'to_lower', 'merge', 'config', 'stdio'].map((m, i) => {
        const y = 176 + i * 38
        return (
          <g key={m}>
            <Arrow points={[[600, 290], [708, y + 15]]} tone="blue" dashed />
            <Box x={710} y={y} w={150} h={30} tone={i < 4 ? 'blue' : 'lime'} title={m} titleSize={12} />
          </g>
        )
      })}
      <Label x={675} y={418} size={11}>arrow = “X uses Y”</Label>
    </Svg>
  )
}

/** Week 5 · Messaging: clients drop messages in a queue and move on; servers take them later (slide 27). */
export function MessagingDiagram() {
  return (
    <Svg width={900} height={300} label="Clients put messages into a queue and continue without waiting. The queue stores each message until a server removes it. Queues can be replicated across messaging servers.">
      {[40, 120, 200].map((y, i) => (
        <g key={y}>
          <Box x={20} y={y} w={140} h={50} tone="blue" title={`Client ${i + 1}`} titleSize={13} />
          <Arrow points={[[160, y + 25], [318, 140]]} tone="blue" />
        </g>
      ))}
      <g data-tone="violet">
        <rect x={320} y={100} width={260} height={80} rx={40} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.8} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={350 + i * 42} y={124} width={32} height={32} rx={6} className="svg-solid" opacity={0.75} />
        ))}
        <text x={450} y={208} textAnchor="middle" fontSize={13} fontWeight={800} className="svg-tone-text">Queue</text>
      </g>
      {[70, 170].map((y, i) => (
        <g key={y}>
          <Arrow points={[[582, 140], [738, y + 25]]} tone="teal" />
          <Box x={740} y={y} w={140} h={50} tone="teal" title={`Server ${i + 1}`} titleSize={13} />
        </g>
      ))}
      <Label x={240} y={20} tone="blue" size={11.5} weight={700}>① write the message, then continue</Label>
      <Label x={240} y={36} size={11}>no waiting for a reply (asynchronous)</Label>
      <Label x={450} y={236} size={11.5}>② stored until an application removes it</Label>
      <Label x={660} y={36} tone="teal" size={11.5} weight={700}>③ servers take messages when ready</Label>
      <Label x={450} y={280} tone="violet" size={11.5} weight={700}>availability: queues can be replicated across messaging servers</Label>
    </Svg>
  )
}
