import {
  COURSES,
  type Offering,
  type Registration,
  type Slot,
  type Student,
  courseByCode,
  FACULTY,
  type Designation,
} from "./data";

const PASSING = new Set(["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D"]);

export function creditLimit(cgpa: number): number {
  return cgpa >= 3 ? 18 : 15;
}

export function passedCourses(student: Student): Set<string> {
  return new Set(student.history.filter((h) => PASSING.has(h.grade)).map((h) => h.course));
}

const sameSlot = (a: Slot, b: Slot) => a[0] === b[0] && a[1] === b[1];
export const slotsOverlap = (a: Slot[], b: Slot[]) => a.some((x) => b.some((y) => sameSlot(x, y)));

export type CheckCode = "duplicate" | "passed" | "prereq" | "credits" | "seats" | "clash";
export interface CheckIssue {
  code: CheckCode;
  message: string;
}

/** Every check a course registration must pass. Empty array = OK to request. */
export function checkRegistration(
  student: Student,
  offering: Offering,
  registrations: Registration[],
  offerings: Offering[],
): CheckIssue[] {
  const issues: CheckIssue[] = [];
  const course = courseByCode(offering.course);
  if (!course) return [{ code: "prereq", message: "Unknown course" }];

  const active = registrations.filter(
    (r) => r.student === student.id && (r.status === "pending" || r.status === "approved"),
  );
  const activeOfferings = active
    .map((r) => offerings.find((o) => o.id === r.offering))
    .filter((o): o is Offering => !!o);

  if (activeOfferings.some((o) => o.course === offering.course)) {
    issues.push({ code: "duplicate", message: `Already registered for ${course.code}` });
  }

  const passed = passedCourses(student);
  if (passed.has(course.code)) {
    issues.push({ code: "passed", message: `${course.code} already passed` });
  }

  const missing = course.prereqs.filter((p) => !passed.has(p));
  if (missing.length) {
    issues.push({ code: "prereq", message: `Prerequisite missing: ${missing.join(", ")}` });
  }

  const used = activeOfferings.reduce((s, o) => s + (courseByCode(o.course)?.credits ?? 0), 0);
  const limit = creditLimit(student.cgpa);
  if (used + course.credits > limit) {
    issues.push({
      code: "credits",
      message: `Credit limit ${limit} exceeded (${used + course.credits})`,
    });
  }

  if (offering.enrolled >= offering.seats) {
    issues.push({ code: "seats", message: "No seats left in this section" });
  }

  const clash = activeOfferings.find(
    (o) => o.id !== offering.id && slotsOverlap(o.slots, offering.slots),
  );
  if (clash) {
    issues.push({ code: "clash", message: `Timetable clash with ${clash.course}` });
  }
  return issues;
}

export interface Conflict {
  kind: "room" | "teacher" | "unavailable" | "capacity";
  day: number;
  slot: number;
  offerings: string[];
  message: string;
}

/** Detect teacher, room, availability and capacity conflicts in a routine. */
export function detectConflicts(
  offerings: Offering[],
  unavailability: Record<string, Slot[]>,
  roomCapacity: Record<string, number>,
): Conflict[] {
  const conflicts: Conflict[] = [];
  for (let i = 0; i < offerings.length; i++) {
    for (let j = i + 1; j < offerings.length; j++) {
      const a = offerings[i]!;
      const b = offerings[j]!;
      for (const s of a.slots) {
        if (!b.slots.some((t) => sameSlot(s, t))) continue;
        if (a.room === b.room)
          conflicts.push({
            kind: "room",
            day: s[0],
            slot: s[1],
            offerings: [a.id, b.id],
            message: `${a.room} double-booked: ${a.course} & ${b.course}`,
          });
        if (a.teacher === b.teacher) {
          const t = FACULTY.find((f) => f.id === a.teacher);
          conflicts.push({
            kind: "teacher",
            day: s[0],
            slot: s[1],
            offerings: [a.id, b.id],
            message: `${t?.name ?? a.teacher} teaches ${a.course} & ${b.course} at once`,
          });
        }
      }
    }
  }
  for (const o of offerings) {
    const blocked = unavailability[o.teacher] ?? [];
    for (const s of o.slots) {
      if (blocked.some((b) => sameSlot(b, s))) {
        const t = FACULTY.find((f) => f.id === o.teacher);
        conflicts.push({
          kind: "unavailable",
          day: s[0],
          slot: s[1],
          offerings: [o.id],
          message: `${t?.name ?? o.teacher} marked this slot unavailable (${o.course})`,
        });
      }
    }
    const cap = roomCapacity[o.room];
    if (cap !== undefined && o.seats > cap) {
      conflicts.push({
        kind: "capacity",
        day: o.slots[0]?.[0] ?? 0,
        slot: o.slots[0]?.[1] ?? 0,
        offerings: [o.id],
        message: `${o.course} has ${o.seats} seats but ${o.room} holds ${cap}`,
      });
    }
  }
  return conflicts;
}

export interface LoadRules {
  labWeight: number; // each lab credit counts this many load units
  normal: Record<Designation, number>;
}

export const DEFAULT_LOAD_RULES: LoadRules = {
  labWeight: 1.5,
  normal: { Professor: 9, "Associate Professor": 10, "Assistant Professor": 12, Lecturer: 14 },
};

export function teachingLoad(teacherId: string, offerings: Offering[], rules: LoadRules) {
  const teacher = FACULTY.find((f) => f.id === teacherId);
  const mine = offerings.filter((o) => o.teacher === teacherId);
  const load = mine.reduce((sum, o) => {
    const c = courseByCode(o.course);
    if (!c) return sum;
    return sum + (c.kind === "lab" ? c.credits * rules.labWeight : c.credits);
  }, 0);
  const normal = teacher ? rules.normal[teacher.designation] : 0;
  return { load, normal, extra: Math.max(0, load - normal), courses: mine };
}

export const totalCredits = (codes: string[]) =>
  codes.reduce((s, c) => s + (COURSES.find((x) => x.code === c)?.credits ?? 0), 0);

/** First free (day, slot) where neither the room nor the teacher is busy and the teacher is available. */
export function suggestSlot(
  target: Offering,
  slotIndex: number,
  offerings: Offering[],
  unavailability: Record<string, Slot[]>,
): Slot | null {
  const others = offerings.filter((o) => o.id !== target.id);
  const ownOther = target.slots.filter((_, i) => i !== slotIndex);
  for (let d = 0; d < 5; d++) {
    for (let s = 0; s < 5; s++) {
      const cand: Slot = [d, s];
      if (ownOther.some((x) => x[0] === d)) continue; // keep the two weekly classes on different days
      const busy = others.some(
        (o) =>
          o.slots.some((x) => sameSlot(x, cand)) &&
          (o.room === target.room || o.teacher === target.teacher),
      );
      const blocked = (unavailability[target.teacher] ?? []).some((x) => sameSlot(x, cand));
      if (!busy && !blocked) return cand;
    }
  }
  return null;
}
