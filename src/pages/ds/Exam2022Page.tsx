import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";

/**
 * The 2022 Data Structures exam is a large, self-contained DOM application
 * (particles, timer, question map, localStorage persistence, ...).  It is
 * served from /standalone/ds-2022.html and mounted in a full-screen frame so
 * its styles, scripts and state cannot leak into the React application.
 */
export default function Exam2022Page() {
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
    document.title = "CS214 — Interactive Exam 2022";

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

  return (
    <div className="exam-frame-page">
      <Link className="exam-frame-back" to="/2nd-year/data-structures">
        ← Back
      </Link>
      <iframe
        src="/standalone/ds-2022.html"
        title="CS214 Data Structures — Interactive Exam 2022"
        allow="fullscreen"
      />
    </div>
  );
}
