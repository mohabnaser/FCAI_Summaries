import type { ChapterMeta, Section } from '../types'
import { osIntro } from './sections/s1-os-intro'
import { startupInterrupts } from './sections/s2-startup-interrupts'
import { storageCaching } from './sections/s3-storage-caching'
import { ioStructure } from './sections/s4-io-structure'
import { systemArchitecture } from './sections/s5-system-architecture'
import { multiprogramming } from './sections/s6-multiprogramming'
import { dualMode } from './sections/s7-dual-mode'
import { resourceManagement } from './sections/s8-resource-management'
import { protectionEnvironments } from './sections/s9-protection-environments'

/**
 * Chapter 1 follows the lecture’s own table of contents (slide 2). Each section
 * maps to a contiguous slide range and owns the past-exam questions for it:
 *
 *  1 What an OS is ............ slides 3–9
 *  2 Startup & interrupts ..... slides 10–15
 *  3 Storage & caching ........ slides 16–19, 41–42
 *  4 I/O & DMA ................ slides 17, 20–24, 43
 *  5 System architecture ...... slides 25–29
 *  6 Multiprogramming ......... slides 30–32
 *  7 Dual mode & timer ........ slides 33–34
 *  8 Process/memory/storage ... slides 35–40
 *  9 Protection & environments  slides 44–57
 */
export const sections: Section[] = [
  osIntro,
  startupInterrupts,
  storageCaching,
  ioStructure,
  systemArchitecture,
  multiprogramming,
  dualMode,
  resourceManagement,
  protectionEnvironments,
]
  .map((section) => ({ ...section, chapterId: 'chapter-1' as const }))
  .sort((a, b) => a.order - b.order)

export const sectionsById = new Map(sections.map((section) => [section.id, section]))

/**
 * Old URLs keep working. The first eleven are the original topic slugs; the next
 * five are the merged sections of the previous five-section release.
 */
export const legacySectionAliases: Record<string, string> = {
  'what-is-an-os': 'os-intro',
  'boot-interrupts': 'startup-interrupts',
  architecture: 'system-architecture',
  'process-management': 'resource-management',
  'memory-management': 'resource-management',
  'storage-files': 'resource-management',
  'storage-caching-io': 'storage-caching',
  'protection-security': 'protection-environments',
  'computing-environments': 'protection-environments',
  'foundations-startup': 'os-intro',
  'architecture-execution': 'system-architecture',
  'processes-memory': 'resource-management',
  'storage-io': 'storage-caching',
  'protection-modern': 'protection-environments',
}

export function resolveSectionId(id: string): string {
  return legacySectionAliases[id] ?? id
}

export function getSection(id: string): Section {
  const section = sectionsById.get(resolveSectionId(id))
  if (!section) throw new Error(`Unknown section: ${id}`)
  return section
}

export const chapterMeta: ChapterMeta = {
  id: 'chapter-1',
  number: '01',
  title: 'Introduction to Operating Systems',
  shortTitle: 'Introduction',
  subtitle:
    'The kernel and boot process, computer-system organization, storage and I/O, system architectures, protection, and computing environments through virtualization and cloud.',
  lede: {
    en: 'The role of the operating system, computer-system organization and architecture, multiprogramming and time-sharing, dual-mode operation, resource management, protection and security, and computing environments.',
    ar: 'يتناول هذا الفصل دور نظام التشغيل، وتنظيم الحاسب وبنيته، والـ multiprogramming والـ time-sharing، والتشغيل ثنائي النمط (dual mode)، وإدارة الموارد، والحماية والأمن، وبيئات الحوسبة.',
  },
  slideCount: 57,
  sourceFile: 'chapter1.md',
  sourceLabel: 'Operating System Concepts, 9th ed. · Chapter 1 · Dr. Khaled Wassif',
  theme: 'night',
}

export const totalEstimatedMinutes = sections.reduce(
  (total, section) => total + section.estimatedMinutes,
  0,
)
