import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookUser, ClipboardCheck, GraduationCap, LayoutGrid } from "lucide-react";
import campus from "@/assets/campus-courtyard.jpg";
import { Logo } from "@/components/campus/Logo";
import { PERSONAS, ROLE_LABEL, type Role } from "@/lib/campus/data";
import { useCampus } from "@/lib/campus/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — PUB CampusMate" },
      {
        name: "description",
        content: "Sign in to CampusMate as a student, teacher, advisor or department coordinator.",
      },
      { property: "og:title", content: "Sign in — PUB CampusMate" },
      { property: "og:description", content: "Choose a role to explore the CampusMate demo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

const ICONS: Record<Role, typeof GraduationCap> = {
  student: GraduationCap,
  teacher: BookUser,
  advisor: ClipboardCheck,
  coordinator: LayoutGrid,
};

function Login() {
  const { dispatch } = useCampus();
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden overflow-hidden bg-sidebar lg:block">
        <img
          src={campus}
          alt=""
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Logo light />
          <blockquote className="max-w-md">
            <p className="font-display text-3xl leading-snug text-sidebar-accent-foreground">
              "I registered, got approved and saw my new routine — without visiting the office
              once."
            </p>
            <footer className="mt-4 text-sm text-sidebar-foreground/70">
              — the student experience we're building for
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-8 text-4xl font-semibold lg:mt-0">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Pick a demo account. Each role sees different pages and actions.
          </p>
          <div className="mt-8 space-y-3">
            {PERSONAS.map((p) => {
              const Icon = ICONS[p.role];
              return (
                <button
                  key={p.role}
                  onClick={() => {
                    dispatch({ type: "signIn", persona: p });
                    navigate({ to: "/dashboard" });
                  }}
                  className="group flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-secondary text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-brick">
                      {ROLE_LABEL[p.role]}
                    </span>
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block text-sm text-muted-foreground">{p.subtitle}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </button>
              );
            })}
          </div>
          <p className="mt-8 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            Demo mode: accounts and changes are saved in this browser only. Real university sign-in
            comes next.
          </p>
        </div>
      </div>
    </div>
  );
}
