import { isOmrExam, isOmrResult, omrErrorMessage } from "./omr";

export function omrError(status: number, message: string) {
  return Response.json({ status: "error", message }, { status });
}

export async function forwardToOmr(path: "/api/exam/" | "/api/scan/", body?: FormData) {
  const baseUrl = process.env.OMR_API_URL || "http://127.0.0.1:8000";
  try {
    const upstream = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, {
      method: body ? "POST" : "GET",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(75_000),
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      return omrError(upstream.status, omrErrorMessage(data, "ระบบตรวจคำตอบขัดข้อง กรุณาลองใหม่"));
    }
    if (data?.status !== "success" ||
        (body ? !isOmrResult(data.result) : !isOmrExam(data.exam))) {
      return omrError(502, "ข้อมูลผลตรวจไม่สมบูรณ์ กรุณาลองใหม่");
    }
    return Response.json(body ? { status: "success", result: data.result } : data,
      { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return omrError(504, "ตรวจภาพใช้เวลานานเกินไป กรุณาลองส่งอีกครั้ง");
    }
    console.error("OMR API request failed", error instanceof Error ? error.message : "Unknown error");
    return omrError(503, "ติดต่อระบบตรวจคำตอบไม่ได้ กรุณาลองใหม่หรือติดต่อผู้ดูแล");
  }
}
