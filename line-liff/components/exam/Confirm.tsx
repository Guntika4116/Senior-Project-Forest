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
      <h1 className="text-emerald-700 text-xl font-bold text-center">ส่งกระดาษคำตอบ</h1>
      <p className="text-gray-500 text-center">ตรวจสอบข้อมูลก่อนกดส่ง</p>

      <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
        <h2 className="font-semibold text-zinc-900">
          สอบปฏิบัติการจำแนกชนิดไม้ด้วยแว่นขยาย
        </h2>
        <p className="text-xs text-gray-500">
          การทดสอบความรู้ภาคปฏิบัติ ผู้เข้าสอบจะต้องส่องหน้าตัดตัวอย่างไม้ปริศนา...
        </p>

        <Row label="ชื่อผู้สอบ" value="สมชาย ใจดี" />
        <Row label="เวลาในการทำ" value="1:00:20" />
        <Row label="วันเวลาที่ส่ง" value="20/06 05:30 น." />
        <Row label="จำนวนภาพ" value={`${photoCount} ภาพ`} />
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onEdit} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded">
          กลับ
        </button>
        <button
          type="button"
          onClick={() => setShowConfirmModal(true)}
          className="flex-1 bg-emerald-700 text-white py-2 rounded"
        >
          ส่งคำตอบ
        </button>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg p-5 w-full max-w-sm text-center">
            <h3 className="font-semibold text-zinc-900 mb-1">ยืนยันการส่งคำตอบ</h3>
            <p className="text-sm text-gray-500 mb-4">กรุณาตรวจสอบคำตอบก่อนกดส่งคำตอบ</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-gray-300 py-2 rounded"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="flex-1 bg-emerald-700 text-white py-2 rounded"
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-zinc-900">{value}</span>
    </div>
  );
}