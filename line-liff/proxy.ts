import { NextRequest, NextResponse } from "next/server";
import { readSession, SESSION_COOKIE } from "@/lib/auth-store";

// ตรวจ session ฝั่ง server ทุก request ของส่วนเรียน/สอบ รวมถึงการเปิดลิงก์การ์ดเก่า
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // ผู้เยี่ยมชมยังค้นหารายการคอร์สทั้งหมดได้
  if (["/course", "/woods/courses"].includes(path.replace(/\/$/, ""))) return NextResponse.next();
  try {
    if (await readSession(request.cookies.get(SESSION_COOKIE)?.value)) {
      const response = NextResponse.next();
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }
  } catch {
    return new NextResponse("ระบบตรวจสอบการเข้าสู่ระบบไม่พร้อม กรุณาลองใหม่", { status: 503 });
  }
  if (path.startsWith("/api/")) return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
  const login = new URL("/woods/login", request.url);
  login.searchParams.set("next", path + request.nextUrl.search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/course/:path*", "/woods/courses/:path*", "/woods/score", "/api/omr/:path*"],
};
