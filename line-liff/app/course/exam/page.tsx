"use client";

import Navbar from "@/components/course/Navbar";
import Search from "@/components/Search";
import ExamCard from "@/components/exam/ExamCard";
import { useState, type ComponentProps } from "react";
import FilterExam from "@/components/exam/FilterExam";
import ExamFilter from "@/components/exam/FilterExam";

type ExamItem = ComponentProps<typeof ExamCard> & { id: string };

const EXAMS: ExamItem[] = [
    { id: "1", examtype: "ปรนัย", status: "ทำแล้ว", passed: "ผ่าน" },
    { id: "2", examtype: "ปรนัย", status: "ทำแล้ว", passed: "ไม่ผ่าน" },
    { id: "3", examtype: "เติมข้อมูลพรรณไม้", status: "ยังไม่ได้ทำ" },
];

const ALL_TYPES = "ทั้งหมด";
const TYPE_OPTIONS = [ALL_TYPES, "ปรนัย", "อัตนัย"];

export default function Exam() {
    const [typeFilter, setTypeFilter] = useState(ALL_TYPES);

    const visibleExams =
        typeFilter === ALL_TYPES
            ? EXAMS
            : EXAMS.filter((exam) => exam.examtype === typeFilter);

    return (
        <main>
            <Navbar />

            <div className="m-6 mb-26 flex flex-col gap-4">
                <div>
                    <h1 className="text-emerald-700 text-3xl font-semibold">การสอบ</h1>
                    <p className="text-zinc-500">
                        กรอกรหัสเพื่อเข้าสอบ และดูเฉพาะข้อสอบที่เผยแพร่
                    </p>
                </div>

                <div className="flex flex-col gap-1">
                    <Search placeholder="ค้นหาชื่อการสอบ..." />
                    <ExamFilter
                        value={typeFilter}
                        onChange={setTypeFilter}
                    />
                </div>

                {visibleExams.map(({ id, ...cardProps }) => (
                    <ExamCard key={id} {...cardProps} />
                ))}

                {visibleExams.length === 0 && (
                    <p className="text-sm text-zinc-500 text-center">ไม่พบข้อสอบ</p>
                )}
            </div>
        </main>
    );
}