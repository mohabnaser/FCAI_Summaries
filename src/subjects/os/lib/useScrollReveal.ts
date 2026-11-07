import { useEffect, type RefObject } from 'react'

/**
 * Marks every `[data-reveal]` element inside `container` as `data-reveal="in"` once it
 * scrolls into view. The CSS only hides un-revealed elements in the Bloom theme, so in
 * other themes this is invisible. Without IntersectionObserver (old browsers, tests)
 * everything is revealed immediately.
 */
export function useScrollReveal(container: RefObject<HTMLElement | null>, key: unknown) {
  useEffect(() => {
    const root = container.current
    if (!root) return
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="in"])'))
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((element) => (element.dataset.reveal = 'in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.reveal = 'in'
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    )
    targets.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [container, key])
}
