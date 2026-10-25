/* ============ Level runner — intro → learn → exercises → results ============ */
(function () {
  var state = null;

  function findLevel(id) { return (window.ALL_LEVELS || []).find(function (l) { return l.id === id; }); }

  function start(id) {
    var lv = findLevel(id);
    if (!lv) { App.show('map'); return; }
    Progress.touchStreak();
    state = {
      lv: lv,
      exIdx: 0,
      mistakes: 0,
      combo: 0,
      maxCombo: 0,
      phase: 'intro',
      hintsShown: 0
    };
    App.show('level');
    renderIntro();
  }

  function screenEl() { return document.getElementById('screen'); }

  function clearScreen() {
    Voice.stop();
    screenEl().innerHTML = '';
  }

  /* ---------------- INTRO ---------------- */
  function renderIntro() {
    var lv = state.lv;
    clearScreen();
    var el = document.createElement('div');
    el.className = 'screen-level screen-swap';
    el.innerHTML =
      '<div class="phase-wrap">' +
      '  <div class="phase-track" style="color:' + trackColor(lv.track) + '">' + trackName(lv.track) + ' · MISSION ' + lv.num + '</div>' +
      '  <div class="phase-title">🚀 ' + L(lv.title) + '</div>' +
      '  <div class="phase-narration" id="intro-narr"></div>' +
      '  <div class="title-actions">' +
      '    <button class="btn pulse" id="intro-go">🛸 ' + t('beginMission') + '</button>' +
      '    <button class="btn secondary" id="intro-video">🎬 ' + t('watchVideo') + '</button>' +
      '  </div>' +
      '</div>';
    screenEl().appendChild(el);
    HUD.mascotMood('happy', 4000);
    typewrite(el.querySelector('#intro-narr'), L(lv.narration));
    Voice.play(lv.id, 'intro', lv.narration);
    el.querySelector('#intro-go').addEventListener('click', function () {
      AudioEngine.sfx.whoosh();
      renderLearn();
    });
    el.querySelector('#intro-video').addEventListener('click', function () {
      if (lv.explainer) VideoModal.openVideo(lv.explainer, lv.title);
      AudioEngine.sfx.click();
    });
  }

  function typewrite(el, text) {
    el.innerHTML = '';
    var caret = '<span class="caret"></span>';
    var i = 0;
    var timer = setInterval(function () {
      i += 2;
      el.innerHTML = esc(text.slice(0, i)) + caret;
      if (i >= text.length) { clearInterval(timer); el.innerHTML = esc(text); }
    }, 18);
  }
  function esc(s) { return Sandbox.escapeHtml(s); }

  /* ---------------- LEARN ---------------- */
  function renderLearn() {
    var lv = state.lv;
    clearScreen();
    var el = document.createElement('div');
    el.className = 'screen-level screen-swap';
    el.innerHTML =
      '<div class="level-topbar"><button class="hud-btn" id="learn-back">← ' + t('toTheMap') + '</button></div>' +
      '<div class="level-body">' +
      '  <div class="panel-card glass" style="display:flex;flex-direction:column;gap:14px;align-items:center;text-align:center">' +
      '    <div class="ex-kind">📖 ' + t('learnPhase') + '</div>' +
      '    <div class="phase-title" style="font-size:30px">' + L(lv.title) + '</div>' +
      '    <div id="learn-embed" style="width:100%"></div>' +
      '    <div class="phase-narration" style="font-size:16px;color:var(--text-dim)" id="learn-sub">' + esc(L(lv.narration)) + '</div>' +
      '    <div class="title-actions">' +
      '      <button class="btn teal pulse" id="learn-start">🎯 ' + t('startExercises') + '</button>' +
      '      <button class="btn secondary" id="learn-voice">🔊 ' + t('replayVoice') + '</button>' +
      '      <button class="btn secondary" id="learn-video">🎬 ' + t('watchVideo') + '</button>' +
      '    </div>' +
      '  </div>' +
      '</div>';
    screenEl().appendChild(el);
    HUD.mascotMood('talk', 3000);

    var dur = (window.DURATIONS && DURATIONS[lv.id]) ? (DURATIONS[lv.id][Progress.get().lang] || 30) : 30;
    if (lv.explainer) VideoModal.embedExplainer(el.querySelector('#learn-embed'), lv.explainer, Math.round(dur));

    el.querySelector('#learn-start').addEventListener('click', function () { AudioEngine.sfx.whoosh(); renderExercise(); });
    el.querySelector('#learn-voice').addEventListener('click', function () { Voice.play(lv.id, 'intro', lv.narration); AudioEngine.sfx.click(); });
    el.querySelector('#learn-video').addEventListener('click', function () { if (lv.explainer) VideoModal.openVideo(lv.explainer, lv.title); AudioEngine.sfx.click(); });
    el.querySelector('#learn-back').addEventListener('click', function () { App.show('map'); });
  }

  /* ---------------- EXERCISES ---------------- */
  function renderExercise() {
    var lv = state.lv;
    clearScreen();
    var ex = lv.exercises[state.exIdx];
    var total = lv.exercises.length;

    var el = document.createElement('div');
    el.className = 'screen-level screen-swap';
    el.innerHTML =
      '<div class="level-topbar">' +
      '  <button class="hud-btn" id="ex-quit">✕</button>' +
      '  <div class="level-progress"><div class="fill" style="width:' + (state.exIdx / total * 100) + '%"></div></div>' +
      '  <span class="hud-glass" style="font-size:13px">' + t('exerciseN', { n: state.exIdx + 1, total: total }) + '</span>' +
      '  <span id="combo-slot"></span>' +
      '</div>' +
      '<div class="level-body" id="ex-host"></div>';
    screenEl().appendChild(el);
    el.querySelector('#ex-quit').addEventListener('click', function () {
      confirmModal(t('missionIntro'), t('toTheMap') + '?', function () { App.show('map'); });
    });
    updateCombo();

    var host = el.querySelector('#ex-host');
    var exEl = Exercises.render(host, ex, {
      correct: function (explain) { onCorrect(explain); },
      wrong: function (explain) { onWrong(explain); },
      reveal: function (solution) { onReveal(solution); }
    });

    // hint button
    var actions = exEl.querySelector('.ex-actions');
    if (!actions) { actions = document.createElement('div'); actions.className = 'ex-actions'; exEl.appendChild(actions); }
    var sp = document.createElement('div'); sp.className = 'spacer';
    actions.appendChild(sp);
    var hintBtn = document.createElement('button');
    hintBtn.className = 'btn secondary small';
    hintBtn.innerHTML = '💡 ' + t('hintCost');
    hintBtn.addEventListener('click', function () {
      if (!Progress.spendGems(10)) { HUD.toast('💎 ' + t('notEnoughGems')); AudioEngine.sfx.wrong(); return; }
      AudioEngine.sfx.pickup();
      state.hintsShown++;
      var hintBox = document.createElement('div');
      hintBox.className = 'hint-box';
      hintBox.innerHTML = '<b>💡 ' + t('hint') + ':</b> ' + (exEl._hint ? exEl._hint() : (ex.hint ? L(ex.hint) : ''));
      exEl.insertBefore(hintBox, actions);
      hintBtn.disabled = true;
    });
    actions.appendChild(hintBtn);
  }

  function updateCombo() {
    var slot = document.getElementById('combo-slot');
    if (!slot) return;
    if (state.combo >= 2) {
      slot.innerHTML = '<span class="combo-badge">🔥 ' + t('comboX', { n: comboMult().toFixed(2).replace(/\.?0+$/, '') }) + '</span>';
    } else slot.innerHTML = '';
  }
  function comboMult() { return Math.min(2, 1 + state.combo * .1); }

  function showFeedback(exEl, ok, explain) {
    var old = exEl.querySelector('.ex-feedback');
    if (old) old.remove();
    // if the exercise already rendered a detailed feedback list, don't bury it
    if (ok && exEl.querySelector('.sandbox-wrap') && exEl.querySelector('.ex-feedback.good, .ex-feedback.bad')) return;
    var fb = document.createElement('div');
    fb.className = 'ex-feedback ' + (ok ? 'good' : 'bad');
    var msg = ok ? (explain ? L(explain) : t('fbCorrect')) : (explain ? L(explain) : t('fbWrong'));
    fb.innerHTML = '<span class="ico">' + (ok ? '🎉' : '💥') + '</span><div><b>' + (ok ? t('correct') : t('incorrect')) + '</b> ' + msg + '</div>';
    exEl.appendChild(fb);
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function onCorrect(explain) {
    var ex = state.lv.exercises[state.exIdx];
    var exEl = document.querySelector('.ex-card');
    showFeedback(exEl, true, explain);
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    if (state.combo >= 5) Achievements.noteCombo(state.combo);
    AudioEngine.sfx.correct();
    if (state.combo >= 2) AudioEngine.sfx.combo(state.combo);
    HUD.mascotMood('happy', 2000);
    updateCombo();

    var base = 20;
    var xp = Math.round(base * comboMult());
    var before = Progress.get().xp;
    var lvl = Progress.addXP(xp);
    HUD.xpFloat(xp);
    if (ex.type === 'arcade') Achievements.noteArcade(400);

    state.exIdx++;
    setTimeout(function () {
      if (lvl) { AudioEngine.sfx.levelup(); HUD.confetti(50); HUD.toast('🆙 <b>' + t('level') + ' ' + lvl + '!</b>', { gold: true }); }
      if (state.exIdx >= state.lv.exercises.length) renderResults();
      else renderExercise();
    }, 1100);
  }

  function onWrong(explain) {
    state.combo = 0;
    state.mistakes++;
    AudioEngine.sfx.wrong();
    HUD.mascotMood('sad', 2000);
    var n = Progress.loseHeart();
    var hw = document.getElementById('hud-hearts');
    if (hw) { hw.classList.remove('beating'); void hw.offsetWidth; hw.classList.add('beating'); }
    if (n === 0) {
      renderHeartsZero();
      return false;
    }
    updateCombo();
    return true;
  }

  function onReveal(solution) {
    state.combo = 0;
    state.mistakes++;
    var exEl = document.querySelector('.ex-card');
    if (solution) showFeedback(exEl, false, { en: 'Solution: ' + solution, es: 'Solución: ' + solution });
    AudioEngine.sfx.wrong();
    updateCombo();
    state.exIdx++;
    setTimeout(function () {
      if (state.exIdx >= state.lv.exercises.length) renderResults();
      else renderExercise();
    }, 1600);
  }

  function renderHeartsZero() {
    Voice.stop();
    var el = document.createElement('div');
    el.className = 'modal-back';
    el.innerHTML =
      '<div class="modal glass hearts-zero">' +
      '  <div class="big">💔🚀</div>' +
      '  <h3>' + t('missionFailed') + '</h3>' +
      '  <p style="color:var(--text-dim)">' + (Progress.get().settings.relaxed ? '' : 'Hearts refill over time, or spend gems.') + '</p>' +
      '  <div class="modal-actions" style="justify-content:center">' +
      '    <button class="btn warn" id="hz-retry">🔄 ' + t('retryMission') + '</button>' +
      (Progress.get().gems >= 30 ? '<button class="btn teal" id="hz-refill">💎 30 → ' + t('refillHearts') + '</button>' : '') +
      '    <button class="btn secondary" id="hz-map">🗺️ ' + t('toTheMap') + '</button>' +
      '  </div>' +
      '</div>';
    document.getElementById('modal-root').appendChild(el);
    el.querySelector('#hz-retry').addEventListener('click', function () { el.remove(); AudioEngine.sfx.click(); start(state.lv.id); });
    var refill = el.querySelector('#hz-refill');
    if (refill) refill.addEventListener('click', function () {
      Progress.spendGems(30); Progress.refillHearts();
      el.remove(); AudioEngine.sfx.unlock(); start(state.lv.id);
    });
    el.querySelector('#hz-map').addEventListener('click', function () { el.remove(); App.show('map'); });
  }

  /* ---------------- RESULTS ---------------- */
  function renderResults() {
    var lv = state.lv;
    clearScreen();
    var stars = state.mistakes === 0 ? 3 : state.mistakes <= 2 ? 2 : 1;
    var gems = 5 * stars;
    var xpTotal = 60 + 30 * stars;
    Progress.completeLevel(lv.id, stars, state.mistakes);
    var lvlUp = Progress.addXP(xpTotal);
    Progress.addGems(gems);
    if (state.mistakes === 0) Progress._cache().levels[lv.id].mistakes = 0;
    Progress.save();

    var el = document.createElement('div');
    el.className = 'screen-level screen-swap';
    var perfect = state.mistakes === 0;
    el.innerHTML =
      '<div class="phase-wrap">' +
      '  <div class="phase-track" style="color:' + trackColor(lv.track) + '">' + trackName(lv.track) + '</div>' +
      '  <div class="phase-title">' + (perfect ? '🏆 ' : '✅ ') + t('results') + '</div>' +
      '  <div class="star-row">' +
      '    <span class="star" data-s="0">⭐</span><span class="star" data-s="1">⭐</span><span class="star" data-s="2">⭐</span>' +
      '  </div>' +
      '  <div class="results-stats">' +
      '    <span class="stat-pill">⚡ +' + xpTotal + ' XP</span>' +
      '    <span class="stat-pill">💎 +' + gems + '</span>' +
      '    <span class="stat-pill">💥 ' + state.mistakes + ' mistakes</span>' +
      '    <span class="stat-pill">🔥 ×' + (1 + state.maxCombo * .1).toFixed(1) + ' best combo</span>' +
      '  </div>' +
      '  <div class="title-actions">' +
      '    <button class="btn pulse" id="res-next">' + nextLabel() + ' →</button>' +
      '    <button class="btn secondary" id="res-map">🗺️ ' + t('toTheMap') + '</button>' +
      '  </div>' +
      '</div>';
    screenEl().appendChild(el);

    if (perfect) HUD.toast('💎 <b>' + t('perfectRun') + '</b>', { gold: true });

    // animate stars
    var starEls = el.querySelectorAll('.star');
    for (var i = 0; i < stars; i++) {
      (function (idx) {
        setTimeout(function () {
          starEls[idx].classList.add('lit');
          AudioEngine.sfx.star(idx);
        }, 400 + idx * 450);
      })(i);
    }
    setTimeout(function () { HUD.confetti(stars === 3 ? 130 : 70); AudioEngine.sfx.levelup(); }, 400);
    HUD.mascotMood('happy', 5000);

    Voice.play(lv.id, 'outro', lv.outro || lv.narration);
    if (lvlUp) setTimeout(function () { HUD.toast('🆙 <b>' + t('level') + ' ' + lvlUp + '!</b>', { gold: true }); AudioEngine.sfx.levelup(); }, 1400);

    el.querySelector('#res-next').addEventListener('click', function () {
      AudioEngine.sfx.whoosh();
      var nid = Progress.nextLevelId();
      if (nid) start(nid);
      else App.show('certificate');
    });
    el.querySelector('#res-map').addEventListener('click', function () { App.show('map'); });

    Achievements.check();
  }

  function nextLabel() {
    var nid = Progress.nextLevelId();
    if (!nid) return '🎓 ' + t('certificate');
    return t('nextMission');
  }

  function trackColor(track) {
    return { html: 'var(--html)', css: 'var(--css)', js: 'var(--js)', final: 'var(--final)' }[track] || 'var(--accent)';
  }
  function trackName(track) {
    var key = { html: 'htmlTrack', css: 'cssTrack', js: 'jsTrack', final: 'finalTrack' }[track];
    return key ? t(key) : '';
  }

  function confirmModal(title, msg, onYes) {
    var el = document.createElement('div');
    el.className = 'modal-back';
    el.innerHTML = '<div class="modal glass"><h3>' + esc(title) + '</h3><p>' + esc(msg) + '</p>' +
      '<div class="modal-actions"><button class="btn warn small" id="cm-y">' + t('yes') + '</button>' +
      '<button class="btn secondary small" id="cm-n">' + t('cancel') + '</button></div></div>';
    document.getElementById('modal-root').appendChild(el);
    el.querySelector('#cm-y').addEventListener('click', function () { el.remove(); onYes(); });
    el.querySelector('#cm-n').addEventListener('click', function () { el.remove(); });
  }

  window.LevelRunner = { start: start, confirmModal: confirmModal, getDebugState: function () { return state ? { levelId: state.lv.id, exIdx: state.exIdx, mistakes: state.mistakes } : null; } };
})();
