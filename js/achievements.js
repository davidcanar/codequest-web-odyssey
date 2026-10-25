/* ============ Achievements — badges, conditions, unlock flow ============ */
(function () {
  var DEFS = [
    { id: 'first-mission', ico: '🚀', name: { en: 'First Launch', es: 'Primer despegue' }, desc: { en: 'Complete your first mission', es: 'Completa tu primera misión' } },
    { id: 'first-star', ico: '⭐', name: { en: 'Star Pilot', es: 'Piloto estelar' }, desc: { en: 'Earn your first star', es: 'Gana tu primera estrella' } },
    { id: 'perfect', ico: '💎', name: { en: 'Flawless Flight', es: 'Vuelo impecable' }, desc: { en: 'Finish a mission with 3 stars', es: 'Termina una misión con 3 estrellas' } },
    { id: 'html-master', ico: '🟣', name: { en: 'Nebula Liberator', es: 'Liberador de la Nebulosa' }, desc: { en: 'Complete the HTML Nebula', es: 'Completa la Nebulosa HTML' } },
    { id: 'css-master', ico: '🩵', name: { en: 'CSS Royalty', es: 'Realeza CSS' }, desc: { en: 'Complete the CSS Kingdom', es: 'Completa el Reino CSS' } },
    { id: 'js-master', ico: '🟠', name: { en: 'Galaxy Coder', es: 'Codificador galáctico' }, desc: { en: 'Complete the JavaScript Galaxy', es: 'Completa la Galaxia JavaScript' } },
    { id: 'graduate', ico: '🎓', name: { en: 'Graduate', es: 'Graduado' }, desc: { en: 'Finish all missions', es: 'Termina todas las misiones' } },
    { id: 'combo-5', ico: '🔥', name: { en: 'On Fire', es: 'En racha' }, desc: { en: 'Reach a ×2 combo', es: 'Alcanza un combo ×2' } },
    { id: 'streak-3', ico: '📅', name: { en: 'Regular', es: 'Constancia' }, desc: { en: '3-day streak', es: 'Racha de 3 días' } },
    { id: 'streak-7', ico: '🗓️', name: { en: 'Unstoppable', es: 'Imparable' }, desc: { en: '7-day streak', es: 'Racha de 7 días' } },
    { id: 'xp-1000', ico: '⚡', name: { en: 'Charged Up', es: 'Cargado' }, desc: { en: 'Earn 1,000 XP', es: 'Gana 1,000 XP' } },
    { id: 'xp-5000', ico: '🌟', name: { en: 'Supernova', es: 'Supernova' }, desc: { en: 'Earn 5,000 XP', es: 'Gana 5,000 XP' } },
    { id: 'viewer-10', ico: '🎬', name: { en: 'Film Buff', es: 'Cinefilo' }, desc: { en: 'Watch 10 lesson videos', es: 'Mira 10 videos de lecciones' } },
    { id: 'polyglot', ico: '🌐', name: { en: 'Polyglot Pilot', es: 'Piloto políglota' }, desc: { en: 'Play in both languages', es: 'Juega en ambos idiomas' } },
    { id: 'meteor-ace', ico: '☄️', name: { en: 'Meteor Ace', es: 'As de meteoros' }, desc: { en: 'Score 400+ in Meteor Fixer', es: 'Puntúa 400+ en Cazameteoros' } }
  ];

  function check() {
    var p = Progress.get();
    var newly = [];
    function grant(id) { if (Progress.grantAch(id)) newly.push(id); }

    var doneCount = Progress.completedCount();
    if (doneCount >= 1) grant('first-mission');
    if (Progress.totalStars() >= 1) grant('first-star');
    var any3 = Object.keys(p.levels).some(function (k) { return p.levels[k].stars === 3; });
    if (any3) grant('perfect');
    var trackDone = function (track, total) {
      var list = (window.ALL_LEVELS || []).filter(function (l) { return l.track === track; });
      return list.length > 0 && list.every(function (l) { return p.levels[l.id] && p.levels[l.id].done; });
    };
    if (trackDone('html')) grant('html-master');
    if (trackDone('css')) grant('css-master');
    if (trackDone('js')) grant('js-master');
    if (doneCount >= (window.ALL_LEVELS || []).length && (window.ALL_LEVELS || []).length > 0) grant('graduate');
    if (Progress.totalStars() >= 1 && doneCount >= 1 && Object.keys(p.levels).some(function (k) { return p.levels[k].mistakes === 0; })) grant('perfect');
    if (p.streak.n >= 3) grant('streak-3');
    if (p.streak.n >= 7) grant('streak-7');
    if (p.xp >= 1000) grant('xp-1000');
    if (p.xp >= 5000) grant('xp-5000');
    if (Progress.watchedCount() >= 10) grant('viewer-10');

    newly.forEach(function (id) {
      var d = DEFS.find(function (x) { return x.id === id; });
      AudioEngine.sfx.achievement();
      HUD.toast('<b>🏆 ' + t('achUnlocked') + '</b><br>' + d.ico + ' ' + L(d.name), { gold: true, ms: 5000 });
    });
    return newly;
  }

  function noteCombo(maxCombo) { if (maxCombo >= 5) Progress.grantAch('combo-5'); }
  function noteArcade(score) { if (score >= 400) Progress.grantAch('meteor-ace'); }
  function noteLangUsed() {
    var p = Progress.get();
    var langs = window._langsUsed = window._langsUsed || {};
    langs[p.lang] = true;
    if (langs.en && langs.es) Progress.grantAch('polyglot');
  }

  function openModal() {
    var p = Progress.get();
    var root = document.getElementById('modal-root');
    var cards = DEFS.map(function (d) {
      var when = p.ach[d.id] ? new Date(p.ach[d.id]).toLocaleDateString() : '';
      return '<div class="ach-card ' + (p.ach[d.id] ? '' : 'locked') + '">' +
        '<div class="ico">' + d.ico + '</div><h4>' + L(d.name) + '</h4><p>' + L(d.desc) + '</p>' +
        (when ? '<div class="when">📅 ' + when + '</div>' : '') + '</div>';
    }).join('');
    root.innerHTML = '<div class="modal-back"><div class="modal glass">' +
      '<h3>🏆 ' + t('achievements') + ' <span style="font-size:15px;color:var(--text-dim)">(' + Object.keys(p.ach).length + '/' + DEFS.length + ')</span></h3>' +
      '<div class="ach-grid">' + cards + '</div>' +
      '<div class="modal-actions"><button class="btn secondary small" data-act="close">' + t('close') + '</button></div></div></div>';
    root.querySelector('.modal-back').addEventListener('click', function (e) {
      if (e.target === this || e.target.dataset.act === 'close') root.innerHTML = '';
    });
  }

  window.Achievements = { DEFS: DEFS, check: check, noteCombo: noteCombo, noteArcade: noteArcade, noteLangUsed: noteLangUsed, openModal: openModal };
})();
