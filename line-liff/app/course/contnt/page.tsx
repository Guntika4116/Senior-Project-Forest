"use client";

import BackNav from "@/components/BackNav";

export default function Overview() {
    return (
        <main>
            <BackNav />

            <div className="m-6 flex flex-col gap-4">
                <div className="bg-amber-100 flex flex-col justify-center px-4 py-12 rounded-md">
                    <h1 className="text-lg">อบรมพันธุ์ไม้ครั้งที่ 3 {/*{name}*/}</h1>
                    <p className="text-sm">เรียนรู้โครงสร้างเนื้อไม้ การจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย และการลงทะเบียนข้อมูลอัตลักษณ์ไม้ {/*{description}*/}</p>
                </div>

                <div className="flex flex-col gap-1 mt-3 border border-gray-300 rounded-md py-4 px-3">
                    <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                        <div className="flex gap-2 items-center">
                            <p className="bg-emerald-400/20 text-emerald-700 text-sm rounded-md px-1">p</p>
                            <p>จำนวนบทเรียน</p>
                        </div>
                        <p>2</p>
                    </div>
                    <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                        <div className="flex gap-2 items-center">
                            <p className="bg-blue-400/20 text-blue-700 text-sm rounded-md px-1">p</p>
                            <p>จำนวนการสอบ</p>
                        </div>
                        <p>2</p>
                    </div>
                    <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                        <div className="flex gap-2 items-center">
                            <p className="bg-amber-400/20 text-amber-700 text-sm rounded-md px-1">p</p>
                            <p>สมาชิกทั้งหมด</p>
                        </div>
                        <p>2</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <h1 className="text-emerald-700 font-bold text-lg">เนื้อหาการเรียน</h1>
                    <div className="flex flex-col gap-2">
                        <div className="border border-emerald-700/50 rounded-lg p-4 flex flex-col gap-2">
                            <h2 className="text-emerald-700">{/* {lessonNo} */} บทที่ 1</h2>
                            <p className="text-sm text-zinc-600">{/* {title} */} โครงสร้างพื้นฐานของเนื้อไม้และการจำแนกด้วยตาเปล่า</p>
                            <p className="underline rounded-lg text-xs text-zinc-400">กดเพื่อดูรายละเอียดเนื้อหา</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}
