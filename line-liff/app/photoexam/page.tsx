"use client";

import { useEffect, useRef, useState } from "react";
import BackNavExam from "@/components/BackNavExam";
import Instruction from "@/components/exam/Instruction";
import CameraStep from "@/components/exam/Camera";
import ReviewStep from "@/components/exam/ReviewPhoto";
import Scanning from "@/components/exam/Scanning";
import ReviewAnswers, { type OmrAnswerItem } from "@/components/exam/ReviewAnswers";
import SuccessStep from "@/components/exam/Success";
import ConfirmStep from "@/components/exam/Confirm";
import {
  isOmrExam, isOmrResult, omrErrorMessage,
  type OmrExam, type OmrResult
} from "@/lib/omr";

type Step = "instruction" | "camera" | "review" | "scanning" | "reviewAnswers" | "confirm" | "success";
type CapturedPhoto = { id: string; dataUrl: string };

function toAnswerItems(result: OmrResult): OmrAnswerItem[] {
  return result.answers.filter((answer) => answer.graded).map((answer, index) => {
    const number = Number.parseInt(answer.question.replace(/\D/g, ""), 10);
    const questionNumber = Number.isFinite(number) ? number : index + 1;

    return {
      questionNumber,
      questionText: `ข้อ ${questionNumber}`,
      extractedAnswer: answer.answer,
      points: answer.graded ? 1 : 0,
    };
  });
}

export default function PhotoExamPage() {
  const [step, setStep] = useState<Step>("instruction");
  const [photo, setPhoto] = useState<CapturedPhoto | null>(null);
  const [exam, setExam] = useState<OmrExam | null>(null);
  const [result, setResult] = useState<OmrResult | null>(null);
  const [answerItems, setAnswerItems] = useState<OmrAnswerItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [examError, setExamError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
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

  function handleRetake() {
    setPhoto(null);
    setError(null);
    setStep("camera");
  }

  async function handleSubmit() {
    if (!photo || submitting.current) return;
    submitting.current = true;
    setError(null);
    setStep("scanning");

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
      setAnswerItems(toAnswerItems(data.result));

      setStep("reviewAnswers");
    } catch (error) {
      setError(controller.signal.aborted ? "ตรวจภาพใช้เวลานานเกินไป กรุณาลองส่งอีกครั้ง" :
        error instanceof Error ? error.message : "ส่งภาพไม่สำเร็จ กรุณาลองใหม่");
      setStep("review");
    } finally {
      clearTimeout(timeout);
      requestRef.current = null;
      submitting.current = false;
    }
  }

  function handleReviewAnswersNext(edited: OmrAnswerItem[]) {
    setAnswerItems(edited);
    setStep("confirm");
  }

  function handleAnswersConfirmed() {
    setResult((previous) => previous && {
      ...previous,
      answers: previous.answers.map((answer) => {
        const questionNumber = Number.parseInt(answer.question.replace(/\D/g, ""), 10);
        const updated = answerItems.find((item) => item.questionNumber === questionNumber);
        return { ...answer, answer: updated?.extractedAnswer ?? answer.answer };
      }),
    });
    setStep("success");
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
    reviewAnswers: () => setStep("camera"),
    confirm: () => setStep("reviewAnswers"),
    success: reset,
  };

  return (
    <div className="flex flex-col h-dvh">
      <BackNavExam onBack={backHandlers[step]} />
      <div className="flex-1 min-h-0">
        {step === "instruction" && (
          <Instruction exam={exam} error={examError || error}
            onRetry={() => { setExamError(null); setError(null); setRetry((value) => value + 1); }}
            onStart={() => setStep("camera")} />
        )}
        {step === "camera" && <CameraStep photoIndex={0} onCapture={handleCapture} />}
        {step === "review" && photo && (
          <ReviewStep photo={photo} error={error} onRetake={handleRetake} onNext={() => void handleSubmit()} />
        )}
        {step === "scanning" && <Scanning />}
        {step === "reviewAnswers" && (
          <ReviewAnswers
            answers={answerItems}
            onNext={handleReviewAnswersNext}
          />
        )}
        {step === "confirm" && exam && (
          <ConfirmStep
            exam={exam}
            onEdit={() => setStep("reviewAnswers")}
            onSubmit={async () => handleAnswersConfirmed()}
            isSubmitting={false}
            error={error}
          />
        )}
        {step === "success" && exam && result && (
          <SuccessStep exam={exam} result={result} onRestart={reset} />
        )}
      </div>
    </div>
  );
}
