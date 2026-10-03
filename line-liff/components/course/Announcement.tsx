export default function Announcement() {
    return (
        <div className="bg-emerald-300/20 px-4 py-3 rounded-lg flex flex-col gap-3">
            <div className="flex gap-2">
                <p className="bg-amber-200/40 w-fit h-fit text-amber-500 px-2 py-0.5 rounded-lg">New</p>
                <h2 className="text-emerald-700 rounded-lg ">เตรียมความพร้อมก่อนเริ่มการอบรมพันธ์ ไม้ครั้งที่ 3 {/*title*/}</h2>
            </div>
            <p className="text-sm">"สวัสดีผู้เข้าร่วมอบรมทุกท่านครับ เพื่อให้การอบรมภาคปฏิบัติเป็นไปอย่างราบรื่น
                ขอความกรุณาผู้เข้าร่วมอบรมทุกท่านเตรียม..."</p>
            <p className="text-zinc-400 text-xs">19 เมษายน 2569 • โดย Peerapat</p>
        </div>
    );
}
