import { describe, expect, it } from "vitest";
import { OFFERINGS, STUDENTS, type Registration } from "@/lib/campus/data";
import {
  checkRegistration,
  creditLimit,
  detectConflicts,
  teachingLoad,
  DEFAULT_LOAD_RULES,
} from "@/lib/campus/rules";
import { answerQuestion } from "@/lib/campus/helpdesk";

const rafiq = STUDENTS.find((s) => s.id === "s1")!;
const off = (id: string) => OFFERINGS.find((o) => o.id === id)!;
const codes = (issues: { code: string }[]) => issues.map((i) => i.code);

describe("course registration checks", () => {
  it("credit limit is 18 at CGPA 3.00 or above and 15 below", () => {
    expect(creditLimit(3.0)).toBe(18);
    expect(creditLimit(2.99)).toBe(15);
  });

  it("blocks a course whose prerequisite is not passed", () => {
    // CSE3101 needs CSE2203, which Rafiq has not taken
    expect(codes(checkRegistration(rafiq, off("o7"), [], OFFERINGS))).toContain("prereq");
  });

  it("blocks a full section", () => {
    const fullLab = off("o6"); // 30/30
    expect(codes(checkRegistration(rafiq, fullLab, [], OFFERINGS))).toContain("seats");
  });

  it("blocks a timetable clash with an active registration", () => {
    const regs: Registration[] = [{ id: "x", student: "s1", offering: "o9", status: "approved" }];
    // CSE3105 shares Mon 11:30 with CSE3103
    expect(codes(checkRegistration(rafiq, off("o10"), regs, OFFERINGS))).toContain("clash");
  });

  it("blocks going over the credit limit", () => {
    const mitu = STUDENTS.find((s) => s.id === "s2")!; // limit 15
    const regs: Registration[] = ["o2", "o3", "o4", "o14", "o13"].map((o, i) => ({
      id: String(i),
      student: "s2",
      offering: o,
      status: "pending",
    }));
    // 3 + 1.5 + 3 + 3 + 1.5 = 12; adding CSE2201 (3) → 15 OK, but adding after 15 fails
    const regs2 = [
      ...regs,
      { id: "z", student: "s2", offering: "o5", status: "approved" as const },
    ];
    expect(codes(checkRegistration(mitu, off("o1"), regs2, OFFERINGS))).toContain("credits");
  });

  it("allows an eligible section with no issues", () => {
    expect(checkRegistration(rafiq, off("o8"), [], OFFERINGS)).toEqual([]);
  });
});

describe("routine clash detection", () => {
  it("finds the R-301 double booking and the teacher clash in the draft", () => {
    const kinds = detectConflicts(OFFERINGS, {}, {}).map((c) => c.kind);
    expect(kinds).toContain("room");
    expect(kinds).toContain("teacher");
  });
});

describe("teaching load", () => {
  it("weights lab credits and reports extra load above normal", () => {
    // t3: CSE2101 (3) + CSE2102 lab (1.5×1.5) + CSE2202 lab (1.5×1.5) = 7.5, normal 12
    const l = teachingLoad("t3", OFFERINGS, DEFAULT_LOAD_RULES);
    expect(l.load).toBe(7.5);
    expect(l.extra).toBe(0);
    const strict = teachingLoad("t3", OFFERINGS, {
      ...DEFAULT_LOAD_RULES,
      normal: { ...DEFAULT_LOAD_RULES.normal, "Assistant Professor": 6 },
    });
    expect(strict.extra).toBe(1.5);
  });
});

describe("helpdesk", () => {
  it("cites a source for a known question", () => {
    const a = answerQuestion("How many credits can I take?");
    expect(a.found).toBe(true);
    expect(a.sources[0]?.doc).toBe("Course Registration Policy");
  });
  it("answers in Bangla when asked in Bangla", () => {
    expect(answerQuestion("ফাইনাল পরীক্ষা কবে?").lang).toBe("bn");
  });
  it("says so when the documents don't cover the question", () => {
    expect(answerQuestion("How much is the semester fee?").found).toBe(false);
  });
});
