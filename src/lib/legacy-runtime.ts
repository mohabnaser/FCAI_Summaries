/* -------------------------------------------------------------------------
   Legacy interactions, ported from the original static-site scripts.

   The lecture pages are stored as HTML fragments (so their content is kept
   byte-for-byte), which means a few inline onclick handlers still expect
   globals such as checkQuiz()/resetQuiz()/calcSUS().  This module provides
   those globals and attaches the non-inline behaviours (progress bar,
   scroll-spy, bidi isolation, flashcards, tabs, ...) to whatever fragment is
   currently mounted.
------------------------------------------------------------------------- */

const ARABIC = /[\u0600-\u06FF]/;
const LATIN = /[A-Za-z]/;

type Cleanup = () => void;

function getById<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function all<T extends Element>(parent: ParentNode, selector: string): T[] {
  return Array.from(parent.querySelectorAll<T>(selector));
}

function normalize(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

function optionValue(option: Element, item: Element): string {
  const explicit = option.getAttribute("data-val");
  if (explicit) return explicit;

  const onclick = option.getAttribute("onclick") ?? "";
  const choice = onclick.match(
    /select(?:TF|MCQ)\(\s*[^,]+,\s*['"]([^'"]+)['"]/i,
  );
  if (choice) return choice[1];

  const options = all<Element>(item, ".q-opt");
  const index = options.indexOf(option);
  return index >= 0 ? String.fromCharCode(65 + index) : "";
}

function correctValue(item: Element): string {
  const stored = item.getAttribute("data-correct");
  if (stored) return stored;

  for (const option of all<Element>(item, ".q-opt[onclick]")) {
    const onclick = option.getAttribute("onclick") ?? "";
    const match = onclick.match(
      /select(?:TF|MCQ)\(\s*[^,]+,\s*[^,]+,\s*['"]([^'"]+)['"]/i,
    );
    if (match) {
      item.setAttribute("data-correct", match[1]);
      return match[1];
    }
  }
  return "";
}

function hydrateAnswers(root: ParentNode): void {
  all<HTMLElement>(root, ".q-item").forEach((item) => {
    correctValue(item);
  });
}

function quizFeedback(pct: number): string {
  const messages =
    pct < 50
      ? ["متروحش تمتحن أحسن 😁 افتح الشرح وخد جولة تانية."]
      : pct < 70
        ? ["مش وحش، بس لسه في كام سؤال عاملين نفسهم managers."]
        : pct < 90
          ? ["أداء محترم. راجع الغلطات دي ."]
          : ["جامد جدًا. كده الـ chapter تحت السيطرة 🔥"];
  return messages[Math.floor(Math.random() * messages.length)];
}

function scoreElementFor(
  section: HTMLElement,
  scoreId?: string,
): HTMLElement | null {
  if (scoreId) {
    const explicit = getById(scoreId);
    if (explicit) return explicit;
  }

  const inside = section.querySelector<HTMLElement>(".q-score");
  if (inside) return inside;

  if (section.id.startsWith("quiz-")) {
    const sibling = getById(`score-${section.id.slice(5)}`);
    if (sibling) return sibling;
  }

  return getById("score-main");
}

function paintScore(
  element: HTMLElement,
  correct: number,
  total: number,
  pct: number,
  attempted: number,
): void {
  const state = pct >= 80 ? "good" : pct >= 50 ? "ok" : "bad";
  const emoji = state === "good" ? "🎉" : state === "ok" ? "💪" : "📚";

  element.classList.remove("good", "ok", "bad");
  element.classList.add(state);
  element.style.display = "block";
  element.style.color =
    state === "good"
      ? "var(--green, #10b981)"
      : state === "ok"
        ? "var(--amber, #f59e0b)"
        : "var(--red, #ef4444)";

  const unanswered =
    attempted === 0
      ? '<div class="q-feedback">No answers selected — the correct options are highlighted above.</div>'
      : "";

  element.innerHTML =
    `${emoji} <strong>${correct} / ${total}</strong> — ${pct}%` +
    unanswered +
    `<div class="q-feedback">${quizFeedback(pct)}</div>`;
}

export function checkQuiz(sectionId: string, scoreId?: string): void {
  const section = getById(sectionId);
  if (!section) return;

  const items = all<HTMLElement>(section, ".q-item");
  const total = items.length;
  let correct = 0;
  let attempted = 0;
  const scrollAfterCheck = Boolean(section.querySelector(".q-score"));

  items.forEach((item) => {
    const right = normalize(correctValue(item));
    const options = all<HTMLElement>(item, ".q-opt");
    const selected = item.querySelector<HTMLElement>(".q-opt.selected");

    options.forEach((option) => option.classList.remove("correct", "wrong"));
    options.forEach((option) => {
      if (right && normalize(optionValue(option, item)) === right) {
        option.classList.add("correct");
      }
    });

    if (selected) {
      attempted += 1;
      const value = normalize(optionValue(selected, item));
      if (value && value === right) correct += 1;
      else selected.classList.add("wrong");
    }

    const explanation = item.querySelector<HTMLElement>(".q-explain");
    if (explanation) {
      explanation.classList.add("show");
      explanation.style.display = "block";
    }

    item.dataset.graded = "true";
    item.classList.add("answered");
    options.forEach((option) => {
      option.style.pointerEvents = "none";
      if (option instanceof HTMLButtonElement) option.disabled = true;
    });
  });

  const pct = total ? Math.round((correct / total) * 100) : 0;
  const scoreElement = scoreElementFor(section, scoreId);
  if (scoreElement) paintScore(scoreElement, correct, total, pct, attempted);

  if (scrollAfterCheck) {
    const firstWrong = section.querySelector<HTMLElement>(".q-opt.wrong");
    if (firstWrong) {
      window.setTimeout(() => {
        firstWrong.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 180);
    }
  }
}

export function resetQuiz(sectionId: string, scoreId?: string): void {
  const section = getById(sectionId);
  if (!section) return;

  all<HTMLElement>(section, ".q-item").forEach((item) => {
    item.dataset.graded = "false";
    delete item.dataset.selected;
    item.classList.remove("answered");
    all<HTMLElement>(item, ".q-opt").forEach((option) => {
      option.classList.remove("selected", "correct", "wrong");
      option.style.pointerEvents = "";
      if (option instanceof HTMLButtonElement) option.disabled = false;
    });
    const explanation = item.querySelector<HTMLElement>(".q-explain");
    if (explanation) {
      explanation.classList.remove("show");
      explanation.style.display = "";
    }
  });

  const scoreElement = scoreElementFor(section, scoreId);
  if (scoreElement) {
    scoreElement.style.display = "none";
    scoreElement.style.color = "";
    scoreElement.classList.remove("good", "ok", "bad");
    scoreElement.innerHTML = "";
  }
}

function selectAnswer(qid: string, choice: string, correct?: string): void {
  const item = getById(qid);
  if (!item) return;

  const options = all<HTMLElement>(item, ".q-opt");
  options.forEach((option) =>
    option.classList.remove("selected", "correct", "wrong"),
  );

  const index = choice.toUpperCase().charCodeAt(0) - 65;
  options[index]?.classList.add("selected");
  item.dataset.selected = choice;
  if (correct) item.dataset.correct = correct;
}

export function selectTF(qid: string, choice: string, correct?: string): void {
  selectAnswer(qid, choice, correct);
}

export function selectMCQ(qid: string, choice: string, correct?: string): void {
  selectAnswer(qid, choice, correct);
}

export function checkTF(): void {
  if (getById("quiz-tf")) checkQuiz("quiz-tf", "score-tf");
}

export function checkMCQ(): void {
  if (getById("quiz-mcq")) checkQuiz("quiz-mcq", "score-mcq");
}

export function resetTF(): void {
  if (getById("quiz-tf")) resetQuiz("quiz-tf", "score-tf");
}

export function resetMCQ(): void {
  if (getById("quiz-mcq")) resetQuiz("quiz-mcq", "score-mcq");
}

export function calcSUS(): void {
  let oddSum = 0;
  let evenSum = 0;
  let allValid = true;

  for (let i = 1; i <= 10; i += 1) {
    const input = document.querySelector<HTMLInputElement>(
      `.sus-input[data-q="${i}"]`,
    );
    if (!input) {
      allValid = false;
      continue;
    }
    const value = Number.parseInt(input.value, 10);
    if (Number.isNaN(value) || value < 1 || value > 5) {
      allValid = false;
      input.style.borderColor = "var(--red)";
      continue;
    }
    input.style.borderColor = "var(--border)";
    if (i % 2 === 1) oddSum += value - 1;
    else evenSum += 5 - value;
  }

  const result = getById("sus-result");
  if (!result) return;

  if (!allValid) {
    result.style.display = "block";
    const score = getById("sus-score");
    const grade = getById("sus-grade");
    const detail = getById("sus-detail");
    if (score) score.textContent = "!";
    if (grade) {
      grade.textContent = "أدخل قيم من 1 إلى 5";
      grade.className = "sus-result-label bad";
    }
    if (detail) detail.textContent = "";
    return;
  }

  const total = oddSum + evenSum;
  const score = (total * 2.5).toFixed(1);
  const numeric = Number.parseFloat(score);
  let grade: string;
  let gradeClass: string;

  if (numeric >= 80.3) {
    grade = "A — Excellent · People love it";
    gradeClass = "good";
  } else if (numeric >= 68) {
    grade = "C — Above average · OK but can improve";
    gradeClass = "good";
  } else if (numeric >= 51) {
    grade = "D — Below average · Needs improvement";
    gradeClass = "ok";
  } else {
    grade = "F — Make usability priority NOW";
    gradeClass = "bad";
  }

  const detail = `Odd sum = ${oddSum} · Even sum = ${evenSum} · Total = ${total} · × 2.5 = ${score}`;
  result.style.display = "block";
  const scoreElement = getById("sus-score");
  const gradeElement = getById("sus-grade");
  const detailElement = getById("sus-detail");
  if (scoreElement) scoreElement.textContent = score;
  if (gradeElement) {
    gradeElement.textContent = grade;
    gradeElement.className = `sus-result-label ${gradeClass}`;
  }
  if (detailElement) detailElement.textContent = detail;
}

export function toggleSidebar(): void {
  getById("sidebar")?.classList.toggle("open");
  getById("overlay")?.classList.toggle("open");
}

export function closeSidebar(): void {
  getById("sidebar")?.classList.remove("open");
  getById("overlay")?.classList.remove("open");
}

export function getQuizFeedback(pct: number): string {
  return quizFeedback(pct);
}

let globalsInstalled = false;

export function installLegacyGlobals(): void {
  if (globalsInstalled) return;
  globalsInstalled = true;

  Object.assign(window, {
    checkQuiz,
    resetQuiz,
    selectTF,
    selectMCQ,
    checkTF,
    checkMCQ,
    resetTF,
    resetMCQ,
    calcSUS,
    toggleSidebar,
    closeSidebar,
    getQuizFeedback,
  });
}

/* -------------------------------------------------------------------------
   Code highlighting (Web lecture 07)
------------------------------------------------------------------------- */

function highlightCodeBlocks(root: ParentNode): void {
  const escapeHtml = (text: string): string =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const wrapLines = (html: string): string =>
    html
      .split("\n")
      .map((line) => `<span class="code-line">${line || "&nbsp;"}</span>`)
      .join("");

  all<HTMLElement>(root, ".code-wrap pre code").forEach((code) => {
    if (code.dataset.highlighted === "true") return;
    code.dataset.highlighted = "true";

    const tokens: { key: string; html: string }[] = [];
    const tokenKey = (index: number): string => {
      let n = index + 1;
      let key = "";
      while (n > 0) {
        n -= 1;
        key = String.fromCharCode(65 + (n % 26)) + key;
        n = Math.floor(n / 26);
      }
      return `CODETOKEN${key}PLACEHOLDER`;
    };
    const stash = (html: string): string => {
      const key = tokenKey(tokens.length);
      tokens.push({ key, html });
      return key;
    };

    const htmlTag = (
      _match: string,
      open: string,
      tag: string,
      attrs: string,
      close: string,
    ): string => {
      const coloredAttrs = attrs.replace(
        /([\w:-]+)(=)(&quot;.*?&quot;|&#39;.*?&#39;)/g,
        '<span class="tok-attr">$1</span>$2<span class="tok-string">$3</span>',
      );
      return stash(
        `<span class="tok-punc">${open}</span><span class="tok-tag">${tag}</span>${coloredAttrs}<span class="tok-punc">${close}</span>`,
      );
    };

    let html = escapeHtml((code.textContent ?? "").replace(/\n$/, ""));

    html = html.replace(
      /(&lt;\/?)([a-zA-Z][\w:-]*)(.*?)(\/?&gt;)/g,
      htmlTag,
    );
    html = html.replace(/({#.*?#})/g, (match) =>
      stash(`<span class="tok-comment">${match}</span>`),
    );
    html = html.replace(/({{.*?}})/g, (match) => {
      const inner = match.replace(
        /\|([a-zA-Z_]\w*)/g,
        '|<span class="tok-filter">$1</span>',
      );
      return stash(`<span class="tok-var">${inner}</span>`);
    });
    html = html.replace(/({%.*?%})/g, (match) => {
      const inner = match.replace(
        /\b(for|if|elif|else|endif|endfor|empty|extends|block|endblock|include|load|static|url|csrf_token|with|endwith|comment|endcomment|autoescape|endautoescape|in)\b/g,
        '<span class="tok-keyword">$1</span>',
      );
      return stash(`<span class="tok-django">${inner}</span>`);
    });
    html = html.replace(
      /(&quot;.*?&quot;|&#39;.*?&#39;)/g,
      (match) => stash(`<span class="tok-string">${match}</span>`),
    );
    html = html.replace(
      /(^|\s)(#(?![0-9a-fA-F]{3,8}\b).*)$/gm,
      (_, lead: string, comment: string) =>
        `${lead}${stash(`<span class="tok-comment">${comment}</span>`)}`,
    );
    html = html.replace(
      /\b(from|import|def|class|return|if|elif|else|for|in|True|False|None|and|or|not)\b/g,
      '<span class="tok-keyword">$1</span>',
    );
    html = html.replace(
      /\b([A-Za-z_]\w*)(?=\()/g,
      '<span class="tok-function">$1</span>',
    );
    html = html.replace(
      /\b([a-z-]+)(?=\s*:)/g,
      '<span class="tok-property">$1</span>',
    );
    html = html.replace(
      /(^|\n)([a-zA-Z.#][\w.#-]*)(?=\s*\{)/g,
      '$1<span class="tok-selector">$2</span>',
    );
    html = html.replace(
      /\b(\d+(?:\.\d+)?)\b/g,
      '<span class="tok-number">$1</span>',
    );
    tokens.forEach((token) => {
      html = html.split(token.key).join(token.html);
    });

    code.innerHTML = wrapLines(html);
  });
}

/* -------------------------------------------------------------------------
   Bidi isolation for mixed Arabic / English paragraphs
------------------------------------------------------------------------- */

function hasRtlAncestor(node: Node, root: HTMLElement): boolean {
  let parent = node.parentElement;
  while (parent && parent !== root && parent.nodeType === 1) {
    if (parent.getAttribute("dir") === "rtl") return true;
    if (parent.getAttribute("dir") === "ltr") return false;
    parent = parent.parentElement;
  }
  return document.documentElement.dir === "rtl";
}

function applyBidi(root: HTMLElement, pageDir: string): void {
  const skipSelector =
    "script, style, pre, code, textarea, input, select, svg, .code-wrap, .code-header, .code-dots";
  const alignWhenLtr = pageDir !== "rtl";

  root.querySelectorAll<HTMLElement>("*").forEach((element) => {
    if (element.closest(skipSelector)) return;

    const directText = Array.from(element.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.nodeValue ?? "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (!directText) return;

    if (ARABIC.test(directText)) {
      element.setAttribute("dir", "rtl");
      if (
        alignWhenLtr &&
        /^(P|LI|TD|TH|H1|H2|H3|H4|H5|H6|BLOCKQUOTE)$/.test(element.tagName)
      ) {
        element.style.textAlign = "right";
      }
    } else if (LATIN.test(directText)) {
      element.setAttribute("dir", "ltr");
    }
  });

  all<HTMLElement>(root, "pre, code, .code-wrap, .diagram pre").forEach(
    (element) => element.setAttribute("dir", "ltr"),
  );
}

/* The Web CSS/JS lectures use their own inline bidi helper (a scoped subset
   of the shared Software/Management behaviour).  Port it separately so those
   pages keep the exact original selector list and wrapping rules. */
function applyInlineBidi(root: HTMLElement): void {
  const arabic = /[\u0600-\u06FF]/;
  const latin = /[A-Za-z]/;
  const latinRun =
    /([A-Za-z0-9][A-Za-z0-9_$.[\]{}():/#%&=+\-'"<>]*[?!]?(?:\s+[A-Za-z0-9][A-Za-z0-9_$.[\]{}():/#%&=+\-'"<>]*[?!]?)*)/g;
  const inlineTags = new Set([
    "A",
    "ABBR",
    "B",
    "BDI",
    "BR",
    "CODE",
    "EM",
    "I",
    "KBD",
    "MARK",
    "SMALL",
    "SPAN",
    "STRONG",
    "SUB",
    "SUP",
    "U",
  ]);
  const textSelector = [
    ".hero p",
    ".hero-badge",
    "#sidebar .sb-link",
    ".global-nav .gn-link",
    ".content p",
    ".content li",
    ".content td",
    ".content th",
    ".content h1",
    ".content h2",
    ".content h3",
    ".content h4",
    ".content h5",
    ".content h6",
    ".content div",
    ".q-text",
    ".q-opt",
    ".q-explain",
    ".cheat-val",
    ".q-num",
  ].join(",");

  const isTextElement = (element: HTMLElement): boolean => {
    if (
      element.closest(
        "pre, code, .code-wrap, .code-header, .code-dots, script, style",
      )
    ) {
      return false;
    }
    const children = Array.from(element.children);
    if (!children.length) return true;
    return children.every((child) => inlineTags.has(child.tagName));
  };

  const textElements: HTMLElement[] = [];
  root.querySelectorAll<HTMLElement>(textSelector).forEach((element) => {
    if (!isTextElement(element)) return;
    const text = element.textContent?.trim() ?? "";
    if (!text) return;
    textElements.push(element);
    if (arabic.test(text)) {
      element.setAttribute("dir", "rtl");
      element.style.textAlign = "right";
    } else if (latin.test(text)) {
      element.setAttribute("dir", "ltr");
    }
  });

  for (const element of textElements) {
    const contents = element.textContent ?? "";
    if (!arabic.test(contents) || !latin.test(contents)) continue;

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue?.trim() || !latin.test(node.nodeValue)) {
          return NodeFilter.FILTER_REJECT;
        }
        if (node.parentElement?.closest("pre, code, .code-wrap, bdi")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);

    for (const node of nodes) {
      const text = node.nodeValue ?? "";
      latinRun.lastIndex = 0;
      if (!latinRun.test(text)) continue;
      latinRun.lastIndex = 0;

      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      text.replace(latinRun, (match, _run, offset: number) => {
        if (offset > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.slice(lastIndex, offset)),
          );
        }
        const bdi = document.createElement("bdi");
        bdi.setAttribute("dir", "ltr");
        bdi.className = "bdi-ltr";
        bdi.textContent = match;
        fragment.appendChild(bdi);
        lastIndex = offset + match.length;
        return match;
      });
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
      node.replaceWith(fragment);
    }
  }

  root
    .querySelectorAll<HTMLElement>("pre, pre *, code, .code-wrap, .code-wrap *")
    .forEach((element) => element.setAttribute("dir", "ltr"));
}

/* The Web CSS lecture has a much smaller inline helper than the JS lecture:
   it only marks elements containing Arabic as RTL.  It never sets LTR and
   never inserts <bdi>. */
function applyCssBidi(root: HTMLElement): void {
  root
    .querySelectorAll<HTMLElement>(
      "p, li, td, th, .topic-title, .ch-title p, .tip div, .warn div, .info div, .danger div, .note div, .q-text, .q-explain, .cheat-val, .cmt, .q-opt, .hero p, .topic p, .q-num",
    )
    .forEach((element) => {
      if (!/[\u0600-\u06FF]/.test(element.textContent ?? "")) return;
      element.setAttribute("dir", "rtl");
      element.style.textAlign = "right";
    });
}

function isolateLatinRuns(root: HTMLElement): void {
  const latinRun =
    /[A-Za-z][A-Za-z0-9'_\-]*(?:\([A-Za-z0-9+\-*/_. ]+\))?(?:[ \t][A-Za-z][A-Za-z0-9'_\-]*(?:\([A-Za-z0-9+\-*/_. ]+\))?)*[.,;:!?]?/g;

  /* Wrapping a run in <bdi> turns it into a flex/grid item when its parent is
     a flex/grid container.  A single text node with several Latin runs then
     becomes several layout items, which breaks boxes such as .tip/.danger
     (and can make a long page overflow horizontally).  Those parents keep
     their original text layout instead. */
  const itemDisplay = /^(?:inline-)?(?:flex|grid)$/;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest("script, style, pre, code, textarea, input, bdi")) {
        return NodeFilter.FILTER_REJECT;
      }
      if (itemDisplay.test(getComputedStyle(parent).display)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (!hasRtlAncestor(node, root)) return NodeFilter.FILTER_REJECT;
      if (!LATIN.test(node.nodeValue ?? "")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const targets: Text[] = [];
  while (walker.nextNode()) targets.push(walker.currentNode as Text);

  for (const node of targets) {
    const text = node.nodeValue ?? "";
    latinRun.lastIndex = 0;
    if (!latinRun.test(text)) continue;
    latinRun.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    text.replace(latinRun, (match, offset: number) => {
      if (offset > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, offset)),
        );
      }
      const bdi = document.createElement("bdi");
      bdi.setAttribute("dir", "ltr");
      bdi.className = "bdi-ltr";
      bdi.textContent = match;
      fragment.appendChild(bdi);
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    node.replaceWith(fragment);
  }
}

/* -------------------------------------------------------------------------
   Page enhancer
------------------------------------------------------------------------- */

export function enhanceLegacyPage(
  root: HTMLElement,
  pageId: string,
  pageDir: string,
): Cleanup {
  const cleanups: Cleanup[] = [];
  const timeouts = new Set<number>();
  const intervals = new Set<number>();
  let disposed = false;

  const listen = (
    target: EventTarget,
    type: string,
    handler: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions | boolean,
  ): void => {
    target.addEventListener(type, handler, options);
    cleanups.push(() => target.removeEventListener(type, handler, options));
  };

  const later = (callback: () => void, delay: number): number => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      if (!disposed) callback();
    }, delay);
    timeouts.add(id);
    return id;
  };

  hydrateAnswers(root);

  if (pageId === "web/lecture-07") {
    highlightCodeBlocks(root);
  }

  /* Only pages whose legacy source opted into bidi processing get it.  The
     DB/DS pages and the Management chapters have no such script, and applying
     it there changes the direction (and therefore the flex order) of titles
     such as ".topic-title". */
  if (pageId.startsWith("software/") || pageId === "management/hub") {
    const bidiRoot = root.querySelector<HTMLElement>("#main") ?? root;
    applyBidi(bidiRoot, pageDir);
    isolateLatinRuns(bidiRoot);
  } else if (pageId === "web/css") {
    applyCssBidi(root);
  } else if (pageId === "web/js") {
    applyInlineBidi(root);
  }

  /* Option selection -------------------------------------------------- */
  listen(root, "click", (event) => {
    const target = event.target as Element | null;
    const option = target?.closest<HTMLElement>(".q-opt");
    if (!option || !root.contains(option)) return;

    const item = option.closest<HTMLElement>(".q-item");
    if (!item) return;
    if (item.dataset.graded === "true" || item.classList.contains("answered")) {
      return;
    }
    if (option.style.pointerEvents === "none") return;
    if (option instanceof HTMLButtonElement && option.disabled) return;

    const options = all<HTMLElement>(item, ".q-opt");
    options.forEach((candidate) => candidate.classList.remove("selected"));
    option.classList.add("selected");
    item.dataset.selected = optionValue(option, item);
  });

  /* Flashcards that don't already use an inline onclick ---------------- */
  all<HTMLElement>(root, ".flashcard").forEach((card) => {
    if (card.hasAttribute("onclick")) return;
    listen(card, "click", () => card.classList.toggle("flipped"));
  });

  /* Example tabs ------------------------------------------------------- */
  const tabs = all<HTMLElement>(root, "#ex-tabs .ex-tab");
  if (tabs.length) {
    tabs.forEach((tab) => {
      listen(tab, "click", () => {
        const targetId = tab.dataset.tab;
        if (!targetId) return;
        tabs.forEach((candidate) => candidate.classList.remove("active"));
        all<HTMLElement>(root, ".ex-panel").forEach((panel) =>
          panel.classList.remove("active"),
        );
        tab.classList.add("active");
        getById(targetId)?.classList.add("active");
      });
    });
  }

  /* Ariane-5 overflow visualiser (Software lecture 01) ---------------- */
  const overflowTrigger = getById("ov-trigger");
  const overflowSteps = all<HTMLElement>(root, ".ov-step");
  if (overflowTrigger && overflowSteps.length) {
    listen(overflowTrigger, "click", () => {
      overflowSteps.forEach((step) =>
        step.classList.remove("active", "danger"),
      );
      overflowSteps.forEach((step, index) => {
        later(() => {
          step.classList.add("active");
          if (index === overflowSteps.length - 1) step.classList.add("danger");
        }, index * 650);
      });
    });
  }

  /* Mobile menu / sidebar --------------------------------------------- */
  const menuButton = getById("menu-btn");
  if (menuButton && !menuButton.hasAttribute("onclick")) {
    listen(menuButton, "click", () => {
      getById("sidebar")?.classList.toggle("open");
      getById("overlay")?.classList.toggle("open");
    });
  }
  const overlay = getById("overlay");
  if (overlay) listen(overlay, "click", closeSidebar);
  listen(document, "keydown", (event) => {
    if ((event as KeyboardEvent).key === "Escape") closeSidebar();
  });

  const sidebarLinks = all<HTMLElement>(root, ".sb-link");
  sidebarLinks.forEach((link) => {
    listen(link, "click", () => {
      if (window.innerWidth <= 1100) closeSidebar();
    });
  });

  const scrollTopButton = getById("scroll-top");
  if (scrollTopButton) {
    if (!scrollTopButton.hasAttribute("onclick")) {
      listen(scrollTopButton, "click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      );
    }
  }

  /* Scroll UI ---------------------------------------------------------- */
  let previousScroll = window.scrollY;

  const updateProgress = (): void => {
    const documentElement = document.documentElement;
    const max = documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    for (const id of ["prog-bar", "prog-fill"]) {
      const bar = getById(id);
      if (bar) bar.style.width = `${pct}%`;
    }
  };

  const updateSidebar = (): void => {
    if (!sidebarLinks.length) return;
    const position = window.scrollY + 140;
    let active: HTMLElement | null = null;
    for (const link of sidebarLinks) {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) continue;
      const section = document.getElementById(href.slice(1));
      if (section && section.offsetTop <= position) active = link;
    }
    sidebarLinks.forEach((link) => link.classList.remove("active"));
    active?.classList.add("active");
  };

  const updateGlobalNav = (): void => {
    const nav = getById("globalTopNav");
    if (!nav) return;
    const current = window.scrollY;
    if (current > previousScroll && current > 60) nav.classList.add("hidden");
    else nav.classList.remove("hidden");
    previousScroll = current;
  };

  const updateScrollUi = (): void => {
    if (disposed) return;
    const current = window.scrollY;
    if (scrollTopButton) {
      scrollTopButton.classList.toggle("show", current > 400);
      scrollTopButton.classList.toggle("vis", current > 300);
    }
    updateProgress();
    updateSidebar();
    updateGlobalNav();
  };

  let ticking = false;
  listen(
    window,
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        updateScrollUi();
      });
    },
    { passive: true },
  );

  /* Fade-in cards ------------------------------------------------------ */
  if (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    "IntersectionObserver" in window
  ) {
    const animated = all<HTMLElement>(
      root,
      ".topic, .cheat, .quiz-section, .lec-card, .flashcard, .kw-card, .cmp-card",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
          observer.unobserve(element);
          later(() => {
            element.style.opacity = "";
            element.style.transform = "";
            element.style.transition = "";
          }, 520);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );

    animated.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(16px)";
      element.style.transition = "opacity .45s ease, transform .45s ease";
      observer.observe(element);
    });

    cleanups.push(() => {
      observer.disconnect();
      animated.forEach((element) => {
        element.style.opacity = "";
        element.style.transform = "";
        element.style.transition = "";
      });
    });
  }

  /* Counter animation -------------------------------------------------- */
  all<HTMLElement>(root, ".hstat .num").forEach((element) => {
    const finalText = (element.textContent ?? "").trim();
    const target = Number.parseInt(finalText, 10);
    if (Number.isNaN(target)) return;

    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const interval = window.setInterval(() => {
      current += step;
      if (current >= target) {
        window.clearInterval(interval);
        intervals.delete(interval);
        element.textContent = finalText;
      } else {
        element.textContent = String(current);
      }
    }, 35);
    intervals.add(interval);
  });

  updateScrollUi();
  later(updateScrollUi, 120);

  return () => {
    disposed = true;
    cleanups.forEach((cleanup) => cleanup());
    timeouts.forEach((id) => window.clearTimeout(id));
    intervals.forEach((id) => window.clearInterval(id));
    timeouts.clear();
    intervals.clear();
  };
}
