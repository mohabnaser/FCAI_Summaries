import type { LText } from '../../types'
import { useLanguage } from '../../context/LanguageContext'

const TOKEN_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`)/g

export function RichText({ text }: { text: string }) {
  const tokens = text.split(TOKEN_PATTERN).filter((token) => token.length > 0)
  return (
    <>
      {tokens.map((token, index) => {
        if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
          return <strong key={index}>{token.slice(2, -2)}</strong>
        }
        if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
          return <code key={index}>{token.slice(1, -1)}</code>
        }
        return <span key={index}>{token}</span>
      })}
    </>
  )
}

export function ArabicNote({ text, className = '' }: { text: string; className?: string }) {
  return (
    <p className={`arabic-note ${className}`} lang="ar" dir="rtl">
      <RichText text={text} />
    </p>
  )
}

interface BilingualProseProps {
  text: LText
  className?: string
  showArabic?: boolean
}

export function BilingualProse({ text, className = '', showArabic = true }: BilingualProseProps) {
  const { isArabic } = useLanguage()
  return (
    <div className={`prose-atlas space-y-2 ${className}`}>
      <p>
        <RichText text={text.en} />
      </p>
      {showArabic && isArabic && text.ar ? <ArabicNote text={text.ar} /> : null}
    </div>
  )
}

export function BilingualInline({ text }: { text: LText }) {
  const { isArabic } = useLanguage()
  return (
    <span className="rich-inline block">
      <RichText text={text.en} />
      {isArabic && text.ar ? (
        <span
          className="arabic-note mt-1.5 block border-0 ps-0 text-[0.8rem] leading-relaxed text-mist-400"
          lang="ar"
          dir="rtl"
        >
          <RichText text={text.ar} />
        </span>
      ) : null}
    </span>
  )
}

/**
 * Feedback may change language. Arabic mode leads with the Arabic explanation,
 * while the English source remains available in a disclosure.
 */
export function FeedbackText({ text, className = '' }: { text: LText; className?: string }) {
  const { isArabic } = useLanguage()
  if (!isArabic || !text.ar) {
    return (
      <div className={`prose-atlas ${className}`}>
        <p>
          <RichText text={text.en} />
        </p>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <ArabicNote text={text.ar} className="border-teal-neon/50" />
      <details className="group text-xs text-mist-500">
        <summary className="cursor-pointer select-none py-1 text-mist-400 hover:text-mist-200">
          English explanation
        </summary>
        <p className="prose-atlas mt-1 text-sm">
          <RichText text={text.en} />
        </p>
      </details>
    </div>
  )
}
