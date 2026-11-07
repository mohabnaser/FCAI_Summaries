# Delivery Report — OS Atlas, Chapter 1

**Project:** Interactive Operating Systems learning platform for Chapter 1  
**Source chapter:** `chapter1.md`, 57 slides  
**Past papers audited:** 7 (Finals 2024, 2023, 2020; two undated finals; Midterms 2022 and 2021)  
**Validation date:** 29 October 2026  
**Status:** Complete for the supplied Chapter 1 scope; production build and browser QA passing.

---

## Chapter 5 release — Process Synchronization

Built from `chapter5.md` (39 PDF pages). Four lessons: critical section; Peterson & hardware; mutex locks & semaphores; classic problems.

### Coverage

| Paper | Relevant | Items |
| --- | ---: | --- |
| Final 2024 | 6 | Q1.38 race condition · Q1.48 not a requirement · Q1.57 signal…wait · Q1.58 wait…wait · Q1.59 readers–writers first variation · Q1.60 busy waiting |
| Final 2023 | 6 | Q1.23 entry section · Q1.24 only bounded waiting · Q1.25 Peterson · Q1.26 compare-and-swap · Q1.27 misuse → deadlock · Q2.39 producer–consumer semaphores |
| Undated A | 6 | same six as Final 2023 (handwritten marks agree) |
| Undated B | 1 | Q5 atomic hardware instruction (essay) |
| Final 2020 | 6 | Q1.16 data inconsistency · Q1.17 semaphore busy waiting · Q2.31 mutual exclusion · Q2.32 hardware and software · Q3.61 signal…wait · Q3.62 wait…wait |
| Midterm 2022 | 4 | Q5.1–Q5.4 readers–writers (initial values, blocked readers, new writer, writer starvation) |
| Midterm 2021 | 2 | Q1.12 data inconsistency (fill-in) · Q4 semaphore without busy waiting + readers–writers |
| **Total** | **31** | 325 excluded with reasons · 356 total · 23 implementations (9 MCQ · 7 T/F · 1 fill-in · 6 short answer) |

### Changes across the app

- **Jade theme** (`jade`), opaque surfaces for legibility.
- **Syntax-highlighted code blocks** with line numbers in every chapter (`src/components/content/highlight.ts`).
- **Slide numbers removed** from all study text in Chapters 1–3 (kickers now “Lesson 0N”); enforced by `chapter5.test.ts`.
- Quiz prompts keep their line breaks (used by the semaphore-misuse stems).

### Verification (actually run)

- `npx tsc -b --singleThreaded` clean (the default parallel check runs out of memory on this machine).
- Vitest, file by file: 110 tests in 10 files, all passing.
- Headless Chrome against the dev server: Chapter 5 lessons at two widths, every visual scenario, all tools, Chapters 1–3 regression — 0 console errors.
- `vite build` could not complete during this session because the machine ran out of memory (≈0.5 GB free); it should be re-run when memory is available.

## Chapter 3 release — Processes

Built from `chapter3.md` (51 PDF pages) with the same method as Chapters 1 and 2.

### Structure (five sections, following slide 2’s six topics)

1. **The Process** (slides 3–10) — program vs process, memory layout, five states, PCB.
2. **Scheduling & Context Switch** (slides 11–18) — job/ready/device queues, long/short/medium-term schedulers, I/O- vs CPU-bound, context switch.
3. **Process Operations** (slides 19–24) — process tree and pid, sharing/execution/address-space options, fork/exec/wait (slide 23 program), exit, abort, cascading termination.
4. **IPC** (slides 25–39) — cooperating processes, two models, bounded buffer, message passing, direct/indirect, mailboxes, blocking, buffering.
5. **Client–Server** (slides 40–50) — sockets, Java socket types and DateServer, RPC with stubs, ordinary and named pipes, RMI and marshalling.

### Coverage

| Paper | Relevant to Ch 3 | Items |
| --- | ---: | --- |
| Final 2024 | 12 | Q1.39 fork* · Q1.41 waiting · Q1.42 stack · Q1.43 schedulers · Q1.45 I/O-bound · Q1.46 context switch · Q1.47 degree* · Q1.49 send & receive* · Q1.50 indirect · Q1.51 zero capacity · Q1.52 stub · Q1.53 RMI |
| Final 2023 | 8 | Q1.28 direct/mailbox T/F · Q2.32 termination · Q2.33 schedulers · Q2.35 PCB · Q2.37 fork/exit* · Q2.38 IPC models* · Q2.59 zero capacity · Q2.60 ready queue |
| Undated A | 8 | same eight as Final 2023 (shared implementations; handwritten marks agree) |
| Undated B | 6 | Q1.5 process* · Q1.7 context switch · Q1.8 shared memory* · Q1.12 running → ready · Q3 direct vs indirect · Q4 client–server techniques |
| Final 2020 | 17 | Q1.11 long-term scheduler · Q1.12 process mix · Q1.13 link · Q2.23 fork* · Q2.24 ready · Q2.25 stack · Q2.26 PCB · Q2.27 degree* · Q2.29 CPU-bound (flagged) · Q2.30 TLB · Q2.33 receive & send* · Q2.34 direct · Q2.35 zero capacity · Q2.36 RPC · Q2.37 RMI · Q2.42 I/O-bound · Q2.44 context switch |
| Midterm 2022 | 3 | Q1.8 ready T/F · Q3.2 define process* · Q4 IPC essay* |
| Midterm 2021 | 10 | Q1.1 stack · Q1.3 device queue · Q1.5 child · Q1.6 context switch · Q1.7 ready · Q1.9 rendezvous · Q1.10 indirect · Q1.11 program vs process* · Q1.13 short-term · Q1.14 direct |
| **Total** | **64** | 292 excluded with reasons · 356 total |

\* Implemented by Chapter 1 or 2 and shown in Chapter 3 as shared questions (15 occurrences → 12 implementations). The other 49 occurrences map to 40 Chapter 3 implementations (30 MCQ · 5 T/F · 3 fill-in · 2 short answer).

Reviewed and kept out: copy-on-write (memory chapter), context switch during demand paging (virtual memory), dispatcher/dispatch latency, preemptive-scheduling cases and concurrent-access items (CPU scheduling and synchronization chapters).

### Changes outside Chapter 3

- **Midterm 2022 Q4** (Chapter 2) is now scored: its direct/indirect half is taught in Chapter 3. Chapter 2’s ledger now has 0 review items.
- **Sunset theme** (`sunset`): new token set in `src/index.css`; Bloom’s motion rules now apply to both colourful themes.

### Verification (actually run)

- `npx tsc -b` clean; `vite build` successful.
- Vitest, file by file: 92 tests in 9 files, all passing (new `src/data/chapter3.test.ts`).
- Headless Chrome: five sections × two widths in the sunset theme, 0 errors, 0 overflow; 36/36 interaction checks.

## Chapter 2 release — Operating-System Structures

**Source:** `chapter2.md`, 51 slides (all read; slide 9, 11, 12 and 48 screenshots and every diagram description used). **Papers:** the same seven, fully re-audited for Chapter 2.

### Structure (six sections, following slide 2’s ten topics)

| # | Section (slug) | Slides | Min | Quiz (own + shared) | Visuals |
| ---: | --- | --- | ---: | ---: | --- |
| 1 | Services & Interfaces (`c2-services-interfaces`) | 3–12 | 16 | 5 | OS-services map, shell demo |
| 2 | System Calls & API (`c2-system-calls`) | 13–19 | 18 | 4 | file-copy trace, system-call flow, parameter passing |
| 3 | Types of System Calls (`c2-syscall-types`) | 20–25 | 17 | 8 | Windows/UNIX classifier |
| 4 | Programs & Design (`c2-programs-design`) | 26–32 | 15 | 3 | — (versus, layers, flow blocks) |
| 5 | OS Structures (`c2-structures`) | 33–46 | 22 | 4 + 1 | structure explorer |
| 6 | Debugging & Boot (`c2-debug-boot`) | 47–50 | 13 | 0 + 4 | boot sequence with GRUB |

### Coverage

| Paper | Relevant to Ch 2 | Items |
| --- | ---: | --- |
| Final 2024 | 6 | Q1.39 fork · Q1.40 command interpreter · Q1.49 send & receive · Q1.54 layered · Q1.55 policy/mechanism · Q1.56 hybrid |
| Final 2023 | 7 | Q1.29 services · Q2.31 kernel modules* · Q2.37 fork/exit · Q2.38 IPC models · Q2.40 GUI vs CLI · Q2.41 system boot* · Q4 essay |
| Undated A | 7 | same seven as Final 2023 (shared implementations) |
| Undated B | 3 | Q1.6 API · Q1.8 shared memory · Q1.10 locate the kernel* |
| Final 2020 | 7 | Q1.7 services · Q1.8 system programs · Q2.21 command interpreter · Q2.23 fork · Q2.33 send & receive · Q2.38 bootstrap program* · Q2.41 layered |
| Midterm 2022 | 2 | Q2.2 EPROM software* · Q4 IPC models + direct/indirect (scored since the Chapter 3 release) |
| Midterm 2021 | 4 | Q1.2 microkernel · Q1.4 policy · Q1.8 system-call interface · Q3 parameter passing |
| **Total** | **36** | 320 excluded with reasons · 356 total |

\* Implemented by Chapter 1 and shown in Chapter 2 as shared questions (7 occurrences → 5 Chapter 1 implementations), so no printed item has two implementations. The remaining 29 occurrences map to 24 Chapter 2 implementations (15 MCQ · 3 T/F · 3 fill-in · 3 short answer). Items whose stem or option order differs between papers (command interpreter, fork, layered, services, send & receive) keep separate implementations to preserve the printed wording.

Reviewed and kept out of Chapter 2: direct/indirect communication, mailboxes, zero-capacity queues, RPC/RMI and client–server techniques (Chapter 3, not in the Chapter 2 slides); context switch (Chapter 3); the three-modes T/F (Chapter 1).

### Platform changes made for Chapter 2

- Multi-chapter registry (`src/data/chapters.ts`), course home at `/`, chapter routes `/chapter/:chapterId/…` with redirects from the old Chapter 1 URLs, chapter switcher in the sidebar, chapter tabs on the progress dashboard, chapter-scoped progress, weak topics, coverage, cheat sheet and final assessment.
- `crossRefQuestionIds` on sections and cross-reference support in the coverage ledger.
- **Bloom theme** for Chapter 2 (and selectable app-wide): pink, mint, sky, yellow, purple and coral on deep indigo, with gentle motion (drifting background, hero sheen, gradient buttons, card lift, scroll reveal; disabled under reduced motion). All 123 hard-coded `rgba()` colours and the component hex colours in `src/index.css` were converted to `color-mix()` over theme tokens, so a theme is only a token set.

### Verification (actually run)

- `npm test`: 74 tests in 8 files pass (run file by file — the build machine had under 0.5 GB of free commit memory, which killed parallel jsdom workers; `maxWorkers` is now 1).
- `npm run build`: passes.
- Headless Chrome: six Chapter 2 sections at 1440px EN + two at 390px AR — 0 console errors, 0 overflow; 30/30 interaction checks including a Chapter 1 regression check.

---

## 0. Revision — 4 November 2026: nine-section visual redesign

This revision supersedes the structure and counts in §§1–6 below wherever they differ.

### 0.1 What changed

- **Sections: 5 → 9**, one per slide range of the lecture’s own table of contents (slide 2). Every section has at least one past-exam question and its own quiz.
- **Explanations redesigned to be visual, not stacked text.** Nine new block kinds — `lead`, `cards`, `flow`, `layers`, `versus`, `stats`, `hook`, `confusions`, `recap` — replace most paragraph cards. Every section ends with a recap and an exam radar that cites all of its quiz questions.
- **Nine new interactive visuals** (14 total): system layers, system organization (bus + controller I/O), storage pyramid (full slide-41 data), cache hit/miss simulator, device-status table (slide 22), DMA interrupt counter, multiprocessor/multi-core/cluster explorer, client–server vs P2P, virtualization vs emulation.
- **Content gaps closed** against the slides: common bus and memory-cycle contention (11), controller local buffers (12), tracks/sectors/disk controller (16), wait instruction vs wait loop (20), von Neumann flow (24), special-purpose processors (25), VMM multi-mode (33), full slide-41 table including technology and bandwidth (41), explicit/implicit migration (41), portals/thin clients (45), EC2, load balancers and cloud architecture (53–54), VMware Player/VirtualBox (57).
- **Answer give-aways removed** from teaching text (e.g. “the 2020 statement is false”, “option (c)”). Exam notes now describe what is asked and how to reason.
- **Transcript discrepancy surfaced:** slide 41 prints “CMOS SRAM” for main memory; the textbook figure it reproduces says DRAM. The app shows DRAM and notes the conflict.
- **Build fix:** `VisualId` reserved five Chapter 2 visual IDs with no components, which broke `tsc -b`. The registry is now `Partial`; the Chapter 2 question file was left untouched.

### 0.2 Coverage corrections

| Change | Source | Effect |
| --- | --- | --- |
| Re-classified as Chapter 1 | Midterm 2022 Q1.6 — “The multi-threaded process has one program counter for all its threads.” | Slide 36 teaches “one program counter per thread”. Previously excluded as Chapter 4; now implemented as `s6-multithread-pc-tf` (answer: false). |
| Merged duplicate | Final 2024 Q1.47 and Final 2020 Q2.27 (degree of multiprogramming) | Identical except “per unit of time” / “per unit time”. One implementation (`s4-degree-mcq`) keeps both sources. |
| Re-checked, kept excluded | Final 2020 Q2.44 and Q2.30, Final 2024 Q1.46, Undated B Q1.7 (context switch); Final 2023/Undated A Q1.1 (virtual memory throughput); Q1.29 / Final 2020 Q1.7 (OS services) | Taught in Chapters 2, 3 and 9, not in the Chapter 1 slides. |

| Measure | Before | Now |
| --- | ---: | ---: |
| Source items audited | 356 | 356 |
| Chapter 1 relevant occurrences | 50 | **51** |
| Implemented occurrences | 50 | **51** |
| Unique implementations | 45 | 45 |
| Duplicate occurrences (shared implementations) | 5 | **6** |
| Excluded | 306 | **305** |
| Flagged review (unscored) | 2 | 2 |

Bank formats: 13 MCQ, 16 true/false, 10 fill-in, 6 short answer — all historical, none invented.

### 0.3 Section map

| # | Section (slug) | Slides | Min | Past-exam Qs | Final-assessment Qs |
| ---: | --- | --- | ---: | ---: | ---: |
| 1 | What an OS Is (`os-intro`) | 3–9 | 12 | 3 | 2 |
| 2 | Startup & Interrupts (`startup-interrupts`) | 10–15 | 17 | 7 | 4 |
| 3 | Storage & Caching (`storage-caching`) | 16–19, 41–42 | 15 | 3 | 2 |
| 4 | I/O & DMA (`io-structure`) | 17, 20–24, 43 | 17 | 5 | 3 |
| 5 | System Architecture (`system-architecture`) | 25–29 | 14 | 4 | 2 |
| 6 | Multiprogramming (`multiprogramming`) | 30–32 | 20 | 11 | 5 |
| 7 | Dual Mode & Timer (`dual-mode`) | 33–34 | 14 | 4 | 2 |
| 8 | Process, Memory & Storage (`resource-management`) | 35–40 | 16 | 7 | 4 |
| 9 | Protection & Environments (`protection-environments`) | 44–57 | 22 | 1 | 1 |
| | **Total** | | **147** | **45** | **25** |

All sixteen older slugs (eleven topic slugs, five merged slugs) redirect; section visits, completion and bookmarks migrate. Quiz attempts saved under the old five quiz IDs remain in storage but are not shown against the new quizzes.

### 0.4 Verification (actually run)

- `npm test`: **52 tests in 7 files**, passing on four consecutive full runs. New: `src/data/sections.test.ts` (registered visuals, exam-note refs, Arabic on all teaching text, recaps, legacy redirects, cache-simulator logic) and new coverage assertions (Q1.6 mapping, shared degree MCQ, per-section distribution, ≥ 1 question per section). One route test’s timeout was raised to 20 s because two lazy chunks can exceed 5 s in jsdom under parallel load.
- `npm run build`: passes (`tsc -b` + Vite).
- Headless Chrome: 9 sections × (1440px English, 390px Arabic) = 18 render runs, **0 console errors, 0 horizontal overflow**; **36/36** interaction and route checks (see PROJECT_GUIDE §14).

---

## 1. Executive summary

Chapter 1 has been implemented as a complete, data-driven study system rather than a static set of notes. The release includes:

- **Five major teaching sections** covering the full supplied transcript, each with meaningful internal subsections.
- **45 questions**, all historical, reconstructed from past papers with original wording and provenance. No invented practice items.
- **Five focused concept visuals**, retained only where a mechanism benefits from seeing it in motion.
- **Section quizzes** containing every historical question assigned to that section.
- A **curated 25-question final assessment** drawn only from historical items and sampling all five major sections.
- **Final review, printable cheat sheet, bookmarks, bookmarked practice, study timer, progress dashboard**, and **Arabic Explanation** mode.
- A **source-to-implementation coverage ledger** covering all seven papers.

The coverage audit accounts for **356 indivisible source items**. Of these, **50 are Chapter 1-relevant occurrences**, all 50 are mapped to implementations, representing **45 unique historical questions**; **306 items are excluded** with documented later-chapter reasons. **Two historical items are flagged for review** and excluded from scoring. The ledger reconciles exactly: 50 + 306 = 356.

No official marking scheme was supplied. Answers were independently checked against the lecture transcript and standard OS terminology. The two wording-ambiguous items are not presented as certain.

---

## 2. What was built

### 2.1 Learning experience

Each section follows a consistent teaching flow:

1. Section header with estimated time, historical-question count, and subsection map.
2. Learning objectives.
3. Progressive prose with definitions, comparisons, worked steps, tables, callouts, and exam notes, divided by subsection headings.
4. A visual only where the mechanism is clearer in motion.
5. Exam focus and common misconceptions.
6. Key terms.
7. A section quiz containing every historical question assigned to that section, with no invented items.
8. Study timer, section bookmark, and completion control.

### 2.2 Chapter structure

| # | Section | Internal topics | Minutes | Historical |
| ---: | --- | --- | ---: | ---: |
| 1 | Foundations & Startup | What an OS is; booting, interrupts and traps | 28 | 10 |
| 2 | Architecture & Execution | System architecture; multiprogramming and time-sharing; dual mode and the timer | 43 | 20 |
| 3 | Processes & Memory | Process management; memory management | 17 | 4 |
| 4 | Storage & I/O | Files and mass storage; hierarchy and caching; I/O methods | 30 | 10 |
| 5 | Protection & Modern Computing | Protection and security; computing environments; virtualisation, embedded systems and open source | 23 | 1 |
| | **Total** | | **141** | **45** |

The original eleven topic lectures are preserved as internal subsections. No supplied exam item was invented to fill a section: `protection-modern` carries the single historical item that maps to it, and the ledger records the gap.

### 2.3 Interactive visuals

| Visual | Teaching purpose |
| --- | --- |
| Interrupt timeline | Show interrupt arrival, handling, and return to execution |
| Multiprogramming | Contrast uniprogramming, multiprogramming, and time-sharing utilization |
| Dual mode | Trace user/kernel transitions, traps, privileged instructions, and timer control |
| I/O methods | Compare polling, interrupt-driven I/O, and DMA |
| Protection | Contrast protection vs. security and show access-control layers |

The visuals are built from HTML/SVG and shared primitives rather than a charting library. Controls are keyboard-operable and labeled; reduced-motion preferences are respected.

### 2.4 Study and revision tools

- **Study timer** records active seconds per section without force-pausing or navigating.
- **Progress dashboard** summarizes visited/completed sections, study time, quiz attempts, best scores, and unresolved misses.
- **Bookmarks** save sections and individual questions, persist across reloads, and feed a generated bookmarked-practice quiz.
- **Final review** synthesizes the chapter’s models and traps before the assessment.
- **Final assessment** is a 25-question untimed historical paper spanning all five major sections.
- **Cheat sheet** provides dense revision cards and print output.
- **Coverage ledger** exposes every exam mapping, exclusion, duplicate, and review flag.
- **Arabic Explanation mode** adds Egyptian Arabic explanations while preserving English quiz content.

### 2.5 Interface and reading experience

The visual system was rebuilt around the lesson, not around navigation chrome:

- **Wide editorial shell.** Content is capped at 1760px. The desktop sidebar occupies 280px expanded and 76px collapsed; the state persists locally. The content column follows the sidebar width on desktop.
- **Lesson-first section page.** A full-width hero carries the section title, summary, metadata, and actions. A study band combines objectives with the timer. The reading column is capped at 86ch while cards, tables, comparisons, and visuals span the full lesson column.
- **Secondary rail, not a second dashboard.** At 1536px and wider, a sticky “On this page” outline appears; below 1536px the page remains a focused single column. Key terms and exam focus stay in the main flow.
- **Typographic hierarchy.** Body copy is 17–19px at approximately 1.7 line height, section titles 32–41px, section headings 26–30px, subheadings 20–24px, and metadata 12–14px.
- **Purposeful palette.** Dark navy remains the base. Cyan/teal marks primary actions and progress, blue carries information, violet distinguishes secondary concepts, green marks success, amber marks exam focus, and red marks errors.
- **Pedagogical block variety.** Prose, definitions, analogy panels, steps, tables, comparisons, pros/cons, exam alerts, worked examples, mistake warnings, visuals, and summaries each have a distinct treatment without changing their content.
- **Responsive behavior.** The sidebar becomes an off-canvas drawer below 1024px, the topbar reduces to breadcrumb and language controls below 1280px, and all grids collapse without page-level horizontal overflow.
- **Animation and print.** Motion is subtle and disabled under `prefers-reduced-motion`. Print styles now produce legible white-background pages on every route, not only the cheat sheet.

---

## 3. Past-exam inventory and coverage

### 3.1 Counting convention

The audit counts **indivisible answerable items**, not numbered question labels:

- Each MCQ or true/false prompt = 1 item.
- Each fill-in blank = 1 item.
- Each definition or separately required essay part = 1 item.
- Subparts are separated when the paper expects separate answers.

This prevents a blank, definition, or essay subpart from disappearing inside a larger question number. The 356 total is therefore an item count.

### 3.2 Per-paper audit

| Paper | Total items | Chapter 1 relevant | Excluded | Review-flagged |
| --- | ---: | ---: | ---: | ---: |
| Final 2024 (Fall 2024/2025) | 66 | 2 | 64 | 0 |
| Final 2023 (Fall 2023/2024) | 74 | 5 | 69 | 0 |
| Final — Undated scan A | 74 | 5 | 69 | 0 |
| Final — Undated scan B | 27 | 8 | 19 | 0 |
| Final 2020 | 77 | 14 | 63 | 0 |
| Midterm 2022 | 20 | 13 | 7 | 2 |
| Midterm 2021 | 18 | 3 | 15 | 0 |
| **Total** | **356** | **50** | **306** | **2** |

### 3.3 Reconciliation

| Measure | Count |
| --- | ---: |
| Source items audited | 356 |
| Relevant source occurrences | 50 |
| Relevant occurrences with an implementation | 50 |
| Missing implementations | 0 |
| Unique historical implementations | 45 |
| Shared implementations / duplicate occurrences | 5 |
| Excluded later-chapter items | 306 |
| Flagged review items | 2 |

The five-occurrence difference between 50 mapped occurrences and 45 unique questions comes from five shared implementations:

- Final 2023 and Undated A share Q1.30, Q2.31, Q2.34, and Q2.41 (four exact cross-paper duplicates).
- Undated B Q1.1 and Midterm 2022 Q2.1 are the same kernel fill-in and share one implementation.

`validateCoverage()` returned no problems. It checks:

1. Every relevant source ID has an implementation.
2. Per-paper relevant + excluded = total.
3. Global relevant + excluded = 356.
4. No printed source item maps to two implementations.

### 3.4 Coverage-verification method

1. **Read each paper in full**, preserving printed labels and page limitations.
2. **Decompose each paper** into indivisible answerable items using the convention above.
3. **Classify each item** as Chapter 1-relevant only if it tests a concept explicitly taught in the supplied 57 slides.
4. **Group exclusions** into contiguous ranges and attach a chapter-level reason, rather than silently omitting material.
5. **Map relevant items** to implementation IDs through `sourceRefs`; exact repeats share one question, while material wording variants receive separate implementations.
6. **Record answer status** as independently verified, official key (none supplied), or needs review.
7. **Generate the ledger** from `exams.ts` + question `sourceRefs`; counters are not hand-maintained.
8. **Enforce invariants in tests** and expose the same data in the `/coverage` page for manual inspection.

Documented borderline and variant decisions:

- Final 2020 **Q2.22** (“uniprogramming”) is included as a foundations contrast to Chapter 1 multiprogramming.
- Final 2023 **Q2.36** differs in wording from Undated A and is implemented as a separate variant, not treated as an exact duplicate.
- Final 2024 and the other full-course finals contain mostly later-chapter material; only the Chapter 1-relevant items were imported.

### 3.5 Review-flagged items

Both items remain visible, explained, and symbolized in their section quizzes, but are excluded from score denominators and from the final assessment.

| Implementation | Source | Issue | Handling |
| --- | --- | --- | --- |
| `s5-mode-switch-tf` | Midterm 2022 Q1.2 | “Switching from User mode to kernel mode is a non-privileged instruction.” Literal reading (trap/system call is user-executable) supports true; broader reading (mode transition is controlled) supports false. | Flagged; both readings explained; unscored |
| `s6-process-activity-tf` | Midterm 2022 Q1.7 | “Creating and deleting both user and system processes are considered one.” The printed sentence is elliptical; “one” is not defined on the page. | Flagged; best-supported reading explained; unscored |

The rest of the historical bank is marked `independently-verified`; no item claims an official key.

---

## 4. Question bank

| Measure | Count |
| --- | ---: |
| Total questions | 45 |
| Historical | 45 |
| Invented practice | 0 |
| Multiple choice | 14 |
| True/false | 15 |
| Fill-in | 10 |
| Short answer | 6 |
| Independently verified | 43 |
| Needs review / unscored | 2 |

All 45 historical questions are present in their assigned section quizzes, across five section quizzes. No practice item was added.

The **final assessment** contains 25 unique scored historical questions, samples all five major sections (6/9/2/7/1), mixes formats, and excludes both review-flagged items. It is deliberately curated rather than a re-run of every historical question; complete historical coverage lives in the section quizzes and ledger.

### 4.1 Grading behavior

- **MCQ:** exact option-ID match.
- **True/false:** strict boolean match.
- **Fill-in:** normalized comparison (case, accents, punctuation, whitespace), accepted variants, all blanks required, and tolerance for a meaningful phrase around a target of at least four characters.
- **Short answer:** keyword-concept groups with a per-question pass ratio; matched and missed concepts are reported.

The engine supports answer changes before submission, an explicit unanswered-question warning, deferred feedback, score and percentage, personal best, review filters, flagged-only review, and retry.

Short-answer grading is deterministic concept matching. It cannot assess essay quality, causal reasoning, or originality. This is disclosed in the project documentation rather than presented as human-equivalent marking.

---

## 5. Architecture

### 5.1 Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 (CSS-first `@theme` tokens; no Tailwind config file)
- React Router 7
- `lucide-react` icons
- `prism-react-renderer` for code blocks
- Vitest 5 + Testing Library + jsdom

No backend, database, authentication, analytics, or runtime API is required.

### 5.2 Structure

```text
LanguageProvider
└─ ProgressProvider
   └─ BrowserRouter
      └─ AppShell
         └─ lazy-loaded route page
```

- Content is typed and data-driven (`Section`, `Block`, `Question`, `Quiz`, `ExamAudit`).
- The generic `/section/:sectionId` route serves all five sections and redirects legacy topic slugs through `legacySectionAliases`.
- Route-level lazy loading keeps the initial shell light; `AppShell` provides the Suspense fallback.
- `LanguageContext` controls English/Arabic explanation display and persists the choice.
- `ProgressContext` owns visits, completion, elapsed time, attempts, best scores, bookmarks, and reset.
- `coverage.ts` derives the ledger from exam audits and source refs; `CoveragePage` renders it.
- `docs/PROJECT_GUIDE.md` documents the extension workflow.

### 5.3 Persistence

Local storage keys:

- `os-atlas:progress:v1`
- `os-atlas:language:v1`
- `os-atlas:quiz-draft:v1:<quizId>`

Progress writes are debounced and also flushed on `pagehide` and document visibility changes, preventing fast full-page navigation from dropping a visit. If storage is blocked or full, the app continues in memory.

### 5.4 Accessibility and responsiveness

- Skip link, semantic heading order, visible focus, labeled controls, and `aria-pressed` toggles.
- Quiz navigator announces answered/current/review-only states.
- Arabic passages are locally `lang="ar" dir="rtl"` while the document remains English.
- Reduced-motion media query suppresses nonessential animation.
- Horizontal overflow was checked at 320, 360, 390, 768, 1024, 1440, and 1920px across all 13 content routes.
- The desktop sidebar collapses from 280px to 76px and persists; tablet and mobile use the off-canvas drawer.
- Print styles hide navigation chrome, force a white background, and normalize headings, body text, badges, tables, and code to legible print colors on every route. The cheat sheet keeps its dedicated `.print-area` treatment.

No formal WCAG audit or screen-reader matrix was performed; these are engineering checks, not a certification.

---

## 6. Verification evidence

### 6.1 Unit and component tests

Command:

```powershell
npm test
```

Result on 29 October 2026:

```text
Test Files  6 passed (6)
Tests       41 passed (41)
Duration    ~3.3s
```

Coverage:

| File | Verified behavior |
| --- | --- |
| `src/data/coverage.test.ts` | 45-question historical-only inventory, five-section distribution, English quiz rule, unique IDs, valid structures, provenance, two review flags, full ledger reconciliation, all historical questions in section quizzes, 25-question cross-section historical assessment |
| `src/lib/grading.test.ts` | Normalization, four answer formats, keyword groups, unscored denominator, empty answers |
| `src/lib/progress.test.ts` | Summaries, formatting, missed-question tracking, labels |
| `src/components/ui/Text.test.tsx` | English default and Arabic explanation mode |
| `src/components/quiz/QuizEngine.test.tsx` | Grading, feedback, bookmarks, retry, unanswered warning |
| `src/App.test.tsx` | Home, coverage navigation, bookmarks, not-found, route titles |

### 6.2 Production build

Command:

```powershell
npm run build
```

Result: **successful**, 2,028 modules transformed, no build warnings.

| Artifact | Size | Gzip |
| --- | ---: | ---: |
| `dist/index.html` | 0.82 kB | 0.47 kB |
| Main CSS | 110.40 kB | 20.98 kB |
| Main JS (`index-*.js`) | 319.35 kB | 96.09 kB |
| Largest route chunk (`SectionPage`) | 89.44 kB | 22.15 kB |

Other pages are split into route chunks (Home 17.70 kB, Cheat Sheet 31.85 kB, Quiz Engine 35.48 kB, Coverage 18.19 kB, Progress 16.72 kB, and so on). The earlier single-bundle warning was removed by route-level lazy loading.

### 6.3 Browser smoke and print QA

A headless Chrome suite ran against the production preview at `http://127.0.0.1:4173/`.

Result: **107/107 checks passed** across the five sections, eleven legacy redirects, home, review, assessment, cheat sheet, coverage, bookmarks, progress, bookmarked practice, mobile drawer, and print.

Covered:

- Canonical section routes, all eleven legacy topic redirects (including hash preservation), and five-section navigation.
- Section-map and subsection counts (2/3/2/3/3), historical-only quiz copy, and absence of additional-question or unscored badges where expected.
- Quiz submission through the real UI, score rendering, explanation unlock, unanswered warning, and best score.
- Section and question bookmarks saved to storage and feeding a working bookmarked-practice quiz.
- Arabic mode across all five sections: explanations and RTL passages present, quiz stems English, no horizontal overflow.
- Assessment length (25), historical-only composition, 5/5 section sampling, 6/9/2/7/1 distribution, and explicit disclosure that the two flagged review items are excluded.
- Progress migration: old section IDs merge into canonical sections, old study time sums, and old section bookmarks deduplicate.
- Timer start/pause/persistence, section completion, mobile drawer navigation, reduced motion, and print.
- Print media: sidebar, topbar, and section map hidden; lesson visible on white; no overflow.

A dedicated overflow audit checked 13 routes at 320, 360, 390, 768, 1024, 1440, and 1920px. Result: **91/91 checks with zero horizontal overflow**.

All **five retained visuals** render at desktop and mobile widths without clipped labels or elements escaping their frames.

Artifacts (temporary, not committed): `%TEMP%\os-qa-shots-five`, `%TEMP%\os-qa-five.mjs`, and the temporary `playwright-core` install.

### 6.4 Ledger validation

`validateCoverage()` returned `[]` (no problems) during tests and runtime. The `/coverage` page displayed the “Reconciled” state with 356 total, 50 relevant, 45 unique, 306 excluded, 5 duplicate pairs, and 2 review items.

---

## 7. Issues found and fixed during QA

| Finding | Fix |
| --- | --- |
| Initial JS bundle was large enough to trigger Vite’s chunk warning | Converted all study pages to route-level lazy imports; added shell-level Suspense fallback |
| Default Vitest fork workers timed out on Windows | Switched to `pool: 'threads'`, `maxWorkers: 2`, `isolate: false` |
| Document titles were inconsistent across routes | Centralized route/title mapping in `AppShell`; added regression test |
| Coverage sentence emphasis broke into a flex column | Restored inline flow for emphasized text; added a computed-style browser check |
| Assessment copy could imply flagged items were included | Always disclose that the two review items are excluded from the curated paper |
| Quick full-page navigation could lose a section visit before debounce | Added `pagehide` and `visibilitychange` progress flushing |
| Print output had low-contrast shell styling | Added print rules: hide chrome, white background, legible cards, `.print-area` root |
| Question file naming was misleading after Section 10/11 split | Renamed to `section11.ts` and updated the aggregator |
| Browser/session language state handling was more complex than needed | Kept the document English and marked Arabic passages locally; simplified `LanguageContext` |
| Mobile section pages overflowed by 300px after the wider lesson layout | Set the lesson grid to `minmax(0, 1fr)` and gave lesson children `min-width: 0` |
| Quiz results double-counted unanswered questions as both “incorrect” and “unanswered” | Report answered-incorrect separately and label unanswered items as counted toward the score |
| The memory-layout slider pushed its numbered buttons outside the frame on mobile | Moved the label above the control row and allowed the range input to shrink |
| Interrupt-timeline labels clipped inside narrow segments on mobile | Stacked lane labels above the timeline and allowed segment labels to wrap at small sizes |
| Printed sections kept light-theme text colors on a white page | Extended print normalization to all `#main-content` routes and preserved the cheat sheet’s `.print-area` accents |
| Tablet topbar was crowded and truncated the breadcrumb | Deferred bookmark/progress shortcuts and the assessment CTA to 1280px; kept breadcrumb and language controls below that |
| Quiz option letters were concatenated into radio accessible names (“AThe kernel…”) | Marked the visual option key `aria-hidden` so screen readers announce only the answer text |

---

## 8. Limitations and unresolved ambiguities

### Academic

1. **No official answer key was supplied.** 43 of 45 items are independently verified against the transcript and established OS terminology. The other two are flagged rather than asserted.
2. **Two Midterm 2022 items are genuinely ambiguous.** Their readings and scoring treatment are documented in §3.5 and in the app. They are excluded from all score denominators.
3. **Short-answer grading is keyword-based.** It checks required concepts, not semantic equivalence or essay quality. Students should compare their answer with the model answer.
4. **The full-course finals contain substantial out-of-scope material.** 306 items were excluded. Exclusion is a scope decision, not a claim that those items are unimportant for the course.
5. **Borderline inclusion:** Final 2020 Q2.22 (“uniprogramming”) is included as a Chapter 1 contrast; this is documented rather than hidden.
6. **Variant wording:** Final 2023 Q2.36 is treated as a separate variant from Undated A; it is not counted as an exact duplicate.
7. **No new exam items were invented.** The bank is historical-only, and the `origin` type is fixed to `historical` to prevent practice items entering the data.

### Source limitations

- Undated scan A begins at printed page 2; page 1 is missing.
- Undated scan B covers printed pages 2–7 of 8; pages 1 and 8 are missing.
- Final 2020 covers printed pages 2–9 of 10; pages 1 and 10 are missing.
- Some scanned stems are elliptical or have OCR/typography artifacts. Where meaning could not be recovered confidently, the item was excluded or flagged.
- The audit is limited to the supplied text; it cannot recover questions or answer keys that were not present in the files.

### Product/engineering

- **Single-chapter scope.** The renderer and generic section route are reusable, but chapter selection, chapter-scoped routes, chapter isolation in storage, and cross-chapter coverage are not yet implemented. See the project guide for the migration sequence.
- **Local-only progress.** There is no account, server sync, export, or recovery. Clearing browser data loses study history.
- **No formal accessibility certification.** Keyboard and responsive checks were performed, but no screen-reader matrix or WCAG audit was completed.
- **Chrome-only browser QA.** The automated smoke run used Chrome. Firefox and Safari were not tested.
- **Ad-hoc browser harness.** Playwright was installed temporarily for QA and is not a committed dependency; the unit/component suite is the reproducible in-repo test surface.
- **No production hosting configured.** The build is a static SPA and requires an `index.html` fallback; deployment is environment-specific.
- **No git repository/commit.** The delivered state is the working filesystem; version control was not initialized.
- **Assessment is curated.** It samples all sections with 25 questions and does not reproduce the full historical bank; section quizzes remain the complete practice surface.

---

## 9. How to run

Verified with Node.js 24.11.1 and npm 11.6.2.

### Development

```powershell
npm install
npm run dev
```

Open the URL printed by Vite.

### Tests

```powershell
npm test
```

### Production preview

```powershell
npm run build
npm run preview -- --port 4173 --strictPort --host 127.0.0.1
```

Open `http://127.0.0.1:4173/`.

### Static deployment

Serve `dist/` and rewrite all unknown paths to `index.html`. No environment variables or backend are required.

---

## 10. Adding Chapter 2

Do not copy the pages. Extend the existing data model:

1. Add a chapter entity with ID, number, title, source, slide count, and ordered section IDs.
2. Namespace section, question, and quiz IDs by chapter; preserve Chapter 1 IDs or migrate stored progress.
3. Add chapter-scoped routes and redirects for existing Chapter 1 URLs.
4. Scope localStorage by chapter (or bump to a versioned multi-chapter schema).
5. Make home, sidebar, progress, assessment, and coverage chapter-aware.
6. Audit Chapter 2 exams independently and classify each source item against the chapter that teaches it.
7. Add chapter-isolation, routing, storage-migration, and coverage tests.

Full implementation guidance, content schemas, authoring rules, and checklists are in [`PROJECT_GUIDE.md`](PROJECT_GUIDE.md).

---

## 11. Definition-of-done check

| Requirement | Evidence |
| --- | --- |
| Chapter fully implemented | Five major sections, 57-slide source, 141 minutes of core study |
| Content accurate and structured | Transcript-grounded prose, five focused visuals, exams mapped by source label |
| English mode entirely English | English-first rendering; tests enforce English quiz fields |
| Arabic mode adds Egyptian Arabic | Bilingual explanations, RTL/local language tags, persistent toggle |
| Quiz content stays English | Automated tests assert no Arabic in stems/options/accepted/model answers |
| Every relevant exam item accounted for | 50/50 mapped; 306 excluded with reasons; ledger reconciles |
| Section quizzes include all historical questions | Test asserts all 45 historical items are in their section quizzes |
| Grading, explanations, retries, review | Engine tests plus 107-check browser suite |
| Effective visuals | Five interactive, labeled, keyboard-operable visuals |
| Study tools work | Timer, progress, bookmarks, practice set, cheat sheet, print |
| Final summary/assessment complete | Final review, 25-question assessment, cheat sheet |
| Polished, responsive, accessible | 91-check multi-width overflow audit, focus/labels, reduced motion, every-route print |
| Tests performed | 41/41 tests, successful build, 107/107 browser checks, 91/91 overflow checks |
| Future-chapter structure | Typed data model and generic section route documented |
| Limitations documented | This report and README |

**Conclusion:** Chapter 1 is complete for the supplied source scope and ready to study or deploy as a static site. The two ambiguous items are explicitly flagged rather than guessed, and the coverage ledger provides an auditable account of every relevant and excluded source item.
