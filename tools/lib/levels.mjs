/* Shared helper: load level data + explainer scenes in Node (classic scripts assigning window.X) */
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export function loadLevels() {
  const window = {};
  global.window = window;
  const files = ['js/levels/html.js', 'js/levels/css-a.js', 'js/levels/css-b.js', 'js/levels/js-a.js', 'js/levels/js-b.js', 'js/levels/final.js'];
  const all = [];
  for (const f of files) {
    const p = path.join(ROOT, f);
    if (!existsSync(p)) continue;
    // eslint-disable-next-line no-new-func
    new Function('window', readFileSync(p, 'utf8'))(window);
  }
  const arrs = [window.LEVELS_HTML, window.LEVELS_CSS_A, window.LEVELS_CSS_B, window.LEVELS_JS_A, window.LEVELS_JS_B, window.LEVELS_FINAL];
  for (const a of arrs) if (Array.isArray(a)) all.push(...a);
  return all;
}

/* Parse window.EXPLAINER = {...} out of an explainer HTML page (data-only object literal). */
export function loadExplainer(id) {
  const p = path.join(ROOT, 'assets/explainers', id + '.html');
  if (!existsSync(p)) return null;
  const html = readFileSync(p, 'utf8');
  const start = html.indexOf('window.EXPLAINER');
  if (start < 0) return null;
  const eq = html.indexOf('=', start);
  // find the closing "};" — the definition is the last statement of its script block
  const scriptEnd = html.indexOf('</script>', eq);
  let src = html.slice(eq + 1, scriptEnd).trim();
  if (src.endsWith(';')) src = src.slice(0, -1);
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return (' + src + ')')();
  } catch (e) {
    console.error('  ! failed to parse EXPLAINER in', id + '.html:', e.message);
    return null;
  }
}

/* Extract narration text for a scene (per language). */
export function sceneText(sc, lang) {
  if (!sc.caption) return '';
  if (typeof sc.caption === 'string') return sc.caption;
  return sc.caption[lang] || sc.caption.en || '';
}

/* Strip HTML tags from caption/explain-ish text for TTS. */
export function stripHtml(s) {
  return String(s)
    .replace(/<br\s*\/?>/gi, '. ')
    .replace(/<\/(p|div|h[1-6]|li)>/gi, '. ')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, ' less than ').replace(/&gt;/g, ' greater than ')
    .replace(/&amp;/g, ' and ').replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
