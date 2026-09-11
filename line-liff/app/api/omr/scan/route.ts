import { MAX_OMR_IMAGE_BYTES, OMR_IMAGE_TYPES } from "@/lib/omr";
import { forwardToOmr, omrError } from "@/lib/omr-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > MAX_OMR_IMAGE_BYTES + 1024 * 1024) {
    return omrError(413, "ไฟล์ภาพต้องมีขนาดไม่เกิน 20 MB");
  }
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return omrError(400, "ข้อมูลภาพไม่ถูกต้อง กรุณาถ่ายใหม่");
  }
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return omrError(400, "ไม่พบภาพ กรุณาถ่ายใหม่");
  }
  if (file.size > MAX_OMR_IMAGE_BYTES) {
    return omrError(413, "ไฟล์ภาพต้องมีขนาดไม่เกิน 20 MB");
  }
  if (!OMR_IMAGE_TYPES.includes(file.type)) {
    return omrError(415, "กรุณาใช้รูป JPEG, PNG หรือ WebP");
  }
  const body = new FormData();
  body.append("file", file, "sheet.jpg");
  return forwardToOmr("/api/scan/", body);
}
