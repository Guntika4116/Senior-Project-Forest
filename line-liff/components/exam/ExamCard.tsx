import Link from "next/link";

type ExamType = "ปรนัย" | "เติมข้อมูลพรรณไม้";
type ExamStatus = "ทำแล้ว" | "ยังไม่ได้ทำ";
type ExamResult = "ผ่าน" | "ไม่ผ่าน";

const examTypeConfig: Record<ExamType, { icon: string }> = {
    "ปรนัย": {
        icon: "M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99",
    },
    "เติมข้อมูลพรรณไม้": {
        icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
    },
};

const statusConfig: Record<ExamStatus, { icon: string; color: string; background: string; outline: string }> = {
    "ทำแล้ว": {
        icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
        color: "text-emerald-700",
        background: "bg-emerald-200/10",
        outline: "border border-emerald-700",
    },
    "ยังไม่ได้ทำ": {
        icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
        color: "text-zinc-400",
        background: "bg-none",
        outline: "border border-zinc-400",
    },
};

const passedConfig: Record<ExamResult, { icon: string; color: string; background: string; outline: string }> = {
    "ผ่าน": {
        icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
        color: "text-emerald-700",
        background: "bg-emerald-200/10",
        outline: "border border-emerald-700",
    },
    "ไม่ผ่าน": {
        icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
        color: "text-orange-300",
        background: "bg-orange-200/10",
        outline: "border border-orange-300",
    },
};

export default function ExamCard({
    examtype,
    status,
    passed,
}: {
    examtype: ExamType;
    status: ExamStatus;
    passed?: ExamResult;
}) {
    const typeStyle = examTypeConfig[examtype];
    const statusStyle = statusConfig[status];
    const passedStyle = passed ? passedConfig[passed] : null;

    return (
        <Link href="/course/exam/enrollexam" className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-zinc-300">
            <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 p-1.5 bg-emerald-700 w-fit rounded-full text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d={typeStyle.icon} />
                </svg>
                <h1 className="text-emerald-700 text-sm">{examtype}</h1>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-emerald-800">แบบทดสอบวัดความรู้พื้นฐานกายวิภาคไม้และอัตลักษณ์ไม้เศรษฐกิจ</h1>
                <div className="flex gap-2 justify-between items-center">
                    <p className="text-xs text-emerald-700">เปิด 20/4/69 04:30น.</p>
                    <p className="text-xs text-emerald-700">ปิด 20/4/69 06:30น.</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className={`flex gap-1 items-center  ${statusStyle.background} ${statusStyle.outline} rounded-full py-1 px-2 w-fit`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${statusStyle.color}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={statusStyle.icon} />
                        </svg>
                        <p className={`text-xs ${statusStyle.color}`}>{status}</p>
                    </div>

                    {status === "ทำแล้ว" && passed && passedStyle && (
                        <div className={`flex gap-1 items-center ${passedStyle.background} ${passedStyle.outline} rounded-full py-1 px-2 w-fit`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${passedStyle.color}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={passedStyle.icon} />
                            </svg>
                            <p className={`text-xs ${passedStyle.color}`}>{passed}</p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}