import Link from "next/link";

type WoodCardProps = {
  id: string;
  name: string;
  scientificName: string;
  imageUrl: string;
  woodtype?: string;
};

export default function WoodCard({ id, name, scientificName, imageUrl, woodtype }: WoodCardProps) {
    const bgImage = imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtKTvfsKOMOAlifUI2snrZ_5rx_bmC4iT17d8OI7SCOLea0AOv44lH8M4&s=10';
    return (
        <Link href={`/woods/${id}`} className="rounded-lg shadow-md w-full h-60 flex flex-col justify-end" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
            <div className="bg-white p-4 rounded-b-lg justify-between items-center">
                <h3 className="text-md font-semibold text-zinc-800">{name}</h3>
                <p className="text-sm text-zinc-400 italic">{scientificName}</p>
                {woodtype && <p className="bg-emerald-600 text-sm text-white px-2 py-1 rounded-2xl w-fit mt-1">{woodtype}</p>}

            </div>
        </Link>
    )
}

// export default function WoodCard({ id, name, scientificName, imageUrl, woodtype }: WoodCardProps) {
//     return (
//         <Link href={`/woods/${id}`} className="bg-[url(${imageUrl})] bg-cover rounded-lg shadow-md w-full h-60 flex flex-col justify-end">
//             <div className="bg-white p-4 rounded-b-lg justify-between items-center">
//                 <h3 className="text-md font-semibold text-zinc-800">{name}</h3>
//                 <p className="text-sm text-zinc-400 italic">{scientificName}</p>
//                 <p className="bg-emerald-600 text-sm text-white px-2 py-1 rounded-2xl w-fit mt-1">{woodtype}</p>

//             </div>
//         </Link>
//     )
// }