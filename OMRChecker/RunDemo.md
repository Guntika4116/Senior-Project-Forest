## เปิดระบบทดสอบผ่าน LINE LIFF ด้วย Cloudflare Tunnel

เปิด Terminal แยก 3 แท็บ และเปิดทุกแท็บค้างไว้ระหว่างทดสอบ

### 1. เปิด Python OMR API — Terminal แท็บที่ 1

```bash
cd /Users/kantika/Documents/GitHub/Senior-Project-Forest/OMRChecker
.venv/bin/python -m uvicorn web_app.app:app --host 127.0.0.1 --port 8000
```

รอให้ขึ้น `Application startup complete`

ตรวจสอบโดยเปิด:
http://127.0.0.1:8000/api/exam/

ควรเห็นข้อมูล JSON ของข้อสอบ

### 2. เปิดเว็บ Next.js — Terminal แท็บที่ 2

```bash
cd /Users/kantika/Documents/GitHub/Senior-Project-Forest/line-liff
npm run dev
```

รอให้ขึ้น `Ready` และตรวจสอบว่าใช้พอร์ต `3000`

เปิดหน้าทดสอบ:
http://localhost:3000/course/exam/photoexam

ถ้าเว็บใช้พอร์ตอื่น ต้องเปลี่ยนพอร์ตในคำสั่ง Tunnel ขั้นถัดไปให้ตรงกัน

### 3. เปิด Cloudflare Tunnel — Terminal แท็บที่ 3

```bash
cloudflared tunnel --url http://localhost:3000
```

หากยังไม่ได้ติดตั้ง cloudflared และมี Homebrew ให้ติดตั้งก่อน:

```bash
brew install cloudflared
```

เมื่อ Tunnel เชื่อมต่อสำเร็จ จะได้รับ URL รูปแบบ:

```text
https://ชื่อที่ระบบสร้าง.trycloudflare.com
```

คัดลอก URL จาก Terminal รอบล่าสุด เพราะ URL อาจเปลี่ยนเมื่อเปิด Tunnel ใหม่

เปิด Tunnel เฉพาะพอร์ตเว็บก็พอ Next.js จะเรียก Python OMR ภายในเครื่องผ่านพอร์ต 8000

### 4. ตั้งค่า LINE LIFF ให้เปิดเว็บทดสอบ

1. เข้า https://developers.line.biz/console/
2. เลือก Provider ของโปรเจกต์
3. เลือก LINE Login channel
4. เปิดแท็บ LIFF
5. เลือก LIFF ID `2010609183-kINtWyQr`
6. คัดลอก Endpoint URL เดิมเก็บไว้สำหรับคืนค่าหลังทดสอบ
7. แก้ Endpoint URL เป็น URL ของ Tunnel ต่อท้าย `/woods`

ตัวอย่าง:

```text
https://ชื่อที่ระบบสร้าง.trycloudflare.com/woods
```

8. บันทึกการเปลี่ยนแปลง

ไม่ต้องแก้ student.json ไม่ต้องเปลี่ยน LIFF ID และไม่ต้องอัปโหลดริชเมนูใหม่

การเปลี่ยน Endpoint URL มีผลกับทุกคนที่เปิด LIFF ID นี้ระหว่างทดสอบ ส่วน webhook ที่ตอบข้อความในแชทยังใช้เซิร์ฟเวอร์เดิม

### 5. ทดสอบผ่านริชเมนู

ปิดหน้า LIFF ที่เปิดค้างอยู่ แล้วเปิดใหม่จากริชเมนูตามลำดับ:

```text
คอร์สเรียนทั้งหมด
    ↓
เลือกคอร์ส
    ↓
ลงทะเบียนเข้าคอร์ส หากยังไม่ได้ลงทะเบียน
    ↓
ข้อสอบ
    ↓
หน้าถ่ายภาพกระดาษคำตอบ
    ↓
อนุญาตใช้กล้อง → ถ่ายภาพ → ส่งตรวจ
```

สามารถทดสอบจากมือถือหลายเครื่องได้ โดย Mac ต้องเชื่อมต่ออินเทอร์เน็ตและไม่เข้าสู่โหมดพักเครื่อง

### 6. ปิดระบบหลังทดสอบ

1. คืนค่า Endpoint URL ใน LINE Developers เป็น URL เดิมก่อน
2. กด Ctrl + C ใน Terminal ของ Cloudflare Tunnel
3. กด Ctrl + C ใน Terminal ของ Next.js
4. กด Ctrl + C ใน Terminal ของ Python OMR

### กรณีพบปัญหา

- ขึ้น “ติดต่อระบบตรวจคำตอบไม่ได้”: ตรวจว่า Python OMR ยังทำงาน และเปิด `/api/exam/` ในเครื่องได้
- ตั้ง OMR_API_URL ไว้เป็นที่อื่น: สำหรับการทดสอบนี้ให้ใช้ `http://127.0.0.1:8000` ใน `line-liff/.env.local` แล้วเริ่ม Next.js ใหม่
- เปิดลิงก์ Tunnel ไม่ได้: ตรวจว่า Next.js และ Tunnel ยังทำงาน และใช้พอร์ตตรงกัน
- เปิด Tunnel ใหม่แล้วเข้า LIFF ไม่ได้: อัปเดต Endpoint URL ให้ตรงกับ URL ของ Tunnel รอบล่าสุด
- หน้าเว็บเปิดได้แต่กล้องไม่ทำงาน: ตรวจสิทธิ์การใช้กล้องของเบราว์เซอร์ และเปิดผ่านลิงก์ HTTPS