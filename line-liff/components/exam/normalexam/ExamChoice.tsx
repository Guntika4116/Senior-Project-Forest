export default function ExamChoice() {

    const question = {
        1: {
            question: `ลักษณะเด่นทางกายวิภาคในข้อใด ที่ใช้เป็นจุดสังเกตสำคัญที่สุดในการ
ระบุว่าไม้ชิ้นนั้นคือ “ไม่สัก” (Teak)?`,
            choice: [
                "มีพาเรงคิมาแบบปีกนก (Aliform parenchyma) ชัดเจน",
                "เป็นไม้พอร์วงแหวน (Ring-porous) ที่เห็นวงปีชัดเจน",
                "มีท่อชันแนวดิ่ง (Axial resin canals) แทรกอยู่ในเนื้อไม้",
                "มีริ้วลายหรือชั้น (Ripple marks) ปรากฏบนเส้นเรย์",
            ]
        },
    };


    return (
        <div className="flex flex-col gap-2 p-4 rounded-lg border border-zinc-300">
            <div className="flex gap-2">
                <h1 className="text-emerald-700 bg-zinc-200 w-fit h-fit rounded-full px-3 py-1">1</h1>
                <h1 className="text-emerald-700">{question[1].question}</h1>
            </div>
            <div className="px-3 py-2 rounded-lg border border-zinc-300 text-zinc-700">
                มีพาเรงคิมาแบบปีกนก (Aliform parenchyma) ชัดเจน
            </div>
            <p className="text-end text-sm text-emerald-700">1 คะแนน</p>
        </div>
    );
}