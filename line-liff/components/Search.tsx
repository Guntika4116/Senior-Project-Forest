export default function Search() {
    return (
        <div className="relative flex-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
            </svg>
            <input
                type="text"
                placeholder="ค้นหาชื่อพันธุ์ไม้ (ชื่อสามัญ / วิทยาศาสตร์)"
                className="w-full h-11 border border-gray-300 rounded-lg ml-1 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
        </div>
    )
}