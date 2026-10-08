"use client";

import BackNav from "@/components/BackNav";
import Navbar from "@/components/course/Navbar";
import Search from "@/components/Search";
import ExamCard from "@/components/exam/ExamCard";
import { useState } from "react";

export default function Exam() {
    const [value, setValue] = useState("");

    return (
        <main>
            <BackNav />
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
                    <select
                        id="course"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="text-sm w-full border border-zinc-300 rounded-md m-1 px-4 py-2 bg-white focus:outline-none focus:ring focus:ring-emerald-700 text-emerald-700"
                    >
                        <option value="ทั้งหมด">ประเภท: ทั้งหมด</option>
                        <option value="ปรนัย">ประเภท: ปรนัย</option>
                        <option value="อัตนัย">ประเภท: อัตนัย</option>
                    </select>
                </div>

                <ExamCard
                    examtype="ปรนัย"
                    status="ทำแล้ว"
                    passed="ผ่าน"
                />
                <ExamCard 
                    examtype="ปรนัย" 
                    status="ทำแล้ว" 
                    passed="ไม่ผ่าน" />

                <ExamCard 
                    examtype="เติมข้อมูลพรรณไม้" 
                    status="ยังไม่ได้ทำ" />
            </div>
        </main>
    );
}