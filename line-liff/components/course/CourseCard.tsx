import Link from "next/link";

type CourseCardProps = {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    registered: string;
    date: string;
    location: string;
};

export default function CourseCard({
    id,
    name,
    description,
    imageUrl,
    registered,
    date,
    location,
}: CourseCardProps) {
    const bgImage = imageUrl;

    return (
        // ยัง link ไปแค่หน้า id เฉยๆ ยังไม่ได้ link ไปยังข้อมูลของแต่ละไม้
        <Link href={`/course/enrollcourse`} className="rounded-lg shadow-md w-full h-90 flex flex-col justify-end" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
            <div className="relative bg-white p-4 rounded-b-lg justify-between items-center">
                <div className="absolute -top-30 right-4 flex items-center justify-center gap-2 bg-emerald-100 w-fit px-2 rounded-full py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className="text-sm ">เปิดรับสมัคร</p>
                </div>
                <h3 className="text-lg font-semibold text-emerald-700">{name}</h3>
                <p className="text-sm text-zinc-400">{description}</p>
                <div className="p-2 flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 bg-emerald-300/20 text-emerald-700 rounded-lg px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                        <p className="text-md text-zinc-600">{registered} คนลงทะเบียน</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 bg-emerald-300/20 text-emerald-700 rounded-lg px-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        <p className="text-md text-zinc-600">{date}</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 bg-emerald-300/20 text-emerald-700 rounded-lg px-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <p className="text-md text-zinc-600">{location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}