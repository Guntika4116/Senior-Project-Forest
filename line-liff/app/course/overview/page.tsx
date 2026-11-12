import Link from "next/link";
import { notFound } from "next/navigation";
import OverviewContent from "@/components/course/OverviewContent";
import { demoCourses } from "@/lib/demo-courses";

// เส้นทางเดิมรับ ?courseId=demo-3 และใช้หน้าตาเดียวกับทางเข้า LIFF
export default async function OverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ courseId?: string | string[] }>;
}) {
  const { courseId } = await searchParams;
  // ไม่เลือกคอร์สแรกให้อัตโนมัติ เพื่อไม่แสดงข้อมูลผิดคอร์ส
  if (typeof courseId !== "string" || !courseId) {
    return (
      <main className="p-6">
        <p>กรุณาเลือกคอร์สที่ต้องการเรียน</p>
        <Link href="/woods/courses" className="mt-3 inline-block text-emerald-700">
          ไปหน้าคอร์สทั้งหมด
        </Link>
      </main>
    );
  }
  const course = demoCourses.find((item) => item.id === courseId);
  if (!course) notFound();
  return <OverviewContent course={course} />;
}
