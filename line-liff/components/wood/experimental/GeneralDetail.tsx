import { useState } from "react";

export default function generalD() {
   const [open, setOpen] = useState(false);
    return(
        <div className="mt-4">
          <button
            onClick={() => setOpen(!open)}
            className={`p-4 bg-emerald-200/40 flex gap-4 rounded-lg w-full items-center justify-between text-left grayscale-30
              ${open
                ? "rounded-b-none"
                : ""
              }`}>
            <div>
              <h2 className="text-zinc-800 text-sm font-semibold">ข้อมูลพื้นฐานและอัตลักษณ์</h2>
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
            {/* <div className="bg-white w-full h-4 border border-zinc-300"></div> */}
          </button>

          {open && (
            <div className="p-4 border border-zinc-300 border-t-0 rounded-b-lg">
              <h1 className="text-xs text-zinc-400">ชื่อสามัญ</h1>
              <h2 className="text-zinc-700">ยางพารา</h2>

              <hr className="border-zinc-200 my-2" />

              <h1 className="text-xs text-zinc-400">ชื่อวิทยาศาสตร์</h1>
              <h2 className="text-zinc-700">Hevea brasiliensis Müll.Arg.</h2>

              <hr className="border-zinc-200 my-2" />

              <h1 className="text-xs text-zinc-400">ถิ่นกำเนิดไม้ (Geographic distribution)</h1>
              <h2 className="text-zinc-700">Neotropics and temperate Brazil</h2>

              <hr className="border-zinc-200 my-2" />

              <h1 className="text-xs text-zinc-400">วงเจริญเติบโต (Growth rings)</h1>
              <h2 className="text-zinc-700">ไม่มีหรือเห็นไม่ชัดเจน</h2>

              <div className="w-full p-3 bg-emerald-200/30 mt-3 rounded-md border-2 border-dashed border-lime-600/40">
                <h1 className="text-zinc-700">รายละเอียดทั่วไป (Description)</h1>
                <p className="text-xs text-zinc-500">ไม้เศรษฐกิจสำคัญของไทย ใช้ผลิตน้ำยางธรรมชาติและไม้แปรรูปหลังหมดอายุการกรีด</p>
              </div>
            </div>
          )}
        </div>
    );
}