const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { createHmac } = require('node:crypto');
const { NextRequest } = require('next/server');
const modules = new Map();
function load(file) {
  if (modules.has(file)) return modules.get(file);
  const mod = { exports: {} };
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  new Function('require', 'module', 'exports', compiled)(name => name.startsWith('@/') ? load(name.slice(2) + '.ts') : require(name), mod, mod.exports);
  modules.set(file, mod.exports);
  return mod.exports;
}
const store = load('lib/auth-store.ts');
const login = load('app/api/auth/login/route.ts');
const webhook = load('app/api/line/webhook/route.ts');
const { proxy } = load('proxy.ts');
const userId = 'U' + 'a'.repeat(32);
Object.assign(process.env, {
  UPSTASH_REDIS_REST_URL: 'https://redis.test', UPSTASH_REDIS_REST_TOKEN: 'test',
  LINE_LOGIN_CHANNEL_ID: '123', LINE_CHANNEL_ACCESS_TOKEN: 'test', LINE_CHANNEL_SECRET: 'secret',
  LINE_STUDENT_RICH_MENU_ID: 'richmenu-test', DEMO_LOGIN_PASSWORD: '0123456789', NEXT_PUBLIC_LIFF_ID: '123-test',
});
function setup() {
  const db = new Map();
  const calls = [];
  const state = { menuFails: false, verifyFails: false, redisFails: false };
  global.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), ...options });
    if (url === 'https://redis.test') {
      if (state.redisFails) return new Response('', { status: 503 });
      const [op, key, value, ...rest] = JSON.parse(options.body);
      let result;
      if (op === 'SET') { result = rest.includes('NX') && db.has(key) ? null : 'OK'; if (result) db.set(key, value); }
      else if (op === 'GET') result = db.get(key) ?? null;
      else if (op === 'DEL') result = Number(db.delete(key));
      else if (op === 'EVAL') {
        const args = JSON.parse(options.body);
        const redisKey = args[3];
        if (key.includes("'incr'")) { result = Number(db.get(redisKey) || 0) + 1; db.set(redisKey, result); }
        else { result = db.get(redisKey) === args[4] ? Number(db.delete(redisKey)) : 0; }
      } else throw new Error('Unexpected Redis command');
      return Response.json({ result });
    }
    if (String(url).endsWith('/oauth2/v2.1/verify')) return state.verifyFails
      ? Response.json({}, { status: 400 })
      : Response.json({ sub: userId, aud: '123', iss: 'https://access.line.me', exp: Math.floor(Date.now()/1000) + 3600 });
    if (String(url).includes('/richmenu')) return Response.json({}, { status: state.menuFails ? 400 : 200 });
    if (String(url).endsWith('/message/reply')) return Response.json({});
    throw new Error('Unexpected network request: ' + url);
  };
  return { calls, state, db };
}
function request(password = '0123456789', origin = 'https://app.test') {
  return new Request('https://app.test/api/auth/login', { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'example@gmail.com', password, idToken: 'test-token', userId: 'spoofed-user' }) });
}
test('login rejects bad origin, password and LINE token without linking a menu', async () => {
  const { calls, state } = setup();
  assert.equal((await login.POST(request('0123456789', 'https://evil.test'))).status, 403);
  assert.equal((await login.POST(request('wrong'))).status, 401);
  state.verifyFails = true;
  assert.equal((await login.POST(request())).status, 401);
  assert.equal(calls.filter(c => c.url.includes('/richmenu')).length, 0);
});
test('login creates HttpOnly cookie, links only verified user, protects pages and logout revokes old cookie', async () => {
  const { calls } = setup();
  const response = await login.POST(request());
  assert.equal(response.status, 200);
  assert.match(response.headers.get('set-cookie'), /HttpOnly/i);
  const cookie = response.cookies.get(store.SESSION_COOKIE).value;
  assert.equal((await store.readSession(cookie)).userId, userId);
  assert.ok(calls.some(c => c.url.endsWith(`/user/${userId}/richmenu/richmenu-test`) && c.method === 'POST'));
  assert.equal((await proxy(new NextRequest('https://app.test/woods/courses/demo-3', { headers: { cookie: `${store.SESSION_COOKIE}=${cookie}` } }))).status, 200);
  const body = JSON.stringify({ events: [{ type: 'postback', postback: { data: 'action=logout' }, source: { type: 'user', userId }, replyToken: 'reply' }] });
  const signed = () => new Request('https://app.test/api/line/webhook', { method: 'POST', body, headers: { 'x-line-signature': createHmac('sha256', 'secret').update(body).digest('base64') } });
  assert.equal((await webhook.POST(signed())).status, 200);
  assert.equal(await store.readSession(cookie), null);
  assert.ok(calls.some(c => c.method === 'DELETE' && c.url.endsWith(`/user/${userId}/richmenu`)));
  assert.equal((await proxy(new NextRequest('https://app.test/woods/courses/demo-3', { headers: { cookie: `${store.SESSION_COOKIE}=${cookie}` } }))).status, 307);
  assert.equal((await proxy(new NextRequest('https://app.test/api/omr/scan'))).status, 401);
  // Logging back in must never revive the old cookie.
  assert.equal((await login.POST(request())).status, 200);
  assert.equal(await store.readSession(cookie), null);
});
test('failed menu link or session store never issues a session cookie', async () => {
  const { state } = setup();
  state.menuFails = true;
  const response = await login.POST(request());
  assert.equal(response.status, 503);
  assert.equal(response.cookies.get(store.SESSION_COOKIE), undefined);
  assert.equal(await store.activeUser(userId), null);
  state.redisFails = true;
  assert.equal((await login.POST(request())).status, 503);
});
test('expired/tampered cookie rejected, login attempts bounded, forged webhook rejected', async () => {
  const { db } = setup();
  const cookie = await store.createSession(userId, 'example@gmail.com');
  assert.equal(await store.readSession(cookie.slice(0, -1) + (cookie.endsWith('0') ? '1' : '0')), null);
  const key = `woodcertify:demo:user:${userId}`;
  const session = JSON.parse(db.get(key)); session.expiresAt = 0; db.set(key, JSON.stringify(session));
  assert.equal(await store.readSession(cookie), null);
  for (let i = 0; i < 10; i++) assert.equal(await store.allowLoginAttempt(userId), true);
  assert.equal(await store.allowLoginAttempt(userId), false);
  const bad = new Request('https://app.test/api/line/webhook', { method: 'POST', body: '{"events":[]}', headers: { 'x-line-signature': 'forged' } });
  assert.equal((await webhook.POST(bad)).status, 401);
});
