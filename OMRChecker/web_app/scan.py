"""One isolated OMR job using the API's Python environment."""

import argparse
import json
import re
from copy import deepcopy
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageOps, UnidentifiedImageError

from src.defaults import CONFIG_DEFAULTS
from src.evaluation import EvaluationConfig, evaluate_concatenated_response
from src.template import Template
from src.utils.parsing import get_concatenated_response, open_config_with_defaults


class ScanError(Exception):
    def __init__(self, code, message):
        self.code = code
        super().__init__(message)


def load_profile(profile_dir):
    config_path = profile_dir / "config.json"
    config = (open_config_with_defaults(config_path) if config_path.exists()
              else deepcopy(CONFIG_DEFAULTS))
    # Never open GUI windows or write into shared output folders from web jobs.
    config.outputs.show_image_level = 0
    config.outputs.save_image_level = 0
    config.outputs.save_detections = False
    template = Template(profile_dir / "template.json", config)
    evaluation = EvaluationConfig(
        profile_dir, profile_dir / "evaluation.json", template, config
    )
    evaluation.should_explain_scoring = False
    evaluation.enable_evaluation_table_to_csv = False
    return template, evaluation


def exam_metadata(template, evaluation):
    questions = [q for q in template.output_columns if re.fullmatch(r"q\d+", q)]
    # Use the engine's parsed scores, including weighted/custom sections.
    maximum_score = sum(
        max(score for verdict, score in matcher.marking.items()
            if matcher.answer_type != "multiple-correct-weighted" or verdict != "correct")
        for matcher in evaluation.question_to_answer_matcher.values()
    )
    return {
        "name": "กระดาษคำตอบ OMR",
        "questionCount": len(questions),
        "gradedCount": len(evaluation.questions_in_order),
        "maxScore": maximum_score,
    }


def scan_image(image_path, template, evaluation):
    try:
        with Image.open(image_path) as original:
            if original.format not in {"JPEG", "PNG", "WEBP"}:
                raise ScanError("INVALID_IMAGE", "กรุณาใช้รูป JPEG, PNG หรือ WebP")
            if original.width * original.height > 40_000_000:
                raise ScanError("IMAGE_TOO_LARGE", "กรุณาใช้รูปไม่เกิน 40 ล้านพิกเซล")
            image = np.array(ImageOps.exif_transpose(original).convert("L"))
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError) as exc:
        raise ScanError("INVALID_IMAGE", "อ่านรูปไม่ได้ กรุณาถ่ายใหม่หรือเลือกไฟล์ภาพที่สมบูรณ์") from exc
    if min(image.shape) < 300 or float(image.std()) < 2:
        raise ScanError("UNREADABLE_SHEET", "ภาพไม่ชัดหรือไม่พบกระดาษคำตอบ กรุณาถ่ายใหม่ให้เห็นทั้งแผ่น")
    ops = template.image_instance_ops
    image = ops.apply_preprocessors(image_path, image, template)
    if image is None:
        raise ScanError("MARKERS_NOT_FOUND", "ไม่พบจุดอ้างอิงครบทั้ง 4 มุม กรุณาถ่ายกระดาษคำตอบให้เห็นทั้งแผ่นและไม่มีเงาบัง")
    response, _, multi_marked, _ = ops.read_omr_response(
        template, image=image, name=image_path.name
    )
    response = get_concatenated_response(response, template)
    score = evaluate_concatenated_response(
        response, evaluation, image_path, image_path.parent
    )
    metadata = exam_metadata(template, evaluation)
    graded_questions = set(evaluation.questions_in_order)
    questions = sorted(
        (q for q in template.output_columns if re.fullmatch(r"q\d+", q)),
        key=lambda q: int(q[1:]),
    )
    warnings = []
    if multi_marked:
        warnings.append("อ่านบางช่องได้มากกว่าหนึ่งคำตอบ อาจเกิดจากการฝนซ้ำหรือภาพเอียง กรุณาตรวจภาพและคำตอบที่อ่านได้")
    if metadata["gradedCount"] < metadata["questionCount"]:
        warnings.append(
            f'มีเฉลย {metadata["gradedCount"]} จาก {metadata["questionCount"]} ข้อ คะแนนคิดเฉพาะข้อที่มีเฉลย'
        )
    return {
        "rollNumber": response.get("Roll", ""),
        "score": {"got": score, "total": metadata["maxScore"]},
        "questionCount": metadata["questionCount"],
        "gradedCount": metadata["gradedCount"],
        "answers": [
            {"question": q, "answer": response[q], "graded": q in graded_questions}
            for q in questions
        ],
        "warnings": warnings,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--profile", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--image", type=Path)
    args = parser.parse_args()
    cv2.setNumThreads(1)
    template, evaluation = load_profile(args.profile)
    try:
        if args.image:
            payload = {"status": "success", "result": scan_image(args.image, template, evaluation)}
        else:
            payload = {"status": "success", "exam": exam_metadata(template, evaluation)}
    except ScanError as exc:
        payload = {"status": "error", "code": exc.code, "message": str(exc)}
    args.output.write_text(json.dumps(payload, ensure_ascii=False, allow_nan=False), encoding="utf-8")


if __name__ == "__main__":
    main()
