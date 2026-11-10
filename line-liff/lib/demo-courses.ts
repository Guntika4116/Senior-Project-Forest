export type Course = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  date: string;
  location: string;
};

// ข้อมูลสมมติสำหรับเดโม่ ยังไม่ใช่รายการลงทะเบียนของผู้เรียน
export const demoCourses: Course[] = [
  {
    id: "demo-3",
    name: "อบรมพันธุ์ไม้ครั้งที่ 3",
    description:
      "ปูพื้นฐานโครงสร้างเนื้อไม้และการจำแนกชนิดไม้ด้วยตาเปล่าและแว่นขยาย ฝึกสังเกตสี เสี้ยน และลวดลายจากตัวอย่างไม้",
    imageUrl:
      "https://png.pngtree.com/thumb_back/fw800/background/20240625/pngtree-tree-planting-growth-love-of-nature-image_15824708.jpg",
    date: "08 เม.ย. 2570 - 10 เม.ย. 2570",
    location: "ห้องปฏิบัติการเนื้อไม้ อาคารฝึกอบรม ชั้น 3",
  },
  {
    id: "demo-4",
    name: "เทคนิคตรวจพิสูจน์ชนิดไม้ด้วยกล้องจุลทรรศน์",
    description:
      "ฝึกเตรียมชิ้นตัวอย่างและสังเกตลักษณะทางกายวิภาคของเนื้อไม้ เปรียบเทียบโครงสร้างกับตัวอย่างอ้างอิงเพื่อประกอบการระบุชนิดไม้",
    imageUrl:
      "https://png.pngtree.com/thumb_back/fw800/background/20240625/pngtree-tree-planting-growth-love-of-nature-image_15824708.jpg",
    date: "22 เม.ย. 2570 - 24 เม.ย. 2570",
    location: "ห้องจุลทรรศน์ อาคารวิทยาศาสตร์ป่าไม้ ชั้น 2",
  },
  {
    id: "demo-5",
    name: "ปฏิบัติการตรวจพิสูจน์ไม้ภาคสนาม",
    description:
      "จำลองสถานการณ์ตรวจรับไม้ ฝึกบันทึกลักษณะ เก็บและติดรหัสตัวอย่าง พร้อมจัดทำรายงานผลตรวจพิสูจน์เบื้องต้นอย่างเป็นขั้นตอน",
    imageUrl:
      "https://png.pngtree.com/thumb_back/fw800/background/20240625/pngtree-tree-planting-growth-love-of-nature-image_15824708.jpg",
    date: "06 พ.ค. 2570 - 08 พ.ค. 2570",
    location: "ศูนย์ฝึกภาคสนามและลานตรวจตัวอย่างไม้",
  },
];

// ใช้ค้นหาคอร์สสำหรับหน้ารายละเอียด
export function getDemoCourseById(id: string): Course | undefined {
  return demoCourses.find((course) => course.id === id);
}