import json
import shutil
import subprocess
from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from PIL import Image

from web_app import app as api

SAMPLE = Path(__file__).resolve().parents[2] / "web_uploads/captured_sheet.jpg"
EXPECTED_FIRST_TEN = list("AAABDACCBA")


def post_image(content, content_type="image/jpeg"):
    with TestClient(api.app) as client:
        return client.post("/api/scan/", files={"file": ("phone.jpg", content, content_type)})


def test_metadata_uses_real_answer_key():
    with TestClient(api.app) as client:
        response = client.get("/api/exam/")
    assert response.status_code == 200
    assert response.json()["exam"] == {
        "name": "กระดาษคำตอบ OMR", "questionCount": 60, "gradedCount": 15, "maxScore": 15,
    }
    assert "answers_in_order" not in response.text


def test_metadata_handles_weighted_answer_key(monkeypatch, tmp_path):
    profile = tmp_path / "profile"
    shutil.copytree(api.PROFILE_DIR, profile)
    evaluation_path = profile / "evaluation.json"
    evaluation = json.loads(evaluation_path.read_text())
    evaluation["options"]["questions_in_order"] = ["q1"]
    evaluation["options"]["answers_in_order"] = [[["A", 2], ["B", 3]]]
    evaluation["marking_schemes"]["DEFAULT"]["correct"] = "99"
    evaluation_path.write_text(json.dumps(evaluation))
    monkeypatch.setattr(api, "PROFILE_DIR", profile)
    with TestClient(api.app) as client:
        response = client.get("/api/exam/")
    assert response.status_code == 200
    assert response.json()["exam"]["maxScore"] == 3
    assert response.json()["exam"]["gradedCount"] == 1


def test_real_scan_and_invalid_upload_cannot_share_results():
    original = SAMPLE.read_bytes()
    with ThreadPoolExecutor(max_workers=2) as executor:
        valid_future = executor.submit(post_image, original)
        invalid_future = executor.submit(post_image, b"not an image")
        valid, invalid = valid_future.result(), invalid_future.result()
    assert invalid.status_code == 422
    assert invalid.json()["code"] == "INVALID_IMAGE"
    assert "result" not in invalid.json()
    assert valid.status_code == 200, valid.text
    result = valid.json()["result"]
    assert result["rollNumber"] == "000006"
    assert result["score"] == {"got": 5, "total": 15}
    assert [row["answer"] for row in result["answers"][:10]] == EXPECTED_FIRST_TEN
    # This existing photo is curved: the engine reports ambiguous marks on
    # q11-q14. The API must keep those values and warn, not discard them.
    assert all(row["answer"] == "ABCD" for row in result["answers"][10:14])
    assert any("มากกว่าหนึ่งคำตอบ" in warning for warning in result["warnings"])
    assert len(result["answers"]) == 60
    assert all(not row["graded"] for row in result["answers"][15:])
    assert result["scanId"]
    assert SAMPLE.read_bytes() == original
    assert "input_path" not in valid.text


def test_blank_image_is_not_a_successful_zero_score():
    image = BytesIO()
    Image.new("RGB", (600, 800), "white").save(image, format="JPEG")
    response = post_image(image.getvalue())
    assert response.status_code == 422
    assert response.json()["code"] == "UNREADABLE_SHEET"


def test_missing_markers():
    image = BytesIO()
    Image.linear_gradient("L").resize((600, 800)).save(image, format="JPEG")
    response = post_image(image.getvalue())
    assert response.status_code == 422
    assert response.json()["code"] == "MARKERS_NOT_FOUND"


@pytest.mark.parametrize("content,mime,status", [
    (b"", "image/jpeg", 400),
    (b"not an image", "text/plain", 415),
])
def test_invalid_upload(content, mime, status):
    assert post_image(content, mime).status_code == status


def test_missing_file():
    with TestClient(api.app) as client:
        assert client.post("/api/scan/").status_code == 422


def test_large_file(monkeypatch):
    monkeypatch.setattr(api, "MAX_UPLOAD_BYTES", 16)
    assert post_image(b"x" * 17).status_code == 413


@pytest.mark.parametrize("failure,status,code", [
    ("timeout", 504, "SCAN_TIMEOUT"),
    ("crash", 500, "PROCESSING_FAILED"),
])
def test_worker_failure_and_cleanup(monkeypatch, failure, status, code):
    work_dirs = []

    def failed_run(command, **kwargs):
        work_dirs.append(Path(command[command.index("--output") + 1]).parent)
        if failure == "timeout":
            raise subprocess.TimeoutExpired(command, 60)
        return subprocess.CompletedProcess(command, 1, stdout="", stderr="test failure")

    monkeypatch.setattr(api.subprocess, "run", failed_run)
    response = post_image(b"uploaded bytes")
    assert response.status_code == status
    assert response.json()["code"] == code
    assert all(not directory.exists() for directory in work_dirs)
