/* ============ Explainer Kit JS — timeline engine for lesson animation pages ============
   Usage in a lesson page:
     <link rel="stylesheet" href="kit.css">
     <script>window.EXPLAINER = { title:{...}, scenes:[ ... ] };</script>
     <script src="kit.js"></script>
   URL params: lang=en|es  d=<totalSeconds> (scale to narration)  loop=1  */
(function () {
  var P = new URLSearchParams(location.search);
  var LANG = P.get('lang') === 'es' ? 'es' : 'en';
  var TOTAL = parseFloat(P.get('d')) || 0;   // if >0 (and no sd), scale scene durations to this total
  var SD = P.get('sd');                      // comma list of per-scene seconds (from narration manifest)
  var SDS = SD ? SD.split(',').map(function (x) { return parseFloat(x); }) : null;
  var LOOP = P.get('loop') === '1';

  function L(obj) { if (obj == null) return ''; if (typeof obj === 'string') return obj; return obj[LANG] != null ? obj[LANG] : obj.en; }

  /* ---------- tiny highlighter (single-pass: tags+attrs together, then js/css) ---------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function hl(code) {
    var out = esc(code);
    if (/&lt;\/?[a-zA-Z!]/.test(out)) {
      return out.replace(/&lt;(\/?)([a-zA-Z][\w-]*)([\s\S]*?)&gt;/g, function (m, slash, tag, rest) {
        rest = rest.replace(/([a-zA-Z-]+)="([^"]*)"/g, '<span class="k-ta">$1</span>="<span class="k-ts">$2</span>"');
        return '&lt;' + slash + '<span class="k-tt">' + tag + '</span>' + rest + '&gt;';
      });
    }
    out = out.replace(/('[^'\n]*'|"[^"\n]*")/g, '<span class="k-ts">$1</span>');
    out = out.replace(/\b(let|const|var|function|return|if|else|for|while|document|window|addEventListener|querySelector|querySelectorAll|forEach|map|filter|reduce|new|true|false|null|undefined|async|await)\b/g, '<span class="k-tk">$1</span>');
    return out;
  }

  /* ---------- stars ---------- */
  function makeStars(host) {
    var w = document.createElement('div'); w.className = 'kstars';
    for (var i = 0; i < 46; i++) {
      var s = document.createElement('div'); s.className = 'kstar';
      var r = Math.random() * 2 + .6;
      s.style.cssText = 'left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;width:' + r + 'px;height:' + r + 'px;animation-delay:' + (Math.random() * 2.6) + 's';
      w.appendChild(s);
    }
    host.appendChild(w);
  }

  /* ---------- scene builders ---------- */
  var BUILDERS = {

    title: function (sc) {
      var d = document.createElement('div'); d.className = 'k-title';
      d.innerHTML = '<span class="emoji">' + (sc.emoji || '🚀') + '</span><h1>' + esc(L(sc.title)) + '</h1>' +
        (sc.subtitle ? '<p>' + esc(L(sc.subtitle)) + '</p>' : '') +
        (sc.chips ? '<div class="chip-row">' + sc.chips.map(function (c) { return '<span class="k-chip">' + esc(L(c)) + '</span>'; }).join('') + '</div>' : '');
      return d;
    },

    code: function (sc) {
      var col = document.createElement('div'); col.className = 'k-col';
      var code = document.createElement('div'); code.className = 'k-code';
      col.appendChild(code);
      typewrite(code, typeof sc.code === 'string' ? sc.code : L(sc.code), sc);
      if (sc.labels) {
        var lab = document.createElement('div'); lab.className = 'k-labels';
        sc.labels.forEach(function (lb, i) {
          var el = document.createElement('div'); el.className = 'k-label';
          el.style.animationDelay = (0.35 * i + 0.5) + 's';
          el.innerHTML = (lb.token ? '<span class="pt">' + esc(lb.token) + '</span> → ' : '') + esc(L(lb.label));
          lab.appendChild(el);
        });
        col.appendChild(lab);
      }
      return col;
    },

    split: function (sc) {
      var row = document.createElement('div'); row.className = 'k-split';
      var code = document.createElement('div'); code.className = 'k-code';
      code.style.minWidth = 'min(40vw, 460px)';
      row.appendChild(code);
      var arrow = document.createElement('div'); arrow.className = 'arrow'; arrow.textContent = '➜';
      row.appendChild(arrow);
      var br = document.createElement('div'); br.className = 'k-browser'; br.style.minWidth = 'min(30vw, 340px)';
      br.innerHTML = '<div class="bar"><span class="dot" style="background:#ff5e7a"></span><span class="dot" style="background:#ffd75e"></span><span class="dot" style="background:#3ddc84"></span><span class="url">🌐 preview</span></div>' +
        '<div class="view">' + (sc.result || '') + '</div>';
      row.appendChild(br);
      typewrite(code, typeof sc.code === 'string' ? sc.code : L(sc.code), sc);
      return row;
    },

    browser: function (sc) {
      var br = document.createElement('div'); br.className = 'k-browser';
      var url = sc.url || 'https://my-first-page.web';
      br.innerHTML = '<div class="bar"><span class="dot" style="background:#ff5e7a"></span><span class="dot" style="background:#ffd75e"></span><span class="dot" style="background:#3ddc84"></span><span class="url"></span></div>' +
        '<div class="view"></div>';
      var urlEl = br.querySelector('.url'), view = br.querySelector('.view');
      var i = 0;
      var iv = setInterval(function () {
        i++; urlEl.textContent = url.slice(0, i);
        if (i >= url.length) { clearInterval(iv); }
      }, Math.max(30, (sc.sd * 300) / url.length));
      if (sc.html) setTimeout(function () { view.innerHTML = sc.html; view.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500 }); }, sc.sd * 380);
      return br;
    },

    tree: function (sc) {
      var t = document.createElement('div'); t.className = 'k-tree';
      buildTree(t, sc.data, 0);
      return t;
      function buildTree(host, node, depth) {
        var col = document.createElement('div'); col.className = 'col';
        var n = document.createElement('div'); n.className = 'k-node' + (node.hot ? ' hot' : '');
        n.style.animationDelay = (node.delay || depth * .35) + 's';
        n.innerHTML = '&lt;' + esc(node.tag) + '&gt;';
        col.appendChild(n);
        if (node.kids) {
          var v = document.createElement('div'); v.className = 'k-vline'; v.style.animationDelay = (node.delay || depth * .35) + 's';
          col.appendChild(v);
          var row = document.createElement('div'); row.className = 'k-sub';
          node.kids.forEach(function (k) {
            var b = document.createElement('div'); b.className = 'col';
            k.delay = (node.delay || depth * .35) + .45;
            buildTree(b, k, depth + 1);
            row.appendChild(b);
          });
          col.appendChild(row);
        }
        host.appendChild(col);
      }
    },

    quiz: function (sc) {
      var q = document.createElement('div'); q.className = 'k-quiz';
      q.innerHTML = '<div class="q">❓ ' + esc(L(sc.question)) + '</div><div class="opts">' +
        sc.options.map(function (o, i) { return '<div class="opt" data-i="' + i + '">' + 'ABCD'[i] + '. ' + esc(L(o)) + '</div>'; }).join('') + '</div>';
      setTimeout(function () {
        var opts = q.querySelectorAll('.opt');
        opts.forEach(function (o, i) { if (i !== sc.answer) o.classList.add('dim'); });
        opts[sc.answer].classList.add('good');
      }, sc.sd * 620);
      return q;
    },

    console: function (sc) {
      var c = document.createElement('div'); c.className = 'k-console';
      c.innerHTML = '<div class="head">🖥️ CONSOLE</div>';
      sc.lines.forEach(function (ln, i) {
        var d = document.createElement('div');
        d.className = 'ln ' + (ln.out ? 'out' : 'code');
        d.style.animationDelay = (0.7 + i * (sc.sd * 0.5 / sc.lines.length)) + 's';
        d.innerHTML = (ln.out ? '› ' : '') + hl(ln.t);
        c.appendChild(d);
      });
      return c;
    },

    steps: function (sc) {
      var wrap = document.createElement('div'); wrap.className = 'k-frame-wrap';
      var frames = sc.frames || [];
      var per = sc.sd / frames.length;
      frames.forEach(function (f, i) {
        var el = document.createElement('div');
        el.className = 'k-frame';
        el.style.display = 'none';
        if (typeof f === 'string') el.innerHTML = f;
        else {
          el.innerHTML = f.html || '';
          if (f.css) { var st = document.createElement('style'); st.textContent = f.css; el.appendChild(st); }
        }
        el.querySelectorAll('[data-show-later]').forEach(function (x) { x.style.opacity = '0'; x.style.transition = 'opacity .5s'; });
        wrap.appendChild(el);
        setTimeout(function () {
          wrap.querySelectorAll('.k-frame').forEach(function (x) { x.style.display = 'none'; });
          el.style.display = 'grid';
          el.classList.remove('animate-in'); void el.offsetWidth; el.classList.add('animate-in');
          setTimeout(function () { el.querySelectorAll('[data-show-later]').forEach(function (x) { x.style.opacity = '1'; }); }, per * 400);
        }, i * per * 1000);
      });
      return wrap;
    },

    boxmodel: function (sc) {
      var wrap = document.createElement('div'); wrap.className = 'k-frame-wrap';
      var focus = sc.focus || ['content', 'padding', 'border', 'margin'];
      var per = sc.sd / focus.length;
      var html =
        '<div class="km-boxwrap"><div class="km-margin" id="kmm"><span class="km-tag margin">margin</span>' +
        '<div class="km-border" id="kmb"><span class="km-tag border">border</span>' +
        '<div class="km-padding" id="kmp"><span class="km-tag padding">padding</span>' +
        '<div class="km-content">' + (sc.text || 'content') + '</div>' +
        '</div></div></div></div></div>';
      var el = document.createElement('div'); el.className = 'k-frame'; el.innerHTML = html;
      wrap.appendChild(el);
      focus.forEach(function (f, i) {
        setTimeout(function () {
          ['kmm', 'kmb', 'kmp'].forEach(function (id) {
            var e = el.querySelector('#' + id);
            if (e) e.classList.remove('km-dim');
          });
          var map = { margin: 'kmm', border: 'kmb', padding: 'kmp' };
          focus.forEach(function (g, j) {
            if (g !== f) { var e = el.querySelector('#' + map[g]); if (e) e.classList.add('km-dim'); }
          });
        }, i * per * 1000);
      });
      return wrap;
    },

    flex: function (sc) {
      var wrap = document.createElement('div'); wrap.className = 'k-frame-wrap';
      var frames = sc.frames || [];
      var per = sc.sd / frames.length;
      frames.forEach(function (f, i) {
        var el = document.createElement('div'); el.className = 'k-frame'; el.style.display = 'none';
        el.innerHTML =
          '<div class="k-col"><div class="km-flex" style="justify-content:' + (f.justify || 'flex-start') + ';align-items:' + (f.align || 'stretch') + ';flex-direction:' + (f.dir || 'row') + ';gap:' + (f.gap != null ? f.gap + 'vw' : '1.2vw') + '">' +
          '<div class="fx">1</div><div class="fx">2</div><div class="fx">3</div></div>' +
          '<div class="k-note mono" style="font-family:var(--k-mono);color:var(--k-accent2)">' + esc(f.css) + '</div></div>';
        wrap.appendChild(el);
        setTimeout(function () {
          wrap.querySelectorAll('.k-frame').forEach(function (x) { x.style.display = 'none'; });
          el.style.display = 'grid'; el.classList.add('animate-in');
        }, i * per * 1000);
      });
      return wrap;
    },

    transform: function (sc) {
      var wrap = document.createElement('div'); wrap.className = 'k-frame-wrap';
      var frames = sc.frames || [];
      var per = sc.sd / frames.length;
      var el = document.createElement('div'); el.className = 'k-frame';
      el.innerHTML = '<div class="k-col"><div class="km-transform" id="kmtr">' + (sc.emoji || '🚀') + '</div><div class="k-note mono" id="kmtt" style="font-family:var(--k-mono);color:var(--k-accent2)"></div></div>';
      wrap.appendChild(el);
      frames.forEach(function (f, i) {
        setTimeout(function () {
          el.querySelector('#kmtr').style.transform = f.css;
          el.querySelector('#kmtt').textContent = 'transform: ' + f.css;
        }, i * per * 1000);
      });
      return wrap;
    },

    custom: function (sc) {
      var el = document.createElement('div'); el.className = 'k-frame';
      el.innerHTML = L(sc.html);
      if (sc.css) { var st = document.createElement('style'); st.textContent = sc.css; el.appendChild(st); }
      return el;
    }
  };

  function typewrite(el, text, sc) {
    var speed = sc.typeSpeed != null ? sc.typeSpeed : Math.max(12, Math.min(60, (sc.sd * 520) / Math.max(1, text.length)));
    var i = 0;
    function step() {
      if (i > text.length) return;
      el.innerHTML = hl(text.slice(0, i)) + '<span class="caret"></span>';
      i += 1;
      setTimeout(step, speed);
    }
    step();
  }

  /* ---------- engine ---------- */
  function boot() {
    var X = window.EXPLAINER;
    if (!X) return;
    var stage = document.getElementById('stage');
    makeStars(stage);
    var flash = document.createElement('div'); flash.id = 'flash'; document.body.appendChild(flash);
    var prog = document.createElement('div'); prog.id = 'progress'; document.body.appendChild(prog);
    var cap = document.createElement('div'); cap.id = 'caption'; cap.innerHTML = '&nbsp;'; document.body.appendChild(cap);
    document.title = L(X.title);

    var natural = X.scenes.reduce(function (a, s) { return a + (s.dur || 6); }, 0);
    var scale = TOTAL > 0 ? TOTAL / natural : 1;
    var totalPlanned = SDS ? SDS.reduce(function (a, x) { return a + (x > 0 ? x : 1.6); }, 0) : (TOTAL || natural);

    var idx = -1, sceneEl = null, timer = null, elapsed = 0;
    function playScene(i) {
      idx = i;
      var sc = X.scenes[i];
      sc.sd = SDS ? (SDS[i] > 0 ? SDS[i] : 1.6) : Math.max(1.2, (sc.dur || 6) * scale);
      if (sceneEl) sceneEl.remove();
      sceneEl = document.createElement('div');
      sceneEl.className = 'scene enter';
      var b = BUILDERS[sc.type] || BUILDERS.custom;
      sceneEl.appendChild(b(sc));
      stage.appendChild(sceneEl);
      cap.innerHTML = sc.caption ? L(sc.caption) : '&nbsp;';
      var startAt = SDS ? SDS.slice(0, i).reduce(function (a, x) { return a + (x > 0 ? x : 1.6); }, 0) : (i / X.scenes.length) * (TOTAL || natural);
      prog.style.width = Math.min(100, (startAt / totalPlanned) * 100) + '%';
      flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go');
      if (sc.on) { try { sc.on(sceneEl, sc); } catch (e) { } }
      timer = setTimeout(next, sc.sd * 1000);
    }
    function next() {
      if (idx + 1 >= X.scenes.length) {
        if (LOOP) { playScene(0); } else { /* hold last frame */ }
        return;
      }
      playScene(idx + 1);
    }
    // hold: when not looping, last scene stays (video recorder stops at TOTAL anyway)
    playScene(0);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
