import Link from "next/link";

export default function Success() {

    return (
        <div className="flex flex-col gap-2 p-4 rounded-lg border border-emerald-700 bg-emerald-600/10 text-center">
            <h1 className="text-emerald-700 font-semibold text-lg">ส่งคำตอบสำเร็จ</h1>
            <p className="text-sm text-zinc-600">คะแนนที่ได้: 20/20</p>
            <Link href={"/course/exam"} className="w-full text-white bg-emerald-700 rounded-lg p-2">
                <p>กลับหน้าหลัก</p>
            </Link>
        </div>
    );
}