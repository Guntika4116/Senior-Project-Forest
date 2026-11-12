import { createHmac, timingSafeEqual } from "node:crypto";
import { demoCourses } from "@/lib/demo-courses";
import { DEMO_EMAIL } from "@/lib/line-auth";
import { buildScoreMessage } from "@/lib/score-message";
export const runtime = "nodejs";
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
  postback?: {
    data?: string;
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
  if (received.length !== expected.length ||
    !timingSafeEqual(received, expected)) {
    return new Response("Invalid signature", { status: 401 });
  }
  let payload: {
    events?: Array<LineEvent | null>;
  } | null;
  try {
    payload = JSON.parse(body);
  }
  catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (!payload || !Array.isArray(payload.events)) {
    return new Response("Invalid events", { status: 400 });
  }
  // ตอนกด Verify จะได้รับ events ว่าง จึงข้ามลูปและตอบ OK
  for (const event of payload.events) {
    if (!event)
      continue;
    // รับข้อความจากปุ่มดูคะแนน หรือข้อความที่ผู้ใช้พิมพ์เอง
    const isScoreRequest =
      event.type === "message" &&
      event.message?.type === "text" &&
      typeof event.message.text === "string" &&
      event.message.text.trim() === "ดูคะแนน";

    if (isScoreRequest) {
      if (event.source?.type !== "user") continue;
      if (!event.replyToken) continue;

      const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
      const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

      if (!accessToken || !liffId) {
        console.error("ยังไม่ได้ตั้งค่า LINE สำหรับการ์ดคะแนน");
        return new Response("Score messaging is not configured", {
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
              messages: [buildScoreMessage(liffId)],
            }),
            signal: AbortSignal.timeout(8000),
          },
        );

        if (!response.ok) {
          console.error("ส่งการ์ดคะแนนไม่สำเร็จ:", response.status);
          return new Response("Score reply failed", { status: 502 });
        }
      } catch {
        console.error("สร้างหรือส่งการ์ดคะแนนไม่สำเร็จ");
        return new Response("Score reply unavailable", { status: 502 });
      }

      // จบ event คะแนน ไม่เข้าเงื่อนไขอื่นต่อ
      continue;
    }เหม
    // รับคำสั่งจากปุ่มออกจากระบบในการ์ดโปรไฟล์
    const isLogoutRequest =
      event.type === "postback" &&
      event.postback?.data === "action=logout";

    if (isLogoutRequest) {
      if (event.source?.type !== "user") continue;

      const userId = event.source.userId;
      if (!userId || !event.replyToken) continue;

      const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

      if (!accessToken) {
        return new Response("Messaging API is not configured", {
          status: 503,
        });
      }

      try {
        // ยกเลิกการผูกเมนู student เฉพาะผู้กด
        // ไม่ลบตัวเมนู และไม่กระทบผู้ใช้คนอื่น
        // LINE จะกลับไปใช้เมนูเริ่มต้น Guest ที่เปิดไว้ใน OA Manager
        const unlinkResponse = await fetch(
          `https://api.line.me/v2/bot/user/${encodeURIComponent(userId)}/richmenu`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            signal: AbortSignal.timeout(8000),
          },
        );

        if (!unlinkResponse.ok) {
          console.error(
            "เปลี่ยนกลับเมนู Guest ไม่สำเร็จ:",
            unlinkResponse.status,
          );

          throw new Error("Rich menu unlink failed");
        }

        // เดโม่เปลี่ยนเมนูเท่านั้น การ logout จริงจะเชื่อม API ของ backend ภายหลัง
        const replyResponse = await fetch(
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
                  text: "ออกจากระบบแล้ว",
                },
              ],
            }),
            signal: AbortSignal.timeout(8000),
          },
        );

        if (!replyResponse.ok) {
          console.error(
            "เปลี่ยนเมนูแล้ว แต่ส่งข้อความยืนยันไม่สำเร็จ:",
            replyResponse.status,
          );

          return new Response("Logout reply failed", {
            status: 502,
          });
        }
      } catch {
        console.error("เชื่อมต่อ LINE เพื่อเปลี่ยนเมนูไม่สำเร็จ");

        return new Response("Logout request unavailable", {
          status: 502,
        });
      }

      // จบ event นี้ ไม่เข้าเงื่อนไขโปรไฟล์หรือคอร์สเรียนต่อ
      continue;
    }
    const isProfileRequest = event.type === "message" &&
      event.message?.type === "text" &&
      typeof event.message.text === "string" &&
      event.message.text.trim() === "โปรไฟล์";
    if (isProfileRequest) {
      // แสดงโปรไฟล์เฉพาะแชตส่วนตัวกับ OA
      if (event.source?.type !== "user")
        continue;
      if (!event.replyToken)
        continue;
      // รหัสของผู้ส่งคำว่าโปรไฟล์ ใช้ดึงชื่อและรูปจาก LINE
      const userId = event.source.userId;
      if (!userId)
        continue;
      const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
      if (!accessToken) {
        return new Response("Messaging API is not configured", {
          status: 503,
        });
      }
      try {
        // ใช้ userId จาก webhook ที่ผ่านการตรวจลายเซ็นแล้ว
        const profileResponse = await fetch(`https://api.line.me/v2/bot/profile/${encodeURIComponent(userId)}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
          signal: AbortSignal.timeout(8000),
        });
        if (!profileResponse.ok) {
          console.error("ดึงโปรไฟล์ LINE ไม่สำเร็จ:", profileResponse.status);
          return new Response("Profile lookup failed", { status: 502 });
        }
        const lineProfile: {
          displayName: string;
          pictureUrl?: string;
        } = await profileResponse.json();
        const profile = {
          name: lineProfile.displayName,
          pictureUrl: lineProfile.pictureUrl,
          // อีเมลตัวอย่างของเดโม่ ไม่ใช่อีเมลจริงจาก LINE หรือฐานข้อมูลสมาชิก
          email: DEMO_EMAIL,
        };
        const response = await fetch("https://api.line.me/v2/bot/message/reply", {
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
                altText: "โปรไฟล์ของฉัน",
                contents: {
                  type: "bubble",
                  size: "kilo",
                  body: {
                    type: "box",
                    layout: "vertical",
                    alignItems: "center",
                    paddingAll: "20px",
                    spacing: "sm",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        width: "72px",
                        height: "72px",
                        cornerRadius: "36px",
                        backgroundColor: "#609879",
                        justifyContent: "center",
                        alignItems: "center",
                        contents: profile.pictureUrl
                          ? [
                            {
                              type: "image",
                              url: profile.pictureUrl,
                              size: "full",
                              aspectRatio: "1:1",
                              aspectMode: "cover",
                            },
                          ]
                          : [
                            {
                              // ถ้าผู้ใช้ไม่มีรูป ให้แสดงตัวอักษรแรกของชื่อแทน
                              type: "text",
                              text: Array.from(profile.name.trim())[0] || "?",
                              color: "#FFFFFF",
                              size: "xxl",
                              align: "center",
                            },
                          ],
                      },
                      {
                        type: "text",
                        text: profile.name,
                        color: "#609879",
                        size: "md",
                        weight: "bold",
                        align: "center",
                        wrap: true,
                        margin: "md",
                      },
                      {
                        type: "text",
                        text: profile.email,
                        color: "#609879",
                        size: "sm",
                        align: "center",
                        wrap: true,
                      },
                      {
                        type: "text",
                        text: "อีเมลตัวอย่าง • ยังไม่เชื่อมระบบสมาชิก",
                        color: "#888888",
                        size: "xxs",
                        align: "center",
                        wrap: true,
                      },
                    ],
                  },
                  footer: {
                    type: "box",
                    layout: "vertical",
                    paddingTop: "0px",
                    paddingBottom: "16px",
                    paddingStart: "24px",
                    paddingEnd: "24px",
                    contents: [
                      {
                        type: "button",
                        style: "primary",
                        color: "#FF6268",
                        height: "sm",
                        action: {
                          type: "postback",
                          label: "ออกจากระบบ",
                          data: "action=logout",
                        },
                      },
                    ],
                  },
                },
              },
            ],
          }),
          signal: AbortSignal.timeout(8000),
        });
        if (!response.ok) {
          console.error("ส่งการ์ดโปรไฟล์ไม่สำเร็จ:", response.status);
          return new Response("Profile reply failed", { status: 502 });
        }
      }
      catch {
        console.error("เชื่อมต่อ LINE เพื่อส่งโปรไฟล์ไม่สำเร็จ");
        return new Response("Profile reply unavailable", { status: 502 });
      }
      // ไม่ให้ event โปรไฟล์ไหลไปทำส่วนคอร์สเรียนต่อ
      continue;
    }
    const isMyCoursesRequest = event.type === "message" &&
      event.message?.type === "text" &&
      typeof event.message.text === "string" &&
      event.message.text.trim() === "ดูคอร์สเรียนของฉัน";
    if (!isMyCoursesRequest)
      continue;
    // เมนูคอร์สส่วนตัวใช้ในแชตตัวต่อตัวกับ OA
    if (event.source?.type !== "user")
      continue;
    if (!event.replyToken)
      continue;
    console.info("ได้รับคำขอคอร์สเรียนของฉันแล้ว");
    const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("ยังไม่ได้ตั้งค่า LINE_CHANNEL_ACCESS_TOKEN");
      return new Response("Messaging API is not configured", {
        status: 503,
      });
    }
    try {
      const response = await fetch("https://api.line.me/v2/bot/message/reply", {
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
                    url: course.imageUrl,
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
                          // LIFF ต่อท้าย endpoint /woods เป็น /woods/courses/รหัสคอร์ส
                          uri: `https://liff.line.me/2010609183-kINtWyQr/courses/${encodeURIComponent(course.id)}`,
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
      });
      if (!response.ok) {
        console.error("LINE ตอบกลับไม่สำเร็จ:", response.status);
        return new Response("Reply failed", { status: 502 });
      }
    }
    catch {
      console.error("เชื่อมต่อ LINE Reply API ไม่สำเร็จ");
      return new Response("Reply unavailable", { status: 502 });
    }
  }
  return new Response("OK", { status: 200 });
}
