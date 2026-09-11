import type { OmrResult } from "@/lib/omr";

export default function SuccessStep({ result, onRestart }: {
  result: OmrResult;
  onRestart: () => void;
}) {
  return (
    <div className="p-6 flex flex-col items-center gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-3xl">✓</div>
      <h1 className="text-emerald-700 text-xl font-bold">ตรวจคำตอบสำเร็จ</h1>
      <p className="text-gray-600">รหัสผู้สอบที่อ่านได้: {result.rollNumber || "ไม่พบ"}</p>
      <div className="bg-emerald-50 rounded-lg px-6 py-4 w-full max-w-sm">
        <p className="text-emerald-700 text-xl font-semibold">คะแนนที่ได้: {result.score.got}/{result.score.total}</p>
        <p className="text-sm text-gray-600 mt-2">ตรวจคะแนน {result.gradedCount} จาก {result.questionCount} ข้อ</p>
      </div>
      {result.warnings.map((warning) => (
        <p key={warning} className="bg-amber-50 text-amber-800 rounded-lg p-3 w-full max-w-sm text-sm">{warning}</p>
      ))}
      <details className="w-full max-w-sm text-left border border-gray-200 rounded-lg p-3">
        <summary className="cursor-pointer font-semibold text-gray-700">คำตอบที่อ่านได้ ({result.answers.length} ข้อ)</summary>
        <table className="w-full mt-3 text-sm text-gray-700">
          <thead><tr><th scope="col" className="text-left">ข้อ</th><th scope="col">คำตอบ</th><th scope="col">การคิดคะแนน</th></tr></thead>
          <tbody>{result.answers.map((row) => (
            <tr key={row.question} className="border-t border-gray-100">
              <td className="py-2">{row.question.replace(/^q/, "")}</td>
              <td className="text-center">{row.answer || "ไม่ได้ฝน"}</td>
              <td className="text-center">{row.graded ? "มีเฉลย" : "ยังไม่มีเฉลย"}</td>
            </tr>
          ))}</tbody>
        </table>
      </details>
      <button type="button" onClick={onRestart} className="bg-emerald-700 text-white px-6 py-2 rounded w-full max-w-sm">ตรวจกระดาษอีกแผ่น</button>
    </div>
  );
}
