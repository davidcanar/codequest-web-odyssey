/* ============ record-videos.mjs — record explainer animations + mux narration ============
   For each level × language:
     1. Build one audio track from per-scene narration MP3s (manifest.json) with ffmpeg
     2. Playwright (headless Chromium) records the explainer page at 1280×720 for the
        exact audio length (?sd= per-scene seconds keeps scenes in sync with voice)
     3. ffmpeg muxes video + audio → assets/videos/{lang}/{levelId}.webm
   Usage: node record-videos.mjs [--force] [--only html-01,css-02] [--pool 16] [--shard i/n]
============================================================================= */
import { mkdirSync, writeFileSync, existsSync, rmSync, readdirSync, readFileSync } from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { chromium } from 'playwright-core';
import { loadLevels } from './lib/levels.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const onlyIdx = args.indexOf('--only');
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1].split(',') : null;
const poolIdx = args.indexOf('--pool');
const POOL = poolIdx >= 0 ? parseInt(args[poolIdx + 1], 10) : 12;
const shardIdx = args.indexOf('--shard');
let SHARD = null;
if (shardIdx >= 0) { const [i, n] = args[shardIdx + 1].split('/').map(Number); SHARD = { i, n }; }
const EXEC_IDX = args.indexOf('--exec');
const EXEC = EXEC_IDX >= 0 ? args[EXEC_IDX + 1] : (process.env.CHROMIUM_PATH || undefined);

let ffmpegPath, ffprobePath;
try { ffmpegPath = (await import('ffmpeg-static')).default; } catch { ffmpegPath = 'ffmpeg'; }
try { ffprobePath = (await import('ffprobe-static')).default.path; } catch { ffprobePath = 'ffprobe'; }

function probeSecs(file) {
  try {
    return parseFloat(execFileSync(ffprobePath, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' }).trim()) || 0;
  } catch { return 0; }
}

/* ---------- audio build: per-scene mp3s + silence gaps → one .mka ---------- */
function buildAudio(lang, lv, manifest, outMka, tmpDir) {
  const m = manifest[lv.id];
  if (!m) return null;
  const inputs = [];
  const concatInputs = [];
  const chains = [];
  const GAP = 0.6, LEAD = 0.35;
  // lead-in silence so the video start (context creation) precedes scene 1
  inputs.push('-f', 'lavfi', '-t', String(LEAD), '-i', 'anullsrc=r=24000:cl=mono');
  concatInputs.push('[0:a]');
  let nextIdx = 1;
  m.sd.forEach((slot, i) => {
    const dur = slot > 0 ? slot : 1.6;
    const sc = (m.scenes || []).find(s => s.i === i);
    if (sc && existsSync(path.join(ROOT, sc.file)) && probeSecs(path.join(ROOT, sc.file)) > 0.2) {
      inputs.push('-i', path.join(ROOT, sc.file));
      chains.push(`[${nextIdx}:a]apad=whole_dur=${dur.toFixed(2)}[s${nextIdx}]`);
      concatInputs.push(`[s${nextIdx}]`);
      nextIdx++;
    } else {
      inputs.push('-f', 'lavfi', '-t', String(dur), '-i', 'anullsrc=r=24000:cl=mono');
      concatInputs.push(`[${nextIdx}:a]`);
      nextIdx++;
    }
  });
  const filter = `${chains.join(';')};${concatInputs.join('')}concat=n=${nextIdx}:v=0:a=1[out]`;
  const cmdArgs = [...inputs, '-filter_complex', filter, '-map', '[out]', '-c:a', 'libopus', '-b:a', '64k', '-ar', '24000', outMka];
  execFileSync(ffmpegPath, cmdArgs, { stdio: 'pipe' });
  return probeSecs(outMka);
}

/* ---------- record one explainer ---------- */
async function recordOne(browser, lang, lv, sd, total, rawDir, outFile) {
  const explainerUrl = 'file:///' + path.join(ROOT, 'assets/explainers', (lv.explainer || lv.id) + '.html').replace(/\\/g, '/')
    + `?lang=${lang}&sd=${sd.join(',')}&d=${total.toFixed(2)}`;
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir: rawDir, size: { width: 1280, height: 720 } } });
  const page = await context.newPage();
  page.on('pageerror', e => console.error(`    pageerror: ${e.message.slice(0, 120)}`));
  await page.goto(explainerUrl, { waitUntil: 'load' });
  await page.waitForTimeout(total * 1000 + 1500);   // full timeline + buffer
  await context.close();                             // flushes the video file
  const raws = readdirSync(rawDir).filter(f => f.endsWith('.webm'));
  if (!raws.length) throw new Error('no video produced');
  const raw = path.join(rawDir, raws[raws.length - 1]);
  return raw;
}

/* ---------- mux ---------- */
function mux(raw, audio, outFile, audioSecs) {
  const rawSecs = probeSecs(raw);
  const pad = rawSecs < audioSecs - 0.3;
  execFileSync(ffmpegPath, ['-y', '-i', raw, '-i', audio,
    '-map', '0:v:0', '-map', '1:a:0',
    ...(pad ? ['-vf', 'tpad=stop_mode=clone:stop_duration=3'] : []),
    '-c:v', pad ? 'libvpx' : 'copy', '-b:v', '1M', '-c:a', 'copy',
    '-shortest',
    ...(pad ? ['-deadline', 'realtime', '-cpu-used', '5'] : []),
    outFile], { stdio: 'pipe' });
}

/* ---------- main ---------- */
const levels = loadLevels().filter(l => !ONLY || ONLY.includes(l.id));
if (SHARD) {
  const shard = levels.filter((_, i) => i % SHARD.n === SHARD.i);
  console.log(`Shard ${SHARD.i + 1}/${SHARD.n}: ${shard.length} of ${levels.length} levels`);
  levels.length = 0; levels.push(...shard);
}

const tasks = [];
for (const lang of ['en', 'es']) {
  mkdirSync(path.join(ROOT, 'assets/videos', lang), { recursive: true });
  const manifest = JSON.parse(readFileSync(path.join(ROOT, 'assets/audio', lang, 'manifest.json'), 'utf8'));
  for (const lv of levels) {
    const outFile = path.join(ROOT, 'assets/videos', lang, lv.id + '.webm');
    if (!FORCE && existsSync(outFile) && probeSecs(outFile) > 5) continue;
    const m = manifest[lv.id];
    if (!m || !m.sd || !m.sd.some(x => x > 0)) { console.error(`  ! ${lv.id}/${lang}: no manifest/audio — run gen-audio first`); continue; }
    const sd = m.sd.map(x => (x > 0 ? x : 1.6));
    const total = sd.reduce((a, x) => a + x, 0);
    tasks.push({ lang, lv, sd, total, manifest, outFile });
  }
}
console.log(`${tasks.length} videos to record (pool ${POOL})`);

mkdirSync(path.join(ROOT, 'tools/tmp'), { recursive: true });
let done = 0, failed = [];
const totalCount = tasks.length;
async function worker() {
  while (tasks.length) {
    const t = tasks.shift();
    const tmp = path.join(ROOT, 'tools/tmp', `${t.lang}-${t.lv.id}`);
    rmSync(tmp, { recursive: true, force: true });
    mkdirSync(tmp, { recursive: true });
    try {
      const browser = await chromium.launch({ headless: true, executablePath: EXEC, args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=1', '--hide-scrollbars'] });
      const audioMka = path.join(tmp, 'audio.mka');
      const audioSecs = buildAudio(t.lang, t.lv, t.manifest, audioMka, tmp);
      if (!audioSecs) throw new Error('audio build failed');
      const raw = await recordOne(browser, t.lang, t.lv, t.sd, audioSecs, tmp, t.outFile);
      await browser.close();
      mux(raw, audioMka, t.outFile, audioSecs);
      const secs = probeSecs(t.outFile);
      process.stdout.write(`✓ ${t.lv.id}/${t.lang} (${secs.toFixed(1)}s) [${++done}/${totalCount}]\n`);
    } catch (e) {
      failed.push(`${t.lv.id}/${t.lang}: ${e.message.slice(0, 140)}`);
      console.error(`✗ ${t.lv.id}/${t.lang}: ${e.message.slice(0, 140)}`);
    } finally {
      try { rmSync(tmp, { recursive: true, force: true }); } catch { }
    }
  }
}
const t0 = Date.now();
await Promise.all(Array.from({ length: Math.min(POOL, Math.max(1, tasks.length)) }, worker));
console.log(`\nDone in ${((Date.now() - t0) / 60000).toFixed(1)} min. Success: ${done}, Failed: ${failed.length}`);
if (failed.length) { console.error('FAILED:\n' + failed.join('\n')); process.exit(1); }
