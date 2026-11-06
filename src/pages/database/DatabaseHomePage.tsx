import { useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import App from "./SqlApp";
import cssText from "./home.css?raw";

/**
 * The SQL tutorial from DB/Home.html is already a React application.  It is
 * generated into SqlApp.tsx, and this page supplies the surrounding chrome
 * (home button, database top-navigation and the original stylesheet).
 */
export default function DatabaseHomePage() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlDir: html.getAttribute("dir"),
      htmlLang: html.getAttribute("lang"),
      bodyDir: body.getAttribute("dir"),
      title: document.title,
    };

    html.setAttribute("dir", "rtl");
    html.setAttribute("lang", "ar");
    body.removeAttribute("dir");
    document.title = "SQL + Quiz — Database Systems";

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

  /* Hide the floating database nav while scrolling down, like the original. */
  useEffect(() => {
    const nav = document.getElementById("globalTopNav");
    if (!nav) return;

    let lastY = window.scrollY;
    const onScroll = (event: Event) => {
      const target = event.target as HTMLElement | Document;
      const scrollTop =
        "scrollTop" in target && target.scrollTop
          ? target.scrollTop
          : window.scrollY;

      if (scrollTop > lastY && scrollTop > 60) nav.classList.add("hidden");
      else nav.classList.remove("hidden");
      lastY = scrollTop;
    };

    document.addEventListener("scroll", onScroll, true);
    return () => document.removeEventListener("scroll", onScroll, true);
  }, []);

  return (
    <>
      <style>{cssText}</style>

      <Link className="home-btn" to="/2nd-year">
        ↩ العودة للرئيسية
      </Link>

      <App />

      <div className="global-top-nav" id="globalTopNav">
        <Link to="/2nd-year/database" className="gnav-item active">
          <div className="gnav-dot" />
          SQL Basics
        </Link>
        <Link to="/2nd-year/database/er-model" className="gnav-item">
          <div className="gnav-dot" />
          ER &amp; Mapping
        </Link>
        <Link to="/2nd-year/database/eer-normalization" className="gnav-item">
          <div className="gnav-dot" />
          EER &amp; Norm
        </Link>
      </div>
    </>
  );
}
