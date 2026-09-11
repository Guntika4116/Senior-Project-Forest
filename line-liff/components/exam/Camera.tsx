"use client";

import { useEffect, useRef, useState } from "react";

type CameraCapabilities = MediaTrackCapabilities & {
  focusMode?: string[];
};

type CameraConstraintSet = MediaTrackConstraintSet & {
  focusMode?: string;
};

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export default function CameraStep({
  photoIndex,
  onCapture,
}: {
  photoIndex: number;
  onCapture: (dataUrl: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 3840 },
            height: { ideal: 2160 },
          },
          audio: false,
        });
        streamRef.current = stream;

        const videoTrack = stream.getVideoTracks()[0];
        try {
          const capabilities = videoTrack.getCapabilities() as CameraCapabilities;
          if (capabilities.focusMode?.includes("continuous")) {
            await videoTrack.applyConstraints({
              advanced: [
                { focusMode: "continuous" } as CameraConstraintSet,
              ],
            });
          }
        } catch {
          // Keep the camera usable when a browser cannot change focus mode.
        }

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
      streamRef.current = null;
    };
  }, []);

  async function captureFullResolutionPhoto() {
    const videoTrack = streamRef.current?.getVideoTracks()[0];
    if (!videoTrack || typeof ImageCapture === "undefined") return null;

    const imageCapture = new ImageCapture(videoTrack);
    const capabilities = await imageCapture.getPhotoCapabilities();
    const blob = await imageCapture.takePhoto({
      imageWidth: capabilities.imageWidth?.max,
      imageHeight: capabilities.imageHeight?.max,
    });

    return blobToDataUrl(blob);
  }

  function captureVideoFrame(video: HTMLVideoElement) {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 1);
  }

  async function handleCapture() {
    const video = videoRef.current;
    if (!video || video.readyState < 2 || isCapturing) return;

    setIsCapturing(true);
    let dataUrl: string | null = null;

    try {
      dataUrl = await captureFullResolutionPhoto();
      if (!dataUrl) dataUrl = captureVideoFrame(video);
    } catch {
      // Some mobile browsers expose ImageCapture but cannot take a still photo.
      dataUrl = captureVideoFrame(video);
    }

    setIsCapturing(false);
    if (dataUrl) onCapture(dataUrl);
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden" data-photo-index={photoIndex}>
      {!cameraError ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onCanPlay={() => setCameraReady(true)}
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
        {cameraReady ? "วางกระดาษในกรอบ จับโทรศัพท์ให้นิ่ง แล้วแตะถ่าย" : "กำลังเปิดกล้อง..."}
      </p>

      <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-8">
        <button
          type="button"
          onClick={handleCapture}
          disabled={!cameraReady || isCapturing}
          aria-label="ถ่ายภาพ"
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center disabled:opacity-50"
        >
          {isCapturing && <span className="sr-only">กำลังถ่ายภาพ</span>}
        </button>
      </div>
    </div>
  );
}
