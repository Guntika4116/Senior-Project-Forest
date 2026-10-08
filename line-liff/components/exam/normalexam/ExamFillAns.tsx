
export type FillQuestion = {
    id: number;
    question: string;
    answer: string[]; // รับได้หลายคำตอบ
    score: number;
};

type ExamFillAnswerProps = {
    no: number;
    value: string;
    onChange: (text: string) => void;
};

export const questionsfill: FillQuestion[] = [
    {
        id: 1,
        question:
            "ลักษณะเด่นทางกายวิภาคในข้อใด ที่ใช้เป็นจุดสังเกตสำคัญที่สุดในการระบุว่าไม้ชิ้นนั้นคือ “ไม้สัก” (Teak)?",
        answer: [],
        score: 1,
    },
    {
        id: 2,
        question:
            "หากผู้เข้าอบรมใช้แว่นขยายส่องดูหน้าตัดไม้ แล้วพบโครงสร้างของ “พาเรงคิมา” มีลักษณะล้อมรอบพอร์เป็นรูปดวงตาหรือปีกนก (Aliform) อย่างชัดเจน ตัวอย่างไม้ปริศนานี้มีแนวโน้มที่จะเป็นไม้ชนิดใดมากที่สุด?",
        answer: [],
        score: 1,
    },
];

export default function ExamFillAnswer({ no, value, onChange }: ExamFillAnswerProps) {
    const q = questionsfill.find((item) => item.id === no);
    if (!q) return null;

    const text = value !== undefined;

    return (
        <div className="flex flex-col gap-2 p-4 rounded-lg border border-zinc-300">
            <div className="flex gap-2">
                <h1 className="text-emerald-700 bg-zinc-200 w-fit h-fit rounded-full px-3 py-1">{no}</h1>
                <h1 className="text-emerald-700">{q.question}</h1>
            </div>
            <form action="">
                <input
                    type="text"
                    name={`question-${no}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="พิมพ์คำตอบ..."
                    className="border border-zinc-300 w-full rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-emerald-700" />
            </form>
            <p className="text-end text-sm text-emerald-700">{q.score} คะแนน</p>
        </div>
    );
}