# OS Atlas — Operating Systems (Chapters 1–2)

An interactive, exam-aligned study system for **Introduction to Operating Systems**. It turns the supplied 57-slide Chapter 1 transcript into nine visual teaching sections that follow the lecture’s own slide order, a 45-question historical bank (51 exam occurrences), fourteen interactive concept visuals, and a complete audit of seven past papers.

The application is English-first. **Arabic Explanation** mode adds Egyptian Arabic explanations beside the English source while keeping every quiz stem, option, accepted answer, and model answer in English.

## Reading experience

The interface is an editorial study space rather than a dashboard:

- A **1760px shell** gives the lesson most of the screen. The desktop chapter sidebar is 280px and collapses to 76px; the choice persists in `os-atlas:sidebar-collapsed:v1`.
- Each section opens with a **full-width hero**, followed by an objectives and study-timer band. Reading prose is capped at **86ch**, while cards, tables, and visuals use the full lesson column.
- At **1536px and wider**, a sticky “On this page” rail appears. Below that, the lesson stays single-column; the mobile drawer remains off-canvas.
- Body prose is **17–19px at ~1.7 line height**; section titles are 32–41px, headings 26–30px, subheadings 20–24px, and metadata 12–14px.
- The dark navy palette assigns color by role: cyan/teal for primary actions and progress, blue for information, violet for secondary concepts, green for success, amber for exam focus, and red for errors.
- Blocks are visually differentiated — definitions, intuition, steps, comparisons, worked examples, exam alerts, mistakes, and takeaways — with subtle motion that stops under `prefers-reduced-motion`.
- Print styles produce legible white-background pages on every route; the cheat sheet also has a dedicated `.print-area` layout.

## Quick start

Verified with Node.js 24.11.1 and npm 11.6.2. Node.js 22+ is recommended.

```powershell
npm install
npm run dev
```

Vite prints the local development URL (normally `http://localhost:5173`).

### Production build and preview

```powershell
npm run build
npm run preview -- --port 4173 --strictPort --host 127.0.0.1
```

Open `http://127.0.0.1:4173/`. Use `127.0.0.1` rather than `localhost` if the preview server binds only to IPv4. The build is a static SPA; production hosting needs an `index.html` fallback for client-side routes.

### Tests

```powershell
npm test
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Course home: every chapter with its progress, size and theme |
| `/chapter/:chapterId` | Chapter home (`chapter-1`, `chapter-2`): learning path, inventory, study tools |
| `/section/:sectionId` | Teaching section, key terms, study timer, and section quiz (section IDs are unique across chapters) |
| `/chapter/:chapterId/review` | Whole-chapter review and exam-priority synthesis |
| `/chapter/:chapterId/assessment` | Curated final assessment (25 questions for Ch 1, 16 for Ch 2) |
| `/chapter/:chapterId/cheat-sheet` | Printable, dense revision sheet |
| `/chapter/:chapterId/coverage` | Searchable source-to-implementation coverage ledger for that chapter |
| `/bookmarks` | Saved sections, saved questions, and progress shortcuts |
| `/bookmarks/practice` | Quiz assembled from bookmarked questions |
| `/progress` | Section completion, study time, quiz history, and best scores |

The nine section slugs are `os-intro`, `startup-interrupts`, `storage-caching`, `io-structure`, `system-architecture`, `multiprogramming`, `dual-mode`, `resource-management`, and `protection-environments`. Every older URL — the eleven original topic slugs and the five merged slugs of the previous release (e.g. `/section/foundations-startup`) — redirects to the section that now teaches that topic.

## Chapter 6 — CPU Scheduling

Built from `chapter6.md` (45 pages) as **five lessons**:

| # | Lesson | Est. min | Past-exam Qs (own + shared) |
| ---: | --- | ---: | ---: |
| 1 | Basics & Criteria (burst cycle, scheduler, decision points, dispatcher, formulas) | 16 | 8 + 5 shared |
| 2 | FCFS, SJF & SRTF (convoy effect, burst prediction) | 20 | 10 |
| 3 | Priority & Round Robin (aging, quantum, the RR tie rule) | 22 | 15 + 1 shared |
| 4 | Multilevel Queues & Multiple-Processor Scheduling | 14 | 4 |
| 5 | Evaluating Algorithms & the Exam Problem Clinic | 18 | 5 |
| | **Total** | **90** | **42 + 6 shared** |

- **Coverage:** 356 items audited — **63 relevant occurrences**, 293 excluded with reasons. They map to **48 implementations**: 42 owned by Chapter 6 and 6 owned by Chapters 1 and 3 (short-term scheduler, ready queue, I/O-bound bursts, the dispatcher fill-in, response time, “time slot → ready”), shown as shared questions.
- **Every number is computed.** `src/lib/scheduling.ts` is an exact scheduler (FCFS, SJF, SRTF, priority both ways, RR with either same-instant tie rule). The new `gantt` block draws each lecture example from its process list, and `chapter6.test.ts` re-derives every slide value (17/3, 7, 4/3, 6.5, 8.2, 5.66, 73, the q-curve, 28/13/23, the 10-8-6-6-5-9-11-12 prediction) and every exam answer.
- **Five flagged items** (seven occurrences), all unscored and fully explained: Final 2023 / Undated A Q3.63 computes to **9.75**, which is not an option (the scan’s handwritten note agrees); Final 2020 Q3.63 and Q3.65 match no option (a USB drive covers the scanned table); Final 2020 Q2.43 has two preemptive options; Final 2023 Q2.44 has two defensible options. A flagged MCQ may now have no correct option; review shows “none of the printed options matches”.
- **Visuals (eight, each tied to exam questions):** CPU-burst histogram with I/O- vs CPU-bound programs, the four decision points on the state diagram, a scheduling lab (editable processes, step-by-step decisions with reasons, filling Gantt chart and TAT/WT table, lecture and past-exam presets, tie-rule switch, “compare all” for deterministic modeling) used in three variants, an exponential-averaging predictor, a quantum explorer (switches and turnaround vs q), and a multilevel-feedback-queue simulator.
- **Quiz improvements for calculation questions:** process tables render inside question stems (`| … |` lines), and fill-ins with more than four blanks show labelled inputs in a grid (“Waiting · P1”, “FCFS · avg”).
- **Garnet theme:** deep wine surfaces, warm ivory text, a gold accent with tangerine (exam), mint, lilac, sky and raspberry, and a faint time ruler along the hero like a Gantt axis. The theme button cycles *chapter default → night → bloom → sunset → jade → garnet*.

## Chapter 5 — Process Synchronization

Built from `chapter5.md` (39 pages) as **four lessons**:

| # | Lesson | Est. min | Past-exam Qs |
| ---: | --- | ---: | ---: |
| 1 | Race Conditions & the Critical-Section Problem | 15 | 7 |
| 2 | Peterson’s Solution & Synchronization Hardware | 16 | 4 |
| 3 | Mutex Locks & Semaphores | 18 | 5 |
| 4 | Classic Problems (bounded buffer, readers–writers, dining philosophers) | 20 | 7 |
| | **Total** | **69** | **23** |

- **Coverage:** 356 items audited — **31 relevant occurrences**, 325 excluded with reasons. They map to **23 implementations** (8 reprinted items share an implementation); no cross-references and no review items.
- **Visuals (four):** the counter++/counter-- race (three orders, 4 / 6 / 5), a semaphore lab (correct order, signal…wait, wait…wait, with S.value and the waiting queue), a readers–writers simulator that runs the real code against real semaphores (one-click Midterm 2022 cases), and the dining-philosophers deadlock.
- **Jade theme:** neutral graphite with fully opaque surfaces (no background blobs or glass), crisp near-white text, a jade accent with violet, gold, sky and coral. The theme button now cycles *chapter default → night → bloom → sunset → jade*.
- **Code blocks** across all chapters are now syntax-highlighted (prism-react-renderer, C and Java) with line numbers; token colours follow the active theme.
- **No slide numbers in study text:** section labels read “Lesson 01”, and every “slide N” reference was removed from Chapters 1–3 (a test enforces this for every chapter).

## Chapter 3 — Processes

Built from `chapter3.md` (51 slides) as **five sections** following the six topics of slide 2:

| # | Section | Slides | Est. min | Past-exam Qs (own + shared) |
| ---: | --- | --- | ---: | ---: |
| 1 | The Process (memory, states, PCB) | 3–10 | 16 | 10 + 3 shared |
| 2 | Scheduling & Context Switch | 11–18 | 15 | 14 + 1 shared |
| 3 | Process Operations (fork, exec, wait, exit) | 19–24 | 13 | 2 + 3 shared |
| 4 | IPC (shared memory, message passing) | 25–39 | 20 | 9 + 5 shared |
| 5 | Client–Server (sockets, RPC, pipes, RMI) | 40–50 | 14 | 5 |
| | **Total** | | **78** | **40 + 12 shared** |

- **Coverage:** the same 356 items were audited for Chapter 3 — **64 relevant occurrences**, 292 excluded with reasons, reconciled per paper. 49 occurrences map to **40 Chapter 3 implementations**; **15 occurrences** (process definition, degree of multiprogramming, fork, IPC models and operations) map to **12 Chapter 1 and 2 implementations**, shown as shared questions. One item (Final 2020 Q2.29, the CPU-bound reversal of the “all I/O-bound” question) is flagged for review and unscored because its second blank is not stated in the source.
- **Midterm 2022 Q4** (IPC models + direct vs indirect) was unscored in Chapter 2 because its second half is Chapter 3 material; it is now scored and appears in both chapters’ IPC quizzes.
- **Visuals (five, each tied to exam questions):** where-does-it-live memory classifier (stack questions), process state diagram with legal transitions and queues, fork()/exec()/wait() trace of slide 23’s program, bounded-buffer simulator showing why only BUFFER_SIZE − 1 slots are used, and a zero/bounded/unbounded buffering lab (rendezvous). Other content uses lighter static blocks.
- **Sunset theme:** Chapter 3 opens in a warm theme — deep sea-teal surfaces, cream text, apricot as the main accent balanced by sun gold, sea green, sky blue, lavender and coral, with Bloom’s gentle motion. The theme button now cycles *chapter default → night → bloom → sunset*.

## Chapter 2 — Operating-System Structures

Built from the 51-slide `chapter2.md` transcript on the same platform, in **six sections** following its slide-2 topics:

| # | Section | Slides | Est. min | Past-exam Qs (own + shared) |
| ---: | --- | --- | ---: | ---: |
| 1 | Services & Interfaces | 3–12 | 16 | 5 |
| 2 | System Calls & API | 13–19 | 18 | 4 |
| 3 | Types of System Calls | 20–25 | 17 | 8 |
| 4 | Programs & Design | 26–32 | 15 | 3 |
| 5 | OS Structures | 33–46 | 22 | 4 + 1 shared |
| 6 | Debugging & Boot | 47–50 | 13 | 0 + 4 shared |
| | **Total** | | **101** | **24 + 5 shared** |

- **Coverage:** the same 356 items were re-audited for Chapter 2 — **36 relevant occurrences**, 320 excluded with reasons, reconciled per paper. 29 occurrences map to **24 Chapter 2 implementations**; **7 occurrences** (the boot and kernel-modules questions) map to **5 Chapter 1 implementations**, which Chapter 2 sections show as *shared* questions instead of duplicating them. Midterm 2022 Q4 (half Chapter 2 / half Chapter 3) was flagged until Chapter 3 existed; it is now scored.
- **Visuals:** eight new interactive diagrams — OS-services map (slide 7), Bourne-shell demo, file-copy system-call trace (slide 14), API → system-call interface → kernel flow (slides 17 and 25), parameter passing (slides 18–19), Windows/UNIX system-call classifier (slide 24), structure explorer (MS-DOS, UNIX, layered, microkernel, Solaris modules, Mac OS X, iOS/Android) and boot sequence with GRUB (slide 50).
- **Bloom theme:** Chapter 2 opens in a colourful theme — deep indigo surfaces, soft white text, pink as the main accent balanced by mint, sky blue, sunny yellow, purple and coral, slowly drifting colour blobs behind the page, a moving sheen on the hero, gradient buttons, lifting cards and lesson blocks that fade up as you scroll (all motion stops under "reduce motion"). The top-bar theme button switches between *chapter default*, *night* and *bloom* for the whole app; the choice is stored in `os-atlas:theme:v1`. Every surface derives from theme tokens, so a theme is just a token set in `src/index.css`.

## What is included

- **Nine teaching sections**, one per slide range of the lecture’s table of contents, each split into numbered parts and ending with a 30-second recap, exam focus, key terms, and its own past-exam quiz.
- **Visual-first explanations.** Instead of stacked paragraphs, content is built from purpose-made blocks: icon concept cards, step-by-step flow diagrams, layer stacks, side-by-side comparison grids, “numbers to remember” tiles, memory hooks (mnemonics), and “say this, not that” confusion pairs.
- **Fourteen interactive visuals**: four-layer system stack (classify a program), system bus and controller I/O stepper, interrupt timeline, storage-hierarchy pyramid with the full slide-41 data, cache hit/miss simulator (LRU vs FIFO), synchronous/asynchronous I/O, device-status table (slide 22), DMA interrupt counter, multiprocessor/multi-core/cluster explorer with failure injection, multiprogramming simulator, dual-mode transitions, protection, client–server vs peer-to-peer, and virtualization vs emulation.
- **A 45-question historical bank**: every supplied Chapter 1 exam item, recreated with its original wording and provenance. Formats: 13 multiple choice, 16 true/false, 10 fill-in, and 6 short answer. There are no invented practice questions.
- **Section quizzes contain every historical question assigned to that section.** Explanations, distractor notes, and model answers unlock only after submission.
- **A curated 25-question final assessment** drawn only from historical items, sampling all nine sections and excluding both flagged review items from scoring.
- **Final review, printable cheat sheet, bookmarks, bookmarked practice, and a progress dashboard.**
- **A coverage ledger** that accounts for every indivisible item in all seven papers, including excluded later-chapter material and duplicate occurrences.
- **Bilingual study support**, responsive layout, keyboard-accessible controls, reduced-motion support, and print styling.
- **Local persistence** for section visits, completion, study time, quiz attempts, best scores, bookmarks, and language choice.

## Chapter inventory

| # | Section | Slides | Est. minutes | Historical questions |
| ---: | --- | --- | ---: | ---: |
| 1 | What an OS Is | 3–9 | 12 | 3 |
| 2 | Startup & Interrupts | 10–15 | 17 | 7 |
| 3 | Storage & Caching | 16–19, 41–42 | 15 | 3 |
| 4 | I/O & DMA | 17, 20–24, 43 | 17 | 5 |
| 5 | System Architecture | 25–29 | 14 | 4 |
| 6 | Multiprogramming | 30–32 | 20 | 11 |
| 7 | Dual Mode & Timer | 33–34 | 14 | 4 |
| 8 | Process, Memory & Storage | 35–40 | 16 | 7 |
| 9 | Protection & Environments | 44–57 | 22 | 1 |
| | **Total** | | **147** | **45** |

Every section has at least one historical question. Slides 41–43 (cache management, migration, I/O subsystem) belong to “storage management” in the lecture but are taught next to the hierarchy and I/O material they explain. No quiz item was invented to fill a section: `protection-environments` carries the single historical item that maps to it.

## Coverage at a glance

The audit counts each individually answerable item once: an MCQ or true/false prompt, each fill-in blank, and each separately required definition or essay part. Ranges of later-chapter material are grouped only after each item has been classified.

| Paper | Total items | Chapter 1 relevant | Excluded | Review-flagged |
| --- | ---: | ---: | ---: | ---: |
| Final 2024 | 66 | 2 | 64 | 0 |
| Final 2023 | 74 | 5 | 69 | 0 |
| Undated scan A | 74 | 5 | 69 | 0 |
| Undated scan B | 27 | 8 | 19 | 0 |
| Final 2020 | 77 | 14 | 63 | 0 |
| Midterm 2022 | 20 | 14 | 6 | 2 |
| Midterm 2021 | 18 | 3 | 15 | 0 |
| **Total** | **356** | **51** | **305** | **2** |

- **51 relevant occurrences** map to **45 unique implementations**. Six shared implementations account for the six duplicate occurrences.
- **Midterm 2022 Q1.6** (“the multi-threaded process has one program counter for all its threads”) was previously excluded as Chapter 4; slide 36 teaches it directly, so it is now implemented in Section 8.
- **Final 2024 Q1.47 and Final 2020 Q2.27** differ only by “per unit of time” vs “per unit time” and now share one implementation, keeping both sources.
- **All 51 occurrences are mapped**; `validateCoverage()` reports no missing implementations and no double-mapped source item.
- **Two historical items are flagged for review**: Midterm 2022 Q1.2 (mode-switch wording) and Q1.7 (elliptical process-activity sentence). They remain visible and explained in the **Dual Mode & Timer** and **Process, Memory & Storage** quizzes but are **excluded from score denominators**.
- No official answer key was supplied. 43 of the 45 bank items are marked `independently-verified`; the remaining two are the flagged `needs-review` items.

The ledger is generated from source data, not hand-maintained counters. Tests assert that totals reconcile, every relevant item has an implementation, and one printed source item cannot map to two implementations.

## Bilingual behavior

- **English mode:** all interface and teaching prose is English; Arabic passages are absent.
- **Arabic Explanation mode:** adds Egyptian Arabic explanations and feedback, right-to-left and tagged `lang="ar"`. English source explanations remain available in a disclosure for quiz feedback.
- **Quiz rule:** stems, options, fill-in accepted answers, and short-answer model answers are always English. Only explanations, hints, takeaways, and option notes are bilingual.
- The document stays `lang="en"`; Arabic passages are marked locally so screen readers switch pronunciation correctly.

## Data and privacy

There is no backend, account system, analytics, or network submission. Progress, bookmarks, drafts, best scores, and language choice are stored in this browser under:

- `os-atlas:progress:v1`
- `os-atlas:language:v1`
- `os-atlas:quiz-draft:v1:<quizId>`

Clearing site data or using **Reset progress** removes local study history. The app keeps working in memory if storage is unavailable.

## Verification snapshot

At the last documented validation (Chapter 6 release):

- `npm test`: **137 tests across 11 files**, all passing (`vitest.config.ts` uses a single worker).
- Headless Chrome, Chapter 6 (production preview): five lessons at 1440px and 390px in the garnet theme — **0 page errors, 0 horizontal overflow** (the only console 404 is the Vercel analytics script, absent locally); lab steps (SRTF preemption), “compare all” on Undated B, quantum explorer, MLFQ, Arabic mode, and the calculation quiz with its review.
- `npm run build`: TypeScript project build plus Vite production build, successful.
- Headless Chrome, Chapter 5 (against the dev server): four lessons at 1440px and 390px in the jade theme, highlighted code in every lesson, every visual scenario (race 4/5, signal…wait, wait…wait deadlock, Midterm 2022 Q5.2/Q5.3 blocking, philosophers’ deadlock), all chapter tools, no slide numbers in Chapters 1–3 — **0 console errors**.
- Headless Chrome, Chapter 3: all five sections at 1440px and 390px — **0 console errors, 0 horizontal overflow**; **36/36** interaction checks (every Chapter 3 visual driven through its controls, all five chapter tools, the 64-item ledger, three chapter cards, and Chapter 1/2 theme regression).
- Headless Chrome, Chapter 2: all six sections rendered at 1440px (English) plus two at 390px (Arabic) — **0 console errors, 0 horizontal overflow**; **30/30** interaction checks (routes and legacy redirects, bloom/night theme per chapter, per-section quiz counts, every Chapter 2 visual driven through its controls, all four Chapter 2 tools, the Chapter 2 ledger totals, progress chapter tabs, and a Chapter 1 regression check).
- Headless Chrome, Chapter 1 (nine-section release): 18 render runs and 36/36 interaction checks.
- Ledgers: Chapter 6 — 356 = 63 relevant + 293 excluded; Chapter 1 — 356 = 51 relevant + 305 excluded; Chapter 2 — 356 = 36 relevant + 320 excluded; Chapter 3 — 356 = 64 relevant + 292 excluded; Chapter 5 — 356 = 31 relevant + 325 excluded. No printed item maps to two implementations across chapters.

The browser harness was an ad-hoc QA script using a temporary `playwright-core` install; it is not a committed dependency. Evidence and full results are recorded in [`docs/DELIVERY_REPORT.md`](docs/DELIVERY_REPORT.md).

## Project structure

```text
src/
  components/
    content/      Block renderer, visual blocks (cards, flow, layers, versus, stats, hook, confusions, recap), icon registry
    layout/       Shell, sidebar, topbar
    quiz/         Quiz engine, taking and review views
    study/        Study timer
    ui/           Bilingual text, language toggle, progress ring
    visuals/      Fourteen interactive visual explanations
  context/        Language and progress providers
  data/
    sections/     Nine section modules, one per slide range, plus bilingual text helpers
    questions/    Historical question-bank modules
    coverage.ts   Source mapping and validation
    exams.ts      Paper metadata, audits, exclusions, notes
    quizzes.ts    Section quizzes and final assessment
  lib/            Grading, quiz result construction, progress helpers
  pages/          Home, section, review, assessment, tools
  App.tsx         Route-level lazy loading
  index.css       Tailwind v4 theme, components, quiz and print styles
docs/
  PROJECT_GUIDE.md
  DELIVERY_REPORT.md
```

## Documentation

- [`docs/PROJECT_GUIDE.md`](docs/PROJECT_GUIDE.md) — architecture, content model, authoring workflow, grading, persistence, coverage maintenance, and testing.
- [`docs/DELIVERY_REPORT.md`](docs/DELIVERY_REPORT.md) — audit inventory, coverage method, verified counts, QA evidence, fixes, and limitations.

## Known limitations

- The two flagged review items have defensible readings in more than one direction; they are deliberately unscored rather than presented as certain.
- No official marking scheme was supplied, so answers were independently verified against the transcript and standard OS terminology.
- Short-answer grading is transparent keyword-group matching, not semantic essay marking. It rewards required concepts but cannot judge argument quality.
- Scanned papers are incomplete: Undated A starts at page 2, Undated B covers pages 2–7 of 8, and Final 2020 covers pages 2–9 of 10. The audit reflects only supplied text.
- Later-chapter material is excluded and grouped with reasons. One borderline Final 2020 item (“uniprogramming”, Q2.22) is included because it directly contrasts with Chapter 1 multiprogramming.
- Quiz attempts and best scores saved under the previous five-section quiz IDs are kept in storage but not shown against the new nine quizzes; section visits, completion and bookmarks migrate automatically.
- One transcript value conflicts with the textbook: slide 41 prints “CMOS SRAM” as main memory’s technology, while the textbook figure it reproduces says DRAM. The app shows DRAM and notes the discrepancy.
- Chapters 1, 2, 3, 5 and 6 are built (Chapter 4 was not supplied). Items for later chapters (CPU scheduling, synchronization, memory, virtual memory) are listed as excluded, with reasons, in each chapter’s ledger. Adding a chapter needs only data files plus one registry entry (see the project guide).
- Progress is local to one browser profile; there is no sync or account recovery.
