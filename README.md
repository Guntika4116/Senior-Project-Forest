# Senior Project Forest

แอปพลิเคชันสำหรับการทดสอบและสืบค้นข้อมูลพรรณไม้ผ่าน LINE OA / LIFF

## โครงสร้าง repository

```text
.github/          แบบฟอร์ม Issue และ Pull Request
docs/            เอกสารโครงการและคู่มือการทำงาน
line-liff/       เว็บแอป Next.js สำหรับ LINE LIFF
OMRChecker/      ระบบประมวลผลและตรวจคำตอบจากกระดาษคำตอบ
```

- [ขอบเขตและเป้าหมายโครงการ](docs/project-overview.md) — ฟีเจอร์ที่วางแผนไว้ ไม่ใช่รายการที่พัฒนาเสร็จทั้งหมด
- [คู่มือพัฒนาเว็บแอป](docs/development.md)
- [แนวทางร่วมพัฒนา](CONTRIBUTING.md)

## เริ่มใช้งานเว็บแอป

รันจากโฟลเดอร์ repository:

```bash
cd line-liff
npm ci
cp .env.example .env.local
npm run dev
```

แก้ค่าตัวแปรใน `.env.local` ให้ตรงกับระบบที่ใช้ แล้วเปิด http://localhost:3000

คำสั่ง npm ต้องรันใน `line-liff/` ซึ่งมี `package.json` ส่วน `.env` ที่ root จะไม่ถูกโหลดเป็น environment ของแอปนี้โดยอัตโนมัติ

**ข้อจำกัดปัจจุบัน:** โค้ด LIFF ฝั่ง browser อ่าน `process.env.LIFF_ID` ซึ่งยังไม่ได้ตั้งให้เปิดเผยฝั่ง client การใส่ค่าใน `.env.local` เพียงอย่างเดียวจึงยังไม่ทำให้ LINE login พร้อมใช้งาน ดูรายละเอียดในคู่มือพัฒนา

## OMRChecker

ส่วนตรวจคำตอบอยู่ในโฟลเดอร์ `OMRChecker/` ของ repository นี้ ติดตั้ง dependencies โดยรันจาก root:

```bash
cd OMRChecker
pip install -r requirements.txt
```

อ่านวิธีใช้งานเพิ่มเติมจาก `OMRChecker/README.md` และ commit งานส่วนนี้ลง branch ที่กำลังพัฒนาของ repository หลัก
