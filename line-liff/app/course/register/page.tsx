"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackNav from "@/components/BackNav";

export default function Register() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const REGISTER_CODE = "1234";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (submitting) return;

        const formData = new FormData(e.currentTarget);
        const code = String(formData.get("code") ?? "").trim();

        setSubmitting(true);
        setError(null);

        if (code === REGISTER_CODE) {
            router.push("/course/overview");
            return;
        }

        setError("รหัสไม่ถูกต้อง");
        setSubmitting(false);
    }

    return (
        <main>
            <BackNav />

            <div className="m-6 flex flex-col gap-4">
                <div className="text-white flex flex-col justify-center px-4 py-12 rounded-md" style={{ backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/background/20240625/pngtree-tree-planting-growth-love-of-nature-image_15824708.jpg")`, backgroundSize: 'cover' }}>
                    <h1 className="text-lg">อบรมพันธุ์ไม้ครั้งที่ 3 {/*{name}*/}</h1>
                    <p className="text-sm">เรียนรู้โครงสร้างเนื้อไม้ การจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย และการลงทะเบียนข้อมูลอัตลักษณ์ไม้ {/*{description}*/}</p>
                </div>

                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 p-2 bg-emerald-700 w-fit rounded-full text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <h1 className="text-emerald-700 font-bold text-lg">ลงทะเบียนเข้าคอร์ส</h1>
                    </div>
                    <p className="text-sm">กรอกรหัสลงทะเบียนเพื่อเข้าถึงเนื้อหาและข้อสอบในคอร์สนี้</p>
                    <div className="flex flex-col">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                            <label htmlFor="code" className="text-sm text-emerald-700">รหัสลงทะเบียน</label>
                            <input type="text" id="code" name="code" placeholder="กรอกรหัส" className="text-sm border border-zinc-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-emerald-700" />
                            <p className="text-xs text-zinc-500">ขอรหัสได้จากผู้สอนหรือผู้ดูแลระบบ</p>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-emerald-700 text-white px-4 py-2 rounded-lg mt-3 disabled:opacity-50"
                            >
                                {submitting ? "กำลังลงทะเบียน..." : "ยืนยันการลงทะเบียน"}
                            </button>
                            {error && <p className="text-xs text-red-600 mt-1 text-center">{error}</p>}
                        </form>
                    </div>
                </div>

                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <div className="flex items-center gap-2">
                        <p className="px-3.5 py-1 bg-emerald-700 w-fit rounded-full text-white">i</p>
                        <h1 className="text-emerald-700 font-bold text-lg">รายละเอียดอบรม</h1>
                    </div>
                    <p className="bg-emerald-200/40 p-4 rounded-lg text-sm">เรียนรู้โครงสร้างเนื้อไม้ การจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย และการลงทะเบียนข้อมูลอัตลักษณ์ไม้ {/*{description}*/}</p>
                    <div className="flex flex-col">
                        <div className="border border-emerald-700/50 rounded-lg p-4">
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 p-1.5 bg-emerald-700 w-fit rounded-full text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <h2 className="text-emerald-700">สถานที่จัดอบรม</h2>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-zinc-600">ห้องประชุมพฤกษศาสตร์ ชั้น 3</p>
                                <p className="text-xs text-emerald-700 border border-emerald-700/50 rounded-full px-2 py-1">เปิดในแผนที่ ↗</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-9 p-2 bg-emerald-700 w-fit rounded-full text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <h1 className="text-emerald-700 font-bold text-lg">ส่วนข้อมูลคอร์ส</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="border border-emerald-700/50 rounded-lg p-4 flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-9 p-2 bg-emerald-700 w-fit rounded-full text-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>
                            <div className="gap-2 items-center">
                                <h2 className="text-emerald-700">สมาชิกที่ลงทะเบียนแล้ว</h2>
                                <p className="text-sm text-zinc-600">{/* {registered} */}0 คน</p>
                            </div>
                        </div>
                        <p className="bg-emerald-200/40 px-4 py-2 rounded-lg text-xs text-zinc-500">* ลงทะเบียนเข้าคอร์สเพื่อเข้าถึงบทเรียน ข้อสอบ และประกาศต่างๆ ของคอร์สนี้</p>
                    </div>
                </div>
            </div>
        </main>

    );
}
