import os
import shutil
import subprocess
import pandas as pd
from fastapi import FastAPI, UploadFile, File, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(CURRENT_DIR)

# ตั้งค่าโฟลเดอร์สำหรับ inputs และ outputs
INPUTS_DIR = os.path.join(BASE_DIR, "inputs", "my_test")
OUTPUTS_DIR = os.path.join(BASE_DIR, "outputs", "my_test")
UPLOADS_DIR = os.path.join(BASE_DIR, "web_uploads")
TEMPLATES_DIR = os.path.join(CURRENT_DIR, "templates")

os.makedirs(INPUTS_DIR, exist_ok=True)
os.makedirs(UPLOADS_DIR, exist_ok=True)

app = FastAPI(title="OMR Web API")
templates = Jinja2Templates(directory=TEMPLATES_DIR)

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# เปิดกล้อง
@app.post("/api/scan/")
async def scan_omr(file: UploadFile = File(...)):
    try:
        print("\n" + "="*50)
        print("📸 [1/3] ได้รับรูปภาพจากมือถือแล้ว กำลังบันทึก...")
        
        temp_file_path = os.path.join(UPLOADS_DIR, "captured_sheet.jpg")
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        final_img_path = os.path.join(INPUTS_DIR, "student_sheet.jpg")
        shutil.copy(temp_file_path, final_img_path)

        print("⚙️ [2/3] กำลังสั่งให้ OMRChecker เริ่มตรวจกระดาษคำตอบใน my_test...")
        process = subprocess.run(
            ["python3", "main.py", "-i", "inputs/my_test"],
            cwd=BASE_DIR,
            capture_output=True,
            text=True
        )

        # ⚙️ --- ค้นหาไฟล์ CSV ผลลัพธ์แบบยืดหยุ่นและอัตโนมัติ ---
        output_results_dir = os.path.join(BASE_DIR, "outputs", "Results")
        normal_output_dir = OUTPUTS_DIR
        
        found_csv = None
        
        # 1. ลองหาในโฟลเดอร์ outputs/Results (กรณีมีไฟล์ evaluation.json)
        if os.path.exists(output_results_dir):
            files = [os.path.join(output_results_dir, f) for f in os.listdir(output_results_dir) if f.endswith(".csv")]
            if files:
                found_csv = max(files, key=os.path.getctime) # ดึงเอาไฟล์ CSV ล่าสุด
        
        # 2. ถ้าไม่เจอ ให้ย้อนกลับมาหาในโฟลเดอร์ outputs/my_test แบบปกติ
        if not found_csv and os.path.exists(normal_output_dir):
            files = [os.path.join(normal_output_dir, f) for f in os.listdir(normal_output_dir) if f.endswith(".csv")]
            if files:
                found_csv = max(files, key=os.path.getctime)

        # 3. ตรวจสอบว่าพบไฟล์ผลลัพธ์หรือไม่
        if found_csv:
            print(f"✅ [3/3] ตรวจสำเร็จ! พบไฟล์ผลลัพธ์ที่: {found_csv}")
            df = pd.read_csv(found_csv)
            
            # 💡 [จุดแก้ไขสำคัญ] เปลี่ยนค่า NaN / ช่องว่างให้เป็นตัวอักษรว่าง "" เพื่อป้องกัน Error ตอนแปลงเป็น JSON
            df = df.fillna("")
            
            results = df.to_dict(orient="records")
            
            # ลบไฟล์ทิ้งหลังจากใช้งาน เพื่อล้างคิวรอตรวจใบถัดไป
            try:
                os.remove(found_csv)
            except Exception as e:
                print(f"⚠️ ไม่สามารถลบไฟล์ชั่วคราวได้: {e}")
                
            print("="*50 + "\n")
            return JSONResponse(content={
                "status": "success",
                "message": "ตรวจข้อสอบสำเร็จ",
                "results": results
            })
        else:
            print("❌ [3/3] ตรวจไม่ผ่าน! ไม่พบไฟล์ CSV ผลลัพธ์ใน outputs")
            print("--- สาเหตุจาก OMRChecker (LOG) ---")
            print(process.stderr if process.stderr else process.stdout)
            print("-----------------------------------")
            print("="*50 + "\n")
            
            return JSONResponse(status_code=500, content={
                "status": "error",
                "message": "ตรวจเสร็จสิ้น แต่ระบบหาไฟล์ผลลัพธ์ (.csv) ไม่พบ กรุณาเช็กโฟลเดอร์ outputs",
                "log": process.stderr or process.stdout
            })

    except Exception as e:
        print(f"💥 เกิดข้อผิดพลาดร้ายแรง (Exception): {str(e)}")
        return JSONResponse(status_code=500, content={
            "status": "error",
            "message": str(e)
        })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)