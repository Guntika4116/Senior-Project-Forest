"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraStep({
  photoIndex,
  onCapture,
}: {
  photoIndex: number;
  onCapture: (dataUrl: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraError(null);
      } catch {
        setCameraError("ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการใช้งานกล้อง");
      }
    }

    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // ถ่ายภาพจากเฟรมปัจจุบัน
  function handleCapture() {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    onCapture(canvas.toDataURL("image/jpeg", 0.92));
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden" data-photo-index={photoIndex}>
      {!cameraError ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-10 text-center">
          <p className="text-sm text-white/70">{cameraError}</p>
        </div>
      )}

      <p className="absolute top-5 inset-x-0 text-center text-white font-semibold">
        ถ่ายกระดาษคำตอบ
      </p>

      {/* กรอบมุมสำหรับวางกระดาษ */}
      <div className="absolute inset-0 flex items-center justify-center px-10 pb-16 pointer-events-none">
        <div className="relative w-full max-w-xs aspect-[210/297]">
          <span className="absolute top-0 left-0 w-14 h-14 border-t-4 border-l-4 border-white" />
          <span className="absolute top-0 right-0 w-14 h-14 border-t-4 border-r-4 border-white" />
          <span className="absolute bottom-0 left-0 w-14 h-14 border-b-4 border-l-4 border-white" />
          <span className="absolute bottom-0 right-0 w-14 h-14 border-b-4 border-r-4 border-white" />
        </div>
      </div>

      <p className="absolute bottom-24 inset-x-0 text-center text-sm text-white/90">
        กรุณาวางกระดาษภายในกรอบ
      </p>

      <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-8">
        <button
          type="button"
          onClick={handleCapture}
          aria-label="ถ่ายภาพ"
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
        >
        </button>
      </div>
    </div>
  );
}
