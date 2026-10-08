export default function Scanning() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4 h-full">
      <div className="w-16 h-16 rounded-full border-4 border-emerald-700 border-t-transparent animate-spin" />
      <h1 className="text-black text-xl font-bold mt-2">กำลังสแกนภาพถ่าย</h1>
      <p className="text-gray-500 text-center">
        ระบบกำลังตรวจจากภาพกระดาษคำตอบ
        <br />
        กรุณารอสักครู่
      </p>
    </div>
  );
}