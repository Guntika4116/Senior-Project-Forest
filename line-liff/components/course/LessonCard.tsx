import Link from "next/link";

export default function LessonCard() {
    return (
        <Link href="/course/lesson/id" className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-zinc-300">
            <h1 className="text-emerald-700 font-bold text-lg">เนื้อหาการเรียน</h1>
            <div className="flex flex-col gap-2">
                <div className="border border-emerald-700/50 rounded-lg p-4 flex flex-col gap-2">
                    <h2 className="text-emerald-700">{/* {lessonNo} */} บทที่ 1</h2>
                    <p className="text-sm text-zinc-600">{/* {title} */} โครงสร้างพื้นฐานของเนื้อไม้และการจำแนกด้วยตาเปล่า</p>
                    <p className="underline rounded-lg text-xs text-zinc-400">กดเพื่อดูรายละเอียดเนื้อหา</p>
                </div>
            </div>
        </Link>
    );
}