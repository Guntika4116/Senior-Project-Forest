import json
import logging
import os
import subprocess
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
from uuid import uuid4

from fastapi import FastAPI, File, Request, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates

BASE_DIR = Path(__file__).resolve().parents[1]
PROFILE_DIR = Path(os.environ.get("OMR_PROFILE_DIR", str(BASE_DIR / "web_app/profiles/default"))).resolve()
MAX_UPLOAD_BYTES = 20 * 1024 * 1024
SCAN_TIMEOUT_SECONDS = 60
IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
logger = logging.getLogger(__name__)
app = FastAPI(title="OMR Web API")
templates = Jinja2Templates(directory=str(BASE_DIR / "web_app/templates"))


def error_response(status_code, code, message):
    return JSONResponse(status_code=status_code, content={
        "status": "error", "code": code, "message": message,
    })


def run_job(work_dir, image_path=None):
    result_path = work_dir / "result.json"
    command = [sys.executable, "-m", "web_app.scan", "--profile", str(PROFILE_DIR),
               "--output", str(result_path)]
    if image_path:
        command.extend(["--image", str(image_path)])
    cache_dir = BASE_DIR / ".cache"
    env = {**os.environ, "OMR_HEADLESS": "1", "MPLBACKEND": "Agg",
           "MPLCONFIGDIR": str(cache_dir / "matplotlib"), "XDG_CACHE_HOME": str(cache_dir)}
    try:
        process = subprocess.run(command, cwd=BASE_DIR, env=env, capture_output=True,
                                 text=True, timeout=SCAN_TIMEOUT_SECONDS)
    except subprocess.TimeoutExpired:
        return error_response(504, "SCAN_TIMEOUT", "ตรวจภาพใช้เวลานานเกินไป กรุณาลองส่งอีกครั้ง")
    if process.returncode != 0 or not result_path.exists():
        logger.error("OMR worker failed (%s): %s", process.returncode, process.stderr[-4000:])
        return error_response(500, "PROCESSING_FAILED", "ระบบตรวจคำตอบขัดข้อง กรุณาลองใหม่หรือติดต่อผู้ดูแล")
    try:
        payload = json.loads(result_path.read_text(encoding="utf-8"))
    except (ValueError, OSError):
        logger.exception("Cannot read OMR worker result")
        return error_response(500, "INVALID_RESULT", "อ่านผลการตรวจไม่ได้ กรุณาลองใหม่")
    if payload.get("status") != "success":
        return JSONResponse(status_code=422, content=payload)
    return payload


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    # Retain the old upload page for diagnostics; /photoexam is the main UI.
    return templates.TemplateResponse(request=request, name="index.html")


@app.get("/api/health/")
def health():
    return {"status": "ok"}


@app.get("/api/exam/")
def exam():
    with TemporaryDirectory(prefix="omr-exam-") as directory:
        return run_job(Path(directory))


@app.post("/api/scan/")
def scan_omr(file: UploadFile = File(...)):
    # Sync endpoints use FastAPI's thread pool. Each job owns its subprocess
    # and temporary files, including failures and simultaneous submissions.
    try:
        if file.content_type not in IMAGE_TYPES:
            return error_response(415, "UNSUPPORTED_IMAGE", "กรุณาใช้รูป JPEG, PNG หรือ WebP")
        with TemporaryDirectory(prefix="omr-scan-") as directory:
            work_dir = Path(directory)
            image_path = work_dir / "sheet.jpg"
            size = 0
            with image_path.open("wb") as target:
                while chunk := file.file.read(1024 * 1024):
                    size += len(chunk)
                    if size > MAX_UPLOAD_BYTES:
                        return error_response(413, "IMAGE_TOO_LARGE", "ไฟล์ภาพต้องมีขนาดไม่เกิน 20 MB")
                    target.write(chunk)
            if size == 0:
                return error_response(400, "EMPTY_IMAGE", "ไม่พบข้อมูลภาพ กรุณาถ่ายใหม่")
            payload = run_job(work_dir, image_path)
            if isinstance(payload, JSONResponse):
                return payload
            result = payload["result"]
            result["scanId"] = str(uuid4())
            # Compatibility with the old upload page, without server paths.
            payload["results"] = [{"Roll": result["rollNumber"], "score": result["score"]["got"],
                                   **{row["question"]: row["answer"] for row in result["answers"]}}]
            return payload
    finally:
        file.file.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
