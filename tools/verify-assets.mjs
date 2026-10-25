/* ============ verify-assets.mjs — validate level data schema + asset presence ============ */
import { existsSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { loadLevels } from './lib/levels.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const problems = [];
const warnings = [];

const levels = loadLevels();
console.log(`Levels loaded: ${levels.length}`);

const EXPECT = { html: 12, css: 15, js: 18, final: 3 };
const seen = new Set();
const byTrack = {};
for (const lv of levels) {
  byTrack[lv.track] = (byTrack[lv.track] || 0) + 1;
  if (seen.has(lv.id)) problems.push(`duplicate id ${lv.id}`);
  seen.add(lv.id);
  if (!lv.title?.en || !lv.title?.es) problems.push(`${lv.id}: title not bilingual`);
  if (!lv.narration?.en || !lv.narration?.es) problems.push(`${lv.id}: narration not bilingual`);
  if (!lv.outro?.en || !lv.outro?.es) problems.push(`${lv.id}: outro not bilingual`);
  if (!lv.explainer) problems.push(`${lv.id}: missing explainer`);
  if (!Array.isArray(lv.exercises) || lv.exercises.length < 5) problems.push(`${lv.id}: needs ≥5 exercises (has ${lv.exercises?.length})`);
  (lv.exercises || []).forEach((ex, i) => {
    const tag = `${lv.id}#ex${i + 1}(${ex.type})`;
    if (!['mcq', 'fill', 'dnd', 'order', 'bug', 'match', 'sandbox', 'arcade'].includes(ex.type)) problems.push(`${tag}: unknown type`);
    if (!ex.prompt?.en || !ex.prompt?.es) problems.push(`${tag}: prompt not bilingual`);
    if (ex.type === 'mcq' && (ex.answer == null || ex.options?.length !== 4)) problems.push(`${tag}: bad mcq`);
    if (ex.type === 'fill') {
      const blanks = ((ex.template || '').match(/___/g) || []).length;
      if (!blanks) problems.push(`${tag}: fill without ___`);
      else if ((ex.answers || []).length !== blanks) problems.push(`${tag}: ${blanks} blanks but ${(ex.answers || []).length} answer entries`);
    }
    if (ex.type === 'order' && !ex.lines?.length) problems.push(`${tag}: order without lines`);
    if (ex.type === 'bug' && ex.bugLine == null) problems.push(`${tag}: bug without bugLine`);
    if (ex.type === 'match' && (ex.pairs?.length || 0) < 3) problems.push(`${tag}: match needs ≥3 pairs`);
    if (ex.type === 'dnd' && !ex.slots?.length) problems.push(`${tag}: dnd without slots`);
    if (ex.type === 'arcade' && (ex.rounds?.length || 0) < 3) problems.push(`${tag}: arcade needs ≥3 rounds`);
    if (ex.type === 'sandbox' && !ex.checks?.length) problems.push(`${tag}: sandbox without checks`);
    if (ex.type === 'sandbox' && !ex.solution) warnings.push(`${tag}: no solution (hint button will be weak)`);
  });
  // assets
  for (const lang of ['en', 'es']) {
    const a = path.join(ROOT, 'assets/audio', lang, `${lv.id}-intro.mp3`);
    const o = path.join(ROOT, 'assets/audio', lang, `${lv.id}-outro.mp3`);
    const v = path.join(ROOT, 'assets/videos', lang, `${lv.explainer || lv.id}.webm`);
    const e = path.join(ROOT, 'assets/explainers', `${lv.explainer || lv.id}.html`);
    if (!existsSync(a)) problems.push(`missing audio ${lang}/${lv.id}-intro.mp3`);
    if (!existsSync(o)) problems.push(`missing audio ${lang}/${lv.id}-outro.mp3`);
    if (!existsSync(v)) problems.push(`missing video ${lang}/${lv.explainer || lv.id}.webm`);
    if (!existsSync(e)) problems.push(`missing explainer ${lv.explainer || lv.id}.html`);
  }
}
for (const [tr, n] of Object.entries(EXPECT)) {
  if ((byTrack[tr] || 0) !== n) problems.push(`track ${tr}: expected ${n} levels, found ${byTrack[tr] || 0}`);
}
// manifest consistency
for (const lang of ['en', 'es']) {
  const mf = path.join(ROOT, 'assets/audio', lang, 'manifest.json');
  if (!existsSync(mf)) { problems.push(`missing manifest assets/audio/${lang}/manifest.json`); continue; }
  const manifest = JSON.parse((await import('fs')).readFileSync(mf, 'utf8'));
  for (const lv of levels) {
    if (!manifest[lv.id]) problems.push(`manifest ${lang}: no entry for ${lv.id}`);
    else if (!manifest[lv.id].intro?.secs) warnings.push(`manifest ${lang}/${lv.id}: intro has no duration`);
  }
}

console.log(`\nBy track: ` + Object.entries(byTrack).map(([k, v]) => `${k}=${v}`).join(' '));
if (warnings.length) console.log(`\nWarnings (${warnings.length}):\n  ` + warnings.slice(0, 40).join('\n  '));
if (problems.length) {
  console.error(`\nPROBLEMS (${problems.length}):\n  ` + problems.slice(0, 80).join('\n  '));
  if (problems.length > 80) console.error(`  …and ${problems.length - 80} more`);
  process.exit(1);
}
console.log('\n✓ All assets and level data verified.');
