"use client";

import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";

type ResultRow = Record<string, string | number | null | undefined>;
type ScanResponse = { status: "success" | "error"; message?: string; results?: ResultRow[] };
const API_BASE_URL = (process.env.NEXT_PUBLIC_OMR_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

function scoreOf(row: ResultRow) { return Number(row.Score ?? row.score ?? row["คะแนน"] ?? 0) || 0; }
function candidateOf(row: ResultRow) { return String(row.Roll ?? row.roll ?? row["รหัส"] ?? "-"); }

export default function AnswerSheetScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultRow | null>(null);
  const total = useMemo(() => result ? Object.keys(result).filter((key) => /^q\d+/i.test(key)).length || 15 : 15, [result]);

  function choosePhoto(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected); setPreview(URL.createObjectURL(selected)); setError(null); setResult(null);
  }
  async function submitPhoto() {
    if (!file) return;
    setIsSubmitting(true); setError(null);
    try {
      const formData = new FormData(); formData.append("file", file);
      const response = await fetch(`${API_BASE_URL}/api/scan/`, { method: "POST", body: formData });
      const data = await response.json() as ScanResponse;
      if (!response.ok || data.status !== "success" || !data.results?.length) throw new Error(data.message || "ไม่สามารถอ่านผลการตรวจได้");
      setResult(data.results[0]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "ไม่สามารถเชื่อมต่อระบบตรวจคำตอบได้");
    } finally { setIsSubmitting(false); }
  }
  function reset() { setFile(null); setPreview(null); setError(null); setResult(null); }

  if (result) return <main className="min-h-dvh bg-[#f6f8f7] px-5 py-8 text-slate-800"><section className="mx-auto flex min-h-[78dvh] max-w-md flex-col items-center justify-center rounded-[28px] bg-white px-6 py-10 text-center shadow-sm"><div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl text-emerald-700">✓</div><p className="mt-6 text-sm font-semibold text-emerald-700">ตรวจคำตอบเรียบร้อย</p><h1 className="mt-2 text-2xl font-bold">ผลการตรวจข้อสอบ</h1><p className="mt-2 text-sm text-slate-500">รหัสผู้เข้าสอบ: {candidateOf(result)}</p><div className="mt-7 w-full rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white shadow-lg shadow-emerald-900/15"><p className="text-sm text-emerald-100">คะแนนที่ได้</p><p className="mt-1 text-6xl font-bold tracking-tight">{scoreOf(result)}<span className="ml-2 text-2xl font-medium text-emerald-100">/ {total}</span></p><p className="mt-3 text-xs text-emerald-100">ระบบได้บันทึกผลการตรวจของคุณแล้ว</p></div><button onClick={reset} className="mt-8 w-full rounded-xl border border-emerald-700 py-3 text-sm font-semibold text-emerald-800">ตรวจอีกครั้ง</button><Link href="/" className="mt-3 text-sm font-medium text-slate-500">กลับหน้าหลัก</Link></section></main>;

  return <main className="min-h-dvh bg-[#f6f8f7] text-slate-800"><header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur"><Link href="/photoexam" className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800">← กลับ</Link><span className="text-sm font-bold text-emerald-800">ตรวจคำตอบ</span><span className="w-9" /></header><section className="mx-auto max-w-md px-5 pb-10 pt-7"><div className="text-center"><p className="text-sm font-semibold text-emerald-700">ขั้นตอนที่ 2 จาก 2</p><h1 className="mt-2 text-2xl font-bold">ถ่ายภาพกระดาษคำตอบ</h1><p className="mt-2 text-sm leading-6 text-slate-500">จัดกระดาษให้อยู่ในกรอบ เห็นครบทั้ง 4 มุม และหลีกเลี่ยงเงาสะท้อน</p></div><div className="mt-7 overflow-hidden rounded-[26px] border border-slate-200 bg-slate-900 shadow-sm">{preview ? <img src={preview} alt="ตัวอย่างกระดาษคำตอบที่เลือก" className="aspect-[3/4] w-full object-contain" /> : <label className="relative flex aspect-[3/4] cursor-pointer flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_#40534a_0,_#1d2923_55%,_#121b16_100%)] text-center text-white"><span className="absolute inset-7 rounded-2xl border-2 border-dashed border-emerald-300/80" /><span className="z-10 grid h-16 w-16 place-items-center rounded-full bg-white/15 text-3xl">⌑</span><strong className="z-10 mt-4 text-lg">แตะเพื่อเปิดกล้อง</strong><span className="z-10 mt-1 text-sm text-white/70">หรือเลือกภาพจากอัลบั้ม</span><input className="sr-only" type="file" accept="image/*" capture="environment" onChange={choosePhoto} /></label>}</div>{!preview && <label className="mt-4 block cursor-pointer text-center text-sm font-semibold text-emerald-800">เลือกภาพจากอัลบั้ม<input className="sr-only" type="file" accept="image/*" onChange={choosePhoto} /></label>}{preview && <div className="mt-5 grid grid-cols-2 gap-3"><label className="cursor-pointer rounded-xl border border-slate-300 bg-white py-3 text-center text-sm font-semibold text-slate-700">ถ่ายใหม่<input className="sr-only" type="file" accept="image/*" capture="environment" onChange={choosePhoto} /></label><button disabled={isSubmitting} onClick={submitPhoto} className="rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white shadow-sm disabled:cursor-wait disabled:bg-emerald-400">{isSubmitting ? "กำลังตรวจ..." : "ยืนยันและตรวจคำตอบ"}</button></div>}{error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error} กรุณาตรวจสอบว่า backend ทำงานที่ {API_BASE_URL}</p>}</section></main>;
}
