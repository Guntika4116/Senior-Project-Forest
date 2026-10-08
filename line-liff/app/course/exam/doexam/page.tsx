"use client";

import BackNav from "@/components/exam/BackNavExamNTime";
import ExamCh from "@/components/exam/normalexam/ExamChoice";
import ExamFA from "@/components/exam/normalexam/ExamFillAns";
import Success from "@/components/exam/normalexam/Success";
import { useState } from "react";

export default function Exam() {
    const [value, setValue] = useState("");

    return (
        <main>
            <BackNav />

            <div className="m-6 mb-26 flex flex-col gap-4">
                <div className="flex flex-col gap-2 p-4 rounded-lg border border-zinc-300">
                    <h1 className="text-emerald-700 font-semibold text-lg">แบบทดสอบวัดความรู้พื้นฐานกายวิภาคไม้และอัตลักษณ์ไม้เศรษฐกิจ</h1>
                    <p className="text-zinc-500 text-sm">แบบทดสอบนี้จัดทำขึ้นเพื่อประเมินความเข้าใจของผู้เข้าอบรมในหัวข้อทฤษฎีกายวิภาคไม้เบื้องต้น เพื่อใช้ในการระบุชนิดไม้ได้อย่างถูกต้อง</p>
                </div>

                <ExamCh />
                <ExamFA />
                <Success />

                <p className="text-sm text-zinc-400 text-end">ยังตอบไม่ครบ (2 ข้อ)</p>

                <div className="flex justify-between">
                    <button className="border border-zinc-300 rounded-lg w-30 py-2 text-emerald-700">กลับ</button>
                    <button className="bg-emerald-700 text-white w-30 py-2 rounded-lg">ส่งคำตอบ</button>
                </div>
            </div>
        </main>
    );
}