/* ═══════════════════════════════════════════════════════════
   CS251 Software Engineering — Shared Quiz Engine
   - Reads data-correct on each .q-item
   - Lets the user click options to select
   - On "Check Answers" → color correct/wrong, reveal .q-explain,
     compute score, show banner
   - "Reset" clears everything
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Per-item option select (toggles .selected) ─── */
  function bindOptionClicks(root) {
    root.querySelectorAll('.q-item').forEach(item => {
      const opts = item.querySelectorAll('.q-opt');
      opts.forEach(opt => {
        opt.addEventListener('click', () => {
          // skip if already graded (correct/wrong classes locked)
          if (item.dataset.graded === 'true') return;
          opts.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
        });
      });
    });
  }

  /* ─── Check Answers ─── */
  function checkQuiz(quizId) {
    const quiz = document.getElementById(quizId);
    if (!quiz) return;
    const items = quiz.querySelectorAll('.q-item');
    let correct = 0;
    const total = items.length;

    items.forEach(item => {
      const right = (item.dataset.correct || '').toLowerCase();
      const selected = item.querySelector('.q-opt.selected');
      const opts = item.querySelectorAll('.q-opt');

      // strip previous result classes
      opts.forEach(o => o.classList.remove('correct', 'wrong'));

      // mark the right option green
      opts.forEach(o => {
        if ((o.dataset.val || '').toLowerCase() === right) {
          o.classList.add('correct');
        }
      });

      // mark wrong choice red (if user picked something wrong)
      if (selected) {
        const userVal = (selected.dataset.val || '').toLowerCase();
        if (userVal === right) {
          correct++;
        } else {
          selected.classList.add('wrong');
        }
      }

      // reveal explanation
      const exp = item.querySelector('.q-explain');
      if (exp) exp.classList.add('show');
      item.dataset.graded = 'true';
    });

    // score banner
    const banner = quiz.querySelector('.q-score');
    if (banner) {
      const pct = total ? Math.round((correct / total) * 100) : 0;
      banner.classList.remove('good', 'ok', 'bad');
      let cls = 'bad';
      let emoji = '😬';
      if (pct >= 80) { cls = 'good'; emoji = '🔥'; }
      else if (pct >= 50) { cls = 'ok'; emoji = '💪'; }
      banner.classList.add(cls);
      banner.style.display = 'block';
      banner.textContent = `${emoji}  ${correct} / ${total}  (${pct}%)  —  ${cls === 'good' ? 'ممتاز! جاهز للامتحان' : cls === 'ok' ? 'كويس بس فيه شوية مفاهيم محتاجة مراجعة' : 'ارجع للمحاضرة وذاكر تاني'}`;
    }

    // scroll to first wrong (if any) for instant feedback
    const firstWrong = quiz.querySelector('.q-opt.wrong');
    if (firstWrong) {
      setTimeout(() => firstWrong.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
    }
  }

  /* ─── Reset Quiz ─── */
  function resetQuiz(quizId) {
    const quiz = document.getElementById(quizId);
    if (!quiz) return;
    quiz.querySelectorAll('.q-item').forEach(item => {
      item.dataset.graded = 'false';
      item.querySelectorAll('.q-opt').forEach(o => {
        o.classList.remove('selected', 'correct', 'wrong');
      });
      const exp = item.querySelector('.q-explain');
      if (exp) exp.classList.remove('show');
    });
    const banner = quiz.querySelector('.q-score');
    if (banner) {
      banner.style.display = 'none';
      banner.classList.remove('good', 'ok', 'bad');
    }
    quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* expose globally for inline onclick handlers */
  window.checkQuiz = checkQuiz;
  window.resetQuiz = resetQuiz;

  document.addEventListener('DOMContentLoaded', () => {
    bindOptionClicks(document);
  });
})();
