export default function ExamFillAnswer() {

    const question = {
        1: {
            question: `ตัวอย่างไม้ปริศนาหมายเลข 1 (คำใบ้: มีลักษณะพอร์วงแหวนชัดเจน)`,
        },
    };


    return (
        <div className="flex flex-col gap-2 p-4 rounded-lg border border-zinc-300">
            <div className="flex gap-2">
                <h1 className="text-emerald-700 bg-zinc-200 w-fit h-fit rounded-full px-3 py-1">1</h1>
                <h1 className="text-emerald-700">{question[1].question}</h1>
            </div>
            <form action="">
                <input type="text" placeholder="พิมพ์คำตอบ..." className="border border-zinc-300 w-full rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-emerald-700" />
            </form>
            <p className="text-end text-sm text-emerald-700">1 คะแนน</p>
        </div>
    );
}