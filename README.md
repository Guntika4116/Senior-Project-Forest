# Finally :rainbow: :sunny: :sunflower:

ขั้นตอนติดตั้ง:

```bash
# ติดตั้ง
npm install

# รันเซิร์ฟเวอร์
npm run dev
```

เปิด `http://localhost:3000`

---

## โครงสร้างที่มี "ข้อมูล"

```
src/
├─ app/
│  ├─ woods/page.tsx                # หน้ารายการไม้ทั้งหมด
│  └─ woods/[id]/page.tsx     # หน้ารายละเอียดไม้ 1 ชนิด
├─ components/
│  ├─ BackNav.tsx
│  ├─ ImageDetail.tsx         # แสดงรูปแบบเลื่อน (carousel)
│  ├─ Filter.tsx              # ฟอร์มตัวกรอง
│  ├─ Search.tsx              # ค้นหาพันธุ์ไม้
│  └─ wood/
│     ├─ WoodCard.tsx         # การ์ดแสดงไม้แต่ละชนิดในหน้ารวม
│     └─ DetailAccordion.tsx  # กล่องพับ/กางแสดงรายละเอียดแต่ละหมวด 
├─ data/
│  ├─ woodDetail.json         # :star: ข้อมูลหลักของไม้แต่ละชนิด (ไฟล์ที่ต้องเพิ่ม/แก้บ่อยที่สุด)
│  └─ filterWoods.json        # :star: ตัวเลือกของฟิลเตอร์ ใช้กับ filter
└─ lib/
   └─ woods.ts                # ฟังก์ชันเรียก API ภายนอก (getWoods, getWoodById)
```

**ส่วนใหญ่จะแก้ที่ `src/data/woodDetail.json` และ `src/data/filterWoods.json` เป็นหลัก**

---

## โครงสร้างข้อมูล `woodDetail.json`

```ts
{
  id: string;                 // ใช้เป็น key และอ้างอิงหน้า detail — ควรไม่ซ้ำกัน (ปัจจุบันใช้ชื่อไม้เป็น id)
  name: string;                // ชื่อสามัญ
  scientificName: string;      // ชื่อวิทยาศาสตร์
  distribution: string;        // ถิ่นกำเนิด
  woodtype: string;            // ประเภทเนื้อไม้ เช่น "เนื้อแข็ง"
  imageUrl: string[];          // array ของ URL รูปภาพ (แสดงเป็น carousel)

  general: {
    items: { label: string; value: string }[];        // ข้อมูลพื้นฐาน (ชื่อ/วิทยาศาสตร์/ถิ่นกำเนิด/วงเจริญเติบโต)
    description: { label: string; value: string }[];  // คำอธิบายทั่วไป (หน้า detail ใช้ index [1] — ดูหมายเหตุด้านล่าง)
  };

  physical: { label: string; value: string }[];   // สี/เนื้อไม้/เสี้ยน/ความมันวาว/น้ำหนัก/รส/กลิ่น
  pore: { label: string; value: string }[];        // โครงสร้างพอร์/vessel
  rp: {
    ray: { label: string; value: string }[];
    parenchyma: { label: string; value: string }[];
  };
  other: { label: string; value: string }[];       // องค์ประกอบอื่นๆ
}
```

### ⚠️ จุดที่ต้องระวังเวลาเพิ่มข้อมูล

1. **`imageUrl`** — URL ตัวอย่างที่มีอยู่ตอนนี้เป็นลิงก์ thumbnail ชั่วคราวจาก Google (`encrypted-tbn0.gstatic.com`)
2. **`general.description`** — โค้ดหน้า detail อ่านค่าแบบ `wood.general.description[1]?.value` ยังเป็น hardcode ฝากเปลี่ยนด้วยฮะ
3. **หน้า detail (`app/woods/[id]/page.tsx`) ตอนนี้ hardcode `const wood = woods[1]`** คือดึงข้อมูลไม้ตัวที่สอง (ยางพารา) ตายตัว ไม่ได้ดึงตาม `id`
4. **`WoodCard.tsx` ลิงก์ไปที่ `/woods/id`** ยังไม่ได้ใส่ `id` ของไม้แต่ละตัวจริงๆ ต้องแก้เป็น `` `/woods/${id}` `` เพื่อให้กดเข้าไปหน้ารายละเอียดของไม้แต่ละชนิดได้ถูก

---

## โครงสร้างข้อมูล `filterWoods.json`

```ts
{
  key: string;      // ใช้เป็น key อ้างอิง
  label: string;    // ข้อความหัวข้อที่แสดงบนหน้าจอ
  options: {
    label: string;  // ข้อความที่แสดงให้ผู้ใช้เห็น
    value: string;  // ค่าที่จะถูกส่งไปเป็น query param
  }[];
}[]
```

**ข้อควรระวัง:** `key` และ `value` ในไฟล์นี้ (เช่น `distribution: "north" `) เป็นคนละชุดกับค่าที่อยู่จริงใน `woodDetail.json` (เช่น `distribution: "Neotropics and temperate Brazil"`) ตอนนี้ยังไม่มีการ mapping ที่ตรงกัน

---

## ประเภทข้อมูล

```ts
type Wood = {
  id: string;
  commonname: string;
  scientificname: string;
  distribution: string;
  imageUrl: { url: string }[];
  wood_taste: string | null;
  wood_odor: string | null;
  wood_texture: string | null;
  wood_weight: string | null;
  growth_rings: string | null;
};
```

**field ยังใส่ไม่ครบ `woodDetail.json`**

---

## สรุป

- เพิ่ม object ไม้ชนิดใหม่ใน `src/data/woodDetail.json` ตาม schema ในหัวข้อ 4
- เพิ่ม/แก้ตัวเลือกตัวกรองใน `src/data/filterWoods.json`
- เปลี่ยน/เพิ่มรูปภาพผ่าน `imageUrl` (แนะนำให้ใช้ URL ที่โฮสต์ถาวร)

## สิ่งที่ต้องแก้

- ทำให้หน้า detail ดึงข้อมูลตาม `id` จริงจาก URL แทนการ hardcode `woods[1]`
- แก้ลิงก์ใน `WoodCard.tsx` ให้ไปยัง `id` ของไม้แต่ละชนิดจริง
- เชื่อมให้หน้าค้นหาพันธุ์ไม้ ใช้ผลลัพธ์จาก `getWoods()` แทนการใช้ `woodDetail.json` ตรงๆ

---

> หมายเหตุ: ตอนนี้หน้า Home (`page.tsx`) แสดงรายการไม้จาก `woodDetail.json` โดยตรง (`woodDetail.map(...)`)
> ปล.ลี่ยังไม่ได้เข้าไปดูตารางข้อมูลของพี่อาย เลยทำแบบนี้ไว้ แต่ถ้าข้อมูลไม่เหมือนกันก็มีอีกโฟลเดอร์ที่ลี่ทำไว้ นข. อาจจะแก้จากโฟลเดอร์นั้นเลยก็ ละเดี๋ยวลี่เอามาแก้ต่อ หรือบอกลี่ก็ได้เดะมาแก้ให้ :sob::sob:
