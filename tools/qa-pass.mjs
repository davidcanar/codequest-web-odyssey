/* QA test pass for CodeQuest: Web Odyssey — real user-like interactions only. */
import { chromium } from 'playwright-core';

const GAME_URL = 'file:///D:/Projects/htmlcssjs/index.html';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const consoleIssues = [];
let currentAction = 'boot';

const browser = await chromium.launch({
  executablePath: CHROME,
  args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required']
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

page.on('console', msg => {
  if (msg.type() === 'error') consoleIssues.push({ action: currentAction, kind: 'console.error', text: msg.text() });
});
page.on('pageerror', err => consoleIssues.push({ action: currentAction, kind: 'pageerror', text: err.message }));
page.on('requestfailed', req => {
  const f = req.failure() ? req.failure().errorText : '';
  consoleIssues.push({ action: currentAction, kind: 'requestfailed', text: req.url() + ' :: ' + f });
});

const out = (...a) => console.log(...a);
const P = (sec, status, text) => { out(`[${sec}] [${status}] ${text}`); };

/* ============ S1: TITLE & ONBOARDING ============ */
currentAction = 'S1: load title screen';
await page.goto(GAME_URL);
await page.waitForSelector('#title-start', { timeout: 15000 });
const logo = (await page.locator('.game-logo .grad').textContent() || '').trim();
const logoL2 = (await page.locator('.game-logo .l2').textContent() || '').trim();
const planetCount = await page.locator('.title-planet').count();
const startTxt = (await page.locator('#title-start').textContent()).trim();
const tagline = (await page.locator('.title-tagline').textContent()).trim();
P('S1', logo.includes('CODEQUEST') && planetCount === 1 && /start/i.test(startTxt) ? 'OK' : 'BLOCKER',
  `title screen: logo="${logo} / ${logoL2}", planet svg count=${planetCount}, start btn="${startTxt}", tagline="${tagline}"`);
await page.screenshot({ path: 'tmp-qa-01-title.png' });

currentAction = 'S1: click Start -> onboarding';
await page.click('#title-start');
await page.waitForSelector('#ob-name');
await page.type('#ob-name', 'QA-Tester');
const nameTyped = await page.inputValue('#ob-name');

currentAction = 'S1: pick Español in onboarding';
await page.click('.lang-pick button[data-l="es"]');
await page.waitForSelector('.lang-pick button[data-l="es"].sel');
const goTxtEs = (await page.locator('#ob-go').textContent()).trim();
const phEs = await page.getAttribute('#ob-name', 'placeholder');
const nameAfterEs = await page.inputValue('#ob-name');
P('S1', /vamos/i.test(goTxtEs) && /piloto/i.test(phEs) ? 'OK' : 'MINOR',
  `Spanish UI after picking Español: go btn="${goTxtEs}", name placeholder="${phEs}"`);
P('S1', nameAfterEs === 'QA-Tester' ? 'OK' : 'MINOR',
  `typed name "${nameTyped}" after clicking Español → input value is now "${nameAfterEs}" (empty = name field wiped by lang re-render)`);
await page.screenshot({ path: 'tmp-qa-02-onboard-es.png' });

currentAction = 'S1: switch back to English';
if (nameAfterEs !== 'QA-Tester') { await page.fill('#ob-name', ''); await page.type('#ob-name', 'QA-Tester'); }
await page.click('.lang-pick button[data-l="en"]');
await page.waitForSelector('.lang-pick button[data-l="en"].sel');
const goTxtEn = (await page.locator('#ob-go').textContent()).trim();
const phEn = await page.getAttribute('#ob-name', 'placeholder');
const nameAfterEn = await page.inputValue('#ob-name');
P('S1', /go/i.test(goTxtEn) && /pilot/i.test(phEn) ? 'OK' : 'MINOR',
  `English UI restored: go btn="${goTxtEn}", placeholder="${phEn}"`);
if (nameAfterEn !== 'QA-Tester') { await page.fill('#ob-name', ''); await page.type('#ob-name', 'QA-Tester'); }

currentAction = 'S1: click go button';
await page.click('#ob-go');
await page.waitForSelector('.screen-map', { timeout: 10000 });
const savedName = await page.evaluate(() => JSON.parse(localStorage.getItem('codequest-save-v1')).name);
P('S1', savedName === 'QA-Tester' ? 'OK' : 'MINOR', `after "Let's go" → map shown, saved name="${savedName}"`);

/* ============ S2: GALAXY MAP ============ */
currentAction = 'S2: galaxy map';
const sectionTitles = await page.locator('.map-section h3').allTextContents();
const nodeCount = await page.locator('.map-node').count();
const lockedCount = await page.locator('.map-node.locked').count();
const lockIco = await page.locator('.map-node.locked .lock-ico').count();
const nextCount = await page.locator('.map-node.next').count();
const nextNum = (await page.locator('.map-node.next .node-num').first().textContent()).trim();
const hudXpBefore = (await page.locator('#hud-xptext').textContent()).trim();
const heartsBefore = (await page.locator('#hud-hearts').textContent()).trim();
P('S2',
  sectionTitles.length === 4 && nodeCount === 48 && lockedCount === 47 && nextCount === 1 && nextNum === '1' ? 'OK' : 'BLOCKER',
  `sections=[${sectionTitles.join(' | ')}], nodes=${nodeCount}, locked=${lockedCount} (lock icons=${lockIco}), pulsing next=${nextCount} (num=${nextNum}), HUD: ${hudXpBefore}, hearts=${heartsBefore}`);
await page.screenshot({ path: 'tmp-qa-03-map.png' });

/* ============ S3: PLAY LEVEL 1 ============ */
currentAction = 'S3: click pulsing level-1 node -> briefing';
await page.click('.map-node.next');
await page.waitForSelector('#intro-narr');
const phaseTitle = (await page.locator('.phase-title').textContent()).trim();
await sleep(300);
const narrLen1 = (await page.locator('#intro-narr').textContent()).length;
await sleep(500);
const narrLen2 = (await page.locator('#intro-narr').textContent()).length;
await page.waitForFunction(() => !document.querySelector('#intro-narr .caret'), null, { timeout: 10000 });
const narrFull = (await page.locator('#intro-narr').textContent()).trim();
P('S3',
  narrLen2 > narrLen1 && narrFull.length > 100 ? 'OK' : 'MINOR',
  `briefing "${phaseTitle}" typewriter narration growing: ${narrLen1} → ${narrLen2} chars, final ${narrFull.length} chars: "${narrFull.slice(0, 70)}..."`);

currentAction = 'S3: Begin mission -> Training Deck';
await page.click('#intro-go');
await page.waitForSelector('#learn-embed iframe');
const embedSrc = await page.getAttribute('#learn-embed iframe', 'src');
const learnBtnTxt = (await page.locator('#learn-start').textContent()).trim();
P('S3', embedSrc.includes('assets/explainers/html-01.html') ? 'OK' : 'MINOR',
  `Training Deck: embedded explainer iframe src="${embedSrc}", start-training btn="${learnBtnTxt}"`);

currentAction = 'S3: Watch lesson video modal';
await page.click('#learn-video');
await page.waitForSelector('.video-modal video');
let vidOk = false, vinfo = null;
try {
  await page.waitForFunction(() => {
    const v = document.querySelector('.video-modal video');
    return v && v.readyState >= 1 && v.duration > 0;
  }, null, { timeout: 12000 });
  vinfo = await page.evaluate(() => {
    const v = document.querySelector('.video-modal video');
    const r = v.getBoundingClientRect();
    return { duration: +v.duration.toFixed(2), rectW: Math.round(r.width), videoW: v.videoWidth, src: v.currentSrc.split('/').slice(-2).join('/') };
  });
  vidOk = vinfo.rectW > 0 && vinfo.videoW > 0 && vinfo.duration > 10;
} catch (e) { vinfo = { error: e.message.split('\n')[0] }; }
P('S3', vidOk ? 'OK' : 'BLOCKER',
  `lesson video modal: ${JSON.stringify(vinfo)} (need width>0 and duration>10s)`);
await page.screenshot({ path: 'tmp-qa-04-video-modal.png' });

currentAction = 'S3: close video modal';
await page.click('#modal-root .modal [data-act="close"]');
await sleep(300);
const modalGone = await page.locator('.video-modal').count();
P('S3', modalGone === 0 ? 'OK' : 'BLOCKER', `close modal → .video-modal count=${modalGone}`);

currentAction = 'S3: Start training -> exercise 1 (MCQ)';
await page.click('#learn-start');
await page.waitForSelector('.ex-card');
const kind1 = (await page.locator('.ex-card .ex-kind').textContent()).trim();
await page.locator('.opt', { hasText: 'HyperText Markup Language' }).first().click();
await page.waitForSelector('.ex-card .ex-feedback.good', { timeout: 5000 });
const fb1 = (await page.locator('.ex-card .ex-feedback.good').textContent()).trim().slice(0, 90);
P('S3', kind1.includes('QUIZ') ? 'OK' : 'MINOR', `ex1 ${kind1}: picked "HyperText Markup Language" → green feedback: "${fb1}"`);
await sleep(1300);

currentAction = 'S3: exercise 2 (drag & drop via click-to-place)';
await page.waitForSelector('.dnd-tray');
const kind2 = (await page.locator('.ex-card .ex-kind').textContent()).trim();
await page.click('.dnd-tray .token[data-token="<h1>"]');
await page.click('.dnd-slot[data-idx="0"]');
await page.click('.dnd-tray .token[data-token="hello world"]');
await page.click('.dnd-slot[data-idx="1"]');
await page.click('.dnd-tray .token[data-token="</h1>"]');
await page.click('.dnd-slot[data-idx="2"]');
await page.waitForSelector('.ex-card .ex-feedback.good', { timeout: 5000 });
const fb2 = (await page.locator('.ex-card .ex-feedback.good').textContent()).trim().slice(0, 90);
P('S3', kind2.includes('DRAG') ? 'OK' : 'MINOR', `ex2 ${kind2}: tokens <h1>/hello world/</h1> into slots 0/1/2 → auto-check green: "${fb2}"`);
await sleep(1300);

currentAction = 'S3: exercise 3 (type answer)';
await page.waitForSelector('.fill-blank');
const kind3 = (await page.locator('.ex-card .ex-kind').textContent()).trim();
await page.type('.fill-blank', 'Cosmo');
await page.click('.ex-card .ex-actions .btn.ok');
await page.waitForSelector('.ex-card .ex-feedback.good', { timeout: 5000 });
const blankClass = await page.getAttribute('.fill-blank', 'class');
P('S3', blankClass.includes('good') ? 'OK' : 'MINOR', `ex3 ${kind3}: typed "Cosmo" + Check → blank class="${blankClass}", green feedback shown`);

currentAction = 'S3: exercise 4 (MCQ <h1>)';
await sleep(1300);
await page.waitForSelector('.opt-list');
const kind4 = (await page.locator('.ex-card .ex-kind').textContent()).trim();
const optTexts = await page.locator('.opt').allTextContents();
P('S3', 'INFO', `ex4 option texts as actually rendered: ${JSON.stringify(optTexts)}`);
await page.screenshot({ path: 'tmp-qa-05b-ex4-options.png' });
await page.locator('.opt', { hasText: '&lt;h1&gt;' }).first().click();
await page.waitForSelector('.ex-card .ex-feedback.good', { timeout: 5000 });
P('S3', kind4.includes('QUIZ') ? 'OK' : 'MINOR', `ex4 ${kind4}: picked the <h1> option → green feedback shown`);
await sleep(1300);

currentAction = 'S3: exercise 5 (code mission sandbox)';
await page.waitForSelector('.sandbox-editor');
const kind5 = (await page.locator('.ex-card .ex-kind').textContent()).trim();
await page.fill('.sandbox-editor', '<h1>My Space Page</h1>\n<h2>Episode 1</h2>');
await sleep(1200); // live preview debounce is 420ms
await page.click('.ex-card .ex-actions .btn.ok');
await page.waitForSelector('.ex-card .ex-feedback.good', { timeout: 5000 });
const sbFb = (await page.locator('.ex-card .ex-feedback.good').textContent()).trim();
const checkCount = (sbFb.match(/✅/g) || []).length;
P('S3', checkCount === 4 ? 'OK' : 'MINOR', `ex5 ${kind5}: typed exact code + Check → green feedback with ${checkCount}/4 ✅ checks`);
await page.screenshot({ path: 'tmp-qa-05-ex5.png' });

currentAction = 'S3: results screen';
await page.waitForSelector('.star-row');
let starsLit = 0;
try {
  await page.waitForFunction(() => document.querySelectorAll('.star-row .star.lit').length >= 3, null, { timeout: 6000 });
  starsLit = await page.locator('.star-row .star.lit').count();
} catch (e) { starsLit = await page.locator('.star-row .star.lit').count(); }
const stats = await page.locator('.results-stats .stat-pill').allTextContents();
const hudXpAfter = (await page.locator('#hud-xptext').textContent()).trim();
const hudLvlAfter = (await page.locator('#hud-lvl').textContent()).trim();
const confettiN = await page.locator('.confetti-piece').count();
P('S3', starsLit === 3 ? 'OK' : 'MINOR', `results: ${starsLit}/3 animated stars lit, stats=[${stats.join(' ; ')}], confetti pieces in flight=${confettiN}`);
P('S3', /([1-9]\d*) XP/.test(hudXpAfter) ? 'OK' : 'BLOCKER', `HUD XP after level: "${hudXpAfter}" (was "${hudXpBefore}"), ${hudLvlAfter}`);
await page.screenshot({ path: 'tmp-qa-06-results.png' });

currentAction = 'S3: back to map from results';
await page.click('#res-map');
await page.waitForSelector('.screen-map');

/* ============ S4: PERSISTENCE ============ */
currentAction = 'S4: reload page';
await page.reload();
await page.waitForSelector('#title-start');
const startTxt2 = (await page.locator('#title-start').textContent()).trim();
P('S4', /continue/i.test(startTxt2) ? 'OK' : 'BLOCKER', `after reload title button says "${startTxt2}"`);
await page.click('#title-start');
await page.waitForSelector('.screen-map');
const xpText2 = (await page.locator('#hud-xptext').textContent()).trim();
const save = await page.evaluate(() => JSON.parse(localStorage.getItem('codequest-save-v1') || '{}'));
const lv1 = save.levels && save.levels['html-01'];
P('S4', /([1-9]\d*)/.test(xpText2) ? 'OK' : 'BLOCKER', `HUD after continue: "${xpText2}"`);
P('S4', lv1 && lv1.done === true ? 'OK' : 'BLOCKER',
  `localStorage codequest-save-v1: levels["html-01"]=${JSON.stringify(lv1)}, name="${save.name}", xp=${save.xp}, gems=${save.gems}, stars=${save.levels && save.levels['html-01'] && save.levels['html-01'].stars}`);

/* ============ S5: HEARTS & FAILURE (html-02) ============ */
currentAction = 'S5: open level 2';
const node2 = page.locator('.map-node').filter({ has: page.locator('.node-num:text-is("2")') });
const node2Locked = await node2.evaluate(el => el.classList.contains('locked'));
await node2.click();
await page.waitForSelector('#intro-go');
await page.click('#intro-go');
await page.waitForSelector('#learn-start');
await page.click('#learn-start');
await page.waitForSelector('.match-grid');
const heartsS5Before = (await page.locator('#hud-hearts').textContent()).trim();
const kindS5 = (await page.locator('.ex-card .ex-kind').textContent()).trim();
P('S5', node2Locked === false ? 'OK' : 'BLOCKER', `level 2 node unlocked=${!node2Locked}; ex1 kind="${kindS5}"; hearts before="${heartsS5Before}"`);

currentAction = 'S5: answer exercise 1 wrong twice';
const colA = page.locator('.match-grid .match-col').first();
const colB = page.locator('.match-grid .match-col').nth(1);
const bTexts = await colB.locator('.match-item').allTextContents();
const wrongIdx = bTexts.findIndex(t => !/opening tag|etiqueta de apertura/i.test(t));
await colA.locator('.match-item').first().click();
await colB.locator('.match-item').nth(wrongIdx).click();
await sleep(800);
const heartsAfter1 = (await page.locator('#hud-hearts').textContent()).trim();
await colA.locator('.match-item').first().click();
await colB.locator('.match-item').nth(wrongIdx).click();
await sleep(800);
const heartsAfter2 = (await page.locator('#hud-hearts').textContent()).trim();
const stillEx1 = await page.locator('.match-grid').count();
P('S5', heartsAfter1 !== heartsS5Before && heartsAfter2 !== heartsAfter1 ? 'OK' : 'BLOCKER',
  `wrong pair clicks: hearts "${heartsS5Before}" → "${heartsAfter1}" → "${heartsAfter2}"; after 2 wrongs still on same exercise (reveal? ${stillEx1 === 0})`);

currentAction = 'S5: third wrong click (reveal behaviour)';
await colA.locator('.match-item').first().click();
await colB.locator('.match-item').nth(wrongIdx).click();
await sleep(2800);
const ex2Kind = await page.locator('.ex-card .ex-kind').textContent().catch(() => 'n/a');
const heartsAfter3 = (await page.locator('#hud-hearts').textContent()).trim();
P('S5', /BUG/i.test(ex2Kind || '') ? 'OK' : 'MINOR',
  `3rd wrong click on match → moved on to "${(ex2Kind || '').trim()}", hearts="${heartsAfter3}" (match reveals after 3 fails; MCQ/bug reveal after 2)`);

currentAction = 'S5: quit via ✕ button';
await page.click('#ex-quit');
await page.waitForSelector('#cm-y');
const confirmMsg = (await page.locator('#modal-root .modal p').textContent()).trim();
await page.click('#cm-y');
await page.waitForSelector('.screen-map');
P('S5', 'OK', `✕ → confirm modal "${confirmMsg}" → Yes → back on galaxy map`);

/* ============ S6: SETTINGS MODAL ============ */
currentAction = 'S6: settings modal';
await page.click('#hud-settings');
await page.waitForSelector('#set-sfx');
const sfxType = await page.getAttribute('#set-sfx', 'type');
const musicType = await page.getAttribute('#set-music', 'type');
const voiceN = await page.locator('#set-voice').count();
const relaxedN = await page.locator('#set-relaxed').count();
const skinN = await page.locator('.skin-card').count();
const exportN = await page.locator('#set-export').count();
const importN = await page.locator('#set-import').count();
const resetN = await page.locator('#set-reset').count();
P('S6', sfxType === 'range' && musicType === 'range' && voiceN && relaxedN && skinN === 4 && exportN && importN && resetN ? 'OK' : 'MINOR',
  `settings: sfx slider(${sfxType}), music slider(${musicType}), voice toggle=${voiceN}, relaxed toggle=${relaxedN}, skin cards=${skinN}, export=${exportN}, import=${importN}, reset=${resetN}`);

currentAction = 'S6: toggle relaxed mode';
const heartsPreRelax = (await page.locator('#hud-hearts').textContent()).trim();
await page.click('#set-relaxed');
await sleep(200);
const heartsInf = (await page.locator('#hud-hearts').textContent()).trim();
await page.click('#set-relaxed');
await sleep(200);
const heartsOff = (await page.locator('#hud-hearts').textContent()).trim();
P('S6', heartsInf.includes('∞') && heartsOff === heartsPreRelax ? 'OK' : 'BLOCKER',
  `relaxed ON → hearts="${heartsInf}", OFF → "${heartsOff}" (before="${heartsPreRelax}")`);

currentAction = 'S6: close settings';
await page.click('#modal-root .modal [data-act="close"]');
await sleep(200);
P('S6', (await page.locator('#modal-root .modal').count()) === 0 ? 'OK' : 'MINOR', 'settings modal closed');

/* ============ S7: ACHIEVEMENTS ============ */
currentAction = 'S7: achievements modal';
await page.click('#hud-ach');
await page.waitForSelector('.ach-grid');
const achCards = await page.locator('.ach-card').count();
const achLocked = await page.locator('.ach-card.locked').count();
const achHeader = (await page.locator('#modal-root .modal h3').textContent()).trim();
P('S7', achCards > 0 && achLocked > 0 ? 'OK' : 'MINOR', `${achHeader}: ${achCards} cards, ${achLocked} locked/greyed`);
await page.screenshot({ path: 'tmp-qa-07-achievements.png' });
await page.click('#modal-root .modal [data-act="close"]');
await sleep(200);

/* ============ S8: LANGUAGE SWITCH ============ */
currentAction = 'S8: switch language via HUD 🌐';
const errCountBeforeLang = consoleIssues.length;
await page.click('#hud-lang');
await page.waitForSelector('.screen-map');
const h3Es = await page.locator('.map-section h3').allTextContents();
const langBtn = (await page.locator('#hud-lang').textContent()).trim();
const errsLang = consoleIssues.length - errCountBeforeLang;
P('S8', /Nebulosa/.test(h3Es[0]) && /Reino/.test(h3Es[1]) && errsLang === 0 ? 'OK' : 'MINOR',
  `map re-rendered in Spanish: [${h3Es.join(' | ')}], HUD lang btn="${langBtn}", new page errors=${errsLang}`);
await page.screenshot({ path: 'tmp-qa-08-map-es.png' });
// switch back to EN for consistency of later steps
await page.click('#hud-lang');
await page.waitForSelector('.screen-map');

/* ============ S9: VIDEO SPOT-CHECK css-09 ============ */
currentAction = 'S9: css-09 lesson video (App.startLevel used as permitted)';
await page.evaluate(() => App.startLevel('css-09'));
await page.waitForSelector('#intro-video');
await page.click('#intro-video');
await page.waitForSelector('.video-modal video');
let v9ok = false, v9 = null;
try {
  await page.waitForFunction(() => {
    const v = document.querySelector('.video-modal video');
    return v && v.readyState >= 1 && v.duration > 0;
  }, null, { timeout: 15000 });
  v9 = await page.evaluate(() => {
    const v = document.querySelector('.video-modal video');
    return { duration: +v.duration.toFixed(2), videoW: v.videoWidth, src: v.currentSrc.split('/').slice(-2).join('/') };
  });
  v9ok = v9.duration > 20 && v9.videoW > 0;
} catch (e) { v9 = { error: e.message.split('\n')[0] }; }
P('S9', v9ok ? 'OK' : 'BLOCKER', `css-09 video: ${JSON.stringify(v9)} (need duration>20s)`);

currentAction = 'S9: cleanup (back to map via learn screen)';
await page.click('#modal-root .modal [data-act="close"]');
await page.click('#intro-go');
await page.waitForSelector('#learn-back');
await page.click('#learn-back');
await page.waitForSelector('.screen-map');
await page.screenshot({ path: 'tmp-qa-09-final.png' });

/* ============ S10: CONSOLE ERRORS ============ */
currentAction = 'S10: error summary';
const ignore = /favicon/i;
const real = consoleIssues.filter(e => !ignore.test(e.text));
out('\n===== CONSOLE / PAGE ERRORS (' + real.length + ') =====');
if (real.length === 0) out('None.');
real.forEach((e, i) => out(`${i + 1}. [${e.kind}] during "${e.action}": ${e.text.slice(0, 300)}`));

await browser.close();
out('\nQA PASS COMPLETE');
