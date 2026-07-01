import json
from PIL import Image, ImageDraw, ImageFont

# ---------------------------------------------------------------------------
# 1) ค่าคงที่ของหน้ากระดาษ (ทุกอย่างเป็น "px" หน่วยเดียวกันหมด)
# ---------------------------------------------------------------------------
DPI = 150
PAGE_W, PAGE_H = 1240, 1754          # ขนาด A4 ที่ 150 DPI โดยประมาณ
MARGIN = 60                          # ระยะขอบกระดาษ

# --- Marker (จุดอ้างอิงมุมกระดาษ สำหรับ CropOnMarkers) ---
MARKER_SIZE = 50                     # ต้องตรงกับขนาดไฟล์ omr_marker.jpg ที่ generate ด้านล่าง
MARKER_MARGIN = 25                   # ระยะจาก marker ถึงขอบกระดาษ

MARKER_POSITIONS = {
    "top_left":     (MARKER_MARGIN, MARKER_MARGIN),
    "top_right":    (PAGE_W - MARKER_MARGIN - MARKER_SIZE, MARKER_MARGIN),
    "bottom_left":  (MARKER_MARGIN, PAGE_H - MARKER_MARGIN - MARKER_SIZE),
    "bottom_right": (PAGE_W - MARKER_MARGIN - MARKER_SIZE, PAGE_H - MARKER_MARGIN - MARKER_SIZE),
}

# --- ช่องกรอกรหัสผู้เข้าสอบ (Roll Number) : 6 หลัก, แต่ละหลักมีค่า 0-9 เรียงแนวตั้ง ---
ROLL_DIGITS = 6
ROLL_ORIGIN = (170, 350)             # จุดเริ่มต้น (บนซ้าย) ของ bubble แรก
ROLL_DIGIT_GAP = 40                  # ระยะห่างระหว่างหลัก (แนวนอน)
ROLL_VALUE_GAP = 40                  # ระยะห่างระหว่างค่า 0-9 ในแต่ละหลัก (แนวตั้ง)
BUBBLE_D = 25                        # เส้นผ่านศูนย์กลางวงกลมคำตอบ (ใช้ร่วมกันทั้งชีต)

# --- ข้อสอบปรนัย (MCQ) : 60 ข้อ, 4 ตัวเลือก (A-D), แบ่งเป็น 3 คอลัมน์ x 10 ข้อ ---
NUM_QUESTIONS = 60
CHOICES = ["ก", "ข", "ค", "ง"]
QUESTIONS_PER_COL = 15
COL_ORIGINS = [(180, 850), (430, 850), (680, 850), (930, 850)]   # จุดเริ่มต้นแต่ละคอลัมน์
Q_ROW_GAP = 50                        # ระยะห่างระหว่างข้อ (แนวตั้ง)
Q_CHOICE_GAP = 40                     # ระยะห่างระหว่างตัวเลือกในข้อเดียวกัน (แนวนอน)

# ---------------------------------------------------------------------------
# 2) วาด marker เดี่ยว (omr_marker.jpg) — ใช้ pattern สี่เหลี่ยมทึบขอบดำ ให้ตรวจจับง่าย
# ---------------------------------------------------------------------------
def make_marker_file(path="omr_marker.jpg"):
    m = Image.new("L", (MARKER_SIZE, MARKER_SIZE), 255)
    d = ImageDraw.Draw(m)
    d.rectangle([4, 4, MARKER_SIZE - 4, MARKER_SIZE - 4], fill=0)
    m.convert("RGB").save(path, quality=95)


# ---------------------------------------------------------------------------
# 3) วาดกระดาษคำตอบเต็มแผ่น พร้อมเก็บพิกัด bubble ทุกจุดไว้ใน field_blocks
#    (dict เดียวกันนี้จะถูกใช้ export เป็น template.json ด้านล่าง)
# ---------------------------------------------------------------------------
def build_sheet():
    img = Image.new("RGB", (PAGE_W, PAGE_H), "white")
    draw = ImageDraw.Draw(img)
    try:
        font_title = ImageFont.truetype("font/THSarabunNew Bold.ttf", 36)
        font = ImageFont.truetype("font/THSarabunNew.ttf", 28)
        font_label = ImageFont.truetype("font/THSarabunNew.ttf", 20)
    except OSError:
        font_title = ImageFont.load_default()
        font = ImageFont.load_default()
        font_label = ImageFont.load_default()

    # --- marker 4 มุม ---
    for x, y in MARKER_POSITIONS.values():
        draw.rectangle([x, y, x + MARKER_SIZE, y + MARKER_SIZE], fill="black")

    # --- หัวกระดาษ ---
    draw.text((PAGE_W//2-MARGIN,80), "WoodCertify", fill="black", font=font_title)
    draw.text((PAGE_W//2-95,130), "กระดาษคำตอบการทดสอบ", fill="black", font=font)
    
    #ชื่อ-นามสกุล
    draw.text((150,180),"ชื่อ",font=font,fill="black")
    draw.line((200,200,550,200),fill="black",width=1)

    draw.text((580,180),"นามสกุล",font=font,fill="black")
    draw.line((660,200,1010,200),fill="black",width=1)

    #--- รหัสผู้เข้าสอบ ---
    draw.rounded_rectangle([140 , 240, 425, 755], radius=20, outline="black", width=1)

    draw.text((160, 250), "รหัสผู้เข้าสอบ", fill="black", font=font)

    for rect_i in range(ROLL_DIGITS):
        draw.rectangle([160 + rect_i * ROLL_DIGIT_GAP, 290, 160 + (rect_i + 1) * ROLL_DIGIT_GAP, 335], outline="black", width=1)
    
    field_blocks = {}

    # --- วาด + บันทึกพิกัด: ช่องรหัสผู้เข้าสอบ ---
    for digit_i in range(ROLL_DIGITS):
        ox = ROLL_ORIGIN[0] + digit_i * ROLL_DIGIT_GAP
        oy = ROLL_ORIGIN[1]
        for val in range(10):
            cy = oy + val * ROLL_VALUE_GAP
            draw.ellipse([ox, cy, ox + BUBBLE_D, cy + BUBBLE_D], outline="black", width=2)
            draw.text((ox + 8, cy - 4), str(val), fill="black", font=font)
        field_blocks[f"Roll{digit_i + 1}"] = {
            "fieldType": "QTYPE_INT",
            "origin": [ox, oy],
            "fieldLabels": [f"roll{digit_i + 1}"],
            "bubblesGap": ROLL_VALUE_GAP,
            "labelsGap": 0,
            "direction": "vertical",
        }

    # คำแนะนำ
    draw.rounded_rectangle([450, 240, 1100, 755], radius=20, outline="black", width=1)

    draw.text((730, 250), "คำแนะนำ", fill="black", font=font)
    # draw.line((230, 205, 650, 205), fill="black", width=2)

    draw.line((120,780,1120,780), fill="black", width=1)

    # --- วาด + บันทึกพิกัด: ข้อสอบ ---
    q_num = 1
    for col_origin in COL_ORIGINS:
        col_field_labels = []
        for c_i, choice in enumerate(CHOICES):
            cx = col_origin[0] + c_i * Q_CHOICE_GAP
            draw.text((cx + 5, col_origin[1] - 55), choice, fill="black", font=font_title)
        for row in range(QUESTIONS_PER_COL):
            if q_num > NUM_QUESTIONS:
                break
            qx, qy = col_origin[0], col_origin[1] + row * Q_ROW_GAP
            draw.text((qx - 35, qy - 4), f"{q_num}", fill="black", font=font)
            for c_i, choice in enumerate(CHOICES):
                cx = qx + c_i * Q_CHOICE_GAP
                draw.ellipse([cx, qy, cx + BUBBLE_D, qy + BUBBLE_D], outline="black", width=2)
                draw.text((cx + 8, qy - 6), choice, fill="black", font=font)
            col_field_labels.append(f"q{q_num}")
            q_num += 1

        if col_field_labels:
            field_blocks[f"MCQBlock_{col_origin[0]}"] = {
                "fieldType": "QTYPE_MCQ4",
                "origin": [col_origin[0], col_origin[1]],
                "fieldLabels": col_field_labels,
                "bubblesGap": Q_CHOICE_GAP,
                "labelsGap": Q_ROW_GAP,
                "direction": "horizontal",
            }

    draw.line((120,1600,1120,1600), fill="black", width=1)

    return img, field_blocks


# ---------------------------------------------------------------------------
# 4) สร้าง template.json จาก field_blocks ชุดเดียวกับที่ใช้วาดภาพ
# ---------------------------------------------------------------------------
def build_template(field_blocks):
    output_columns = ["Roll"] + [f"q{i}" for i in range(1, NUM_QUESTIONS + 1)]
    template = {
        "pageDimensions": [PAGE_W, PAGE_H],
        "bubbleDimensions": [BUBBLE_D, BUBBLE_D],
        "customLabels": {
            "Roll": [f"Roll{i + 1}" for i in range(ROLL_DIGITS)]
        },
        "fieldBlocks": field_blocks,
        "preProcessors": [
            {
                "name": "CropOnMarkers",
                "options": {
                    "relativePath": "omr_marker.jpg",
                    "sheetToMarkerWidthRatio": round(PAGE_W / MARKER_SIZE, 1),
                },
            }
        ],
        "outputColumns": output_columns,
    }
    return template


if __name__ == "__main__":
    make_marker_file("omr_marker.jpg")
    sheet_img, blocks = build_sheet()
    sheet_img.save("answer_sheet.png")
    template = build_template(blocks)
    with open("template.json", "w", encoding="utf-8") as f:
        json.dump(template, f, ensure_ascii=False, indent=2)
    print("สร้างไฟล์เสร็จแล้ว: answer_sheet.png, omr_marker.jpg, template.json")