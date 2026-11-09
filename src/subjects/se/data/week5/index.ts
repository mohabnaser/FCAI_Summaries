import type { Week } from '../../types'
import { t } from '../helpers'
import { stylesIntro } from './l1-styles'
import { process } from './l2-process'
import { ntier } from './l3-ntier'
import { p2p } from './l4-p2p'
import { pipeFilter } from './l5-pipe'
import { messaging } from './l6-messaging'
import { compare } from './l7-compare'

export const week5: Week = {
  id: 'week-5',
  number: 5,
  title: 'Building Software Architecture: Architecture Styles',
  topic: 'The architecture process and the classic styles',
  lede: t(
    'How an architect actually builds an architecture — requirements, design, validation — and the proven styles to build it from: n-tier, client-server, peer-to-peer, pipe-and-filter and messaging.',
    'المعماري بيبني الـ architecture إزاي فعلًا — متطلبات، تصميم، تحقق — والـ styles المجرّبة اللي بيبني منها: n-tier وclient-server وpeer-to-peer وpipe-and-filter وmessaging.',
  ),
  sourceFile: 'Week05_Slides.pdf (29 slides)',
  readings: ['Gorton, Essential Software Architecture (2011): Ch. 7 and 8'],
  bigIdeas: [
    t('A style = choices within a view: vocabulary + configuration rules (topology) + semantic interpretation.', 'الـ style = اختيارات جوّه view: مفردات + قواعد تركيب (topology) + معنى.'),
    t('Process: determine architecture (quality) requirements → design (2a choose styles, 2b allocate components) → validate, iteratively.', 'العملية: تحديد متطلبات الـ architecture (الجودة) ← التصميم (2a اختيار styles، و2b توزيع components) ← التحقق، وبيتكرر.'),
    t('N-tier/client-server: synchronous tiers, separation of concerns, flexible deployment. P2P: equal peers (Napster adds an index).', 'الـ N-tier/client-server: طبقات متزامنة، فصل مسؤوليات، نشر مرن. والـ P2P: peers متساويين (Napster بيضيف فهرس).'),
    t('Pipe-and-filter: independent filters on streams. Messaging: asynchronous queues for availability and loose coupling.', 'الـ Pipe-and-filter: filters مستقلة على streams. والـ Messaging: queues غير متزامنة للـ availability والارتباط الخفيف.'),
  ],
  slides: [
    { n: 1, title: 'Building Software Architecture — Architecture Style' },
    { n: 2, title: 'A Terminology Review: What Is an Architectural View?' },
    { n: 3, title: 'Architectural Styles vs Architectural Views' },
    { n: 4, title: 'Basic Properties of Styles' },
    { n: 5, title: 'A Topology?' },
    { n: 6, title: 'What Is the Role of a Software Architect?' },
    { n: 7, title: 'The Architecture Process Outline' },
    { n: 8, title: 'Step 1: Determine Architectural Requirements' },
    { n: 9, title: 'Step 2: Architecture Design (process)' },
    { n: 10, title: 'Step 2: Architecture Design (2a and 2b)' },
    { n: 11, title: 'Step 2a: Choosing the Architecture Framework' },
    { n: 12, title: 'Step 2a: Architectural Styles (list)' },
    { n: 13, title: 'Step 2a: N-Tier Client Server Pattern (tiers)' },
    { n: 14, title: 'Step 2a: N-Tier Client Server Pattern (machines)' },
    { n: 15, title: 'Step 2a: Client-Server' },
    { n: 16, title: 'N-Tier: Key Properties' },
    { n: 17, title: 'N-Tier: Addressing Quality Attributes' },
    { n: 18, title: 'Step 2a: Architectural Styles (list + language-influenced)', note: 'List repeat' },
    { n: 19, title: 'Step 2a: Peer-to-Peer' },
    { n: 20, title: 'P2P with a Centralized Index Server (Napster)' },
    { n: 21, title: 'Step 2a: Architectural Styles (list + shared data)', note: 'List repeat' },
    { n: 22, title: 'Step 2a: Pipe and Filter Style (filters)' },
    { n: 23, title: 'Step 2a: Pipe and Filter Style (pipes, invariants, UNIX)' },
    { n: 24, title: 'Step 2a: Pipe and Filter Style (disadvantages, cautions, qualities)' },
    { n: 25, title: 'Step 2a: Pipe and Filter Style (C&C and module views)' },
    { n: 26, title: 'Step 2a: Architectural Styles (list)', note: 'List repeat' },
    { n: 27, title: 'Step 2a: Messaging' },
    { n: 28, title: 'Messaging: Addressing Quality Attributes' },
    { n: 29, title: 'Required Readings' },
  ],
  lessons: [stylesIntro, process, ntier, p2p, pipeFilter, messaging, compare],
}
