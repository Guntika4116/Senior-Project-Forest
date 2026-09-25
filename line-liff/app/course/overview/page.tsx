"use client";

import BackNav from "@/components/BackNav";

export default function Overview() {
    return (
        <main>
            <BackNav />

            <div className="m-6 flex flex-col gap-4">
                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <p className="px-4 py-2 bg-emerald-700 w-fit rounded-full text-white">p</p>
                            <h1 className="text-emerald-700 font-bold text-lg">ประกาศ</h1>
                        </div>
                        <p className="text-emerald-700 text-sm">1/3</p>
                    </div>
                    <div className="bg-emerald-300/20 px-4 py-3 rounded-lg flex flex-col gap-3">
                        <div className="flex gap-2">
                            <p className="bg-amber-200/40 w-fit h-fit text-amber-500 px-2 py-0.5 rounded-lg">New</p>
                            <h2 className="text-emerald-700 rounded-lg ">เตรียมความพร้อมก่อนเริ่มการอบรมพันธ์ ไม้ครั้งที่ 3 {/*title*/}</h2>
                        </div>
                        <p className="text-sm">"สวัสดีผู้เข้าร่วมอบรมทุกท่านครับ เพื่อให้การอบรมภาคปฏิบัติเป็นไปอย่างราบรื่น
                            ขอความกรุณาผู้เข้าร่วมอบรมทุกท่านเตรียม..."</p>
                        <p className="text-zinc-400 text-xs">19 เมษายน 2569 • โดย Peerapat</p>

                    </div>
                </div>

                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <div className="flex items-center gap-2">
                        <p className="px-4 py-2 bg-emerald-700 w-fit rounded-full text-white">p</p>
                        <h1 className="text-emerald-700 font-bold text-lg">รายละเอียดอบรม</h1>
                    </div>
                    <p className="bg-emerald-200/40 p-4 rounded-lg text-sm">เรียนรู้โครงสร้างเนื้อไม้ การจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย และการลงทะเบียนข้อมูลอัตลักษณ์ไม้ {/*{description}*/}</p>
                    <div className="flex flex-col">
                        <div className="border border-emerald-700/50 rounded-lg p-4">
                            <div className="flex gap-2 items-center">
                                <p className="px-4 py-2 bg-emerald-700 w-fit rounded-full text-white">p</p>
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
                        <p className="px-4 py-2 bg-emerald-700 w-fit rounded-full text-white">p</p>
                        <h1 className="text-emerald-700 font-bold text-lg">รายชื่อผู้สอน</h1>
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
