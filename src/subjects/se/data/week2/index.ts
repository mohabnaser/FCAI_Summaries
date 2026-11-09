import type { Week } from '../../types'
import { t } from '../helpers'
import { whyHard } from './l1-why-hard'
import { archDesign } from './l2-arch-design'
import { economics } from './l3-economics'
import { modelLaws } from './l4-model-laws'
import { architect } from './l5-architect'
import { ml } from './l6-ml'

export const week2: Week = {
  id: 'week-2',
  number: 2,
  title: 'Foundations of Modern Engineering',
  topic: 'Architecture, its economics, the architect, and ML systems',
  lede: t(
    'Why software is hard, what architecture really is, why structure pays for itself, how an architect thinks — and why machine learning is the ultimate test of all of it.',
    'ليه السوفتوير صعب، والـ architecture إيه بالظبط، وليه الهيكل بيرجّع تمنه، والمعماري بيفكر إزاي — وليه الـ machine learning هو أصعب اختبار لكل ده.',
  ),
  sourceFile: 'Week 2 slides (37 slides)',
  readings: ['CleanArch Ch1, Ch2', 'FSA Ch1, Ch2', 'DMLS Ch1'],
  bigIdeas: [
    t('Architecture and design are an unbroken continuum. Cleanliness is speed.', 'الـ Architecture والـ design استمرارية واحدة. النضافة = سرعة.'),
    t('Architecture is a series of localized trade-offs; there is no “perfect” system.', 'الـ Architecture سلسلة trade-offs محلية؛ ومفيش سيستم “مثالي”.'),
    t('ML systems fail silently; they require statistical, not just deterministic, verification.', 'أنظمة الـ ML بتفشل بصمت؛ ومحتاجة تحقق إحصائي، مش deterministic بس.'),
  ],
  slides: [
    { n: 1, title: 'Cover — Week 2: Foundations of Modern Engineering' },
    { n: 2, title: 'Master Reference Bibliography', note: 'Same as Week 1, slide 3' },
    { n: 3, title: 'The Software Crisis & “No Silver Bullet”' },
    { n: 4, title: "Brooks' Inherent Software Properties" },
    { n: 5, title: 'The Continuum of Architecture & Design' },
    { n: 6, title: 'Software Architecture vs Software Design' },
    { n: 7, title: 'Architecture and Design: Visual Comparison' },
    { n: 8, title: 'Software Architecture vs Software Design (continued)' },
    { n: 9, title: 'The House Architect Analogy' },
    { n: 10, title: 'The Fundamental Goal of Architecture' },
    { n: 11, title: 'The “Clean Up Later” Fallacy' },
    { n: 12, title: 'A Tale of Two Values: Behavior vs Structure' },
    { n: 13, title: 'The Cost-Friction Principle' },
    { n: 14, title: 'The Eisenhower Matrix in Software' },
    { n: 15, title: 'Table 1: Extreme Value Trade-offs' },
    { n: 16, title: 'The 4D Model of Architecture' },
    { n: 17, title: 'The Eight Core Expectations of an Architect' },
    { n: 18, title: 'The Eight Core Expectations (continued)' },
    { n: 19, title: 'Case Study: Pets.com' },
    { n: 20, title: 'Case Study: 2002 Data Center' },
    { n: 21, title: 'Technical Depth vs Technical Breadth' },
    { n: 22, title: 'Software Process vs Engineering Practices' },
    { n: 23, title: 'The First Law of Software Architecture' },
    { n: 24, title: 'The Second Law of Software Architecture' },
    { n: 25, title: 'Architectural Thinking: The “Circle of Life”' },
    { n: 26, title: 'Hands-on Preservation Strategies' },
    { n: 27, title: 'The Knowledge Pyramid' },
    { n: 28, title: 'The Probabilistic Paradigm Shift' },
    { n: 29, title: 'Machine Learning Systems in Production' },
    { n: 30, title: 'When NOT to Use Machine Learning' },
    { n: 31, title: 'When NOT to Use Machine Learning (continued)' },
    { n: 32, title: 'Four Pillars of Production ML Systems' },
    { n: 33, title: 'Table 2: Traditional SWE vs ML Engineering' },
    { n: 34, title: 'Think & Defend: Dilemma 1 — Speed vs Structural Integrity' },
    { n: 35, title: 'Think & Defend: Dilemma 2 — Latency vs Throughput' },
    { n: 36, title: 'Think & Defend: Dilemma 3 — Accuracy vs Maintainability' },
    { n: 37, title: 'Summary & Next Week' },
  ],
  lessons: [whyHard, archDesign, economics, modelLaws, architect, ml],
}
