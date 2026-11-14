import { EXAMS, courseByCode, studentById, type Offering } from "./data";
import type { CampusState } from "./store";
import { creditLimit, detectConflicts } from "./rules";

export function studentOfferings(state: CampusState, studentId: string) {
  const regs = state.registrations.filter(
    (r) => r.student === studentId && (r.status === "approved" || r.status === "pending"),
  );
  return regs
    .map((r) => ({ reg: r, offering: state.offerings.find((o) => o.id === r.offering)! }))
    .filter((x) => x.offering);
}

export function studentCredits(state: CampusState, studentId: string) {
  const s = studentById(studentId)!;
  const used = studentOfferings(state, studentId).reduce(
    (sum, x) => sum + (courseByCode(x.offering.course)?.credits ?? 0),
    0,
  );
  return { used, limit: creditLimit(s.cgpa) };
}

export function examsFor(courses: string[]) {
  return EXAMS.filter((e) => courses.includes(e.course)).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}

export function routineConflicts(state: CampusState) {
  const caps = { "R-301": 45, "R-302": 40, "R-303": 40, "Lab-1": 30, "Lab-2": 30 };
  return detectConflicts(state.offerings, state.unavailability, caps);
}

export function conflictIds(state: CampusState) {
  return new Set(routineConflicts(state).flatMap((c) => c.offerings));
}

export const offeringLabel = (o: Offering) =>
  `${o.course} · ${courseByCode(o.course)?.title ?? ""} (${o.section})`;

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
