# คู่มือพัฒนา

## โครงสร้างเว็บแอป

| ตำแหน่งใน `line-liff/` | หน้าที่ |
| --- | --- |
| `app/` | หน้าเว็บและ layout (App Router) |
| `app/woods/page.tsx` | รายการและการค้นหาพรรณไม้ |
| `app/woods/id/page.tsx` | หน้ารายละเอียดต้นแบบ เส้นทางคงที่ `/woods/id` |
| `app/photoexam/page.tsx` | ถ่าย/เลือกภาพ ส่งตรวจ OMR และแสดงผลจริง |
| `app/api/omr/` | ตัวเชื่อมฝั่ง server ไปยัง Python OMR API |
| `components/` | ส่วน UI ที่นำกลับมาใช้ได้ |
| `components/wood/experimental/` | คอมโพเนนต์สำรองที่ยังไม่มีไฟล์อื่น import |
| `data/woodDetail.json` | ข้อมูลพรรณไม้ตัวอย่าง |
| `data/filterWoods.json` | ตัวเลือกตัวกรอง |
| `lib/woods.ts` | ฟังก์ชันเรียก API พรรณไม้ |
| `public/` | ไฟล์ static |

## คำสั่ง

รันใน `line-liff/`:

```bash
npm ci
npm run dev
npm run lint
npm run build
# หลัง build สำเร็จ
npm start
```

ใช้ Node.js ที่ตรงกับข้อกำหนด `engines` ของ Next.js ใน `package-lock.json` และ commit lockfile เมื่อเปลี่ยน dependencies

## Environment

คัดลอก `line-liff/.env.example` เป็น `line-liff/.env.local` และกรอกค่าจริงในเครื่อง ห้าม commit ไฟล์ environment ที่มีข้อมูลจริง

- `NEXT_PUBLIC_API_BASE_URL`: URL ของ API ที่ใช้ใน `lib/woods.ts` ค่านี้จะมองเห็นได้จาก browser
- `OMR_API_URL`: URL ของ Python OMR API ใช้เฉพาะฝั่ง server ค่าเริ่มต้น `http://127.0.0.1:8000` ดู [คู่มือ OMR](omr-integration.md)
- `LIFF_ID`: ชื่อที่โค้ดปัจจุบันใช้ใน `app/liff-provider.tsx` แต่ยังไม่ถูกเปิดเผยให้ client ควรแก้โค้ดและ template พร้อมกันเมื่อเชื่อม LINE login โดยใช้ตัวแปร public สำหรับ LIFF ID เท่านั้น

## งานที่ยังต้องพัฒนา

- เชื่อม LIFF environment ฝั่ง client และจัดการข้อผิดพลาดการ login
- เปลี่ยนหน้า `/woods/id` เป็นเส้นทางที่รับ ID จริง พร้อมแก้ลิงก์ในการ์ด
- เชื่อมหน้ารายการกับ API และตรวจรูปแบบข้อมูลให้ตรงกัน
- ตรวจ mapping ตัวกรองกับข้อมูลจริง

การจัดระเบียบ repository ครั้งนี้ไม่ได้เปลี่ยนพฤติกรรมของแอปหรือรับรองว่าฟีเจอร์เหล่านี้เสร็จแล้ว
