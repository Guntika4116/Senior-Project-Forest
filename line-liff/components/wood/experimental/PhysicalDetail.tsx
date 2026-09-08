import { useState } from "react"

export default function physicalD() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className={`mt-4 p-4 bg-pink-600/10 flex gap-4 rounded-lg w-full items-center justify-between text-left
                        ${open
                        ? "rounded-b-none"
                        : ""
                    }`}>
                <div>
                    <h2 className="text-zinc-800 text-sm font-semibold">ลักษณะกายภาพ</h2>
                    <p className="text-xs text-pink-700">(PHYSICAL & SENSORY PROPERTIES)</p>
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
                    <h1 className="text-xs text-zinc-400">สีของแก่นไม้ (Heartwood color)</h1>
                    <h2 className="text-zinc-700">สีเหลืองหรือโทนสีเหลือง (Yellow or shades of yellow)</h2>

                    <hr className="border-zinc-200 my-2" />

                    <h1 className="text-xs text-zinc-400">ความแตกต่างของสีกระพี้และสีแก่นไม้</h1>
                    <h2 className="text-zinc-700">สีกระพี้เหมือนหรือใกล้เคียงกับสีแก่นไม้</h2>

                    <hr className="border-zinc-200 my-2" />

                    <h1 className="text-xs text-zinc-400">ความหยาบละเอียดของเนื้อไม้ (Texture)</h1>
                    <h2 className="text-zinc-700">เนื้อไม้หยาบปานกลาง (Medium texture)</h2>

                    <hr className="border-zinc-200 my-2" />

                    <h1 className="text-xs text-zinc-400">เสี้ยนเนื้อไม้ (Grain)</h1>
                    <h2 className="text-zinc-700">เสี้ยนตรง (Straight grain)</h2>

                    <hr className="border-zinc-200 my-2" />

                    <h1 className="text-xs text-zinc-400">ความมันวาว (Luster)</h1>
                    <h2 className="text-zinc-700">ด้าน (Dull)</h2>

                    <hr className="border-zinc-200 my-2" />

                    <h1 className="text-xs text-zinc-400">น้ำหนัก (Weight)</h1>
                    <h2 className="text-zinc-700">กลาง (น้ำหนัก 0.40 - 0.75)</h2>

                    <hr className="border-zinc-200 my-2" />

                    <h1 className="text-xs text-zinc-400">รส (Taste)</h1>
                    <h2 className="text-zinc-700">ไม่มีรส</h2>

                    <hr className="border-zinc-200 my-2" />

                    <h1 className="text-xs text-zinc-400">กลิ่น (Odor)</h1>
                    <h2 className="text-zinc-700">ไม่มีกลิ่น</h2>

                </div>
            )} 
        </div>
    );
}