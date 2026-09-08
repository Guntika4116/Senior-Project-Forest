import { useState } from "react";

export default function rpDetail() {
    const [open, setOpen] = useState(false);
    return (
        <div className="mt-4">
            <button
                onClick={() => setOpen(!open)}
                className={`p-4 bg-blue-400/10 flex gap-4 rounded-lg w-full items-center justify-between text-left
            ${open
                        ? "rounded-b-none"
                        : ""
                    }`}>
                <div>
                    <h2 className="text-zinc-800 text-sm font-semibold">เรย์และพาเรงคิมา</h2>
                    <p className="text-xs text-blue-600">(RAYS & PARENCHYMA)</p>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`size-4 text-zinc-800 transition-transform ${open ? "rotate-180" : ""}`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {open && (
                <div className="p-4 border border-zinc-300 border-t-0 rounded-b-lg">
                    <ul>
                        {/* เรย์ */}
                        <li className="text-blue-600 mb-2 list-disc ml-4">RAYS (เรย์)</li>
                        <h1 className="text-xs text-zinc-400">จำนวนของเส้นเรย์ (Rays per mm)</h1>
                        <h2 className="text-zinc-700">ปานกลาง (4 - 12 เส้น/มม.)</h2>

                        <hr className="border-zinc-200 my-2" />

                        <h1 className="text-xs text-zinc-400">ขนาดความกว้างของเส้นเรย์</h1>
                        <h2 className="text-zinc-700">เล็ก คือ ขนาดที่เห็นได้ด้วยแว่นขยาย</h2>

                        <hr className="border-zinc-200 my-2" />

                        <h1 className="text-xs text-zinc-400">เรย์มีสองขนาด / ลักษณะเรย์รวม / เป็นชั้นๆ</h1>
                        <h2 className="text-zinc-700">ไม่มี</h2>

                        {/* พาเรงคิมา */}
                        <li className="text-blue-600 mb-2 mt-6 list-disc ml-4">PARENCHYMA (พาเรงคิมา)</li>

                        <h1 className="text-xs text-zinc-400">ประเภทของพาเรงคิมา</h1>
                        <h2 className="text-zinc-700">พาเรงคิมาที่ติดต่อพอร์ ( Paratracheal axial parenchyma )</h2>

                        <hr className="border-zinc-200 my-2" />

                        <h1 className="text-xs text-zinc-400">พาเรงคิมาที่ติดต่อพอร์ (Paratracheal)</h1>
                        <h2 className="text-zinc-700">พาเรงคิมาแบบรอบพอร์ (Axial parenchyma vasicentric)</h2>

                        <hr className="border-zinc-200 my-2" />

                        <h1 className="text-xs text-zinc-400">พาเรงคิมาแบบไม่ติดต่อพอร์ (Apotracheal)</h1>
                        <h2 className="text-zinc-700">พาเรงคิมาแบบกระจาย (diffuse parenchyma)</h2>

                        <hr className="border-zinc-200 my-2" />

                        <h1 className="text-xs text-zinc-400">พาเรงคิมาแบบแถบ (Banded)</h1>
                        <h2 className="text-zinc-700">พาเรงคิมาแบบตาข่าย (Axial parenchyma reticulate)</h2>

                    </ul>
                </div>
            )}
        </div>
    );
}