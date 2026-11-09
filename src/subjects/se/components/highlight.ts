import { Prism, type PrismTheme } from 'prism-react-renderer'

// prism-react-renderer ships clike but not Java; a small extension covers the lecture code.
if (!Prism.languages.java) {
  Prism.languages.java = Prism.languages.extend('clike', {
    keyword:
      /\b(?:abstract|boolean|break|byte|case|catch|char|class|continue|default|do|double|else|enum|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|long|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|try|void|volatile|while|true|false|var)\b/,
    'class-name': /\b[A-Z]\w*\b/,
    number: /\b0x[\da-fA-F]+\b|\b\d+(?:\.\d+)?[lLfFdD]?\b/,
  })
}

/** Token colours come from the subject's theme variables, so code follows light and dark. */
export const codeTheme: PrismTheme = {
  plain: { color: 'var(--se-ink)', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--se-faint)', fontStyle: 'italic' } },
    { types: ['keyword'], style: { color: 'var(--se-violet)', fontWeight: '600' } },
    { types: ['boolean', 'number', 'constant'], style: { color: 'var(--se-rose)' } },
    { types: ['function'], style: { color: 'var(--se-blue)' } },
    { types: ['string', 'char', 'attr-value'], style: { color: 'var(--se-amber)' } },
    { types: ['class-name', 'builtin'], style: { color: 'var(--se-teal)' } },
    { types: ['operator'], style: { color: 'var(--se-lime)' } },
    { types: ['punctuation'], style: { color: 'var(--se-muted)' } },
  ],
}
