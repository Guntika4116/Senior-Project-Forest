"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// ตรวจซ้ำเมื่อกลับจากแชตและระหว่างเปิดหน้าคอร์ส เพื่อไม่ค้าง UI ที่โหลดไว้ก่อน logout
export default function SessionMonitor() {
  const path = usePathname();
  useEffect(() => {
    const protectedPage = path.startsWith("/course/") || path.startsWith("/woods/courses/") || path === "/woods/score";
    if (!protectedPage) return;
    const controller = new AbortController();
    let checking = false;
    async function check() {
      if (document.visibilityState !== "visible" || checking) return;
      checking = true;
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store", signal: controller.signal });
        // เมื่อ session หมดอายุหรือถูกเพิกถอน ให้เข้า login ใหม่ ไม่เชื่อสถานะ LIFF อย่างเดียว
        if (response.ok && !(await response.json()).authenticated) {
          window.location.replace(`/woods/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`);
        }
      } catch { /* server ตรวจสิทธิ์ทุก request อยู่แล้ว; ไม่ redirect จาก network error */ }
      finally { checking = false; }
    }
    void check();
    const timer = window.setInterval(check, 30000);
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", check);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [path]);
  return null;
}
