import type { ReactNode } from 'react'
import type { Tone } from '../../types'

/**
 * Small SVG drawing kit shared by every diagram. All paint comes from CSS classes
 * (see index.css "SVG paint helpers"), so diagrams follow the active theme.
 */

type Point = [number, number]

interface ArrowProps {
  points: Point[]
  tone?: Tone
  dashed?: boolean
  width?: number
  head?: boolean
  /** Draw a head at the start as well (two-way arrow). */
  both?: boolean
}

function headAt(tip: Point, from: Point, size = 8): string {
  const angle = Math.atan2(tip[1] - from[1], tip[0] - from[0])
  const a1 = angle + Math.PI - 0.45
  const a2 = angle + Math.PI + 0.45
  return [tip, [tip[0] + size * Math.cos(a1), tip[1] + size * Math.sin(a1)], [tip[0] + size * Math.cos(a2), tip[1] + size * Math.sin(a2)]]
    .map((p) => (p as Point).map((n) => n.toFixed(1)).join(','))
    .join(' ')
}

export function Arrow({ points, tone, dashed, width = 2, head = true, both = false }: ArrowProps) {
  const toned = Boolean(tone)
  const stroke = toned ? 'svg-tone-stroke' : 'svg-ink-stroke'
  const fill = toned ? 'svg-solid' : 'svg-muted'
  const last = points[points.length - 1]
  const prev = points[points.length - 2]
  return (
    <g data-tone={tone}>
      <polyline
        points={points.map((p) => p.join(',')).join(' ')}
        fill="none"
        className={stroke}
        strokeWidth={width}
        strokeDasharray={dashed ? '6 5' : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {head ? <polygon points={headAt(last, prev)} className={fill} /> : null}
      {both ? <polygon points={headAt(points[0], points[1])} className={fill} /> : null}
    </g>
  )
}

/** A quadratic curve from `from` to `to` bending towards `control`, with an arrow head. */
export function Curve({ from, control, to, tone, dashed }: { from: Point; control: Point; to: Point; tone?: Tone; dashed?: boolean }) {
  return (
    <g data-tone={tone}>
      <path
        d={`M ${from.join(' ')} Q ${control.join(' ')} ${to.join(' ')}`}
        fill="none"
        className={tone ? 'svg-tone-stroke' : 'svg-ink-stroke'}
        strokeWidth={2}
        strokeDasharray={dashed ? '6 5' : undefined}
        strokeLinecap="round"
      />
      <polygon points={headAt(to, control)} className={tone ? 'svg-solid' : 'svg-muted'} />
    </g>
  )
}

interface BoxProps {
  x: number
  y: number
  w: number
  h: number
  tone?: Tone
  title?: string
  lines?: string[]
  rx?: number
  solid?: boolean
  dashed?: boolean
  titleSize?: number
  children?: ReactNode
}

/** A rounded, tone-tinted box with a bold title and up to a few muted lines, centred. */
export function Box({ x, y, w, h, tone = 'blue', title, lines = [], rx = 12, solid, dashed, titleSize = 14, children }: BoxProps) {
  const titleH = title ? titleSize : 0
  const gap = title && lines.length ? 7 : 0
  const top = y + (h - (titleH + gap + lines.length * 16)) / 2
  return (
    <g data-tone={tone}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx}
        className={`${solid ? 'svg-solid' : 'svg-tone-fill'} svg-tone-stroke`}
        strokeWidth={1.6}
        strokeDasharray={dashed ? '6 5' : undefined}
      />
      {title ? (
        <text x={x + w / 2} y={top + titleSize * 0.82} textAnchor="middle" fontSize={titleSize} fontWeight={700} className={solid ? 'svg-surface' : 'svg-text'}>
          {title}
        </text>
      ) : null}
      {lines.map((line, index) => (
        <text key={index} x={x + w / 2} y={top + titleH + gap + index * 16 + 12} textAnchor="middle" fontSize={12} className="svg-muted">
          {line}
        </text>
      ))}
      {children}
    </g>
  )
}

export function Label({
  x,
  y,
  children,
  size = 12,
  anchor = 'middle',
  tone,
  weight,
  mono,
}: {
  x: number
  y: number
  children: ReactNode
  size?: number
  anchor?: 'start' | 'middle' | 'end'
  tone?: Tone
  weight?: number
  mono?: boolean
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      data-tone={tone}
      className={tone ? 'svg-tone-text' : mono ? 'svg-mono' : 'svg-muted'}
    >
      {children}
    </text>
  )
}

/** A UML deployment node: a box with a 3D top and side. Children are drawn inside. */
export function Node3D({ x, y, w, h, tone = 'blue', stereotype, title, children }: { x: number; y: number; w: number; h: number; tone?: Tone; stereotype?: string; title: string; children?: ReactNode }) {
  const d = 10
  return (
    <g data-tone={tone}>
      <polygon points={`${x},${y} ${x + d},${y - d} ${x + w + d},${y - d} ${x + w},${y}`} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.4} />
      <polygon points={`${x + w},${y} ${x + w + d},${y - d} ${x + w + d},${y + h - d} ${x + w},${y + h}`} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.4} />
      <rect x={x} y={y} width={w} height={h} className="svg-tone-fill svg-tone-stroke" strokeWidth={1.6} />
      {stereotype ? (
        <text x={x + w / 2} y={y + 16} textAnchor="middle" fontSize={10.5} className="svg-mono">{`«${stereotype}»`}</text>
      ) : null}
      <text x={x + w / 2} y={y + (stereotype ? 32 : 20)} textAnchor="middle" fontSize={12.5} fontWeight={700} className="svg-text">{title}</text>
      {children}
    </g>
  )
}

/** UML provided interface (lollipop): a stick from `from` ending in a circle at `to`. */
export function Lollipop({ from, to, tone }: { from: Point; to: Point; tone?: Tone }) {
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0])
  const r = 7
  const end: Point = [to[0] - r * Math.cos(angle), to[1] - r * Math.sin(angle)]
  return (
    <g data-tone={tone}>
      <line x1={from[0]} y1={from[1]} x2={end[0]} y2={end[1]} className={tone ? 'svg-tone-stroke' : 'svg-ink-stroke'} strokeWidth={1.8} />
      <circle cx={to[0]} cy={to[1]} r={r} className={`svg-surface ${tone ? 'svg-tone-stroke' : 'svg-ink-stroke'}`} strokeWidth={1.8} />
    </g>
  )
}

/** UML required interface (socket): a stick from `from` ending in a half-circle cup around `at`, opening towards `from`'s opposite side. */
export function Socket({ from, at, tone }: { from: Point; at: Point; tone?: Tone }) {
  const angle = Math.atan2(at[1] - from[1], at[0] - from[0])
  const r = 11
  const base: Point = [at[0] - r * Math.cos(angle), at[1] - r * Math.sin(angle)]
  const p1: Point = [at[0] + r * Math.cos(angle + Math.PI / 2), at[1] + r * Math.sin(angle + Math.PI / 2)]
  const p2: Point = [at[0] + r * Math.cos(angle - Math.PI / 2), at[1] + r * Math.sin(angle - Math.PI / 2)]
  const stroke = tone ? 'svg-tone-stroke' : 'svg-ink-stroke'
  return (
    <g data-tone={tone}>
      <line x1={from[0]} y1={from[1]} x2={base[0]} y2={base[1]} className={stroke} strokeWidth={1.8} />
      <path d={`M ${p1.join(' ')} A ${r} ${r} 0 0 1 ${p2.join(' ')}`} fill="none" className={stroke} strokeWidth={1.8} />
    </g>
  )
}

/** Wrapper that keeps a diagram responsive and labelled for screen readers. */
export function Svg({ width, height, label, children }: { width: number; height: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} role="img" aria-label={label} style={{ minWidth: Math.min(width, 560) }}>
      {children}
    </svg>
  )
}
