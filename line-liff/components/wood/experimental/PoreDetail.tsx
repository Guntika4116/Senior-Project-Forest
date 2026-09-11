import { useState } from "react";

export default function poreD() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className={`p-4 bg-orange-400/10 flex gap-4 rounded-lg w-full items-center justify-between text-left  
        ${open
          ? "rounded-b-none"
          : ""
        }`}>
      <div>
        <h2 className="text-zinc-800 text-sm font-semibold">โครงสร้างเนื้อไม้</h2>
        <p className="text-xs text-orange-500">(PORES / VESSELS STRUCTURE)</p>
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

      {
    open && (
      <div className="p-4 border border-zinc-300 border-t-0 rounded-b-lg">
        <h1 className="text-xs text-zinc-400">การกระจายของพอร์ (Porosity)</h1>
        <h2 className="text-zinc-700">ไม้พอร์กระจาย (Diffuse-porous wood)</h2>

        <hr className="border-zinc-200 my-2" />

        <h1 className="text-xs text-zinc-400">กลุ่มของพอร์ (Vessel grouping)</h1>
        <h2 className="text-zinc-700">พอร์เดี่ยว</h2>

        <hr className="border-zinc-200 my-2" />

        <h1 className="text-xs text-zinc-400">การเรียงตัวของพอร์ (Vessel arrangement)</h1>
        <h2 className="text-zinc-700">-</h2>

        <hr className="border-zinc-200 my-2" />

        <h1 className="text-xs text-zinc-400">จำนวนของพอร์ (Pores frequency)</h1>
        <h2 className="text-zinc-700">หนาแน่นน้อยมาก ( ≤ 5 vessels per squaremillimeter )</h2>

        <hr className="border-zinc-200 my-2" />

        <h1 className="text-xs text-zinc-400">ขนาดความโตของพอร์ (Pores size)</h1>
        <h2 className="text-zinc-700">พอร์ขนาดกลาง ขนาดที่พอเห็นได้</h2>

        <hr className="border-zinc-200 my-2" />

        <h1 className="text-xs text-zinc-400">สิ่งที่อยู่ในพอร์ (Inclusions in pores)</h1>
        <h2 className="text-zinc-700">ไทโลส ( Tyloses )</h2>

        <hr className="border-zinc-200 my-2" />

        <h1 className="text-xs text-zinc-400">สัดส่วนเรย์กับพอร์</h1>
        <h2 className="text-zinc-700">เรย์มีขนาดเล็กกว่าขนาดความกว้างของพอร์</h2>
      </div>
    )
  }
    </div >
  );
}