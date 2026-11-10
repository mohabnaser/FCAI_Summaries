BUILDING SOFTWARE ARCHITECTURE — ARCHITECTURE STYLE
Source: Week05_Slides.pdf (29 slides)

SLIDE 1 — TITLE
Building Software Architecture
Architecture Style

SLIDE 2 — A TERMINOLOGY REVIEW: WHAT IS AN ARCHITECTURAL VIEW?
Views reflect three broad ways an architect looks at a system:
- Units of implementation (module views)
- Runtime units (C&C views)
- Relation to non-software structures (allocation views)

SLIDE 3 — ARCHITECTURAL STYLES VS. ARCHITECTURAL VIEWS
Within a view, many choices still remain:
- What kinds of relationships are allowed?
- What kinds of constraints are enforced?
- Different choices lead to different architectural styles.
Accordingly, an architectural style can represent modules, runtime units, or software and non-software elements.

SLIDE 4 — BASIC PROPERTIES OF STYLES
- A vocabulary of design elements:
  - Component and connector types; data elements
  - Examples: pipes, filters, objects, servers
- A set of configuration rules:
  - Topological constraints that determine allowed compositions of elements
  - Example: a component may be connected to at most two other components
- A semantic interpretation:
  - Compositions of design elements have well-defined meanings

SLIDE 5 — A TOPOLOGY?
Diagram shows seven network topologies, each represented by green nodes and connecting lines: Ring, Mesh, Star, Fully Connected, Line, Tree, and Bus.

SLIDE 6 — WHAT IS THE ROLE OF A SOFTWARE ARCHITECT?
The role of the software architect is to:
- Work with the requirements team (explicit requirements?)
- Work with various application stakeholders (Why?)
- Lead the technical design team
- Work with the project team

SLIDE 7 — THE ARCHITECTURE PROCESS OUTLINE
Diagram: Three main activities connected in sequence: Determine Architectural Requirements → Architecture Design → Validation. Feedback arrows make the process iterative, allowing validation and design to feed back into earlier stages.

SLIDE 8 — STEP 1: DETERMINE ARCHITECTURAL REQUIREMENTS
Architecture requirements (also called architecturally significant requirements or architecture use cases) are essentially the quality and nonfunctional requirements for the application.
Diagram: Functional Requirements and Stakeholder Requirements both feed into “Determine Architecture Requirements”; the output is a set of Architecture Requirements.

SLIDE 9 — STEP 2: ARCHITECTURE DESIGN
Process diagram:
Input: Architecture Requirements.
Step 1: Choose Architecture Framework (architectural patterns/styles).
Step 2: Allocate Components.
Output: Architecture Views and Architecture Document.

SLIDE 10 — STEP 2: ARCHITECTURE DESIGN
The design stage has two steps:
- The first involves choosing an overall strategy for the architecture, based around proven architecture patterns (a.k.a. architectural styles). (Step 2a)
- The second involves specifying the individual components that make up the application, showing how they fit into the overall framework and allocating them responsibilities. (Step 2b)

SLIDE 11 — STEP 2A: CHOOSING THE ARCHITECTURE FRAMEWORK
- Leveraging known solutions minimizes the risks that an application will fail due to an inappropriate architecture.
- Architectural patterns have clear pros/cons with respect to specific quality attributes.
- For small applications, a single architecture pattern like n-tier client-server may suffice.
- For more complex applications, the design will incorporate one or more known patterns, with the architect specifying how these patterns integrate to form the overall architecture.

SLIDE 12 — STEP 2A: ARCHITECTURAL STYLES
- Layered architecture (N-tier)
  - Client-server
- Peer-to-peer
- Pipe-and-filter
- Messaging
- Implicit Invocation
  - Publish-subscribe (Example: Spotify)
  - Event based (Eclipse IDE)
- Web services
- Microservices

SLIDE 13 — STEP 2A: N-TIER CLIENT SERVER PATTERN
Diagram: Four logical tiers arranged vertically and connected by two-way arrows:
- Client Tier: multiple Web Clients
- Web Server Tier: Web Server
- Business Logic Tier: Application Server
- Data Management Tier: Databases

SLIDE 14 — STEP 2A: N-TIER CLIENT SERVER PATTERN
Deployment diagram across four machines:
- Machine A: Web Browser; Thin Client; Client Tier.
- Machine B: Presentation Logic; Web Server; Presentation Logic Tier.
- Machine C: Application Logic; App Server; Application Logic Tier.
- Machine D: Database; Database Server; Data Tier.
Adjacent machines communicate with two-way arrows; the database server also connects to a database store.

SLIDE 15 — STEP 2A: CLIENT-SERVER
Diagram: Two client processes send invocations to a server process and receive results. The server may itself invoke another server and receive a result. Ovals represent processes; shaded rectangles represent computers.
- Client processes interact with individual server processes in a separate computer in order to access data or resource. The server in turn may use services of other servers.
- Example?

SLIDE 16 — STEP 2A: N-TIER CLIENT SERVER PATTERN — KEY PROPERTIES?
- Separation of concerns
- Synchronous communication
  - Requests emanate in a single direction from the client tier, through the web and business logic tiers to the data management tier.
- Flexible deployment:
  - No restrictions on how a multi-tier application is deployed.
  - All tiers could run on the same machine, or at the other extreme, each tier may be deployed on its own machine.

SLIDE 17 — STEP 2A: N-TIER CLIENT SERVER PATTERN — ADDRESSING QUALITY ATTRIBUTES?
- Availability?
  - Servers in each tier could be replicated.
- Modifiability?
  - Separation of concerns!
- Performance?
  - Depends on the speed of connections between different tiers.
  - Depends on the amount of data transferred across the different tiers.
- Scalability?
  - Does the tier type matter?

SLIDE 18 — STEP 2A: ARCHITECTURAL STYLES
- Layered architecture (N-tier)
  - Client-server
- Peer-to-peer
- Pipe-and-filter
- Messaging
- Implicit Invocation
  - Publish-subscribe (Example: Spotify)
  - Event based (Eclipse IDE)
- Traditional language-influenced styles
  - Main program and sub-routines
  - Object-oriented (Abstract Data Types)

SLIDE 19 — STEP 2A: PEER-TO-PEER
Diagram: Multiple peers (Peer 1, Peer 2, Peer 3, Peer 4, and Peers 5…N) each contain an Application and shared objects. The peers connect directly to one another; there is no dedicated client/server distinction.
- All of the processes play similar roles, interacting cooperatively as peers to perform distributed activities or computations without distinction between clients and servers. (Examples?)
- Pros/Cons?

SLIDE 20 — P2P WITH A CENTRALIZED INDEX SERVER (E.G. NAPSTER ARCHITECTURE)
Diagram: Multiple peer computers connect through a central cloud/globe representing an index service. Red network paths connect peers to the central index server, which coordinates discovery while peers remain participants in the network.

SLIDE 21 — STEP 2A: ARCHITECTURAL STYLES
- Layered architecture (N-tier)
  - Client-server
- Peer-to-peer
- Pipe-and-filter
- Messaging
- Implicit Invocation
  - Publish-subscribe (Example: Spotify)
  - Event based (Eclipse IDE)
- Traditional language-influenced styles
  - Main program and sub-routines
  - Object-oriented (Abstract Data Types)
- Shared Data

SLIDE 22 — STEP 2A: PIPE AND FILTER STYLE
- Streams of data are passed from filter program to another.
- The filters can operate concurrently, with no requirement for a producing component to finish before a component that consumes the producer's output begins.
- Components are filters.
  - Transform input data streams into output data streams.
  - Possibly incremental production of output.

SLIDE 23 — STEP 2A: PIPE AND FILTER STYLE
- Connectors are pipes.
  - Conduits for data streams.
- Style invariants:
  - Filters are independent (no shared state).
- Examples:
  - UNIX shell.
  - Example: `ls invoices | grep -e August | sort`

SLIDE 24 — STEP 2A: PIPE AND FILTER STYLE
- Disadvantages?
- Cautions?
- Qualities?

SLIDE 25 — STEP 2A: PIPE AND FILTER STYLE
Diagram contains two corresponding views:
- C&C view: filters labelled To-upper, Split, Merge, and To-lower connected by pipes and ports. Key: Filter, Pipe, Port.
- Module view: a main module uses split, to_lower, to_upper, and merge modules; config and stdio are also shown. Key: Module; “X uses Y” relation.

SLIDE 26 — STEP 2A: ARCHITECTURAL STYLES
- Layered architecture (N-tier)
  - Client-server
- Peer-to-peer
- Pipe-and-filter
- Messaging
- Implicit Invocation
  - Publish-subscribe (Example: Spotify)
  - Event based (Eclipse IDE)
- Traditional language-influenced styles
  - Main program and sub-routines
  - Object-oriented (Abstract Data Types)

SLIDE 27 — STEP 2A: MESSAGING
Diagram: Client components send messages into a Queue; the queue passes messages to Server components.
Key properties?
- Asynchronous communications:
  - Clients send requests to the queue, where the message is stored until an application removes it.
  - After the client has written the message to the queue, it continues without waiting for the message to be removed.

SLIDE 28 — STEP 2A: MESSAGING — ADDRESSING QUALITY ATTRIBUTES?
- Availability?
  - Queues can be replicated across messaging servers.
- Modifiability?
  - Asynchronous communication.
  - Message format.

SLIDE 29 — REQUIRED READINGS
- Chapters 7 and 8 from “Essential Software Architecture” textbook of Ian Gorton, 2011 Edition.

END OF TRANSCRIPT