import { useState } from "react";

// ประกาศยังเป็นตัวอย่าง แต่หัวข้ออ้างอิงคอร์สที่กำลังเปิด
export default function Announcement({ courseName = "อบรมพรรณไม้ครั้งที่ 3" }: { courseName?: string }) {
    const [show, setShow] = useState(false);

    function handle() {
        setShow(false);
    }
    return (
        <div>
            <button
                type="button"
                onClick={() => setShow(true)}
                className="bg-emerald-300/20 px-4 py-3 rounded-lg flex flex-col gap-3 text-left">
                <div className="flex gap-2">
                    <p className="bg-amber-200/40 w-fit h-fit text-amber-500 px-2 py-0.5 rounded-lg">ตัวอย่าง</p>
                    <h2 className="text-emerald-700 rounded-lg ">เตรียมความพร้อมก่อนเริ่ม {courseName}</h2>
                </div>
                <p className="text-sm">&ldquo;สวัสดีผู้เข้าร่วมอบรมทุกท่านครับ เพื่อให้การอบรมภาคปฏิบัติเป็นไปอย่างราบรื่น
                    ขอความกรุณาผู้เข้าร่วมอบรมทุกท่านเตรียม...&rdquo;</p>
                <p className="text-zinc-400 text-xs">19 เมษายน 2569 • โดย Peerapat</p>
            </button>

            {show && (
                <div
                    className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-6"
                    onClick={() => setShow(false)}
                >
                    <div
                        className="bg-white rounded-lg p-5 w-full max-w-sm gap-2 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 p-1.5 bg-emerald-700 w-fit rounded-full text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
                                </svg>
                                <h1 className="text-emerald-700 text-lg">ประกาศ</h1>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShow(false)}
                                className="text-red-500">X</button>
                        </div>
                        <h2 className="text-emerald-700 font-semibold text-lg">เตรียมความพร้อมก่อนเริ่ม{courseName}</h2>
                        <p className="text-sm">&ldquo;สวัสดีผู้เข้าร่วมอบรมทุกท่านครับ เพื่อให้การอบรมภาคปฏิบัติเป็นไปอย่างราบรื่น
                            ขอความกรุณาผู้เข้าร่วมอบรมทุกท่านเตรียม แว่นขยายส่องพระ (Hand Lens) กำลังขยาย 10x หรือ 15x มาด้วยตนเองในวันอบรมครับ
                            ส่วนเอกสารประกอบการบรรยายและตัวอย่างไม้ทางผู้จัดเตรียมไว้ให้ครบถ้วนแล้วครับ แล้วพบกันครับ&rdquo;</p>
                        <p className="text-zinc-400 text-xs">19 เมษายน 2569 • โดย Peerapat</p>
                    </div>
                </div>
            )}
        </div>

    );
}
