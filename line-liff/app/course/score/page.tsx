import BackNav from "@/components/BackNav";
import Navbar from "@/components/course/Navbar";

export default function Score() {
    return (
        <main>
            <BackNav />
            <Navbar />

            <div className="m-6 mb-26 flex flex-col gap-4">
                <h1 className="text-emerald-700 text-xl font-bold">คะแนนทั้งหมด</h1>

                <div className="flex flex-col gap-1 border border-gray-300 rounded-md py-4 px-3">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 bg-emerald-400/20 text-emerald-700 text-sm rounded-md px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                        </svg>
                        <div>
                            <p className="text-gray-500 text-xs">สถานะ :</p>
                            <p className="text-emerald-700 font-semibold">ผ่านเกณฑ์</p>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">เกณฑ์ผ่าน : 80% ของคะแนนรวม </p>
                </div>

                <div className="flex gap-3 border border-gray-300 rounded-md py-4 px-3 items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 bg-emerald-400/20 text-emerald-700 text-sm rounded-md px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                        </svg>
                        <p className="text-emerald-700 text-sm">คะแนนรวม</p>
                    </div>
                    <p className="text-gray-500 text-sm">85/100</p>
                </div>

                <div className="flex gap-3 border border-gray-300 rounded-md py-4 px-3 justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 bg-emerald-400/20 text-emerald-700 text-sm rounded-md px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <p className="text-emerald-700 text-sm">ข้อสอบที่ทำแล้ว</p>
                    </div>
                    <p className="text-gray-500 text-sm">9/10</p>
                </div>

                <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-9 p-2 bg-emerald-700 w-fit rounded-full text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                        <h1 className="text-emerald-700">คะแนนแต่ละข้อสอบ</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="border border-zinc-300 rounded-lg p-4 flex gap-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-20 w-fit rounded-xl text-zinc-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-emerald-700">สอบปฏิบัติการจำแนกชนิดไม้ด้วยแว่นขยาย (Wood ID Practical Test)</h2>
                                <p className="text-sm text-zinc-400">ยังไม่ได้ทำข้อสอบ</p>
                            </div>
                        </div>

                        <div className="border border-zinc-300 rounded-lg p-4 flex gap-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-20 w-fit rounded-xl text-yellow-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-emerald-700">สอบปฏิบัติการจำแนกชนิดไม้ด้วยแว่นขยาย (Wood ID Practical Test)</h2>
                                <p className="text-zinc-400 text-xs">ทำแล้ว 1 ครั้ง ล่าสุด : 20 เม.ย. 2569 04:35</p>
                                <p className="text-sm text-yellow-500">ยังไม่ผ่าน</p>
                            </div>
                        </div>

                        <div className="border border-zinc-300 rounded-lg p-4 flex gap-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-20 w-fit rounded-xl text-emerald-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            <div className="flex flex-col gap-1">
                                <h2 className="text-emerald-700">สอบปฏิบัติการจำแนกชนิดไม้ด้วยแว่นขยาย (Wood ID Practical Test)</h2>
                                <p className="text-zinc-400 text-xs">ทำแล้ว 1 ครั้ง ล่าสุด : 20 เม.ย. 2569 04:35</p>
                                <p className="text-sm text-emerald-700">10/10</p>
                            </div>
                        </div>
                        <p className="bg-emerald-200/40 px-4 py-2 rounded-lg text-xs text-zinc-500">* เกณฑ์ผ่าน {">"}= 80%</p>
                    </div>
                </div>
            </div>
        </main>
    );
}