"use client";

import { useState } from "react";

type Item = {
  label: string;
  value: string;
};

type Group = {
  heading: string;
  items: Item[]
};

type Props = {
  type?: "general" | "physical" | "pore" | "rp" | "description" | "other";
  title: string;
  subtitle?: string;
  color: string;
  subtitlecolor: string;
  // ใช้อย่างใดอย่างหนึ่ง items (list เดียว) หรือ groups (มี sub-header)
  items?: Item[];
  groups?: Group[];
  description?: string;
};

// เนื้อหาใน section
function ItemList({ items = [] }: { items?: Item[] }) {
  return (
    <>
      {items.map((item, index) => (
        <div key={index}>
          <p className="text-xs text-zinc-400">{item.label}</p>
          <p className="text-zinc-700">{item.value}</p>
          {index !== items.length - 1 && <hr className="my-2 border-zinc-200" />}
        </div>
      ))}
    </>
  );
}

export default function DetailAccordion({
  type = "other",
  title,
  subtitle,
  color,
  subtitlecolor = "text-zinc-400",
  items,
  groups,
  description
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`p-4 rounded-lg w-full flex justify-between items-center text-left
        ${color}
        ${open ? "rounded-b-none" : ""}`}
      >
        <div>
          <h2 className="font-semibold text-sm">{title}</h2>

          {subtitle && (
            <p className={`text-xs mt-1 ${subtitlecolor}`}>
              ({subtitle})
            </p>
          )}
        </div>

        <svg
          className={`size-4 transition ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {open && (
        <div className="p-4 border border-zinc-300 border-t-0 rounded-b-lg">
          {/* ใช้กับ Ray และ Parenchyma */}
          {groups &&
            groups.map((group, groupIndex) => (
              <ul key={group.heading} className={groupIndex > 0 ? "mt-4" : ""}>
                <li className="text-blue-600 list-disc ml-4 text-sm font-semibold mb-2">{group.heading}</li>
                <ItemList items={group.items} />
              </ul>
            ))}

          {/* ใช้กับ general physical pore other */}
          {items && <ItemList items={items} />}

          {/* ถ้าเป็น section general ให้สร้างกล่อง */}
          {type === "general" && description && (
            <div className="w-full p-3 bg-emerald-200/30 mt-3 rounded-md border-2 border-dashed border-lime-600/40">
              <p className="text-zinc-700 font-medium">รายละเอียดทั่วไป (Description)</p>
              <p className="text-xs text-zinc-500">{description}</p>
            </div>
          )}
        </div>
      )}
    </div >
  );
}