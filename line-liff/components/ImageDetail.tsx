"use client";

import { useState, useRef } from "react";

export default function ImageDetail({ images }: { images: { url: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // ไม่มีรูปไม่ต้องแสดงอะไร
  if (images.length === 0) {
    return null;
  }

  // ทำงานทุกครั้งที่ผู้ใช้เลื่อน container
  function handleScroll() {
    const container = containerRef.current;
    if (!container) return;

    // scrollLeft เลื่อนไปแล้วเท่าไหร่
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    setActiveIndex(index);
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory rounded-2xl"
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`รูปที่ ${index + 1}`}
            className="shrink-0 w-full h-56 object-cover snap-center"
          />
        ))}
      </div>

      {/* บอกตำแหน่ง แสดงเฉพาะตอนมีมากกว่า 1 รูป */}
      {images.length > 1 && (
        <div className="absolute z-10 top-3 right-3">
          <p className="w-fit bg-white/80 p-2 rounded-full">{activeIndex + 1}/{images.length}</p>
        </div>
      )}
    </div>
  );
}