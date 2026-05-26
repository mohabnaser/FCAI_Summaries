/* ═══════════════════════════════════════════════════════════
   CS251 Software Engineering — Shared App Logic
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
    document.querySelectorAll('.topic, .cheat, .quiz-section, .lec-card, .flashcard, .kw-card, .cmp-card').forEach(el => {
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

  /* ─── ARIANE 5 OVERFLOW VISUALIZER ─── */
  function bindOverflowViz() {
    const trigger = document.getElementById('ov-trigger');
    if (!trigger) return;
    const steps = document.querySelectorAll('.ov-step');
    trigger.addEventListener('click', () => {
      steps.forEach(s => { s.classList.remove('active', 'danger'); });
      steps.forEach((s, i) => {
        setTimeout(() => {
          s.classList.add('active');
          if (i === steps.length - 1) s.classList.add('danger');
        }, i * 650);
      });
    });
  }

  /* ─── ARABIC RTL MARKER FOR MIXED TEXT ─── */
  function fixBidi() {
    document.querySelectorAll(
      'p, li, td, th, .topic-title, .ch-title p, .tip div, .warn div, .info div, .danger div, .q-text, .q-explain, .cheat-val, .cmt, .q-opt, .hero p, .topic p, .q-num, .tl-desc, .cmp-card p, .kw-card .kw-desc'
    ).forEach(el => {
      const text = el.textContent;
      if (/[؀-ۿ]/.test(text) && !text.startsWith('‏') && !/^[\s]*[A-Za-z]/.test(text)) {
        el.innerHTML = '&#x200F;' + el.innerHTML;
      }
    });
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
    bindOverflowViz();
    fixBidi();
  });
})();
