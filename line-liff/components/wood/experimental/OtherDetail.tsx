import { useState } from "react";

export default function generalD() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className={`p-4 bg-purple-300/20 flex gap-4 rounded-lg w-full items-center justify-between text-left grayscale-30
              ${open
            ? "rounded-b-none"
            : ""
          }`}>
        <div>
          <h2 className="text-zinc-800 text-sm font-semibold">องค์ประกอบอื่นๆ</h2>
          <p className="text-xs text-purple-700">(OTHER FEATURES)</p>
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
          <h1 className="text-xs text-zinc-400">โฟลเอ็มในเนื้อไม้ (Included phloem)</h1>
          <h2 className="text-zinc-700">ไม่มี</h2>

          <hr className="border-zinc-200 my-2" />

          <h1 className="text-xs text-zinc-400">ท่อระหว่างเซลล์ (Intercellular canals)</h1>
          <h2 className="text-zinc-700">-</h2>
        </div>
      )}
    </div>
  );
}