/* ============ Progress — localStorage save/load, hearts, streaks, XP, export/import ============ */
(function () {
  var KEY = 'codequest-save-v1';
  var HEART_REGEN_MS = 20 * 60 * 1000; // 1 heart / 20 min
  var MAX_HEARTS = 5;
  var cache = null;

  function defaults() {
    return {
      v: 1,
      name: '',
      lang: 'en',
      created: Date.now(),
      xp: 0, gems: 0,
      hearts: { n: MAX_HEARTS, ts: Date.now() },
      streak: { n: 0, last: '' },
      levels: {},            // id -> {stars, best, done, tries, mistakes}
      ach: {},               // id -> timestamp
      skins: ['cosmo'], skin: 'cosmo',
      watched: {},           // videoId -> ts
      settings: { sfx: .8, music: .35, voice: true, relaxed: false }
    };
  }

  function load() {
    if (cache) return cache;
    try {
      var raw = localStorage.getItem(KEY);
      cache = raw ? deepMerge(defaults(), JSON.parse(raw)) : defaults();
    } catch (e) { cache = defaults(); }
    regenHearts();
    return cache;
  }
  function save() {
    if (!cache) return;
    try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) { /* storage full/blocked */ }
    if (window.HUD) HUD.refresh();
  }
  function deepMerge(base, over) {
    if (over == null || typeof over !== 'object') return base;
    for (var k in over) {
      if (over[k] && typeof over[k] === 'object' && !Array.isArray(over[k]) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) deepMerge(base[k], over[k]);
      else base[k] = over[k];
    }
    return base;
  }

  function regenHearts() {
    if (!cache || cache.settings.relaxed) return;
    var elapsed = Date.now() - (cache.hearts.ts || Date.now());
    var gained = Math.floor(elapsed / HEART_REGEN_MS);
    if (gained > 0 && cache.hearts.n < MAX_HEARTS) {
      cache.hearts.n = Math.min(MAX_HEARTS, cache.hearts.n + gained);
    }
    cache.hearts.ts = Date.now();
  }

  var Progress = {
    MAX_HEARTS: MAX_HEARTS,
    get: load,
    save: save,

    isFresh: function () { return Object.keys(cache.levels).length === 0 && !cache.name; },

    setName: function (n) { cache.name = n; save(); },
    setLang: function (l) { cache.lang = l === 'es' ? 'es' : 'en'; save(); },

    playerLevel: function () { return Math.floor(cache.xp / 250) + 1; },
    playerLevelProgress: function () { return (cache.xp % 250) / 250; },

    addXP: function (n) {
      var before = this.playerLevel();
      cache.xp += n;
      var after = this.playerLevel();
      save();
      return after > before ? after : 0; // returns new level if leveled up
    },
    addGems: function (n) { cache.gems = Math.max(0, cache.gems + n); save(); },
    spendGems: function (n) {
      if (cache.gems < n) return false;
      cache.gems -= n; save(); return true;
    },

    // ---- hearts ----
    hearts: function () { regenHearts(); return cache.settings.relaxed ? Infinity : cache.hearts.n; },
    loseHeart: function () {
      if (cache.settings.relaxed) return this.hearts();
      cache.hearts.n = Math.max(0, cache.hearts.n - 1);
      cache.hearts.ts = Date.now();
      save();
      return cache.hearts.n;
    },
    refillHearts: function () { cache.hearts.n = MAX_HEARTS; cache.hearts.ts = Date.now(); save(); },

    // ---- daily streak ----
    touchStreak: function () {
      var today = new Date().toDateString();
      if (cache.streak.last === today) return cache.streak.n;
      var yest = new Date(Date.now() - 864e5).toDateString();
      cache.streak.n = (cache.streak.last === yest) ? cache.streak.n + 1 : 1;
      cache.streak.last = today;
      save();
      return cache.streak.n;
    },

    // ---- levels ----
    levelStats: function (id) { return cache.levels[id] || null; },
    completeLevel: function (id, stars, mistakes) {
      var prev = cache.levels[id] || { stars: 0, best: 0, done: false, tries: 0 };
      prev.tries++;
      prev.done = true;
      prev.stars = Math.max(prev.stars, stars);
      prev.mistakes = Math.min(prev.mistakes == null ? 99 : prev.mistakes, mistakes);
      cache.levels[id] = prev;
      save();
    },

    isUnlocked: function (orderIndex) {
      // level 0 always unlocked; others need previous done
      if (orderIndex <= 0) return true;
      var prev = window.ALL_LEVELS && ALL_LEVELS[orderIndex - 1];
      return prev ? !!(cache.levels[prev.id] && cache.levels[prev.id].done) : false;
    },
    nextLevelId: function () {
      if (!window.ALL_LEVELS) return null;
      for (var i = 0; i < ALL_LEVELS.length; i++) {
        var st = cache.levels[ALL_LEVELS[i].id];
        if (!st || !st.done) return ALL_LEVELS[i].id;
      }
      return null;
    },
    totalStars: function () {
      var n = 0; for (var id in cache.levels) n += cache.levels[id].stars || 0;
      return n;
    },
    completedCount: function () {
      var n = 0; for (var id in cache.levels) if (cache.levels[id].done) n++;
      return n;
    },
    markWatched: function (vid) { cache.watched[vid] = Date.now(); save(); },
    watchedCount: function () { return Object.keys(cache.watched).length; },

    // ---- achievements & skins ----
    grantAch: function (id) {
      if (!cache.ach[id]) { cache.ach[id] = Date.now(); save(); return true; }
      return false;
    },
    hasAch: function (id) { return !!cache.ach[id]; },
    unlockSkin: function (id) { if (cache.skins.indexOf(id) < 0) { cache.skins.push(id); save(); } },
    setSkin: function (id) { cache.skin = id; save(); },

    // ---- settings ----
    setSetting: function (k, v) { cache.settings[k] = v; save(); },

    // ---- export / import ----
    exportCode: function () {
      try { return btoa(unescape(encodeURIComponent(JSON.stringify(cache)))); } catch (e) { return ''; }
    },
    importCode: function (code) {
      try {
        var obj = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
        if (!obj || typeof obj !== 'object' || !('xp' in obj)) return false;
        cache = deepMerge(defaults(), obj);
        save();
        return true;
      } catch (e) { return false; }
    },
    reset: function () { cache = defaults(); save(); },

    // debug helper
    _cache: function () { return cache; }
  };

  window.Progress = Progress;
})();
