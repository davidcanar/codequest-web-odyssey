/* ============ Exercises — renderers + validators for 8 interactive exercise types ============
   Types: mcq | fill | dnd | order | bug | match | sandbox | arcade
   Contract: Exercises.render(container, ex, api) → api.correct() | api.wrong() | api.reveal(solutionText) */
(function () {

  /* ---------- tiny syntax highlighter (single-pass, no double-processing) ---------- */
  function esc(s) { return Sandbox ? Sandbox.escapeHtml(s) : String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function highlight(code, lang) {
    var out = esc(code);
    if (lang === 'html' || (!lang && /&lt;\/?[a-zA-Z!]/.test(out))) {
      return out.replace(/&lt;(\/?)([a-zA-Z][\w-]*)([\s\S]*?)&gt;/g, function (m, slash, tag, rest) {
        rest = rest.replace(/([a-zA-Z-]+)=(&quot;[^&]*&quot;|"[^"]*")/g, '<span class="tok-attr">$1</span>=<span class="tok-str">$2</span>');
        return '&lt;' + slash + '<span class="tok-tag">' + tag + '</span>' + rest + '&gt;';
      });
    }
    if (lang === 'css') {
      out = out.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-com">$1</span>')
               .replace(/([a-z-]+)\s*:/g, '<span class="tok-attr">$1</span>:')
               .replace(/(^|\n)([.#]?[a-zA-Z][\w-,\s.>*]*)(\s*\{)/g, '$1<span class="tok-tag">$2</span>$3');
      return out;
    }
    out = out.replace(/('[^'\n]*'|"[^"\n]*")/g, '<span class="tok-str">$1</span>');
    out = out.replace(/\b(let|const|var|function|return|if|else|for|while|new|typeof|true|false|null|undefined|of|in|do|break|continue|try|catch|await|async|document|window)\b/g, '<span class="tok-kw">$1</span>');
    return out;
  }

  function codeBlock(code, lang) {
    var pre = document.createElement('pre');
    pre.className = 'codeblock';
    pre.innerHTML = highlight(code, lang);
    return pre;
  }
  function mediaCode(container, ex) {
    if (ex.code) {
      var m = document.createElement('div');
      m.className = 'ex-media';
      m.appendChild(codeBlock(typeof ex.code === 'string' ? ex.code : L(ex.code), ex.codeLang));
      container.appendChild(m);
    }
  }
  function kindLabel(container, text) {
    var k = document.createElement('div');
    k.className = 'ex-kind';
    k.textContent = text;
    container.appendChild(k);
  }
  function promptEl(container, ex) {
    var p = document.createElement('div');
    p.className = 'ex-prompt';
    p.innerHTML = L(ex.prompt);
    container.appendChild(p);
  }

  /* ================= MCQ ================= */
  function renderMCQ(root, ex, api) {
    kindLabel(root, '◆ QUIZ');
    promptEl(root, ex);
    mediaCode(root, ex);
    var list = document.createElement('div');
    list.className = 'opt-list';
    var options = ex.options.map(function (o, i) { return { text: L(o), i: i }; });
    var answered = false, fails = 0;
    options.forEach(function (o) {
      var b = document.createElement('button');
      b.className = 'opt rise-in';
      b.style.animationDelay = (o.i * .06) + 's';
      b.innerHTML = '<span class="key">' + 'ABCD'[o.i] + '</span>' + (/<[a-z]/i.test(o.text) ? '<code>' + esc(o.text) + '</code>' : esc(o.text));
      b.addEventListener('click', function () {
        if (answered) return;
        AudioEngine.sfx.click();
        if (o.i === ex.answer) {
          answered = true;
          b.classList.add('correct');
          api.correct(ex.explain);
        } else {
          b.classList.add('wrong');
          api.wrong(ex.explain);
          fails++;
          setTimeout(function () { b.classList.remove('wrong'); }, 700);
          if (fails >= 2) {
            answered = true;
            list.querySelectorAll('.opt')[ex.answer].classList.add('correct');
            setTimeout(function () { api.reveal(L(ex.options[ex.answer])); }, 900);
          }
        }
      });
      list.appendChild(b);
    });
    root.appendChild(list);
  }

  /* ================= FILL (typing into blanks) ================= */
  function renderFill(root, ex, api) {
    kindLabel(root, '◆ TYPE THE CODE');
    promptEl(root, ex);
    var parts = String(ex.template).split('___');
    var line = document.createElement('div');
    line.className = 'fill-line';
    var blanks = [];
    var answers = ex.answers || [];  // answers[i] = {accept:[..]} or [..strings]
    parts.forEach(function (part, i) {
      line.appendChild(document.createTextNode(part));
      if (i < parts.length - 1) {
        var inp = document.createElement('input');
        inp.className = 'fill-blank';
        inp.spellcheck = false;
        inp.autocapitalize = 'off';
        inp.autocomplete = 'off';
        inp.size = Math.max(6, ((answers[i] && (answers[i].accept || answers[i])[0] || '').length + 2));
        blanks.push(inp);
        line.appendChild(inp);
        inp.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') checkBtn.click();
          if (e.key === 'Tab' && blanks[i + 1]) { e.preventDefault(); blanks[i + 1].focus(); }
        });
      }
    });
    root.appendChild(line);

    var checkBtn = document.createElement('button');
    checkBtn.className = 'btn ok';
    checkBtn.textContent = '✓ ' + t('check');
    var row = document.createElement('div');
    row.className = 'ex-actions';
    row.appendChild(checkBtn);
    root.appendChild(row);

    function norm(s) { return String(s).trim().replace(/\s+/g, ' ').replace(/[\""]/g, '"').replace(/[“”]/g, '"'); }
    function check() {
      var allOk = true;
      blanks.forEach(function (inp, i) {
        var acc = answers[i] && (answers[i].accept || answers[i]) || [];
        var ok = acc.some(function (a) { return norm(a).toLowerCase() === norm(inp.value).toLowerCase(); });
        inp.classList.toggle('good', ok);
        inp.classList.toggle('bad', !ok);
        if (!ok) allOk = false;
      });
      if (allOk) api.correct(ex.explain);
      else { api.wrong(ex.explain); }
    }
    checkBtn.addEventListener('click', check);
    if (blanks[0]) setTimeout(function () { blanks[0].focus(); }, 100);
    root._hint = function () {
      var acc = answers[0] && (answers[0].accept || answers[0]) || [];
      return acc[0] ? '→ <code>' + esc(acc[0]) + '</code>' : '';
    };
  }

  /* ================= DND (drag tokens into slots) ================= */
  function renderDND(root, ex, api) {
    kindLabel(root, '◆ DRAG & DROP');
    promptEl(root, ex);
    var before = ex.before || '', after = ex.after || '';
    var slotRow = document.createElement('div');
    slotRow.className = 'dnd-slot-row';
    if (before) slotRow.appendChild(document.createTextNode(before));
    var slots = [];
    var n = ex.slots.length;
    for (var i = 0; i < n; i++) {
      var s = document.createElement('span');
      s.className = 'dnd-slot';
      s.dataset.idx = i;
      slots.push(s);
      slotRow.appendChild(s);
      if (ex.separators && ex.separators[i]) slotRow.appendChild(document.createTextNode(ex.separators[i]));
    }
    if (after) slotRow.appendChild(document.createTextNode(after));
    root.appendChild(slotRow);

    var tokens = ex.slots.concat(ex.distractors || []);
    // deterministic-ish shuffle but different from sorted order
    tokens.sort(function () { return Math.random() - .5; });
    var tray = document.createElement('div');
    tray.className = 'dnd-tray';
    var tokenEls = {};
    tokens.forEach(function (tk) {
      var el = document.createElement('span');
      el.className = 'token';
      el.textContent = tk;
      el.dataset.token = tk;
      tokenEls[tk] = tokenEls[tk] || [];
      tokenEls[tk].push(el);
      tray.appendChild(el);
      attachDrag(el, tk);
    });
    root.appendChild(tray);

    var placed = [];

    function attachDrag(el, tk) {
      // click-to-select then click-slot (works on touch too)
      el.addEventListener('click', function () {
        if (el.classList.contains('used')) return;
        tray.querySelectorAll('.token').forEach(function (x) { x.classList.remove('ghost'); });
        if (el.classList.contains('placed-token')) { unplace(tk, el); return; }
        el.classList.add('ghost');
        root._selected = { tk: tk, el: el };
        AudioEngine.sfx.hover();
      });
      el._clickMode = true;
    }
    slots.forEach(function (s) {
      s.addEventListener('click', function () {
        var sel = root._selected;
        if (!sel) return;
        placeIn(s, sel.tk, sel.el);
        root._selected = null;
        tray.querySelectorAll('.token').forEach(function (x) { x.classList.remove('ghost'); });
      });
      s.addEventListener('dragover', function (e) { e.preventDefault(); s.classList.add('over'); });
      s.addEventListener('dragleave', function () { s.classList.remove('over'); });
      s.addEventListener('drop', function (e) {
        e.preventDefault(); s.classList.remove('over');
        var tk = e.dataTransfer.getData('text/plain');
        var el = (tokenEls[tk] || []).find(function (x) { return !x.classList.contains('used'); });
        if (el) placeIn(s, tk, el);
      });
    });
    tokens.forEach(function (tk) {
      var el = tokenEls[tk].find(function (x) { return x._clickMode; });
      if (el) {
        el.draggable = true;
        el.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', tk); el.classList.add('dragging'); });
        el.addEventListener('dragend', function () { el.classList.remove('dragging'); });
      }
    });

    function placeIn(slot, tk, el) {
      if (slot.classList.contains('filled')) {
        // swap out existing
        var oldTk = slot.dataset.token;
        var oldEl = (tokenEls[oldTk] || []).find(function (x) { return x.classList.contains('used') && x._slotEl === slot; });
        if (oldEl) { oldEl.classList.remove('used', 'placed-token'); oldEl._slotEl = null; }
        placed = placed.filter(function (p) { return p.slot !== slot; });
      }
      slot.textContent = tk;
      slot.dataset.token = tk;
      slot.classList.add('filled');
      var tok = document.createElement('span');
      tok.className = 'dnd-token placed-token token';
      tok.textContent = tk;
      slot.innerHTML = ''; slot.appendChild(tok);
      el.classList.add('used');
      el._slotEl = slot;
      placed.push({ slot: slot, tk: tk });
      AudioEngine.sfx.pickup();
      // auto-check when full
      if (placed.length === n) setTimeout(check, 350);
    }
    function unplace(tk, el) {
      var p = placed.find(function (p) { return p.tk === tk; });
      if (!p) return;
      p.slot.innerHTML = ''; p.slot.classList.remove('filled'); delete p.slot.dataset.token;
      el.classList.remove('used');
      placed = placed.filter(function (x) { return x !== p; });
    }

    function check() {
      var ok = ex.slots.every(function (tk, i) { return slots[i].dataset.token === tk; });
      if (ok) { api.correct(ex.explain); }
      else {
        api.wrong(ex.explain);
        // return wrong tokens to tray after a beat
        setTimeout(function () {
          placed.slice().forEach(function (p) {
            if (p.tk !== ex.slots[slots.indexOf(p.slot)]) {
              var el = (tokenEls[p.tk] || []).find(function (x) { return x.classList.contains('used') && x._slotEl === p.slot; });
              if (el) { el.classList.remove('used'); el._slotEl = null; }
              p.slot.innerHTML = ''; p.slot.classList.remove('filled'); delete p.slot.dataset.token;
              placed = placed.filter(function (x) { return x !== p; });
            }
          });
        }, 900);
      }
    }
    root._hint = function () { return '→ <code>' + esc(ex.slots.join(' ')) + '</code>'; };
  }

  /* ================= ORDER (reorder lines) ================= */
  function renderOrder(root, ex, api) {
    kindLabel(root, '◆ ORDER THE LINES');
    promptEl(root, ex);
    var list = document.createElement('div');
    list.className = 'order-list';
    var correct = ex.lines.slice();
    var shuffled = ex.lines.slice();
    do { shuffled.sort(function () { return Math.random() - .5; }); } while (shuffled.join('|') === correct.join('|') && ex.lines.length > 1);
    var lineEls = [];
    shuffled.forEach(function (ln) {
      var el = document.createElement('div');
      el.className = 'order-line';
      el.innerHTML = '<span class="grip">⠿</span>';
      var codeSpan = document.createElement('span');
      codeSpan.innerHTML = highlight(ln, ex.lang);
      el.appendChild(codeSpan);
      list.appendChild(el);
      lineEls.push({ el: el, ln: ln });
      el.draggable = true;
      el.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', 'x'); el.classList.add('dragging'); dragEl = el; });
      el.addEventListener('dragend', function () { el.classList.remove('dragging'); dragEl = null; });
      el.addEventListener('dragover', function (e) { e.preventDefault(); el.classList.add('drop-target'); });
      el.addEventListener('dragleave', function () { el.classList.remove('drop-target'); });
      el.addEventListener('drop', function (e) {
        e.preventDefault(); el.classList.remove('drop-target');
        if (!dragEl || dragEl === el) return;
        list.insertBefore(dragEl, el);
        AudioEngine.sfx.hover();
      });
    });
    var dragEl = null;
    root.appendChild(list);

    var row = document.createElement('div');
    row.className = 'ex-actions';
    var checkBtn = document.createElement('button');
    checkBtn.className = 'btn ok';
    checkBtn.textContent = '✓ ' + t('check');
    row.appendChild(checkBtn);
    root.appendChild(row);

    checkBtn.addEventListener('click', function () {
      var current = Array.from(list.children).map(function (el) {
        var found = lineEls.find(function (le) { return le.el === el; });
        return found.ln;
      });
      var ok = current.join('|') === correct.join('|');
      if (ok) api.correct(ex.explain);
      else api.wrong(ex.explain);
    });
    root._hint = function () {
      return '→ <pre style="font-size:12px;margin:4px 0 0">' + esc(correct.join('\n')) + '</pre>';
    };
  }

  /* ================= BUG (find the broken line) ================= */
  function renderBug(root, ex, api) {
    kindLabel(root, '◆ BUG HUNT');
    promptEl(root, ex);
    var box = document.createElement('div');
    box.className = 'bug-lines';
    var found = false;
    ex.lines.forEach(function (ln, i) {
      var b = document.createElement('button');
      b.className = 'bug-line';
      b.innerHTML = '<span class="ln">' + (i + 1) + '</span>' + highlight(ln, ex.lang);
      b.addEventListener('click', function () {
        if (found) return;
        if (i === ex.bugLine) {
          found = true;
          b.classList.add('correct-pick');
          AudioEngine.sfx.correct();
          if (ex.fix) { startFix(); }
          else api.correct(ex.explain);
        } else {
          b.classList.add('wrong-pick');
          api.wrong();
          setTimeout(function () { b.classList.remove('wrong-pick'); }, 600);
          if ((b._fails = (b._fails || 0) + 1) >= 2) {
            found = true;
            box.querySelectorAll('.bug-line')[ex.bugLine].classList.add('correct-pick');
            setTimeout(function () { api.reveal(esc(ex.lines[ex.bugLine])); }, 600);
          }
        }
      });
      box.appendChild(b);
    });
    root.appendChild(box);

    function startFix() {
      var hint = document.createElement('div');
      hint.className = 'hint-box';
      hint.innerHTML = '<b>🔧</b> ' + L(ex.fixPrompt || { en: 'Now type the fixed line:', es: 'Ahora escribe la línea corregida:' });
      root.appendChild(hint);
      var line = document.createElement('div');
      line.className = 'fill-line';
      var inp = document.createElement('input');
      inp.className = 'fill-blank';
      inp.style.minWidth = '240px';
      inp.spellcheck = false;
      line.appendChild(inp);
      root.appendChild(line);
      var row = document.createElement('div');
      row.className = 'ex-actions';
      var btn = document.createElement('button');
      btn.className = 'btn ok';
      btn.textContent = '✓ ' + t('check');
      row.appendChild(btn);
      root.appendChild(row);
      function norm(s) { return String(s).trim().replace(/\s+/g, ' ').toLowerCase(); }
      function check() {
        var acc = ex.fix.accept || [ex.fix.answer];
        if (acc.some(function (a) { return norm(a) === norm(inp.value); })) api.correct(ex.explain);
        else api.wrong(ex.explain);
      }
      btn.addEventListener('click', check);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
      inp.focus();
      root._hint = function () { return '→ <code>' + esc((ex.fix.accept || [ex.fix.answer])[0]) + '</code>'; };
    }
    root._hint = root._hint || function () { return ''; };
  }

  /* ================= MATCH (pairs) ================= */
  function renderMatch(root, ex, api) {
    kindLabel(root, '◆ MATCH THE PAIRS');
    promptEl(root, ex);
    var grid = document.createElement('div');
    grid.className = 'match-grid';
    var colA = document.createElement('div'), colB = document.createElement('div');
    colA.className = 'match-col'; colB.className = 'match-col';
    grid.appendChild(colA); grid.appendChild(colB);
    root.appendChild(grid);

    var pairs = ex.pairs.slice();
    var bShuffled = pairs.slice().sort(function () { return Math.random() - .5; });
    var selA = null, matched = 0;

    pairs.forEach(function (p, i) {
      var a = document.createElement('button');
      a.className = 'match-item rise-in';
      a.style.animationDelay = (i * .05) + 's';
      a.innerHTML = (p.chip ? '<span class="chip">' + esc(p.chip) + '</span>' : '') + highlight(p.a.en, ex.lang);
      a._pair = p;
      colA.appendChild(a);
      a.addEventListener('click', function () { pickA(a); });
    });
    bShuffled.forEach(function (p, i) {
      var b = document.createElement('button');
      b.className = 'match-item desc rise-in';
      b.style.animationDelay = (i * .05) + 's';
      b.innerHTML = '<span class="chip">' + '①②③④⑤⑥'[i % 6] + '</span>' + esc(L(p.b));
      b._pair = p;
      colB.appendChild(b);
      b.addEventListener('click', function () { pickB(b); });
    });

    function pickA(a) {
      if (a.classList.contains('matched')) return;
      colA.querySelectorAll('.match-item').forEach(function (x) { x.classList.remove('sel-a'); });
      a.classList.add('sel-a');
      selA = a;
      AudioEngine.sfx.hover();
    }
    function pickB(b) {
      if (b.classList.contains('matched')) return;
      if (!selA) { colB.querySelectorAll('.match-item').forEach(function (x) { x.classList.remove('sel-b'); }); b.classList.add('sel-b'); return; }
      if (b._pair === selA._pair) {
        selA.classList.remove('sel-a'); selA.classList.add('matched');
        b.classList.remove('sel-b'); b.classList.add('matched');
        matched++;
        AudioEngine.sfx.pickup();
        selA = null;
        if (matched === pairs.length) api.correct(ex.explain);
      } else {
        b.classList.add('err'); selA.classList.add('err');
        api.wrong();
        setTimeout(function () { b.classList.remove('err'); selA.classList.remove('err'); selA.classList.remove('sel-a'); selA = null; }, 500);
        if ((b._fails = (b._fails || 0) + 1) >= 3) {
          // reveal remaining
          Array.from(colA.querySelectorAll('.match-item')).forEach(function (x) { x.classList.add('matched'); });
          Array.from(colB.querySelectorAll('.match-item')).forEach(function (x) { x.classList.add('matched'); });
          setTimeout(function () { api.reveal(''); }, 600);
        }
      }
    }
    root._hint = function () { return L(ex.hint) || ''; };
  }

  /* ================= SANDBOX ================= */
  function renderSandbox(root, ex, api) {
    kindLabel(root, '◆ CODE MISSION');
    promptEl(root, ex);
    var host = document.createElement('div');
    root.appendChild(host);
    var sb = Sandbox.render(host, ex, api);

    var row = document.createElement('div');
    row.className = 'ex-actions';
    var checkBtn = document.createElement('button');
    checkBtn.className = 'btn ok';
    checkBtn.innerHTML = '✓ ' + t('check');
    row.appendChild(checkBtn);
    root.appendChild(row);

    var fb = document.createElement('div');
    root.appendChild(fb);

    checkBtn.addEventListener('click', function () {
      var res = Sandbox.runChecks(ex, sb, sb.getValue());
      fb.innerHTML = '';
      var all = document.createElement('div');
      all.className = 'ex-feedback ' + (res.allOk ? 'good' : 'bad');
      var html = '<span class="ico">' + (res.allOk ? '🎉' : '🛠️') + '</span><div>' +
        res.results.map(function (r) { return (r.ok ? '✅ ' : '❌ ') + r.msg; }).join('<br>') + '</div>';
      all.innerHTML = html;
      fb.appendChild(all);
      if (res.allOk) api.correct(ex.explain);
      else api.wrong(ex.explain);
    });
    root._hint = function () {
      if (ex.solution) return '→ <pre style="font-size:12px;margin:4px 0 0;white-space:pre-wrap">' + esc(ex.solution) + '</pre>';
      return '';
    };
    root._sandbox = sb;
  }

  /* ================= ARCADE (Meteor Fixer) ================= */
  function renderArcade(root, ex, api) {
    kindLabel(root, '◆ ' + t('arcadeTitle'));
    var wrap = document.createElement('div');
    wrap.className = 'arcade-wrap';
    wrap.innerHTML =
      '<div class="arcade-hud"><span class="q"></span><span class="sc">' + t('score') + ': <b>0</b></span></div>' +
      '<canvas class="arcade-canvas"></canvas>' +
      '<div class="arcade-rounds"></div>';
    root.appendChild(wrap);
    var qEl = wrap.querySelector('.q'), scEl = wrap.querySelector('.sc b'), dotsEl = wrap.querySelector('.arcade-rounds');
    var canvas = wrap.querySelector('canvas');
    var rounds = ex.rounds;
    rounds.forEach(function () { dotsEl.appendChild(Object.assign(document.createElement('div'), { className: 'dot' })); });

    var W, H, ctx2d, meteors = [], raf = null, running = false;
    var roundIdx = 0, score = 0, lives = 2;
    var feedbackText = '';

    function sizeCanvas() {
      W = canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
      H = canvas.height = 340 * (window.devicePixelRatio || 1);
      ctx2d = canvas.getContext('2d');
      ctx2d.scale(1, 1);
    }
    window.addEventListener('resize', sizeCanvas);

    var stars = [];
    function initStars() { stars = []; for (var i = 0; i < 60; i++) stars.push({ x: Math.random(), y: Math.random(), s: Math.random() * 1.6 + .4, v: Math.random() * .02 + .005 }); }

    function spawnRound() {
      var r = rounds[roundIdx];
      qEl.innerHTML = '🎯 ' + L(r.question);
      var toks = [{ t: r.correct, ok: true }].concat(r.wrongs.map(function (w) { return { t: w, ok: false }; }));
      toks.sort(function () { return Math.random() - .5; });
      meteors = toks.map(function (tk, i) {
        return {
          x: (i + 1) * (1 / (toks.length + 1)) + (Math.random() * .06 - .03),
          y: -.12 - i * .18,
          v: (.10 + Math.random() * .05) * (r.speed || 1),
          r: .075, tok: tk.t, ok: tk.ok,
          spin: Math.random() * 6
        };
      });
      running = true;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    function loop() {
      raf = null;
      if (!running) return;
      var dpr = window.devicePixelRatio || 1;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      var w = W / dpr, h = H / dpr;
      ctx2d.clearRect(0, 0, w, h);
      // stars
      stars.forEach(function (s) {
        s.y += s.v; if (s.y > 1) s.y = 0;
        ctx2d.fillStyle = 'rgba(200,215,255,' + (.3 + s.s / 3) + ')';
        ctx2d.fillRect(s.x * w, s.y * h, s.s, s.s);
      });
      // meteors
      var landed = false;
      meteors.forEach(function (m) {
        m.y += m.v / 60;
        m.spin += .01;
        if (m.y > .88) landed = true;
        var mx = m.x * w, my = m.y * h, mr = m.r * Math.min(w, h) / 1.2;
        var grd = ctx2d.createRadialGradient(mx - mr * .3, my - mr * .3, mr * .1, mx, my, mr);
        grd.addColorStop(0, '#ffcf8a'); grd.addColorStop(.5, '#e07a3f'); grd.addColorStop(1, '#8a3c14');
        ctx2d.fillStyle = grd;
        ctx2d.beginPath(); ctx2d.arc(mx, my, mr, 0, 7); ctx2d.fill();
        // trail
        ctx2d.strokeStyle = 'rgba(255,160,80,.35)'; ctx2d.lineWidth = 3;
        ctx2d.beginPath(); ctx2d.moveTo(mx, my - mr); ctx2d.lineTo(mx - 8, my - mr - 26); ctx2d.stroke();
        // token text
        ctx2d.fillStyle = '#10163a';
        ctx2d.font = 'bold ' + Math.round(mr * .42) + 'px Consolas, monospace';
        ctx2d.textAlign = 'center'; ctx2d.textBaseline = 'middle';
        var txt = m.tok.length > 10 ? m.tok.slice(0, 9) + '…' : m.tok;
        ctx2d.fillText(txt, mx, my);
      });
      if (feedbackText) {
        ctx2d.fillStyle = 'rgba(255,255,255,.9)';
        ctx2d.font = 'bold 22px Segoe UI';
        ctx2d.fillText(feedbackText, w / 2, h / 2 - 60);
      }
      if (landed) {
        running = false;
        AudioEngine.sfx.boom();
        onFail();
        return;
      }
      raf = requestAnimationFrame(loop);
    }

    canvas.addEventListener('pointerdown', function (e) {
      if (!running) return;
      var rect = canvas.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width, y = (e.clientY - rect.top) / rect.height;
      for (var i = 0; i < meteors.length; i++) {
        var m = meteors[i];
        var dx = x - m.x, dy = (y - m.y) * .6;
        if (dx * dx + dy * dy < (m.r * 1.25) * (m.r * 1.25)) {
          if (m.ok) {
            running = false;
            score += 100;
            scEl.textContent = score;
            AudioEngine.sfx.boom();
            feedbackText = '💥';
            dotsEl.children[roundIdx].classList.add('on');
            drawFrame(); // one last frame with feedback
            setTimeout(function () { feedbackText = ''; nextRound(true); }, 550);
          } else {
            // wrong meteor: remove it, count mistake
            meteors.splice(i, 1);
            AudioEngine.sfx.wrong();
            api.wrong();
          }
          return;
        }
      }
    });

    function drawFrame() {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = null; loopOnce(); });
      function loopOnce() {
        var dpr = window.devicePixelRatio || 1;
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
        var w = W / dpr, h = H / dpr;
        ctx2d.clearRect(0, 0, w, h);
        meteors.forEach(function (m) {
          var mx = m.x * w, my = m.y * h, mr = m.r * Math.min(w, h) / 1.2;
          ctx2d.fillStyle = '#e07a3f';
          ctx2d.beginPath(); ctx2d.arc(mx, my, mr, 0, 7); ctx2d.fill();
        });
      }
    }

    function onFail() {
      dotsEl.children[roundIdx].classList.add('fail');
      lives--;
      api.wrong();
      if (lives >= 0) setTimeout(spawnRound, 800);
      else {
        feedbackText = '';
        setTimeout(function () { api.reveal(L(rounds[roundIdx].correct)); }, 400);
      }
    }
    function nextRound(wasOk) {
      roundIdx++;
      if (roundIdx >= rounds.length) { api.correct(ex.explain); return; }
      spawnRound();
    }

    sizeCanvas(); initStars(); spawnRound();
    root._arcade = {
      getMeteors: function () { return meteors.map(function (m) { return { x: m.x, y: m.y, ok: m.ok, tok: m.tok }; }); },
      clickAt: function (fx, fy) {
        var rect = canvas.getBoundingClientRect();
        canvas.dispatchEvent(new PointerEvent('pointerdown', { clientX: rect.left + fx * rect.width, clientY: rect.top + fy * rect.height, bubbles: true }));
      },
      currentRound: function () { return roundIdx; },
      score: function () { return score; }
    };
    root._hint = function () { return '💡 ' + t('catchCorrect'); };
    root._destroy = function () { running = false; if (raf) cancelAnimationFrame(raf); };
  }

  /* ================= registry ================= */
  var REG = { mcq: renderMCQ, fill: renderFill, dnd: renderDND, order: renderOrder, bug: renderBug, match: renderMatch, sandbox: renderSandbox, arcade: renderArcade };

  function render(container, ex, api) {
    var root = document.createElement('div');
    root.className = 'ex-card glass';
    var fn = REG[ex.type];
    if (!fn) { root.textContent = 'Unknown exercise type: ' + ex.type; container.appendChild(root); return root; }
    fn(root, ex, api);
    container.appendChild(root);
    return root;
  }

  window.Exercises = { render: render, highlight: highlight };
})();
