/* ═══════════════════════════════════════════════════════════
   DS251 Fundamentals of Management — Shared App Logic
   Progress bar · Sidebar scroll-spy · Mobile menu · Animations
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── PROGRESS BAR ─── */
  function updateProgress() {
    const bar = document.getElementById('prog-bar');
    if (!bar) return;
    const winH = window.innerHeight;
    const docH = document.documentElement.scrollHeight - winH;
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }

  /* ─── SCROLL-TO-TOP BUTTON ─── */
  function updateScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    btn.classList.toggle('show', window.scrollY > 400);
  }

  /* ─── SIDEBAR SCROLL-SPY ─── */
  function updateSidebar() {
    const links = document.querySelectorAll('.sb-link');
    if (!links.length) return;
    const scrollPos = window.scrollY + 120;
    let activeLink = null;
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.getElementById(href.substring(1));
      if (target && target.offsetTop <= scrollPos) {
        activeLink = link;
      }
    });
    links.forEach(l => l.classList.remove('active'));
    if (activeLink) activeLink.classList.add('active');
  }

  /* ─── UNIFIED SCROLL HANDLER (rAF-throttled) ─── */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        updateScrollTop();
        updateSidebar();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ─── MOBILE MENU TOGGLE ─── */
  function bindMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    if (!btn || !sidebar) return;
    btn.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.querySelectorAll('.sb-link').forEach(link => {
      link.addEventListener('click', () => sidebar.classList.remove('open'));
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') sidebar.classList.remove('open');
    });
  }

  /* ─── SCROLL-TO-TOP BUTTON CLICK ─── */
  function bindScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ─── INTERSECTION OBSERVER FADE-IN ─── */
  function setupFadeIn() {
    const opts = { threshold: 0.05, rootMargin: '0px 0px -40px 0px' };
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, opts);
    document.querySelectorAll('.topic, .cheat, .quiz-section, .lec-card, .flashcard, .cmp-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .45s ease, transform .45s ease';
      obs.observe(el);
    });
  }

  /* ─── HERO COUNTERS ─── */
  function animateCounters() {
    document.querySelectorAll('.hstat .num').forEach(el => {
      const finalText = el.textContent.trim();
      const num = parseInt(finalText, 10);
      if (isNaN(num)) return;
      let current = 0;
      const step = Math.max(1, Math.floor(num / 30));
      const interval = setInterval(() => {
        current += step;
        if (current >= num) {
          clearInterval(interval);
          el.textContent = finalText;
        } else {
          el.textContent = current;
        }
      }, 35);
    });
  }

  /* ─── FLASHCARD FLIP ─── */
  function bindFlashcards() {
    document.querySelectorAll('.flashcard').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('flipped'));
    });
  }

  /* ─── BIDI: set stable direction on mixed-language elements ─── */
  function fixBidi() {
    const ARABIC = /[\u0600-\u06FF]/;
    const LATIN = /[A-Za-z]/;
    const root = document.getElementById('main') || document.body;
    const SKIP_SELECTOR = 'script, style, pre, code, .code-wrap, textarea, input, button';

    root.querySelectorAll('*').forEach(el => {
      if (el.matches(SKIP_SELECTOR) || el.closest(SKIP_SELECTOR)) return;
      const directText = Array.from(el.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.nodeValue)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (!directText) return;
      if (ARABIC.test(directText)) {
        el.setAttribute('dir', 'rtl');
      } else if (LATIN.test(directText)) {
        el.setAttribute('dir', 'ltr');
      }
    });
    document.querySelectorAll('pre, code, .code-wrap').forEach(el => {
      el.setAttribute('dir', 'ltr');
    });
  }

  /* ─── BIDI: wrap bare Latin runs in <bdi> ─── */
  function wrapLatinRuns(root) {
    if (!root) return;
    const SKIP_TAGS = new Set(['SCRIPT','STYLE','PRE','CODE','BDI','TEXTAREA','INPUT','BUTTON']);
    const LATIN_RUN = /[A-Za-z][A-Za-z0-9'_\-]*(?:[ \t][A-Za-z][A-Za-z0-9'_\-]*)*[.,;:!?]?/g;
    const ARABIC = /[؀-ۿ]/;

    function inSkipAncestor(node) {
      let p = node.parentNode;
      while (p && p !== root && p.nodeType === 1) {
        if (SKIP_TAGS.has(p.tagName)) return true;
        if (p.classList && p.classList.contains('code-wrap')) return true;
        if (p.getAttribute && p.getAttribute('dir') === 'ltr') return true;
        p = p.parentNode;
      }
      return false;
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const targets = [];
    let n;
    while ((n = walker.nextNode())) {
      const v = n.nodeValue;
      if (!v || !/[A-Za-z]/.test(v)) continue;
      if (!ARABIC.test(v)) continue;
      if (inSkipAncestor(n)) continue;
      targets.push(n);
    }

    for (const tn of targets) {
      const text = tn.nodeValue;
      const runs = [];
      let m;
      LATIN_RUN.lastIndex = 0;
      while ((m = LATIN_RUN.exec(text)) !== null) {
        if (!m[0]) { LATIN_RUN.lastIndex++; continue; }
        runs.push({ start: m.index, end: m.index + m[0].length });
      }
      if (!runs.length) continue;
      const frag = document.createDocumentFragment();
      let last = 0;
      for (const run of runs) {
        if (run.start > last) frag.appendChild(document.createTextNode(text.slice(last, run.start)));
        const bdi = document.createElement('bdi');
        bdi.setAttribute('dir', 'ltr');
        bdi.textContent = text.slice(run.start, run.end);
        frag.appendChild(bdi);
        last = run.end;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      tn.parentNode.replaceChild(frag, tn);
    }
  }

  /* ─── INIT ─── */
  document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    updateScrollTop();
    updateSidebar();
    bindMobileMenu();
    bindScrollTop();
    setupFadeIn();
    animateCounters();
    bindFlashcards();
    fixBidi();
    wrapLatinRuns(document.getElementById('main') || document.body);
  });
})();
