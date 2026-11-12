"use client";

import Announcement from "@/components/course/Announcement";
import Navbar from "@/components/course/Navbar";
import type { Course } from "@/lib/demo-courses";

export default function OverviewContent({
    course,
}: {
    course: Course;
}) {
    return (
        <main>
            <Navbar courseId={course.id} />

            {/* ใช้ข้อมูลคอร์สชุดเดียวกับการ์ด LINE โดยคงเค้าโครง overview เดิม */}
            <div className="m-6 mb-26 flex flex-col gap-4">
                <div>
                    <p className="text-xs text-zinc-500">ข้อมูลตัวอย่าง</p>
                    <h1 className="mt-1 text-2xl font-bold text-emerald-800">
                        {course.name}
                    </h1>
                    <p className="mt-2 text-sm text-zinc-600">
                        {course.date}
                    </p>
                </div>
                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 p-1.5 bg-emerald-700 w-fit rounded-full text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
                            </svg>
                            <h1 className="text-emerald-700 font-bold text-lg">ประกาศ</h1>
                        </div>
                        <p className="text-emerald-700 text-sm">1/1</p>
                    </div>
                    <Announcement courseName={course.name} />
                </div>

                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <div className="flex items-center gap-2">
                        <p className="px-3.5 py-1 bg-emerald-700 w-fit rounded-full text-white">i</p>
                        <h1 className="text-emerald-700 font-bold text-lg">รายละเอียดอบรม</h1>
                    </div>
                    <p className="bg-emerald-200/40 p-4 rounded-lg text-sm">{course.description}</p>
                    <div className="flex flex-col">
                        <div className="border border-emerald-700/50 rounded-lg p-4">
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 p-1.5 bg-emerald-700 w-fit rounded-full text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <h2 className="text-emerald-700">สถานที่จัดอบรม</h2>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-zinc-600">{course.location}</p>
                                <p className="text-xs text-emerald-700 border border-emerald-700/50 rounded-full px-2 py-1">เปิดในแผนที่ ↗</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9 p-2 bg-emerald-700 w-fit rounded-full text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <h1 className="text-emerald-700 font-bold text-lg">รายชื่อผู้สอน (ตัวอย่าง)</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="border border-emerald-700/50 rounded-lg p-4 flex gap-2">
                            <p className="px-4 py-2 bg-emerald-700 w-fit rounded-full text-white">p</p>
                            <div className="gap-2 items-center">
                                <h2 className="text-emerald-700">{/* {teachby} */} Peerapat Meesangngoen</h2>
                                <p className="text-sm text-zinc-600">{/* {email} */} instructor@gmail.com</p>

                            </div>
                        </div>
                        <p className="bg-emerald-200/40 px-4 py-2 rounded-lg text-xs text-zinc-500">* ผู้สอนที่ถูกเพิ่มในคอร์ส สามารถสร้าง/แก้ไข/ลบบทเรียนได้ แต่ไม่สามารถลบคอร์สได้</p>
                    </div>
                </div>
            </div>
        </main>

    );
}
