"use client";

import BackNav from "@/components/BackNav";
import LessonC from "@/components/course/LessonCard";
import Navbar from "@/components/course/Navbar";

export default function Lesson() {
    return (
        <main>
            <BackNav />
            <Navbar />

            <div className="m-6 mb-26 flex flex-col gap-4">
                <div className="text-white flex flex-col justify-center px-4 py-12 rounded-md" style={{ backgroundImage: `url(https://png.pngtree.com/background/20250107/original/pngtree-tree-planting-growth-love-of-nature-picture-image_15553291.jpg)`, backgroundSize: 'cover' }}>
                    <h1 className="text-lg">อบรมพรรณไม้ครั้งที่ 3 {/*{name}*/}</h1>
                    <p className="text-sm">เรียนรู้โครงสร้างเนื้อไม้ การจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย และการลงทะเบียนข้อมูลอัตลักษณ์ไม้ {/*{description}*/}</p>
                </div>

                <div className="flex flex-col gap-1 mt-3 border border-gray-300 rounded-md py-4 px-3">
                    <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 bg-emerald-400/20 text-emerald-700 text-sm rounded-md px-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            <p>จำนวนบทเรียน</p>
                        </div>
                        <p>2</p>
                    </div>
                    <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 bg-blue-400/20 text-blue-700 text-sm rounded-md px-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                            <p>จำนวนการสอบ</p>
                        </div>
                        <p>2</p>
                    </div>
                    <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 bg-amber-400/20 text-amber-700 text-sm rounded-md px-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                            <p>สมาชิกทั้งหมด</p>
                        </div>
                        <p>2</p>
                    </div>
                </div>

                <LessonC />
            </div>
        </main>

    );
}
