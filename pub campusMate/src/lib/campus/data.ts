// Sample data for one department (CSE) and one semester (Fall 2026).
export type Role = "student" | "teacher" | "advisor" | "coordinator";
export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu"] as const;
export const SLOTS = [
  "08:30–10:00",
  "10:00–11:30",
  "11:30–13:00",
  "14:00–15:30",
  "15:30–17:00",
] as const;
export type Slot = [day: number, slot: number];

export const SEMESTER = "Fall 2026";
export const DEPARTMENT = "Computer Science & Engineering";

export interface Course {
  code: string;
  title: string;
  credits: number;
  kind: "theory" | "lab";
  prereqs: string[];
  term: string;
}

export const COURSES: Course[] = [
  {
    code: "CSE1101",
    title: "Structured Programming",
    credits: 3,
    kind: "theory",
    prereqs: [],
    term: "1-1",
  },
  {
    code: "CSE1102",
    title: "Structured Programming Lab",
    credits: 1.5,
    kind: "lab",
    prereqs: [],
    term: "1-1",
  },
  {
    code: "MAT1101",
    title: "Differential & Integral Calculus",
    credits: 3,
    kind: "theory",
    prereqs: [],
    term: "1-1",
  },
  {
    code: "CSE1201",
    title: "Data Structures",
    credits: 3,
    kind: "theory",
    prereqs: ["CSE1101"],
    term: "1-2",
  },
  {
    code: "CSE1202",
    title: "Data Structures Lab",
    credits: 1.5,
    kind: "lab",
    prereqs: ["CSE1102"],
    term: "1-2",
  },
  {
    code: "CSE2101",
    title: "Algorithms",
    credits: 3,
    kind: "theory",
    prereqs: ["CSE1201"],
    term: "2-1",
  },
  {
    code: "CSE2102",
    title: "Algorithms Lab",
    credits: 1.5,
    kind: "lab",
    prereqs: ["CSE1202"],
    term: "2-1",
  },
  {
    code: "CSE2103",
    title: "Discrete Mathematics",
    credits: 3,
    kind: "theory",
    prereqs: [],
    term: "2-1",
  },
  {
    code: "CSE2201",
    title: "Database Systems",
    credits: 3,
    kind: "theory",
    prereqs: ["CSE1201"],
    term: "2-2",
  },
  {
    code: "CSE2202",
    title: "Database Systems Lab",
    credits: 1.5,
    kind: "lab",
    prereqs: ["CSE1202"],
    term: "2-2",
  },
  {
    code: "CSE2203",
    title: "Computer Architecture",
    credits: 3,
    kind: "theory",
    prereqs: [],
    term: "2-2",
  },
  {
    code: "CSE3101",
    title: "Operating Systems",
    credits: 3,
    kind: "theory",
    prereqs: ["CSE2101", "CSE2203"],
    term: "3-1",
  },
  {
    code: "CSE3102",
    title: "Operating Systems Lab",
    credits: 1.5,
    kind: "lab",
    prereqs: ["CSE2102"],
    term: "3-1",
  },
  {
    code: "CSE3103",
    title: "Computer Networks",
    credits: 3,
    kind: "theory",
    prereqs: ["CSE2101"],
    term: "3-1",
  },
  {
    code: "CSE3105",
    title: "Software Engineering",
    credits: 3,
    kind: "theory",
    prereqs: ["CSE2201"],
    term: "3-1",
  },
  {
    code: "CSE3201",
    title: "Artificial Intelligence",
    credits: 3,
    kind: "theory",
    prereqs: ["CSE2101", "MAT1101"],
    term: "3-2",
  },
  {
    code: "CSE3203",
    title: "Compiler Design",
    credits: 3,
    kind: "theory",
    prereqs: ["CSE2101", "CSE2103"],
    term: "3-2",
  },
];

export const courseByCode = (code: string) => COURSES.find((c) => c.code === code);

export type Designation = "Professor" | "Associate Professor" | "Assistant Professor" | "Lecturer";
export interface Faculty {
  id: string;
  name: string;
  designation: Designation;
  title?: string | undefined;
  email: string;
  office: string;
  officeHours: string;
  expertise: string;
  available: Slot[]; // slots the teacher marked unavailable are excluded
  unavailable: Slot[];
}

export const FACULTY: Faculty[] = [
  {
    id: "t1",
    name: "Dr. Farhana Rahman",
    designation: "Professor",
    title: "Head of Department · Routine Coordinator",
    email: "farhana.rahman@pub.edu.bd",
    office: "Room 401, Academic Building 2",
    officeHours: "Sun & Tue, 11:30–13:00",
    expertise: "Computer Networks, AI",
    available: [],
    unavailable: [[4, 4]],
  },
  {
    id: "t2",
    name: "Dr. Mahbub Alam",
    designation: "Associate Professor",
    title: "Academic Advisor, Batch 2022–23",
    email: "mahbub.alam@pub.edu.bd",
    office: "Room 405, Academic Building 2",
    officeHours: "Mon & Wed, 14:00–15:30",
    expertise: "Operating Systems, Distributed Systems",
    available: [],
    unavailable: [],
  },
  {
    id: "t3",
    name: "Nusrat Jahan",
    designation: "Assistant Professor",
    email: "nusrat.jahan@pub.edu.bd",
    office: "Room 408, Academic Building 2",
    officeHours: "Sun & Wed, 14:00–15:30",
    expertise: "Algorithms, Competitive Programming",
    available: [],
    unavailable: [[3, 4]],
  },
  {
    id: "t4",
    name: "Tanvir Hasan",
    designation: "Assistant Professor",
    email: "tanvir.hasan@pub.edu.bd",
    office: "Room 410, Academic Building 2",
    officeHours: "Mon & Thu, 10:00–11:30",
    expertise: "Databases, Data Engineering",
    available: [],
    unavailable: [],
  },
  {
    id: "t5",
    name: "Sadia Islam",
    designation: "Lecturer",
    email: "sadia.islam@pub.edu.bd",
    office: "Room 302, Academic Building 2",
    officeHours: "Tue & Thu, 11:30–13:00",
    expertise: "Compilers, Programming Languages",
    available: [],
    unavailable: [],
  },
  {
    id: "t6",
    name: "Arif Chowdhury",
    designation: "Lecturer",
    email: "arif.chowdhury@pub.edu.bd",
    office: "Room 304, Academic Building 2",
    officeHours: "Sun & Tue, 15:30–17:00",
    expertise: "Software Engineering, Discrete Math",
    available: [],
    unavailable: [],
  },
];

export const facultyById = (id: string) => FACULTY.find((f) => f.id === id);

export interface Room {
  id: string;
  capacity: number;
  kind: "theory" | "lab";
}
export const ROOMS: Room[] = [
  { id: "R-301", capacity: 45, kind: "theory" },
  { id: "R-302", capacity: 40, kind: "theory" },
  { id: "R-303", capacity: 40, kind: "theory" },
  { id: "Lab-1", capacity: 30, kind: "lab" },
  { id: "Lab-2", capacity: 30, kind: "lab" },
];

export interface Offering {
  id: string;
  course: string;
  section: string;
  teacher: string;
  room: string;
  seats: number;
  enrolled: number;
  slots: Slot[];
}

// Draft routine. It intentionally contains one room clash and one teacher clash
// so the coordinator's clash detector has something to find.
export const OFFERINGS: Offering[] = [
  {
    id: "o1",
    course: "CSE1201",
    section: "A",
    teacher: "t5",
    room: "R-301",
    seats: 45,
    enrolled: 38,
    slots: [
      [0, 0],
      [2, 0],
    ],
  },
  {
    id: "o2",
    course: "CSE2101",
    section: "A",
    teacher: "t3",
    room: "R-302",
    seats: 40,
    enrolled: 33,
    slots: [
      [0, 1],
      [2, 1],
    ],
  },
  {
    id: "o3",
    course: "CSE2102",
    section: "A",
    teacher: "t3",
    room: "Lab-1",
    seats: 30,
    enrolled: 28,
    slots: [[1, 3]],
  },
  {
    id: "o4",
    course: "CSE2103",
    section: "A",
    teacher: "t6",
    room: "R-301",
    seats: 45,
    enrolled: 40,
    slots: [
      [1, 0],
      [3, 0],
    ],
  },
  {
    id: "o5",
    course: "CSE2201",
    section: "A",
    teacher: "t4",
    room: "R-302",
    seats: 40,
    enrolled: 36,
    slots: [
      [0, 2],
      [3, 2],
    ],
  },
  {
    id: "o6",
    course: "CSE2202",
    section: "A",
    teacher: "t4",
    room: "Lab-2",
    seats: 30,
    enrolled: 30,
    slots: [[2, 3]],
  },
  {
    id: "o13",
    course: "CSE2202",
    section: "B",
    teacher: "t3",
    room: "Lab-2",
    seats: 30,
    enrolled: 12,
    slots: [[1, 3]],
  },
  {
    id: "o14",
    course: "CSE2203",
    section: "A",
    teacher: "t2",
    room: "R-303",
    seats: 40,
    enrolled: 34,
    slots: [
      [0, 3],
      [3, 3],
    ],
  },
  {
    id: "o7",
    course: "CSE3101",
    section: "A",
    teacher: "t2",
    room: "R-301",
    seats: 45,
    enrolled: 31,
    slots: [
      [1, 1],
      [3, 1],
    ],
  },
  {
    id: "o8",
    course: "CSE3102",
    section: "A",
    teacher: "t2",
    room: "Lab-1",
    seats: 30,
    enrolled: 22,
    slots: [[4, 3]],
  },
  {
    id: "o9",
    course: "CSE3103",
    section: "A",
    teacher: "t1",
    room: "R-302",
    seats: 40,
    enrolled: 29,
    slots: [
      [1, 2],
      [4, 1],
    ],
  },
  {
    id: "o10",
    course: "CSE3105",
    section: "A",
    teacher: "t6",
    room: "R-301",
    seats: 45,
    enrolled: 35,
    slots: [
      [1, 2],
      [3, 4],
    ],
  },
  {
    id: "o11",
    course: "CSE3201",
    section: "A",
    teacher: "t1",
    room: "R-303",
    seats: 40,
    enrolled: 27,
    slots: [
      [0, 4],
      [2, 2],
    ],
  },
  {
    id: "o12",
    course: "CSE3203",
    section: "A",
    teacher: "t5",
    room: "R-301",
    seats: 45,
    enrolled: 18,
    slots: [
      [4, 0],
      [0, 0],
    ],
  },
];

export interface Student {
  id: string;
  name: string;
  studentId: string;
  batch: string;
  cgpa: number;
  advisor: string;
  history: { course: string; grade: string; semester: string }[];
}

export const STUDENTS: Student[] = [
  {
    id: "s1",
    name: "Rafiq Ahmed",
    studentId: "2022-CSE-041",
    batch: "2022",
    cgpa: 3.42,
    advisor: "t2",
    history: [
      { course: "CSE1101", grade: "A", semester: "Spring 2023" },
      { course: "CSE1102", grade: "A-", semester: "Spring 2023" },
      { course: "MAT1101", grade: "B+", semester: "Spring 2023" },
      { course: "CSE1201", grade: "A-", semester: "Fall 2023" },
      { course: "CSE1202", grade: "A", semester: "Fall 2023" },
      { course: "CSE2101", grade: "B+", semester: "Spring 2024" },
      { course: "CSE2102", grade: "A-", semester: "Spring 2024" },
      { course: "CSE2103", grade: "B", semester: "Spring 2024" },
      { course: "CSE2201", grade: "A-", semester: "Fall 2024" },
      { course: "CSE2202", grade: "B+", semester: "Fall 2024" },
    ],
  },
  {
    id: "s2",
    name: "Mitu Akter",
    studentId: "2023-CSE-017",
    batch: "2023",
    cgpa: 2.85,
    advisor: "t2",
    history: [
      { course: "CSE1101", grade: "B", semester: "Spring 2024" },
      { course: "CSE1102", grade: "B+", semester: "Spring 2024" },
      { course: "MAT1101", grade: "C+", semester: "Spring 2024" },
      { course: "CSE1201", grade: "B-", semester: "Fall 2024" },
      { course: "CSE1202", grade: "B", semester: "Fall 2024" },
    ],
  },
  {
    id: "s3",
    name: "Sabbir Hossain",
    studentId: "2023-CSE-052",
    batch: "2023",
    cgpa: 2.61,
    advisor: "t2",
    history: [
      { course: "CSE1101", grade: "C+", semester: "Spring 2024" },
      { course: "CSE1102", grade: "B-", semester: "Spring 2024" },
      { course: "MAT1101", grade: "C", semester: "Spring 2024" },
      { course: "CSE1201", grade: "F", semester: "Fall 2024" },
      { course: "CSE1202", grade: "C+", semester: "Fall 2024" },
    ],
  },
];

export const studentById = (id: string) => STUDENTS.find((s) => s.id === id);

export type RegStatus = "pending" | "approved" | "rejected" | "dropped";
export interface Registration {
  id: string;
  student: string;
  offering: string;
  status: RegStatus;
  note?: string | undefined;
}

export const REGISTRATIONS: Registration[] = [
  { id: "r1", student: "s1", offering: "o9", status: "approved" },
  { id: "r2", student: "s1", offering: "o11", status: "pending" },
  { id: "r3", student: "s2", offering: "o2", status: "pending" },
  { id: "r4", student: "s2", offering: "o4", status: "pending" },
  { id: "r5", student: "s3", offering: "o1", status: "pending" },
];

export type NoticeCategory = "Exam" | "Class" | "Event" | "Office";
export interface Notice {
  id: string;
  title: string;
  body: string;
  category: NoticeCategory;
  date: string;
  author: string;
  pinned?: boolean | undefined;
}

export const NOTICES: Notice[] = [
  {
    id: "n1",
    title: "Midterm examination schedule published",
    body: "Midterm exams for Fall 2026 run from 25 October to 1 November. Seat plans are posted outside Room 401. Bring your admit card and university ID.",
    category: "Exam",
    date: "2026-11-10",
    author: "Exam Committee",
    pinned: true,
  },
  {
    id: "n2",
    title: "Add/drop window closed — late requests need Head's approval",
    body: "The add/drop period ended on 20 September. Late changes require a written application to the Head of Department through your advisor.",
    category: "Office",
    date: "2026-11-08",
    author: "Department Office",
  },
  {
    id: "n3",
    title: "CSE Fest-26 Hackathon — team registration open",
    body: "Teams of 3–4 can register until 20 November. Problem sets cover smart campus, fintech and health. Venue: Auditorium, Academic Building 1.",
    category: "Event",
    date: "2026-11-06",
    author: "CSE Society",
  },
  {
    id: "n4",
    title: "CSE3103 make-up class on Thursday",
    body: "The Computer Networks class missed on 3 November will be held on Thursday 14:00–15:30 in R-302.",
    category: "Class",
    date: "2026-11-05",
    author: "Dr. Farhana Rahman",
  },
  {
    id: "n5",
    title: "Lab-2 closed for maintenance on 18 November",
    body: "All Lab-2 sessions on 18 November move to Lab-1 at the same time.",
    category: "Class",
    date: "2026-11-04",
    author: "Lab Office",
  },
  {
    id: "n6",
    title: "Industry talk: Building reliable systems at scale",
    body: "Guest talk by alumni engineers on 22 November, 15:30, Seminar Room. Open to all students.",
    category: "Event",
    date: "2026-11-02",
    author: "CSE Society",
  },
];

export interface Exam {
  course: string;
  kind: "Midterm" | "Final";
  date: string;
  time: string;
  room: string;
}
export const EXAMS: Exam[] = [
  { course: "CSE3103", kind: "Final", date: "2026-12-28", time: "10:00–13:00", room: "R-302" },
  { course: "CSE3201", kind: "Final", date: "2026-12-30", time: "10:00–13:00", room: "R-303" },
  { course: "CSE3105", kind: "Final", date: "2027-01-02", time: "10:00–13:00", room: "R-301" },
  { course: "CSE3101", kind: "Final", date: "2027-01-04", time: "14:00–17:00", room: "R-301" },
  { course: "CSE3102", kind: "Final", date: "2027-01-06", time: "10:00–12:00", room: "Lab-1" },
  { course: "CSE2101", kind: "Final", date: "2026-12-27", time: "10:00–13:00", room: "R-302" },
  { course: "CSE2103", kind: "Final", date: "2026-12-29", time: "14:00–17:00", room: "R-301" },
  { course: "CSE2203", kind: "Final", date: "2027-01-03", time: "10:00–13:00", room: "R-303" },
  { course: "CSE1201", kind: "Final", date: "2026-12-31", time: "10:00–13:00", room: "R-301" },
  { course: "CSE3203", kind: "Final", date: "2027-01-05", time: "10:00–13:00", room: "R-301" },
];

export interface Persona {
  role: Role;
  userId: string;
  name: string;
  subtitle: string;
}
export const PERSONAS: Persona[] = [
  { role: "student", userId: "s1", name: "Rafiq Ahmed", subtitle: "Student · 2022-CSE-041" },
  {
    role: "teacher",
    userId: "t3",
    name: "Nusrat Jahan",
    subtitle: "Teacher · Assistant Professor",
  },
  { role: "advisor", userId: "t2", name: "Dr. Mahbub Alam", subtitle: "Academic Advisor" },
  {
    role: "coordinator",
    userId: "t1",
    name: "Dr. Farhana Rahman",
    subtitle: "Department Coordinator",
  },
];

export const ROLE_LABEL: Record<Role, string> = {
  student: "Student",
  teacher: "Teacher",
  advisor: "Advisor",
  coordinator: "Coordinator",
};
