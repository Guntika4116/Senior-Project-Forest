import BackNav from "@/components/BackNav";
import DetailAccordion from "@/components/wood/DetailAccordion";
import ImageDetail from "@/components/ImageDetail";
import woodDetail from "@/data/woodDetail.json"

type DetailItem = { label: string; value: string };

type WoodDetail = {
  id: string;
  commonname: string;
  distribution: string;
  scientificname: string;
  imageUrl: string[];

  general: {
    items: DetailItem[];
    description: DetailItem[];
  };
  physical: DetailItem[];
  pore: DetailItem[];
  rp: {
    ray: DetailItem[];
    parenchyma: DetailItem[];
  };
  other: DetailItem[];
};

const woods = woodDetail as unknown as WoodDetail[];

export default async function page() {
  // ตอนนี้ข้อมูลยังเป็น static จะดึงข้อมูลมาแค่ยางพารา
  const wood = woods[1];
  // รับหลายรูป
  const images = wood.imageUrl.map((url) => ({ url }));
  const descriptionText = wood.general.description[1]?.value;

  return (
    <main>
      <BackNav />

      <div className="m-6">
        <div className="text-center">
          <h1 className="text-emerald-700 text-3xl font-semibold">{wood.commonname}</h1>
          <p className="text-zinc-500 italic text-sm mb-1">
            {wood.scientificname}
          </p>
        </div>

        {/* รูปภาพ */}
        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtKTvfsKOMOAlifUI2snrZ_5rx_bmC4iT17d8OI7SCOLea0AOv44lH8M4&s=10" alt="ยางพารา" className="w-full h-60 object-cover rounded-lg mt-4" /> */}
        <ImageDetail images={images} />

        {/* ถิ่นกำเนิด */}
        <div className="mt-4 p-4 bg-emerald-700/90 flex gap-4 rounded-lg">
          <div className="flex gap-2 items-center mb-2 bg-emerald-500/40 h-fit p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>

          <div>
            <h2 className="text-white text-sm font-semibold mb-2">ถิ่นกำเนิดไม้ (Geographic distribution)</h2>
            <p className="text-zinc-300 font-light text-sm">
              {wood.distribution}
            </p>
          </div>
        </div>

        <DetailAccordion
          type="general"
          title="ข้อมูลพื้นฐานและอัตลักษณ์"
          subtitle=""
          color="bg-emerald-200/40"
          subtitlecolor=""
          items={wood.general.items}
          description={descriptionText}
        />

        <DetailAccordion
          type="physical"
          title="ลักษณะกายภาพ"
          subtitle="PHYSICAL & SENSORY PROPERTIES"
          color="bg-pink-600/10"
          subtitlecolor="text-pink-700"
          items={wood.physical}
        />

        <DetailAccordion
          type="pore"
          title="โครงสร้างเนื้อไม้"
          subtitle="PORES / VESSELS STRUCTURE"
          color="bg-orange-400/10"
          subtitlecolor="text-orange-500"
          items={wood.pore}
        />

        <DetailAccordion
          type="rp"
          title="เรย์และพาเรงคิมา"
          subtitle="RAYS & PARENCHYMA"
          color="bg-blue-400/10"
          subtitlecolor="text-blue-600"
          groups={[
            { heading: "RAYS (เรย์)", items: wood.rp.ray },
            { heading: "PARENCHYMA (พาเรงคิมา)", items: wood.rp.parenchyma }
          ]}
        />

        <DetailAccordion
          type="other"
          title="องค์ประกอบอื่นๆ"
          subtitle="OTHER FEATURES"
          color="bg-purple-300/20"
          subtitlecolor="text-purple-700"
          items={wood.other}
        />
      </div>
    </main>
  )
}