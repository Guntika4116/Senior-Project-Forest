import { createHash, timingSafeEqual } from "node:crypto";

export const DEMO_EMAIL = "example@gmail.com";
export function demoCredentialsMatch(email: string, password: string) {
  const expected = process.env.DEMO_LOGIN_PASSWORD;
  if (!expected) throw new Error("Demo password is not configured");
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return email.trim().toLowerCase() === DEMO_EMAIL && timingSafeEqual(digest(password), digest(expected));
}

export async function verifyLineIdentity(idToken: string): Promise<string | null> {
  const channelId = process.env.LINE_LOGIN_CHANNEL_ID;
  if (!channelId) throw new Error("LINE Login channel is not configured");
  // ให้ LINE ตรวจลายเซ็น อายุ และ channel ของ ID token; ไม่เชื่อ userId จาก browser
  const response = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST", body: new URLSearchParams({ id_token: idToken, client_id: channelId }),
    cache: "no-store", signal: AbortSignal.timeout(8000),
  });
  if (response.status === 400 || response.status === 401) return null;
  if (!response.ok) throw new Error("LINE verification unavailable");
  const data = await response.json();
  return data.aud === channelId && data.iss === "https://access.line.me" &&
    typeof data.exp === "number" && data.exp * 1000 > Date.now() &&
    typeof data.sub === "string" && /^U[0-9a-f]{32}$/.test(data.sub) ? data.sub : null;
}

export async function setStudentMenu(userId: string) {
  const menuId = process.env.LINE_STUDENT_RICH_MENU_ID;
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!menuId || !token) throw new Error("Student menu is not configured");
  const response = await fetch(`https://api.line.me/v2/bot/user/${encodeURIComponent(userId)}/richmenu/${encodeURIComponent(menuId)}`, {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: "", signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("Student menu link failed");
}
