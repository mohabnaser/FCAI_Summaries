# OS Atlas — Project Guide

This guide is for maintainers of the Chapter 1 study system. It explains how content, quizzes, visuals, progress, and the exam-coverage ledger fit together, and what to change when the platform grows.

## 1. Design goals

1. **Academic correctness first.** The 57-slide transcript is the teaching source of truth; past papers are the assessment source of truth. Do not invent provenance, answers, or exam questions.
2. **English-first, Arabic for understanding.** English remains visible in both modes. Arabic is an explanatory layer, not a replacement.
3. **Complete, auditable coverage.** Every indivisible item in every supplied paper is either mapped to an implementation or excluded with a reason.
4. **One reusable platform.** Section pages are data-driven. Adding Chapter 1 content should not require new page code; the path to future chapters is described in §17.
5. **Local-first study tools.** The app is static and private: no backend, no account, no analytics.

## 2. Stack

| Concern | Choice |
| --- | --- |
| UI | React 19 |
| Language | TypeScript (strict project build) |
| Build/dev server | Vite 8 |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite`, with design tokens in `src/index.css` |
| Routing | React Router 7 (`BrowserRouter`) |
| Icons | `lucide-react` |
| Code display | `prism-react-renderer` |
| Fonts | Fontsource variable Inter, Space Grotesk, JetBrains Mono, Noto Sans Arabic |
| Tests | Vitest 5, Testing Library, jsdom |

There is no state-management or charting dependency. Cross-page state lives in two React contexts; visuals are hand-built HTML/SVG.

## 3. Repository map

```text
.
├─ chapter1.md                 Authoritative 57-slide lecture transcript
├─ final_2024.md               Past papers (source text)
├─ final_2023.md
├─ final_nodate.md
├─ final_nodate2.md
├─ fnial_2020.md               Original supplied filename retained
├─ midterm_2022.md
├─ midterm_2021.md
├─ plan.md                     Master requirements and definition of done
├─ README.md                   Quick start and product summary
├─ docs/
│  ├─ PROJECT_GUIDE.md         This document
│  └─ DELIVERY_REPORT.md       Audit inventory and verification evidence
├─ src/
│  ├─ App.tsx                  Providers, shell route, lazy page routes
│  ├─ main.tsx                 React entry point
│  ├─ index.css                Tailwind theme, components, quiz and print CSS
│  ├─ types.ts                 Content, question, exam, and progress types
│  ├─ components/
│  │  ├─ content/              BlockRenderer, VisualBlocks (new visual block kinds), icons
│  │  ├─ layout/               AppShell, Sidebar, Topbar
│  │  ├─ quiz/                 Engine, taking view, review view, metadata
│  │  ├─ study/                StudyTimer
│  │  ├─ ui/                   Bilingual text, language toggle, progress ring
│  │  └─ visuals/              Fourteen visual components + frame + registry
│  ├─ context/                 LanguageContext, ProgressContext
│  ├─ data/
│  │  ├─ sections/             Nine section modules (s1-…s9-) + helpers (t, part)
│  │  ├─ questions/            Historical Question[] modules + aggregator
│  │  ├─ sections.ts           Nine-section registry, legacy aliases, chapter metadata
│  │  ├─ quizzes.ts            Section-quiz generation + final assessment
│  │  ├─ exams.ts              Paper metadata, audit counts, exclusions, notes
│  │  ├─ coverage.ts           Source-to-implementation mapping + validation
│  │  └─ cheatsheet.ts         Cheat-sheet groups
│  ├─ lib/                     Grading, quiz results, progress derivations
│  ├─ pages/                   Route-level pages
│  └─ test/setup.ts            jest-dom setup
└─ vitest.config.ts            jsdom, threads pool, shared worker settings
```

## 4. Application composition

`src/main.tsx` mounts `<App />`. `src/App.tsx` nests providers and routes:

```text
LanguageProvider
└─ ProgressProvider
   └─ BrowserRouter
      └─ AppShell (sidebar, topbar, Suspense, footer)
         └─ lazy route page
```

- All study pages are route-level lazy imports. The shell stays mounted, so navigation remains responsive while a page chunk loads.
- `AppShell` centralizes route-specific `document.title` values and the section-title lookup. When adding a top-level route, add its title to `pageTitles` and a test assertion.
- `AppShell` owns the skip link, mobile navigation state, Escape-to-close behavior, body scroll lock, and route-change scroll reset.
- The generic `/section/:sectionId` route uses `sectionsById`; an unknown slug is handled by the section page’s not-found path. Truly unknown top-level routes render `NotFoundPage`.

## 5. Content model

All content types are in `src/types.ts`.

### 5.1 Bilingual text

```ts
interface LText {
  en: string
  ar?: string
}
```

`en` is mandatory and is rendered alone in English mode. `ar` is optional data, rendered only in Arabic Explanation mode with `lang="ar"` and `dir="rtl"`.

### 5.2 Section

Each `Section` contains:

| Field | Purpose |
| --- | --- |
| `id` | Stable slug used by routes, progress, and coverage |
| `order` | Display and sort order |
| `kicker`, `title`, `shortTitle` | Header and navigation labels |
| `summary` | Bilingual one-paragraph overview |
| `objectives` | Bilingual learning objectives |
| `estimatedMinutes` | Study-time estimate and timer target |
| `quizId` | Must match the generated section-quiz ID |
| `blocks` | Ordered teaching content |
| `examFocus` | Bilingual exam priorities |
| `keyTerms` | Bilingual term/definition pairs |

### 5.3 Blocks

`BlockRenderer` supports twenty-two block kinds. Prefer the **visual** kinds (first nine rows); use `prose` only for genuinely continuous argument.

| Kind | Use |
| --- | --- |
| `lead` | One prominent opening paragraph (no card) |
| `cards` | Grid of icon concept cards (2–4 columns), optional tag and chips |
| `flow` | Horizontal step-by-step pipeline with arrows (vertical on mobile) |
| `layers` | Stacked layer diagram, optional axis labels (e.g. 0 → 512M) |
| `versus` | Two-sided comparison grid: aspect rows, coloured side headers, bottom line |
| `stats` | “Numbers to remember” tiles |
| `hook` | Memory hook: a phrase or acronym with letter tiles |
| `confusions` | “Don’t say / say instead” pairs |
| `recap` | End-of-section 30-second recap |
| `subsection` | Numbered “Part N” heading inside a section, with optional introduction |
| `prose` | Bilingual paragraphs with optional heading |
| `list` | Ordered or unordered bilingual items |
| `definition` | Term, definition, optional detail |
| `callout` | `exam`, `warning`, `insight`, `misconception`, or `definition` tone |
| `table` | Headers plus rows of bilingual cells |
| `code` | Syntax-highlighted, copyable code |
| `steps` | Numbered process with per-step explanations |
| `compare` | Two-column conceptual contrast |
| `visual` | Registered interactive visual |
| `exam` | Exam-focused note that can cite question IDs |
| `checklist` | Revision checklist |
| `quote` | Attributed quotation |
| `gantt` | Worked scheduling example: Gantt chart plus finish / turnaround / waiting table, computed from the process list |

Blocks are content, not layout primitives. If a new teaching pattern is genuinely reusable, add a block type to `types.ts`, implement it in `BlockRenderer`, and test its rendering.

### 5.4 Questions

`Question` is a discriminated union of `mcq`, `tf`, `fill`, and `short`. Shared fields include:

- `id`: globally unique, stable identifier.
- `sectionId`: must match a real section.
- `topic`, `concept`, `difficulty`: filtering and study metadata.
- `prompt`: always English.
- `sourceRefs`: provenance for historical items only.
- `answerStatus`: `independently-verified`, `official-key`, or `needs-review`.
- `origin`: always `historical`; invented practice items are not part of the bank.
- `unscored`: flagged review items only; excluded from score denominators.
- `explanation`, `takeaway`, optional `hint`, optional `optionNotes`: bilingual feedback.

Type-specific fields:

- MCQ: `options[]` with stable IDs and `correct` option ID.
- True/false: boolean `correct`.
- Fill-in: one or more `blanks[]`, each with accepted English variants.
- Short answer: English `modelAnswer`, keyword `keywordGroups[]`, and `passRatio`.

## 6. Adding or extending a major section

Each section is one file in `src/data/sections/` (`s1-os-intro.ts` … `s9-protection-environments.ts`) covering one contiguous slide range of the lecture’s table of contents. `sections.ts` only lists them in order. Write bilingual text with `t(en, ar)` and numbered parts with `part(title, intro)` from `helpers.ts`.

1. **Edit the section file** that owns the slide range. Structure: `part` → visual blocks → `exam` (cite every question of the section in `refs`) → `recap`.
2. **Do not reveal quiz answers in teaching text.** Teach the fact; never write “statement X is false” or “the answer is (c)”.
3. **Create or edit the question module** in `src/data/questions/` (see §7). Every question’s `sectionId` must be one of the nine section IDs; `questions/index.ts` documents which module feeds which section.
4. **Use the matching quiz ID.** `sectionQuizzes` is generated from `sections`; every question assigned to the section is automatically included. The section’s `quizId` must equal `quiz-${section.id}` by convention.
5. **Keep legacy URLs working.** Add old topic slugs to `legacySectionAliases` so `/section/old-topic` redirects to the merged section.
6. **Run tests.** `coverage.test.ts` asserts exact totals, distribution and assessment sampling; `sections.test.ts` asserts registered visuals, exam-note refs, Arabic explanations on all teaching text, a recap per section, and legacy redirects. Update expectations only after verifying the content is complete.
7. **Check navigation.** Sidebar, home cards, section map, previous/next links, progress denominator, and `totalEstimatedMinutes` all derive from the section registry.

> **Stable IDs matter.** `section.id` is used in URLs and as the key in `localStorage` progress. `quiz.id` keys quiz attempts and best scores. Renaming either silently orphans stored progress. Keep old section IDs in `legacySectionAliases`; `ProgressContext` migrates saved section progress and bookmarks to the merged IDs.

## 7. Adding questions

### 7.1 Placement and registration

Add to the existing `sectionNQuestions` array for the section. If creating a new module, export `sectionNQuestions: Question[]` and append it to `allQuestions` in `src/data/questions/index.ts`.

Every question is automatically placed in its section quiz. The section quiz description counts the historical items dynamically.

### 7.2 Historical questions

Historical questions must preserve provenance and wording:

```ts
{
  id: 's12-short-slug',
  sectionId: 'new-topic',
  topic: '…',
  concept: '…',
  difficulty: 'core',
  type: 'mcq',
  origin: 'historical',
  prompt: '…', // exact or minimally normalized printed stem
  options: [/* stable ids a, b, c, d */],
  correct: 'c',
  sourceRefs: [{ examId: 'final_2024', question: 'Q1.44' }],
  answerStatus: 'independently-verified',
  explanation: { en: '…', ar: '…' },
  takeaway: { en: '…', ar: '…' },
}
```

Rules:

- Use the printed label exactly (`Q1.44`, `Q2.3a`, etc.).
- One printed source item maps to exactly one implementation. If the same item appears verbatim in another paper, add a second `sourceRef` to the **same** question. Do not create a second implementation.
- If wording differs materially, create a separate variant and document the difference in `exams.ts` notes.
- If the printed wording is ambiguous or incomplete, set `answerStatus: 'needs-review'` and `unscored: true`, explain both readings, and keep it out of the final assessment.
- Do not claim an official key unless one was actually supplied.

### 7.3 No invented questions

The bank is historical-only. Do not add a practice item to fill a quiz or balance a section. If a topic has no supplied exam question, leave its section quiz shorter and record the gap in the coverage ledger and section exam note. The `origin` field is typed as `historical` to enforce this at compile time.

### 7.4 Answer formats

- **MCQ:** one correct option ID; distractors should test a real misconception. Add `optionNotes` where a distractor needs explanation.
- **True/false:** add `optionNotes.true` and `.false` when both directions need commentary.
- **Fill-in:** list normalized English variants. Include the canonical term first because review displays it. Multiple blanks are graded all-or-nothing.
- **Short answer:** write a complete English model answer, then define concept groups and a pass ratio. Groups should represent required ideas, not arbitrary phrases. A 0.6 pass ratio means 60% of groups must match.

### 7.5 Updating expected counts

`src/data/coverage.test.ts` intentionally hard-codes 45 historical questions and zero invented items, 356 source items, 51 relevant occurrences, nine sections, the 3/7/3/5/4/11/4/7/1 section distribution, and the 2/4/2/3/2/5/2/4/1 final-assessment distribution. Update these assertions only after the underlying audit is verified. This protects against accidental content loss.

## 8. Final assessment curation

`finalAssessmentQuestionIds` in `src/data/quizzes.ts` is a deliberate 25-question cross-section paper. Maintain these invariants:

- Exactly 25 unique IDs.
- At least one question from every section (`sections.length` sections sampled).
- No `unscored` items.
- A mix of answer formats; every item is historical.
- No question repeated within the paper.

Section quizzes remain the complete historical coverage surface; the final assessment tests transfer, not exhaustive recall. If section count or assessment length changes, update the test in `coverage.test.ts` and the copy in `FinalAssessmentPage`.

## 9. Bilingual authoring rules

### Absolute rules

1. Quiz stems, options, fill-in accepted answers, and short-answer model answers are **English only**. Tests enforce the absence of Arabic characters in these fields.
2. Arabic mode must not hide the English teaching source. It adds explanations.
3. Arabic passages are marked `lang="ar" dir="rtl"`; the document remains `lang="en"`.
4. Preserve official English terminology inside Arabic prose (kernel, mode bit, trap, DMA, etc.). Explain the term; do not replace it with an unofficial translation.

### Style

- Use clear Egyptian Arabic, not formal textbook Arabic.
- Explain the idea, not just translate the sentence.
- Keep code identifiers and exam labels in Latin script.
- Feedback in Arabic leads with the Arabic explanation; the English explanation remains available in a disclosure (`FeedbackText`).
- Arabic visual captions/titles render through `VisualFrame` and `BilingualProse`; structural UI labels remain English.

When adding an `LText`, provide `ar` for explanation-bearing fields. Labels and metadata can remain English-only where translation adds no study value.

## 10. Visual explanations

Fourteen visuals are registered in `src/components/visuals/VisualRenderer.tsx` and keyed by the `VisualId` union in `src/types.ts`: system layers, system organization, interrupt timeline, storage pyramid, cache lookup, I/O methods, device status, DMA compare, multiprocessor, multiprogramming, dual mode, protection, network models, and virtualization stack. The registry is `Partial` because `VisualId` also reserves Chapter 2 IDs whose components do not exist yet; `VisualRenderer` renders nothing for an unregistered ID and `sections.test.ts` fails if a section uses one.

Shared building blocks:

- `VisualFrame` — panel, bilingual title, hint, footer.
- `visualTones` — consistent color tokens.
- `StepControls` — Previous/Next/Reset/Play with a step readout.

To add a visual:

1. Add the ID to `VisualId` in `src/types.ts`.
2. Create `src/components/visuals/NewVisual.tsx` accepting `{ title, hint? }`.
3. Wrap content in `VisualFrame`; use `StepControls` for stepper interactions.
4. Register the component in the `visuals` record.
5. Add a `{ kind: 'visual', id: 'new-visual', title, caption }` block to the relevant section.
6. Test keyboard operation, labels, mobile width, and reduced-motion behavior.

Visuals are explanatory, not decorative. Every interactive state should teach a distinction that prose alone cannot convey. Avoid autoplay that cannot be paused; prefer explicit controls.

## 11. Quiz engine behavior

`QuizEngine` is shared by section quizzes, the final assessment, and bookmarked practice.

### Taking mode

- One question at a time with a numbered navigator.
- Answers can be changed freely; grading is deferred until submission.
- Unanswered navigation triggers a warning that requires explicit **Submit anyway**.
- The timer in section quizzes is a study stopwatch, not an exam countdown. It records active seconds and never force-submits.
- Draft answers are written to `os-atlas:quiz-draft:v1:<quizId>` so a reload does not lose work.

### Submission and scoring

`buildQuizResult` in `src/lib/quiz.ts`:

- Grades every question.
- Excludes `unscored` items from `score` and `total`.
- Records all items in `graded` so flagged items can still be reviewed.
- Counts unanswered questions as incorrect through grading (`undefined` → false), while still reporting the unanswered count.

Grading rules in `src/lib/grading.ts`:

| Type | Rule |
| --- | --- |
| MCQ | Exact option ID match |
| True/false | Strict boolean match |
| Fill-in | Normalize case, accents, punctuation, and whitespace; accept any listed variant; allow a meaningful surrounding phrase if the accepted target is at least four characters; all blanks required |
| Short answer | Normalize and match keyword-group patterns; pass when `matched / total >= passRatio` |

This is deterministic, explainable grading. It is **not** an LLM essay grader and cannot assess argument quality, originality, or factual nuance beyond the configured groups.

### Review mode

- Score, percentage, personal best, and a performance headline.
- Filters: all, incorrect, flagged.
- Each item shows the user’s answer, correct answer/model answer, bilingual explanation, takeaway, option notes, and provenance.
- **Retry** clears the current answers and returns to taking mode while preserving the personal best.

### Persistence

`ProgressContext.saveQuizAttempt` stores the latest attempt in `quizzes[quizId]` and updates `bestScores[quizId]` only when the score ratio improves. `getMissedQuestions` uses the latest result per question and ignores unscored items.

## 12. Progress and local storage

`ProgressProvider` loads state lazily and persists it after a 250 ms debounce. It also flushes on `pagehide` and when the document becomes hidden, which prevents a quick full-page navigation from losing a section visit.

Storage shape:

```ts
interface ProgressState {
  sections: Record<string, {
    visited: boolean
    completed: boolean
    lastVisitedAt: number | null
    elapsedSeconds: number
  }>
  quizzes: Record<string, QuizAttempt>
  bookmarks: { sections: string[]; questions: string[] }
  bestScores: Record<string, { score: number; total: number; at: number }>
}
```

Keys:

- `os-atlas:progress:v1` — progress state.
- `os-atlas:language:v1` — `en` or `ar`.
- `os-atlas:quiz-draft:v1:<quizId>` — per-quiz draft.

Operational notes:

- Storage failures are caught; the app continues in memory.
- Version the key before changing the schema and migrate old data rather than discarding it.
- Reset progress removes only the main progress key; drafts and language are separate by design.
- There is no cross-device sync. Document this rather than implying cloud persistence.

## 13. Coverage ledger

### 13.1 Source of truth

- `src/data/exams.ts` holds paper metadata, total item counts, relevant IDs, excluded groups with reasons, and paper-specific notes.
- Every historical question’s `sourceRefs` maps a printed label to an implementation.
- `src/data/coverage.ts` builds the mapping, summary, and validation from those two sources.
- `src/pages/CoveragePage.tsx` renders the audit for students and reviewers.

### 13.2 Counting convention

Count each **indivisible answerable item** once:

- Each MCQ or true/false prompt = 1.
- Each fill-in blank = 1 (a five-blank paragraph is five items).
- Each definition or explicitly required essay part = 1.
- A multi-part short-answer question is split only when the paper requires separate answers.

This is finer-grained than “question numbers” and prevents a blank or subpart from disappearing. The total of 356 is therefore an item count, not a count of numbered questions.

### 13.3 Classification

A source item is **relevant** when it tests a concept taught in the supplied Chapter 1 transcript, even if the same concept reappears in a later chapter. It is **excluded** when it depends on material not taught in Chapter 1. Every excluded group records a count and a reason.

Borderline decisions must be documented in `notes`; the Final 2020 “uniprogramming” item is the current example. Do not silently broaden Chapter 1 to inflate coverage.

### 13.4 Reconciliation invariants

`validateCoverage()` checks:

1. Every relevant ID has an implementation.
2. Relevant + excluded = total for every paper.
3. Global relevant + excluded = 356.
4. No printed source item is mapped by two implementations.

`coverage.test.ts` additionally asserts the exact summary and that all historical questions appear in their section quiz.

### 13.5 Maintaining the ledger

When adding a paper:

1. Audit every page and record the total indivisible item count.
2. List every relevant printed ID.
3. Group exclusions by contiguous ranges with counts and chapter-level reasons.
4. Add source refs to existing implementations when an item is an exact duplicate; otherwise create a new historical question.
5. Add the exam to `ExamId`, `exams`, and `examAudits`.
6. Update source labels if the printed paper uses odd numbering.
7. Run `npm test` and inspect `/coverage` for reconciliation, labels, and review flags.

Never adjust totals to match the implementation count. The audit is independent evidence; the implementation must satisfy it.

## 14. Testing

```powershell
npm test          # one run
npm run test:watch
```

Current suite: **74 tests in 8 files**. On low-memory machines run files one at a time (`npx vitest run src/data/coverage.test.ts`, …); `vitest.config.ts` uses a single worker for the same reason.

| File | Scope |
| --- | --- |
| `src/data/chapter2.test.ts` | Chapter 2 bank, ledger (36 relevant / 320 excluded / 7 cross-references), per-section quiz counts, final assessment |
| `src/data/chapter6.test.ts` | Chapter 6 bank (42), ledger (63 relevant / 293 excluded / 7 cross-references / 7 review), per-lesson quiz counts, 19-item final assessment, garnet theme, and the scheduler re-deriving every slide value and exam answer |
| `src/data/chapter5.test.ts` | Chapter 5 bank (23), ledger (31 relevant / 325 excluded), per-lesson quiz counts, final assessment, and a check that no chapter’s study text cites slide numbers |
| `src/data/chapter3.test.ts` | Chapter 3 bank (40), ledger (64 relevant / 292 excluded / 15 cross-references), per-section quiz counts, 18-item final assessment, sunset theme |
| `src/data/sections.test.ts` | Every chapter: registered visuals, cross-references, exam-note refs, Arabic on teaching text, recaps; Chapter 1 nine-section order, registered visuals, exam-note refs, Arabic on teaching text, recaps, legacy redirects, cache-simulator logic |
| `src/data/coverage.test.ts` | Historical-only bank integrity, nine-section distribution, bilingual quiz rule, provenance, review flags, ledger reconciliation, section-quiz completeness, assessment composition |
| `src/lib/grading.test.ts` | Normalization, all four answer formats, keyword groups, unscored denominator, empty answers |
| `src/lib/progress.test.ts` | Duration/percent formatting, dashboard summary, missed-question tracking, labels |
| `src/components/ui/Text.test.tsx` | English default and Arabic explanation toggle |
| `src/components/quiz/QuizEngine.test.tsx` | End-to-end grading, feedback, bookmarks, retry, unanswered warning, and non-double-counted result summary |
| `src/App.test.tsx` | Home, coverage navigation, bookmarks, not-found, route titles |

`vitest.config.ts` uses jsdom, `pool: 'threads'`, `maxWorkers: 2`, and `isolate: false`. The default fork pool timed out in this Windows environment; the thread pool is stable. Do not tighten worker isolation without rechecking suite time and shared-state assumptions.

### Browser-level QA

The QA for the nine-section redesign (4 November 2026) used a temporary `playwright-core` install in a scratch folder, driving the local Chrome against `npm run preview`:

- **Render audit:** each of the nine sections at 1440px (English) and 390px (Arabic); every content block screenshotted and inspected; zero console errors; zero horizontal overflow.
- **Interaction audit (36/36):** five legacy redirects; quiz counts on all nine sections; each new visual driven through its controls with the resulting state asserted (layer classifier, bus stepper reaching the interrupt, cache LRU = 4 hits / FIFO = 3 hits on the sample string, pyramid level data, device-status queue emptying to idle, DMA 16 vs 1 interrupts, SMP 2/3 throughput after a failure, hot-standby takeover, P2P role flip, emulation); and the home, review, assessment, cheat-sheet, coverage, progress and bookmarks routes.

The earlier five-section release additionally recorded 107/107 route/interaction checks and 91/91 overflow checks (print, reduced motion, timer persistence, bookmarks migration); those behaviours were not changed by the redesign. The harness is intentionally not committed because Playwright is not a runtime dependency.

## 15. Styling and accessibility

- Tailwind 4 uses CSS-first configuration: theme tokens live in `@theme` inside `src/index.css`. There is no `tailwind.config.js`.
- Reusable classes (`panel`, `btn`, `badge`, `section-title`, `prose-atlas`, `quiz-option`, etc.) are defined in `index.css`.
- Layout primitives also live in `index.css`: `.app-shell` owns `--sidebar-width` (17.5rem expanded, 4.75rem collapsed); `.page-container` caps content at 1760px; `.lesson-layout` is single-column with an optional 15.5rem sticky rail at 1536px; `.lesson-copy` caps prose at 86ch. Sidebar collapse persists under `os-atlas:sidebar-collapsed:v1`.
- Body copy is 17–19px at roughly 1.7 line height; section titles are 36–44px, section headings 26–32px, subheadings 20–24px, and metadata 12–14px. Keep new components on that scale.
- The visual identity is dark, cyan/teal-accented, technical, and editorial. Color is semantic: cyan/teal for primary/progress, blue for information, violet for secondary, green for success, amber for exams, and red for errors. Keep new components consistent rather than introducing one-off palettes.
- Focus-visible outlines, skip link, semantic headings, `aria-pressed` on toggles, labeled tab/group controls, and `role="status"` loading feedback are in place.
- Arabic text is locally RTL and language-tagged; the interface does not flip wholesale.
- `prefers-reduced-motion` disables nonessential motion.
- Print rules hide shell chrome, force white backgrounds, normalize headings, body text, badges, tables, and code for legibility on every route, and avoid breaking cards. The cheat sheet additionally uses `.print-area` for its dedicated print layout.

When adding UI, verify keyboard order, visible focus, color contrast, 200% zoom, 390 px width, and screen-reader names. Do not rely on color alone to communicate correct/incorrect state.

## 16. Build and deployment

```powershell
npm run build
npm run preview -- --port 4173 --strictPort --host 127.0.0.1
```

The build runs `tsc -b` before Vite. Output is `dist/`.

Deployment requirements:

- Serve `dist/` as static files.
- Rewrite unknown paths to `index.html` (SPA fallback), otherwise direct navigation to `/section/...` or `/coverage` returns 404.
- No environment variables, API keys, or server runtime are required.
- Hashed assets can be cached aggressively; `index.html` should not be.

## 17. Chapters and adding the next one

The platform is multi-chapter. One registry, `src/data/chapters.ts`, lists every chapter as a `ChapterBundle` (meta, sections, owned questions, section quizzes, final assessment, cheat sheet, coverage). Pages never import a chapter directly: chapter routes read `:chapterId`; section pages find their chapter with `chapterOfSection()`; chapter-neutral pages use `useActiveChapter()` (URL first, then the last chapter visited, `os-atlas:last-chapter:v1`).

| Concern | Where |
| --- | --- |
| Chapter 1 data | `src/data/sections.ts`, `sections/`, `questions/section*.ts`, `exams.ts`, `cheatsheet.ts` |
| Chapter 2 data | `src/data/chapter2/` — `index.ts` (meta, sections, final-assessment IDs), `sections/`, `questions.ts`, `exams.ts`, `cheatsheet.ts` |
| Chapter 2 visuals | `src/components/visuals/chapter2/` |
| Chapter 3 data | `src/data/chapter3/` — same layout as `chapter2/` |
| Chapter 5 data | `src/data/chapter5/` — same layout as `chapter2/` |
| Chapter 5 visuals | `src/components/visuals/chapter5/` — RaceCondition, SemaphoreLab, ReadersWriters, DiningPhilosophers |
| Code highlighting | `src/components/content/highlight.ts` (Prism grammar additions + theme-token colours), used by `CodeBlock` in `BlockRenderer.tsx` |
| Chapter 6 data | `src/data/chapter6/` — same layout as `chapter2/` |
| Chapter 6 visuals | `src/components/visuals/chapter6/` — BurstCycle, DecisionPoints, SchedulingLab (three variants), BurstPredictor, QuantumExplorer, MlfqSim; shared Gantt chart and results table in `gantt.tsx` |
| Scheduling engine | `src/lib/scheduling.ts` — exact FCFS/SJF/SRTF/priority/RR simulator used by the `gantt` block, the labs and the tests |
| Chapter 3 visuals | `src/components/visuals/chapter3/` — ProcessMemory, ProcessStates, ForkTrace, BoundedBuffer, MessageBuffering |
| Routes | `/chapter/:chapterId[/review|assessment|cheat-sheet|coverage]`; legacy `/review` etc. redirect to Chapter 1 |
| Theme | `ChapterMeta.theme` (`night`, `bloom`, `sunset`, `jade` or `garnet`); `ThemeContext` preference `auto|night|bloom|sunset|jade|garnet`; the colourful themes share the motion rules (`:root:is([data-theme="bloom"], [data-theme="sunset"], [data-theme="jade"])`), and Jade then turns off the background blobs and makes surfaces opaque; tokens and Bloom motion in `src/index.css`; scroll reveal via `useScrollReveal` (`src/lib/useScrollReveal.ts`) and `data-reveal` |

### Cross-chapter questions

One printed exam item has exactly one implementation across the whole course. When a later chapter also teaches an item that an earlier chapter already implements, **do not re-implement it**: list its ID in the section’s `crossRefQuestionIds`. The question then appears in that section’s quiz, the chapter’s audit lists the source item as relevant, and `buildChapterCoverage()` counts it as a cross-reference (`summary.crossRef`). Misses on a cross-referenced question are attributed to the section whose quiz they were answered in.

### Adding Chapter N

1. Add the ID to `ChapterId` in `src/types.ts`.
2. Create `src/data/chapterN/` mirroring `chapter2/`: section files (IDs prefixed `cN-`), `questions.ts` (IDs prefixed `cN-`, `chapterId` set), `exams.ts` (a full audit of every paper with the same `totalItems` as the other chapters), `cheatsheet.ts`, `index.ts`.
3. Register the questions in `questions/index.ts`, the section quizzes and final assessment in `quizzes.ts`, the coverage in `coverage.ts`, and the bundle in `chapters.ts`.
4. Register any new visuals in `VisualRenderer.tsx` and add their IDs to `VisualId`.
5. Add a `chapterN.test.ts` that pins the audit summary, per-paper relevant counts, cross-references, per-section quiz counts and final-assessment composition. `sections.test.ts` checks every chapter’s content automatically.
6. Run the tests and a browser pass over every new section in both languages.

## 18. Maintenance checklists

### Before adding content

- [ ] Read the relevant transcript slides and any source items in full.
- [ ] Check whether the concept already exists in another section.
- [ ] Decide whether the source item is relevant, excluded, or a duplicate.
- [ ] Record provenance before writing prose.

### Before shipping a change

- [ ] `npm test` passes.
- [ ] `npm run build` passes.
- [ ] New historical IDs reconcile in `/coverage`.
- [ ] New questions appear in the correct section quiz.
- [ ] Arabic fields are present where explanations are expected.
- [ ] Quiz stems/options remain English.
- [ ] 320, 360, 390, 768, and 900px layouts have no horizontal overflow.
- [ ] The desktop sidebar still collapses and persists.
- [ ] Interactive visual labels do not clip at mobile width.
- [ ] Keyboard and screen-reader labels still work.
- [ ] Print layout still hides shell chrome and remains readable on sections and the cheat sheet.
- [ ] Documentation and counts are updated.
