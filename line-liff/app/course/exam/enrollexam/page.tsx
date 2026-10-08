"use client";

import BackNav from "@/components/BackNav";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Exam() {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const REGISTER_CODE = "123456";
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const code = String(formData.get("code") ?? "").trim();

        setError("");

        if (code === REGISTER_CODE) {
            router.push("/course/exam/choose");
            return;
        }

        setError("รหัสไม่ถูกต้อง");
    }

    return (
        <main>
            <BackNav />

            <div className="m-6 mb-26 flex flex-col gap-4">
                <div className="flex flex-col gap-3 border border-zinc-300 rounded-lg p-4">
                    <h1 className="text-emerald-700 font-semibold">แบบทดสอบวัดความรู้พื้นฐานกาย วิภาคไม้และอัตลักษณ์ไม้เศรษฐกิจ</h1>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 justify-between items-center">
                            <div className="flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-emerald-700">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <p className="text-xs text-zinc-600">จำนวนข้อ</p>
                            </div>
                            <p className="text-xs text-zinc-600">10 ข้อ</p>
                        </div>

                        <div className="flex gap-2 justify-between items-center">
                            <div className="flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-emerald-700">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <p className="text-xs text-zinc-600">เวลาในการทำ</p>
                            </div>
                            <p className="text-xs text-zinc-600">2 ชั่วโมง</p>
                        </div>

                        <div className="flex gap-2 justify-between items-center">
                            <div className="flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-emerald-700">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>

                                <p className="text-xs text-zinc-600">ปิดรับข้อสอบ</p>
                            </div>
                            <p className="text-xs text-zinc-600">06:30 น.</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 border border-zinc-300 rounded-lg p-4 items-center">
                        <h1 className="text-emerald-700 text-sm font-semibold">กรุณากรอกรหัสเข้าสอบ 6 หลัก</h1>
                        <p className="text-xs text-zinc-500">รหัสได้รับจากผู้คุมสอบ</p>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            className="border border-zinc-300 rounded-lg p-2 w-full text-center text-sm focus:outline-emerald-700"
                            placeholder="xxxxxx"
                            maxLength={6}
                        />
                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                    </div>
                    <button
                        type="submit"
                        className="bg-emerald-700 w-full p-3 rounded-lg flex justify-center items-center">
                        <p className="text-white text-sm">เข้าสอบ</p>
                    </button>
                </form>
            </div>
        </main>
    );
}