# รายงาน: ล็อกอินเดโม่และสลับริชเมนู (ไม่ใช้ฐานข้อมูล)

## ขอบเขตที่ตกลง

บัญชี `example@gmail.com` / `0123456789` ใช้ทดสอบเดโม่เท่านั้น ยังไม่เชื่อม backend ของอีกกลุ่ม ซึ่งเป็นเจ้าของ PostgreSQL เมื่อเชื่อมจริง LIFF จะเรียก API ของ backend ไม่อ่านฐานข้อมูลโดยตรง

## 1. ส่วนที่เก็บไว้

- `app/(auth)/login/page.tsx`: ฟอร์มตามโทนภาพ มีอีเมล รหัสผ่าน เปิด/ซ่อนรหัส loading/error และหน้าสำเร็จ
- `app/woods/login/page.tsx`: ทางเข้า LIFF `/login` ใช้ฟอร์มเดียวกัน
- `app/api/auth/login/route.ts`: ตรวจ origin, รูปแบบข้อมูล, LINE ID token และบัญชีเดโม่ ก่อนผูกเมนู student
- `lib/line-auth.ts`: ตรวจ token กับ LINE ด้วย LINE Login Channel ID และใช้ userId ที่ตรวจแล้ว ไม่เชื่อ userId จาก browser; ตรวจ password ฝั่ง server และสลับเมนู
- หน้า register ลิงก์กลับ `/woods/login`; LIFF provider เก็บหน้าปลายทางตอน login
- webhook รับ `action=logout` แล้วยกเลิกเมนูรายคน เพื่อคืน Guest จาก OA Manager

## 2. ส่วนที่ถอดออกจากเวอร์ชันก่อนหน้า

ลบ `lib/auth-store.ts`, `proxy.ts`, `components/SessionMonitor.tsx` และ `app/api/auth/session/route.ts`

ถอดการตรวจ session ใน webhook, การสร้าง cookie session, การล็อก Redis, การจำกัดจำนวน login ด้วย Redis และการบังคับสิทธิ์หน้าเรียน/OMR ออก ไม่มีการเรียก Redis หรือฐานข้อมูลใด ๆ อีก

ถอด SessionMonitor จาก root layout และลบตัวแปร Upstash/Redis จาก `.env.example` หากเคยตั้งบน Vercel สามารถลบค่าเหล่านั้นได้ โค้ดไม่ใช้งานแล้ว ไม่ได้ลบฐานข้อมูลหรือข้อมูลของบริการภายนอก

เมื่อ login เดโม่สำเร็จ จะส่ง cookie หมดอายุเพื่อล้าง `woodcertify_session` จากเวอร์ชันเก่า ไม่มี session ใหม่มาแทน และ cookie เก่าไม่ถูกใช้ตัดสินสิทธิ์อีก

## 3. พฤติกรรมเดโม่

1. เปิด `https://liff.line.me/2010609183-kINtWyQr/login`
2. กรอก email/password ของเดโม่
3. ฝั่ง server ตรวจ LINE ID token และบัญชีเดโม่
4. ถ้าถูกต้อง ผูกเมนู student ให้ LINE user ที่ตรวจแล้ว และแจ้งสำเร็จ
5. ถ้าข้อมูลผิดหรือผูกเมนูไม่ได้ แสดง error ไม่แจ้งสำเร็จ
6. ส่ง “โปรไฟล์” แสดงชื่อ/รูป LINE จริง อีเมลเป็น `example@gmail.com` พร้อมป้ายข้อมูลตัวอย่าง ไม่ใช่อีเมลสมาชิกจริง
7. กดออกจากระบบ คืนเมนู Guest เฉพาะคนที่กด ไม่ลบเมนูของคนอื่น

**การสลับเมนูไม่ใช่ระบบ authentication/authorization เต็มรูปแบบ:** หลังออกจากระบบยังเปิดลิงก์คอร์สหรือพิมพ์เรียกการ์ดเองได้ ไม่มีการบันทึกสมาชิก/session และไม่มี rate limit แบบ Redis ในเดโม่ รุ่นใช้งานจริงต้องให้ backend รับผิดชอบ login/session/สิทธิ์ก่อนเปิดข้อมูลจริง

## 4. ค่าที่ต้องตั้ง

ตั้งใน `line-liff/.env.local` และ Vercel environment แล้ว redeploy:

| ตัวแปร | ค่า |
| --- | --- |
| `NEXT_PUBLIC_LIFF_ID` | `2010609183-kINtWyQr` |
| `LINE_LOGIN_CHANNEL_ID` | Channel ID ของ LINE Login channel ที่มี LIFF นี้ ไม่ใช่ Messaging API channel ID |
| `LINE_CHANNEL_ACCESS_TOKEN` | Token ของ WoodCertify |
| `LINE_CHANNEL_SECRET` | Secret ของ Messaging API channel สำหรับ webhook |
| `LINE_STUDENT_RICH_MENU_ID` | `richmenu-bc4a96a5651d7f433285e4493e729acc` |
| `DEMO_LOGIN_PASSWORD` | `0123456789` |

อีเมลเดโม่กำหนดฝั่ง server ใน `lib/line-auth.ts` รหัสผ่านไม่ฝังใน client และไม่แสดงใน log ต้องตั้ง `DEMO_LOGIN_PASSWORD` จริงจึงใช้ได้

เปิด scope `openid` และ `profile` ของ LIFF; LINE Login และ Messaging API channel ต้องอยู่ใน provider เดียวกัน และผู้ทดสอบต้องเพิ่มเพื่อน OA

Guest ใน OA Manager ต้องอยู่ในช่วงแสดงที่เปิดใช้งาน ตั้งปุ่ม login เป็น LIFF URL ข้างต้น หรือเปิดหน้าลงทะเบียนเดิมแล้วกด “มีบัญชีอยู่แล้ว? เข้าสู่ระบบ”

## 5. วิธีตรวจ

จาก `line-liff`:

```bash
npx tsc --noEmit
node --test tests/demo-auth.test.cjs
```

ทดสอบจริงหลัง deploy: รหัสผิดต้องไม่สลับเมนู → รหัสถูกต้องเห็น student → เรียกการ์ดโปรไฟล์ใหม่ → logout กลับ Guest → login อีกครั้งได้ โดยไม่ต้องตั้ง Redis/PostgreSQL

ชุดทดสอบใช้ LINE API จำลอง ครอบคลุม origin, token/channel ผิด, รหัสผิด, userId ปลอมจาก browser, login สำเร็จ, ล้าง cookie เก่า, การผูก/ยกเลิกเมนูล้มเหลว, webhook ปลอม และโปรไฟล์/คอร์สที่ไม่มี session

การทดสอบจริงบน LINE ต้องรอค่าบน Vercel และ deploy จากผู้ใช้ ไม่ได้เปลี่ยนเมนู OA จริงระหว่างแก้โค้ด
