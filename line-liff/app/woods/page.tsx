"use client";

import { useState, useEffect } from "react";

import Filter from "@/components/Filter";
import Search from "@/components/Search";
import WoodCard from "@/components/wood/WoodCard";
import woodFilterData from "@/data/filterWoods.json";
import { getWoods, type Wood } from "@/lib/woods";
import woodDetail from "@/data/woodDetail.json";

// ตั้งค่าเริ่มต้นตัวกรองให้เป็น all
function getDefaultFilters(): Record<string, string> {
  const defaults: Record<string, string> = {};

  // วนดูข้อมูล
  woodFilterData.forEach(function (group) {
    defaults[group.key] = "all";
  });

  return defaults;
}

export default function Home() {
  //เก็บสถานะ Filter ว่าเปิดหรือปิด
  const [open, setOpen] = useState(false);

  // เก็บค่าที่ผู้ใช้เลือก (ยังไม่นำไปค้นหา)
  const [filters, setFilters] = useState<Record<string, string | null>>({});

  // ค่าที่กดนำไปใช้เรียก getWoods()
  // แยกจาก filters เพื่อไม่ให้ยิง fetch ทุกครั้งที่กดเลือกตัวเลือก (รอกดปุ่มนำไปใช้ก่อน)
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>(getDefaultFilters());

  // นับจำนวนตัวกรองที่เลือก โดยค่าต้องไม่ใช่ null, undefined และตัวเลือกทั้งหมด
  const activeCount = Object.values(filters).filter(
    (v) => v !== "all"
  ).length;

  // สร้าง object ใหม่ เอาค่าเดิมทั้งหมดมา แล้วเขียนทับเฉพาะตัวที่เปลี่ยน
  function filterChange(key: string, value: string | null) {
    setFilters(function (previousFilters) {
      return { ...previousFilters, [key]: value };
    });
  }

  function handleApply() {
    const nextFilters: Record<string, string> = getDefaultFilters();

    Object.entries(filters).forEach(([key, value]) => {
      nextFilters[key] = value ?? "all";
    });

    setAppliedFilters(nextFilters); // สั่งให้ useEffect ด้านล่างทำงาน (เพราะ appliedFilters เปลี่ยน)
    setOpen(false);
  }

  function handleReset() {
    const defaults = getDefaultFilters();
    setFilters(defaults);
    setAppliedFilters(defaults);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <main className="m-6">
      <div>
        <h1 className="text-emerald-700 text-3xl font-semibold">ฐานข้อมูลพันธุ์ไม้</h1>
        <p className="text-zinc-500">
          จัดการและสืบค้นข้อมูลโครงสร้างเนื้อไม้
        </p>
      </div>
      <div className="flex gap-4 mt-3">
        {/* กล่องค้นหา */}
        <Search />

        {/* ปุ่ม filter */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="relative w-fit h-11 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-5 cursor-pointer ${open ? "text-emerald-700" : "text-zinc-600"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>

          {/* แสดงจำนวนตัวกรองที่เลือก */}
          {activeCount > 0 && (
            <span className="absolute top-0 -right-2.5 h-5 w-5 flex items-center justify-center rounded-full bg-emerald-700 text-white text-xs">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* กล่องตัวกรอง กดแล้วเปิดเนื้อหา โดยใช้การซ่อนและโชว์ด้วย css*/}
      <div className={`overflow-hidden transition-all duration-300 ease-out 
        ${open
          ? "max-h-200 opacity-100"
          : "max-h-0 opacity-0"}`}>
        <Filter
          filters={filters}
          onSelect={filterChange}
          onApply={handleApply}
          onReset={handleReset}
          onClose={handleClose}
        />
      </div>

      {/* {open && 
      <Filter
          filters={filters}
          onSelect={filterChange}
          onApply={handleApply}
        />
      } */}

      {/* แสดงรายการไม้ */}
      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {woodDetail.map((wood) => (
            <WoodCard
              key={wood.id}
              id={wood.id}
              name={wood.name ?? ""}
              scientificName={wood.scientificName}
              imageUrl={wood.imageUrl?.[0] ?? ""}
              woodtype={wood.woodtype}
            />
          ))}
        </div>
      </div>
    </main>

  );
}
