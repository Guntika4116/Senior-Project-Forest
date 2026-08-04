"use client";

import { useState } from "react";
import WoodData from "@/data/filterWoods.json";

// กำหนดประเภทของตัวเลือก
type FilterOption = {
  label: string;
  value: string
};

// กำหนดประเภทของกลุ่มตัวกรอง
type FilterGroup = {
  key: string;
  label: string;
  options: FilterOption[]
};

const ALL_VALUE = "all";

// แถวตัวกรองแต่ละกลุ่ม
function FilterRowItem({
  label,
  options,
  selectedValue,
  onSelect,
}: {
  label: string;
  options: FilterOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}) {

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const visibleOptions = options.filter((opt) =>
    opt.label
      .toLocaleLowerCase()
      .includes(query.trim().toLocaleLowerCase())
  );

  const selectedOption =
    options.find((o) => o.value === selectedValue);

  return (
    <div className="border border-zinc-300 rounded-xl mb-2 ">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 text-left"
      >
        {/* หัวข้อตัวกรอง */}
        <div>
          <p className="text-sm text-zinc-500">
            {label}
          </p>
          <p className="text-sm font-medium text-emerald-700">
            {selectedOption?.label ?? "ทั้งหมด"}
          </p>
        </div>

        {/* Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-4 text-zinc-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* ถ้า open เป็น true ค่อยแสดงรายการตัวเลือก */}
      {open && (
        <div className="pb-3 px-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหา..."
            className="w-full h-9 px-3 mb-2 rounded-md border border-zinc-400 text-sm outline-none text-emerald-700 placeholder:text-zinc-400"
          />

          <button
            type="button"
            onClick={() => {
              onSelect(ALL_VALUE);
              setQuery("");
              setOpen(false);
            }}
            className={`px-3 py-1.5 rounded-full text-sm border ${selectedValue === ALL_VALUE
              ? "mb-1 py-2 w-full rounded-sm text-sm border bg-emerald-700 border-emerald-700 text-white"
              : "mb-1 py-2 w-full rounded-sm text-sm border border-zinc-200 text-zinc-600"
              }`}
          >
            ทั้งหมด
          </button>

          {visibleOptions.map((vsb) => {
            // เช็คว่าปุ่มนี้เลือกอยู่มั้ย
            const isSelected = vsb.value === selectedValue;

            return (
              <button
                key={vsb.value}
                type="button"
                onClick={() => {
                  onSelect(vsb.value);
                  setQuery("");
                  setOpen(false);
                }}
                className={
                  isSelected
                    ? "mb-1 py-2 w-full rounded-sm text-sm border bg-emerald-700 border-emerald-700 text-white"
                    : "mb-1 py-2 w-full rounded-sm text-sm border border-zinc-200 text-zinc-600"
                }
              >
                {vsb.label}
              </button>
            );
          })}

          {visibleOptions.length === 0 && (
            <p className="py-3 text-center text-sm text-zinc-400">
              ไม่พบข้อมูล
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// กล่องตัวกรอง
export default function FilterRow({
  filters,
  onSelect,
  onApply,
  onReset,
  onClose,
}: {
  filters: Record<string, string | null>;
  onSelect: (key: string, value: string | null) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const groups = WoodData as FilterGroup[];

  return (
    <div className="mt-2 border border-gray-300 rounded-lg">
      <div className="px-5 pt-4 flex justify-between">
        <h3 className="text-base font-semibold text-zinc-900">ตัวกรอง</h3>
        <button onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-5 mt-2">
        {groups.map((g) => (
          <FilterRowItem
            key={g.key}
            label={g.label}
            options={g.options}
            selectedValue={filters[g.key]}
            onSelect={(v) => onSelect(g.key, v)}
          />
        ))}
      </div>

      <div className="px-5 pb-4 flex gap-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2 rounded-lg bg-white border border-emerald-700 text-emerald-700 font-medium"
        >
          รีเซ็ท
        </button>
        <button
          type="button"
          onClick={onApply}
          className="w-full py-2 rounded-lg bg-emerald-700 text-white font-medium"
        >
          นำไปใช้
        </button>
      </div>
    </div>
  );
}