/* ============ gen-audio.mjs — generate all narration MP3s with edge-tts ============
   Outputs:
     assets/audio/{en,es}/{levelId}-intro.mp3      mission briefing voice
     assets/audio/{en,es}/{levelId}-outro.mp3      results voice
     assets/audio/{en,es}/{levelId}-sc{i}.mp3      per explainer scene caption (for videos)
     assets/audio/{en,es}/manifest.json            durations manifest
     js/durations.js                               game-side durations
   Usage: node gen-audio.mjs [--force] [--only html-01,css-02] [--conc 8]
   Requires the Python `edge-tts` package (pip install edge-tts).
============================================================================= */
import { mkdirSync, writeFileSync, existsSync, statSync, readFileSync } from 'fs';
import path from 'path';
import { execFile, execFileSync } from 'child_process';
import { promisify } from 'util';
import { loadLevels, loadExplainer, sceneText, stripHtml } from './lib/levels.mjs';

const execFileP = promisify(execFile);

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const onlyIdx = args.indexOf('--only');
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1].split(',') : null;
const concIdx = args.indexOf('--conc');
const CONC = concIdx >= 0 ? parseInt(args[concIdx + 1], 10) : 8;

const VOICES = { en: 'en-US-AriaNeural', es: 'es-MX-DaliaNeural' };
const LANGS = ['en', 'es'];

let ffprobePath;
try { ffprobePath = (await import('ffprobe-static')).default.path; } catch { ffprobePath = 'ffprobe'; }

/* locate an edge-tts CLI: prefer `edge-tts`, then python -m edge_tts variants */
async function findTTS() {
  const candidates = [
    { cmd: 'edge-tts', base: [] },
    { cmd: 'python3', base: ['-m', 'edge_tts'] },
    { cmd: 'python', base: ['-m', 'edge_tts'] },
    { cmd: 'py', base: ['-m', 'edge_tts'] },
  ];
  for (const c of candidates) {
    try { await execFileP(c.cmd, [...c.base, '--help'], { timeout: 20000 }); return c; } catch { }
  }
  throw new Error('edge-tts CLI not found — install with: pip install edge-tts');
}
const TTS = await findTTS().catch(e => { console.error(e.message); process.exit(1); });
console.log('TTS command:', TTS.cmd, TTS.base.join(' '));

function probeSecs(file) {
  try {
    const out = execFileSync(ffprobePath, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' });
    return parseFloat(out.trim()) || 0;
  } catch (e) { console.error('  ! probe failed:', file, '—', String(e.message).split('\n')[0], '— ffprobePath:', ffprobePath); return 0; }
}

function cleanForTTS(text, lang) {
  let t = stripHtml(text)
    .replace(/https?:\/\/\S+/g, lang === 'en' ? 'link' : 'enlace')
    .replace(/\s+/g, ' ').trim();
  if (t.length > 900) t = t.slice(0, 900);
  return t;
}

/* ---------- TTS via Python edge-tts CLI ---------- */
async function speak(lang, text, outFile) {
  await execFileP(TTS.cmd, [...TTS.base, '--voice', VOICES[lang], '--text', text, '--write-media', outFile], { timeout: 180000, maxBuffer: 16e6 });
  if (!existsSync(outFile) || statSync(outFile).size < 512) throw new Error('TTS produced no/short audio');
}

/* ---------- task runner with retries ---------- */
async function runPool(tasks, conc) {
  const queue = tasks.slice();
  const workers = Array.from({ length: Math.min(conc, tasks.length) }, async () => {
    while (queue.length) {
      const t = queue.shift();
      for (let attempt = 1; attempt <= 3; attempt++) {
        try { await t.fn(); break; }
        catch (e) {
          console.error(`  ! ${t.label} attempt ${attempt} failed: ${e.message}`);
          if (attempt === 3) { t.failed = true; FAILED.push(t.label); }
          else await new Promise(r => setTimeout(r, 1500 * attempt));
        }
      }
      process.stdout.write(`\r  [${DONE++}/${tasks.length}] generated…`);
    }
  });
  await Promise.all(workers);
  process.stdout.write('\n');
}
const FAILED = [];
let DONE = 0;

/* ---------- main ---------- */
const levels = loadLevels();
console.log(`Loaded ${levels.length} levels`);
const targets = levels.filter(l => !ONLY || ONLY.includes(l.id));

for (const lang of LANGS) {
  mkdirSync(path.join(ROOT, 'assets/audio', lang), { recursive: true });
}

// edge-tts CLI is invoked per clip; voices per language below.

const manifest = {};
for (const lang of LANGS) manifest[lang] = {};

const tasks = [];
for (const lv of targets) {
  for (const lang of LANGS) {
    const m = manifest[lang][lv.id] = { scenes: [], sd: [] };
    const introText = lv.narration && (lv.narration[lang] || lv.narration.en);
    if (introText) {
      const f = path.join('assets/audio', lang, `${lv.id}-intro.mp3`);
      m.intro = { file: f, secs: 0 };
      if (!FORCE && existsSync(path.join(ROOT, f))) { /* keep */ }
      else tasks.push({ label: `${lv.id}/${lang}/intro`, fn: () => speak(lang, cleanForTTS(introText, lang), path.join(ROOT, f)) });
    }
    const outroText = lv.outro && (lv.outro[lang] || lv.outro.en);
    if (outroText) {
      const f = path.join('assets/audio', lang, `${lv.id}-outro.mp3`);
      m.outro = { file: f, secs: 0 };
      if (!FORCE && existsSync(path.join(ROOT, f))) { /* keep */ }
      else tasks.push({ label: `${lv.id}/${lang}/outro`, fn: () => speak(lang, cleanForTTS(outroText, lang), path.join(ROOT, f)) });
    }
    // explainer scene captions
    const ex = loadExplainer(lv.explainer || lv.id);
    if (ex && Array.isArray(ex.scenes)) {
      ex.scenes.forEach((sc, i) => {
        const txt = cleanForTTS(sceneText(sc, lang), lang);
        m.sd[i] = 0;
        if (!txt) return;
        const f = path.join('assets/audio', lang, `${lv.id}-sc${i}.mp3`);
        m.scenes.push({ i, file: f, secs: 0 });
        if (!FORCE && existsSync(path.join(ROOT, f))) return;
        tasks.push({ label: `${lv.id}/${lang}/sc${i}`, fn: () => speak(lang, txt, path.join(ROOT, f)) });
      });
    }
  }
}

console.log(`Generating ${tasks.length} audio clips (${CONC} parallel)…`);
if (tasks.length) await runPool(tasks, CONC);
if (FAILED.length) console.error(`FAILED (${FAILED.length}):`, FAILED.join(', '));

/* ---------- probe durations, write manifests ---------- */
for (const lang of LANGS) {
  for (const lv of targets) {
    const m = manifest[lang][lv.id];
    if (!m) continue;
    if (m.intro) m.intro.secs = probeSecs(path.join(ROOT, m.intro.file));
    if (m.outro) m.outro.secs = probeSecs(path.join(ROOT, m.outro.file));
    let totalScenes = 0;
    for (const sc of m.scenes) {
      sc.secs = probeSecs(path.join(ROOT, sc.file));
      m.sd[sc.i] = +(sc.secs + 0.6).toFixed(2);   // narration + 0.6s breathing gap
      totalScenes++;
    }
    m.videoTotal = +m.sd.reduce((a, x) => a + (x > 0 ? x : 1.6), 0).toFixed(2);
  }
  writeFileSync(path.join(ROOT, 'assets/audio', lang, 'manifest.json'), JSON.stringify(manifest[lang], null, 1));
}

/* js/durations.js for the game: levelId -> {en:{intro, scenes[]}, es:{...}} */
const durations = {};
for (const lv of targets) {
  durations[lv.id] = {};
  for (const lang of LANGS) {
    const m = manifest[lang][lv.id];
    if (m) durations[lv.id][lang] = { intro: m.intro ? m.intro.secs : 0, scenes: m.sd || [] };
  }
}
// merge with existing durations for levels not in targets
const durFile = path.join(ROOT, 'js/durations.js');
let prev = {};
if (existsSync(durFile)) {
  try {
    const src = readFileSync(durFile, 'utf8');
    const m = src.match(/=\s*(\{[\s\S]*\});?\s*$/);
    if (m) prev = JSON.parse(m[1]);
  } catch { prev = {}; }
  for (const lv of targets) delete prev[lv.id];
}
const merged = Object.assign({}, prev, durations);
writeFileSync(durFile, '/* ============ durations.js — GENERATED by tools/gen-audio.mjs; narration lengths in seconds ============ */\nwindow.DURATIONS = ' + JSON.stringify(merged) + ';\n');

console.log('Done. Manifests + js/durations.js written.');
if (FAILED.length) { console.error('Some clips failed — re-run without --force to retry only failures.'); process.exit(1); }
