import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BellRing,
  BookOpenCheck,
  CalendarClock,
  CalendarRange,
  CheckCircle2,
  GraduationCap,
  Languages,
  MessagesSquare,
  ShieldCheck,
  Users2,
} from "lucide-react";
import campus from "@/assets/campus-courtyard.jpg";
import { Logo } from "@/components/campus/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PUB CampusMate — One home for your academic life" },
      {
        name: "description",
        content:
          "Class routines, exam schedules, notices, clash-free course registration and a bilingual AI helpdesk for PUB CSE students and faculty.",
      },
      { property: "og:title", content: "PUB CampusMate — One home for your academic life" },
      {
        property: "og:description",
        content:
          "Clash-free registration, routine planning, notices and a bilingual helpdesk for PUB CSE.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: CalendarClock,
    title: "Personal timetable",
    body: "Classes, exams and room changes in one weekly view, updated the moment the routine is published.",
  },
  {
    icon: BellRing,
    title: "Notices that find you",
    body: "Exam, class, event and office notices with alerts sent only to the people they affect.",
  },
  {
    icon: BookOpenCheck,
    title: "Clash-free registration",
    body: "Prerequisites, credit limit, seats and timetable clashes are checked before a request ever reaches your advisor.",
  },
  {
    icon: CalendarRange,
    title: "Routine planner",
    body: "Coordinators place sections, catch teacher, room and section clashes, then publish with full version history.",
  },
  {
    icon: Users2,
    title: "Fair teaching load",
    body: "Normal and extra load calculated from configurable rules, plus availability and make-up class requests.",
  },
  {
    icon: MessagesSquare,
    title: "Helpdesk that cites",
    body: "Ask about courses, rules or the calendar in Bangla or English. Every answer shows its source — or says it doesn't know.",
  },
];

const ROLES = [
  {
    name: "Student",
    does: "Views schedules and notices, registers for courses, asks the helpdesk.",
  },
  {
    name: "Teacher",
    does: "Sets availability, sees assigned courses and load, proposes make-up classes.",
  },
  { name: "Academic Advisor", does: "Approves or rejects registration and add/drop requests." },
  {
    name: "Department Coordinator",
    does: "Manages offerings, the routine, notices and helpdesk documents.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Logo light />
          <nav className="hidden items-center gap-8 text-sm font-medium text-sidebar-foreground/80 md:flex">
            <a href="#features" className="hover:text-sidebar-foreground">
              Features
            </a>
            <a href="#roles" className="hover:text-sidebar-foreground">
              Who it's for
            </a>
            <a href="#helpdesk" className="hover:text-sidebar-foreground">
              Helpdesk
            </a>
          </nav>
          <Button asChild variant="secondary" size="sm">
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-sidebar">
        <img
          src={campus}
          alt="Students walking through a red-brick university courtyard"
          width={1536}
          height={1024}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 -z-10 bg-hero-fade" />
        <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32">
          <p className="animate-rise mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
            CSE Fest-26 · Track C · Smart Campus
          </p>
          <h1
            className="animate-rise max-w-4xl text-5xl font-semibold leading-[1.02] text-sidebar-accent-foreground md:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Your whole semester, <em className="font-normal italic text-accent">finally</em> in one
            place.
          </h1>
          <p
            className="animate-rise mt-6 max-w-2xl text-lg text-sidebar-foreground/85"
            style={{ animationDelay: "160ms" }}
          >
            PUB CampusMate brings routines, exam schedules, notices and course registration together
            — and answers your academic questions from official department documents.
          </p>
          <div
            className="animate-rise mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/login">
                Open the demo <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-sidebar-foreground/30 bg-transparent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <a href="#features">See what's inside</a>
            </Button>
          </div>
          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-sidebar-foreground/20 pt-8 md:grid-cols-4">
            {[
              ["17", "courses in the curriculum"],
              ["14", "sections this semester"],
              ["4", "roles, one platform"],
              ["2", "languages in the helpdesk"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-4xl font-semibold text-accent">{n}</dt>
                <dd className="mt-1 text-sm text-sidebar-foreground/75">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Problem */}
      <section className="paper-grain border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.3fr]">
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
            Notice boards, group chats, and a trip to the office — for one answer.
          </h2>
          <div className="space-y-5 text-lg text-muted-foreground">
            <p>
              Routines, exam dates and rules are scattered across boards, social media and
              paperwork. Registration and routine planning happen by hand, so clashes are found
              late.
            </p>
            <p className="text-foreground">
              CampusMate replaces that with one platform: students follow their academic life, the
              department plans the semester, and the helpdesk answers questions straight from the
              official documents.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-brick">What's inside</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-semibold md:text-5xl">
          Built around how a department actually runs.
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group bg-card p-8 transition-colors hover:bg-secondary/60"
            >
              <f.icon className="h-7 w-7 text-primary transition-transform group-hover:-translate-y-0.5" />
              <h3 className="mt-6 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration checks */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Course registration
            </p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
              Every request is checked before it's sent.
            </h2>
            <p className="mt-5 text-lg text-primary-foreground/80">
              Students see exactly why a section can't be added, and advisors only review requests
              that already pass the rules.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              ["Prerequisites", "CSE3101 needs CSE2101 and CSE2203 passed"],
              ["Credit limit", "18 credits at CGPA 3.00+, 15 below"],
              ["Seat capacity", "Full sections are blocked, with an alternative suggested"],
              ["Timetable clash", "Two classes in the same slot are caught instantly"],
              ["Advisor approval", "Approved, rejected or dropped — with a note"],
            ].map(([t, d]) => (
              <li
                key={t}
                className="flex gap-4 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="text-sm text-primary-foreground/70">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-brick">Who it's for</p>
        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
          Four roles. Each sees what they need.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {ROLES.map((r, i) => (
            <div key={r.name} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <span className="font-display text-5xl font-semibold text-accent">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold">{r.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.does}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Helpdesk */}
      <section id="helpdesk" className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2">
          <div className="space-y-4">
            <div className="ml-auto w-fit max-w-sm rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-primary-foreground">
              ফাইনাল পরীক্ষা কবে শুরু?
            </div>
            <div className="max-w-md rounded-2xl rounded-bl-sm border border-border bg-card p-4 shadow-soft">
              <p>ফাইনাল পরীক্ষা ২৭ ডিসেম্বর ২০২৬ – ১০ জানুয়ারি ২০২৭ পর্যন্ত চলবে।</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                <BookOpenCheck className="h-3.5 w-3.5" /> CSE Academic Calendar, Fall 2026 · Key
                dates
              </p>
            </div>
            <div className="ml-auto w-fit max-w-sm rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-primary-foreground">
              How much is the semester fee?
            </div>
            <div className="max-w-md rounded-2xl rounded-bl-sm border border-dashed border-border bg-card p-4 text-muted-foreground">
              I couldn't find this in the official department documents, so I won't guess.
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brick">
              AI helpdesk
            </p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
              Answers you can trace back to the rulebook.
            </h2>
            <div className="mt-8 space-y-4">
              {[
                [
                  Languages,
                  "Bangla and English",
                  "Ask the way you'd ask a senior — it replies in the same language.",
                ],
                [
                  ShieldCheck,
                  "Sources on every answer",
                  "Each reply names the document and section it came from.",
                ],
                [
                  GraduationCap,
                  "Honest when unsure",
                  "If the documents don't cover it, it says so instead of making something up.",
                ],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Languages;
                return (
                  <div key={t as string} className="flex gap-4">
                    <I className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold">{t as string}</p>
                      <p className="text-muted-foreground">{d as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold md:text-6xl">
          Try it as a student, teacher, advisor or coordinator.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          The demo is loaded with one department, one semester and sample student histories.
        </p>
        <Button asChild size="lg" className="mt-9">
          <Link to="/login">
            Choose a role <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <Logo />
          <p>Built for PUB CSE Fest-26 Hackathon · Department of Computer Science & Engineering</p>
        </div>
      </footer>
    </div>
  );
}
