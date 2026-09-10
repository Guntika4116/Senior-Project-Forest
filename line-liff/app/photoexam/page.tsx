"use client";

import { useState } from "react";
import BackNavExam from "@/components/BackNavExam";
import Instruction from "@/components/exam/Instruction";
import CameraStep from "@/components/exam/Camera";
import ReviewStep from "@/components/exam/Review";
import ConfirmStep from "@/components/exam/Confirm";
import SuccessStep from "@/components/exam/Success";

type Step = "instruction" | "camera" | "review" | "confirm" | "success";

type CapturedPhoto = {
  id: string;
  dataUrl: string;
};

const MAX_PHOTOS = 1;

export default function PhotoExamPage() {
  const [step, setStep] = useState<Step>("instruction");
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
    setStep("confirm");
  }

  // ปุ่ม "กลับ"
  const backHandlers: Partial<Record<Step, () => void>> = {
    camera: () => setStep("instruction"),
    review: () => setStep("camera"),
    confirm: () => setStep("review"),
  };

  return (
    <div className="flex flex-col h-screen">
      <BackNavExam onBack={backHandlers[step]} />

      <div className="flex-1 min-h-0">
        {step === "instruction" && (
          <Instruction onStart={() => setStep("camera")} />
        )}
        {step === "camera" && (
          <CameraStep photoIndex={photos.length} onCapture={handleCapture} />
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
