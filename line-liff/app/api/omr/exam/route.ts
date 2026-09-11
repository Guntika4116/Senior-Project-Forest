import { forwardToOmr } from "@/lib/omr-server";

export const runtime = "nodejs";

export async function GET() {
  return forwardToOmr("/api/exam/");
}
