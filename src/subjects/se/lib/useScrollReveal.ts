import { useEffect, type RefObject } from 'react'

/**
 * Sets `data-reveal="in"` on every `[data-reveal]` element inside `container` once it
 * scrolls into view (CSS fades it in). Without IntersectionObserver everything shows at once.
 */
export function useScrollReveal(container: RefObject<HTMLElement | null>, key: unknown) {
  useEffect(() => {
    const root = container.current?.parentElement ?? container.current
    if (!root) return
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="in"])'))
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => (el.dataset.reveal = 'in'))
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
      { rootMargin: '0px 0px -40px 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [container, key])
}
