"use client";

import BackNav from "@/components/BackNav";

export default function DetailLesson() {
    return (
        <main>
            <BackNav />

            <div className="m-6 flex flex-col gap-4">
                <h1 className="text-emerald-700 text-xl font-bold">บทที่ 1 : โครงสร้างพื้นฐานของเนื้อไม้ และการจำแนกด้วยตาเปล่า</h1>
                <div className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    <p className="text-xs text-gray-600">Peerapat Meesangngoen • 19 เมษายน 2569</p>
                </div>

                <div className="flex flex-col gap-3 border border-gray-300 rounded-md py-4 px-3">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 bg-emerald-400/20 text-emerald-700 text-sm rounded-md px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        <p className="text-emerald-700 font-bold">เนื้อหาบทเรียน</p>
                    </div>
                    <p className="text-gray-700 text-sm">
                        ยินดีต้อนรับเข้าสู่บทเรียนแรกของการจำแนกไม้ครับ ในบทเรียนนี้เราจะมาทำความรู้จักกับโครงสร้างทางกายวิภาคที่สำคัญของไม้ใบกว้าง (Hardwood) ซึ่งเป็นกุญแจสำคัญในการระบุชนิดไม้ ได้แก่:
                        <br />
                        1. พอร์ (Pores / Vessels): ท่อลำเลียงน้ำ สังเกตการกระจายตัวว่าเป็นแบบวงแหวน (Ring-porous) หรือแบบกระจาย (Diffuse-porous)
                        <br />
                        2. เรย์ (Rays): เซลล์ที่เรียงตัวในแนวรัศมีคล้ายซี่ล้อรถจักรยาน
                        <br />
                        3. พาเรงคิมา (Parenchyma): เซลล์สะสมอาหาร มักมีสีอ่อนกว่าเนื้อไม้รอบๆ สังเกตรูปแบบการล้อมรอบพอร์ เช่น ล้อมรอบเป็นรูปปีกนก (Aliform) หรือเป็นแถบ (Banded)
                        <br />
                        <br />
                        ทริค: การดูลักษณะเหล่านี้ให้ชัดเจน จำเป็นต้องใช้มีดคัตเตอร์ที่คมมากปาดหน้าตัดไม้ให้เรียบกริบก่อนส่อง
                        ด้วยแว่นขยาย 10X ๆ ที่เกี่ยวข้องกับโครงสร้างพื้นฐานของเนื้อไม้ และการจำแนกด้วยตาเปล่า
                    </p>
                </div>

                <div className="flex flex-col gap-3 border border-gray-300 rounded-md py-4 px-3">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 bg-emerald-400/20 text-emerald-700 text-sm rounded-md px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        <p className="text-emerald-700 font-bold">วิดีโอบทเรียน</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <p className="text-gray-700 text-sm">วิดีโอแนะนำโครงสร้างเนื้อไม้</p>
                            <video controls className="w-full rounded-md">
                                <source src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border border-gray-300 rounded-md py-4 px-3">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 bg-emerald-400/20 text-emerald-700 text-sm rounded-md px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>

                        <p className="text-emerald-700 font-bold">เอกสารประกอบการเรียน</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center bg-emerald-600/20 rounded-md py-4 px-3 border border-dashed border-gray-500">
                        <p className="text-gray-700 text-sm">
                            ยังไม่มีเอกสารในบทเรียนนี้
                        </p>
                    </div>
                </div>
            </div>

        </main>

    );
}
