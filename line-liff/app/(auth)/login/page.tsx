import Link from "next/link";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <img src="/image/Logo_WoodCertify.png" alt="Logo" className="w-50 mb-6" />
            <div className="flex flex-col items-center gap-2">
                <h1>เชื่อมบัญชีกับ LINE</h1>
                <p className="text-sm">ใช้บัญชีที่มีอยู่แล้ว</p>
            </div>
            <div className="flex flex-col items-center gap-2 mt-4">
                <form className="flex flex-col gap-2">
                    <p className="text-sm">อีเมล</p>
                    <input className="border border-gray-300 rounded py-2 px-4" type="text" placeholder="example@example.com" />
                    <p className="text-sm">รหัสผ่าน</p>
                    <input className="border border-gray-300 rounded py-2 px-4" type="password" placeholder="รหัสผ่าน" />
                    <button className="bg-emerald-700 text-white py-2 px-4 rounded mt-1" type="submit">เข้าสู่ระบบ</button>
                </form>
                <p className="text-sm">หรือ</p>
                <Link href="/register" className="w-full text-emerald-700 py-2 px-4 rounded border border-emerald-700 text-center" type="button">
                    ลงทะเบียนผู้เรียนใหม่
                </Link>
            </div>
        </div>
    );
}
