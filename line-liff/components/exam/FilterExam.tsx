"use client";

import { useState } from "react";

const ALL_TYPES = "ทั้งหมด";
const TYPE_OPTIONS = [ALL_TYPES, "ปรนัย", "อัตนัย"];

export default function ExamFilter({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-full">
            {/* ปุ่ม Filter */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between rounded-md border border-zinc-300 bg-white px-4 py-2 text-left text-sm"
            >
                <div>
                    <span className="text-zinc-500">ประเภท: </span>
                    <span className="text-emerald-700 font-medium">
                        {value}
                    </span>
                </div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-4 text-zinc-500 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                </svg>
            </button>

            {/* รายการตัวเลือก */}
            {open && (
                <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-zinc-300 bg-white p-1 shadow-lg">
                    {TYPE_OPTIONS.map((type) => {
                        const isSelected = value === type;

                        return (
                            <button
                                key={type}
                                type="button"
                                onClick={() => {
                                    onChange(type);
                                    setOpen(false);
                                }}
                                className={`w-full rounded-sm px-3 py-2 text-left text-sm transition-colors ${
                                    isSelected
                                        ? "bg-emerald-700 text-white"
                                        : "text-zinc-600 hover:bg-emerald-50 hover:text-emerald-700"
                                }`}
                            >
                                ประเภท: {type}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}