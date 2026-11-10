import { notFound } from "next/navigation";
import OverviewContent from "@/components/course/OverviewContent";
import { getDemoCourseById } from "@/lib/demo-courses";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  // อ่านรหัสจาก URL แล้วส่งข้อมูลกลางให้หน้า overview เดิม
  const { courseId } = await params;
  const course = getDemoCourseById(courseId);

  if (!course) {
    notFound();
  }

  return <OverviewContent course={course} />;
}
