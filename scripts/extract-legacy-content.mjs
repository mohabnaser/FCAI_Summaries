/**
 * Extract the legacy static pages into reusable HTML/CSS fragments.
 *
 * Source:  legacy/                (the original static site)
 * Output:  public/content/*.html  (body markup, no <script>/<style>)
 *          public/content/*.css   (all page styles, combined)
 *          src/data/content-pages.generated.ts
 *
 * The React app renders these fragments inside a React layout and re-implements
 * the original interactions (quizzes, flashcards, sidebar, progress bar, ...).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const legacyRoot = path.join(projectRoot, "legacy");
const contentDir = path.join(projectRoot, "public", "content");
const mediaDir = path.join(projectRoot, "public", "media");
const dataDir = path.join(projectRoot, "src", "data");

const HTML_FILES = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) HTML_FILES.push(full);
  }
}
walk(legacyRoot);

const routeByFile = new Map();
const register = (relativeFile, route) => routeByFile.set(relativeFile.replaceAll("\\", "/"), route);

register("index.html", "/");
register("2th secondary stage/index.html", "/2nd-year");
register("3rd Year/index.html", "/3rd-year");
register("2th secondary stage/DB/Home.html", "/2nd-year/database");
register("2th secondary stage/DB/ERD1.html", "/2nd-year/database/er-model");
register("2th secondary stage/DB/ERD2.html", "/2nd-year/database/eer-normalization");
register("2th secondary stage/DS/index.html", "/2nd-year/data-structures");
register("2th secondary stage/DS/2018.html", "/2nd-year/data-structures/exam-2018");
register("2th secondary stage/DS/2022.html", "/2nd-year/data-structures/exam-2022");
register("2th secondary stage/Software/index.html", "/2nd-year/software");
register("2th secondary stage/Managment/index.html", "/2nd-year/management");
register("2th secondary stage/Web/index.html", "/2nd-year/web");

for (let i = 1; i <= 19; i++) {
  const n = String(i).padStart(2, "0");
  register(`2th secondary stage/Software/lectures/lecture-${n}.html`, `/2nd-year/software/lectures/${n}`);
}
for (const chapter of ["01", "02", "03", "07", "08", "11", "13", "15", "18", "21"]) {
  register(`2th secondary stage/Managment/chapters/chapter-${chapter}.html`, `/2nd-year/management/chapters/${chapter}`);
}
register("2th secondary stage/Web/lectures/lec-html.html", "/2nd-year/web/lectures/html");
register("2th secondary stage/Web/lectures/css.html", "/2nd-year/web/lectures/css");
register("2th secondary stage/Web/lectures/js.html", "/2nd-year/web/lectures/js");
for (let i = 1; i <= 8; i++) {
  const n = String(i).padStart(2, "0");
  const candidates = [`lec-${n}.html`, `lec-${n}-django.html`];
  for (const candidate of candidates) {
    const rel = `2th secondary stage/Web/lectures/${candidate}`;
    if (fs.existsSync(path.join(legacyRoot, rel))) register(rel, `/2nd-year/web/lectures/${n}`);
  }
}

const MEDIA_ALIASES = new Map([
  ["1.png", "/media/1.png"],
  ["image-2046gffd.png", "/media/image-2046gffd.png"],
  ["2th secondary stage/1.png", "/media/1.png"],
  ["2th secondary stage/image-2046gffd.png", "/media/image-2046gffd.png"],
  ["3rd Year/1.png", "/media/1.png"],
  ["2th secondary stage/DS/2018_sol.pdf", "/media/2018-sol.pdf"],
  ["2th secondary stage/Web/3-  Midterm MCQ Questions - 2026.pdf", "/media/web-midterm-mcq-2026.pdf"],
]);

const MEDIA_COPIES = [
  ["1.png", "1.png"],
  ["image-2046gffd.png", "image-2046gffd.png"],
  ["2th secondary stage/DS/2018_sol.pdf", "2018-sol.pdf"],
  ["2th secondary stage/Web/3-  Midterm MCQ Questions - 2026.pdf", "web-midterm-mcq-2026.pdf"],
];

const CONTENT_SOURCES = [];
const add = (id, file, route) => CONTENT_SOURCES.push({ id, file, route });

// Landing / hub pages are rendered from their original markup too, so their
// layout, card copy and styling stay pixel-identical to the static site.
add("home", "index.html", "/");
add("year-2", "2th secondary stage/index.html", "/2nd-year");
add("year-3", "3rd Year/index.html", "/3rd-year");
add("software/hub", "2th secondary stage/Software/index.html", "/2nd-year/software");
add("management/hub", "2th secondary stage/Managment/index.html", "/2nd-year/management");
add("web/hub", "2th secondary stage/Web/index.html", "/2nd-year/web");
add("ds/hub", "2th secondary stage/DS/index.html", "/2nd-year/data-structures");
add("db/erd1", "2th secondary stage/DB/ERD1.html", "/2nd-year/database/er-model");
add("db/erd2", "2th secondary stage/DB/ERD2.html", "/2nd-year/database/eer-normalization");
for (let i = 1; i <= 19; i++) {
  const n = String(i).padStart(2, "0");
  add(`software/lecture-${n}`, `2th secondary stage/Software/lectures/lecture-${n}.html`, `/2nd-year/software/lectures/${n}`);
}
for (const chapter of ["01", "02", "03", "07", "08", "11", "13", "15", "18", "21"]) {
  add(`management/chapter-${chapter}`, `2th secondary stage/Managment/chapters/chapter-${chapter}.html`, `/2nd-year/management/chapters/${chapter}`);
}
for (const [file, slug] of [
  ["lec-html.html", "html"],
  ["css.html", "css"],
  ["js.html", "js"],
]) {
  add(`web/${slug}`, `2th secondary stage/Web/lectures/${file}`, `/2nd-year/web/lectures/${slug}`);
}
for (let i = 1; i <= 8; i++) {
  const n = String(i).padStart(2, "0");
  const candidates = [`lec-${n}.html`, `lec-${n}-django.html`];
  const file = candidates.find((candidate) => fs.existsSync(path.join(legacyRoot, "2th secondary stage/Web/lectures", candidate)));
  if (file) add(`web/lecture-${n}`, `2th secondary stage/Web/lectures/${file}`, `/2nd-year/web/lectures/${n}`);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function resolveLegacyPath(fromRelFile, rawPath) {
  const clean = rawPath.split("#")[0].split("?")[0].trim();
  if (!clean) return null;
  if (/^(?:[a-z]+:|\/\/|data:|javascript:)/i.test(clean)) return null;
  let rel;
  if (clean.startsWith("/")) {
    const stripped = clean.replace(/^\/+/, "");
    if (fs.existsSync(path.join(legacyRoot, stripped))) rel = stripped;
    else if (fs.existsSync(path.join(legacyRoot, "2th secondary stage", stripped))) rel = `2th secondary stage/${stripped}`;
    else return null;
  } else {
    rel = path.posix.normalize(path.posix.join(path.posix.dirname(fromRelFile.replaceAll("\\", "/")), clean));
  }
  rel = rel.replaceAll("\\", "/");
  if (rel.startsWith("../") || path.isAbsolute(rel)) return null;
  if (!fs.existsSync(path.join(legacyRoot, rel))) return null;
  return rel;
}

function mediaUrlFor(relativeFile) {
  const normalized = relativeFile.replaceAll("\\", "/");
  if (MEDIA_ALIASES.has(normalized)) return MEDIA_ALIASES.get(normalized);
  return `/media/${encodeURI(normalized)}`;
}

const unresolved = [];
function rewriteUrl(rawUrl, fromRelFile, kind) {
  const url = rawUrl.trim();
  if (!url || url.startsWith("#") || /^(?:[a-z]+:|\/\/|data:|javascript:)/i.test(url)) return rawUrl;

  const [pathPart, hashPart] = url.split("#");
  const [cleanPath, query] = pathPart.split("?");
  if (!cleanPath) return rawUrl;

  const target = resolveLegacyPath(fromRelFile, cleanPath);
  if (!target) return rawUrl;

  const suffixHash = hashPart ? `#${hashPart}` : "";
  const suffixQuery = query ? `?${query}` : "";

  if (target.endsWith(".html")) {
    const route = routeByFile.get(target);
    if (route) return `${route}${suffixHash}${suffixQuery}`;
    unresolved.push(`${fromRelFile}: ${url} -> ${target}`);
    return rawUrl;
  }

  if (kind === "link" || /\.(pdf|png|jpe?g|gif|svg|webp|md)$/i.test(target)) {
    return `${mediaUrlFor(target)}${suffixHash}${suffixQuery}`;
  }
  return rawUrl;
}

function rewriteHtml(html, fromRelFile) {
  return html.replace(/\b(href|src|action|poster)=(["'])([^"']*)\2/gi, (match, attr, quote, value) => {
    const kind = attr.toLowerCase() === "href" ? "link" : "asset";
    return `${attr}=${quote}${rewriteUrl(value, fromRelFile, kind)}${quote}`;
  });
}

function rewriteCssUrls(css, cssRelFile) {
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (match, quote, value) => {
    if (/^(?:[a-z]+:|\/\/|data:|#)/i.test(value.trim())) return match;
    const target = resolveLegacyPath(cssRelFile, value.trim());
    if (!target) return match;
    return `url(${quote}${mediaUrlFor(target)}${quote})`;
  });
}

function extractStyles(html, relFile) {
  const fromFileDir = path.posix.dirname(relFile.replaceAll("\\", "/"));
  const cssParts = [];

  // Linked local stylesheets are read from disk and inlined. This keeps every
  // extracted page self-contained (and avoids global CSS conflicts between
  // the Software / Management / Web themes).
  const linkRe = /<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi;
  for (const match of html.matchAll(linkRe)) {
    const href = match[0].match(/href=["']([^"']+)["']/i)?.[1];
    if (!href || /^(?:[a-z]+:|\/\/)/i.test(href)) continue;
    const relCss = resolveLegacyPath(relFile, href);
    if (!relCss) continue;
    const cssText = fs.readFileSync(path.join(legacyRoot, relCss), "utf8");
    cssParts.push(rewriteCssUrls(cssText, relCss));
  }

  const styleRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  for (const match of html.matchAll(styleRe)) {
    cssParts.push(rewriteCssUrls(match[1], relFile));
  }

  return cssParts.join("\n\n");
}

function stripScriptsAndStyles(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi, "");
}

function extractPage(source) {
  const fullPath = path.join(legacyRoot, source.file);
  const html = fs.readFileSync(fullPath, "utf8");
  const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) throw new Error(`No <body> in ${source.file}`);

  const bodyAttributes = bodyMatch[1] || "";
  const bodyHtml = bodyMatch[2] || "";
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? source.id;
  const htmlDir = html.match(/<html[^>]*\bdir=["']([^"']+)["']/i)?.[1] ?? "auto";
  const htmlLang = html.match(/<html[^>]*\blang=["']([^"']+)["']/i)?.[1] ?? "en";
  const bodyDir = bodyAttributes.match(/\bdir=["']([^"']+)["']/i)?.[1] ?? htmlDir;
  const bodyClass = bodyAttributes.match(/\bclass=["']([^"']+)["']/i)?.[1] ?? "";

  const css = extractStyles(html, source.file);
  const cleanedBody = stripScriptsAndStyles(bodyHtml);
  const fragment = rewriteHtml(cleanedBody, source.file).trim();

  ensureDir(path.join(contentDir, path.dirname(source.id)));
  fs.writeFileSync(path.join(contentDir, `${source.id}.html`), fragment, "utf8");
  fs.writeFileSync(path.join(contentDir, `${source.id}.css`), rewriteCssUrls(css, source.file), "utf8");

  return {
    id: source.id,
    title,
    route: source.route,
    dir: bodyDir,
    lang: htmlLang,
    bodyClass,
    hasSidebar: /<nav\b[^>]*id=["']sidebar["']/i.test(fragment),
    hasQuiz: /class=["'][^"']*q-item/i.test(fragment),
    hasFlashcards: /class=["'][^"']*flashcard/i.test(fragment),
    bytes: Buffer.byteLength(fragment),
  };
}

// Clean output directories so removed legacy pages don't linger.
fs.rmSync(contentDir, { recursive: true, force: true });
ensureDir(contentDir);
ensureDir(mediaDir);
ensureDir(dataDir);

for (const [from, to] of MEDIA_COPIES) {
  const src = path.join(legacyRoot, from);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(mediaDir, to));
}

const pages = [];
for (const source of CONTENT_SOURCES) {
  try {
    pages.push(extractPage(source));
    process.stdout.write(`  ✓ ${source.id}\n`);
  } catch (error) {
    console.error(`  ✗ ${source.id}: ${error.message}`);
    process.exitCode = 1;
  }
}

const generated = `/* AUTO-GENERATED by scripts/extract-legacy-content.mjs — do not edit by hand. */
export interface ContentPageMeta {
  id: string;
  title: string;
  route: string;
  dir: string;
  lang: string;
  bodyClass: string;
  hasSidebar: boolean;
  hasQuiz: boolean;
  hasFlashcards: boolean;
  bytes: number;
}

export const contentPages = ${JSON.stringify(
  Object.fromEntries(pages.map((page) => [page.id, page])),
  null,
  2,
)} as const satisfies Record<string, ContentPageMeta>;

export type ContentPageId = keyof typeof contentPages;
`;

fs.writeFileSync(path.join(dataDir, "content-pages.generated.ts"), generated, "utf8");

if (unresolved.length) {
  console.warn(`\nUnresolved internal links (${unresolved.length}):`);
  for (const line of unresolved) console.warn(`  - ${line}`);
}

console.log(`\nExtracted ${pages.length} content pages into public/content/`);
