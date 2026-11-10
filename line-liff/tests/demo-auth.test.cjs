const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { createHmac } = require('node:crypto');
const modules = new Map();
function load(file) {
  if (modules.has(file)) return modules.get(file);
  const mod = { exports: {} };
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  new Function('require', 'module', 'exports', compiled)(name => name.startsWith('@/') ? load(name.slice(2) + '.ts') : require(name), mod, mod.exports);
  modules.set(file, mod.exports);
  return mod.exports;
}
const login = load('app/api/auth/login/route.ts');
const webhook = load('app/api/line/webhook/route.ts');
const userId = 'U' + 'a'.repeat(32);
Object.assign(process.env, {
  LINE_LOGIN_CHANNEL_ID: '123', LINE_CHANNEL_ACCESS_TOKEN: 'test', LINE_CHANNEL_SECRET: 'secret',
  LINE_STUDENT_RICH_MENU_ID: 'richmenu-test', DEMO_LOGIN_PASSWORD: '0123456789',
});
// ไม่กำหนด Redis หรือฐานข้อมูล: ทุก flow ต้องทำงานด้วย LINE API อย่างเดียว
function setup() {
  const calls = [];
  const state = { menuFails: false, verifyFails: false, wrongAudience: false };
  global.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), ...options });
    if (String(url).endsWith('/oauth2/v2.1/verify')) return state.verifyFails
      ? Response.json({}, { status: 400 })
      : Response.json({ sub: userId, aud: state.wrongAudience ? 'other-channel' : '123', iss: 'https://access.line.me', exp: Math.floor(Date.now()/1000) + 3600 });
    if (String(url).includes('/richmenu')) return Response.json({}, { status: state.menuFails ? 400 : 200 });
    if (String(url).endsWith('/message/reply')) return Response.json({});
    if (String(url).includes('/profile/')) return Response.json({ displayName: 'Demo User' });
    throw new Error('Unexpected network request: ' + url);
  };
  return { calls, state };
}
function request(password = '0123456789', origin = 'https://app.test') {
  return new Request('https://app.test/api/auth/login', { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'example@gmail.com', password, idToken: 'test-token', userId: 'spoofed-user' }) });
}
function signedEvent(event, valid = true) {
  const body = JSON.stringify({ events: [event] });
  return new Request('https://app.test/api/line/webhook', { method: 'POST', body, headers: { 'x-line-signature': valid ? createHmac('sha256', 'secret').update(body).digest('base64') : 'forged' } });
}
test('reject bad origin, password, LINE token and wrong channel without switching menu', async () => {
  const { calls, state } = setup();
  assert.equal((await login.POST(request('0123456789', 'https://evil.test'))).status, 403);
  assert.equal((await login.POST(request('wrong'))).status, 401);
  state.verifyFails = true;
  assert.equal((await login.POST(request())).status, 401);
  state.verifyFails = false; state.wrongAudience = true;
  assert.equal((await login.POST(request())).status, 401);
  assert.equal(calls.filter(c => c.url.includes('/richmenu')).length, 0);
});
test('demo login links verified user without creating a session; clears legacy cookie', async () => {
  const { calls } = setup();
  const response = await login.POST(request());
  assert.equal(response.status, 200);
  assert.equal(response.cookies.get('woodcertify_session').value, '');
  assert.match(response.headers.get('set-cookie'), /Max-Age=0/i);
  assert.ok(calls.some(c => c.url.endsWith(`/user/${userId}/richmenu/richmenu-test`) && c.method === 'POST'));
  assert.equal(calls.length, 2);
});
test('failed student menu link is not reported as a successful login', async () => {
  const { state } = setup(); state.menuFails = true;
  const response = await login.POST(request());
  assert.equal(response.status, 503);
  assert.equal(response.cookies.get('woodcertify_session'), undefined);
});
test('logout unlinks only requesting user; rejects forged webhook and surfaces unlink failure', async () => {
  const { calls, state } = setup();
  const event = { type: 'postback', postback: { data: 'action=logout' }, source: { type: 'user', userId }, replyToken: 'reply' };
  assert.equal((await webhook.POST(signedEvent(event, false))).status, 401);
  assert.equal(calls.length, 0);
  assert.equal((await webhook.POST(signedEvent(event))).status, 200);
  assert.ok(calls.some(c => c.method === 'DELETE' && c.url.endsWith(`/user/${userId}/richmenu`)));
  state.menuFails = true;
  const before = calls.filter(c => c.url.endsWith('/message/reply')).length;
  assert.equal((await webhook.POST(signedEvent(event))).status, 502);
  assert.equal(calls.filter(c => c.url.endsWith('/message/reply')).length, before);
});
test('profile and course cards work without a session/database', async () => {
  const { calls } = setup();
  for (const text of ['โปรไฟล์', 'ดูคอร์สเรียนของฉัน']) {
    assert.equal((await webhook.POST(signedEvent({ type: 'message', message: { type: 'text', text }, source: { type: 'user', userId }, replyToken: 'reply' }))).status, 200);
  }
  const messages = calls.filter(c => c.url.endsWith('/message/reply')).map(c => JSON.parse(c.body).messages[0]);
  assert.equal(messages[0].type, 'flex');
  assert.ok(JSON.stringify(messages[0]).includes('example@gmail.com'));
  assert.equal(messages[1].contents.type, 'carousel');
});
