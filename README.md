# FCAI Summaries

Interactive revision site for Cairo University FCAI students. The original
static HTML site lives in `legacy/`; the app in `src/` builds it into a React
single-page application.

## Stack

- React / React DOM 19
- TypeScript 7
- Vite 8
- React Router 7 (`BrowserRouter`)
- Tailwind CSS 4 and Vitest (used by the subjects in `src/subjects/`)

## Development

```bash
npm install
npm run dev
```

Production build, local preview and tests:

```bash
npm run build
npm run preview
npm test
```

## Subjects built as React apps

Newer subjects are full React apps instead of extracted legacy pages. Each one
lives in `src/subjects/<id>/` and is registered in `src/subjects/index.ts`,
which mounts it at its own base path and code-splits it.

| Subject | Route | Code | Source material |
| --- | --- | --- | --- |
| Operating Systems (3rd year) | `/3rd-year/os` | `src/subjects/os/` | `sources/3rd-year/os/` |
| Advanced Software Engineering (3rd year) | `/3rd-year/se` | `src/subjects/se/` | Lecture material (weeks 1–5) |

The Software Engineering subject is lesson-only (no quizzes). Its content lives in
`src/subjects/se/data/weekN/` as typed lesson files; each lesson lists the slide
numbers it teaches, and `data/course.test.ts` fails if any slide of a week is not
covered by a lesson. Diagrams are hand-built SVG components in
`src/subjects/se/components/diagrams/`. To add a week, create
`data/weekN/` (lessons + `index.ts` with the slide list) and add it to `weeks`
in `data/course.ts`.

Rules a subject follows so it stays independent of the rest of the site:

- Its routes are relative and its links go through a base-path helper
  (see `src/subjects/os/paths.ts`).
- Its stylesheet is imported with `?inline` and mounted only while the subject
  is on screen, so Tailwind's reset never reaches the legacy pages. Tailwind
  scans only the subject's folder (`@import "tailwindcss" source("./")`).
- It restores any `<html>` attributes it changes (theme, language) on unmount.

To add a subject: create its folder, add it to `src/subjects/index.ts`, then
add a card for it to its year hub (e.g. `legacy/3rd Year/index.html`) and run
`npm run extract`.

## Regenerating content

`public/content/` and `src/data/content-pages.generated.ts` are generated from
the pages in `legacy/`. The special pages (`SqlApp.tsx`, `home.css`,
`exam2018.css`, and the standalone Data Structures 2022 exam) are generated
from the same source.

```bash
npm run generate      # regenerate every extracted page
npm run extract       # regenerate only the content fragments
npm run build:special # regenerate only the special React/standalone pages
```

Do not edit generated files by hand. `npm run build` only compiles the app; it
does not regenerate content.

## Deployment

Pushing to `main` (production) or `testing` triggers
`.github/workflows/deploy.yml`. The workflow:

1. installs dependencies with `npm ci` and builds the SPA;
2. copies the contents of `dist/` to the corresponding web root on the server
   (`/var/www/FCAI_Summaries/prod` or `/var/www/FCAI_Summaries/test`);
3. reloads nginx.

The site uses `BrowserRouter`, so nginx must fall back to `index.html` for
client-side routes. The web root must contain the **built** files, not the
repository root. A sample configuration is provided in
[`deploy/nginx.conf`](deploy/nginx.conf):

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Without that fallback, opening a route such as
`/2nd-year/software/lectures/01` directly returns a 404.
