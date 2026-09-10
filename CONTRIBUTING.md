# การร่วมพัฒนา

1. สร้าง branch ตามงาน เช่น `feat/wood-search`, `fix/liff-login` หรือ `docs/setup`
2. แก้เว็บแอปใน `line-liff/` และเอกสารใน `docs/`
3. รัน `npm run lint` และ `npm run build` ใน `line-liff/` เมื่อแก้โค้ด ระบุข้อจำกัดหากตรวจไม่ได้
4. ตรวจ `git diff --check` และ `git diff --cached` ก่อน commit ให้แน่ใจว่าไม่มี credentials หรือไฟล์ส่วนตัว
5. เปิด Pull Request อธิบายสิ่งที่เปลี่ยนและผลการตรวจสอบ

งาน OMRChecker ให้แก้ในโฟลเดอร์ `OMRChecker/` และตรวจสอบตามคำแนะนำใน `OMRChecker/README.md`

เก็บคอมโพเนนต์สำรองใน `components/wood/experimental/` และย้ายเข้าโฟลเดอร์หลักเมื่อเริ่มใช้งานจริง
