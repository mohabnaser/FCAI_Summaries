# CHAPTER 6 — CPU SCHEDULING
**Detailed slide-by-slide notes with visual descriptions**

Source: Uploaded 45-page PDF.

This is a token-efficient reconstruction of the deck's ideas, examples, numerical data, equations, and visual content, written in fresh wording rather than a verbatim copy.

## Common visual design

PDF pages 2–44 share a consistent white slide template: a blue vertical band on the far left, a large teal/blue title with a drop shadow, a thin blue rule below the title, and small dinosaur illustrations at the upper-left and lower-right.

The footer repeatedly credits Operating System Concepts, 9th Edition, Silberschatz, Galvin and Gagne (2013), and Dr. Khaled Wassif as the modifier.

---

## PDF PAGE 1 — Opening slide

**Main subject:** Chapter 6, CPU Scheduling.

**Visual description:** A clean white cover with the chapter name centered in two lines in large teal-blue lettering with a shadow. A long blue horizontal bar sits below it, with a lighter segment around the middle. A small prehistoric dinosaur image is centered lower on the page inside a white rectangular frame surrounded by nested blue outlines.

---

## PDF PAGE 2 — Chapter roadmap (slide 6.2)

The chapter is organized around these subjects:

- Introductory CPU-scheduling concepts.
- Criteria used to judge a scheduler.
- Scheduling algorithms.
- Scheduling for threads.
- Scheduling across multiple processors.
- Real-time CPU scheduling.
- Examples from operating systems.
- Ways to evaluate scheduling algorithms.

**Visual description:** A vertical, eight-item bullet list. Most items use dark text; the thread-scheduling, real-time, and OS-examples entries are visually faded compared with the others.

---

## PDF PAGE 3 — Learning goals (slide 6.3)

By the end of the chapter, a student should be able to:

- Explain why CPU scheduling is fundamental to multiprogramming.
- Describe several different CPU-scheduling approaches.
- Compare schedulers using criteria appropriate to a particular system.
- Recognize scheduling approaches used in several operating systems.

**Visual description:** Four large orange square bullets, each introducing one learning goal. No chart or diagram.

---

## PDF PAGE 4 — Process execution and bursts (slide 6.4)

Key ideas:

- Multiprogramming helps keep the processor usefully occupied.
- A process alternates between periods of CPU execution and periods waiting for I/O.
- A period of processor work is a CPU burst; a period waiting for I/O is an I/O burst.
- The distribution of CPU-burst lengths is especially important to scheduling.

**Visual description — repeating execution pattern:**

The right side shows a vertical sequence alternating CPU work and I/O waits. Example CPU activity labels include loading/storing values, adding to stored values, reading a file, incrementing an index, and writing to a file.

Between work groups are rectangles representing I/O waits.

Braces on the right distinguish each CPU-burst region from each I/O-burst region. Dots at the top and bottom indicate that the pattern continues.

---

## PDF PAGE 5 — Distribution of CPU-burst lengths (slide 6.5)

**Visual description — frequency plot:**

A gray grid graph plots burst duration in milliseconds (horizontal axis, 0–40) against frequency (vertical axis, roughly 0–160).

A cyan line rises sharply to a peak near 155 at a very short burst duration, falls to around 30 within the next few milliseconds, and approaches the baseline by about 8 ms. It remains nearly flat through 40 ms.

The visual message is that brief CPU bursts occur far more often than long ones.

---

## PDF PAGE 6 — CPU scheduler and decision points (slide 6.6)

Key ideas:

- The short-term scheduler chooses one process from the ready queue and gives it the CPU.
- The ready queue can be organized in different ways.
- A scheduling decision can be triggered when a process:
  1. Leaves the running state to wait for something.
  2. Is moved from running back to ready.
  3. Becomes ready after waiting.
  4. Finishes execution.
- The first and fourth events are nonpreemptive decision points.
- The other two are preemptive decision points.
- Preemption requires care around shared data, kernel execution, and interrupts during sensitive OS operations.

**Visual description — process-state model:**

A small state diagram contains five nodes: new, ready, running, waiting, and terminated.

Its transitions are:

- New → Ready: admitted.
- Ready → Running: scheduler dispatch.
- Running → Ready: interrupt.
- Running → Terminated: exit.
- Running → Waiting: I/O or event wait.
- Waiting → Ready: I/O or event completion.

---

## PDF PAGE 7 — Dispatching a process (slide 6.7)

The dispatcher hands the processor to the process chosen by the short-term scheduler. The handoff includes:

- Saving/restoring the required execution context.
- Changing the processor into user mode.
- Continuing the selected program at the correct instruction location.

**Dispatch latency** is the time spent stopping one process and getting the next one running.

**Visual description:** A text-only slide with three indented dispatcher tasks and a separate definition of dispatch latency.

---

## PDF PAGE 8 — Metrics for scheduling (slide 6.8)

The deck introduces five measures:

- **CPU utilization:** The fraction of time the CPU is busy.
- **Throughput:** How many processes finish during a unit of time.
- **Turnaround time:** The elapsed time required for a process to complete.
- **Waiting time:** Time spent waiting in the ready queue.
- **Response time:** Delay from submitting a request until the first response appears; this is not the same as waiting for all output, especially in time-sharing systems.

**Visual description:** Five vertically arranged bullets. Each metric name is bolded before its explanation.

---

## PDF PAGE 9 — What an algorithm should optimize (slide 6.9)

The optimization targets listed are:

- Maximize CPU utilization.
- Maximize throughput.
- Minimize turnaround time.
- Minimize ready-queue waiting time.
- Minimize response time.

**Visual description:** A sparse list of five goals, each with an orange square bullet.

---

## PDF PAGE 10 — List of scheduling methods (slide 6.10)

The algorithms introduced in the chapter are:

- First-Come, First-Served (FCFS).
- Shortest-Job-First (SJF).
- Shortest-Remaining-Time-First (SRTF).
- Priority scheduling.
- Round Robin (RR).
- Multilevel Queue (MLQ).
- Multilevel Feedback Queue (MLFQ).

**Visual description:** A simple seven-item bulleted list. This page is important because its content was not included in the initial selectable-text extraction.

---

## PDF PAGE 11 — FCFS example 1 (slide 6.11)

**Input data:**

| Process | CPU burst |
|---|---:|
| P1 | 24 |
| P2 | 3 |
| P3 | 3 |

Arrival order: P1, then P2, then P3.

**Execution timeline:**

- P1 runs from 0 to 24.
- P2 runs from 24 to 27.
- P3 runs from 27 to 30.

Waiting times: P1 = 0, P2 = 24, P3 = 27.

Mean waiting time:

(0 + 24 + 27) / 3 = 17.

**Visual description:** A yellow Gantt bar has three adjacent sections, with P1 taking most of the width. Time boundaries are 0, 24, 27, and 30.

---

## PDF PAGE 12 — FCFS example 2 and convoy effect (slide 6.12)

The same three processes are used, but the arrival/queue order is P2, P3, P1.

**Execution timeline:**

- P2: 0–3.
- P3: 3–6.
- P1: 6–30.

Waiting times: P1 = 6, P2 = 0, P3 = 3.

Mean waiting time:

(6 + 0 + 3) / 3 = 3.

This is substantially smaller than in the previous ordering.

The slide introduces the **convoy effect**: short jobs may be held up behind a long job. It asks the reader to consider one CPU-intensive process together with many I/O-intensive processes.

**Visual description:** A yellow Gantt bar shows P2, P3, and then the much longer P1 block. The convoy-effect concept is emphasized in blue.

---

## PDF PAGE 13 — SJF principle (slide 6.13)

SJF associates each process with the length of its next CPU burst, then chooses the shortest one.

For a fixed set of processes, this rule gives the smallest average waiting time.

Its practical difficulty is that the next burst length is not known in advance; the slide mentions asking the user as one possible (but impractical) source of that information.

**Visual description:** A text-only slide. The central emphasis is SJF's minimum-average-waiting-time property and the difficulty of predicting the next burst.

---

## PDF PAGE 14 — Basic SJF numerical example (slide 6.14)

**Input data:**

| Process | Burst time |
|---|---:|
| P1 | 6 |
| P2 | 8 |
| P3 | 7 |
| P4 | 3 |

The slide also displays the waiting-time relationship:

Waiting time = Finish time − (Arrival time + Burst time)

**Gantt chart order and boundaries:**

- P4: 0–3.
- P1: 3–9.
- P3: 9–16.
- P2: 16–24.

Mean waiting time:

(3 + 16 + 9 + 0) / 4 = 7.

**Visual description:** A yellow Gantt bar displays the shortest burst first, then the next shortest, and so on. The process table is above the chart, and the waiting-time equation appears inside a black callout on the right.

---

## PDF PAGE 15 — Predicting the next CPU burst (slide 6.15)

The next burst cannot be known exactly, so the scheduler estimates it using earlier bursts. The process with the smallest predicted next burst can then be selected.

**Definitions:**

- t_n: Actual duration of CPU burst number n.
- τ_(n+1): Estimate for the next CPU burst.
- α is a weighting factor between 0 and 1, inclusive.

**Exponential averaging equation:**

τ_(n+1) = α t_n + (1 − α) τ_n

The slide notes that α is commonly chosen as 1/2.

**Visual description:** The equation is centered below the variable definitions. No chart appears on this page.

---

## PDF PAGE 16 — Graph of burst prediction (slide 6.16)

Values printed under the graph:

Actual CPU bursts (t_i):

6, 4, 6, 4, 13, 13, 13, …

Predicted values ("guess", τ_i):

10, 8, 6, 6, 5, 9, 11, 12, …

**Visual description:**

A gray grid chart has time on the horizontal axis.

A black step line represents the actual burst lengths: 6, 4, 6, 4, then 13, remaining at 13.

A smooth cyan curve represents predicted values: it starts near 10, falls toward 5 as the short bursts arrive, and then rises gradually toward 12 after the actual burst length increases to 13.

The two numerical rows are printed below the plot.

---

## PDF PAGE 17 — Effect of alpha in exponential averaging (slide 6.17)

Two edge cases are shown:

- When α = 0, the next estimate equals the previous estimate: τ_(n+1) = τ_n. New observations therefore have no influence.
- When α = 1, the next estimate equals the most recent actual burst: τ_(n+1) = t_n. Older observations have no influence.

**Expanded expression:**

τ_(n+1) = αt_n + (1−α)αt_(n−1) + … + (1−α)^j αt_(n−j) + … + (1−α)^(n+1)τ_0

The slide explains that the weights assigned to older observations become smaller as the terms move farther back in history.

**Visual description:** The expanded equation runs across the middle/lower part of the slide, below the α = 0 and α = 1 cases.

---

## PDF PAGE 18 — Preemptive and nonpreemptive SJF (slide 6.18)

The slide restates SJF selection by shortest next CPU burst and its minimum-average-waiting-time property, then distinguishes two variants:

- **Nonpreemptive:** Once a process receives the CPU, it keeps it until that CPU burst ends.
- **Preemptive:** A newly arriving process can take the CPU if its burst is shorter than the remaining time of the currently running process.

The preemptive version is called **Shortest-Remaining-Time-First (SRTF)**.

**Visual description:** A text-only comparison with the two variants in indented bullets. The SRTF name is highlighted.

---

## PDF PAGE 19 — Nonpreemptive SJF with arrival times (slide 6.19)

**Input data:**

| Process | Arrival | Burst |
|---|---:|---:|
| P1 | 0 | 7 |
| P2 | 2 | 4 |
| P3 | 4 | 1 |
| P4 | 5 | 4 |

This example adds different arrival times. Once P1 starts, it is allowed to complete because the policy is nonpreemptive.

**Execution timeline:**

- P1: 0–7.
- P3: 7–8.
- P2: 8–12.
- P4: 12–16.

Mean waiting time:

(0 + 6 + 3 + 7) / 4 = 4.

**Visual description:** A yellow Gantt bar contains the four blocks in the order P1, P3, P2, P4. Time markers: 0, 7, 8, 12, 16.

---

## PDF PAGE 20 — Preemptive SJF / SRTF example (slide 6.20)

**Input data:**

| Process | Arrival | Burst |
|---|---:|---:|
| P1 | 0 | 7 |
| P2 | 2 | 4 |
| P3 | 4 | 1 |
| P4 | 5 | 4 |

**Execution timeline:**

- P1: 0–2.
- P2: 2–4.
- P3: 4–5.
- P2: 5–7.
- P4: 7–11.
- P1: 11–16.

Mean waiting time:

(9 + 1 + 0 + 2) / 4 = 3.

**Visual description:** A yellow Gantt bar is split into six execution segments, showing P1 and P2 being interrupted/resumed as shorter remaining bursts become available. Time markers: 0, 2, 4, 5, 7, 11, 16.

---

## PDF PAGE 21 — Another SRTF example (slide 6.21)

**Input data:**

| Process | Arrival | Burst |
|---|---:|---:|
| P1 | 0 | 8 |
| P2 | 1 | 4 |
| P3 | 2 | 9 |
| P4 | 3 | 5 |

**Execution timeline:**

- P1: 0–1.
- P2: 1–5.
- P4: 5–10.
- P1: 10–17.
- P3: 17–26.

Mean waiting time:

(9 + 0 + 15 + 2) / 4 = 6.5.

**Visual description:** The chart shows P1 starting briefly, P2 running after its arrival, then P4, P1, and P3. Boundaries: 0, 1, 5, 10, 17, 26.

---

## PDF PAGE 22 — Priority-based scheduling (slide 6.22)

Each process is assigned an integer priority. The CPU is given to the process with the highest priority, and the slide uses the convention that a smaller integer means a higher priority.

The method may be implemented preemptively or nonpreemptively.

SJF can be viewed as a special priority scheme in which priority is inversely related to the predicted next CPU-burst length.

**Problem:** Starvation can occur when low-priority processes repeatedly fail to get CPU time.

**Remedy:** Aging gradually raises a process's priority as it waits.

**Visual description:** A text-only slide; the starvation problem and aging solution are visually emphasized.

---

## PDF PAGE 23 — Priority scheduling example (slide 6.23)

**Input data:**

| Process | Burst | Priority |
|---|---:|---:|
| P1 | 10 | 3 |
| P2 | 1 | 1 |
| P3 | 2 | 4 |
| P4 | 1 | 5 |
| P5 | 5 | 2 |

Since lower priority numbers mean higher priority, the execution order is P2, P5, P1, P3, P4.

**Gantt timeline:**

- P2: 0–1.
- P5: 1–6.
- P1: 6–16.
- P3: 16–18.
- P4: 18–19.

Mean waiting time:

(6 + 0 + 16 + 18 + 1) / 5 = 8.2.

**Visual description:** A yellow horizontal bar shows the five blocks in priority order. Boundaries: 0, 1, 6, 16, 18, 19.

---

## PDF PAGE 24 — Round Robin principle (slide 6.24)

Each process receives a short CPU interval called the time quantum q; the slide gives 10–100 milliseconds as a typical range. If a process has not finished when its quantum expires, it is preempted and placed at the end of the ready queue.

For n processes and quantum q:

- Each process receives roughly 1/n of the CPU, in turns of at most q time units.
- Under the stated queue assumptions, no process waits more than (n−1)q time units for its turn.
- A timer interrupt occurs every q time units to trigger the next scheduling decision.

**Performance notes:**

- A very large q makes RR behave like FIFO.
- A very small q can make context-switch overhead excessive; q should be much larger than the switching time.

**Visual description:** A text-only slide. The time quantum term is highlighted in blue.

---

## PDF PAGE 25 — Round Robin with q = 4 (slide 6.25)

**Input data:**

| Process | Burst |
|---|---:|
| P1 | 24 |
| P2 | 3 |
| P3 | 3 |

**Execution timeline:**

- P1: 0–4.
- P2: 4–7 (finishes).
- P3: 7–10 (finishes).
- P1: 10–14.
- P1: 14–18.
- P1: 18–22.
- P1: 22–26.
- P1: 26–30 (finishes).

Mean waiting time shown:

(6 + 4 + 7) / 3 = 5.66.

The slide remarks that RR often has worse average turnaround time than SJF, but offers better response.

**Visual description:** A yellow Gantt bar repeatedly returns to P1 after P2 and P3 finish. Boundaries: 0, 4, 7, 10, 14, 18, 22, 26, 30.

---

## PDF PAGE 26 — Round Robin with q = 20 (slide 6.26)

**Input data:**

| Process | Burst |
|---|---:|
| P1 | 53 |
| P2 | 17 |
| P3 | 68 |
| P4 | 24 |

**Execution timeline:**

- P1: 0–20.
- P2: 20–37 (finishes).
- P3: 37–57.
- P4: 57–77.
- P1: 77–97.
- P3: 97–117.
- P4: 117–121 (finishes).
- P1: 121–134 (finishes).
- P3: 134–154.
- P3: 154–162 (finishes).

Mean waiting time shown:

(81 + 20 + 94 + 97) / 4 = 73.

**Visual description:** A yellow Gantt chart displays ten consecutive time slices. The final process to finish is P3, which occupies the final two adjacent segments. Boundaries: 0, 20, 37, 57, 77, 97, 117, 121, 134, 154, 162.

---

## PDF PAGE 27 — Quantum size vs context switches (slide 6.27)

The diagram compares a process requiring 10 time units under three quantum settings:

| Quantum | Number of context switches |
|---:|---:|
| 12 | 0 |
| 6 | 1 |
| 1 | 9 |

**Visual description:**

Three horizontal bars all span time 0 to 10.

- The first is one unbroken white bar.
- The second is light blue with one internal divider at time 6.
- The third is gray and split into ten one-unit cells, with labels 0 through 10 underneath.

The right side lists the quantum and associated switch count. This makes the overhead effect of small quanta visually clear.

---

## PDF PAGE 28 — Turnaround time and quantum size (slide 6.28)

The accompanying process/burst table is:

| Process | Time |
|---|---:|
| P1 | 6 |
| P2 | 3 |
| P3 | 1 |
| P4 | 7 |

The slide's highlighted rule of thumb is that 80% of CPU bursts should be shorter than q.

**Visual description — graph:**

The horizontal axis is time quantum (1–7); the vertical axis is average turnaround time.

A cyan line joins approximate values:

- q=1 → 11.0
- q=2 → 11.5
- q=3 → 10.8
- q=4 → 11.5
- q=5 → 12.2
- q=6 → 10.5
- q=7 → 10.5

A bright red/orange callout to the right contains the 80% guideline.

---

## PDF PAGE 29 — Fixed multilevel queues (slide 6.29)

The ready queue can be split into permanent categories, for example:

- Foreground jobs, which are interactive.
- Background jobs, which are batch work.

A process stays in its assigned queue. Different queues may use different policies; the example assigns RR to foreground and FCFS to background.

Scheduling among the queues can be handled in two ways:

- **Fixed priority:** Serve the foreground queue before the background queue. This can starve background jobs.
- **Time slicing:** Reserve a portion of CPU time for each queue. The slide's example gives 80% to foreground using RR and 20% to background using FCFS.

**Visual description:** A nested bullet list, with foreground/background emphasized in blue.

---

## PDF PAGE 30 — Priority levels in a multilevel queue (slide 6.30)

**Visual description:**

Five long blue horizontal queue boxes are stacked vertically.

From highest to lowest priority, the labels are:

1. System processes.
2. Interactive processes.
3. Interactive editing processes.
4. Batch processes.
5. Student processes.

Each box has a right-pointing arrow at its right and an incoming arrow at its left. Highest priority appears above the stack and lowest priority below it.

---

## PDF PAGE 31 — Multilevel feedback queues (slide 6.31)

Unlike a fixed multilevel queue, a feedback-queue process may move between levels. The mechanism can also implement aging.

The scheduler design is determined by:

- How many queues exist.
- Which algorithm each queue uses.
- When a process is promoted to a higher queue.
- When a process is demoted to a lower queue.
- Which queue receives a process when it first requests service.

**Visual description:** A text-only slide with five indented design parameters.

---

## PDF PAGE 32 — Three-level feedback queue example (slide 6.32)

**Queue configuration:**

- Q0: Round Robin, quantum 8 ms.
- Q1: Round Robin, quantum 16 ms.
- Q2: FCFS.

**Process movement:**

- A new job is placed in Q0. The text says Q0 is served FCFS and the job receives up to 8 ms when scheduled.
- If unfinished after 8 ms, the job moves to Q1.
- Q1 is also described as FCFS in the scheduling explanation; a job there receives 16 additional milliseconds.
- If the job remains unfinished, it is preempted and moved to Q2.

**Visual description:** A text explanation of a three-level scheme, with the two quantum sizes and the final FCFS queue clearly listed.

---

## PDF PAGE 33 — Feedback queue flow diagram (slide 6.33)

**Visual description:**

Three large light-blue 3D queue boxes are stacked vertically.

- The top box is marked quantum = 8.
- The middle box is marked quantum = 16.
- The bottom box is marked FCFS.

A new job enters the top box from the left. Each box also has a right-facing output arrow.

Separate black connector paths run from the top queue down into the middle queue, and from the middle queue down into the FCFS queue.

The illustration represents a job moving downward when it uses the quantum without finishing.

---

## PDF PAGE 34 — Scheduling with multiple CPUs (slide 6.34)

With multiple processors, work can be shared, but selecting which CPU runs which process becomes more complicated.

The slide distinguishes:

- **Homogeneous processors:** Any processor can execute any ready process.
- **Asymmetric multiprocessing:** One master CPU accesses system data structures, while the other CPUs execute user code only.
- **Symmetric multiprocessing (SMP):** Every CPU schedules itself; the system may use one common ready queue or separate private queues. The slide notes that SMP is the common arrangement.
- **Processor affinity:** A process tends to remain on the CPU where it has been running. Affinity may be soft or hard, and processor sets are mentioned as a related variation.

**Visual description:** A hierarchical bullet slide with the four processor models/ideas emphasized in blue.

---

## PDF PAGE 35 — NUMA memory locality (slide 6.35)

**Visual description — two CPU/memory nodes:**

A light-blue outer box labeled computer contains two separate CPU-and-memory regions.

Each region has a gray CPU box above a stack of memory cells.

- A vertical arrow from a CPU to its own local memory is labeled fast access.
- A diagonal arrow from the left CPU to the right-side memory is labeled slow access.

The note beneath the figure says that memory-placement policies can also take affinity into account.

The diagram illustrates the locality difference in NUMA systems.

---

## PDF PAGE 36 — Load balancing on SMP (slide 6.36)

To use multiprocessors effectively, the workload should be distributed evenly across CPUs. Load balancing is needed specifically when each CPU maintains a private ready queue.

Two migration methods are described:

- **Push migration:** A periodic task checks the CPU loads and transfers work away from an overloaded processor when imbalance is found.
- **Pull migration:** An idle processor takes a waiting task from a busier processor.

**Visual description:** Text-only slide; the load-balancing concept and the two migration names are emphasized in blue.

---

## PDF PAGE 37 — How to evaluate schedulers (slide 6.37)

Choosing a scheduling algorithm for an operating system is difficult because there are many algorithms and each has its own parameters.

The slide recommends first defining the criteria, then evaluating candidates.

Four evaluation approaches are listed:

- Deterministic modeling.
- Queueing models.
- Simulation.
- Implementation in a real system.

**Visual description:** A text-only slide with the four evaluation methods highlighted in blue.

---

## PDF PAGE 38 — Deterministic evaluation input (slide 6.38)

Deterministic evaluation is an analytical approach: choose a fixed, known workload and calculate how each scheduler behaves on it.

The example uses five processes, all arriving at time 0:

| Process | Burst time |
|---|---:|
| P1 | 10 |
| P2 | 29 |
| P3 | 3 |
| P4 | 7 |
| P5 | 12 |

**Visual description:** The five-row process table is centered below the explanation. The analytical-evaluation concept is highlighted.

---

## PDF PAGE 39 — Comparing three algorithms (slide 6.39)

For the five processes from page 38, the slide reports these average waiting times:

- FCFS: 28 ms.
- Nonpreemptive SJF: 13 ms.
- RR with q = 10: 23 ms.

**Gantt-chart details:**

**1. FCFS**

- P1: 0–10.
- P2: 10–39.
- P3: 39–42.
- P4: 42–49.
- P5: 49–61.

**2. Nonpreemptive SJF**

- P3: 0–3.
- P4: 3–10.
- P1: 10–20.
- P5: 20–32.
- P2: 32–61.

**3. RR, q = 10**

- P1: 0–10.
- P2: 10–20.
- P3: 20–23.
- P4: 23–30.
- P5: 30–40.
- P2: 40–50.
- P5: 50–52.
- P2: 52–61.

**Visual description:**

Three compact horizontal Gantt bars are stacked vertically, one per method. Each rectangle is labeled with its process ID and the time boundaries appear below.

The slide emphasizes that deterministic evaluation is straightforward and quick, but its result is tied to the specific input workload.

---

## PDF PAGE 40 — Probabilistic queueing models (slide 6.40)

A fixed process set is usually unavailable for deterministic analysis. Instead, CPU/I/O burst and process-arrival behavior can be measured and modeled statistically.

The slide notes:

- Process arrivals and CPU/I/O burst lengths can be described probabilistically.
- Exponential distributions are common, often summarized by their mean.
- The model can estimate throughput, CPU utilization, and waiting time.
- A computer can be represented as a network of service points, each with a queue.
- Given arrival and service rates, quantities such as utilization, average queue length, and average wait can be calculated.

**Visual description:** A text-only slide describing a probabilistic model of queues and service stations.

---

## PDF PAGE 41 — Little's law (slide 6.41)

**Definitions:**

- n: Average number of processes in the queue.
- W: Average time a process spends waiting in the queue.
- λ: Average rate at which processes arrive.

**Little's law:**

n = λ × W

The slide states that in steady state the departure rate matches the arrival rate, and that the relationship holds for any scheduling algorithm and arrival distribution.

**Example:**

With an arrival rate of 7 processes per second and an average queue length of 14 processes:

Average waiting time = 14 / 7 = 2 seconds.

**Visual description:** The equation is centered prominently, with the variable meanings above and the numerical example below.

---

## PDF PAGE 42 — Simulation (slide 6.42)

Queueing analysis can become difficult when algorithms and distributions are complex. To keep the mathematics manageable, arrival and service distributions are sometimes simplified.

Simulation uses a programmed model of the computer system:

- Data structures represent system components.
- The clock can be represented by a variable.
- Statistics are collected to measure scheduler performance.
- Input data may come from:
  - Random numbers generated according to probabilities.
  - Mathematically or empirically defined distributions.
  - Trace tapes recording real event sequences.

**Visual description:** A text-only slide. The simulation method and its possible data sources are laid out as nested bullets.

---

## PDF PAGE 43 — Simulating scheduler performance (slide 6.43)

**Visual description — trace replay pipeline:**

A gray box labeled actual process execution points to a vertical gray trace-tape box containing an example sequence:

CPU 10 → I/O 213 → CPU 12 → I/O 112 → CPU 2 → I/O 147 → CPU 173

Ellipses indicate that more events exist.

The trace branches to three separate simulation boxes:

- FCFS simulation → performance statistics for FCFS.
- SJF simulation → performance statistics for SJF.
- RR simulation with q = 14 → performance statistics for RR (q = 14).

The diagram's purpose is to replay the same recorded activity through several scheduling policies, then compare their measured performance.

---

## PDF PAGE 44 — Implementation in a real system (slide 6.44)

Simulation has costs and limits:

- It can be expensive and may still be imperfect.
- Greater simulation detail can improve accuracy, but also requires more computing time.

The slide presents implementation and testing in real systems as the fully accurate way to evaluate a new scheduler, while noting the costs and risks:

- The algorithm must be coded, and user reactions may be risky.
- The environment where the algorithm is used may change.

It also notes that flexible schedulers can be adjusted by system managers for particular applications. APIs may allow process or thread priorities to be changed, although environments still differ.

**Visual description:** A concluding text slide that compares simulation with real implementation and mentions API-based tuning.

---

## PDF PAGE 45 — Closing slide

Main text: End of Chapter 6.

**Visual description:**

A minimal white closing page. The closing message is centered in large teal-blue text with a shadow.

A long blue bar with a lighter central segment appears beneath it. A small dinosaur illustration sits inside the same nested blue picture-frame motif used on the cover. Source/book credit appears along the bottom.

---

**END OF 45-PAGE SLIDE-BY-SLIDE NOTES**