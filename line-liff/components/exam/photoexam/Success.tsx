import type { OmrExam, OmrResult } from "@/lib/omr";

export default function SuccessStep({ exam, result, onRestart }: {
  exam: OmrExam;
  result: OmrResult;
  onRestart: () => void;
}) {
  return (
    <div className="p-6 flex flex-col items-center gap-4 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-emerald-700 text-2xl font-bold">ส่งคำตอบสำเร็จ</h1>
        <p className="text-gray-500">
          กรุณาตรวจคำตอบที่ระบบอ่าน
        </p></div>
      <div className="border border-gray-300 rounded-lg p-5 w-full max-w-sm flex flex-col gap-2 items-start">
        <h2 className="font-semibold text-emerald-700 text-xl">{exam.name}</h2>
        <p className="text-sm text-gray-500">รายละเอียดการสอบ</p>
        <p className="text-gray-600 pt-4">รหัสผู้สอบ: 07</p>
      </div>
      <div className="bg-emerald-700/10 rounded-lg px-6 py-4 w-full max-w-sm flex flex-col gap-2 ">
        <p className="text-emerald-700 text-xl font-semibold">คะแนนที่ได้: {result.score.got}/{result.score.total}</p>
        <p className="text-sm text-gray-600">ข้อสอบ {result.gradedCount} ข้อ · คะแนนเต็ม {result.score.total}</p>
        <button type="button" onClick={onRestart} className="bg-emerald-700 text-white px-6 py-2 rounded w-full max-w-sm">กลับหน้าหลัก</button>
      </div>
      {result.warnings.map((warning) => (
        <p key={warning} className="bg-amber-50 text-amber-800 rounded-lg p-3 w-full max-w-sm text-sm">{warning}</p>
      ))}
      <details className="w-full max-w-sm text-left border border-gray-200 rounded-lg p-3">
        <summary className="cursor-pointer font-semibold text-gray-700">คำตอบที่อ่านได้ ({result.gradedCount} ข้อ)</summary>
        <table className="w-full mt-3 text-sm text-gray-700">
          <thead><tr><th scope="col" className="text-left">ข้อ</th><th scope="col">คำตอบ</th><th scope="col">การคิดคะแนน</th></tr></thead>
          <tbody>{result.answers.filter((row) => row.graded).map((row) => (
            <tr key={row.question} className="border-t border-gray-100">
              <td className="py-2">{row.question.replace(/^q/, "")}</td>
              <td className="text-center">{row.answer || "ไม่ได้ฝน"}</td>
              <td className="text-center">{row.graded ? "มีเฉลย" : "ยังไม่มีเฉลย"}</td>
            </tr>
          ))}</tbody>
        </table>
      </details>
    </div>
  );
}
