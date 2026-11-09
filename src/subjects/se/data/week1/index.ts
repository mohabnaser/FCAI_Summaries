import type { Week } from '../../types'
import { t } from '../helpers'
import { compass } from './l1-compass'
import { harness } from './l2-harness'
import { aerospace } from './l3-aerospace'

export const week1: Week = {
  id: 'week-1',
  number: 1,
  title: 'Foundations & the AI-Augmented SDLC',
  topic: 'Foundations of Modern Software Engineering',
  lede: t(
    'Why this course exists: architecture as hard-to-change decisions, why bigger AI models were not enough, and a real case where “perfect” AI code silently failed.',
    'المادة دي موجودة ليه: الـ architecture كقرارات صعب تتغير، وليه الموديلات الأكبر ماكانتش كفاية، وحالة حقيقية كود AI “مثالي” فشل فيها من غير ما حد ياخد باله.',
  ),
  sourceFile: 'week_01_slides.pdf',
  readings: ['CleanArch Ch1, Ch2', 'FSA Ch1, Ch2', 'DMLS Ch1'],
  bigIdeas: [
    t('Architecture = the decisions that are hard to change later.', 'الـ Architecture = القرارات اللي صعب تتغيّر بعدين.'),
    t('“The only way to go fast, is to go well.” Without governance, AI produces technical debt at unprecedented speed.', '“The only way to go fast, is to go well.” ومن غير governance الـ AI بيعمل technical debt بسرعة غير مسبوقة.'),
    t('Intelligence lives in the deterministic harness that constrains, coordinates and verifies the model — the LLM is the engine, the harness the vehicle.', 'الذكاء في الـ harness اللي بيقيّد وينسّق ويتحقق من الموديل — الـ LLM موتور والـ harness عربية.'),
    t('Correct-looking, test-passing AI code can still fail silently (float32 truncation) and open security holes (hallucinated, typo-squatted dependency).', 'كود AI شكله صح وعدّى الـ tests ممكن يفشل بصمت (float32 truncation) ويفتح ثغرات (dependency متألفة وtypo-squatted).'),
  ],
  slides: [
    { n: 1, title: 'Cover — CS352: Advanced Software Engineering' },
    { n: 2, title: 'Course Objectives' },
    { n: 3, title: 'Master Reference Bibliography' },
    { n: 4, title: 'Software Engineering in the Era of AI' },
    { n: 5, title: 'Case Study: The Limits of Unconstrained AI' },
    { n: 6, title: 'Case Study: The Limits of Unconstrained AI', note: 'Repeat of slide 5' },
    { n: 7, title: 'Software Engineering Strikes Back' },
    { n: 8, title: 'The Moral of the Harness' },
    { n: 9, title: 'Case Study Context: Aerospace Subsystem' },
    { n: 10, title: 'The Setup: AI-Generated PID Logic' },
    { n: 11, title: 'The Incident: Silent Logic Bug' },
    { n: 12, title: 'The Security Flaw: AI Supply Chain Attack' },
    { n: 13, title: '(blank slide)', note: 'Blank' },
  ],
  lessons: [compass, harness, aerospace],
}
