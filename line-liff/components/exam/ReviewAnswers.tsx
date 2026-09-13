"use client";

import { useState } from "react";

export type OmrAnswerItem = {
  questionNumber: number;
  questionText: string;
  extractedAnswer: string;
  points: number;
};

export default function ReviewAnswers({
  answers,
  onNext,
}: {
  answers: OmrAnswerItem[];
  onNext: (answers: OmrAnswerItem[]) => void;
}) {
  const [items, setItems] = useState(answers);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(index: number, value: string) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, extractedAnswer: value } : item))
    );
  }

  function handleToggleEdit() {
    setIsEditing((prev) => !prev);
  }

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <h1 className="text-emerald-700 text-2xl font-bold">ตรวจสอบข้อมูล</h1>
      <p className="text-gray-500 text-center text-sm">
        กรุณาตรวจคำตอบที่ระบบอ่าน
        <br />
        แก้ไขได้หากคลาดเคลื่อน
      </p>

      <div className="flex flex-col gap-4 w-full max-w-md mt-2">
        {items.map((item, index) => (
          <div key={item.questionNumber} className="border border-gray-300 rounded-xl p-4">
            <div className="flex gap-3 items-center">
              <div className="bg-emerald-700 text-white rounded-full w-8 h-8 flex shrink-0 items-center justify-center text-sm">
                {item.questionNumber}
              </div>
              <p className="text-zinc-900 text-sm">{item.questionText}</p>
            </div>

            <input
              type="text"
              value={item.extractedAnswer}
              onChange={(event) => handleChange(index, event.target.value)}
              disabled={!isEditing}
              className={`w-full mt-3 border rounded-lg px-3 py-2 text-sm outline-none ${
                isEditing
                  ? "border-gray-300 bg-white focus:ring-2 focus:ring-emerald-700"
                  : "border-gray-200 bg-gray-100 text-gray-500"
              }`}
            />

            <p className="text-right text-gray-400 text-xs mt-2">{item.points} คะแนน</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 w-full max-w-md mt-4">
        <button
          type="button"
          onClick={handleToggleEdit}
          className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg bg-white"
        >
          {isEditing ? "ยืนยัน" : "แก้ไขข้อมูล"}
        </button>
        <button
          type="button"
          onClick={() => onNext(items)}
          className="flex-1 bg-emerald-700 text-white py-2.5 rounded-lg"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
