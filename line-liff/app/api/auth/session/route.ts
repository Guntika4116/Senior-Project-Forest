import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readSession, SESSION_COOKIE } from "@/lib/auth-store";

export async function GET() {
  try {
    const session = await readSession((await cookies()).get(SESSION_COOKIE)?.value);
    return NextResponse.json({ authenticated: !!session }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Session store unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
