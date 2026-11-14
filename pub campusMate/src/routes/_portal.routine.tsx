import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, History, Sparkles, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/campus/PageHeader";
import { TimetableGrid } from "@/components/campus/TimetableGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  DAYS,
  FACULTY,
  ROOMS,
  SLOTS,
  courseByCode,
  type Offering,
  type Slot,
} from "@/lib/campus/data";
import { suggestSlot } from "@/lib/campus/rules";
import { conflictIds, fmtDate, routineConflicts } from "@/lib/campus/selectors";
import { useCampus } from "@/lib/campus/store";

export const Route = createFileRoute("/_portal/routine")({
  head: () => ({
    meta: [
      { title: "Class routine — PUB CampusMate" },
      {
        name: "description",
        content: "The Fall 2026 CSE class routine with clash detection and version history.",
      },
      { property: "og:title", content: "Class routine — PUB CampusMate" },
      {
        property: "og:description",
        content: "The Fall 2026 CSE class routine with clash detection and version history.",
      },
    ],
  }),
  component: RoutinePage,
});

const TERMS = ["all", "1-2", "2-1", "2-2", "3-1", "3-2"];

function RoutinePage() {
  const { state, dispatch } = useCampus();
  const me = state.session!;
  const isCoord = me.role === "coordinator";
  const [term, setTerm] = useState("all");
  const [editing, setEditing] = useState<Offering | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);
  const [note, setNote] = useState("");

  // Students and teachers see the last published routine; the coordinator edits the live draft.
  const published = state.versions[state.versions.length - 1]!;
  const source = isCoord ? state.offerings : published.snapshot;
  const conflicts = routineConflicts(state);
  const ids = conflictIds(state);
  const shown = source.filter((o) => term === "all" || courseByCode(o.course)?.term === term);
  const dirty = JSON.stringify(published.snapshot) !== JSON.stringify(state.offerings);

  return (
    <>
      <PageHeader
        eyebrow={isCoord ? "Routine planner" : `Published routine · v${published.version}`}
        title="Class routine, Fall 2026"
        description={
          isCoord
            ? "Click a class to move it, change the room or reassign the teacher. Clashes are flagged in red."
            : "The official routine for the department. Your own classes are on your dashboard."
        }
        actions={
          isCoord && (
            <Button onClick={() => setPublishOpen(true)}>
              <Upload className="mr-2 h-4 w-4" /> Publish routine
            </Button>
          )
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {TERMS.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={term === t ? "default" : "outline"}
            onClick={() => setTerm(t)}
          >
            {t === "all" ? "All terms" : `Term ${t}`}
          </Button>
        ))}
      </div>

      <div className={isCoord ? "grid gap-6 2xl:grid-cols-[1fr_320px]" : ""}>
        <TimetableGrid
          showTeacher
          entries={shown.map((o) => ({
            offering: o,
            tone: isCoord && ids.has(o.id) ? "conflict" : "default",
          }))}
          onEntryClick={isCoord ? (o) => setEditing(o) : undefined}
        />
        {isCoord && (
          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                {conflicts.length ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                )}
                {conflicts.length
                  ? `${conflicts.length} clash${conflicts.length > 1 ? "es" : ""}`
                  : "No clashes"}
              </h2>
              <ul className="space-y-2 text-sm">
                {conflicts.map((c, i) => (
                  <li key={i}>
                    <button
                      className="w-full rounded-md bg-destructive/10 p-2.5 text-left hover:bg-destructive/15"
                      onClick={() =>
                        setEditing(
                          state.offerings.find(
                            (o) => o.id === c.offerings[c.offerings.length - 1],
                          ) ?? null,
                        )
                      }
                    >
                      <span className="block text-xs font-semibold uppercase text-destructive">
                        {c.kind} · {DAYS[c.day]} {SLOTS[c.slot]}
                      </span>
                      {c.message}
                    </button>
                  </li>
                ))}
              </ul>
              {!dirty && conflicts.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Draft matches the published routine.
                </p>
              )}
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <History className="h-5 w-5 text-primary" /> Version history
              </h2>
              <ol className="space-y-3 text-sm">
                {[...state.versions].reverse().map((v) => (
                  <li key={v.version} className="border-l-2 border-accent pl-3">
                    <p className="font-semibold">
                      v{v.version} · {fmtDate(v.date)}
                    </p>
                    <p className="text-muted-foreground">
                      {v.note || "No note"} — {v.by}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        )}
      </div>

      {editing && (
        <EditDialog key={editing.id} offering={editing} onClose={() => setEditing(null)} />
      )}

      <Dialog open={publishOpen} onOpenChange={setPublishOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish routine v{published.version + 1}</DialogTitle>
            <DialogDescription>
              Students and teachers whose classes changed will be notified, and a notice will be
              posted.
            </DialogDescription>
          </DialogHeader>
          {conflicts.length > 0 && (
            <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              There {conflicts.length === 1 ? "is 1 clash" : `are ${conflicts.length} clashes`}{" "}
              left. Fix them before publishing.
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="note">What changed?</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. CSE3203 moved to Thursday to free R-301"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPublishOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={conflicts.length > 0}
              onClick={() => {
                dispatch({ type: "publish", note });
                setPublishOpen(false);
                setNote("");
                toast.success(`Routine v${published.version + 1} published`, {
                  description: "Affected students and teachers were notified.",
                });
              }}
            >
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function EditDialog({ offering, onClose }: { offering: Offering; onClose: () => void }) {
  const { state, dispatch } = useCampus();
  const [slots, setSlots] = useState<Slot[]>(offering.slots.map((s) => [...s] as Slot));
  const [room, setRoom] = useState(offering.room);
  const [teacher, setTeacher] = useState(offering.teacher);
  const course = courseByCode(offering.course)!;
  const draft = useMemo(
    () => ({ ...offering, slots, room, teacher }),
    [offering, slots, room, teacher],
  );

  const setSlot = (i: number, idx: 0 | 1, v: number) =>
    setSlots((prev) =>
      prev.map((s, j) => (j === i ? ((idx === 0 ? [v, s[1]] : [s[0], v]) as Slot) : s)),
    );

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {offering.course} · {course.title}
          </DialogTitle>
          <DialogDescription>
            Section {offering.section} · {offering.seats} seats ·{" "}
            {course.kind === "lab" ? "Lab" : "Theory"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {slots.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_1.4fr_auto] items-end gap-2">
              <div className="space-y-1.5">
                <Label>Class {i + 1} · day</Label>
                <Select value={String(s[0])} onValueChange={(v) => setSlot(i, 0, Number(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((d, di) => (
                      <SelectItem key={d} value={String(di)}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Time</Label>
                <Select value={String(s[1])} onValueChange={(v) => setSlot(i, 1, Number(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SLOTS.map((t, ti) => (
                      <SelectItem key={t} value={String(ti)}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="icon"
                title="Suggest a free slot"
                onClick={() => {
                  const others = state.offerings.map((o) => (o.id === offering.id ? draft : o));
                  const sug = suggestSlot(draft, i, others, state.unavailability);
                  if (sug) {
                    setSlots((prev) => prev.map((x, j) => (j === i ? sug : x)));
                    toast.message(`Suggested ${DAYS[sug[0]]} ${SLOTS[sug[1]]}`);
                  } else toast.error("No free slot found for this room and teacher");
                }}
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Room</Label>
              <Select value={room} onValueChange={setRoom}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROOMS.filter((r) => r.kind === course.kind).map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.id} · {r.capacity} seats
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Teacher</Label>
              <Select value={teacher} onValueChange={setTeacher}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FACULTY.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            <Badge variant="outline" className="mr-1">
              Tip
            </Badge>
            The sparkle button finds the first slot where both the room and teacher are free.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: "moveOffering", offering: offering.id, slots, room, teacher });
              toast.success(`${offering.course} updated in the draft`);
              onClose();
            }}
          >
            Save to draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
