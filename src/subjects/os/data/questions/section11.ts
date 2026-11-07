import type { Question } from '../../types'
export const section11Questions: Question[] = [
  {
    id: 's11-virtual-machine-tf',
    sectionId: 'protection-environments',
    topic: 'Computing environments',
    concept: 'Virtual machine abstraction',
    difficulty: 'stretch',
    type: 'tf',
    origin: 'historical',
    prompt:
      'The fundamental idea behind a virtual machine is to abstract the hardware of different computers into a single execution environment.',
    correct: false,
    sourceRefs: [{ examId: 'final_2020', question: 'Q1.9' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'False. A virtual machine abstracts the hardware of a single computer into several different execution environments, each appearing to run its own private computer. The statement reverses the direction: it says different computers are abstracted into one environment.',
      ar: 'غلط. الـ virtual machine بتجرد hardware جهاز واحد إلى أكتر من execution environments، وكل واحدة بتبان كأنها جهاز خاص. الجملة عكست الاتجاه: قالت أجهزة مختلفة تتجرد لبيئة واحدة.',
    },
    optionNotes: {
      true: { en: 'Incorrect: one computer → several environments, not several computers → one.', ar: 'غلط: جهاز واحد → عدة بيئات، مش العكس.' },
      false: { en: 'Correct: the direction in the statement is reversed.', ar: 'صح: الاتجاه في الجملة معكوس.' },
    },
    takeaway: {
      en: 'Virtualization: one physical machine → multiple isolated execution environments.',
      ar: 'virtualization: جهاز واحد → عدة بيئات تنفيذ معزولة.',
    },
  },
]
