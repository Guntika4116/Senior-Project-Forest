# การพัฒนาแอปพลิเคชันสำหรับการทดสอบและสืบค้นความรู้บนแพลตฟอร์มไลน์
## (ระบบสอบวัดความรู้พรรณไม้ผ่าน Line OA)

โครงการพัฒนาส่วนต่อขยาย (Extension) จากระบบเดิมเพื่อเพิ่มประสิทธิภาพการใช้งานบนอุปกรณ์พกพา (Mobile-first) สำหรับเจ้าหน้าที่กรมป่าไม้และผู้เข้าอบรม เพื่อใช้ในการทดสอบความรู้และสืบค้นข้อมูลพรรณไม้ได้อย่างสะดวกและรวดเร็ว


### 1. วัตถุประสงค์และเป้าหมายหลัก
* **ต่อยอดระบบเดิม:** นำโครงสร้างการทำงานของระบบเดิมมาพัฒนาต่อยอดบนแพลตฟอร์ม Line เพื่อความสะดวกในการใช้งาน
* **ระบบทดสอบที่มีประสิทธิภาพ:** พัฒนาบน Line Application สำหรับการสอบพิสูจน์ไม้ รองรับทั้งการทำข้อสอบบนหน้าจอ (UI) และการส่งภาพถ่ายกระดาษคำตอบ
* **ระบบสืบค้นข้อมูลพรรณไม้:** เพิ่มช่องทางการค้นหาข้อมูลพรรณไม้ที่ออกแบบมาสำหรับการใช้งานบนมือถือโดยเฉพาะ

### 2. ฟังก์ชันการทำงานที่สำคัญ (Features)
* **การเข้าใช้งานและลงทะเบียน:** ผู้ใช้เพิ่มเพื่อนกับ Line Official Account (Line OA) และลงทะเบียนด้วยข้อมูลที่จำเป็นเท่านั้น คือ **ชื่อ และ อีเมล**
* **การเข้าสู่บทเรียน/คอร์สเรียน:** เข้าถึงเนื้อหาและข้อสอบได้โดยใช้รหัส (เช่น `NOW` หรือรหัสวิชา) ที่ได้รับจากทางกรมป่าไม้
* **ระบบการทดสอบ (Gimmick หลัก):**
  * รองรับการทำข้อสอบแบบดิจิทัลผ่านแอปพลิเคชัน หรือ **ถ่ายรูปกระดาษคำตอบ (Bubble Sheet)** ส่งเข้ามาในระบบ
  * รองรับข้อสอบแบบ **ปรนัย (Multiple Choice)** และอยู่ในช่วงศึกษาความเป็นไปได้สำหรับข้อสอบแบบ **อัตนัย (เขียนตอบ)**
  * มีการแสดงเวลาถอยหลัง (Countdown Timer) ขณะทำข้อสอบ
  * แจ้งผลคะแนนทันทีหลังส่งข้อสอบ โดย **ไม่แสดงเฉลย** เพื่อป้องกันการทุจริตและการส่งต่อคำตอบ
* **ระบบสืบค้นข้อมูลพรรณไม้:** ระบบตัวกรอง (Filter) ข้อมูลที่สามารถยืด-หดได้ (Collapsible UI) เพื่อประหยัดพื้นที่หน้าจอมือถือ และดึงข้อมูลพรรณไม้เชื่อมโยงจากระบบหลัก

### 3. การออกแบบและประสบการณ์ผู้ใช้ (UI/UX)
* **Accessibility:** ปรับขนาดตัวอักษร ไอคอน และองค์ประกอบต่าง ๆ ให้มีขนาดใหญ่ ชัดเจน เหมาะสำหรับกลุ่มผู้ใช้งานหลักที่มีอายุตั้งแต่ 40-50 ปีขึ้นไป
* **Navigation:** มีปุ่มย้อนกลับ (Back Button) ในทุกหน้าจอ เพื่อลดความสับสนในการใช้งาน
* **Dynamic Rich Menu:** เมนูหลักด้านล่างของ Line จะเปลี่ยนไปตามสถานะหรือบริบทของผู้ใช้ (เช่น เมื่อเข้าสู่คอร์สเรียน เมนูจะเปลี่ยนเป็นปุ่มที่เกี่ยวข้องกับบทเรียนนั้น ๆ)
* **Official Tone:** ใช้โทนสีและตราสัญลักษณ์ (Logo) ที่มีความเป็นทางการ น่าเชื่อถือ เหมาะกับหน่วยงานราชการ

### 4. รายละเอียดทางเทคนิคและระบบหลังบ้าน (Technical Architecture)
* **Data Integration:** ดึงข้อมูลจากฐานข้อมูลเดิม (Database) ผ่านการเรียกใช้งาน **API / Web Service** โดยไม่มีการลิงก์ไปหน้าเว็บภายนอก เพื่อให้การทำงานไหลลื่น
* **Image Processing (ตรวจข้อสอบ):** ใช้เทคโนโลยี **OMR Checker ร่วมกับ Python** ในการประมวลผลและตรวจจุดดำบนกระดาษคำตอบจากรูปภาพที่ผู้ใช้ส่งมา
* **Performance:** ระบบออกแบบมาให้รองรับการใช้งานพร้อมกัน (**Concurrency**) ได้อย่างน้อย **60 คน** ในช่วงเวลาที่มีการจัดสอบ
* **Authentication:** ระบบ Login และการเชื่อมโยงบัญชีผู้ใช้ระหว่าง Line และระบบเดิม พัฒนาโดยใช้ **Line LIFF (Line Front-end Framework)**

---



### 1. Objectives & Goals
* **System Extension:** Study the existing core system and extend its functionalities onto the Line Platform for enhanced mobile accessibility.
* **Examination System:** Develop a Line Application for wood plant identification testing that supports both an in-app User Interface (UI) and image submissions of physical answer sheets.
* **Mobile Knowledge Base:** Implement a user-friendly, mobile-optimized plant database search system.

### 2. Key Features
* **User Onboarding:** Users add the Line Official Account (Line OA) and register using minimum required information: **Name and Email**.
* **Course Enrollment:** Access to specific lessons and examinations requires an authorization code (e.g., `NOW` or a specific course code) provided by the Royal Forest Department.
* **Examination System (Core Gimmick):**
  * Supports taking exams directly in the app or **submitting a photo of the physical answer sheet (Bubble Sheet)**.
  * Supports **Multiple Choice** questions, with ongoing feasibility studies for **Subjective/Written** questions.
  * Displays a real-time countdown timer during the exam.
  * Provides instant score feedback upon submission **without displaying the answer key** to prevent answer sharing.
* **Plant Database Search:** Features a collapsible filter system designed to save mobile screen real estate, directly linked to the main system's database.

### 3. UI/UX Design
* **Accessibility:** Larger font sizes, buttons, and visual elements tailored specifically for users aged 40-50+ years.
* **Navigation:** A dedicated 'Back Button' included across all screens to ensure intuitive and confusion-free navigation.
* **Dynamic Rich Menu:** The bottom persistent menu changes dynamically based on the user's current status (e.g., switching to lesson-specific shortcuts when inside a course).
* **Official Branding:** Uses an official and professional color palette and logo appropriate for a government agency.

### 4. Technical Details & Backend Architecture
* **Data Connection:** Seamless data retrieval from the legacy system via **APIs / Web Services** instead of redirecting users to external web pages.
* **Grading Technology:** Integrates an **OMR Checker using Python** to process and score black bubbles on physical answer sheet photos submitted by users.
* **Performance:** Optimized to support a minimum **concurrency of 60 users** simultaneously during examination peak periods.
* **Authentication:** Utilizes **LINE LIFF (LINE Front-end Framework)** to implement the login system and securely synchronize user profiles between LINE and the legacy database.

---
*Developed for the Royal Forest Department Project.*