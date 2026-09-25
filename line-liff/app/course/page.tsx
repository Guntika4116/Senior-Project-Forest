"use client";

import Search from "@/components/Search";
import EducateCard from "@/components/EducateCard";
import woodDetail from "@/data/woodDetail.json";

export default function Course() {
    return (
        <main className="m-6">
            <div>
                <h1 className="text-emerald-700 text-3xl font-semibold">อบรมทั้งหมด</h1>
                <p className="text-zinc-500">
                    จัดการและค้นหาอบรมในระบบ
                </p>
            </div>

            <div className="w-full flex justify-end">
                <div className="flex gap-2 mt-3 border border-gray-300 rounded-full py-2 px-3 w-fit">
                    <p className="text-emerald-700 text-sm">p</p>
                    <p className="text-emerald-700 text-sm">ทั้งหมด 2 รายการ</p>
                </div>
            </div>

            <div className="flex flex-col gap-1 mt-3 border border-gray-300 rounded-md py-4 px-3">
                <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                    <div className="flex gap-2 items-center">
                        <p className="bg-emerald-400/20 text-emerald-700 text-sm rounded-md px-1">p</p>
                        <p>อบรมทั้งหมด</p>
                    </div>
                    <p>2</p>
                </div>
                <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                    <div className="flex gap-2 items-center">
                        <p className="bg-blue-400/20 text-blue-700 text-sm rounded-md px-1">p</p>
                        <p>ผู้ใช้งานทั้งหมด</p>
                    </div>
                    <p>2</p>
                </div>
                <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                    <div className="flex gap-2 items-center">
                        <p className="bg-amber-400/20 text-amber-700 text-sm rounded-md px-1">p</p>
                        <p>เปิดรับสมัคร</p>
                    </div>
                    <p>2</p>
                </div>
            </div>

            <div className="flex gap-4 mt-3">
                {/* กล่องค้นหา */}
                <Search
                    placeholder="ค้นหาอบรม (ชื่อ / คำอธิบาย / สถานที่)"
                />
            </div>

            {/* แสดงรายการอบรม */}
            <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <EducateCard
                            key="" //{wood.id}
                            id="1" //{wood.id}
                            name="อบรมพันธุ์ไม้ครั้งที่ 3" //{wood.commonname ?? ""}
                            description="เรียนรู้โครงสร้างเนื้อไม้ การจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย และการลงทะเบียนข้อมูลอัตลักษณ์ไม้" //{wood.scientificname}
                            imageUrl="" //{wood.imageUrl?.[0] ?? ""}
                            registered="1" //{wood.registered}
                            date="19 เม.ย. 2569 - 25 เม.ย. 2569"
                            location="อาคารใหม่"
                            linkurl="o"
                    />
                    {/* {woodDetail.map((wood) => (
                        <EducateCard
                            key={wood.id}
                            id={wood.id}
                            name="อบรมพันธุ์ไม้ครั้งที่ 3" //{wood.commonname ?? ""}
                            description="เรียนรู้โครงสร้างเนื้อไม้ การจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย และการลงทะเบียนข้อมูลอัตลักษณ์ไม้" //{wood.scientificname}
                            imageUrl={wood.imageUrl?.[0] ?? ""}
                            registered="1" //{wood.registered}
                            date="19 เม.ย. 2569 - 25 เม.ย. 2569"
                            location="อาคารใหม่"
                            linkurl="o"
                        />
                    ))} */}
                </div>
            </div>
        </main>

    );
}
