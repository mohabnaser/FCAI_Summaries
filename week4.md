WEEK 4 — ARCHITECTURAL VIEWS
Complete slide text + concise descriptions of non-text visuals
41 slides. Repeated running headers and footers omitted.

SLIDE 1 — ARCHITECTURAL VIEWS

DIAGRAM TEXT / DESCRIPTION:
The diagram presents an equation:
Software Architecture for System XYZ
=
Part 1: View + Part 2: View + ... + Part n: View
+ Part n+1: Documentation Beyond Views.
It uses book illustrations to show that a software architecture document comprises multiple view sections plus additional documentation beyond the views.

SLIDE 2 — ARCHITECTURAL VIEWS (CONT'D)

• What are the relevant views?
• Different views expose different quality attributes to different degrees.
• Quality attributes that are of most concern to you and the other stakeholders in the system’s development will affect the choice of what views to document.
• Examples?
  • Deployment view?

SLIDE 3 — ARCHITECTURAL VIEWS (CONT'D)

• Different views support different goals.
• Different views will highlight different system elements and/or relations.
• Can a single view represent an architecture?
• Now, let us recall one definition of software architecture:

The software architecture of the system is the set of structures needed to reason about the system, which comprises software elements, relations among them, and properties of both.

• Structures vs. views?

SLIDE 4 — STRUCTURES VS. VIEWS?

• A view is a representation of a coherent set of architectural elements. It consists of a representation of a set of elements and the relations among them.
• A structure is the set of elements itself.
• A view is a representation of a structure(s).

SLIDE 5 — ONE SYSTEM, MANY VIEWS

Image source: Previous Software Architecture course offering by Dr. Ying Shen — http://sse.tongji.edu.cn/yingshen

DIAGRAM DESCRIPTION:
A photograph of the cover of “Gödel, Escher, Bach: an Eternal Golden Braid” by Douglas R. Hofstadter. Green annotations identify “All information” (the larger visual construction of reflected letters) and “Some information” (a smaller highlighted element on the floor). The slide uses this image to illustrate that one system can be represented through different views that expose different amounts or aspects of information.

SLIDE 6 — KINDS OF STRUCTURES

• Architectural structures can be divided into three major categories depending on the broad nature of the elements they show.
• Those categories correspond to three broad kinds of decisions that architectural design involves:
  • Module structures
  • Component-and-connector structures
  • Allocation structures
• Module vs. Component?

SLIDE 7 — MODULE VS. COMPONENT?

• Static vs. dynamic?
• Unit of implementation vs. runtime entity?
• Source code, XML files, config files, GNF files for parsers…Where do they fit?
• An executable binary…Where does it fit?
• Who cares?! Every module is turned into exactly one component at runtime, so this difference is not that important…
  • No!

SLIDE 8 — MODULE VS. COMPONENT?

• A single module may turn into many components.
• Many modules may turn into a single component.

DIAGRAM DESCRIPTION:
Two architectural views are compared. The “Decomposition view” shows a System made of two modules, Client and Server. The “Client-server view” shows runtime components C1 through C10 communicating with a central component S1 through request-reply connections. A key distinguishes a module symbol from a component symbol and a request-reply connector. The diagram demonstrates that modules and runtime components do not have a one-to-one relationship.

SLIDE 9 — KINDS OF STRUCTURES

• Those categories correspond to three broad kinds of decisions that architectural design involves:
  • Module structures
  • Component-and-connector structures
  • Allocation structures

SLIDE 10 — MODULE STRUCTURES

• Questions that module structures help us answer…
  • What is the primary functional responsibility assigned to each module?
  • What other software elements is a module allowed to use?
  • What other software does the module use/depend on?
  • What modules are related to other modules by generalization or specialization relationships?
• How can such structures be helpful?
  • Modifiability?

SLIDE 11 — MODULE STRUCTURES

• Some useful module views:
  • Decomposition style
  • Uses style
  • Generalization style
  • Data model style

SLIDE 12 — MODULE STRUCTURES: DECOMPOSITION STYLE

• The decomposition style is used for decomposing a system into units of implementation.
• A decomposition view describes the organization of the code as modules and sub-modules and shows how system responsibilities are partitioned across them.
• Relation: is-a-part of
• Elements: Module (subsystem, package, class,..etc)
• Constraints:
  • No loops are allowed in the decomposition graph.
  • A module can have only one parent.

SLIDE 13 — MODULE STRUCTURES: DECOMPOSITION STYLE

DIAGRAM DESCRIPTION:
A simple containment diagram. A large parent module A contains four child modules: B, C, D, and E. It illustrates the “is-a-part-of” relationship in a decomposition view.

SLIDE 14 — MODULE STRUCTURES: DECOMPOSITION STYLE — THE ATIA-M SYSTEM

DIAGRAM LABELS / HIERARCHY:
ATIA-M
└── Windowsapps
    ├── Common code for thick clients
    ├── TDDT Windows app
    └── UTMC Windows app
└── ATIA server-side Web modules
└── ATIA server-side Java modules

DIAGRAM DESCRIPTION:
Nested rectangles represent the ATIA-M system and its modules/submodules. The Windows applications group contains shared thick-client code plus two Windows applications. Server-side Web modules and Java modules are separate modules within ATIA-M.

SLIDE 15 — MODULE STRUCTURES: DECOMPOSITION STRUCTURE — THE ATIA-M SYSTEM

DIAGRAM LABELS:
ATIA server-side Java modules:
• «subsystem» adlsc
• controller
• business
• servlet
• utils
• «subsystem» itc
• client
• facades
• entity
• objects
• test
• «subsystem» tdc
• taglibs

«subsystem» CCS:
• webservice
• portal
• security
• common

DIAGRAM DESCRIPTION:
A detailed decomposition view of the ATIA server-side Java modules. Most modules are shown as individual package-like boxes. The CCS subsystem is a larger nested container holding webservice, portal, security, and common modules.

SLIDE 16 — MODULE STRUCTURES: USES STYLE

• A module uses another module if its correctness depends on the correctness of the other.
• The uses view makes explicit which modules use which other modules to achieve their responsibilities.
• Relation: uses relation (depends on)
• Elements: Module
• What’s it for: Planning incremental development
• Constraints:
  • Using loops?

SLIDE 17 — MODULE STRUCTURES: USES STRUCTURE

DIAGRAM LABELS:
• estore.webapp
• web::estore
• static Web artifacts
• admin.client
• web::shared
• estore.core
• web::accessControl
• admin.core
• util
• dao

DIAGRAM DESCRIPTION:
A UML uses-dependency graph. Dashed arrows marked «use» connect modules to modules they depend on. The diagram includes the estore web application and core, shared web modules, access control, admin client/core, utility, and DAO modules. Several modules on the right and bottom (admin.client, admin.core, dao, and util) are circled for emphasis. A small notation key identifies UML notation.

SLIDE 18 — MODULE STRUCTURES: USES STRUCTURE

DIAGRAM LABELS:
ATIA-M
• Windows apps
  • Common code for thick clients
  • TDDC Windows app
  • UTMC Windows app
• ATIA server-side Web modules
• ATIA server-side Java modules

DIAGRAM DESCRIPTION:
A uses-dependency diagram of the ATIA-M modules. The TDDC and UTMC Windows applications both use the common code for thick clients. Dashed «uses» arrows also connect the Windows applications to the ATIA server-side Web modules, which in turn use the ATIA server-side Java modules.

SLIDE 19 — COMPONENT-AND-CONNECTOR (C&C) VIEW

• Processes, clients, servers, and data stores are possible components.
• Possible pathways of interactions between components, such as communication links, protocols, and information flows are represented as connectors.
• Examples of connectors include: service invocation, message queues, event multi-cast, and pipes. (This will come to action in architectural styles).

SLIDE 20 — COMPONENT-AND-CONNECTOR (C&C) VIEW

• Questions that C&C structures help us answer…
  • What are the major executing components and how do they interact?
  • What are the major shared data stores?
  • Which parts of the system are replicated?
  • How does data progress through the system?
  • What parts of the system can run in parallel?
• How can such structures be helpful?
  • Performance?
  • Security?
  • Availability?

SLIDE 21 — (C&C) VIEWS: CONCURRENCY

• Allows the architect to determine opportunities for parallelism and the locations where resource contention may occur.
• The units are Components and connectors are their communication mechanisms.

SLIDE 22 — (C&C) STRUCTURES: UML NOTATION

DIAGRAM TEXT / DESCRIPTION:
The upper diagram shows a component with two ports:
• Provided interface
• Required interface
The component’s connection point is labelled “Port”.

The lower example shows three components:
• Order System
• Customer Repository
• Inventory System

The Order System connects to Customer Repository through the CustomerLookup interface/connector and to Inventory System through ProductAccessor. The figure illustrates UML component notation, ports, and provided/required interfaces.

SLIDE 23 — MODULE VIEW EXAMPLE

Climate control system in vehicles

DIAGRAM LABELS:
• ReferenceModel — setRequiredTemperature
• Display — +display()
• TemperatureSensor — -senseData
• Controller — +start(), +stop()
• Actuator — +on(), +off()
• Cooler
• Heater
• Fan — -speed

DIAGRAM DESCRIPTION:
A UML-style module/class view of a vehicle climate-control system. The Controller interacts with the TemperatureSensor, checks the ReferenceModel, updates the Display, and calls the Actuator. Actuator is a parent type specialized by Cooler, Heater, and Fan.

SLIDE 24 — COMPONENT-AND-CONNECTOR VIEW EXAMPLE

DIAGRAM LABELS:
• Controller
• Sensor — connection labelled “sense”
• Actuator — connection labelled “actuate”
• GUI — connection labelled “display”

“(Can show simplified relationships)”

DIAGRAM DESCRIPTION:
The Controller component connects to Sensor, Actuator, and GUI components through the sense, actuate, and display interactions. A small inset reproduces the more detailed climate-control module view from slide 23.

SLIDE 25 — COMPONENT-AND-CONNECTOR VIEW EXAMPLE

DIAGRAM LABELS:
• Controller
• Sensor — sense
• Actuator — actuate
• GUI — display

“(Can show simplified relationships)”

Callout: “Such arrows should be replaced by the correct lollipop notations”

DIAGRAM DESCRIPTION:
The same Controller/Sensor/Actuator/GUI interaction diagram from slide 24 is repeated. A blue callout points to the interface notation and states that the arrows should instead use correct lollipop notations. A small inset again shows the climate-control module view.

SLIDE 26 — ALLOCATION VIEWS

• Embody decisions as to how the system will related to non software structures in its environment (such as CPUs, file systems, networks).
• These structures show the relationship between the software elements and elements in one or more external environments in which the software is created and executed.
• Questions allocation structures help answer…
  • What processor does each software element execute on?
  • In what directories is each element stored during development/testing/system building?

SLIDE 27 — ALLOCATION VIEWS

• Allocation styles describe the mapping between the software architecture and its environment.
• Elements: Software element and environmental element.
• A software element has properties that are required of the environment. An environmental element has properties that are provided to the software.
• Relation: Allocated-to. A software element is mapped (allocated to) an environmental element.

SLIDE 28 — ALLOCATION STRUCTURES

DIAGRAM LABELS / DESCRIPTION:
Software Elements from Module or C&C Views are mapped to environmental elements through three allocation styles:
• Deployment Style — maps software elements to a Computing Platform.
• Install Style — maps software elements to a Production Environment.
• Work Assignment Style — maps software elements to a Development Organization.

The illustration shows server computers, a production storage/server cabinet, and a development team around a table, with arrows connecting them to central software elements.

SLIDE 29 — ALLOCATION VIEWS

• Allocation views present a mapping between software elements (from either a module view or a component-and-connector [C&C] view) and non-software elements in the software’s environment.
• Three common allocation styles:
  • Deployment style
  • Install style
  • Work assignment style

SLIDE 30 — ALLOCATION STRUCTURES: DEPLOYMENT VIEW

DIAGRAM LABELS:
• Internet user PC
• «Win server» Application server
• «execution environment» WebSphere
• «linux server» Database server
• «Win desktop» Admin user PC
• «internet»
• «intranet»
• «artifact» app-client.jar
• «artifact» EnterpriseWebApp.ear
• «deploy» relationships
• UML notation

DIAGRAM DESCRIPTION:
A UML deployment diagram maps client PCs and an administration PC to a Windows application server running WebSphere, which communicates with a Linux database server. The app-client.jar artifact is deployed to the admin PC; EnterpriseWebApp.ear is deployed to the application server.

SLIDE 31 — ALLOCATION STRUCTURES: UML DEPLOYMENT DIAGRAM

DIAGRAM LABELS:
• «device» Sun Fire X4150 Server
• «OS» SUSE Linux Ent 10
• «JSP server» Apache Tomcat Server 5.5
• «web archive» shopping.war

Source URL shown on slide:
https://www.uml-diagrams.org/deployment-diagrams.html

DIAGRAM DESCRIPTION:
Nested deployment boxes show shopping.war packaged inside an Apache Tomcat 5.5 JSP server, running on SUSE Linux Enterprise 10, deployed on a Sun Fire X4150 Server device.

SLIDE 32 — ALLOCATION STRUCTURES: DEPLOYMENT VIEW

• The deployment style describes the mapping of components and connectors in the software architecture to the hardware of the computing platform.
• Elements:
  • Software elements: from a C&C view
  • Environmental elements
• Usage?
  • Performance?
  • Availability?

SLIDE 33 — ALLOCATION STRUCTURES: DEPLOYMENT VIEW

• Can such view help in memory capacity analysis?
  • Properties relevant to physical units.
  • Properties relevant to software elements.

SLIDE 34 — ALLOCATION STRUCTURES: INSTALL VIEW

• The install style allocates components of a C&C style to a file management system in the production environment.
• Once a software system is implemented, the resulting files have to be packaged to be installed on the target production platform (such as a desktop computer or a server machine running an application server).
• These files include libraries, executable files, data files, log files, configuration and version control files, license files, help files, deployment descriptors, scripts, and static content (for example, HTML files and images).

SLIDE 35 — ALLOCATION STRUCTURES: INSTALL VIEW

• Any notation for an install view must show components, the files and folders, and the mapping between them.
• The tree structure organization of the files and folders should also be shown.

SLIDE 36 — ALLOCATION STRUCTURES: INSTALL VIEW

DIAGRAM LABELS:
• DukesBankApp.ear
• account-ejb.jar
  • Account Controller EJB
  • Account EJB
• customer-ejb.jar
  • Customer Controller EJB
  • Customer EJB
• tx-ejb.jar
  • Tx Controller EJB
  • TxEJB
• web-client.war
  • Dispatcher (servlet)
  • JSPs
  • WebMessages.properties
  • .tld files
  • .gif and .html files
  • struts.jar
• app-client.jar
  • Bank Admin
  • AdminMessages.properties

KEY:
• JAR file
• File
• Web component
• EJB
• Java application

DIAGRAM DESCRIPTION:
A packaging/install diagram shows the contents of DukesBankApp.ear, including three EJB JARs and web-client.war. A separate app-client.jar contains the Bank Admin application and its properties file. Symbols distinguish JAR files, ordinary files, web components, EJBs, and Java applications.

SLIDE 37 — ALLOCATION STRUCTURES: INSTALL VIEW

DIAGRAM LABELS:
• «artifact» DukesBankApp.ear
• «artifact» account-ejb.jar
• «artifact» customer-ejb.jar
• «artifact» tx-ejb.jar
• «artifact» app-client.jar
• «artifact» web-client.war
• «sessionbean» Account ControllerEJB
• «entitybean» AccountEJB
• «sessionbean» Customer ControllerEJB
• «entitybean» CustomerEJB
• «sessionbean» TxControllerEJB
• «entitybean» TxEJB
• «J2EEapp.client» BankAdmin
• «artifact» AdminMessages.properties
• «servlet» Dispatcher
• «JSP» *.jsp
• «artifact» *.tld, *.gif, *.html
• «artifact» WebMessages.properties
• «artifact» struts.jar
• «manifest» relationships
• “Shorthand for all JSP files”
• UML notation

DIAGRAM DESCRIPTION:
A UML artifact/manifest tree shows DukesBankApp.ear manifesting the three EJB JARs and web-client.war. The EJB JARs manifest their session/entity beans. app-client.jar contains BankAdmin and AdminMessages.properties. web-client.war contains Dispatcher, JSP files, static web files, WebMessages.properties, and struts.jar.

SLIDE 38 — ALLOCATION STRUCTURES: WORK ASSIGNMENT VIEW

• The work assignment style allocates modules of a module style to the groups and individuals who are responsible for the realization of a system.
• This style defines the responsibility for implementing and integrating the modules to the appropriate development teams.
• Elements:
  • Software elements (modules or components?)
  • Environmental elements

SLIDE 39 — ALLOCATION STRUCTURES: WORK ASSIGNMENT VIEW

TABLE TEXT:

Columns:
ECS Element (Module) / Segment / Subsystem / Organizational Unit

Science Data Processing Segment (SDPS):
• Client — Science team
• Interoperability — Prime contractor team 1
• Ingest — Prime contractor team 2
• Data Management — Data team
• Data Processing — Data team
• Data Server — Data team
• Planning — Orbital vehicle team

Flight Operations Segment (FOS):
• Planning and Scheduling — Orbital vehicle team
• Data Management — Database team
• User Interface — User interface team

Additional rows are represented by ellipses (“…”).

SLIDE 40 — REQUIRED READINGS

• Prologue: “P3. Architecture Views” from: “Documenting Software Architectures” textbook.
• Chapters 2 and 3 from “Documenting Software Architectures” textbook.
• Chapter 5 from “Documenting Software Architectures” textbook.
• Epilogue E.2 from “Documenting Software Architectures” textbook.

SLIDE 41 — REFERENCES

• Prologue: “P3. Architecture Views” from: “Documenting Software Architectures” textbook.
• Chapters 2 and 3 from “Documenting Software Architectures” textbook.
• Chapter 5 from “Documenting Software Architectures” textbook.
• Epilogue E.2 from “Documenting Software Architectures” textbook.
• Taylor, Richard N., Nenad Medvidovic, and Eric M. Dashofy. “Software Architecture: Foundations, Theory, and Practice.” Wiley, 2010.

END OF WEEK 4 SLIDES