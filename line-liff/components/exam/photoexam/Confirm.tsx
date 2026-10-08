"use client";

import { useState } from "react";
import type { OmrExam } from "@/lib/omr";

export default function ConfirmStep({ exam, onEdit, onSubmit, isSubmitting, error }: {
  exam: OmrExam;
  onEdit: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-center">
        <h1 className="text-emerald-700 text-2xl font-bold">ส่งกระดาษคำตอบ</h1>
        <p className="text-gray-500 mt-1">ตรวจสอบข้อมูลก่อนส่ง</p>
      </div>
      <div className="border border-gray-300 rounded-lg p-5 self-center w-full max-w-sm flex flex-col gap-2">
        <h2 className="font-semibold text-emerald-700 text-xl">{exam.name}</h2>
        <p className="text-sm text-gray-500">รายละเอียดการสอบ</p>
        <div className="flex justify-between items-center gap-1 pt-3">
          <p className="text-emerald-700">ชื่อผู้สอบ</p>
          <p>(ใส่ตัวแปร)</p>
        </div>
        <div className="flex justify-between items-center gap-1">
          <p className="text-emerald-700">เวลาในการทำ</p>
          <p>(ใส่ตัวแปร)</p>
        </div>
        <div className="flex justify-between items-center gap-1">
          <p className="text-emerald-700">วันเวลาที่ส่ง</p>
          <p>(ใส่ตัวแปร)</p>
        </div>
        <div className="flex justify-between items-center gap-1">
          <p className="text-emerald-700">จำนวนข้อ</p>
          <p>{exam.gradedCount} ข้อ</p>
        </div>
        <p className="text-sm">รหัสผู้สอบจะอ่านจากช่องที่ฝนบนกระดาษคำตอบ</p>
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
      {isSubmitting && <p role="status" className="text-center text-emerald-700">กำลังส่งภาพและตรวจคำตอบ กรุณารอสักครู่...</p>}
      <div className="flex gap-3">
        <button type="button" onClick={onEdit} disabled={isSubmitting}
          className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg disabled:opacity-50">
          กลับไปดูภาพ
        </button>
        <button type="button" onClick={() => setShowConfirmModal(true)} disabled={isSubmitting}
          className="flex-1 bg-emerald-700 text-white py-2.5 rounded-lg disabled:opacity-50">
          {isSubmitting ? "กำลังตรวจ..." : error ? "ลองส่งอีกครั้ง" : "ส่งคำตอบ"}
        </button>
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-30">
          <div role="dialog" aria-modal="true" aria-labelledby="confirm-title"
            className="bg-white rounded-lg p-5 w-full max-w-sm text-center">
            <h3 id="confirm-title" className="font-semibold text-zinc-900 mb-1">ยืนยันการส่งคำตอบ</h3>
            <p className="text-sm text-gray-500 mb-4">ส่งภาพนี้ให้ระบบอ่านและตรวจคำตอบ</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg">ยกเลิก</button>
              <button type="button" onClick={() => { setShowConfirmModal(false); void onSubmit(); }}
                className="flex-1 bg-emerald-700 text-white py-2.5 rounded-lg">ยืนยัน</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
