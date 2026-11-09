import { Arrow, Box, Label, Svg } from './kit'

/** Week 1 · The Initializer/Worker harness, context hygiene and the verification gate. */
export function HarnessDiagram() {
  const workers = [30, 250, 470]
  return (
    <Svg width={860} height={440} label="Initializer agent writes a feature list; workers in fresh contexts share state through git and NOTES.md; a verification gate decides when a feature is done.">
      <rect x={8} y={8} width={844} height={424} rx={20} fill="none" className="svg-line" strokeWidth={1.5} strokeDasharray="7 6" />
      <Label x={28} y={34} anchor="start" mono size={11}>THE HARNESS · deterministic code that keeps the model on track</Label>

      <Box x={30} y={54} w={190} h={84} tone="violet" title="Initializer Agent" lines={['runs once', 'maps the repository']} />
      <Arrow points={[[220, 96], [256, 96]]} tone="violet" />
      <Box x={258} y={54} w={212} h={84} tone="violet" title="feature_list.json" lines={['the to-do list of features', 'every worker reads it']} />
      <Box x={492} y={54} w={186} h={84} tone="lime" title="Context hygiene" lines={['prune dead context', 'load tools on demand']} titleSize={13} />

      {workers.map((x, index) => (
        <g key={x}>
          <Arrow points={[[364, 138], [364, 164], [x + 95, 164], [x + 95, 196]]} tone="violet" />
          <Box x={x} y={198} w={190} h={72} tone="blue" title={`Worker Agent ${index + 1}`} lines={['fresh, clean context window']} />
          <Arrow points={[[x + 95, 272], [x + 95, 330]]} tone="teal" dashed both />
        </g>
      ))}

      <Box x={30} y={332} w={630} h={66} tone="teal" title="Shared memory on disk: git commits + NOTES.md" lines={['each worker writes progress here, the next one reads it — nothing is forgotten']} />

      <Arrow points={[[660, 234], [698, 234]]} tone="amber" />
      <Box x={700} y={192} w={140} h={84} tone="amber" title="Verification" lines={['test suite +', 'strict exit codes']} titleSize={13} />
      <Arrow points={[[770, 192], [770, 142]]} tone="teal" />
      <Label x={782} y={172} anchor="start" tone="teal" size={11} weight={700}>pass</Label>
      <Box x={700} y={56} w={140} h={84} tone="teal" solid title="Feature done ✓" titleSize={13} />
      <Arrow points={[[730, 276], [730, 300], [600, 300], [600, 274]]} tone="rose" />
      <Label x={668} y={318} tone="rose" size={11} weight={700}>fail → not done yet</Label>
    </Svg>
  )
}

/** Week 1 · A closed feedback loop with the three "voices" of PID. */
export function PidLoopDiagram() {
  return (
    <Svg width={820} height={300} label="Closed-loop control: target minus measured value gives the error; the PID controller turns it into a push for the actuator; a sensor measures the result and feeds it back.">
      <Label x={410} y={28} mono size={11}>CLOSED LOOP · measure → compare → correct → measure again …</Label>
      <Box x={16} y={110} w={120} h={70} tone="teal" title="Target" lines={['desired altitude']} />
      <Arrow points={[[136, 145], [182, 145]]} />
      <g data-tone="amber">
        <circle cx={205} cy={145} r={22} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
        <text x={205} y={151} textAnchor="middle" fontSize={18} fontWeight={700} className="svg-text">Σ</text>
      </g>
      <Label x={180} y={124} size={13} weight={700}>+</Label>
      <Label x={190} y={186} size={15} weight={700}>−</Label>
      <Arrow points={[[227, 145], [292, 145]]} tone="rose" />
      <Label x={259} y={136} tone="rose" size={11} weight={700}>error</Label>

      <g data-tone="violet">
        <rect x={294} y={66} width={244} height={158} rx={14} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
        <text x={416} y={90} textAnchor="middle" fontSize={14} fontWeight={700} className="svg-text">PID controller</text>
      </g>
      {[
        { y: 102, letter: 'P', time: 'present', q: 'How far off are we now?', tone: 'blue' as const },
        { y: 140, letter: 'I', time: 'past', q: 'Drifting off for too long?', tone: 'amber' as const },
        { y: 178, letter: 'D', time: 'future', q: 'How fast is the gap closing?', tone: 'teal' as const },
      ].map((row) => (
        <g key={row.letter} data-tone={row.tone}>
          <rect x={306} y={row.y} width={30} height={30} rx={8} className="svg-solid" />
          <text x={321} y={row.y + 21} textAnchor="middle" fontSize={15} fontWeight={800} className="svg-surface">{row.letter}</text>
          <text x={346} y={row.y + 12} fontSize={10} className="svg-tone-text" fontWeight={700}>{row.time.toUpperCase()}</text>
          <text x={346} y={row.y + 26} fontSize={12} className="svg-text">{row.q}</text>
        </g>
      ))}

      <Arrow points={[[538, 145], [570, 145]]} />
      <Box x={572} y={110} w={100} h={70} tone="amber" title="Actuator" lines={['thrust']} />
      <Arrow points={[[672, 145], [702, 145]]} />
      <Box x={704} y={110} w={100} h={70} tone="blue" title="Aircraft" lines={['real altitude']} />
      <Arrow points={[[754, 180], [754, 256], [566, 256]]} />
      <Box x={424} y={232} w={140} h={48} tone="lime" title="Sensor" lines={['measures altitude']} titleSize={13} />
      <Arrow points={[[424, 256], [205, 256], [205, 169]]} />
      <Label x={312} y={248} size={11}>measured value fed back</Label>
    </Svg>
  )
}

/** Week 1 · The slide's sequence diagram of the silent float32 bug. */
export function FloatSequenceDiagram() {
  const lanes = [
    { x: 100, name: 'Sensor', tone: 'lime' as const },
    { x: 310, name: 'AI PID', tone: 'violet' as const },
    { x: 530, name: 'Accumulator (F32)', tone: 'amber' as const },
    { x: 740, name: 'Actuator', tone: 'blue' as const },
  ]
  return (
    <Svg width={840} height={400} label="Sequence: sensor sends a tiny error; the PID adds it to a huge float32 sum; the sum silently stays 100000.0; the actuator gets zero correction; the aircraft drifts.">
      {lanes.map((lane) => (
        <g key={lane.name}>
          <line x1={lane.x} y1={64} x2={lane.x} y2={390} className="svg-line" strokeWidth={1.5} strokeDasharray="5 6" />
          <Box x={lane.x - 85} y={16} w={170} h={46} tone={lane.tone} solid title={lane.name} titleSize={13} />
        </g>
      ))}
      <Arrow points={[[100, 104], [306, 104]]} />
      <Label x={203} y={96} mono size={12}>error Δ = 0.0000001</Label>

      <Arrow points={[[310, 150], [526, 150]]} />
      <Label x={420} y={142} mono size={12}>sum = 100000.0 + 0.0000001</Label>

      <Box x={430} y={176} w={200} h={46} tone="rose" title="silent truncation" lines={['result is still 100000.0']} titleSize={13} />

      <Arrow points={[[530, 262], [314, 262]]} dashed />
      <Label x={420} y={254} mono size={12}>return 100000.0</Label>

      <Arrow points={[[310, 312], [736, 312]]} />
      <Label x={523} y={304} mono size={12}>command (0.0 correction)</Label>

      <Box x={640} y={336} w={196} h={46} tone="rose" solid title="physical drift / loss" titleSize={13} />
    </Svg>
  )
}

/** Week 1 · Why the tiny correction vanishes: float32 keeps only about 7 significant digits. */
export function FloatDigitsDiagram() {
  const chars = ['1', '0', '0', '0', '0', '0', '.', '0', '0', '0', '0', '0', '0', '1']
  let x = 70
  const cells = chars.map((char, index) => {
    const w = char === '.' ? 22 : 44
    const cell = { char, index, x, w }
    x += w + 4
    return cell
  })
  const windowEnd = cells[7].x + cells[7].w
  const last = cells[cells.length - 1]
  return (
    <Svg width={800} height={250} label="The number 100000.0000001 needs 13 significant digits, but float32 keeps only about 7, so the final 1 is dropped.">
      <Label x={70} y={30} anchor="start" mono size={11}>THE EXACT ANSWER: 100000.0 + 0.0000001 = 100000.0000001</Label>
      <g data-tone="teal">
        <rect x={62} y={46} width={windowEnd - 54} height={78} rx={12} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
      </g>
      {cells.map((cell) => {
        const kept = cell.index <= 7
        const lost = cell.index === chars.length - 1
        return (
          <g key={cell.index} data-tone={lost ? 'rose' : kept ? 'teal' : undefined}>
            {cell.char !== '.' ? (
              <rect
                x={cell.x}
                y={56}
                width={cell.w}
                height={58}
                rx={8}
                className={lost ? 'svg-tone-fill svg-tone-stroke' : kept ? 'svg-surface svg-tone-stroke' : 'svg-surface svg-line'}
                strokeWidth={1.4}
                strokeDasharray={kept ? undefined : '4 4'}
              />
            ) : null}
            <text
              x={cell.x + cell.w / 2}
              y={95}
              textAnchor="middle"
              fontSize={26}
              fontWeight={700}
              className={lost ? 'svg-tone-text' : kept ? 'svg-text' : 'svg-muted'}
              opacity={kept || lost ? 1 : 0.45}
            >
              {cell.char}
            </text>
          </g>
        )
      })}
      <Label x={(62 + windowEnd) / 2} y={148} tone="teal" size={13} weight={700}>≈ 7 significant digits — all a float32 can hold</Label>
      <Arrow points={[[last.x + last.w / 2, 170], [last.x + last.w / 2, 120]]} tone="rose" />
      <Label x={last.x + last.w} y={190} anchor="end" tone="rose" size={13} weight={700}>the correction lives here → dropped</Label>
      <Label x={400} y={226} size={12}>Near 100000, the smallest step a float32 can make is 0.0078125 — the correction is about 78,000 times smaller.</Label>
    </Svg>
  )
}
