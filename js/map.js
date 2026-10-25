/* ============ Map — galaxy world map with track sections and level nodes ============ */
(function () {
  var TRACK_META = {
    html: { cls: 'sec-html', ico: '🌐', titleKey: 'htmlTrack', subKey: 'htmlTrackSub', color: 'var(--html)' },
    css: { cls: 'sec-css', ico: '🎨', titleKey: 'cssTrack', subKey: 'cssTrackSub', color: 'var(--css)' },
    js: { cls: 'sec-js', ico: '⚡', titleKey: 'jsTrack', subKey: 'jsTrackSub', color: 'var(--js)' },
    final: { cls: 'sec-final', ico: '👑', titleKey: 'finalTrack', subKey: 'finalTrackSub', color: 'var(--final)' }
  };

  function render(container) {
    var all = window.ALL_LEVELS || [];
    var p = Progress.get();
    var done = Progress.completedCount();
    container.innerHTML =
      '<div class="screen-map screen-swap">' +
      '<div class="deco-planet p1"></div><div class="deco-planet p2"></div><div class="deco-planet p3"></div>' +
      '<div class="map-inner">' +
      '<div class="map-progress">' + t('mapProgress') + ': <b>' + done + '/' + all.length + '</b> missions · ⭐ <b>' + Progress.totalStars() + '</b>/' + (all.length * 3) + '</div>' +
      '</div></div>';
    var inner = container.querySelector('.map-inner');

    // group levels by track preserving order
    var sections = [];
    all.forEach(function (lv) {
      var last = sections[sections.length - 1];
      if (!last || last.track !== lv.track) { last = { track: lv.track, levels: [] }; sections.push(last); }
      last.levels.push(lv);
    });

    var nextId = Progress.nextLevelId();

    sections.forEach(function (sec) {
      var meta = TRACK_META[sec.track] || TRACK_META.html;
      var el = document.createElement('div');
      el.className = 'map-section ' + meta.cls;
      el.innerHTML =
        '<div class="map-section-head"><div class="badge">' + meta.ico + '</div>' +
        '<div><h3>' + t(meta.titleKey) + '</h3><p>' + t(meta.subKey) + '</p></div></div>' +
        '<div class="path-wrap"><svg class="path-svg"><path d=""/></svg><div class="nodes"></div></div>';
      var nodesWrap = el.querySelector('.nodes');
      var rows = [];
      var PER_ROW = 5;

      sec.levels.forEach(function (lv, i) {
        var rowIdx = Math.floor(i / PER_ROW);
        if (!rows[rowIdx]) { rows[rowIdx] = document.createElement('div'); rows[rowIdx].className = 'node-row'; nodesWrap.appendChild(rows[rowIdx]); }
        var st = p.levels[lv.id];
        var unlocked = Progress.isUnlocked(all.indexOf(lv));
        var isNext = lv.id === nextId;
        var isBoss = /boss|final|grad/.test(lv.id);
        var node = document.createElement('div');
        node.className = 'map-node' + (unlocked ? '' : ' locked') + (isNext ? ' next' : '') + (isBoss && unlocked ? ' boss boss-ring' : '');
        node.innerHTML =
          (unlocked ? '' : '<span class="lock-ico">🔒</span>') +
          '<span class="node-num">' + lv.num + '</span>' +
          '<span class="node-ico">' + lv.icon + '</span>' +
          '<span class="node-stars">' + (st ? '★'.repeat(st.stars) + '☆'.repeat(3 - st.stars) : '') + '</span>';
        node.title = L(lv.title) + (unlocked ? '' : ' — 🔒 ' + t('locked'));
        if (unlocked) {
          node.addEventListener('click', function () {
            AudioEngine.sfx.click();
            App.startLevel(lv.id);
          });
          node.addEventListener('mouseenter', function () { AudioEngine.sfx.hover(); });
        }
        // zig-zag placement
        var posInRow = i % PER_ROW;
        if (rowIdx % 2 === 1) rows[rowIdx].style.flexDirection = 'row-reverse';
        rows[rowIdx].appendChild(node);
      });

      // draw dotted path through nodes
      requestAnimationFrame(function () {
        var svg = el.querySelector('.path-svg');
        var wrapRect = el.querySelector('.path-wrap').getBoundingClientRect();
        var pts = Array.from(el.querySelectorAll('.map-node')).map(function (n) {
          var r = n.getBoundingClientRect();
          return [r.left - wrapRect.left + r.width / 2, r.top - wrapRect.top + r.height / 2];
        });
        if (pts.length > 1) {
          var d = 'M ' + pts.map(function (pt) { return pt[0].toFixed(0) + ' ' + pt[1].toFixed(0); }).join(' L ');
          svg.querySelector('path').setAttribute('d', d);
        }
      });
      inner.appendChild(el);
    });

    // graduation link if all done
    if (done >= all.length && all.length) {
      var grad = document.createElement('div');
      grad.style.cssText = 'text-align:center;margin-top:40px;';
      grad.innerHTML = '<button class="btn teal pulse">🎓 ' + t('certificate') + '</button>';
      grad.querySelector('button').addEventListener('click', function () { App.show('certificate'); });
      inner.appendChild(grad);
    }
  }

  window.MapScreen = { render: render };
})();
