import { NextResponse } from "next/server";
import { allowLoginAttempt, createSession, revokeUser, SESSION_COOKIE, SESSION_SECONDS, withUserLock } from "@/lib/auth-store";
import { DEMO_EMAIL, demoCredentialsMatch, setStudentMenu, verifyLineIdentity } from "@/lib/line-auth";

export const runtime = "nodejs";
const error = (message: string, status: number) => NextResponse.json({ error: message }, { status });

export async function POST(request: Request) {
  // ฟอร์มต้องส่งจาก origin เดียวกัน ป้องกันการบังคับล็อกอินข้ามเว็บไซต์
  if (request.headers.get("origin") !== new URL(request.url).origin) return error("คำขอไม่ถูกต้อง", 403);
  let body;
  try { body = await request.json(); } catch { return error("ข้อมูลไม่ถูกต้อง", 400); }
  if (!body || typeof body.email !== "string" || typeof body.password !== "string" ||
      typeof body.idToken !== "string" || !body.idToken || body.idToken.length > 10000 ||
      body.email.length > 254 || body.password.length > 256) return error("กรุณากรอกข้อมูลให้ครบ", 400);
  try {
    const userId = await verifyLineIdentity(body.idToken);
    if (!userId) return error("ยืนยันบัญชี LINE ไม่สำเร็จ กรุณาเปิดผ่าน LIFF อีกครั้ง", 401);
    if (!await allowLoginAttempt(userId)) return error("ลองเข้าสู่ระบบหลายครั้งเกินไป กรุณารอ 5 นาที", 429);
    if (!demoCredentialsMatch(body.email, body.password)) return error("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 401);
    const cookie = await withUserLock(userId, async () => {
      const session = await createSession(userId, DEMO_EMAIL);
      try { await setStudentMenu(userId); }
      catch (error) { await revokeUser(userId); throw error; }
      return session;
    });
    const response = NextResponse.json({ ok: true });
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set(SESSION_COOKIE, cookie, {
      httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: SESSION_SECONDS,
    });
    return response;
  } catch {
    // ไม่ log รหัสผ่าน ID token หรือ credential ของ LINE/Redis
    console.error("Demo login or student menu unavailable");
    return error("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่ หากยังไม่ได้ให้ตรวจการตั้งค่าเซิร์ฟเวอร์และเพิ่มเพื่อน WoodCertify", 503);
  }
}
