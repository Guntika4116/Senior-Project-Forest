export type Wood = {
  id: string;
  common_name: string;
  scientific_name: string;
  wood_taste: string | null;
  wood_odor: string | null;
  wood_texture: string | null;
  wood_weight: string | null;
  growth_rings: string | null;
  images: { url: string }[];
};

export type WoodFilters = Record<string, string>;

// แปลง filters object ให้เป็น query string สำหรับต่อท้าย URL
// ตัดค่า all ทิ้ง
function buildQueryParams(filters: WoodFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "all") {
      params.set(key, value);
    }
  });
  return params.toString();
}

// ดึงรายการไม้ทั้งหมด รองรับส่ง filters เข้ามากรองได้
export async function getWoods(filters: WoodFilters = {}): Promise<Wood[]> {
  const query = buildQueryParams(filters);
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/woods${query ? `?${query}` : ""}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("โหลดรายการพันธุ์ไม้ไม่สำเร็จ");
  }

  return res.json();
}

// ดึงไม้ 1 ชนิดตาม id
export async function getWoodById(id: string): Promise<Wood | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/woods/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("โหลดข้อมูลพันธุ์ไม้ไม่สำเร็จ");
  }

  return res.json();
}
