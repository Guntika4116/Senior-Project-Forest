export default function ReviewStep({
  photo,
  currentIndex,
  maxPhotos,
  onRetake,
  onNext,
}: {
  photo: { id: string; dataUrl: string };
  currentIndex: number;
  maxPhotos: number;
  onRetake: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <h1 className="text-black text-2xl font-bold">ตรวจสอบภาพ</h1>

      <div className="relative w-full max-w-xs mt-4">
        <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.dataUrl}
            alt="กระดาษคำตอบที่ถ่าย"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

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
