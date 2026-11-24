// ============================================================
// LOBE LIMPET: free taster quiz on public subject pages
// Markup: <div class="tq" id="tq"> with .tq-q blocks (data-answer),
// .tq-opts buttons (data-k) and a .tq-why explanation, then #tq-end.
// ============================================================
// Taster quiz: one question at a time, instant feedback, score at the end.
// The questions are plain HTML so search engines can read them.
(function () {
  var box = document.getElementById('tq'); if (!box) return;
  var qs = [].slice.call(box.querySelectorAll('.tq-q'));
  var end = document.getElementById('tq-end'), prog = document.getElementById('tq-progress');
  var i = 0, right = 0;
  box.classList.add('tq-live');
  function show(n) {
    qs.forEach(function (q, k) { q.hidden = k !== n; });
    prog.textContent = 'Question ' + (n + 1) + ' of ' + qs.length;
  }
  qs.forEach(function (q) {
    var why = q.querySelector('.tq-why'); why.hidden = true;
    var next = document.createElement('button');
    next.type = 'button'; next.className = 'btn btn-deep tq-next'; next.hidden = true;
    next.textContent = 'Next question';
    q.appendChild(next);
    q.querySelectorAll('.tq-opts button').forEach(function (b) {
      b.addEventListener('click', function () {
        if (q.dataset.done) return; q.dataset.done = '1';
        var ok = b.dataset.k === q.dataset.answer; if (ok) right++;
        q.querySelectorAll('.tq-opts button').forEach(function (o) {
          o.disabled = true;
          if (o.dataset.k === q.dataset.answer) o.classList.add('ok');
        });
        if (!ok) b.classList.add('no');
        why.hidden = false;
        why.insertAdjacentHTML('afterbegin', '<strong>' + (ok ? 'Correct. ' : 'Not quite. ') + '</strong>');
        next.hidden = false;
        if (qs.indexOf(q) === qs.length - 1) next.textContent = 'See my score';
        next.focus();
      });
    });
    next.addEventListener('click', function () {
      i++;
      if (i < qs.length) { show(i); qs[i].querySelector('.tq-opts button').focus(); return; }
      qs.forEach(function (q) { q.hidden = true; });
      prog.textContent = '';
      document.getElementById('tq-score').textContent = right + ' out of ' + qs.length;
      document.getElementById('tq-msg').textContent =
        right >= 10 ? 'Great work. Keep it fresh with a few minutes of review each day.' :
        right >= 6 ? 'A good start. The key points below show what to go back over.' :
        'Worth another look. Read the key points below, then try again tomorrow: that gap is what makes it stick.';
      end.hidden = false;
    });
  });
  document.getElementById('tq-again').addEventListener('click', function () { location.reload(); });
  show(0);
})();
