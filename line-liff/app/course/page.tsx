"use client";

import Search from "@/components/Search";
import CourseCard from "@/components/course/CourseCard";

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
                <div className="flex gap-2 mt-3 border border-gray-300 rounded-full py-2 px-3 w-fit ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-emerald-900 pt-0.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    <p className="text-emerald-700 text-sm">ทั้งหมด 2 รายการ</p>
                </div>
            </div>

            <div className="flex flex-col gap-1 mt-3 border border-gray-300 rounded-md py-4 px-3">
                <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 bg-emerald-400/20 text-emerald-700 text-sm rounded-md px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>

                        <p>อบรมทั้งหมด</p>
                    </div>
                    <p>2</p>
                </div>
                <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 bg-blue-400/20 text-blue-700 text-sm rounded-md px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                        <p>ผู้ใช้งานทั้งหมด</p>
                    </div>
                    <p>2</p>
                </div>
                <div className="flex justify-between gap-2 items-center border border-gray-300 rounded-md py-2 px-3 w-full text-emerald-700 text-sm">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 bg-amber-400/20 text-amber-700 rounded-md px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
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
                    <CourseCard
                        key="" //{wood.id}
                        id="1" //{wood.id}
                        name="อบรมพันธุ์ไม้ครั้งที่ 3" //{wood.commonname ?? ""}
                        description="เรียนรู้โครงสร้างเนื้อไม้ การจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย และการลงทะเบียนข้อมูลอัตลักษณ์ไม้" //{wood.scientificname}
                        imageUrl="https://png.pngtree.com/thumb_back/fw800/background/20240625/pngtree-tree-planting-growth-love-of-nature-image_15824708.jpg" //{wood.imageUrl?.[0] ?? ""}
                        registered="1" //{wood.registered}
                        date="19 เม.ย. 2569 - 25 เม.ย. 2569"
                        location="อาคารใหม่"
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
