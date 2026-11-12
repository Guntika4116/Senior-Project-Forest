"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getDemoCourseById } from "@/lib/demo-courses";

// ครอบส่วนที่อ่าน query string เพื่อรองรับ production build
export default function Register() {
    return (
        <Suspense fallback={<p className="m-6">กำลังโหลดคอร์ส...</p>}>
            <EnrollmentForm />
        </Suspense>
    );
}

function EnrollmentForm() {
    const router = useRouter();
    // อ่านรหัสคอร์สจาก URL เช่น ?courseId=demo-3
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId") ?? "";
    const course = getDemoCourseById(courseId);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const REGISTER_CODE = "1234";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (submitting || !course) return;

        const formData = new FormData(e.currentTarget);
        const code = String(formData.get("code") ?? "").trim();

        setSubmitting(true);
        setError(null);

        if (code === REGISTER_CODE) {
            // เปิดภาพรวมของคอร์สที่ผู้ใช้เลือก
            // ขั้นนี้ยังไม่ได้บันทึกสถานะการลงทะเบียน
            router.push(`/woods/courses/${encodeURIComponent(course.id)}`);
            return;
        }

        setError("รหัสไม่ถูกต้อง");
        setSubmitting(false);
    }
    if (!course) {
        return (
            <main className="m-6">
                <p>ไม่พบคอร์ส กรุณาเลือกคอร์สจากหน้าคอร์สเรียนทั้งหมด</p>
            </main>
        );
    }
    return (
        <main>

            <div className="m-6 flex flex-col gap-4">
                <div
                    className="text-white flex flex-col justify-center px-4 py-12 rounded-md"
                    style={{
                        backgroundImage: `url("${course.imageUrl}")`,
                        backgroundSize: "cover",
                    }}
                >
                    <h1 className="text-lg">{course.name}</h1>
                    <p className="text-sm">{course.description}</p>
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
                    <p className="bg-emerald-200/40 p-4 rounded-lg text-sm">
                        {course.description}
                    </p>
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
                                <p className="text-sm text-zinc-600">
                                    {course.location}
                                </p>
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
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
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
