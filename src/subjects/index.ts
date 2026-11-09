import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { OS_BASE } from "./os/paths";
import { SE_BASE } from "./se/paths";

/**
 * Subjects built as full React apps (rather than extracted legacy pages).
 *
 * Each one lives in `src/subjects/<id>/`, owns every route under `basePath`,
 * and is code-split so its code and styles load only when it is opened.
 * To add a subject: create its folder, export a default component that renders
 * relative <Routes>, add it here, and link to `basePath` from its year hub
 * (e.g. `legacy/3rd Year/index.html`, then `npm run extract`).
 */
export interface SubjectApp {
  id: string;
  title: string;
  basePath: string;
  component: LazyExoticComponent<ComponentType>;
}

export const subjectApps: SubjectApp[] = [
  {
    id: "os",
    title: "Operating Systems",
    basePath: OS_BASE,
    component: lazy(() => import("./os/App")),
  },
  {
    id: "se",
    title: "Advanced Software Engineering",
    basePath: SE_BASE,
    component: lazy(() => import("./se/App")),
  },
];
