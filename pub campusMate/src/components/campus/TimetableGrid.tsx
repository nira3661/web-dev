import {
  DAYS,
  SLOTS,
  courseByCode,
  facultyById,
  type Offering,
  type Slot,
} from "@/lib/campus/data";
import { cn } from "@/lib/utils";

export type CellTone = "default" | "pending" | "conflict" | "muted";

interface Props {
  entries: { offering: Offering; tone?: CellTone | undefined }[];
  unavailable?: Slot[] | undefined;
  onCellClick?: ((day: number, slot: number) => void) | undefined;
  onEntryClick?: ((offering: Offering) => void) | undefined;
  showTeacher?: boolean | undefined;
  compact?: boolean | undefined;
}

const toneClass: Record<CellTone, string> = {
  default: "border-primary/25 bg-primary/10 text-foreground",
  pending: "border-dashed border-warning bg-warning/20 text-foreground",
  conflict: "border-destructive bg-destructive/15 text-foreground ring-1 ring-destructive/40",
  muted: "border-border bg-muted text-muted-foreground",
};

export function TimetableGrid({
  entries,
  unavailable = [],
  onCellClick,
  onEntryClick,
  showTeacher,
  compact,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="bg-muted/60">
            <th className="w-16 p-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Day
            </th>
            {SLOTS.map((s) => (
              <th key={s} className="p-3 text-left text-xs font-semibold text-muted-foreground">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((d, di) => (
            <tr key={d} className="border-t border-border">
              <td className="p-3 font-display text-base font-semibold">{d}</td>
              {SLOTS.map((_, si) => {
                const here = entries.filter((e) =>
                  e.offering.slots.some(([a, b]) => a === di && b === si),
                );
                const blocked = unavailable.some(([a, b]) => a === di && b === si);
                return (
                  <td
                    key={si}
                    onClick={onCellClick ? () => onCellClick(di, si) : undefined}
                    className={cn(
                      "h-full p-1.5 align-top",
                      compact ? "min-h-14" : "min-h-20",
                      onCellClick && "cursor-pointer hover:bg-secondary/60",
                      blocked &&
                        "bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,var(--color-muted)_6px,var(--color-muted)_12px)]",
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      {here.map(({ offering: o, tone = "default" }) => {
                        const c = courseByCode(o.course);
                        return (
                          <button
                            type="button"
                            key={o.id}
                            onClick={(e) => {
                              if (!onEntryClick) return;
                              e.stopPropagation();
                              onEntryClick(o);
                            }}
                            className={cn(
                              "w-full rounded-md border px-2 py-1.5 text-left transition-colors",
                              toneClass[tone],
                              onEntryClick
                                ? "cursor-pointer hover:brightness-95"
                                : "cursor-default",
                            )}
                          >
                            <span className="block text-xs font-bold">
                              {o.course} · {o.section}
                            </span>
                            {!compact && (
                              <span className="block truncate text-[11px] text-muted-foreground">
                                {c?.title}
                              </span>
                            )}
                            <span className="block text-[11px] text-muted-foreground">
                              {o.room}
                              {showTeacher
                                ? ` · ${facultyById(o.teacher)?.name.replace("Dr. ", "")}`
                                : ""}
                            </span>
                          </button>
                        );
                      })}
                      {blocked && here.length === 0 && (
                        <span className="px-1 text-[11px] text-muted-foreground">Unavailable</span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
