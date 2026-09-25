"use client";

import { useState, useEffect } from "react";

import Search from "@/components/Search";
import WoodCard from "@/components/wood/WoodCard";
import woodDetail from "@/data/woodDetail.json";

export default function Course() {
  return (
    <main className="m-6">
      <div>
        <h1 className="text-emerald-700 text-3xl font-semibold">อบรมทั้งหมด</h1>
        <p className="text-zinc-500">
          จัดการและค้นหาอบรมในระบบ
        </p>
      </div>
      <div className="flex gap-4 mt-3">
        {/* กล่องค้นหา */}
        <Search />
      </div>

      {/* แสดงรายการไม้ */}
      <div className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {woodDetail.map((wood) => (
            <WoodCard
              key={wood.id}
              id={wood.id}
              name={wood.commonname ?? ""}
              scientificName={wood.scientificname}
              imageUrl={wood.imageUrl?.[0] ?? ""}
              woodtype={wood.woodtype}
            />
          ))}
        </div>
      </div>
    </main>

  );
}
