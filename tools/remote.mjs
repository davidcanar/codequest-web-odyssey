/* ============ remote.mjs — provision & drive the build box (davidcanar@10.0.0.67) ============
   Subcommands:
     provision               one-time: connect with password, install Node, install SSH key
     deploy                  push code (tools/, explainers, levels) to the box
     install-deps            npm install + Playwright Chromium (+ system deps via sudo if needed)
     audio [--conc N]        run gen-audio.mjs on the box
     videos [--pool N]       launch record-videos.mjs on the box (detached, logged)
     status                  tail the remote log + count produced videos
     fetch                   pull assets/audio, assets/videos, js/durations.js back home
   The password is used ONLY by `provision`; every later step uses the installed SSH key.
============================================================================= */
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, readdirSync, openSync } from 'fs';
import { execFileSync, spawn } from 'child_process';
import { homedir, platform } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client } from 'ssh2';

const TOOLS = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(TOOLS, '..');
const CREDS_FILE = path.join(TOOLS, '.remote.json');
const KEY_FILE = path.join(homedir(), '.ssh', 'codequest_build_key');
const REMOTE_DIR = 'codequest-build';
const NODE_VER = 'v22.14.0';

const args = process.argv.slice(2);
const cmd = args[0];
const opt = (name, dflt) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : dflt; };

function creds() {
  if (!existsSync(CREDS_FILE)) { console.error('Missing ' + CREDS_FILE); process.exit(1); }
  return JSON.parse(readFileSync(CREDS_FILE, 'utf8'));
}
function keyPath() { return KEY_FILE + (platform() === 'win32' ? '' : ''); }

/* ---------- password-mode SSH (provision only) ---------- */
function sshExecPassword(cmd, timeoutMs = 240000) {
  return new Promise((resolve) => {
    const c = creds();
    const conn = new Client();
    let out = '', err = '', done = false;
    conn.on('ready', () => {
      conn.exec(cmd, { pty: false }, (e, stream) => {
        if (e) { conn.end(); return resolve({ code: 1, out: '', err: String(e) }); }
        stream.on('close', (code) => { done = true; conn.end(); resolve({ code, out, err }); })
              .on('data', d => { out += d; })
              .on('stderr', d => { err += d; });
      });
    });
    conn.on('error', e => { if (!done) resolve({ code: 1, out: '', err: 'ssh2: ' + e.message }); });
    setTimeout(() => { if (!done) { conn.end(); resolve({ code: 1, out, err: 'timeout' }); } }, timeoutMs);
    conn.connect({ host: c.host, port: c.port || 22, username: c.user, password: c.password, readyTimeout: 30000 });
  });
}

/* ---------- key-mode SSH (everything after provision) ---------- */
function sshExec(cmd, timeoutMs = 600000) {
  const c = creds();
  const sshBin = platform() === 'win32' ? 'ssh' : 'ssh';
  try {
    const out = execFileSync(sshBin, ['-i', keyPath(), '-o', 'StrictHostKeyChecking=accept-new', '-o', 'BatchMode=yes',
      '-p', String(c.port || 22), `${c.user}@${c.host}`, cmd], { encoding: 'utf8', timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024 });
    return { code: 0, out, err: '' };
  } catch (e) {
    return { code: e.status || 1, out: e.stdout || '', err: (e.stderr || '') + (e.message || '') };
  }
}

function sudo(cmd) {   // run a command with sudo using the password (remote side)
  const c = creds();
  const safe = c.password.replace(/'/g, `'\\''`);
  return `echo '${safe}' | sudo -S -p '' ${cmd}`;
}

/* ---------- provision ---------- */
async function provision() {
  console.log('→ Connecting to', creds().host, '…');
  let r = await sshExecPassword('uname -m && (cat /etc/os-release 2>/dev/null | head -2) && echo CONN_OK');
  console.log(r.out.trim() || r.err.trim());
  if (!r.out.includes('CONN_OK')) { console.error('✗ cannot connect:', r.err); process.exit(1); }
  const arch = r.out.includes('aarch64') ? 'linux-arm64' : 'linux-x64';

  // 1. workspace
  r = await sshExecFallback(`mkdir -p ~/${REMOTE_DIR}`);

  // 2. Node — prefer system node (≥18), fall back to local user install
  let nodeBin = '';
  r = await sshExecPassword('node -v 2>/dev/null || echo NONE');
  const sysNode = r.out.trim();
  if (/v(\d+)/.test(sysNode) && parseInt(sysNode.match(/v(\d+)/)[1], 10) >= 18) {
    console.log('✓ system Node ' + sysNode + ' — using it');
  } else {
    console.log('→ system Node missing/old (' + sysNode + ') — installing Node ' + NODE_VER + ' (' + arch + ') into ~/' + REMOTE_DIR + ' …');
    r = await sshExecPassword(`cd ~ && (curl -fsSL https://nodejs.org/dist/${NODE_VER}/node-${NODE_VER}-${arch}.tar.gz -o /tmp/node.tgz || wget -q https://nodejs.org/dist/${NODE_VER}/node-${NODE_VER}-${arch}.tar.gz -O /tmp/node.tgz) && tar -xzf /tmp/node.tgz -C ~/${REMOTE_DIR} && rm -f /tmp/node.tgz && echo INSTALLED_$(${REMOTE_DIR}/node-${NODE_VER}-${arch}/bin/node -v)`, 600000);
    if (!r.out.includes('INSTALLED_')) { console.error('✗ Node install failed:', r.err.trim().slice(0, 300)); process.exit(1); }
    nodeBin = `~/${REMOTE_DIR}/node-${NODE_VER}-${arch}/bin`;
    console.log('✓ local Node installed');
  }

  // 3. SSH key for future passwordless access
  if (!existsSync(KEY_FILE)) {
    execFileSync('ssh-keygen', ['-t', 'ed25519', '-N', '', '-f', keyPath(), '-q', '-C', 'codequest-build']);
    console.log('→ generated local key', KEY_FILE);
  }
  const pub = readFileSync(KEY_FILE + '.pub', 'utf8').trim();
  r = await sshExecPassword(`mkdir -p ~/.ssh && chmod 700 ~/.ssh && touch ~/.ssh/authorized_keys && (grep -qF '${pub}' ~/.ssh/authorized_keys || echo '${pub}' >> ~/.ssh/authorized_keys) && chmod 600 ~/.ssh/authorized_keys && echo KEY_OK`);
  if (!r.out.includes('KEY_OK')) { console.error('✗ key install failed:', r.err); process.exit(1); }
  r = await sshExecFallback('echo KEYAUTH_OK');
  if (!r.out.includes('KEYAUTH_OK')) { console.error('✗ key auth test failed:', r.err); process.exit(1); }
  console.log('✓ Key-based SSH works — password no longer needed.');

  // 4. sudo available?
  r = await sshExecPassword(`echo '${creds().password.replace(/'/g, "'\\''")}' | sudo -S -p '' true 2>&1 && echo SUDO_OK || echo SUDO_NO`);
  const sudoOk = r.out.includes('SUDO_OK');
  writeFileSync(path.join(TOOLS, '.remote-state.json'), JSON.stringify({ sudoOk, arch, nodeBin }));
  console.log(sudoOk ? '✓ sudo available (can install browser system deps if needed)' : '• no sudo — will try browser without system deps');
  console.log('\nProvisioning complete. Next: node tools/remote.mjs deploy');
}
async function sshExecFallback(cmd) { return sshExec(cmd); }

/* ---------- deploy ---------- */
function deploy() {
  const c = creds();
  const paths = ['tools/package.json', 'tools/lib', 'tools/gen-audio.mjs', 'tools/record-videos.mjs', 'tools/verify-assets.mjs',
    'tools/serve.mjs', 'assets/explainers', 'js/levels', 'js/durations.js'];
  const tmp = path.join(TOOLS, 'tmp-deploy.tgz');
  execFileSync('tar', ['czf', 'tools/tmp-deploy.tgz', ...paths], { cwd: ROOT });   // relative name: Windows bsdtar treats "D:" as a host
  sshExecFile(`mkdir -p ~/${REMOTE_DIR} && tar xzf - -C ~/${REMOTE_DIR} && echo DEPLOY_OK`, tmp).then(r => {
    if (r.out.includes('DEPLOY_OK')) console.log('✓ code deployed to', c.host + ':~/' + REMOTE_DIR);
    else { console.error('✗ deploy failed\n' + r.err.slice(0, 500)); process.exit(1); }
  });
}

/* stream a local file into a remote command via ssh stdin (no live pipes — Windows-safe) */
function sshExecFile(remoteCmd, localFile, timeoutMs = 600000) {
  const c = creds();
  const fd = localFile && existsSync(localFile) ? openSync(localFile, 'r') : 'pipe';
  const ssh = spawn('ssh', ['-i', keyPath(), '-o', 'StrictHostKeyChecking=accept-new', '-o', 'BatchMode=yes',
    '-p', String(c.port || 22), `${c.user}@${c.host}`, remoteCmd], { stdio: [fd, 'pipe', 'pipe'] });
  let out = '', err = '';
  ssh.stdout.on('data', d => out += d);
  ssh.stderr.on('data', d => err += d);
  return new Promise(resolve => ssh.on('close', code => resolve({ code, out, err })));
}

function pathPfx(state) {
  return state.nodeBin ? `export PATH=${state.nodeBin}:$PATH` : 'export PATH="$PATH"';
}

/* ---------- install deps on box ---------- */
function installDeps() {
  const state = JSON.parse(readFileSync(path.join(TOOLS, '.remote-state.json'), 'utf8'));
  const PATHPFX = pathPfx(state);
  const steps = [
    `cd ~/${REMOTE_DIR}/tools`,
    // npm deps
    `${PATHPFX} && npm install --no-audit --no-fund 2>&1 | tail -1`,
    `${PATHPFX} && npm install playwright --no-audit --no-fund 2>&1 | tail -1`,
    `${PATHPFX} && npx playwright install chromium 2>&1 | tail -2`,
    // python edge-tts (msedge-tts npm lib is dead — Microsoft's new DRM scheme)
    `(python3 -m edge_tts --help >/dev/null 2>&1 && echo TTS_ALREADY) || ((python3 -m pip --version >/dev/null 2>&1 || ${sudo('apt-get update -qq && apt-get install -y -qq python3-pip')}) && python3 -m pip install --user -q edge-tts && echo TTS_INSTALLED)`,
    `python3 -m edge_tts --help >/dev/null 2>&1 && echo TTS_OK || echo TTS_FAIL`,
    // browser launch test
    `${PATHPFX} && node -e "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--no-sandbox']});await b.close();console.log('BROWSER_OK');})().catch(e=>{console.error('BROWSER_FAIL '+e.message.split('\\n')[0]);process.exit(1)})"`,
  ];
  console.log('→ installing npm deps, Chromium and edge-tts on box…');
  const r = sshExec(steps.join(' && '), 1200000);
  console.log(r.out.trim());
  if (r.out.includes('TTS_FAIL')) { console.error('✗ edge-tts install failed:\n' + r.err.slice(0, 600)); process.exit(1); }
  if (r.out.includes('BROWSER_OK')) { console.log('✓ box ready'); return; }
  console.log('• browser failed to launch — trying system deps via sudo…');
  if (!state.sudoOk) { console.error('✗ no sudo on box; cannot install chromium system libraries. Ask your admin: sudo npx playwright install-deps chromium'); process.exit(1); }
  const script2 = `cd ~/${REMOTE_DIR}/tools && ${PATHPFX} && ${sudo('$(which npx) playwright install-deps chromium')} && ${PATHPFX} && node -e "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--no-sandbox']});await b.close();console.log('BROWSER_OK');})()"`;
  const r2 = sshExec(script2, 1200000);
  console.log(r2.out.trim(), r2.err.trim().slice(0, 400));
  if (r2.out.includes('BROWSER_OK')) console.log('✓ box ready (with system deps)');
  else { console.error('✗ browser still failing'); process.exit(1); }
}

/* ---------- runs ---------- */
function remoteRun(script, timeoutMs = 600000) {
  const state = JSON.parse(readFileSync(path.join(TOOLS, '.remote-state.json'), 'utf8'));
  const PATHPFX = pathPfx(state);
  return sshExec(`cd ~/${REMOTE_DIR}/tools && ${PATHPFX} && ${script}`, timeoutMs);
}

function audio() {
  const conc = opt('--conc', '12');
  console.log('→ generating narration audio on box…');
  const r = remoteRun(`node gen-audio.mjs --conc ${conc} ${args.includes('--force') ? '--force' : ''}`, 3600000);
  console.log(r.out.trim() || r.err.trim());
  if (r.code !== 0) { console.error('✗ audio generation failed'); process.exit(1); }
  console.log('✓ audio done');
}

function videos() {
  const pool = opt('--pool', '20');
  const shard = opt('--shard', null);
  const only = opt('--only', null);
  const detached = !args.includes('--wait');
  const state = JSON.parse(readFileSync(path.join(TOOLS, '.remote-state.json'), 'utf8'));
  const PATHPFX = pathPfx(state);
  const launch = `cd ~/${REMOTE_DIR}/tools && ${PATHPFX} && node record-videos.mjs --pool ${pool}` +
    (shard ? ` --shard ${shard}` : '') + (only ? ` --only ${only}` : '') + (args.includes('--force') ? ' --force' : '');
  if (detached) {
    const r = sshExec(`cd ~/${REMOTE_DIR}/tools && rm -f videos.log && nohup bash -c '${launch}' > videos.log 2>&1 & echo LAUNCHED $!`);
    console.log(r.out.trim());
    console.log('Recording runs detached. Poll with: node tools/remote.mjs status');
  } else {
    const r = sshExec(launch, 14400000);
    console.log(r.out.trim(), r.err.trim().slice(0, 800));
  }
}

function status() {
  const c = creds();
  const r = sshExec(`tail -15 ~/${REMOTE_DIR}/tools/videos.log 2>/dev/null; echo ---; ls ~/${REMOTE_DIR}/assets/videos/en 2>/dev/null | wc -l; ls ~/${REMOTE_DIR}/assets/videos/es 2>/dev/null | wc -l; echo ---; (pgrep -fc record-videos || echo 0)`);
  console.log(r.out.trim());
  console.log('\n(format: log tail --- en-count es-count --- running-processes)');
}

function fetchAssets() {
  const c = creds();
  console.log('→ pulling generated assets from box…');
  const tmp = path.join(TOOLS, 'tmp-fetch.tgz');
  const ssh = spawn('ssh', ['-i', keyPath(), '-o', 'StrictHostKeyChecking=accept-new', '-o', 'BatchMode=yes',
    '-p', String(c.port || 22), `${c.user}@${c.host}`, `cd ~/${REMOTE_DIR} && tar czf - assets/audio assets/videos js/durations.js`],
    { stdio: ['ignore', 'pipe', 'pipe'] });
  const chunks = [];
  let errText = '';
  ssh.stdout.on('data', d => chunks.push(d));
  ssh.stderr.on('data', d => errText += d);
  ssh.on('close', code => {
    if (code !== 0 || !chunks.length) { console.error('✗ fetch failed: ' + errText.slice(0, 400)); process.exit(1); }
    writeFileSync(tmp, Buffer.concat(chunks));
    try { execFileSync('tar', ['xzf', 'tools/tmp-fetch.tgz'], { cwd: ROOT }); console.log('✓ assets fetched into', ROOT); }
    catch (e) { console.error('✗ local extract failed: ' + e.message); process.exit(1); }
  });
}

/* ---------- dispatch ---------- */
const cmds = { provision, deploy, installDeps: installDeps, 'install-deps': installDeps, audio, videos, status, fetch: fetchAssets, 'fetch-assets': fetchAssets };
if (!cmds[cmd]) { console.error('Usage: node tools/remote.mjs provision|deploy|install-deps|audio|videos|status|fetch'); process.exit(1); }
await cmds[cmd]();
