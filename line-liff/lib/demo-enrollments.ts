// รายการคอร์สที่บัญชีเดโม่ลงทะเบียนไว้ตั้งแต่เริ่มต้น
// ไม่ใส่ demo-3 เพราะต้องให้ผู้ใช้กรอกรหัสลงทะเบียนก่อน
export const initialDemoEnrolledCourseIds: readonly string[] = [
  "demo-4",
  "demo-5",
];

// ตรวจสอบสถานะเริ่มต้นของคอร์สในเดโม่
export function isInitiallyEnrolled(courseId: string): boolean {
  return initialDemoEnrolledCourseIds.includes(courseId);
}