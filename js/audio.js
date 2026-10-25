/* ============ Audio engine — all SFX & music synthesized with Web Audio (no files) ============ */
(function () {
  var ctx = null, master = null, sfxGain = null, musicGain = null;
  var musicTimer = null, musicOn = false;

  function ensure() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 1; master.connect(ctx.destination);
      sfxGain = ctx.createGain(); sfxGain.connect(master);
      musicGain = ctx.createGain(); musicGain.connect(master);
    }
    if (ctx.state === 'suspended') ctx.resume();
    applyVolumes();
    return ctx;
  }
  function applyVolumes() {
    if (!ctx) return;
    var p = window.Progress ? Progress.get() : null;
    var s = p ? p.settings : { sfx: .8, music: .35 };
    if (sfxGain) sfxGain.gain.value = s.sfx;
    if (musicGain) musicGain.gain.value = musicOn ? s.music : 0;
  }

  // ---- primitive builders ----
  function tone(opt) {
    if (!ensure()) return;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = opt.type || 'sine';
    o.frequency.setValueAtTime(opt.f0 || 440, ctx.currentTime);
    if (opt.f1) o.frequency.exponentialRampToValueAtTime(opt.f1, ctx.currentTime + (opt.dur || .2));
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(opt.vol || .3, ctx.currentTime + .012);
    g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + (opt.dur || .2));
    o.connect(g); g.connect(opt.dest || sfxGain);
    o.start(); o.stop(ctx.currentTime + (opt.dur || .2) + .05);
  }
  function noise(dur, vol, f) {
    if (!ensure()) return;
    var len = ctx.sampleRate * dur, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    var src = ctx.createBufferSource(); src.buffer = buf;
    var flt = ctx.createBiquadFilter(); flt.type = 'bandpass'; flt.frequency.value = f || 1200; flt.Q.value = .8;
    var g = ctx.createGain(); g.gain.value = vol || .2;
    src.connect(flt); flt.connect(g); g.connect(sfxGain);
    src.start();
  }

  var SFX = {
    click: function () { tone({ type: 'triangle', f0: 660, f1: 880, dur: .07, vol: .18 }); },
    hover: function () { tone({ type: 'sine', f0: 520, f1: 560, dur: .05, vol: .07 }); },
    correct: function () {
      var notes = [523.25, 659.25, 783.99];
      notes.forEach(function (f, i) { setTimeout(function () { tone({ type: 'triangle', f0: f, dur: .16, vol: .28 }); }, i * 85); });
      tone({ type: 'sine', f0: 1046.5, dur: .3, vol: .14 });
    },
    wrong: function () {
      tone({ type: 'sawtooth', f0: 220, f1: 130, dur: .28, vol: .2 });
      tone({ type: 'square', f0: 165, f1: 110, dur: .3, vol: .12 });
    },
    combo: function (n) { tone({ type: 'square', f0: 600 + n * 90, f1: 900 + n * 110, dur: .12, vol: .2 }); },
    star: function (i) { tone({ type: 'triangle', f0: 700 + i * 260, f1: 1100 + i * 300, dur: .25, vol: .3 }); },
    levelup: function () {
      [523, 659, 784, 1046, 1318].forEach(function (f, i) { setTimeout(function () { tone({ type: 'triangle', f0: f, dur: .22, vol: .3 }); }, i * 100); });
    },
    achievement: function () {
      [880, 1108, 1318, 1760].forEach(function (f, i) { setTimeout(function () { tone({ type: 'sine', f0: f, dur: .3, vol: .25 }); }, i * 110); });
    },
    whoosh: function () { noise(.4, .16, 700); },
    laser: function () { tone({ type: 'sawtooth', f0: 1200, f1: 200, dur: .18, vol: .16 }); },
    boom: function () {
      noise(.5, .35, 220);
      tone({ type: 'sine', f0: 120, f1: 40, dur: .5, vol: .4 });
    },
    tick: function () { tone({ type: 'square', f0: 900, dur: .04, vol: .08 }); },
    pickup: function () { tone({ type: 'sine', f0: 780, f1: 1250, dur: .12, vol: .22 }); },
    heartlost: function () { tone({ type: 'sine', f0: 400, f1: 180, dur: .4, vol: .25 }); },
    unlock: function () {
      [392, 523, 659].forEach(function (f, i) { setTimeout(function () { tone({ type: 'triangle', f0: f, dur: .2, vol: .25 }); }, i * 90); });
    }
  };

  // ---- procedural ambient music: slow pad chords + sparse bell arps ----
  var CHORDS = [
    [220.00, 261.63, 329.63], // Am
    [174.61, 220.00, 261.63], // F
    [130.81, 164.81, 196.00], // C low
    [196.00, 246.94, 293.66]  // G
  ];
  var chordIdx = 0;
  function padChord(freqs, dur) {
    if (!ensure()) return;
    freqs.forEach(function (f) {
      var o = ctx.createOscillator(), g = ctx.createGain(), flt = ctx.createBiquadFilter();
      o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = (Math.random() * 8 - 4);
      flt.type = 'lowpass'; flt.frequency.value = 900; flt.Q.value = .4;
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(.045, ctx.currentTime + dur * .3);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      o.connect(flt); flt.connect(g); g.connect(musicGain);
      o.start(); o.stop(ctx.currentTime + dur + .1);
    });
  }
  function bellNote(f) {
    if (!ensure()) return;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = f;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(.06, ctx.currentTime + .02);
    g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + 1.6);
    o.connect(g); g.connect(musicGain);
    o.start(); o.stop(ctx.currentTime + 1.7);
  }
  function musicLoop() {
    var chord = CHORDS[chordIdx % CHORDS.length];
    padChord(chord, 4.2);
    // sparse arpeggio bells from the chord + octave
    for (var i = 0; i < 3; i++) {
      if (Math.random() < .75) {
        var f = chord[Math.floor(Math.random() * chord.length)] * (Math.random() < .5 ? 2 : 4);
        setTimeout(function (ff) { return function () { bellNote(ff); }; }(f), Math.random() * 3600);
      }
    }
    chordIdx++;
  }
  function startMusic() {
    if (musicOn) return;
    ensure(); musicOn = true; applyVolumes();
    musicLoop();
    musicTimer = setInterval(musicLoop, 4200);
  }
  function stopMusic() {
    musicOn = false; applyVolumes();
    if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
  }

  window.AudioEngine = {
    init: ensure,
    sfx: SFX,
    startMusic: startMusic,
    stopMusic: stopMusic,
    refreshVolumes: applyVolumes
  };
  // first user gesture unlocks audio
  var unlock = function () { AudioEngine.init(); AudioEngine.refreshVolumes(); document.removeEventListener('pointerdown', unlock); };
  document.addEventListener('pointerdown', unlock);
})();
