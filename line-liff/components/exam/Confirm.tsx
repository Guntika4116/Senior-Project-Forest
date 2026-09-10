"use client";

import { useState } from "react";

export default function ConfirmStep({
  photoCount,
  onEdit,
  onSubmit,
}: {
  photoCount: number;
  onEdit: () => void;
  onSubmit: (result: { got: number; total: number }) => void;
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  async function handleConfirmSubmit() {
    // TODO: ยิง API จริงไปหา Micro Service ตรงนี้
    // const res = await fetch("/api/answer-sheet/submit", { method: "POST", body: ... });
    onSubmit({ got: 20, total: 20 }); // mock ไว้ก่อน
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-center">
        <h1 className="text-black text-2xl font-bold">ส่งกระดาษคำตอบ</h1>
        <p className="text-gray-500 mt-1">ตรวจสอบข้อมูลก่อนกดส่ง</p>
      </div>

      <div className="rounded-lg border border-gray-200 p-4 flex flex-col gap-2">
        <h2 className="font-semibold text-emerald-700">
          สอบปฏิบัติการจำแนกชนิดไม้ด้วยแว่นขยาย
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          การทดสอบความรู้ภาคปฏิบัติ ผู้เข้าสอบจะต้องส่องหน้าตัดตัวอย่างไม้ปริศนาที่กำหนดให้
          วิเคราะห์โครงสร้างเซลล์ (พอร์ เรย์ พาเรงคิมา) แล้วระบุชนิดไม้ให้ถูกต้อง
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
        <Row icon={<UserIcon />} label="ชื่อผู้สอบ" value="สมชาย ใจดี" />
        <Row icon={<ClockIcon />} label="เวลาในการทำ" value="1:00:20" />
        <Row icon={<CalendarIcon />} label="วันเวลาที่ส่ง" value="20/06 05:30 น." />
        <Row icon={<PhotoIcon />} label="จำนวนภาพ" value={`${photoCount} ภาพ`} />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg"
        >
          กลับ
        </button>
        <button
          type="button"
          onClick={() => setShowConfirmModal(true)}
          className="flex-1 bg-emerald-700 text-white py-2.5 rounded-lg"
        >
          ส่งคำตอบ
        </button>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-30">
          <div className="bg-white rounded-lg p-5 w-full max-w-sm text-center">
            <h3 className="font-semibold text-zinc-900 mb-1">ยืนยันการส่งคำตอบ</h3>
            <p className="text-sm text-gray-500 mb-4">กรุณาตรวจสอบคำตอบก่อนกดส่งคำตอบ</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-gray-300 py-2.5 rounded-lg"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="flex-1 bg-emerald-700 text-white py-2.5 rounded-lg"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-gray-500">
        {icon}
        {label}
      </span>
      <span className="text-zinc-900 font-medium">{value}</span>
    </div>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18-3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}
