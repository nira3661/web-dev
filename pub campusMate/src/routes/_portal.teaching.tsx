import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, StatCard } from "@/components/campus/PageHeader";
import { TimetableGrid } from "@/components/campus/TimetableGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  DAYS,
  FACULTY,
  ROOMS,
  SLOTS,
  courseByCode,
  type Designation,
  type Slot,
} from "@/lib/campus/data";
import { teachingLoad } from "@/lib/campus/rules";
import { useCampus } from "@/lib/campus/store";

export const Route = createFileRoute("/_portal/teaching")({
  head: () => ({
    meta: [
      { title: "Teaching & load — PUB CampusMate" },
      {
        name: "description",
        content: "Teacher availability, assigned courses, teaching load rules and make-up classes.",
      },
      { property: "og:title", content: "Teaching & load — PUB CampusMate" },
      {
        property: "og:description",
        content: "Teacher availability, assigned courses, teaching load rules and make-up classes.",
      },
    ],
  }),
  component: TeachingPage,
});

function TeachingPage() {
  const { state } = useCampus();
  return state.session!.role === "teacher" ? (
    <TeacherView id={state.session!.userId} />
  ) : (
    <CoordinatorView />
  );
}

function TeacherView({ id }: { id: string }) {
  const { state, dispatch } = useCampus();
  const { load, normal, extra, courses } = teachingLoad(id, state.offerings, state.rules);
  const [offering, setOffering] = useState(courses[0]?.id ?? "");
  const [day, setDay] = useState("4");
  const [slot, setSlot] = useState("4");
  const [room, setRoom] = useState("R-303");
  const [reason, setReason] = useState("");
  const myMakeups = state.makeups.filter((m) => courses.some((c) => c.id === m.offering));

  return (
    <>
      <PageHeader
        eyebrow="Teaching"
        title="My courses & availability"
        description="Click any slot in the grid to mark yourself unavailable. The coordinator sees these when planning the routine."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          tone="accent"
          label="Load"
          value={load}
          hint={`Lab credits × ${state.rules.labWeight}`}
        />
        <StatCard label="Normal load" value={normal} hint="For your designation" />
        <StatCard label="Extra load" value={extra} tone={extra ? "warn" : "default"} />
      </div>
      <TimetableGrid
        entries={courses.map((o) => ({ offering: o }))}
        unavailable={state.unavailability[id]}
        onCellClick={(d, s) => {
          dispatch({ type: "toggleUnavailable", teacher: id, slot: [d, s] as Slot });
        }}
      />
      <p className="mt-2 text-sm text-muted-foreground">
        Striped cells are times you're unavailable.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <CalendarPlus className="h-5 w-5 text-primary" /> Propose a make-up class
          </h2>
          <div className="grid gap-3">
            <div className="space-y-1.5">
              <Label>Course</Label>
              <Select value={offering} onValueChange={setOffering}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.course} · {courseByCode(o.course)?.title} ({o.section})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1.5">
                <Label>Day</Label>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((d, i) => (
                      <SelectItem key={d} value={String(i)}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Time</Label>
                <Select value={slot} onValueChange={setSlot}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SLOTS.map((t, i) => (
                      <SelectItem key={t} value={String(i)}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Room</Label>
                <Select value={room} onValueChange={setRoom}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROOMS.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reason">Reason</Label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Class missed for faculty meeting"
              />
            </div>
            <Button
              disabled={!offering || !reason.trim()}
              onClick={() => {
                dispatch({
                  type: "proposeMakeup",
                  offering,
                  slot: [Number(day), Number(slot)],
                  room,
                  reason,
                });
                setReason("");
                toast.success("Make-up class sent to the coordinator");
              }}
            >
              Send proposal
            </Button>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <h2 className="mb-4 text-xl font-semibold">My proposals</h2>
          {myMakeups.length === 0 ? (
            <p className="text-muted-foreground">No make-up classes proposed yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {myMakeups.map((m) => {
                const o = state.offerings.find((x) => x.id === m.offering)!;
                return (
                  <li key={m.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">
                        {o.course} · {DAYS[m.slot[0]]} {SLOTS[m.slot[1]]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {m.room} · {m.reason}
                      </p>
                    </div>
                    <Badge
                      variant={m.status === "approved" ? "default" : "outline"}
                      className="capitalize"
                    >
                      {m.status}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function CoordinatorView() {
  const { state, dispatch } = useCampus();
  const rules = state.rules;
  const proposals = state.makeups.filter((m) => m.status === "proposed");
  return (
    <>
      <PageHeader
        eyebrow="Faculty planning"
        title="Teaching load"
        description="Load is calculated from assigned sections using the rules on the right. Reassign teachers from the routine planner."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">Teacher</th>
                  <th className="p-3">Courses</th>
                  <th className="p-3 text-right">Load</th>
                  <th className="p-3 text-right">Normal</th>
                  <th className="p-3 text-right">Extra</th>
                </tr>
              </thead>
              <tbody>
                {FACULTY.map((f) => {
                  const l = teachingLoad(f.id, state.offerings, rules);
                  return (
                    <tr key={f.id} className="border-t border-border">
                      <td className="p-3">
                        <p className="font-semibold">{f.name}</p>
                        <p className="text-xs text-muted-foreground">{f.designation}</p>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {l.courses.map((o) => `${o.course}${o.section}`).join(", ") || "—"}
                      </td>
                      <td className="p-3 text-right font-display text-lg font-semibold tabular-nums">
                        {l.load}
                      </td>
                      <td className="p-3 text-right tabular-nums">{l.normal}</td>
                      <td className="p-3 text-right">
                        {l.extra > 0 ? (
                          <Badge className="bg-warning text-warning-foreground hover:bg-warning">
                            +{l.extra}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h2 className="mb-4 text-xl font-semibold">Make-up class requests</h2>
            {proposals.length === 0 ? (
              <p className="text-muted-foreground">
                No requests waiting. Teachers can propose them from their Teaching page.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {proposals.map((m) => {
                  const o = state.offerings.find((x) => x.id === m.offering)!;
                  return (
                    <li key={m.id} className="flex items-center justify-between gap-3 py-3">
                      <div>
                        <p className="font-medium">
                          {o.course} · {DAYS[m.slot[0]]} {SLOTS[m.slot[1]]} · {m.room}
                        </p>
                        <p className="text-sm text-muted-foreground">{m.reason}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          dispatch({ type: "approveMakeup", id: m.id });
                          toast.success("Make-up class approved", {
                            description: "Enrolled students were notified.",
                          });
                        }}
                      >
                        <Check className="mr-1 h-4 w-4" /> Approve
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-lg font-semibold">Load rules</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Theory credits count once. Lab credits are weighted.
          </p>
          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-sm">
              <Label>Lab credit weight</Label>
              <span className="font-semibold">× {rules.labWeight.toFixed(2)}</span>
            </div>
            <Slider
              min={1}
              max={2.5}
              step={0.25}
              value={[rules.labWeight]}
              onValueChange={([v]) =>
                dispatch({ type: "setRules", rules: { ...rules, labWeight: v ?? rules.labWeight } })
              }
            />
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold">Normal load by designation</p>
            {(Object.keys(rules.normal) as Designation[]).map((d) => (
              <div key={d} className="flex items-center justify-between gap-3">
                <Label className="text-sm font-normal">{d}</Label>
                <Input
                  type="number"
                  className="w-20"
                  value={rules.normal[d]}
                  onChange={(e) =>
                    dispatch({
                      type: "setRules",
                      rules: {
                        ...rules,
                        normal: { ...rules.normal, [d]: Number(e.target.value) || 0 },
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
