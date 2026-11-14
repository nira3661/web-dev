import { createFileRoute } from "@tanstack/react-router";
import { Check, CircleAlert, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, StatCard } from "@/components/campus/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DAYS,
  SLOTS,
  courseByCode,
  facultyById,
  studentById,
  type RegStatus,
} from "@/lib/campus/data";
import { checkRegistration, creditLimit, passedCourses } from "@/lib/campus/rules";
import { studentCredits } from "@/lib/campus/selectors";
import { useCampus } from "@/lib/campus/store";

export const Route = createFileRoute("/_portal/registration")({
  head: () => ({
    meta: [
      { title: "Course registration — PUB CampusMate" },
      {
        name: "description",
        content:
          "Register for Fall 2026 courses with prerequisite, credit, seat and clash checks, and advisor approval.",
      },
      { property: "og:title", content: "Course registration — PUB CampusMate" },
      {
        property: "og:description",
        content: "Clash-free course registration with advisor approval.",
      },
    ],
  }),
  component: RegistrationPage,
});

const STATUS_STYLE: Record<RegStatus, string> = {
  pending: "border-warning bg-warning/25 text-warning-foreground",
  approved: "border-success bg-success/15 text-foreground",
  rejected: "border-destructive bg-destructive/10 text-destructive",
  dropped: "border-border bg-muted text-muted-foreground",
};

function StatusBadge({ status }: { status: RegStatus }) {
  return (
    <Badge variant="outline" className={`capitalize ${STATUS_STYLE[status]}`}>
      {status}
    </Badge>
  );
}

function RegistrationPage() {
  const { state } = useCampus();
  const me = state.session!;
  if (me.role === "student") return <StudentRegistration studentId={me.userId} />;
  if (me.role === "advisor") return <AdvisorQueue />;
  return <SeatOverview />;
}

const slotText = (slots: [number, number][]) =>
  slots.map(([d, s]) => `${DAYS[d]} ${SLOTS[s]?.split("–")[0]}`).join(", ");

function StudentRegistration({ studentId }: { studentId: string }) {
  const { state, dispatch } = useCampus();
  const student = studentById(studentId)!;
  const { used, limit } = studentCredits(state, studentId);
  const [q, setQ] = useState("");
  const [showPassed, setShowPassed] = useState(false);
  const mine = state.registrations.filter((r) => r.student === studentId);
  const passed = passedCourses(student);

  const list = state.offerings
    .filter((o) => {
      const c = courseByCode(o.course)!;
      if (!showPassed && passed.has(o.course)) return false;
      return `${o.course} ${c.title}`.toLowerCase().includes(q.toLowerCase());
    })
    .sort((a, b) => a.course.localeCompare(b.course));

  return (
    <>
      <PageHeader
        eyebrow="Fall 2026 · Add/drop open (demo)"
        title="Course registration"
        description="Every section is checked against your history before you can request it. Your advisor approves the final list."
      />
      <div className="mb-8 grid gap-4 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-baseline justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Credits requested
            </p>
            <p className="font-display text-2xl font-semibold">
              {used} <span className="text-base text-muted-foreground">/ {limit}</span>
            </p>
          </div>
          <Progress value={(used / limit) * 100} className="mt-3" />
          <p className="mt-2 text-sm text-muted-foreground">
            Limit {creditLimit(student.cgpa)} credits for CGPA {student.cgpa.toFixed(2)}.
          </p>
        </div>
        <StatCard
          label="Courses passed"
          value={passed.size}
          hint={`${student.history.length} attempts on record`}
        />
        <StatCard
          label="Advisor"
          value={facultyById(student.advisor)?.name.replace("Dr. ", "") ?? ""}
          hint="Approves your requests"
        />
      </div>

      <Tabs defaultValue="offerings">
        <TabsList>
          <TabsTrigger value="offerings">Available sections</TabsTrigger>
          <TabsTrigger value="mine">
            My requests ({mine.filter((r) => r.status !== "dropped").length})
          </TabsTrigger>
          <TabsTrigger value="history">Academic history</TabsTrigger>
        </TabsList>

        <TabsContent value="offerings" className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Input
              placeholder="Search by course code or title"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="max-w-sm"
            />
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Switch checked={showPassed} onCheckedChange={setShowPassed} /> Show courses I've
              passed
            </label>
          </div>
          <div className="grid gap-3">
            {list.map((o) => {
              const c = courseByCode(o.course)!;
              const issues = checkRegistration(student, o, state.registrations, state.offerings);
              const reg = mine.find((r) => r.offering === o.id && r.status !== "dropped");
              const ok = issues.length === 0;
              return (
                <div
                  key={o.id}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">
                        {o.course} · {c.title}
                      </span>
                      <Badge variant="secondary">Sec {o.section}</Badge>
                      <Badge variant="outline">{c.credits} cr</Badge>
                      {reg && <StatusBadge status={reg.status} />}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {slotText(o.slots)} · {o.room} · {facultyById(o.teacher)?.name} ·{" "}
                      {o.seats - o.enrolled} of {o.seats} seats left
                    </p>
                    {!reg && issues.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {issues.map((i) => (
                          <li
                            key={i.code}
                            className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive"
                          >
                            <CircleAlert className="h-3 w-3" /> {i.message}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {!reg && (
                    <Button
                      size="sm"
                      disabled={!ok}
                      onClick={() => {
                        dispatch({ type: "register", student: studentId, offering: o.id });
                        toast.success(`${o.course} requested`, {
                          description: "Sent to your advisor for approval.",
                        });
                      }}
                    >
                      <Plus className="mr-1 h-4 w-4" /> Request
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="mine" className="mt-4">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {mine.length === 0 && <p className="p-6 text-muted-foreground">No requests yet.</p>}
            {mine.map((r) => {
              const o = state.offerings.find((x) => x.id === r.offering)!;
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-4 border-b border-border p-4 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-semibold">
                      {o.course} · {courseByCode(o.course)?.title} ({o.section})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {slotText(o.slots)} · {o.room}
                      {r.note ? ` · Advisor: "${r.note}"` : ""}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                  {(r.status === "pending" || r.status === "approved") && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        dispatch({ type: "drop", registration: r.id });
                        toast(`${o.course} dropped`);
                      }}
                    >
                      Drop
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {student.history.map((h) => (
              <div
                key={h.course + h.semester}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
              >
                <div>
                  <p className="font-medium">
                    {h.course} · {courseByCode(h.course)?.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{h.semester}</p>
                </div>
                <span
                  className={`font-display text-xl font-semibold ${h.grade === "F" ? "text-destructive" : "text-primary"}`}
                >
                  {h.grade}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

function AdvisorQueue() {
  const { state, dispatch } = useCampus();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const pending = state.registrations.filter((r) => r.status === "pending");
  const decided = state.registrations.filter(
    (r) => r.status === "approved" || r.status === "rejected",
  );

  return (
    <>
      <PageHeader
        eyebrow="Academic advising"
        title="Registration approvals"
        description="Requests already pass prerequisite, credit, seat and clash checks. Add a note when you reject."
      />
      <h2 className="mb-3 text-xl font-semibold">Waiting for you ({pending.length})</h2>
      <div className="mb-10 grid gap-3">
        {pending.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-6 text-muted-foreground">
            All caught up.
          </p>
        )}
        {pending.map((r) => {
          const s = studentById(r.student)!;
          const o = state.offerings.find((x) => x.id === r.offering)!;
          const c = courseByCode(o.course)!;
          const { used, limit } = studentCredits(state, s.id);
          return (
            <div
              key={r.id}
              className="grid gap-4 rounded-xl border border-border bg-card p-5 shadow-soft md:grid-cols-[1fr_1fr_auto] md:items-center"
            >
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-muted-foreground">
                  {s.studentId} · CGPA {s.cgpa.toFixed(2)} · {used}/{limit} credits
                </p>
              </div>
              <div>
                <p className="font-medium">
                  {o.course} · {c.title} ({o.section})
                </p>
                <p className="text-sm text-muted-foreground">
                  {c.credits} cr · {slotText(o.slots)} ·{" "}
                  {s.history.some((h) => h.course === o.course && h.grade === "F")
                    ? "Retake of an F"
                    : "First attempt"}
                </p>
              </div>
              <div className="flex flex-col gap-2 md:w-64">
                <Input
                  placeholder="Note (optional)"
                  value={notes[r.id] ?? ""}
                  onChange={(e) => setNotes({ ...notes, [r.id]: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      dispatch({
                        type: "decide",
                        registration: r.id,
                        approve: true,
                        note: notes[r.id],
                      });
                      toast.success(`Approved ${o.course} for ${s.name}`);
                    }}
                  >
                    <Check className="mr-1 h-4 w-4" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      dispatch({
                        type: "decide",
                        registration: r.id,
                        approve: false,
                        note: notes[r.id],
                      });
                      toast(`Rejected ${o.course} for ${s.name}`);
                    }}
                  >
                    <X className="mr-1 h-4 w-4" /> Reject
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h2 className="mb-3 text-xl font-semibold">Decided</h2>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {decided.map((r) => {
          const o = state.offerings.find((x) => x.id === r.offering)!;
          return (
            <div
              key={r.id}
              className="flex items-center justify-between border-b border-border p-4 last:border-0"
            >
              <p>
                <span className="font-medium">{studentById(r.student)?.name}</span>{" "}
                <span className="text-muted-foreground">
                  · {o.course} ({o.section})
                </span>
              </p>
              <StatusBadge status={r.status} />
            </div>
          );
        })}
      </div>
    </>
  );
}

function SeatOverview() {
  const { state } = useCampus();
  return (
    <>
      <PageHeader
        eyebrow="Offerings"
        title="Sections & seats"
        description="Seat usage for every section offered this semester."
      />
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-3">Course</th>
              <th className="p-3">Teacher</th>
              <th className="p-3">Room</th>
              <th className="p-3 w-64">Seats</th>
              <th className="p-3">Pending</th>
            </tr>
          </thead>
          <tbody>
            {state.offerings.map((o) => {
              const pend = state.registrations.filter(
                (r) => r.offering === o.id && r.status === "pending",
              ).length;
              const pct = Math.round((o.enrolled / o.seats) * 100);
              return (
                <tr key={o.id} className="border-t border-border">
                  <td className="p-3">
                    <span className="font-semibold">{o.course}</span> ·{" "}
                    {courseByCode(o.course)?.title} ({o.section})
                  </td>
                  <td className="p-3">{facultyById(o.teacher)?.name}</td>
                  <td className="p-3">{o.room}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Progress value={pct} className="h-2" />
                      <span className="w-14 text-right tabular-nums">
                        {o.enrolled}/{o.seats}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">{pend || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
