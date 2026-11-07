import type { Question } from '../../types'
export const section8Questions: Question[] = [
  {
    id: 's8-file-abstraction-tf',
    sectionId: 'resource-management',
    topic: 'Storage management',
    concept: 'File abstraction',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt:
      'The operating system implements the abstract concept of a file by managing mass storage media and the devices that control them.',
    correct: true,
    sourceRefs: [{ examId: 'final_2020', question: 'Q1.4' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'True. The OS gives a uniform logical view of storage by abstracting physical media into files. It manages the mass-storage media and their device controllers, maps files onto secondary storage, and supports operations such as create, delete, read, and write.',
      ar: 'صح. الـ OS بيوفر uniform logical view للتخزين عن طريق تحويل الـ physical media لـ files. بيدير الـ mass storage والـ device controllers، وبيحط الـ files على secondary storage، ويدعم create/delete/read/write.',
    },
    optionNotes: {
      true: { en: 'Correct: the file abstraction is implemented on top of managed storage devices.', ar: 'صح: file abstraction مبنية فوق storage devices مُدارة.' },
      false: { en: 'Incorrect: this is exactly what file-system management does.', ar: 'غلط: ده بالظبط شغل file-system management.' },
    },
    takeaway: {
      en: 'File = logical unit; the OS hides disk/tape details behind it.',
      ar: 'الـ file = logical unit، والـ OS بيخفي تفاصيل الـ disk/tape وراها.',
    },
  },
  {
    id: 's8-filesystem-fill',
    sectionId: 'resource-management',
    topic: 'Storage management',
    concept: 'File-system management activities',
    difficulty: 'core',
    type: 'fill',
    origin: 'historical',
    prompt:
      'Mapping files onto secondary storage is one of the activities of the {{1}} component of the OS.',
    blanks: [
      {
        id: 'b1',
        label: 'Blank 1',
        accepted: ['file system', 'file-system', 'file system management', 'file-system management', 'file manager'],
      },
    ],
    sourceRefs: [{ examId: 'midterm_2022', question: 'Q2.4' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Mapping files onto secondary storage is a file-system management activity. The file system also creates and deletes files and directories, supports primitives for manipulating them, and backs files up onto stable storage.',
      ar: 'تحويل الـ files لـ secondary storage من أنشطة file-system management. الـ file system كمان بيعمل create/delete للfiles والdirectories، ويدعم primitives للتعامل معاها، وبيعمل backup على stable storage.',
    },
    takeaway: {
      en: 'File-system management = files, directories, primitives, mapping, access control, backup.',
      ar: 'file-system management = files وdirectories وprimitives وmapping وaccess control وbackup.',
    },
  },
]
