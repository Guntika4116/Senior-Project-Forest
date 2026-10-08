import { useState } from "react";

type Question = {
    id: number;
    question: string;
    choice: string[];
    answer: number;
    score: number;
};

export const questions: Question[] = [
    {
        id: 1,
        question: "ลักษณะเด่นทางกายวิภาคในข้อใด ที่ใช้เป็นจุดสังเกตสำคัญที่สุดในการระบุว่าไม้ชิ้นนั้นคือ “ไม้สัก” (Teak)?",
        choice: [
            "มีพาเรงคิมาแบบปีกนก (Aliform parenchyma) ชัดเจน",
            "เป็นไม้พอร์วงแหวน (Ring-porous) ที่เห็นวงปีชัดเจน",
            "มีท่อชันแนวดิ่ง (Axial resin canals) แทรกอยู่ในเนื้อไม้",
            "มีริ้วลายหรือชั้น (Ripple marks) ปรากฏบนเส้นเรย์",
        ],
        answer: 1,
        score: 1,
    },
    {
        id: 2,
        question: `หากผู้เข้าอบรมใช้แว่นขยายส่องดู
            หน้าตัดไม้ แล้วพบโครงสร้างของ “พาเรงคิมา” มีลักษณะล้อมรอบพอร์
            เป็นรูปดวงตาหรือปีกนก (Aliform) อย่างชัดเจน ตัวอย่างไม้ปริศนานี้มี แนวโน้มที่จะเป็นไม้ชนิดใดมากที่สุด?`,
        choice: [
            "ไม้ยางพารา (Rubberwood)",
            "ไม้ยางนา (Yang)",
            "ไม้สัก (Teak)",
            "ไม้มะค่าโมง (Makha Mong)",
        ],
        answer: 3,
        score: 1,
    },
];

type ExamChoiceProps = {
    no?: number;
    value?: number | null;
    onChange?: (index: number) => void;
};

export default function ExamChoice({ no , value, onChange }: ExamChoiceProps) {
    const [inner, setInner] = useState<number | null>(null);
    const q = questions.find((item) => item.id === no);
    if (!q) return null;

    const selected = value !== undefined ? value : inner;
    const handleSelect = (index: number) => {
        setInner(index);
        onChange?.(index);
    };

    return (
        <div className="flex flex-col gap-2 p-4 rounded-lg border border-zinc-300">
            <div className="flex gap-2">
                <h1 className="text-emerald-700 bg-zinc-200 w-fit h-fit rounded-full px-3 py-1">{no}</h1>
                <h1 className="text-emerald-700">{q.question}</h1>
            </div>
            {q.choice.map((text, index) => {
                const isSelected = selected === index;
                return (
                    <label
                        key={index}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors 
                            ${isSelected
                                ? "border-emerald-600 bg-emerald-500/10 text-zinc-800"
                                : "border-zinc-300 text-zinc-700"
                            }`}
                    >
                        <input
                            type="radio"
                            name={`question-${no}`}
                            checked={isSelected}
                            onChange={() => handleSelect(index)}
                            className="w-5 h-5 shrink-0 accent-emerald-600"
                        />
                        <span>{text}</span>
                    </label>
                );
            })}
            <p className="text-end text-sm text-emerald-700">{q.score} คะแนน</p>
        </div>
    );
}