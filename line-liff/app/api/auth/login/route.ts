import { NextResponse } from "next/server";
import { demoCredentialsMatch, setStudentMenu, verifyLineIdentity } from "@/lib/line-auth";

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
    if (!demoCredentialsMatch(body.email, body.password)) return error("อีเมลหรือรหัสผ่านไม่ถูกต้อง", 401);
    // เดโม่ตรวจบัญชีและเปลี่ยนเมนูเท่านั้น ยังไม่สร้าง session หรือเชื่อม backend
    await setStudentMenu(userId);
    const response = NextResponse.json({ ok: true });
    response.headers.set("Cache-Control", "no-store");
    // ล้าง cookie จากเวอร์ชัน Redis เดิม หาก browser เคยรับไว้
    response.cookies.set("woodcertify_session", "", {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "lax", path: "/", maxAge: 0,
    });
    return response;
  } catch {
    // ไม่ log รหัสผ่าน ID token หรือ credential ของ LINE
    console.error("Demo login or student menu unavailable");
    return error("เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่ หากยังไม่ได้ให้ตรวจการตั้งค่าเซิร์ฟเวอร์และเพิ่มเพื่อน WoodCertify", 503);
  }
}
