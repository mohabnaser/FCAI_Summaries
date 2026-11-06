import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import cssText from "./exam2018.css?raw";

/**
 * 2018 Data Structures essay exam — a styled PDF viewer.
 * The original page used an <iframe> plus a mobile fallback.
 */
export default function Exam2018Page() {
  const [showFallback, setShowFallback] = useState(false);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlDir: html.getAttribute("dir"),
      htmlLang: html.getAttribute("lang"),
      bodyDir: body.getAttribute("dir"),
      title: document.title,
    };

    html.setAttribute("dir", "ltr");
    html.setAttribute("lang", "en");
    body.setAttribute("dir", "ltr");
    document.title = "Final Exam 2018 — Solutions | Data Structures";

    return () => {
      if (previous.htmlDir === null) html.removeAttribute("dir");
      else html.setAttribute("dir", previous.htmlDir);
      if (previous.htmlLang === null) html.removeAttribute("lang");
      else html.setAttribute("lang", previous.htmlLang);
      if (previous.bodyDir === null) body.removeAttribute("dir");
      else body.setAttribute("dir", previous.bodyDir);
      document.title = previous.title;
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    if (!/Android|iPhone|iPad/i.test(navigator.userAgent)) return;

    const timer = window.setTimeout(() => setShowFallback(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{cssText}</style>

      <div className="pdf-page">
        <Link className="back-home" to="/2nd-year/data-structures">
          ↩ Back
        </Link>

        <header className="viewer-header">
          <div className="viewer-icon">📄</div>
          <div className="viewer-info">
            <div className="viewer-title">Final Exam 2018 — Solutions</div>
            <div className="viewer-sub">
              CS214 · Data Structures · Essay Questions
            </div>
          </div>
          <a
            className="download-btn"
            href="/media/2018-sol.pdf"
            download
          >
            ⬇ Download PDF
          </a>
        </header>

        {!showFallback && (
          <div className="pdf-container" id="pdfContainer">
            <iframe
              id="pdfFrame"
              src="/media/2018-sol.pdf"
              title="2018 Final Exam Solutions"
              onError={() => setShowFallback(true)}
            />
          </div>
        )}

        {showFallback && (
          <div className="pdf-fallback" id="pdfFallback">
            <div className="fallback-icon">📄</div>
            <p>
              Your browser doesn't support inline PDF viewing. Click below to
              download the exam.
            </p>
            <a
              className="download-btn"
              href="/media/2018-sol.pdf"
              download
            >
              ⬇ Download PDF
            </a>
          </div>
        )}
      </div>
    </>
  );
}
