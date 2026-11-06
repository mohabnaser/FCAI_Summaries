/**
 * Generate the special (non-fragment) React pages from the legacy sources:
 *
 *   src/pages/database/SqlApp.tsx     ← legacy DB/Home.html React+Babel app
 *   src/pages/database/home.css       ← legacy DB/Home.html inline styles
 *   src/pages/ds/exam2018.css         ← legacy DS/2018.html inline styles
 *   public/standalone/ds-2022.html    ← legacy DS/2022.html (self-contained exam)
 *
 * Run with: node scripts/build-special-pages.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const legacy = path.join(root, "legacy");

function read(rel) {
  return fs.readFileSync(path.join(legacy, rel), "utf8");
}

function ensure(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

/* ------------------------------------------------------------------ */
/* Database Home (React 18 UMD + Babel app)                            */
/* ------------------------------------------------------------------ */

const dbHtml = read("2th secondary stage/DB/Home.html");
const dbStyle = dbHtml.match(/<style>([\s\S]*?)<\/style>/);
const dbScript = dbHtml.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!dbStyle || !dbScript) throw new Error("DB Home: missing style/babel script");

const dbCssPath = path.join(root, "src", "pages", "database", "home.css");
ensure(dbCssPath);
fs.writeFileSync(dbCssPath, dbStyle[1].trimStart(), "utf8");

let appSource = dbScript[1].trim();
const mountPattern = /ReactDOM\.render\(\s*<App\s*\/>\s*,\s*document\.getElementById\(["']root["']\)\s*\);/;
if (!mountPattern.test(appSource)) {
  throw new Error("DB Home: could not find ReactDOM.render mount point");
}
appSource = appSource.replace(mountPattern, "export default App;");
appSource = `// @ts-nocheck
/* eslint-disable */
/* AUTO-GENERATED from legacy/2th secondary stage/DB/Home.html — do not edit. */
import React from "react";

${appSource}
`;

const sqlAppPath = path.join(root, "src", "pages", "database", "SqlApp.tsx");
ensure(sqlAppPath);
fs.writeFileSync(sqlAppPath, appSource, "utf8");

/* ------------------------------------------------------------------ */
/* Data Structures 2018 PDF viewer                                     */
/* ------------------------------------------------------------------ */

const ds2018Html = read("2th secondary stage/DS/2018.html");
const ds2018Style = ds2018Html.match(/<style>([\s\S]*?)<\/style>/);
if (!ds2018Style) throw new Error("DS 2018: missing style");

const ds2018CssPath = path.join(root, "src", "pages", "ds", "exam2018.css");
ensure(ds2018CssPath);
fs.writeFileSync(ds2018CssPath, ds2018Style[1].trimStart(), "utf8");

/* ------------------------------------------------------------------ */
/* Data Structures 2022 exam (standalone, rendered in an iframe)       */
/* ------------------------------------------------------------------ */

const ds2022Html = read("2th secondary stage/DS/2022.html");
const standalonePath = path.join(root, "public", "standalone", "ds-2022.html");
ensure(standalonePath);
fs.writeFileSync(standalonePath, ds2022Html, "utf8");

console.log("Generated:");
console.log("  src/pages/database/SqlApp.tsx");
console.log("  src/pages/database/home.css");
console.log("  src/pages/ds/exam2018.css");
console.log("  public/standalone/ds-2022.html");
