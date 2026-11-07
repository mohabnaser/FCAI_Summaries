import type { ChapterMeta, Section } from '../../types'
import { servicesInterfaces } from './sections/s1-services-interfaces'
import { systemCalls } from './sections/s2-system-calls'
import { syscallTypes } from './sections/s3-syscall-types'
import { programsDesign } from './sections/s4-programs-design'
import { structures } from './sections/s5-structures'
import { debugBoot } from './sections/s6-debug-boot'

/**
 * Chapter 2 follows the ten topics of its slide 2, grouped into six sections:
 *
 *  1 Services & interfaces ....... slides 3–12   (services, CLI, GUI, touchscreen)
 *  2 System calls & API .......... slides 13–19  (API, read(), implementation, parameters)
 *  3 Types of system calls ....... slides 20–25  (six families, Windows/UNIX, C library)
 *  4 Programs & design ........... slides 26–32  (system programs, goals, policy/mechanism, languages)
 *  5 OS structures ............... slides 33–46  (simple, UNIX, layered, microkernel, modules, hybrid)
 *  6 Debugging & boot ............ slides 47–50  (debugging, tuning, SYSGEN, system boot)
 */
export const chapter2Sections: Section[] = [
  servicesInterfaces,
  systemCalls,
  syscallTypes,
  programsDesign,
  structures,
  debugBoot,
].sort((a, b) => a.order - b.order)

export const chapter2Meta: ChapterMeta = {
  id: 'chapter-2',
  number: '02',
  title: 'Operating-System Structures',
  shortTitle: 'OS Structures',
  subtitle:
    'Services, interfaces, system calls, system programs, design principles and the structures real operating systems use — through to boot.',
  lede: {
    en: 'Operating-system services, user and programming interfaces, system calls and their types, system programs, design and implementation, operating-system structures, debugging, and system boot.',
    ar: 'يتناول هذا الفصل خدمات نظام التشغيل، وواجهات المستخدم والبرمجة، والـ system calls وأنواعها، والـ system programs، والتصميم والتنفيذ، وهياكل نظم التشغيل، والـ debugging، وإقلاع النظام (boot).',
  },
  slideCount: 51,
  sourceFile: 'chapter2.md',
  sourceLabel: 'Operating System Concepts, 9th ed. · Chapter 2 · Dr. Khaled Wassif',
  theme: 'bloom',
}

/** A 16-question historical paper sampling every Chapter 2 section (no unscored items). */
export const chapter2FinalAssessmentQuestionIds = [
  // 1 · Services & interfaces
  'c2-services-user-tf',
  'c2-gui-vs-cli',
  'c2-command-interpreter-2024',
  // 2 · System calls & API
  'c2-api-fill',
  'c2-system-call-interface-fill',
  'c2-parameter-methods-short',
  // 3 · Types of system calls
  'c2-fork-create-2020',
  'c2-fork-exit',
  'c2-ipc-models-mcq',
  'c2-ipc-operations-2024',
  // 4 · Programs & design
  'c2-system-programs-tf',
  'c2-policy-mechanism-benefit',
  // 5 · OS structures
  'c2-layered-2024',
  'c2-microkernel-message-passing',
  'c2-hybrid',
  // 6 · Debugging & boot (Chapter 1 implementation, cross-referenced)
  's2-system-boot',
]
