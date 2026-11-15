"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLiff } from "./liff-provider";

export default function Home() {
  const router = useRouter();
  const { status } = useLiff();

  useEffect(() => {
    // Let LIFF resolve the rich-menu destination before applying the default page.
    if (status !== "authenticated" && status !== "unconfigured") return;
    if (new URL(window.location.href).searchParams.has("liff.state")) return;
    router.replace("/course");
  }, [router, status]);

  return <p role="status" className="p-4 text-center">รอสักครู่...</p>;
}
