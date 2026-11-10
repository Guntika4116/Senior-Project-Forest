# รายงานการเชื่อมฟอร์มล็อกอินเดโม่กับ LINE student menu

## ผลลัพธ์ที่โค้ดรองรับ

Guest → เปิด LIFF `/login` → กรอก `example@gmail.com` / `0123456789` → server ตรวจ LINE ID token และรหัสผ่าน → สร้าง session 8 ชั่วโมง → ผูกเมนู student เฉพาะผู้ใช้ → แสดงข้อความสำเร็จและปุ่มกลับแชต/เข้าคอร์ส

การออกจากระบบผ่านการ์ดโปรไฟล์จะลบ session ของ LINE user ก่อนยกเลิกเมนูรายคน เพื่อกลับไป Guest จาก OA Manager ไม่ได้ออกจากบัญชี LINE ของโทรศัพท์

**สถานะ:** โค้ดและการทดสอบจำลองพร้อม แต่ยังต้องตั้ง Redis และ environment บนระบบที่ deploy ก่อนทดสอบ LINE จริง ไม่ได้สร้าง Redis หรือเปลี่ยนเมนูบน OA จริงระหว่างพัฒนา

## 1. หน้าฟอร์ม

- แก้ `line-liff/app/(auth)/login/page.tsx`: ใช้ฟอร์มเดิมเป็นพื้นฐาน เพิ่ม submit, ป้าย label, เปิด/ซ่อนรหัสผ่าน, loading, ข้อผิดพลาด และหน้าสำเร็จตามโทนภาพที่ให้
- ไม่ฝังรหัสผ่านไว้ใน client และไม่บันทึกรหัสผ่านใน localStorage
- เพิ่ม `app/woods/login/page.tsx` เป็นทางเข้า LIFF โดยใช้หน้าเดียวกัน
- แก้ลิงก์ “มีบัญชีอยู่แล้ว” ในหน้าลงทะเบียนให้ไป `/woods/login`
- ปรับ `liff-provider.tsx` ให้กลับ `/login` เดิมหลัง LINE login เช่นเดียวกับหน้าใต้ `/woods`

## 2. API ล็อกอิน

- เพิ่ม `app/api/auth/login/route.ts` รับ email/password/idToken จาก origin เดียวกัน
- เพิ่ม `lib/line-auth.ts` ตรวจ ID token กับ LINE โดยใช้ **LINE Login Channel ID** ที่ถูกต้อง และใช้เฉพาะ `sub` ที่ตรวจแล้วเป็น userId
- จำกัดลองล็อกอิน 10 ครั้งต่อ 5 นาทีต่อ LINE user
- ตรวจบัญชีเดโม่ฝั่ง server โดย email คงที่และ password จาก `DEMO_LOGIN_PASSWORD`
- สลับเมนูด้วย `LINE_STUDENT_RICH_MENU_ID` ถ้าสลับไม่สำเร็จจะเพิกถอน session และไม่ออก cookie สำเร็จ

## 3. Session และการออกจากระบบ

- เพิ่ม `lib/auth-store.ts`: Redis REST เป็นแหล่งข้อมูลกลาง ไม่ใช้ memory/local file ซึ่งใช้ร่วมกันไม่ได้บน Vercel
- Cookie เป็นรหัสสุ่ม 256 บิตแบบ HttpOnly, SameSite=Lax, Secure ใน production และมีอายุ 8 ชั่วโมง
- Redis เก็บ hash ของ token ไม่เก็บรหัสผ่าน ผู้ใช้หนึ่งคนมี session ปัจจุบันหนึ่งชุด ล็อกอินใหม่ทำให้ cookie เก่าใช้ไม่ได้
- ใช้ lock ต่อ user ระหว่างการล็อกอิน/ออกจากระบบ ลดการเปลี่ยนเมนูแข่งกัน
- แก้ webhook logout ให้เพิกถอน session ก่อนคืน Guest
- คำสั่ง “โปรไฟล์” และ “ดูคอร์สเรียนของฉัน” ตรวจ session ก่อนตอบ หากไม่มีจะส่งลิงก์ login
- อีเมลบนการ์ดโปรไฟล์มาจากบัญชีเดโม่ที่ตรวจแล้ว ชื่อและรูปยังมาจาก LINE

## 4. ป้องกันลิงก์เก่า

- เพิ่ม `proxy.ts` ตรวจ session ของ `/course/*`, รายละเอียด `/woods/courses/*`, `/woods/score` และ `/api/omr/*`
- หน้ารายการ `/course` และ `/woods/courses` ยังเปิดดูได้โดย Guest
- เพิ่ม `/api/auth/session` และ `components/SessionMonitor.tsx`: ตรวจเมื่อกลับเข้าเว็บ/สลับหน้าและทุก 30 วินาทีในหน้าที่ต้องล็อกอิน
- cookie เก่าหลัง logout จะถูกปฏิเสธฝั่ง server; หน้าที่เคยโหลดแล้วจะพากลับ login เมื่อตรวจสถานะรอบถัดไป
- หน้าคอร์สลิงก์เก่าจะกลับหน้าเดิมหลัง login ผ่านค่า `next` ที่จำกัดเป็นเส้นทางภายใน

## 5. ค่าที่ต้องตั้งก่อนใช้งาน

ตั้งใน `line-liff/.env.local` สำหรับเครื่อง และใน environment ของ Vercel สำหรับ production แล้ว redeploy อย่า commit `.env.local`

| ตัวแปร | ค่า/ความหมาย |
| --- | --- |
| `NEXT_PUBLIC_LIFF_ID` | `2010609183-kINtWyQr` ตาม LIFF ที่ใช้อยู่; ต้องชื่อ NEXT_PUBLIC_LIFF_ID ไม่ใช่แค่ LIFF_ID |
| `LINE_LOGIN_CHANNEL_ID` | Channel ID ของ **LINE Login channel ที่มี LIFF นี้** ตรวจจาก LINE Developers; ไม่ใช่ Messaging API channel ID |
| `LINE_CHANNEL_ACCESS_TOKEN` | ของ WoodCertify เดิม |
| `LINE_CHANNEL_SECRET` | ของ Messaging API channel เดิม สำหรับตรวจ webhook |
| `LINE_STUDENT_RICH_MENU_ID` | `richmenu-bc4a96a5651d7f433285e4493e729acc` เมนู student ที่ตรวจพบก่อนหน้า |
| `DEMO_LOGIN_PASSWORD` | `0123456789` |
| `UPSTASH_REDIS_REST_URL` | REST URL จาก Redis database |
| `UPSTASH_REDIS_REST_TOKEN` | REST token แบบเขียนได้จาก Redis database |
| `AUTH_REDIS_PREFIX` | `woodcertify:demo` ใช้ prefix/database คนละชุดระหว่าง preview กับ production |

การเตรียม Redis: สร้าง Redis database ใน Upstash แล้วคัดลอก REST URL และ REST TOKEN ลง environment ข้างต้น ไม่จำเป็นต้องติดตั้ง npm package เพิ่ม ไม่ได้สร้างบริการที่อาจมีค่าใช้จ่ายให้อัตโนมัติ

LINE Developers: เปิด scope `openid` และ `profile` ของ LIFF; LINE Login channel และ Messaging API channel ต้องอยู่ใน provider เดียวกันเพื่อให้ userId ตรงกัน ผู้ทดสอบต้องเพิ่มเพื่อนกับ OA เพื่อผูกเมนูได้

OA Manager: ตั้งปุ่มเข้าสู่ระบบของ Guest เป็นลิงก์ `https://liff.line.me/2010609183-kINtWyQr/login` หาก Guest เดิมมีเพียงปุ่มลงทะเบียน สามารถไปหน้าลงทะเบียนแล้วกด “มีบัญชีอยู่แล้ว? เข้าสู่ระบบ” ได้เช่นกัน Guest ต้องอยู่ในช่วงแสดงที่เปิดใช้งาน

**อย่า deploy แล้วคาดว่า login ใช้ได้ทันทีหากยังไม่ได้ตั้ง Redis:** API จะตอบ 503 และส่วนที่ต้องล็อกอินจะไม่เปิดให้ผ่าน เพื่อไม่แสดงว่าสำเร็จทั้งที่ไม่มี session จริง

## 6. วิธีทดสอบหลังตั้งค่า

1. เปิดลิงก์ LIFF login จาก LINE
2. ใส่อีเมลถูกแต่รหัสผิด: ต้องขึ้น error และไม่เปลี่ยนเมนู
3. ใส่ `example@gmail.com` / `0123456789`: ต้องขึ้นสำเร็จ และเมนู student แสดงในแชต
4. เปิดการ์ดคอร์สและหน้าเรียน ต้องเปิดได้
5. ส่ง “โปรไฟล์”: ต้องแสดงรูป/ชื่อ LINE และ example@gmail.com
6. กดออกจากระบบบนการ์ดใหม่: ต้องคืน Guest และข้อความออกจากระบบ
7. เปิดลิงก์คอร์สเก่าหรือโหลดหน้าเรียนใหม่: ต้องกลับ login
8. ส่งคำว่า “โปรไฟล์” หรือ “ดูคอร์สเรียนของฉัน” หลัง logout: ต้องได้รับลิงก์ login
9. login ใหม่: cookie ชุดเก่าต้องไม่กลับมาใช้ได้

## 7. การตรวจโค้ด

จากโฟลเดอร์ `line-liff`:

```bash
npx tsc --noEmit
node --test tests/demo-auth.test.cjs
npm run build
```

ชุดทดสอบใช้ LINE และ Redis จำลอง ไม่เรียก OA จริง ครอบคลุม origin, รหัสผิด, token ไม่ผ่าน, การสลับเมนู, cookie, logout, การเข้า URL เก่า, เมนู/Redis ขัดข้อง, session หมดอายุ, rate limit และลายเซ็น webhook ปลอม

ผลตรวจรอบนี้: TypeScript ผ่าน, ESLint ไฟล์ที่เพิ่ม/แก้หลักผ่าน, ชุดทดสอบ 4 กลุ่มผ่านทั้งหมด ส่วน `npm run build` ไม่สำเร็จเนื่องจากเครื่องนี้ดาวน์โหลด Google Fonts (Geist, Geist Mono, Prompt) ไม่ได้ จึงยังไม่ยืนยัน production build หรือการใช้งานจริงบน LINE และยังไม่ได้ทดสอบภาพหน้าจอใน browser

## ขอบเขตเดโม่

- บัญชีนี้เป็นบัญชีร่วมสำหรับเดโม่ ผู้ใช้ LINE หลายคนใช้ได้ แต่ session แยกตาม LINE user
- ยังไม่ได้สร้างสมาชิกจริง ฟอร์มลงทะเบียนยังเป็น UI เดิม และคอร์ส/บทเรียนยังเป็นข้อมูลเดโม่
- session หมดอายุจะปฏิเสธสิทธิ์ แต่เมนู student ไม่เปลี่ยนเองตามเวลา; logout จะเป็นตัวคืน Guest ส่วนกดเมนูตอนหมด session จะได้ลิงก์ login
- Redis เก็บ userId, อีเมลเดโม่, token hash, expiry โดยหมดอายุอัตโนมัติ

อ้างอิง: [LINE ID token verification](https://developers.line.biz/en/reference/line-login/#verify-id-token), [Upstash REST API](https://upstash.com/docs/redis/features/restapi)
