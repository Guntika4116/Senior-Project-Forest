export type ExamScore = {
  id: string;
  name: string;
  score: number | null; // null = ยังไม่ได้ทำ ไม่ใช่คะแนน 0
  maxScore: number;
};

export type CourseScore = {
  courseId: string;
  passPercent: number;
  exams: ExamScore[];
};

// ข้อมูลสมมติสำหรับเดโม่ ยังไม่ใช่คะแนนของผู้ใช้จริง
// courseId ต้องตรงกับ id ใน demo-courses.ts
export const demoScores: CourseScore[] = [
  {
    courseId: "demo-3",
    passPercent: 80,
    exams: [
      {
        id: "exam-3-1",
        name: "โครงสร้างและลักษณะเนื้อไม้",
        score: 10,
        maxScore: 10,
      },
      {
        id: "exam-3-2",
        name: "การจำแนกชนิดไม้เบื้องต้น",
        score: 10,
        maxScore: 10,
      },
    ],
  },
  {
    courseId: "demo-4",
    passPercent: 80,
    exams: [
      {
        id: "exam-4-1",
        name: "การเตรียมชิ้นตัวอย่าง",
        score: 7,
        maxScore: 10,
      },
      {
        id: "exam-4-2",
        name: "การอ่านลักษณะทางกายวิภาค",
        score: 6,
        maxScore: 10,
      },
    ],
  },
  {
    courseId: "demo-5",
    passPercent: 80,
    exams: [
      {
        id: "exam-5-1",
        name: "การเก็บและติดรหัสตัวอย่าง",
        score: 8,
        maxScore: 10,
      },
      {
        id: "exam-5-2",
        name: "การจัดทำรายงานตรวจพิสูจน์",
        score: null,
        maxScore: 10,
      },
    ],
  },
];

// คำนวณครั้งเดียวด้วยกติกาเดียวกัน ทั้ง LINE และหน้าเว็บ
export function getScoreSummary(courseScore: CourseScore) {
  const { exams, passPercent } = courseScore;

  const totalScore = exams.reduce(
    (sum, exam) => sum + (exam.score ?? 0),
    0,
  );

  const maxScore = exams.reduce(
    (sum, exam) => sum + exam.maxScore,
    0,
  );

  const completedCount = exams.filter(
    (exam) => exam.score !== null,
  ).length;

  const examCount = exams.length;
  const percent = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  // เดโม่กำหนดว่าต้องทำครบทุกชุดก่อนตัดสินผ่านหรือไม่ผ่าน
  let status: "ยังไม่ได้สอบ" | "ยังสอบไม่ครบ" | "ผ่านเกณฑ์" | "ไม่ผ่านเกณฑ์";

  if (completedCount === 0) {
    status = "ยังไม่ได้สอบ";
  } else if (completedCount < examCount) {
    status = "ยังสอบไม่ครบ";
  } else {
    status = percent >= passPercent ? "ผ่านเกณฑ์" : "ไม่ผ่านเกณฑ์";
  }

  return {
    totalScore,
    maxScore,
    completedCount,
    examCount,
    percent,
    status,
    passPercent,
  };
}

export function getDemoScoreByCourseId(courseId: string) {
  return demoScores.find((score) => score.courseId === courseId);
}