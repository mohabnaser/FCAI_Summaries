CS352 — ADVANCED SOFTWARE ENGINEERING
WEEK 2: FOUNDATIONS OF MODERN ENGINEERING
Instructor: Dr. Desoky Abdelqawy
Core Paradigm: Architecture is the decisions that are hard to change later.

==================================================
SLIDE 1 — COURSE INTRODUCTION
==================================================

CS352: Advanced Software Engineering
Week 2: Foundations of Modern Engineering

Instructor: Dr. Desoky Abdelqawy

Core Paradigm: Architecture is the decisions that are hard to change later.

==================================================
SLIDE 2 — MASTER REFERENCE BIBLIOGRAPHY
==================================================

Canonical Software Engineering & AI Systems Literature

Each topic in the weekly breakdown maps directly to specific chapters from these foundational texts:

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

==================================================
SLIDE 3 — THE SOFTWARE CRISIS & "NO SILVER BULLET"
==================================================

In 1968, NATO convened to address the "Software Crisis." Decades later, Fred Brooks argued there is no silver bullet for software engineering because of its essential complexity.

Essential Complexity: The inherent difficulty of modeling complex, contradictory business realities.

Accidental Complexity: The self-inflicted damage caused by poor architectural decisions, chaotic frameworks, and undisciplined developers.

Our entire discipline is dedicated to eliminating accidental complexity.

==================================================
SLIDE 4 — BROOKS' INHERENT SOFTWARE PROPERTIES
==================================================

Subtitle: Why Software is Uniquely Hard (No Silver Bullet)

Brooks argued that software is inherently hard to engineer because of four immutable, essential properties:

1. Complexity: No two software parts are alike, and the state space grows exponentially.

2. Conformity: Software has no natural laws; it must conform to arbitrary human interfaces, legacy systems, and regulations.

3. Changeability: Because code is perceived as malleable, it is under constant, intense pressure to change (unlike physical buildings).

4. Invisibility: Software is invisible and unvisualizable, hiding its structural flaws until execution.

==================================================
SLIDE 5 — THE CONTINUUM OF ARCHITECTURE & DESIGN
==================================================

Myth: Architecture is high-level boundary boxes; design is low-level code.

Fact: There is no conceptual difference between software architecture and software design. They form an unbroken, continuous fabric of decisions.

Axiom I: Low-level details directly support and define the high-level structures. One cannot exist without the other.

You cannot be a "whiteboard architect." If your code is a mess, your architecture is a failure.

DIAGRAM:
Two nested ovals:
- Large outer blue oval: Software Design.
- Smaller inner orange oval: Software Architecture.

Meaning: Software architecture is contained within the broader activity of software design. Both belong to one continuous decision-making process.

==================================================
SLIDE 6 — SOFTWARE ARCHITECTURE VS SOFTWARE DESIGN
==================================================

Subtitle: What is Software Architecture and how does it relate to Software Design?

- The software architecture of the system is the set of structures needed to reason about the system, which comprises software elements, relations among them, and properties of both.

- The details that you include in your architecture model to reason about the failures are architectural details.

- The full design of the system includes other details necessary to build the system, but not needed to reason about the failures. Such details are design details.

==================================================
SLIDE 7 — ARCHITECTURE AND DESIGN: VISUAL COMPARISON
==================================================

DIAGRAM DESCRIPTION:

The slide is a large comparative illustration divided into two sides.

LEFT SIDE — ARCHITECT:

A red human-like figure labelled "Architect".

Three arrows point from the architect toward:

1. Architecture characteristics:
   Illustrated with a hand drawing a flowchart of connected boxes and decision shapes.

2. Style:
   Illustrated by a layered software architecture diagram.
   Contains:
   - Monolithic Interface
   - API Layer
   - Multiple service modules
   - Database components

3. Component structure:
   Illustrated by a hierarchy of business components and smaller subcomponents, including:
   - Purchase
   - Order
   - Payment
   - Promotion
   - Common
   - Local
   - MakeOrder
   - Products
   - Deliver
   - Address
   - Management
   - Reports
   - Location

CENTER:
A vertical divider separates the architect's responsibilities from the developer's implementation work. A horizontal arrow connects both sides.

RIGHT SIDE — DEVELOPER:

A green/yellow human-like figure labelled "Developer".

Three arrows point toward:

1. Class design:
   A UML-style class/relationship diagram consisting of boxes and connecting lines.

2. User interface:
   A web application wireframe showing a LOGO area, header, heading, content sections, and layout placeholders.

3. Source code:
   A screenshot of a programming code editor containing source code.

==================================================
SLIDE 8 — SOFTWARE ARCHITECTURE VS SOFTWARE DESIGN (CONTINUE)
==================================================

- Architecture is design, but not all design is architecture.

- Architecture consists of architectural design decisions, and all others are non-architectural.

Questions:

- What decisions are non-architectural?
- What design decisions does the architect leave to the discretion of others?
- How about detailed decisions that are still architectural?

==================================================
SLIDE 9 — THE HOUSE ARCHITECT ANALOGY
==================================================

Subtitle: Macroscopic Policy vs. Microscopic Detail

A physical architect does not stop at high-level drawings. A complete blueprint dictates both the macroscopic and the microscopic:

Macroscopic Layout: Room flow, elevations, and structural volume.

Microscopic Specifications: The diameter of the sump pump outlet, the size of the foundation bolts, drywall thickness, and the placement of light switches.

If microscopic details are neglected, the macroscopic house fails to function.

The Software Equivalence: High-level decoupling is realized exclusively by microscopic code choices (such as import statements and variable declarations).

==================================================
SLIDE 10 — THE FUNDAMENTAL GOAL OF ARCHITECTURE
==================================================

Why do we care about structure? It is not for aesthetics. It is purely economic.

Goal = Minimize the human resources required to build and maintain a system.

Good Design: The cost of adding the 100th feature is identical to the cost of adding the 1st feature. Effort remains stable.

Bad Design: The cost per line of code grows exponentially over the system's lifetime.

==================================================
SLIDE 11 — THE "CLEAN UP LATER" FALLACY
==================================================

Also known as The Hare's Overconfidence.

Developers constantly lie to themselves:

"We can clean it up later; we just have to get to market first!"

The Reality: Market pressures never abate. You will never be given permission to "stop and clean up."

Making messes is always slower than staying clean, on any time scale.

==================================================
SLIDE 12 — A TALE OF TWO VALUES: BEHAVIOR VS. STRUCTURE
==================================================

Every software system provides two distinct values (CleanArch Ch2):

1. Behavior:
   The immediate functional capability. (Making the machine do what the stakeholders want today).

2. Architecture (Structure):
   The preservation of "softness." (Ensuring the machine can easily do what stakeholders want tomorrow).

If machine behavior was meant to be hard to change, we would have built it in hardware.

==================================================
SLIDE 13 — THE COST-FRICTION PRINCIPLE
==================================================

How do you measure if an architecture is degrading? Look at the friction of change.

Scope of Change: The logical size of the requested feature.

Shape of Change: How the request aligns with the system's structural design.

The Principle: In a healthy system, the cost of change is proportional ONLY to the scope of the change, never to its shape.

==================================================
SLIDE 14 — THE EISENHOWER MATRIX IN SOFTWARE
==================================================

Mapping software priorities to President Eisenhower's urgency matrix:

Quadrant 1 (Urgent & Important): Critical production bugs.

Quadrant 2 (Not Urgent, Important): Architecture & Structural Integrity.

Quadrant 3 (Urgent, Not Important): Immediate, but trivial stakeholder features.

Quadrant 4 (Not Urgent, Not Important): All other nice-to-have stuff.

The Failure Mode: Elevating Quadrant 3 features above Quadrant 2 architecture. This destroys companies.

VISUAL:
A traditional 2x2 Eisenhower priority matrix appears beside a portrait of President Dwight D. Eisenhower.

Matrix:

TOP LEFT:
IMPORTANT / URGENT

TOP RIGHT:
IMPORTANT / NOT URGENT

BOTTOM LEFT:
UNIMPORTANT / URGENT

BOTTOM RIGHT:
UNIMPORTANT / NOT URGENT

Caption: Figure 2.1 Eisenhower matrix.

==================================================
SLIDE 15 — TABLE 1: EXTREME VALUE TRADE-OFFS
==================================================

What happens if you run an organization at the extremes of behavior and structure?

CASE A:

Scenario:
Perfect Behavior / Rigged Structure: Program does exactly what is required today, but the code is heavily coupled and rigid.

Immediate Outcome:
Success: Stakeholders are happy, immediate revenue is captured.

Long-term Survivability:
Death: The moment business requirements shift, the cost of refactoring approaches infinity. The system freezes.

CASE B:

Scenario:
Defective Behavior / Soft Structure: Program has bugs today, but the architecture is perfectly decoupled and modular.

Immediate Outcome:
Friction: Immediate stakeholder complaints and bug reports.

Long-term Survivability:
Immortal: Fixing the defects takes near-zero effort because the code has shape-agnostic design.

==================================================
SLIDE 16 — THE 4D MODEL OF ARCHITECTURE
==================================================

Architecture is not just structure; it is a 4-dimensional model:

1. Structure:
   The style (Microservices, Event-Driven, Microkernel).

2. Architecture Characteristics ("-ilities"):
   Scalability, availability, security.

3. Architecture Decisions:
   Hard constraints (e.g., "The UI cannot query the DB").

4. Design Principles:
   Directional guidelines (e.g., "Prefer asynchronous messaging").

==================================================
SLIDE 17 — THE EIGHT CORE EXPECTATIONS OF AN ARCHITECT
==================================================

Subtitle: Expanding Beyond the Whiteboard (FSA Ch 1)

As an architect, you are expected to master several key dimensions:

1. Make Architecture Decisions:
   Define structural boundaries and parameters rather than micromanaging specific tools.

2. Continually Analyze:
   Monitor systemic viability and structural health over time to halt structural decay.

3. Keep Current with Trends:
   Monitor and prepare for inevitable technical shifts.

4. Ensure Compliance:
   Establish automated governance and validation mechanisms (fitness functions).

==================================================
SLIDE 18 — THE EIGHT CORE EXPECTATIONS (CONTINUED)
==================================================

Subtitle: Cultivating Leadership, Breadth & Politics

5. Diverse Exposure:
   Cultivate a wide, heterogeneous technical breadth over localized depth.

6. Business Domain Knowledge:
   Understand domain concepts, goals, vocabulary, and market positioning.

7. Interpersonal Skills:
   Lead, facilitate, coach, and mentor, acting as a collaborative peer.

8. Navigate Politics:
   Defend trade-offs objectively against stakeholder pressure.

Compliance Imperative:

A whiteboard drawing that no one follows is not architecture; it's modern art.

Your primary task is ensuring compliance.

==================================================
SLIDE 19 — CASE STUDY: PETS.COM
==================================================

Subtitle: The Failure of Elastic Scale

The Setup:
Launched a massive national marketing campaign driving an immense surge in concurrent orders.

The Collapse:
Prioritized business behavior (marketing, checkout features) over operational architecture.

Lacking elastic scale, databases locked, transactions corrupted, and order fulfillment choked, leading to business liquidation.

Takeaway:
Scale is not a secondary feature you add later. It is a foundational characteristic that must be baked into structural bounds.

==================================================
SLIDE 20 — CASE STUDY: 2002 DATA CENTER
==================================================

Subtitle: The Contextual Economics of Architectural Styles

The Historical Context:
Running 50 isolated services in 2002 cost millions in commercial server and DB licenses (Oracle, Windows Server, hardware racks).

The Modern Inversion:
Today, modern lightweight containerization (Docker, Kubernetes) reduces the marginal cost of spawning isolated containers to near-zero.

Takeaway:
Architectural styles are products of their historical and socioeconomic context. What was reckless in 2002 is industry standard today.

==================================================
SLIDE 21 — TECHNICAL DEPTH VS. TECHNICAL BREADTH
==================================================

As developers, you spent years building Technical Depth (expertise in one stack).

As architects, you must sacrifice depth to aggressively expand Technical Breadth.

Stuff you know:
Depth.

Stuff you know you don't know:
Breadth (Awareness of alternatives).

Stuff you don't know you don't know:
The danger zone (Unknown Unknowns).

You cannot select the best architectural trade-off if you are unaware the pattern exists.

==================================================
SLIDE 22 — SOFTWARE PROCESS VS. ENGINEERING PRACTICES
==================================================

Subtitle: The Limits of Human-Centric Workflows

Students and organizations frequently conflate these two concepts:

Software Development Process:
Human-centric workflows tracking who does the work and when (e.g., Scrum, Kanban). Process regulates meetings, cards, and sprint retrospectives.

Software Engineering Practices:
Process-agnostic, objective, technical techniques that dictate how code is constructed (e.g., Continuous Integration, TDD, automated linters).

The Architectural Axiom:

Process frameworks (like Scrum) cannot repair or preserve a decoupled architecture. Only disciplined engineering practices (like fitness functions) can.

==================================================
SLIDE 23 — THE FIRST LAW OF SOFTWARE ARCHITECTURE
==================================================

First Law:

"Everything in software architecture is a trade-off."

Corollary:

If you think you have found an architectural pattern that doesn’t have a massive trade-off, you just haven't identified the trade-off yet.

Example:

Microservices grant infinite independent scalability, but introduce catastrophic network latency, distributed transaction failures, and extreme deployment complexity.

==================================================
SLIDE 24 — THE SECOND LAW OF SOFTWARE ARCHITECTURE
==================================================

Second Law:

"Why is more important than how."

Corollary:

If you only document how an architecture is built without recording why it was designed that way, future teams will inevitably question the design, misunderstand its trade-offs, and risk dismantling its core strengths.

Example:

Any architect can inspect an unfamiliar system's topology diagrams to reverse-engineer how services communicate, but without Architecture Decision Records (ADRs) or recorded context, they cannot determine why a particular database, boundary, or integration strategy was chosen over the alternatives.

==================================================
SLIDE 25 — ARCHITECTURAL THINKING: THE "CIRCLE OF LIFE"
==================================================

The traditional model (Architect hands a blueprint to a Developer) is a catastrophic anti-pattern.

The Collaborative View:

Architecture and design are a synchronized "Circle of Life."

- Architects must remain hands-on, writing code and proving out POCs.
- Developers must understand the architectural constraints to inform their localized class designs.

Avoid the Bottleneck Trap:

Do not take ownership of critical-path framework code.

==================================================
SLIDE 26 — HANDS-ON PRESERVATION STRATEGIES
==================================================

Subtitle: Staying in the Trenches Without Becoming the Bottleneck

An architect who ceases coding completely quickly becomes an "Ivory Tower" architect. You must remain hands-on using four non-critical-path mechanisms:

1. Targeted Feature Delivery:
   Code non-critical, business-domain features planned 1-3 iterations in advance. Never touch critical-path framework code.

2. High-Quality Proof of Concepts (POCs):
   Write production-grade prototypes to evaluate competing tools. Throwaway code must remain reference-quality.

3. Technical Debt Stories:
   Take ownership of low-priority technical debt or infrastructure enablement cards that will not stall the team if delayed.

4. Developer Tooling & Automation:
   Build command-line utilities, custom linters, code generators, and automated fitness functions to help the team.

==================================================
SLIDE 27 — THE KNOWLEDGE PYRAMID
==================================================

The goal of architectural thinking: is constantly pushing the boundaries of the middle tier downwards into the bottom tier. You expand what you know you don't know.

DIAGRAM: THE KNOWLEDGE PYRAMID

Three vertically stacked levels:

TOP:
Stuff You Know
(Technical Depth & Expertise)

MIDDLE:
Stuff You Know You Don't Know
(Technical Breadth)

BOTTOM:
Stuff You Don't Know You Don't Know
(The Unknown Unknowns)

Arrows connect the levels upward.

Concept:
Architectural thinking expands awareness of alternatives and unknowns, pushing the boundaries of what is known.

==================================================
SLIDE 28 — THE PROBABILISTIC PARADIGM SHIFT
==================================================

Subtitle: Why ML Systems are the Ultimate Test of Architecture

In traditional software, human engineers write deterministic logic (code) that transforms inputs into structured outputs. Machine learning represents a systemic inversion:

Traditional SWE:
Input + Deterministic Rules (Code) → Output

Production ML:
Historical Data (X and Y) → Statistical Model (Probabilistic Rules)

The Architectural Challenge:

In ML, data is code. If the real-world data distribution drifts, the system's runtime logic changes silently under the hood.

==================================================
SLIDE 29 — MACHINE LEARNING SYSTEMS IN PRODUCTION
==================================================

Moving to Designing ML Systems (Huyen, Ch1). ML systems revolutionized the traditional architectural constraints.

Machine Learning is the use of complex models to extract patterns from existing data to predict unseen data.

We deploy ML when:

1. The rules are highly dynamic (traditional code rots).
2. The problem operates at massive scale.
3. The underlying mapping is functionally non-linear (humans cannot write the if statements).

==================================================
SLIDE 30 — WHEN NOT TO USE MACHINE LEARNING
==================================================

Subtitle: The Heuristics of Algorithmic Restraint

Before deploying a probabilistic engine, an architect must verify that ML is actually required.

Do NOT use ML if:

1. Simple Rules Suffice:
   A regular expression, simple lookup table, or basic decision-heuristic performs adequately and is highly auditable.

2. Data Scarcity:
   Access to clean, representative, and labelable historical data is non-existent or financially prohibitive.

3. Absolute Interpretability is Mandatory:
   The business or law requires a 100% trace of exact logical execution (e.g., medical diagnostics or aerospace triggers).

==================================================
SLIDE 31 — WHEN NOT TO USE MACHINE LEARNING (CONTINUED)
==================================================

Subtitle: Stationarity & High-Risk Fault Scenarios

Do NOT use Machine Learning if:

4. Environment is Non-Stationary (No Patterns):
   The underlying data generator lacks statistical regularities or shifts faster than retraining can adapt (e.g., predicting unpredictable chaotic events like dice outcomes).

5. High Error Penalty:
   The system cannot tolerate probabilistic failure under any circumstances (e.g., critical hardware shutoff or physical triggers where failure costs lives).

Architecture Default:

Always default to clean, rule-based logic until empirical data proves rules cannot satisfy the system requirements.

==================================================
SLIDE 32 — FOUR PILLARS OF PRODUCTION ML SYSTEMS
==================================================

Subtitle: Software & Statistical Integrity

1. Reliability:
   System continues to function despite hardware or network faults. In ML, this is challenged by silent failures (models returning valid schemas with stale, incorrect, or highly biased predictions).

2. Scalability:
   Managing growth in data, QPS, or model count. Requires automating CPU/GPU auto-scaling and orchestrating thousands of customized models.

3. Maintainability:
   Establishing clean separation of concerns, standardized feature stores, and collaborative interfaces for Data Scientists and MLOps.

4. Adaptability:
   The architectural capability to continuously detect performance decay (drift) and seamlessly trigger continuous retraining.

==================================================
SLIDE 33 — TABLE 2: TRADITIONAL SWE VS. ML ENGINEERING
==================================================

(Derived from Designing Machine Learning Systems)

DIMENSION: Logic Origin

Traditional Software Engineering:
Explicitly coded by human engineers.

Machine Learning Systems:
Emerges dynamically from Code + Data + Hyperparameters.

DIMENSION: Failure Mode

Traditional Software Engineering:
Loud (Stack traces, Null pointers, crashes).

Machine Learning Systems:
Silent (Valid schemas, incorrect behavior/bias).

DIMENSION: Testing

Traditional Software Engineering:
Unit tests verify deterministic outputs.

Machine Learning Systems:
Statistical evaluations verify probabilistic boundaries.

DIMENSION: Decay

Traditional Software Engineering:
Rots when underlying dependencies/APIs change.

Machine Learning Systems:
Rots instantly as real-world data distributions drift.

DIMENSION: Artifact Size

Traditional Software Engineering:
Megabytes (Binaries, containers).

Machine Learning Systems:
Gigabytes/Terabytes (Massive tensor weights).

==================================================
SLIDE 34 — THINK & DEFEND: DILEMMA 1
==================================================

Subtitle: Speed vs. Structural Integrity

Scenario:

Your startup has 3 months of runway left. The CEO demands a massive pivot to a new feature set.

If you build it cleanly (Architecture), it will take 4 months, and the company dies.

If you hack it together (Behavior), it takes 2 months, but the code becomes an unmaintainable mess.

Architectural Question:

What is the "least worst" decision?

==================================================
SLIDE 35 — THINK & DEFEND: DILEMMA 2
==================================================

Subtitle: Latency vs. Throughput

Scenario:

You are building an ML-driven high-frequency trading bot. The model predicts price movements.

Option A:
Process trades individually.
Latency = 10ms.
Throughput = 100 QPS.

Option B:
Batch 50 trades.
Latency = 45ms.
Throughput = 1,000 QPS.

Architectural Question:

Which do you choose?

==================================================
SLIDE 36 — THINK & DEFEND: DILEMMA 3
==================================================

Subtitle: Accuracy vs. Maintainability (The Ensembling Paradox)

Scenario:

A Kaggle grandmaster builds an ML model using an ensemble of 15 different deep learning architectures.

It improves conversion accuracy by 0.5% over a single, simple model.

However, deploying the ensemble requires tripling your server budget and maintaining 15 separate data pipelines.

Architectural Question:

Do you deploy the ensemble?

==================================================
SLIDE 37 — SUMMARY & NEXT WEEK
==================================================

Core Axioms Reviewed:

1. Architecture and Design are an unbroken continuum. Cleanliness is speed.

2. Architecture is a series of localized trade-offs; there is no "perfect" system.

3. ML Systems fail silently; they require statistical, not just deterministic, verification.

This Week's Readings:

CleanArch: Chapter 1 and Chapter 2.
FSA: Chapter 1 and Chapter 2.
DMLS: Chapter 1.

==================================================
END OF WEEK 2 DOCUMENT
==================================================