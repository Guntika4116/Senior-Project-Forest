import Link from "next/link";

type WoodCardProps = {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    registered: string;
    date: string;
    location: string;
    linkurl: string;
};

export default function WoodCard({
    id,
    name,
    description,
    imageUrl,
    registered,
    date,
    location,
    linkurl
}: WoodCardProps) {
    const bgImage = imageUrl;

    return (
        // ยัง link ไปแค่หน้า id เฉยๆ ยังไม่ได้ link ไปยังข้อมูลของแต่ละไม้
        <Link href={`/course/id`} className="rounded-lg shadow-md w-full h-90 flex flex-col justify-end" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
            <div className="relative bg-white p-4 rounded-b-lg justify-between items-center">
                <div className="absolute -top-33 right-4 flex items-center justify-center gap-2 bg-emerald-100 w-fit px-2 rounded-full">
                    <p>p</p>
                    <p className="text-sm ">เปิดรับสมัคร</p>
                </div>
                <h3 className="text-lg font-semibold text-emerald-700">{name}</h3>
                <p className="text-sm text-zinc-400">{description}</p>
                <div className="p-2 flex flex-col gap-3">
                    <div className="flex gap-2">
                        <p className="bg-emerald-300/40 text-emerald-700 rounded-full px-2">p</p>
                        <p className="text-md text-zinc-600">{registered} คนลงทะเบียน</p>
                    </div>
                    <div className="flex gap-2">
                        <p className="bg-emerald-300/40 text-emerald-700 rounded-full px-2">p</p>
                        <p className="text-md text-zinc-600">{date}</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <p className="bg-emerald-300/40 text-emerald-700 rounded-full px-2">p</p>
                            <p className="text-md text-zinc-600">{location}</p>
                        </div>
                        <p className="text-sm items-center justify-center border border-zinc-300 rounded-full px-2">เปิดในแผนที่</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}