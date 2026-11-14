import { COURSES, FACULTY, courseByCode } from "./data";

export interface DocChunk {
  doc: string; // official document title
  section: string;
  en: string;
  bn: string;
  keywords: string[];
}

// Official department documents the helpdesk is allowed to answer from.
export const DOCUMENTS: DocChunk[] = [
  {
    doc: "CSE Academic Calendar, Fall 2026",
    section: "Key dates",
    en: "Classes started on 6 September 2026. Add/drop closed on 20 September. Midterms run 25 October – 1 November. The last class day is 17 December, final exams run 27 December 2026 – 10 January 2027, and results are published by 31 January 2027.",
    bn: "ক্লাস শুরু হয়েছে ৬ সেপ্টেম্বর ২০২৬। অ্যাড/ড্রপ শেষ হয়েছে ২০ সেপ্টেম্বর। মিডটার্ম ২৫ অক্টোবর – ১ নভেম্বর। শেষ ক্লাস ১৭ ডিসেম্বর, ফাইনাল পরীক্ষা ২৭ ডিসেম্বর ২০২৬ – ১০ জানুয়ারি ২০২৭, এবং ফলাফল ৩১ জানুয়ারি ২০২৭-এর মধ্যে প্রকাশিত হবে।",
    keywords: [
      "calendar",
      "date",
      "dates",
      "when",
      "start",
      "midterm",
      "mid",
      "final",
      "finals",
      "exam",
      "exams",
      "result",
      "results",
      "semester",
      "last",
      "class",
      "ক্যালেন্ডার",
      "তারিখ",
      "কবে",
      "পরীক্ষা",
      "ফাইনাল",
      "মিডটার্ম",
      "ফলাফল",
      "রেজাল্ট",
      "শুরু",
    ],
  },
  {
    doc: "Course Registration Policy",
    section: "§2 Credit limits",
    en: "Students with CGPA 3.00 or above may register up to 18 credits per semester; students below 3.00 may register up to 15. The minimum load is 9 credits. Every registration needs the academic advisor's approval before it is final.",
    bn: "সিজিপিএ ৩.০০ বা তার বেশি হলে প্রতি সেমিস্টারে সর্বোচ্চ ১৮ ক্রেডিট নেওয়া যায়; ৩.০০-এর কম হলে সর্বোচ্চ ১৫ ক্রেডিট। ন্যূনতম ৯ ক্রেডিট নিতে হবে। প্রতিটি রেজিস্ট্রেশন চূড়ান্ত হতে অ্যাকাডেমিক অ্যাডভাইজারের অনুমোদন লাগে।",
    keywords: [
      "credit",
      "credits",
      "limit",
      "maximum",
      "max",
      "minimum",
      "how",
      "many",
      "load",
      "cgpa",
      "register",
      "registration",
      "advisor",
      "approval",
      "ক্রেডিট",
      "সর্বোচ্চ",
      "কত",
      "রেজিস্ট্রেশন",
      "অ্যাডভাইজার",
      "অনুমোদন",
      "সিজিপিএ",
    ],
  },
  {
    doc: "Course Registration Policy",
    section: "§3 Prerequisites and add/drop",
    en: "A course can be taken only after all its prerequisites are passed with grade D or better. Courses may be added or dropped during the first two weeks of the semester; later changes need a written application to the Head through the advisor.",
    bn: "কোনো কোর্স নিতে হলে এর সব প্রি-রিকুইজিট কোর্সে ন্যূনতম D গ্রেড পেয়ে পাস করতে হবে। সেমিস্টারের প্রথম দুই সপ্তাহে কোর্স অ্যাড বা ড্রপ করা যায়; এর পরে অ্যাডভাইজারের মাধ্যমে বিভাগীয় প্রধানের কাছে লিখিত আবেদন করতে হয়।",
    keywords: [
      "prerequisite",
      "prerequisites",
      "prereq",
      "add",
      "drop",
      "adddrop",
      "late",
      "withdraw",
      "change",
      "প্রি-রিকুইজিট",
      "পূর্বশর্ত",
      "অ্যাড",
      "ড্রপ",
      "বাদ",
    ],
  },
  {
    doc: "Grading & Retake Policy",
    section: "§1 Grade scale",
    en: "Grades: A+ (80–100, 4.00), A (75–79, 3.75), A- (70–74, 3.50), B+ (65–69, 3.25), B (60–64, 3.00), B- (55–59, 2.75), C+ (50–54, 2.50), C (45–49, 2.25), D (40–44, 2.00), F (below 40, 0.00).",
    bn: "গ্রেড: A+ (৮০–১০০, ৪.০০), A (৭৫–৭৯, ৩.৭৫), A- (৭০–৭৪, ৩.৫০), B+ (৬৫–৬৯, ৩.২৫), B (৬০–৬৪, ৩.০০), B- (৫৫–৫৯, ২.৭৫), C+ (৫০–৫৪, ২.৫০), C (৪৫–৪৯, ২.২৫), D (৪০–৪৪, ২.০০), F (৪০-এর কম, ০.০০)।",
    keywords: [
      "grade",
      "grades",
      "grading",
      "scale",
      "gpa",
      "marks",
      "point",
      "points",
      "a+",
      "গ্রেড",
      "নম্বর",
      "পয়েন্ট",
      "জিপিএ",
    ],
  },
  {
    doc: "Grading & Retake Policy",
    section: "§4 Retake and improvement",
    en: "A course graded F must be retaken. A course graded C+ or lower may be retaken once for improvement; at most two improvement retakes are allowed in the whole programme. The better grade counts.",
    bn: "F গ্রেড পাওয়া কোর্স অবশ্যই পুনরায় নিতে হবে। C+ বা তার কম গ্রেডের কোর্স উন্নতির জন্য একবার পুনরায় নেওয়া যায়; পুরো প্রোগ্রামে সর্বোচ্চ দুটি ইমপ্রুভমেন্ট নেওয়া যায়। ভালো গ্রেডটি গণ্য হয়।",
    keywords: [
      "retake",
      "improvement",
      "improve",
      "fail",
      "failed",
      "f",
      "repeat",
      "রিটেক",
      "ইমপ্রুভমেন্ট",
      "ফেল",
      "পুনরায়",
    ],
  },
  {
    doc: "Attendance & Examination Rules",
    section: "§2 Attendance",
    en: "At least 75% class attendance is required to sit for the final exam. Students between 60% and 75% may sit only with the Head's approval after paying the non-collegiate fee set by the Registrar.",
    bn: "ফাইনাল পরীক্ষায় অংশ নিতে কমপক্ষে ৭৫% ক্লাসে উপস্থিতি প্রয়োজন। ৬০% থেকে ৭৫% উপস্থিতি থাকলে বিভাগীয় প্রধানের অনুমোদন সাপেক্ষে পরীক্ষা দেওয়া যায়।",
    keywords: [
      "attendance",
      "present",
      "absent",
      "percent",
      "75",
      "eligibility",
      "eligible",
      "উপস্থিতি",
      "হাজিরা",
      "অনুপস্থিত",
    ],
  },
  {
    doc: "Attendance & Examination Rules",
    section: "§5 Make-up exams",
    en: "A student who misses an exam for illness must apply with a medical certificate within 7 days. If approved, a make-up exam is arranged before results are published.",
    bn: "অসুস্থতার কারণে পরীক্ষা মিস করলে ৭ দিনের মধ্যে মেডিকেল সার্টিফিকেটসহ আবেদন করতে হবে। অনুমোদিত হলে ফলাফল প্রকাশের আগে মেকআপ পরীক্ষা নেওয়া হয়।",
    keywords: [
      "makeup",
      "make-up",
      "missed",
      "miss",
      "medical",
      "sick",
      "illness",
      "মেকআপ",
      "অসুস্থ",
      "মেডিকেল",
      "মিস",
    ],
  },
  {
    doc: "CSE Lab Manual",
    section: "Lab rules",
    en: "Lab reports are due one week after each session. Late reports lose 10% per day. Lab-1 and Lab-2 are open for practice Sunday–Thursday, 08:30–17:00, when no class is scheduled.",
    bn: "প্রতিটি ল্যাব সেশনের এক সপ্তাহের মধ্যে ল্যাব রিপোর্ট জমা দিতে হবে। দেরিতে জমা দিলে প্রতিদিন ১০% নম্বর কাটা যায়। ক্লাস না থাকলে ল্যাব-১ ও ল্যাব-২ রবি–বৃহস্পতিবার সকাল ৮:৩০ থেকে বিকেল ৫টা পর্যন্ত অনুশীলনের জন্য খোলা।",
    keywords: [
      "lab",
      "labs",
      "report",
      "reports",
      "practice",
      "late",
      "ল্যাব",
      "রিপোর্ট",
      "অনুশীলন",
    ],
  },
];

export interface Answer {
  text: string;
  sources: { doc: string; section: string }[];
  found: boolean;
  lang: "en" | "bn";
}

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toLatinDigits = (s: string) => s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
export const isBangla = (s: string) => /[\u0980-\u09FF]/.test(s);

const STOP = new Set([
  "how",
  "much",
  "many",
  "when",
  "where",
  "which",
  "who",
  "semester",
  "class",
  "take",
  "get",
  "need",
  "there",
  "this",
  "that",
  "কবে",
  "কত",
  "the",
  "a",
  "an",
  "is",
  "are",
  "of",
  "to",
  "for",
  "in",
  "on",
  "what",
  "i",
  "my",
  "me",
  "can",
  "do",
  "does",
  "and",
  "or",
  "it",
  "be",
  "with",
  "at",
  "about",
  "please",
  "tell",
  "কি",
  "কী",
  "আমি",
  "আমার",
  "এর",
  "জন্য",
  "করে",
  "হয়",
  "কোন",
  "কোনো",
]);
const tokenize = (s: string) =>
  toLatinDigits(s.toLowerCase())
    .split(/[^\p{L}\p{M}\p{N}+-]+/u)
    .filter((t) => t && !STOP.has(t));

function courseAnswer(q: string, lang: "en" | "bn"): Answer | null {
  const m = toLatinDigits(q).match(/\b(cse|mat)\s*-?\s*(\d{4})\b/i);
  const byTitle = COURSES.find((c) => q.toLowerCase().includes(c.title.toLowerCase()));
  const course = m ? courseByCode(`${m[1]!.toUpperCase()}${m[2]}`) : byTitle;
  if (!course) return null;
  const pre = course.prereqs.length
    ? course.prereqs.join(", ")
    : lang === "bn"
      ? "কোনো প্রি-রিকুইজিট নেই"
      : "none";
  const text =
    lang === "bn"
      ? `${course.code} — ${course.title}: ${course.credits} ক্রেডিট (${course.kind === "lab" ? "ল্যাব" : "থিওরি"}), টার্ম ${course.term}। প্রি-রিকুইজিট: ${pre}।`
      : `${course.code} — ${course.title} is a ${course.credits}-credit ${course.kind} course in term ${course.term}. Prerequisites: ${pre}.`;
  return {
    text,
    lang,
    found: true,
    sources: [{ doc: "CSE Curriculum 2024", section: `Course catalogue · ${course.code}` }],
  };
}

function facultyAnswer(q: string, lang: "en" | "bn"): Answer | null {
  const lower = q.toLowerCase();
  const f = FACULTY.find((x) =>
    x.name
      .toLowerCase()
      .replace("dr. ", "")
      .split(" ")
      .some((part) => part.length > 3 && lower.includes(part)),
  );
  if (!f) return null;
  const text =
    lang === "bn"
      ? `${f.name} (${f.designation}) — অফিস: ${f.office}, অফিস আওয়ার: ${f.officeHours}, ইমেইল: ${f.email}।`
      : `${f.name} (${f.designation}) — office ${f.office}, office hours ${f.officeHours}, email ${f.email}. Expertise: ${f.expertise}.`;
  return { text, lang, found: true, sources: [{ doc: "CSE Faculty Directory", section: f.name }] };
}

/** Answer only from official documents; say so when they don't cover the question. */
export function answerQuestion(question: string): Answer {
  const lang: "en" | "bn" = isBangla(question) ? "bn" : "en";
  const direct = courseAnswer(question, lang) ?? facultyAnswer(question, lang);
  if (direct) return direct;

  const tokens = tokenize(question);
  const scored = DOCUMENTS.map((d) => {
    const kw = new Set(d.keywords.map((k) => k.toLowerCase()));
    const body = new Set(tokenize(d.en + " " + d.bn));
    const score = tokens.reduce((s, t) => s + (kw.has(t) ? 2 : body.has(t) ? 0.5 : 0), 0);
    return { d, score };
  })
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) {
    return {
      lang,
      found: false,
      sources: [],
      text:
        lang === "bn"
          ? "দুঃখিত, বিভাগের অফিসিয়াল ডকুমেন্টে এই প্রশ্নের উত্তর পাওয়া যায়নি। অনুগ্রহ করে বিভাগীয় অফিস বা আপনার অ্যাডভাইজারের সাথে যোগাযোগ করুন।"
          : "I couldn't find this in the official department documents, so I won't guess. Please ask the department office or your advisor.",
    };
  }
  const top = scored.slice(0, scored[1] && scored[1].score >= scored[0]!.score * 0.8 ? 2 : 1);
  return {
    lang,
    found: true,
    text: top.map((x) => (lang === "bn" ? x.d.bn : x.d.en)).join("\n\n"),
    sources: top.map((x) => ({ doc: x.d.doc, section: x.d.section })),
  };
}
