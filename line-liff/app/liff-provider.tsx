"use client";

import { createContext, useContext, useEffect, useState } from "react";
import liff from "@line/liff";

type LiffProfile = Awaited<ReturnType<typeof liff.getProfile>>;
type LiffStatus = "loading" | "authenticated" | "unconfigured" | "error";
type LiffContextValue = {
  profile: LiffProfile | null;
  ready: boolean;
  status: LiffStatus;
};

const LiffContext = createContext<LiffContextValue>({
  profile: null,
  ready: false,
  status: "loading",
});

export const useLiff = () => useContext(LiffContext);

export default function LiffProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<LiffProfile | null>(null);
  const [status, setStatus] = useState<LiffStatus>(
    process.env.NEXT_PUBLIC_LIFF_ID ? "loading" : "unconfigured",
  );

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    if (!liffId) return;

    let active = true;

    async function initialize() {
      try {
        // Endpoint คือ / ส่วนหน้าที่เลือก เช่น /woods หรือ /course อยู่ใน liff.state
        // LINE เก็บหน้าปลายทางไว้ใน liff.state ระหว่างพาไปหน้าที่เลือก
        const isPrimaryRedirect = new URL(window.location.href).searchParams.has("liff.state");
        await liff.init({ liffId: liffId! });
        if (!active) return;

        // ให้ SDK ไปยังปลายทางก่อนเริ่มล็อกอินหรือแสดงหน้า
        if (isPrimaryRedirect) return;

        if (!liff.isLoggedIn()) {
          const currentUrl = new URL(window.location.href);
          // กลับมาหน้าที่กดจากริชเมนูหลังล็อกอิน รวมถึงหน้า /course
          for (const key of ["code", "state", "liffClientId", "liffRedirectUri"]) {
            currentUrl.searchParams.delete(key);
          }
          liff.login({ redirectUri: currentUrl.toString() });
          return;
        }

        const lineProfile = await liff.getProfile();
        if (active) {
          setProfile(lineProfile);
          setStatus("authenticated");
        }
      } catch (error) {
        console.error("LIFF initialization failed", error);
        if (active) setStatus("error");
      }
    }

    void initialize();
    return () => {
      active = false;
    };
  }, []);

  return (
    <LiffContext.Provider value={{ profile, ready: status === "authenticated", status }}>
      {status === "error" && (
        <div role="alert" className="bg-red-50 px-4 py-3 text-sm text-red-800">
          เข้าสู่ระบบ LINE ไม่สำเร็จ กรุณาเปิดผ่าน LINE อีกครั้งหรือลองโหลดหน้าใหม่
        </div>
      )}
      {status === "loading" ? (
        <div className="flex min-h-screen items-center justify-center px-4 text-sm text-zinc-600">
          รอสักครู่...
        </div>
      ) : (
        children
      )}
    </LiffContext.Provider>
  );
}
