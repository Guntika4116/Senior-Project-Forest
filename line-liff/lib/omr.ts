export const MAX_OMR_IMAGE_BYTES = 20 * 1024 * 1024;
export const OMR_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type OmrExam = {
  name: string;
  questionCount: number;
  gradedCount: number;
  maxScore: number;
};

export type OmrResult = {
  scanId: string;
  rollNumber: string;
  score: { got: number; total: number };
  questionCount: number;
  gradedCount: number;
  answers: { question: string; answer: string; graded: boolean }[];
  warnings: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

export function isOmrExam(value: unknown): value is OmrExam {
  return isRecord(value) && typeof value.name === "string" &&
    isNumber(value.questionCount) && isNumber(value.gradedCount) && isNumber(value.maxScore);
}

export function isOmrResult(value: unknown): value is OmrResult {
  return isRecord(value) && typeof value.scanId === "string" &&
    typeof value.rollNumber === "string" && isRecord(value.score) &&
    isNumber(value.score.got) && isNumber(value.score.total) &&
    isNumber(value.questionCount) && isNumber(value.gradedCount) &&
    Array.isArray(value.answers) && value.answers.every((row: unknown) =>
      isRecord(row) && typeof row.question === "string" &&
      typeof row.answer === "string" && typeof row.graded === "boolean") &&
    Array.isArray(value.warnings) && value.warnings.every((warning: unknown) => typeof warning === "string");
}

export function omrErrorMessage(value: unknown, fallback: string) {
  return isRecord(value) && typeof value.message === "string" ? value.message : fallback;
}
