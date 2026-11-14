import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { PageHeader, StatCard } from "@/components/campus/PageHeader";
import { TimetableGrid } from "@/components/campus/TimetableGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SLOTS, STUDENTS, courseByCode, studentById } from "@/lib/campus/data";
import { teachingLoad } from "@/lib/campus/rules";
import {
  conflictIds,
  examsFor,
  fmtDate,
  routineConflicts,
  studentCredits,
  studentOfferings,
} from "@/lib/campus/selectors";
import { useCampus, type CampusState } from "@/lib/campus/store";

export const Route = createFileRoute("/_portal/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — PUB CampusMate" },
      { name: "description", content: "Your classes, exams, notices and tasks for the semester." },
      { property: "og:title", content: "Dashboard — PUB CampusMate" },
      {
        property: "og:description",
        content: "Your classes, exams, notices and tasks for the semester.",
      },
    ],
  }),
  component: Dashboard,
});

const TODAY = 1; // Monday in the demo week

function Dashboard() {
  const { state } = useCampus();
  const me = state.session!;
  const first = me.name.replace("Dr. ", "").split(" ")[0];
  return (
    <>
      <PageHeader
        eyebrow="Monday, 16 November"
        title={`Good morning, ${first}.`}
        description="Here's what's happening across your semester."
      />
      {me.role === "student" && <StudentDash state={state} id={me.userId} />}
      {me.role === "teacher" && <TeacherDash state={state} id={me.userId} />}
      {me.role === "advisor" && <AdvisorDash state={state} />}
      {me.role === "coordinator" && <CoordinatorDash state={state} />}
    </>
  );
}

function NoticeList({ state }: { state: CampusState }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Latest notices</h2>
        <Link to="/notices" className="text-sm font-medium text-primary hover:underline">
          All notices
        </Link>
      </div>
      <ul className="space-y-4">
        {state.notices.slice(0, 4).map((n) => (
          <li key={n.id} className="border-l-2 border-accent pl-3">
            <p className="text-xs text-muted-foreground">
              {n.category} · {fmtDate(n.date)}
            </p>
            <p className="font-medium">{n.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StudentDash({ state, id }: { state: CampusState; id: string }) {
  const mine = studentOfferings(state, id);
  const { used, limit } = studentCredits(state, id);
  const student = studentById(id)!;
  const today = mine
    .flatMap(({ offering, reg }) =>
      offering.slots.filter(([d]) => d === TODAY).map(([, s]) => ({ offering, reg, s })),
    )
    .sort((a, b) => a.s - b.s);
  const exams = examsFor(
    mine.filter((m) => m.reg.status === "approved").map((m) => m.offering.course),
  );
  const pending = mine.filter((m) => m.reg.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          tone="accent"
          label="CGPA"
          value={student.cgpa.toFixed(2)}
          hint={`${student.studentId}`}
        />
        <StatCard label="Credits this term" value={`${used}/${limit}`} hint="Pending + approved" />
        <StatCard
          label="Awaiting approval"
          value={pending}
          hint="Requests with your advisor"
          tone={pending ? "warn" : "default"}
        />
        <StatCard
          label="Next exam"
          value={exams[0] ? fmtDate(exams[0].date) : "—"}
          hint={exams[0] ? exams[0].course : "No approved courses"}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <h2 className="mb-4 text-xl font-semibold">Today's classes</h2>
          {today.length === 0 ? (
            <p className="text-muted-foreground">No classes today. Enjoy the break.</p>
          ) : (
            <ul className="divide-y divide-border">
              {today.map(({ offering, reg, s }) => (
                <li key={offering.id + s} className="flex items-center gap-4 py-3">
                  <div className="w-24 text-sm font-semibold text-primary">
                    <Clock className="mr-1 inline h-3.5 w-3.5" />
                    {SLOTS[s]?.split("–")[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{courseByCode(offering.course)?.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {offering.course} · <MapPin className="inline h-3 w-3" /> {offering.room}
                    </p>
                  </div>
                  {reg.status === "pending" && <Badge variant="outline">Pending</Badge>}
                </li>
              ))}
            </ul>
          )}
        </div>
        <NoticeList state={state} />
      </div>
      <div>
        <h2 className="mb-3 text-xl font-semibold">My weekly timetable</h2>
        <TimetableGrid
          entries={mine.map((m) => ({
            offering: m.offering,
            tone: m.reg.status === "pending" ? "pending" : "default",
          }))}
        />
      </div>
      <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
        <h2 className="mb-4 text-xl font-semibold">Exam schedule</h2>
        {exams.length === 0 ? (
          <p className="text-muted-foreground">Exams appear here once your courses are approved.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {exams.map((e) => (
              <div key={e.course} className="rounded-lg bg-secondary/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-brick">
                  {e.kind}
                </p>
                <p className="mt-1 font-semibold">
                  {e.course} · {courseByCode(e.course)?.title}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
                  {fmtDate(e.date)} · {e.time} · {e.room}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TeacherDash({ state, id }: { state: CampusState; id: string }) {
  const { load, normal, extra, courses } = teachingLoad(id, state.offerings, state.rules);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard tone="accent" label="Teaching load" value={load} hint={`Normal load ${normal}`} />
        <StatCard
          label="Extra load"
          value={extra}
          tone={extra ? "warn" : "default"}
          hint={extra ? "Above normal — paid as extra" : "Within normal load"}
        />
        <StatCard label="Sections" value={courses.length} hint="Assigned this semester" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-3 text-xl font-semibold">My teaching week</h2>
          <TimetableGrid
            entries={courses.map((o) => ({ offering: o }))}
            unavailable={state.unavailability[id]}
          />
        </div>
        <NoticeList state={state} />
      </div>
      <Button asChild>
        <Link to="/teaching">
          Set availability or propose a make-up class <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

function AdvisorDash({ state }: { state: CampusState }) {
  const pending = state.registrations.filter((r) => r.status === "pending");
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          tone={pending.length ? "warn" : "default"}
          label="Waiting for you"
          value={pending.length}
          hint="Registration requests"
        />
        <StatCard label="Advisees" value={STUDENTS.length} hint="Batch 2022–23" />
        <StatCard
          label="Approved this term"
          value={state.registrations.filter((r) => r.status === "approved").length}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pending requests</h2>
            <Link to="/registration" className="text-sm font-medium text-primary hover:underline">
              Review all
            </Link>
          </div>
          {pending.length === 0 ? (
            <p className="text-muted-foreground">Nothing to review.</p>
          ) : (
            <ul className="divide-y divide-border">
              {pending.map((r) => {
                const o = state.offerings.find((x) => x.id === r.offering)!;
                return (
                  <li key={r.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">{studentById(r.student)?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {o.course} · {courseByCode(o.course)?.title}
                      </p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <NoticeList state={state} />
      </div>
    </div>
  );
}

function CoordinatorDash({ state }: { state: CampusState }) {
  const conflicts = routineConflicts(state);
  const ids = conflictIds(state);
  const v = state.versions[state.versions.length - 1]!;
  const seats = state.offerings.reduce((s, o) => s + o.seats, 0);
  const enrolled = state.offerings.reduce((s, o) => s + o.enrolled, 0);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          tone="accent"
          label="Sections offered"
          value={state.offerings.length}
          hint="Fall 2026"
        />
        <StatCard
          tone={conflicts.length ? "danger" : "default"}
          label="Routine clashes"
          value={conflicts.length}
          hint={conflicts.length ? "Fix before publishing" : "Ready to publish"}
        />
        <StatCard
          label="Seats filled"
          value={`${Math.round((enrolled / seats) * 100)}%`}
          hint={`${enrolled} of ${seats}`}
        />
        <StatCard label="Published routine" value={`v${v.version}`} hint={fmtDate(v.date)} />
      </div>
      {conflicts.length > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
            <div>
              <p className="font-semibold">
                {conflicts.length} clash{conflicts.length > 1 ? "es" : ""} in the draft routine
              </p>
              <p className="text-sm text-muted-foreground">
                {conflicts[0]?.message}
                {conflicts.length > 1 ? ` and ${conflicts.length - 1} more` : ""}.
              </p>
            </div>
          </div>
          <Button asChild>
            <Link to="/routine">Open routine planner</Link>
          </Button>
        </div>
      )}
      <div>
        <h2 className="mb-3 text-xl font-semibold">Draft routine at a glance</h2>
        <TimetableGrid
          compact
          showTeacher
          entries={state.offerings.map((o) => ({
            offering: o,
            tone: ids.has(o.id) ? "conflict" : "default",
          }))}
        />
      </div>
    </div>
  );
}
