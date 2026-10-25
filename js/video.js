/* ============ Video — explainer video modal + embedded explainer iframe ============ */
(function () {
  function paths(explainerId) {
    var lang = Progress.get().lang;
    return {
      video: 'assets/videos/' + lang + '/' + explainerId + '.webm',
      embed: 'assets/explainers/' + explainerId + '.html?lang=' + lang + '&loop=1',
      enVideo: 'assets/videos/en/' + explainerId + '.webm'
    };
  }

  function closeModal() {
    var m = document.getElementById('modal-root');
    m.innerHTML = '';
  }

  // Full video modal with <video>; falls back to embedded explainer iframe if the file is missing.
  function openVideo(explainerId, titleObj) {
    var p = paths(explainerId);
    var root = document.getElementById('modal-root');
    var back = document.createElement('div');
    back.className = 'modal-back';
    back.innerHTML =
      '<div class="modal glass video-modal">' +
      '  <h3>🎬 ' + (typeof titleObj === 'string' ? titleObj : L(titleObj || {})) + '</h3>' +
      '  <video controls autoplay></video>' +
      '  <div class="modal-actions"><button class="btn secondary small" data-act="close">' + t('close') + '</button></div>' +
      '</div>';
    back.addEventListener('click', function (e) { if (e.target === back || e.target.dataset.act === 'close') closeModal(); });
    root.appendChild(back);

    var v = back.querySelector('video');
    v.src = p.video;
    v.onerror = function () {
      // video missing → embed the live explainer page instead
      back.querySelector('h3').insertAdjacentHTML('afterend',
        '<p class="missing-note" style="color:var(--gold);font-size:13.5px;margin-bottom:8px">' + t('videoMissing') + '</p>');
      var ifr = document.createElement('iframe');
      ifr.className = 'embed-explainer';
      ifr.src = p.embed + '&d=30';
      ifr.style.height = '480px';
      back.replaceChild(ifr, v);
    };
    v.addEventListener('ended', function () { Progress.markWatched(explainerId); if (window.Achievements) Achievements.check(); });
    Progress.markWatched(explainerId);
  }

  // Embedded explainer page (used in the Learn phase)
  function embedExplainer(container, explainerId, seconds) {
    var p = paths(explainerId);
    var ifr = document.createElement('iframe');
    ifr.className = 'embed-explainer';
    ifr.style.height = '420px';
    ifr.src = p.embed + (seconds ? '&d=' + seconds : '');
    container.appendChild(ifr);
    return ifr;
  }

  window.VideoModal = { openVideo: openVideo, embedExplainer: embedExplainer, closeModal: closeModal };
})();
