/* ============ play-test.mjs — data-driven playthrough of a level (engine QA) ============
   Usage: node play-test.mjs [levelId]  (default html-01) */
import { chromium } from 'playwright-core';

const EXEC = process.env.CHROMIUM_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const LEVEL = process.argv[2] || 'html-01';
const url = 'file:///D:/Projects/htmlcssjs/index.html';

const browser = await chromium.launch({ headless: true, executablePath: EXEC, args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width: 1366, height: 900 } })).newPage();
const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));

const log = (...a) => console.log(' •', ...a);
async function step(name, fn) {
  try { await fn(); log('✓', name); return true; }
  catch (e) { console.error('✗', name, '—', String(e.message).split('\n')[0]); errors.push(name + ': ' + e.message); return false; }
}

await page.goto(url);
await page.waitForTimeout(1200);

await step('onboarding', async () => {
  await page.click('#title-start');
  await page.waitForTimeout(400);
  await page.fill('#ob-name', 'QA Bot');
  await page.click('#ob-go');
  await page.waitForTimeout(800);
});

const levelIdx = await page.evaluate((id) => window.ALL_LEVELS.findIndex(l => l.id === id), LEVEL);
if (levelIdx < 0) { console.error('level not found: ' + LEVEL); process.exit(1); }

await step('open ' + LEVEL, async () => {
  await page.evaluate((id) => App.startLevel(id), LEVEL);
  await page.waitForTimeout(700);
  await page.click('#intro-go');
  await page.waitForTimeout(500);
  await page.click('#learn-start');
  await page.waitForTimeout(700);
});

// exIdx syncs from the game via LevelRunner.getDebugState()
let solved = 0;

for (let guard = 0; guard < 15; guard++) {
  if (await page.locator('.star-row').count() > 0) { log('results screen reached'); break; }
  const kind = ((await page.locator('.ex-kind').first().textContent()) || '').trim();
  const dbg = await page.evaluate(() => window.LevelRunner.getDebugState());
  const exIdx = dbg.exIdx;
  const ex = await page.evaluate(([li, i]) => window.ALL_LEVELS[li].exercises[i], [levelIdx, exIdx]);
  if (!ex) break;

  const ok = await step(`ex${exIdx + 1} [${kind}]`, async () => {
    if (kind.includes('QUIZ')) {
      await page.locator('.opt').nth(ex.answer).click();
    } else if (kind.includes('DRAG')) {
      const n = ex.slots.length;
      for (let s = 0; s < n; s++) {
        await page.locator('.dnd-tray .token:not(.used)', { hasText: ex.slots[s] }).first().click();
        await page.locator('.dnd-slot').nth(s).click();
        await page.waitForTimeout(180);
      }
      await page.waitForTimeout(700); // auto-check
    } else if (kind.includes('TYPE')) {
      const bl = page.locator('.fill-blank');
      const n = await bl.count();
      for (let j = 0; j < n; j++) await bl.nth(j).fill((ex.answers[j].accept || ex.answers[j])[0]);
      await page.locator('.btn.ok').click();
      await page.waitForTimeout(300);
    } else if (kind.includes('ORDER')) {
      await page.evaluate((lines) => {
        const norm = s => s.replace(/\s+/g, ' ').trim();
        const list = document.querySelector('.order-list');
        const els = Array.from(list.children);
        const used = new Set();
        lines.forEach(ln => {
          const key = norm(ln);
          const el = els.find(e => !used.has(e) && norm(e.textContent) === key)
            || els.find(e => !used.has(e) && norm(e.textContent).startsWith(key))
            || els.find(e => !used.has(e) && norm(e.textContent).includes(key));
          if (el) { used.add(el); list.appendChild(el); }
        });
      }, ex.lines);
      await page.locator('.btn.ok').click();
      await page.waitForTimeout(300);
    } else if (kind.includes('BUG HUNT')) {
      await page.locator('.bug-line').nth(ex.bugLine).click();
      await page.waitForTimeout(300);
      if (ex.fix) {
        await page.locator('.fill-blank').first().fill(ex.fix.accept[0]);
        await page.locator('.btn.ok').click();
      }
      await page.waitForTimeout(300);
    } else if (kind.includes('MATCH')) {
      await page.evaluate(() => {
        const colA = document.querySelectorAll('.match-col')[0];
        const colB = document.querySelectorAll('.match-col')[1];
        Array.from(colA.querySelectorAll('.match-item')).forEach(a => {
          const b = Array.from(colB.querySelectorAll('.match-item')).find(x => x._pair === a._pair);
          a.click(); if (b) b.click();
        });
      });
      await page.waitForTimeout(400);
    } else if (kind.includes('CODE MISSION')) {
      const setEditor = (code) => page.evaluate((c) => {
        const ta = document.querySelector('.sandbox-editor');
        ta.value = c;
        ta.dispatchEvent(new Event('input', { bubbles: true }));
      }, code);
      await setEditor(ex.solution);
      await page.waitForTimeout(900);
      await page.locator('.btn.ok').click();
      await page.waitForTimeout(600);
      // if the solution assumed the pre-seeded start code, retry with start + solution
      if (await page.locator('.ex-feedback.bad').count() > 0) {
        await setEditor((ex.start || '') + String.fromCharCode(10) + ex.solution);
        await page.waitForTimeout(900);
        await page.locator('.btn.ok').click();
        await page.waitForTimeout(600);
      }
    } else if (kind.includes('METEOR')) {
      for (let r = 0; r < ex.rounds.length * 2 && r < 12; r++) {
        const target = await page.evaluate(() => {
          const root = document.querySelector('.ex-card');
          if (!root || !root._arcade) return null;
          const m = root._arcade.getMeteors().find(m => m.ok);
          return m ? { x: m.x, y: m.y } : null;
        });
        if (!target) break;
        await page.waitForTimeout(700);               // let meteors descend a bit
        await page.evaluate(({ x, y }) => {
          const root = document.querySelector('.ex-card');
          root._arcade.clickAt(x, y + 0.12);
        }, target);
        await page.waitForTimeout(900);
      }
    } else {
      throw new Error('auto-solver has no strategy for: ' + kind);
    }
  });

  if (ok) solved++;
  await page.waitForTimeout(1600);
}

const stars = await page.locator('.star-row .star.lit').count();
const save = await page.evaluate((id) => {
  const s = JSON.parse(localStorage.getItem('codequest-save-v1'));
  return { level: s.levels[id] || null, xp: s.xp, gems: s.gems };
}, LEVEL);
console.log(`solved steps: ${solved}, stars lit: ${stars}`);
console.log('save:', JSON.stringify(save));

if (errors.length) { console.error('\nERRORS (' + errors.length + '):'); errors.slice(0, 8).forEach(e => console.error(' -', e.slice(0, 140))); }
await browser.close();
process.exit(errors.length ? 1 : 0);
