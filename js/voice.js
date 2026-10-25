/* ============ Voice — plays pre-generated msedge-tts narration MP3s with subtitles ============ */
(function () {
  var current = null;   // Audio element
  var subEl = null;     // subtitle element (created on demand)

  function ensureSubEl() {
    if (!subEl) {
      subEl = document.createElement('div');
      subEl.id = 'voice-subs';
      subEl.style.cssText = 'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:60;max-width:min(760px,90vw);padding:12px 22px;border-radius:14px;background:rgba(8,12,34,.9);border:1px solid rgba(140,160,255,.3);font-size:15.5px;line-height:1.5;color:#dfe6ff;display:none;backdrop-filter:blur(8px);';
      document.body.appendChild(subEl);
    }
    return subEl;
  }

  function pathFor(levelId, part, lang) {
    return 'assets/audio/' + lang + '/' + levelId + '-' + part + '.mp3';
  }

  function stop() {
    if (current) { current.pause(); current.currentTime = 0; current = null; }
    if (subEl) subEl.style.display = 'none';
  }

  // Plays assets/audio/{lang}/{levelId}-{part}.mp3 and shows text as subtitle.
  // Returns a promise resolving when playback ends (or immediately if unavailable/silent).
  function play(levelId, part, textObj, opts) {
    opts = opts || {};
    stop();
    var p = Progress.get();
    var lang = p.lang;
    var text = typeof textObj === 'string' ? textObj : (textObj ? textObj[lang] || textObj.en : '');
    var src = pathFor(levelId, part, lang);

    var done;
    var promise = new Promise(function (res) { done = res; });
    var finished = false;
    function finish() { if (!finished) { finished = true; if (subEl) subEl.style.display = 'none'; if (opts.onend) opts.onend(); done(); } }

    if (!p.settings.voice) { if (opts.showSubs !== false && text) showSub(text); setTimeout(finish, Math.min(9000, 1500 + text.length * 45)); return promise; }

    var a = new Audio(src);
    current = a;
    if (opts.showSubs !== false && text) {
      showSub(text);
      a.addEventListener('timeupdate', function tick() {
        // keep subtitle visible; simple approach — hide near end
        if (a.duration && a.currentTime > a.duration - .4) if (subEl) subEl.style.display = 'none';
      });
    }
    a.addEventListener('ended', finish);
    a.addEventListener('error', function () { if (opts.showSubs !== false && text) showSub(text); setTimeout(finish, Math.min(9000, 1500 + text.length * 45)); });
    a.play().catch(function () { /* autoplay blocked: user will click */ });
    return promise;
  }

  function showSub(text) {
    var el = ensureSubEl();
    el.textContent = '🗣️ ' + text;
    el.style.display = 'block';
  }

  // check whether a narration file exists (for buttons)
  var probeCache = {};
  function available(levelId, part) {
    var p = Progress.get();
    var src = pathFor(levelId, part, p.lang);
    if (probeCache[src] != null) return Promise.resolve(probeCache[src]);
    return new Promise(function (res) {
      var a = new Audio();
      a.addEventListener('canplaythrough', function () { probeCache[src] = true; res(true); });
      a.addEventListener('error', function () { probeCache[src] = false; res(false); });
      a.src = src;
      setTimeout(function () { if (probeCache[src] == null) { probeCache[src] = false; res(false); } }, 2500);
    });
  }

  window.Voice = { play: play, stop: stop, available: available };
})();
