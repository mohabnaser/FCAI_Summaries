DOCUMENT: week_01_slides.pdf
COURSE: CS352: Advanced Software Engineering
WEEK: 1
TOTAL PAGES: 13

TRANSCRIPTION AND VISUAL DESCRIPTION
=====================================

DOCUMENT-WIDE VISUAL DESIGN AND REPEATED ELEMENTS
--------------------------------------------------

Format:
- 16:9 widescreen presentation slides.
- White background throughout.
- A thin, light-gray horizontal divider near the top of each slide.
- Small gray running header in the upper-left corner:
  "CS325: Advanced Software Engineering — Week 1"
- Main slide titles are large, bold, and blue.
- Section subtitles are generally purple.
- Main body text is dark gray or nearly black.
- Important phrases are emphasized using bold text and sometimes colored text.
- Callout boxes are used for important conclusions. Most have a pale pink background and a red vertical accent line on the left. Some use a pale blue background with a blue accent line.
- The footer is small, gray text at the bottom-left of each slide.
- The slide number appears in the bottom-right corner.

Repeated footer on all slides:
"Topic: Foundations of Modern Software Engineering | Readings: CleanArch (Ch1, Ch2); FSA (Ch1, Ch2) DMLS (Ch1)"

The slide number at the bottom-right runs from 1 to 13.

IMPORTANT DOCUMENT INCONSISTENCY:
The running header says "CS325: Advanced Software Engineering — Week 1", while the cover slide's main course title says "CS352: Advanced Software Engineering". Both are preserved here exactly as they appear.

============================================================
PAGE 1 OF 13
============================================================

MAIN TITLE:
CS352: Advanced Software Engineering

SUBTITLE:
Week 1: Foundations of Modern Engineering & The AI-Augmented SDLC

INSTRUCTOR:
Dr.Desoky Abdelqawy

CORE PARADIGM:
Architecture is the decisions that are hard to change later.

VISUAL DESCRIPTION:

This is the cover slide.

The slide has a clean white background and a large amount of empty space. All the main content is horizontally centered around the middle of the page.

The main course title appears in large, bold blue text.

The subtitle appears immediately below it in bold purple text.

The instructor information is centered underneath the subtitle. The word "Instructor:" is bold, while the instructor's name is normal weight.

The final line contains the core paradigm. "Core Paradigm:" is bold, while the statement is normal weight.

A thin horizontal gray line separates the small running header at the top from the rest of the slide.

The footer appears at the bottom-left, with page number 1 at the bottom-right.

There are no photographs, diagrams, or other illustrations on this slide.

============================================================
PAGE 2 OF 13
============================================================

TITLE:
Course Objectives

BODY:

1. Eliminate Toy Mental Models:
   We do not build Dog extends Animal. We build a production grade reliable, maintainable, scalable, distributed solutions.

2. Master Structural Trade-offs:
   Every decision introduces cost. You will learn to quantify that cost empirically.

3. Command the AI-Augmented SDLC:
   LLMs generate code at unprecedented velocity. Without governance, they generate technical debt at unprecedented velocity.

CALLOUT:

The Prime Directive:
"The only way to go fast, is to go well." — Robert C. Martin

VISUAL DESCRIPTION:

The slide uses a large blue title at the upper-left.

Below the title is a numbered list of three course objectives. The objective names are bold, while their explanations are regular-weight dark text.

Within the first objective, "Dog extends Animal" appears inside a small, light-gray/pink code-style highlighted box, visually distinguishing the toy programming example from the rest of the sentence.

The second and third objectives occupy multiple lines.

At the bottom of the main content area is a wide, pale pink callout box. It has a narrow red vertical stripe along its left edge.

Inside the callout, "The Prime Directive:" is bold, followed by the quotation and its attribution.

There are no photographs or diagrams.

============================================================
PAGE 3 OF 13
============================================================

TITLE:
3. Master Reference Bibliography

SUBTITLE:
Canonical Software Engineering & AI Systems Literature

INTRODUCTORY TEXT:

Each topic in the weekly breakdown maps directly to specific chapters from these foundational texts:

BIBLIOGRAPHY:

[CleanArch]

Martin, R. C. (2017). Clean Architecture: A Craftsman's Guide to Software Structure and Design (1st Ed.). Prentice Hall.

ISBN: 978-0134494166

[DDIA]

Kleppmann, M. (2017). Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems (1st Ed.). O'Reilly.

ISBN: 978-1449373320

[HFDP-2e]

Freeman, E., & Robson, E. (2020). Head First Design Patterns: Building Extensible and Maintainable Object-Oriented Software (2nd Ed.). O'Reilly.

ISBN: 978-1492078005

[CD]

Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation (1st Ed.). Addison-Wesley.

ISBN: 978-0321601919

[FSA]

Richards, M., & Ford, N. (2020). Fundamentals of Software Architecture: An Engineering Approach (1st Ed.). O'Reilly.

ISBN: 978-1492043454

[DMLS]

Huyen, C. (2022). Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications (1st Ed.). O'Reilly.

ISBN: 978-1098107963

[SAiP-4e]

Bass, L., Clements, P., & Kazman, R. (2021). Software Architecture in Practice (4th Ed.). Addison-Wesley.

ISBN: 978-0136886006

[AIE]

Huyen, C. (2025). AI Engineering: Building Applications with Foundation Models (1st Ed.). O'Reilly.

ISBN: 978-1098166304

[BM-2e]

Newman, S. (2021). Building Microservices: Designing Fine-Grained Systems (2nd Ed.). O'Reilly.

ISBN: 978-1492034025

VISUAL DESCRIPTION:

This slide contains a bibliography arranged in two columns.

The title is large and blue. The subtitle underneath is smaller and gray.

The introductory sentence extends across most of the slide width.

The bibliography entries are arranged as follows:

LEFT COLUMN:
1. CleanArch
2. HFDP-2e
3. FSA
4. SAiP-4e
5. BM-2e

RIGHT COLUMN:
1. DDIA
2. CD
3. DMLS
4. AIE

Each entry starts with a small colored reference tag in square brackets. The reference tags are pink/red.

The author names, publication years, book titles, edition information, publishers, and ISBNs are displayed in compact typography. Book titles are italicized and bolded.

The slide is text-heavy but has clear separation between the two columns.

There are no photographs or diagrams.

============================================================
PAGE 4 OF 13
============================================================

TITLE:
Software Engineering in the Era of AI

BODY:

- The Scaling Myth:
  Early in the generative AI boom, the industry fell victim to a naive assumption: Scaling raw parameter sizes and training tokens would magically cure all structural and logic failures.

- The "Wait for GPT-N" Cop-out:
  If a model could not navigate a 50,000-line codebase or resolve a highly coupled, multi-file regression, the lazy engineering response was simply: "Wait for the next model version."

CALLOUT:

The Black Box Fallacy:
Treating an LLM as a magical oracle that can "one-shot" production-grade solutions without architectural boundaries and not engineering—it is wishful thinking .

VISUAL DESCRIPTION:

The main title is large, bold, and blue.

Two main bullet points appear underneath it.

The first begins with "The Scaling Myth:" in bold dark text. The phrase about scaling raw parameter sizes and training tokens is italicized for emphasis.

The second begins with "The "Wait for GPT-N" Cop-out:" in bold dark text. The quoted statement "Wait for the next model version." is italicized.

Below the bullets is a wide pale pink callout box with a narrow red vertical stripe on its left edge.

Inside the callout, "The Black Box Fallacy:" is bold. The phrase "one-shot" is also visually emphasized using quotation marks.

The phrase "wishful thinking" is bolded.

IMPORTANT: The wording "without architectural boundaries and not engineering" is reproduced as displayed in the original slide, even though the sentence is grammatically unusual.

There are no diagrams or photographs.

============================================================
PAGE 5 OF 13
============================================================

TITLE:
Case Study: The Limits of Unconstrained AI

SUBTITLE:
Real-World Repository Testing & Cognitive Failures - Anthropic (Claude)

INTRODUCTION:

Inside Anthropic, testing early iterations of Claude on SWE-bench Verified (500 complex engineering tasks) hit a hard wall. Left unconstrained, even high-intelligence models suffer operational failures:

BULLET POINTS:

- Premature Victory:
  Declaring tasks complete immediately upon simple compilation, leaving silent logic bugs behind.

- Context Rot & Drift:
  As execution horizons expanded, context windows filled up—causing models to override initial architectural constraints or run in recursive repair loops.

- Overwhelmed Execution:
  Exposing raw environment definitions and broad toolsets upfront caused excessive token consumption on parsing instead of problem-solving.

CALLOUT:

The Short-Term Memory Analogy:

"Claude was like a brilliant, world-class engineer suffering from severe short-term memory, trapped in a room with no pen, paper, or system processes."

VISUAL DESCRIPTION:

The main title is blue and large.

The subtitle underneath it is purple and bold.

The introductory paragraph includes the term "SWE-bench Verified", displayed in a small pink/red code-style highlighted box.

The three bullets are visually differentiated using colored emphasis:

- "Premature Victory" is red.
- "Context Rot & Drift" is orange.
- "Overwhelmed Execution" is purple.

Important phrases within the bullet explanations are also highlighted in matching colors.

A wide pale pink callout box appears underneath the bullets, with a red vertical stripe on the left.

Inside the callout, "The Short-Term Memory Analogy:" is bold.

Within the quotation, the words "world-class engineer" are blue, "severe short-term memory" is red, and "no pen, paper, or system processes" is orange.

There are no diagrams or photographs.

============================================================
PAGE 6 OF 13
============================================================

TITLE:
Case Study: The Limits of Unconstrained AI

SUBTITLE:
Real-World Repository Testing & Cognitive Failures - Anthropic (Claude)

INTRODUCTION:

Inside Anthropic, testing early iterations of Claude on SWE-bench Verified (500 complex engineering tasks) hit a hard wall. Left unconstrained, even high-intelligence models suffer operational failures:

BULLET POINTS:

- Premature Victory:
  Declaring tasks complete immediately upon simple compilation, leaving silent logic bugs behind.

- Context Rot & Drift:
  As execution horizons expanded, context windows filled up—causing models to override initial architectural constraints or run in recursive repair loops.

- Overwhelmed Execution:
  Exposing raw environment definitions and broad toolsets upfront caused excessive token consumption on parsing instead of problem-solving.

CALLOUT:

The Short-Term Memory Analogy:

"Claude was like a brilliant, `world-class engineer` suffering from `severe short-term memory`, trapped in a room with no pen, paper, or system processes."

VISUAL DESCRIPTION:

This slide repeats the same case study and most of the same visual structure as page 5.

The main title is blue and bold. The subtitle is purple.

The introduction and three bullet points are the same as page 5.

However, the visual treatment differs:

- The bullet titles are predominantly dark/bold rather than using the strong red, orange, and purple color emphasis seen on page 5.
- The callout still uses a pale pink background and a red left-side accent line.
- The quote contains visible literal backtick characters around "world-class engineer" and "severe short-term memory".
- The colored word emphasis from page 5 is largely absent.

This is a duplicate slide in the original PDF, but it is included separately because it is a separate page and has a slightly different rendering.

============================================================
PAGE 7 OF 13
============================================================

TITLE:
Software Engineering Strikes Back

SUBTITLE:
The Breakthrough of the Deterministic Agent Harness

INTRODUCTION:

The breakthrough came when Anthropic stopped asking, "How do we make the model smarter?" and started asking, "How do we build a deterministic system to keep the model on track?"

BODY:

- The Initializer/Worker Pattern:
  Decouple initialization from execution.

  - An Initializer Agent maps the repository and writes feature_list.json.
  - Worker Agents execute in fresh, clean context windows, synchronizing state via git commits and progress files (NOTES.md).

- Context Compaction & Progressive Tooling:
  Dynamically prune dead context and load tool schemas on-demand rather than saturating token windows.

- Hard Verification Gates:
  Automated test suites and strict exit codes gate completion, mathematically preventing premature declarations of victory.

CALLOUT:

Architectural Inversion:

Intelligence is not in the foundation weights alone; it is in the deterministic harness that constrains, coordinates, and verifies them.

VISUAL DESCRIPTION:

The main title is large and blue.

The subtitle is purple and bold.

The introductory paragraph contains two rhetorical questions in italic formatting:

"How do we make the model smarter?"

"How do we build a deterministic system to keep the model on track?"

The first main bullet is "The Initializer/Worker Pattern". It includes two nested bullets.

The filenames feature_list.json and NOTES.md appear in small, pink/red code-style highlighted boxes.

The second and third main bullets describe context compaction/progressive tooling and hard verification gates.

A pale blue callout box with a blue vertical accent line appears near the bottom.

The callout heading "Architectural Inversion:" is bold.

There are no photographs. The slide is a structured text explanation of a software engineering workflow.

============================================================
PAGE 8 OF 13
============================================================

TITLE:
The Moral of the Harness

SUBTITLE:
Traditional SWE as the Ultimate Force Multiplier

INTRODUCTION:

Anthropic’s revelation demystified production AI: An LLM is just an engine; the harness is the vehicle.

BODY:

- The Fallacy of Raw Scale:
  Without state management, error-recovery loops, and context garbage collection, even a trillion-parameter model collapses under real-world entropy.

- Classical Rigor Reaffirmed:
  Software architecture, bounded contexts, and automated quality gates have not become obsolete.

- The Strategic Inversion:
  Classical system design is now the essential lever that converts non-deterministic token streams into resilient production software.

CALLOUT:

The Definitive Takeaway:

In the age of AI, traditional software engineering hasn't died—it has become the ultimate force multiplier for artificial intelligence.

VISUAL DESCRIPTION:

The main title is large and blue.

The subtitle is purple.

The introductory sentence is located directly below the subtitle.

Within the introduction, the phrase "An LLM is just an engine" is bold and the phrase "the harness is the vehicle" is highlighted in blue.

Three bullet points follow:

- "The Fallacy of Raw Scale" is orange.
- "Classical Rigor Reaffirmed" is blue.
- "The Strategic Inversion" is purple.

Several important terms within the explanations are also highlighted using their corresponding accent colors.

The final takeaway is placed inside a wide pale pink callout box with a red vertical stripe on the left.

"The Definitive Takeaway:" is blue and bold.

The phrase "the ultimate force multiplier" is red and bold.

There are no diagrams or photographs.

============================================================
PAGE 9 OF 13
============================================================

TITLE:
Case Study Context: Aerospace Subsystem

BODY:

Domain:
High-Reliability Aerospace Control Subsystem.

Task:
Implement a PID (Proportional, Integral, Derivative) controller for rapid altitude stabilization.

Environment:
The team was under severe schedule pressure.

Action:
A junior engineer used an AI coding assistant to generate the core loop.

SECTION:

How Closed-Loop Control Works (At a High Level):

A feedback control loop constantly compares where you are to where you want to be, making continuous micro-corrections:

The Three Intuitive Voices of PID:

1. P (Proportional) — The Present:
   "How far off are we right now?" (Immediate push)

2. I (Integral) — The Past:
   "Have we been drifting off-target for too long?" (Persistent push)

3. D (Derivative) — The Future:
   "How fast are we closing the gap?" (Brakes against overshooting)

VISUAL DESCRIPTION:

The slide is primarily text-based.

The main title is large and blue.

The first four pieces of information are arranged as short statements. The labels Domain, Task, Environment, and Action are bold.

A paragraph underneath introduces feedback control loops.

The phrase "How Closed-Loop Control Works (At a High Level):" is bold.

The next section introduces three intuitive components of PID control.

The three components are presented as separate bullet points:

- P represents the Present and describes the immediate error.
- I represents the Past and describes accumulated error over time.
- D represents the Future and describes the rate at which the error is changing, helping prevent overshooting.

The original slide uses icon/emoji-style symbols alongside the three PID components.

The text extraction contains:
- P: no clearly preserved emoji.
- I: ⏳ (hourglass/clock-style symbol).
- D: 🔮 (crystal-ball symbol).

In the rendered slide, small broken-image or missing-glyph-like placeholders are visible immediately before the P, I, and D labels. This appears to be a rendering/font issue rather than meaningful content.

There are no charts or photographs.

============================================================
PAGE 10 OF 13
============================================================

TITLE:
The setup: AI-Generated PID Logic

LEFT-SIDE BODY TEXT:

The LLM generated a syntactically perfect, mathematically correct standard PID algorithm in Python. The unit tests (also generated by the LLM) passed flawlessly.

The engineer reviewed the logic, confirmed the math matched the textbook, and merged the PR. The system was deployed to a hardware-in-the-loop simulation environment.

CALLOUT:

What could go wrong?

RIGHT-SIDE DIAGRAM:

The slide contains a sequence-style process diagram with four components arranged horizontally:

1. Sensor
2. AI PID
3. Accumulator (F32)
4. Actuator

The diagram shows the following sequence:

STEP 1:
The Sensor provides a very small error value to the AI PID component.

Label:
Error Delta = 0.0000001

STEP 2:
The AI PID sends an accumulation operation to the Accumulator (F32).

Label:
Sum = 100000.0 + 0.0000001

STEP 3:
The accumulator cannot preserve the small change in the floating-point value.

Label:
Silent Truncation to 100000.0

STEP 4:
The accumulator returns the truncated value.

Label:
Return 100000.0

STEP 5:
The AI PID sends a command to the actuator.

Label:
Command(0.0 correction)

STEP 6:
The system experiences a physical consequence.

Label:
Physical Drift / Loss

VISUAL DESCRIPTION:

The slide is divided into two main areas.

LEFT:
The explanation text occupies approximately half the slide.

RIGHT:
A sequence diagram occupies the other half.

The sequence diagram has four dark blue-gray rectangular component headers at the top, labelled:
Sensor, AI PID, Accumulator (F32), and Actuator.

Each component has a thin, light-gray, vertically dashed lifeline extending downwards.

Horizontal arrows connect the components and represent messages or data being passed through the system.

The labels are placed beside the arrows to explain the floating-point accumulation process.

A dark rectangular callout appears around the silent truncation stage. Another dark box near the bottom identifies the physical consequence as "Physical Drift / Loss".

The diagram visually illustrates how a tiny sensor correction is lost when added to a much larger floating-point accumulator.

The main title is blue.

Important phrases in the left-side text are colored:
- "standard PID algorithm" is blue.
- "passed flawlessly" is green.
- "hardware-in-the-loop simulation environment" is orange.

The question "What could go wrong?" is inside a pale pink box with a red vertical stripe.

============================================================
PAGE 11 OF 13
============================================================

TITLE:
The Incident: Silent Logic Bug

BODY:

The Flaw:
The LLM used standard 32-bit floating-point accumulation for the Integral term.

Over a 12-hour simulation, the accumulated sum grew massive. When the sensor reported microscopic real-time error corrections (0.0000001), catastrophic cancellation (type truncation) occurred.

The 32-bit float could not represent the tiny delta against the massive sum. The system effectively ignored all minor corrections, leading to a silent, unrecoverable loss of altitude.

VISUAL DESCRIPTION:

The slide has a large blue title near the top.

There are three paragraphs underneath it, aligned to the left.

"The Flaw:" is bold.

"Integral" is italicized in the first paragraph.

The numeric value 0.0000001 is included in parentheses in the second paragraph.

The phrase "catastrophic cancellation (type truncation)" is bold for emphasis.

The final paragraph explains the consequence: small corrections are ignored, resulting in a silent and unrecoverable loss of altitude.

The remainder of the slide is mostly empty white space.

There are no charts, illustrations, or diagrams.

============================================================
PAGE 12 OF 13
============================================================

TITLE:
The Security Flaw: AI Supply Chain Attack

BODY:

During the incident investigation, the architecture team discovered a secondary flaw.

The LLM had hallucinated a dependency import to format the telemetry output:

import yaml_config_parser.

The developer blindly installed this package via pip. The package was real, but it was a known malicious typo-squatting library that executed remote code upon initialization. The AI inadvertently acted as a vector for a supply chain attack.

VISUAL DESCRIPTION:

The main title is large, bold, and blue.

The slide contains three main text sections.

The first introduces a secondary security flaw discovered during an investigation.

The second explains that the LLM hallucinated a dependency import. The code snippet appears inside a pink/red code-style highlighted box:

import yaml_config_parser

The third paragraph explains that the developer installed the package using pip, and that the package was a malicious typo-squatting library capable of executing remote code when initialized.

The final sentence connects the AI-generated dependency to a software supply chain attack.

The slide has a simple, clean layout with substantial empty space underneath the text.

There are no diagrams or photographs.

============================================================
PAGE 13 OF 13
============================================================

VISIBLE TEXT:

Running header:
CS325: Advanced Software Engineering — Week 1

Footer:
Topic: Foundations of Modern Software Engineering | Readings: CleanArch (Ch1, Ch2); FSA (Ch1, Ch2) DMLS (Ch1)

Slide number:
13

VISUAL DESCRIPTION:

This slide is essentially blank.

It has the same white background and standard presentation template as the preceding slides.

A thin gray horizontal line appears near the top.

The small gray running header appears at the upper-left.

The standard topic/readings footer appears at the bottom-left.

The slide number 13 appears at the bottom-right.

There is no title, body text, diagram, image, photograph, or other visible content.

============================================================
END OF DOCUMENT
============================================================

IMPORTANT NOTES FOR INTERPRETATION:

1. The document contains 13 pages, including the blank final page.

2. The cover identifies the course as CS352, while the running header on every page identifies it as CS325. This discrepancy is present in the original PDF.

3. Pages 5 and 6 contain the same case study text. They are separate slides in the PDF, with differences in visual emphasis and formatting.

4. Page 9 contains icon/font rendering artifacts around the PID components. The intended text labels and their meanings are transcribed above.

5. Page 10 contains a sequence diagram explaining the floating-point accumulation failure. Its components, values, operations, and outcome have been described in reading order.

6. Page 11 contains the value 0.0000001, which is visible in the rendered slide even though it is not preserved properly in the PDF's raw text extraction.

7. The original typography, color, positioning, and visual hierarchy are described in each page's visual description. Text has been normalized into a more readable structure without intentionally changing its meaning.

8. This transcription represents the visible content of the slides. It does not claim to reproduce the original PDF's exact pixels, font metrics, or physical layout.