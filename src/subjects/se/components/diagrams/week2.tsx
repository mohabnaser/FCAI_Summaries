import { Arrow, Box, Curve, Label, Svg } from './kit'

/** Week 2 · Essential complexity is fixed; accidental complexity is what engineering removes. */
export function ComplexityDiagram() {
  const rows = [
    { y: 74, label: 'Undisciplined team', accidental: 330 },
    { y: 170, label: 'Disciplined engineering', accidental: 60 },
  ]
  return (
    <Svg width={820} height={270} label="Two bars: the essential part is the same size in both; the accidental part is large for an undisciplined team and small with disciplined engineering.">
      <Label x={330} y={30} tone="violet" size={12} weight={700}>essential: same size in both — the problem itself</Label>
      <Label x={630} y={30} tone="rose" size={12} weight={700}>accidental: self-inflicted</Label>
      {rows.map((row) => (
        <g key={row.label}>
          <Label x={30} y={row.y + 30} anchor="start" size={13} weight={600}>{row.label}</Label>
          <Box x={220} y={row.y} w={220} h={48} tone="violet" title="Essential" titleSize={13} />
          <Box x={444} y={row.y} w={row.accidental} h={48} tone="rose" title={row.accidental > 100 ? 'Accidental' : 'Acc.'} titleSize={13} />
        </g>
      ))}
      <line x1={442} y1={52} x2={442} y2={236} className="svg-line" strokeDasharray="5 5" strokeWidth={1.5} />
      <Arrow points={[[770, 126], [520, 160]]} tone="teal" />
      <Label x={640} y={250} tone="teal" size={13} weight={700}>our whole discipline = shrinking this part</Label>
    </Svg>
  )
}

/** Week 2 · Architecture sits inside design; both are one fabric of decisions. */
export function DesignOvalsDiagram() {
  return (
    <Svg width={860} height={330} label="A large oval labelled software design contains a smaller oval labelled software architecture.">
      <g data-tone="blue">
        <ellipse cx={290} cy={165} rx={270} ry={145} className="svg-tone-fill svg-tone-stroke" strokeWidth={2} />
        <text x={290} y={58} textAnchor="middle" fontSize={17} fontWeight={700} className="svg-tone-text">Software Design</text>
      </g>
      <g data-tone="amber">
        <ellipse cx={290} cy={185} rx={150} ry={82} className="svg-tone-fill svg-tone-stroke" strokeWidth={2} />
        <text x={290} y={180} textAnchor="middle" fontSize={16} fontWeight={700} className="svg-tone-text">Software Architecture</text>
        <text x={290} y={202} textAnchor="middle" fontSize={12} className="svg-muted">the decisions hard to change later</text>
      </g>
      <Arrow points={[[600, 150], [442, 180]]} tone="amber" />
      <Label x={610} y={130} anchor="start" tone="amber" size={13} weight={700}>Architectural details</Label>
      <Label x={610} y={150} anchor="start" size={12}>needed to reason about</Label>
      <Label x={610} y={166} anchor="start" size={12}>the system and its failures</Label>
      <Arrow points={[[600, 262], [520, 252]]} tone="blue" />
      <Label x={610} y={250} anchor="start" tone="blue" size={13} weight={700}>Design details</Label>
      <Label x={610} y={270} anchor="start" size={12}>needed to build the system,</Label>
      <Label x={610} y={286} anchor="start" size={12}>not to reason about failures</Label>
    </Svg>
  )
}

/** Week 2 · What the architect shapes vs what the developer shapes (slide 7). */
export function ArchitectDeveloperDiagram() {
  const left = ['Architecture characteristics', 'Architecture style', 'Component structure']
  const right = ['Class design', 'User interface', 'Source code']
  const ys = [40, 130, 220]
  return (
    <Svg width={860} height={310} label="The architect works on architecture characteristics, style and component structure; the developer works on class design, user interface and source code; the two sides are connected.">
      <Box x={20} y={128} w={140} h={64} tone="rose" solid title="Architect" />
      {left.map((label, index) => (
        <g key={label}>
          <Arrow points={[[160, 160], [210, ys[index] + 30]]} tone="rose" />
          <Box x={212} y={ys[index]} w={200} h={60} tone="rose" title={label} titleSize={13} />
        </g>
      ))}
      <line x1={430} y1={20} x2={430} y2={290} className="svg-line" strokeDasharray="6 6" strokeWidth={1.5} />
      <Arrow points={[[414, 300], [446, 300]]} both tone="violet" />
      {right.map((label, index) => (
        <g key={label}>
          <Box x={448} y={ys[index]} w={200} h={60} tone="lime" title={label} titleSize={13} />
          <Arrow points={[[698, 160], [650, ys[index] + 30]]} tone="lime" />
        </g>
      ))}
      <Box x={700} y={128} w={140} h={64} tone="lime" solid title="Developer" />
    </Svg>
  )
}

/** Week 2 · Cost of each new feature over a system's life. */
export function CostCurveDiagram() {
  const x0 = 80
  const y0 = 280
  const width = 680
  const k = 3.2
  const points = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40
    const y = y0 - 30 - 210 * ((Math.exp(k * t) - 1) / (Math.exp(k) - 1))
    return `${(x0 + t * width).toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  return (
    <Svg width={820} height={330} label="Cost per feature over time: flat for good design, rising exponentially for bad design.">
      <Arrow points={[[x0, y0], [x0 + width + 20, y0]]} />
      <Arrow points={[[x0, y0], [x0, 30]]} />
      <text x={30} y={160} transform="rotate(-90 30 160)" textAnchor="middle" fontSize={12} className="svg-muted">cost to add one feature</text>
      <Label x={x0 + width / 2} y={312} size={12}>features added over the system's life (1st → 100th)</Label>
      <Label x={x0 + 4} y={y0 + 18} anchor="start" mono size={11}>1st</Label>
      <Label x={x0 + width} y={y0 + 18} anchor="end" mono size={11}>100th</Label>
      <g data-tone="rose">
        <polyline points={points} fill="none" className="svg-tone-stroke" strokeWidth={3} strokeLinecap="round" />
      </g>
      <g data-tone="teal">
        <line x1={x0} y1={y0 - 34} x2={x0 + width} y2={y0 - 34} className="svg-tone-stroke" strokeWidth={3} strokeLinecap="round" />
      </g>
      <Label x={x0 + width - 4} y={y0 - 46} anchor="end" tone="teal" size={13} weight={700}>Good design: the 100th feature costs the same as the 1st</Label>
      <Label x={x0 + width - 120} y={48} anchor="end" tone="rose" size={13} weight={700}>Bad design: cost per line grows exponentially</Label>
    </Svg>
  )
}

/** Week 2 · The Eisenhower matrix mapped to software, with the failure mode. */
export function EisenhowerDiagram() {
  const cells = [
    { x: 150, y: 50, tone: 'rose' as const, title: 'Q1 · Urgent & important', lines: ['Critical production bugs'] },
    { x: 474, y: 50, tone: 'teal' as const, title: 'Q2 · Important, not urgent', lines: ['Architecture &', 'structural integrity'] },
    { x: 150, y: 214, tone: 'amber' as const, title: 'Q3 · Urgent, not important', lines: ['Immediate but trivial', 'stakeholder features'] },
    { x: 474, y: 214, tone: 'violet' as const, title: 'Q4 · Neither', lines: ['All other', 'nice-to-have stuff'] },
  ]
  return (
    <Svg width={820} height={430} label="Two-by-two matrix: urgent or not by important or not. Q2 is architecture. The failure mode is putting Q3 above Q2.">
      <Label x={310} y={36} mono size={11}>URGENT</Label>
      <Label x={634} y={36} mono size={11}>NOT URGENT</Label>
      <text x={124} y={132} transform="rotate(-90 124 132)" textAnchor="middle" fontSize={11} className="svg-mono">IMPORTANT</text>
      <text x={124} y={296} transform="rotate(-90 124 296)" textAnchor="middle" fontSize={11} className="svg-mono">NOT IMPORTANT</text>
      {cells.map((cell) => (
        <Box key={cell.title} x={cell.x} y={cell.y} w={316} h={156} tone={cell.tone} title={cell.title} lines={cell.lines} titleSize={14} />
      ))}
      <Label x={632} y={190} tone="teal" size={11} weight={700}>★ where architecture lives</Label>
      <Curve from={[330, 250]} control={[440, 130]} to={[560, 150]} tone="rose" dashed />
      <g data-tone="rose">
        <rect x={330} y={384} width={480} height={34} rx={10} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.4} />
        <text x={570} y={406} textAnchor="middle" fontSize={12.5} fontWeight={700} className="svg-tone-text">Failure mode: ranking Q3 above Q2 — this destroys companies</text>
      </g>
    </Svg>
  )
}

/** Week 2 · Cost-friction: in a healthy system only scope sets the cost, never shape. */
export function ScopeShapeDiagram() {
  const panels = [
    { x: 20, title: 'Healthy system', sub: 'cost depends on scope only', tone: 'teal' as const, b: 90 },
    { x: 430, title: 'Decaying system', sub: 'the shape of the request drives the cost', tone: 'rose' as const, b: 190 },
  ]
  return (
    <Svg width={820} height={350} label="Two requests of the same scope. In a healthy system they cost the same; in a decaying system the awkwardly shaped one costs far more.">
      {panels.map((panel) => (
        <g key={panel.title}>
          <rect x={panel.x} y={16} width={370} height={320} rx={16} className="svg-surface svg-line" strokeWidth={1.4} />
          <Label x={panel.x + 185} y={44} tone={panel.tone} size={15} weight={700}>{panel.title}</Label>
          <Label x={panel.x + 185} y={64} size={12}>{panel.sub}</Label>
          <line x1={panel.x + 40} y1={280} x2={panel.x + 330} y2={280} className="svg-line" strokeWidth={1.5} />
          <g data-tone="blue">
            <rect x={panel.x + 80} y={280 - 90} width={70} height={90} rx={6} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.5} />
          </g>
          <g data-tone={panel.tone}>
            <rect x={panel.x + 220} y={280 - panel.b} width={70} height={panel.b} rx={6} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.5} />
          </g>
          <Label x={panel.x + 115} y={300} size={12} weight={600}>Request A</Label>
          <Label x={panel.x + 115} y={316} size={11}>fits the structure</Label>
          <Label x={panel.x + 255} y={300} size={12} weight={600}>Request B</Label>
          <Label x={panel.x + 255} y={316} size={11}>cuts across it</Label>
          <Label x={panel.x + 185} y={86} mono size={10}>same scope (size) for A and B</Label>
        </g>
      ))}
    </Svg>
  )
}

/** Week 2 · The knowledge pyramid and the direction architectural thinking pushes. */
export function KnowledgePyramidDiagram() {
  const edge = (y: number) => [300 - (y - 30) * (260 / 320), 300 + (y - 30) * (260 / 320)]
  const [l1, r1] = edge(130)
  const [l2, r2] = edge(230)
  return (
    <Svg width={860} height={380} label="Pyramid with three tiers: top, stuff you know; middle, stuff you know you don't know; bottom, stuff you don't know you don't know. Architectural thinking pushes the middle tier down.">
      <g data-tone="violet">
        <polygon points={`300,30 ${r1},130 ${l1},130`} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
      </g>
      <g data-tone="blue">
        <polygon points={`${l1},130 ${r1},130 ${r2},230 ${l2},230`} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
      </g>
      <g data-tone="rose">
        <polygon points={`${l2},230 ${r2},230 560,350 40,350`} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} strokeDasharray="6 5" />
      </g>
      <Label x={300} y={104} size={12} weight={700} tone="violet">Stuff you know</Label>
      <Label x={300} y={121} size={10}>technical depth</Label>
      <Label x={300} y={180} size={13} weight={700} tone="blue">Stuff you know you don't know</Label>
      <Label x={300} y={198} size={11}>technical breadth (aware of alternatives)</Label>
      <Label x={300} y={290} size={13} weight={700} tone="rose">Stuff you don't know you don't know</Label>
      <Label x={300} y={308} size={11}>unknown unknowns — the danger zone</Label>

      <Arrow points={[[600, 180], [600, 300]]} tone="teal" width={3} />
      <Label x={620} y={190} anchor="start" tone="teal" size={13} weight={700}>Architectural thinking:</Label>
      <Label x={620} y={210} anchor="start" size={12}>push the middle tier down —</Label>
      <Label x={620} y={226} anchor="start" size={12}>turn unknown unknowns</Label>
      <Label x={620} y={242} anchor="start" size={12}>into known unknowns</Label>
      <Label x={620} y={60} anchor="start" tone="violet" size={12} weight={700}>Developer years → grow depth</Label>
      <Label x={620} y={80} anchor="start" tone="blue" size={12} weight={700}>Architect years → grow breadth</Label>
    </Svg>
  )
}

/** Week 2 · Traditional software vs machine learning: the rules move from input to output. */
export function MlInversionDiagram() {
  return (
    <Svg width={860} height={340} label="Traditional software: input plus human-written rules gives output. Machine learning: historical data gives a model, which is the rules.">
      <Label x={30} y={34} anchor="start" mono size={11}>TRADITIONAL SOFTWARE</Label>
      <Box x={30} y={48} w={150} h={64} tone="blue" title="Input" />
      <Label x={205} y={86} size={22} weight={700}>+</Label>
      <Box x={230} y={48} w={220} h={64} tone="violet" title="Rules (code)" lines={['written by human engineers']} />
      <Arrow points={[[450, 80], [520, 80]]} />
      <Box x={522} y={48} w={170} h={64} tone="teal" title="Output" lines={['deterministic']} />

      <Label x={30} y={184} anchor="start" mono size={11}>PRODUCTION MACHINE LEARNING</Label>
      <Box x={30} y={198} w={240} h={64} tone="blue" title="Historical data" lines={['inputs X + known answers Y']} />
      <Arrow points={[[270, 230], [340, 230]]} />
      <Label x={305} y={220} size={11}>training</Label>
      <Box x={342} y={198} w={240} h={64} tone="violet" title="Statistical model" lines={['= probabilistic rules']} />
      <Arrow points={[[582, 230], [640, 230]]} />
      <Box x={642} y={198} w={190} h={64} tone="teal" title="Predictions" lines={['on unseen data']} />

      <Curve from={[400, 114]} control={[470, 156]} to={[462, 196]} tone="violet" dashed />
      <Label x={490} y={156} anchor="start" tone="violet" size={12} weight={700}>the rules move from input → output</Label>

      <g data-tone="rose">
        <rect x={30} y={286} width={800} height={38} rx={10} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.4} />
        <text x={430} y={310} textAnchor="middle" fontSize={13} fontWeight={700} className="svg-tone-text">In ML, data is code: if the data drifts, the logic changes silently</text>
      </g>
    </Svg>
  )
}

/** Week 2 · The architect–developer "circle of life". */
export function CircleOfLifeDiagram() {
  return (
    <Svg width={820} height={310} label="Architect and developer in a loop: decisions and constraints flow one way, feedback from real code flows back.">
      <g data-tone="rose">
        <circle cx={220} cy={155} r={70} className="svg-tone-fill svg-tone-stroke" strokeWidth={2} />
        <text x={220} y={150} textAnchor="middle" fontSize={16} fontWeight={700} className="svg-text">Architect</text>
        <text x={220} y={170} textAnchor="middle" fontSize={11} className="svg-muted">stays hands-on</text>
      </g>
      <g data-tone="lime">
        <circle cx={600} cy={155} r={70} className="svg-tone-fill svg-tone-stroke" strokeWidth={2} />
        <text x={600} y={150} textAnchor="middle" fontSize={16} fontWeight={700} className="svg-text">Developer</text>
        <text x={600} y={170} textAnchor="middle" fontSize={11} className="svg-muted">knows the constraints</text>
      </g>
      <Curve from={[270, 100]} control={[410, 10]} to={[550, 100]} tone="violet" />
      <Label x={410} y={44} size={12} weight={700} tone="violet">decisions · constraints · proven POCs</Label>
      <Curve from={[550, 210]} control={[410, 300]} to={[270, 210]} tone="teal" />
      <Label x={410} y={278} size={12} weight={700} tone="teal">feedback from real code</Label>
      <Label x={410} y={160} mono size={11}>one synchronized loop</Label>
    </Svg>
  )
}
