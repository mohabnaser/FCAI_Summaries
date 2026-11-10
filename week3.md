CS325: ADVANCED SOFTWARE ENGINEERING — WEEK 3
SOLID PRINCIPLES APPLIED TO AUTOMOTIVE SOFTWARE (ADAS & IVI)
Instructor: Dr. Desoky Abdelqawy
Core Paradigm: Good design principles keep the impact of each change small and easy to verify.
Automotive focus: Single Responsibility, Open–Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion within mission-critical ADAS perception and IVI domains.
Source note: Original slides adapted from Dr. Soha Makady (2011) and Prof. Amr Kamel (Cairo University); based on Head First OOA&D (Chapter 8), R. C. Martin, Agile Software Development (2002), and Clean Architecture (Chapters 7–11). Examples re-authored for the automotive domain.

NOTE: Repeated running headers and footers are omitted to reduce size. Slide body text, tables, code, and meaningful image/diagram content are retained. Visual descriptions are added only where the illustration carries information not represented in the extracted text.
================== SLIDE 1 ==================
                                                                  CS325: Advanced Software Engineering
                                                                                                          Week 3: SOLID Principles
                                                                                           Applied to Automotive Software (ADAS & IVI)

                                                    Instructor: Dr.Desoky Abdelqawy
                        Core Paradigm: Good design principles keep the impact of each change small and easy to verify.

        Automotive Focus: Mastering Single Responsibility, Open–Closed, Liskov Substitution, Interface Segregation,
        and Dependency Inversion within mission-critical ADAS perception and IVI domains.

    Original slides adapted from Dr.Soha Makady (2011) & Prof. Amr Kamel (Cairo University) · Based on Head First OOA&D (Ch. 8) and

      R.C. Martin, Agile Software Development (2002) & Clean Architecture (Ch. 7–11). Examples re-authored for the automotive domain.

================== SLIDE 2 ==================
   Master Reference Bibliography
   Canonical Software Engineering & AI Systems Literature

   Each topic in the weekly breakdown maps directly to specific chapters from these foundational texts:
                   Martin, R. C. (2017). Clean Architecture: A Craftsman's Guide
         [CleanArch]  |  [DDIA]  Kleppmann, M. (2017). Designing Data-Intensive Applications: The
       to Software Structure and Design (1st Ed.). Prentice Hall.  |  Big Ideas Behind Reliable, Scalable, and Maintainable Systems (1st Ed.).
       ISBN: 978-0134494166  |  O'Reilly. I S B N : 9 7 8 - 1 4 4 9 3 7 3 3 2 0
         [HFDP-2e]   Freeman, E., & Robson, E. (2020). Head First Design Patterns:  |  [CD]  Humble, J., & Farley, D. (2010). Continuous Delivery: Reliable
       Building Extensible and Maintainable Object-Oriented Software (2nd Ed.).  |  Software Releases through Build, Test, and Deployment Automation (1st
       O'Reilly. I S B N : 9 7 8 - 1 4 9 2 0 7 8 0 0 5  |  Ed.). Addison-Wesley. I S B N : 9 7 8 - 0 3 2 1 6 0 1 9 1 9
                Brett D., Gary P., & David W. (2007). Head First Object Oriented
         [HFOOAD]  |  [DMLS]  Huyen, C. (2022). Designing Machine Learning Systems: An
       Analysis and Design (1st Ed.). O'Reilly. I S B N : 9 7 8 - 0 5 9 6 0 0 8 6 7 3  |  Iterative Process for Production-Ready Applications (1st Ed.). O'Reilly.
                                                                                                                                                      ISBN: 978-1098107963
         [FSA]Richards, M., & Ford, N. (2020). Fundamentals of Software
       Architecture: An Engineering Approach (1st Ed.). O'Reilly.  |  [AIE]Huyen, C. (2025). AI Engineering: Building Applications with
       ISBN: 978-1492043454  |  Foundation Models (1st Ed.). O'Reilly. I S B N : 9 7 8 - 1 0 9 8 1 6 6 3 0 4

        [SAiP-4e] Bass, L., Clements, P., & Kazman, R. (2021). Software
       Architecture in Practice (4th Ed.). Addison-Wesley. I S B N : 9 7 8 - 0 1 3 6 8 8 6 0 0 6
               Newman, S. (2021). Building Microservices: Designing Fine-
         [BM-2e]
       Grained Systems (2nd Ed.). O'Reilly. I S B N : 9 7 8 - 1 4 9 2 0 3 4 0 2 5

================== SLIDE 3 ==================
   Agenda
      #  |  Topic  |  Automotive Running Example
     1       What is a Design Principle?  |  —
     2       S: Single Responsibility Principle  |  ADAS  |  FrontCamera  |  ECU · IVI Media Library search
     3       O: Open–Closed Principle  |  ADAS feature manager (AEB, LKA, ACC …)
     4       L: Liskov Substitution Principle  |  OccupancyGrid  |  →   OccupancyGrid3D

     5       Inheritance vs. Delegation  |  Occupancy grid refactoring
     6       I: Interface Segregation Principle  |  VehicleOperator : human driver vs. autonomous driving stack

     7       D: Dependency Inversion Principle  |  Sensor fusion ↔ radar/camera drivers
     8       Summary & References  |  —

================== SLIDE 4 ==================
   What is a Design Principle?
   “ A design principle is a basic tool or technique that can be applied to designing or writing code to make
     that code more maintainable, flexible, or extensible.
                                                                                                                                                      “

   Automotive Software Challenges & Quality Attributes

                    Long lifecycles: vehicle software is maintained for 10–15+ years after start of production
                    Constant change: OTA updates, new ADAS features, new sensor suppliers, new infotainment apps
                    Variant explosion: one codebase serves many models, trims, markets and sensor configurations
               Safety & compliance: ISO 26262 (functional safety), ISO/SAE 21434 (cybersecurity), UN R155/R156.
             Every change must be analyzed, re-verified and traced.

          Poor design = expensive, risky change. Good design principles keep the impact of each change small
        and easy to verify.

================== SLIDE 5 ==================
   OO Principles: A Quick Recap
   The principles you already know, from Object Oriented Programming (OOP):

                                       OO Principle  |  Example
     Encapsulate what varies  |  Hide supplier-specific radar protocols behind one  |  RadarSensor   abstraction
     Code to an interface, not an implementation  |  The navigation app depends on  |  IPositionProvider , not directly on a specific GNSS chip driver

     Each class should have only one reason to  |  The LaneDetector changes when lane-detection algorithms change, not when logging format
     change  |  changes
                                                                                                       An AdaptiveCruiseControl class is defined by what it does (keep distance, adjust speed), not the
     Classes are about behavior and functionality
                                                                                                       data it stores

          SOLID turns these foundational ideas into five concrete principles that you can check or evaluate a
        design against.

================== SLIDE 6 ==================
   SOLID: Five Principles of OO Design
       Letter  |  Principle  |  One-line meaning
            S  |  Single Responsibility Principle  |  A class should have only one reason to change
            O  |  Open–Closed Principle  |  Software should be open for extension, but closed for modification
            L  |  Liskov Substitution Principle  |  Subtypes must be substitutable for their base types
             I  |  Interface Segregation Principle  |  Clients should not be forced to depend on methods they do not use
            D  |  Dependency Inversion Principle  |  Depend on abstractions, not on concrete implementations

   Source: Robert C. Martin, Agile Software Development: Principles, Patterns, and Practices (2002)

================== SLIDE 7 ==================
IMAGE: A hand-drawn temple/pillar metaphor. The roof reads “SOLID”; five supporting columns are labelled SRP, OCP, LSP, ISP, and DIP. Caption: “Proposed by Robert C. Martin (uncle bob)”.

================== SLIDE 8 ==================
                                                                                                                                                 S
                                                                                       Single Responsibility Principle (SRP)

   “ Every object in your system should have a single responsibility, and all the object's services should be
     focused on carrying out that single responsibility.
                                                                                                                                                      “

   “ "A class should have only one reason to change." (R.C. Martin)
                                                                                                                                                      “

================== SLIDE 9 ==================
IMAGE: SRP illustration. A red “S” badge identifies the Single Responsibility Principle; a handwritten note says a class should have only a single responsibility (only one reason to change). A fork and spoon are shown separately, contrasted with a combined “spork”, illustrating the difference between focused responsibilities and a combined one.

================== SLIDE 10 ==================
   SRP: What Is a "Responsibility"?
   The metaphor: a do-everything ECU vs. dedicated components

                                                               One "super-ECU" class  |  Focused classes
     Captures camera frames, detects lanes, decides on steering torque, logs  |  CameraDriver   ·   LaneDetector   ·   LaneKeepController   ·
     diagnostics, and draws HUD graphics  |  DiagnosticLogger    ·   HudRenderer

     A change to the HUD layout can break lane keeping  |  Each class changes for one reason only

           Key Insight: Bundling disparate responsibilities into one module creates hidden coupling, making simple
        changes high-risk and expensive to verify.

================== SLIDE 11 ==================
   SRP: The Stakeholder & Actor Model
   Responsibility = reason to change = the stakeholder (actor) who asks for it

                                      Actor  |  Asks for changes to…  |  Automotive Domain Focus
     Perception algorithm team  |  Lane / object detection  |  Computer Vision, Neural Net inference
     Functional safety team  |  Plausibility checks, safe states  |  ISO 26262 ASIL ratings, safe fallback
     Diagnostics / service team  |  DTCs, logging formats (UDS)  |  Diagnostic Event Manager (DEM)
     HMI / UX team  |  HUD and cluster visualization  |  Infotainment / Head-Up Display (QM)

               If more than one actor can ask for changes to a class, it has more than one responsibility.

   Refined definition: "A module should be responsible to one, and only one, actor." (R.C. Martin, Clean Architecture, 2017)

================== SLIDE 12 ==================
   SRP Analysis: The "Itself" Test
   A quick heuristic for spotting SRP violations

   For each method, read this sentence out loud:

   “ "The [Class] [method] s itself."
     If the sentence makes sense, the method probably belongs in the class. If it sounds wrong, move it.
                                                                                                                                                      “

   Class under analysis: an ADAS front camera

     public class FrontCamera {
         public Frame captureFrame()  |  { /* ... */ }
         public void adjustExposure()  |  { /* ... */ }
         public void runSelfTest()  |  { /* ... */ }
         public List<Lane> detectLanes()  |  { /* ... */ }
         public void reportFault(int dtc)  |  { /* ... */ }
         public void renderOnHud(Frame f)  |  { /* ... */ }
         public void cleanLens()  |  { /* ... */ }
     }

================== SLIDE 13 ==================
   SRP Analysis: Applying the Test to FrontCamera
                    Method  |  "The FrontCamera … itself."  |  Result  |  Moved to
       captureFrame()  |  The FrontCamera captures a frame itself  |  —
       adjustExposure()  |  The FrontCamera adjusts its exposure itself  |  —
       runSelfTest()  |  The FrontCamera runs its self-test itself  |  —
       detectLanes()  |  The FrontCamera detects lanes itself  |  LaneDetector   (perception)
       reportFault(dtc)  |  The FrontCamera stores and manages DTCs itself  |  DiagnosticEventManager

       renderOnHud(f)  |  The FrontCamera renders on the HUD itself  |  HudRenderer    (HMI)
       cleanLens()  |  The FrontCamera cleans its lens itself  |  SensorCleaningSystem

           Context matters

             A "smart camera" that runs perception on its own SoC can detect lanes itself (passes test in that context).
             The camera detects internal faults (self-test  |  ), but storing and managing DTCs belongs to diagnostics.

================== SLIDE 14 ==================
   SRP: The Refactored Design
   After the refactoring: each class has one single responsibility

    // Sensor hardware abstraction  |  // Diagnostics (e.g. AUTOSAR DEM)
    public class FrontCamera {  |  public class DiagnosticEventManager {
        public Frame captureFrame()  |  { /* ... */ }  |  public void reportFault(FaultEvent event) { /* ... */ }
        public void adjustExposure()  |  { /* ... */ }  |  }
        public SelfTestResult runSelfTest() { /* ... */ }
    }  |  // HMI Visualization (QM)
                                                                                                                                                      public class HudRenderer {
    // Perception Algorithm  |  public void render(List<Lane> lanes) { /* ... */ }
    public class LaneDetector {  |  }
        public List<Lane> detectLanes(Frame frame) { /* ... */ }
    }  |  // Actuator / Body Control
                                                                                                                                                      public class SensorCleaningSystem {
                                                                                                                                                          public void clean(Sensor sensor) { /* ... */ }
                                                                                                                                                      }

================== SLIDE 15 ==================
   SRP Analysis: Methods with Parameters
   For methods with parameters, include the parameter in the sentence

                                                                      Sentence  |  Result  |  Assigned Responsibility
     "The LaneDetector detects lanes [in a frame] itself."  |  Computer Vision / Perception algorithm
     "The HudRenderer renders [the lanes] itself."  |  Driver HMI visualization
     "The SensorCleaningSystem cleans [a sensor] itself."  |  Physical washer fluid / wiper actuation

        ISO 26262 Architectural Benefit: Separating these responsibilities into distinct classes enables clean
        Freedom from Interference (FFI) arguments. Perception (ASIL B) and HUD rendering (QM) no longer share
        memory or execution context in a single God Class.

================== SLIDE 16 ==================
   SRP in IVI: Media Library Search (Before)
   Scenario: IVI head unit searches music from USB, Bluetooth & streaming sources

     public class MediaLibrary {
         private List<Track> tracks;

             public List<Track> search(TrackFilter filter) {
                 List<Track> results = new ArrayList<>();
                 for (Track track : tracks) {
                     TrackMetadata meta = track.getMetadata();

                               String artist = filter.getArtist();
                               if (artist != null && !artist.isEmpty()
                                       && !artist.equalsIgnoreCase(meta.getArtist())) continue;
                               if (filter.getGenre() != null && filter.getGenre() != meta.getGenre()) continue;
                               if (filter.getSource() != null && filter.getSource() != meta.getSource()) continue;
                               if (filter.getYear()   != 0    && filter.getYear()   != meta.getYear())   continue;

                               results.add(track);
                      }
                      return results;
             }
     }

================== SLIDE 17 ==================
   SRP in IVI: Analyzing the Search Code Smells
           What's wrong with the initial  |  search()  |  implementation?

             Feature Envy Smell:  |  MediaLibrary  |  reaches into every attribute of  |  TrackMetadata   (artist, genre, source, year).
             Two Distinct Reasons to Change:
                1. Managing and indexing the track storage collection.
                2. Modifying metadata comparison and filtering rules.
             Violation of Information Expert (GRASP): The class owning the criteria ( TrackFilter ) should decide if an
             item matches.
             Maintenance Nightmare: Adding audio formats (FLAC/Dolby) or parental control filters forces edits to
             MediaLibrary .

        Smell Summary: When a class accesses the internal data of another object more than its own, coupling
        spikes and SRP is violated.

================== SLIDE 18 ==================
   SRP in IVI: Media Library Search (After, Using Delegation)
   Move matching logic to the class that owns the criteria ( TrackFilter )

    // Responsibility: manage track collection  |  // Responsibility: evaluate search criteria
    public class MediaLibrary {  |  public class TrackFilter {
        private List<Track> tracks;  |  private String artist; private Genre genre;
                                                                                                                                                          private MediaSource source; private int year;
          public List<Track> search(TrackFilter filter) {
              List<Track> results = new ArrayList<>();  |  public boolean matches(TrackMetadata meta) {
              for (Track track : tracks) {  |  if (artist != null && !artist.isEmpty()
                  // Delegate matching decision  |  && !artist.equalsIgnoreCase(meta.getArtist()))
                  if (filter.matches(track.getMetadata())) {  |  return false;
                      results.add(track);  |  if (genre != null && genre != meta.getGenre())
                  }  |  return false;
              }  |  if (source != null && source != meta.getSource())
              return results;  |  return false;
          }  |  if (year != 0 && year != meta.getYear())
    }  |  return false;
                                                                                                                                                              return true;
                                                                                                                                                          }
                                                                                                                                                      }

================== SLIDE 19 ==================
   SRP in IVI: Architectural Gains
           What we gained through delegation

             New filter criteria (audio format, bitrate, explicit content)  |  only   TrackFilter   changes.
               MediaLibrary  |  remains untouched: Its sole reason to change is managing collection storage/indexing.
             Eliminated Feature Envy: The search loop simply delegates to  |  filter.matches() .

             Strict behavioral preservation: Case-insensitive artist matching and wildcard semantics remain invariant.

        Refactoring Axiom: Refactoring improves internal structural cohesion and decouples reasons to change
        without altering observable external system behavior.

        Design Connection: Isolating what varies so that new capabilities can be added without modifying existing
        classes leads directly to our next principle: Open–Closed (OCP).

================== SLIDE 20 ==================
                                                                                                                                                 O
                                                                                                   Open–Closed Principle (OCP)

   “ Software entities (classes, modules, functions) should be open for extension, but closed for
     modification.
                                                                                                                                                                                                            “

                                                        Open for extension  |  Closed for modification
     You can add new behavior to meet new requirements  |  You add it without changing existing, tested source code

================== SLIDE 21 ==================
IMAGE: OCP illustration. An electric hand mixer is shown with separate attachments (whisk, beater, and hook). Handwritten text says software entities should be open for extension but closed for modification, and that when changing attachments you do not need to change the mixer’s engine.

================== SLIDE 22 ==================
   OCP Violation: The ADAS Feature Manager (Before)
   Scenario: ADAS domain controller executes active assistance functions every 50ms cycle

     public class AdasFeatureManager {
         public void runCycle(List<String> activeFeatures, EnvironmentModel env) {
             for (String feature : activeFeatures) {
                 switch (feature) {
                     case "AEB":    // Autonomous Emergency Braking
                         if (env.timeToCollision() < 1.5) { brakeSystem.requestFullBraking(); }
                         break;
                     case "LKA":    // Lane Keeping Assist
                         if (env.isDriftingOutOfLane()) { steering.applyCorrectiveTorque(env.laneOffset()); }
                         break;
                     case "ACC":    // Adaptive Cruise Control
                         powertrain.setTargetSpeed(computeFollowingSpeed(env.leadVehicle()));
                         break;
                     // TODO: add BSD, TSR, ... for the next model year
                 }
             }
         }
     }

================== SLIDE 23 ==================
   OCP Violation: Impact on Scalability & Safety
           What happens when product management asks for a new feature?

                                                  New Requirement  |  Direct Impact on   AdasFeatureManager

     Add Blind Spot Detection (BSD)  |  Edit       AdasFeatureManager      add another    case

     Add Traffic Sign Recognition (TSR) via OTA  |  Edit       AdasFeatureManager    again
     Market variant without LKA  |  Add  |  if (variant == …)    branches cluttering core dispatch

           The Safety Hazard (ISO 26262): Modifying verified classes forces full regression testing and invalidates
        previously achieved safety sign-offs. The class is open for modification and closed for extension—the exact
        opposite of OCP!

================== SLIDE 24 ==================
   OCP Applied: The ADAS Feature Manager (After)
   Put the part that varies (each feature's behavior) behind an abstraction

    public interface AdasFunction {  |  // Plug in new features as NEW classes:
        String id();  |  public class EmergencyBraking implements AdasFunction {
        boolean isAvailable(VehicleConfig config);  |  public String id() { return "AEB"; }
        void execute(EnvironmentModel env, ActuatorRequests out);  |  public boolean isAvailable(VehicleConfig c) { return c.hasRadar(); }
    }  |  public void execute(EnvironmentModel env, ActuatorRequests out) {
                                                                                                                                                              if (env.timeToCollision() < 1.5) out.requestBrake();
    public class AdasFeatureManager {  |  }
        private final List<AdasFunction> functions;  |  }

          public AdasFeatureManager(List<AdasFunction> installed, VehicleConfig cfg) {  |  public class LaneKeepAssist implements AdasFunction { /* LKA */ }
              this.functions = installed.stream()  |  public class AdaptiveCruise implements AdasFunction { /* ACC */ }
                  .filter(f -> f.isAvailable(cfg))
                  .toList();  |  // NEW: added without touching the manager
          }  |  public class BlindSpotDetection implements AdasFunction { /* BSD */ }

          public void runCycle(EnvironmentModel env, ActuatorRequests out) {
              for (AdasFunction f : functions) {
                  f.execute(env, out); // polymorphic dispatch
              }
          }
    }

================== SLIDE 25 ==================
   OCP Applied: Verification & Architectural Benefits
           What we gained

                   Requirement Change  |  Impact Now
     Add BSD / TSR (via OTA)  |  Write one new class and register it.  |  AdasFeatureManager   is unchanged.
     Market variant without LKA  |  isAvailable(config)  |  returns  |  false . Zero branching inside the manager.

     Typo in feature name  |  Compile-time safety: Features are strongly-typed interfaces, not string literals.

        Verification Efficiency: Verification and safety sign-off focus exclusively on the new feature class. The core
        feature manager is closed to modification.

           The Pragmatic Reality of OCP

             OCP is never 100% absolute: Registering new classes modifies a composition root (DI container, factory, or
             config file).
             The goal is boundary containment: confine changes strictly to the configuration edges while keeping verified
             algorithms pristine.

================== SLIDE 26 ==================
   OCP Through Delegation: IVI Navigation Routing
   Scenario: IVI navigation supports new routing modes dynamically at runtime

    // Stable abstraction  |  // Concrete Routing Strategies:
    public interface RoutingStrategy {  |  public class FastestRoute implements RoutingStrategy {
        Route calculate(Position from, Position to,  |  /* minimize travel time */
                        MapData map, VehicleState state);  |  }
    }
                                                                                                                                                      public class EcoRoute implements RoutingStrategy {
    // Closed for modification  |  /* minimize energy / fuel consumption */
    public class NavigationService {  |  }
        private RoutingStrategy strategy;
                                                                                                                                                      public class AvoidTollsRoute implements RoutingStrategy {
          public NavigationService(RoutingStrategy initial) {  |  /* route strictly via secondary roads */
              this.strategy = initial;  |  }
          }
                                                                                                                                                      // NEW: Plugs in without altering navigation service
          public void setStrategy(RoutingStrategy s) {  |  public class EvChargingAwareRoute implements RoutingStrategy {
              this.strategy = s; // dynamic runtime swap  |  /* plan optimal charging stops from battery SOC */
          }  |  }

          public Route navigate(Position from, Position to,
                                MapData map, VehicleState state) {
              return strategy.calculate(from, to, map, state);
          }
    }

================== SLIDE 27 ==================
   OCP: Inheritance vs. Delegation in Practice
   Two complementary strategies to satisfy the Open–Closed Principle

                   Dimension  |  Inheritance / Polymorphism  |  Delegation (Strategy Pattern)
     Mechanism  |  New subtype plugged into an execution framework  |  New strategy object injected/delegated to
     Binding Time  |  Build / compile / configuration time  |  Dynamic runtime swapping (driver toggles mode)
     Coupling  |  Subtype tied to base type lifecycle  |  Loose: Service only knows   RoutingStrategy

     Architectural Pattern  |  Template Method / Polymorphic Plugin  |  Strategy Pattern

        Key Insight: In both paradigms, new behavior = new code. The existing, production-verified service is never
        modified, preserving functional stability.

================== SLIDE 28 ==================
                                                                                                                                                 L
                                                                                          Liskov Substitution Principle (LSP)

   “ Subtypes must be substitutable for their base types.
                                                                                                                                                      “

   “ "If S is a subtype of T, then objects of type T may be replaced with objects of type S without breaking the
     correctness of the program."
     — Barbara Liskov (1987)
                                                                                                                                                      “

================== SLIDE 29 ==================
IMAGE: LSP illustration. A “Sportsman” figure is the base type and a “Sportsman-Powerlifter” figure is shown as inheriting from it. The handwritten note says objects should be replaceable by instances of their subtypes without altering program correctness. It adds: if Sportsman means healthy, Sportsman-Powerlifter must also be healthy; otherwise something is wrong with the class hierarchy.

================== SLIDE 30 ==================
   LSP: Contracts & Automotive Safety
                                                   Well-designed inheritance  |  Misused inheritance
     Code written against the base type keeps working with any subtype  |  Callers must check the concrete type or suffer surprising behavior
     The subtype keeps every promise the base type makes  |  The subtype overrides, disables or reinterprets inherited behavior

   Why this matters in automotive

             Base Abstractions: Sensor fusion, path planning and safety monitors are written against base abstractions (
              Sensor , OccupancyGrid , ObjectList ).

             Safety Hazards: A subtype that quietly breaks contracts (units, coordinate frames, value ranges) is a safety
             hazard under ISO 26262.
             Contract Rules: Preconditions cannot be strengthened in a subtype, and postconditions cannot be weakened.

================== SLIDE 31 ==================
   LSP Violation: OccupancyGrid → OccupancyGrid3D (Before)
   Scenario: 2D bird's-eye occupancy grid extended to 3D for LiDAR point clouds

     public class OccupancyGrid {
         public Cell getCell(int x, int y)  |  { /* ... */ }
         public void markOccupied(Obstacle o, int x, int y)  |  { /* ... */ }
         public void clearCell(int x, int y)  |  { /* ... */ }
         public List<Obstacle> getObstacles(int x, int y)  |  { /* ... */ }
         public boolean isFree(int x, int y)  |  { /* ... */ }
     }

     public class OccupancyGrid3D extends OccupancyGrid {  |  // "a 3D grid IS-A grid"… right?
         public Cell getCell(int x, int y, int z)  |  { /* ... */ }
         public void markOccupied(Obstacle o, int x, int y, int z) { /* ... */ }
         public void clearCell(int x, int y, int z)  |  { /* ... */ }
         public List<Obstacle> getObstacles(int x, int y, int z)   { /* ... */ }
         public boolean isFree(int x, int y, int z)  |  { /* ... */ }
         // The inherited 2D methods are still present. What do they mean now?
     }

================== SLIDE 32 ==================
   LSP: The Path Planner Breakdown
   Code written against the base type runs into undefined behavior

     public class PathPlanner {
         public boolean isCorridorFree(OccupancyGrid grid, List<GridPoint> path) {
             for (GridPoint p : path) {
                 if (!grid.isFree(p.x(), p.y())) return false;   // which height layer does this check?
             }
             return true;
         }
     }

     // Execution:
     OccupancyGrid grid = new OccupancyGrid3D(lidarPointCloud);  |  // compiles without errors
     planner.isCorridorFree(grid, plannedPath);  |  // is the result correct?

        The Core Hazard: The code compiles cleanly, yet the safety contract is destroyed at runtime. Does
         isFree(x, y) check only the road surface, check all layers, or throw an exception?

================== SLIDE 33 ==================
   LSP: What Went Wrong? (Contract Ambiguities)
   1. Inherited 2D methods have no coherent semantics in 3D space

                                    Inherited method  |  Possible meaning in  |  OccupancyGrid3D      Consequence for     PathPlanner

       isFree(x, y)  |  checks ground layer (  |  )  |  Roof-height barrier reported as free  |  Collision hazard (false negative)
       isFree(x, y)  |  checks all height layers  |  Overhead bridge/sign marks lane blocked  |  Phantom braking (false positive)
       isFree(x, y)  |  throws exception  |  Breaks base contract unconditionally  |  Runtime crash in motion planner
       markOccupied(o, x, y)  |  writes to layer?  |  Ambiguous destination  |  Inconsistent spatial map state

        LSP Contract Rule: Preconditions cannot be strengthened in a subtype, and postconditions cannot be
        weakened.

================== SLIDE 34 ==================
   LSP: What Went Wrong? (Contract Weakening)
   2. The subtype weakens the base type's behavioral guarantees

                                     Base Type ( OccupancyGrid ) Guarantee  |  Subtype ( OccupancyGrid3D ) Reality
       isFree(x, y)  |  answers: can the vehicle drive through  |  ?  |  Meaning becomes ambiguous or invalid
     Every cell is addressed completely by coordinate  |  Requires  |  ; 2D coordinate is incomplete
     Callers need zero knowledge of concrete implementation  |  Forces callers to check   if (grid instanceof OccupancyGrid3D)

   3. The compiler cannot protect you

             Type signatures match perfectly, code compiles without warnings, and isolated unit tests may pass.
             System failure only surfaces when substituted into production workflows—during live autonomous driving!

        Axiom: "IS-A" in everyday language ≠ "IS-SUBSTITUTABLE-FOR" in software architecture. A 3D grid is a
        kind of map, but it does NOT exhibit the behavior of a 2D occupancy grid.

================== SLIDE 35 ==================
   LSP Fixed: Delegation Over Inheritance (Step 1)
     OccupancyGrid3D  |  uses 2D grids instead of extending one

     public class OccupancyGrid3D {  |  // no longer "extends OccupancyGrid"
         private final List<OccupancyGrid> layers;  |  // one 2D grid per height band
         private final double layerHeightM;  |  // e.g. 0.25 m per layer

             public boolean isFree(int x, int y, int z) {
                 return layers.get(z).isFree(x, y);  |  // delegate to the 2D layer
             }
             public void markOccupied(Obstacle o, int x, int y, int z) {
                 layers.get(z).markOccupied(o, x, y);  |  // delegate
             }
             public OccupancyGrid getLayer(int z) { return layers.get(z); }
     }

         Result: Zero meaningless inherited isFree(x, y) methods. Every method has an unambiguous contract, and
         2D grid logic is reused via delegation without inheritance baggage.

================== SLIDE 36 ==================
   LSP Fixed: Explicit Contract Abstraction (Step 2)
   The planner depends on an abstraction whose contract states the exact question it asks

     public interface DrivableSpaceMap {
         // Contract: true ONLY if cell free up to vehicleHeightM + clearance
         boolean isDrivable(int x, int y, double vehicleHeightM);
     }

     public class Grid2DDrivableSpace implements DrivableSpaceMap {    // camera/radar line
         private final OccupancyGrid grid;  |  // 2D: conservative
         public boolean isDrivable(int x, int y, double h) { return grid.isFree(x, y); }
     }

     public class Grid3DDrivableSpace implements DrivableSpaceMap {    // LiDAR line
         private final OccupancyGrid3D grid;
         public boolean isDrivable(int x, int y, double h) {
             int topLayer = grid.layerIndexFor(h + SAFETY_CLEARANCE_M);
             for (int z = 0; z <= topLayer; z++) {
                 if (!grid.isFree(x, y, z)) return false;  |  // barrier at roof height → blocked
             }
             return true;  |  // overhead gantry above car → free
         }
     }

================== SLIDE 37 ==================
   LSP Fixed: Safe Substitution in Path Planning
     public class PathPlanner {  |  // works with ANY implementation
         public boolean isCorridorFree(DrivableSpaceMap map, List<GridPoint> path, double vehicleHeightM) {
             return path.stream().allMatch(p -> map.isDrivable(p.x(), p.y(), vehicleHeightM));
         }
     }

           What we gained

                                 Problem Before  |  Architecture Now
     Missed barrier / phantom braking  |  Contract explicitly specifies drivability including vehicle clearance
       instanceof  |  checks in planner  |  Zero. Any  |  DrivableSpaceMap  |  substitutes transparently
     3D grid shoehorned into 2D hierarchy  |  Honest dimensional APIs; both implementations honor identical behavioral contract

        Conservative Default: The 2D implementation is intentionally conservative. Without height data, all obstacles
        block—ensuring safety without risking missed collisions.

================== SLIDE 38 ==================
   Inheritance vs. Delegation: When to Use Which
   Defining Relationships

             Delegation: Object hands a task to another helper. Uses behavior without becoming that type.
             Composition: Object owns its parts; parts have no independent lifecycle ( OccupancyGrid3D owns height
             layers).
             Aggregation: Object uses independent parts ( SensorFusion uses  |  RadarSensor      and    FrontCamera ).

   Decision Matrix

                                                        Use Inheritance When…  |  Use Delegation / Composition When…
     Subtype preserves entire behavioral contract of base (LSP  |  )  |  You only need partial behavior of another class
     Relationship is static and immutable at runtime  |  Behavior must be swapped dynamically at runtime
     Example:  |  EmergencyBraking implements AdasFunction  |  Example:   OccupancyGrid3D   contains   OccupancyGrid   layers

           Golden Rule: Prefer delegation to inheritance. Before typing  |  extends , ask: "Can every caller of the base
        type safely use my subtype without knowing it?" If not, delegate!

================== SLIDE 39 ==================
                                                                                                                                                      I
                                                                                        Interface Segregation Principle (ISP)

   “ Clients should not be forced to depend on methods they do not use.
                                                                                                                                                          “

   “ "Many client-specific interfaces are better than one general-purpose interface."
     — Robert C. Martin
                                                                                                                                                          “

================== SLIDE 40 ==================
IMAGE: ISP illustration. One large remote labelled “ONE FAT INTERFACE” is split into three smaller remotes labelled TV, AC, and LIGHTS. The notes say clients should not depend on methods they do not use and label the result “SMALL, FOCUSED INTERFACES”.

================== SLIDE 41 ==================
   ISP: Interface Segregation in Automotive Software
                                                                  "Fat" interface  |  Segregated interfaces
     Describes every kind of implementer in one interface  |  Small, focused interfaces built around specific client needs
     Implementers forced into dummy methods ( throw ,  |  return null )  |  Implementers provide only what they truly support
     Changes force recompilation and re-testing across all clients  |  Changes affect only the clients using that specific contract

   Why this matters in automotive

             Mixed-Criticality: A QM (non-safety) IVI app must never depend on an interface exposing ASIL-rated motion
             control.
             Cybersecurity (ISO/SAE 21434): Bloated interfaces expand the attack surface. Segregated interfaces
             enforce least privilege.
             SOA & AUTOSAR Adaptive: Services are deployed as fine-grained interfaces (SOME/IP, DDS), avoiding
             vehicle god-interfaces.

================== SLIDE 42 ==================
   ISP Violation: The "Fat" VehicleOperator Interface (Before)
   Scenario: Level 3 vehicle with two potential operators (Human Driver & Autonomous Stack)

     public interface VehicleOperator {
         // Motion control
         void steer(double angleDeg);
         void accelerate(double mps2);
         void brake(double mps2);

             // Driver monitoring (DMS)
             double getDrowsinessLevel();
             GazeDirection getGazeDirection();
             boolean areHandsOnWheel();

             // Software lifecycle
             HealthStatus runSelfDiagnosis();
             void installOtaUpdate(SoftwarePackage pkg);
     }

         The Smelling "God-Interface": Bundling motion actuators, biometric driver monitoring, and OTA package
         deployment into one bloated interface.

================== SLIDE 43 ==================
   ISP Violation: Forced Dummy Implementations
   Both implementations are forced into dummy returns and contract violations

     public class HumanDriverModel implements VehicleOperator {
         public void steer(double a)  |  { /* read steering-wheel input */ }
         public double getDrowsinessLevel()  |  { return dmsCamera.estimateDrowsiness(); }
         public HealthStatus runSelfDiagnosis()  |  { return null; } //     humans have no self-diagnosis!
         public void installOtaUpdate(SoftwarePackage p) {
             throw new UnsupportedOperationException();  |  //    cannot OTA-update a human!
         }
     }

     public class AutomatedDrivingStack implements VehicleOperator {
         public void steer(double a)  |  { /* trajectory controller output */ }
         public HealthStatus runSelfDiagnosis() { /* watchdog, sensor checks */ }
         public double getDrowsinessLevel()       { return 0.0; }  |  //    AI "never gets tired"?
         public GazeDirection getGazeDirection() { return null; }  |  //    throws NullPointerException!
         public boolean areHandsOnWheel()  |  { return false; }  |  //    triggers false hands-off alarm!
     }

================== SLIDE 44 ==================
   ISP: The Dangers of Interface Pollution
   Client Dependency Analysis

                  Client Module  |  Truly Needs…  |  Forced to Depend On…  |  Risk Exposure
       DriverMonitoringSystem  |  Drowsiness, gaze, hands  |  Entire interface including OTA  |  Re-tested on OTA refactors
       VehicleMotionController  |  Steer, accelerate, brake  |  DMS & OTA maintenance  |  Safety-critical code churn
       OtaUpdateManager  |  Install update, diagnostics  |  Motion actuators ( steer ,     brake )     Severe security vulnerability

   Critical Architectural Hazards

             Silent Logic Bugs:  |  areHandsOnWheel() == false  |  returned by AD stack triggers a spurious emergency alert.
             Cybersecurity Attack Surface (ISO/SAE 21434): OTA manager can invoke steering and braking primitives
             directly.
             Verification Coupling: Changing DMS gaze tracking formats triggers recompilation and safety recertification
             of motion controllers!

================== SLIDE 45 ==================
   ISP Applied: Client-Specific Interfaces (After)
   Split the monolithic interface into focused, client-specific contracts

     public interface MotionControl {  |  // client: VehicleMotionController (ASIL-rated)
         void steer(double angleDeg);
         void accelerate(double mps2);
         void brake(double mps2);
     }

     public interface AttentionMonitorable {  |  // client: DriverMonitoringSystem
         double getDrowsinessLevel();
         GazeDirection getGazeDirection();
         boolean areHandsOnWheel();
     }

     public interface SelfDiagnosable {  |  // client: health monitoring / safety supervisor
         HealthStatus runSelfDiagnosis();
     }

     public interface OtaUpdatable {  |  // client: OtaUpdateManager
         void installOtaUpdate(SoftwarePackage pkg);
     }

================== SLIDE 46 ==================
   ISP Applied: Focused Operators & Clients
   Operators implement ONLY what they genuinely support; clients depend only on what they use

     public class HumanDriverModel implements MotionControl, AttentionMonitorable {
         /* Pure human behavior: no fake OTA or diagnostics */
     }

     public class AutomatedDrivingStack implements MotionControl, SelfDiagnosable, OtaUpdatable {
         /* Pure AD stack behavior: no fake eyes or hands */
     }

     public class DriverMonitoringSystem {
         public void check(AttentionMonitorable driver) { /* AD stack cannot even be passed here  |  */ }
     }

     public class OtaUpdateManager {
         public void update(OtaUpdatable target, SoftwarePackage pkg) { /* cannot see steer()/brake()  |  */ }
     }

     public class VehicleMotionController {
         public void apply(MotionControl operator) { /* works with human OR AD stack cleanly (LSP  |  ) */ }
     }

================== SLIDE 47 ==================
   ISP Applied: Safety & Architectural Wins
           What we gained

                                                     Problem Before  |  Architecture Now
     Dummy returns ( null ,  |  0.0 ,       false ) and exceptions  |  Completely eliminated; enforced by compiler type safety
     Spurious hands-off alarms  |  AD stack is not   AttentionMonitorable ; compile error if miswired

     OTA manager could access steering/braking  |  OTA manager sees only      OtaUpdatable ; minimal attack surface

     DMS changes forced motion re-verification  |  Isolated interfaces change on independent lifecycles

        Autonomous Handover (Level 3): Transitioning vehicle control between human and autonomous driving
        becomes seamless: VehicleMotionController simply switches which MotionControl instance it receives. Clean,
        type-safe, and LSP-compliant.

================== SLIDE 48 ==================
                                                                                                                                                 D
                                                                                      Dependency Inversion Principle (DIP)

   “ A. High-level modules should not depend on low-level modules. Both should depend on abstractions.
     B. Abstractions should not depend on details. Details should depend on abstractions.
                                                                                                                                                      “

                                                                                                                               — Robert C. Martin

================== SLIDE 49 ==================
IMAGE: DIP illustration. A high-level lamp is connected through an “INTERFACE (SOCKET)” rather than being hard-wired to a particular power source. Grid, solar, and battery are shown as alternative low-level details. The notes say “DEPEND ON ABSTRACTIONS, NOT ON CONCRETIONS” and “BOTH SIDES DEPEND ON THE ABSTRACTION”.

================== SLIDE 50 ==================
   DIP: Inverted Dependencies in Automotive Architecture
                                                   Traditional layering  |  Inverted dependencies
     High-level policy calls low-level details (supplier drivers)
                                                                                                                                       High-level policy owns an abstraction; low-level details implement it
     directly
     New sensor supplier forces a rewrite of the fusion logic  |  New supplier = new implementation. Fusion logic remains pristine.
                                                                                                                                       Source dependency points against call direction: detail → abstraction ←
     Source code dependency follows call direction: policy → detail
                                                                                                                                       policy

   Why this matters in automotive

             Supplier Independence: OEMs swap radar, camera, or LiDAR suppliers between model generations without
             breaking core logic.
             HW/SW Decoupling (SDVs): The same ADAS application SWCs execute on diverse SoCs via standardized
             abstractions.
             SIL / HIL Simulation: High-level policies test against simulated virtual sensors without physical hardware.
             Industry Standards: AUTOSAR ports/RTE and Android Automotive VHAL are production instances of DIP.

================== SLIDE 51 ==================
   DIP Violation: Sensor Fusion Tied to Supplier Drivers (Before)
   Scenario: ADAS sensor fusion module combines radar and camera into one object list for AEB/ACC

     public class SensorFusion {  |  // HIGH-LEVEL policy
         private final SupplierARadarDriver radar = new SupplierARadarDriver("CAN1");    // concrete detail
         private final SupplierBCameraDriver camera = new SupplierBCameraDriver("ETH0"); // concrete detail

             public ObjectList fuse() {
                 List<ObjectList> inputs = new ArrayList<>();

                      // Parsing supplier-specific CAN frames inside high-level fusion logic
                      CanFrame frame = radar.readFrame(0x3A5);
                      double rangeM    = (frame.getBytes(0, 2) * 0.05);  |  // supplier A scaling
                      double azimuthDeg = (frame.getBytes(2, 2) * 0.01) - 90.0;   // supplier A offset
                      inputs.add(ObjectList.single(rangeM, azimuthDeg, SensorType.RADAR));

                      // Supplier B camera: completely different API, coordinate frame and units
                      SupplierBCameraDriver.Detection[] dets = camera.getDetectionsV2();
                      inputs.add(convertSupplierBDetections(dets));  |  // mm → m, image frame → vehicle frame

                      return associateAndTrack(inputs);  |  // core safety fusion algorithm
             }
     }

================== SLIDE 52 ==================
   DIP: Direct Coupling & Architectural Hazards
   Concrete Dependency Direction

     SensorFusion (High-Level Policy) ──► SupplierARadarDriver (Low-Level Driver) ──► CAN Bus
                                      ──► SupplierBCameraDriver (Low-Level Driver) ──► Automotive Ethernet

           What happens when suppliers or hardware change?

                              Hardware Evolution  |  Impact on   SensorFusion

     Switch to Supplier C Radar  |  Re-open and rewrite fusion logic: new CAN IDs, drivers, and byte decoders
     Radar moves from CAN to Ethernet  |  Edit the fusion module again
     Automated SIL / HIL Testing  |  Impossible without physical hardware or dirty mocks ( new is hard-coded)
     Add LiDAR for Level 3  |  Intrusively splice another supplier protocol into the fusion loop

           The most safety-critical asset ( associateAndTrack ) is perpetually re-opened and re-tested for every minor
        hardware swap, violating both SRP and OCP.

================== SLIDE 53 ==================
   DIP Applied: Fusion Owns the Abstraction (Step 1)
   High-level module defines the interface it requires in its own domain terms

    package adas.fusion; // In policy package!  |  package adas.fusion;

    public interface ObjectSensor {  |  public class SensorFusion {
        /** Contract: detections in VEHICLE frame  |  private final List<ObjectSensor> sensors;
         * (ISO 8855), SI units, timestamped.
         * Returns empty list (never null). */  |  public SensorFusion(List<ObjectSensor> sensors) {
        ObjectList detectObjects(Timestamp cycle);  |  this.sensors = List.copyOf(sensors); // Injected
        SensorType type();  |  }
    }
                                                                                                                                                          public ObjectList fuse(Timestamp cycleTime) {
                                                                                                                                                              List<ObjectList> inputs = sensors.stream()
                                                                                                                                                                  .map(s -> s.detectObjects(cycleTime))
                                                                                                                                                                  .toList();
                                                                                                                                                              return associateAndTrack(inputs); // 100% stable
                                                                                                                                                          }
                                                                                                                                                      }

================== SLIDE 54 ==================
   DIP Applied: Adapters Implement the Abstraction (Step 2)
   Low-level details adapt supplier hardware to the high-level contract

     package sensors.suppliera;
     public class SupplierARadarAdapter implements ObjectSensor {   // Decoding and scaling live HERE
         private final SupplierARadarDriver driver;
         public ObjectList detectObjects(Timestamp t) { /* read 0x3A5, apply supplier A scaling, convert frame */ }
         public SensorType type() { return SensorType.RADAR; }
     }

     package sensors.supplierc;
     public class SupplierCRadarAdapter implements ObjectSensor { /* Ethernet / SOME/IP implementation */ }

     package sensors.supplierb;
     public class SupplierBCameraAdapter implements ObjectSensor { /* mm → m, image frame → vehicle frame */ }

     package test.sil;
     public class SimulatedSensor implements ObjectSensor { /* Replays recorded drive datasets or CARLA sim */ }

================== SLIDE 55 ==================
   DIP Applied: Composition Root Wiring (Step 3)
   Wire concrete instances at a single composition root

     // Production Vehicle Configuration: Supplier C Radar + Supplier B Camera
     SensorFusion fusion = new SensorFusion(List.of(
             new SupplierCRadarAdapter(new SupplierCRadarDriver("ETH1")),
             new SupplierBCameraAdapter(new SupplierBCameraDriver("ETH0"))));

     // SIL Test Bench: Identical fusion code, zero physical hardware required!
     SensorFusion fusionUnderTest = new SensorFusion(List.of(
             new SimulatedSensor(Scenario.PEDESTRIAN_CROSSING_NIGHT)));

        Architectural Freedom: The core fusion algorithms are completely agnostic of bus protocol (CAN vs.
        Ethernet), supplier wire encodings, and physical vs. virtual execution environments.

================== SLIDE 56 ==================
   DIP Applied: Inverted Dependency Architecture

              SimulatedSensor  |  SensorFusion  |  <<Radar>>  |  <<Radar>>  |  <<Camera>>
                                                                                             SupplierARadarAdapter  |  SupplierCRadarAdapter   SupplierBCameraAdapter
               Benchmark>>: <<SIL  |  Policy>>: <<Core

                  realizes  |  uses  |  realizes  |  realizes  |  realizes

                                                                                                        <<interface>>
                                                                                                      ObjectSensor
DIAGRAM: Dependency-inverted sensor architecture. SimulatedSensor (SIL benchmark) and SensorFusion (core policy) both relate to the ObjectSensor interface; SupplierARadarAdapter, SupplierCRadarAdapter, and SupplierBCameraAdapter each realize ObjectSensor. SensorFusion uses the abstraction rather than depending directly on supplier-specific drivers.

================== SLIDE 57 ==================
   DIP Applied: Architectural Gains
           What we gained

                         Change Scenario  |  Architectural Impact
     Switch to Supplier C Radar  |  Write one new adapter.  |  SensorFusion    is 100% untouched.
     Migrate from CAN to Ethernet  |  Only the adapter changes; domain policy remains completely unaware.
     SIL / HIL Simulation  |  Inject  |  SimulatedSensor . Identical production bytecode runs in test bench.

     Add LiDAR for Level 3  |  Write  |  LidarAdapter implements ObjectSensor . System extended, not modified (OCP      ).
     Safety Re-Certification  |  Re-certification scoped exclusively to new adapter. Core algorithm preserved.

        Crucial Architectural Distinction: Dependency Inversion is the architectural principle (dependencies point
        toward high-level abstractions). Dependency Injection is merely the tactical wiring technique.

================== SLIDE 58 ==================
               Think & Defend: Dilemma 1
   SRP vs. Latency: The Mixed-Criticality God-Class

             Scenario: In an ADAS domain controller, the perception pipeline detects obstacles (ASIL B), while telemetry
             logging writes diagnostic trace buffers to flash memory (persistent storage) (QM - non-safety).
             The Dilemma: The performance engineer merges both into a single FrontCameraPipeline class to eliminate
             inter-thread queue latency (saving 3.5ms). The safety architect objects, arguing it violates Single
             Responsibility (SRP) and ISO 26262 Freedom From Interference (FFI).

        As the lead software architect, define why sacrificing 3.5ms or using lock-free message ring buffers is
        mandatory over collapsing these responsibilities into one class.

================== SLIDE 59 ==================
               Think & Defend: Dilemma 2
   LSP & Behavioral Contracts: The Actuator Slew Rate Trap

             Scenario: A Tier-1 supplier delivers an electronic braking actuator implementing BrakeActuator with
              void applyBrakingForce(double kilonewtons) . However, physical fluid pressure rise time limits slew rate to 50
             kN/s.
             The Dilemma: During an Autonomous Emergency Braking (AEB) maneuver, the trajectory planner demands
             an immediate step function (100 kN in 10ms). The actuator driver silently clamps the rise rate without
             reporting an error. The supplier argues: "We implemented the interface cleanly and never threw an exception
             (OCP compliant)."

        Identify Why is this a catastrophic violation of the Liskov Substitution Principle (LSP), even though the code
        compiled and ran without exceptions? How must the contract be redesigned?

================== SLIDE 60 ==================
               Think & Defend: Dilemma 3
   ISP & DIP: The Connected Vehicle "God Service"

             Scenario: An OEM is deploying an edge OTA gateway. The cloud connectivity service needs vehicle battery
             State-of-Charge to display charging progress on the owner's smartphone app.
             The Dilemma: A developer binds the cloud gateway directly to the internal BatteryManagementSystem (BMS)
             interface, which contains getStateOfCharge() , calibrateCells() , overrideThermalLimits() , and flashFirmware() .
             The developer claims: "It's already implemented on CAN; why write extra interfaces and adapters?"

        Identify if the developer proposal violate both the ISP and DIP. What cybersecurity (ISO/SAE 21434) and
        safety hazards does this introduce, and what is your inverted design?

================== SLIDE 61 ==================
   Summary & Next Week
   Core Axioms  |  This Week's Readings

             SRP: One reason to change, mapped to one actor.  |  CleanArch: Chapters 7, 8, 9, 10, 11
             OCP: Open for extension, closed for modification.  |  HFOOAD: Chapter 8
             LSP: Subtypes preserve full contract—favor
             delegation.
             ISP: Clients never depend on unused methods.
             DIP: High-level policy owns domain abstractions.

END OF WEEK 3 DOCUMENT — 61 SLIDES