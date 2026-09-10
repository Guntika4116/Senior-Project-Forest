import Link from "next/link";

export default function SuccessStep({ score }: { score: { got: number; total: number } }) {
  return (
    <div className="p-6 flex flex-col items-center gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-3xl">
        ✓
      </div>
      <h1 className="text-emerald-700 text-xl font-bold">ส่งสำเร็จ</h1>
      <p className="text-gray-500">ระบบได้รับกระดาษคำตอบแล้ว</p>

      <div className="bg-emerald-50 rounded-lg px-6 py-4 w-full max-w-sm">
        <p className="text-emerald-700 font-semibold">
          คะแนนที่ได้: {score.got}/{score.total}
        </p>
      </div>

      <Link href="/photoexam" className="bg-emerald-700 text-white px-6 py-2 rounded w-full max-w-sm">
        กลับหน้าหลัก
      </Link>
    </div>
  );
}