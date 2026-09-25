"use client";

import BackNav from "@/components/BackNav";

export default function Register() {
    return (
        <main>
            <BackNav />

            <div className="m-6 flex flex-col gap-4">
                <div className="bg-amber-100 flex flex-col justify-center px-4 py-12 rounded-md">
                    <h1 className="text-lg">อบรมพันธุ์ไม้ครั้งที่ 3 {/*{name}*/}</h1>
                    <p className="text-sm">เรียนรู้โครงสร้างเนื้อไม้ การจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย และการลงทะเบียนข้อมูลอัตลักษณ์ไม้ {/*{description}*/}</p>
                </div>

                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <div className="flex items-center gap-2">
                        <p className="px-4 py-2 bg-emerald-700 w-fit rounded-full text-white">p</p>
                        <h1 className="text-emerald-700 font-bold text-lg">ลงทะเบียนเข้าคอร์ส</h1>
                    </div>
                    <p className="text-sm">กรอกรหัสลงทะเบียนเพื่อเข้าถึงเนื้อหาและข้อสอบในคอร์สนี้</p>
                    <div className="flex flex-col">
                        <form action="" method="get" className="flex flex-col gap-1">
                            <label htmlFor="" className="text-sm text-emerald-700">รหัสลงทะเบียน</label>
                            <input type="text" placeholder="กรอกรหัส" className="text-sm border border-zinc-300 rounded-md px-4 py-2" />
                            <label htmlFor="" className="text-xs text-zinc-500">ขอรหัสได้จากผู้สอนหรือผู้ดูแลระบบ</label>
                            <button className="bg-emerald-700 text-white px-4 py-2 rounded-lg mt-3">ยืนยันการลงทะเบียน</button>
                        </form>
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
                        <h1 className="text-emerald-700 font-bold text-lg">ส่วนข้อมูลคอร์ส</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="border border-emerald-700/50 rounded-lg p-4 flex gap-2">
                            <p className="px-4 py-2 bg-emerald-700 w-fit rounded-full text-white">p</p>
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
