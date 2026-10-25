/* ============ HUD — top bar refresh + mascot moods + toasts + confetti ============ */
(function () {
  function refresh() {
    var p = Progress.get();
    var el = function (id) { return document.getElementById(id); };
    if (el('hud-lvl')) el('hud-lvl').textContent = 'LV ' + Progress.playerLevel();
    if (el('hud-xpfill')) el('hud-xpfill').style.width = (Progress.playerLevelProgress() * 100).toFixed(1) + '%';
    if (el('hud-xptext')) el('hud-xptext').textContent = p.xp + ' XP';
    if (el('hud-gems')) el('hud-gems').textContent = p.gems;
    if (el('hud-streak')) el('hud-streak').textContent = p.streak.n;
    var h = el('hud-hearts');
    if (h) {
      var n = Progress.hearts();
      h.textContent = n === Infinity ? '❤️∞' : '❤️×' + n;
    }
    var langBtn = el('hud-lang');
    if (langBtn) langBtn.textContent = '🌐 ' + p.lang.toUpperCase();
  }

  function show(b) {
    var hud = document.getElementById('hud');
    if (hud) hud.classList.toggle('hidden', !b);
    refresh();
  }

  function mascotMood(mood, ms) {
    var m = document.getElementById('mascot');
    if (!m) return;
    ['mood-idle', 'mood-happy', 'mood-sad', 'mood-talk'].forEach(function (c) { m.classList.remove(c); });
    m.classList.add('mood-' + (mood || 'idle'));
    m.classList.remove('hidden');
    if (ms) setTimeout(function () { mascotMood('idle'); }, ms);
  }
  function mascotSkins() {
    var m = document.getElementById('mascot');
    if (m) { m.className = m.className.replace(/skin-\w+/g, '').trim(); m.classList.add('skin-' + Progress.get().skin); }
  }

  var speechEl = null, speechTimer = null;
  function say(text, ms) {
    if (!text) return;
    hideSpeech();
    speechEl = document.createElement('div');
    speechEl.className = 'speech';
    speechEl.textContent = text;
    document.body.appendChild(speechEl);
    mascotMood('talk');
    speechTimer = setTimeout(hideSpeech, ms || 4200);
  }
  function hideSpeech() {
    if (speechTimer) { clearTimeout(speechTimer); speechTimer = null; }
    if (speechEl) { speechEl.remove(); speechEl = null; }
    mascotMood('idle');
  }

  function toast(html, opts) {
    opts = opts || {};
    var root = document.getElementById('toast-root');
    var el = document.createElement('div');
    el.className = 'toast' + (opts.gold ? ' ach-pop' : '');
    el.innerHTML = html;
    root.appendChild(el);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 450); }, opts.ms || 3400);
  }

  function xpFloat(amount, x, y) {
    var el = document.createElement('div');
    el.className = 'xp-float';
    el.textContent = '+' + amount + ' XP';
    el.style.left = (x || window.innerWidth / 2) + 'px';
    el.style.top = (y || window.innerHeight / 2) + 'px';
    el.style.transform = 'translateX(-50%)';
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 1300);
  }

  // ---- confetti ----
  var COLORS = ['#7c6cff', '#38e0d8', '#ffd75e', '#ff7ad9', '#3ddc84', '#ff9f43'];
  function confetti(n, originY) {
    n = n || 90;
    var root = document.getElementById('confetti-root');
    for (var i = 0; i < n; i++) {
      (function () {
        var el = document.createElement('div');
        el.className = 'confetti-piece';
        var s = 6 + Math.random() * 8;
        el.style.width = s + 'px';
        el.style.height = s * (Math.random() < .5 ? 1 : .45) + 'px';
        el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
        el.style.borderRadius = Math.random() < .4 ? '50%' : '2px';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = (originY || -20) + 'px';
        root.appendChild(el);
        var xDrift = (Math.random() - .5) * 260;
        var rot = (Math.random() - .5) * 900;
        var dur = 2200 + Math.random() * 1800;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var t = (ts - start) / dur;
          if (t >= 1) { el.remove(); return; }
          el.style.transform = 'translate(' + (xDrift * t) + 'px,' + (t * t * (window.innerHeight + 140)) + 'px) rotate(' + rot * t + 'deg)';
          el.style.opacity = 1 - t * t;
          requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      })();
    }
  }

  window.HUD = { refresh: refresh, show: show, mascotMood: mascotMood, mascotSkins: mascotSkins, say: say, hideSpeech: hideSpeech, toast: toast, xpFloat: xpFloat, confetti: confetti };
})();
