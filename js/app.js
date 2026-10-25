/* ============ App — bootstrap, router, title/onboarding/settings screens, starfield ============ */
(function () {
  /* ---------- aggregate all tracks ---------- */
  window.ALL_LEVELS = []
    .concat(window.LEVELS_HTML || [])
    .concat(window.LEVELS_CSS_A || [])
    .concat(window.LEVELS_CSS_B || [])
    .concat(window.LEVELS_JS_A || [])
    .concat(window.LEVELS_JS_B || [])
    .concat(window.LEVELS_FINAL || []);

  /* ---------- starfield canvas ---------- */
  function startStarfield() {
    var canvas = document.getElementById('starfield');
    var ctx = canvas.getContext('2d');
    var stars = [], W, H, shooting = null;
    function size() {
      W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight;
      stars = [];
      var n = Math.floor(W * H / 6000);
      for (var i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.4 + .3,
          v: Math.random() * .12 + .02,
          tw: Math.random() * Math.PI * 2,
          hue: Math.random() < .12 ? (Math.random() < .5 ? '#8fd0ff' : '#ffd0f0') : '#ffffff'
        });
      }
    }
    size();
    window.addEventListener('resize', size);
    var last = 0;
    function frame(ts) {
      var dt = Math.min(50, ts - last); last = ts;
      ctx.clearRect(0, 0, W, H);
      stars.forEach(function (s) {
        s.tw += dt / 700;
        s.y += s.v * dt / 16;
        if (s.y > H) s.y = 0;
        var a = .35 + .55 * Math.abs(Math.sin(s.tw));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.hue;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill();
      });
      ctx.globalAlpha = 1;
      // occasional shooting star
      if (!shooting && Math.random() < .0015) {
        shooting = document.createElement('div');
        shooting.className = 'shooting-star';
        shooting.style.left = (30 + Math.random() * 65) + 'vw';
        shooting.style.top = (5 + Math.random() * 30) + 'vh';
        document.body.appendChild(shooting);
        setTimeout(function () { shooting.remove(); shooting = null; }, 1200);
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- screens ---------- */
  function showTitle() {
    HUD.show(false);
    HUD.hideSpeech();
    var p = Progress.get();
    var scr = document.getElementById('screen');
    var fresh = Progress.isFresh();
    scr.innerHTML =
      '<div class="screen-title screen-swap">' +
      '  <div class="game-logo logo-in"><span class="grad">CODEQUEST</span><span class="l2">WEB ODYSSEY</span></div>' +
      '  <svg class="title-planet" viewBox="0 0 200 200"><defs><radialGradient id="pg" cx="35%" cy="32%"><stop offset="0%" stop-color="#a78bfa"/><stop offset="55%" stop-color="#6d4fe0"/><stop offset="100%" stop-color="#2a1a70"/></radialGradient></defs><ellipse cx="100" cy="100" rx="62" ry="62" fill="url(#pg)"/><ellipse cx="100" cy="104" rx="92" ry="18" fill="none" stroke="#38e0d8" stroke-width="5" opacity=".7" transform="rotate(-16 100 104)"/></svg>' +
      '  <div class="title-tagline">' + t('tagline') + '</div>' +
      '  <div class="title-actions">' +
      '    <button class="btn pulse" id="title-start">🚀 ' + (fresh ? t('start') : t('continueMission')) + '</button>' +
      '    <button class="btn secondary" id="title-lang">🌐 ES</button>' +
      '  </div>' +
      '  <div style="color:var(--text-dim);font-size:13px">100% offline · EN/ES · ' + ((window.ALL_LEVELS || []).length) + ' missions · 🎬 lesson videos · 🗣️ voice narration</div>' +
      '</div>';
    scr.querySelector('#title-start').addEventListener('click', function () {
      AudioEngine.sfx.whoosh();
      if (fresh) showOnboarding();
      else { AudioEngine.startMusic(); goMap(); }
    });
    scr.querySelector('#title-lang').addEventListener('click', function () {
      var np = Progress.get().lang === 'en' ? 'es' : 'en';
      Progress.setLang(np);
      Achievements.noteLangUsed();
      AudioEngine.sfx.click();
      showTitle();
    });
  }

  function showOnboarding(keepName) {
    var scr = document.getElementById('screen');
    var lang = Progress.get().lang;
    scr.innerHTML =
      '<div class="screen-onboard screen-swap"><div class="onboard-card glass">' +
      '  <div style="font-size:52px">🤖</div>' +
      '  <h2>' + t('welcomeAboard') + '!</h2>' +
      '  <p style="color:var(--text-dim)">' + t('tagline') + '</p>' +
      '  <div class="lang-pick">' +
      '    <button data-l="en" class="' + (lang === 'en' ? 'sel' : '') + '">🇬🇧 English</button>' +
      '    <button data-l="es" class="' + (lang === 'es' ? 'sel' : '') + '">🇪🇸 Español</button>' +
      '  </div>' +
      '  <input type="text" id="ob-name" maxlength="20" placeholder="' + t('yourName') + '" value="' + (keepName || '') + '" />' +
      '  <button class="btn pulse" id="ob-go">' + t('letsgo') + ' →</button>' +
      '</div></div>';
    scr.querySelectorAll('.lang-pick button').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.l === Progress.get().lang) return;
        var name = scr.querySelector('#ob-name').value;   // preserve across re-render
        Progress.setLang(b.dataset.l);
        Achievements.noteLangUsed();
        AudioEngine.sfx.click();
        showOnboarding(name);
      });
    });
    scr.querySelector('#ob-go').addEventListener('click', function () {
      var name = scr.querySelector('#ob-name').value.trim();
      Progress.setName(name || 'Pilot');
      AudioEngine.sfx.levelup();
      AudioEngine.startMusic();
      HUD.toast('👋 <b>' + (name || 'Pilot') + '</b> — ' + t('letsgo'));
      if (navigator.onLine === false) HUD.toast(t('offlineWarning'));
      goMap();
    });
  }

  function goMap() {
    HUD.show(true);
    HUD.mascotSkins();
    var p = Progress.get();
    if (p.streak.n > 1) HUD.toast('🔥 ' + t('dailyStreak', { n: p.streak.n }));
    var scr = document.getElementById('screen');
    MapScreen.render(scr);
  }

  function startLevel(id) {
    HUD.show(true);
    LevelRunner.start(id);
  }

  /* ---------- settings modal ---------- */
  function openSettings() {
    var p = Progress.get();
    var root = document.getElementById('modal-root');
    var skins = [
      { id: 'cosmo', cost: 0, ico: '🤖' },
      { id: 'nova', cost: 100, ico: '🟣' },
      { id: 'pixel', cost: 250, ico: '🟩' },
      { id: 'gold', cost: 500, ico: '🥇' }
    ];
    var skinHtml = skins.map(function (s) {
      var owned = p.skins.indexOf(s.id) >= 0;
      var equipped = p.skin === s.id;
      return '<div class="skin-card ' + (equipped ? 'sel' : '') + '" data-skin="' + s.id + '">' +
        '<div class="preview"><div class="mascot skin-' + s.id + '" style="position:static;width:70px"><div class="mascot-body"><div class="mascot-face"><div class="mascot-eye left"></div><div class="mascot-eye right"></div><div class="mascot-mouth"></div></div><div class="mascot-chest"></div></div></div></div>' +
        '<div style="font-size:13px;margin-top:14px">' + s.id.toUpperCase() + '</div>' +
        '<div style="font-size:12px;color:var(--gold)">' + (equipped ? '✅ ' + t('equipped') : owned ? t('owned') : '💎 ' + s.cost) + '</div></div>';
    }).join('');

    root.innerHTML =
      '<div class="modal-back"><div class="modal glass">' +
      '<h3>⚙️ ' + t('settings') + '</h3>' +
      setRow(t('sfxVolume'), '<input type="range" min="0" max="1" step="0.05" value="' + p.settings.sfx + '" id="set-sfx">') +
      setRow(t('musicVolume'), '<input type="range" min="0" max="1" step="0.05" value="' + p.settings.music + '" id="set-music">') +
      setRow(t('voiceOn'), '<div class="toggle ' + (p.settings.voice ? 'on' : '') + '" id="set-voice"></div>') +
      setRow(t('relaxedMode') + '<small>' + t('relaxedDesc') + '</small>', '<div class="toggle ' + (p.settings.relaxed ? 'on' : '') + '" id="set-relaxed"></div>') +
      '<h3 style="margin-top:20px">🤖 ' + t('skins') + '</h3><div class="skins">' + skinHtml + '</div>' +
      '<h3 style="margin-top:20px">💾 ' + t('exportSave') + '</h3>' +
      setRow(t('exportDesc'), '<button class="btn secondary small" id="set-export">📋</button>') +
      setRow(t('importDesc'), '<button class="btn secondary small" id="set-import">📥</button>') +
      setRow(t('resetDesc'), '<button class="btn warn small" id="set-reset">🗑️ ' + t('reset') + '</button>') +
      '<div class="modal-actions"><button class="btn small" data-act="close">' + t('close') + '</button></div>' +
      '</div></div>';

    var back = root.querySelector('.modal-back');
    back.addEventListener('click', function (e) { if (e.target === back || e.target.dataset.act === 'close') root.innerHTML = ''; });

    root.querySelector('#set-sfx').addEventListener('input', function (e) { Progress.setSetting('sfx', +e.target.value); AudioEngine.refreshVolumes(); AudioEngine.sfx.click(); });
    root.querySelector('#set-music').addEventListener('input', function (e) { Progress.setSetting('music', +e.target.value); AudioEngine.refreshVolumes(); AudioEngine.startMusic(); });
    root.querySelector('#set-voice').addEventListener('click', function (e) {
      var on = !e.target.classList.contains('on');
      Progress.setSetting('voice', on);
      e.target.classList.toggle('on', on);
    });
    root.querySelector('#set-relaxed').addEventListener('click', function (e) {
      var on = !e.target.classList.contains('on');
      Progress.setSetting('relaxed', on);
      e.target.classList.toggle('on', on);
      HUD.refresh();
    });
    root.querySelectorAll('.skin-card').forEach(function (c) {
      c.addEventListener('click', function () {
        var id = c.dataset.skin;
        var def = skins.find(function (s) { return s.id === id; });
        var pp = Progress.get();
        if (pp.skins.indexOf(id) < 0) {
          if (!Progress.spendGems(def.cost)) { HUD.toast('💎 ' + t('notEnoughGems')); AudioEngine.sfx.wrong(); return; }
          Progress.unlockSkin(id);
          AudioEngine.sfx.unlock();
          HUD.toast('🎉 ' + id.toUpperCase() + ' ' + t('owned') + '!');
        }
        Progress.setSkin(id);
        HUD.mascotSkins();
        AudioEngine.sfx.pickup();
        root.innerHTML = '';
        openSettings();
      });
    });
    root.querySelector('#set-export').addEventListener('click', function () {
      var code = Progress.exportCode();
      var ta = document.createElement('textarea');
      ta.value = code; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); HUD.toast('📋 ' + t('copied')); } catch (e) { }
      ta.remove();
    });
    root.querySelector('#set-import').addEventListener('click', function () {
      var code = prompt(t('importDesc'));
      if (!code) return;
      if (Progress.importCode(code)) { HUD.toast('✅ ' + t('saveImported')); HUD.refresh(); root.innerHTML = ''; goMap(); }
      else HUD.toast('❌ ' + t('invalidCode'));
    });
    root.querySelector('#set-reset').addEventListener('click', function () {
      LevelRunner.confirmModal('⚠️ ' + t('reset'), t('confirmReset'), function () {
        Progress.reset();
        HUD.refresh();
        root.innerHTML = '';
        showTitle();
      });
    });
  }
  function setRow(label, control) {
    return '<div class="set-row"><label>' + label + '</label>' + control + '</div>';
  }

  /* ---------- global wiring ---------- */
  /* ---------- certificate ---------- */
  function showCertificate() {
    HUD.show(true);
    var p = Progress.get();
    var scr = document.getElementById('screen');
    var stars = Progress.totalStars();
    scr.innerHTML =
      '<div class="screen-pad screen-swap"><div class="certificate">' +
      '  <div style="font-size:44px">🎓🚀</div>' +
      '  <h1>' + t('certificate') + '</h1>' +
      '  <p style="margin-top:14px;color:var(--text-dim)">CODEQUEST: WEB ODYSSEY</p>' +
      '  <div class="name">' + esc(p.name || 'Pilot') + '</div>' +
      '  <p>' + t('certBody') + '</p>' +
      '  <p style="margin-top:14px">⭐ ' + stars + ' / ' + ((window.ALL_LEVELS || []).length * 3) + ' · ⚡ ' + p.xp + ' XP · 💎 ' + p.gems + '</p>' +
      '  <div class="sig">' + new Date().toLocaleDateString() + ' — Commander Cosmo 🤖</div>' +
      '</div>' +
      '<div class="title-actions" style="margin-top:22px">' +
      '  <button class="btn teal" onclick="window.print()">🖨️ ' + t('print') + '</button>' +
      '  <button class="btn secondary" id="cert-map">🗺️ ' + t('toTheMap') + '</button>' +
      '</div></div>';
    scr.querySelector('#cert-map').addEventListener('click', goMap);
    HUD.confetti(160);
    AudioEngine.sfx.levelup();
    HUD.mascotMood('happy', 6000);
  }

  function wire() {
    document.getElementById('hud-home').addEventListener('click', function () { AudioEngine.sfx.click(); goMap(); });
    document.getElementById('hud-lang').addEventListener('click', function () {
      var np = Progress.get().lang === 'en' ? 'es' : 'en';
      Progress.setLang(np);
      Achievements.noteLangUsed();
      AudioEngine.sfx.click();
      goMap(); // re-render current screen with new language
    });
    document.getElementById('hud-settings').addEventListener('click', function () { AudioEngine.sfx.click(); openSettings(); });
    document.getElementById('hud-ach').addEventListener('click', function () { AudioEngine.sfx.click(); Achievements.openModal(); });
    // music starts after first engagement
    document.addEventListener('pointerdown', function once() {
      AudioEngine.startMusic();
      document.removeEventListener('pointerdown', once);
    });
  }

  function boot() {
    startStarfield();
    wire();
    HUD.mascotSkins();
    HUD.mascotMood('idle');
    Achievements.check();
    showTitle();
  }

  window.App = { show: function (what) { if (what === 'map') goMap(); else if (what === 'title') showTitle(); else if (what === 'certificate') showCertificate(); else if (what === 'level') { } }, startLevel: startLevel };
  document.addEventListener('DOMContentLoaded', boot);
  if (document.readyState !== 'loading') boot();
})();
