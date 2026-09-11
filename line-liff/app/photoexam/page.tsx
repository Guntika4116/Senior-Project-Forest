"use client";

import { useEffect, useRef, useState } from "react";
import BackNavExam from "@/components/BackNavExam";
import Instruction from "@/components/exam/Instruction";
import CameraStep from "@/components/exam/Camera";
import ReviewStep from "@/components/exam/Review";
import ConfirmStep from "@/components/exam/Confirm";
import SuccessStep from "@/components/exam/Success";
import { isOmrExam, isOmrResult, MAX_OMR_IMAGE_BYTES, OMR_IMAGE_TYPES, omrErrorMessage,
  type OmrExam, type OmrResult } from "@/lib/omr";

type Step = "instruction" | "camera" | "review" | "confirm" | "success";
type CapturedPhoto = { id: string; dataUrl: string };

export default function PhotoExamPage() {
  const [step, setStep] = useState<Step>("instruction");
  const [photo, setPhoto] = useState<CapturedPhoto | null>(null);
  const [exam, setExam] = useState<OmrExam | null>(null);
  const [result, setResult] = useState<OmrResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [examError, setExamError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadExam() {
      try {
        const response = await fetch("/api/omr/exam", { signal: controller.signal });
        const data = await response.json();
        if (!response.ok || !isOmrExam(data.exam)) {
          throw new Error(omrErrorMessage(data, "โหลดข้อมูลข้อสอบไม่ได้"));
        }
        setExam(data.exam);
        setExamError(null);
      } catch (error) {
        if (!controller.signal.aborted) {
          setExamError(error instanceof Error ? error.message : "โหลดข้อมูลข้อสอบไม่ได้");
        }
      }
    }
    void loadExam();
    return () => controller.abort();
  }, [retry]);

  useEffect(() => () => requestRef.current?.abort(), []);

  function handleCapture(dataUrl: string) {
    setPhoto({ id: crypto.randomUUID(), dataUrl });
    setError(null);
    setStep("review");
  }

  function handleUpload(file: File) {
    if (!OMR_IMAGE_TYPES.includes(file.type) || file.size > MAX_OMR_IMAGE_BYTES) {
      setError("กรุณาใช้รูป JPEG, PNG หรือ WebP ขนาดไม่เกิน 20 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => handleCapture(String(reader.result));
    reader.onerror = () => setError("อ่านไฟล์ไม่ได้ กรุณาเลือกใหม่");
    reader.readAsDataURL(file);
  }

  function handleRetake() {
    setPhoto(null);
    setError(null);
    setStep("camera");
  }

  async function handleSubmit() {
    if (!photo || submitting.current) return;
    submitting.current = true;
    setIsSubmitting(true);
    setError(null);
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 90_000);
    try {
      const imageResponse = await fetch(photo.dataUrl);
      const body = new FormData();
      body.append("file", await imageResponse.blob(), "sheet.jpg");
      const response = await fetch("/api/omr/scan", {
        method: "POST", body, signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || data.status !== "success" || !isOmrResult(data.result)) {
        throw new Error(omrErrorMessage(data, "อ่านผลตรวจไม่ได้ กรุณาลองส่งอีกครั้ง"));
      }
      setResult(data.result);
      setStep("success");
    } catch (error) {
      setError(controller.signal.aborted ? "ตรวจภาพใช้เวลานานเกินไป กรุณาลองส่งอีกครั้ง" :
        error instanceof Error ? error.message : "ส่งภาพไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      clearTimeout(timeout);
      requestRef.current = null;
      submitting.current = false;
      setIsSubmitting(false);
    }
  }

  function reset() {
    setPhoto(null);
    setResult(null);
    setError(null);
    setStep("instruction");
  }

  const backHandlers: Partial<Record<Step, () => void>> = {
    camera: () => setStep("instruction"),
    review: handleRetake,
    confirm: () => { if (!submitting.current) setStep("review"); },
    success: reset,
  };

  return (
    <div className="flex flex-col h-dvh">
      <BackNavExam onBack={backHandlers[step]} />
      <div className="flex-1 min-h-0">
        {step === "instruction" && (
          <Instruction exam={exam} error={examError || error}
            onRetry={() => { setExamError(null); setError(null); setRetry((value) => value + 1); }}
            onStart={() => setStep("camera")} onUpload={handleUpload} />
        )}
        {step === "camera" && <CameraStep photoIndex={0} onCapture={handleCapture} />}
        {step === "review" && photo && (
          <ReviewStep photo={photo} onRetake={handleRetake} onNext={() => setStep("confirm")} />
        )}
        {step === "confirm" && photo && exam && (
          <ConfirmStep exam={exam} isSubmitting={isSubmitting} error={error}
            onEdit={() => setStep("review")} onSubmit={handleSubmit} />
        )}
        {step === "success" && result && <SuccessStep result={result} onRestart={reset} />}
      </div>
    </div>
  );
}
