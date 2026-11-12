"use client";

import Link from "next/link";
import liff from "@line/liff";
import { useRef, useState, type FormEvent } from "react";
import { useLiff } from "@/app/liff-provider";

export default function Login() {
  const { ready, status } = useLiff();
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !ready) return;
    submitting.current = true;
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      // ใช้ ID token จาก SDK ให้ server ตรวจ ไม่ส่ง profile.userId มาเป็นหลักฐานล็อกอิน
      const idToken = liff.getIDToken();
      if (!idToken) throw new Error("ไม่พบ LINE ID token กรุณาเปิด LIFF ที่เปิดสิทธิ์ openid แล้วลองใหม่");
      const response = await fetch("/api/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password"), idToken }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "เข้าสู่ระบบไม่สำเร็จ");
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "เชื่อมต่อไม่สำเร็จ กรุณาลองใหม่");
    } finally { submitting.current = false; setBusy(false); }
  }

  function openCourse() {
    const next = new URL(window.location.href).searchParams.get("next");
    // รับเฉพาะเส้นทางภายในส่วนคอร์ส ป้องกัน redirect ไปเว็บอื่น
    const target = next && /^\/(course(?:\/|\?|$)|woods\/(courses|score)(?:\/|\?|$))/.test(next) && !next.includes("\\")
      ? next : "/woods/courses";
    window.location.assign(target);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-7 py-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/image/Logo_WoodCertify.png" alt="WoodCertify" className="mx-auto mb-6 w-52" />
      {success ? (
        <section className="space-y-4 text-center" aria-live="polite">
          <h1 className="text-xl font-semibold text-emerald-800">เข้าสู่ระบบสำเร็จ</h1>
          <p className="text-sm text-zinc-600">เปลี่ยนเป็นเมนูผู้เรียนแล้ว คุณสามารถกลับไปที่แชตหรือเข้าคอร์สได้เลย</p>
          <button onClick={openCourse} className="w-full rounded-lg bg-[#609879] py-3 text-white">ไปหน้าคอร์สเรียน</button>
          {liff.isInClient() && <button onClick={() => liff.closeWindow()} className="w-full rounded-lg border border-[#609879] py-3 text-[#4C795F]">กลับไปแชต LINE</button>}
        </section>
      ) : (
        <>
          <h1 className="text-center text-lg font-semibold">เชื่อมบัญชีกับ LINE</h1>
          <p className="mt-1 text-center text-sm text-zinc-500">ใช้บัญชีที่มีอยู่แล้ว</p>
          <form onSubmit={submit} className="mt-7 flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-zinc-600">อีเมล</label>
            <input id="email" name="email" type="email" required autoComplete="username" maxLength={254} placeholder="example@gmail.com" disabled={busy} className="rounded-lg border border-zinc-300 px-3 py-3" />
            <label htmlFor="password" className="mt-2 text-sm text-zinc-600">รหัสผ่าน</label>
            <div className="flex rounded-lg border border-zinc-300">
              <input id="password" name="password" type={showPassword ? "text" : "password"} required autoComplete="current-password" maxLength={256} disabled={busy} className="min-w-0 flex-1 rounded-lg px-3 py-3" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"} aria-pressed={showPassword} className="px-3 text-sm text-zinc-600">{showPassword ? "ซ่อน" : "แสดง"}</button>
            </div>
            {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
            {!ready && <p className="text-sm text-amber-800">{status === "loading" ? "กำลังเชื่อมต่อ LINE…" : "กรุณาเปิดหน้านี้ผ่าน LIFF และตรวจการตั้งค่า LINE"}</p>}
            <button type="submit" disabled={busy || !ready} className="mt-3 rounded-lg bg-[#609879] py-3 text-white disabled:opacity-50">{busy ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}</button>
          </form>
          <div className="my-6 flex items-center gap-4 text-sm text-zinc-500"><hr className="flex-1 border-zinc-300" />หรือ<hr className="flex-1 border-zinc-300" /></div>
          <Link href="/woods/register" className="rounded-lg border border-[#609879] py-3 text-center text-sm text-[#609879]">ลงทะเบียนผู้เรียนใหม่</Link>
        </>
      )}
    </main>
  );
}
