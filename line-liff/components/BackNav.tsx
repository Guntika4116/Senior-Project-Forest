"use client"

import { useRouter } from "next/navigation";

import Link from "next/link";

export default function back() {
  const router = useRouter();
  return (

    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
      className="flex gap-2 sticky top-0 z-20 bg-white w-full p-4 shadow-md"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6 text-emerald-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
      <p className="text-emerald-700">กลับ</p>
    </Link>
  )

}