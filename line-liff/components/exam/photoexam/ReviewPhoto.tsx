import Image from "next/image";

export default function ReviewStep({
  photo,
  onRetake,
  onNext,
  error,
}: {
  photo: { id: string; dataUrl: string };
  onRetake: () => void;
  onNext: () => void;
  error?: string | null;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <h1 className="text-emerald-700 text-2xl font-bold">ตรวจสอบภาพ</h1>
      <p className="text-gray-500 text-center text-sm">
        กรุณาตรวจสอบภาพถ่ายกระดาษคำตอบ
        <br />
        หากไม่ชัดสามารถถ่ายใหม่ได้
      </p>

      <div className="relative w-full max-w-xs mt-4">
        <div className="relative w-full aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={photo.dataUrl}
            alt="กระดาษคำตอบที่ถ่าย"
            fill
            unoptimized
            sizes="320px"
            className="object-contain"
          />
        </div>
      </div>

      {error && <p role="alert" className="w-full max-w-xs rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <div className="flex gap-3 w-full max-w-xs mt-6">
        <button
          type="button"
          onClick={onRetake}
          className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg"
        >
          ถ่ายใหม่
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 bg-emerald-700 text-white py-2.5 rounded-lg"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
