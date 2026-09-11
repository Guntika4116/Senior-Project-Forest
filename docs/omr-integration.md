# ใช้งานหน้า Photo Exam กับ OMRChecker

หน้าใช้งานหลักคือ `line-liff/app/photoexam/page.tsx` ที่ `/photoexam`:

```text
ถ่ายภาพ → ตรวจสอบภาพ → ยืนยันส่ง
  → Next.js /api/omr/scan → Python /api/scan/
  → OMRChecker อ่านจุดอ้างอิงและช่องคำตอบ → คะแนนและคำตอบที่อ่านได้
```

## เปิดใช้งานในเครื่อง

ใช้สอง Terminal จาก root ของ repository (Python 3.9–3.11 สำหรับ dependency ชุดนี้):

Terminal 1 — ติดตั้งครั้งแรกและเปิด backend:

```bash
cd OMRChecker
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.web.txt
.venv/bin/python -m uvicorn web_app.app:app --host 127.0.0.1 --port 8000
```

ถ้ามี `.venv` และติดตั้งแล้ว ใช้เฉพาะคำสั่ง `uvicorn` บรรทัดสุดท้ายได้ ไม่ต้อง activate

Terminal 2 — frontend:

```bash
cd line-liff
npm ci
npm run dev
```

เปิด `http://localhost:3000/photoexam` หากใช้ API คนละเครื่องหรือพอร์ต ให้ตั้ง
`OMR_API_URL=http://127.0.0.1:8000` ใน `line-liff/.env.local` แล้วเริ่ม Next.js ใหม่
ตัวแปรนี้ใช้ฝั่ง server เท่านั้น แยกจาก `NEXT_PUBLIC_API_BASE_URL` ของระบบพรรณไม้

ทดสอบกล้องในโทรศัพท์ด้วย HTTPS tunnel ไปที่ **Next.js พอร์ต 3000 เพียงพอร์ตเดียว**:

```bash
cloudflared tunnel --url http://localhost:3000
```

เปิด URL HTTPS ที่ได้ ต่อท้าย `/photoexam` และเปิดทั้ง backend, frontend และ tunnel ค้างไว้
มือถือจะส่งภาพไป origin เดียวกับหน้าเว็บ ส่วน Next.js ติดต่อ Python ภายในเครื่อง

## กระดาษและเฉลยที่ใช้

ชุดตั้งค่าเริ่มต้นอยู่ที่ `OMRChecker/web_app/profiles/default/` คัดจากชุด `inputs/my_test` เดิม:

- `template.json`: ตำแหน่งช่อง 60 ข้อและรหัสผู้สอบ 6 หลัก บนแบบกระดาษ A4 ของโครงการ
- `omr_marker.jpg`: จุดอ้างอิงที่ต้องเห็นครบ 4 มุม
- `evaluation.json`: **ปัจจุบันมีเฉลย q1–q15 เป็น A ทั้งหมด ข้อละ 1 คะแนน เต็ม 15**

การอ่านช่อง 60 ข้อไม่ได้หมายความว่ามีเฉลยครบ 60 ข้อ หน้าเว็บจะแสดงจำนวนข้อที่มีเฉลยและคะแนนเต็มจากไฟล์จริง ข้อที่ไม่มีเฉลยจะไม่คิดคะแนน แก้ `evaluation.json` ให้ตรงกับข้อสอบก่อนใช้ตรวจข้อสอบชุดอื่น

หากต้องการชุดตั้งค่าอื่น ให้ตั้ง `OMR_PROFILE_DIR` เป็น absolute path ไปยังโฟลเดอร์ที่มี template, evaluation และไฟล์ marker/config ที่อ้างถึง ก่อนเริ่ม Python API
API ไม่เปิดเผยเฉลยให้ browser หน้าเดิมที่ Python `/` ยังใช้เป็นหน้าอัปโหลดสำหรับตรวจสอบได้

## ขอบเขตการทำงาน

- รับ JPEG, PNG, WebP ไม่เกิน 20 MB / 40 ล้านพิกเซล ปรับ EXIF orientation ก่อนอ่าน
- ใช้ OMRChecker และกติกาคะแนนจริง ไม่ใช่คะแนนจำลอง
- รูปและไฟล์ผลชั่วคราวแยกต่อคำขอและล้างหลังงานเสร็จ ไม่หยิบ CSV จากงานเก่าหรือแก้ไฟล์ตัวอย่าง
- รหัสผู้สอบเก็บเป็นข้อความเพื่อรักษาเลขศูนย์นำหน้า
- เมื่อรูปเสีย ไม่พบจุดอ้างอิง หรือ backend ขัดข้อง หน้าเว็บแสดงข้อผิดพลาดและให้ส่งใหม่/ถ่ายใหม่
- ผลแสดงในหน้าปัจจุบัน ยังไม่มีฐานข้อมูลเก็บประวัติการส่งหรือผูกกับ LINE login
- ต้องมี Python API ทำงานแยกจาก Next.js เสมอ การ deploy frontend อย่างเดียวจะยังตรวจ OMR ไม่ได้

## ตรวจสอบ

```bash
cd OMRChecker
.venv/bin/python -m pip install -r requirements.web.dev.txt
OMR_HEADLESS=1 MPLBACKEND=Agg TZ=Asia/Kolkata .venv/bin/python -m pytest web_app/tests -q
# ทดสอบเดิมของ OMRChecker (snapshot ใช้ timezone นี้)
OMR_HEADLESS=1 MPLBACKEND=Agg TZ=Asia/Kolkata .venv/bin/python -m pytest -q
```

ดู metadata: `GET http://127.0.0.1:8000/api/exam/`
ส่งภาพ: `POST /api/omr/scan` ที่ Next.js เป็น multipart form field ชื่อ `file`

การรับไฟล์ใช้ [FastAPI UploadFile](https://fastapi.tiangolo.com/tutorial/request-files/)
และตัวเชื่อมใช้ Next.js Route Handlers ตามเอกสารที่ติดตั้งมากับโปรเจกต์
