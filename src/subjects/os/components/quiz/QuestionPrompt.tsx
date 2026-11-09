import { RichText } from '../ui/Text'

/**
 * Fill-in prompts use {{1}}, {{2}} markers. They are rendered as visible blank
 * chips while the actual inputs live below the stem, so the sentence stays easy
 * to read in both language modes.
 *
 * Lines that start with `|` form a small table (the process tables of the
 * scheduling problems); a `| --- |` separator line is optional and ignored.
 */
export function QuestionPrompt({ prompt }: { prompt: string }) {
  const segments: Array<{ kind: 'text'; text: string } | { kind: 'table'; rows: string[][] }> = []
  for (const line of prompt.split('\n')) {
    const isRow = line.trim().startsWith('|')
    const last = segments[segments.length - 1]
    if (isRow) {
      const cells = line
        .trim()
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((cell) => cell.trim())
      if (cells.every((cell) => /^:?-{2,}:?$/.test(cell))) continue
      if (last?.kind === 'table') last.rows.push(cells)
      else segments.push({ kind: 'table', rows: [cells] })
    } else if (last?.kind === 'text') {
      last.text += `\n${line}`
    } else {
      segments.push({ kind: 'text', text: line })
    }
  }

  return (
    <div className="space-y-3">
      {segments.map((segment, index) =>
        segment.kind === 'table' ? (
          <div key={index} className="overflow-x-auto">
            <table className="prompt-table min-w-[16rem] border-collapse font-mono text-[0.85rem]">
              <thead>
                <tr>
                  {segment.rows[0].map((cell, cellIndex) => (
                    <th key={cellIndex} scope="col" className="border border-line bg-ink-800 px-3 py-1.5 text-left font-semibold text-mist-200">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {segment.rows.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-line-soft px-3 py-1.5 text-mist-100">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : segment.text.trim() ? (
          <PromptText key={index} text={segment.text.replace(/^\n+|\n+$/g, '')} />
        ) : null,
      )}
    </div>
  )
}

function PromptText({ text }: { text: string }) {
  const parts = text.split(/(\{\{\d+\}\})/g)
  return (
    <p className="quiz-prompt whitespace-pre-line">
      {parts.map((part, index) => {
        const match = part.match(/^\{\{(\d+)\}\}$/)
        if (match) {
          return (
            <span key={index} className="blank-marker" aria-hidden="true">
              {match[1]}
            </span>
          )
        }
        if (!part) return null
        return <RichText key={index} text={part} />
      })}
    </p>
  )
}

export { blankLabel } from '../../lib/quiz'
