import { Prism, type PrismTheme } from 'prism-react-renderer'

// prism-react-renderer bundles C/C++ but not Java; a small clike extension is enough
// for the lecture's socket and RMI examples.
if (!Prism.languages.java) {
  Prism.languages.java = Prism.languages.extend('clike', {
    keyword:
      /\b(?:abstract|boolean|break|byte|case|catch|char|class|continue|default|do|double|else|enum|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|long|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|try|void|volatile|while|true|false)\b/,
    'class-name': /\b[A-Z]\w*\b/,
    number: /\b\d+(?:\.\d+)?[lLfFdD]?\b/,
  })
}

// The lecture's C uses true/false, TRUE/FALSE and pseudo-types such as boolean and semaphore.
if (Prism.languages.c && !(Prism.languages.c as Record<string, unknown>)['lecture-types']) {
  Prism.languages.insertBefore('c', 'keyword', {
    'lecture-types': { pattern: /\b(?:boolean|semaphore|item|message|pid_t)\b/, alias: 'class-name' },
    boolean: /\b(?:true|false|TRUE|FALSE|NULL)\b/,
  })
}

/** Token colours come from the active theme's tokens, so code matches every chapter. */
export const codeTheme: PrismTheme = {
  plain: { color: 'var(--color-mist-100)', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--color-mist-500)', fontStyle: 'italic' } },
    { types: ['keyword'], style: { color: 'var(--color-violet-neon)', fontWeight: '600' } },
    { types: ['boolean', 'number', 'constant'], style: { color: 'var(--color-rose-neon)' } },
    { types: ['function'], style: { color: 'var(--color-cyan-neon)' } },
    { types: ['string', 'char', 'attr-value'], style: { color: 'var(--color-amber-neon)' } },
    { types: ['class-name', 'builtin'], style: { color: 'var(--color-teal-neon)' } },
    { types: ['macro', 'directive', 'property'], style: { color: 'var(--color-lime-neon)' } },
    { types: ['operator'], style: { color: 'var(--color-lime-neon)' } },
    { types: ['punctuation'], style: { color: 'var(--color-mist-400)' } },
  ],
}

export function prismLanguage(language: string): string {
  const id = language.toLowerCase()
  if (id === 'c' || id === 'pseudo' || id === 'pseudocode') return 'c'
  return Prism.languages[id] ? id : 'c'
}
