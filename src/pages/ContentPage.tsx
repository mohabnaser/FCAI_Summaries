import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ContentPageMeta } from "../data/content-pages.generated";
import { enhanceLegacyPage, installLegacyGlobals } from "../lib/legacy-runtime";

interface ContentDocument {
  html: string;
  css: string;
}

const cache = new Map<string, ContentDocument>();
const inFlight = new Map<string, Promise<ContentDocument>>();

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function loadContent(id: string): Promise<ContentDocument> {
  const cached = cache.get(id);
  if (cached) return Promise.resolve(cached);

  const pending = inFlight.get(id);
  if (pending) return pending;

  const request = Promise.all([
    fetch(`${BASE}/content/${id}.html`).then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load content (${response.status})`);
      }
      return response.text();
    }),
    fetch(`${BASE}/content/${id}.css`).then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load styles (${response.status})`);
      }
      return response.text();
    }),
  ])
    .then(([html, css]) => {
      const payload = { html, css };
      cache.set(id, payload);
      inFlight.delete(id);
      return payload;
    })
    .catch((error: unknown) => {
      inFlight.delete(id);
      throw error;
    });

  inFlight.set(id, request);
  return request;
}

export default function ContentPage({ page }: { page: ContentPageMeta }) {
  const [content, setContent] = useState<ContentDocument | null>(null);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    setContent(null);
    setError(null);

    loadContent(page.id)
      .then((loaded) => {
        if (!cancelled) setContent(loaded);
      })
      .catch((reason: unknown) => {
        if (!cancelled) {
          setError(
            reason instanceof Error ? reason.message : "Could not load page.",
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [page.id]);

  /* Set document-level direction/title exactly like the original page. */
  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlDir: html.getAttribute("dir"),
      htmlLang: html.getAttribute("lang"),
      bodyDir: body.getAttribute("dir"),
      bodyClass: body.className,
      title: document.title,
    };

    html.setAttribute("dir", page.dir || "auto");
    html.setAttribute("lang", page.lang || "en");

    if (page.dir && page.dir !== "auto") body.setAttribute("dir", page.dir);
    else body.removeAttribute("dir");

    body.className = page.bodyClass;
    document.title =
      page.route === "/"
        ? "FCAI — Revisions"
        : `${page.title} — FCAI Summaries`;

    return () => {
      if (previous.htmlDir === null) html.removeAttribute("dir");
      else html.setAttribute("dir", previous.htmlDir);
      if (previous.htmlLang === null) html.removeAttribute("lang");
      else html.setAttribute("lang", previous.htmlLang);
      if (previous.bodyDir === null) body.removeAttribute("dir");
      else body.setAttribute("dir", previous.bodyDir);
      body.className = previous.bodyClass;
      document.title = previous.title;
    };
  }, [page]);

  /* Install globals once, then wire the fragment's behaviours. */
  useEffect(() => {
    installLegacyGlobals();
  }, []);

  useEffect(() => {
    const root = contentRef.current;
    if (!root || !content) return;

    const cleanup = enhanceLegacyPage(root, page.id, page.dir);

    return cleanup;
  }, [content, page.dir, page.id]);

  /* Internal links are plain <a> elements inside the fragment. */
  useEffect(() => {
    const root = contentRef.current;
    if (!root || !content) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || !root.contains(anchor)) return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (/^\/(?:media|content|standalone|assets)\//.test(url.pathname)) {
        return;
      }

      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`);
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [content, navigate]);

  /* Scroll to a #section once the fragment has actually rendered. */
  useEffect(() => {
    if (!content || !location.hash) return;
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [content, location.hash]);

  if (error) {
    return (
      <div className="page-state">
        <div className="page-state-card">
          <div className="page-state-icon">⚠️</div>
          <h1>Could not load this page</h1>
          <p>{error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="page-state">
        <div className="page-loader" aria-label="Loading page" />
        <p className="page-state-label">Loading {page.title}…</p>
      </div>
    );
  }

  return (
    <div className="legacy-page" data-page-id={page.id}>
      <style>{content.css}</style>
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </div>
  );
}
