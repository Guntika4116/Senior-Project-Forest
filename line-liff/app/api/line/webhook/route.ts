import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

// ข้อมูลตัวอย่าง ยังไม่ได้ดึงคอร์สที่ผู้เรียนลงทะเบียนจริง
const demoCourses = [
  {
    id: "demo-3",
    name: "อบรมพันธุ์ไม้ครั้งที่ 3",
    description:
      "ปูพื้นฐานโครงสร้างเนื้อไม้และการจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย ฝึกสังเกตสี เสี้ยน และลวดลายจากตัวอย่างไม้",
    date: "08 เม.ย. 2570 - 10 เม.ย. 2570",
    location: "ห้องปฏิบัติการเนื้อไม้ อาคารฝึกอบรม ชั้น 3",
  },
  {
    id: "demo-4",
    name: "เทคนิคตรวจพิสูจน์ชนิดไม้ด้วยกล้องจุลทรรศน์",
    description:
      "ฝึกเตรียมชิ้นตัวอย่างและสังเกตลักษณะทางกายวิภาคของเนื้อไม้ เปรียบเทียบโครงสร้างกับตัวอย่างอ้างอิงเพื่อประกอบการระบุชนิดไม้",
    date: "22 เม.ย. 2570 - 24 เม.ย. 2570",
    location: "ห้องจุลทรรศน์ อาคารวิทยาศาสตร์ป่าไม้ ชั้น 2",
  },
  {
    id: "demo-5",
    name: "ปฏิบัติการตรวจพิสูจน์ไม้ภาคสนาม",
    description:
      "จำลองสถานการณ์ตรวจรับไม้ ฝึกบันทึกลักษณะ เก็บและติดรหัสตัวอย่าง พร้อมจัดทำรายงานผลตรวจพิสูจน์เบื้องต้นอย่างเป็นขั้นตอน",
    date: "06 พ.ค. 2570 - 08 พ.ค. 2570",
    location: "ศูนย์ฝึกภาคสนามและลานตรวจตัวอย่างไม้",
  },
];

type LineEvent = {
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
};

// LINE ส่ง webhook มาที่ /api/line/webhook ด้วย POST
export async function POST(request: Request) {
  const secret = process.env.LINE_CHANNEL_SECRET;

  if (!secret) {
    return new Response("Webhook is not configured", { status: 503 });
  }

  // ตรวจว่าคำขอมาจาก LINE จริงก่อนอ่านข้อมูล event
  const signature = request.headers.get("x-line-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 401 });
  }

  const body = await request.text();

  const expected = createHmac("sha256", secret)
    .update(body, "utf8")
    .digest();

  const received = Buffer.from(signature, "base64");

  if (
    received.length !== expected.length ||
    !timingSafeEqual(received, expected)
  ) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: { events?: Array<LineEvent | null> } | null;

  try {
    payload = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!payload || !Array.isArray(payload.events)) {
    return new Response("Invalid events", { status: 400 });
  }

  // ตอนกด Verify จะได้รับ events ว่าง จึงข้ามลูปและตอบ OK
  for (const event of payload.events) {
    if (!event) continue;

    const isMyCoursesRequest =
      event.type === "message" &&
      event.message?.type === "text" &&
      typeof event.message.text === "string" &&
      event.message.text.trim() === "ดูคอร์สเรียนของฉัน";

    if (!isMyCoursesRequest) continue;

    // เมนูคอร์สส่วนตัวใช้ในแชตตัวต่อตัวกับ OA
    if (event.source?.type !== "user") continue;
    if (!event.replyToken) continue;

    console.info("ได้รับคำขอคอร์สเรียนของฉันแล้ว");

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
                type: "flex",
                altText: "คอร์สเรียนของฉัน (ตัวอย่าง 3 คอร์ส)",
                contents: {
                  type: "carousel",

                  // สร้างการ์ดหนึ่งใบต่อหนึ่งคอร์ส
                  contents: demoCourses.map((course) => ({
                    type: "bubble",
                    size: "mega",

                    // รูปปกคอร์ส
                    hero: {
                      type: "image",
                      url: "https://png.pngtree.com/thumb_back/fw800/background/20240625/pngtree-tree-planting-growth-love-of-nature-image_15824708.jpg",
                      size: "full",
                      aspectRatio: "2.4:1",
                      aspectMode: "cover",
                    },

                    // รายละเอียดคอร์ส
                    body: {
                      type: "box",
                      layout: "vertical",
                      spacing: "md",
                      paddingAll: "20px",
                      contents: [
                        {
                          type: "text",
                          text: "ข้อมูลตัวอย่าง",
                          size: "xs",
                          color: "#888888",
                        },
                        {
                          type: "text",
                          text: course.name,
                          weight: "bold",
                          size: "xl",
                          color: "#4C795F",
                          wrap: true,
                        },
                        {
                          type: "text",
                          text: course.description,
                          size: "sm",
                          weight: "bold",
                          color: "#4C795F",
                          wrap: true,
                        },
                        {
                          type: "text",
                          text: `📅 ${course.date}`,
                          size: "sm",
                          color: "#686868",
                          wrap: true,
                        },
                        {
                          type: "text",
                          text: `📍 ${course.location}`,
                          size: "sm",
                          color: "#686868",
                          wrap: true,
                        },
                      ],
                    },

                    // ปุ่มเปิด LIFF — ยังใช้หน้าคอร์สทั้งหมดชั่วคราว
                    footer: {
                      type: "box",
                      layout: "vertical",
                      paddingAll: "20px",
                      paddingTop: "0px",
                      contents: [
                        {
                          type: "button",
                          style: "primary",
                          color: "#609879",
                          action: {
                            type: "uri",
                            label: "เรียน",
                            uri: "https://liff.line.me/2010609183-kINtWyQr/courses",
                          },
                        },
                      ],
                    },
                  })),
                },
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

  return new Response("OK", { status: 200 });
}