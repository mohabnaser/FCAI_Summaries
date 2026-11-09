import type { LText } from '../types'
import { usePrefs } from '../context/PrefsContext'

/** `**bold**`, `` `code` ``, `*italic*` and `==highlight==` inside one string. */
const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|==[^=]+==|\*[^*\s][^*]*\*)/g

export function Rich({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean)
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return <strong key={index}>{part.slice(2, -2)}</strong>
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) return <code key={index}>{part.slice(1, -1)}</code>
        if (part.startsWith('==') && part.endsWith('==') && part.length > 4) return <mark key={index}>{part.slice(2, -2)}</mark>
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={index}>{part.slice(1, -1)}</em>
        return <span key={index}>{part}</span>
      })}
    </>
  )
}

/** A paragraph: English always, then the Arabic explanation when it is switched on. */
export function Para({ text, className = '' }: { text: LText; className?: string }) {
  const { showArabic } = usePrefs()
  return (
    <div className={`rt ${className}`}>
      <p>
        <Rich text={text.en} />
      </p>
      {showArabic && text.ar ? (
        <p className="ar" lang="ar" dir="rtl">
          <Rich text={text.ar} />
        </p>
      ) : null}
    </div>
  )
}

/** Inline variant for list items and card bodies: the Arabic sits under the English, smaller. */
export function Inline({ text }: { text: LText }) {
  const { showArabic } = usePrefs()
  return (
    <span className="rt block">
      <Rich text={text.en} />
      {showArabic && text.ar ? (
        <span className="ar-inline" lang="ar" dir="rtl">
          <Rich text={text.ar} />
        </span>
      ) : null}
    </span>
  )
}
