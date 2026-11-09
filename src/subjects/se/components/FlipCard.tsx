import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import type { KeyTerm } from '../types'
import { Inline } from './Text'

/**
 * A key term on the front, its definition on the back. Used for active recall:
 * read the term, say the definition out loud, then flip to check.
 */
export function FlipCard({ term, revealAll = false, label }: { term: KeyTerm; revealAll?: boolean; label?: string }) {
  const [flipped, setFlipped] = useState(revealAll)
  useEffect(() => setFlipped(revealAll), [revealAll])

  return (
    <button
      type="button"
      className="flip block w-full text-left"
      data-flipped={flipped}
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={flipped ? `${term.term}: definition shown. Click to hide.` : `${term.term}. Click to reveal the definition.`}
    >
      <span className="flip-inner">
        <span className="flip-face flex flex-col justify-between" aria-hidden={flipped}>
          <span>
            {label ? <span className="eyebrow block" data-tone="violet">{label}</span> : null}
            <span className="display mt-1 block text-[1.08rem] font-semibold text-ink">{term.term}</span>
          </span>
          <span className="mt-3 flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
            <RotateCcw className="h-3 w-3" /> say it, then flip
          </span>
        </span>
        <span className="flip-face flip-back" aria-hidden={!flipped}>
          <span className="eyebrow block" data-tone="teal">{term.term}</span>
          <span className="mt-1.5 block text-[0.92rem] leading-relaxed text-[var(--se-reading)]">
            <Inline text={term.definition} />
          </span>
        </span>
      </span>
    </button>
  )
}
