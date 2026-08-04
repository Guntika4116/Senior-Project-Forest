import Link from "next/link";

type WoodCardProps = {
  id: string;
  name: string;
  scientificName: string;
  imageUrl?: string;
  woodtype: string;
};

export default function WoodCard({ 
    id, 
    name, 
    scientificName, 
    imageUrl, 
    woodtype,
}: WoodCardProps) 
{
    const bgImage = imageUrl;

    return (
        // ยัง link ไปแค่หน้า id เฉยๆ ยังไม่ได้ link ไปยังข้อมูลของแต่ละไม้
        <Link href={`/woods/id`} className="rounded-lg shadow-md w-full h-60 flex flex-col justify-end" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
            <div className="bg-white p-4 rounded-b-lg justify-between items-center">
                <h3 className="text-md font-semibold text-zinc-800">{name}</h3>
                <p className="text-sm text-zinc-400 italic">{scientificName}</p>
                <p className="bg-emerald-600 text-sm text-white px-2 py-1 rounded-2xl w-fit mt-1">{woodtype}</p>
            </div>
        </Link>
    )
}