"use client";
import { createContext, useContext, useEffect, useState } from "react";
import liff from "@line/liff";

const LiffContext = createContext<{ profile: any; ready: boolean }>({ profile: null, ready: false });
export const useLiff = () => useContext(LiffContext);

export default function LiffProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    liff.init({ liffId: process.env.LIFF_ID! }).then(async () => {
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      const p = await liff.getProfile();
      setProfile(p);
      setReady(true);
    });
  }, []);

  console.log("LIFF ID:", process.env.LIFF_ID);

//   if (!ready) return <div>กำลังเข้าสู่ระบบผ่าน LINE...</div>;
  return <LiffContext.Provider value={{ profile, ready }}>{children}</LiffContext.Provider>;
}