import type { OmrExam } from "@/lib/omr";

export default function Instruction({ onStart, exam, error, onRetry }: {
    onStart: () => void;
    exam: OmrExam | null;
    error: string | null;
    onRetry: () => void;
}) {
    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-2 p-4">
                <h1 className="text-black text-2xl font-bold">ถ่ายภาพกระดาษคำตอบ</h1>
                <p className="text-gray-500">กรุณาอ่านคำแนะนำก่อนถ่ายภาพ</p>

                {exam && <p className="text-sm text-gray-600 text-center">{exam.questionCount} ข้อ · มีเฉลย {exam.gradedCount} ข้อ · คะแนนเต็ม {exam.maxScore}</p>}
                {!exam && !error && <p role="status" className="text-gray-600">กำลังโหลดข้อมูลข้อสอบ...</p>}
                {error && <div role="alert" className="text-red-700 text-center">
                    <p>{error}</p>
                    <button type="button" onClick={onRetry} className="underline py-2">ลองโหลดใหม่</button>
                </div>}

                <div className="flex flex-col gap-4 w-9/12 max-w-md">
                    <div className="flex items-center gap-4 p-4 w-full min-h-24 border border-gray-300 rounded-lg">
                        <div className="bg-emerald-700 text-white rounded-full w-8 h-8 flex shrink-0 items-center justify-center">
                            1
                        </div>
                        <div>
                            <h1 className="text-emerald-700 text-lg font-semibold">วางกระดาษบนพื้นเรียบ</h1>
                            <p className="text-gray-500 text-sm">วางกระดาษคำตอบบนพื้นเรียบ และพื้นที่ที่มีแสงสว่างเพียงพอ</p>
                        </div>

                    </div>

                    <div className="flex items-center gap-4 p-4 w-full min-h-28 border border-gray-300 rounded-lg">
                        <div className="bg-emerald-700 text-white rounded-full w-8 h-8 flex shrink-0 items-center justify-center">
                            2
                        </div>
                        <div>
                            <h1 className="text-emerald-700 text-lg font-semibold">ถ่ายให้เห็นกระดาษทั้งแผ่น</h1>
                            <p className="text-gray-500 text-sm">ใช้กระดาษคำตอบ A4 ของข้อสอบนี้ ให้เห็นจุดอ้างอิงทั้ง 4 มุมชัดเจน</p>
                        </div>

                    </div>

                    <div className="flex items-center gap-4 p-4 w-full min-h-28 border border-gray-300 rounded-lg">
                        <div className="bg-emerald-700 text-white rounded-full w-8 h-8 flex shrink-0 items-center justify-center">
                            3
                        </div>
                        <div>
                            <h1 className="text-emerald-700 text-lg font-semibold">ข้อความต้องชัดเจนอ่านได้</h1>
                            <p className="text-gray-500 text-sm">ตรวจสอบว่าตัวอักษรและตัวเลขไม่เบลอ</p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onStart}
                        disabled={!exam}
                        className="bg-emerald-700 text-white px-4 py-2 rounded-md text-center disabled:opacity-50"
                    >
                        เริ่มถ่ายภาพ
                    </button>

                </div>
            </div>
        </div>
    );
}
