"use client"

import { useRouter } from "next/navigation";

import Link from "next/link";

export default function back({ onBack }: { onBack?: () => void } = {}) {
    const router = useRouter();
    return (

        <div className="sticky top-0 z-20 bg-white w-full p-4 shadow-md flex flex-col gap-3">
            <div className="flex justify-between">
                <Link
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (onBack) {
                            onBack();
                        } else {
                            router.back();
                        }
                    }}
                    className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6 text-emerald-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <p className="text-emerald-700">กลับ</p>
                </Link>
                <div className="flex gap-1 items-center bg-emerald-700/15 px-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-emerald-700">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className="text-emerald-700 text-sm">01:30:00</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-zinc-600 flex justify-between text-sm">
                    <p>ความคืบหน้า</p>
                    <p>0/2 ข้อ</p>
                </div>
                <p className="bg-zinc-500 w-full p-1 rounded-full"></p>
            </div>
        </div>
    )

}