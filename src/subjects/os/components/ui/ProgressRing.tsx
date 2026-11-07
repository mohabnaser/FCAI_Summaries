interface ProgressRingProps {
  value: number
  max?: number
  size?: number
  stroke?: number
  label?: string
  sublabel?: string
  tone?: 'cyan' | 'teal' | 'violet'
}

const toneColors = {
  cyan: { start: '#25d8f2', end: '#2dd4bf' },
  teal: { start: '#2dd4bf', end: '#a3e635' },
  violet: { start: '#a78bfa', end: '#25d8f2' },
}

export function ProgressRing({
  value,
  max = 100,
  size = 88,
  stroke = 7,
  label,
  sublabel,
  tone = 'cyan',
}: ProgressRingProps) {
  const ratio = max <= 0 ? 0 : Math.min(1, Math.max(0, value / max))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - ratio)
  const colors = toneColors[tone]
  const display = label ?? `${Math.round(ratio * 100)}%`

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${display}${sublabel ? `, ${sublabel}` : ''}`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <defs>
          <linearGradient id={`ring-${tone}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(32, 54, 83, 0.85)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#ring-${tone})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 500ms ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-lg font-semibold leading-none text-mist-50">
          {display}
        </span>
        {sublabel ? (
          <span className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">
            {sublabel}
          </span>
        ) : null}
      </div>
    </div>
  )
}
