"use client";

import { useState } from "react";
import BackNavExam from "@/components/BackNavExam";
import CameraStep from "@/components/exam/Camera";
import ReviewStep from "@/components/exam/Review";
import ConfirmStep from "@/components/exam/Confirm";
import SuccessStep from "@/components/exam/Success";

// หน้าคำแนะนำ (Instruction) ย้ายไปอยู่ที่ /photoexam แล้ว
// route นี้เริ่มต้นที่ขั้นตอนถ่ายภาพโดยตรง
type Step = "camera" | "review" | "confirm" | "success";

type CapturedPhoto = {
  id: string;
  dataUrl: string;
};

const MAX_PHOTOS = 1;

export default function PhotoExamPage() {
  const [step, setStep] = useState<Step>("camera");
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [score, setScore] = useState<{ got: number; total: number } | null>(null);

  function handleCapture(dataUrl: string) {
    setPhotos((prev) => [...prev, { id: crypto.randomUUID(), dataUrl }]);
    setStep("review");
  }

  function handleRetake() {
    // เอารูปล่าสุดออก แล้วกลับไปถ่ายใหม่
    setPhotos((prev) => prev.slice(0, -1));
    setStep("camera");
  }

  function handleReviewNext() {
    if (photos.length < MAX_PHOTOS) {
      setStep("camera"); // ถ่ายรูปถัดไป
    } else {
      setStep("confirm"); // ครบ 4 รูปแล้ว ไปหน้ายืนยัน
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <BackNavExam />

      <div className="flex-1 min-h-0">
        {step === "camera" && (
          <CameraStep photoIndex={photos.length + 1} onCapture={handleCapture} />
        )}
        {step === "review" && photos.length > 0 && (
          <ReviewStep
            photo={photos[photos.length - 1]}
            currentIndex={photos.length}
            maxPhotos={MAX_PHOTOS}
            onRetake={handleRetake}
            onNext={handleReviewNext}
          />
        )}
        {step === "confirm" && (
          <ConfirmStep
            photoCount={photos.length}
            onEdit={() => setStep("review")}
            onSubmit={(result) => {
              setScore(result);
              setStep("success");
            }}
          />
        )}
        {step === "success" && score && <SuccessStep score={score} />}
      </div>
    </div>
  );
}