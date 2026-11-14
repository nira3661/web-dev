import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookOpenCheck,
  CalendarRange,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  MessagesSquare,
  RotateCcw,
  Users2,
  BriefcaseBusiness,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/campus/Logo";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ROLE_LABEL, type Role } from "@/lib/campus/data";
import { useCampus } from "@/lib/campus/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_portal")({
  ssr: false,
  component: PortalLayout,
});

type NavPath =
  "/dashboard" | "/routine" | "/registration" | "/teaching" | "/notices" | "/faculty" | "/helpdesk";
const NAV: { to: NavPath; label: string; icon: typeof Bell; roles: Role[] }[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["student", "teacher", "advisor", "coordinator"],
  },
  {
    to: "/routine",
    label: "Class routine",
    icon: CalendarRange,
    roles: ["student", "teacher", "advisor", "coordinator"],
  },
  {
    to: "/registration",
    label: "Registration",
    icon: BookOpenCheck,
    roles: ["student", "advisor", "coordinator"],
  },
  {
    to: "/teaching",
    label: "Teaching & load",
    icon: BriefcaseBusiness,
    roles: ["teacher", "coordinator"],
  },
  {
    to: "/notices",
    label: "Notices & events",
    icon: Megaphone,
    roles: ["student", "teacher", "advisor", "coordinator"],
  },
  {
    to: "/faculty",
    label: "Faculty directory",
    icon: Users2,
    roles: ["student", "teacher", "advisor", "coordinator"],
  },
  {
    to: "/helpdesk",
    label: "AI helpdesk",
    icon: MessagesSquare,
    roles: ["student", "teacher", "advisor", "coordinator"],
  },
];

function allowedPaths(role: Role) {
  return NAV.filter((n) => n.roles.includes(role)).map((n) => n.to as string);
}

function SideNav({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {NAV.filter((n) => n.roles.includes(role)).map((n) => {
        const active = path === n.to;
        return (
          <Link
            key={n.to}
            to={n.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <n.icon className="h-4 w-4" />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Notifications() {
  const { state, dispatch } = useCampus();
  const me = state.session!;
  const mine = state.notifications.filter((n) => n.to === me.userId || n.to === "all");
  const unread = mine.filter((n) => !n.read).length;
  return (
    <Popover onOpenChange={(o) => !o && unread && dispatch({ type: "readAll", to: me.userId })}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brick px-1 text-[10px] font-bold text-brick-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b border-border px-4 py-3 font-semibold">Notifications</div>
        <div className="max-h-80 overflow-y-auto">
          {mine.length === 0 && (
            <p className="p-4 text-sm text-muted-foreground">You're all caught up.</p>
          )}
          {mine.slice(0, 12).map((n) => (
            <div
              key={n.id}
              className={cn(
                "border-b border-border px-4 py-3 text-sm last:border-0",
                !n.read && "bg-secondary/60",
              )}
            >
              <p>{n.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(n.date).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function PortalLayout() {
  const { state, dispatch, ready } = useCampus();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const me = state.session;

  if (!ready) return <div className="min-h-screen bg-background" />;

  if (!me) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-sm text-center">
          <h1 className="text-3xl font-semibold">Please sign in</h1>
          <p className="mt-2 text-muted-foreground">Choose a demo account to open CampusMate.</p>
          <Button asChild className="mt-6">
            <Link to="/login">Go to sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  const allowed = allowedPaths(me.role).includes(path);

  const sidebar = (
    <div className="flex h-full flex-col gap-8 bg-sidebar p-5">
      <Logo light />
      <SideNav role={me.role} onNavigate={() => setOpen(false)} />
      <div className="mt-auto space-y-3">
        <div className="rounded-lg bg-sidebar-accent p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-sidebar-primary">
            {ROLE_LABEL[me.role]}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-sidebar-accent-foreground">{me.name}</p>
          <p className="text-xs text-sidebar-foreground/60">{me.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => {
              dispatch({ type: "signOut" });
              navigate({ to: "/login" });
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Switch role
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Reset demo data"
            className="text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => dispatch({ type: "reset" })}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">{sidebar}</aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 border-0 p-0">
                {sidebar}
              </SheetContent>
            </Sheet>
            <p className="text-sm text-muted-foreground">Fall 2026 · Week 11</p>
          </div>
          <Notifications />
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">
          {allowed ? (
            <Outlet />
          ) : (
            <div className="rounded-xl border border-border bg-card p-10 text-center">
              <h1 className="text-2xl font-semibold">Not available for your role</h1>
              <p className="mt-2 text-muted-foreground">
                {ROLE_LABEL[me.role]} accounts can't open this page.
              </p>
              <Button asChild className="mt-6">
                <Link to="/dashboard">Back to dashboard</Link>
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
