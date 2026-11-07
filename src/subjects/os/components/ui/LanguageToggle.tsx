import { Languages } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, isArabic } = useLanguage()

  return (
    <div className="flex items-center gap-1.5">
      {!compact ? (
        <Languages className="h-4 w-4 text-mist-500" aria-hidden="true" />
      ) : null}
      <div
        className="flex items-center rounded-lg border border-line bg-ink-900/80 p-0.5"
        role="group"
        aria-label="Explanation language"
      >
        <button
          type="button"
          onClick={() => setLang('en')}
          className={`rounded-md px-2 py-1 text-[0.7rem] font-semibold transition-colors ${
            lang === 'en'
              ? 'bg-cyan-neon/15 text-cyan-neon'
              : 'text-mist-400 hover:text-mist-100'
          }`}
          aria-pressed={lang === 'en'}
          title="English mode"
        >
          {compact ? 'EN' : 'English'}
        </button>
        <button
          type="button"
          onClick={() => setLang('ar')}
          className={`rounded-md px-2 py-1 text-[0.7rem] font-semibold transition-colors ${
            isArabic
              ? 'bg-teal-neon/15 text-teal-neon'
              : 'text-mist-400 hover:text-mist-100'
          }`}
          aria-pressed={isArabic}
          title="Arabic explanation mode"
        >
          {compact ? 'AR' : 'Arabic explanation'}
        </button>
      </div>
    </div>
  )
}
