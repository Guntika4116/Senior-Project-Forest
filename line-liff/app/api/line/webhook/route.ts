import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

// LINE จะส่ง Webhook มาที่ /api/line/webhook ด้วยคำขอแบบ POST
export async function POST(request: Request) {
  // ค่านี้ต้องเป็น Channel secret ของ Messaging API channel และเก็บไว้บนเซิร์ฟเวอร์
  const secret = process.env.LINE_CHANNEL_SECRET;

  if (!secret) {
    return new Response("Webhook is not configured", { status: 503 });
  }

  // LINE แนบ Sign มาให้ เราใช้เช็กว่าคำขอนี้มาจาก LINE จริง
  const signature = request.headers.get("x-line-signature");
  if (!signature) {
    return new Response("Missing signature", { status: 401 });
  }

  // อ่านข้อความที่ส่งมาตรง ๆ ก่อน ห้ามแปลงเป็น JSON ตอนนี้ เพราะ Sign จะตรวจไม่ผ่าน
  const body = await request.text();
  // สร้าง Sign ของเราเองจากข้อความเดิม แล้วเทียบกับ Sign ที่ LINE ส่งมา
  const expected = createHmac("sha256", secret)
    .update(body, "utf8")
    .digest();
  const received = Buffer.from(signature, "base64");

  // ถ้าไม่ตรงกัน ให้หยุดตรงนี้ ไม่อ่านหรือทำงานกับข้อมูลในคำขอนั้นต่อ
  if (
    received.length !== expected.length ||
    !timingSafeEqual(received, expected)
  ) {
    return new Response("Invalid signature", { status: 401 });
  }

  // ผ่านการตรวจแล้ว ค่อยแปลงข้อความเป็นข้อมูลที่นำไปใช้ต่อได้
  let payload: {
    events?: Array<{
      type?: string;
      replyToken?: string;
      source?: {
        type?: string;
        userId?: string;
      };
      message?: {
        type?: string;
        text?: string;
      };
    }>;
  };

  try {
    payload = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!Array.isArray(payload.events)) {
    return new Response("Invalid events", { status: 400 });
  }

  // ตอนนี้แค่จดชนิดของเหตุการณ์ลง Log ยังไม่ได้ส่งข้อความตอบผู้ใช้
  // ตอนกด Verify ใน LINE Developers จะได้ events เป็น [] จึงไม่มี Log จากลูปนี้
  for (const event of payload.events) {
    const isMyCoursesRequest =
      event.type === "message" &&
      event.message?.type === "text" &&
      event.message.text?.trim() === "ดูคอร์สเรียนของฉัน";

    if (!isMyCoursesRequest) continue;

    console.info("ได้รับคำขอคอร์สเรียนของฉันแล้ว");

    if (!event.replyToken) continue;

    const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("ยังไม่ได้ตั้งค่า LINE_CHANNEL_ACCESS_TOKEN");
      return new Response("Messaging API is not configured", {
        status: 503,
      });
    }

    try {
      const response = await fetch(
        "https://api.line.me/v2/bot/message/reply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            replyToken: event.replyToken,
            messages: [
              {
                type: "text",
                text: "ได้รับคำขอแล้ว กำลังทดสอบแสดงคอร์สเรียนของคุณ 🌳",
              },
            ],
          }),
          signal: AbortSignal.timeout(8000),
        },
      );

      if (!response.ok) {
        console.error("LINE ตอบกลับไม่สำเร็จ:", response.status);
        return new Response("Reply failed", { status: 502 });
      }
    } catch {
      console.error("เชื่อมต่อ LINE Reply API ไม่สำเร็จ");
      return new Response("Reply unavailable", { status: 502 });
    }
  }

  // บอก LINE ว่าเราได้รับคำขอเรียบร้อยแล้ว
  return new Response("OK", { status: 200 });
}
