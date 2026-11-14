import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  FACULTY,
  NOTICES,
  OFFERINGS,
  PERSONAS,
  REGISTRATIONS,
  courseByCode,
  type Notice,
  type Offering,
  type Persona,
  type Registration,
  type Role,
  type Slot,
} from "./data";
import { DEFAULT_LOAD_RULES, type LoadRules } from "./rules";

export interface AppNotification {
  id: string;
  to: string;
  text: string;
  date: string;
  read: boolean;
}
export interface RoutineVersion {
  version: number;
  date: string;
  by: string;
  note: string;
  snapshot: Offering[];
}
export interface MakeupRequest {
  id: string;
  offering: string;
  slot: Slot;
  room: string;
  reason: string;
  status: "proposed" | "approved";
}

export interface CampusState {
  session: Persona | null;
  offerings: Offering[];
  registrations: Registration[];
  notices: Notice[];
  notifications: AppNotification[];
  unavailability: Record<string, Slot[]>;
  versions: RoutineVersion[];
  rules: LoadRules;
  makeups: MakeupRequest[];
}

const now = () => new Date().toISOString();
const uid = () => Math.random().toString(36).slice(2, 9);

export const initialState = (): CampusState => ({
  session: null,
  offerings: OFFERINGS.map((o) => ({ ...o, slots: o.slots.map((s) => [...s] as Slot) })),
  registrations: REGISTRATIONS.map((r) => ({ ...r })),
  notices: NOTICES.map((n) => ({ ...n })),
  notifications: [
    {
      id: "w1",
      to: "s1",
      text: "Your registration for CSE3103 was approved by Dr. Mahbub Alam.",
      date: "2026-11-09T09:00:00Z",
      read: false,
    },
    {
      id: "w2",
      to: "t2",
      text: "4 registration requests are waiting for your approval.",
      date: "2026-11-12T09:00:00Z",
      read: false,
    },
    {
      id: "w3",
      to: "t1",
      text: "Draft routine has clashes — review before publishing.",
      date: "2026-11-12T10:00:00Z",
      read: false,
    },
  ],
  unavailability: Object.fromEntries(FACULTY.map((f) => [f.id, f.unavailable])),
  versions: [
    {
      version: 1,
      date: "2026-08-28T10:00:00Z",
      by: "Dr. Farhana Rahman",
      note: "Initial Fall 2026 routine",
      snapshot: OFFERINGS,
    },
  ],
  rules: DEFAULT_LOAD_RULES,
  makeups: [],
});

type Action =
  | { type: "signIn"; persona: Persona }
  | { type: "signOut" }
  | { type: "register"; student: string; offering: string }
  | { type: "drop"; registration: string }
  | { type: "decide"; registration: string; approve: boolean; note?: string | undefined }
  | { type: "moveOffering"; offering: string; slots: Slot[]; room: string; teacher: string }
  | { type: "publish"; note: string }
  | { type: "postNotice"; notice: Omit<Notice, "id" | "date"> }
  | { type: "toggleUnavailable"; teacher: string; slot: Slot }
  | { type: "setRules"; rules: LoadRules }
  | { type: "proposeMakeup"; offering: string; slot: Slot; room: string; reason: string }
  | { type: "approveMakeup"; id: string }
  | { type: "readAll"; to: string }
  | { type: "reset" };

function notifyStudentsOf(
  state: CampusState,
  offeringIds: string[],
  text: string,
): AppNotification[] {
  const students = new Set(
    state.registrations
      .filter(
        (r) =>
          offeringIds.includes(r.offering) && r.status !== "dropped" && r.status !== "rejected",
      )
      .map((r) => r.student),
  );
  return [...students].map((s) => ({ id: uid(), to: s, text, date: now(), read: false }));
}

function reducer(state: CampusState, a: Action): CampusState {
  switch (a.type) {
    case "signIn":
      return { ...state, session: a.persona };
    case "signOut":
      return { ...state, session: null };
    case "register": {
      const o = state.offerings.find((x) => x.id === a.offering);
      return {
        ...state,
        registrations: [
          ...state.registrations,
          { id: uid(), student: a.student, offering: a.offering, status: "pending" },
        ],
        notifications: [
          {
            id: uid(),
            to: "t2",
            text: `New registration request for ${o?.course} (${o?.section}).`,
            date: now(),
            read: false,
          },
          ...state.notifications,
        ],
      };
    }
    case "drop": {
      const r = state.registrations.find((x) => x.id === a.registration);
      return {
        ...state,
        registrations: state.registrations.map((x) =>
          x.id === a.registration ? { ...x, status: "dropped" } : x,
        ),
        offerings:
          r?.status === "approved"
            ? state.offerings.map((o) =>
                o.id === r.offering ? { ...o, enrolled: o.enrolled - 1 } : o,
              )
            : state.offerings,
      };
    }
    case "decide": {
      const r = state.registrations.find((x) => x.id === a.registration);
      if (!r) return state;
      const o = state.offerings.find((x) => x.id === r.offering);
      return {
        ...state,
        registrations: state.registrations.map((x) =>
          x.id === a.registration
            ? { ...x, status: a.approve ? "approved" : "rejected", note: a.note }
            : x,
        ),
        offerings: a.approve
          ? state.offerings.map((x) =>
              x.id === r.offering ? { ...x, enrolled: x.enrolled + 1 } : x,
            )
          : state.offerings,
        notifications: [
          {
            id: uid(),
            to: r.student,
            text: `Your request for ${o?.course} was ${a.approve ? "approved" : "rejected"}${a.note ? `: ${a.note}` : "."}`,
            date: now(),
            read: false,
          },
          ...state.notifications,
        ],
      };
    }
    case "moveOffering":
      return {
        ...state,
        offerings: state.offerings.map((o) =>
          o.id === a.offering ? { ...o, slots: a.slots, room: a.room, teacher: a.teacher } : o,
        ),
      };
    case "publish": {
      const prev = state.versions[state.versions.length - 1]!;
      const changed = state.offerings
        .filter((o) => {
          const p = prev.snapshot.find((x) => x.id === o.id);
          return (
            !p ||
            JSON.stringify(p.slots) !== JSON.stringify(o.slots) ||
            p.room !== o.room ||
            p.teacher !== o.teacher
          );
        })
        .map((o) => o.id);
      const version: RoutineVersion = {
        version: prev.version + 1,
        date: now(),
        by: state.session?.name ?? "Coordinator",
        note: a.note,
        snapshot: state.offerings,
      };
      const teacherNotes = [
        ...new Set(state.offerings.filter((o) => changed.includes(o.id)).map((o) => o.teacher)),
      ].map((t) => ({
        id: uid(),
        to: t,
        text: `Routine v${version.version} published — your classes changed.`,
        date: now(),
        read: false,
      }));
      return {
        ...state,
        versions: [...state.versions, version],
        notifications: [
          ...notifyStudentsOf(
            state,
            changed,
            `Routine v${version.version} published — one or more of your classes moved.`,
          ),
          ...teacherNotes,
          ...state.notifications,
        ],
        notices: [
          {
            id: uid(),
            title: `Class routine v${version.version} published`,
            body: `${a.note || "Updated routine for Fall 2026."} ${changed.length} class${changed.length === 1 ? "" : "es"} changed.`,
            category: "Class",
            date: now().slice(0, 10),
            author: version.by,
            pinned: false,
          },
          ...state.notices,
        ],
      };
    }
    case "postNotice":
      return {
        ...state,
        notices: [{ ...a.notice, id: uid(), date: now().slice(0, 10) }, ...state.notices],
        notifications: [
          { id: uid(), to: "all", text: `New notice: ${a.notice.title}`, date: now(), read: false },
          ...state.notifications,
        ],
      };
    case "toggleUnavailable": {
      const cur = state.unavailability[a.teacher] ?? [];
      const has = cur.some((s) => s[0] === a.slot[0] && s[1] === a.slot[1]);
      return {
        ...state,
        unavailability: {
          ...state.unavailability,
          [a.teacher]: has
            ? cur.filter((s) => !(s[0] === a.slot[0] && s[1] === a.slot[1]))
            : [...cur, a.slot],
        },
      };
    }
    case "setRules":
      return { ...state, rules: a.rules };
    case "proposeMakeup":
      return {
        ...state,
        makeups: [
          ...state.makeups,
          {
            id: uid(),
            offering: a.offering,
            slot: a.slot,
            room: a.room,
            reason: a.reason,
            status: "proposed",
          },
        ],
        notifications: [
          {
            id: uid(),
            to: "t1",
            text: `Make-up class proposed for ${state.offerings.find((o) => o.id === a.offering)?.course}.`,
            date: now(),
            read: false,
          },
          ...state.notifications,
        ],
      };
    case "approveMakeup": {
      const m = state.makeups.find((x) => x.id === a.id);
      if (!m) return state;
      const o = state.offerings.find((x) => x.id === m.offering);
      const text = `Make-up class for ${o?.course} on ${["Sun", "Mon", "Tue", "Wed", "Thu"][m.slot[0]]} in ${m.room}.`;
      return {
        ...state,
        makeups: state.makeups.map((x) => (x.id === a.id ? { ...x, status: "approved" } : x)),
        notifications: [...notifyStudentsOf(state, [m.offering], text), ...state.notifications],
        notices: [
          {
            id: uid(),
            title: `${o?.course} make-up class`,
            body: `${text} Reason: ${m.reason}`,
            category: "Class",
            date: now().slice(0, 10),
            author: courseByCode(o?.course ?? "")?.title ?? "Department",
          },
          ...state.notices,
        ],
      };
    }
    case "readAll":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.to === a.to || n.to === "all" ? { ...n, read: true } : n,
        ),
      };
    case "reset":
      return { ...initialState(), session: state.session };
  }
}

const KEY = "campusmate.v1";

interface Ctx {
  state: CampusState;
  dispatch: (a: Action) => void;
  ready: boolean;
}
const CampusContext = createContext<Ctx | null>(null);

export function CampusProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CampusState>(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initialState(), ...(JSON.parse(raw) as CampusState) });
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      state,
      ready,
      dispatch: (a) =>
        setState((prev) => {
          const next = reducer(prev, a);
          try {
            localStorage.setItem(KEY, JSON.stringify(next));
          } catch {
            /* storage full */
          }
          return next;
        }),
    }),
    [state, ready],
  );
  return <CampusContext.Provider value={value}>{children}</CampusContext.Provider>;
}

export function useCampus() {
  const ctx = useContext(CampusContext);
  if (!ctx) throw new Error("useCampus must be used inside CampusProvider");
  return ctx;
}

export function useSession(): Persona | null {
  return useCampus().state.session;
}

export const personaFor = (role: Role) => PERSONAS.find((p) => p.role === role)!;
export { reducer as campusReducer };
