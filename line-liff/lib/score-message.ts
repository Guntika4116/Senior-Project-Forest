import { demoCourses } from "@/lib/demo-courses";
import { demoScores, getScoreSummary } from "@/lib/demo-scores";

// แถวข้อมูลในการ์ด: ไอคอน / ชื่อรายการ / ค่า
function scoreRow(
  icon: string,
  label: string,
  value: string,
  color = "#4C795F",
) {
  return {
    type: "box",
    layout: "horizontal",
    spacing: "sm",
    alignItems: "center",
    contents: [
      {
        type: "text",
        text: icon,
        size: "sm",
        flex: 0,
      },
      {
        type: "text",
        text: label,
        size: "sm",
        color: "#609879",
        flex: 4,
        wrap: true,
      },
      {
        type: "text",
        text: value,
        size: "sm",
        weight: "bold",
        color,
        align: "end",
        flex: 3,
        wrap: true,
      },
    ],
  };
}

export function buildScoreMessage(liffId: string) {
  // จับคู่คะแนนกับข้อมูลคอร์สด้วย courseId
  const cards = demoScores.flatMap((score) => {
    const course = demoCourses.find(
      (item) => item.id === score.courseId,
    );

    if (!course) return [];

    const summary = getScoreSummary(score);

    const statusColor =
      summary.status === "ผ่านเกณฑ์"
        ? "#609879"
        : summary.status === "ไม่ผ่านเกณฑ์"
          ? "#D9534F"
          : "#B7791F";

    const action = {
      type: "uri",
      label: "ดูรายละเอียดคะแนน",
      uri: `https://liff.line.me/${liffId}/score?courseId=${encodeURIComponent(course.id)}`,
    };

    return [
      {
        type: "bubble",
        size: "mega",

        // กดได้ทั้งบริเวณรูปและรายละเอียด
        hero: {
          type: "image",
          url: course.imageUrl,
          size: "full",
          aspectRatio: "5:3",
          aspectMode: "cover",
          action,
        },

        body: {
          type: "box",
          layout: "vertical",
          paddingAll: "20px",
          spacing: "md",
          action,
          contents: [
            {
              type: "text",
              text: course.name,
              color: "#4C795F",
              weight: "bold",
              size: "lg",
              wrap: true,
            },

            scoreRow(
              "🏆",
              "คะแนนรวม",
              `${summary.totalScore} / ${summary.maxScore}`,
            ),

            scoreRow(
              "📋",
              "ข้อสอบที่ทำแล้ว",
              `${summary.completedCount} / ${summary.examCount}`,
            ),

            scoreRow(
              "↗",
              "สถานะ",
              summary.status,
              statusColor,
            ),

            {
              type: "text",
              text: `เกณฑ์ผ่าน: ${summary.passPercent}% ของคะแนนรวม`,
              size: "xs",
              color: "#777777",
              align: "center",
              wrap: true,
            },

            {
              type: "text",
              text: "ข้อมูลเดโม่ • แตะการ์ดเพื่อดูคะแนน",
              size: "xxs",
              color: "#999999",
              align: "center",
              wrap: true,
            },
          ],
        },
      },
    ];
  });

  if (cards.length === 0) {
    return {
      type: "text",
      text: "ยังไม่มีข้อมูลคะแนน",
    };
  }

  // ชุดเดโม่มี 3 คอร์ส หากเพิ่มเกิน 12 ต้องแบ่งหน้า/แบ่งข้อความ
  if (cards.length > 12) {
    throw new Error("ต้องแบ่งการ์ดคะแนนเป็นชุดละไม่เกิน 12 ใบ");
  }

  return {
    type: "flex",
    altText: "คะแนนของฉัน (ข้อมูลเดโม่)",
    contents: {
      type: "carousel",
      contents: cards,
    },
  };
}