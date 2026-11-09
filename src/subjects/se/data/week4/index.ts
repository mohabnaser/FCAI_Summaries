import type { Week } from '../../types'
import { t } from '../helpers'
import { views } from './l1-views'
import { kinds } from './l2-kinds'
import { moduleViews } from './l3-module'
import { ccViews } from './l4-cc'
import { allocation } from './l5-allocation'
import { choosing } from './l6-choosing'

export const week4: Week = {
  id: 'week-4',
  number: 4,
  title: 'Architectural Views',
  topic: 'Module, component-and-connector and allocation views',
  lede: t(
    'How to document an architecture: as several views, each showing one kind of structure — the code (modules), the running system (components and connectors) and the environment (hardware, files and teams).',
    'إزاي توثّق architecture: كذا view، كل واحدة بتورّي نوع واحد من الـ structures — الكود (modules)، والسيستم وهو شغال (components وconnectors)، والبيئة (هاردوير وملفات وفرق).',
  ),
  sourceFile: 'Week 4 slides (41 slides)',
  readings: ['Documenting Software Architectures: P3, Ch. 2, 3, 5, E.2', 'Taylor, Medvidovic & Dashofy (2010)'],
  bigIdeas: [
    t('An architecture document = several views + documentation beyond views; no single view represents an architecture.', 'مستند الـ architecture = كذا view + توثيق برّه الـ views؛ ومفيش view واحدة تمثّل الـ architecture.'),
    t('A structure is the set of elements itself; a view is a representation of a structure. Choose views by stakeholders’ quality concerns.', 'الـ structure مجموعة العناصر نفسها؛ والـ view تمثيل ليها. واختار الـ views حسب اهتمامات الجودة.'),
    t('Three categories: module (code), C&C (runtime), allocation (environment). Modules and components are not one-to-one.', 'تلات فئات: module (كود)، وC&C (وقت التشغيل)، وallocation (البيئة). والـ modules والـ components مش واحد لواحد.'),
    t('Styles: decomposition, uses, generalization, data model · C&C/concurrency · deployment, install, work assignment.', 'الـ Styles: decomposition وuses وgeneralization وdata model · C&C/concurrency · deployment وinstall وwork assignment.'),
  ],
  slides: [
    { n: 1, title: 'Architectural Views — the documentation equation' },
    { n: 2, title: 'Architectural Views (cont’d): which views are relevant?' },
    { n: 3, title: 'Architectural Views (cont’d): different goals, one definition' },
    { n: 4, title: 'Structures vs Views' },
    { n: 5, title: 'One System, Many Views (Gödel, Escher, Bach cover)' },
    { n: 6, title: 'Kinds of Structures' },
    { n: 7, title: 'Module vs Component? (questions)' },
    { n: 8, title: 'Module vs Component? (decomposition vs client-server view)' },
    { n: 9, title: 'Kinds of Structures (recap)' },
    { n: 10, title: 'Module Structures: questions they answer' },
    { n: 11, title: 'Module Structures: useful module views' },
    { n: 12, title: 'Decomposition Style' },
    { n: 13, title: 'Decomposition Style: A contains B–E' },
    { n: 14, title: 'Decomposition Style: the ATIA-M system' },
    { n: 15, title: 'Decomposition Structure: ATIA server-side Java modules' },
    { n: 16, title: 'Uses Style' },
    { n: 17, title: 'Uses Structure: eStore UML graph' },
    { n: 18, title: 'Uses Structure: ATIA-M' },
    { n: 19, title: 'Component-and-Connector (C&C) View' },
    { n: 20, title: 'C&C View: questions it answers' },
    { n: 21, title: 'C&C Views: Concurrency' },
    { n: 22, title: 'C&C Structures: UML Notation' },
    { n: 23, title: 'Module View Example: vehicle climate control' },
    { n: 24, title: 'C&C View Example: climate control' },
    { n: 25, title: 'C&C View Example: use lollipop notation' },
    { n: 26, title: 'Allocation Views' },
    { n: 27, title: 'Allocation Views: elements and relation' },
    { n: 28, title: 'Allocation Structures: three styles' },
    { n: 29, title: 'Allocation Views: deployment, install, work assignment' },
    { n: 30, title: 'Deployment View: UML example' },
    { n: 31, title: 'UML Deployment Diagram: Sun Fire / Tomcat' },
    { n: 32, title: 'Deployment View: definition and usage' },
    { n: 33, title: 'Deployment View: memory capacity analysis' },
    { n: 34, title: 'Install View: definition and files' },
    { n: 35, title: 'Install View: notation' },
    { n: 36, title: 'Install View: DukesBankApp' },
    { n: 37, title: 'Install View: UML artifacts' },
    { n: 38, title: 'Work Assignment View' },
    { n: 39, title: 'Work Assignment View: ECS table' },
    { n: 40, title: 'Required Readings' },
    { n: 41, title: 'References' },
  ],
  lessons: [views, kinds, moduleViews, ccViews, allocation, choosing],
}
