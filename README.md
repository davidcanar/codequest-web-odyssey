# 🚀 CodeQuest: Web Odyssey

A **bilingual (English / Spanish), 100% offline, gamified course** that teaches HTML, CSS and JavaScript from complete beginner to advanced — through 48 story-driven levels on a space galaxy map, with voice narration, animated lesson videos, synthesized sounds and music, live-code missions and boss battles.

## ▶ How to play

**Just open `index.html`** in Chrome or Edge — that's it. No server, no internet, no install.
(Optionally: `node tools/serve.mjs` → http://127.0.0.1:8080 if you prefer serving over HTTP.)

- Pick your language 🌐 and pilot name, then fly the galaxy map.
- Each level: **mission briefing (spoken)** → **animated training deck** (+ 🎬 lesson video) → **exercises**: quizzes, drag & drop, code typing, bug hunts, pair matching, **live-code sandboxes** (real HTML/CSS/JS with instant preview & validation) and the arcade **Meteor Fixer** mini-game.
- Earn ⭐ stars, ⚡ XP, 💎 gems, 🔥 daily streaks and 🏆 achievements. Progress saves automatically to your browser's localStorage (export/import a save code from ⚙️ Settings).
- Finish all 48 missions to graduate and print your certificate 🎓.

> Tip: ⚙️ Settings has a **Relaxed mode** (unlimited hearts), volume sliders and Cosmo skins.

## 🗺 Curriculum

| Track | Levels | Topics |
|---|---|---|
| 🟣 HTML Nebula | 1–12 | tags → text → links → images → lists → tables → forms → semantic HTML → boss page |
| 🩵 CSS Kingdom | 13–27 | selectors → colors → typography → box model → units → display → positioning → flexbox → grid → transitions → animations → responsive → boss page |
| 🟠 JS Galaxy | 28–45 | console → variables → operators → strings → conditionals → logic → loops → functions → arrays → objects → DOM → events → mini-apps → ES6+ → async/await |
| 👑 Final Frontier | 46–48 | landing-page boss, quiz-app boss, graduation ceremony |

## 💾 Project layout

```
index.html                  the whole game (double-click to play)
css/  js/                   game engine (vanilla, zero dependencies, no build step)
js/levels/                  all 48 levels' content (bilingual EN/ES)
assets/explainers/          per-lesson animated HTML pages (used in-game AND as the video source)
assets/audio/{en,es}/       narration MP3s — mission briefing, results, one clip per video scene
assets/videos/{en,es}/      96 lesson videos .webm (animation + voice, 1280×720)
tools/                      asset-generation pipeline (see below)
CONTENT-SPEC.md             authoring spec for level content
```

## 🛠 Rebuilding the assets (audio + videos)

The game ships with pre-generated audio/videos (~183 MB). To regenerate after editing content:

```bash
cd tools
npm install
# Windows note: if ffmpeg-static/ffprobe-static binaries are missing, run:
#   npm rebuild ffmpeg-static ffprobe-static   (or approve install scripts)
pip install edge-tts                # Python CLI used for all narration

node gen-audio.mjs                  # all narration (needs internet once)
node record-videos.mjs --pool 12    # records all 96 videos, 12 parallel Chromium instances
node verify-assets.mjs              # validates level data + every asset present
node verify-offline.mjs             # proves the game runs with all network blocked
node play-test.mjs html-01          # automated full playthrough of a level (QA)
```

### On the build box (Linux, 72 cores — `tools/.remote.json` holds the target)

```bash
node tools/remote.mjs provision      # one-time: SSH key install + environment checks
node tools/remote.mjs deploy         # push code to ~/codequest-build
node tools/remote.mjs install-deps   # npm deps + Playwright Chromium + edge-tts
node tools/remote.mjs audio          # all narration, 16 parallel TTS streams (~4 min)
node tools/remote.mjs videos         # 96 videos, 20 parallel browser instances (~3 min)
node tools/remote.mjs status         # progress: log tail + produced counts
node tools/remote.mjs fetch          # pull finished assets back into assets/
```

- **Videos are recorded in parallel**: each level × language runs in its own headless Chromium instance (Playwright `recordVideo`), then ffmpeg muxes the per-scene narration so voice and animation stay in sync. The pool size is configurable (`--pool N`, `--shard i/n` for multi-process sharding) — the 96-video run finishes in ~3 minutes at 20× on a 72-core box.
- **TTS voices**: `en-US-AriaNeural` / `es-MX-DaliaNeural` via the Python `edge-tts` package (build-time only — the game itself never touches the network).

## 🔒 Privacy / offline

The game makes **zero network requests** — verified by `tools/verify-offline.mjs`, which loads it with every HTTP request blocked and plays through onboarding, the map and a full level. Progress lives only in your browser's localStorage.

## 📝 Tech notes

- No frameworks, no build step, no ES modules — classic scripts so it runs from `file://`.
- All SFX + music are synthesized in real time with the Web Audio API (no sound files).
- Live-code sandboxes run user code in sandboxed iframes: DOM-compare for HTML, computed styles for CSS, console/expr checks with infinite-loop guards for JS.
- The same `assets/explainers/*.html` animation is embedded in the game **and** recorded for video, so the two never diverge.
- `tools/play-test.mjs` drives a full level like a player (all 8 exercise types incl. the arcade game) — used for regression QA.
