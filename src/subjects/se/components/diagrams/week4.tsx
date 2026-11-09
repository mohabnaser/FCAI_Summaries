import type { Tone } from '../../types'
import { Arrow, Box, Label, Lollipop, Node3D, Socket, Svg } from './kit'

/** A book shape: a rounded rectangle with a darker spine on the left. */
function Book({ x, y, w, h, tone, lines }: { x: number; y: number; w: number; h: number; tone: Tone; lines: string[] }) {
  return (
    <g data-tone={tone}>
      <rect x={x} y={y} width={w} height={h} rx={6} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
      <rect x={x} y={y} width={10} height={h} rx={3} className="svg-solid" opacity={0.85} />
      {lines.map((line, i) => (
        <text key={i} x={x + 8 + (w - 8) / 2} y={y + h / 2 - ((lines.length - 1) * 16) / 2 + i * 16 + 4} textAnchor="middle" fontSize={12} fontWeight={i === 0 ? 700 : 400} className={i === 0 ? 'svg-text' : 'svg-muted'}>
          {line}
        </text>
      ))}
    </g>
  )
}

/** Week 4 · An architecture document = several views + documentation beyond views (slide 1). */
export function ViewsEquationDiagram() {
  return (
    <Svg width={900} height={200} label="Software architecture for system XYZ equals part 1 view plus part 2 view plus up to part n view plus documentation beyond views.">
      <Book x={10} y={30} w={170} h={140} tone="violet" lines={['Software', 'Architecture', 'for System XYZ']} />
      <Label x={200} y={110} size={28} weight={700}>=</Label>
      <Book x={222} y={50} w={118} h={100} tone="blue" lines={['Part 1', 'a view']} />
      <Label x={354} y={108} size={22} weight={700}>+</Label>
      <Book x={370} y={50} w={118} h={100} tone="blue" lines={['Part 2', 'a view']} />
      <Label x={512} y={108} size={18} weight={700}>+ … +</Label>
      <Book x={540} y={50} w={118} h={100} tone="blue" lines={['Part n', 'a view']} />
      <Label x={674} y={108} size={22} weight={700}>+</Label>
      <Book x={690} y={40} w={200} h={120} tone="teal" lines={['Part n+1', 'documentation', 'beyond views']} />
    </Svg>
  )
}

/** Week 4 · One system, three kinds of structure: three lenses on the same thing. */
export function ThreeStructuresDiagram() {
  const cols: Array<{ x: number; tone: Tone; title: string; q: string; el: string; rel: string; styles: string }> = [
    { x: 20, tone: 'blue', title: 'Module structures', q: 'How is it built as code?', el: 'modules (units of implementation)', rel: 'is-part-of · uses · is-a', styles: 'decomposition · uses · generalization · data model' },
    { x: 315, tone: 'violet', title: 'Component-and-connector', q: 'How does it behave at runtime?', el: 'components + connectors', rel: 'attachment (who talks to whom)', styles: 'client-server · pipes · queues · concurrency' },
    { x: 610, tone: 'amber', title: 'Allocation structures', q: 'Where does it live and who builds it?', el: 'software + environment elements', rel: 'allocated-to', styles: 'deployment · install · work assignment' },
  ]
  return (
    <Svg width={900} height={330} label="One system seen through three kinds of structures: module structures answer how it is built, component-and-connector structures how it behaves at runtime, and allocation structures where it lives.">
      <g data-tone="teal">
        <rect x={360} y={14} width={180} height={46} rx={23} className="svg-solid" />
        <text x={450} y={43} textAnchor="middle" fontSize={15} fontWeight={800} className="svg-surface">ONE SYSTEM</text>
      </g>
      {cols.map((col) => (
        <g key={col.title}>
          <Arrow points={[[450, 60], [col.x + 135, 96]]} tone={col.tone} />
          <g data-tone={col.tone}>
            <rect x={col.x} y={100} width={270} height={214} rx={14} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
            <text x={col.x + 135} y={128} textAnchor="middle" fontSize={15} fontWeight={800} className="svg-tone-text">{col.title}</text>
            <text x={col.x + 135} y={152} textAnchor="middle" fontSize={13} fontWeight={700} className="svg-text">{col.q}</text>
          </g>
          {[
            ['ELEMENTS', col.el],
            ['RELATIONS', col.rel],
            ['STYLES / EXAMPLES', col.styles],
          ].map(([k, v], i) => (
            <g key={k}>
              <text x={col.x + 16} y={186 + i * 44} fontSize={10} className="svg-mono">{k}</text>
              <text x={col.x + 16} y={204 + i * 44} fontSize={12} className="svg-text">{v}</text>
            </g>
          ))}
        </g>
      ))}
    </Svg>
  )
}

/** Week 4 · Module vs component: one Client module becomes ten client components at runtime (slide 8). */
export function ModuleVsComponentDiagram() {
  const n = 10
  const cx = 670
  const cy = 175
  return (
    <Svg width={900} height={330} label="Decomposition view: a system made of two modules, Client and Server. Client-server view: ten client components C1 to C10 all talking to one server component S1. One module can become many components.">
      <Label x={190} y={26} tone="blue" size={14} weight={700}>Decomposition view · modules (code)</Label>
      <g data-tone="blue">
        <rect x={40} y={50} width={300} height={220} rx={12} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
        <text x={60} y={76} fontSize={13} fontWeight={700} className="svg-text">System</text>
      </g>
      <Box x={70} y={110} w={110} h={120} tone="blue" title="Client" lines={['module']} />
      <Box x={200} y={110} w={110} h={120} tone="teal" title="Server" lines={['module']} />
      <Label x={190} y={300} size={12}>2 modules</Label>

      <line x1={400} y1={20} x2={400} y2={320} className="svg-line" strokeDasharray="6 6" strokeWidth={1.5} />

      <Label x={670} y={26} tone="violet" size={14} weight={700}>Client-server view · components (runtime)</Label>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(a) * 120
        const y = cy + Math.sin(a) * 105
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} className="svg-line" strokeWidth={1.4} />
            <g data-tone="violet">
              <circle cx={x} cy={y} r={19} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.5} />
              <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={700} className="svg-text">{`C${i + 1}`}</text>
            </g>
          </g>
        )
      })}
      <g data-tone="teal">
        <circle cx={cx} cy={cy} r={26} className="svg-solid" />
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize={13} fontWeight={800} className="svg-surface">S1</text>
      </g>
      <Label x={670} y={312} size={12}>1 Client module → 10 client components · lines = request-reply connectors</Label>
    </Svg>
  )
}

/** Week 4 · Decomposition: A contains B–E, and the ATIA-M system as nested modules (slides 13–14). */
export function DecompositionDiagram() {
  return (
    <Svg width={900} height={300} label="Decomposition view: module A contains B, C, D and E. ATIA-M contains Windows apps (common thick-client code, TDDT Windows app, UTMC Windows app), server-side Web modules and server-side Java modules.">
      <g data-tone="blue">
        <rect x={20} y={40} width={230} height={220} rx={12} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
        <text x={36} y={64} fontSize={15} fontWeight={800} className="svg-text">A</text>
      </g>
      {['B', 'C', 'D', 'E'].map((m, i) => (
        <Box key={m} x={40 + (i % 2) * 100} y={84 + Math.floor(i / 2) * 84} w={86} h={66} tone="teal" title={m} />
      ))}
      <Label x={135} y={286} size={11.5}>is-a-part-of · one parent · no loops</Label>

      <g data-tone="violet">
        <rect x={290} y={20} width={590} height={262} rx={14} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
        <text x={308} y={44} fontSize={15} fontWeight={800} className="svg-text">ATIA-M</text>
      </g>
      <g data-tone="blue">
        <rect x={308} y={60} width={554} height={110} rx={12} fill="none" className="svg-tone-stroke" strokeWidth={1.5} />
        <text x={322} y={80} fontSize={12.5} fontWeight={700} className="svg-tone-text">Windows apps</text>
      </g>
      <Box x={322} y={92} w={180} h={62} tone="blue" title="Common code" lines={['for thick clients']} titleSize={12.5} />
      <Box x={514} y={92} w={160} h={62} tone="blue" title="TDDT Windows app" titleSize={12.5} />
      <Box x={686} y={92} w={160} h={62} tone="blue" title="UTMC Windows app" titleSize={12.5} />
      <Box x={308} y={190} w={270} h={70} tone="amber" title="ATIA server-side" lines={['Web modules']} titleSize={13} />
      <Box x={592} y={190} w={270} h={70} tone="rose" title="ATIA server-side" lines={['Java modules']} titleSize={13} />
    </Svg>
  )
}

/** Week 4 · Uses view of ATIA-M (slide 18): who depends on whom. */
export function UsesDiagram() {
  return (
    <Svg width={880} height={290} label="Uses view: the TDDC and UTMC Windows apps use the common thick-client code and the server-side Web modules; the Web modules use the server-side Java modules.">
      <Box x={150} y={20} w={200} h={56} tone="blue" title="TDDC Windows app" titleSize={13} />
      <Box x={530} y={20} w={200} h={56} tone="blue" title="UTMC Windows app" titleSize={13} />
      <Box x={40} y={140} w={240} h={60} tone="teal" title="Common code" lines={['for thick clients']} titleSize={13} />
      <Box x={460} y={140} w={260} h={60} tone="amber" title="ATIA server-side Web modules" titleSize={12.5} />
      <Box x={460} y={226} w={260} h={56} tone="rose" title="ATIA server-side Java modules" titleSize={12.5} />
      <Arrow points={[[220, 76], [170, 138]]} tone="violet" dashed />
      <Arrow points={[[560, 76], [230, 138]]} tone="violet" dashed />
      <Arrow points={[[300, 76], [540, 138]]} tone="violet" dashed />
      <Arrow points={[[630, 76], [610, 138]]} tone="violet" dashed />
      <Arrow points={[[590, 200], [590, 224]]} tone="violet" dashed />
      <Label x={790} y={48} anchor="start" tone="violet" size={12} weight={700}>«uses»</Label>
      <Label x={790} y={66} anchor="start" size={11}>dashed arrow =</Label>
      <Label x={790} y={82} anchor="start" size={11}>“my correctness</Label>
      <Label x={790} y={98} anchor="start" size={11}>depends on yours”</Label>
    </Svg>
  )
}

/** Week 4 · UML component notation: ports, provided (lollipop) and required (socket) interfaces (slide 22). */
export function UmlComponentDiagram() {
  return (
    <Svg width={880} height={330} label="UML component notation. A component has ports with a provided interface drawn as a lollipop and a required interface drawn as a socket. Example: Order System requires CustomerLookup from Customer Repository and ProductAccessor from Inventory System.">
      <Box x={340} y={20} w={200} h={80} tone="violet" title="«component»" lines={['Component']} titleSize={11} />
      <g data-tone="violet">
        <rect x={333} y={53} width={14} height={14} className="svg-solid" />
        <rect x={533} y={53} width={14} height={14} className="svg-solid" />
      </g>
      <Lollipop from={[333, 60]} to={[260, 60]} tone="teal" />
      <Socket from={[547, 60]} at={[620, 60]} tone="amber" />
      <Label x={250} y={96} tone="teal" size={12} weight={700}>provided interface</Label>
      <Label x={250} y={112} size={11}>“I offer this” (lollipop)</Label>
      <Label x={630} y={96} tone="amber" size={12} weight={700}>required interface</Label>
      <Label x={630} y={112} size={11}>“I need this” (socket)</Label>
      <Label x={440} y={124} mono size={10.5}>small squares = ports</Label>

      <Box x={40} y={190} w={200} h={100} tone="blue" title="Order System" />
      <Box x={640} y={170} w={210} h={56} tone="teal" title="Customer Repository" titleSize={13} />
      <Box x={640} y={252} w={210} h={56} tone="teal" title="Inventory System" titleSize={13} />
      <Socket from={[240, 215]} at={[440, 198]} tone="amber" />
      <Lollipop from={[640, 198]} to={[452, 198]} tone="teal" />
      <Label x={446} y={182} size={12} weight={700}>CustomerLookup</Label>
      <Socket from={[240, 265]} at={[440, 280]} tone="amber" />
      <Lollipop from={[640, 280]} to={[452, 280]} tone="teal" />
      <Label x={446} y={308} size={12} weight={700}>ProductAccessor</Label>
    </Svg>
  )
}

/** Week 4 · The vehicle climate-control system in a module view and a C&C view (slides 23–25). */
export function ClimateViewsDiagram() {
  return (
    <Svg width={900} height={400} label="Left, module view: classes Controller, TemperatureSensor, ReferenceModel, Display and Actuator, with Cooler, Heater and Fan specializing Actuator. Right, component-and-connector view: Controller connected to Sensor, Actuator and GUI through sense, actuate and display interfaces.">
      <Label x={215} y={22} tone="blue" size={14} weight={700}>Module view · classes</Label>
      <Box x={150} y={40} w={150} h={56} tone="blue" title="Controller" lines={['+start() +stop()']} titleSize={13} />
      <Box x={10} y={130} w={130} h={52} tone="blue" title="TemperatureSensor" lines={['-senseData']} titleSize={11.5} />
      <Box x={150} y={130} w={150} h={52} tone="blue" title="ReferenceModel" lines={['setRequiredTemp…']} titleSize={12} />
      <Box x={310} y={130} w={110} h={52} tone="blue" title="Display" lines={['+display()']} titleSize={12} />
      <Box x={150} y={226} w={150} h={52} tone="violet" title="Actuator" lines={['+on() +off()']} titleSize={12.5} />
      <Arrow points={[[190, 96], [90, 128]]} />
      <Arrow points={[[225, 96], [225, 128]]} />
      <Arrow points={[[260, 96], [360, 128]]} />
      <Arrow points={[[300, 60], [440, 60], [440, 252], [302, 252]]} />
      {['Cooler', 'Heater', 'Fan'].map((cls, i) => (
        <g key={cls}>
          <Box x={40 + i * 130} y={330} w={110} h={46} tone="violet" title={cls} lines={cls === 'Fan' ? ['-speed'] : []} titleSize={12} />
          <polyline points={`${95 + i * 130},330 ${95 + i * 130},310 225,310 225,292`} fill="none" className="svg-ink-stroke" strokeWidth={1.6} />
        </g>
      ))}
      <g>
        <polygon points="225,279 217,292 233,292" className="svg-surface svg-ink-stroke" strokeWidth={1.6} />
      </g>
      <Label x={400} y={300} anchor="start" size={11}>△ = “is a kind of”</Label>

      <line x1={470} y1={14} x2={470} y2={390} className="svg-line" strokeDasharray="6 6" strokeWidth={1.5} />

      <Label x={685} y={22} tone="violet" size={14} weight={700}>C&C view · runtime components</Label>
      <Box x={605} y={170} w={160} h={64} tone="violet" title="Controller" />
      <Box x={520} y={44} w={140} h={50} tone="teal" title="Sensor" />
      <Box x={720} y={44} w={140} h={50} tone="amber" title="GUI" />
      <Box x={605} y={316} w={160} h={50} tone="rose" title="Actuator" />
      <Socket from={[640, 170]} at={[608, 118]} tone="teal" />
      <Lollipop from={[590, 94]} to={[604, 108]} tone="teal" />
      <Label x={560} y={140} size={11.5} weight={700}>sense</Label>
      <Socket from={[730, 170]} at={[762, 118]} tone="amber" />
      <Lollipop from={[790, 94]} to={[772, 108]} tone="amber" />
      <Label x={812} y={140} size={11.5} weight={700}>display</Label>
      <Socket from={[685, 234]} at={[685, 280]} tone="rose" />
      <Lollipop from={[685, 316]} to={[685, 292]} tone="rose" />
      <Label x={735} y={290} size={11.5} weight={700}>actuate</Label>
      <Label x={685} y={388} size={11}>simplified relationships, drawn with lollipop/socket notation</Label>
    </Svg>
  )
}

/** Week 4 · The three allocation styles (slide 28). */
export function AllocationStylesDiagram() {
  return (
    <Svg width={900} height={300} label="Software elements from module or C&C views are allocated to environmental elements: the deployment style maps them to a computing platform, the install style to a production environment, and the work assignment style to a development organization.">
      <Box x={330} y={110} w={240} h={80} tone="violet" title="Software elements" lines={['from module or C&C views']} />
      {[
        { x: 20, y: 30, style: 'Deployment style', env: 'Computing platform', sub: 'servers, CPUs, networks', tone: 'blue' as Tone, from: [330, 130] as [number, number], to: [262, 66] as [number, number] },
        { x: 640, y: 30, style: 'Install style', env: 'Production environment', sub: 'files & folders', tone: 'teal' as Tone, from: [570, 130] as [number, number], to: [638, 66] as [number, number] },
        { x: 330, y: 220, style: 'Work assignment style', env: 'Development organization', sub: 'teams & people', tone: 'amber' as Tone, from: [450, 190] as [number, number], to: [450, 218] as [number, number] },
      ].map((t) => (
        <g key={t.style}>
          <Arrow points={[t.from, t.to]} tone={t.tone} />
          <Box x={t.x} y={t.y} w={240} h={70} tone={t.tone} title={t.env} lines={[t.sub]} titleSize={13.5} />
          <Label x={t.x + 120} y={t.y - 8} tone={t.tone} size={12} weight={700}>{t.style}</Label>
        </g>
      ))}
      <Label x={450} y={100} mono size={10.5}>relation: allocated-to</Label>
    </Svg>
  )
}

/** Week 4 · UML deployment diagrams (slides 30–31). */
export function DeploymentDiagram() {
  return (
    <Svg width={900} height={360} label="Deployment view: an internet user PC and an admin PC connect to a Windows application server running WebSphere with EnterpriseWebApp.ear, which talks to a Linux database server. Right: shopping.war inside Apache Tomcat inside SUSE Linux on a Sun Fire server.">
      <Node3D x={20} y={50} w={150} h={60} tone="blue" title="Internet user PC" />
      <Node3D x={20} y={240} w={170} h={92} tone="blue" stereotype="Win desktop" title="Admin user PC">
        <Box x={34} y={286} w={142} h={34} tone="amber" title="app-client.jar" titleSize={11.5} />
      </Node3D>
      <Node3D x={270} y={100} w={210} h={160} tone="violet" stereotype="Win server" title="Application server">
        <g data-tone="teal">
          <rect x={286} y={150} width={178} height={96} rx={8} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.4} />
          <text x={375} y={166} textAnchor="middle" fontSize={10} className="svg-mono">«execution environment»</text>
          <text x={375} y={182} textAnchor="middle" fontSize={12} fontWeight={700} className="svg-text">WebSphere</text>
        </g>
        <Box x={300} y={194} w={150} h={38} tone="amber" title="EnterpriseWebApp.ear" titleSize={11} />
      </Node3D>
      <Node3D x={540} y={140} w={130} h={74} tone="rose" stereotype="linux server" title="Database server" />
      <line x1={170} y1={80} x2={270} y2={140} className="svg-ink-stroke" strokeWidth={1.6} />
      <Label x={226} y={98} mono size={10}>«internet»</Label>
      <line x1={190} y1={286} x2={270} y2={230} className="svg-ink-stroke" strokeWidth={1.6} />
      <Label x={236} y={278} mono size={10}>«intranet»</Label>
      <line x1={480} y1={177} x2={540} y2={177} className="svg-ink-stroke" strokeWidth={1.6} />
      <Label x={345} y={300} size={11}>«artifact» files are «deploy»-ed onto nodes</Label>

      <line x1={694} y1={20} x2={694} y2={350} className="svg-line" strokeDasharray="6 6" strokeWidth={1.5} />
      <Label x={792} y={30} tone="violet" size={12} weight={700}>Nesting</Label>
      {[
        { y: 44, h: 296, st: 'device', t: 'Sun Fire X4150 Server', tone: 'blue' as Tone },
        { y: 92, h: 240, st: 'OS', t: 'SUSE Linux Ent 10', tone: 'violet' as Tone },
        { y: 140, h: 184, st: 'JSP server', t: 'Apache Tomcat 5.5', tone: 'teal' as Tone },
      ].map((n, i) => (
        <g key={n.t} data-tone={n.tone}>
          <rect x={712 + i * 10} y={n.y} width={160 - i * 20} height={n.h} rx={8} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.4} />
          <text x={792} y={n.y + 16} textAnchor="middle" fontSize={10} className="svg-mono">{`«${n.st}»`}</text>
          <text x={792} y={n.y + 32} textAnchor="middle" fontSize={11.5} fontWeight={700} className="svg-text">{n.t}</text>
        </g>
      ))}
      <Box x={742} y={196} w={100} h={56} tone="amber" title="shopping.war" lines={['«web archive»']} titleSize={11.5} />
    </Svg>
  )
}
