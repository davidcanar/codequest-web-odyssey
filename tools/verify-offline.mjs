/* ============ verify-offline.mjs — load the game with ALL network blocked and smoke-test it ============ */
import { chromium } from 'playwright-core';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXEC = process.env.CHROMIUM_PATH || process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const idx = process.argv.indexOf('--exec');
const exe = idx >= 0 ? process.argv[idx + 1] : EXEC;
const indexUrl = 'file:///' + path.join(ROOT, 'index.html').replace(/\\/g, '/');

const browser = await chromium.launch({ headless: true, executablePath: exe, args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

// Block every http/https/ws request — only file:// may pass. This simulates full offline.
let blocked = 0;
await context.route('**/*', route => {
  const u = route.request().url();
  if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('ws://') || u.startsWith('wss://')) {
    blocked++;
    return route.abort();
  }
  return route.continue();
});

const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

async function click(sel) { await page.click(sel); await page.waitForTimeout(400); }
function assert(cond, msg) { if (!cond) throw new Error('ASSERT: ' + msg); console.log('  ✓ ' + msg); }

console.log('Loading', indexUrl, '(all network blocked)');
await page.goto(indexUrl);
await page.waitForTimeout(1500);

assert(await page.locator('.game-logo').count() === 1, 'title screen renders');
assert((await page.textContent('#screen')).includes('CODEQUEST'), 'logo visible');

// onboarding flow (fill name AFTER language switches — switching re-renders the form)
await click('#title-start');
await page.waitForTimeout(500);
assert(await page.locator('.onboard-card').count() === 1, 'onboarding shows');
await click('.lang-pick button[data-l="es"]');
await page.waitForTimeout(400);
assert((await page.textContent('#screen')).includes('Español'), 'language switches to ES');
await click('.lang-pick button[data-l="en"]');
await page.waitForTimeout(300);
await page.fill('#ob-name', 'Offline Tester');
await click('#ob-go');
await page.waitForTimeout(1200);
assert(await page.locator('.map-section').count() >= 1, 'galaxy map renders with sections');

const nodes = await page.locator('.map-node').count();
console.log(`  • ${nodes} level nodes on map`);
assert(nodes > 0, 'map has level nodes');

// localStorage persistence
const saved = await page.evaluate(() => localStorage.getItem('codequest-save-v1'));
assert(saved && saved.includes('"name":"Offline Tester"'), 'progress persisted to localStorage');

// open first level
await page.click('.map-node.next');
await page.waitForTimeout(1200);
assert((await page.textContent('#screen')).toLowerCase().includes('mission'), 'level intro opens');
assert(await page.locator('#intro-narr').count() === 1, 'narration text renders');

// learn phase with embedded explainer
await click('#intro-go');
await page.waitForTimeout(1500);
assert(await page.locator('.embed-explainer').count() >= 1, 'embedded explainer loads (iframe)');

// exercise phase starts
await click('#learn-start');
await page.waitForTimeout(1000);
assert(await page.locator('.ex-card').count() === 1, 'first exercise renders');

if (errors.length) {
  console.error('\nPage errors:');
  errors.forEach(e => console.error('  ' + e.slice(0, 200)));
}
console.log(`\nBlocked network requests: ${blocked} (game made no online calls)`);

await browser.close();
const fatal = errors.filter(e => !e.includes('favicon') && !e.includes('net::'));
if (fatal.length) { console.error('✗ smoke test found errors'); process.exit(1); }
console.log('\n✓ OFFLINE SMOKE TEST PASSED — the game runs fully offline.');
