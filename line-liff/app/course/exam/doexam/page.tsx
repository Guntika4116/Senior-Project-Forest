"use client";

import BackNav from "@/components/exam/BackNavExamNTime";
import ExamCh, { questions } from "@/components/exam/normalexam/ExamChoice";
import ExamFA from "@/components/exam/normalexam/ExamFillAns";
import Success from "@/components/exam/normalexam/Success";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NormalExamPage() {
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    function handleSubmit() {
        setShowConfirm(true);
    }

    function handleConfirm() {
        setShowConfirm(false);
        setSubmitted(true);
    }

    return (
        <main>
            <BackNav />

            <div className="m-6 mb-26 flex flex-col gap-4">
                <div className="flex flex-col gap-2 p-4 rounded-lg border border-zinc-300">
                    <h1 className="text-emerald-700 font-semibold text-lg">แบบทดสอบวัดความรู้พื้นฐานกายวิภาคไม้และอัตลักษณ์ไม้เศรษฐกิจ</h1>
                    <p className="text-zinc-500 text-sm">แบบทดสอบนี้จัดทำขึ้นเพื่อประเมินความเข้าใจของผู้เข้าอบรมในหัวข้อทฤษฎีกายวิภาคไม้เบื้องต้น เพื่อใช้ในการระบุชนิดไม้ได้อย่างถูกต้อง</p>
                </div>

                {submitted && <Success />}

                {!submitted && (
                    <>
                        {questions.map((q) => (
                            <ExamCh key={q.id} no={q.id} />
                        ))}
                        <p className="text-sm text-zinc-400 text-end">ยังตอบไม่ครบ (2 ข้อ)</p>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="border border-zinc-300 rounded-lg w-30 py-2 text-emerald-700">กลับ</button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={submitted}
                                className="bg-emerald-700 text-white w-30 py-2 rounded-lg">ส่งคำตอบ</button>
                        </div>
                    </>

                )}
            </div>

            {showConfirm && (
                <div
                    className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-6"
                    onClick={() => setShowConfirm(false)}
                >
                    <div
                        className="bg-white rounded-lg p-5 w-full max-w-sm text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-emerald-700 font-semibold text-lg">ยืนยันการส่งคำตอบ</h2>
                        <p className="text-zinc-500 text-sm mt-1">กรุณาตรวจสอบคำตอบก่อนกดส่งคำตอบ</p>
                        <div className="flex gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 border border-zinc-300 rounded-lg py-2 text-emerald-700">ยกเลิก</button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="flex-1 bg-emerald-700 text-white rounded-lg py-2">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}