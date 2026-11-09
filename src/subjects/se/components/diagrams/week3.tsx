import type { Tone } from '../../types'
import { Arrow, Box, Label, Svg } from './kit'

/** Week 3 · SOLID as a temple: five pillars hold up maintainable software. */
export function SolidTempleDiagram() {
  const pillars: Array<{ letter: string; name: string; meaning: string[]; tone: Tone }> = [
    { letter: 'S', name: 'Single Responsibility', meaning: ['one reason', 'to change'], tone: 'blue' },
    { letter: 'O', name: 'Open–Closed', meaning: ['extend,', 'don’t modify'], tone: 'teal' },
    { letter: 'L', name: 'Liskov Substitution', meaning: ['subtypes keep', 'the contract'], tone: 'violet' },
    { letter: 'I', name: 'Interface Segregation', meaning: ['small, client-', 'specific APIs'], tone: 'amber' },
    { letter: 'D', name: 'Dependency Inversion', meaning: ['depend on', 'abstractions'], tone: 'rose' },
  ]
  return (
    <Svg width={860} height={400} label="A temple whose roof says SOLID, held up by five pillars: single responsibility, open–closed, Liskov substitution, interface segregation and dependency inversion.">
      <g data-tone="blue">
        <polygon points="430,18 820,100 40,100" className="svg-tone-fill svg-tone-stroke" strokeWidth={1.8} />
        <text x={430} y={78} textAnchor="middle" fontSize={34} fontWeight={800} letterSpacing={10} className="svg-text">SOLID</text>
      </g>
      <Label x={430} y={120} mono size={11}>Robert C. Martin (“Uncle Bob”) · Agile Software Development, 2002</Label>
      {pillars.map((pillar, i) => {
        const x = 50 + i * 156
        return (
          <g key={pillar.letter} data-tone={pillar.tone}>
            <rect x={x} y={134} width={140} height={190} rx={10} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.5} />
            <rect x={x + 46} y={150} width={48} height={48} rx={12} className="svg-solid" />
            <text x={x + 70} y={183} textAnchor="middle" fontSize={26} fontWeight={800} className="svg-surface">{pillar.letter}</text>
            {pillar.name.split(' ').map((word, w) => (
              <text key={w} x={x + 70} y={226 + w * 17} textAnchor="middle" fontSize={13} fontWeight={700} className="svg-text">{word}</text>
            ))}
            {pillar.meaning.map((line, l) => (
              <text key={l} x={x + 70} y={276 + l * 16} textAnchor="middle" fontSize={11.5} className="svg-muted">{line}</text>
            ))}
          </g>
        )
      })}
      <g data-tone="teal">
        <rect x={30} y={336} width={800} height={46} rx={10} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.5} />
        <text x={430} y={364} textAnchor="middle" fontSize={13.5} fontWeight={700} className="svg-tone-text">Foundation: code that is maintainable, flexible and extensible</text>
      </g>
    </Svg>
  )
}

/** Week 3 · SRP: one class answering to many actors vs one class per actor. */
export function SrpActorsDiagram() {
  const actors = ['Perception team', 'Functional safety team', 'Diagnostics team', 'HMI / UX team']
  const pairs: Array<{ actor: string; cls: string; tone: Tone }> = [
    { actor: 'Perception team', cls: 'LaneDetector', tone: 'blue' },
    { actor: 'Diagnostics team', cls: 'DiagnosticEventManager', tone: 'amber' },
    { actor: 'HMI / UX team', cls: 'HudRenderer', tone: 'violet' },
    { actor: 'camera hardware', cls: 'FrontCamera', tone: 'teal' },
  ]
  return (
    <Svg width={880} height={360} label="Before: four teams all request changes to one super class, so it has four reasons to change. After: each team owns its own class.">
      <Label x={200} y={26} tone="rose" size={14} weight={700}>Before · one class, four actors</Label>
      {actors.map((actor, i) => (
        <g key={actor}>
          <Box x={16} y={50 + i * 70} w={170} h={48} tone="rose" title={actor} titleSize={12} />
          <Arrow points={[[186, 74 + i * 70], [262, 175]]} tone="rose" />
        </g>
      ))}
      <Box x={264} y={130} w={150} h={90} tone="rose" solid title="Super-ECU class" titleSize={13} />
      <Label x={339} y={246} tone="rose" size={11} weight={700}>4 reasons to change</Label>
      <Label x={339} y={262} size={11}>a HUD change can break</Label>
      <Label x={339} y={276} size={11}>lane keeping</Label>

      <line x1={440} y1={20} x2={440} y2={340} className="svg-line" strokeDasharray="6 6" strokeWidth={1.5} />

      <Label x={665} y={26} tone="teal" size={14} weight={700}>After · one class, one actor</Label>
      {pairs.map((pair, i) => (
        <g key={pair.cls}>
          <Label x={560} y={80 + i * 70} anchor="end" size={12} weight={600}>{pair.actor}</Label>
          <Arrow points={[[568, 76 + i * 70], [618, 76 + i * 70]]} tone={pair.tone} />
          <Box x={620} y={52 + i * 70} w={240} h={48} tone={pair.tone} title={pair.cls} titleSize={13} />
        </g>
      ))}
    </Svg>
  )
}

/** Week 3 · OCP: the manager is closed; new features plug in through the interface. */
export function OcpPluginDiagram() {
  const plugins: Array<{ name: string; id: string; isNew?: boolean }> = [
    { name: 'EmergencyBraking', id: 'AEB' },
    { name: 'LaneKeepAssist', id: 'LKA' },
    { name: 'AdaptiveCruise', id: 'ACC' },
    { name: 'BlindSpotDetection', id: 'BSD', isNew: true },
  ]
  return (
    <Svg width={860} height={380} label="AdasFeatureManager is closed for modification and only uses the AdasFunction interface; feature classes such as emergency braking, lane keeping, adaptive cruise and the new blind-spot detection implement it.">
      <Box x={270} y={20} w={320} h={70} tone="teal" title="AdasFeatureManager" lines={['closed for modification · verified once']} />
      <Arrow points={[[430, 90], [430, 128]]} tone="teal" />
      <Label x={442} y={114} anchor="start" size={11}>uses only the interface</Label>
      <g data-tone="violet">
        <rect x={150} y={130} width={560} height={64} rx={12} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.8} />
        <text x={430} y={156} textAnchor="middle" fontSize={11} className="svg-mono">«interface»</text>
        <text x={430} y={178} textAnchor="middle" fontSize={14} fontWeight={700} className="svg-text">AdasFunction · id() · isAvailable(config) · execute(env, out)</text>
      </g>
      {plugins.map((plugin, i) => {
        const x = 30 + i * 205
        return (
          <g key={plugin.id}>
            <Arrow points={[[x + 92, 274], [x + 92, 198]]} tone={plugin.isNew ? 'amber' : 'violet'} dashed />
            <Box
              x={x}
              y={276}
              w={185}
              h={66}
              tone={plugin.isNew ? 'amber' : 'blue'}
              dashed={plugin.isNew}
              title={plugin.name}
              lines={[plugin.isNew ? `${plugin.id} · NEW class` : plugin.id]}
              titleSize={12.5}
            />
          </g>
        )
      })}
      <Label x={430} y={366} tone="amber" size={12} weight={700}>open for extension: a new feature = a new class that implements AdasFunction</Label>
    </Svg>
  )
}

/** Week 3 · LSP: why isFree(x, y) has no honest meaning for a 3D grid, and what isDrivable(x, y, h) answers. */
export function LspHeightDiagram() {
  const ground = 300
  const layers = [0, 1, 2, 3, 4, 5]
  return (
    <Svg width={880} height={410} label="Side view of the road with height layers. A barrier at roof height must block the car; an overhead gantry far above the car must not. isFree on the ground layer misses the barrier; isFree on all layers brakes for the gantry; isDrivable with the vehicle height gets both right.">
      {layers.map((z) => (
        <g key={z}>
          <line x1={60} y1={ground - z * 40} x2={860} y2={ground - z * 40} className="svg-line" strokeWidth={1} strokeDasharray={z === 0 ? undefined : '3 6'} />
          <Label x={48} y={ground - z * 40 - 14} anchor="end" mono size={10}>{`z${z}`}</Label>
        </g>
      ))}
      <line x1={60} y1={ground} x2={860} y2={ground} className="svg-ink-stroke" strokeWidth={2.5} />
      <text x={20} y={150} transform="rotate(-90 20 150)" textAnchor="middle" fontSize={11} className="svg-muted">height layers</text>

      {/* the car */}
      <g data-tone="blue">
        <rect x={90} y={ground - 50} width={170} height={36} rx={10} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.8} />
        <path d={`M 125 ${ground - 50} L 150 ${ground - 82} L 220 ${ground - 82} L 240 ${ground - 50} Z`} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.8} />
        <circle cx={130} cy={ground - 12} r={12} className="svg-solid" />
        <circle cx={222} cy={ground - 12} r={12} className="svg-solid" />
      </g>
      <g data-tone="teal">
        <line x1={70} y1={ground - 96} x2={860} y2={ground - 96} className="svg-tone-stroke" strokeWidth={1.8} strokeDasharray="8 5" />
      </g>
      <Label x={856} y={ground - 102} anchor="end" tone="teal" size={11} weight={700}>vehicle height + safety clearance</Label>

      {/* roof-height barrier */}
      <g data-tone="rose">
        <rect x={400} y={ground - 150} width={14} height={150} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.5} />
        <rect x={414} y={ground - 92} width={120} height={14} className="svg-solid" />
      </g>
      <Label x={470} y={ground - 162} tone="rose" size={12} weight={700}>barrier at roof height</Label>
      <Label x={470} y={ground - 178} size={11}>must BLOCK the car</Label>

      {/* overhead gantry */}
      <g data-tone="violet">
        <rect x={640} y={ground - 200} width={12} height={200} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.5} />
        <rect x={652} y={ground - 200} width={170} height={26} rx={4} className="svg-solid" />
      </g>
      <Label x={737} y={ground - 210} tone="violet" size={12} weight={700}>overhead gantry / sign</Label>
      <Label x={737} y={ground - 226} size={11}>car fits under it → FREE</Label>

      {[
        { y: 334, tone: 'rose' as const, text: 'isFree(x, y) on the ground layer only → barrier missed → collision (false negative)' },
        { y: 356, tone: 'amber' as const, text: 'isFree(x, y) over all layers → gantry blocks the lane → phantom braking (false positive)' },
        { y: 384, tone: 'teal' as const, text: '✓ isDrivable(x, y, vehicleHeightM) checks layers up to height + clearance → barrier blocked, gantry free' },
      ].map((row) => (
        <Label key={row.y} x={60} y={row.y} anchor="start" tone={row.tone} size={12.5} weight={700}>{row.text}</Label>
      ))}
    </Svg>
  )
}

/** Week 3 · ISP: four client-specific interfaces and who implements which. */
export function IspSplitDiagram() {
  const ifaces: Array<{ name: string; methods: string; client: string; tone: Tone; cx: number }> = [
    { name: 'MotionControl', methods: 'steer · accelerate · brake', client: 'VehicleMotionController', tone: 'blue', cx: 0 },
    { name: 'AttentionMonitorable', methods: 'drowsiness · gaze · hands', client: 'DriverMonitoringSystem', tone: 'violet', cx: 0 },
    { name: 'SelfDiagnosable', methods: 'runSelfDiagnosis', client: 'health / safety supervisor', tone: 'amber', cx: 0 },
    { name: 'OtaUpdatable', methods: 'installOtaUpdate', client: 'OtaUpdateManager', tone: 'rose', cx: 0 },
  ]
  ifaces.forEach((iface, i) => (iface.cx = 30 + i * 212 + 97))
  const human = { x: 90, cx: 205 }
  const stack = { x: 520, cx: 655 }
  return (
    <Svg width={880} height={380} label="Four small interfaces, each with one client. The human driver model implements motion control and attention monitoring; the automated driving stack implements motion control, self-diagnosis and OTA updates.">
      <Label x={440} y={22} mono size={11}>ONE FAT VehicleOperator → FOUR CLIENT-SPECIFIC INTERFACES</Label>
      {ifaces.map((iface) => (
        <g key={iface.name}>
          <Label x={iface.cx} y={52} size={10.5} mono>{`client: ${iface.client}`}</Label>
          <Box x={iface.cx - 97} y={62} w={194} h={70} tone={iface.tone} title={iface.name} lines={[iface.methods]} titleSize={13} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <Arrow key={`h${i}`} points={[[human.cx, 268], [ifaces[i].cx, 136]]} tone="lime" dashed />
      ))}
      {[0, 2, 3].map((i) => (
        <Arrow key={`a${i}`} points={[[stack.cx, 268], [ifaces[i].cx, 136]]} tone="teal" dashed />
      ))}
      <Box x={human.x} y={270} w={230} h={60} tone="lime" solid title="HumanDriverModel" lines={[]} titleSize={13.5} />
      <Box x={stack.x} y={270} w={270} h={60} tone="teal" solid title="AutomatedDrivingStack" titleSize={13.5} />
      <Label x={human.cx} y={352} size={11}>no fake OTA or self-diagnosis</Label>
      <Label x={stack.cx} y={352} size={11}>no fake eyes or hands</Label>
    </Svg>
  )
}

/** Week 3 · DIP: dependencies before (policy → drivers) and after (adapters → policy's abstraction). */
export function DipInversionDiagram() {
  const adapters: Array<{ name: string; sub: string; tone: Tone }> = [
    { name: 'SupplierARadar', sub: 'Adapter · CAN', tone: 'blue' },
    { name: 'SupplierCRadar', sub: 'Adapter · Ethernet', tone: 'blue' },
    { name: 'SupplierBCamera', sub: 'Adapter · mm→m', tone: 'violet' },
    { name: 'SimulatedSensor', sub: 'SIL test bench', tone: 'amber' },
  ]
  return (
    <Svg width={900} height={400} label="Before: SensorFusion depends directly on supplier drivers and buses. After: SensorFusion owns the ObjectSensor interface in its own package; supplier adapters and a simulated sensor implement it, so the dependency arrows point up towards the policy.">
      <Label x={180} y={24} tone="rose" size={14} weight={700}>Before · policy → details</Label>
      <Box x={70} y={44} w={220} h={56} tone="violet" title="SensorFusion" lines={['high-level policy']} />
      <Arrow points={[[140, 100], [100, 168]]} tone="rose" />
      <Arrow points={[[220, 100], [260, 168]]} tone="rose" />
      <Box x={16} y={170} w={160} h={54} tone="rose" title="SupplierARadarDriver" titleSize={11.5} lines={['concrete, new-ed inside']} />
      <Box x={186} y={170} w={160} h={54} tone="rose" title="SupplierBCameraDriver" titleSize={11.5} lines={['concrete, new-ed inside']} />
      <Arrow points={[[96, 224], [96, 270]]} tone="rose" />
      <Arrow points={[[266, 224], [266, 270]]} tone="rose" />
      <Box x={16} y={272} w={160} h={44} tone="rose" title="CAN bus" titleSize={12} />
      <Box x={186} y={272} w={160} h={44} tone="rose" title="Automotive Ethernet" titleSize={12} />
      <Label x={180} y={346} size={11}>every supplier or bus change</Label>
      <Label x={180} y={362} size={11}>re-opens the fusion algorithm</Label>

      <line x1={372} y1={14} x2={372} y2={386} className="svg-line" strokeDasharray="6 6" strokeWidth={1.5} />

      <Label x={640} y={24} tone="teal" size={14} weight={700}>After · details → policy’s abstraction</Label>
      <g data-tone="teal">
        <rect x={420} y={40} width={450} height={110} rx={14} fill="none" className="svg-tone-stroke" strokeWidth={1.4} strokeDasharray="6 5" />
      </g>
      <Label x={432} y={58} anchor="start" mono size={10.5}>package adas.fusion</Label>
      <Box x={436} y={70} w={170} h={64} tone="violet" title="SensorFusion" lines={['gets sensors injected']} />
      <Arrow points={[[606, 102], [654, 102]]} tone="violet" />
      <Box x={656} y={70} w={200} h={64} tone="teal" title="ObjectSensor" lines={['«interface» owned by policy']} titleSize={13.5} />
      {adapters.map((adapter, i) => {
        const x = 390 + i * 126
        return (
          <g key={adapter.name}>
            <Arrow points={[[x + 58, 248], [756, 138]]} tone={adapter.tone} dashed />
            <Box x={x} y={250} w={116} h={60} tone={adapter.tone} title={adapter.name} lines={[adapter.sub]} titleSize={11} />
          </g>
        )
      })}
      <Label x={640} y={338} tone="teal" size={11.5} weight={700}>source dependencies point UP, against the call direction</Label>
      <Label x={640} y={356} size={11}>new supplier / new bus / simulation = a new adapter; SensorFusion untouched</Label>
    </Svg>
  )
}
