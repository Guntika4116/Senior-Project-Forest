import { createHash, randomBytes } from "node:crypto";

// ใช้ Redis กลางแทนตัวแปรใน memory เพื่อให้ webhook เพิกถอน session ข้าม Vercel instance ได้
export const SESSION_COOKIE = "woodcertify_session";
export const SESSION_SECONDS = 60 * 60 * 8;
const prefix = () => process.env.AUTH_REDIS_PREFIX || "woodcertify:demo";
const userKey = (userId: string) => `${prefix()}:user:${userId}`;
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
export type Session = { userId: string; email: string; tokenHash: string; expiresAt: number };

export async function redis(command: (string | number)[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Session store is not configured");
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command), cache: "no-store", signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error("Session store unavailable");
  const data = await response.json();
  if (data.error) throw new Error("Session store command failed");
  return data.result;
}

export async function activeUser(userId: string): Promise<Session | null> {
  const value = await redis(["GET", userKey(userId)]);
  if (!value) return null;
  const session = JSON.parse(value) as Session;
  return session.expiresAt > Date.now() && session.userId === userId ? session : null;
}

export async function createSession(userId: string, email: string) {
  const token = randomBytes(32).toString("hex");
  const session: Session = { userId, email, tokenHash: hash(token), expiresAt: Date.now() + SESSION_SECONDS * 1000 };
  await redis(["SET", userKey(userId), JSON.stringify(session), "EX", SESSION_SECONDS]);
  // รหัสสุ่ม 256 บิตอยู่เฉพาะ cookie HttpOnly; Redis เก็บเพียง hash
  return `${userId}.${token}`;
}

export async function readSession(cookie?: string): Promise<Session | null> {
  if (!cookie || !/^U[0-9a-f]{32}\.[0-9a-f]{64}$/.test(cookie)) return null;
  const [userId, token] = cookie.split(".");
  const session = await activeUser(userId);
  return session?.tokenHash === hash(token) ? session : null;
}

export async function revokeUser(userId: string) {
  await redis(["DEL", userKey(userId)]);
}

// ล็อกการเปลี่ยนเมนู/สถานะของคนเดียวกัน ป้องกัน login และ logout แข่งกัน
export async function withUserLock<T>(userId: string, action: () => Promise<T>): Promise<T> {
  const key = `${prefix()}:lock:${userId}`;
  const token = randomBytes(16).toString("hex");
  if (await redis(["SET", key, token, "NX", "EX", 60]) !== "OK") throw new Error("Account operation in progress");
  try { return await action(); }
  finally {
    await redis(["EVAL", "if redis.call('get',KEYS[1]) == ARGV[1] then return redis.call('del',KEYS[1]) else return 0 end", 1, key, token]);
  }
}

export async function allowLoginAttempt(userId: string) {
  // ตัวนับและ expiry ทำงานพร้อมกัน ป้องกันการลองรหัสผ่านซ้ำ: 10 ครั้ง/5 นาที/LINE user
  const key = `${prefix()}:attempts:${userId}`;
  const count = await redis(["EVAL", "local n=redis.call('incr',KEYS[1]); if n==1 then redis.call('expire',KEYS[1],300) end; return n", 1, key]);
  return Number(count) <= 10;
}
