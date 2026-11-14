import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/campus/PageHeader";
import { Input } from "@/components/ui/input";
import { FACULTY } from "@/lib/campus/data";
import { useCampus } from "@/lib/campus/store";

export const Route = createFileRoute("/_portal/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty directory — PUB CampusMate" },
      {
        name: "description",
        content: "Offices, office hours, email and courses for every CSE faculty member.",
      },
      { property: "og:title", content: "Faculty directory — PUB CampusMate" },
      {
        property: "og:description",
        content: "Offices, office hours, email and courses for every CSE faculty member.",
      },
    ],
  }),
  component: FacultyPage,
});

function FacultyPage() {
  const { state } = useCampus();
  const [q, setQ] = useState("");
  const list = FACULTY.filter((f) =>
    `${f.name} ${f.expertise} ${f.designation}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Faculty directory"
        description="Find a teacher's office, office hours and what they teach this semester."
      />
      <Input
        placeholder="Search by name or subject"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mb-6 max-w-sm"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((f) => {
          const teaching = state.offerings.filter((o) => o.teacher === f.id);
          const initials = f.name
            .replace("Dr. ", "")
            .split(" ")
            .map((p) => p[0])
            .join("");
          return (
            <div key={f.id} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary font-display text-xl font-semibold text-primary">
                  {initials}
                </span>
                <div>
                  <h2 className="text-lg font-semibold">{f.name}</h2>
                  <p className="text-sm text-muted-foreground">{f.designation}</p>
                </div>
              </div>
              {f.title && (
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-brick">
                  {f.title}
                </p>
              )}
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  {f.office}
                </li>
                <li className="flex gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  {f.officeHours}
                </li>
                <li className="flex gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <a href={`mailto:${f.email}`} className="hover:underline">
                    {f.email}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">{f.expertise}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {teaching.map((o) => (
                  <span key={o.id} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                    {o.course} {o.section}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
